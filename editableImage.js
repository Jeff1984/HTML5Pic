/**
 * Created by zhangchi on 2015/1/15.
 */
var self;

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
    this._image=new Q.Bitmap({id:"head", image:Q.getDOM(this.srcName), x:0, y:0});
    //this.dragging=false;
    this.eventChildren=false;

    this.gS = new Q.Graphics({width:40, height:40,x:-20,y:-20});
    this.gS.beginFill("#0ff").drawRect(0.5, 0.5, 40, 40).endFill().cache();

    this.gR = new Q.Graphics({width:40, height:40,x:this._image.width,y:this._image.height});
    this.gR.beginFill("#f00").drawRect(0.5, 0.5, 40, 40).endFill().cache();

    this.testRect=new Q.Graphics({width:this._image.width, height:this._image.height,regX:this._image.width>>1,regY:this._image.height>>1,x:this._image.width>>1,y:this._image.height>>1});
    this.testRect.beginFill("#510").drawRect(5, 5, this._image.width, this._image.height).endFill().cache();
    this.addChild(this.testRect,this._image,this.gS,this.gR);
    //gS.addEventListener(events[0],this.scaleImage);
    //gR.addEventListener(events[0],this.rotationImage);
    this.addEventListener(events[0], this.startDrag);
    this.addEventListener(events[2], this.stopDrag);
    this.gS.visible=this.gR.visible=false;
    this._state=STATE.none;

    //this.regX=this._image.width>>1;
    //this.regY=this._image.height>>1;

    this.gS.x=
    this.gS.regX=this.gS.width>>1;
    this.gS.y=
    this.gS.regY=this.gS.height>>1;

    this.gR.x=this._image.width-(this.gR.width>>1);
    this.gR.regX=this.gR.width>>1;
    this.gR.y=this._image.height-(this.gR.height>>1);
    this.gR.regY=this.gR.height>>1

    this._image.x=
    this._image.regX=this._image.width>>1;
    this._image.y=
    this._image.regY=this._image.height>>1;
    //this.
    this.scaleStartX;
    this.scaleStartY;
};

editableImage.prototype.setEditable=function(value)
{
    if(this._editable!=value)
    {
        this._editable=value;
    }
    this.gS.visible=this.gR.visible=value;

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
        case  STATE.scaling:
            this.setEditable(true);
            //this.gS.alpha=this.gR.alpha=1;
            break;
        case STATE.none:
            this.setEditable(false);
            //this.gS.visible=this.gR.visible=false;
            break;

    }
}

editableImage.prototype.scaleImage = function(){
    console.log("scaling");
    //self.scaleX-=0.1;
}

editableImage.prototype.rotationImage = function(){
    console.log("rotation");
    //this.rotation+=0.5;
    //self.scaleX-=0.1;
}


editableImage.prototype.startDrag = function(e)
{
    this.offsetX=mousePos.x-this.x;
    this.offsetY=mousePos.y-this.y;
    //TODO drag start here
    console.log("HIIITTT ROTATION::", Q.hitTestPoint(this.gR,mousePos.x,mousePos.y),"HIIITTT SCALING::",Q.hitTestPoint(this.gS,mousePos.x,mousePos.y));
    if(Q.hitTestPoint(this.gR,mousePos.x,mousePos.y)==1)
    {
        this.rotationImage();
        //this.eventChildren=true;

    }else if(Q.hitTestPoint(this.gS,mousePos.x,mousePos.y)==1)
    {
        this.scaleImage();
        //this.eventChildren=true;
        this._state=STATE.scaling;
        this.scaleStartX=mousePos.x;
        this.scaleStartY=mousePos.y;
    }else {
        //this.eventChildren=false;
        if (!this._state!=STATE.dragging) {
            //this.dragging = true;
            this._state=STATE.dragging;
        }
        if (!this._editable) {
            this.setEditable(true);
        }
        console.log("OFFSET::::", this.offsetX, this.offsetY);
    }
    var selectFariyEvent =new CustomEvent("SELECT_A_FARIY",{'detail':this});
    this.dispatchEvent(selectFariyEvent,this);
    //self.setState(STATE.editing);
};

editableImage.prototype.stopDrag = function(e)
{
    //this.eventChildren=false;
    if(this._state!=STATE.none)
    {
        this._state=STATE.none;
    }
    if(this._state==STATE.scaling)
    {
        this._image.width=
        this.width*=this._scaleX;
        this._image.height=
        this.height*=this._scaleY;
    }
    // console.log("THIS IS:",self.x+(self.offsetX),self.y+(self.offsetY))
};

editableImage.prototype.update = function()
{
    if(this._state==STATE.dragging)
    {
        this.x=mousePos.x-this.offsetX;
        this.y=mousePos.y-this.offsetY;
    }else if(this._state==STATE.scaling)
    {
        this.gS.x=mousePos.x-this.x;
        this.gS.y=mousePos.y-this.y;

        //var prevX=mousePos.x;
        //var prevY=mousePos.y;

        var subX=this.gS.x-this.scaleStartX;
        var subY=this.gS.y-this.scaleStartY;
        //this.scaleStartX=mousePos.x;
        //this.scaleStartY=mousePos.y;
         /*var _scaleX=1-subX/this._image.width;
        var _scaleY=1-subY/this._image.height;*/
        console.log("subWidth::",subX,this.scaleStartX,"THIS.WIDTH::",this.width*this._scaleX);
        this._scaleX=1-(subX)/(this.width*this._scaleX);
        this._scaleY=1-(subY)/(this.height*this._scaleY);
       // this.testRect.scaleX=
            this._image.scaleX=this._scaleX;
        //this.testRect.scaleY=
            this._image.scaleY=this._scaleY;

        this.gR.x=this._image.width*this._image.scaleX-(this.gR.width>>1);
        this.gR.y=this._image.width*this._image.scaleY-(this.gR.width>>1);
        //this._image.scaleX=_scaleX;
        //this._image.scaleY=_scaleY;
    }else if(this._state==STATE.rotation)
    {

    }
}