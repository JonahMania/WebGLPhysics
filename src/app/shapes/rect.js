define(['shape/shape','util/rotationMatrix'],function(Shape, rotationMatrix)
{
    /**
    * A webGl rectangle
    * @param {float} x The x position of the center of the rectangle
    * @param {float} y The y position of the center of the rectangle
    * @param {float} z The z position of the center of the rectangle
    * @param {float} w The width of the rectangle
    * @param {float} h The height of the rectangle
    * @param {float} d The depth of the rectangle
    * @param {int} r The red component of the color of the rectangle
    * @param {int} g The green component of the color of the rectangle
    * @param {int} b The blue component of the color of the rectangle
    */
    var Rect = function(  x, y, z, w, h, d, r, g, b )
    {
        //Inherite objects from shape
        Shape.call(this,x,y,z,r,g,b);
        //The width of the rectangle
        this.width = w;
        //The height of the rectangle
        this.height = h;
        //The depth of the rectangle
        this.depth = d;
        //Initialize all buffers
        this.initBuffers = function(gl)
        {
            //Create the position buffer
            this.vertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexPositionBuffer );
            //Calculate vetices
            this.vertices =
            [
                //Front face
                this.xPos - this.width / 2, this.yPos - this.height / 2, this.zPos - this.depth / 2,
                this.xPos + this.width / 2, this.yPos - this.height / 2, this.zPos - this.depth / 2,
                this.xPos - this.width / 2, this.yPos + this.height / 2, this.zPos - this.depth / 2,
                this.xPos + this.width / 2, this.yPos + this.height / 2, this.zPos - this.depth / 2,
                //Back face
                this.xPos - this.width / 2, this.yPos - this.height / 2, this.zPos + this.depth / 2,
                this.xPos + this.width / 2, this.yPos - this.height / 2, this.zPos + this.depth / 2,
                this.xPos - this.width / 2, this.yPos + this.height / 2, this.zPos + this.depth / 2,
                this.xPos + this.width / 2, this.yPos + this.height / 2, this.zPos + this.depth / 2,
                //Top faces
                this.xPos - this.width / 2, this.yPos + this.height / 2, this.zPos + this.depth / 2,
                this.xPos + this.width / 2, this.yPos + this.height / 2, this.zPos + this.depth / 2,
                this.xPos - this.width / 2, this.yPos + this.height / 2, this.zPos - this.depth / 2,
                this.xPos + this.width / 2, this.yPos + this.height / 2, this.zPos - this.depth / 2,
                //Bottom face
                this.xPos - this.width / 2, this.yPos - this.height / 2, this.zPos + this.depth / 2,
                this.xPos + this.width / 2, this.yPos - this.height / 2, this.zPos + this.depth / 2,
                this.xPos - this.width / 2, this.yPos - this.height / 2, this.zPos - this.depth / 2,
                this.xPos + this.width / 2, this.yPos - this.height / 2, this.zPos - this.depth / 2,
                //Left face
                this.xPos - this.width / 2, this.yPos - this.height / 2, this.zPos + this.depth / 2,
                this.xPos - this.width / 2, this.yPos + this.height / 2, this.zPos + this.depth / 2,
                this.xPos - this.width / 2, this.yPos - this.height / 2, this.zPos - this.depth / 2,
                this.xPos - this.width / 2, this.yPos + this.height / 2, this.zPos - this.depth / 2,
                //Right face
                this.xPos + this.width / 2, this.yPos - this.height / 2, this.zPos + this.depth / 2,
                this.xPos + this.width / 2, this.yPos + this.height / 2, this.zPos + this.depth / 2,
                this.xPos + this.width / 2, this.yPos - this.height / 2, this.zPos - this.depth / 2,
                this.xPos + this.width / 2, this.yPos + this.height / 2, this.zPos - this.depth / 2
            ];
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW );
            this.vertexPositionBuffer.itemSize = 3;
            this.vertexPositionBuffer.numItems = this.vertices.length / 3;
            //Create the vertex normal buffer
            this.vertexNormalBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexNormalBuffer );
            //Create normals
            this.vertexNormals = [
                //Front face
                0,0,-1,
                0,0,-1,
                0,0,-1,
                0,0,-1,
                //Back face
                0,0,1,
                0,0,1,
                0,0,1,
                0,0,1,
                //Top face
                0,1,0,
                0,1,0,
                0,1,0,
                0,1,0,
                //Bottom face
                0,-1,0,
                0,-1,0,
                0,-1,0,
                0,-1,0,
                //Left face
                -1,0,0,
                -1,0,0,
                -1,0,0,
                -1,0,0,
                //Right face
                1,0,0,
                1,0,0,
                1,0,0,
                1,0,0
            ];
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertexNormals ), gl.STATIC_DRAW );
            this.vertexNormalBuffer.itemSize = 3;
            this.vertexNormalBuffer.numItems = this.vertexNormals.length / 3;
            //Create index positions
            this.vertexIndexBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer );
            var vertexIndex = [
                //Front face
                2,3,0, 3,1,0,
                //Back face
                6,7,4, 7,5,4,
                //Top face
                10,11,8, 11,9,8,
                //Bottom face
                14,15,12, 15,13,12,
                //Left face
                18,19,16, 19,17,16,
                //Right face
                22,23,20, 23,21,20
            ];
            gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndex ), gl.STATIC_DRAW );
            this.vertexIndexBuffer.itemSize = 1;
            this.vertexIndexBuffer.numItems = vertexIndex.length;
            //Create color buffer
            this.vertexColorBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexColorBuffer );
            var colors = [];
            for( var i = 0; i < 24; i++ )
            {
                colors = colors.concat( [this.red, this.green, this.blue, 1.0] );
            }
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );
            this.vertexColorBuffer.itemSize = 4;
            this.vertexColorBuffer.numItems = colors.length/4;
        }
    }
    Rect.prototype = Object.create(Shape.prototype);
    Rect.prototype.constructor = Rect;
    return Rect;
});
