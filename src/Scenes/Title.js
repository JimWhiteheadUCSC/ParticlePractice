class TitleScene extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.audio('titleMusic', 'assets/montuno.mp3');
        this.load.image('background', 'assets/title_bg.png');
        this.load.image('noteRed', 'assets/music note cute red.png');
        this.load.image('noteBlue', 'assets/music note cute.png');
    }

    create() {
        this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x1a1a2e).setOrigin(0);

        // Play background music on loop, with reduced volume
        this.titleMusic = this.sound.add('titleMusic', { loop: true, volume: 0.2 });
        this.titleMusic.play();

        // Title Text
        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, "FUGUE", {
            fontFamily: 'Georgia, serif',
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.titleText,
            scale: { from: 1, to: 1.05 },
            alpha: { from: 1, to: 0.9 },
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Subtitle
        this.subtitle = this.add.text(this.scale.width / 2, this.scale.height / 2 - 40, "A Musical Looping Platformer", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#cccccc'
        }).setOrigin(0.5);

        // Start Prompt
        this.startText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 60, "Press SPACE to Start", {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.startText,
            alpha: { from: 1, to: 0.3 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Credit Prompt
        this.creditPrompt = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, "Want to view who created this masterpiece?\n              Press BACKSPACE to View", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.creditPrompt,
            alpha: { from: 1, to: 0.3 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Level Select Prompt
        this.levelPrompt = this.add.text(this.scale.width / 2, this.scale.height / 2 + 160, "Press 1 or 2 to Select a Level", {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#aaaaaa'
        }).setOrigin(0.5);

        // Inputs
        this.input.keyboard.once('keydown-SPACE', () => {
            this.titleMusic.stop();
            this.scene.start("platformerScene");
        });

        this.input.keyboard.once('keydown-BACKSPACE', () => {
            this.titleMusic.stop();
            this.scene.start("creditsScene");
        });

        this.input.keyboard.on('keydown-ONE', () => {
            this.titleMusic.stop();
            this.scene.start("platformerScene");
        });

        this.input.keyboard.on('keydown-TWO', () => {
            this.titleMusic.stop();
            this.scene.start("platformerScene2");
        });

        // Sparkle animation
        const sparkleKeys = ['noteRed', 'noteBlue'];

        this.time.addEvent({
            delay: 600,
            loop: true,
            callback: () => {
                const x = Phaser.Math.Between(0, this.scale.width);
                const y = Phaser.Math.Between(0, this.scale.height);
                const selectedKey = Phaser.Math.RND.pick(sparkleKeys);

                const sparkle = this.add.image(x, y, selectedKey)
                    .setAlpha(0)
                    .setScale(0.4);

                this.tweens.add({
                    targets: sparkle,
                    alpha: { from: 0, to: 1 },
                    scale: { from: 0.4, to: 0.6 },
                    duration: 500,
                    ease: 'Sine.easeOut',
                    yoyo: true,
                    onComplete: () => sparkle.destroy()
                });
            }
        });
    }
}
