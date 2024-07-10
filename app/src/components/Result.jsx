import React, { useState, useEffect } from "react";

const Result = () => {
  const [data, setData] = useState([]);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based, so add 1
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ date: currentDate }) // replace with the actual date or dynamic value
      });
      const result = await response.json();
      if (response.ok) {
        setData(result.totalUsers);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // fetch data initially
    const intervalId = setInterval(fetchData, 10000); // fetch data every 10 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []); // empty dependency array ensures this runs only once on mount

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col relative rounded-md p-4">
      <h1 className="text-center text-2xl mb-4">Results</h1>
      <div className="overflow-auto">
        <table className="min-w-full bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-600">Rank</th>
              <th className="py-2 px-4 border-b-2 border-gray-600">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-600">Entry Number</th>
              <th className="py-2 px-4 border-b-2 border-gray-600">Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => a.time - b.time)
              .map((user, index) => (
                <tr key={user.entryNumber}>
                  <td className="py-2 px-4 border-b border-gray-600">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{user.entryNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{user.time}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
