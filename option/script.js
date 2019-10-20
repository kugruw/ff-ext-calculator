(function () {
    const iframe = s('iframe').contentWindow;
    const ui = {
        calculator: iframe.document.querySelector('div.container'),
        buttons: iframe.document.querySelectorAll('[class*="ktk-"]'),
    }

    const input = {
        interface: s('input[type=checkbox]'),
        colours: {
            calculator: ss('input[name=calculator]'),
            button: ss('input[name=button]'),
            font: ss('input[name=font]')
        }
    };

    input.interface.onclick = function () {
        const btn = iframe.document.querySelector('section');
        if (this.checked == true) btn.classList.add('hide');
        else btn.classList.remove('hide');
    }

    input.colours.calculator.forEach(el => {
        const color = '#' + el.value;
        el.onclick = () => {
            ui.calculator.style.backgroundColor = color;
            ui.buttons.forEach(el => el.style.border = '5px solid ' + color);
        }
    });
    input.colours.button.forEach(el => {
        const color = '#' + el.value;
        el.onclick = () => ui.buttons.forEach(el => el.style.backgroundColor = color);
    });
    input.colours.font.forEach(el => {
        const color = '#' + el.value;
        el.onclick = () => ui.buttons.forEach(el => el.style.color = color);
    });
})();

//Kadang error harus muat ulang