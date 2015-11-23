define(['gl-matrix-min'],function(glm)
{
    /**
    * Checks collision between a sphere and a rectangle
    * @param {OrientedBoundingBox} oBB
    * @param {BoundingSphere} sphere
    */
    return function( oBB, sphere )
    {

        //Find point P ( point on oBB closest to the center of the sphere )
        //Return p = [x,y,z]

        var minDist;
        var maxDist;
        var testDist;
        //Function to find the squared distance between two points
        function distSqr( pointA, pointB )
        {
            return Math.sqrt( Math.pow( pointB[0] - pointA[0], 2 ) + Math.pow( pointB[1] - pointA[1], 2 ) + Math.pow( pointB[2] - pointA[2], 2 ) );
        }
        
        //Find minimum distance between sphere center and all points of the oBB
        minDist = distSqr( sphere.center, [oBB.center[0]+oBB.halfWidth,oBB.center[1]+oBB.halfHeight,oBB.center[2]+oBB.halfDepth] );
        testDist = distSqr( sphere.center, [oBB.center[0]+oBB.halfWidth,oBB.center[1]+oBB.halfHeight,oBB.center[2]-oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;
        testDist = distSqr( sphere.center, [oBB.center[0]+oBB.halfWidth,oBB.center[1]-oBB.halfHeight,oBB.center[2]+oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;
        testDist = distSqr( sphere.center, [oBB.center[0]+oBB.halfWidth,oBB.center[1]-oBB.halfHeight,oBB.center[2]-oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;
        testDist = distSqr( sphere.center, [oBB.center[0]-oBB.halfWidth,oBB.center[1]+oBB.halfHeight,oBB.center[2]+oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;
        testDist = distSqr( sphere.center, [oBB.center[0]-oBB.halfWidth,oBB.center[1]+oBB.halfHeight,oBB.center[2]-oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;
        testDist = distSqr( sphere.center, [oBB.center[0]-oBB.halfWidth,oBB.center[1]-oBB.halfHeight,oBB.center[2]+oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;
        testDist = distSqr( sphere.center, [oBB.center[0]-oBB.halfWidth,oBB.center[1]-oBB.halfHeight,oBB.center[2]-oBB.halfDepth] );
        if( testDist < minDist )
            minDist = testDist;
        if( testDist > maxDist )
            maxDist = testDist;

        
        //Check if minDist is inside the sphere
        if( minDist > sphere.radius )
            return false;
        
        return true;
    }
});
