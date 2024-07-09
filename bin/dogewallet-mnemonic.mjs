#!/usr/bin/env node

import 'colors';
import * as path from 'path';
import File from '@definejs/file';
import { program, } from 'commander';
import { fromMnemonic, } from "@dogewallet/core";
import * as Source from './lib/Source.mjs';

program.option('-a, --address', 'only address');

program.parse();

let args = program.args;
let opts = program.opts();



(function () {

    let file = args[0];

    if (!file) {
        console.log(`请输入要转换的文件名或 12 个助记词`.red);
        return program.help();
    }


    if (file.split(' ').length == 12) {
        let mnemonic = file;
        let { address, privateKey, publicKey, } = fromMnemonic(mnemonic);
        if (opts.address) {
            console.log(address);
        }
        else {
            console.log({ address, privateKey, publicKey, mnemonic, });
        }
        return;
    }


    let src = `./output/${file}`;
    let dir = path.dirname(src);
    let ext = path.extname(src);
    let name = path.basename(src, ext);

    if (name.endsWith('.source')) {
        name = path.basename(name, '.source');
    }
    else if (name.endsWith('.decrypt')) {
        name = path.basename(name, '.decrypt');
    }

    let dest = `${dir}/${name}.mnemonic${ext}`;
    let list = File.read(src);

    list = list.split('\n');

    

    //只处理挑选出来的行号。
    if (args.length>1) {
        list = args.slice(1).map((no) => {
            no = Number(no);
            return list[no - 1]; //index 是从 0 开始的。
        });
    }


    list = list.map((item, index) => {
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
       
        //only address
        if (opts.address) {
            return address;
        }

        return `${address} ${privateKey} ${mnemonic}`;
    });


    File.write(dest, list.join('\n'));

    console.log(`写入文件`.bgGreen, path.resolve(dest).yellow);


})();
