class SearchWidget {
  constructor(eventBus, { formId, inputId }) {
    this.eventBus = eventBus;
    this.form = document.getElementById(formId);
    this.input = document.getElementById(inputId);
    this.init();
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const city = this.input.value.trim();
    if (city) {
      this.eventBus.emit("city:changed", city);
      this.input.value = "";
    } else {
      this.eventBus.emit("weather:error", "Please enter a city name");
    }
  }
}

export default SearchWidget;
