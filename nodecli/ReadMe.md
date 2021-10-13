# Node.jsでCLIアプリケーション

## 💡このパートの目標
- [x] コマンドライン引数を受け取り、アプリケーションから使いやすい形にパースする
- [x] Node.jsの`fs`モジュールを使ったファイルの読み込み
- [x] markedパッケージを使ってMarkdownファイルをHTMLに変換
- [x] ユニットテストの導入とソースコードのモジュール化

1. コマンドライン引数を受け取り、アプリケーションから使いやすい形にパースする

`useCommand.js`
```js
const program = require("commander");
program.parse(process.argv);
const cliCommand = program.args[0];
console.log(cliCommand);
// on terminal: node useCommand.js fileName -> fileName
```

2. Node.jsの`fs`モジュールを使ったファイルの読み込み

`useFileSystem.js`
```js
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
```

3. markedパッケージを使ってMarkdownファイルをHTMLに変換

```js
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
```
```cli
// node useMarked.js --gfm sample.md
{ gfm: true }
<h1 id="サンプルファイル">サンプルファイル</h1>
<p>これはサンプルです。
<a href="https://jsprimer.net/">https://jsprimer.net/</a></p>
<ul>
<li>サンプル1</li>
<li>サンプル2</li>
</ul>
```

4. ユニットテストの導入とソースコードのモジュール化
- `assert`モジュールを使ってテスト

```js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const md2html = require("../md2html");

it("converts Markdown to HTML (GFM=false)", () => {
    const sample = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), { encoding: "utf8" });
    const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected.html"), { encoding: "utf8" });
    // sampleとexpectedが同じでテストを無事通過する
    assert.strictEqual(md2html(sample, { gfm: false }).trimEnd(), expected.trimEnd());
});

it("converts Markdown to HTML (GFM=true)", () => {
    const sample = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), { encoding: "utf8" });
    const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected-gfm.html"), { encoding: "utf8" });
    assert.strictEqual(md2html(sample, { gfm: true }).trimEnd(), expected.trimEnd());
});
```