/**
 * Created by zhangchi on 2015/1/15.
 */
var editableImage = function(name,props)
{
    this.srcName=name;
    editableImage.superClass.constructor.call(this, props);
    this.init();
};
Q.inherit(editableImage, Q.DisplayObjectContainer);

editableImage.prototype.init=function()
{
    this._image=new Q.Bitmap({id:"head", image:Q.getDOM(this.srcName), x:0, y:0});
    this.addChild(this._image);

    this.dragging=false;
    this.eventChildren = false;
    this.speedY = this.currentSpeedY = 8;
    this.originY = this.y;

    this.addEventListener(events[0], this.startDrag);
    this.addEventListener(events[2], this.stopDrag);
};

editableImage.prototype.startDrag = function(e)
{
    if(!this.dragging)
    {
        this.dragging = true;
    }
};

editableImage.prototype.stopDrag = function(e)
{
     this.dragging = false;
      console.log("THIS IS:",this.x+(this._image.width>>1),this.y+(this._image.height>>1))
};

editableImage.prototype.update = function()
{
    if(this.dragging)
    {
        this.x=mousePos.x-(this._image.width>>1);
        this.y=mousePos.y-(this._image.height>>1);
    }
}