class Tile {
    constructor(index, xTile, yTile, zTile, material, xPos, zPos) {
        this.index = index;
        this.xPos = xPos;
        this.zPos = zPos;

        this.xTile = xTile;
        this.zTile = zTile;
        this.yTile = yTile;
        this.material = material;
    }



    createMesh() {

        let geometry = new THREE.BoxGeometry(this.xTile, this.yTile, this.zTile);
        // let mat = new THREE.MeshPhongMaterial({
        //     map: loader.load(this.material),
        // });
        let tile = new THREE.Mesh(geometry, this.material);

        this.setPosition(tile);
        return tile;
    }

    setPosition(tile) {
        tile.position.x = this.xPos;
        tile.position.z = this.zPos;
    }


}