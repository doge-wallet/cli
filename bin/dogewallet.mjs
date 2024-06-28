#!/usr/bin/env node

import { createRequire } from "module";
import { program, } from 'commander';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

program.storeOptionsAsProperties(false);
program.version(pkg.version, '-v, --version');
program.usage('<command> [options]');   //定义使用方法。

//定义命令。
program.command('gen', 'generate a source wallet file.');
program.command('encrypt', 'encrypt a source file.');
program.command('decrypt', 'decrypt a encrypted file.');
program.command('mnemonic', 'covert mnemonic to address and private key.');
program.command('lucky', 'lucky.');

//解析命令行参数。
program.parse(process.argv);