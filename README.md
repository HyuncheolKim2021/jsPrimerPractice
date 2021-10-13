# Todoアプリ

## 💡このパートの目標
- [x] TodoアプリへTodoアイテムを追加するフォームを作成
- [x] 入力内容を送信するイベントのハンドリング
- [x] 「Todoアイテムの更新」と「Todoアイテムの削除」を実装
- [x] Todoアプリの表示要素をコンポーネントという単位に分割するリファクタリング

1. **TodoアプリへTodoアイテムを追加するフォームを作成**

`src/App.js`
```js
import { element } from "./view/html-util.js";

export class App {
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        let todoItemCount = 0;
        formElement.addEventListener("submit", (event) => {
            // submitが起こるとページをリフレッシュするのでここでイベントの進行を阻止
            event.preventDefault();
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            containerElement.appendChild(todoItemElement);
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            inputElement.value = "";
        });
    }
}
```

2. **入力内容を送信するイベントのハンドリング**

`src/App.js`
```js
import { element, render } from "./view/html-util.js";
export class App {
    // ...
    mount() {
        // ...
        // リストにonChangeイベントハンドラをつける
        this.todoListModel.onChange(() => {
            // ...
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        // ...
    }
}
```

3. **「Todoアイテムの更新」と「Todoアイテムの削除」を実装**

`App.jsのmount()`
```js
this.todoListModel.onChange(() => {
    // liタグを一つに結ぶulタグを生成
    const todoListElement = element`<ul />`;
    const todoItems = this.todoListModel.getTodoItems();
    todoItems.forEach(item => {
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        const todoItemElement = item.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
            : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
        // チェックボックスにchangeイベントをつける
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            this.todoListModel.updateTodo({
                id: item.id,
                completed: !item.completed
            });
        });
        // 生成されたliタグを追加
        todoListElement.appendChild(todoItemElement)
        });
    // 全部レンダリング
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
});
```

4. **Todoアプリの表示要素をコンポーネントという単位に分割するリファクタリング**

`src/view/TodoItemView.js`
```js
import { element } from "./html-util.js";

export class TodoItemView {
    createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
        const todoItemElement = todoItem.completed
            ? element`<li><input type="checkbox" class="checkbox" checked>
                                    <s>${todoItem.title}</s>
                                    <button class="delete">x</button>
                                </li>`
            : element`<li><input type="checkbox" class="checkbox">
                                    ${todoItem.title}
                                    <button class="delete">x</button>
                                </li>`;
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed
            });
        });
        // 削除ボタンのイベント付け
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
            onDeleteTodo({
                id: todoItem.id
            });
        });
        return todoItemElement;
    }
}
```

`src/view/TodoListView.js`
```js
import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
        const todoListElement = element`<ul />`;
        todoItems.forEach(todoItem => {
            const todoItemView = new TodoItemView();
            const todoItemElement = todoItemView.createElement(todoItem, {
                onDeleteTodo,
                onUpdateTodo
            });
            todoListElement.appendChild(todoItemElement);
        });
        return todoListElement;
    }
}
```
