

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

console.log(c);
//c stands for context object
// setting gravity
const gravity = .5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
    update() {
        // calling function before moving its position
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        // only add velocity if a certain condition exists > monitoring the bottom of our player + over time
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            // add gravity to the player's this.y and excvellerate it over time
            this.velocity.y += gravity
        else this.velocity.y = 0
    }

}
class Platform {
    constructor({ x, y }) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
const player = new Player()
const platforms = [new Platform({
    x: 200, y: 100
}), new Platform({
    x: 500, y: 200
})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate() {
    // recursive loop to change player properties over time
    requestAnimationFrame(animate)
    // velocity of 1 makes it slow 
    // clear canvas and take everything off of it and call playe's draw function and maintain its shape
    // call position and clear the width
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach((platform) => {
        platform.draw()
    })

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })

        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })

        }
    }

    // console.log(scrollOffset)

    // platform collision detection 
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
    if (scrollOffset > 2000) {
        console.log('you win')
    }
}

animate()

// Adding event listeners for movement 

document.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'a':
            console.log('left')
            keys.left.pressed = true
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = true
            break
        case 'w':
            console.log('up')
            player.velocity.y -= 20
            break
        case 'ArrowLeft':
            console.log('left')
            keys.left.pressed = true
            break
        case 'ArrowDown':
            console.log('down')
            break
        case 'ArrowRight':
            console.log('right')
            keys.right.pressed = true
            break
        case 'ArrowUp':
            console.log('up')
            player.velocity.y -= 20
            break
    }
})

document.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'a':
            console.log('left')
            keys.left.pressed = false
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = false
            break
        case 'w':
            console.log('up')
            player.velocity.y -= 20
            break
        case 'ArrowLeft':
            console.log('left')
            keys.left.pressed = false
            break
        case 'ArrowDown':
            console.log('down')
            break
        case 'ArrowRight':
            console.log('right')
            keys.right.pressed = false
            break
        case 'ArrowUp':
            console.log('up')
            player.velocity.y -= 20
            break
    }
})