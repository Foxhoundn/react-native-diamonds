/* @flow */
const calculateScore: Function = (score: number, hits: Object, streak: number) => {
  const multiplier: number = streak > 2 ? streak * 0.5 : 1;
  const newScore: number = (Object.keys(hits).length * 20) * multiplier;

  return score + newScore;
};

export default calculateScore;
