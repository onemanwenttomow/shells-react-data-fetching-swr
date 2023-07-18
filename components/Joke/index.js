import useSWR from "swr";
import { useState } from "react";

export default function Joke() {
  const [id, setId] = useState(0);
  const [jokesInfo, setJokesInfo] = useState([]);

  const { data } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function handleToggleFunny(id) {
    setJokesInfo((jokesInfo) => {
      const info = jokesInfo.find((info) => info.id === id);
      if (info) {
        return jokesInfo.map((info) => {
          if (info.id !== id) {
            return info;
          }
          return {
            ...info,
            isFunny: !info.isFunny,
          };
        });
      }

      return [...jokesInfo, { id, isFunny: true }];
    });
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }
  console.log("jokesInfo", jokesInfo);
  const info = jokesInfo.find((info) => info.id === id) ?? { isFunny: false };
  const { isFunny } = info;

  console.log("isFunny", isFunny);

  return (
    <>
      <small>ID: {id}</small>
      <h1>
        {data.joke} <span>{isFunny ? "😹" : "🧐"}</span>
      </h1>
      <div>
        <button onClick={() => handleToggleFunny(id)}>
          {isFunny ? "Not funny" : "This is funny"}
        </button>
      </div>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
