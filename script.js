const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const dialogueBox = document.getElementById('dialogue-box');

// 動畫場景與對白腳本數據結構
const scenes = [
    { text: "【第一幕：警局】 Alan：'The fourth one. Four people, four identical cases...'", color: "#3498db" },
    { text: "【第二幕：廢棄大樓】 充氣恐龍：'This is as high as they go!'", color: "#2ecc71" },
    { text: "【第三幕：審訊室】 Anna 拔槍對峙：'I don't want to hurt you.'", color: "#e74c3c" },
    { text: "【第四幕：邪教據點】 旁白：'But true redemption is having the courage... to choose to stop.'", color: "#9b59b6" }
];

let currentSceneIndex = 0;
let isPlaying = false;

function drawScene(scene) {
    // 清除畫面
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 繪製背景裝飾
    ctx.fillStyle = scene.color;
    ctx.fillRect(50, 300, 700, 10); // 地面
    
    // 繪製彩色火柴人範例
    ctx.strokeStyle = scene.color;
    ctx.lineWidth = 4;
    
    // 頭部
    ctx.beginPath();
    ctx.arc(400, 200, 20, 0, Math.PI * 2);
    ctx.stroke();
    
    // 身體
    ctx.beginPath();
    ctx.moveTo(400, 220);
    ctx.lineTo(400, 280);
    // 雙手
    ctx.moveTo(370, 240);
    ctx.lineTo(430, 240);
    // 雙腳
    ctx.moveTo(400, 280);
    ctx.lineTo(380, 330);
    ctx.moveTo(400, 280);
    ctx.lineTo(420, 330);
    ctx.stroke();

    // 更新對白
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
        animationInterval = setInterval(nextScene, 4000); // 每幕 4 秒
    } else {
        clearInterval(animationInterval);
    }
});

// 初始化第一幕
drawScene(scenes[0]);
