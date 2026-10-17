window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>生肖抽取</title>
<style>
*{box-sizing:border-box;font-size:18px;font-family:system-ui}
body{padding:20px;margin:0;background:#f6f6f6}
.box{background:#fff;padding:20px;border-radius:12px;max-width:600px;margin:0 auto}
#log{white-space:pre-wrap;background:#111;color:#0f0;padding:12px;border-radius:8px;min-height:220px;margin-bottom:12px;overflow-y:auto}
input{width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;margin-bottom:10px}
button{padding:10px 16px;background:#2563eb;color:white;border:none;border-radius:8px;width:100%}
</style>
</head>
<body>
<div class="box">
<div id="log"></div>
<input id="inp" placeholder="输入排除生肖，q退出" autocomplete="off">
<button onclick="run()">开始抽取</button>
</div>
<script>
const zodiac = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const logDom = document.getElementById("log");
const inpDom = document.getElementById("inp");

// 安全随机洗牌（等价于Python SystemRandom）
function shuffle(arr){
    let a = [...arr];
    for(let i=a.length-1;i>0;i--){
        const r = new Uint32Array(1);
        crypto.getRandomValues(r);
        const j = r[0] % (i+1);
        [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
}

function print(s){
    logDom.innerText += s + "\n";
    logDom.scrollTop = logDom.scrollHeight;
}

print("===== 生肖抽取程序 =====");
print("十二生肖列表：" + zodiac.join("、"));
print("输入要排除的1个生肖，输入q退出程序\n");

function run(){
    const text = inpDom.value.trim();
    inpDom.value = "";
    if(text.toLowerCase() === "q"){
        print("程序已退出");
        return;
    }
    const pool = zodiac.filter(item=>item!==text);
    if(pool.length ===12){
        print(`⚠️ 警告：「${text}」不在生肖列表，使用全部12个抽取`);
    }else{
        print(`✅ 已排除【${text}】，剩余${pool.length}个，随机抽8个`);
    }
    const shuffled = shuffle(pool);
    const res = shuffled.slice(0,8);
    print("本次选出8个生肖：" + res.join("、"));
    print("——————————————————————");
}
// 回车触发
inpDom.onkeydown = e=>{if(e.key==="Enter")run()}
</script>
</body>
</html>
