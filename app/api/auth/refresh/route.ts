import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookiesStore = await cookies();
  const oldToken = cookiesStore.get("refresh_token")?.value;

  if (!oldToken) {
    return NextResponse.redirect(new URL("/auth/register", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      oldToken,
      new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!)
    );
    if (!payload) {
      return NextResponse.redirect(new URL("/auth/register", req.url));
    }
    const refreshTokenDB = await prisma.refresh_tokens.findFirst({
      where: {
        token: oldToken,
        user_id: payload.id as string,
        is_revoked: false,
      },
    });

    if (!refreshTokenDB) {
      return NextResponse.redirect(new URL("/auth/register", req.url));
    }
    await prisma.refresh_tokens.update({
      where: { token: oldToken },
      data: { is_revoked: true },
    });

    const user = payload as { id: string; name: string };

    const accessToken = await generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);
    await prisma.refresh_tokens.create({
      data: {
        token: newRefreshToken,
        user_id: user.id,
        is_revoked: false,
        expires_at: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
      },
    });
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ACCESS_TOKEN_EXPIRES_IN,
      path: "/",
    });
    res.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_TOKEN_EXPIRES_IN,
      path: "/",
    });

    return res;
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL("/auth/register", req.url));
  }
}
