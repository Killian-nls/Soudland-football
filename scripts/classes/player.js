export default class Player extends PIXI.Container {
    constructor(name, team, color, texture) {
    super();
    this.label = name;
    this.team = team;
    this.color = color;
    this.texturePath = texture;
    this.playerBackground = 0x222222;
    this.initSprite();
    }

    async initSprite() {
        const texture = await PIXI.Assets.load(this.texturePath);
        this.sprite = new PIXI.Sprite(texture);
        let colorMatrix = new PIXI.ColorMatrixFilter();
        this.sprite.filters = [colorMatrix];
        colorMatrix.blackAndWhite();
        this.sprite.anchor.set(0.5);
        this.sprite.width = 60;
        this.sprite.height = 60;
        
        const mask = new PIXI.Graphics();
        mask.circle(0, 0, this.sprite.width / 3 - 1);
        mask.fill(0xffffff);
        mask.rect(-this.sprite.width / 6, -this.sprite.height / 2, this.sprite.width / 3, this.sprite.height / 2);
        mask.fill(0xffffff);

        const graphics = new PIXI.Graphics();
        graphics.circle(0, 0, this.sprite.width / 3);
        graphics.fill(this.playerBackground);
        graphics.setStrokeStyle({
            color: this.color,
            width: 2
        });
        graphics.stroke();
        
        this.sprite.mask = mask;
        
        this.addChild(mask);
        this.addChild(graphics);
        this.addChild(this.sprite);

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.onmouseover = (event) => {
            this.scale.x = 1.2;
            this.scale.y = 1.2;
        }
        this.onmouseleave = (event) => {
            this.scale.x = 1;
            this.scale.y = 1;
        }
        this.onmousedown = (event) => {
            this.dragData = event.data;
            this.dragging = true;
        };
        this.onmouseup = this.onmouseupoutside = (event) => {
            this.dragging = false;
            this.dragData = null;
        };

        this.onmousemove = (event) => {
            if (this.dragging) {
            const newPosition = this.dragData.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            }
        };
    }

}