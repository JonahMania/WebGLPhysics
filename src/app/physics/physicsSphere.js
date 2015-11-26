define(['physics/physicsObject',
		'shape/sphere',
		'bounding/boundingSphere'],
function(PhysicsObject,Sphere,BoundingSphere)
{
	var PhysicsSphere = function( x, y, z, rad, lat, long, r, g, b, m, a )
	{
		PhysicsObject.call( this, m, a );
		this.renderer = new Sphere( x, y, z, rad, lat, long, r, g, b );
		this.boundingBox = new BoundingSphere( x, y, z, rad );	
        
        this.translate = function( gl, xOffset, yOffset, zOffset ) 
        {
            this.renderer.translate( gl, xOffset, yOffset, zOffset );
            this.boundingBox.translate( xOffset, yOffset, zOffset );
        }
	}
	

    
	PhysicsSphere.prototype = Object.create( PhysicsObject.prototype );
	PhysicsSphere.prototype.constructor = PhysicsSphere;
	return PhysicsSphere;
});