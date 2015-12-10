define(['gl-matrix-min'],function(glm)
{
    /**
    * Checks collision between a sphere and a rectangle
    * @param {OrientedBoundingBox} oBB
    * @param {BoundingSphere} sphere
    */
    return function( sphere, oBB )
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
        var axis = [0,0,0];
        var direction = glm.vec3.create();

        var points = [
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ],
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] + oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] + oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] + oBB.halfDepth  ],
        [ oBB.center[0] - oBB.halfWidth, oBB.center[1] - oBB.halfHeight, oBB.center[2] - oBB.halfDepth  ]];

        // debugger
        for( var i = 0; i < 3; i++ )
        {
            var b = [ points[0][i], points[1][i], points[2][i], points[3][i],
                    points[4][i], points[5][i], points[6][i], points[7][i]];
            if( center[i] > b.max() )
            {
                axis[i] = 1;
                dMin += Math.pow((center[i]- b.max()),2);
            }
            else if( center[i] < b.min() )
            {
                axis[i] = 1;
                dMin += Math.pow((center[i]-b.min()),2);
            }
        }

        if( dMin <= Math.pow(radius,2) )
        {

            var half = [oBB.halfWidth,oBB.halfHeight,oBB.halfDepth];
            axis.forEach( function( dir, index )
            {
                if( dir )
                {
                    if( center[index] > oBB.center[index] + half[index] )
                        direction[index] = 1;
                    else
                        direction[index] = -1;
                }
            });

            return [
                direction,
                false
            ];
        }
        else
        {

            return false;
        }
    }
});
