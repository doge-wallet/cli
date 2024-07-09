#!/usr/bin/env node

import 'colors';
import * as path from 'path';
import File from '@definejs/file';
import $Date from '@definejs/date';
import { program, } from 'commander';
import { generate, } from "@dogewallet/core";
import * as Source from './lib/Source.mjs';
import { encrypt, } from './lib/Crypto.mjs';



program.usage('<count> <secret-key>');
program.parse();

let args = program.args;
let opts = program.opts();



(function () {
    let count = args[0];
    let secretKey = args[1];

    if (!count) {
        console.log(`请输入要生成的记录数`.red);
        return program.help();
    }

    if (!secretKey) {
        console.log(`请输入要进行加密的密钥`.red);
        return program.help();
    }

    if (secretKey.length != 16) {
        console.log(`要进行加密的密钥的长度必须为16个字符。`);
        return;
    }


    let now = $Date.format('yyyyMMdd-HHmmss');
    let list = [];
    let list2 = [];
    let file = `./output/${now}.encrypt.txt`;
    let file2 = `./output/${now}.address.txt`;

    for (let i = 1; i <= count; i++) {
        let { address, mnemonic, } = generate();
        let item = encrypt(mnemonic, secretKey);
        let msg = Source.toMessage({ mnemonic, });

        console.log(i, msg);

        list.push(item);
        list2.push(address);

        if (i % 10000 == 0) {
            save(file, list);
            save(file2, list2);
            list = [];
            list2 = [];
        }
    }

    save(file, list);
    save(file2, list2);


})();

function save(file, list) {
    if (list.length == 0) {
        return;
    }
    
    list = list.join('\n') + '\n';
    File.append(file, list);
    console.log(`写入文件`.bgGreen, path.resolve(file).yellow);
}
