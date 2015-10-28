define(['init/setMatrices','gl-matrix-min','util/rotationMatrix'],function(setMatrices,glm,rotationMatrix)
{
    /**
    * A prototype for gl shapes
    * @param {float} x The x position of the center of the shape
    * @param {float} y The y position of the center of the shape
    * @param {float} z The z position of the center of the shape
    * @param {int} r The red component of the color of the shape
    * @param {int} g The green component of the color of the shape
    * @param {int} b The blue component of the color of the shape
    */
    var Shape = function( x, y, z, r, g, b )
    {
        //Buffer to hold vertex data
        this.vertexPositionBuffer;
        //Buffer to hold the shape normals
        this.vertexNormalBuffer;
        //Buffer to hold color data
        this.vertexColorBuffer;
        //Buffer to hold index data
        this.vertexIndexBuffer;
        this.vertices = [];
        this.vertexNormals = [];
        this.red = r;
        this.green = g;
        this.blue = b;
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
    }
    /**
    * Renders the shape
    */
    Shape.prototype.draw = function( gl, pMatrix, mvMatrix )
    {
        //Vertex position
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexPositionBuffer );
        gl.vertexAttribPointer( shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0 );
        //Lighting
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer );
        gl.vertexAttribPointer( shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        //Color buffers
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexColorBuffer );
        gl.vertexAttribPointer( shaderProgram.vertexColorAttribute, this.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0 );
        //Draw rectangle
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer );
        setMatrices( gl, pMatrix, mvMatrix );
        gl.drawElements( gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0 );
    }
    /*
    * Moves the shape by a given offset
    */
    Shape.prototype.translate = function( gl, xOffset, yOffset, zOffset )
    {
        //Update the shape center
        this.xPos += xOffset;
        this.yPos += yOffset;
        this.zPos += zOffset;
        //Translate all the vertices by each offset
        for( var i = 0; i < this.vertices.length; i += 3 )
        {
            this.vertices[i] += xOffset;
            this.vertices[i+1] += yOffset;
            this.vertices[i+2] += zOffset;
        }
        //Bind new vertices to the vertex position buffer
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexPositionBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW );
    }
    /*
    * Rotate the shape a given number of degrees
    */
    Shape.prototype.rotate = function( gl, x, y, z )
    {
        var xPos = this.xPos;
        var yPos = this.yPos;
        var zPos = this.zPos;
        this.translate( gl, -this.xPos, -this.yPos, -this.zPos  );
        var rotation = rotationMatrix( x * (Math.PI/180), y * (Math.PI/180), z * (Math.PI/180) );
        for( var i = 0; i < this.vertices.length; i+=3 )
        {
            var vertTemp = [];
            var normTemp = [];
            glm.vec3.transformMat3(vertTemp,[
                this.vertices[i],
                this.vertices[i+1],
                this.vertices[i+2]
            ],rotation);
            glm.vec3.transformMat3(normTemp,[
                this.vertexNormals[i],
                this.vertexNormals[i+1],
                this.vertexNormals[i+2]
            ],rotation);
            this.vertices[i] = vertTemp[0];
            this.vertices[i+1] = vertTemp[1];
            this.vertices[i+2] = vertTemp[2];
            this.vertexNormals[i] = normTemp[0];
            this.vertexNormals[i+1] = normTemp[1];
            this.vertexNormals[i+2] = normTemp[2];
        }
        this.translate( gl, xPos, yPos, zPos  );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexPositionBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertices ), gl.STATIC_DRAW );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexNormalBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertexNormals ), gl.STATIC_DRAW );
    }
    /**
    * Set a new color to the shape
    */
    Shape.prototype.color = function( gl, r, g, b )
    {
        this.red = r;
        this.green = g;
        this.blue = b;
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexColorBuffer );
        var colors = [];
        for( var i = 0; i < this.vertices.length / 3; i++ )
        {
            colors = colors.concat( [this.red, this.green, this.blue, 1.0] );
        }
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );
    }
    return Shape;
});
