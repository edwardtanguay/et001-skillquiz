import './style.scss';
import axios from 'axios';

const jobsUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';

const getData = async () => {
	const response = await axios.get(jobsUrl);
	const jobs = response.data;
	console.log(jobs);
}

getData();

document.querySelector('#app').innerHTML = `
  <div>
  <h1>Webdev Skill Quiz</h1>
  <p>Welcome to this site.</p>
  </div>
`;
