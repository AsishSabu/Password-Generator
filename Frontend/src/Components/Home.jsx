import { useState } from "react";
import generatePassword from "../Utils/generatePassword";
import { FaClipboard, FaRedo } from "react-icons/fa";
import showToast from "../Utils/showToast";
import { SERVER_URL } from "../Constants";
import axios from "axios";
import { useAppSelector } from "../Redux/store";

const Home = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const id = useAppSelector((state) => state.user.id);


  // Modal related states
  const [showModal, setShowModal] = useState(false);
  const [passwordName, setPasswordName] = useState(""); // For the password name input

  const handleGeneratePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      showToast("Please select at least one option to generate the password", "error");
      return;
    }
    const options = {
      upperCaseLetter: includeUppercase,
      lowerCaseLetter: includeLowercase,
      numbers: includeNumbers,
      symbols: includeSymbols,
      length: length,
    };
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleSaveButton = async () => {
    if (!password) {
      showToast("Please generate a password first", "error");
      return;
    }
    setShowModal(true)
  }

  const handleSavePassword = async () => {
    if (!passwordName) {
      showToast("Please enter a name for the password", "error");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/save-password`, {
        id,
        passwordName,
        password,
      });
      if (response.status === 200) {
        showToast("Password saved successfully!", "success");
        setPassword("");
        setPasswordName("");
        setShowModal(false); // Close the modal after successful save
      }
    } catch (error) {
      console.error("Failed to save the password", error);
      showToast("You are not authenticated", "error");
    }
  };


  return (
    <div>
      {/* Password Generator Section */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Generate a Secure Password</h3>
        <div className="bg-gray-600 p-2 rounded-lg flex justify-between items-center">
          <input
            type="text"
            readOnly
            className="bg-transparent outline-none w-full text-lg"
            value={password}
          />
          <button className="bg-gray-700 p-2 rounded-full" onClick={handleCopyPassword}>
            <FaClipboard />
          </button>
          <button className="bg-gray-700 p-2 rounded-full" onClick={handleGeneratePassword}>
            <FaRedo />
          </button>
        </div>
      </div>

      {/* Customize Password Section */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Customize Your Password</h4>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="uppercase"
            className="w-4 h-4"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label htmlFor="uppercase" className="text-gray-300">Uppercase</label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="lowercase"
            className="w-4 h-4"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <label htmlFor="lowercase" className="text-gray-300">Lowercase</label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="numeric"
            className="w-4 h-4"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label htmlFor="numeric" className="text-gray-300">Numeric</label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="symbols"
            className="w-4 h-4"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label htmlFor="symbols" className="text-gray-300">Symbols</label>
        </div>
      </div>

      {/* Password Length Section */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Password Length: {length}</h4>
        <input
          type="range"
          min="1"
          max="50"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Save and Generate Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleGeneratePassword}
          className="bg-blue-600 w-full p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Generate New Password
        </button>
        <button
          onClick={handleSaveButton}
          className="bg-gray-900 w-full p-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Save Password
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-gray-600  p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Save Password</h3>
            <div className="mb-4">
              <label htmlFor="passwordName" className="block text-lg mb-1">
                Password Name
              </label>
              <input
                type="text"
                id="passwordName"
                value={passwordName}
                onChange={(e) => setPasswordName(e.target.value)}
                className="w-full p-2 rounded-md border bg-gray-100 text-gray-900 border-gray-300 shadow-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg mb-1">
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                readOnly
                className="w-full p-2 rounded-md border bg-gray-100 text-gray-900 border-gray-300 shadow-md"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="p-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
