"use client";

import { signIn, signOut } from "next-auth/react"
import { useState } from "react";

export default function LoginForm() {

  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      callbackUrl: "/",
    });

    // const { error, status, ok, url } = res;
    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col bg-black">
        <input
          className="bg-black"
          type="text"
          id="username"
          name="username"
          placeholder="E-mail Address"
          value={userInfo.username}
          onChange={({ target }) => { setUserInfo({ ...userInfo, username: target.value }) }}
          required
        />
        <input
          className="bg-black"
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          value={userInfo.password}
          onChange={({ target }) => { setUserInfo({ ...userInfo, password: target.value }) }}
          required
        />
        <button type="submit">Login</button>
      </div >
    </form >
  );
}
