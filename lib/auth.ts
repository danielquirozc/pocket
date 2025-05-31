import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const generateAccessToken = (user : any) => {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET))
};

export const generateRefreshToken = (user: any) => {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET))
};

export const getCurrentUser = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  
  if (!accessToken) return null;

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
    );

    return payload as { id: string; name: string };
  } catch (e) {
    return null;
  }
}