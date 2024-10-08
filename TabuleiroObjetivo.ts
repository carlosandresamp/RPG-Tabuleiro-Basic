class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanciaPara(outro: Position): number {
        const dx = this.x - outro.x;
        const dy = this.y - outro.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

class Personagem {
    nome: string;
    saude: number;
    alcance: number;
    dano: number;
    posicao: Position;

    constructor(nome: string, saude: number, alcance: number, dano: number, posicao: Position) {
        this.nome = nome;
        this.saude = saude;
        this.alcance = alcance;
        this.dano = dano;
        this.posicao = posicao;
    }

    mover(direcao: string): boolean {
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

    atacar(inimigo: Personagem): boolean {
        if (this.posicao.distanciaPara(inimigo.posicao) <= this.alcance) {
            inimigo.saude -= this.dano;
            return true;
        }
        return false;
    }
}

class Tabuleiro {
    largura: number;
    altura: number;
    personagens: Personagem[];
    vilao: Personagem;

    constructor(largura: number, altura: number, vilao: Personagem) {
        this.largura = largura;
        this.altura = altura;
        this.personagens = [];
        this.vilao = vilao;
    }

    adicionarPersonagem(personagem: Personagem) {
        this.personagens.push(personagem);
    }

    removerPersonagem(nome: string) {
        this.personagens = this.personagens.filter(personagem => personagem.nome !== nome);
    }

    encontrarPersonagem(nome: string): Personagem | undefined {
        return this.personagens.find(personagem => personagem.nome === nome);
    }

    moverVilao() {
        this.vilao.posicao.x = Math.floor(Math.random() * this.largura);
        this.vilao.posicao.y = Math.floor(Math.random() * this.altura);
    }

    atualizarTabuleiro(mostrarVilao: boolean = false) {
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
                    } else if (mostrarVilao && this.vilao.posicao.x === x && this.vilao.posicao.y === y) {
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

function atualizarStatus(mostrarVilao: boolean = false) {
    const status = document.getElementById("status");
    if (status) {
        status.innerHTML = `
            <p>${p1.nome}: Saúde = ${p1.saude}, Posição = (${p1.posicao.x}, ${p1.posicao.y})</p>
            <p>${tabuleiro.fornecerDica()}</p>
        `;
    }
    tabuleiro.atualizarTabuleiro(mostrarVilao);
}

document.getElementById("move-up")?.addEventListener("click", () => {
    p1.mover("cima");
    atualizarStatus();
});

document.getElementById("move-down")?.addEventListener("click", () => {
    p1.mover("baixo");
    atualizarStatus();
});

document.getElementById("move-left")?.addEventListener("click", () => {
    p1.mover("esquerda");
    atualizarStatus();
});

document.getElementById("move-right")?.addEventListener("click", () => {
    p1.mover("direita");
    atualizarStatus();
});

document.getElementById("attack")?.addEventListener("click", () => {
    if (p1.atacar(p2)) {
        atualizarStatus(true);
        setTimeout(() => {
            tabuleiro.moverVilao();
            atualizarStatus();
        }, 1000);
    } else {
        atualizarStatus();
    }
});

atualizarStatus();
