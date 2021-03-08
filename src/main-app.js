let alignBoxes;
let charBoxes;
let charSelected = -1;
let charObj;
let characterSet;

const handleResponse = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object

  charObj = obj;
  // add character images to boxes
  const cboxes = document.querySelectorAll('.cbox');
  for (let i = 0; i < obj.length; i += 1) {
    const image = document.createElement('img');
    image.src = obj[i].img;
    cboxes[i].appendChild(image);
  }
};

const getMediaOnly = (e) => {
  const obj = JSON.parse(e.target.response); // turn it back into an object
  const medArray = [];

  for (let i = 0; i < obj.length; i += 1) {
    if (!medArray.includes(obj[i].media)) {
      medArray.push(obj[i].media); 
    }
  }
  for (let i = 0; i < medArray.length; i += 1) {
    const option = document.createElement('option');
    option.innerHTML = medArray[i];
    characterSet.appendChild(option);
  }
};

const boxReset = () => {
  for (let i = 0; i < alignBoxes.length; i += 1) {
    alignBoxes[i].style.backgroundColor = 'green';
  }
  for (let i = 0; i < charBoxes.length; i += 1) {
    // charBoxes[i].style.backgroundColor = 'blue';
    // going to do this more elegantly later
    if (charBoxes[i].getElementsByTagName('img').length > 0) {
      // charBoxes[i].getElementsByTagName('img')[0].style.backgroundColor = 'blue';
    }
  }
};

const alignClicked = (e) => {
  // box on alignment chart was selected

  boxReset();
  if (charSelected > -1) {
    const image = document.createElement('img');
    image.src = charObj[charSelected].img;
    e.target.appendChild(image);
  }
};

const charClicked = (e) => {
  // character was selected

  boxReset();

  e.target.style.backgroundColor = 'red';
  for (let i = 0; i < charBoxes.length; i += 1) {
    if (e.target === charBoxes[i].getElementsByTagName('img')[0]) {
      charSelected = i;
    }
  }
};

const getCharSet = (set = 'Spongebob') => {
  const jokeURL = '/get-characters';
  const fullURL = jokeURL.concat(`?set=${set}`);
  const xhr = new XMLHttpRequest();
  if (set !== 'All') {
    xhr.onload = handleResponse;
  } else {
    xhr.onload = getMediaOnly;
  }
  xhr.open('GET', fullURL);
  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const resetChars = () => {
  for (let i = 0; i < charBoxes.length; i += 1) {
    charBoxes[i].innerHTML = '';
  }
  getCharSet(characterSet.options[characterSet.selectedIndex].text);
};

const init = () => {
  getCharSet();
  // An Event *Listeners*
  alignBoxes = document.querySelectorAll('.box');
  for (let i = 0; i < alignBoxes.length; i += 1) {
    alignBoxes[i].addEventListener('click', alignClicked);
  }
  charBoxes = document.querySelectorAll('.cbox');
  for (let i = 0; i < charBoxes.length; i += 1) {
    charBoxes[i].addEventListener('click', charClicked);
  }

  characterSet = document.querySelector('#characterSet');
  characterSet.addEventListener('change', resetChars);
  getCharSet('All');
};

window.onload = init;
