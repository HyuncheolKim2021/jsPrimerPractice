console.log("index.js: loaded");

import GitHibUserInfoView from './App.js';
const view = new GitHibUserInfoView();
view.init();

/*
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

function fetchUserInfo(userId) {
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return response.json();
            }
        });
}

function getUserId() {
    return document.getElementById("userId").value;
}

function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
*/

// function escapeHTML(strings, ...values) {
//     // reduce((acc, cur, index) => { /* ... */ })
//     return strings.reduce((result, str, i) => {
//         const value = values[i - 1];
//         if (typeof value === "string") {
//             // 特殊文字は文字化けするので別関数で処理する
//             return result + escapeSpecialChars(value) + str;
//         } else {
//             return result + String(value) + str;
//         }
//     });
// }
