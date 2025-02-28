import { createContext, useState } from "react";

const DictionaryContext = createContext({
  word: {},
  WordHandler: () => {},
});

export const DictionaryContentProvider = (props) => {
  const [word, setWord] = useState({});

  const WordHandler = (word) => {
    const { phonetics } = word;

    const { text: phoneticText } =
      phonetics
        .filter(
          (phonetic) => phonetic.text !== undefined && phonetic.text !== ""
        )
        .slice(0, 1)[0] || "";
    const { audio: phoneticAudio } =
      phonetics
        .filter((phonetic) => phonetic.audio && phonetic.audio !== "")
        .slice(0, 1)[0] || "";
    const wordData = {
      vocabulary: word.word,
      phonetics: { text: phoneticText, audio: phoneticAudio },
      meanings: word.meanings,
      sourceUrls: word.sourceUrls,
    };
    console.log(wordData);
    setWord(wordData);
  };

  return (
    <DictionaryContext.Provider
      value={{ word: word, WordHandler: WordHandler }}
    >
      {props.children}
    </DictionaryContext.Provider>
  );
};

export default DictionaryContext;
