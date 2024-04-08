export async function apiGetAll() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users?limit=0`);
    return (await response.json()).users;
  } catch (e) {
    console.log(e);
    return [];
  }
}
