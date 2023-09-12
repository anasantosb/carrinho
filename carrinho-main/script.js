// Começamos declarando o array produtos
const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",  
    }
];

function renderizaProdutos() { // Função para renderizar os produtos na página web
    let html = ""; // Inicializa uma string vazia para armazenar o HTML dos produtos
    for (let i = 0; i < produtos.length; i++) { // Um loop for que percorre o array produtos 
        html = html + criarProduto(produtos[i], i); // Em cada iteração do loop, esta linha adiciona o HTML de um produto à variável html
    }
    return html; // Retorna o HTML acumulado dos produtos. Retorna aquilo que for gerado.
}

// Função que cria um bloco de html que vai representar visualmente os produtos na página web
function criarProduto(produto, index) {
    return `
    <div class="curso"> 
        <img class='inicio' title="t" src="${produto.imagem}" />
        <div class="curso-info">
            <h4>${produto.nome}</h4>
            <h4>${produto.prof}</h4>
            <h4>${produto.descricao}</h4>
        </div>
        <div class="curso-preco">
            <span class="preco-de">R$${produto.preco_de}</span>
            <span class="preco-por">R$${produto.preco_por}</span>
            <button class="btncar btn-add" data-index="${index}"></button>
        </div>
    </div>
    `;
	// Esse bloco de código serve para exibir as informações dos produtos
}

// Seleciona o elemento com o id "container" na página
const container = document.querySelector("#container"); // Variável container. 

// Insere o HTML dos produtos no container
container.innerHTML = renderizaProdutos(); // Com o uso do innerHTML será possível acessar e modificar o conteúdo

const carrinhoItens = {}; // Constante vazia que será usada para adicionar ou modificar propriedades do objeto

// Função para renderizar os itens do carrinho
function renderizaCarrinho() {
    let html = ''; // Inicializa uma string vazia para armazenar o HTML dos itens do carrinho
    for (let produtoId in carrinhoItens) { // Loop for in que percorre todas as propriedades do objeto carrinhoItens
        // Chama a função para criar o HTML de um item do carrinho e adiciona ao HTML acumulado
        html = html + criaItemCarrinho(carrinhoItens[produtoId]); // Essa linha acessa um item específico do carrinho com base no produtoId; Aqui também é chamada a função criaItemCarrinho, assim criando o html de algum item do carrinho com base em suas informações (do item)
    }
    document.querySelector('.carrinho_itens').innerHTML = html; // Insere o HTML dos itens do carrinho na classe carrinho_itens
}

// Função para criar o HTML de um item do carrinho
function criaItemCarrinho(produto) {
    return `
    <div class="carrinho_compra"> 
        <h4>${produto.nome}</h4>
        <p>Preço unidade: ${produto.preco_por} | Quantidade: ${produto.quantidade}</p>
        <p>Valor: R$: ${produto.preco_por * produto.quantidade}</p>
        <button data-produto-id="${produto.id}" class="btn-remove"></button>
    </div>
    `;
	// Esse bloco de HTML exibe as informações de algum item no carrinho: nome, preço, quantidade, valor total e botão para remover o item do carrinho quando necessário
}

// Função para calcular o total dos itens no carrinho e exibir o valor na página 
function criaCarrinhoTotal() {
    let total = 0; // Inicializa o total como zero
    for (let produtoId in carrinhoItens) { // Loop for in que percorre os itens do objeto carrinhoItens
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade; // Cálculo do valor total. Calcula-se o total somando o preço por unidade multiplicado pela quantidade de cada item
    }
    // Insere o HTML do total do carrinho e um link para compra dos produtos selecionados
    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong> R$${total} </strong></h4>
    <a href ="#" target="_blank">
        <ion-icon name="card-outline"></ion-icon>
        <strong>Comprar Agora</strong>
    </a>
    `;
}

// Função acionada quando o usuário quiser adicionar um produto ao carrinho
function adicionaItemNoCarrinho(produto) {
    if (!carrinhoItens[produto.id]) {
        // Se o produto ainda não estiver no carrinho, cria um novo item no carrinho
        carrinhoItens[produto.id] = produto; // produto no carrinho
        carrinhoItens[produto.id].quantidade = 0; // //Quantidade inicial do produto no carrinho 
    }
    // Incrementa a quantidade do item no carrinho
    ++carrinhoItens[produto.id].quantidade;
    // Atualiza a exibição do carrinho e o total do carrinho
    renderizaCarrinho();
    criaCarrinhoTotal();
}

// Adiciona um ouvinte de evento de clique ao documento
document.body.addEventListener('click', function (event) {
    const elemento = event.target;
    if (elemento.classList.contains('btn-add')) {
        // Se o botão "Adicionar" for clicado, obtém o índice do produto e adiciona ao carrinho
        const index = parseInt(elemento.getAttribute('data-index'), 10);
        const produto = produtos[index];
        adicionaItemNoCarrinho(produto);
    }
    if (elemento.classList.contains('btn-remove')) {
        // Se o botão "Remover" for clicado, remove o item do carrinho ou reduz a quantidade
        const produtoId = elemento.getAttribute('data-produto-id');
        if (carrinhoItens[produtoId].quantidade <= 1) {
            delete carrinhoItens[produtoId]; // Remove o item se a quantidade for menor ou igual a 1
        } else {
            --carrinhoItens[produtoId].quantidade; // Reduz a quantidade se for maior que 1
        }
        // Atualiza a exibição do carrinho e o total do carrinho
        renderizaCarrinho();
        criaCarrinhoTotal();
    }
});
