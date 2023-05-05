export default async function fetcher(
  input,
  init
) {
  const response = await fetch(input, init)

  const data = await response.json()

  if (response.ok) {
    return data
  }

  throw new Error(response.statusText)
}