define(['physics/physicsObject',
		'shape/rect',
		'bounding/orientedBoundingBox'],
function(PhysicsObject,Rect,OrientedBoundingBox)
{
	var PhysicsRect = function( x, y, z, w, h, d, r, g, b, m, a )
	{
		PhysicsObject.call( this, m, a );
		this.renderer = new Rect( x, y, z, w, h, d, r, g, b );
		this.boundingBox = new OrientedBoundingBox( x, y, z, w, h, d );

        this.translate = function( gl, xOffset, yOffset, zOffset ) 
        {
            this.renderer.translate( gl, xOffset, yOffset, zOffset );
            this.boundingBox.translate( xOffset, yOffset, zOffset );
        }	
	}
	
	PhysicsRect.prototype = Object.create( PhysicsObject.prototype );
	PhysicsRect.prototype.constructor = PhysicsRect;
	return PhysicsRect;
});