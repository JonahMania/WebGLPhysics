define(['shape/shape'], function(Shape)
{
    /**
    * A webGl sphere
    * @param {float} x The x position of the center of the sphere
    * @param {float} y The y position of the center of the sphere
    * @param {float} z The z position of the center of the sphere
    * @param {float} rad The radius of the sphere
    * @param {int} lat The number of latitude bands of the sphere
    * @param {int} long The number of longitude bands of the sphere
    * @param {int} r The red component of the color of the sphere
    * @param {int} g The green component of the color of the sphere
    * @param {int} b The blue component of the color of the sphere
    */
    var Sphere = function( x, y, z, rad, lat, long, r, g, b )
    {
        //Inherite objects from shape
        Shape.call(this,x,y,z,r,g,b);
        //The radius of the sphere
        this.radius = rad;
        //Initialize all buffers
        this.initBuffers = function( gl )
        {
            //Calculate vetices from rad, lat and long
            var vertexIndex = [];
            for( var latitude = 0; latitude <= lat; latitude++ )
            {
                //Calculate the sin and cos values of the latitude bands
                var theta = latitude * Math.PI / lat;
                var sinTheta = Math.sin( theta );
                var cosTheta = Math.cos( theta );
                for( var longitude = 0; longitude <= long; longitude++ )
                {
                    //Calculate the sin and cos values of the longitude bands
                    var phi = longitude * 2 * Math.PI / long;
                    var sinPhi = Math.sin( phi );
                    var cosPhi = Math.cos( phi );
                    //Collect vertex and normal data
                    var xCoord = cosPhi * sinTheta;
                    var yCoord = cosTheta;
                    var zCoord = sinPhi * sinTheta;
                    this.vertexNormals.push( xCoord );
                    this.vertexNormals.push( yCoord );
                    this.vertexNormals.push( zCoord );
                    this.vertices.push( this.xPos + xCoord * this.radius );
                    this.vertices.push( this.yPos + yCoord * this.radius );
                    this.vertices.push( this.zPos + zCoord * this.radius );

                    if( latitude !== lat  && longitude !== long )
                    {
                        //Calculate index positions
                        var top = (latitude * ( long + 1 )) + longitude;
                        var bottom = top + long + 1;
                        vertexIndex.push( bottom );
                        vertexIndex.push( bottom + 1 );
                        vertexIndex.push( top + 1 );
                        vertexIndex.push( bottom );
                        vertexIndex.push( top );
                        vertexIndex.push( top + 1 );

                    }
                }
            }
            //Create the position buffer
            this.vertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexPositionBuffer );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertices ), gl.STATIC_DRAW );
            this.vertexPositionBuffer.itemSize = 3;
            this.vertexPositionBuffer.numItems = this.vertices.length/3;
            //Create the vertex normal buffer
            this.vertexNormalBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexNormalBuffer );
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( this.vertexNormals ), gl.STATIC_DRAW );
            this.vertexNormalBuffer.itemSize = 3;
            this.vertexNormalBuffer.numItems = this.vertexNormals.length/3;
            //Create the index buffer
            this.vertexIndexBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer );
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndex ), gl.STATIC_DRAW );
            this.vertexIndexBuffer.itemSize = 1;
            this.vertexIndexBuffer.numItems = vertexIndex.length;
            //Create color buffer
            this.vertexColorBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexColorBuffer );
            var colors = [];
            for( var i = 0; i < lat*long*6; i++ )
            {
                colors = colors.concat( [this.red, this.green, this.blue, 1.0] );
            }
            //Set colors to the vertex color buffer
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );
            this.vertexColorBuffer.itemSize = 4;
            this.vertexColorBuffer.numItems = colors.length/4;
        }
    }
    Sphere.prototype = Object.create(Shape.prototype);
    Sphere.prototype.constructor = Sphere;
    return Sphere;
});
