export type LearningStatus = 'new' | 'learning' | 'mastered';

export interface ExampleSentence {
  sentence: string;
  translation: string;
}

export interface QuizItem {
  type: 'blank' | 'meaning' | 'baseVerb';
  prompt: string;
  blankPhrase: string;
  options: string[];
  answer: string;
}

export interface PhrasalVerb {
  id: string;
  category: 'basics' | 'travel' | 'business';
  phrase: string;
  meaning: string;
  baseVerbs: string[];
  synonyms: string[];
  examples: ExampleSentence[];
  quiz: QuizItem[];
}
