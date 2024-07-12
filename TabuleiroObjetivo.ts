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

    constructor(largura: number, altura: number) {
        this.largura = largura;
        this.altura = altura;
        this.personagens = [];
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
    p1.atacar(p2);
    atualizarStatus();
});

// Atualizar o status inicial
atualizarStatus();