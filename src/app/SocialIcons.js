import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMedium,
  FaHome,
} from "react-icons/fa";
import "./SocialIcons.css";

function SocialIcons() {
  return (
    <div className="social-icons-container">
      <div className="social-icons-spacer"></div>
      <div className="social-icons-wrapper">
        <a
          href="https://ibrahimkayan.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaHome className="social-icon" />
        </a>
        <a
          href="https://github.com/ibrahimfevzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="social-icon" />
        </a>
        <a
          href="https://linkedin.com/in/ibrahim-f-kayan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="social-icon" />
        </a>
        <a
          href="https://twitter.com/ibrahimfevzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="social-icon" />
        </a>
        <a
          href="https://medium.com/@ibrahimfevzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMedium className="social-icon" />
        </a>
      </div>
      <div className="social-icons-text">
        Copyright © İbrahim F. Kayan | 2023
      </div>
    </div>
  );
}

export default SocialIcons;
