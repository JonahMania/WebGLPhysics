requirejs.config(
{
    baseUrl: 'src/lib',
    paths:
    {
        app: '../app',
        util: '../app/utils',
        init: '../app/init',
        shape: '../app/shapes',
        physics: '../app/physics',
        CD: '../app/physics/collisionDetection',
        CR: '../app/physics/collisionResolution',
        bounding: '../app/physics/bounding'
    }
});

requirejs([
    'gl-matrix-min',
    'init/getCanvas',
    'init/initGL',
    'init/getShaders',
    'app/createObjects',
    'app/input',
    'physics/physicsEngine'
],
    function( glm,
        getCanvas,
        initGL,
        getShaders,
        createObjects,
        input,
        physicsEngine )
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
        var running = false;
        document.onkeydown = keyHandler.handleKeyDown;
        document.onkeyup = keyHandler.handleKeyUp;
        document.onmousedown = keyHandler.handleMouseDown;
        document.onmouseup = keyHandler.handleMouseUp;
        document.onmousemove = keyHandler.updateMousePosition;
        var runStop = document.getElementById('runStop');
        runStop.onclick = function()
        {
            running = !running;
            if( running )
                runStop.innerHTML = "Pause";
            else
                runStop.innerHTML = "Resume";
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        var fps = 0;
        var oldTime = 0;
        var timeDiff = 0;

        var viewYRotation = -0.8;
        var lastMouseX;


        //Create physics objects
        createObjects.create();
        var physicsObjects = createObjects.getObjects();

        console.log( physicsObjects );

        physicsObjects.forEach(function(physicsObject){
            physicsObject.renderer.initBuffers(gl);
        });
        createObjects.setPosition(gl);
        createObjects.setValues();

        function update( dt )
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

            if( running )
            {
                physicsEngine( gl, dt, physicsObjects );
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
                physicsObject.renderer.draw(gl, pMatrix, mvMatrix);
            });
        }

        function loop()
        {
            timeDiff = new Date().getTime() - oldTime;
            oldTime = new Date().getTime();
            if( timeDiff > 100 )
                timeDiff = 0;
            fps = Math.floor(1/(( timeDiff )/1000));

            document.getElementById("fps").innerHTML = fps;

            update( timeDiff / 600 );

            draw();
            requestAnimFrame(loop);
        }

        loop();

    });
