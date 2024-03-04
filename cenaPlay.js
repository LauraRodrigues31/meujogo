// Definindo a cenaPlay usando a biblioteca Phaser
class cenaPlay extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'cenaPlay',
            backgroundColor: ' #808080', // Configuração da cor de fundo da cena
        });
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image("bgWelcome", "assets/bgWelcome.png"); // Carregando o bg e fundo 
        this.load.image("play", "assets/btPlay.png"); // Carregando a imagem do botão "play"
    }

    // Função chamada quando a cena é criada
    create() {
        this.add.image(400, 300, 'bgWelcome'); // adicionando a imagem de fundo

        // add o botão play
        this.btPlay = this.add.image(this.game.config.width / 2 - 50, this.game.config.height / 4 * 3, 'play')
        .setScale(0.2).setOrigin(0, 0).setInteractive()


    // Configuração de evento para iniciar o jogo ao clicar no botão "play"
        this.btPlay.on('pointerdown', () => {
            this.scene.start('florestaEncantada', this.game);
    });
    };
    update() {};
}