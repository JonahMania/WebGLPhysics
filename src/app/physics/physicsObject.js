define(['gl-matrix-min'],function(glm){
	var PhysicsObject = function( m, a )
	{

		this.velocity = glm.vec3.create();
		this.acceleration = glm.vec3.create();
        //Gravity 
        this.acceleration[1] = -9.81; 
		this.bounce = -0.6;
		this.mass = m;
		this.active = a;
	}
	//Move the object by give a time step
	PhysicsObject.prototype.integrate = function( gl, dt )
	{
		//vf = vi + a * dt
		this.velocity[0] += this.acceleration[0] * dt;
		this.velocity[1] += this.acceleration[1] * dt;
		this.velocity[2] += this.acceleration[2] * dt;
		
		//d = vi * t + 1/2 * a * t^2
		var dx = this.velocity[0] + dt * ( 0.5 * this.acceleration[0] * dt * dt );
		var dy = this.velocity[1] + dt * ( 0.5 * this.acceleration[1] * dt * dt );
		var dz = this.velocity[2] + dt * ( 0.5 * this.acceleration[2] * dt * dt );
		
		//Translate object
		this.translate( gl, dx, dy, dz );
	}
	
	return PhysicsObject;
});