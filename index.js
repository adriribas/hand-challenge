import fs from 'fs';

const getTest = fileName => fs.readFileSync(`${process.cwd()}\\${fileName}.hand`).toString();

const MAX_VALUE = 255;
const DEFAULT_VALUE = 0;

const execute = sequence => {
    const arraySequence = Array.from(sequence);
    const memory = [DEFAULT_VALUE];
    let pointer = 0;
    let i = 0;

    const actions = {
        '👉': () => {
            pointer++;
            memory[pointer] ??= DEFAULT_VALUE;
        },
        '👈': () => pointer--,
        '👆': () => memory[pointer] = (memory[pointer] + 1) % (MAX_VALUE + 1),
        '👇': () => memory[pointer] = (memory[pointer] + MAX_VALUE) % (MAX_VALUE + 1),
        '🤜': () => {
            if (memory[pointer] !== DEFAULT_VALUE) {
                return;
            }
            const stack = [];
            stack.push('🤜');
            while (stack.length > 0 && i + 1 < arraySequence.length) {
                if (arraySequence[i + 1] === '🤜') {
                    stack.push('🤜');
                } else if (arraySequence[i + 1] === '🤛') {
                    stack.pop();
                }
                i++;
            }
        },
        '🤛': () => {
            if (memory[pointer] === DEFAULT_VALUE) {
                return;
            }
            const stack = [];
            stack.push('🤛');
            while (stack.length > 0 && i - 1 >= 0) {
                if (arraySequence[i - 1] === '🤛') {
                    stack.push('🤛');
                } else if (arraySequence[i - 1] === '🤜') {
                    stack.pop();
                }
                i--;
            }
        },
        '👊': () => process.stdout.write(String.fromCharCode(memory[pointer]))
    };

    while (i < arraySequence.length) {
        actions[arraySequence[i]]();
        i++;
    }
};

//execute(getTest('test1'));
//execute(getTest('test2'));
execute(getTest('input'));
