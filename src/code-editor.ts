import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

class CodeEditor extends HTMLElement {

    private css = `.code-editor-wrapper {
                position: relative;
                width: 600px;
                height: 400px;
                text-align: initial;
            }

            .console-wrapper {
                display: flex;
                width: calc(100%-28px);
                height: 131px;
                background-color: #1e1e1e;
                box-shadow: inset 1px 0px 16px 2px #151515;
                padding: 17px;
            }

            .console-wrapper .panel {
                display: flex;
                flex-direction: column;
            }
            

            .console-wrapper .console {
                width: 100%;
                text-align: initial;
                overflow: auto;
                padding-left: 17px;
                font-size: 12px;
                display: flex;
                flex-direction: column;
            }
            .console-wrapper .console .error {
                color: red;
            }
            button {
                cursor: pointer;
            }
        `;
    private html = `
            <div class="editor">
                <div class="code-editor-wrapper" id="code-editor-wrapper"></div>
                <div class="console-wrapper">
                    <div class="panel">
                        <button class='execute'>Execute</button>
                        <button class='clear'>Clear</button>
                    </div>
                    <div class="console"></div>
                </div>
                
            </div>
        `
    private editor: any;

    private wrapper: any;

    constructor() { super(); }

    connectedCallback() {
        const root = this.getRootElement();
        const wrapper = root.getElementsByClassName('code-editor-wrapper')[0];
        this.editor = monaco.editor.create(wrapper, {
            value: this.getExampleCode(),
            language: 'javascript',
            theme: 'vs-dark'
        });

        const executeButton = root.getElementsByClassName('execute')[0];
        executeButton.onclick = () => this.execute();

        const cleanButton = root.getElementsByClassName('clear')[0];
        cleanButton.onclick = () => this.cleanConsole();
    }

    getRootElement() {
        if (!this.wrapper) {
            this.wrapper = document.getElementById("code-editor");
            this.wrapper.innerHTML = this.html;
            this.wrapper.append(this.getStyles());
        }
        return this.wrapper;
    }

    getStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = this.css;
        return styleElement;
    }

    getExampleCode() {
        return ` const confusionMatrix = new ConfusionMatrix({
    labels: ["Happiness", "Sadness", "Disgust"],
    matrix: [
        [50, 2, 3],
        [8, 50, 5],
        [2, 5, 50]
    ]
});

// Calculates the accuracy value for the all matrix.
const accuracy = confusionMatrix.accuracy();
console.log(\`The accuracy value is: \${accuracy}\`);

// Calculates the f1Score, only for "sadness" class, using the Macro average method.
const f1score = confusionMatrix.f1Score({
    label: "Sadness",
    average: AverageMethod.Macro
});
console.log(\`The f1Score for 'Sadness' is: \${f1score}\`);
`
    }

    execute() {
        // const oldConsole = console;
        // const consoleElement = this.getConsole();
        // console.log = (message, error) => {
        //     let html = `<span class="${error ? 'error' : ''}">`
        //     if (typeof message == 'object') {
        //         html += (JSON && JSON.stringify ? JSON.stringify(message) : message);
        //     } else {
        //         html += message;
        //     }
        //     consoleElement.innerHTML += `${html}</span>`
        // };
        // console.error = (message) => console.log(message, true);

        // const code = this.editor.getValue();
        // try {
        //     window.ConfusionMatrix = ConfusionMatrix;
        //     window.AverageMethod = AverageMethod;
        //     const br = this.executeTimes > 0 ? '</br>' : '';
        //     ++this.executeTimes;
        //     consoleElement.innerHTML += `${br}<span>Execution ${this.executeTimes}:</span>`
        //     eval(code);
        // } catch (ex) {
        //     console.error(ex.toString());
        // }
        // window.ConfusionMatrix = undefined;
        // window.AverageMethod = undefined;
        // console = oldConsole;
    }

    getConsole() {
        // if (!this.consoleElement) {
        //     const root = this.getRootElement();
        //     this.consoleElement = root.getElementsByClassName('console')[0];
        // }
        // return this.consoleElement;
    }

    cleanConsole() {
        // const consoleElement = this.getConsole();
        // consoleElement.innerHTML = '';
    }
}

window.customElements.define('code-editor', CodeEditor);