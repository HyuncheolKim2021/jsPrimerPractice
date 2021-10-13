const program = require("commander");
const path = require('path');
const fs = require('fs');

// コマンダーを使ってCLIで入力したファイル名を変数に
program.parse(process.argv);
const cliCommand = program.args[0];
// pathモジュールを使って拡張子を確認
let extension = path.extname(cliCommand);

    // 拡張子が.mdでファイルである事を確認
    if (extension === '.md' && fs.statSync(cliCommand).isFile()) {
        // 2番目の引数ではオプションを付けられる
        fs.readFile(cliCommand, {encoding: 'utf-8'}, (err, file) => {
            if (err) {
                console.err(err.message)
                process.exit(1);
                return;
            } else {
                console.log(file);
            }
        })
    } else {
        console.log('This file is not markdown...')
    }