#!/usr/bin/env node

import 'colors';
import * as path from 'path';
import File from '@definejs/file';
import { program, } from 'commander';
import { encrypt, } from './lib/Crypto.mjs';
import * as Source from './lib/Source.mjs';


program.usage('<source-file> <secret-key>');
program.parse();

let args = program.args;
let opts = program.opts();


(function () {
    let file = args[0];
    let secretKey = args[1];

    if (!file) {
        console.log(`请输入要加密的源文件名`.red);
        return program.help();
    }

    if (!secretKey) {
        console.log(`请输入要进行加密的密钥`.red);
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

    if (name.endsWith('.source')) {
        name = path.basename(name, '.source');
    }

    let dest = `${dir}/${name}.encrypt${ext}`;


    let list = File.read(src);


    list = list.split('\n').map((item, index) => {
        if (!item) { //空行
            return '';
        }
        
        let msg = Source.toMessage(item);

        console.log(index, msg);

        item = encrypt(item, secretKey);

        return item;
    });


    File.write(dest, list.join('\n'));

    console.log(`写入文件`.bgGreen, path.resolve(dest).yellow);

})();
