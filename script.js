
const descricao = document.querySelector('#descricao')
const valor = document.querySelector('#valor')
const categoria = document.querySelector('#categoria')
const btnAdicionar = document.querySelector('#btnAdicionar')
const btnLimpar = document.querySelector('#btnLimpar')
const totalGeral = document.querySelector('#totalGeral')
const maiorGasto = document.querySelector('#maiorGasto')
const quantidadeGastos = document.querySelector('#quantidadeGastos')
const feedback = document.querySelector('#feedback')
const listaGastos = document.querySelector('#listaGastos')
const gastos = []

function criaElemento(tag) {
    const elemento = document.createElement(tag)
    return elemento
}

function mostraMsg(msg, isValid) {
    feedback.classList.remove('erro', 'sucesso')

    feedback.textContent = msg

    if (isValid) {
        feedback.classList.add('sucesso')
    } else {
        feedback.classList.add('erro')
    }

    setTimeout(() => {
        limpaMsg()
    }, 5000);

}

function validaGastos(descricaoV, valorP, categoriaP) {

    if (!descricaoV) {
        mostraMsg(`Adicione uma descrição!`, false)
        return false
    }

    if (Number.isNaN(valorP)) {
        mostraMsg(`Digite um valor valido!`, false)
        return false
    }

    if (valorP <= 0) {
        mostraMsg(`adicione um valor maior que 0!`, false)
        return false
    }

    if (!categoriaP) {
        mostraMsg(`Adicione uma categoria`, false)
        return false
    }


    return true
}

function renderGastos() {
    listaGastos.innerHTML = ''

    gastos.forEach((gasto, i) => {
        const li = criaElemento('li')
        const info = criaElemento('div')
        const h3 = criaElemento('h3')
        const p = criaElemento('p')
        const actions = criaElemento('div')
        const valor = criaElemento('strong')
        const btnRemove = criaElemento('button')


        h3.textContent = gasto.descricao
        p.textContent = gasto.categoria
        valor.textContent = `R$ ${gasto.valor}`
        btnRemove.textContent = 'X'

        li.appendChild(info)
        info.appendChild(h3)
        info.appendChild(p)
        li.appendChild(actions)
        actions.appendChild(valor)
        listaGastos.appendChild(li)
        actions.appendChild(btnRemove)
        btnRemove.classList.add('btn-remove')


        btnRemove.addEventListener('click', () => {
            gastos.splice(i, 1)
            renderGastos()
            atualizaResumo()
        })
    })
}

function limpaMsg() {
    feedback.textContent = ''
    feedback.classList.remove('sucesso', 'erro')
}

function adicionarGasto() {
    const descricaoProduto = descricao.value.trim()
    const valorProduto = Number(valor.value.trim())
    const categoriaProduto = categoria.value.trim()


    const valido = validaGastos(descricaoProduto, valorProduto, categoriaProduto)

    if (!valido) return

    gastos.push({
        descricao: descricaoProduto,
        valor: valorProduto,
        categoria: categoriaProduto
    })
    renderGastos()
    atualizaResumo()

    descricao.value = ''
    valor.value = ''
    categoria.value = ''

    mostraMsg(`${descricaoProduto} adicionado com sucesso`, true)

}

function atualizaResumo() {
    let soma = 0
    let maior = 0
    gastos.forEach((gasto) => {
        soma += gasto.valor

        if (gasto.valor > maior) {
            maior = gasto.valor
        }

    })
    totalGeral.textContent = soma
    maiorGasto.textContent = maior
    quantidadeGastos.textContent = gastos.length
}


btnAdicionar.addEventListener('click', () => {
    adicionarGasto()
})