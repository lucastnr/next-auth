"use client";
import { useState } from "react";

export function AuthForm() {
  const [formType, setFormType] = useState<"register" | "login">("login");

  return (
    <div className="flex flex-col items-center">
      <input className="border" type="email" />
      <input className="border" type="password" />
      <button>{formType === "login" ? "Login" : "Register"}</button>
      <p>
        {formType === "login" ? "New here?" : "Already have an account?"}{" "}
        <button
          className="text-blue-600"
          onClick={() =>
            setFormType((prevType) =>
              prevType === "register" ? "login" : "register"
            )
          }
        >
          {formType === "login" ? "Register" : "Sign In"}
        </button>
      </p>
    </div>
  );
}
