(function () {
    const iframe = s('iframe');

    const input = {
        interface: s('input[type=checkbox]'),
        colours: {
            calculator: ss('input[name=calculator]'),
            button: ss('input[name=button]'),
            font: ss('input[name=font]')
        }
    };

    input.interface.onclick = function () {
        const btn = iframe.contentWindow.document.querySelector('section');
        if(this.checked == true) btn.classList.add('hide');
        else btn.classList.remove('hide');
    }

    input.colours.calculator.forEach(el => {
        el.onclick = function () {
            log(this.value)
        }
    });
    input.colours.button.forEach(el => {
        el.onclick = function () {
            log(this.value)
        }
    });
    input.colours.font.forEach(el => {
        el.onclick = function () {
            log(this.value)
        }
    });
})();