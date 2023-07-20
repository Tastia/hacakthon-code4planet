import axios from 'axios';
import './style.scss';
import 'destyle.css';

const button = document.getElementById('button');
const page_formular = document.getElementById('page-formular');
const page_list = document.getElementById('page-list');

const name = document.getElementById('company');
const title = document.getElementById('job-title');
const desc = document.getElementById('job-desc');
const type = document.getElementById('job-type');
const job = document.getElementById('job');
const subject = document.getElementById('job-subject');
const xp = document.getElementById('xp');

const resultsContainer = document.getElementById('results-container');

console.log(button);

function buildList(data) {
  console.log(data);
  data.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('result');
    itemElement.innerHTML = `
    <img
      class="profile"
      src="${item.avatar}"
      alt="Photo de profil"
    />
    <div class="infos">
        <div class="id">
            <img src="images/logo-ecole.png" alt="Logo école" />
            <div>
                <p class="name">${item.firstName} ${item.lastName}</p>
                <p class="title">
                    ${item.department} - 5ème année
                </p>
            </div>
        </div>
        <div class="tags">
            <span class="contract">${item.contract}</span>
            <span class="job">${item.jobs}</span>
            <span class="region">${item.activities}</span>
            <span class="exp">${item.experience} année${item.experience > 1 ? "s" : ""} d'expérience${item.experience > 1 ? "s" : ""}</span>
        </div>
    </div>`
    resultsContainer.appendChild(itemElement);
  });
}

button.addEventListener('click', () => {
  page_formular.classList.toggle('hidden');
  page_list.classList.toggle('hidden');

  const url = new URL("http://localhost:8082/api/student");
  if (type.value) url.searchParams.set('contract', type.value);
  if (job.value) url.searchParams.set('jobs', job.value);
  if (xp.value) url.searchParams.set('experience', xp.value);
  if (subject.value) url.searchParams.set('activities', subject.value);

  console.log(url.href);

  axios.get(url.href)
    .then(function (response) {
      buildList(response.data);
    })

  // console.log(name.value);
  // console.log(title.value);
  // console.log(desc.value);
  // console.log(type.value);
  // console.log(job.value);
  // console.log(subject.value);
  // console.log(xp.value);
});
