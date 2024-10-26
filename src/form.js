import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    templateId: "",
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
    const meme = allMeme[randomNumber];
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: meme.url,
      templateId: meme.id,
    }));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("meme", meme);
    const { templateId, topText, bottomText } = meme;
    if (!templateId) {
      alert("Please select an image before submitting.");
      return;
    }
    if (!topText || !bottomText) {
      alert("Please enter text for both fields.");
      return;
    }
    console.log(templateId, topText, bottomText);
    try {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          template_id: templateId,
          username: "nathanaelcheramlak", // Add your Imgflip username here
          password: "UAF@3vt9NUZ3ak2", // Add your Imgflip password here
          text0: topText,
          text1: bottomText,
        }),
      });
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        alert("Failed to generate meme. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        setMeme((prevMeme) => ({
          ...prevMeme,
          randomImage: data.data.url,
        }));
      } else {
        console.error("Error:", data.error_message);
      }
    } catch (error) {
      console.error("Error submitting meme:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div id="buttons">
        <button type="submit" id="submit-meme">
          Add text on the image
        </button>
        <button type="button" id="image geter" onClick={getMemeImage}>
          Get a random meme image{" "}
        </button>
      </div>
      <div id="image">
        <img id="meme-image" src={meme.randomImage} alt="" />
        <h2 id="top-text">{meme.topText}</h2>
        <h2 id="bottom-text">{meme.bottomText}</h2>
      </div>

      <div id="image-collection">
        <h3 id="select">Select Image below</h3>
        <div id="images">
          {allMeme.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt="meme"
              className="i"
              onClick={() =>
                setMeme({
                  ...meme,
                  randomImage: image.url,
                  templateId: image.id,
                })
              }
            />
          ))}
        </div>
      </div>
    </form>
  );
}
