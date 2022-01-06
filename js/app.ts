const { ipcRenderer } = require('electron');
let counterId: number = 0;

class FormClass {

    form: HTMLFormElement;
    nameInput: HTMLInputElement;
    DNInput: HTMLInputElement;
    adressFirstInput: HTMLInputElement;
    adressSecondInput: HTMLInputElement;
    numberFirstInput: HTMLInputElement;
    numberSecondInput: HTMLInputElement;
    phoneArea: HTMLInputElement;
    phoneNumber: HTMLInputElement;

    constructor() {
        // all selected HTML from DOM
        this.form = <HTMLFormElement>document.querySelector(".main__form");
        this.nameInput = <HTMLInputElement>document.querySelectorAll(".main__form--input")[0];
        this.DNInput = <HTMLInputElement>document.querySelectorAll(".main__form--input")[1]
        this.adressFirstInput = <HTMLInputElement>document.querySelectorAll(".main__form--input")[2];
        this.adressSecondInput = <HTMLInputElement>document.querySelectorAll(".main__form--input")[3];
        this.numberFirstInput = <HTMLInputElement>document.querySelectorAll(".main__form--input")[4];
        this.numberSecondInput = <HTMLInputElement>document.querySelectorAll(".main__form--input")[5];
        this.phoneArea = <HTMLInputElement>document.querySelectorAll(".main__form--input")[6]
        this.phoneNumber = <HTMLInputElement>document.querySelectorAll(".main__form--input")[7]

    }

    generateTxt() {

        this.form.addEventListener("submit", e => {

            e.preventDefault()
            //values from HTML
            let nameInputValue: string = this.nameInput.value;
            let DNInputValue: string = this.DNInput.value;
            let adressValueFirstInput: string = this.adressFirstInput.value;
            let adressValueSecondtInput: string = this.adressSecondInput.value;
            let numberValueFirstInput: number = parseInt(this.numberFirstInput.value);
            let numberValueSecondInput: number = parseInt(this.numberSecondInput.value);
            let phoneArea: number = parseInt(this.phoneArea.value);
            let phoneNumber: number = parseInt(this.phoneNumber.value);

            console.log()

            if (adressValueFirstInput === "" || numberValueFirstInput === NaN || phoneArea === NaN || phoneNumber === NaN) {
                alert("No pueden existir campos vacios.")
                return;
            }
            else if (adressValueFirstInput != adressValueSecondtInput) {
                alert("Los ingresos en calle deben ser iguales.");
                return;
            }
            else if (numberValueFirstInput != numberValueSecondInput) {
                alert("Los ingresos en el numero de casa debemn ser iugales.");
                return;
            }
            else {

                counterId++;
                //the info is storage in a Object            
                const formValues: Object = {
                    nameInputValue,
                    DNInputValue,
                    adressValueFirstInput,
                    numberValueFirstInput,
                    phoneArea,
                    phoneNumber,
                    counterId,

                }

                //object is send to the logical sheet(index.js)
                ipcRenderer.send("msg", formValues)
            }
        })

    }
}


const myFormObject = new FormClass();
myFormObject.generateTxt();

