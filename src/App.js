import { useEffect, useState } from "react";
import "./App.css";

// Questions:
// 1. Load data from local file (path: “https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json”)
// 2. Use the screenshot as an example, implement a generic function for reading any JSON file in that format, then display the top 12 brands based on audience_size. We always want to have 4 items in one row.
// 3. Add a hover state with a dark, semi-transparent overlay and display the ID of the hovered brand.

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json")
      .then((res) => res.json())
      .then(({ data }) => {
        // Sort by audience_size, in descending order
        setData(data.sort((a, b) => b.source_items.audience_size - a.source_items.audience_size))
      });
  }, []);

  return (
    <div className="App">
      <div className="audiences">
        {data.map(item => (
          <div key={item.name} className="audience-logo">
            {/* Logo image */}
            <img src={item.social_media_pages?.picture} alt={item.social_media_pages?.name} />
            {/* dark, semi-transparent overlay */}
            <div className="audience-overlay">
              {item.source_items.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
