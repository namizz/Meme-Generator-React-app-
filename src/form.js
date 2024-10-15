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
      console.log(data);
      setAllMeme(data.data.memes);
    }
    getMemes();
  }, []);

  function getRandomMemeImage(event) {
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
  function getSelectedImage(url) {
    console.log("Image Selected");
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function Images() {
    return allMeme.map((image, index) => (
      <img
        id={index}
        src={image.url}
        alt="i"
        className="i"
        onClick={() => getSelectedImage(image.url)}
      />
    ));
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
      <button type="button" id="image geter" onClick={getRandomMemeImage}>
        Get a random meme image{" "}
      </button>
      <div id="image">
        <img id="meme-image" src={meme.randomImage} alt="" />
        <h2 id="top-text">{meme.topText}</h2>
        <h2 id="bottom-text">{meme.bottomText}</h2>
      </div>
      /* Here there is an idea to add property which is to add a divsion. The
      division has a bunches of image which is generated from the api, then when
      they are selected change the meme image */
      <div id="image-collection">
        <h3 id="select">Select Image below</h3>
        <div id="images">
          <Images />
        </div>
      </div>
    </form>
  );
}
