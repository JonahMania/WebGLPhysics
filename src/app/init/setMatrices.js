define([ 'gl-matrix-min' ],function( glm )
{
    /**
    * Sets values of prospective matrix, model view matrix and normal matrix
    * @param { WebGLRenderingContext } gl The rendering context of the webGl program
    * @param { mat4 } pMatrix prospective matrix
    * @param { mat4 } mvMatrix model view matrix
    */
    return function( gl, pMatrix, mvMatrix )
    {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        //Lighting normal matrix
        var nMatrix = glm.mat3.create();
        glm.mat3.normalFromMat4( nMatrix, mvMatrix );
        gl.uniformMatrix3fv( shaderProgram.nMatrixUniform, false, nMatrix );
    }
});
