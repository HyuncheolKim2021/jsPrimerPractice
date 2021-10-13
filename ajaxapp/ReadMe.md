# Ajax通信パートの実習

## 💡このパートの目標
- [x] Ajax通信を理解する
- [x] GitHubのAPIを通じてAPIの呼び出しを理解する
- [x] async/await文法を理解する

1. **HTTP通信を理解する**
- Fetch APIを使ってGitHubからユーザー情報をもらう

```js
function fetchUserInfo(userId) {
    // encodeURIComponentは/や%などURLとして特殊な意味を持つ文字列をただの文字列として扱えるようにエスケープする関数
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return response.json();
            }
        });
}
```

2. **GitHubのAPIを通じてAPIの呼び出しを理解する**
- サーバーは`npx @js-primer/local-server`コマンドで実行
- APIのレスポンスヘッダーの詳細

<img width="500" alt="API response header" src="https://user-images.githubusercontent.com/91875713/137066155-23c8ffe2-246e-4b81-ad9d-cbf49190e2a2.png">

- 通信が正常に行われたら`Status Code:200`を、何かの問題が起こって失敗したら`Status Code:404`を返す
- リクエストにはGetとPostの2種類がある

3. **async/await文法を理解する**

```js
async function main() {
    try {
        const userId = getUserId(); // inputからIdとして使うパラメータをもらう
        const userInfo = await fetchUserInfo(userId); // データ通信は非同期で行う
        const view = createView(userInfo); // もらったデータをElement化
        displayView(view); // render();
    } catch (error) {
        console.error(`エラーが発生しました (${error})`);
    }
}
```
- `fetchUserInfo()`がPromiseを返すので`async/await`を使って処理するとコードがもっと分かりやすくなる

4. **【追】ちゃんと理解したか自分なりのにコードを書いてみる**
- やったこと
    - CSSでのスタイリング
    - 文字列でのHTML作りから`document.createElement()`を使う方式に変更
    - index.jsをモジュール化し、クラスコンポーネントでインスタンスを使う方法に修正

**Before**
<img width="350" alt="practice original result" src="https://user-images.githubusercontent.com/91875713/137067238-b266cd32-9dfe-4112-8bcd-ad72ac09409c.png">

**After**
<img width="500" alt="practice my result" src="https://user-images.githubusercontent.com/91875713/137067117-48980f5e-49ec-4298-ab46-87699410b048.png">

- 表示する内容をカード式に変更

`index.js`
```js
import GitHibUserInfoView from './App.js';
const view = new GitHibUserInfoView();
view.init();
```

`App.js`
```js
// 一部だけ抜粋
class GitHibUserInfoView {
    constructor() {
        this.inputElement = document.getElementById("userId");
        this.buttonElement = document.getElementById('btnGetUserInfo');
        this.resultElement = document.getElementById("result");
    }

    init() {
        this.bindEvent();
    }

    getUserInfo(userId) {
        return fetch(`https://api.github.com/users/${userId}`)
            .then(res => {
                if(!res.ok) {
                    return Promise.reject(new Error(`${res.status}: ${res.status}`))
                } else {
                    return res.json();
                }
            })
    }
    //...
}
```
