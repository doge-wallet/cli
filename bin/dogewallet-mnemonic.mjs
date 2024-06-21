#!/usr/bin/env node

import 'colors';
import * as path from 'path';
import File from '@definejs/file';
import { program, } from 'commander';
import { fromMnemonic, } from "@dogewallet/core";
import * as Source from './lib/Source.mjs';



program.parse();

let args = program.args;
let opts = program.opts();



(function () {
    let file = args[0];

    if (!file) {
        console.log(`请输入要转换的文件名或 12 个助记词`.red);
        return program.help();
    }


    if (args.length == 12) {
        let mnemonic = args.join(' ');
        let data = fromMnemonic(mnemonic);
        console.log({ ...data, mnemonic, });
        return;
    }


    let src = `./output/${file}`;
    let dir = path.dirname(src);
    let ext = path.extname(src);
    let name = path.basename(src, ext);

    if (name.endsWith('.s')) {
        name = path.basename(name, '.s');
    }
    else if (name.endsWith('.d')) {
        name = path.basename(name, '.d');
    }

    let dest = `${dir}/${name}.m${ext}`;


    let list = File.read(src);


    list = list.split('\n').map((item, index) => {
        if (!item) { //空行
            return '';
        }

        let { mnemonic, } = Source.parse(item);

        if (!mnemonic) {
            console.log(`第 ${index + 1} 行不含有合法的助记词。`.red);
            throw new Error();
        }

        let { address, privateKey, } = fromMnemonic(mnemonic);
        let msg = Source.toMessage({ address, privateKey, mnemonic, });

        console.log(index, msg);
       
        return `${address} ${privateKey} ${mnemonic}`;
    });


    File.write(dest, list.join('\n'));

    console.log(`写入文件`.bgGreen, path.resolve(dest).yellow);


})();
