define( function()
{
    /**
    *
    * @param { WebGLRenderingContext } gl The rendering context of the webGl program
    */
    return function( gl )
    {
        /**
        * Initializes a shader script
        * @param { WebGLRenderingContext } gl The rendering context of the webGl program
        * @param { ID } id The id of the shader we are going to initialize
        * @return { WebGlShader } The shader gathered from the given ID
        */
        var getShader = function( gl, id )
        {
            var shaderScript = document.getElementById( id );
            //Make sure the script was recieved
            if( !shaderScript )
            {
                return null;
            }
            //Collect shaders contents
            var contents = '';
            var k = shaderScript.firstChild;
            while( k )
            {
                if( k.nodeType = 3 )
                    contents += k.textContent;
                k = k.nextSibling;
            }
            //Create shader
            var shader;
            if( shaderScript.type == 'x-shader/x-fragment' )
                shader = gl.createShader( gl.FRAGMENT_SHADER );
            else if( shaderScript.type == 'x-shader/x-vertex' )
                shader = gl.createShader( gl.VERTEX_SHADER );
            else
                return null;

            gl.shaderSource( shader, contents );
            gl.compileShader( shader );

            return shader;
        }

        shaderProgram = gl.createProgram();
        //Attach shaders
        var vertexShader = getShader( gl, 'shader-vs' );
        var fragmentShader = getShader( gl, 'shader-fs' );
        gl.attachShader( shaderProgram, vertexShader );
        gl.attachShader( shaderProgram, fragmentShader );
        gl.linkProgram( shaderProgram );

        if( !gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
            alert( 'Error: could not initialize shaders' );

        //Attach shader attributes
        gl.useProgram(shaderProgram);
        //Vertex position attribute
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'vertexPosition');
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        //Vertex normal attribute
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'vertexNormal');
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
        //Vertex color attribute
        shaderProgram.vertexColorAttribute = gl.getAttribLocation( shaderProgram, 'vertexColor' );
        gl.enableVertexAttribArray( shaderProgram.vertexColorAttribute );
        //Set prospective matrix
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'pMatrix');
        //Set model view matrix
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'mvMatrix');
        //Set normal matrix
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'nMatrix');
        //Set point light ambient color
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'ambientColor');
        //Set point light location
        shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, 'pointLightingLocation');

        //Lighting
        gl.uniform3f(
            shaderProgram.ambientColorUniform,
            0.4, //Ambient red
            0.4, //Ambient green
            0.4  //Ambient blue
        );

        gl.uniform3f(
            shaderProgram.pointLightingLocationUniform,
            0, //Light x position
            6, //Light y position
            -7 //Light z position
        );

        return shaderProgram;
    }
});
