const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const typeSel = document.getElementById('typeSelect');
const desc = document.getElementById('descInput');
//const prioSel = document.getElementById('prioSelect');

const TODOIST_TOKEN = localStorage.getItem('todoist_token');

if (!TODOIST_TOKEN) {
  const token = prompt('Enter Todoist API Token:');
  localStorage.setItem('todoist_token', token);
  location.reload();
}

const PROJECTS = {
  todo:  '6f4xqGmcc4fpXq93',
  buy:   '6f4xqMPxccrhPpgH',
  watch: '6f4xqPrQ4qHWxhpM',
  talk:  '6f4xqV4M3JVH8XgF',
  idea:  '6f4xqXVjpcpJCCwP'
};

const templates = {
  todo:  text => ({ text, type:'todo' }),
  buy:   text => ({ text, type:'buy' }),
  watch: text => ({ text, type:'watch' }),
  talk:  text => ({ text, type:'talk' }),
  idea:  text => ({ text, type:'idea' })
};

async function addToTodoist(payload) {
  const { text, type, desc, priority } = payload;
  const projectId = PROJECTS[type];
  await fetch("https://api.todoist.com/rest/v2/tasks", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TODOIST_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: text,
      description: desc,
      priority,
      project_id: projectId
    })
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = input.value.trim();
  const descText = desc.value.trim();
  const type = typeSel.value;
  const priority = "2"; //parseInt(prioSel.value, 10);
  if (!text || !type) return alert('Please select a type.');

  const payload = templates[type](text);
  input.value = '';
  desc.value = '';
  typeSel.value = '';     // ← resets the dropdown
  await addToTodoist({ ...payload, desc: descText, priority });
});

// ---- service worker ----
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
