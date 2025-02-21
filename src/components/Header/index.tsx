import "./header.css";

interface HeaderProps {
  inputName: string;
  setInputName: (value: string) => void;
  addTask: () => void;
}

const Header: React.FC<HeaderProps> = ({
  inputName,
  setInputName,
  addTask,
}) => {
  return (
    <div className="header">
      <input
        className="input"
        placeholder="Task To Be Done..."
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button className="btn_color" onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default Header;
