define(['CD/sphereOBBCollisionDetection','physics/handleCollision'],function(sphereOBBCD,handleCollision)
{
    return function( gl, dt, objects )
    {
        var collisionData;

		//Integrate all objects
        objects.forEach(function(object){
            if( object.active )
            {
                object.integrate( gl, dt );
            }
        });


        for( var i = 0; i < objects.length; i++ )
        {
            for( var j = i+1; j < objects.length; j++ )
            {
                collisionData = false;
                if( objects[i].type === 'sphere' && objects[j].type === 'rect' )
                {
                    collisionData = sphereOBBCD( objects[i].boundingBox, objects[j].boundingBox );
                }
                else if( objects[i].type === 'rect' && objects[j].type === 'sphere' )
                {
                    collisionData = sphereOBBCD( objects[j].boundingBox, objects[i].boundingBox );
                }

                handleCollision( gl, dt, collisionData[0], objects[i] );
                handleCollision( gl, dt, collisionData[0], objects[j] );
            }
        }
    }
});
