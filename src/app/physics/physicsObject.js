define(['gl-matrix-min'],function(glm){
	var PhysicsObject = function( m, a )
	{
		
		// this.velocity[0] = 0;
		// this.velocity[1] = 0;
		// this.zVelocity = -0.04;	
		// this.acceleration[0] = 0;

		this.velocity = glm.vec3.create();
		this.acceleration = glm.vec3.create();
		
        //Gravity 
        this.acceleration[1] = -9.81; 
		// this.zAcceleration = 0;
		this.bounce = -0.6;
		this.mass = m;
		this.active = a;
	}
	
	PhysicsObject.prototype.update = function( dt, gl, collisionData )
	{
		if( this.active )
		{
			var dx = 0;
			var dy = 0;
			var dz = 0;
			dt /= 60;
			// if( collisionData.collision )
			// {
			// 	if( collisionData["-y"] )
			// 	{
			// 		//d = vi * t + 1/2 * a * t^2
			// 		dx = this.velocity[0] + dt * ( 0.5 * this.acceleration[0] * dt * dt );
			// 		dy = -this.velocity[1] + dt * ( 0.5 * this.acceleration[1] * dt * dt );
			// 		dz = this.zVelocity + dt * ( 0.5 * this.zAcceleration * dt * dt );
		
			// 		if( this.velocity[1] > -0.015 )
			// 			this.velocity[1] = 0;
		
			// 		this.velocity[1] *= this.bounce;
			// 	}
			// 	if( collisionData["-z"] )
			// 	{
					
			// 	}
			// }
			// else
			// {				
			// 	//d = vi * t + 1/2 * a * t^2
			// 	dx = this.velocity[0] + dt * ( 0.5 * this.acceleration[0] * dt * dt );
			// 	dy = this.velocity[1] + dt * ( 0.5 * this.acceleration[1] * dt * dt );
			// 	dz = this.zVelocity + dt * ( 0.5 * this.zAcceleration * dt * dt );
			// 	//vf = vi + a * dt
			// 	this.velocity[1] = this.velocity[1] + this.acceleration[1] * dt;
			// }
			
			if( collisionData['-y'] )
			{
				//d = vi * t + 1/2 * a * t^2
				dy = -this.velocity[1] + dt * ( 0.5 * this.acceleration[1] * dt * dt );
	
				if( this.velocity[1] > -0.015 )
					this.velocity[1] = 0;
	
				this.velocity[1] *= this.bounce;
			}
			else
			{
				//d = vi * t + 1/2 * a * t^2
				dy = this.velocity[1] + dt * ( 0.5 * this.acceleration[1] * dt * dt );
				//vf = vi + a * dt
				this.velocity[1] = this.velocity[1] + this.acceleration[1] * dt;
			}
			
			// if( collisionData['-z'] )
			// {
			// 	console.log('hit');
			// 	this.zVelocity *= -1;
			// 	dz = this.zVelocity + dt * ( 0.5 * this.zAcceleration * dt * dt );
			// }
			// else
			// {
			// 	//d = vi * t + 1/2 * a * t^2
			// 	dz = this.zVelocity + dt * ( 0.5 * this.zAcceleration * dt * dt );
			// }
			
			//d = vi * t + 1/2 * a * t^2
			dx = this.velocity[0] + dt * ( 0.5 * this.acceleration[0] * dt * dt );

			this.translate( gl, dx, dy, dz );
		}
	}
	
	return PhysicsObject;
});