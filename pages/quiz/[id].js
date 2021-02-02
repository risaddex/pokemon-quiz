/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ externalDB }) {
  return (
    <ThemeProvider theme={externalDB.theme}>
      Desafio da galere
      <QuizScreen
        externalQuestions={externalDB.questions}
        externalBg={externalDB.bg}
      />
    </ThemeProvider>

  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDB = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed on retrieve data from server');
    })
    .catch((e) => {
      console.error(e);
    });

  // console.log('dbExterno', externalDB);
  // console.log('informação do next: ', context.query.id);

  return {
    props: {
      externalDB,
    },
  };
}
