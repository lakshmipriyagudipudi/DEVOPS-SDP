import { Component } from 'react';
import { callApi } from './api.js';
import './JobSearch.css'; 

export default class JobSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchTitle: '',
      joblist: [],
      filteredJobs: [],
      showResults: false,
      showPopup: false,
      selectedJob: null,
      applicantName: '',
      applicantEmail: '',
      resumeLink: ''
    };

    this.readJobsResponse = this.readJobsResponse.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleApplyClick = this.handleApplyClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handlePopupInputChange = this.handlePopupInputChange.bind(this);
    this.handleSubmitApplication = this.handleSubmitApplication.bind(this);
  }

  componentDidMount() {
    callApi("GET", "http://localhost:8087/jobs/readjob", null, this.readJobsResponse);
  }

  readJobsResponse(res) {
    if (res.includes("401::")) {
      alert(res.split("::")[1]);
      return;
    }

    try {
      const data = JSON.parse(res);
      this.setState({ joblist: data });
    } catch (e) {
      console.error("Failed to parse job data:", e);
    }
  }

  handleInputChange(event) {
    this.setState({ searchTitle: event.target.value });
  }

  handleSearch() {
    const { searchTitle, joblist } = this.state;
    const lowerSearch = searchTitle.toLowerCase();

    const filtered = joblist.filter(job =>
      job?.title?.toLowerCase().includes(lowerSearch)
    );

    this.setState({ filteredJobs: filtered, showResults: true });
  }

  handleApplyClick(job) {
    this.setState({ showPopup: true, selectedJob: job });
  }

  closePopup() {
    this.setState({ showPopup: false, selectedJob: null });
  }

  handlePopupInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmitApplication() {
    const { applicantName, applicantEmail, resumeLink, selectedJob } = this.state;
    console.log("Applying to:", selectedJob.title);
    console.log("Name:", applicantName);
    console.log("Email:", applicantEmail);
    console.log("Resume Link:", resumeLink);
    alert("Application submitted successfully!");
    this.setState({
      showPopup: false,
      selectedJob: null,
      applicantName: '',
      applicantEmail: '',
      resumeLink: ''
    });
  }

  render() {
    const {
      searchTitle, filteredJobs, showResults,
      showPopup, selectedJob,
      applicantName, applicantEmail, resumeLink
    } = this.state;

    return (
      <div className="JPContainer">
        <h2>Job Search</h2>
        <input
          type="text"
          placeholder="Enter job title"
          value={searchTitle}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>

        {showResults && (
          <div className="results">
            {filteredJobs.map((job, index) => (
              <div key={index} className="result">
                <h4>{job.title || 'No title'}</h4>
                <p><b>Company:</b> {job.company || 'N/A'}</p>
                <p><b>Location:</b> {job.location || 'N/A'}</p>
                <p><b>Type:</b> {job.jobtype === "1" ? "Full-time" : "Part-time"}</p>
                <p><b>Salary:</b> {job.salary || 'N/A'}</p>
                <p><b>Description:</b> {job.description || 'No description'}</p>
                <button className="applybtn" onClick={() => this.handleApplyClick(job)}>Apply</button>
              </div>
            ))}
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popupwindow">
              <div className="popupheader">
                Apply for {selectedJob?.title}
                <span onClick={this.closePopup}>&times;</span>
              </div>
              <div className="popupcontent">
                <label>Name:</label>
                <input
                  name="applicantName"
                  value={applicantName}
                  onChange={this.handlePopupInputChange}
                  type="text"
                />
                <label>Email:</label>
                <input
                  name="applicantEmail"
                  value={applicantEmail}
                  onChange={this.handlePopupInputChange}
                  type="email"
                />
                <label>Resume Link:</label>
                <input
                  name="resumeLink"
                  value={resumeLink}
                  onChange={this.handlePopupInputChange}
                  type="url"
                />
                <button onClick={this.handleSubmitApplication}>Submit Application</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
