// ================================================================================
var _point_A;
var _point_B;
var _point_C;

var _GRID;

var _canvas;
var _ctx;

var _LINE_W = 3;
var _LINE_H = 3;


window.addEventListener('load', function(){

    // -------------------------------------------------------------
    //return;
    // -------------------------------------------------------------
    _GRID = __byId("oscil-grid-box");

    for (var i=0; i < (700/50)*(500/50) ; i++ ) {
        
        var elem = __newElem('div');
            elem.className = 'oscil-grid-cell';
            
            if(i > 14*5-1 && i < 14*5+14){
                elem.style.borderTop = 'dashed 1px blue';
                elem.style.marginTop = '-1px';
            }

            if(i%7 == 0){
                elem.style.borderLeft = 'dashed 1px red';
                elem.style.marginLeft = '-1px';
            }

            _GRID.appendChild(elem);

    };
    // -------------------------------------------------------------
    _point_A = __byId("_point_A");
    _point_B = __byId("_point_B");
    _point_C = __byId("_point_C");
    // -------------------------------------------------------------
    _canvas = __byId("oscil-canvas");

    _ctx_A = _canvas.getContext("2d");
    _ctx_B = _canvas.getContext("2d");
    _ctx_C = _canvas.getContext("2d");

    _ctx_A.width = 700;
    _ctx_B.width = 700;
    _ctx_C.width = 700;

    _ctx_A.height = 500;
    _ctx_B.height = 500;
    _ctx_C.height = 500;

    _ctx_A.lineWidth = _LINE_W;
    _ctx_B.lineWidth = _LINE_W;
    _ctx_C.lineWidth = _LINE_W;

    _ctx_A.fillStyle = "#F00";
    _ctx_B.fillStyle = "#0F0";
    _ctx_C.fillStyle = "#00F";

    _ctx_A.strokeStyle = "#F00";
    _ctx_B.strokeStyle = "#0F0";
    _ctx_C.strokeStyle = "#00F";

    // -------------------------------------------------------------

    // -------------------------------------------------------------
    /*
    _ctx_A.moveTo( 0, 0 ); _ctx_A.lineTo( 500, 500 );
    _ctx_A.moveTo( 0, 500 ); _ctx_A.lineTo( 500, 0 );
    _ctx_A.stroke();
    */



    // -------------------------------------------------------------
    //_run();
    // -------------------------------------------------------------

});
// ================================================================================
var tTimer;
var allowToRun = true;
var _UPDATE_SPEED = 10;
var _REDRAW_DELAY = 50;

var _COS_STEP = 0.02;
var _SIN_STEP = 0.02;

var _cos_val = 0;
var _sin_val = 0;

var _CENTER_OFFSET_X = 250;
var _CENTER_OFFSET_Y = 250;
var _side = 'R';


var _OFFSET_X = 0;
var _OFFSET_Y = 250;

var _X_INCREMENT = 2.20;
var _Y_INCREMENT = 0.81;


var _MAX_Y_VALUE = 1.96;


function _start(){

    // -------------------------------------------------------------
    allowToRun = true;
    // -------------------------------------------------------------
    tTimer = setTimeout(function(){
        _run();
    }, 500);
    // -------------------------------------------------------------
}

// ================================================================================

function _stop(){

    // -------------------------------------------------------------
    allowToRun = false;
    // -------------------------------------------------------------
}

// ================================================================================

function _run(){

    // -------------------------------------------------------------
    clearTimeout(tTimer);
    // -------------------------------------------------------------
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    // -------------------------------------------------------------

    // -------------------------------------------------------------
    while(_OFFSET_X < 700){
        
        _OFFSET_X += (_X_INCREMENT);
        _cos_val += (_COS_STEP); _sin_val += (_SIN_STEP);
        _OFFSET_Y = (_CENTER_OFFSET_Y) - ( (Math.cos(_cos_val)/2 ) * (_CENTER_OFFSET_Y * (_Y_INCREMENT)) );
        _DRAW(_ctx_A, _OFFSET_X, _OFFSET_Y, "#F00");

    }
    // -------------------------------------------------------------
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    if(allowToRun)
        tTimer = setTimeout(function(){
            _clear();
            _run();
        }, _REDRAW_DELAY);
    // -------------------------------------------------------------

}

// ================================================================================
function _clear(){

    // -------------------------------------------------------------
    // Reset all
    _OFFSET_X = 0;
    //_ctx_A.save();
    //_ctx_A.setTransform(1, 0, 0, 1, 0, 0);
    _ctx_A.clearRect(0, 0, _ctx_A.width, _ctx_A.height);
    //_ctx_A.restore();
    // -------------------------------------------------------------
}
// ================================================================================
function _DRAW(_this_ctx, _X, _Y, _COLOR){
    
    // -------------------------------------------------------------
    //_this_ctx.strokeStyle = _COLOR;


    _this_ctx.fillStyle = _COLOR;
    _this_ctx.fillRect(_X, _Y, _LINE_W, _LINE_H);
    _this_ctx.stroke();

    /*
    _this_ctx.moveTo( _X, _Y); 
    _this_ctx.lineTo( _X+1, _Y+1 ); 
    */
    // -------------------------------------------------------------

}
// ================================================================================
function _X_INCR_DECR(elem){

    // -------------------------------------------------------------
    //__log(" X:"+elem.value)
    _X_INCREMENT = parseFloat(elem.value);
    // -------------------------------------------------------------

}
// ================================================================================
function _Y_INCR_DECR(elem){

    // -------------------------------------------------------------
    //__log(" Y:"+elem.value)
    _Y_INCREMENT = parseFloat(elem.value);

    if(_Y_INCREMENT > _MAX_Y_VALUE){
        _Y_INCREMENT = _MAX_Y_VALUE;
    }
    // -------------------------------------------------------------

}
// ================================================================================

/*
    _OFFSET_X = (_CENTER_OFFSET) - Math.floor(Math.cos(_cos_val) * (_CENTER_OFFSET/2) );
    _OFFSET_Y = (_CENTER_OFFSET) - Math.floor(Math.sin(_sin_val) * (_CENTER_OFFSET/2) );

    _point_A.style.marginLeft = (_OFFSET_X - 5)+'px';
    _point_A.style.marginTop = (_OFFSET_Y - 5)+'px';

    _DRAW(_OFFSET_X, _OFFSET_Y, "#F00");

    // -------------------------------------------------------------
    _OFFSET_X = (_OFFSET_X) - Math.floor(Math.cos(_cos_val*2) * (_CENTER_OFFSET/4) );
    _OFFSET_Y = (_OFFSET_Y) - Math.floor(Math.sin(_sin_val*2) * (_CENTER_OFFSET/4) );

    _point_B.style.marginLeft = (_OFFSET_X - 5)+'px';
    _point_B.style.marginTop = (_OFFSET_Y - 5)+'px';

    _DRAW(_OFFSET_X, _OFFSET_Y, "#0F0");

    // -------------------------------------------------------------
    _OFFSET_X = (_OFFSET_X) - Math.floor( (Math.cos(_cos_val*4) + Math.cos(_cos_val*4) ) * (_CENTER_OFFSET/6) );
    _OFFSET_Y = (_OFFSET_Y) - Math.floor( (Math.sin(_sin_val*4) + Math.sin(_sin_val*4) ) * (_CENTER_OFFSET/6) );

    _point_C.style.marginLeft = (_OFFSET_X - 5)+'px';
    _point_C.style.marginTop = (_OFFSET_Y - 5)+'px';

    _DRAW(_OFFSET_X, _OFFSET_Y, "#00F");



*/

