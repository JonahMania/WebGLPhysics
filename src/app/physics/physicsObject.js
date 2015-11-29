define([],function(){
	var PhysicsObject = function( m, a )
	{
		
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.zVelocity = -0.01;	
		this.xAcceleration = 0;
        //Gravity 
        this.yAcceleration = -9.81; 
		this.zAcceleration = 0;
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
			
			if( collisionData )
			{
				//d = vi * t + 1/2 * a * t^2
				dx = this.xVelocity + dt * ( 0.5 * this.xAcceleration * dt * dt );
				dy = -this.yVelocity + dt * ( 0.5 * this.yAcceleration * dt * dt );
				dz = this.zVelocity + dt * ( 0.5 * this.zAcceleration * dt * dt );

                if( this.yVelocity > -0.015 )
                    this.yVelocity = 0;

				this.yVelocity *= this.bounce;
			}
			else
			{				
				//d = vi * t + 1/2 * a * t^2
				dx = this.xVelocity + dt * ( 0.5 * this.xAcceleration * dt * dt );
				dy = this.yVelocity + dt * ( 0.5 * this.yAcceleration * dt * dt );
				dz = this.zVelocity + dt * ( 0.5 * this.zAcceleration * dt * dt );
				//vf = vi + a * dt
				this.yVelocity = this.yVelocity + this.yAcceleration * dt;
			}

			this.translate( gl, dx, dy, dz );
		}
	}
	
	return PhysicsObject;
});