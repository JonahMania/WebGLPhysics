define(['gl-matrix-min', 'util/matrixUtils'],function(glm,mUtils)
{
    /**
    * Checks collision between two oriented bounding boxes
    * @param {OrientedBoundingBox} oBBA
    * @param {OrientedBoundingBox} oBBB
    */
    return function( oBBA, oBBB )
    {
        var r1;
        var r2;
        var translation = glm.vec3.create();
        var rot = new glm.mat3.create();
        var absRot = new glm.mat3.create();
        glm.vec3.sub(translation,oBBB.center,oBBA.center);

        translation = glm.vec3.fromValues(
            glm.vec3.dot( translation, mUtils.mat3Row(oBBA.rotation,0) ),
            glm.vec3.dot( translation, mUtils.mat3Row(oBBA.rotation,1) ),
            glm.vec3.dot( translation, mUtils.mat3Row(oBBA.rotation,2) )
        );

        for( var i = 0; i < 3; i++ )
        {
            rot[i*3] = glm.vec3.dot(mUtils.mat3Row(oBBA.rotation,i),mUtils.mat3Row(oBBB.rotation,0));
            rot[i*3+1] = glm.vec3.dot(mUtils.mat3Row(oBBA.rotation,i),mUtils.mat3Row(oBBB.rotation,1));
            rot[i*3+2] = glm.vec3.dot(mUtils.mat3Row(oBBA.rotation,i),mUtils.mat3Row(oBBB.rotation,2));
        }

        for( var i = 0; i < 9; i++ )
        {
            absRot[i] = Math.abs(rot[i]);// + 0.000049;
        }

        //Test axis
        //Axis L = A0
        r1 = oBBA.halfWidth;
        r2 = oBBB.halfWidth * absRot[0] + oBBB.halfHeight * absRot[1] + oBBB.halfDepth * absRot[2];
        if(Math.abs( translation[0] ) > r1 + r2 )
            return false;
        //Axis L = A1
        r1 = oBBA.halfHeight;
        r2 = oBBB.halfWidth * absRot[3] + oBBB.halfHeight * absRot[4] + oBBB.halfDepth * absRot[5];
        if(Math.abs( translation[1] ) > r1 + r2 )
            return false;
        //Axis L = A2
        r1 = oBBA.halfDepth;
        r2 = oBBB.halfWidth * absRot[6] + oBBB.halfHeight * absRot[7] + oBBB.halfDepth * absRot[8];
        if(Math.abs( translation[2] ) > r1 + r2 )
            return false;
        //Axis L = B0
        r1 = oBBA.halfWidth * absRot[0] + oBBA.halfHeight * absRot[1] + oBBA.halfDepth * absRot[2];
        r2 = oBBB.halfWidth;
        if( Math.abs( translation[0] * rot[0] + translation[1] * rot[3] + translation[2] * rot[6]  ) > r1 + r2 )
            return false;
        //Axis L = B1
        r1 = oBBA.halfWidth * absRot[3] + oBBA.halfHeight * absRot[4] + oBBA.halfDepth * absRot[3];
        r2 = oBBB.halfHeight;
        if( Math.abs( translation[0] * rot[1] + translation[1] * mUtils.mat3Col(rot,1)[1] + translation[2] * rot[7]  ) > r1 + r2 )
            return false;
        //Axis L = B2
        r1 = oBBA.halfWidth * absRot[6] + oBBA.halfHeight * absRot[5] + oBBA.halfDepth * absRot[4];
        r2 = oBBB.halfDepth;
        if( Math.abs( translation[0] * rot[2] + translation[1] * mUtils.mat3Col(rot,2)[1] + translation[2] * rot[8]  ) > r1 + r2 )
            return false;
        //Axis L = A0 x B0
        r1 = oBBA.halfHeight * absRot[6] + oBBA.halfDepth * absRot[3];
        r2 = oBBB.halfHeight * absRot[2] + oBBB.halfDepth * absRot[1];
        if( Math.abs( translation[2] * rot[3] - translation[1] * rot[6] ) > r1 + r2  )
            return false;
        //Axis L = A0 x B1
        r1 = oBBA.halfHeight * absRot[7] + oBBA.halfDepth * absRot[4];
        r2 = oBBB.halfWidth * absRot[2] + oBBB.halfDepth * absRot[0];
        if( Math.abs( translation[2] * rot[4] - translation[1] * rot[7] ) > r1 + r2  )
            return false;
        //Axis L = A0 x B2
        r1 = oBBA.halfHeight * absRot[8] + oBBA.halfDepth * absRot[5];
        r2 = oBBB.halfWidth * absRot[1] + oBBB.halfHeight * absRot[0];
        if( Math.abs( translation[2] * rot[5] - translation[1] * rot[8] ) > r1 + r2  )
            return false;
        //Axis L = A1 x B0
        r1 = oBBA.halfWidth * absRot[6] + oBBA.halfDepth * absRot[0];
        r2 = oBBB.halfHeight * absRot[5] + oBBB.halfDepth * absRot[4];
        if( Math.abs( translation[0] * rot[6] - translation[2] * rot[0] ) > r1 + r2  )
            return false;
        //Axis L = A1 x B1
        r1 = oBBA.halfWidth * absRot[7] + oBBA.halfDepth * absRot[1];
        r2 = oBBB.halfWidth * absRot[5] + oBBB.halfDepth * absRot[3];
        if( Math.abs( translation[0] * rot[7] - translation[2] * rot[1] ) > r1 + r2  )
            return false;
        //Axis L = A1 x B2
        r1 = oBBA.halfWidth * absRot[8] + oBBA.halfDepth * absRot[2];
        r2 = oBBB.halfHeight * absRot[4] + oBBB.halfHeight * absRot[3];
        if( Math.abs( translation[0] * rot[8] - translation[2] * rot[2] ) > r1 + r2  )
            return false;
        //Axis L = A2 x B0
        r1 = oBBA.halfWidth * absRot[3] + oBBA.halfHeight * absRot[0];
        r2 = oBBB.halfHeight * absRot[8] + oBBB.halfDepth * absRot[7];
        if( Math.abs( translation[1] * rot[0] - translation[0] * rot[3] ) > r1 + r2  )
            return false;
        //Axis L = A2 x B1
        r1 = oBBA.halfWidth * absRot[4] + oBBA.halfHeight * absRot[1];
        r2 = oBBB.halfWidth * absRot[8] + oBBB.halfDepth * absRot[6];
        if( Math.abs( translation[1] * rot[1] - translation[0] * rot[4] ) > r1 + r2  )
            return false;
        //Axis L = A2 x B2
        r1 = oBBA.halfWidth * absRot[5] + oBBA.halfHeight * absRot[2];
        r2 = oBBB.halfWidth * absRot[7] + oBBB.halfHeight * absRot[6];
        if( Math.abs( translation[1] * rot[2] - translation[0] * rot[5] ) > r1 + r2  )
            return false;

        return true;

    }
});
