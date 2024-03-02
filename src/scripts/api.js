/** @module api */

/**
 * @description Объект с моими данными
 */
export const myObjKey = {
    token: '4cb686d8-7214-48c9-826e-78f0f3151ab3',
    idCohort: 'wff-cohort-8',
    myId: 'e8cdee4fb83a9c055a74ff75'
}

/**
 * @description Объект с конфигом для запросов на сервер
 */
export const config = {
    baseUrl: `https://nomoreparties.co/v1/${myObjKey.idCohort}`,
    headers: {
        authorization: myObjKey.token,
        'Content-Type': 'application/json'
    }
}

/**
 * 
 * @returns { Promise<Response> }
 * @description запрос на получение карточек
 */
export const getCards = async () => {
    const res = await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    if (!res.ok) {
        throw new Error('Error occurred!')
    }
    return await res.json()
}

/**
 * 
 * @returns { Promise<Response> } 
 * @description запрос на получение своего профиля
 */
export const getProfile = async () => {
    const res = await fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    if (!res.ok) {
        throw new Error('Error occurred!')
    }
    return await res.json()
}

/**
 * 
 * @returns { Promise<Response> }
 * @description Загрузка карточки и профиля
 */
export const loadPage = async () => {
    const res = await Promise.all([getCards(), getProfile()])
    return res
}

/**
 * 
 * @param { object } card Объект карточки
 * @returns { Promise<Response> }
 * @description Запрос на создание новой карточки
 */
export const setNewCard = async (card) => {
    const res = await fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card)
    })
    if (!res.ok) {
        throw new Error('Error occurred!')
    }
    return await res.json()
}

/**
 * 
 * @param { object } card Объект карточки
 * @returns { Promise<Response> }
 * @description Запрос на удаление карточки
 */
export const setDeliteCard = async (card) => {
    const res = await fetch(`${config.baseUrl}/cards/${card}`, {
        method: 'DELETE',
        headers: config.headers
    })
    if (!res.ok) {
        throw new Error('Error occurred!')
    }
    return await res.json()
}

/**
 * 
 * @param { object } profile Объект профиля
 * @returns { Promise<Response> }
 * @description Запрос на редактирование профиля
 */
export const setEditProfile = async (profile) => {
    const res = await fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profile)
    })
    if (!res.ok) {
        throw new Error('Error occurred!')
    }
    return await res.json()
}

/**
 * 
 * @param { Text } avatar Ссылка на картинку
 * @returns { Promise<Response> }
 * @description запрос на редактирование аватарки профиля
 */
export const setEditAvatar = async (avatar) => {
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    })
    if (!res.ok) {
        console.log(res)
        throw new Error('Error occurred!')
    }
    return await res.json()
}

/**
 * 
 * @param { Text } method Метод fetch запроса
 * @param { Text } elemId id карточки
 * @returns { Promise<Response> }
 * @description Запрос на добавление или удаление лайка
 */
export const setLikes = async (method, elemId) => {
    const res = await fetch(`${config.baseUrl}/cards/likes/${elemId}`, {
        method: method,
        headers: config.headers,
    })
    if (!res.ok) {
        throw new Error('Error occurred!')
    }
    return await res.json()
}