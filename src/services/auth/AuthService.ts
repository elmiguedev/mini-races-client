import type { LoginRequest } from "../../models/auth/LoginRequest";

const login = async (params: LoginRequest) => {
  const url = "http://localhost:3000/auth/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}

export default {
  login
}