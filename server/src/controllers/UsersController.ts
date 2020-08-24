import { Request, Response } from 'express';
import db from '../database/connection';

const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

export default class UsersController {

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
            avatar,
            whatsapp,
            bio
        } = req.body;

        if (name == '' || email == '' || password == '' || avatar == '' || whatsapp == '' || bio == '')
            return res.status(400).send({ error: 'Preencha todos os dados' });

        const use = await db('users').select().where('email', email);
        if (use[0])
            return res.status(400).send({ error: 'User already exists' });

        try {
            const salt = bcrypt.genSaltSync(10);

            await db('users').insert({
                name,
                email,
                password: bcrypt.hashSync(password, salt),
                avatar,
                whatsapp,
                bio
            });

            return res.status(201).send();
        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while creating new user'
            })
        }
    }

    async auth(req: Request, res: Response) {
        try {
            await db('users')
                .select('*')
                .where('email', req.body.email)
                .then((users: any) => {

                    if (users.length == undefined || users.length == 0)
                        return res.status(400).send({ error: 'User not found' })

                    if (!(bcrypt.compareSync(req.body.password, users[0].password)))
                        return res.status(400).send({ error: 'Password error' })

                    const user = users[0]
                    return res.send({ user, token: generateToken({ id: user.id, email: user.email }) })
                })

        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error auth'
            })
        }
    }

    async authenticated(req: Request, res: Response) {
        return res.json();
    }

    async update(req: Request, res: Response) {
        try {
            const { name, email, password, whatsapp, avatar, bio } = req.body
            const { id } = req.params

            if (name == '' || email == '' || password == '' || avatar == '' || whatsapp == '' || bio == '')
                return res.status(400).send({ error: 'Preencha todos os dados' })

            const salt = bcrypt.genSaltSync(10);

            const users = await db('users')
                .select()
                .where({ id })

            if (!(users[0]))
                return res.status(400).send({ error: 'Digite um id válido' })

            await db('users')
                .update({
                    name,
                    email,
                    password: bcrypt.hashSync(password, salt),
                    avatar,
                    whatsapp,
                    bio,
                })
                .where({ id })

            return res.json()

        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error'
            })
        }
    }

}