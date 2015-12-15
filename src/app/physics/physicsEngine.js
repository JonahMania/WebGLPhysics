define(['CD/sphereOBBCollisionDetection',
    'CD/sphereSphereCollisionDetection',
    'CR/resolveSphereRect',
    'CR/resolveSphereSphere'],
    function(sphereOBBCD,
        sphereSphereCD,
        sphereRectCR,
        sphereSphereCR )
{
    return function( gl, dt, objects )
    {

        //Integrate all objects
        objects.forEach(function(object){
            if( object.active )
            {
                object.integrate( dt );
            }
        });

        for( var i = 0; i < objects.length; i++ )
        {
            for( var j = i+1; j < objects.length; j++ )
            {
                if( objects[i].type === 'sphere' && objects[j].type === 'rect' )
                {
                    if( sphereOBBCD( objects[i], objects[j].boundingBox ) )
                        sphereRectCR( gl, dt, objects[i], objects[j] );
                }
                else if( objects[i].type === 'rect' && objects[j].type === 'sphere' )
                {
                    if( sphereOBBCD( objects[j], objects[i].boundingBox ) )
                        sphereRectCR( gl, dt, objects[j], objects[i] );
                }
                else if( objects[i].type === 'sphere' && objects[j].type === 'sphere' )
                {
                    var distance = sphereSphereCD( objects[i], objects[j] );
                    if( distance )
                        sphereSphereCR( gl, objects[i], objects[j], distance );
                }


            }
        }

        //Translate all objects
        objects.forEach(function(object){
            if( object.active )
            {
                object.translate( gl, object.direction[0], object.direction[1], object.direction[2] );
            }
        });
    }
});
