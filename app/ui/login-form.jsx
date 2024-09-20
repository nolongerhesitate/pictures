"use client";

import { Input, InputGroup, InputLeftElement, Flex, Button } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { signIn } from "next-auth/react";
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
    console.log("#res:", res);
    // debugger;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="h-[400px] flex flex-col justify-between align-center"> */}
      <Flex
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap={6}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="E-mail Address"
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={({ target }) => { setUserInfo({ ...userInfo, username: target.value }) }}
            required
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            value={userInfo.password}
            onChange={({ target }) => { setUserInfo({ ...userInfo, password: target.value }) }}
            required
          />
        </InputGroup>
        <Button type="submit">Login</Button>
        {/* </div> */}
      </Flex >
    </form >
  );
}
