const links = [];

function handleMenuChoice(choice) {
  hideAll();

  switch (choice) {
    case 'show':
      showLinks();
      break;
    case 'add':
      document.getElementById('formContainer').classList.remove('hidden');
      break;
    case 'remove':
      renderRemovableLinks();
      break;
    case 'quit':
      document.getElementById('exitMessage').classList.remove('hidden');
      break;
  }
}

function submitNewLink() {
  const title = document.getElementById('titleInput').value.trim();
  let url = document.getElementById('urlInput').value.trim();
  const author = document.getElementById('authorInput').value.trim();

  if (!title || !url || !author) {
    alert("All fields are required.");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  links.push({ title, url, author });
  alert("Link added successfully!");
  clearForm();
  returnToMenu();
}

function showLinks() {
  const display = document.getElementById('linksDisplay');
  display.innerHTML = "";

  if (links.length === 0) {
    display.innerHTML = "<p>No links available.</p>";
  } else {
    links.forEach((link, index) => {
      const card = document.createElement("div");
      card.className = "link-card";
      card.innerHTML = `<strong>${index + 1}. <a href="${link.url}" target="_blank">${link.title}</a></strong><br><small>Author: ${link.author}</small>`;
      display.appendChild(card);
    });
  }

  document.getElementById('linkList').classList.remove('hidden');
}

function renderRemovableLinks() {
  const container = document.getElementById('removeLinksDisplay');
  container.innerHTML = "";

  if (links.length === 0) {
    alert("No links to remove.");
    return returnToMenu();
  }

  links.forEach((link, index) => {
    const btn = document.createElement("button");
    btn.textContent = `${index + 1}. ${link.title}`;
    btn.onclick = () => {
      if (confirm(`Are you sure you want to remove "${link.title}"?`)) {
        links.splice(index, 1);
        alert("Link removed.");
        returnToMenu();
      }
    };
    container.appendChild(btn);
  });

  document.getElementById('removeLinkContainer').classList.remove('hidden');
}

function returnToMenu() {
  hideAll();
  document.getElementById('menu').classList.remove('hidden');
}

function clearForm() {
  document.getElementById('titleInput').value = "";
  document.getElementById('urlInput').value = "";
  document.getElementById('authorInput').value = "";
}

function hideAll() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('formContainer').classList.add('hidden');
  document.getElementById('linkList').classList.add('hidden');
  document.getElementById('removeLinkContainer').classList.add('hidden');
  document.getElementById('exitMessage').classList.add('hidden');
}
