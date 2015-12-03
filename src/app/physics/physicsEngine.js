define(['CD/sphereOBBCollisionDetection'],function(sphereOBBCD)
{
	return function( gl, dt, objects )
	{

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
						//TODO Temporary fix to move sphere once collision hits on the y axis
						objects[i].translate(gl,0,-objects[i].velocity[1] + dt * ( 0.5 * objects[i].acceleration[1] * dt * dt ),0);
						objects[i].velocity[1] *= objects[i].bounce;
					}
				}
			}
		}

		//Integrate all objects
		objects.forEach(function(object){
			if( object.active )
			{
				object.integrate( gl, dt );
			}
		});
	}
});