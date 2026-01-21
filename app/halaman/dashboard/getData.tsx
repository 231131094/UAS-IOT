async function getSensordata() {
  const res = await fetch(
    "https://project-uas-b500e-default-rtdb.asia-southeast1.firebasedatabase.app/sensor.json",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Gagal Ambil Data");
  }
  return res.json();
}
export default async function getData() {
    const data = await getSensordata()
    return data;
}