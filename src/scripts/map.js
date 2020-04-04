(function () {
  ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
      center: [55.74368256307244,37.61706034861679],
      controls: [],
      zoom: 14
    })

    const chocoMarker = ymaps.templateLayoutFactory.createClass(
      '<svg class="map__marker">'+
        '<use xlink:href="images/icons/sprite.svg#marker" />'+
      '</svg>'
    )

    const emptyHint = {
      hintContent: '',
      balloonContent: ''
    }

    const icon = {
      iconLayout: chocoMarker
    }

    const cords = [
      [55.75530088809163,37.620462216918966],
      [55.74958897919116,37.60424021679689],
      [55.75888250412392,37.58226756054687],
      [55.74261737607743,37.58046511608888]
    ]

    cords.forEach(cord => {
      myMap.geoObjects
        .add(new ymaps.Placemark(
          cord,
          emptyHint,
          icon
        ))
    })

    myMap.behaviors.disable('scrollZoom') 
    }
  );
}) ()