define(['physics/boundingObject','gl-matrix-min'],function(BoundingObject,glm)
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
            var rot = [
            Math.cos(yOffset)*Math.cos(zOffset),
            -Math.cos(xOffset)*Math.sin(zOffset)+Math.sin(xOffset)*Math.sin(yOffset)*Math.cos(zOffset),
            Math.sin(xOffset)*Math.sin(zOffset)+Math.cos(xOffset)*Math.sin(yOffset)*Math.cos(zOffset),
            Math.cos(yOffset)*Math.sin(zOffset),
            Math.cos(xOffset)*Math.cos(zOffset)+Math.sin(xOffset)*Math.sin(yOffset)*Math.sin(zOffset),
            -Math.sin(xOffset)*Math.cos(zOffset)+Math.cos(xOffset)*Math.sin(yOffset)*Math.sin(zOffset),
            -Math.sin(yOffset),
            Math.sin(xOffset)*Math.cos(yOffset),
            Math.cos(xOffset)*Math.cos(yOffset)
            ];
            //Rotate the bounding box rotation matrix
            glm.mat3.mul(this.rotation, this.rotation, rot );
        }
    }
    OrientedBoundingBox.prototype = Object.create(BoundingObject.prototype);
    OrientedBoundingBox.prototype.constructor = OrientedBoundingBox;
    return OrientedBoundingBox;
});
