import Contact from "@/components/home/Contact/Contact";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center space-y-10 w-screen bg-[#f6f6f6]">
      <section className="py-[5%] w-full h-full">
        <Contact className="flex items-center justify-center pb-[5%]" />
      </section>
    </main>
  );
}
