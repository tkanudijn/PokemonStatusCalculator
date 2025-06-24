// 空のオブジェクトを宣言（jsonデータを格納する変数）
let pokemonStats = {};

// JSONファイルを読み込む
fetch('PokemonData.json')
// 取得したレスポンスをjsonデータに変換する
    .then(response => response.json())
// jsonデータを格納
    .then(data => {
        pokemonStats = data;
// ポケモンのリストをセットアップする
        initializePokemonList();
// ポケモンのステータスを計算する
        calculateStats();
    })
// jsonデータの取得に失敗した際のエラーメッセージ
    .catch(error => console.error('Error loading PokemonData.json:', error));

// ポケモン名のサジェストリストを初期化する
function initializePokemonList() {
// リストにポケモン名の候補を追加するための参照
    const datalist = document.getElementById('pokemonList');
// 前回データが残らないように既存の項目を削除
    datalist.innerHTML = '';
// 各ポケモン名をループする
    for (const pokemon in pokemonStats) {
        const option = document.createElement('option');
        option.value = pokemon;
        datalist.appendChild(option);
    }
}

//document.addEventListener('DOMContentLoaded', () => {
    // pokemonSection.htmlを読み込み、#pokemonSectionに挿入
    //fetch('pokemonSection.html')
        //.then(response => response.text())
        //.then(html => {
            //document.getElementById('pokemonSection').innerHTML = html;
            // サジェストリストの初期化をここで行う
            //initializePokemonList();
            //calculateStats(); // 初期計算
        //})
        //.catch(error => console.error('Error loading pokemonSection.html:', error));

    //const inputs = document.querySelectorAll('input, select');
    //inputs.forEach(input => {
        //input.addEventListener('input', calculateStats);
        //input.addEventListener('change', calculateStats);
    //});
//});

function updatePokemonImage(pokemonName) {
    const imageElement = document.getElementById('pokemonImage');
    if (pokemonName in pokemonStats) {
        imageElement.src = `./images/${pokemonName}.png`; // 画像ファイルのパスを設定
        imageElement.alt = pokemonName;
    } else {
        imageElement.src = ""; // ポケモンが見つからなかった場合は画像を非表示
        imageElement.alt = "画像なし";
    }
}

// 努力値と補正をリセットする関数
function resetStats() {
    // 努力値のリセット
    document.getElementById('hpEV').value = 0;
    document.getElementById('attackEV').value = 0;
    document.getElementById('defenseEV').value = 0;
    document.getElementById('spAttackEV').value = 0;
    document.getElementById('spDefenseEV').value = 0;
    document.getElementById('speedEV').value = 0;

    // 個体値のリセット
    document.getElementById('hpIV').value = 31;
    document.getElementById('attackIV').value = 31;
    document.getElementById('defenseIV').value = 31;
    document.getElementById('spAttackIV').value = 31;
    document.getElementById('spDefenseIV').value = 31;
    document.getElementById('speedIV').value = 31;

    // 性格補正のリセット
    document.getElementById('attackNature').value = "1";
    document.getElementById('defenseNature').value = "1";
    document.getElementById('spAttackNature').value = "1";
    document.getElementById('spDefenseNature').value = "1";
    document.getElementById('speedNature').value = "1";

    // 性格補正のインジケーターもリセット
    document.getElementById('attackNatureIndicator').textContent = "";
    document.getElementById('defenseNatureIndicator').textContent = "";
    document.getElementById('spAttackNatureIndicator').textContent = "";
    document.getElementById('spDefenseNatureIndicator').textContent = "";
    document.getElementById('speedNatureIndicator').textContent = "";

    // 素早さ関連の補正リセット
    document.getElementById('itemMultiplier').value = '1';
    document.getElementById('abilityMultiplier').value = '1';
    document.getElementById('rankMultiplier').value = '1';
    document.getElementById('paralysisMultiplier').value = '1';

    // ステータスの再計算
    calculateStats();
}

// 性格補正のインジケーターを更新する関数を追加
function updateNatureIndicator(indicatorId, value) {
    const indicator = document.getElementById(indicatorId);
    if (value == 0.9) {
        indicator.textContent = '↓';
        indicator.style.color = 'blue'; // 下がる場合は青
    } else if (value == 1.1) {
        indicator.textContent = '↑';
        indicator.style.color = 'red'; // 上がる場合は赤
    } else {
        indicator.textContent = '';
        indicator.style.color = 'black'; // 通常時は黒
    }
}

function calculateStats() {
    const pokemonName = document.getElementById('pokemonName').value;
    updatePokemonImage(pokemonName); // 画像を更新
    const levelInput = document.getElementById('level');
    const level = Math.min(Math.max(parseInt(levelInput?.value) || 50, 1), 100);

    // HP実数値計算
    const hpIV = Math.min(Math.max(parseInt(document.getElementById('hpIV').value) || 0, 0), 31);
    const hpEV = Math.min(Math.max(parseInt(document.getElementById('hpEV').value) || 0, 0), 252);

    // 攻撃実数値計算
    const attackIV = Math.min(Math.max(parseInt(document.getElementById('attackIV').value) || 0, 0), 31);
    const attackEV = Math.min(Math.max(parseInt(document.getElementById('attackEV').value) || 0, 0), 252);
    const attackNature = parseFloat(document.getElementById('attackNature').value);

    // 防御実数値計算
    const defenseIV = Math.min(Math.max(parseInt(document.getElementById('defenseIV').value) || 0, 0), 31);
    const defenseEV = Math.min(Math.max(parseInt(document.getElementById('defenseEV').value) || 0, 0), 252);
    const defenseNature = parseFloat(document.getElementById('defenseNature').value);

    // 特攻実数値計算
    const spAttackIV = Math.min(Math.max(parseInt(document.getElementById('spAttackIV').value) || 0, 0), 31);
    const spAttackEV = Math.min(Math.max(parseInt(document.getElementById('spAttackEV').value) || 0, 0), 252);
    const spAttackNature = parseFloat(document.getElementById('spAttackNature').value);

    // 特防実数値計算
    const spDefenseIV = Math.min(Math.max(parseInt(document.getElementById('spDefenseIV').value) || 0, 0), 31);
    const spDefenseEV = Math.min(Math.max(parseInt(document.getElementById('spDefenseEV').value) || 0, 0), 252);
    const spDefenseNature = parseFloat(document.getElementById('spDefenseNature').value);

    // 素早さ実数値計算
    const speedIV = Math.min(Math.max(parseInt(document.getElementById('speedIV').value) || 0, 0), 31);
    const speedEV = Math.min(Math.max(parseInt(document.getElementById('speedEV').value) || 0, 0), 252);
    const speedNature = parseFloat(document.getElementById('speedNature').value);
    
    // 持ち物、特性、ランク、麻痺の補正を取得
    const itemMultiplier = parseFloat(document.getElementById('itemMultiplier').value);
    const abilityMultiplier = parseFloat(document.getElementById('abilityMultiplier').value);
    const rankMultiplier = parseFloat(document.getElementById('rankMultiplier').value);
    const paralysisMultiplier = parseFloat(document.getElementById('paralysisMultiplier').value);
    
    // 各種補正を適用した素早さ実数値計算
    const totalSpeedMultiplier = itemMultiplier * abilityMultiplier * rankMultiplier * paralysisMultiplier;

    // 合計努力値の計算
    const totalEV = hpEV + attackEV + defenseEV + spAttackEV + spDefenseEV + speedEV;
    const remainingEV = 510 - totalEV;
    document.getElementById('remainingEV').textContent = remainingEV;

    if (pokemonName in pokemonStats) {
        const stats = pokemonStats[pokemonName];
        const hActual = Math.floor(((stats.H * 2 + hpIV + Math.floor(hpEV / 4)) * level / 100) + 10 + level);
        const aActual = Math.floor((((stats.A * 2 + attackIV + Math.floor(attackEV / 4)) * level / 100) + 5) * attackNature);
        const bActual = Math.floor((((stats.B * 2 + defenseIV + Math.floor(defenseEV / 4)) * level / 100) + 5) * defenseNature);
        const cActual = Math.floor((((stats.C * 2 + spAttackIV + Math.floor(spAttackEV / 4)) * level / 100) + 5) * spAttackNature);
        const dActual = Math.floor((((stats.D * 2 + spDefenseIV + Math.floor(spDefenseEV / 4)) * level / 100) + 5) * spDefenseNature);
        const speedBaseValue = Math.floor((((stats.S * 2 + speedIV + Math.floor(speedEV / 4)) * level / 100) + 5) * speedNature);
        const sActual = Math.floor(speedBaseValue * totalSpeedMultiplier);
        
        // テーブルに結果を出力
        document.getElementById('baseHP').textContent = stats.H;
        document.getElementById('baseAttack').textContent = stats.A;
        document.getElementById('baseDefense').textContent = stats.B;
        document.getElementById('baseSpAttack').textContent = stats.C;
        document.getElementById('baseSpDefense').textContent = stats.D;
        document.getElementById('baseSpeed').textContent = stats.S;

        document.getElementById('hpActual').textContent = hActual;
        document.getElementById('attackActual').textContent = aActual;
        document.getElementById('defenseActual').textContent = bActual;
        document.getElementById('spAttackActual').textContent = cActual;
        document.getElementById('spDefenseActual').textContent = dActual;
        document.getElementById('speedActual').textContent = sActual;
    } else {
        document.getElementById('result').innerHTML = "ポケモン名が正しくありません。";
    }
}
