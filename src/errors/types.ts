export type CustomError = Error & { cause: { name: string; message: string } }
