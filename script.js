// Classe Curriculo
class Curriculo {
    constructor(nome, data, cpf, email, num, civil, genero, endereco, cep, bairro, cidade, estado, nacionalidade, formacao, deficiencia, experiencia, trabalho, cargA, cargD) {
        this.nome = nome;
        this.data = data;
        this.cpf = cpf;
        this.email = email;
        this.num = num;
        this.civil = civil;
        this.genero = genero;
        this.endereco = endereco;
        this.cep = cep;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.nacionalidade = nacionalidade;
        this.formacao = formacao;
        this.deficiencia = deficiencia;
        this.experiencia = experiencia;
        this.trabalho = trabalho;
        this.cargA = cargA;
        this.cargD = cargD;
    }
}

// Função para obter currículos do localStorage
const obterCurriculos = () => JSON.parse(localStorage.getItem("curriculos")) || [];

// Função para salvar currículos no localStorage
const salvarCurriculos = (curriculos) => localStorage.setItem("curriculos", JSON.stringify(curriculos));

// Função para validar duplicidade
const validarDuplicidade = (nome, cpf, editarIndex) => {
    const curriculos = obterCurriculos();
    return curriculos.some((curriculo, index) => (curriculo.nome === nome || curriculo.cpf === cpf) && index !== editarIndex);
};

// Função para limpar o formulário
const limparFormulario = () => {
    document.querySelector("form").reset();
};

const preencheCadastro = () => {
    localStorage.removeItem("index")
    localStorage.setItem("modoEdicao", JSON.stringify(false))
}

const preencheInfoEditar = (index) => {
    localStorage.setItem("index", JSON.stringify(index))
    localStorage.setItem("modoEdicao", JSON.stringify(true))
}

// Função para atualizar a lista de currículos
const atualizarLista = () => {
    const curriculos = obterCurriculos();
    const lista = document.getElementById("curriculos-lista");

    lista.innerHTML = "";
    curriculos.forEach((curriculo, index) => {

        const div = document.createElement("div");
        div.classList.add("curriculo");

        div.innerHTML = `
        <p><strong>Nome:</strong> <p id="nameUser">${curriculo.nome}</p></p>
            <p><strong >Data de Nascimento:</strong> <p id="date">${curriculo.data}</p></p>
            <p><strong>CPF:</strong> <p id="cpf">${curriculo.cpf}</p></p>
            <p><strong>Email:</strong> <p id="email">${curriculo.email}</p></p>
            <p><strong>Contato:</strong> <p id="contact">${curriculo.num}</p></p>
            <p><strong>Estado civil: </strong> <p id="civil">${curriculo.civil}</p></p>
            <p><strong>Gênero: </strong> <p id="gender">${curriculo.genero}</p></p>
            <p><strong>Endereço: </strong> <p id="anddress">${curriculo.endereco}</p></p>
            <p><strong>Bairro:</strong> <p id="district">${curriculo.bairro}</p></p>
            <p><strong>Cidade:</strong> <p id="city">${curriculo.cidade}</p></p>
            <p><strong>Estado: </strong> <p id="state">${curriculo.estado}</p></p>
            <p><strong>Nacionalidade: </strong> <p id="nationality">${curriculo.nacionalidade}</p></p>
            <p><strong>Formação: </strong> <p id="education">${curriculo.formacao}</p></p>
            <p><strong>Deficiência:</strong> <p id="deficiency">${curriculo.deficiencia}</p></p>
            <p><strong>Experiência Profissional:</strong> <p id="service">${curriculo.experiencia}</p></p>
            <p><strong>Tipo de Trabalho:</strong> <p id="work">${curriculo.trabalho}</p></p>
            <p><strong>Cargo atual: </strong> <p id="posiion">${curriculo.cargA}</p></p>
            <p><strong>Cargo desejado: </strong> <p id="positionD">${curriculo.cargD}</p></p>
            <a href="forms.html"><button class="editar" onclick="preencheInfoEditar(${index})">Editar</button></a>
            <button class="excluir" onclick="excluirCurriculo(${index})">Excluir</button>
        `;

        lista.appendChild(div);
    });
};

// Função para salvar dados (novo ou edição)
const salvarDados = (editarIndex = null) => {


    const nome = document.getElementById("nameUser").value.trim();
    const data = document.getElementById("date").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const num = document.getElementById("contact").value.trim();
    const civil = document.getElementById("civil").value.trim();
    const genero = document.getElementById("gender").value.trim();
    const endereco = document.getElementById("address").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const bairro = document.getElementById("district").value.trim();
    const cidade = document.getElementById("city").value.trim();
    const estado = document.getElementById("state").value.trim();
    const nacionalidade = document.getElementById("nationality").value.trim();
    const formacao = document.getElementById("education").value.trim();
    const deficiencia = document.querySelector('input[name="deficiency"]:checked')?.value || "Não especificado";
    const experiencia = document.getElementById("experience").value.trim();
    const trabalho = document.getElementById("work").value.trim();
    const cargA = document.getElementById("position").value.trim();
    const cargD = document.getElementById("positionD").value.trim();

    const curriculo = new Curriculo(nome, data, cpf, email, num, civil, genero, endereco, cep, bairro, cidade, estado, nacionalidade, formacao, deficiencia, experiencia, trabalho, cargA, cargD);

    const curriculos = obterCurriculos();

    const index = JSON.parse(localStorage.getItem("index"))
    const modoEdicao = JSON.parse(localStorage.getItem("modoEdicao"))
    if (modoEdicao) {
        const novosDados = curriculos.splice(index, 1, curriculo)
        localStorage.setItem("curriculos", JSON.stringify(novosDados));
    }

    curriculos.push(curriculo)
    salvarCurriculos(curriculos);
    atualizarLista();
    limparFormulario();
};

// Função para editar currículo
const editarCurriculo = (index) => {
    const curriculos = obterCurriculos();
    const curriculo = curriculos[index];

    document.getElementById("nameUser").value = curriculo.nome;
    document.getElementById("date").value = curriculo.data;
    document.getElementById("cpf").value = curriculo.cpf;
    document.getElementById("email").value = curriculo.email;
    document.getElementById("contact").value = curriculo.num;
    document.getElementById("civil").value = curriculo.civil;
    document.getElementById("gender").value = curriculo.genero;
    document.getElementById("address").value = curriculo.endereco;
    document.getElementById("cep").value = curriculo.cep;
    document.getElementById("district").value = curriculo.bairro;
    document.getElementById("city").value = curriculo.cidade;
    document.getElementById("state").value = curriculo.estado;
    document.getElementById("nationality").value = curriculo.nacionalidade;
    document.getElementById("education").value = curriculo.formacao;
    document.querySelector(`input[name="deficiency"][value="${curriculo.deficiencia}"]`).checked = true;
    document.getElementById("experience").value = curriculo.experiencia;
    document.getElementById("work").value = curriculo.trabalho;
    document.getElementById("position").value = curriculo.cargA;
    document.getElementById("positionD").value = curriculo.cargD;

    const botaoEnviar = document.querySelector(".enviar");
    botaoEnviar.textContent = "Salvar Alterações";
    botaoEnviar.onclick = () => {
        salvarDados(index);
        botaoEnviar.textContent = "Enviar";
        botaoEnviar.onclick = () => salvarDados();
    };
};

// Função para excluir currículo
const excluirCurriculo = (index) => {
    const curriculos = obterCurriculos();
    curriculos.splice(index, 1);
    salvarCurriculos(curriculos);
    atualizarLista();
};

// Atualiza a lista ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarLista);

const curriculos = obterCurriculos();
const index = JSON.parse(localStorage.getItem("index"))
const modoEdicao = JSON.parse(localStorage.getItem("modoEdicao"))

if (modoEdicao) {
    const curriculo = curriculos[index];
    document.getElementById("nameUser").value = curriculo.nome;
}

editarCurriculo()