define(['physics/physicsObject',
		'shape/sphere',
		'physics/boundingSphere'],
function(PhysicsObject,Sphere,BoundingSphere)
{
	var PhysicsSphere = function( x, y, z, rad, lat, long, r, g, b, m, a )
	{
		PhysicsObject.call( this, m, a );
		this.renderer = new Sphere( x, y, z, rad, lat, long, r, g, b );
		this.boundingBox = new BoundingSphere( x, y, z, rad );	
	}
	
	PhysicsSphere.prototype = Object.create( PhysicsObject.prototype );
	PhysicsSphere.prototype.constructor = PhysicsSphere;
	return PhysicsSphere;
});