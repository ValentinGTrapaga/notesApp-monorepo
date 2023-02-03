const baseUrl = '/api/login'

export const login = async (credentials) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    return response.json()
  } catch (error) {
    return error
  }
}
