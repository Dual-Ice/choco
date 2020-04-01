ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    center: [55.74368256307244,37.61706034861679],
    zoom: 14
  })

  const chocoMarker = ymaps.templateLayoutFactory.createClass(
    '<svg class="map__marker">'+
      '<use xlink:href="images/icons/sprite.svg#marker" />'+
    '</svg>'
  )

  myMap.behaviors.disable('scrollZoom') 
  myMap.geoObjects
    .add(new ymaps.Placemark(
      [55.74261737607743,37.58046511608888],
      {
        hintContent: '',
        balloonContent: ''
      },
      {
        iconLayout: chocoMarker
      }
    ));
  }
);