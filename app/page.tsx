
import MainForm from "@/components/MainForm";
import { CarsList } from "@/lib/types";

export default async function Home() {
  const response =  await fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList', {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const cars : CarsList = data.data;

  return (
    <main className="prose max-w-6xl lg:w-full justify-center mx-auto">
    
          <MainForm cars={cars} />
    </main>
  );
}