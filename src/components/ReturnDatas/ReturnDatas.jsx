import { HeadingM, HeadingS, HeadingS_a } from "../Headings";
import { BodyM, BodyM_Gray } from "../Bodys";
import "./ReturnDatas.css";

export function ScuccessData({ data, searchByClick }) {
  const { partOfSpeech, definitions, synonyms, antonyms } = data;
  return (
    <>
      <div className="Dictionary__definition">
        <div className="flex justify-between items-center">
          <HeadingM data={partOfSpeech} />
          <hr className="Dictionary__definition__hr border-Gray-2" />
        </div>
        <HeadingS data="Meanings" />
        <ul className="pl-4">
          {definitions.map((definition, index) => (
            <BodyM data={definition} key={index} listStyle={"list-disc"} />
          ))}
        </ul>
        {synonyms && synonyms.length > 0 ? (
          <>
            <HeadingS data="Synonyms" />
            <ul>
              {synonyms.map((synonym, index) => (
                <li
                  onClick={() => {
                    searchByClick(synonym);
                  }}
                  key={index}
                >
                  <HeadingS_a data={synonym} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
        {antonyms && antonyms.length > 0 ? (
          <>
            <HeadingS data="Antonyms" />
            <ul>
              {antonyms.map((antonym, index) => (
                <li
                  onClick={() => {
                    searchByClick(antonym);
                  }}
                  key={index}
                >
                  <HeadingS_a data={antonym} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export function FailureData() {
  const randomSadEmoji = () => {
    let ran = Math.floor(Math.random() * 14) + 1;
    const emojis = [
      "🙁",
      "😞",
      "😟",
      "😥",
      "😢",
      "😭",
      "😓",
      "😔",
      "😕",
      "😖",
      "😫",
      "😩",
      "🥺",
      "💔",
    ];
    return emojis[ran];
  };
  console.log(randomSadEmoji());
  return (
    <div className="flex flex-col items-center text-center">
      <b className="text-[32px]">{randomSadEmoji()}</b>
      <h1 className="text-[16px] md:text-[20px] text-Black-3">
        No Definitions Found
      </h1>
      <BodyM_Gray
        data={
          "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
        }
      />
    </div>
  );
}
