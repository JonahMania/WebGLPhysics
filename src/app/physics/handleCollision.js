define(['gl-matrix-min'],function(glm){
    return function( gl, dt, collisionData, object )
    {
        if( collisionData && object.active )
        {
            //Move object back to move the object out of collision
            object.unIntegrate(gl,dt);
            collisionData.forEach( function( axis, index )
            {
                if( object.velocity[index] <= 0 && axis <= 0 )
                    collisionData[index] = 1;
                else if( object.velocity[index] >= 0 && axis >= 0 )
                    collisionData[index] = 1;
                else
                    collisionData[index] = -1 * object.bounce;
            });
            //Multiply the objects velocity by the collision data normal
            glm.vec3.mul(object.velocity,object.velocity,collisionData);
            object.integrate( gl, dt );
        }
    }
});
