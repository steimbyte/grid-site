export class FileUploader {
  static render(): string {
    return `
      <input type="file" id="file-input" accept=".html,.htm" class="file-input" multiple style="display:none;">
    `;
  }

  static init(): void {
    // No-op, file input is hidden
  }
}
