define(['gl-matrix-min'], function(glm)
{
    /**
    *
    */
    var BoundingObject = function( x, y, z )
    {
        this.center = glm.vec3.fromValues(x,y,z);
    }

    BoundingObject.prototype.translate = function( xOffset, yOffset, zOffset )
    {
        this.center[0] += xOffset;
        this.center[1] += yOffset;
        this.center[2] += zOffset;
    }

    return BoundingObject;
});
