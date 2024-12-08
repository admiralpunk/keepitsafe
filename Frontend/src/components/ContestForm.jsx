import React, { useState } from "react";

const ContestForm = ({ contestData, setContestData, handleGetContest }) => {
  // State to store the contest link after fetching
  const [contestLink, setContestLink] = useState("");

  const fetchContest = () => {
    // Call the handleGetContest function (which might fetch the contest link)
    handleGetContest(contestData)
      .then((response) => {
        // Assuming the response contains the contest link
        if (response && response.contest) {
          setContestLink(response.contest); // Update state with the contest link
        } else {
          console.error("No contest link found in response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching contest:", error);
      });
  };

  const addUser = () => {
    setContestData((prevState) => ({
      ...prevState,
      users: [...prevState.users, ""], // Add an empty string to the users array for a new input
    }));
  };

  const removeUser = (index) => {
    const updatedUsers = contestData.users.filter((_, i) => i !== index); // Remove user at the given index
    setContestData({ ...contestData, users: updatedUsers });
  };

  return (
    <div>
      <h2>Get a Contest</h2>
      <label>
        Codeforces Usernames:
        {contestData.users.map((user, index) => (
          <div
            key={index}
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={user}
              onChange={(e) => {
                const updatedUsernames = [...contestData.users];
                updatedUsernames[index] = e.target.value;
                setContestData({ ...contestData, users: updatedUsernames });
              }}
            />
            <button
              type="button"
              onClick={() => removeUser(index)}
              style={{
                marginLeft: "8px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </label>
      <br />
      <button onClick={addUser}>Add User</button>
      <br />
      <label>
        Contest Type:
        <select
          value={contestData.type}
          onChange={(e) =>
            setContestData({ ...contestData, type: e.target.value })
          }
        >
          <option value="">-- Select Contest Type --</option>
          <option value="Div. 1">Div. 1</option>
          <option value="Div. 2">Div. 2</option>
          <option value="Div. 3">Div. 3</option>
          <option value="Div. 4">Div. 4</option>
          <option value="Div. 1 + Div. 2">Div. 1 + Div. 2</option>
        </select>
      </label>
      <br />
      <button onClick={fetchContest}>Fetch Contest</button>

      {/* Display the contest link if available */}
      {contestLink && (
        <div>
          <h3>Contest Link:</h3>
          <a href={contestLink} target="_blank" rel="noopener noreferrer">
            {contestLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContestForm;