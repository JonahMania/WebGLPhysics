define([],function()
{
    //Creates and returns a rotation matrix
    return function( x, y, z )
    {
        return [
            Math.cos(y)*Math.cos(z),
            -Math.cos(x)*Math.sin(z)+Math.sin(x)*Math.sin(y)*Math.cos(z),
            Math.sin(x)*Math.sin(z)+Math.cos(x)*Math.sin(y)*Math.cos(z),
            Math.cos(y)*Math.sin(z),
            Math.cos(x)*Math.cos(z)+Math.sin(x)*Math.sin(y)*Math.sin(z),
            -Math.sin(x)*Math.cos(z)+Math.cos(x)*Math.sin(y)*Math.sin(z),
            -Math.sin(y),
            Math.sin(x)*Math.cos(y),
            Math.cos(x)*Math.cos(y)
        ];
    }
});
