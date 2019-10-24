function $(el) {
    return document.querySelector(el);
}

function $s(node) {
    return document.querySelectorAll(node);
}

//Click animation
$s('[class*=ktk-]').forEach(function (el) {
    el.addEventListener('click', function () {
        el.style.opacity = '0';
        setTimeout(function () {
            el.style.opacity = '1';
        }, 100);
    });
});
//End of click animation

const screen = $('.screen');
const saved = $('.saved');
const operand = $s('.ktk-pt');
const operator = $s('.ktk-opt');
let n = '';
let ket = '';

operand.forEach(function (el) {
    el.addEventListener('click', function (e) {
        if (ket == 'reset') {
            screen.innerText = el.innerText;
            ket = 'add';
        } else {
            if (screen.innerText.length === 15) return;
            else screen.innerText = Number(screen.innerText + el.innerText);
        }
    });
});

operand[10].addEventListener('click', function () {
    if (screen.innerText.includes('.') == false) screen.innerText = screen.innerText + '.';
});

//Operator
operator.forEach(function (el) {
    el.addEventListener('click', function () {
        let before = screen.innerText;
        let lP = saved.innerText.charAt(saved.innerText.length - 1);
        if (saved.innerText !== '' && ket === 'reset') {
            if (lP !== el.innerText) saved.innerText = saved.innerText.substring(0, saved.innerText.length - 1) + el.innerText;
            else {
                n = eval(n + lP + screen.innerText);
                screen.innerText = n;
                saved.innerText = saved.innerText + ' ' + before + ' ' + el.innerText;
            }
        } else {
            n = eval(n + lP + screen.innerText);
            screen.innerText = n;
            saved.innerText = saved.innerText + ' ' + before + ' ' + el.innerText;
        }
        ket = 'reset';
    });
});
//End of operator

$('.ktk-sma-dgn').addEventListener('click', function () {
    let lP = saved.innerText.charAt(saved.innerText.length - 1);
    n = eval(n + lP + screen.innerText);
    screen.innerText = n;
    saved.innerText = '';
    n = '';
    ket = 'reset';
});

$('.ktk-backspace').addEventListener('click', function () {
    let type = '';

    if (screen.innerText.length > 1) {
        for (let i = 0; i < screen.innerText.length - 1; i++) {
            type += screen.innerText.charAt(i);
        }
        screen.innerText = type;
    } else screen.innerText = 0;
});
$('.ktk-c').addEventListener('click', function () {
    n = '';
    saved.innerText = '';
    screen.innerText = 0;
});
$('.ktk-ce').addEventListener('click', function () {
    screen.innerText = 0;
});

//Keyboard event
function keyprees(target) {
    let x = event.key;
    target.forEach(function (el) {
        if (x == el.innerText) el.click();
        else if (x == el.getAttribute('id')) el.click();
        else if (x == 'x') window.close();
    });
}
window.addEventListener('keydown', function (e) {
    e.preventDefault();

    const dll = [$('.ktk-sma-dgn'), $('.ktk-backspace'), $('.ktk-c'), $('.ktk-ce')];
    keyprees(operand);
    keyprees(operator);
    keyprees(dll);
});
//End of keyboard event

browser.storage.sync.get(['colours', 'interface']).then(res => {
    const ui = {
        calculator: $('div.container'),
        buttons: $s('[class*="ktk-"]'),
    }

    if (res.interface.screenOnly == true) {
        $('section').classList.add('hide');
        ui.calculator.classList.add('no-padding');
        $('.ktk-head').classList.add('brd-rad');
    }

    ui.calculator.style.backgroundColor = res.colours.calculator;
    ui.buttons.forEach(el => {
        el.style.border = '5px solid ' + res.colours.calculator;
        el.style.backgroundColor = res.colours.button;
        el.style.color = res.colours.font
    });
});