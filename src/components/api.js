const API_URL = 'https://nomoreparties.co/v1/wff-cohort-37';
const AUTH_HEADER = {
  authorization: 'bb1d456e-eba6-4c51-b0d8-becd4ada6370'
};


export function fetchUserData() {
    return fetch(`${API_URL}/users/me`, {
      headers: AUTH_HEADER
    }).then(res => res.json());
  }
  
export function fetchCards() {
    return fetch(`${API_URL}/cards`, {
      headers: AUTH_HEADER
    }).then(res => res.json());
  }



export function updateProfileDetialsOnServer(name, job) {
    fetch('https://nomoreparties.co/v1/wff-cohort-37/users/me', {
        method: 'PATCH',
        headers: {
          authorization: AUTH_HEADER.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
      .catch(err => console.log(err));
}


export function addNewCardOnServer(name, link) {
    fetch('https://nomoreparties.co/v1/wff-cohort-37/cards', {
        method: 'POST',
        headers: {
          authorization: AUTH_HEADER.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .catch(err => console.log(err));
}


export function deleteCardOnServer(cardId) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: AUTH_HEADER.authorization
        }
      })
      .catch(err => console.log(err));
}