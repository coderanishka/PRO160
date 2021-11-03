AFRAME.registerComponent("tour", {
  schema: {state:{default:'places-list', type: 'string'},
          selectedCard:{type:'string', default: '#card1'}},
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },
  tick: function(){
    const {state} = this.el.getAttribute('tour')
    if(state === 'view'){
      this.hide([this.placesContainer])
      this.showView()
    }
  },
  showView: function(){
    const {selectedCard} = this.data
    const sky = document.querySelector('#main-container')
    sky.setAttribute('material', {src:`./assets/360images/${selectedCard}/place-0.jpg`, color: 'white'})
  },
  hide: function(elementList){
    elementList.map(e => {
      e.setAttribute('visible', false)
    })
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "amenities",
        title: "Amenities",
        url: "./assets/thumbnails/logo2.jpg",
      },
      {
        id: "visit",
        title: "Visit",
        url: "./assets/thumbnails/logo1.png",
      }
    ];
    let prevoiusXPosition = -40;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const border = this.createBorder(position, item.id)
      // Thumbnail Element
      const thumbnail = this.createThumbnail(item)
      border.appendChild(thumbnail)
      // Title Text Element
      const title = this.createTitle(position, item)
      border.appendChild(title)
      this.placesContainer.appendChild(border);
    }
  },
  createBorder: function(position, id){
    const entity = document.createElement('a-entity')
    entity.setAttribute('id', id)
    entity.setAttribute('visible', true)
    entity.setAttribute('geometry', {primitive: 'ring', radiusInner: 9, radiusOuter: 10})
    entity.setAttribute('position', position)
    entity.setAttribute('material', {color: '#00bcd4', opacity:1})
    entity.setAttribute('cursorListener', {})
    return entity
  },
  createThumbnail: function(item){
    const entity = document.createElement('a-entity')
    entity.setAttribute('visible', true)
    entity.setAttribute('geometry', {primitive: 'circle', radius: 9})
    entity.setAttribute('material', {src: item.url})
    return entity
  },
  createTitle: function(position, item){
    const entity = document.createElement('a-entity')
    entity.setAttribute('text', {value: item.title, font:'exo2bold', align: 'center', width: 100, color: 'black'})
    const elPos = position
    elPos.y = -20
    entity.setAttribute('position', elPos)
    entity.setAttribute('visible', true)
    return entity
  },
  

});
