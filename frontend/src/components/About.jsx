import React from 'react';


const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">About Fundzz</h1>
      <div className="about-content">
        <h2 className="about-subheading">Our Mission</h2>
        <p className="about-paragraph">
          Fundzz is dedicated to creating a sustainable ecosystem where individuals and organizations can
          support meaningful causes. We connect passionate backers with campaign creators, enabling change
          and making a real impact.
        </p>
        <h2 className="about-subheading">Our Vision</h2>
        <p className="about-paragraph">
          Our vision is to empower grassroots campaigns, support innovative ideas, and provide a platform
          for fundraisers to reach their goals effectively and efficiently. We believe in fostering a community
          of giving, transparency, and success.
        </p>

        <h2 className="about-subheading">Meet the Team</h2>
        <div className="team-section">
          <div className="team-member">
            <img src="team-member-1.jpg" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="team-member-2.jpg" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Chief Marketing Officer</p>
          </div>
          <div className="team-member">
            <img src="team-member-3.jpg" alt="Team Member 3" />
            <h3>Sam Wilson</h3>
            <p>Product Manager</p>
          </div>
        </div>

        <a href="#contact" className="cta-btn">Contact Us</a>
      </div>
    </div>
  );
};

export default About;
