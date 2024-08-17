"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { signIn, signUp } from "../actions/auth";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/shadcn";
import { useFormState, useFormStatus } from "react-dom";

export function AuthForm() {
  const [formType, setFormType] = useState<"register" | "login">("login");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInForm = useFormState(signIn, null);
  const signUpForm = useFormState(signUp, null);

  const [state, action] = useMemo(() => {
    return formType === "login" ? signInForm : signUpForm;
  }, [formType, signInForm, signUpForm]);

  useEffect(() => {
    setLoading(false);
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={action}
        onSubmit={() => {
          setLoading(true);
        }}
        className="flex flex-col gap-5 w-[16em] mb-5"
      >
        <Input
          required
          name="email"
          ref={emailRef}
          type="email"
          placeholder="Email"
        />
        <Input
          required
          name="password"
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
        <Button>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>{formType === "login" ? "Login" : "Register"}</>
          )}
        </Button>
      </form>
      <p>
        {formType === "login" ? "New here?" : "Already have an account?"}{" "}
        <Button
          variant="link"
          className="p-0 h-min text-base"
          onClick={() =>
            setFormType((prevType) =>
              prevType === "register" ? "login" : "register"
            )
          }
        >
          {formType === "login" ? "Register" : "Sign In"}
        </Button>
      </p>
      {state?.message && (
        <p
          className={cn(
            "mt-1",
            state.error ? "text-red-600" : "text-green-600"
          )}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
