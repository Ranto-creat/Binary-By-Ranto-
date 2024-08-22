const convert = document.querySelector('.convert');
const convertInverse = document.querySelector('.convertInverse');
const reset = document.querySelector('.reset');
const oneInput = document.querySelector('.oneInput');
const twoInput = document.querySelector('.twoInput');

const toBinary = (n) => {
    const [integerPart, fractionalPart] = n.split('.'); // Séparer la partie entière et fractionnaire
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
    twoInput.value = toBinary(oneInput.value);
});

convertInverse.addEventListener('click', () => {
    oneInput.value = toDecimal(twoInput.value);
});

reset.addEventListener('click', () => {
    oneInput.value = '';
    twoInput.value = '';
});
