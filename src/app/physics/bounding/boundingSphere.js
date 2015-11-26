define(['bounding/boundingObject','gl-matrix-min'],function(BoundingObject,glm)
{
    var BoundingSphere = function( x, y, z, r )
    {
        //Inherite objects from physicsObject
        BoundingObject.call(this,x,y,z);
        this.radius = r;
    }
    BoundingSphere.prototype = Object.create(BoundingObject.prototype);
    BoundingSphere.prototype.constructor = BoundingSphere;
    return BoundingSphere;
});
