define(['app/factory'],function(factory)
{
    var objects;
    var fact = new factory();

    var create = function()
    {
        objects = [];
        //Sphere
        objects.push(
            fact.createSphere( -3.0, -1.9, 2, 1, 20, 20, 1.0, 0.0, 0.0, 0.2, true )
        );
        //Ground plate
        objects.push(
            fact.createRect( 0, -3, 0, 16, 0.2, 16, 1.0, 1.0, 1.0, 1.0, false )
        );
        //Back plate
        objects.push(
            fact.createRect( 0, -2.4, 0, 7, 7, 4, 0.3, 0.2, 0.8, 1.0, false )
        );
        //Sphere 2
        objects.push(
            fact.createSphere( 3.0, -1.9, 3, 1, 20, 20, 1.0, 0.0, 0.0, 0.2, true )
        );
        // // Sphere 3
        // objects.push(
        //     fact.createSphere( 5.0, 2.0, -2, 1, 20, 20, 1.0, 0.0, 0.0, 0.2, true )
        // );

    }
    var setPosition = function( gl )
    {
        //Back plate 2
        objects[2].translate(gl, 0, 2.9, -4 );
    }
    var setValues = function()
    {

        //Sphere 0
        objects[0].velocity[0] = 4;
        objects[0].velocity[2] = 2;
        //Ground plate 1
        //Back plate 2
        //Sphere 3
        objects[3].velocity[0] = -4;
        // objects[3].velocity[2] = 2;
    }
    var getObjects = function()
    {
        return objects;
    }
    return {
        create:create,
        setPosition:setPosition,
        setValues:setValues,
        getObjects:getObjects
    }
});
