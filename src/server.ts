import app from "./app";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Api rodando na porta ${PORT}`);
});

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "../prisma";

export class AuthService{
    async login(email: string,, senha: string) {
        const user = await prisma.user.findUnique({where: {email}});

        if (!user || !user.isActive) {
            throw { status: 401, message: "E-mail ou senha inválidos"};
        }
        const senhaOK = await bcrypt.compare(senha, user.passwordHash);
        if (!senhaOK) {
            throw{ status: 401, message: "E-mail ou senha inválidos"};
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role},
            process.env.JWT_SECRET as string, 
            { expiresIN: "1d" }
        );

        return {
            token,
            user: { id: user.id, name:user.name, email: user.email, role: user.role},
        };
    }
}