const repoList = document.getElementById('repo-list');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');

async function loadStarredRepositories() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Failed to load events.json: ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    showError(error.message);
  } finally {
    loadingElement.style.display = 'none';
  }
}

function renderRepositories(repositories) {
  if (!Array.isArray(repositories) || repositories.length === 0) {
    repoList.innerHTML = '<li>No starred repositories found.</li>';
    return;
  }

  repoList.innerHTML = repositories
    .map(repo => `
      <li>
        <a class="repo-name" href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        <p class="repo-description">${repo.description}</p>
        <p class="repo-meta">Starred at ${new Date(repo.starredAt).toLocaleDateString()}</p>
      </li>
    `)
    .join('');
}

function showError(message) {
  errorElement.textContent = `Error loading starred repositories: ${message}`;
  errorElement.style.display = 'block';
}

loadStarredRepositories();
