var firstTimePhrases = [
                          'Mmm, qué olor a pito. Te hubieses lavado los dientes por lo menos.', 
                          'Wow sos un boludo que piensa que un micrófono puede detectar olores. ¿Qué te pensás, que estamos en el 2025? Forro.', 
                          'Su soplido ha sido guardado con éxito. En 25 años lo vamos a clonar y alimentar a base de vitel toné'
  ];
                        
var otherPhrases = [
                  'No le cuentes a nadie que acabás de hacer esto porque vas quedar como un pelotudo.', 
                  'Qué bien que soplás, deberías tocar la trompeta.', 
                  'Ah, vos soplás cualquier cosa que te pongan enfrente.',
                  'Felicitaciones, sos el soplador número 1000. Te ganaste dos entradas para ir a ver Los Soplanos.',
                  'Ahora tenés un poco de tu baba en tu micrófono.',
                  'Te salió 0,25 mg de pelotudo en sangre.',
                  'Estás libre de vitel toné. No. No es un error. Si comiste vitel toné y no te dio positivo, es porque técnicamente estaba mal la receta.',
                  'Tu aliento a vitel toné no pudo ser procesado. Volvé a soplar pero como diciendo la letra “A” en secreto, tipo el sonido de los estadios alentando. Gracias.',
                  'Tenés que ir al dentista, se nota. Buscá en Google al Dr. Mendelbaum. Es muy bueno.',
                  'Pasaste el test de viteltonemia pero vas a tener que hacer el de pionononemia'        
                  ];

var finalPhrase = 'Bueno, ya está. Andá un ratito con tu familia. <br><br> Si no querés ser el único pelotudo que haya hecho esto, pasáselo a un amigo.';

var context,
    enabledToProccess = false,
    isRunning         = false,
    successFull       = false
    phraseCounter     = 0,
    finished          = false,
    errorCunter       = 0;

var CookiesOMG = Cookies.noConflict();

function canvasFillRect(leftX, topY, width, height) {
  var gradient = getCanvas().getContext('2d').createLinearGradient(0,0,0,300);
  gradient.addColorStop(1,'#656565');
  gradient.addColorStop(0.75,'#656565');
  gradient.addColorStop(0.25,'#CCC');
  gradient.addColorStop(0,'#656565');
  getCanvas().getContext('2d').fillStyle=gradient;
  getCanvas().getContext('2d').fillRect(leftX, topY, width, height);
}

function canvasInitialize(width, height) {
  getCanvas().getContext('2d').strokeStyle='#00FF00';
  
  // Set canvas parameters
  getCanvas().width = width;
  getCanvas().height = height;

  // Outline
  getCanvas().getContext('2d').clearRect(0,0,width,height);
  getCanvas().getContext('2d').rect(0,0,width,height);
  getCanvas().getContext('2d').stroke();
}

function onSuccess(stream) {
  // console.log(stream);
  // stream -> mediaSource -> javascriptNode -> destination
  context = new AudioContext();
  var mediaStreamSource = context.createMediaStreamSource(stream);
  var analyser = context.createAnalyser();
  
  analyser.smoothingTimeConstant = 0.3;
  analyser.fftSize = 2048;
  
  var javascriptNode = context.createScriptProcessor(2048, 1, 1);
  
  mediaStreamSource.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(context.destination);
  
  javascriptNode.onaudioprocess = createProcessBuffer(analyser);
}

function createProcessBuffer(analyser) {

  var fftData = 0;
  return function processBuffer(fftData) {
  // console.log('transmiting...');
  var fftData = 0;
  
  fftData =  new Uint8Array(analyser.frequencyBinCount);
    // console.log(fftData);

        analyser.getByteFrequencyData(fftData);
    
    var width = $('#canvasContainer').width();
    // console.log();
    // clear canvas and draw border
    canvasInitialize(width,300);
    
  
    var average = 0;
    var length = fftData.length;
    for(var i=0; i < length; i++) {
      var sample = fftData[i];
      canvasFillRect(i*5, 250-sample, 3, sample);
      average = average + sample;
    }
    // console.log(analyser.fftSize);
    average = average/length;

    if (enabledToProccess) {
      if (average > 25) {
        runCountDown();
      } 
      else {
        stopCountDown();
      }        
    }
  }

    // getLog().innerHTML = 'FFT Length:'+fftData.length + ' Average:' + average + '\n<br>';
}

function onError() {
  $('#howTo').html('<strong>Error:</strong> Necesitamos usar tu micrófono').addClass('animated fadeInDown show');
  $('#howTo2').removeClass('show').addClass('hide');
}

// function getLog() {
//   return document.getElementById('mylog');
// }

function getCanvas() {
  return document.getElementById('breath');
} 
  
function appStart() {
  $('#home').addClass('animated fadeOutRight hide');

  // Preparando test...
  $('#loader').removeClass('hide').addClass('fadeInUpBig show')
  
  setTimeout(function () {
    $('#loader').removeClass('fadeInDownBig show').addClass('fadeOutUpBig hide');
    $('#howTo').html('Acercate bien al micrófono y soplá constante durante 3 segundos').addClass('animated fadeInDown show');
    $('#howTo2').addClass('animated fadeInDown show');
    $('#breath').addClass('animated fadeInUp show');

    var dataObject = {video: false, audio: true}; // dataObject.video, dataObject.audio
    if(navigator.getUserMedia) {
          navigator.getUserMedia(dataObject, onSuccess, onError);
    } else if(navigator.webkitGetUserMedia) {
          navigator.webkitGetUserMedia(dataObject, onSuccess, onError);
    }    
  }, 3000);
}


function runCountDown () {
  if (!isRunning) {
    // console.log('Inicia contador');
    isRunning = true;
    // console.log('creamos timeoutId');
    timeoutId = setTimeout(badBreath, 1000); 
  } 
}

function stopCountDown () {
  if (isRunning) {
    isRunning = false;
    clearTimeout(timeoutId);
    // console.log('clearTimeout y isRunning:', isRunning);
    
    if (!successFull) {
      if (errorCunter === 0) {
        $('#howTo').removeClass('fadeInDown').addClass('shake');
        errorCunter++;
      } else {
        if ($('#howTo').hasClass('shake')) {
          $('#howTo').removeClass('shake').addClass('flash');
        } else {
          $('#howTo').removeClass('flash').addClass('shake');
        }
      }
      // console.log('soplá 3 segundos seguidos papu!');
      navigator.vibrate(1000);
    }
  } 
}

function badBreath () {
  // console.log('suspendContext');
  successFull = true;
  stopCountDown();
  enabledToProccess = false;
  phraseCounter++;

  // console.log('comprobando counter', counter);
  var counter = CookiesOMG.get('counter');
  counter++;
  CookiesOMG.set('counter', counter);

  if (CookiesOMG.get('counter') == 5) {
    var message = getRandomMessage(otherPhrases);
    otherPhrases.splice($.inArray(message, otherPhrases),1);
    CookiesOMG.set('otherPhrases', otherPhrases);

    var message = message + '<br/><br/>' + finalPhrase;
    finished = true;
  }
  else if (CookiesOMG.get('counter') == 1) {
    var message = getRandomMessage(firstTimePhrases);
    firstTimePhrases.splice($.inArray(message, firstTimePhrases),1);
  }
  else {            
    var message = getRandomMessage(otherPhrases);
    otherPhrases.splice($.inArray(message, otherPhrases),1);
    CookiesOMG.set('otherPhrases', otherPhrases);
  }

  context.close().then(function() {
    $('#howTo').removeClass('fadeInDown show shake flash').addClass('bounceOutUp hide');
    $('#howTo2').removeClass('fadeInDown show').addClass('bounceOutDown hide');
    $('#breath').removeClass('fadeInUp show').addClass('bounceOutUp hide');
    // $('#home').addClass('animated fadeOut hide');
    $('#phrase').html('Estamos procesando tu baba...');
    $('#phrase').addClass('animated bounceInUp show');
    $('#result').addClass('animated bounceInUp show');
    setTimeout(function () {
      $('footer').addClass('bottom');
      $('#result').addClass('bounceInUp show');
      $('#phrase').html(message);
      $('#phrase').removeClass('bounceInUp').addClass('fadeOut').removeClass('fadeOut').addClass('fadeIn')
      $('#twitter').removeClass('hide').addClass('animated fadeInLeftBig show');
      $('#facebook').removeClass('hide').addClass('animated fadeInRightBig show');
      if (finished) {
        $('#finish').addClass('animated fadeInUpBig show');
        $('#links').addClass('animated fadeInDownBig show');
      } else {
        $('#repeat').addClass('animated fadeInUpBig show');
      }
    }, 3000);
  });
}

function getRandomMessage(messages){
  var rand = Math.random();
  var length = messages.length;
  return messages[Math.floor(rand * length)];
  
  // RANDOM LETTERS
  // var text = "";
  // if (firsTime) {
  //   var possible = "abc";
  // } else {
  //   var possible = "abcdefghij";
  // }

  // return possible.charAt(Math.floor(Math.random() * possible.length));
}

jQuery(function ($) {
  var currentBrowser = $.browserDetection(true);

  if (currentBrowser != 'Chrome') {
    $('#browserError').removeClass('hide').addClass('show');
  } else {
    $('#start').removeClass('hide').addClass('show');
  }

  $('#errorRepeat').on('click', function (e) {
    CookiesOMG.set('errorRepeat', 1);
    location.reload();
    e.preventDefault();
  })
  
  $('#twitter, #twitterHome').on('click', function (e) {
    var url = 'http://viteltonemia.com';
    var description = encodeURIComponent('¿Sentís que te comiste a Papá Noel entero? Medí tu concentración de Vitel Toné en sangre acá goo.gl/oZXVZ4')
    var sharer = 'https://twitter.com/intent/tweet?text=' + description + '&hashtags=TestDeViteltonemia';
    window.open(sharer, true, 600, 300);
    e.preventDefault();
  })
  
  $('#facebook, #facebookHome').on('click', function (e) {
    var url = encodeURIComponent('https://perdonemifrances.com.ar/viteltonemia/');
    var title = encodeURIComponent('Perdone mi francés | Test de Viteltonemia');
    var description = encodeURIComponent('Test de Viteltonemia description');
    var image = encodeURIComponent('https://perdonemifrances.com.ar/viteltonemia/img/fb.jpg');


    var sharer = 'https://www.facebook.com/sharer.php?u=' + url;

    window.open(sharer, true, 600, 300);

    e.preventDefault();
  })

  // Check vibration api
  var supportsVibrate = "vibrate" in navigator;

  // counter = CookiesOMG.get('counter');

  var val = CookiesOMG.get('counter');
    var errorRepeat = CookiesOMG.get('errorRepeat');
  
  if (errorRepeat === undefined) {
    CookiesOMG.set('errorRepeat', 0);
  }

  if (val === undefined || val == 5) {
    CookiesOMG.set('firstTimePhrases', firstTimePhrases);
    CookiesOMG.set('otherPhrases', otherPhrases);        
    CookiesOMG.set('counter', 0);
  } else {
    firstTimePhrases  = CookiesOMG.getJSON('firstTimePhrases');
    otherPhrases      = CookiesOMG.getJSON('otherPhrases');
  }

  if (errorRepeat == 1) {
    $('#home').addClass('hide');
    CookiesOMG.set('errorRepeat', 0);
    enabledToProccess = true;
    appStart();
  }

  if (val > 0 && val != 5) {
    $('#home').addClass('hide');

    enabledToProccess = true;
    appStart();
  }

  $('#start').on('click', function (e) {
    $(this).addClass('animated bounceOutLeft');
    enabledToProccess = true;
    appStart();
    e.preventDefault();
  })

  $('#repeat').on('click', function (e) {
    location.reload();
    e.preventDefault();
  })

});