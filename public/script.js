const convert = document.querySelector('.convert');
const convertInverse = document.querySelector('.convertInverse');
const reset = document.querySelector('.reset');
const oneInput = document.querySelector('.oneInput');
const twoInput = document.querySelector('.twoInput');
const errorMessage = document.querySelector('.error-message');

const toBinary = (n) => {
    const [integerPart, fractionalPart] = n.split('.');
    let binaryInteger = parseInt(integerPart, 10).toString(2);
    let binaryFractional = '';

    if (fractionalPart) {
        let fraction = parseFloat('0.' + fractionalPart);
        while (fraction > 0) {
            fraction *= 2;
            if (fraction >= 1) {
                binaryFractional += '1';
                fraction -= 1;
            } else {
                binaryFractional += '0';
            }
        }
    }

    return binaryFractional ? `${binaryInteger}.${binaryFractional}` : binaryInteger;
};

const toDecimal = (n) => {
    const [integerPart, fractionalPart] = n.split('.');
    let decimalInteger = parseInt(integerPart, 2);
    let decimalFractional = 0;

    if (fractionalPart) {
        for (let i = 0; i < fractionalPart.length; i++) {
            if (fractionalPart[i] === '1') {
                decimalFractional += Math.pow(2, -(i + 1));
            }
        }
    }

    return decimalFractional ? decimalInteger + decimalFractional : decimalInteger;
};

convert.addEventListener('click', () => {
    if (oneInput.value !== '' && twoInput.value !== '') {
        errorMessage.textContent = "Veuillez vider l'un des champs avant de continuer.";
    } else if (oneInput.value === '' || isNaN(oneInput.value)) {
        errorMessage.textContent = "Veuillez entrer un nombre décimal valide.";
    } else {
        errorMessage.textContent = ""; 
        twoInput.value = toBinary(oneInput.value);
    }
});

convertInverse.addEventListener('click', () => {
    if (oneInput.value !== '' && twoInput.value !== '') {
        errorMessage.textContent = "Veuillez vider l'un des champs avant de continuer.";
    } else if (!/^[01]+(\.[01]+)?$/.test(twoInput.value)) {
        errorMessage.textContent = "Veuillez entrer un nombre binaire valide (0 et 1 uniquement).";
    } else if(oneInput.value == '' && twoInput.value == '') {
        errorMessage.textContent = "veuillez entrer un nombre";
    } else {
        errorMessage.textContent = "";
        oneInput.value = toDecimal(twoInput.value);
    }
});

reset.addEventListener('click', () => {
    oneInput.value = '';
    twoInput.value = '';
    errorMessage.textContent = '';
});
