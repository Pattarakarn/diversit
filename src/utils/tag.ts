
const TAGS = ['animal', 'nature', 'place', 'food', 'architecture', 'travel', 'fashion', 'tech'];

export const getRandomTags = (): string[] => {
    const numberOfTags = Math.floor(Math.random() * 2) + 1;
    const shuffled = [...TAGS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfTags);
};