define( function()
{
    // Initialize web gl rendering context
    return function( canvas )
    {
        var gl = canvas.getContext( 'experimental-webgl' );
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        return gl;
    }
});
