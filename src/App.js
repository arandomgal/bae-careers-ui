import { useState, useEffect, useCallback } from "react";
import JobInfo from "./components/JobInfo";

function App() {
  let [jobList, setJobList] = useState([]);

  const fetchData = useCallback(
    () => {
      fetch('./data.json')
        .then(response => response.json())
        .then(data => { setJobList(data._embedded.jobs) });
    }, []
  );

  useEffect(() => { fetchData() }, [fetchData]);

  return (
    <>
    <div className="flex justify-center items-center pt-12">
      <img src="./logo.png" alt="BAE logo" />
    </div>

    <div className="ml-10 mr-10 mt-10">
      <hr />
      <ul className="divide-y divide-gray-200">
        {jobList
          .map(job => (
            <JobInfo key={job.id} job={job}/>
          ))
        }
      </ul>
    </div>
    </>
  );
}

export default App;
