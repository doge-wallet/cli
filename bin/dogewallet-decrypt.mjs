#!/usr/bin/env node

import 'colors';
import * as path from 'path';
import File from '@definejs/file';
import { program, } from 'commander';
import { decrypt, } from './lib/Crypto.mjs';
import * as Source from './lib/Source.mjs';


program.usage('<encrypted-file> <secret-key>');
program.parse();

let args = program.args;
let opts = program.opts();


(function () {
    let file = args[0];
    let secretKey = args[1];

    if (!file) {
        console.log(`请输入要解密的文件名`.red);
        return program.help();
    }

    if (!secretKey) {
        console.log(`请输入要进行解密的密钥`.red);
        return program.help();
    }

    if (secretKey.length != 16) {
        console.log(`密钥的长度为16个字符。`);
        return;
    }

    
  

    let src = `./output/${file}`;
    let dir = path.dirname(src);
    let ext = path.extname(src);
    let name = path.basename(src, ext);

    if (name.endsWith('.encrypt')) {
        name = path.basename(name, '.encrypt');
    }

    let dest = `${dir}/${name}.decrypt${ext}`;


    let list = File.read(src);


    list = list.split('\n').map((item, index) => {
        if (!item) { //空行
            return '';
        }
     

        item = decrypt(item, secretKey);

        console.log(index, Source.toMessage(item));

        return item;
    });


    File.write(dest, list.join('\n'));

    console.log(`写入文件`.bgGreen, path.resolve(dest).yellow);

})();
