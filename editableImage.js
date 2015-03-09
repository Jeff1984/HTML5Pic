/**
 * Created by zhangchi on 2015/1/15.
 */
const STATE={
    editing:"editing",
    dragging:"dragging",
    scaling:"scaling",
    rotating:"rotating",
    none:"none"
}
var editableImage = function(name,props)
{
    this.srcName=name;
    this._scaleX=1;
    this._scaleY=1;

    this._rotation=0;
    //self=this;
    editableImage.superClass.constructor.call(this, props);
    this.init();
};
Q.inherit(editableImage, Q.DisplayObjectContainer);

editableImage.prototype.init=function()
{
    this._image=new Q.Bitmap({id:"head", image:imageDics[this.srcName].image, x:0, y:0});
    this.eventChildren=false;
    this.addChild(this._image)
    this.addEventListener(events[0], this.startDrag,false);
    this.addEventListener(events[2], this.stopDrag,false);

    this._state=STATE.none;

    this._image.x=this.regX=this._image.regX=this._image.width>>1;
    this._image.y=this.regY=this._image.regY=this._image.height>>1;

};

editableImage.prototype.setEditable=function(value)
{
    if(this._editable!=value)
    {
        this._editable=value;
    }
};

editableImage.prototype.setRotation=function (value)
{
    this._rotation=value;
    this.rotation=value;
}

editableImage.prototype.setWidth=function(value)
{
    this._scaleX=value/this._image.width;
    this.scaleX=this._scaleX
}

editableImage.prototype.getWidth=function()
{
    return this._image.width*this._scaleX;
}

editableImage.prototype.setHeight=function(value)
{
    this._scaleY=value/this._image.height;
    this.scaleY=this._scaleY;
}

editableImage.prototype.getHeight=function()
{
    return this._image.height*this._scaleY;
}

editableImage.prototype.getState=function()
{
    return this._state;
}

editableImage.prototype.setState = function(value)
{
    if(this._state!=value)
    {
        this._state=value
    }
    switch(value)
    {
        case STATE.editing:
        case STATE.dragging:
        case STATE.rotation:
        case STATE.scaling:
            this.setEditable(true);
            break;
        case STATE.none:
            this.setEditable(false);
            break;
    }
}

editableImage.prototype.startDrag = function(e)
{
    if(mousePos!=null)
    {
        dragOffsetX = mousePos.x - this.x;
        dragOffsetY = mousePos.y - this.y;
    }
    //TODO drag start here
    if (!this._state!=STATE.dragging)
    {
        this._state=STATE.dragging;
    }
    if (!this._editable)
    {
        this.setEditable(true);
    }
    //console.log("OFFSET::::", this.offsetX, this.offsetY);
    // }
    var selectFariyEvent =new CustomEvent("SELECT_A_FARIY",{'detail':this});
    this.dispatchEvent(selectFariyEvent,this);
};

editableImage.prototype.stopDrag = function(e)
{
    e.preventDefault();
    if(this._state==STATE.dragging)
    {
        this._state=STATE.none;
    }
};

editableImage.prototype.update = function()
{
    if(this._state==STATE.dragging&&mousePos!=null)
    {
        this.x = mousePos.x //- dragOffsetX;
        this.y = mousePos.y //-dragOffsetY;
    }
}
