// canvas 风向标
var windDirImage;
Tool.imageInit = function () {
    windDirImage = {
        dir: new Image(),
        calm: new Image(),
    };
    windDirImage.dir.src = 'resources/images/windIcon-1/N.png';
    windDirImage.calm.src = 'resources/images/windIcon-1/R.png';
    windDirImage.dir.onload = function() {
        windDirImage.dirCanvas = Tool.getBase64ImageCanvas(windDirImage.dir);
    };
    windDirImage.calm.onload = function() {
        windDirImage.calmCanvas = Tool.getBase64ImageCanvas(windDirImage.calm);
    };
}
Tool.getWindDirImageBaseUrl = function(dir, color) {
    if (!windDirImage[dir + '_' + color]) {
        if (dir == -1) {
            windDirImage[dir + '_' + color] = Tool.getBase64ByImage(windDirImage.calmCanvas, windDirImage.calm, color);
        } else {
            windDirImage[dir + '_' + color] = Tool.getBase64ByImage(windDirImage.dirCanvas, windDirImage.dir, color, dir);
            if (typeof dir == 'number') windDirImage['dir_rotate'] = dir;
        }
    }
    return windDirImage[dir + '_' + color];
}
Tool.getBase64ByImage = function(canvas, img, color, rotate) {
    let ctx = canvas.getContext('2d');

    if (typeof rotate == 'number') {
        ctx.save();
        ctx.clearRect(0, 0, img.width, img.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        // if(windDirImage['dir_rotate']) ctx.rotate(-windDirImage['dir_rotate'] / 180 * Math.PI);
        ctx.rotate((rotate / 180) * Math.PI);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2);
        ctx.restore();
    }
    let imageD = ctx.getImageData(0, 0, windDirImage.dir.width, windDirImage.dir.height);
    var pdata = imageD.data;
    var colorArr = Sun.Util.Color.colorToRgb(color, 1);
    for (var j = 0; j < pdata.length; j += 4) {
        pdata[j] = colorArr[0];
        pdata[j + 1] = colorArr[1];
        pdata[j + 2] = colorArr[2];
    }
    ctx.putImageData(imageD, 0, 0);
    return canvas.toDataURL('image/png');
}
Tool.getBase64ImageCanvas = function(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas;
}

Tool.getDirValByValue =function (dirval){
    var dir = "";
    if(dirval > 22.5 && dirval <= 67.5){
        dir = 45;
    }else if(dirval > 67.5 && dirval <= 112.5){
        dir = 90;
    }else if(dirval > 112.5 && dirval <= 157.5){
        dir = 135;
    }else if(dirval > 157.5 && dirval <= 202.5){
        dir =180;
    }else if(dirval > 202.5 && dirval <= 247.5){
        dir = 225;
    }else if(dirval > 247.5 && dirval <= 292.5){
        dir =270;
    }else if(dirval > 292.5 && dirval <= 337.5){
        dir = 315;
    }else if((dirval > 337.5 && dirval <= 370) || (dirval >=0 && dirval <= 22.5)){ //370(防止有小数点存在)
        dir =0;
    }else if(dirval==-1) {
    dir=-1;
}
    return dir;
}
export default Tool;
