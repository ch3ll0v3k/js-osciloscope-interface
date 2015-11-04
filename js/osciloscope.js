// ================================================================================
var _point_A;
var _point_B;

var _GRID;

var _canvas;

var _ctx_CH_1;
var _ctx_CH_2;

var _LINE_W = 3;
var _LINE_H = 3;

var _HEIGHT = 500;
var _WIDTH = 700;

var on_buttonMainApp;
var off_buttonMainApp;

var on_button_CH_1;
var off_button_CH_1;

var on_button_CH_2;
var off_button_CH_2;

var _CH_1_color = "red";
var _CH_2_color = "blue";


window.addEventListener('load', function(){

    // -------------------------------------------------------------
    //return;
    // -------------------------------------------------------------
    on_buttonMainApp = __byId("on-button");
    off_buttonMainApp = __byId("off-button");
    
    on_buttonMainApp.onclick = function(){ 
        on_buttonMainApp.style.display = 'none'; off_buttonMainApp.style.display = 'block'; _start(); 
    };

    off_buttonMainApp.onclick = function(){ 
        off_buttonMainApp.style.display = 'none'; on_buttonMainApp.style.display = 'block'; _stop(); 
    };
    // -------------------------------------------------------------
    on_button_CH_1 = __byId("on-button-CH_1");
    off_button_CH_1 = __byId("off-button-CH_1");
    
    on_button_CH_1.onclick = function(){ 
        on_button_CH_1.style.display = 'none'; off_button_CH_1.style.display = 'block'; _ctrl_CH_1();
    };

    off_button_CH_1.onclick = function(){ 
        off_button_CH_1.style.display = 'none'; on_button_CH_1.style.display = 'block'; _ctrl_CH_1();
    };

    // -------------------------------------------------------------
    on_button_CH_2 = __byId("on-button-CH_2");
    off_button_CH_2 = __byId("off-button-CH_2");
    
    on_button_CH_2.onclick = function(){ 
        on_button_CH_2.style.display = 'none'; off_button_CH_2.style.display = 'block'; _ctrl_CH_2();
    };

    off_button_CH_2.onclick = function(){ 
        off_button_CH_2.style.display = 'none'; on_button_CH_2.style.display = 'block'; _ctrl_CH_2();
    };


    // -------------------------------------------------------------
    _GRID = __byId("oscil-grid-box");

    for (var y=0; y < (_HEIGHT/50); y++ ) {
        

        for (var x=0; x < (_WIDTH/50); x++ ) {

            var elem = __newElem('div');
                elem.className = 'oscil-grid-cell';

            if(y == 7 || y == 3){
                elem.style.borderTop = 'dashed 1px blue';
                elem.style.marginTop = '-1px';
            }

            if(y == 5){
                elem.style.borderTop = 'dashed 1px #0F0';
                elem.style.marginTop = '-1px';
            }

            if(x == 7){
                elem.style.borderLeft = 'dashed 1px red';
                elem.style.marginLeft = '-1px';
            }

            _GRID.appendChild(elem);
        }
    };
    // -------------------------------------------------------------
    _point_A = __byId("_point_A");
    _point_B = __byId("_point_B");
    // -------------------------------------------------------------
    _canvas = __byId("oscil-canvas");

    _ctx_CH_1 = _canvas.getContext("2d");
    _ctx_CH_2 = _canvas.getContext("2d");

    _ctx_CH_1.width = 700;
    _ctx_CH_2.width = 700;

    _ctx_CH_1.height = 500;
    _ctx_CH_2.height = 500;

    _ctx_CH_1.lineWidth = _LINE_W;
    _ctx_CH_2.lineWidth = _LINE_W;

    _ctx_CH_1.fillStyle = "#F00";
    _ctx_CH_2.fillStyle = "#0F0";

    _ctx_CH_1.strokeStyle = "#F00";
    _ctx_CH_2.strokeStyle = "#0F0";


    // -------------------------------------------------------------
    _setAllValues();
    //_run();
    // -------------------------------------------------------------

});
// ================================================================================
var tTimer;
var allowToRun = true;
var _REDRAW_DELAY = 10;

var _CENTER_OFFSET_X = 250;
var _CENTER_OFFSET_Y = 250;

var _MAX_Y_VALUE = 1.96;


// ----------------------------------------------------
// CH_1
var _ENABLE_CH_1 = true;

var _COS_STEP_CH_1 = 0.02;
var _SIN_STEP_CH_1 = 0.02;

var _cos_val_CH_1 = 0;
var _sin_val_CH_1 = 0;

var _CENTER_OFFSET_Y_CH_1 = 135;

var _CURR_OFFSET_X_CH_1 = 0;
var _CURR_OFFSET_Y_CH_1 = 250;

var _X_CH_1_INCREMENT = 0.674;
var _Y_CH_1_INCREMENT = 0.301;


// ----------------------------------------------------
// CH_2
var _ENABLE_CH_2 = true;

var _COS_STEP_CH_2 = 0.02;
var _SIN_STEP_CH_2 = 0.02;

var _cos_val_CH_2 = 0;
var _sin_val_CH_2 = 0;

var _CENTER_OFFSET_Y_CH_2 = 340 ;

var _CURR_OFFSET_X_CH_2 = 0;
var _CURR_OFFSET_Y_CH_2 = 250;

var _X_CH_2_INCREMENT = 1.105;
var _Y_CH_2_INCREMENT = 0.401;

// ----------------------------------------------------


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
    // CH_1
    
    if(_ENABLE_CH_1){

        while(_CURR_OFFSET_X_CH_1 < 700){
                    
            _CURR_OFFSET_X_CH_1 += (_X_CH_1_INCREMENT);
            _cos_val_CH_1 += (_COS_STEP_CH_1); 
            _sin_val_CH_1 += (_SIN_STEP_CH_1);

            _CURR_OFFSET_Y_CH_1 = (_CENTER_OFFSET_Y_CH_1) - ( (Math.cos(_cos_val_CH_1)/2 ) * (_CENTER_OFFSET_Y * (_Y_CH_1_INCREMENT)) );

            _DRAW(_ctx_CH_1, _CURR_OFFSET_X_CH_1, _CURR_OFFSET_Y_CH_1, _CH_1_color);

        }
    }
    // -------------------------------------------------------------
    // CH_2
    
    if(_ENABLE_CH_2){

        while(_CURR_OFFSET_X_CH_2 < 700){

            _CURR_OFFSET_X_CH_2 += (_X_CH_2_INCREMENT);
            _cos_val_CH_2 += (_COS_STEP_CH_2); 
            _sin_val_CH_2 += (_SIN_STEP_CH_2);

            _CURR_OFFSET_Y_CH_2 = (_CENTER_OFFSET_Y_CH_2) - ( (Math.cos(_cos_val_CH_2)/2 ) * (_CENTER_OFFSET_Y * (_Y_CH_2_INCREMENT)) );

            _DRAW(_ctx_CH_2, _CURR_OFFSET_X_CH_2, _CURR_OFFSET_Y_CH_2, _CH_2_color);

        }
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
    _CURR_OFFSET_X_CH_1 = 0;
    _CURR_OFFSET_X_CH_2 = 0;
    //_ctx_CH_1.save();
    //_ctx_CH_1.setTransform(1, 0, 0, 1, 0, 0);
    _ctx_CH_1.clearRect(0, 0, _ctx_CH_1.width, _ctx_CH_1.height);
    //_ctx_CH_1.clearRect(0, 0, _ctx_CH_1.width, _ctx_CH_1.height);
    //_ctx_CH_1.restore();
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
function _ctrl_CH_1(){

    // -------------------------------------------------------------
    _ENABLE_CH_1 = !_ENABLE_CH_1;
    // -------------------------------------------------------------

}

// ================================================================================
function _ctrl_CH_2(){

    // -------------------------------------------------------------
    _ENABLE_CH_2 = !_ENABLE_CH_2;
    // -------------------------------------------------------------

}
// ================================================================================
function _color_selector(elem){

    // -------------------------------------------------------------
    switch(elem.className.split("bg-")[1]){

        // ----------------------------------
        case 'red': _this_color = "#FF0000"; break;
        case 'green': _this_color = "#00FF00"; break;
        case 'blue': _this_color = "#0000FF"; break;
        case 'purple': _this_color = "#FF00FF"; break;
        case 'yellow': _this_color = "#FFFF00"; break;
        case 'orange': _this_color = "#FF9000"; break;
        // ----------------------------------
    }
    // -------------------------------------------------------------
    if(elem.parentNode.parentNode.id == 'CH_1'){
        _CH_1_color = _this_color;
        __byId('CH_1-legend').style.borderColor = _this_color;
    }else{
        _CH_2_color = _this_color;
        __byId('CH_2-legend').style.borderColor = _this_color;
    }
    // -------------------------------------------------------------

}

// ================================================================================
function _X_INCR_DECR(elem){

    // -------------------------------------------------------------
    var raw_value = parseFloat(elem.value);

    switch(elem.parentNode.parentNode.id){
        
        // -----------------------------------------
        case "CH_1": 

            if(raw_value <= 0.02){
                _X_CH_1_INCREMENT = 0.02;
                elem.value = _X_CH_1_INCREMENT;
            }else{
                _X_CH_1_INCREMENT = raw_value;
            }

        break;
        // -----------------------------------------
        case "CH_2": 

            if(raw_value <= 0.02){
                _X_CH_2_INCREMENT = 0.02;
                elem.value = _X_CH_2_INCREMENT;
            }else{
                _X_CH_2_INCREMENT = raw_value;
            }

        break;
        // -----------------------------------------
    }
    // -------------------------------------------------------------
}

// ================================================================================
function _Y_INCR_DECR(elem){

    // -------------------------------------------------------------
    switch(elem.parentNode.parentNode.id){
        // -----------------------------------------
        case "CH_1": 
            _Y_CH_1_INCREMENT = parseFloat(elem.value);

            if(_Y_CH_1_INCREMENT > _MAX_Y_VALUE)
                _Y_CH_1_INCREMENT = _MAX_Y_VALUE;

            else if(_Y_CH_1_INCREMENT < 0.001)
                _Y_CH_1_INCREMENT = 0.001;

            elem.value = _Y_CH_1_INCREMENT;

        break;
        // -----------------------------------------
        case "CH_2": 
            _Y_CH_2_INCREMENT = parseFloat(elem.value);

            if(_Y_CH_2_INCREMENT > _MAX_Y_VALUE)
                _Y_CH_2_INCREMENT = _MAX_Y_VALUE;

            else if(_Y_CH_2_INCREMENT < 0.001)
                _Y_CH_2_INCREMENT = 0.001;

            elem.value = _Y_CH_2_INCREMENT;
        break;
        // -----------------------------------------
    }
    // -------------------------------------------------------------

}
// ================================================================================
function _change_update_speed(elem){

    // -------------------------------------------------------------
    var raw_value = parseFloat(elem.value);
    // -------------------------------------------------------------
    if(raw_value >= 990){
        elem.value = 990; raw_value = 990;

    }else if(raw_value <= 10){
        elem.value = 10; raw_value = 10;
    }

    _REDRAW_DELAY = (1000 - raw_value);

    // -------------------------------------------------------------
    __log(_REDRAW_DELAY)
    // -------------------------------------------------------------

}
// ================================================================================
function _y_offset_changer(elem, _side){

    // -------------------------------------------------------------
    var _ID = elem.parentNode.parentNode.id;
    var elem = __byId(_ID+"_Y_OFFSET_VAL");
    var _value = parseFloat(elem.innerHTML.trim())

    switch(_ID){
        // -----------------------------------------
        case 'CH_1':
            //__log('CH_1')
            if(_value < 1) _value = 1; else _value += parseInt(_side)*5;
            elem.innerHTML = _value; _CENTER_OFFSET_Y_CH_1 = _value;

        break;
        // -----------------------------------------
        case 'CH_2': 
            //__log('CH_2')
            if(_value < 1) _value = 1; else _value += parseInt(_side)*5;
            elem.innerHTML = _value; _CENTER_OFFSET_Y_CH_2 = _value;
        break;
        // -----------------------------------------
    }
    // -------------------------------------------------------------
    __log(_value)
    // -------------------------------------------------------------

}

// ================================================================================
function _setAllValues(){

    // -------------------------------------------------------------
    __byId("CH_1_Y_OFFSET_VAL").innerHTML = _CENTER_OFFSET_Y_CH_1;
    __byId("CH_2_Y_OFFSET_VAL").innerHTML = _CENTER_OFFSET_Y_CH_2;
    // -------------------------------------------------------------
    __byId("_number_input_X_CH_1").value = _X_CH_1_INCREMENT;
    __byId("_number_input_Y_CH_1").value = _Y_CH_1_INCREMENT; 
    __byId("_number_input_Y_CH_2").value = _X_CH_2_INCREMENT;
    __byId("_number_input_X_CH_2").value = _Y_CH_2_INCREMENT;
    // -------------------------------------------------------------

    __byId("speed_chenger").value = (1000 - _REDRAW_DELAY);
    /*
    __byId("").value = 
    __byId("").value = 
    __byId("").value = 
    __byId("").value = 
*/
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // -------------------------------------------------------------
}
// ================================================================================

