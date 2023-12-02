import { useState, useEffect, useCallback } from "react";
import JobInfo from "./components/JobInfo";
import Search from "./components/Search";

function App() {
  let apiUrl = process.env.REACT_APP_CAREERS_REST_API_URL;
  console.log('From environment variable REACT_APP_CAREERS_REST_API_URL, apiUrl=', apiUrl);
  if (!apiUrl) {
    apiUrl = 'http://api.careers.baesystems.com:30003/jobs';
    console.log('No environmnent variable specified, use default apiUrl=', apiUrl);
  }

  let [jobList, setJobList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("title");
  let [orderBy, setOrderBy] = useState('asc');
  let [pageError, setPageError] = useState(null);
  let [pageLoading, setPageLoading] = useState(null);

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
      setPageLoading(true);
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => { setJobList(data._embedded.jobs) })
        .then(() => setPageLoading(false))
        .catch(fetchError => setPageError(fetchError));
    }, [apiUrl]
  );

  useEffect(() => { fetchData() }, [fetchData]);

  if (pageLoading) return (<h1>Loading...</h1>);
  if (pageError) return (<pre>{JSON.stringify(pageError)}</pre>);
  if (!jobList) return null;

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
