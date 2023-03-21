document.addEventListener('DOMContentLoaded', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/orders');
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      createAllPostHtml(data, document.querySelector('#tablelist'));
    }
  };
  xhr.send();
});

// Envoyer une requête GET au serveur

function createAllPostHtml(data, container) {
  container.innerHTML = '';

  data.forEach(function (results) {
    const html = createPostHtml(results);
    container.insertAdjacentHTML('beforeend', html);
  });

  if (data.length == 0) {
    container.insertAdjacentHTML(
      'beforeend',
      '<span>Aucun résultat trouvé</span>'
    );
  }
}

function createPostHtml(results) {
  const dateObj = new Date(results.date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // les mois commencent à 0, donc nous ajoutons 1
  const year = dateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return `<tr>
  <td>${results.nom}</td> 
  <td>${formattedDate}</td>
  <td>${results.heure}</td>
  <td>${results.plat}</td>
</tr>`;
}
