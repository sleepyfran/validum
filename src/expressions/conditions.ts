import Step from '../types/step'
import Conditions from '../types/expressions/conditions'
import createChainEnd from './chain-end'
import createOperators from './operators'
import { addStep } from '../utils'
import { Input } from '../types/input'

const createConditions = <T, P>(
    input: Input<T, P>,
    steps: Step[],
): Conditions<T, P> => ({
    when(condition) {
        const updatedSteps = addStep(steps, {
            kind: 'condition',
            applyValidations: condition(input.input),
        })

        return {
            ...createChainEnd(input, updatedSteps),
            ...createOperators(input, updatedSteps),
        }
    },

    unless(condition) {
        const updatedSteps = addStep(steps, {
            kind: 'condition',
            applyValidations: !condition(input.input),
        })

        return {
            ...createChainEnd(input, updatedSteps),
            ...createOperators(input, updatedSteps),
        }
    },
})

export default createConditions
