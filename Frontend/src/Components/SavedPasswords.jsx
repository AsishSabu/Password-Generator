import { useEffect, useState } from "react";
import { useAppSelector } from "../Redux/store";
import axios from "axios";
import { SERVER_URL } from "../Constants";
import showToast from "../Utils/showToast";

const SavedPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [passwordName, setPasswordName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    // Fetch saved passwords from the backend
    const fetchPasswords = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/get-passwords`, {
          params: { userId }  // Pass the user ID as a query parameter
        });
        setPasswords(response.data.passwords);
      } catch (error) {
        console.error('Failed to fetch passwords', error);
        showToast('Failed to fetch passwords', 'error');
      }
    };

    fetchPasswords();
  }, [userId]);

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    showToast('Password copied to clipboard!', 'success');
  };

  const handleDeletePassword = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/delete-password/${id}`);
      setPasswords(passwords.filter((pwd) => pwd._id !== id));
      showToast('Password deleted successfully!', 'success');
    } catch (error) {
      console.error('Failed to delete the password', error);
      showToast('Failed to delete the password', 'error');
    }
  };

  const handleEditPassword = async () => {
    if (!passwordName || !newPassword) {
      showToast('Please enter both a name and a password', 'error');
      return;
    }

    try {
      await axios.put(`${SERVER_URL}/edit-password`, {
        id: selectedPassword._id, // Use selectedPassword._id for the ID
        name: passwordName,
        password: newPassword,
        userId
      });

      // Fetch updated passwords after successful edit
      const response = await axios.get(`${SERVER_URL}/get-passwords`, {
        params: { userId }
      });
      setPasswords(response.data.passwords);
      setShowModal(false);
      setPasswordName('');
      setNewPassword('');
      showToast('Password updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update the password', error);
      showToast('Failed to update the password', 'error');
    }
  };

  const handleOpenEditModal = (pwd) => {
    setSelectedPassword(pwd);
    setPasswordName(pwd.name);
    setNewPassword(pwd.password);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Saved Passwords
      </h2>

      <div className="mt-4 space-y-4">
        {passwords.map((pwd) => (
          <div key={pwd._id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">{pwd.name}</h3>
              <p>{pwd.password}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleOpenEditModal(pwd)} // Open modal with selected password
                className="text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleCopyPassword(pwd.password)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Copy
              </button>
              <button
                onClick={() => handleDeletePassword(pwd._id)}
                className="text-red-600 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-xl font-semibold mb-4">Edit Password</h3>
            <div className="mb-4">
              <label htmlFor="passwordName" className="block text-lg mb-1">Password Name</label>
              <input
                type="text"
                id="passwordName"
                value={passwordName}
                onChange={(e) => setPasswordName(e.target.value)}
                className="w-full p-2 rounded-md border bg-gray-100 text-gray-900 border-gray-300 shadow-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-lg mb-1">Password</label>
              <input
                type="text"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                onClick={handleEditPassword} // Call the edit password function directly
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

export default SavedPasswords;
