/**
 * A simple greeter utility class
 */
export class Greeter {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Greets the person by name
   * @returns A greeting message
   */
  greet(): string {
    return `Hello, ${this.name}!`;
  }

  /**
   * Greets the person formally
   * @returns A formal greeting message
   */
  greetFormally(): string {
    return `Good day, ${this.name}. How do you do?`;
  }
}
