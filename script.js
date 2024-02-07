const searchButton = document.getElementById('search-button');
const usernameInput = document.getElementById('username');
const userInfoDiv = document.getElementById('user-info');

usernameInput.classList.add('user-input');
searchButton.classList.add('search-button');

searchButton.parentElement.style.display = 'flex';
searchButton.parentElement.style.justifyContent = 'center';

usernameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

searchButton.addEventListener('click', () => {
  const username = usernameInput.value;

  if (!username) {
    alert('Please enter a username');
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      userInfoDiv.innerHTML = '';

      userInfoDiv.classList.add('user-info-container');

      const avatar = document.createElement('img');
      avatar.src = data.avatar_url;
      avatar.classList.add('user-avatar');
      userInfoDiv.appendChild(avatar);

      const userInformation = [
        `Name: ${data.name || data.login}`,
        `Bio: ${data.bio || 'No bio available'}`,
        `Repositories: ${data.public_repos}`,
        `Followers: ${data.followers}`,
        `Following: ${data.following}`,
      ];
      const infoParagraphs = userInformation.map(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        paragraph.classList.add('user-info-text');
        return paragraph;
      });
      userInfoDiv.append(...infoParagraphs);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data!');
    });
});
