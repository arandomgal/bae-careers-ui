import { useState, useEffect, useCallback } from "react";
import JobInfo from "./components/JobInfo";
import Search from "./components/Search";

function App() {
  let [jobList, setJobList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("title");
  let [orderBy, setOrderBy] = useState('asc');

  const filteredJobList = jobList.filter(
    job => {
      return (
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  ).sort(
    (a, b) => {
      let order = (orderBy === 'asc') ? 1 : -1;
      return (
        a[sortBy] < b[sortBy] ? -1 * order : 1 * order
      );
    }
  );

  const fetchData = useCallback(
    () => {
      fetch('http://api.careers.baesystems.com:30003/jobs')
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

    <div className="flex justify-center items-center pt-12">
    {filteredJobList.length} job(s) found
    </div>

    <div className="ml-10 mr-10 mt-10">
      <Search query={query}
        onQueryChange={myQuery => setQuery(myQuery)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)}
        orderBy={orderBy}
        onOrderByChange={myOrder => setOrderBy(myOrder)}  
      />
      <ul className="divide-y divide-gray-200">
        {filteredJobList
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
