import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  req.headers.set("x-next-dynamic", "true");
  return NextResponse.next();
}
