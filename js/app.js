var ipcRenderer = require('electron').ipcRenderer;
var counterId = 0;
var FormClass = /** @class */ (function () {
    function FormClass() {
        // all selected HTML from DOM
        this.form = document.querySelector(".main__form");
        this.nameInput = document.querySelectorAll(".main__form--input")[0];
        this.DNInput = document.querySelectorAll(".main__form--input")[1];
        this.adressFirstInput = document.querySelectorAll(".main__form--input")[2];
        this.adressSecondInput = document.querySelectorAll(".main__form--input")[3];
        this.numberFirstInput = document.querySelectorAll(".main__form--input")[4];
        this.numberSecondInput = document.querySelectorAll(".main__form--input")[5];
        this.phoneArea = document.querySelectorAll(".main__form--input")[6];
        this.phoneNumber = document.querySelectorAll(".main__form--input")[7];
    }
    FormClass.prototype.generateTxt = function () {
        var _this = this;
        this.form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nameInputValue = _this.nameInput.value;
            var DNInputValue = _this.DNInput.value;
            var adressValueFirstInput = _this.adressFirstInput.value;
            var adressValueSecondtInput = _this.adressSecondInput.value;
            var numberValueFirstInput = parseInt(_this.numberFirstInput.value);
            var numberValueSecondInput = parseInt(_this.numberSecondInput.value);
            var phoneArea = parseInt(_this.phoneArea.value);
            var phoneNumber = parseInt(_this.phoneNumber.value);
            console.log();
            if (adressValueFirstInput === "" || numberValueFirstInput === NaN || phoneArea === NaN || phoneNumber === NaN) {
                alert("No pueden existir campos vacios.");
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
                var formValues = {
                    nameInputValue: nameInputValue,
                    DNInputValue: DNInputValue,
                    adressValueFirstInput: adressValueFirstInput,
                    numberValueFirstInput: numberValueFirstInput,
                    phoneArea: phoneArea,
                    phoneNumber: phoneNumber,
                    counterId: counterId
                };
                //object is send to the logical sheet(index.js)
                ipcRenderer.send("msg", formValues);
            }
        });
    };
    return FormClass;
}());
var myFormObject = new FormClass();
myFormObject.generateTxt();
