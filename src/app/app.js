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
        bounding: '../app/physics/bounding'
    }
});

requirejs([
    'gl-matrix-min',
    'init/getCanvas',
    'init/initGL',
    'init/getShaders',
    'app/factory',
    'app/input',
    'physics/physicsEngine'
],
    function( glm,
        getCanvas,
        initGL,
        getShaders,
        factory,
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

        document.onkeydown = keyHandler.handleKeyDown;
        document.onkeyup = keyHandler.handleKeyUp;
        document.onmousedown = keyHandler.handleMouseDown;
        document.onmouseup = keyHandler.handleMouseUp;
        document.onmousemove = keyHandler.updateMousePosition;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        var fps = 0;
        var oldTime = 0;
        var timeDiff = 0;
        
        var viewYRotation = -0.7;
        var lastMouseX;

        //Initial positions of all objects in the scene
        var fact = new factory();

        //Create physics objects
        var physicsObjects = [];
        
        physicsObjects.push(
            fact.createSphere( 0.0, 6.0, 0, 1, 20, 20, 1.0, 0.0, 0.0, 0.2, true )
        );
        //Ground plate
        physicsObjects.push(
            fact.createRect( 0, -3, 0, 10, 0.2, 10, 1.0, 1.0, 1.0, 1.0, false )
        );
        //Back plate
        physicsObjects.push(
            fact.createRect( 0, -3, 0, 10, 6, 0.2, 1.0, 1.0, 1.0, 1.0, false )
        );
        
        console.log( physicsObjects );

        physicsObjects.forEach(function(physicsObject){
            physicsObject.renderer.initBuffers(gl);
        });

        // physicsObjects[1].rotate( gl, 90, 0, 0 );
        physicsObjects[2].translate(gl, 0, 2.9, -5 );

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
            
            physicsEngine( gl, dt, physicsObjects );
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
            
            update( timeDiff / 10000 );

            draw();
            requestAnimFrame(loop);
        }

        loop();

    });
