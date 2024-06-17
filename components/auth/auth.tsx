"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@/models/models";
import useAuthStore from "@/store/useAuthStore";
import { google } from "@/app/auth/action";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";

import GoogleLogo from "./google-logo";

const Auth: FC = () => {
  const router = useRouter();

  const { setUser } = useAuthStore();

  const [isLoading, setLoading] = useState(false);
  const signInWithGoogleHandler = useGoogleLogin({
    flow: "implicit",
    onError: () => setLoading(false),
    onSuccess: async ({ access_token }) => {
      try {
        const { user } = await google(access_token);
        onSuccess(user);
      } catch {}
    },
  });

  const onSuccess = (user: User) => {
    setUser({
      name: user.name,
      id: user.uid,
      email: user.email,
      image: user.avatar,
    });

    router.push("/onboard");
  };

  if (isLoading) {
    return <AiOutlineLoading3Quarters className="animate-spin" />;
  }

  return (
    <Card className="p-5">
      <CardHeader>
        <div className="flex flex-col space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Admin Portal
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            Indonesia&apos;s Premier Education Startup
          </CardDescription>
        </div>
      </CardHeader>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-3">
          <Button
            className="flex items-center justify-center transition hover:scale-105"
            variant="outline"
            onClick={() => {
              setLoading(true);
              signInWithGoogleHandler();
            }}
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </div>
    </Card>
  );
};

Auth.displayName = "Auth";
export default Auth;
