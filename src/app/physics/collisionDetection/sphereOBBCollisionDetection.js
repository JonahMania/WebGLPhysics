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
        var axis;
        
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
                axis = -i
                dMin += Math.pow((center[i]- b.max()),2);
            }    
            else if( center[i] < b.min() )
            {
                axis = i;
                dMin += Math.pow((center[i]-b.min()),2);
            }
        }
        
        if( dMin <= Math.pow(radius,2) )
        {

            //Get the boxes normal
            var direction = glm.vec3.create();

            if( axis < 0 )
            {
                axis = Math.abs( axis );
                direction[0] = oBB.rotation[axis*3] ? -oBB.rotation[axis*3] : 1;
                direction[1] = oBB.rotation[axis*3+1] ? -oBB.rotation[axis*3+1] : 1;
                direction[2] = oBB.rotation[axis*3+2] ? -oBB.rotation[axis*3+2] : 1;
            }
            else
            {
                direction[0] = oBB.rotation[axis*3] ? oBB.rotation[axis*3] : 1;
                direction[1] = oBB.rotation[axis*3+1] ? oBB.rotation[axis*3+1] : 1;
                direction[2] = oBB.rotation[axis*3+2] ? oBB.rotation[axis*3+2] : 1;
            }

            //Return the planes normal
            // glm.vec3.normalize( direction, direction );

            return direction;
        }
        else
        {
            
            return false;
        }
    }
});
