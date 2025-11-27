import { Component } from 'react';
import './MyProfile.css';

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: '',
        email: '',
        phone: '',
        about: '',
        github: '',
        linkedin: ''
      },
      isEditable: false,
    };
  }

  componentDidMount() {
    const loginUser = localStorage.getItem("loginUser"); // logged in user's email or username
    const savedProfile = JSON.parse(localStorage.getItem("profile"));

    // If profile exists AND belongs to the logged-in user → load it
    if (savedProfile && savedProfile.email === loginUser) {
      this.setState({ profile: savedProfile });
    } else {
      // Load raw login data instead (first time user opens MyProfile)
      const name = localStorage.getItem("name") || "";
      const email = localStorage.getItem("email") || "";
      const phone = localStorage.getItem("phone") || "";

      this.setState({
        profile: {
          ...this.state.profile,
          name,
          email,
          phone
        }
      });
    }
  }

  toggleEdit = () => {
    this.setState(prev => ({ isEditable: !prev.isEditable }));
  };

  handleProfileChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      profile: { ...this.state.profile, [name]: value }
    });
  };

  saveProfile = () => {
    const p = this.state.profile;

    // Save to profile
    localStorage.setItem("profile", JSON.stringify(p));

    // Keep login information updated and sync with edited profile
    localStorage.setItem("name", p.name);
    localStorage.setItem("email", p.email);
    localStorage.setItem("phone", p.phone);
    localStorage.setItem("loginUser", p.email);  // Required so next login matches the profile

    this.setState({ isEditable: false });
  };

  render() {
    const { profile, isEditable } = this.state;

    return (
      <div className="my-profile-container">
        <h2 className="myprofile-heading">My Profile</h2>

        <div className="my-profile-details">
          <div className="profile-field">
            <p><strong>Name:</strong> {isEditable ? <input type="text" name="name" value={profile.name} onChange={this.handleProfileChange} /> : profile.name}</p>
          </div>

          <div className="profile-field">
            <p><strong>Email:</strong> {isEditable ? <input type="email" name="email" value={profile.email} onChange={this.handleProfileChange} /> : profile.email}</p>
          </div>

          <div className="profile-field">
            <p><strong>Phone:</strong> {isEditable ? <input type="text" name="phone" value={profile.phone} onChange={this.handleProfileChange} /> : profile.phone}</p>
          </div>

          <div className="profile-field">
            <p><strong>About:</strong> {isEditable ? <textarea name="about" value={profile.about} onChange={this.handleProfileChange} /> : profile.about}</p>
          </div>

          <div className="profile-field">
            <p><strong>Github:</strong> {isEditable ? <input type="text" name="github" value={profile.github} onChange={this.handleProfileChange} /> : profile.github}</p>
          </div>

          <div className="profile-field">
            <p><strong>LinkedIn:</strong> {isEditable ? <input type="text" name="linkedin" value={profile.linkedin} onChange={this.handleProfileChange} /> : profile.linkedin}</p>
          </div>

          <div className="profile-buttons">
            <button onClick={this.toggleEdit}>{isEditable ? 'Cancel' : 'Edit'}</button>
            {isEditable && <button onClick={this.saveProfile}>Save</button>}
          </div>
        </div>
      </div>
    );
  }
}
