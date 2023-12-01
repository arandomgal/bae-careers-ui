const JobInfo = ({ job }) => {
    return (
        <li className="px-3 py-3 flex items-start">
            <div className="flex-grow">
                <div className="flex items-center">
                    <span className="flex-none font-medium text-2xl text-black">{job.title}</span>
                    <span className="flex-grow text-right">{job.code}</span>
                </div>
                <div><b className="font-bold text-gray-600">Location:</b> {job.location}</div>
                <div><b className="font-bold text-gray-600">Level:</b> {job.level}</div>
                <div><b className="font-bold text-gray-600">Mode:</b> {job.mode}</div>
                <div><b className="font-bold text-gray-600">Starting Salary:</b> ${job.salary}</div>
                <div className="leading-tight mt-2">{job.description}</div>
            </div>
        </li>
    );
}

export default JobInfo;