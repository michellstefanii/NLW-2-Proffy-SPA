import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'

const TeacherList: React.FC = () => {
  return (
      <div id="page-teacher-list" className="container">
        <PageHeader title="Estes são os proffys disponíveis.">
          <form id="search-teachers">
          <Select 
          name="subject" 
          label="Materia" 
          options={[
            { value: 'Artes', label: 'Artes' },
            { value: 'Biologia', label: 'Biologia' },
            { value: 'Ciências', label: 'Ciências' },
            { value: 'Matematica', label: 'Matematica' },
            { value: 'Filosofia', label: 'Filosofia' },
            { value: 'Português', label: 'Português' },
          ]}
          />
          <Select 
          name="week_day" 
          label="Dia da semana" 
          options={[
            { value: '0', label: 'Domingo' },
            { value: '1', label: 'Segunda-feira' },
            { value: '2', label: 'Terça-feira' },
            { value: '3', label: 'Quarta-feira' },
            { value: '4', label: 'Quinta-feira' },
            { value: '5', label: 'Sexta-feira' },
            { value: '6', label: 'Sabado' },
          ]}
          />
            <Input type="time" name="time" label="Hora" />
          </form>
        </PageHeader>

        <main>
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
        </main>
      </div>
  );
}

export default TeacherList;