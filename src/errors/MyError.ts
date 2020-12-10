export class MyError extends Error {
  constructor(message: string, public isFlawed: boolean) {
    super(message);
  }
}
