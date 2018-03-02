var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');

// Bullets array
var bullets = [];

var objects = [];
var killerList = [];

var scene, camera, renderer, mesh, clock;
var meshFloor, ambientLight, light;


var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    box: new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({color: 0x4444ff})
    )
};
var loadingManager = null;
var RESOURCES_LOADED = false;

//################################################# Claidson
//peaos

var robsonA = 'bots/robson.png';
var robsonB = 'bots/robson2.png';
var robsonC = 'bots/robson3.png';
var robsonD = 'bots/robson4.png';
var perinA = 'bots/perin.png';
var perinB = 'bots/perin2.png';
var perinC = 'bots/perinD.png';
var perinD = 'bots/perinTr.png';
var vilson = 'bots/vilson.png';
var vilsonB = 'bots/vilson2.png';
var wilsonA = 'bots/wilson.png';
var wilsonB = 'bots/wilson2.png';
var edA = 'bots/ed.png';
var edB = 'bots/ed2.png';
var edC = 'bots/ed3.png';
var alemao = 'bots/alemao.png';
var alemaoB = 'bots/alemaoP.png';
var torto = 'bots/emilinguido.png';
var marromA = 'bots/marron.png';
var brancoA = 'bots/branco.png';
var neginA = 'bots/negin.png';
var renasA = 'bots/renas.png';

// gera malandro
function geraProfessor(posX, posZ, figura) {
    var texture = new THREE.ImageUtils.loadTexture(figura);
    texture.needsUpdate = true;
    var material = new THREE.SpriteMaterial({
        map: texture,
        useScreenCoordinates: false,
        transparent: true
    });
    var sprite = new THREE.Sprite(material);
    sprite.scale.set(5, 5, 1);
    sprite.position.y = 2;
    sprite.position.x = posX;
    sprite.position.z = posZ;
    return sprite;
}

//os caras
var perin1 = geraProfessor(2, -10, perinA);
var perin2 = geraProfessor(4, 35, perinB);
var perin3 = geraProfessor(92, -4, perinC);
var perin4 = geraProfessor(8, -24, perinD);
var robson1 = geraProfessor(-10, -10, robsonA);
var robson2 = geraProfessor(-40, -40, robsonB);
var robson3 = geraProfessor(14, 36, robsonC);
var robson4 = geraProfessor(16, -60, robsonD);
var vilson1 = geraProfessor(18, -10, vilson);
var vilson2 = geraProfessor(40, -80, vilsonB);
var wilson1 = geraProfessor(22, -44, wilsonA);
var winson2 = geraProfessor(90, -70, wilsonB);
var ed1 = geraProfessor(42, -44, edA);
var ed2 = geraProfessor(90, -44, edB);
var ed3 = geraProfessor(22, 15, edC);
var alemao1 = geraProfessor(-38, -50, alemao);
var alemao2 = geraProfessor(-36, -52, alemaoB);
var torto1 = geraProfessor(-40, -55, torto);
var marron1 = geraProfessor(20, -10, marromA);
var branco1 = geraProfessor(-15, -12, brancoA);
var negin1 = geraProfessor(36, -56, neginA);
var renas1 = geraProfessor(-38, -45, renasA);
var arrayProfessor = [];
arrayProfessor.push(renas1, perin1, perin2, perin3, perin4, robson1, robson2, robson3, robson4, vilson1, wilson1, winson2, vilson2, ed1, ed2, ed3, alemao1, torto1, marron1, branco1, negin1, alemao2);


function adicionaElementos() {

    for (var i = 0; i < arrayProfessor.length; i++) {
        scene.add(arrayProfessor[i]);
        killerList.push(arrayProfessor[i]);
    }
}

//################################################# Claidson

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 0);
    clock = new THREE.Clock();

    loadingScreen.box.position.set(0, 1, -5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);

    loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function (item, loaded, total) {
    };
    loadingManager.onLoad = function () {
        RESOURCES_LOADED = true;
    };

//http://www.html5rocks.com/en/tutorials/pointerlock/intro/
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if (havePointerLock) {
        var element = document.body;
        var pointerlockchange = function (event) {
            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                controlsEnabled = true;
                controls.enabled = true;
                blocker.style.display = 'none';
                var shooterImg = document.getElementById('shooterImg');
                shooterImg.style.visibility = 'visible';
            } else {
                controls.enabled = false;
                blocker.style.display = 'block';
                instructions.style.display = '';
                var shooterImg = document.getElementById('shooterImg');
                shooterImg.style.visibility = 'hidden';
            }
        };
        var pointerlockerror = function (event) {
            instructions.style.display = '';
        };
        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
        document.addEventListener('pointerlockerror', pointerlockerror, false);
        document.addEventListener('mozpointerlockerror', pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
        instructions.addEventListener('click', function (event) {
            instructions.style.display = 'none';
            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();
        }, false);

    } else {
        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }


    controls = new THREE.PointerLockControls(camera);
    controls.getObject().position.set(0, 1, 0);

    scene.add(controls.getObject());
    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;
            case 37: // left
            case 65: // a
                moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                break;
            case 32: // space
                if (canJump === true) {
                    velocity.y = 50;
                }
                canJump = false;
                break;
        }
    };
    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;
            case 37: // left
            case 65: // a
                moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 1);

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);


    var maxAnisotropy = renderer.getMaxAnisotropy();
    var textureLoader = new THREE.TextureLoader();
    var texture1 = textureLoader.load("texturas/lajota.png");
    var material1 = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture1});
    texture1.anisotropy = maxAnisotropy;
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(512, 512);

    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300, 100, 100),
        material1
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;

    scene.add(meshFloor);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    //objects.push(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(25, 300, 95);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;

    scene.add(light);
    //objects.push(light);

    //Fernando
    //Gera Predio
    function gerarPredio(x, z, material, largura, comprimento, altura, y) {
        var boxGeometria = new THREE.BoxGeometry(largura, altura, comprimento, 1, 1, 1);
        var box = new THREE.Mesh(boxGeometria, new THREE.MeshFaceMaterial(material));
        box.position.x = x;
        if (y == 0) {
            box.position.y = altura / 2;
        } else {
            box.position.y = y;
        }

        box.position.z = z;
        box.castShadow = true;
        box.receiveShadow = true;
        return box;
    }

    function gerarPredioCorUnica(x, z, material, largura, comprimento, altura, y) {
        var boxGeometria = new THREE.BoxGeometry(largura, altura, comprimento);
        var box = new THREE.Mesh(boxGeometria, material);
        box.position.x = x;
        if (y == 0) {
            box.position.y = altura / 2;
        } else {
            box.position.y = y;
        }

        box.position.z = z;
        box.castShadow = true;
        box.receiveShadow = true;
        return box;
    }


    // Cria material
    function createMaterial(path, l, a) {

        var texture = THREE.ImageUtils.loadTexture(path);

        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set(l, a);
        return material;

    }

    //Texturas
    var textura_branca = new THREE.MeshPhongMaterial({color: 0xffffff});
    var textura_verde = new THREE.MeshPhongMaterial({color: 0x22aa22});


//Gera o material com textura em cada face
    var cenario = [

        createMaterial('texturas/mundo_direita.png', 1, 1),// esquerda

        createMaterial('texturas/mundo_esquerda.png', 1, 1),// direita

        createMaterial('texturas/mundo_cima.png', 1, 1),// cima

        textura_branca, // baixo

        createMaterial('texturas/mundo_fundos.png', 1, 1), // fundos

        createMaterial('texturas/mundo_frente.png', 1, 1) // frente

    ];
    var bloco1 = [

        createMaterial('texturas/parede_branca.png', 1, 5),// esquerda

        createMaterial('texturas/parede_branca.png', 1, 5),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_ifsc_2.png', 5, 1), // fundos

        createMaterial('texturas/parede_ifsc_2.png', 5, 1) // frente

    ];
    var bloco1_mid = [

        createMaterial('texturas/parede_branca.png', 1, 5),// esquerda

        createMaterial('texturas/parede_branca.png', 1, 5),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_ifsc_1.png', 1, 1), // fundos

        createMaterial('texturas/parede_ifsc_1.png', 1, 1) // frente

    ];
    var bloco2 = [

        createMaterial('texturas/parede_ifsc_2.png', 5, 1),// esquerda

        createMaterial('texturas/parede_ifsc_2.png', 5, 1),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_branca.png', 1, 5), // fundos

        createMaterial('texturas/parede_branca.png', 1, 5) // frente

    ];
    var bloco2_mid = [

        createMaterial('texturas/parede_ifsc_1.png', 1, 1),// esquerda

        createMaterial('texturas/parede_ifsc_1.png', 1, 1),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_branca.png', 1, 5), // fundos

        createMaterial('texturas/parede_branca.png', 1, 5) // frente

    ];
    var bloco3 = [

        createMaterial('texturas/parede_branca.png', 1, 5),// esquerda

        textura_branca,// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_ifsc_3.png', 1, 1), // fundos

        createMaterial('texturas/parede_ifsc_3.png', 1, 1) // frente

    ];
    var bloco4 = [

        createMaterial('texturas/parede_ifsc_3.png', 1, 1),// esquerda

        createMaterial('texturas/parede_ifsc_3.png', 1, 1),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_branca.png', 1, 5), // fundos

        textura_branca // frente

    ];
    var bloco5 = [

        createMaterial('texturas/parede_barracao_esquerda.png', 1, 1),// esquerda

        createMaterial('texturas/parede_branca.png', 1, 5),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_branca.png', 1, 5), // fundos

        createMaterial('texturas/parede_branca.png', 1, 5) // frente

    ];
    var bloco6 = [

        createMaterial('texturas/parede_lanchonete.png', 1, 1),// esquerda

        createMaterial('texturas/parede_branca.png', 1, 5),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_branca.png', 1, 5), // fundos

        createMaterial('texturas/parede_branca.png', 1, 5) // frente

    ];
    var bloco7 = [

        createMaterial('texturas/parede_verde.png', 1, 1),// esquerda

        createMaterial('texturas/parede_verde.png', 1, 1),// direita

        textura_branca,// cima

        createMaterial('texturas/parede_branca.png', 5, 5), // baixo

        createMaterial('texturas/parede_verde.png', 1, 1), // fundos

        createMaterial('texturas/parede_verde.png', 1, 1) // frente

    ];

    var blocoTeste = [

        createMaterial('texturas/parede_verde.png', 1, 1),// esquerda

        createMaterial('texturas/parede_verde.png', 1, 1),// direita

        textura_branca,// cima

        createMaterial('texturas/parede_branca.png', 5, 5), // baixo

        createMaterial('texturas/parede_verde.png', 1, 1), // fundos

        createMaterial('texturas/parede_verde.png', 1, 1) // frente

    ];

    var bloco8 = [

        textura_branca,// esquerda

        textura_branca,// direita

        createMaterial('texturas/piso_lanchonete.png', 10, 10),// cima

        textura_branca, // baixo

        textura_branca, // fundos

        textura_branca // frente

    ];
    var pilar = [

        createMaterial('texturas/parede_branca.png', 1, 1),// esquerda

        createMaterial('texturas/parede_branca.png', 1, 1),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_branca.png', 1, 1), // fundos

        createMaterial('texturas/parede_branca.png', 1, 1) // frente

    ];
    var bloco9 = [

        createMaterial('texturas/parede_entrada_esquerda.png', 1, 1),// esquerda

        createMaterial('texturas/parede_entrada_direita.png', 1, 1),// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_entrada_fundos.png', 1, 1), // fundos

        createMaterial('texturas/parede_entrada_direita.png', 1, 1) // frente

    ];
    var bloco10 = [

        createMaterial('texturas/parede_entrada_cima_esquerda.png', 1, 1),// esquerda

        createMaterial('texturas/parede_entrada_cima_direita.png', 1, 1),// direita

        textura_branca,// cima

        createMaterial('texturas/parede_branca.png', 1, 1), // baixo

        createMaterial('texturas/parede_entrada_cima_fundos.png', 1, 1), // fundos

        createMaterial('texturas/parede_entrada_cima_frente.png', 1, 1) // frente

    ];
    var bloco11 = [

        textura_branca,// esquerda

        textura_branca,// direita

        textura_branca,// cima

        textura_branca, // baixo

        createMaterial('texturas/parede_corredor.png', 1, 1), // fundos

        createMaterial('texturas/parede_corredor_porta_1.png', 1, 1) // frente

    ];
    var bloco12 = [

        createMaterial('texturas/parede_corredor.png', 1, 1),// esquerda

        createMaterial('texturas/parede_corredor_porta_2.png', 1, 1),// direita

        textura_branca,// cima

        textura_branca, // baixo

        textura_branca, // fundos

        textura_branca // frente

    ];


    //cenario
    var mundo = gerarPredio(0, 0, cenario, 300, 300, 100, 49);
    mundo.scale.set(-1, 1, 1);
    scene.add(mundo);
    objects.push(mundo);

    //Adiciona Predio
    var parede = gerarPredio(-64.2, -44, bloco6, 25, 25, 6, 0);
    var parede1 = gerarPredio(-60.2, -7.7, bloco5, 35, 35, 10, 0);
    var parede2 = gerarPredio(-3, 13, bloco1, 60, 35, 12, 0);
    var parede3 = gerarPredio(-3, 13, bloco1_mid, 12, 40, 12, 0);
    var parede4 = gerarPredio(30, 13, bloco3, 6, 30, 12, 0);
    var parede5 = gerarPredio(39.5, 16, bloco11, 15, 10, 15, 0);
    var parede6 = gerarPredio(67, 15.5, bloco9, 40, 30, 4, 0);
    var parede7 = gerarPredio(67, -7, bloco12, 10.4, 15, 15, 0);
    var parede8 = gerarPredio(67, -14, bloco4, 30, 6, 12, 0);
    var parede9 = gerarPredio(67, -47, bloco2, 35, 60, 12, 0);
    var parede10 = gerarPredio(67, -47, bloco2_mid, 40, 12, 12, 0);
    //var parede11 = gerarPredioCorUnica(-68, 14.2, textura_branca, 20, 10, 7, 0);
    //var parede12 = gerarPredioCorUnica(-68, 24.2, textura_branca, 20, 10, 7, 0);
    //var parede13 = gerarPredioCorUnica(-54.5, 36.7, textura_branca, 7, 15, 7, 0);
    var parede14 = gerarPredio(72, 58.5, blocoTeste, 30, 30, 7, 0);
    //Marquise
    var parede15 = gerarPredioCorUnica(-3, 13, textura_verde, 63, 38, 3, 13.5);
    var parede16 = gerarPredioCorUnica(-3, 13, textura_verde, 15, 43, 3, 13.5);
    var parede17 = gerarPredioCorUnica(67, -47, textura_verde, 38, 63, 3, 13.5);
    var parede18 = gerarPredioCorUnica(67, -47, textura_verde, 43, 15, 3, 13.5);
    var parede19 = gerarPredio(64.3, 13, bloco10, 45, 35, 10.5, 9.2);
    var parede20 = gerarPredioCorUnica(30, 13, textura_verde, 10, 33, 3, 13.5);
    var parede21 = gerarPredioCorUnica(67, -14, textura_verde, 33, 10, 3, 13.5);
    var parede22 = gerarPredio(-60.2, -44, bloco7, 35, 25, 3, 7.5);
    var parede23 = gerarPredio(-59.2, -44, bloco8, 32.8, 24.9, 0.2, 0);
    var parede24 = gerarPredio(-43.3, -32, pilar, 0.8, 0.8, 6, 0);
    var parede25 = gerarPredio(-43.3, -56, pilar, 0.8, 0.8, 6, 0);
    var parede26 = gerarPredio(-43.3, -44, pilar, 0.8, 0.8, 6, 0);


    parede.name = "parede";
    parede1.name = "parede1";
    parede2.name = "parede2";
    parede3.name = "parede3";
    parede4.name = "parede4";
    parede5.name = "parede5";
    parede6.name = "parede6";
    parede7.name = "parede7";
    parede8.name = "parede8";
    parede9.name = "parede9";
    parede10.name = "parede10";
    //parede11.name = "parede11";
    //parede12.name = "parede12";
    //parede13.name = "parede13";
    parede14.name = "parede14";
    parede15.name = "parede15";
    parede16.name = "parede16";
    parede17.name = "parede17";
    parede18.name = "parede18";
    parede19.name = "parede19";
    parede20.name = "parede20";
    parede21.name = "parede21";
    parede22.name = "parede22";
    parede23.name = "parede23";
    parede24.name = "parede24";
    parede25.name = "parede25";
    parede26.name = "parede26";

    scene.add(parede);
    scene.add(parede1);
    scene.add(parede2);
    scene.add(parede3);
    scene.add(parede4);
    scene.add(parede5);
    scene.add(parede6);
    scene.add(parede7);
    scene.add(parede8);
    scene.add(parede9);
    scene.add(parede10);
    //scene.add(parede11);
    //scene.add(parede12);
    //scene.add(parede13);
    scene.add(parede14);
    scene.add(parede15);
    scene.add(parede16);
    scene.add(parede17);
    scene.add(parede18);
    scene.add(parede19);
    scene.add(parede20);
    scene.add(parede21);
    scene.add(parede22);
    scene.add(parede23);
    scene.add(parede24);
    scene.add(parede25);
    scene.add(parede26);

    objects.push(parede);
    objects.push(parede1);
    objects.push(parede2);
    objects.push(parede3);
    objects.push(parede4);
    objects.push(parede5);
    objects.push(parede6);
    objects.push(parede7);
    objects.push(parede8);
    objects.push(parede9);
    objects.push(parede10);
    //objects.push(parede11);
    //objects.push(parede12);
    //objects.push(parede13);
    objects.push(parede14);
    objects.push(parede15);
    objects.push(parede16);
    objects.push(parede17);
    objects.push(parede18);
    objects.push(parede19);
    objects.push(parede20);
    objects.push(parede21);
    objects.push(parede22);
    objects.push(parede23);
    objects.push(parede24);
    objects.push(parede25);
    objects.push(parede26);

    adicionaElementos();
}

var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();


function mouseClick(event) {

    if (controls.getObject().position != null) {
        event.preventDefault();
        // creates a bullet as a Mesh object
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 50, 50),
            new THREE.MeshBasicMaterial({color: 0x6eff00})
        );

        // position the bullet to come from the player's weapon
        bullet.position.set(
            controls.getObject().position.x,
            controls.getObject().position.y + 1.0,
            controls.getObject().position.z
        );
        // set the velocity of the bullet
        bullet.velocity = new THREE.Vector3(
            -Math.sin(controls.getObject().rotation.y) * 2.0,
            0,
            -Math.cos(controls.getObject().rotation.y) * 2.0
        );

        bullet.velocity = controls.getDirection(bullet.velocity);

        bullet.alive = true;
        setTimeout(function () {
            bullet.alive = false;
            scene.remove(bullet);
        }, 15000);

        // add to scene, array, and set the delay to 10 frames
        bullets.push(bullet);
        scene.add(bullet);

    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function killTeacher() {
    for (var x = 0; x < bullets.length; x++) {
        if (bullets[x] === undefined) continue;
        if (bullets[x].alive == false) {
            bullets.splice(x, 1);
            continue;
        }

        var demo = new THREE.Raycaster(bullets[x].position, controls.getObject().position, 0, 1);

        var intersectElements = demo.intersectObjects(killerList, true);
        if (intersectElements.length != 0) {
            bullets[x].position.add(bullets[x].velocity);
            for (var k = 0; k < intersectElements.length; k++) {
                scene.remove(intersectElements[k].object);
            }
            bullets[x].alive = false;
            scene.remove(bullets[x]);
        } else {
            bullets[x].position.add(bullets[x].velocity);
        }
    }
}

init();

animate();


function animate() {



    if (controlsEnabled === true) {

        killTeacher();
        for (var x = 0; x < objects.length; x++) {
            var raycaster = new THREE.Raycaster(objects[x].position, camera.position, 0, 1);
            var intersections = raycaster.intersectObjects(objects, true);
            var onObject = intersections.length > 0;
            var time = performance.now();
            var delta = (time - prevTime) / 1000;


            if (onObject === true) {
                velocity.y = Math.max(0, velocity.y);
                canJump = true;
            } else {
                velocity.x -= velocity.x * 10.0 * delta;
                velocity.z -= velocity.z * 10.0 * delta;
                velocity.y -= 9.8 * 14.28 * delta; // 100.0 = mass
                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveLeft) - Number(moveRight);
                direction.normalize(); // this ensures consistent movements in all directions
                if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
                if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
                controls.getObject().translateX(velocity.x * delta);
                controls.getObject().translateY(velocity.y * delta);
                controls.getObject().translateZ(velocity.z * delta);
            }

            if (controls.getObject().position.y < 1) {
                velocity.y = 0;
                controls.getObject().position.y = 1;
                canJump = true;
            }
            prevTime = time;

        }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


document.addEventListener('mousedown', mouseClick, false);

