import { Request, Response } from 'express';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import db from '../database/connection';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    async index(req: Request, res: Response) {
        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*','classes.id as class_id', 'users.*'])


        return res.json(classes);
    }

    async create(req: Request, res: Response) {
        const {
            subject,
            cost,
            schedule
        } = req.body;
    
        if (subject == '' || cost == '' || schedule == '')
            return res.status(400).send({ error: 'Preencha todos os dados' });
    
        const use = await db('users').select().where('id', req.params.userId);
        if (!(use[0]))
            return res.status(400).send({ error: 'User not exists' });
    
        const trx = await db.transaction();
    
        try {
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id: req.params.userId,
            });
    
            const class_id = insertedClassesIds[0];
    
            const ClassSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id,
                };
            })
    
            await trx('class_schedule').insert(ClassSchedule);
    
            await trx.commit();
    
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
    
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}