import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email ou mot de passe manquant" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Token avec role inclus
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role // Ajout du role
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Stocker dans cookie httpOnly
    (await
      // Stocker dans cookie httpOnly
      cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/"
    });

    return NextResponse.json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
