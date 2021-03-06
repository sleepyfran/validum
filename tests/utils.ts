import Step, {
    ConditionExpression,
    Expression,
    ValidationExpression,
} from '../src/types/step'
import ValidatorSyntax from '../src/types/syntax'
import { ValidationError } from '../src/types/result'
import { Input } from '../src/types/input'

/**
 * Base interface for testing undefined properties.
 */
export interface UndefinedProperty<T> {
    property?: T
}

/**
 * Dummy input to be used in tests that require some kind of input but we don't
 * actually care about what it is.
 */
export const dummyInput: Input<string, string> = {
    propertyName: 'test',
    value: 'test',
    input: 'test',
}

/**
 * Dummy error to be used in tests that require some error but we don't
 * actually care about what it is.
 */
export const dummyError: ValidationError = {
    message: 'test',
    property: 'test',
    code: 'test',
}

/**
 * Creates an input with an specific value.
 *
 * @param value Value that the input will have.
 */
export const createInput = <T>(value: T) => ({
    propertyName: 'test',
    value,
    input: 'test',
})

/**
 * Creates a dummy error with a specific message.
 *
 * @param message Message to be used.
 */
export const createDummyError = (message: string) => ({
    message,
    property: 'test',
    code: 'test',
})

/**
 * Creates a dummy validation expression with a specific result.
 *
 * @param result Result to be used in expression.
 */
export const createDummyValidationExpression = (
    result: boolean,
): ValidationExpression => ({
    kind: 'validation',
    message: '',
    fulfillsValidation: result,
    property: 'test',
})

/**
 * Asserts that two objects are the same by stringifying and comparing them.
 *
 * @param actual Object we received.
 * @param expected Object we expect.
 */
export const assertMatchObjects = (actual: any, expected: any) => {
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected))
}

/**
 * Asserts that the given steps has one validation step that evaluated to `result`.
 *
 * @param result Expected result.
 */
export const assertValidationWithResult = (result: boolean) => (
    steps: Step[],
) => {
    expect(steps).toHaveLength(1)

    const expression = (steps[0].expression as unknown) as ValidationExpression
    expect(expression.kind).toEqual('validation')
    expect(expression.fulfillsValidation).toEqual(result)
}

/**
 * Asserts that the given steps has one condition step that evaluated to `result`.
 *
 * @param result Expected result.
 */
export const assertConditionWithResult = (result: boolean) => (
    steps: Step[],
) => {
    expect(steps).toHaveLength(1)

    const expression = (steps[0].expression as unknown) as ConditionExpression
    expect(expression.kind).toEqual('condition')
    expect(expression.applyValidations).toEqual(result)
}

/**
 * Mocks the implementation of a spy and calls an assert function with the
 * steps the spy retrieved.
 *
 * @param spy Spy to mock.
 * @param assert Assert function to apply with the retrieved steps.
 */
export const assertSteps = (
    spy: jest.SpyInstance<ValidatorSyntax<any, any, any>>,
    assert: (steps: Step[]) => void,
): void => {
    spy.mockImplementation((input, steps) => {
        assert(steps)
        return {} as ValidatorSyntax<any, any, any>
    })
}

/**
 * Mocks the implementation of a spy and calls an assert function with the
 * steps the spy retrieved.
 *
 * @param spy Spy to mock.
 * @param assert Assert function to apply with the retrieved steps.
 */
export const assertStepsWithCreator = (
    spy: jest.SpyInstance<ValidatorSyntax<any, any, any>>,
    assert: (steps: Step[]) => void,
): void => {
    spy.mockImplementation((creator, input, steps) => {
        assert(steps)
        return {} as ValidatorSyntax<any, any, any>
    })
}
