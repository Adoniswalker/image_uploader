import styles from "../styles/Home.module.css";
import {useState} from "react";

export default function Home() {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);

  const buildImgTag = () => {
    let imgTag = null;
    if (image !== null)
      imgTag = (<div className="row">
        <div className="small-9 small-centered columns">
          <img className="thumbnail" src={image} width="700" height="500"></img>
        </div>
      </div>);
    return imgTag;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
      }
    };

    reader.onload = function (e) {
      setImage(e.target.result);
    }.bind(this);

    reader.readAsDataURL(file);
  };

  const imgTag = buildImgTag();

  return (
      <div className={styles.container}>
        <div>
          <form>
            <label>Attach image</label>
            <input type="file" onChange={handleImageUpload}/>
            <progress value={progress} max="100"></progress>
            <span>{progress}%</span>
            {imgTag}
          </form>
        </div>

      </div>
  );
}
