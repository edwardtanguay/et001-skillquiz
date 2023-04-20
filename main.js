import './style.scss';
import axios from 'axios';

const config = {
	numberOfQuestions: 5,
	displayingExtraInfo: false,
	correctSkill: null
};

const jobsUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';

(async () => {
	const jobs = (await axios.get(jobsUrl)).data;
	const skills = (await axios.get(skillsUrl)).data;

	const getJobAdHtml = (skill) => {
		const jobHtmlBlocks = skill.jobs.map(
			(job) =>
				`<span><a target="_blank" href="${job.url}">${job.title} at ${job.company}</a></span>`
		);
		return jobHtmlBlocks.join('<span> &#x2022; </span>');
	};

	const displaySkill = (skill) => {
		let html = '';
		html += `
<div class="skill">
    <div class="name">${skill.name}</div>
	<div class="extraInfo" style="display:none">
		<div class="description">${skill.description}</div>
		<div class="learnLinks">
			<a target="_blank" href="${skill.url}" class="learnLink">GENERAL INFO</a>
			<div class="separator">&#x2022;</div>
			<div>English:</div>
			<a target="_blank" href="https://www.google.com/search?q=${
				skill.name
			}+web+development" class="learnLink">articles</a>
			<a target="_blank" href="https://www.youtube.com/results?search_query=web+development+${
				skill.name
			}" class="learnLink">videos</a>
			<div class="separator">&#x2022;</div>
			<div>German:</div>
			<a target="_blank" href="https://www.google.com/search?q=${
				skill.name
			}+web+development+deutsch" class="learnLink">articles</a>
			<a target="_blank" href="https://www.youtube.com/results?search_query=web+development+deutsch+${
				skill.name
			}" class="learnLink">videos</a>
		</div>
		<div class="jobAds">
		<span class="intro">${
			skill.jobs.length === 1
				? '1 job ad'
				: skill.jobs.length + ' job ads'
		}: </span>
			${getJobAdHtml(skill)}	
		</div>
	</div>
</div>
 `;
		return html;
	};

	const determineCorrectAnswer = (randomSkills) => {
		const randomIndex = Math.floor(Math.random() * randomSkills.length);
		config.correctSkill = randomSkills[randomIndex];
	};

	const getJobsForSkill = (skill) => {
		return jobs.filter((job) => {
			const skillIdCodes = job.skillList.split(',');
			for (const skillIdCode of skillIdCodes) {
				if (skill.idCode === skillIdCode.trim()) {
					return job;
				}
			}
		});
	};

	const getQuizSkills = () => {
		const randomSkills = [];
		for (let i = 0; i < config.numberOfQuestions; i++) {
			const randomIndex = Math.floor(Math.random() * skills.length);
			const randomSkill = skills[randomIndex];
			randomSkill.jobs = getJobsForSkill(randomSkill);
			randomSkills.push(randomSkill);
		}
		determineCorrectAnswer(randomSkills);
		return randomSkills;
	};

	const displayQuizHtml = () => {
		let html = '<div class="quizArea">';
		for (const skill of getQuizSkills()) {
			html += displaySkill(skill);
		}
		html += '</div>';
		return html;
	};

	const attachEvents = () => {
		const btnToggleAnswersElem =
			document.querySelector('.btnToggleAnswers');
		btnToggleAnswersElem.addEventListener('click', () => {
			const extraInfoElems = document.querySelectorAll('.extraInfo');
			config.displayingExtraInfo = !config.displayingExtraInfo;
			extraInfoElems.forEach((elem) => {
				if (config.displayingExtraInfo) {
					elem.style.display = 'block';
				} else {
					elem.style.display = 'none';
				}
			});
		});

		const answerElem = document.querySelector('.answer');
		answerElem.innerText = config.correctSkill.description;
	};

	document.querySelector('#app').innerHTML = `
  <div>
  <h1>Webdev Skill Quiz</h1>
  <div class="commandArea">
    <button class="btnToggleAnswers">Toggle Answers</button>
	<div class="answer"></div>
  </div>
  ${displayQuizHtml()}
  </div>
`;

	attachEvents();
})();
