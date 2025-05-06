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
    return fetch(`${API_URL}/users/me`, {
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
}


export function addNewCardOnServer(name, link) {
    return fetch(`${API_URL}/cards`, {
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
}


export function deleteCardOnServer(cardId) {
    return fetch(`${API_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: AUTH_HEADER.authorization
        }
      })
}

export function updateProfileAvatarOnServer(avatarLink) {
    return fetch(`${API_URL}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: AUTH_HEADER.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatarLink,
        })
      })
}

export function addLikeOnServer(cardId) {
    return fetch(`${API_URL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: AUTH_HEADER.authorization
        }
      })
}

export function deleteLikeOnServer(cardId) {
    return fetch(`${API_URL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: AUTH_HEADER.authorization
        }
      })
}