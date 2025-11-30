import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable, NewUser } from "../db/schema";
import { config } from "../config/env";

export const authService = {
  async signup(userData: Omit<NewUser, "id" | "createdAt" | "updatedAt">) {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userData.email))
      .get();
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);

    const newUser = await db
      .insert(usersTable)
      .values({
        ...userData,
        passwordHash: hashedPassword,
      })
      .returning()
      .get();

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    return { user: newUser, token };
  },

  async login(email: string, password: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .get();
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    return { user, token };
  },

  async logout() {
    // Stateless JWT, nothing to do on server side usually unless using a blacklist
    return true;
  },
};
