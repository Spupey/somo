// Игровые переменные
let score = 0;
let level = 1;
let clickPower = 1;
const weapons = [
    { name: "Лазерный пистолет", power: 1, unlockAt: 1, img: "🔫" },
    { name: "Плазменная пушка", power: 5, unlockAt: 3, img: "💥" },
    { name: "Квантовый меч", power: 10, unlockAt: 5, img: "⚔️" },
    { name: "Гравитационная бомба", power: 20, unlockAt: 10, img: "💣" },
    { name: "Звездный разрушитель", power: 50, unlockAt: 15, img: "🚀" },
    { name: "Черная дыра", power: 100, unlockAt: 20, img: "🌀" },
    { name: "Бесконечность", power: 1000, unlockAt: 30, img: "∞" }
];

// Элементы DOM
const clickArea = document.getElementById('click-area');
const clickEffect = document.getElementById('click-effect');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const weaponsContainer = document.getElementById('weapons');

// Клик по цели
clickArea.addEventListener('click', (e) => {
    score += clickPower;
    updateScore();
    
    // Эффект клика
    const x = e.clientX - clickArea.getBoundingClientRect().left;
    const y = e.clientY - clickArea.getBoundingClientRect().top;
    clickEffect.style.left = `${x - 100}px`;
    clickEffect.style.top = `${y - 100}px`;
    clickEffect.style.opacity = '1';
    setTimeout(() => { clickEffect.style.opacity = '0'; }, 300);
    
    // Проверка уровня
    checkLevel();
});

// Обновление счета
function updateScore() {
    scoreElement.textContent = score;
}

// Проверка уровня
function checkLevel() {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
        level = newLevel;
        levelElement.textContent = level;
        unlockWeapons();
    }
}

// Разблокировка оружия
function unlockWeapons() {
    weaponsContainer.innerHTML = '';
    weapons.forEach(weapon => {
        const isUnlocked = level >= weapon.unlockAt;
        const weaponElement = document.createElement('div');
        weaponElement.className = `weapon ${isUnlocked ? '' : 'locked'}`;
        weaponElement.innerHTML = `
            <div style="font-size: 2rem;">${weapon.img}</div>
            <h3>${weapon.name}</h3>
            <p>+${weapon.power} за клик</p>
            <p>${isUnlocked ? '✔ Разблокировано' : `🔓 Ур. ${weapon.unlockAt}`}</p>
        `;
        if (isUnlocked) {
            weaponElement.addEventListener('click', () => {
                clickPower += weapon.power;
                weaponElement.style.borderColor = '#ff0';
                weaponElement.style.background = 'rgba(255, 255, 0, 0.2)';
            });
        }
        weaponsContainer.appendChild(weaponElement);
    });
}

// Инициализация
unlockWeapons();
