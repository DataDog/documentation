import { useState } from "react";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const Greeter = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <p>
        <EmojiPeopleIcon
          sx={{ marginBottom: "-2px", marginLeft: "-5px", fontSize: "30px" }}
        />
        I'm the <code>Greeter</code>, an example component!
      </p>
      <p>
        I live in my own file, <code>src/components/Greeter.tsx</code>.
      </p>
      <p>I can say hello to you if you type your name in the input below:</p>
      <p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <p>Hello, {name || "there"}!</p>
    </div>
  );
};

export default Greeter;
