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
                this.posicao.y = Math.max(this.posicao.y - 1, 0);
                break;
            case 'baixo':
                this.posicao.y = Math.min(this.posicao.y + 1, 9);
                break;
            case 'esquerda':
                this.posicao.x = Math.max(this.posicao.x - 1, 0);
                break;
            case 'direita':
                this.posicao.x = Math.min(this.posicao.x + 1, 9);
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
    constructor(largura, altura, vilao) {
        this.largura = largura;
        this.altura = altura;
        this.personagens = [];
        this.vilao = vilao;
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
    moverVilao() {
        this.vilao.posicao.x = Math.floor(Math.random() * this.largura);
        this.vilao.posicao.y = Math.floor(Math.random() * this.altura);
    }
    atualizarTabuleiro(mostrarVilao = false) {
        const tabuleiroElemento = document.getElementById("tabuleiro");
        if (tabuleiroElemento) {
            tabuleiroElemento.innerHTML = '';
            for (let y = 0; y < this.altura; y++) {
                for (let x = 0; x < this.largura; x++) {
                    const celula = document.createElement("div");
                    celula.classList.add("celula");
                    const personagem = this.personagens.find(p => p.posicao.x === x && p.posicao.y === y);
                    if (personagem) {
                        celula.classList.add(personagem.nome.toLowerCase() === "herói" ? "heroi" : "vilao");
                        celula.innerText = personagem.nome.charAt(0);
                    }
                    else if (mostrarVilao && this.vilao.posicao.x === x && this.vilao.posicao.y === y) {
                        celula.classList.add("vilao");
                        celula.innerText = this.vilao.nome.charAt(0);
                    }
                    tabuleiroElemento.appendChild(celula);
                }
            }
        }
    }
    fornecerDica() {
        // Fornece uma dica sutil sobre a localização do vilão
        const distancia = this.personagens[0].posicao.distanciaPara(this.vilao.posicao);
        return `Dica: O vilão está a aproximadamente ${distancia.toFixed(1)} unidades de distância.`;
    }
}
// Código de exemplo para criar personagens e tabuleiro
let pos1 = new Position(1, 1);
let pos2 = new Position(2, 2);
let p1 = new Personagem("Herói", 100, 1, 10, pos1);
let p2 = new Personagem("Vilão", 100, 1, 10, pos2);
let tabuleiro = new Tabuleiro(10, 10, p2);
tabuleiro.adicionarPersonagem(p1);
function atualizarStatus(mostrarVilao = false) {
    const status = document.getElementById("status");
    if (status) {
        status.innerHTML = `
            <p>${p1.nome}: Saúde = ${p1.saude}, Posição = (${p1.posicao.x}, ${p1.posicao.y})</p>
            <p>${tabuleiro.fornecerDica()}</p>
        `;
    }
    tabuleiro.atualizarTabuleiro(mostrarVilao);
}
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
    if (p1.atacar(p2)) {
        atualizarStatus(true);
        setTimeout(() => {
            tabuleiro.moverVilao();
            atualizarStatus();
        }, 1000);
    }
    else {
        atualizarStatus();
    }
});
atualizarStatus();
