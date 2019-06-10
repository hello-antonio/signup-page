(function() {
  const form = document.querySelector("form");

  class ValidateClientSideForm {
    constructor(form) {
      this._form = form;
      this.validator = {
        email: {
          regex: /^([a-zA-Z0-9\.-]{1,64})+@([a-z]{1,254})+\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
          help: "Looks like this is not an email"
        },
        text: {
          regex: /^[a-zA-Z\s]+?$/,
          help: "cannot be empty"
        },
        password: {
          regex: /^[a-zA-Z0-9\_-]+?$/,
          help: "cannot be empty"
        }
      };

      this._errors = [];

      this.fields = [
        ...this._form.querySelectorAll(
          "input[type=text], input[type=email], input[type=password]"
        )
      ];
    }

    init() {
      this._form.addEventListener("submit", this.handleSubmit.bind(this));

      this.fields.forEach(input => {
        input.addEventListener("focus", this.handleFocus.bind(this));
        input.addEventListener("blur", this.handleBlur.bind(this));
        input.addEventListener("keyup", this.handleKeyboard.bind(this));
      });
    }

    validate(field) {
      const { value, type, name } = field;

      if (value === "") {
        // report error
        this.addHelp(field);
        this.reportError(name);
      } else if (this.validator[type].regex.test(value)) {
        // clean up errors
        this.clearHelp(field);
        this.clearError(name);
      } else {
        // report error
        this.addHelp(field);
        this.reportError(name);
      }
    }

    addHelp(field) {
      const { type } = field;
      field.classList.add("invalid");
      field.classList.remove("valid");
      field.setAttribute("aria-invalid", true);
      field.parentElement.nextElementSibling.textContent = `${
        type === "email"
          ? this.validator[type].help
          : [field.labels[0].textContent, this.validator[type].help].join(` `)
      }`;
    }

    clearHelp(field) {
      field.classList.remove("invalid");
      field.classList.add("valid");
      field.setAttribute("aria-invalid", false);
      field.parentElement.nextElementSibling.textContent = "";
    }

    clearError(errName) {
      if (this._errors.length == 0) return;
      this._errors.splice(this._errors.indexOf(errName), 1);
    }

    reportError(errName) {
      if (this._errors.includes(errName)) return;
      this._errors.push(errName);
    }

    handleSubmit(event) {
      event.preventDefault();
      if (this._errors.length > 0) return false;
      else return true;
    }

    handleFocus({ target }) {
      target.parentElement.classList.add("focused");
    }

    handleBlur({ target }) {
      if (target.value.length === 0) {
        target.parentElement.classList.remove("focused");
      }
    }

    handleKeyboard({ target }) {
      this.validate(target);
    }
  }

  new ValidateClientSideForm(form).init();
})();
