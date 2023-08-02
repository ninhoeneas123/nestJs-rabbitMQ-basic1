import * as bcrypt from 'bcrypt';

export function cryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = bcrypt.hash(password, saltOrRounds);
    return hash;
}
