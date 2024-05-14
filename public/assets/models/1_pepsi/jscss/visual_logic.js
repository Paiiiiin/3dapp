/* eslint-disable */

/**
 * Generated by Verge3D Puzzles v.4.4.0
 * Tue, 14 May 2024 03:31:29 GMT
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.weshow3d.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */
function createPL(v3d = window.v3d) {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.currentTime = `2024/5/14 11:31:29`;
_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.pickedObject = '';
_pGlob.hoveredObject = '';
_pGlob.mediaElements = {};
_pGlob.loadedFile = '';
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.openedFile = '';
_pGlob.openedFileMeta = {};
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.intervalTimers = {};
_pGlob.customEvents = new v3d.EventDispatcher();
_pGlob.eventListeners = [];

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster(); // always check visibility

var PL = {};
// backward compatibility
if (v3d[Symbol.toStringTag] !== 'Module') {
    v3d.PL = v3d.puzzles = PL;
}

PL.procedures = PL.procedures || {};







PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    // utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}

// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem) continue;

        if ((attr == 'href' || attr == 'src') && value instanceof Promise) {
            // resolve promise value for url-based attributes
            value.then(function(response) {
                elem[attr] = response;
            });
        } else {
            elem[attr] = value;
        }
    }
}

// setHTMLElemStyle puzzle
function setHTMLElemStyle(prop, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style)
            continue;
        elem.style[prop] = value;
    }
}

// removeHTMLElement puzzle
function removeHTMLElement(id, isParent) {

    var elem = getElement(id, isParent);
    if (elem && elem.parentNode)
        elem.parentNode.removeChild(elem);

}

// setTimeout puzzle
function registerSetTimeout(timeout, callback) {
    window.setTimeout(callback, 1000 * timeout);
}



// initSettings puzzle
_initGlob.output.initOptions.fadeAnnotations = true;
_initGlob.output.initOptions.useBkgTransp = true;
_initGlob.output.initOptions.preserveDrawBuf = true;
_initGlob.output.initOptions.useCompAssets = false;
_initGlob.output.initOptions.useFullscreen = false;


// initPreloader puzzle
_initGlob.output.initOptions.useCustomPreloader = true;
_initGlob.output.initOptions.preloaderStartCb = function() {
    _initGlob.percentage = 0;
    (function() {})();
};
_initGlob.output.initOptions.preloaderProgressCb = function(percentage) {
    _initGlob.percentage = percentage;
    (function() {
  setHTMLElemAttribute('innerHTML', String(Math.round(_initGlob.percentage)) + '%', 'percentage', false);
  setHTMLElemStyle('width', String(Math.round(_initGlob.percentage)) + '%', 'preloader-line', false);
})();
};
_initGlob.output.initOptions.preloaderEndCb = function() {
    _initGlob.percentage = 100;
    (function() {
  setHTMLElemStyle('animation', 'hide 0.3s 0s linear 1', 'preloader-background', false);
  setHTMLElemStyle('animationFillMode', 'forwards', 'preloader-background', false);
  registerSetTimeout(0.6, function() {
    setHTMLElemStyle('display', 'none', 'preloader-background', false);
    removeHTMLElement('preloader-background', false);
  });
})();
};

    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}



var StateRotate, inertia;

// featureAvailable puzzle
function featureAvailable(feature) {

    var userAgent = window.navigator.userAgent;
    var platform = window.navigator.platform;

    switch (feature) {
    case 'LINUX':
        return /Linux/.test(platform);
    case 'WINDOWS':
        return ['Win32', 'Win64', 'Windows', 'WinCE'].indexOf(platform) !== -1;
    case 'MACOS':
        return (['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(platform) !== -1 && !v3d.Detector.checkIOS());
    case 'IOS':
        return v3d.Detector.checkIOS();
    case 'ANDROID':
        return /Android/i.test(userAgent);
    case 'MOBILE':
        return (/Android|webOS|BlackBerry/i.test(userAgent) || v3d.Detector.checkIOS());

    case 'CHROME':
        // Chromium based
        return (!!window.chrome && !/Edge/.test(navigator.userAgent));
    case 'FIREFOX':
        return /Firefox/.test(navigator.userAgent);
    case 'IE':
        return /Trident/.test(navigator.userAgent);
    case 'EDGE':
        return /Edge/.test(navigator.userAgent);
    case 'SAFARI':
        return (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));

    case 'TOUCH':
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    case 'RETINA':
        return window.devicePixelRatio >= 2;
    case 'HDR':
        return appInstance.useHDR;
    case 'WEBAUDIO':
        return v3d.Detector.checkWebAudio();
    case 'WEBGL':
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl')
        return !!gl;
    case 'WEBGL2':
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl2')
        return !!gl;
    case 'WOOCOMMERCE':
        var woo_fun = window.parent.v3d_woo_get_product_info || window.parent.parent.v3d_woo_get_product_info;
        return !!woo_fun;
    case 'DO_NOT_TRACK':
        if (navigator.doNotTrack == '1' || window.doNotTrack == '1')
            return true;
        else
            return false;
    default:
        return false;
    }

}

function setScreenScale(factor) {

    // already have maximum pixel ratio in HiDPI mode
    if (!appInstance.useHiDPIRenderPass)
        appInstance.renderer.setPixelRatio(factor);

    if (appInstance.postprocessing)
        appInstance.postprocessing.composer.setPixelRatio(factor);

    // to update possible post-processing passes
    appInstance.onResize();
}

// orbitControls set prop puzzle
function orbitControlsSetProp(option,value) {
    if (appInstance.controls && appInstance.controls instanceof v3d.OrbitControls) {
        appInstance.controls[option] = value;
    } else {
        console.error('app controls set prop: Wrong controls type');
    }
}

// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return obj.type !== 'AmbientLight' &&
           obj.name !== '' &&
           !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
           !obj.isAuxClippingMesh;
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    if (appInstance.scene) {
        appInstance.scene.traverse(function(obj) {
            if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                objFound = obj;
                if (runTime) {
                    _pGlob.objCache[objName] = objFound;
                }
            }
        });
    }
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc.filter(function(name) {
        return name;
    });
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}

/**
 * Retrieve coordinate system from the loaded scene
 */
function getCoordSystem() {
    var scene = appInstance.scene;

    if (scene && 'coordSystem' in scene.userData) {
        return scene.userData.coordSystem;
    }

    return 'Y_UP_RIGHT';
}


/**
 * Transform coordinates from one space to another
 * Can be used with Vector3 or Euler.
 */
function coordsTransform(coords, from, to, noSignChange) {

    if (from == to)
        return coords;

    var y = coords.y, z = coords.z;

    if (from == 'Z_UP_RIGHT' && to == 'Y_UP_RIGHT') {
        coords.y = z;
        coords.z = noSignChange ? y : -y;
    } else if (from == 'Y_UP_RIGHT' && to == 'Z_UP_RIGHT') {
        coords.y = noSignChange ? z : -z;
        coords.z = y;
    } else {
        console.error('coordsTransform: Unsupported coordinate space');
    }

    return coords;
}


/**
 * Verge3D euler rotation to Blender/Max shortest.
 * 1) Convert from intrinsic rotation (v3d) to extrinsic XYZ (Blender/Max default
 *    order) via reversion: XYZ -> ZYX
 * 2) swizzle ZYX->YZX
 * 3) choose the shortest rotation to resemble Blender's behavior
 */
const eulerV3DToBlenderShortest = function() {

    const eulerTmp = new v3d.Euler();
    const eulerTmp2 = new v3d.Euler();
    const vec3Tmp = new v3d.Vector3();

    return function(euler, dest) {

        const eulerBlender = eulerTmp.copy(euler).reorder('YZX');
        const eulerBlenderAlt = eulerTmp2.copy(eulerBlender).makeAlternative();

        const len = vec3Tmp.setFromEuler(eulerBlender).lengthSq();
        const lenAlt = vec3Tmp.setFromEuler(eulerBlenderAlt).lengthSq();

        dest.copy(len < lenAlt ? eulerBlender : eulerBlenderAlt);
        return coordsTransform(dest, 'Y_UP_RIGHT', 'Z_UP_RIGHT');
    }

}();

// tweenCamera puzzle
function tweenCamera(posOrObj, targetOrObj, duration, doSlot, movementType) {
    var camera = appInstance.getCamera();

    if (Array.isArray(posOrObj)) {
        var worldPos = _pGlob.vec3Tmp.fromArray(posOrObj);
        worldPos = coordsTransform(worldPos, getCoordSystem(), 'Y_UP_RIGHT');
    } else if (posOrObj) {
        var posObj = getObjectByName(posOrObj);
        if (!posObj) return;
        var worldPos = posObj.getWorldPosition(_pGlob.vec3Tmp);
    } else {
        // empty input means: don't change the position
        var worldPos = camera.getWorldPosition(_pGlob.vec3Tmp);
    }

    if (Array.isArray(targetOrObj)) {
        var worldTarget = _pGlob.vec3Tmp2.fromArray(targetOrObj);
        worldTarget = coordsTransform(worldTarget, getCoordSystem(), 'Y_UP_RIGHT');
    } else {
        var targObj = getObjectByName(targetOrObj);
        if (!targObj) return;
        var worldTarget = targObj.getWorldPosition(_pGlob.vec3Tmp2);
    }

    duration = Math.max(0, duration);

    if (appInstance.controls && appInstance.controls.tween) {
        // orbit and flying cameras
        if (!appInstance.controls.inTween) {
            appInstance.controls.tween(worldPos, worldTarget, duration, doSlot,
                    movementType);
        }
    } else {
        // TODO: static camera, just position it for now
        if (camera.parent) {
            camera.parent.worldToLocal(worldPos);
        }
        camera.position.copy(worldPos);
        camera.lookAt(worldTarget);
        doSlot();
    }
}

// getEventProperty puzzle
function getEventProperty(prop, event) {
    if (typeof event != "undefined") {
        switch (prop) {
            case 'target.checked':
                return event.target.checked;
            case 'target.id':
                return event.target.id;
            case 'target.value':
                return event.target.value;
            case 'touches.length':
                return event.touches ? event.touches.length : 0;
            case 'touches[0].pageX':
                return event.touches[0].pageX;
            case 'touches[0].pageY':
                return event.touches[0].pageY;
            case 'touches[1].pageX':
                return event.touches[1].pageX;
            case 'touches[1].pageY':
                return event.touches[1].pageY;
            case 'targetTouches.length':
                return event.targetTouches ? event.targetTouches.length : 0;
            case 'targetTouches[0].pageX':
                return event.targetTouches[0].pageX;
            case 'targetTouches[0].pageY':
                return event.targetTouches[0].pageY;
            case 'targetTouches[1].pageX':
                return event.targetTouches[1].pageX;
            case 'targetTouches[1].pageY':
                return event.targetTouches[1].pageY;
            default:
                return event[prop];
        }
    }
}

var parseDataUriRe = /^data:(.+\/.+);base64,(.*)$/;

/**
 * Check if object is a Data URI string
 */
function checkDataUri(obj) {
    // NOTE: checking with parseDataUriRe is slow
    return (typeof obj === 'string' && obj.indexOf('data:') == 0);
}

/**
 * Check if object is a URI to a Blob object
 */
function checkBlobUri(obj) {
    return (typeof obj === 'string' && obj.indexOf('blob:') == 0);
}

/**
 * First we use encodeURIComponent to get percent-encoded UTF-8,
 * then we convert the percent encodings into raw bytes which can be fed into btoa
 * https://bit.ly/3dvpq60
 */
function base64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

/**
 * Going backwards: from bytestream, to percent-encoding, to original string
 * https://bit.ly/3dvpq60
 */
function base64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

/**
 * Convert object or string to application/json Data URI
 */
function toJSONDataUri(obj, mime='application/json') {
    if (typeof obj !== 'string')
        obj = JSON.stringify(obj);
    return 'data:' + mime + ';base64,' + base64EncodeUnicode(obj);
}

/**
 * Convert object or string to application/json Data URI
 */
function toTextDataUri(obj) {
    if (typeof obj !== 'string')
        obj = JSON.stringify(obj);
    return 'data:text/plain;base64,' + base64EncodeUnicode(obj);
}

/**
 * Extract text data from Data URI
 */
function extractDataUriData(str) {
    var matches = str.match(parseDataUriRe);
    return base64DecodeUnicode(matches[2]);
}

// downloadFile puzzle
function downloadFile(contents, filename) {
    if (!filename)
        return;

    if (contents instanceof Promise) {

        contents.then(function(response) {

            doDownload(response, filename);

        }, function(error) {});

    } else {

        doDownload(contents, filename);

    }

    function doDownload(contents, filename) {
        if (typeof contents !== 'string') {
            contents = toJSONDataUri(contents);
        } else if (!checkDataUri(contents) && !checkBlobUri(contents)) {
            contents = toTextDataUri(contents);
        }

        var link = document.createElement('a');
        link.href = contents;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
    }
}

// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}

function _checkListenersSame(target0, type0, listener0, optionsOrUseCapture0,
        target1, type1, listener1, optionsOrUseCapture1) {
    const capture0 = Boolean(optionsOrUseCapture0 instanceof Object
            ? optionsOrUseCapture0.capture : optionsOrUseCapture0);
    const capture1 = Boolean(optionsOrUseCapture1 instanceof Object
            ? optionsOrUseCapture1.capture : optionsOrUseCapture1);
    return target0 === target1 && type0 === type1 && listener0 === listener1
            && capture0 === capture1;
}

/**
 * Add the specified event listener to the specified target. This function also
 * stores listener data for easier disposing.
 */
function bindListener(target, type, listener, optionsOrUseCapture) {
    const alreadyExists = _pGlob.eventListeners.some(elem => {
        return _checkListenersSame(elem.target, elem.type, elem.listener,
                elem.optionsOrUseCapture, target, type, listener,
                optionsOrUseCapture);
    });

    if (!alreadyExists) {
        target.addEventListener(type, listener, optionsOrUseCapture);
        _pGlob.eventListeners.push({ target, type, listener, optionsOrUseCapture });
    }
}

// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;

        bindListener(elem, eventType, callback);
    }
}

// autoRotateCamera puzzle
function autoRotateCamera(enabled, speed) {

    if (appInstance.controls && appInstance.controls instanceof v3d.OrbitControls) {
        appInstance.controls.autoRotate = enabled;
        appInstance.controls.autoRotateSpeed = speed;
    } else {
        console.error('autorotate camera: Wrong controls type');
    }
}


  /* 适配苹果与移动设备的渲染精度 */
  if (featureAvailable('RETINA') || featureAvailable('MOBILE') || featureAvailable('MACOS')) {
    setScreenScale(2);
  }
  /* 默认相机阻尼，需要安装插件 */
  inertia = 0.2;
  orbitControlsSetProp('zoomInertia',inertia);
  orbitControlsSetProp('rotateInertia',inertia);
  orbitControlsSetProp('rotateInertia',inertia);
  orbitControlsSetProp('zoomInertiaTouch',inertia);
  orbitControlsSetProp('rotateInertiaTouch',inertia);
/* 默认相机开场动画 */
tweenCamera('Camera_Start', 'Camera_Target', 1, function() {}, 1);

  /* Q键截图 */
  eventHTMLElem('keyup', ['DOCUMENT'], false, function(event) {
    if (getEventProperty('key', event) == 'q' || getEventProperty('key', event) == 'Q') {
      downloadFile(appInstance.renderer.domElement.toDataURL('image/png'), 'screenshot.png');
    }
  });

eventHTMLElem('click', ['BODY'], true, function(event) {
  console.log(getEventProperty('target.id', event));
});

eventHTMLElem('click', 'Camera_Front', true, function(event) {
  tweenCamera('Camera_Front', 'Camera_Target', 0.6, function() {}, 1);
});
eventHTMLElem('click', 'Camera_Left', true, function(event) {
  tweenCamera('Camera_Left', 'Camera_Target', 0.6, function() {}, 1);
});
eventHTMLElem('click', 'Camera_Top', true, function(event) {
  tweenCamera('Camera_Top', 'Camera_Target', 0.6, function() {}, 1);
});

StateRotate = false;
eventHTMLElem('click', 'AutoRotate', true, function(event) {
  if (!StateRotate) {
    autoRotateCamera(true, -0.5);
    StateRotate = true;
  } else {
    autoRotateCamera(false, -0.5);
    StateRotate = false;
  }
});



} // end of PL.init function

PL.disposeListeners = function() {
    if (_pGlob) {
        _pGlob.eventListeners.forEach(({ target, type, listener, optionsOrUseCapture }) => {
            target.removeEventListener(type, listener, optionsOrUseCapture);
        });
        _pGlob.eventListeners.length = 0;
    }
}

PL.dispose = function() {
    PL.disposeListeners();
    _pGlob = null;
    // backward compatibility
    if (v3d[Symbol.toStringTag] !== 'Module') {
        delete v3d.PL;
        delete v3d.puzzles;
    }
}



return PL;

}

export { createPL };
