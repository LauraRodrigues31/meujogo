// Definindo a cena principal do jogo usando a biblioteca Phaser
class florestaEncantada extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({ key: 'florestaEncantada' });
    }

    // Pré-carregamento de recursos
    preload() {
        // Carregando o bg e fundo 
        this.load.image("floresta", "assets/floresta.png");
        this.load.image("ground", "assets/tijolos.png");
        this.load.spritesheet('personagem', 'assets/personagem2.png', { frameWidth: 200, frameHeight: 300 });
        this.load.image("chao", "assets/plataforma2.png");
        this.load.image("coracao", "assets/coracao.png");
    }

    // Função chamada quando a cena é criada
    create() {
        // Adicionando a imagem de fundo
        this.add.image(400, 300, "floresta");
        // adicionando a plataforma
        this.add.image("tijolos");
        // adicionando o chão
        chao = this.physics.add.staticImage(720, 600, "chao");


        // adiconando as plataformas
        plataformas = this.physics.add.staticGroup();
        plataformas.create(600, 400, 'ground');
        plataformas.create(50, 250, 'ground');
        plataformas.create(750, 220, 'ground');

        //adicionando o personagem
        player = this.physics.add.sprite(160, 0, 'personagem').setScale(0.3);
        // adicionando um colider do player com a plataforma
        this.physics.add.collider(player, chao);

        // animando o personagem
        player.setBounce(0.2); // quicar um tiquinho
        player.setCollideWorldBounds(true); // colisão com os limites do mundo
        player.setSize(200, 210) // deixar o personagem no tamanho certo 
        this.physics.add.collider(player, plataformas); // colidir o personagem com a plataforma

        // adicionando os coracões como moedas
        coracao = this.physics.add.group();
        coracao.create(600, 300, 'coracao');
        coracao.create(50, 150, 'coracao');
        coracao.create(750, 120, 'coracao');
        this.physics.add.collider(plataformas, coracao); // colisão plataformas com coracões 

        placar = this.add.text(430, 30, 'Corações:0/3', { fontSize: '50px', fill: '#00000' }) 
        //overlap entre o player e coração
        // Adicione uma sobreposição entre o jogador e os corações
        this.physics.add.overlap(player, coracao.getChildren(), (player, coracao) => {
            coracao.disableBody(true, true); // Desativa a física e esconde o dove
            pontuacao += 1; // Incrementa a pontuação
            placar.setText('Corações:' + pontuacao + '/3'); // Atualiza o texto do placar
        });



        // animações da sprite 
        this.anims.create({
            key: 'andar', // animação de andar, ai depois espelho o personagem
            frames: this.anims.generateFrameNumbers('personagem', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn', // sprite 
            frames: [{ key: 'personagem', frame: 0 }],
            frameRate: 20
        });

        // camera no player
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, 1440, 600);

        // input do teclado
        cursors = this.input.keyboard.createCursorKeys();



    }

    // Função de atualização da cena
    update() {
        // Aqui lógica de atualização da cena, se necessário
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('andar', true);
            player.setFlip(false, false)
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.setFlip(true, false)
            player.anims.play('andar', true);

        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-430);
            player.anims.play('turn')
            console.log('foi')
        }

        for (let i = 0; i < pontuacao; i++) {
            console.log('Atualizando o placar...');
        }

    }



}
