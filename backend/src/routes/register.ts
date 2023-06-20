import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';

const routerRegister = express.Router();

routerRegister.post('/auth/register', async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
        return res.status(400).json({ error: "O nome é obrigatório!" });
    }

    if (!email) {
        return res.status(400).json({ error: "O e-mail é obrigatório!" });
    }

    if (!password) {
        return res.status(400).json({ error: "A senha é obrigatória!" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "As senhas não conferem!" });
    }

    try {
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ error: "Por favor, utilize outro e-mail!" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash
        });

        await user.save();

        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
    }
});

export default routerRegister;
