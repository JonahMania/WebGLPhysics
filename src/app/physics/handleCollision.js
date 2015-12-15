define(['gl-matrix-min'],function(glm){
    return function( gl, dt, collisionData, object )
    {
        if( collisionData && object.active )
        {

            //Move object back to move the object out of collision
            object.translate( gl, collisionData.direction[0],
                collisionData.direction[1], collisionData.direction[2] );

            collisionData.direction.forEach( function( axis, index )
            {
                if(  ( object.velocity[index] <= 0 && axis <= 0 ) ||
                     ( object.velocity[index] >= 0 && axis >= 0 ) )
                    collisionData.direction[index] = 1;
                else
                    collisionData.direction[index] = -1 * object.bounce;

            });
            //Multiply the objects velocity by the collision data normal
            glm.vec3.mul(object.velocity,object.velocity,collisionData.direction);
            // object.integrate( gl, dt );

        }
    }
});
