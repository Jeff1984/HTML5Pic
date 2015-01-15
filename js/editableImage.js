/**
 * Created by zhangchi on 2015/1/15.
 */
var self,gS,gR;

const STATE={
    editing:"editing",
    dragging:"dragging",
    scaling:"scaling",
    rotation:"rotation",
    none:"none"
}
var editableImage = function(name,props)
{
    this.srcName=name;

    self=this;
    editableImage.superClass.constructor.call(this, props);
    this.init();
};
Q.inherit(editableImage, Q.DisplayObjectContainer);

editableImage.prototype.init=function()
{
    this._image=new Q.Bitmap({id:"head", image:Q.getDOM(this.srcName), x:0, y:0});
    this.dragging=false;
    //this.eventChildren=false;

    gS = new Q.Graphics({width:40, height:40});
    gS.beginFill("#0ff").drawRect(0.5, 0.5, 40, 40).endFill().cache();

    gR = new Q.Graphics({width:40, height:40,x:this._image.width,y:this._image.height});
    gR.beginFill("#f00").drawRect(0.5, 0.5, 40, 40).endFill().cache();

    this.addChild(this._image);
    gS.addEventListener(events[0],this.scaleImage);
    gR.addEventListener(events[0],this.rotationImage);
    this._image.addEventListener(events[0], this.startDrag,false);
    this._image.addEventListener(events[2], this.stopDrag,false);
    gS.visible=gR.visible=false;
    this._state=STATE.none;
};

editableImage.prototype.setEditable=function(value)
{
    if(this._editable!=value)
    {
        this._editable=value;
    }
    if(value)
    {
        gS.visible=gR.visible=true;
    }
}

editableImage.prototype.setState = function(value)
{
    if(this._state!=value)
    {
        this._state=value
    }
   /* switch(value)
    {
        case STATE.editing:
            gS.visible=gR.visible=true;
            break;
        case STATE.dragging:
            gS.alpha=gR.alpha=.5;
            break;
        case STATE.rotation:
        case  STATE.scaling:
            gS.visible=gR.visible=true;
            gS.alpha=gR.alpha=1;
            break;
        case STATE.none:
            gS.visible=gR.visible=false;
            break;

    }*/
}

editableImage.prototype.scaleImage = function(e){
    console.log("tttt");
    //self.scaleX-=0.1;
}

editableImage.prototype.rotationImage = function(e){
    console.log("tttt");
    //self.scaleX-=0.1;
}

editableImage.prototype.startDrag = function(e)
{
    if(!self.dragging)
    {
        self.dragging = true;
        self.offsetX=mousePos.x-self.x;
        self.offsetY=mousePos.y-self.y;
    }
    //var selectFariyEvent =new CustomEvent("SELECT_A_FARIY",{'detail':self});
    //self.dispatchEvent(selectFariyEvent,self);

    //self.setState(STATE.editing);
};

editableImage.prototype.stopDrag = function(e)
{
     self.dragging = false;
    // console.log("THIS IS:",self.x+(self.offsetX),self.y+(self.offsetY))
};

editableImage.prototype.update = function()
{
    if(this.dragging)
    {
        this.x=mousePos.x-this.offsetX;
        this.y=mousePos.y-this.offsetY;
    }
}