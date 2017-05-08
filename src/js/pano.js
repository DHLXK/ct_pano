var imgSrc = './dist/img/'+ location.hash.slice(1) ;
var camera, scene, renderer;//定义相机、环境、渲染器
var cameraFov;
var canvas_placeholder,
isUserInteracting = false,//设置是否开启手动转动
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 90, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
target = new THREE.Vector3();

init();
animate();

function init() {

	var container, mesh;

	container = document.getElementById( 'container' );
	/*设置相机
	（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
	*/
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
	/*开启3D环境*/
	scene = new THREE.Scene();

	canvas_placeholder = document.createElement( 'canvas' );
	canvas_placeholder.width = 128;
	canvas_placeholder.height = 128;

	var context = canvas_placeholder.getContext( '2d' );
	context.fillStyle = 'rgb( 200, 200, 200 )';
	context.fillRect( 0, 0, canvas_placeholder.width, canvas_placeholder.height );

	var materials = [

		loadTexture( imgSrc+'/right.jpg' ), // right
		loadTexture( imgSrc+'/left.jpg' ), // left
		loadTexture( imgSrc+'/top.jpg' ), // top
		loadTexture( imgSrc+'/bottom.jpg' ), // bottom
		loadTexture( imgSrc+'/front.jpg' ), // back
		loadTexture( imgSrc+'/back.jpg' ) // front

	];

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
	mesh.scale.x = - 1;
	scene.add( mesh );
	/*渲染器加载,以及设置渲染大小*/
	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	/*绑定点击和触摸事件*/
	document.addEventListener( 'mousedown', mouseDown, false );
	document.addEventListener( 'mousemove', mouseMove, false );
	document.addEventListener( 'mouseup', mouseUp, false );
	document.addEventListener( 'wheel', mouseWheel, false );

	document.addEventListener( 'touchstart', touchStart, false );
	document.addEventListener( 'touchmove', touchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function loadTexture( path ) {

	var texture = new THREE.Texture( canvas_placeholder );
	var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

	var image = new Image();
	image.onload = function () {

		texture.image = this;
		texture.needsUpdate = true;

	};
	image.src = path;

	return material;

}

function mouseDown( event ) {

	event.preventDefault();

	isUserInteracting = true;

	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function mouseMove( event ) {

	if ( isUserInteracting === true ) {

		lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}

}

function mouseUp( event ) {

	isUserInteracting = false;

}

function mouseWheel( event ) {
	camera.fov += event.deltaY * 0.05;
	if(camera.fov < 40 || camera.fov > 80){
		camera.fov = cameraFov;
	}
	camera.updateProjectionMatrix();
	console.log(camera.fov);
	cameraFov = camera.fov;
}	


function touchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		onPointerDownPointerX = event.touches[ 0 ].pageX;
		onPointerDownPointerY = event.touches[ 0 ].pageY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;

	}

}

function touchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
		lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}

}

function animate() {

	requestAnimationFrame( animate );
	update();

}

function update() {

	if ( isUserInteracting === false ) {

		// lon += 0.1;  自动旋转
		//lon = Math.max(-180, Math.min(180, lon));//限制固定角度内旋转
		lon += 0;

	}

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );

	target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	target.y = 500 * Math.cos( phi );
	target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( target );

	renderer.render( scene, camera );

}
