define(['gl-matrix-min','CD/sphereOBBCollisionDetection'],function(glm,sphereOBBCD)
{
    return function( gl, dt, objects )
    {
		//Integrate all objects
        objects.forEach(function(object){
            if( object.active )
            {
                object.integrate( gl, dt );
            }
        });

        var collisionData;
        for( var i = 0; i < objects.length; i++ )
        {
            for( var j = i+1; j < objects.length; j++ )
            {
                if( objects[i].type === 'sphere' && objects[j].type === 'rect' )
                {
                    collisionData = sphereOBBCD( objects[i].boundingBox, objects[j].boundingBox );
                    if( collisionData )
                    {
                        //Move object back to move the object out of collision
                        objects[i].unIntegrate(gl,dt);

                        collisionData.forEach( function( axis, index )
                        {
                            if( objects[i].velocity[index] <= 0 && axis <= 0 )
                                collisionData[index] = 1;
                            else if( objects[i].velocity[index] >= 0 && axis >= 0 )
                                collisionData[index] = 1;
                            else
                                collisionData[index] = -1 * objects[i].bounce;
                        });
                        //Multiply the objects velocity by the collision data normal
                        glm.vec3.mul(objects[i].velocity,objects[i].velocity,collisionData);
						objects[i].integrate( gl, dt );
                    }
                }
            }
        }
    }
});
