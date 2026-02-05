function setup(){
    createCanvas(400,400)
    background(255)


}

function draw(){

    fill(random(255), random(255), random(255))
    textSize(25)
    textAlign(CENTER, CENTER)
    text("flamingos", width/2, height/2)
    
    let c = get(0, 0, width, height)

   translate(width/2, height/2)
  rotate(0.1)
  imageMode(CENTER)
    image(c, 0, -1, width +2, height +4)

}