"use strict";
var _a, _b, _c, _d, _e;
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanciaPara(outro) {
        const dx = this.x - outro.x;
        const dy = this.y - outro.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
class Personagem {
    constructor(nome, saude, alcance, dano, posicao) {
        this.nome = nome;
        this.saude = saude;
        this.alcance = alcance;
        this.dano = dano;
        this.posicao = posicao;
    }
    mover(direcao) {
        switch (direcao) {
            case 'cima':
                this.posicao.y -= 1;
                break;
            case 'baixo':
                this.posicao.y += 1;
                break;
            case 'esquerda':
                this.posicao.x -= 1;
                break;
            case 'direita':
                this.posicao.x += 1;
                break;
            default:
                return false;
        }
        return true;
    }
    atacar(inimigo) {
        if (this.posicao.distanciaPara(inimigo.posicao) <= this.alcance) {
            inimigo.saude -= this.dano;
            return true;
        }
        return false;
    }
}
class Tabuleiro {
    constructor(largura, altura) {
        this.largura = largura;
        this.altura = altura;
        this.personagens = [];
    }
    adicionarPersonagem(personagem) {
        this.personagens.push(personagem);
    }
    removerPersonagem(nome) {
        this.personagens = this.personagens.filter(personagem => personagem.nome !== nome);
    }
    encontrarPersonagem(nome) {
        return this.personagens.find(personagem => personagem.nome === nome);
    }
}
// Código de exemplo para criar personagens e tabuleiro
let tabuleiro = new Tabuleiro(10, 10);
let pos1 = new Position(1, 1);
let pos2 = new Position(2, 2);
let p1 = new Personagem("Herói", 100, 1, 10, pos1);
let p2 = new Personagem("Vilão", 100, 1, 10, pos2);
tabuleiro.adicionarPersonagem(p1);
tabuleiro.adicionarPersonagem(p2);
// Função para atualizar o status do jogo
function atualizarStatus() {
    const status = document.getElementById("status");
    if (status) {
        status.innerHTML = `
            <p>${p1.nome}: Saúde = ${p1.saude}, Posição = (${p1.posicao.x}, ${p1.posicao.y})</p>
            <p>${p2.nome}: Saúde = ${p2.saude}, Posição = (${p2.posicao.x}, ${p2.posicao.y})</p>
        `;
    }
}
// Funções para os botões
(_a = document.getElementById("move-up")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    p1.mover("cima");
    atualizarStatus();
});
(_b = document.getElementById("move-down")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    p1.mover("baixo");
    atualizarStatus();
});
(_c = document.getElementById("move-left")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    p1.mover("esquerda");
    atualizarStatus();
});
(_d = document.getElementById("move-right")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    p1.mover("direita");
    atualizarStatus();
});
(_e = document.getElementById("attack")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    p1.atacar(p2);
    atualizarStatus();
});
// Atualizar o status inicial
atualizarStatus();
