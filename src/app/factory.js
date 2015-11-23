define( [
    'physics/physicsRect',
    'physics/physicsSphere'],
     function( PhysicsRect, PhysicsSphere )
    {
        //Factory method to create cubes, rectangles and spheres
        var factory = function()
        {
            this.createRect = function( x, y, z, w, h, d, r, g, b, m, a )
            {
                return new PhysicsRect( x, y, z, w, h, d, r, g, b, m, a );
            }
            this.createCube = function( x, y, z, w, r, g, b, m, a )
            {
                return new PhysicsRect( x, y, z, w, w, w, r, g, b, m, a );
            }
            this.createSphere = function( x, y, z, rad, lat, long, r, g, b, m, a )
            {
                return new PhysicsSphere( x, y, z, rad, lat, long, r, g, b, m, a );
            }
        }

        return factory;
    });
