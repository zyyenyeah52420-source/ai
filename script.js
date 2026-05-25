// 当前页面
let currentPage = 1;
const totalPages = 6;

// 下一页
function nextPage() {
    if (currentPage < totalPages) {
        const currentPageEl = document.getElementById(`page${currentPage}`);
        currentPageEl.style.display = 'none';
        currentPage++;
        const nextPageEl = document.getElementById(`page${currentPage}`);
        nextPageEl.style.display = 'flex';
        window.scrollTo(0, 0);
    }
}

// 上一页
function prevPage() {
    if (currentPage > 1) {
        const currentPageEl = document.getElementById(`page${currentPage}`);
        currentPageEl.style.display = 'none';
        currentPage--;
        const prevPageEl = document.getElementById(`page${currentPage}`);
        prevPageEl.style.display = 'flex';
        window.scrollTo(0, 0);
    }
}

// 庆祝
function celebrate() {
    const currentPageEl = document.getElementById(`page${currentPage}`);
    currentPageEl.style.display = 'none';
    currentPage = 6;
    const celebratePage = document.getElementById('page6');
    celebratePage.style.display = 'flex';
    createFireworks();
    playConfetti();
    window.scrollTo(0, 0);
}

// 重新开始
function startAgain() {
    currentPage = 1;
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`page${i}`).style.display = 'none';
    }
    document.getElementById('page1').style.display = 'flex';
    window.scrollTo(0, 0);
}

// 创建烟火效果
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = getRandomColor();
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `explode ${2 + Math.random()}s ease-out forwards`;
        fireworksContainer.appendChild(particle);
    }
}

// 获取随机颜色
function getRandomColor() {
    const colors = ['#ff6b9d', '#ffa502', '#ff1744', '#ff9999', '#ffcc99'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 纸屑效果
function playConfetti() {
    const confettiPieces = 100;
    for (let i = 0; i < confettiPieces; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);

    let x = parseFloat(confetti.style.left);
    let y = 0;
    const duration = 3 + Math.random() * 2;
    const startTime = Date.now();

    function animate() {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = elapsed / duration;

        if (progress > 1) {
            confetti.remove();
            return;
        }

        y = window.innerHeight * progress;
        x += (Math.random() - 0.5) * 2;

        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.opacity = 1 - progress;

        requestAnimationFrame(animate);
    }

    animate();
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
@keyframes explode {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(
            calc((random() - 0.5) * 300px),
            calc((random() - 0.5) * 300px)
        ) scale(0);
        opacity: 0;
    }
}

@keyframes explodeLeft {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-200px, -200px) scale(0);
        opacity: 0;
    }
}

@keyframes explodeRight {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(200px, -200px) scale(0);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// 页面加载时的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('网页已加载完成');
    
    // 添加一些互动效果
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            // 涟漪效果
            const ripple = document.createElement('span');
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// 添加涟漪动画到style
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}
`;
document.head.appendChild(rippleStyle);
