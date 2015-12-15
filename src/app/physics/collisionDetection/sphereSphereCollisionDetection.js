define(['gl-matrix-min'],function(glm)
{
    /**
    * Checks collision between two bounding spheres
    * @param {sphere} sphereA
    * @param {sphere} sphereB
    */
    return function( sphereA, sphereB )
    {

        var movement = glm.vec3.create();
        glm.vec3.sub( movement, sphereA.direction, sphereB.direction );

        var sumRadii = sphereA.boundingBox.radius + sphereB.boundingBox.radius;

        //Vector to represent space between both spheres centers
        var delta = glm.vec3.create();
        glm.vec3.sub( delta, sphereB.boundingBox.center, sphereA.boundingBox.center);
        //Normalize sphereA direction vector
        var nDir = glm.vec3.create();
        glm.vec3.normalize( nDir, movement );

        var d = glm.vec3.dot( nDir, delta );
        //Early escape if sphereA is not moving towards sphereB there will be no collison
        if( d <= 0 )
        {
            return false;
        }
        //Get length of delta
        var lengthDelta = glm.vec3.length( delta );

        //Calculate the length from the center of B to the closest point on d
        var f = (lengthDelta*lengthDelta) - ( d * d );

        var sumRadiiSq = sumRadii * sumRadii;
        //Early escape
        if( f >= sumRadiiSq )
        {
            return false;
        }

        var t = sumRadiiSq - f;
        //Early escape
        if( t < 0 )
        {
            return false;
        }

        var distance = d - Math.sqrt(t);

        var mag = Math.sqrt( movement[0] * movement[0] +
            movement[1] * movement[1] +
            movement[2] * movement[2] );

        if( mag < distance )
        {
            return false;
        }
        // debugger

        //If collision is detected return the fraction of distance between the two spheres
        return ( distance/glm.vec3.length(movement) );
    }

});
