define(['app/factory'],function(factory)
{
    var objects;
    var fact = new factory();

    var create = function()
    {
        objects = [];
        //Sphere
        objects.push(
            fact.createSphere( -3.0, 6.0, 2, 1, 20, 20, 1.0, 0.0, 0.0, 0.2, true )
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
            fact.createSphere( 3.0, 4.0, 2, 1, 20, 20, 1.0, 0.0, 0.0, 0.2, true )
        );

    }
    var setPosition = function()
    {

    }
    var setValues = function()
    {

        //Sphere
        objects[0].velocity[2] = -3;
        //Ground plate
        //Back plate
        //Sphere
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
