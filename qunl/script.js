// 配置参数
// 配置参数
const config = {
  users: [
      "宝宝", "小雨", "甜甜", "小可爱", "阳光", "小仙女",
      "大强", "阿涛", "晨晨", "静静", "楠楠", "子豪",
      "小张", "琪琪", "龙哥", "大帅", "思思", "露露",
      "涛哥", "阿鑫", "晨曦", "小鹿", "小雨点", "嘉嘉"
  ],
  showTime: 1000,   // 显示时间 1 秒
  interval: 3000,   // 每条间隔总时间（包含显示和隐藏）
  template: "{user}*** 刚刚支付了19.9元"
};

document.addEventListener('DOMContentLoaded', function() {
const cachedCity = localStorage.getItem('cached-city');
if (cachedCity) {
  updateCityDisplay(cachedCity);
}

fetch('https://v.api.aa1.cn/api/chinaip/?fast=1')
  .then(res => res.json())
  .then(data => {
    const city = data?.data?.City || '同城';
    localStorage.setItem('cached-city', city);
    updateCityDisplay(city);
  })
  .catch(() => {
    updateCityDisplay('同城');
  });

function updateCityDisplay(city) {
  document.title = `${city}·告别孤单寂寞冷`;
  const groupTitle = document.getElementById('group-name');
  if (groupTitle) groupTitle.textContent = `${city}·告别孤单寂寞冷`;
}

const names = ["王先生", "刘小姐", "张先生", "李小姐"];
const tips = document.querySelector('.top-banner');
function updateBanner() {
  const name = names[Math.floor(Math.random() * names.length)];
  tips.innerHTML = `${name}刚刚支付￥9.9加入群聊！`;
  setTimeout(() => {
    tips.innerHTML = '限时特价(原价198元)活动最后3天';
  }, 3000);
}
setInterval(updateBanner, 5000);

const payButton = document.querySelector('.pay-button');
payButton.addEventListener('click', function() {
  this.style.backgroundColor = '#a00';
  setTimeout(() => {
    this.style.backgroundColor = '#c00';
    alert('正在跳转支付页面...');
  }, 200);
});
});
// 初始化支付提示
function initPaymentNotice() {
  const notice = document.getElementById('paymentNotice');
  let currentIndex = 0;

  function updateNotice() {
      // 设置文本
      notice.textContent = config.template.replace('{user}', config.users[currentIndex]);

      // 淡入
      notice.style.opacity = '1';

      // 1秒后淡出
      setTimeout(() => {
          notice.style.opacity = '0';
      }, config.showTime);

      // 3秒后切换下一条
      currentIndex = (currentIndex + 1) % config.users.length;
      setTimeout(updateNotice, config.interval);
  }

  updateNotice();
}

document.addEventListener('DOMContentLoaded', initPaymentNotice);



// 分享功能 - 只复制链接，美化弹窗
function copyPageLink() {
const url = window.location.href;
const toast = document.createElement('div');
toast.className = 'toast-message';
toast.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
toast.innerHTML = '链接已复制，快去粘贴发给好友吧！';
document.body.appendChild(toast);

if (navigator.clipboard) {
  navigator.clipboard.writeText(url).then(() => {
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }).catch(() => {
    toast.innerHTML = '❌ 复制失败，请手动复制：<br>' + url;
    toast.style.background = 'linear-gradient(135deg, #ff5e62, #ff9966)';
  });
} else {
  const input = document.createElement('input');
  input.value = url;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}
}

// 收藏功能 - 美化弹窗
function bookmarkPage() {
const toast = document.createElement('div');
toast.className = 'toast-message';
toast.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';

if (window.sidebar && window.sidebar.addPanel) { // Firefox
  window.sidebar.addPanel(document.title, window.location.href, "");
  toast.innerHTML = '已添加到书签！';
} else if (window.external && ('AddFavorite' in window.external)) { // IE
  window.external.AddFavorite(window.location.href, document.title);
  toast.innerHTML = '已添加到收藏夹！';
} else if (window.chrome && window.chrome.webstore) { // Chrome
  toast.innerHTML = '请使用浏览器菜单<br>添加书签或收藏';
} else {
  toast.innerHTML = '请使用浏览器菜单<br>添加书签或收藏';
}

document.body.appendChild(toast);
setTimeout(() => {
  toast.style.animation = 'fadeOut 0.3s ease-out';
  setTimeout(() => document.body.removeChild(toast), 300);
}, 2000);
}
