import { shuffleArray } from "./Utils";
export enum Difficulty {
  HARD = "hard",
  MEDIUM = "easy",
  EASY = "easy",
}
export enum Catagory {
  General = 9,
  ScienceNature = 17,
  Science_Computers = 18,
  Sports = 21,
  Geography = 22,
  Animals = 27,
  Celebreties = 26,
  Entertainment_VideoGames = 15,
}
export interface QuestionFormat {
  catagory: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}
export type QuestionState = QuestionFormat & { answers: string[] };
export async function fetchQuestions(
  amount: number,
  difficulty: string,
  catagory: string
): Promise<QuestionState[]> {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${catagory}&difficulty=${difficulty}&type=multiple`;
  const data: { results: Array<QuestionFormat> } = await (
    await fetch(endpoint)
  ).json(); //await fetch then await conversion to JSON
  const questionsPlusAnswers: QuestionState[] = data.results.map((question) => {
    return {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
  });
  return questionsPlusAnswers;
}
