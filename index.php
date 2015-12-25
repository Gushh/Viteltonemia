<!DOCTYPE html>
<html lang="es-AR">
<head>
  <title>Perdone mi francés | Test de Viteltonemia</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

  <!-- OG:FB -->
  <meta property="og:url"                 content="https://perdonemifrances.com.ar/viteltonemia/" />
  <meta property="og:type"                content="website" />
  <meta property="og:title"               content="Perdone mi francés | Test de Viteltonemia" />
  <meta property="og:description"         content="Medí tu concentracíon de vitel toné en sangre." />
  <meta property="og:image"               content="http://perdonemifrances.com.ar/viteltonemia/img/fb.png" />
  <meta property="og:image:secure_url"    content="https://perdonemifrances.com.ar/viteltonemia/img/fb.png" />
  <meta property="og:image:width"         content="1200" />
  <meta property="og:image:heigth"        content="630" />

  <!-- Latest compiled and minified CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300italic,700italic" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="css/style.min.css?<?php echo rand() ?>">
  <link rel="stylesheet" href="css/animate.min.css?13">

</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h2 id="howTo"></h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h2 id="howTo2" class="animated hide text-center"><small>Si no te funciona hacé click <a href="#" id="errorRepeat">acá</a></small></h2>
      </div>
    </div>
    <div class="row" id="home" class="hide">
      <div class="col-xs-7">
        <h1 class="animated fadeInUpBig"><span>Test de</span><span>Vitel</span><span>tonemia</span></h1>
        <p class="animated fadeInDownBig">
          <span>Medí tu concentracíon</span>
          <span>de vitel toné en sangre</span>
        </p>          
      </div>
      <div class="col-xs-5 col-md-2">
        <div class="round-button">
          <p id="browserError" class="animated fadeInRightBig hide">Tu navegador no es comatible: Esta webapp sólo funciona en Google Chrome!</p> 
          <a href="#" class="round-button-circle animated fadeInRightBig hide" id="start"><span>apretá acá</span><span>y soplá</span></a>
        </div>
      </div>
      <div class="col-xs-12 col-md-3 text-center">
        <a href="#" id="twitterHome" title="Compartir en Twitter" class="share-button">tw</a>
        <a href="#" id="facebookHome" title="Compartir en Facebook" class="share-button">fb</a>
      </div>
    </div>
    <div class="row" id="result">
      <div class="col-xs-12 col-sm-7">
        <div>
          <h3 class="result-title">resultado:</h3>
          <p id="phrase"></p>          
        </div>
        <div id="links">
          <p>
            <span>Si querés ver más cosas tontas</span>
            <span>comprate <a href="http://www.bureaudejuegos.com/pmf/tonto/">esto.</a></span>            
            <span>o seguinos <a href="https://www.facebook.com/perdonemifrances">acá.</a></span>
          </p>
        </div>
      </div>
      <div class="col-xs-offset-3 col-xs-6 col-md-offset-0 col-md-2">
        <div class="round-button">
          <a href="#" class="round-button-circle" id="repeat"><span>soplá</span><span>de nuevo</span></a>
          <a href="https://perdonemifrances.com.ar/viteltonemia/" class="round-button-circle hide" id="finish"><span>volvé</span><span>al inicio</span></a>
        </div>
      </div>
      <div class="col-xs-12 col-md-3 text-center">
        <a href="#" id="twitter" title="Compartir en Twitter" class="share-button hide">Compartir en Twiter</a>
        <a href="#" id="facebook" title="Compartir en Facebook" class="share-button hide">Compartir en Facebook</a>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" id="canvasContainer">
        <div id="loader" class="animated hide">
          <p>Preparando medidor...</p>
          <div class="loader loader-default"></div>
        </div>
        <canvas id="breath"></canvas>
      </div>
    </div>
    <footer>
      <div class="site-footer-right">
        <p class="text-rigth">
          Developed by <a href="http://trescraneos.com" target="_blank">TresCráneos</a>
        </p>
      </div>
    </footer>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js"><\/script>')</script>
  <script type="text/javascript" src="js/browser.detection.min.js"></script>
  <script src="js/js.cookie.min.js"></script>
  <script src="js/app.min.js?<?php echo rand() ?>"></script>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-71698263-1', 'auto');
    ga('send', 'pageview');

  </script>
</body>
</html>