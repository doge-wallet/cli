
import * as crypto from 'crypto';

const algorithm = 'aes-128-cbc'; 


//secretKey 至少16位。
function encrypt(text, secretKey) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encrypted = Buffer.concat([
        cipher.update(text),
        cipher.final(),
    ]);

    return `${iv.toString('hex')}${encrypted.toString('hex')}`;
}


function decrypt(item, secretKey) {
    let iv = Buffer.from(item.slice(0, 32), 'hex');
    let content = Buffer.from(item.slice(32), 'hex');

    let decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    let decrpyted = Buffer.concat([
        decipher.update(content),
        decipher.final(),
    ]);

    return decrpyted.toString();
}



export { encrypt, decrypt, };
