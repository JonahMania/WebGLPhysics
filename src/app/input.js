define( [],function()
{
    return function()
    {
        var that = this;
        this.keyStatus = {};
        this.mouseDown = false;
        this.mouseX;
        this.mouseY;
        //Handles key down events and sets the corresponding value in the keyStatus to true
        this.handleKeyDown = function(event)
        {
            that.keyStatus[event.keyCode] = true;
        }

        //Handles key up events and sets the corresponding value in the keyStatus to false
        this.handleKeyUp = function(event)
        {
            that.keyStatus[event.keyCode] = false;
        }

        this.handleMouseDown = function( event )
        {
            that.mouseDown = true;
        }

        this.handleMouseUp = function( event )
        {
            that.mouseDown = false;
        }

        this.updateMousePosition = function( event )
        {
            that.mouseX = event.clientX;
            that.mouseY = event.clientY;
        }
    }
});
