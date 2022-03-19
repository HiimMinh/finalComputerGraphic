import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 20
camera.position.z = 25



scene.add(camera)

// const fov = 75;
//     const aspect = 2;
//     const near = 0.1;
//     const far = 100;
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     // camera.position.set(0, 20, 40);
//     camera.position.set(1, 1 ,1)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/**
 * Set up parameters
 */
let tiles = []
let board = []

let cols = 4
let rows = 4

let wCanvas = 20;
let hCanvas = 20;

let xTile = wCanvas / cols;
let zTile = hCanvas / rows;
let yTile = 1;

let blankSpot = -1;

const loader = new THREE.TextureLoader();

/**
 * Cube
 */
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        let x = i * xTile - 5;
        let z = j * zTile - 5;

        let index = i + j * cols;
        let name = index.toString()
        board.push(name)

        let geometry = new THREE.BoxGeometry(xTile - 0.5, yTile, zTile - 0.5)

        let materials = [
            new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
            new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
            new THREE.MeshBasicMaterial({ map: loader.load(index + '.jpg') }),
            new THREE.MeshBasicMaterial({ map: loader.load('rotation/m_' + index + '.jpg') }),
            new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
            new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
        ];

        let tile = new THREE.Mesh(geometry, materials)
        tile.position.x = x;
        tile.position.z = z;
        tile.name = name;

        tiles.push(tile)
    }
}

// tiles.pop();
for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].name == '15') {
        tiles[i].visible = false
    }
}
// tiles..visible = false
// board.pop();
// board.push("-1")


// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     // new THREE.MeshBasicMaterial({ color: 0xff0000 })
//     new THREE.MeshBasicMaterial({ map: loader.load('1.jpg') }),
// )
// cube.name = '1'
// scene.add(cube)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 2, 1),
//     new THREE.MeshBasicMaterial({ color: 0x344456 })
// )
// cube2.name = '2'
// cube2.position.x = 0
// cube2.position.z = 5
// scene.add(cube2)


// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 3, 1),
//     new THREE.MeshBasicMaterial({ color: 0x454456 })
// )
// cube3.name = '3'
// cube3.position.x = 0
// cube3.position.z = 10
// scene.add(cube3)


// const cube4 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 4, 1),
//     new THREE.MeshBasicMaterial({ color: 0x774456 })
// )
// cube4.name = '4'
// cube4.position.x = 0
// cube4.position.z = 15
// scene.add(cube4)



// let a = cube.position.x
// console.log(a)
// console.log(cube)

// let cubes = [cube , cube2, cube3, cube4]


// function swapx(){
//     // let temp1 = cube.position.x;
//     // let temp2 = cube2.position.x;
//     // return [temp1, temp2] = [temp2, temp1];
//     let temp = cube.position.x;
//     cube.position.x = cube2.position.x;
//     cube2.position.x = temp;
// }

// function swapz(){
//     // let temp3 = cube.position.z;
//     // let temp4 = cube2.position.z;
//     // return [temp3, temp4] = [temp3, temp4]

//     let temp = cube.position.z;
//     cube.position.z = cube2.position.z;
//     cube2.position.z = temp;

// }

// swapx()
// swapz()



// function swapcubeprop(cube, cube2) {
//     let temp1 = cube.position.x;
//     cube.position.x = cube2.position.x;
//     cube2.position.x = temp1;

//     let temp2 = cube.position.z;
//     cube.position.z = cube2.position.z;
//     cube2.position.z = temp2;

//     let temp3 = cube.name;
//     cube.name = cube2.name;
//     cube2.name = temp3;
// }

function swap(i, j, arr) {
    // for(let k = 0; k < arr.length; k++){
    //     if(arr[k].name == j.toString())
    //     {
    //         let temp1 = arr[i].position.x;
    //         arr[i].position.x = arr[j].position.x;
    //         arr[j].position.x = temp1;

    //         let temp2 = arr[i].position.z;
    //         arr[i].position.z = arr[j].position.z;
    //         arr[j].position.z = temp2;

    //         let temp3 = arr[i].name;
    //         arr[i].name = arr[j].name;
    //         arr[j].name = temp3;
    //     }
    // }
    let temp1 = arr[i].position.x;
    arr[i].position.x = arr[j].position.x;
    arr[j].position.x = temp1;

    let temp2 = arr[i].position.z;
    arr[i].position.z = arr[j].position.z;
    arr[j].position.z = temp2;

    let temp3 = arr[i].name;
    arr[i].name = arr[j].name;
    arr[j].name = temp3;

}


// function randomMove(array){
//     let j = Math.floor(Math.random()*array.length);
//     // console.log(j)
//         // const temp = array[i];
//         // array[i] = array[j];
//         // array[j] = temp;
//         // swapcubeprop(array[i], array[j])
//         // swap(i, j, array)
//         // let r1 =    array[j].position.x
//         // let r2 = array[j].position.z

//         let r1 = Math.floor(Math.random(cols));
//         let r2 = Math.floor(Math.random(rows));
//     move(r1 , r2, array)

// }

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // const temp = array[i];
        // array[i] = array[j];
        // array[j] = temp;
        // swapcubeprop(array[i], array[j])
        swap(i, j, array)
        // move(i , j , array)
    }
}

// function shuffleArray(arr){
//     for(let i = 0; i < 5; i++){
//         randomMove(arr);
//     }
// }
shuffleArray(tiles)
// randomMove(tiles)


/**
 * Function
 */
function move(i, j, arr) {
    let blank = findBlank();
    console.log(blank)
    // let blankCol = blank % cols;
    // let blankRow = Math.floor(blank / rows);
    let blankCol = arr[blank].position.x
    let blankRow = arr[blank].position.z
    if (isNeighbor(i, j, blankCol, blankRow)) {
        swap(blank, (i + j * cols), arr);
    }
}


function isNeighbor(i, j, x, y) {
    if (i !== x && j !== y) {
        return false;
    }
    if (Math.abs(i - x) == 5 || Math.abs(j - y) == 5) {
        return true;
    }

    return false;
}


function findBlank() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].name == "15") {
            return i;
        }
    }
}
console.log(findBlank())

console.log(tiles)
console.log(board)

// console.log(cube2)
tiles.forEach((tile) => {
    scene.add(tile);
});





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()