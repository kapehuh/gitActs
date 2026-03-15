interface SearchWidgetOptions {
  formId: string;
  inputId: string;
  onSearch: (city: string) => void;
}

class SearchWidget {
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private onSearch: (city: string) => void;

  constructor({ formId, inputId, onSearch }: SearchWidgetOptions) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);

    if (!form || !input) {
      throw new Error(
        `Search widget: elements with ids "${formId}" or "${inputId}" not found`,
      );
    }

    this.form = form as HTMLFormElement;
    this.input = input as HTMLInputElement;
    this.onSearch = onSearch;
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  private handleSubmit(event: Event): void {
    event.preventDefault();
    const city = this.input.value.trim();
    if (city) {
      this.onSearch(city);
      this.input.value = "";
    }
  }
}

export default SearchWidget;
