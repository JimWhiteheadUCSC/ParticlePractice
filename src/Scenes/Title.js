class TitleScene extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        // Load any assets needed for title screen
        this.load.audio('titleMusic', 'assets/title_music.mp3');
        this.load.image('background', 'assets/title_bg.png'); // Optional background
        //this.load.bitmapFont('mainFont', 'assets/font.png', 'assets/font.fnt'); // Or use web fonts
    }

    create() {
        // Background
        this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x1a1a2e).setOrigin(0);

        // Optional: background image
        // this.add.image(0, 0, 'background').setOrigin(0);

        // Title Text
        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, "FUGUE", {
            fontFamily: 'Georgia, serif',
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

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

        // Animate start prompt
        this.tweens.add({
            targets: this.startText,
            alpha: { from: 1, to: 0.3 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Play background title music
        //this.titleMusic = this.sound.add('titleMusic', { loop: true, volume: 0.5 });
        //this.titleMusic.play();

        // Input to start game
        this.input.keyboard.once('keydown-SPACE', () => {
            //this.titleMusic.stop();
            this.scene.start("platformerScene");
        });
    }
}