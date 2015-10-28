define( [
    'shape/rect',
    'shape/sphere',
    'physics/orientedBoundingBox',
    'physics/boundingSphere'],
     function( Rect, Sphere, OrientedBoundingBox, BoundingSphere )
    {
        //Factory method to create cubes, rectangles and spheres
        var factory = function()
        {
            this.createRect = function( x, y, z, w, h, d, r, g, b )
            {
                return new Rect( x, y, z, w, h, d, r, g, b );
            }
            this.createCube = function( x, y, z, w, r, g, b )
            {
                return new Rect( x, y, z, w, w, w, r, g, b );
            }
            this.createSphere = function( x, y, z, rad, lat, long, r, g, b )
            {
                return new Sphere( x, y, z, rad, lat, long, r, g, b );
            }
            this.createRectOBB = function( x, y, z, w, h, d )
            {
                return new OrientedBoundingBox( x, y, z, w, h, d );
            }
            this.createCubeOBB = function( x, y, z, w )
            {
                return new OrientedBoundingBox( x, y, z, w, w, w );
            }
            this.createBoundingSphere = function( x, y, z, r, m )
            {
                return new BoundingSphere( x, y, z, r );
            }
        }

        return factory;
    });
