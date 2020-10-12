import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => token

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(baseUrl,newObject,config)
  return request.data
}

const like = async blogObject => {
  const request = await axios.patch(`${baseUrl}/${blogObject.id}`, { likes: blogObject.likes + 1 })
  return request.data
}

const destroy = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, setToken, create, like, destroy, getToken }