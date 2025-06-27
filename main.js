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