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

    createView(userInfo) {
        // コンテイナーを実装
        let container = document.createElement('div');
        container.classList.add('container');

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        // イメージをセット
        let img = document.createElement('img')
        img.setAttribute('src', userInfo.avatar_url);
        img.setAttribute('alt', userInfo.login);
        img.classList.add('profile-image')

        imgContainer.append(img);

        let infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        // タイトル
        let listTitle = document.createElement('h4');
        listTitle.classList.add('list-title');
        listTitle.innerText = `< ${userInfo.login}'s Profile >`; 

        // 情報をエレメント化
        let infoList = document.createElement('ul');
        infoList.classList.add('info-list');
        let userName = document.createElement('li');
        userName.innerText = `Username: ${userInfo.login}`;
        let loca = document.createElement('li');
        loca.innerText = `Location: ${userInfo.location}`;
        let repo = document.createElement('li');
        repo.innerText = `Repositories: ${userInfo.public_repos}`;
        infoList.append(userName, loca, repo);

        infoContainer.append(listTitle, infoList);

        // コンテイナーにイメージと情報リストを追加
        container.append(imgContainer, infoContainer);
        return container;
    }

    async render() {
        this.resultElement.innerHTML = '';
        try {
            let userId = document.getElementById("userId").value;
                if (userId === '') { 
                    alert('Please enter your GitHub ID!');
                    return false 
                }
            console.log(userId);
            let userInfo = await this.getUserInfo(userId);
            console.log(userInfo)
            let infoContainer = this.createView(userInfo);
            this.resultElement.append(infoContainer);
        } catch(err) {
            console.log(err);
        }
    }

    bindEvent() {
        this.buttonElement.addEventListener('click', e => this.render(e));
    };
}

export default GitHibUserInfoView;