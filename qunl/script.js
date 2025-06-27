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
