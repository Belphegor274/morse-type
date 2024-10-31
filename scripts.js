const words = ["sos", "cqcq","qrz", "1", "6", "73", "happy","thx","bye","good","bad"];
const morseCodeMap = {
    'a': '.-',    'b': '-...',  'c': '-.-.',  'd': '-..',   'e': '.',
    'f': '..-.',  'g': '--.',   'h': '....',  'i': '..',    'j': '.---',
    'k': '-.-',   'l': '.-..',  'm': '--',    'n': '-.',    'o': '---',
    'p': '.--.',  'q': '--.-',  'r': '.-.',   's': '...',   't': '-',
    'u': '..-',   'v': '...-',  'w': '.--',   'x': '-..-',  'y': '-.--',
    'z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': ' / ' // スペースの表現
};

let currentWord = "";
let morseWord = "";
let score = 0;
let time = 60;
let isPlaying = false;
let interval;

const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

//単語をモールスにする

function wordsToMorse(text) {
    return text
        //.toLowerCace()
        .split('')
        .map(char => morseCodeMap[char] || '')
        .join(' ')
}

// ランダムな単語を取得
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// 新しい単語を設定
function setNewWord() {
    currentWord = getRandomWord();
    morseWord = wordsToMorse(currentWord);
    wordElement.textContent = currentWord;
    inputElement.value = "";
    console.log(currentWord);
    console.log(morseWord);
}

// ゲームスタート
function startGame() {
    if (!isPlaying) {
        isPlaying = true;
        setNewWord();
        interval = setInterval(updateTimer, 1000);
    }
}

// タイマー更新
function updateTimer() {
    time--;
    timerElement.textContent = `タイマー: ${time}`;
    if (time <= 0) {
        clearInterval(interval);
        isPlaying = false;
        alert(`ゲーム終了！スコアは${score}点です`);
    }
}

// 正しい入力を確認する
inputElement.addEventListener("input", () => {
    if (inputElement.value === morseWord) {
        score++;
        scoreElement.textContent = `スコア: ${score}`;
        setNewWord();
    }
});

// ゲームスタート時にエンターキーを押す
document.addEventListener("keypress", startGame);
console.log("Game start")