const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogue-box');

// 《救贖之影》完整四幕劇本與對白數據結構
const scenes = [
    // 第一幕：警局
    { text: "【第一幕：警局】 Alan：'The fourth one. Four people, four identical cases, and we still have no idea how they're connected.'", color: "#3498db" },
    { text: "【第一幕：警局】 助手：'Medical examiner's report just came in. Black dagger, identical wound profile, suicide immediately after the attack—and every victim said the exact same word right before dying: Redemption.'", color: "#3498db" },
    { text: "【第一幕：警局】 Alan 拿出證物袋金屬圖騰：'Every single body had this on them.' Anna 表情僵住：'No.'", color: "#3498db" },
    { text: "【第一幕：警局】 調查警察衝進來：'Alan! We got something! An abandoned building in the Old District. Patrol officers found this on the wall.' 兩人準備出發！", color: "#3498db" },

    // 第二幕：廢棄大樓
    { text: "【第二幕：廢棄大樓】 Alan 與 Anna 搜索，發現地圖標記著四個犯罪現場與第五個明天的標記。", color: "#2ecc71" },
    { text: "【第二幕：廢棄大樓外】 Alan 拔槍：'Police! Don't move!' 充氣恐龍舉起短手：'This is as high as they go!' 說他失業才穿成這樣，看見一個高中生拿著黑匕首。", color: "#2ecc71" },
    { text: "【第二幕：廢棄大樓】 Elena 握著黑匕首：'The Venerable One told me you would come!' 隨後燈光轉冷，第二人格浮現盯著 Anna。", color: "#2ecc71" },
    { text: "【第二幕：廢棄大樓】 邪教據點投影：教主莫爾斯向失意高中生、失業可憐人與失戀基督徒洗腦：「這世界爛透了，拿起聖刃給世界釋放與救贖！」", color: "#e74c3c" },
    { text: "【第二幕：廢棄大樓】 Alan 勸說 Elena：「如果有人想救你，為什麼第一件事是叫你去死？」隨後 Alan 成功奪刀，將 Elena 交給 Anna 銬住並帶回警局。", color: "#2ecc71" },

    // 第三幕：警局審訊室
    { text: "【第三幕：審訊室】 醫師指出 Elena 患有嚴重創傷與解離症狀，存在交替人格，因此會遺忘部分記憶。", color: "#e67e22" },
    { text: "【第三幕：審訊室】 Alan 拿出金屬圖騰，Elena 的第二人格再度浮現，指認 Anna 也是莫爾斯的人，曾站在教主身邊！", color: "#e67e22" },
    { text: "【第三幕：審訊室】 Alan 質問 Anna，Anna 突然拔槍指向 Alan：「我不想傷害你... 但你還不知道完整的故事。」隨後逃出警局。", color: "#e67e22" },

    // 第四幕：邪教據點與結局
    { text: "【第四幕：邪教據點】 莫爾斯與信徒聚集。警方與充氣恐龍（使出美國海陸計畫B撞倒卡爾）衝入據點展開混戰！", color: "#9b59b6" },
    { text: "【第四幕：邪教據點】 Anna 透露三年前搭檔死在眼前、體制冷血無情，是莫爾斯給了她發洩痛苦的出口。Alan 將槍放下：「今天，你還可以救一個人——你自己。」", color: "#9b59b6" },
    { text: "【第四幕：結局】 Anna 醒悟，將槍口轉向莫爾斯：「你只是給了我的痛苦一個恨的對象。」最後莫爾斯被捕，Anna 主動伸出雙手戴上手銬，選擇為自己做出救贖的抉擇。", color: "#9b59b6" }
];

let currentSceneIndex = 0;
let isPlaying = false;

function drawScene(scene) {
    // 清除畫面
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 繪製背景地面線
    ctx.fillStyle = scene.color;
    ctx.fillRect(50, 320, 700, 6); 
    
    // 繪製對應主題顏色的火柴人角色示意
    ctx.strokeStyle = scene.color;
    ctx.lineWidth = 4;
    
    // 頭部
    ctx.beginPath();
    ctx.arc(400, 180, 22, 0, Math.PI * 2);
    ctx.stroke();
    
    // 身體
    ctx.beginPath();
    ctx.moveTo(400, 202);
    ctx.lineTo(400, 270);
    // 雙手
    ctx.moveTo(365, 230);
    ctx.lineTo(435, 230);
    // 雙腳
    ctx.moveTo(400, 270);
    ctx.lineTo(375, 320);
    ctx.moveTo(400, 270);
    ctx.lineTo(425, 320);
    ctx.stroke();

    // 更新下方對白框文字
    dialogueBox.innerText = scene.text;
}

function nextScene() {
    if (!isPlaying) return;
    drawScene(scenes[currentSceneIndex]);
    currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
}

let animationInterval;
document.getElementById('playBtn').addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        nextScene();
        animationInterval = setInterval(nextScene, 5000); // 每幕切換時間延長為 5 秒，方便閱讀完整劇本
    } else {
        clearInterval(animationInterval);
    }
});

// 初始化顯示第一幕
drawScene(scenes[0]);
