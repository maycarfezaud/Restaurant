const burger = document.querySelector('.burger');
const navItems = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-items li');
const line11 = document.querySelector('.line11');
const line22 = document.querySelector('.line22');
const line33 = document.querySelector('.line33');

burger.addEventListener('click', () => {
  // Ajoute ou supprime la classe "nav-active" du menu de navigation
  navItems.classList.toggle('nav-active');
  line11.classList.toggle('line1');
  line22.classList.toggle('line2');
  line33.classList.toggle('line3');

  // Anime chaque lien du menu de navigation un par un
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Anime l'icône du hamburger
  burger.classList.toggle('toggle');
});

// register
// const passworFiel = document.getElementById('new-password');
// const passwordConfim = document.getElementById('password-confirm');
// const form = document.getElementById('register');

// function validationForm() {
//   if (passworFiel.value != passwordConfim.value) {
//     alert('mot de passe non conforme');
//   } else {
//     form.submit();
//   }
// }

// creeation de booking booking

// document
//   .querySelector('#bookingSubmit')
//   .addEventListener('click', async function (event) {
//     event.preventDefault();
//     var nom = document.querySelector('#booking-nom');
//     var email = document.querySelector('#booking-email');
//     var date = document.querySelector('#booking-date');
//     var plat = document.querySelector('#booking-plat');
//     var heure = document.querySelector('#booking-heure');

//     var data = {
//       nom: nom.value,
//       email: email.value,
//       date: date.value,
//       plat: plat.value,
//       heure: heure.value,
//     };
//     const response = await fetch('/api/orders', {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify({ nom: 'yao', prenom: 'kouakou' }), // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   });

document
  .querySelector('#bookingSubmit')
  .addEventListener('click', function (event) {
    event.preventDefault();
    var button = event.target;
    var nom = document.querySelector('#booking-nom');
    var email = document.querySelector('#booking-email');
    var date = document.querySelector('#booking-date');
    var plat = document.querySelector('#booking-plat');
    var heure = document.querySelector('#booking-heure');

    var data = {
      nom: nom.value,
      email: email.value,
      date: date.value,
      plat: plat.value,
      heure: heure.value,
    };

    const datas = JSON.stringify(data);

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: datas,
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', '/api/reservation');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.onload = function () {
    //   if (xhr.status === 200) {
    //     var results = JSON.parse(xhr.responseText);
    //     var html = createPostHtml(results);
    //     document
    //       .querySelector('#cardPost')
    //       .insertAdjacentHTML('afterbegin', html);
    //     textBox.value = '';
    //     button.disabled = true;
    //   }
    // };
    // xhr.send(JSON.stringify(data));
  });

// get user plat
