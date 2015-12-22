define(['gl-matrix-min'],function(glm)
{
    return function( gl, sphereA, sphereB, distance )
    {
        //Scale the direction of both spheres so they avoid collision
        glm.vec3.scale( sphereA.direction, sphereA.direction, distance );
        glm.vec3.scale( sphereB.direction, sphereB.direction, distance );

        // vAf = ( vAi * ( mA - mB ) + 2 * mB * vBi ) / ( mA + mB )
        var velA = glm.vec3.create();
        var tempA = glm.vec3.create();
        glm.vec3.scale( velA, sphereA.velocity, ( sphereA.mass - sphereB.mass ) );
        glm.vec3.scale( tempA, sphereB.velocity, ( 2 * sphereB.mass ) );
        glm.vec3.add( velA, velA, tempA );
        glm.vec3.scale( velA, velA, 1/( sphereA.mass + sphereB.mass ) );

        // vBf = ( vBi * ( mB - mA ) + 2 * mA * vAi ) / ( mA + mB )
        var velB = glm.vec3.create();
        var tempB = glm.vec3.create();
        glm.vec3.scale( velB, sphereB.velocity, ( sphereB.mass - sphereA.mass ) );
        glm.vec3.scale( tempB, sphereA.velocity, ( 2 * sphereA.mass ) );
        glm.vec3.add( velB, velB, tempB );
        glm.vec3.scale( velB, velB, 1/( sphereA.mass + sphereB.mass ) );

        sphereA.velocity = velA;
        sphereB.velocity = velB;
    }
});
