import Logo from "@/app/ui/logo";
import LoginForm from "@/app/ui/login-form";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Logo />
      <LoginForm />
    </main>
  );
}

