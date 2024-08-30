import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMeme, setAllMeme] = React.useState([]);
  const handleChange = function (event) {
    setMeme((prevMeme) => ({
      ...prevMeme,
      [event.target.name]: event.target.value,
    }));
  };
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMeme(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage(event) {
    console.log("Image Generator");
    event.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    console.log(url);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  return (
    <form>
      <div id="inputs">
        <input
          type="text"
          placeholder="Top Text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
      </div>
      <button type="button" id="image geter" onClick={getMemeImage}>
        Get a new meme image{" "}
      </button>
      <div id="image">
        <img id="meme-image" src={meme.randomImage} />
        <h2 id="top-text">{meme.topText}</h2>
        <h2 id="bottom-text">{meme.bottomText}</h2>
      </div>
    </form>
  );
}
