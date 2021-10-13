// 外部モジュール
const program = require("commander");
const path = require('path');
const fs = require('fs');
// カスタムモジュール
const md2html = require("./md2html");

// コマンダーを使ってCLIで入力したファイル名を変数に
program.option('--gfm', 'GitHub Flavored Markdownを有効にする');
program.parse(process.argv);

const cliCommand = program.args[0];
const gfmOption = program.opts();
// --gfmを入力しないとundefinedで上書きされるのでデフォルト値を定義
const cliOptions = {
    gfm: gfmOption.gfm ?? false,
}
/*
const cliOptions = {
    gfm: false,
    ...program.opts(), // CLIに--gfmを一緒に入力するとここでgfmを上書きする
};
*/
console.log(cliOptions);
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
            const html = md2html(file, cliOptions);
            console.log(html);
        }
    })
} else {
    console.log('This file is not markdown...')
}