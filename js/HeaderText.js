var renderer, scene, camera;
var time = 500.0;
var scrollPos = 0.0;
var scrollVel = 0.0;

var mesh, textMeshes, uniforms, scaleForMobile;

var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;

var loader = new THREE.FontLoader();
loader.load( 'WebAssets/fonts/SharpSansNo1Medium_Regular.json', function ( font ) {

	init( font );
	animate();

} );

function init( font ) {

	camera = new THREE.PerspectiveCamera( 10, WIDTH / HEIGHT, 1, 10000 );
	camera.position.set( -0, 0, 1600 );

//	controls = new THREE.TrackballControls( camera );

	scene = new THREE.Scene();

	//

	var positions;
	if (window.innerWidth > window.innerHeight) {
		positions = [ -120, 18,  -120, -18,  5,  120, 18, 120, -18];
		scaleForMobile = 1.0;
	} else {
		positions = [ 0, 85,  0, 50,  0,  0, -50, 0, -85];
		scaleForMobile = 3.0;
	}
	

	textMeshes = new THREE.Object3D();

	mesh = createText( "Computer", font );
	mesh.position.x = positions[0];
	mesh.position.y = positions[1];
	textMeshes.add( mesh );

	mesh = createText( "Graphics", font );
	mesh.position.x = positions[2];
	mesh.position.y = positions[3];
	textMeshes.add( mesh );

	mesh = createText( "&", font );
	mesh.position.x = positions[4];
	textMeshes.add( mesh );

	mesh = createText( "Pretty", font );
	mesh.position.x = positions[5];
	mesh.position.y = positions[6];
	textMeshes.add( mesh );

	mesh = createText( "Pictures", font );
	mesh.position.x = positions[7];
	mesh.position.y = positions[8];
	textMeshes.add( mesh );

	textMeshes.scale.x = scaleForMobile*window.innerWidth/1500.0;
	textMeshes.scale.y = scaleForMobile*window.innerWidth/1500.0;
	textMeshes.scale.z = scaleForMobile*window.innerWidth/1500.0;

	scene.add( textMeshes );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x050505 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );

	var container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );


	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function createText( text, font ) {

var geometry = new THREE.TextGeometry( text, {

		font: font,

		size: 28,
		height: 5,
		curveSegments: 7,

		bevelThickness: 2,
		bevelSize: 1,
		bevelEnabled: true

	});

	geometry.center();

	var tessellateModifier = new THREE.TessellateModifier( 12 );

	for ( var i = 0; i < 15; i ++ ) {

		tessellateModifier.modify( geometry );

	}

	var explodeModifier = new THREE.ExplodeModifier();
	explodeModifier.modify( geometry );

	var numFaces = geometry.faces.length;

	//

	geometry = new THREE.BufferGeometry().fromGeometry( geometry );

	var colors = new Float32Array( numFaces * 3 * 3 );
	var displacement = new Float32Array( numFaces * 3 * 3 );

	var color = new THREE.Color();

	for ( var f = 0; f < numFaces; f ++ ) {

		var index = 9 * f;

		var h = 0.6 +  0.2* Math.random();
		var s = 0.4 + 0.3 * Math.random();
		var l = 0.7 + 0.2 * Math.random();

		color.setHSL( h, s, l );

		var d = 10 * ( 0.5 - Math.random() );

		for ( var i = 0; i < 3; i ++ ) {

			colors[ index + ( 3 * i )     ] = color.r;
			colors[ index + ( 3 * i ) + 1 ] = color.g;
			colors[ index + ( 3 * i ) + 2 ] = color.b;

			displacement[ index + ( 3 * i )     ] = d;
			displacement[ index + ( 3 * i ) + 1 ] = d;
			displacement[ index + ( 3 * i ) + 2 ] = d;

		}

	}

	geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
	geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

	//

	uniforms = {

		amplitude: { value: 0.0 },
		gTime: { value: 0.0 }

	};

	var shaderMaterial = new THREE.ShaderMaterial( {

		uniforms:       uniforms,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		transparent: true,
		opacity: 0.2

	});

	//

	mesh = new THREE.Mesh( geometry, shaderMaterial );

	return mesh;
}

function onWindowResize() {

	camera.aspect = window.innerWidth / (window.innerHeight);
	camera.updateProjectionMatrix();
	textMeshes.scale.x = scaleForMobile*window.innerWidth/1500.0;
	textMeshes.scale.y = scaleForMobile*window.innerWidth/1500.0;
	textMeshes.scale.z = scaleForMobile*window.innerWidth/1500.0;

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	time += 0.008;

	var scrollExact = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	var scrollDif = scrollPos - scrollExact;
	scrollVel += 0.2 * scrollDif
	scrollPos -= 0.3 * srollVel;

	textMeshes.rotation.x = 0.0002*scrollPos; 
	textMeshes.position.y = 0.07*scrollPos; 
	textMeshes.traverse( function(current) {
		if (current.type === 'Mesh') {

			current.material.uniforms.amplitude.value = 0.08*scrollPos; //1.0 + Math.sin( time * 0.5 );
			current.material.uniforms.gTime.value = time;
		}
		
	} );


//	controls.update();

	renderer.render( scene, camera );

}
