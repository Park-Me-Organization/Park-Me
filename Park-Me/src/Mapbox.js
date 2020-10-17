import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

class Mapbox extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        lng: -84.387,
        lat: 33.749,
        zoom:13
        };
        }
        
    componentDidMount() {
    mapboxgl.accessToken = 
    'pk.eyJ1IjoicmFmYWVsaGR6YSIsImEiOiJjazhtNDN3bjQwanM3M2ZxeHBwMzQwb2N4In0.RWPT0miQILyaM0B5aYTnjg';
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });
    }
    render(){

     return(

        <div>
            <div class='sidebar pad2'>
                Listing
            </div>
            <div ref={el => this.mapContainer = el} className="map pad2" />
        </div>
     )
     }
    
}
ReactDOM.render(<Mapbox />, document.getElementById('root'));
export default Mapbox;