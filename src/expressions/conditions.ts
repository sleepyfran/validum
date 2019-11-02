import Step from '../types/step'
import Conditions from '../types/expressions/conditions'
import createChainEnd from './chain-end'
import createOperators from './operators'
import { addStep } from '../utils'

const createConditions = <T, P>(
    input: T,
    property: P,
    steps: Step[],
): Conditions<T, P> => ({
    when(condition) {
        const updatedSteps = addStep(steps, {
            kind: 'condition',
            applyValidations: condition(input),
        })

        return {
            ...createChainEnd(input, updatedSteps),
            ...createOperators(input, property, updatedSteps),
        }
    },

    unless(condition) {
        const updatedSteps = addStep(steps, {
            kind: 'condition',
            applyValidations: !condition(input),
        })

        return {
            ...createChainEnd(input, updatedSteps),
            ...createOperators(input, property, updatedSteps),
        }
    },
})

export default createConditions