function solve(result, inputs, values, priorWork) {
    let possibleEquations = PHYSICS_EQUATIONS.filter(eq => eq.result == result)
    let bestEquation = possibleEquations.sort((a, b) => {
        let score = (equationInputs, problemInputs) => {
            let result = 0
            for (let problemInput of problemInputs) {
                result += equationInputs.indexOf(problemInput) >= 0 ? 1 : 0
            }
            return result
        }
        let scoreA = score(a.inputs, inputs)
        let scoreB = score(b.inputs, inputs)
        return scoreB - scoreA
    })[0]
    let containSameValues = (array1, array2) => String([].concat(array1).sort()) === String([].concat(array2).sort())
    if (containSameValues(bestEquation.inputs, inputs)) {
        let sortedValues = []
        for (let bestEquationInput of bestEquation.inputs) {
            sortedValues.push(values[inputs.indexOf(bestEquationInput)])
        }
        let result = bestEquation.equation(...sortedValues)
        return {
            result,
            work: {
                equation: bestEquation.latex,
                equationWithValues: bestEquation.substitute(...sortedValues),
                result: bestEquation.resultFormat(result)
            }
        }
     } else {
        let inputsToBeSolvedFor = []
        for (let bestEquationInput of bestEquation.inputs) {
            if (inputs.indexOf(bestEquationInput) < 0) {
                inputsToBeSolvedFor.push(bestEquationInput)
            }
        }
        for (let inputToBeSolvedFor of inputsToBeSolvedFor) {
            let value = solve(inputToBeSolvedFor, inputs, values)
            inputs.push(inputToBeSolvedFor)
            values.push(value.result)
            priorWork.push(value.work)
        }

        let sortedValues = []
        for (let bestEquationInput of bestEquation.inputs) {
            sortedValues.push(values[inputs.indexOf(bestEquationInput)])
        }
        let result = bestEquation.equation(...sortedValues)
        return {
            result,
            priorWork,
            work: {
                equation: bestEquation.latex,
                equationWithValues: bestEquation.substitute(...sortedValues),
                result: bestEquation.resultFormat(result)
            }
        }
    }
}