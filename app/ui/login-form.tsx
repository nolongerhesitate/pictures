"use client";

import { Input, InputGroup, InputLeftElement, Flex, Button, Box, Text } from "@chakra-ui/react";
import { EmailIcon, LockIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../lib/store/userSlice";
import { User } from "../lib/types";


export default function LoginForm() {
  const [userInfo, setUserInfo] = useState<User>({ id: "", username: "", password: "" });
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [isLogining, setIsLogining] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsLogining(true);
      e.preventDefault();

      const res = await signIn("credentials", {
        username: userInfo.username,
        password: userInfo.password,
        callbackUrl: "/pictures",
        redirect: false,
      });

      const { error, status, ok, url } = res;

      if (ok) {
        const session = await getSession();
        dispatch(setUser(session.user));
        router.push(url);
      } else {
        setErrorInfo(error || `Error: ${status}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLogining(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <Flex
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap={6}
      >
        {errorInfo && <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="tomato"
          color="white"
          p={2}
          borderWidth="1px"
          borderRadius="md"
        >
          <WarningTwoIcon boxSize={6} ml={2} mr={3} />
          <Text>
            {errorInfo}
          </Text>
        </Box>}
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
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => { setUserInfo({ ...userInfo, username: target.value }) }}
            aria-disabled={isLogining}
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
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => { setUserInfo({ ...userInfo, password: target.value }) }}
            aria-disabled={isLogining}
            required
          />
        </InputGroup>
        <Button type="submit" aria-disabled={isLogining}>{isLogining ? "Logining..." : "Login"}</Button>
      </Flex >
    </form >
  );
}
