define(['gl-matrix-min'],function(glm){
    function mat3Row( mat3, row )
    {
        return glm.vec3.fromValues(mat3[row*3],mat3[row*3+1],mat3[row*3+2]);
    }
    function mat3Col( mat3, col )
    {
        return glm.vec3.fromValues(mat3[col],mat3[col+3],mat3[col+6]);
    }
    return {
        mat3Row:mat3Row,
        mat3Col:mat3Col
    };
});
