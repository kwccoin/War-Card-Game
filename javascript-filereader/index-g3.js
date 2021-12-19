// This function will be called once the page loads completely            

function pageLoaded(){                


// alert("Hello World!");            
// this will trigger a node event ??
// seem ned host
 

// Get a handle to the canvas object        
var canvas = document.getElementById("testcanvas");        

// Get the 2d context for this canvas        
var context = canvas.getContext("2d");        

// Our drawing code here...

/*

// FILLED RECTANGLES 
// Draw a solid square with width and height of 100 pixels at (200,10) 
context.fillRect(200, 10, 100, 100); 

// Draw a solid square with width of 90 pixels and height of 30 pixels at (50,70) 

context.fillRect(50, 70, 90, 30);

// STROKED RECTANGLES 
// Draw a rectangular outline with width and height of 50 pixels at (110, 10) 
context.strokeRect(110, 10, 50, 50); 

// Draw a rectangular outline with width and height of 50 pixels at (30, 10) 

context.strokeRect(30, 10, 50, 50);

// CLEARING RECTANGLES 

// this relates to the filled above

// Clear a rectangle with width of 30 pixels and height of 20 pixels at (210, 20) 
context.clearRect(210, 20, 30, 20); 

// Clear a rectangle with width of 30 pixels and height of 20 pixels at (260, 20) 

context.clearRect(260, 20, 30, 20);

context.clearRect(201, 40, 20, 20);

//Figure 1-1. Coordinat


//Listing 1-5 will create the triangles, arcs, and shapes shown in Figure!1-3.

//Listing 1-5. Drawing Complex Shapes Inside the Canvas

// DRAWING COMPLEX SHAPES 
// Draw a filled triangle 
context.beginPath(); 
context.moveTo(10, 120);    

// Start drawing at 10, 120 
context.lineTo(10, 180); 
context.lineTo(110, 150); 
context.fill();             
// Close the shape and fill it out


// Draw a stroked triangle 
context.beginPath(); 
context.moveTo(140, 160); 

// Start drawing at 140, 160 
context.lineTo(140, 220); 
context.lineTo(40, 190); 
context.closePath(); 
context.stroke();

// Draw a more complex set of lines
context.beginPath(); 
context.moveTo(160, 160); 

// Start drawing at 160, 160 
context.lineTo(170, 220); 
context.lineTo(240, 210); 
context.lineTo(260, 170); 
context.lineTo(190, 140); 
context.closePath(); 
context.fill(); // stroke();

// DRAWING ARCS & CIRCLES 
// Draw a semicircle 
context.beginPath(); 
// Draw an arc at (400, 50) with radius 40 from 0 to 180 degrees, anticlockwise 
// PI radians = 180 degrees 
context.arc(100, 300, 40, 0, Math.PI, true);     
context.stroke();

// Draw a full circle context.beginPath(); 
// Draw an arc at (500, 50) with radius 30 from 0 to 360 degrees, anticlockwise 
// 2*PI radians = 360 degrees 
context.arc(100, 300, 30, 0, 2 * Math.PI, true); 
context.fill();

// Draw a three-quarter arc 

context.beginPath(); 

// Draw an arc at (400, 100) with radius 25 from 0 to 270 degrees, clockwise 
// (3/2*PI radians = 270 degrees) 

context.arc(200, 300, 25, 0, 3 / 2 * Math.PI, false); 
context.stroke();

// DRAWING TEXT 

context.fillText("This is some text...", 40, 430);

// FILL STYLES AND COLORS 
// Set fill color to red 
context.fillStyle = "red"; 
context.strokeStyle = "green"; 

// Draw a red filled rectangle 
context.fillRect(310, 160, 100, 50);

// Set stroke color to green context.strokeStyle = "green";


// Modify the font 
context.font = "10pt Arial"; 
context.fillText("This is in 10pt Arial...", 80, 470);

// Draw stroked text 
context.font = "16pt Arial"; 
context.strokeText("This is stroked in 16pt Arial...", 120, 510);

// Figure 1-3. Drawing complex shapes inside the canvas

// TEXTURES // Get a handle to the Image object 


*/

//var scrdumpImage = document.getElementById("1scrdump"); 
// var pattern = context.createPattern(scrdumpImage, "repeat");

// Set fill style to newly created pattern 
// context.fillStyle = pattern; 

// Draw a pattern filled rectangle 
// context.fillRect(420, 240, 130, 50);

// https://www.quora.com/How-do-you-make-a-hidden-image-in-HTML use 
// The trick to hiding any element on your web page is to insert either a " display: none; " or " visibility: hidden; " rule for that element. The " display: none; " rule not only hides the element, but also removes it from the document flow

var xmasboxImage = document.getElementById("xmasbox");
// examp use png ... ("xmasbox");
// type error("1scrdump"); 

console.log(xmasboxImage);

// Draw the image at (0, 350) 
context.translate(350, 100);
context.rotate(Math.PI/3);
context.drawImage(xmasboxImage, 5, 5);

// Scale the image to half the original size 
context.drawImage(xmasboxImage, 10, 200, 500, 250);

// Draw part of the image 
context.drawImage(xmasboxImage, 0, 0, 160, 150, 100, 100, 320, 300);



// no code it will still draw the image ...




// ROTATION AND TRANSLATION
//Translate origin to location of object
context.translate(250, 370);
//Rotate about the new origin by 60 degrees
context.rotate(Math.PI / 2);
context.drawImage(xmasboxImage, 0, 0, 60, 50, -30, -25, 800, 480);
//Restore to original state by rotating and translating back
//context.rotate(-Math.PI / 3);
//context.translate(-240, -370);
context.translate(-240, -370);
}