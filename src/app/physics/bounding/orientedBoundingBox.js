define(['bounding/boundingObject','gl-matrix-min','util/rotationMatrix'],function(BoundingObject,glm,RotationMatrix)
{
    var OrientedBoundingBox = function( x, y, z, w, h, d )
    {
        //Inherite objects from physicsObject
        BoundingObject.call(this,x,y,z);
        this.halfWidth = w/2;
        this.halfHeight = h/2;
        this.halfDepth = d/2;
        //Rotation of the rectangle
        this.rotation = glm.mat3.create();
        this.rotate = function( xOffset, yOffset, zOffset )
        {
            var rot = new RotationMatrix(xOffset,yOffset,zOffset);
            //Rotate the bounding box rotation matrix
            glm.mat3.mul(this.rotation, this.rotation, rot );

        }
    }
    OrientedBoundingBox.prototype = Object.create(BoundingObject.prototype);
    OrientedBoundingBox.prototype.constructor = OrientedBoundingBox;
    return OrientedBoundingBox;
});
