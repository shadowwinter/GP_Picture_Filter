// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var imgIn1;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
//vertical lines
var edgeMatrixX = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1]
]
//horizontal lines
var edgeMatrixY = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1]
]
var sharpenMatrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1]
];

var thresholdSlider; var borderColour;
var checkFilter, checkFilter1, checkFilter2, checkFilter3, checkFilter4, checkFilter5, checkFilter6, checkFilter7, checkFilter8;
var resultImg;

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
    imgIn1 = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width*2)+180, imgIn.height);

    //different check boxes so that users are able to select the filter they want to add
    checkFilter = createCheckbox("Sepia", false);
    checkFilter1 = createCheckbox("Grayscale", false);
    checkFilter2 = createCheckbox("Dark Corners", false);
    checkFilter3 = createCheckbox("Radial Blur", false);
    checkFilter4 = createCheckbox("Border", false);
    checkFilter5 = createCheckbox("Invert", false);
    checkFilter6 = createCheckbox("Sharpen", false);
    checkFilter7 = createCheckbox("Edge Blur", false);
    checkFilter8 = createCheckbox("Threshold", false);

    checkFilter.position(imgIn.width * 2 + 14, 80);
    checkFilter1.position(imgIn.width * 2 + 14, 100);
    checkFilter2.position(imgIn.width * 2 + 14, 120);
    checkFilter3.position(imgIn.width * 2 + 14, 140);
    checkFilter4.position(imgIn.width * 2 + 14, 160);
    checkFilter5.position(imgIn.width * 2 + 14, 180);
    checkFilter6.position(imgIn.width * 2 + 14, 200);
    checkFilter7.position(imgIn.width * 2 + 14, 220);
    checkFilter8.position(imgIn.width * 2 + 14, 240);

    checkFilter.changed(earlyBirdFilter);
    checkFilter1.changed(earlyBirdFilter);
    checkFilter2.changed(earlyBirdFilter);
    checkFilter3.changed(earlyBirdFilter);
    checkFilter4.changed(earlyBirdFilter);
    checkFilter5.changed(earlyBirdFilter);
    checkFilter6.changed(earlyBirdFilter);
    checkFilter7.changed(earlyBirdFilter);
    checkFilter8.changed(earlyBirdFilter);

    thresholdSlider = createSlider(0,255,125);
    thresholdSlider.position(imgIn.width * 2 + 14, 260);

    borderColour = createSelect();
    borderColour.position((imgIn.width * 2) + 85, 162);
    borderColour.option("White");
    borderColour.option("Grey");
    borderColour.option("Black");
    borderColour.option("Red");
    borderColour.option("Orange");
    borderColour.option("Yellow");
    borderColour.option("Green");
    borderColour.option("Turquoise");
    borderColour.option("Blue");
    borderColour.option("Purple");
    borderColour.option("Pink");
    borderColour.changed(borderFilter);

}

/////////////////////////////////////////////////////////////////
function draw() {
    background(240);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);

    fill(0);
    textSize(15);
    textAlign(CENTER);
    text("Filters available:", (imgIn.width * 2) + 70, 75);
    text("white", (imgIn.width * 2) + 35, 293);
    text("black", (imgIn.width * 2) + 125, 293);
    text(thresholdSlider.value(), (imgIn.width * 2) + 78, 293);

}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = noFilter(imgIn,resultImg);

  //apply different filters depending on the checkbox selected
  if(checkFilter.checked()){
    resultImg = sepiaFilter(imgIn,resultImg);
  }
  if(checkFilter1.checked()){
    resultImg = grayscaleFilter(resultImg);
  }
  if(checkFilter2.checked()){
    resultImg = darkCorners(resultImg);
  }
  if(checkFilter3.checked()){
    resultImg = radialBlurFilter(resultImg);
  }
  if(checkFilter4.checked()){
    resultImg = borderFilter(resultImg);
  }
  if(checkFilter5.checked()){
    resultImg = invertFilter(resultImg);
  }
  if(checkFilter6.checked()){
    resultImg = sharpenFilter(resultImg);
  }
  if(checkFilter7.checked()){
    imgIn1.filter(GRAY);
    resultImg = edgeBlurFilter(imgIn1);
  }
  if(checkFilter8.checked()){
    resultImg = thresholdFilter(resultImg);
  }

  return resultImg;
}


function noFilter(imgIn,resultImg){

  imgIn.loadPixels();
  resultImg.loadPixels();

  for(var x=0; x<imgIn.width; x++){
    for(var y=0; y<imgIn.height; y++){
      var pixelIndex = ((imgIn.width*y)+x)*4;
      var oldRed = imgIn.pixels[pixelIndex+0];
      var oldGreen = imgIn.pixels[pixelIndex+1];
      var oldBlue = imgIn.pixels[pixelIndex+2];

      resultImg.pixels[pixelIndex+0] = oldRed;
      resultImg.pixels[pixelIndex+1] = oldGreen;
      resultImg.pixels[pixelIndex+2] = oldBlue;
      resultImg.pixels[pixelIndex+3] = 255;
    }
  }

  resultImg.updatePixels();
  return resultImg;
}


function sepiaFilter(imgIn,resultImg){

  imgIn.loadPixels();
  resultImg.loadPixels();

  for(var x=0; x<imgIn.width; x++){
    for(var y=0; y<imgIn.height; y++){
      var pixelIndex = ((imgIn.width*y)+x)*4;
      var oldRed = imgIn.pixels[pixelIndex+0];
      var oldGreen = imgIn.pixels[pixelIndex+1];
      var oldBlue = imgIn.pixels[pixelIndex+2];

      var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
      var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
      var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);
    
      newRed = constrain(newRed,0,255);
      newGreen = constrain(newGreen,0,255);
      newBlue = constrain(newBlue,0,255);
    
      resultImg.pixels[pixelIndex+0] = newRed;
      resultImg.pixels[pixelIndex+1] = newGreen;
      resultImg.pixels[pixelIndex+2] = newBlue;
      resultImg.pixels[pixelIndex+3] = 255;
    }
  }

  resultImg.updatePixels();
  return resultImg;
}

function grayscaleFilter(imgIn){
  resultImg.loadPixels();
  imgIn.loadPixels();

  for (var x=0; x<imgIn.width; x++){
      for(var y=0; y<imgIn.height; y++){
          var index = (y*imgIn.width+x)*4;

          var r = imgIn.pixels[index+0];
          var g = imgIn.pixels[index+1];
          var b = imgIn.pixels[index+2];

          var gray = (r+g+b)/3;
          // var gray = r * 0.299 + g * 0.587 + b * 0.114;
          
          resultImg.pixels[index+0] = gray;
          resultImg.pixels[index+1] = gray;
          resultImg.pixels[index+2] = gray;
          resultImg.pixels[index+3] = 255;
      
      }
  }
  resultImg.updatePixels();
  return resultImg;

}

function darkCorners(imgIn){
  imgIn.loadPixels();

  var midX = imgIn.width/2;
  var midY = imgIn.height/2;
  var maxDist = dist(midX,midY,0,0);
  var dynLum = 1;

  for(var x=0; x<imgIn.width; x++){
    for(var y=0; y<imgIn.height; y++){
      var d = abs(dist(midX,midY,x,y));

      if(d>300){ //only process pixels that are 300 dist away from center
        var pixelIndex = ((imgIn.width*y)+x)*4;
        var oldRed = imgIn.pixels[pixelIndex+0];
        var oldGreen = imgIn.pixels[pixelIndex+1];
        var oldBlue = imgIn.pixels[pixelIndex+2];
      
        if(d<=450){ //between 300 to 450 dist
          dynLum = map(d,300,450,1,0.4); //gets darker as it gets further
        } else{ //from 450 to maxDist
          dynLum = map(d,450,maxDist,0.4,0);
        }
        dynLum = constrain(dynLum,0,1);
        imgIn.pixels[pixelIndex+0] = oldRed * dynLum;
        imgIn.pixels[pixelIndex+1] = oldGreen * dynLum;
        imgIn.pixels[pixelIndex+2] = oldBlue * dynLum;
      }
    }
  }
  imgIn.updatePixels();
  return imgIn;
}

function convolution(x, y, blurMatrix, blurMatrixSize, img){
  var totalRed = 0;
  var totalGreen = 0;
  var totalBlue = 0;

  var offset = floor(blurMatrixSize/2);

  for(var i=0; i<blurMatrixSize; i++){
      for(var j=0; j<blurMatrixSize; j++){
          var xloc = x + i - offset;
          var yloc = y + j - offset;

          var index = (img.width * yloc + xloc) * 4;

          index = constrain(index,0,img.pixels.length-1);

          totalRed += img.pixels[index+0] * blurMatrix[i][j];
          totalGreen += img.pixels[index+1] * blurMatrix[i][j];
          totalBlue += img.pixels[index+2] * blurMatrix[i][j];
      }
  }

  return [totalRed, totalGreen, totalBlue];
}


function radialBlurFilter(imgIn){
  imgIn.loadPixels();
  
  for(var x=0; x<imgIn.width; x++){
    for(var y=0; y<imgIn.height; y++){
      var pixelIndex = ((imgIn.width*y)+x)*4;
      var oldRed = imgIn.pixels[pixelIndex+0];
      var oldGreen = imgIn.pixels[pixelIndex+1];
      var oldBlue = imgIn.pixels[pixelIndex+2];

      var c = convolution(x,y,matrix,matrix.length,imgIn);

      var mouseDist = abs(dist(x,y,mouseX,mouseY));
      var dynBlur = map(mouseDist,100,300,0,1);
      dynBlur = constrain(dynBlur,0,1);

      var newRed = c[0]*dynBlur + oldRed*(1-dynBlur);
      var newGreen = c[1]*dynBlur + oldGreen*(1-dynBlur);
      var newBlue = c[2]*dynBlur + oldBlue*(1-dynBlur);
      
      imgIn.pixels[pixelIndex+0] = newRed;
      imgIn.pixels[pixelIndex+1] = newGreen;
      imgIn.pixels[pixelIndex+2] = newBlue;
    }
  }
  
  imgIn.updatePixels();
  return imgIn;
}

function borderFilter(imgIn){
  //draw the img onto the buffer
  var resultImg = createGraphics(imgIn.width, imgIn.height);
  resultImg.image(imgIn,0,0);

  var item = borderColour.value();
  switch(item){
    case "White":
      resultImg.stroke(255);
      break;
    case "Grey":
      resultImg.stroke(127);
      break;
    case "Black":
      resultImg.stroke(0);
      break;
    case "Red":
      resultImg.stroke(255,0,0);
      break;
    case "Orange":
      resultImg.stroke(255,128,0);
      break;
    case "Yellow":
      resultImg.stroke(255,255,0);
      break;
    case "Green":  
      resultImg.stroke(0,255,0);
      break;
    case "Turquoise":  
      resultImg.stroke(0,255,255);
      break;
    case "Blue":
      resultImg.stroke(0,128,255);
      break;
    case "Purple":
      resultImg.stroke(127,0,255);
      break;
    case "Pink":
      resultImg.stroke(255,0,255);
      break;
  }

  //draw a big fat white rect with rounded corners around the image
  resultImg.noFill();

  resultImg.strokeWeight(45);
  resultImg.rect(0,0,imgIn.width,imgIn.height,50);

  return resultImg;
}

function invertFilter(imgIn){
  
  imgIn.loadPixels();
  resultImg.loadPixels();

  for (var x=0; x<imgIn.width; x++){
      for(var y=0; y<imgIn.height; y++){
          var index = (y*imgIn.width+x)*4;

          var newRed = 255 - imgIn.pixels[index+0];
          var newGreen = 255 - imgIn.pixels[index+1];
          var newBlue = 255 - imgIn.pixels[index+2];
          
          resultImg.pixels[index+0] = newRed;
          resultImg.pixels[index+1] = newGreen;
          resultImg.pixels[index+2] = newBlue;
          resultImg.pixels[index+3] = 255;
      
      }
  }
  resultImg.updatePixels();
  return resultImg;

}

function sharpenFilter(imgIn){
  var matrixSize = sharpenMatrix.length;

  resultImg.loadPixels();
  imgIn.loadPixels();

  for (var x=0; x<imgIn.width; x++){
      for(var y=0; y<imgIn.height; y++){
          var index = (y*imgIn.width+x)*4;

          var c = convolution(x, y, sharpenMatrix, matrixSize, imgIn);

          resultImg.pixels[index+0] = c[0];
          resultImg.pixels[index+1] = c[1];
          resultImg.pixels[index+2] = c[2];
          resultImg.pixels[index+3] = 255;
      
      }
  }
  resultImg.updatePixels();
  return resultImg;

}

function edgeBlurFilter(imgIn){
  var matrixSize = edgeMatrixX.length;

  resultImg.loadPixels();
  imgIn.loadPixels();

  for (var x=0; x<imgIn.width; x++){
      for(var y=0; y<imgIn.height; y++){

          var index = (y*imgIn.width+x)*4;
          var cX = convolution(x, y, edgeMatrixX, matrixSize, imgIn);
          cX = map(abs(cX[0]), 0, ((1+2+1)*255) , 0, 255);

          var cY = convolution(x, y, edgeMatrixY, matrixSize, imgIn);
          cY = map(abs(cY[0]), 0, ((1+2+1)*255) , 0, 255);

          var combo = cX + cY ;

          resultImg.pixels[index+0] = combo;
          resultImg.pixels[index+1] = combo;
          resultImg.pixels[index+2] = combo;
          resultImg.pixels[index+3] = 255;
      
      }
  }
  resultImg.updatePixels();
  return resultImg;

}


function thresholdFilter(imgIn){
  resultImg.loadPixels();
  imgIn.loadPixels();

  for (var x=0; x<imgIn.width; x++){
      for(var y=0; y<imgIn.height; y++){
          var index = (y*imgIn.width+x)*4;

          var r = imgIn.pixels[index+0];
          var g = imgIn.pixels[index+1];
          var b = imgIn.pixels[index+2];

          var gray = (r+g+b)/3;
          
          if(gray>thresholdSlider.value()) gray = 255;
          else gray = 0;
          
          resultImg.pixels[index+0] = gray;
          resultImg.pixels[index+1] = gray;
          resultImg.pixels[index+2] = gray;
          resultImg.pixels[index+3] = 255;
      
      }
  }
  resultImg.updatePixels();
  return resultImg;

}

