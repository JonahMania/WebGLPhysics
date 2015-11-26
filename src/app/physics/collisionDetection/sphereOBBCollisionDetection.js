define(['gl-matrix-min'],function(glm)
{
    /**
    * Checks collision between a sphere and a rectangle
    * @param {OrientedBoundingBox} oBB
    * @param {BoundingSphere} sphere
    */
    return function( oBB, sphere )
    {


       Array.prototype.max = function() {
            return Math.max.apply(null, this);
        };
        
        Array.prototype.min = function() {
            return Math.min.apply(null, this);
        };

        var center = sphere.center;
        var radius = sphere.radius;
        var dMin = 0;
        
        var points = [
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ],
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ]];
        
        
        
        for( var i = 0; i < 3; i++ )
        {
            var b = [ points[0][i], points[1][i], points[2][i], points[3][i],
                        points[4][i], points[5][i], points[6][i], points[7][i]];
            if( center[i] > b.max() )
            {
                dMin += Math.pow((center[i]- b.max()),2);
            }    
            else if( center[i] < b.min() )
            {
                dMin += Math.pow((center[i]-b.min()),2);
            }
        }
        

        if( dMin <= Math.pow(radius,2) )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
});
