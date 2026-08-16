const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const subtitleBox = document.getElementById('subtitle-box');

// 完整劇本台詞與對應動作代號
const scriptLines = [
    // 第一幕
    { text: "【第一幕：警局】 Alan: 'The fourth one. Four people, four identical cases...'", action: "police_station", speaker: "Alan" },
    { text: "【第一幕：警局】 助手: 'Medical examiner's report... every victim said: Redemption.'", action: "police_station", speaker: "助手" },
    { text: "【第一幕：警局】 Alan 拿出金屬圖騰，Anna 表情僵住。", action: "evidence", speaker: "Alan" },
    { text: "【第一幕：警局】 調查警察衝進來: 'Old District abandoned building! We got something!' 兩人出發！", action: "police_rush", speaker: "調查警察" },
    
    // 第二幕
    { text: "【第二幕：廢棄大樓】 兩人搜索牆上地圖，發現第五個標記與明天的日期。", action: "abandoned_map", speaker: "Alan" },
    { text: "【第二幕：廢棄大樓外】 Alan 拔槍: 'Police! Don't move!' 充氣恐龍舉起短手: 'This is as high as they go!'", action: "dino", speaker: "充氣恐龍" },
    { text: "【第二幕：廢棄大樓】 Elena 手握黑匕首: 'The Venerable One told me you would come!' 隨後第二人格浮現。", action: "elena_knife", speaker: "Elena" },
    { text: "【第二幕：廢棄大樓】 邪教據點：教主莫爾斯向信徒洗腦：『拿起聖刃給世界釋放與救贖！』", action: "cult_morse", speaker: "Morse" },
    { text: "【第二幕：廢棄大樓】 Alan 成功奪刀，將 Elena 交給 Anna 銬住並帶回警局。", action: "arrest_elena", speaker: "Alan" },

    // 第三幕
    { text: "【第三幕：審訊室】 醫師說明 Elena 患有解離症與交替人格，會遺忘部分記憶。", action: "doctor_talk", speaker: "醫師" },
    { text: "【第三幕：審訊室】 第二人格浮現，指認 Anna 也是莫爾斯的人，曾站在教主身邊！", action: "elena_alt", speaker: "第二人格" },
    { text: "【第三幕：審訊室】 Anna 突然拔槍指向 Alan：『我不想傷害你...』隨後逃出警局。", action: "anna_betray", speaker: "Anna" },

    // 第四幕
    { text: "【第四幕：邪教據點】 警方與充氣恐龍（使出海陸計畫B撞倒卡爾）衝入據點混戰！", action: "raid_cult", speaker: "旁白" },
    { text: "【第四幕：邪教據點】 Anna 透露三年前搭檔身亡與體制的冷血。Alan：『今天，你還可以救你自己。』", action: "anna_redeem", speaker: "Alan" },
    { text: "【第四幕：結局】 Anna 醒悟將槍口轉向莫爾斯。莫爾斯被捕，Anna 主動伸出雙手戴上手銬。", action: "ending", speaker: "旁白" }
];

let currentIndex = 0;
let isPlaying = false;
let timer = null;

// 根據動作代號繪製對應畫面
function drawAnimation(action) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製背景與情境
    if (action.includes("police")) {
        // 警局背景：畫地圖與照片
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(50, 50, 200, 120); // 地圖
        ctx.strokeStyle = "#e74c3c";
        ctx.strokeRect(300, 60, 60, 80); // 案發現場照片
        ctx.strokeRect(380, 60, 60, 80);
    } else if (action.includes("abandoned") || action.includes("dino") || action.includes("elena") || action.includes("cult")) {
        // 廢棄大樓暗色背景
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (action === "cult_morse") {
            // 血紅光芒背景
            ctx.fillStyle = "rgba(192, 57, 43, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    // 地面線
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(750, 350);
    ctx.stroke();

    // 依照不同情節繪製火柴人動作
    if (action === "dino") {
        // Alan 警探 (藍色)
        drawStickman(250, 270, "#3498db", "gun");
        // 充氣恐龍 (綠色胖胖身軀)
        ctx.fillStyle = "#2ecc71";
        ctx.beginPath();
        ctx.arc(520, 290, 35, 0, Math.PI * 2);
        ctx.fill();
        drawStickman(520, 270, "#2ecc71", "short_hands");
    } else if (action === "anna_betray") {
        // Alan 與拿槍對峙的 Anna
        drawStickman(300, 270, "#3498db", "normal");
        drawStickman(500, 270, "#e74c3c", "gun"); // 紅色代表危機/對峙
    } else if (action === "cult_morse") {
        // 教主莫爾斯 (紫色高處)
        drawStickman(400, 200, "#9b59b6", "raise_hand");
        // 信徒群眾
        drawStickman(250, 270, "#7f8c8d", "normal");
        drawStickman(550, 270, "#7f8c8d", "normal");
    } else {
        // 一般雙人對話場景 (Alan 與 Anna / 助手)
        drawStickman(300, 270, "#3498db", "normal");
        drawStickman(500, 270, "#e67e22", "normal");
    }
}

// 繪製火柴人輔助函式
function xDrawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawStickman(x, y, color, pose) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    
    // 頭部
    ctx.beginPath();
    ctx.arc(x, y - 50, 18, 0, Math.PI * 2);
    ctx.stroke();
    
    // 身體
    xDrawLine(x, y - 32, x, y + 20);
    
    // 雙腿
    xDrawLine(x, y + 20, x - 15, y + 70);
    xDrawLine(x, y + 20, x + 15, y + 70);
    
    // 雙手姿勢
    if (pose === "gun") {
        xDrawLine(x, y - 10, x + 30, y - 10); // 舉槍
    } else if (pose === "short_hands") {
        xDrawLine(x, y - 10, x + 10, y - 5);  // 恐龍短手
        xDrawLine(x, y - 10, x - 10, y - 5);
    } else if (pose === "raise_hand") {
        xDrawLine(x, y - 10, x + 25, y - 35); // 舉手演講
        xDrawLine(x, y - 10, x - 25, y - 35);
    } else {
        xDrawLine(x, y - 10, x - 20, y + 10); // 普通垂手
        xDrawLine(x, y - 10, x + 20, y + 10);
    }
}

// 播放下一句
function playNext() {
    if (!isPlaying) return;
    
    const currentLine = scriptLines[currentIndex];
    subtitleBox.innerText = currentLine.text;
    drawAnimation(currentLine.action);
    
    currentIndex++;
    if (currentIndex >= scriptLines.length) {
        currentIndex = 0; // 循環播放或停止
        isPlaying = false;
        document.getElementById('playBtn').innerText = "重新播放動畫";
        return;
    }
    
    timer = setTimeout(playNext, 4500); // 每句停留 4.5 秒自動換下一句
}

// 按鈕控制
document.getElementById('playBtn').addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        document.getElementById('playBtn').innerText = "暫停播放";
        playNext();
    } else {
        isPlaying = false;
        clearTimeout(timer);
        document.getElementById('playBtn').innerText = "繼續播放";
    }
});

// 初始化第一幕畫面
drawAnimation(scriptLines[0].action);
subtitleBox.innerText = scriptLines[0].text;
