const bodyStyle = document.body.style;
var colors = ['#000000', '#CC99C9', '#9EC1CF', '#9EE09E', '#FFFF60', '#FEB144', '#FF6663'];
var currentIndex = 0;
var firstRun = true;
var patCustom = [];
var modal = false;
var automatic = false;
var interval;

function setAutomatic(){
    automatic = !automatic;
    let time = document.getElementById('automaticTime').value;
    if(automatic){
        interval = setInterval(() => { changeColor('n') }, time ? time : 1000);
        document.getElementsByClassName('toggle')[0].style.backgroundColor = '#74DA7A';
        return document.getElementsByClassName('toggle-ball')[0].style.marginLeft = 'auto';
    }

    if (interval)
        clearInterval(interval);
    document.getElementsByClassName('toggle')[0].style.backgroundColor = '#3f3f3f';
    return document.getElementsByClassName('toggle-ball')[0].style.marginLeft = '0';

}


function showPatternModal(){
    modal = !modal;
    
    if(modal){
        return document.getElementById('patternModal').style.display = 'inline';
    }

    return document.getElementById('patternModal').style.display = 'none';

}

function setCustomPattern(){
    let pattern = document.getElementById('customPattern').value;
    pattern = pattern.replace(/ /g, '').toUpperCase().split(',');
    pattern = hexValidator(pattern);
    
    if (pattern.length != 0){
        document.getElementsByClassName('pattern-4')[0].style.backgroundImage = 'linear-gradient(to bottom left, ' + pattern.join(', ') + ')'
        patCustom = pattern;
        setPattern(4);
    }

    return null
}

function setPattern(pattern){
    switch(pattern){
        case 0:
            colors = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FEB144', '#FF6663'];
            break;
        case 1:
            colors = ['#F24171', '#6DF2F2', '#F2A922', '#F28C0F', '#A62103'];
            break;
        case 2:
            colors = ['#FF5302', '#BE6BBF', '#596CD9', '#21A650', '#FF322F'];
            break;
        case 3:
            colors = ['#DE0003', '#FF2E03', '#FCFF09', '#109500', '#003DE5'];
            break;
        case 4:
            colors = patCustom;
            break;
        default:
            colors = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FFFF60', '#FEB144', '#FF6663'];
            break;
    }

    return bodyStyle.backgroundColor = colors[0];
}

function changeColor(step){
    let currentColor = bodyStyle.backgroundColor;
    let applyColor;
    let hexCurrent = rgbToHex(currentColor);
    currentIndex = colors.findIndex(color => {
        return color == hexCurrent;
    });
    
    if (firstRun){
        firstRun = false;
        colors.shift();
        let message = document.getElementById('message');
        message.innerHTML = "That's better! <br> Rainbows are cool!";
        document.getElementsByClassName('footer')[0].style.display = 'flex';
    }

    if (step == 'p'){
        if (currentIndex == 0){
            applyColor = colors[colors.length - 1];
            document.getElementById('index').innerHTML = colors.length - 1 + ' / ' + (colors.length - 1);
        }
            else{
            applyColor = colors[currentIndex -1];
            document.getElementById('index').innerHTML = (currentIndex - 1) + ' / ' + (colors.length - 1);
            }
        }
        
        if (step == 'n'){
            if (currentIndex == colors.length -1){
            applyColor = colors[0];
            document.getElementById('index').innerHTML =  0 + ' / ' + (colors.length - 1);
            }
            else{
                applyColor = colors[currentIndex + 1];
                document.getElementById('index').innerHTML =  (currentIndex + 1) + ' / ' + (colors.length - 1);
            }
        }
        
    bodyStyle.backgroundColor = applyColor;
}

function hexValidator(hexCodes){
    let valid = [];
    hexCodes.map((item, index) => {
        if(item != null && item != undefined && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(item)){
            valid.push(item);
        }
    })
    return valid;
}

// Prefiro trabalhar com hexadecimais
function hexSwitch(num){
    switch (num){
            case 10:
                num = 'A'
                break;
            case 11:
                num = 'B'
                break;
            case 12:
                num = 'C'
                break;
            case 13:
                num = 'D'
                break;
            case 14:
                num = 'E'
                break;
            case 15:
                num = 'F'
                break;
            default:
                num = num.toString(); 
        }
    return num
}

function rgbToHex(color){
    color = color.replace('rgb(', '').replace(')', '').replace(/ /g, '');
    color = color.split(',');
    var hexColor = [];
    for (item of color){
        let firstDigit = Math.floor(item / 16);
        let secondDigit = item % 16;
        firstDigit = hexSwitch(firstDigit);
        secondDigit = hexSwitch(secondDigit);
        hexColor.push(firstDigit + secondDigit)
    }
    color = '#' + hexColor.join('') 
    console.log(color);
    return color;
}

function setBodyColor(){
    bodyStyle.backgroundColor = colors[0];
}