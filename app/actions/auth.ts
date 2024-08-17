"use server";

import { createClient } from "@/utils/supabase";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { z } from "zod";

function parseFormData(form: FormData) {
  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string(),
  });

  return schema.safeParse({
    email: form.get("email"),
    password: form.get("password"),
  });
}

type ActionState = { message?: string; error: boolean } | null;

export async function signUp(
  prevState: ActionState,
  form: FormData
): Promise<ActionState> {
  const parse = parseFormData(form);

  if (!parse.success) {
    return { error: true, message: parse.error.errors[0].message };
  }

  const { email, password } = parse.data;

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );
  const createUserResponse = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createUserResponse.error) {
    return { error: true, message: createUserResponse.error.message };
  }

  const supabase = createClient();
  const signInResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInResponse.error) {
    return { error: true, message: signInResponse.error.message };
  }

  return {
    error: false,
  };
}

export async function signIn(
  prevState: ActionState,
  form: FormData
): Promise<ActionState> {
  const parse = parseFormData(form);

  if (!parse.success) {
    return { error: true, message: parse.error.errors[0].message };
  }

  const { email, password } = parse.data;

  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    return { error: true, message: response.error.message };
  }

  return {
    error: false,
  };
}

export async function signOut() {
  const supabase = createClient();
  const response = await supabase.auth.signOut();
}
