define(['gl-matrix-min'],function(glm)
{
    /**
    * Checks collision between two bounding spheres
    * @param {BoundingSphere} sphereA
    * @param {BoundingSphere} sphereB
    */
    return function( sphereA, sphereB )
    {
        //Distance between sphere centers
        var dist = Math.sqrt(
            Math.pow( sphereA.center[0] - sphereB.center[0], 2 ) +
            Math.pow( sphereA.center[1] - sphereB.center[1], 2 ) +
            Math.pow( sphereA.center[2] - sphereB.center[2], 2 ) );
        //If dist is less then the sum of both radii then there is collision
        return dist < ( sphereA.radius + sphereB.radius );
    }
});
