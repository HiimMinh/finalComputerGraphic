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
const mouse = new THREE.Vector2(1, 1);
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

for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].name == '15') {
        tiles[i].visible = false
    }
}


function swap(i, j, arr) {

    let temp1 = arr[i].position.x;
    arr[i].position.x = arr[j].position.x;
    arr[j].position.x = temp1;

    let temp2 = arr[i].position.z;
    arr[i].position.z = arr[j].position.z;
    arr[j].position.z = temp2;

    // let temp3 = arr[i].name;
    // arr[i].name = arr[j].name;
    // arr[j].name = temp3;

}


function randomMove(array) {
    let j = Math.floor(Math.random() * array.length);
    // console.log(j)
    // const temp = array[i];
    // array[i] = array[j];
    // array[j] = temp;
    // swapcubeprop(array[i], array[j])
    // swap(i, j, array)
    // let r1 =    array[j].position.x
    // let r2 = array[j].position.z

    let r1 = Math.floor(Math.random(cols));
    let r2 = Math.floor(Math.random(rows));
    move(r1, r2, array)

}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
     
        swap(i, j, array)
       
    }
}

shuffleArray(tiles)





console.log(tiles)
// console.log(board)


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

// function findBlank(array) {
//     for (let i = 0; i < array.length; i++) {
//         if (array[i].name == "15") {
//             return array[i];
//         }
//     }
// }
// console.log(findBlank(tiles))

class PickHelper {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
        // this.blank = null;
    }
    pick(normalizedPosition, scene, camera) {
        // restore the color if there is a picked object
          if (this.pickedObject) {
            // this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject = undefined;
            // this.blank = undefined;
          }



        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera);
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children);
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object;
            // save its color
            // this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
            // // set its emissive color to flashing red/yellow
            // this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
            
            let blank
            tiles.forEach(tile => {
                if (tile.name == "15") {
                    blank = tile
                }
            });
            swap2cube(this.pickedObject, blank)


            function swap2cube(pickedobject, blank) {
                if (isNeighbor(pickedobject, blank)) {
                    let temp1 = pickedobject.position.x
                    pickedobject.position.x = blank.position.x
                    blank.position.x = temp1

                    let temp2 = pickedobject.position.z
                    pickedobject.position.z = blank.position.z
                    blank.position.z = temp2

                    // let temp3 = pickedobject.name
                    // pickedobject.name = blank.name
                    // blank.name = temp3

                    // for (let i = 0; i < array.length; i++) {
                    //     if (array[i].name == pickedobject.name) {

                    //         for (let j = 0; j < array.length; j++) {
                    //             if (array[j].name == blank.name) {
                    //                 let temp = array[i]
                    //                 array[i] = array[j]
                    //                 array[j] = temp
                    //             }
                    //         }
                    //     }
                    // }

                }

            }


            function isNeighbor(pickedobject, blank) {
                if (pickedobject.position.x !== blank.position.x && pickedobject.position.z !== blank.position.z) {
                    return false;
                }
                if (Math.abs(pickedobject.position.x - blank.position.x) == 5 || Math.abs(pickedobject.position.z - blank.position.z) == 5) {
                    return true;
                }

                return false;
            }
            console.log(this.pickedObject.position.x, this.pickedObject.position.z)
            console.log(this.pickedObject)
            // console.log(tiles)

        }
    }
}

const pickPosition = { x: 0, y: 0 };
const pickHelper = new PickHelper();
clearPickPosition();



const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    pickHelper.pick(pickPosition, scene, camera);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
window.requestAnimationFrame(tick)

function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
}

function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}

function clearPickPosition() {
    // unlike the mouse which always has a position
    // if the user stops touching the screen we want
    // to stop picking. For now we just pick a value
    // unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}

window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

window.addEventListener('touchstart', (event) => {
    // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
}, { passive: false });

window.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
});

window.addEventListener('touchend', clearPickPosition);

tick()

