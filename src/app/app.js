requirejs.config(
{
    baseUrl: 'src/lib',
    paths:
    {
        app: '../app',
        util: '../app/utils',
        init: '../app/init',
        shape: '../app/shapes',
        physics: '../app/physics'
    }
});

requirejs([
    'gl-matrix-min',
    'init/getCanvas',
    'init/initGL',
    'init/getShaders',
    'app/factory',
    'app/input',
    'physics/sphereSphereCollisionDetection',
    'physics/oBBOBBCollisionDetection',
    'physics/sphereOBBCollisionDetection'],
    function( glm,
        getCanvas,
        initGL,
        getShaders,
        factory,
        input,
        sphereSphereCollisionDetection,
        obbOBBCollisionDetection,
        sphereOBBCollisionDetection )
    {
        window.requestAnimFrame = (function()
        {
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback )
                    {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();

        var canvas = getCanvas;
        var gl = initGL(canvas);
        var shaderProgram = getShaders( gl );
        //Model view matrix
        var mvMatrix = glm.mat4.create();
        //Prospective matrix
        var pMatrix = glm.mat4.create();
        var keyHandler = new input();

        document.onkeydown = keyHandler.handleKeyDown;
        document.onkeyup = keyHandler.handleKeyUp;
        document.onmousedown = keyHandler.handleMouseDown;
        document.onmouseup = keyHandler.handleMouseUp;
        document.onmousemove = keyHandler.updateMousePosition;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        var delta;
        var fps = 0;
        var oldTime = 0;

        var viewYRotation = 0;
        var lastMouseX;

        var cubeRotationX = 2;
        var cubeRotationY = 2;

        //Initial positions of all objects in the scene
        var fact = new factory();

        //Create physics objects
        var physicsObjects = [];
        physicsObjects.push([
            fact.createBoundingSphere(-3,2,0,1),
            fact.createSphere( -3, 2, 0, 1, 20, 20, 0.0, 1.0, 1.0 )
        ]);
        physicsObjects.push([
            fact.createCubeOBB(2,0.5,0,1),
            fact.createCube( 2, 0.5, 0, 1, 0.5, 0.5, 1.0 )
        ]);
        physicsObjects.push([
            fact.createBoundingSphere(0,2,0,1),
            fact.createSphere( 0, 2, 0, 1, 20, 20, 0.5, 0.5, 1.0 )
        ]);
        physicsObjects.push([
            fact.createCubeOBB(-1,0.5,0,1),
            fact.createCube( -1, 0.5, 0, 1, 0.5, 0.5, 1.0 )
        ]);
        //Ground plate
        physicsObjects.push([
            fact.createRectOBB(2,0.5,0,10,0.5,10),
            fact.createRect( 0, -3, 0, 10, 0.2, 10, 1.0, 1.0, 1.0 )
        ]);
        console.log( physicsObjects );

        physicsObjects.forEach(function(physicsObject){
            physicsObject[1].initBuffers(gl);
        });

        // objects[9].rotate(gl,90,0,0);

        function update()
        {
            //Rotate scene around origin
            if( keyHandler.mouseDown )
            {
                viewYRotation += (keyHandler.mouseX - lastMouseX) / 100;
                lastMouseX = keyHandler.mouseX;
            }
            else
            {
                lastMouseX = keyHandler.mouseX;
            }

            //Move sphere on wsad
            physicsObjects[1][1].color(gl,0.3, 0.3, 0.3);
            if( keyHandler.keyStatus[65] )
            {
                physicsObjects[1][0].translate(-0.1,0,0);
                physicsObjects[1][1].translate(gl,-0.1,0,0);
                if( sphereOBBCollisionDetection( physicsObjects[1][0], physicsObjects[2][0] ) )
                {
                    physicsObjects[1][1].color(gl,1,0,0);
                    physicsObjects[1][0].translate(0.1,0,0);
                    physicsObjects[1][1].translate(gl,0.1,0,0);
                }
            }
            if( keyHandler.keyStatus[68] )
            {
                physicsObjects[1][0].translate(0.1,0,0);
                physicsObjects[1][1].translate(gl,0.1,0,0);
                if( sphereOBBCollisionDetection( physicsObjects[1][0], physicsObjects[2][0] ) )
                {
                    physicsObjects[1][1].color(gl,1,0,0);
                    physicsObjects[1][0].translate(-0.1,0,0);
                    physicsObjects[1][1].translate(gl,-0.1,0,0);
                }
            }
            if( keyHandler.keyStatus[87] )
            {
                physicsObjects[1][0].translate(0,0.1,0);
                physicsObjects[1][1].translate(gl,0,0.1,0);
                if( sphereOBBCollisionDetection( physicsObjects[1][0], physicsObjects[2][0] ) )
                {
                    physicsObjects[1][1].color(gl,1,0,0);
                    physicsObjects[1][0].translate(0,-0.1,0);
                    physicsObjects[1][1].translate(gl,0,-0.1,0);
                }
            }
            if( keyHandler.keyStatus[83] )
            {
                physicsObjects[1][0].translate(0,-0.1,0);
                physicsObjects[1][1].translate(gl,0,-0.1,0);
                if( sphereOBBCollisionDetection( physicsObjects[1][0], physicsObjects[2][0] ) )
                {
                    physicsObjects[1][1].color(gl,1,0,0);
                    physicsObjects[1][0].translate(0,0.1,0);
                    physicsObjects[1][1].translate(gl,0,0.1,0);
                }
            }
            if( keyHandler.keyStatus[88] )
            {
                physicsObjects[1][0].rotate(0,-0.1,0);
                physicsObjects[1][1].rotate(gl,0,-0.1,0);
                if( sphereOBBCollisionDetection( physicsObjects[1][0], physicsObjects[2][0] ) )
                {
                    physicsObjects[1][1].color(gl,1,0,0);
                    physicsObjects[1][0].rotate(0,0.1,0);
                    physicsObjects[1][1].rotate(gl,0,0.1,0);
                }
            }
            if( keyHandler.keyStatus[90] )
            {
                physicsObjects[1][0].rotate(0.1,0,0);
                physicsObjects[1][1].rotate(gl,0.1,0,0);
                if( sphereOBBCollisionDetection( physicsObjects[1][0], physicsObjects[2][0] ) )
                {
                    physicsObjects[1][1].color(gl,1,0,0);
                    physicsObjects[1][0].rotate(-0.1,0,0);
                    physicsObjects[1][1].rotate(gl,-0.1,0,0);
                }
            }
        }

        function draw()
        {
            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            glm.mat4.perspective(pMatrix,45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

            glm.mat4.identity(mvMatrix);
            glm.mat4.translate( mvMatrix, mvMatrix, [0.0,0.0,-16.0] );
            glm.mat4.rotateY(mvMatrix, mvMatrix, viewYRotation );

            physicsObjects.forEach(function(physicsObject){
                physicsObject[1].draw(gl, pMatrix, mvMatrix);
            });
        }

        function loop()
        {
            fps = Math.floor(1/(( new Date().getTime() - oldTime )/1000));
            oldTime = new Date().getTime();
            document.getElementById("fps").innerHTML = fps;
            update();
            draw();
            requestAnimFrame(loop);
        }

        loop();

    });
