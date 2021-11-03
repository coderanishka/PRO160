AFRAME.registerComponent('side-view',{
    schema:{selectedItemId:{default:'', type:'string'}},
    init: function(){
        this.createPlaces()
    },
    tick: function(){
        const places = document.querySelector('#places-container')
        const {state} = places.getAttribute('tour')
        if(state === 'view' || state === 'change-view'){
            this.el.setAttribute('visible', true)
        } else{
            this.el.setAttribute('visible', false)
        }
    },
    createPlaces: function(){
        const sideViewContainer = document.querySelector('#side-view-container')
        let previousXpos = -50
        let previousYpos = -30
        for(var i = 1; i <= 4; i++){
            const pos = {x: (previousXpos+=10), y: (previousYpos), z: -40}
            const entity1 = this.createPlaceThumbnail(pos, i)
            sideViewContainer.appendChild(entity1)
        }
    },
    createPlaceThumbnail: function(pos, id){
        const entity1 = document.createElement('a-entity')
        entity1.setAttribute('visible', true)
        entity1.setAttribute('id', `place-${id}`)
        entity1.setAttribute('geometry', {primitive: 'circle', radius: 3})
        entity1.setAttribute('material', {opacity: 0.9, src: './assets/thumbnails/icon1.png'})
        entity1.setAttribute('position', pos)
        entity1.setAttribute('cursorlistener', {})
        return entity1
    },

    
})