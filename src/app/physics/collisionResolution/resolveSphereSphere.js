define(['gl-matrix-min'],function(glm)
{
    return function( gl, sphereA, sphereB, distance )
    {
        //Scale the distance of the spheres so they move out of collision
        glm.vec3.scale( sphereA.direction, sphereA.direction, distance );
        glm.vec3.scale( sphereB.direction, sphereB.direction, distance );
    }
});
