class SearchWidget {
  constructor({ formId, inputId, onSearch }) {
    this.form = document.getElementById(formId);
    this.input = document.getElementById(inputId);
    this.onSearch = onSearch;
    this.init();
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const city = this.input.value.trim();
    if (city) {
      this.onSearch(city);
      this.input.value = "";
    } else {
      alert("Please enter a city name");
    }
  }
}

export default SearchWidget;
