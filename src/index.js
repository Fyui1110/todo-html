import "./styles.css";

// "追加"をクリック → 未完了のTODOに追加する
const onClickAdd = () => {
  // inputに入力した値(value)の取得し変数に代入
  const inputText = document.getElementById("addText").value;
  // 入力フォームの初期化
  document.getElementById("addText").value = "";
  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
// 引数にボタンの親要素を指定
const deleteFromIncomplereList = (target) => {
  // const deleteTarget = target;
  const deleteTargetParent = target.parentNode;
  // 親要素<ul id="incompleteUl">から子要素を削除
  document.getElementById("incompleteUl").removeChild(deleteTargetParent);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグ生成
  const litag = document.createElement("li");
  litag.className = "incompleteLi";
  // divタグ生成
  const divtag = document.createElement("div");
  divtag.className = "listRow";
  // pタグ生成
  const ptag = document.createElement("p");
  ptag.innerText = text;

  // 完了ボタンを生成し、クリックイベントを付与する
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    deleteFromIncomplereList(completeButton.parentNode);
    // 完了リストに追加する要素
    // 完了ボタンの親要素を取得
    const addTarget = completeButton.parentNode;
    // テキストを取得
    const completetext = addTarget.firstElementChild.innerText;
    //　liタグの子要素を初期化
    addTarget.textContent = null;
    // liタグ生成
    const completeLiTag = document.createElement("li");
    completeLiTag.className = "completeLi";
    // divタグ生成
    const completeDivTag = document.createElement("div");
    completeDivTag.className = "listRow";
    // pタグ生成
    const completePTag = document.createElement("p");
    completePTag.innerText = completetext;

    // 戻すボタンを生成し、クリックイベントを付与する
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";

    // クリックされた戻すボタンの親要素を削除
    backButton.addEventListener("click", () => {
      const deleteTarget = backButton.parentNode;
      document
        .getElementById("completeUl")
        .removeChild(deleteTarget.parentNode);
      // テキストを取得
      const text = deleteTarget.firstElementChild.innerText;
      createIncompleteList(text);
    });
    // divタグの子要素に各要素を設定
    completeDivTag.appendChild(completePTag);
    completeDivTag.appendChild(backButton);
    // liタグの子要素に各要素を設定
    completeLiTag.appendChild(completeDivTag);
    // 完了リストに追加
    document.getElementById("completeUl").appendChild(completeLiTag);
  });

  // 削除ボタンを生成し、クリックイベントを付与する
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 未完了リストから指定の要素を削除
    deleteFromIncomplereList(deleteButton.parentNode);
  });

  // divタグの子要素に各要素を設定
  divtag.appendChild(ptag);
  divtag.appendChild(completeButton);
  divtag.appendChild(deleteButton);
  // liタグの子要素に各要素を設定
  litag.appendChild(divtag);

  // 未完了リストに追加
  document.getElementById("incompleteUl").appendChild(litag);
};

// id="addButton"に対してクリックイベントを付与する
document
  .getElementById("addButton")
  .addEventListener("click", () => onClickAdd());
