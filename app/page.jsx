import LoginForm from "./ui/login-form";
import Logo from "./logo";


export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Logo />
      <LoginForm />
    </main>
  );
}
