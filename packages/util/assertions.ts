/**
 * Assert that the given argument isn't null and return it. Throw
 * an exception otherwise.
 *
 * This is primarily useful for situations where we're unable to
 * statically verify that something isn't null (e.g. due to the limitations
 * of typings we didn't write) but are sure it won't be in practice.
 */
 export function assertNotNull<T>(
  thing: T | null,
  msg: string = "Assertion failure, expected argument to not be null!"
): T | never {
  if (thing === null) {
    throw new Error(msg);
  }
  return thing;
}

/**
 * Assert that the given argument isn't undefined and return it. Throw
 * an exception otherwise.
 *
 * This is primarily useful for situations where we're unable to
 * statically verify that something isn't undefined (e.g. due to the limitations
 * of typings we didn't write) but are sure it won't be in practice.
 */
export function assertNotUndefined<T>(
  thing: T | undefined,
  msg: string = "Assertion failure, expected argument to not be undefined!"
): T | never {
  if (thing === undefined) {
    throw new Error(msg);
  }
  return thing;
}

/**
 * This function throws an exception with the given optional message. It's
 * useful as an assertion in combination with the logical OR or nullish
 * coalescing operators, as a way of asserting that a value must always
 * be truthy or non-nullish.
 */
export function hardFail(
  msg: string = "Code should never reach this point!"
): never {
  throw new Error(msg);
}
