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

    const storage = {
        interface: {
            screenOnly: false
        },
        colours: {
            calculator: null,
            button: null,
            font: null
        }
    };

    input.interface.onclick = function () {
        const btn = iframe.document.querySelector('section');
        btn.classList.toggle('hide');
        if (this.checked == true) storage.interface.screenOnly = true;
        else storage.interface.screenOnly = false;
    }

    input.colours.calculator.forEach(el => {
        el.onclick = () => {
            const color = '#' + el.value;
            storage.colours.calculator = color;
            ui.calculator.style.backgroundColor = color;
            ui.buttons.forEach(el => el.style.border = '5px solid ' + color);
        }
    });
    input.colours.button.forEach(el => {
        el.onclick = () => {
            const color = '#' + el.value;
            storage.colours.button = color;
            ui.buttons.forEach(el => el.style.backgroundColor = color);
        }
    });
    input.colours.font.forEach(el => {
        el.onclick = () => {
            const color = '#' + el.value;
            storage.colours.font = color;
            ui.buttons.forEach(el => el.style.color = color);
        }
    });

    s('button[type=submit]').onclick = () => {
        browser.storage.sync.set(storage);
        log('Options Saved');
    }

    browser.storage.sync.get(['colours', 'interface']).then(res => {
        if(res == undefined) return log('There is no option saved');
        if(res.interface.screenOnly == true) input.interface.click();

        s(`fieldset.calculator > input[value="${res.colours.calculator.substr(1, res.colours.calculator.length)}"]`).click()
        s(`fieldset.calculator > input[value="${res.colours.button.substr(1, res.colours.button.length)}"]`).click()
        s(`fieldset.calculator > input[value="${res.colours.font.substr(1, res.colours.font.length)}"]`).click()
    })
})();

//Kadang error harus muat ulang
//id addon
//24a6f891de8ef6d442e57b24ac3e899deb7d772a@temporary-addon
//atau yg di manifest gk pake / diakhir