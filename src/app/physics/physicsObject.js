define([],function(){
	var PhysicsObject = function( m, a )
	{
		
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.zVelocity = 0;	
		this.xAcceleration = 0;
		this.yAcceleration = 0;
		this.zAcceleration = 0;
		this.bounce = -0.6;
		this.mass = m;
		this.active = a;
		
	}
	
	PhysicsObject.prototype.update = function( dt, gl, collisionData )
	{
		if( this.active )
		{
			var dy = 0;
			
			if( collisionData )
			{
                // console.log( this.yVelocity );
				dy = -this.yVelocity + dt * ( 0.5 * this.yAcceleration * dt * dt );
                //Temp fix
                if( this.yVelocity > -1 )
                    this.yVelocity = 0;
                //End temp fix
				this.yVelocity *= this.bounce;
                
			}
			else
			{				
				//d = vi * t + 1/2 * a * t^2
				dy = this.yVelocity + dt * ( 0.5 * this.yAcceleration * dt * dt );
				//Gravity 
				this.yAcceleration = -9.81; 
				//vf = vi + a * dt
				this.yVelocity = this.yVelocity + this.yAcceleration * dt;
			}

			//Slow down tanslation should be changed to make better calculation			
			dy /= 60 ;
			this.translate( gl, 0.0, dy, 0.0 );
		}
	}
	
	return PhysicsObject;
});