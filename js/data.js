// ------------------------------------------------------------------
//  All portfolio content lives here. Edit this file and the site updates.
// ------------------------------------------------------------------

export const profile = {
  name: 'Nazneen Rahman',
  firstName: 'Nazneen',
  lastName: 'Rahman',
  role: 'Lead SQA Engineer',
  headline: ['Quality isn’t an act,', 'it’s a', 'habit.'],
  // Experience is counted live from this date.
  careerStart: { year: 2019, month: 6 },
  available: true,
  location: 'Dhaka, Bangladesh',
  linkedin: 'https://www.linkedin.com/in/rahmannazneen/',
  email: '', // e.g. 'you@example.com' - shown only when filled in
  resume: '', // put the PDF in /public and set e.g. 'Nazneen-Rahman-Resume.pdf'
  summary:
    'Certified Software Quality Assurance Engineer driving software quality through comprehensive test plans, Agile methodologies, automation and manual testing. Strong analytical and communication skills for seamless collaboration with developers and stakeholders.',
  about: [
    'I lead quality for a trading platform at Kona Software Lab, where I guide a team of SQA engineers from test planning through release.',
    'I combine hands-on automation (Selenium, Java, TestNG), API and performance testing, and clear communication, so teams ship faster and with confidence.',
  ],
  highlights: [
    { value: 50, suffix: '%', label: 'Less testing time through Selenium automation' },
    { value: 20, suffix: '%', label: 'Higher test coverage on critical flows' },
    { value: 50, suffix: '+', label: 'Releases managed end to end' },
    { value: 3, suffix: '', label: 'SQA engineers led' },
  ],
};

export const skills = [
  { title: 'Automation', items: ['Selenium', 'Java', 'TestNG', 'Jenkins'] },
  { title: 'API & Performance', items: ['Postman', 'RestAssured', 'JMeter', 'Elastic APM'] },
  { title: 'Test Management', items: ['TestRail', 'Jira', 'Test Planning', 'Regression & Smoke'] },
  { title: 'Collaboration', items: ['Git', 'GitLab', 'Confluence', 'Microsoft Teams'] },
  { title: 'Dev Tools & Data', items: ['IntelliJ IDEA', 'DataGrip', 'MongoDB Compass', 'SQL'] },
  { title: 'Architecture', items: ['Microservices', 'CI/CD', 'Agile / Scrum', 'Log Analysis'] },
];

export const experience = [
  {
    period: 'Apr 2023 — Present',
    role: 'Sr. SQA Engineer · Team Lead',
    org: 'Kona Software Lab Ltd.',
    place: 'Dhaka, Bangladesh',
    points: [
      'Led a team of 3 SQA engineers in designing, developing and executing comprehensive test plans for a trading platform.',
      'Automated critical tests with Selenium and Java, cutting testing time by 50% and raising test coverage by 20%.',
      'Used SQL queries for data analysis to find discrepancies and edge cases.',
      'Ran JMeter performance tests to analyse API responsiveness under high-volume trading simulations.',
      'Used Elastic APM to pinpoint performance bottlenecks and errors.',
      'Implemented CI/CD pipelines to automate testing and improve deployment efficiency.',
    ],
  },
  {
    period: 'Apr 2022 — Mar 2023',
    role: 'SQA Engineer',
    org: 'Kona Software Lab Ltd.',
    place: 'Dhaka, Bangladesh',
    points: [
      'Identified around 10 critical defects per sprint and tracked bugs and improvements in Jira.',
      'Took an active part in sprint planning, stand-ups and retrospectives.',
      'Drove test cycle completion with sanity, smoke, regression and acceptance testing.',
      'Tested backend services with Postman for functionality and security.',
      'Analysed server logs to deep-dive into defects.',
      'Partnered with developers on TestRail, boosting product quality by 25%.',
    ],
  },
  {
    period: 'Jun 2019 — Mar 2022',
    role: 'SQA Engineer',
    org: 'Fronture Technologies',
    place: 'Dhaka, Bangladesh',
    points: [
      'Managed test cycles for 50+ releases across all Quickly Services products, ensuring timely delivery and high quality.',
      'Improved QA pipeline efficiency for in-house and client projects, including WhatsForDinner, through restructuring.',
      'Championed quality delivery with rigorous testing and continuous regression cycles.',
    ],
  },
];

export const education = {
  school: 'American International University-Bangladesh',
  degree: 'B.Sc., Computer Science & Engineering',
  detail: 'Apr 2019 · Dhaka, Bangladesh · CGPA 3.66 / 4.00',
};

export const certification = {
  title: 'ISTQB® Certified Tester Foundation Level (CTFL)',
  issuer: 'International Software Testing Qualifications Board',
  detail: 'Issued Aug 2024',
  url: 'https://rb.gy/9f66ld',
};

// Lines for the animated test-report card in the hero.
export const testReport = [
  ['pass', 'Test strategy & planning'],
  ['pass', 'Automation · Selenium · TestNG'],
  ['pass', 'API & performance · Postman · JMeter'],
  ['pass', 'CI/CD quality gates'],
  ['pass', 'Leading & mentoring QA team'],
  ['warn', 'Coffee level low'],
];
