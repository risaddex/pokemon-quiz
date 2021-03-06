/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import db from '../../../db.json';
import BackLinkArrow from '../../components/BackLinkArrow';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import GitHubCorner from '../../components/GitHubCorner';
import LoadingWidget from '../../components/LoadingWidget';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Tela de resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((total, current) => {
            return current ? total + 1 : total;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, i) => (
            <li key={`result__${i * 13}`}>
              #
              {`${i + 1} `}
              Resultado:
              {result ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}
function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setQuestionSubmited] = useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  // const hasAlternativeSelected == selectedAlternative !== undefined // not necessary

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        src={question.image}
        alt="Desc"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />

      <Widget.Content>
        <h2>{question.title}</h2>

        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >

          {question.alternatives.map((alternative, i) => {
            const alternativeId = `alternative__${i}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === i;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(i)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button
            type="submit"
            disabled={selectedAlternative === undefined}
          >
            Confirm
          </Button>
          {isQuestionSubmited
            ? <p>{isCorrect ? 'você acertou!' : 'você errou :('}</p>
            : <p> </p>}
        </AlternativesForm>
      </Widget.Content>

    </Widget>
  );
}
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions = db.questions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0); // <= inicializa do indice 0
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    // aqui seria um fetch()...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // [] <- vazio = didMount()
  }, []);

  function handleQuizSubmit() {
    const nextQuestion = questionIndex + 1;

    return nextQuestion < totalQuestions
      ? setCurrentQuestion(questionIndex + 1)
      : setScreenState(screenStates.RESULT);
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            addResult={addResult}
            onSubmit={handleQuizSubmit}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/risaddex" />
    </QuizBackground>
  );
}
