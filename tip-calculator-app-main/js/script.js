class Gorjeta {
    constructor({ bill, percent, customTip, people, error, errorBill, reset, tipAmount, total, container, calc }) {
        const $ = param => {return document.querySelector(param)}
        
        this.bill = $(bill);
        this.percent = document.querySelectorAll(percent);
        this.customTip = $(customTip);
        this.people = $(people);
        this.error = $(error);
        this.errorBill = $(errorBill);
        this.reset = $(reset);
        this.tipAmount = $(tipAmount);
        this.total = $(total);
        this.container = $(container);
        this.calc = $(calc);

        this.calcBtn();
        this.percentBtn();
        this.customBtn();
        this.clearStorage();
    }

    calcBtn() {
        this.calc.addEventListener('click', () => {
            if(this.bill.value == 0 || this.bill.value == '') {
                this.errorBill.style.display = 'block';
            } else if (this.people.value == 0 || this.people.value == '') {
                this.error.style.display = 'block';
                this.errorBill.style.display = 'none';
            } else {
                this.error.style.display = 'none';
                this.error.style.display = 'none';
                this.total.innerHTML = `$${(this.bill.value / this.people.value).toFixed(2)}`;

                if (this.customTip.value == '') {
                    this.tipAmount.innerHTML = `$${(localStorage.getItem('percent') * (this.bill.value / this.people.value) / 100).toFixed(2)}`;
                } else {
                    this.tipAmount.innerHTML = `$${(localStorage.getItem('custom') * (this.bill.value / this.people.value) / 100).toFixed(2)}`;
                }
                localStorage.clear();
                this.btnReset();
            }
        })
    }

    percentBtn() {
        this.percent.forEach(e => {
            e.addEventListener('click', () => {
                localStorage.setItem('percent', e.id);
                localStorage.removeItem('custom');
                this.customTip.value = '';
                document.querySelector(".active") ? document.querySelector(".active").classList.remove("active") : '';
                e.classList.add('active');
            })
        })
    }

    customBtn() {
        this.container.addEventListener('change', () => {
            if (!this.customTip.value == '') {
                    localStorage.setItem('custom', this.customTip.value);
            } else {
                localStorage.removeItem('custom');
            }
        })

        this.customTip.addEventListener('click', () => {
            this.percent.forEach(e => {
                e.classList.remove('active');
            })
            localStorage.removeItem('percent');
        })
    }

    btnReset() {
        this.reset.style.cursor = 'pointer';
        this.reset.style.opacity = 1;
        this.reset.addEventListener('click', () => {
            this.bill.value = '';
            this.people.value = '';
            this.total.innerHTML = '$0.00';
            this.tipAmount.innerHTML = '$0.00';
            this.customTip.value = '';
            this.reset.style.cursor = 'not-allowed';
            this.reset.style.opacity = 0.4;
            this.percent.forEach(e => e.classList.remove('active'));
            localStorage.clear();
        })
    }

    clearStorage() {
        window.onload = localStorage.clear()
    }
}

new Gorjeta({ 
    bill: '#bill',
    percent: '.percent',
    customTip: '#custom-tip',
    people: '#people',
    error: '#error',
    errorBill: '#errorBill',
    reset: '#reset',
    tipAmount: '#tip',
    total: '#total',
    container: '.container',
    calc: '#calc',
})