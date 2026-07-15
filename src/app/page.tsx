export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
        New Project Started
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        I've cleared the previous code. Tell me what you'd like to build next, and we can start prototyping immediately!
      </p>
    </div>
  );
}
