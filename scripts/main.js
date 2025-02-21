import Background from './classes/background.js';
import Player from './classes/player.js';
const dTexturePath = '../../assets/textures/dash.png';
const pTexturePath = '../../assets/textures/players/ronaldo.png';


async function main() {
    const app = new PIXI.Application();
    const container = document.querySelector('.screen-container');
    const client = {
        height: container.clientHeight,
        width: container.clientWidth
    }
    await app.init({
        width: client.width,
        height: client.height,
        antialias: true,
        backgroundColor: 0x484848
    });
    const dTexture = await PIXI.Assets.load(dTexturePath);
    const background = new Background(client, dTexture);

    app.stage.addChild(background);

    const player1 = new Player('Ronaldo', 'home', 0xff0000, pTexturePath);
    player1.position.set(200, 300);
    app.stage.addChild(player1);
    
    container.appendChild(app.canvas);

    let isDraggable = false;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    const dragToggleButton = document.querySelector('.drag-toggle-button');
    dragToggleButton.addEventListener('click', () => {
        isDraggable = !isDraggable;
        dragToggleButton.textContent = isDraggable ? 'Disable Drag' : 'Enable Drag';
    });

    app.view.addEventListener('mousedown', (event) => {
        isDragging = true;
        dragStart.x = event.clientX - app.stage.position.x;
        dragStart.y = event.clientY - app.stage.position.y;
    });

    app.view.addEventListener('mousemove', (event) => {
        if (isDragging && isDraggable) {
            app.stage.position.x = event.clientX - dragStart.x;
            app.stage.position.y = event.clientY - dragStart.y;
        }
    });

    app.view.addEventListener('mouseup', () => {
        isDragging = false;
    });

    app.view.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    const highlightButton = document.querySelector('.highlight-button');
    highlightButton.addEventListener('click', highlight);

    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', reset);

    const zoomInButton = document.querySelector('.zoom-in-button');
    zoomInButton.addEventListener('click', () => zoom(1.2));

    const zoomOutButton = document.querySelector('.zoom-out-button');
    zoomOutButton.addEventListener('click', () => zoom(0.8));
    
    async function highlight() {
        const teamSelector = document.querySelector('.team-options');
        const zoneSelector = document.querySelector('.zone-options');
        const colorSelector = document.querySelector('.color-options');
        const alphaSelector = document.querySelector('.alpha-options');
        const team = teamSelector.value;
        const otherTeam = team === 'home' ? 'away' : 'home';
        const color = colorSelector.value;
        const alpha = alphaSelector.value;
    
        switch (zoneSelector.value) {
            case 'penalty-area':
                background.highlightPenaltyArea(team, color, alpha);
                break;
            case 'deffense-horizontal-outer-corridor':
                background.highlightDeffenseOuterCorridor(team, color, alpha);
                break;
            case 'deffense-horizontal-inner-corridor':
                background.highlightDeffenseInnerCorridor(team, color, alpha);
                break;
            case 'horizontal-corridor':
                background.highlightMidField(color, alpha);
                break;
            case 'offense-horizontal-inner-corridor':
                background.highlightDeffenseInnerCorridor(otherTeam, color, alpha);
                break;
            case 'offense-horizontal-outer-corridor':
                background.highlightDeffenseOuterCorridor(otherTeam, color, alpha);
                break;
            case 'left-outer-corridor':
                background.highlightLeftOuterCorridor(team, color, alpha);
                break;
            case 'left-inner-corridor':
                background.highlightLeftInnerCorridor(team, color, alpha);
                break;
            case 'vertical-corridor':
                background.highlightCenterCorridor(color, alpha);
                break;
            case 'right-outer-corridor':
                background.highlightRightOuterCorridor(team, color, alpha);
                break;
            case 'right-inner-corridor':
                background.highlightRightInnerCorridor(team, color, alpha);
                break;
            case 'left-corner':
                background.highlightCornerArc(team, 1, color, alpha);
                break;   
            case 'right-corner':
                background.highlightCornerArc(team, 2, color, alpha);
                break;    
            case 'circle':
                background.highlightCenterCircle(color, alpha);
                break;     
            default:
                console.log('Invalid zone selected');
        }
    }

    async function reset() {
        background.reset();
    }

    function zoom(factor) {
        app.stage.scale.x *= factor;
        app.stage.scale.y *= factor;
        
        // Recenter the stage
        app.stage.position.x = (client.width - client.width * app.stage.scale.x) / 2;
        app.stage.position.y = (client.height - client.height * app.stage.scale.y) / 2;
    }

}


main();