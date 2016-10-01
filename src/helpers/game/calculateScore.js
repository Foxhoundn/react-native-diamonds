/* @flow */
const calculateScore: Function = (score: number, hits: Array<Object>) => {
  const newScore = Object.keys(hits).length * 20;

  return score + newScore;
};

export default calculateScore;
