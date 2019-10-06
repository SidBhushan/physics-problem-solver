const valueToSolveFor = document.getElementById('value-to-solve-for')
const givensTableBody = document.querySelector('#givens > tbody')

function shouldCreateNewRow() {
    let lastTableGiven = document.querySelector('#givens tr:last-child .given input')
    let lastTableValue = document.querySelector('#givens tr:last-child .value input')

    return !!lastTableGiven.value || !!lastTableValue.value
}

function shouldRemoveRow() {
    let secondLastTableGiven = document.querySelector('#givens tr:nth-last-child(2) .given input')
    let secondLastTableValue = document.querySelector('#givens tr:nth-last-child(2) .value input')

    return !secondLastTableGiven.value && !secondLastTableValue.value

}

function createNewRow() {
    let tr = document.createElement('tr')

    let givenTd = document.createElement('td')
    givenTd.classList.add('given')
    let givenInput = document.createElement('input')
    givenInput.type = 'text'
    givenInput.placeholder = 'Given'
    givenTd.append(givenInput)
    tr.append(givenTd)

    let valueTd = document.createElement('td')
    valueTd.classList.add('value')
    let valueInput = document.createElement('input')
    valueInput.type = 'text'
    valueInput.placeholder = 'Value'
    valueTd.append(valueInput)
    tr.append(valueTd)

    givensTableBody.append(tr)
    givenInput.addEventListener('change', checkForRowUpdates)
    valueInput.addEventListener('change', checkForRowUpdates)
}

function deleteRow() {
    let lastRow = document.querySelector('#givens tr:last-child')
    lastRow.remove()
}

function checkForRowUpdates() {
    if (shouldCreateNewRow()) {
        createNewRow()
    }
    if (shouldRemoveRow()) {
        deleteRow()
    }
}

createNewRow()

function getGivens() {
    let output = { givens: [], values: [] }
    let rows = document.querySelectorAll('#givens tr')
    for (let row of rows) {
        let given = row.children[0].children[0].value
        let value = row.children[1].children[0].value
        if (!given || !value) {
            continue
        }
        output.givens.push(given)
        output.values.push(value)
    }
    return output
}

const solveButton = document.getElementById('solve-button')
const workBox = document.getElementById('work')

solveButton.addEventListener('click', () => {
    let { givens, values } = getGivens()
    let { work, priorWork } = solve(valueToSolveFor.value, givens, values, [])
    workBox.innerHTML = ''
    let renderWork = work => {
        workBox.innerText += `$$${work.equation}$$$$${work.equationWithValues}$$$$${work.result}$$`
    }
    if (priorWork) {
        for (let priorItem of priorWork) {
            renderWork(priorItem)
        }
    }
    renderWork(work)

    MathJax.texReset();
    MathJax.typesetClear();
    MathJax.typesetPromise([workBox])
})