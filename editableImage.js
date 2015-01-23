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
    //this.dragging=false;
    this.eventChildren=false;

    /*this.gS = new Q.Graphics({width:40, height:40,x:-20,y:-20});
    this.gS.beginFill("#0ff").drawRect(0.5, 0.5, 40, 40).endFill().cache();

    this.gR = new Q.Graphics({width:40, height:40,x:this._image.width,y:this._image.height});
    this.gR.beginFill("#f00").drawRect(0.5, 0.5, 40, 40).endFill().cache();*/

    //this.testRect=new Q.Graphics({width:this._image.width, height:this._image.height,regX:this._image.width>>1,regY:this._image.height>>1,x:this._image.width>>1,y:this._image.height>>1});
    //this.testRect.beginFill("#510").drawRect(5, 5, this._image.width, this._image.height).endFill().cache();
    //this.addChild(this.testRect);
    this.addChild(this._image)
    //gS.addEventListener(events[0],this.scaleImage);
    //gR.addEventListener(events[0],this.rotationImage);
    this.addEventListener(events[0], this.startDrag,false);
    this.addEventListener(events[2], this.stopDrag,false);

    //this.gS.visible=this.gR.visible=false;
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
   // this.gS.visible=this.gR.visible=value;
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
    //console.log("HIIITTT ROTATION::", Q.hitTestPoint(this.gR,mousePos.x,mousePos.y),"HIIITTT SCALING::",Q.hitTestPoint(this.gS,mousePos.x,mousePos.y));
   /* if(Q.hitTestPoint(this.gR,mousePos.x,mousePos.y)==1)
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
    }else {*/
        //this.eventChildren=false;
        if (!this._state!=STATE.dragging) {
            //this.dragging = true;
            this._state=STATE.dragging;
           // var test=this.getWidth();
            //this.setWidth(test+=10);
        }
        if (!this._editable) {
            this.setEditable(true);
        }
        console.log("OFFSET::::", this.offsetX, this.offsetY);
   // }
    var selectFariyEvent =new CustomEvent("SELECT_A_FARIY",{'detail':this});
    this.dispatchEvent(selectFariyEvent,this);
    //self.setState(STATE.editing);
};

editableImage.prototype.stopDrag = function(e)
{
    //this.eventChildren=false;
   if(this._state==STATE.dragging)
    {
        this._state=STATE.none;
    }
    // console.log("THIS IS:",self.x+(self.offsetX),self.y+(self.offsetY))
};

editableImage.prototype.update = function()
{
    if(this._state==STATE.dragging)
    {
        this.x=mousePos.x-this.offsetX;
        this.y=mousePos.y-this.offsetY;


    }

}