AFRAME.registerComponent('cursorlistener',{
    schema : {selectedItemId : {default: "", type: 'string'}},
    init: function(){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents()
    },
    handlePlacesListState: function(){
        const id = this.el.getAttribute('id')
        const places = ['visit', 'amenities']
        if(places.includes(id)){
            const placesContainer = document.querySelector('#places-container')
            placesContainer.setAttribute('cursorlistener', {selectedItemId: id})
            this.el.setAttribute('material', {color: '#d76b30', opacity: 1})
        }
    },
    backgroundColor: function(){
        const el = document.querySelector('#main-container')
        el.setAttribute('color', 'purple')
    },
    handleMouseEnterEvents: function(){
        this.el.addEventListener('mouseenter', () => {
            this.handlePlacesListState()
            this.backgroundColor()
        })
    },
    handleMouseLeaveEvents: function(){
        this.el.addEventListener('mouseleave', () => {
            const {selectedItemId} = this.data
            
            if(selectedItemId){
                const el2 = document.querySelector('#main-container')
                const el = document.querySelector(`#${selectedItemId}`)
                const id = el.getAttribute('id')
                if(id == selectedItemId){
                    el.setAttribute('material', {color: '#0077cc', opacity: 1})
                    el2.setAttribute('color', '#98DAFC')
                }
            }
        })
    },
    handleViewState: function(){
        const el = this.el
        const id = el.getAttribute('id')
        const placesContainer = document.querySelector('#places-container')
        const {selectedItemId} = placesContainer.getAttribute('cursorlistener')
        const sideViewPlaces = ["place-1", "place-2", "place-3", "place-4"]
        if(sideViewPlaces.includes(id)){
            placesContainer.setAttribute("tour", {state:'change-view'})
            const sky = document.querySelector('#main-container')
            sky.setAttribute('material', {color: 'white', src: `./assets/360images/${selectedItemId}/${id}.jpg`})
        }
    },
    handleClickEvents: function(){
      this.el.addEventListener('click', (e) => {
          const placesContainer = document.querySelector('#places-container')
          const {state} = placesContainer.getAttribute('tour')
          if(state === 'places-list'){
            const id = this.el.getAttribute('id')
            const placesId = ['visit', 'amenities']
            if(placesId.includes(id)){
                placesContainer.setAttribute('tour', {state: 'view', selectedCard: id})
            }
          }
          if(state === "view"){
            this.handleViewState()
          }
          if(state === "change-view"){
              this.handleViewState()
          }
      })  
    }
})
