(function() {
  const form = document.querySelector("form");

  /**
   * Client-Side Validation
   * ATTENTION: Server-side validation is REQUIRED
   */
  class ValidateClientSideForm {
    constructor(form) {
      this._form = form;

      /*
      Validation patterns for different field types. Password validation is very loose, don't forget this is only a demo without clear requirement about this type of data.
      */
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

      this.fields.forEach(field => {
        field.addEventListener("focus", this.handleFocus.bind(this), true);
        field.addEventListener("blur", this.handleBlur.bind(this), true);
        field.addEventListener("input", this.handleInput.bind(this));
      });
    }

    validate(field) {
      const { value, type, name } = field;

      if (value === "") return false;
      else if (name === "email")
        if (this.validator[name].regex.test(value)) return true;
        else return false;
      else if (this.validator[type].regex.test(value)) return true;
      else return false;
    }

    addValidation(field) {
      if (this.validate(field)) this.removeAlert(field.id);
      else this.addAlert(field.id);
    }

    addAlert(id) {
      const field = this.fields.find(field => field.id === id);
      this.setAlert(field);
      this.setError(field.name);
    }

    removeAlert(id) {
      const field = this.fields.find(field => field.id === id);
      this.clearAlert(field);
      this.clearError(field.name);
    }

    setAlert(field) {
      const { type, name } = field;
      field.classList.add("invalid");
      field.classList.remove("valid");
      field.setAttribute("aria-invalid", true);
      field.parentElement.nextElementSibling.textContent = `${
        name === "email"
          ? this.validator[name].help
          : [field.labels[0].textContent, this.validator[type].help].join(` `)
      }`;
    }

    clearAlert(field) {
      field.classList.remove("invalid");
      field.classList.add("valid");
      field.setAttribute("aria-invalid", false);
      field.parentElement.nextElementSibling.textContent = "";
    }

    setError(errName) {
      if (this._errors.includes(errName)) return;
      this._errors.push(errName);
    }

    clearError(errName) {
      if (this._errors.length == 0) return;
      this._errors.splice(this._errors.indexOf(errName), 1);
    }

    setFocus(name) {
      const el = this.fields.find(el => el.name === name);
      el.focus();
    }

    getEmptyFields() {
      return this.fields.filter(field => {
        return field.value === "";
      });
    }

    submitForm() {
      // If found errors from instant validation then auto focus the first error
      if (this._errors.length > 0) {
        this.setFocus(this._errors[0]);
        return false;
      }
      // else validate fields if user left empty fields
      else if (this.getEmptyFields().length > 0) {
        this.getEmptyFields().forEach(field => {
          this.addValidation(field);
        });
        this.setFocus(this.getEmptyFields()[0].name);
        return false;
      }
      // ready to subumit form
      else return true;
    }

    handleSubmit(event) {
      event.preventDefault();

      // returns true if form has no errors else false forms has errors.
      this.submitForm();
    }

    handleFocus({ target }) {
      target.parentElement.classList.add("focused");
    }

    handleBlur({ target }) {
      if (target.value.length == 0) {
        target.parentElement.classList.remove("focused");
      }
    }

    handleInput({ target }) {
      // handles instant validation the field
      this.addValidation(target);
    }
  }

  new ValidateClientSideForm(form).init();
})();
