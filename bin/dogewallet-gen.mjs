#!/usr/bin/env node

import 'colors';
import * as path from 'path';
import File from '@definejs/file';
import $Date from '@definejs/date';
import { program, } from 'commander';
import { generate, fromMnemonic, } from "@dogewallet/core";
import * as Source from './lib/Source.mjs';


program.option('-m, --mnemonic', 'only mnemonic');
program.usage('[amout]');
program.parse();

let args = program.args;
let opts = program.opts();



(function () {
    let count = Number(args[0] || '1');

    if (count == 1) {
        let data = generate();
        console.log(data);
        return;
    }

    
    let list = [];
    let file = `./output/${$Date.format('yyyyMMdd-HHmmss')}.s.txt`;

    for (let i = 0; i < count; i++) {
        let { address, privateKey, mnemonic, } = generate();

        let item = opts.mnemonic ? mnemonic : `${address} ${privateKey} ${mnemonic}`;

        let msg = opts.mnemonic ?
            Source.toMessage({ mnemonic, }) :
            Source.toMessage({ address, privateKey, mnemonic, });

        console.log(i, msg);

        list.push(item);
    }

    File.write(file, list.join('\n'));
    console.log(`写入文件`.bgGreen, path.resolve(file).yellow);

    



})();
