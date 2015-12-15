define(['gl-matrix-min'],function(glm)
{
    return function( gl, dt, sphere, rect )
    {

        var diff = [0,0,0];
        var half = [ rect.boundingBox.halfWidth,rect.boundingBox.halfHeight,rect.boundingBox.halfDepth ];
        for( var i = 0; i < 3; i++ )
        {
            if( sphere.boundingBox.center[i] + sphere.direction[i] > rect.boundingBox.center[i] + half[i] && sphere.direction[i] < 0 )
            {
                sphere.direction[i] = (rect.boundingBox.center[i]+half[i]) - (sphere.boundingBox.center[i] - sphere.boundingBox.radius);
                sphere.velocity[i] *= (-1 * sphere.bounce);
            }
            else if( sphere.boundingBox.center[i] + sphere.direction[i] < rect.boundingBox.center[i] - half[i] && sphere.direction[i] > 0 )
            {
                sphere.direction[i] = (rect.boundingBox.center[i]-half[i]) - (sphere.boundingBox.center[i] + sphere.boundingBox.radius);
                sphere.velocity[i] *= (-1 * sphere.bounce);
            }

        }
    }
});
