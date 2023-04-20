import './style.scss';
import axios from 'axios';

const jobsUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';

const jobs = (await axios.get(jobsUrl)).data;
console.log(jobs);

document.querySelector('#app').innerHTML = `
  <div>
  <h1>Webdev Skill Quiz</h1>
  <p>Welcome to this site.</p>
  </div>
`;
