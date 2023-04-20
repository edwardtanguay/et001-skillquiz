import './style.scss';
import axios from 'axios';

const config = {
	numberOfQuestions: 5,
	displayingDescriptions: false,
	correctSkill: null
};

const jobsUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';

const jobs = (await axios.get(jobsUrl)).data;
const skills = (await axios.get(skillsUrl)).data;

const displaySkill = (skill) => {
	let html = '';
	html += `
<div class="skill">
    <div class="name">${skill.name}</div>
    <div class="description" style="display:none">${skill.description}</div>
</div>
 `;
	return html;
};

const determineCorrectAnswer = (randomSkills) => {
	const randomIndex = Math.floor(Math.random() * randomSkills.length);
	config.correctSkill = randomSkills[randomIndex];
}

const getQuizSkills = () => {
	const randomSkills = [];
	for (let i = 0; i < config.numberOfQuestions; i++) {
		const randomIndex = Math.floor(Math.random() * skills.length);
		randomSkills.push(skills[randomIndex]);
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
	const btnToggleAnswersElem = document.querySelector('.btnToggleAnswers');
	btnToggleAnswersElem.addEventListener('click', () => {
		const descriptionElems = document.querySelectorAll('.description');
		config.displayingDescriptions = !config.displayingDescriptions;
		descriptionElems.forEach((elem) => {
			if (config.displayingDescriptions) {
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
