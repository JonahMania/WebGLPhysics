define(['gl-matrix-min'],function(glm)
{
    /**
    * Checks collision between a sphere and a rectangle
    * @param {OrientedBoundingBox} oBB
    * @param {sphere} sphere
    */
    return function( sphere, oBB )
    {
        var center = glm.vec3.create();
        glm.vec3.add(center,sphere.boundingBox.center,sphere.direction);
        var dMin = 0;
        var half = [ oBB.halfWidth,oBB.halfHeight,oBB.halfDepth ];

        //Find closest point on rect to sphere center
        for( var i = 0; i < 3; i++ )
        {
            if( center[i] > oBB.center[i] + half[i] )
            {
                dMin += Math.pow( ( center[i] - (oBB.center[i] + half[i]) ), 2 );
            }
            if( center[i] < oBB.center[i] - half[i]  )
            {
                dMin += Math.pow( ( center[i] - (oBB.center[i] - half[i]) ), 2 );
            }
        }
        //If closet point is closer then sphere radius squared return true;
        return dMin <= Math.pow(sphere.boundingBox.radius,2);

    }
});
