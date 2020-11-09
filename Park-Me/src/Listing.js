import React, { Component } from "react";
import './App.css';
import * as parkingdata from "./parking.geojson";

class Listing extends Component{
    
    buildLocationList(data) {

        data.features.forEach(function(parking, i){
          /**
           * Create a shortcut for `parking.properties`,
           * which will be used several times below.
          **/
          var prop = parking.properties;
      
          /* Add a new listing section to the sidebar. */
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = "listing-" + prop.id;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';
      
          /* Add the link to the individual listing created above. */
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = "link-" + prop.id;
          link.innerHTML = prop.address;
      
          /* Add details to the individual listing. */
          var details = listing.appendChild(document.createElement('div'));
          details.innerHTML = prop.city;
          if (prop.phone) {
            details.innerHTML += ' · ' + prop.phoneFormatted;
          }
        });
      }

render(){
    return (
        <div id='listings' className='listings'></div>
    )
}
}

export default Listing;