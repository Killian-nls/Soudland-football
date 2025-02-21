export default class Background extends PIXI.Graphics {
    constructor(client, dTexture) {
        super();
        this.client = client;
        this.dTexture = dTexture;
        this.initField(client, dTexture);
    }

    initField(client, dTexture) {
        const padding = 40;
        const height = client.height / 1.2 - 2 * padding;
        const width = client.width - 2 * padding;
        const heightOffset = (client.height - (height + 2 * padding)) / 2;

        const fieldTop = padding + heightOffset;
        const fieldBottom = padding + height + heightOffset;
        const fieldLeft = padding;
        const fieldRight = padding + width;

        this.fieldTop = fieldTop;
        this.fieldBottom = fieldBottom;
        this.fieldLeft = fieldLeft;
        this.fieldRight = fieldRight;
        this.fieldHeight = height;
        this.fieldWidth = width;

        const mainLineStyle = 2;
        const lineColor = 0x888888;
        const fillColor = 0x383838;
        const secondaryLineStyle = 1;
        
        this.rect(0, 0, client.width, client.height);
        this.fill(0x484848);

        this.rect(fieldLeft, fieldTop, width, height);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.fill(fillColor);
        this.stroke();
        
        this.moveTo(fieldLeft, height / 2 + fieldTop);
        this.lineTo(fieldRight, height / 2 + fieldTop);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.stroke();
        
        const corridorStyle = {
            width: secondaryLineStyle,
            texture: dTexture,
            alpha: 0.5
        }
        //Left outer corridor
        this.moveTo(width / 100 * 15 + padding, fieldTop);
        this.lineTo(width / 100 * 15 + padding, fieldBottom);
        this.setStrokeStyle(corridorStyle);
        this.stroke();
        
        //Left inner corridor
        this.moveTo(width / 100 * 35 + padding, fieldTop);
        this.lineTo(width / 100 * 35 + padding, fieldBottom);
        this.setStrokeStyle(corridorStyle);
        this.stroke();
        
        //Right inner corridor
        this.moveTo(width / 100 * 65 + padding, fieldTop);
        this.lineTo(width / 100 * 65 + padding, fieldBottom);
        this.setStrokeStyle(corridorStyle);
        this.stroke();
        
        //Right outer corridor
        this.moveTo(width / 100 * 85 + padding, fieldTop);
        this.lineTo(width / 100 * 85 + padding, fieldBottom);
        this.setStrokeStyle(corridorStyle);
        this.stroke();

        //Top inner corridor
        this.moveTo(fieldLeft, height / 100 * 20 + heightOffset + padding);
        this.lineTo(fieldRight, height / 100 * 20 + heightOffset + padding);
        this.setStrokeStyle(corridorStyle);
        this.stroke();
        
        //Top outer corridor
        this.moveTo(fieldLeft, height / 100 * 35 + heightOffset + padding);
        this.lineTo(fieldRight, height / 100 * 35 + heightOffset + padding);
        this.setStrokeStyle(corridorStyle);
        this.stroke();
        
        //Bottom inner corridor
        this.moveTo(fieldLeft, height / 100 * 65 + heightOffset + padding);
        this.lineTo(fieldRight, height / 100 * 65 + heightOffset + padding);
        this.setStrokeStyle(corridorStyle);
        this.stroke();
        
        //Bottom outer corridor
        this.moveTo(fieldLeft, height / 100 * 80 + heightOffset + padding);
        this.lineTo(fieldRight, height / 100 * 80 + heightOffset + padding);
        this.setStrokeStyle(corridorStyle);
        this.stroke();

        //Center circle
        const circleRadius = width / 100 * 15;
        this.circle(width / 2 + padding, height / 2 + padding + heightOffset, circleRadius);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.stroke();

        //Center point
        this.circle(width / 2 + padding, height / 2 + padding + heightOffset, 5);
        this.fill(lineColor);
        
        //Penalty areas
        this.rect(fieldLeft + width / 100 * 15, fieldTop, width / 100 * 70, height / 100 * 20);
        this.rect(fieldLeft + width / 100 * 15, fieldBottom - height / 100 * 20, width / 100 * 70, height / 100 * 20);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.stroke();

        //Penalty spots
        this.circle(width / 2 + padding, height / 100 * 12 + padding + heightOffset, 3);
        this.fill(lineColor);
        this.circle(width / 2 + padding, height / 100 * 88 + padding + heightOffset, 3);
        this.fill(lineColor);

        //Six meters areas
        this.rect(fieldLeft + width / 100 * 35, fieldTop, width / 100 * 30, height / 100 * 6);
        this.rect(fieldLeft + width / 100 * 35, fieldBottom - height / 100 * 6, width / 100 * 30, height / 100 * 6);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.stroke();

        //Corner arcs
        const cornerRadius = 15;
        this.moveTo(fieldLeft, fieldTop);
        this.arc(fieldLeft, fieldTop, cornerRadius, 0, Math.PI / 2);
        this.moveTo(fieldRight, fieldTop);
        this.arc(fieldRight, fieldTop, cornerRadius, Math.PI / 2, Math.PI);
        this.moveTo(fieldLeft, fieldBottom);
        this.arc(fieldLeft, fieldBottom, cornerRadius, -Math.PI / 2, 0);
        this.moveTo(fieldRight, fieldBottom);
        this.arc(fieldRight, fieldBottom, cornerRadius, Math.PI, -Math.PI / 2);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.stroke();
        
        
        //Goals
        this.rect(width / 2 - 30 + padding, fieldTop - 20, 60, 20);
        this.rect(width / 2 - 30 + padding, fieldBottom, 60, 20);
        this.setStrokeStyle({
            color: lineColor,
            width: mainLineStyle
        });
        this.stroke();
        this.fill(fillColor)
    }

    highlightPenaltyArea(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldLeft + this.fieldWidth / 100 * 15, this.fieldBottom - this.fieldHeight / 100 * 20, this.fieldWidth / 100 * 70, this.fieldHeight / 100 * 20);
        } else if (team === 'away') {
            this.rect(this.fieldLeft + this.fieldWidth / 100 * 15, this.fieldTop, this.fieldWidth / 100 * 70, this.fieldHeight / 100 * 20);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightSixMeterArea(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldLeft + this.fieldWidth / 100 * 35, this.fieldBottom - this.fieldHeight / 100 * 6, this.fieldWidth / 100 * 30, this.fieldHeight / 100 * 6);
        } else if (team === 'away') {
            this.rect(this.fieldLeft + this.fieldWidth / 100 * 35, this.fieldTop, this.fieldWidth / 100 * 30, this.fieldHeight / 100 * 6);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightCornerArc(team, index, color, alpha) {
        const cornerRadius = 15;
        if (team === 'away' && index === 1) {
            this.moveTo(this.fieldLeft, this.fieldTop);
            this.arc(this.fieldLeft, this.fieldTop, cornerRadius, 0, Math.PI / 2);
        } else if (team === 'away' && index === 2) {
            this.moveTo(this.fieldRight, this.fieldTop);
            this.arc(this.fieldRight, this.fieldTop, cornerRadius, Math.PI / 2, Math.PI);
        }  else if (team === 'home' && index === 1) {
            this.moveTo(this.fieldLeft, this.fieldBottom);
            this.arc(this.fieldLeft, this.fieldBottom, cornerRadius, -Math.PI / 2, 0);
        } else if (team === 'home' && index === 2) {
            this.moveTo(this.fieldRight, this.fieldBottom);
            this.arc(this.fieldRight, this.fieldBottom, cornerRadius, Math.PI, -Math.PI / 2);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightCenterCircle(color, alpha) {
        const circleRadius = this.fieldWidth / 100 * 15;
        this.circle(this.fieldLeft + this.fieldWidth / 2, this.fieldTop + this.fieldHeight / 2, circleRadius);
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightLeftOuterCorridor(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldLeft, this.fieldTop, this.fieldWidth / 100 * 15, this.fieldHeight);
        } else {
            this.rect(this.fieldRight - this.fieldWidth / 100 * 15, this.fieldTop, this.fieldWidth / 100 * 15, this.fieldHeight);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightLeftInnerCorridor(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldLeft + this.fieldWidth / 100 * 15, this.fieldTop, this.fieldWidth / 100 * 20, this.fieldHeight);
        } else {
            this.rect(this.fieldRight - this.fieldWidth / 100 * 35, this.fieldTop, this.fieldWidth / 100 * 20, this.fieldHeight);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightCenterCorridor(color, alpha) {
        this.rect(this.fieldLeft + this.fieldWidth / 100 * 35, this.fieldTop, this.fieldWidth / 100 * 30, this.fieldHeight);
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightRightInnerCorridor(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldRight - this.fieldWidth / 100 * 35, this.fieldTop, this.fieldWidth / 100 * 20, this.fieldHeight);
        } else {
            this.rect(this.fieldLeft, this.fieldTop, this.fieldWidth / 100 * 15, this.fieldHeight);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightRightOuterCorridor(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldRight - this.fieldWidth / 100 * 15, this.fieldTop, this.fieldWidth / 100 * 15, this.fieldHeight);
        } else {
            this.rect(this.fieldLeft, this.fieldTop, this.fieldWidth / 100 * 15, this.fieldHeight);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightDeffenseOuterCorridor(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldLeft, this.fieldBottom - this.fieldHeight / 100 * 20, this.fieldWidth, this.fieldHeight / 100 * 20);
        } else {
            this.rect(this.fieldLeft, this.fieldTop, this.fieldWidth, this.fieldHeight / 100 * 20);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightDeffenseInnerCorridor(team, color, alpha) {
        if (team === 'home') {
            this.rect(this.fieldLeft, this.fieldBottom - this.fieldHeight / 100 * 35, this.fieldWidth, this.fieldHeight / 100 * 15);
        } else {
            this.rect(this.fieldLeft, this.fieldTop + this.fieldHeight / 100 * 20, this.fieldWidth, this.fieldHeight / 100 * 15);
        }
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    highlightMidField(color, alpha) {
        this.rect(this.fieldLeft, this.fieldTop + this.fieldHeight / 100 * 35, this.fieldWidth, this.fieldHeight / 100 * 30);
        this.fill({
            color: color,
            alpha: alpha
        });
    }

    reset() {
        this.clear();
        this.initField(this.client, this.dTexture);
    }
}