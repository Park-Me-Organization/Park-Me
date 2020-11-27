import React, { Component, useState } from "react";
import Slider from "./Slider.js";
import Button from "react-bootstrap/Button";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };
  }

  render() {
    return (
      <div>
        <h1 id="Title">Where Do You Want To Go?</h1>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "55%",
            textAlign: "center",
          }}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.Address}
            />
            <div className="input-group-append">
              <Button
                variant="secondary"
                style={{
                  backgroundColor: "#1A2637",
                  fontfamily: "Roboto Slab",
                }}
                onClick={console.log(this.state.Address)}
              >
                GO
              </Button>
            </div>

            <div id="geocoder"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInput;
// function UserInput(props) {
//   const [currPage, setCurrPage] = useState(["Search"]);

//   function changePage() {
//     console.log("changePage | ", currPage);
//     if (currPage == "Search") {
//       setCurrPage("Slider");
//       console.log("after change: ", currPage);
//       console.log(document.getElementById("geocoder"));
//     } else if (currPage == "Slider") {
//       setCurrPage("Search");
//       console.log("after change:", currPage);
//       console.log(document.getElementById("geocoder"));
//     }
//   }

//   //Search bar input | for address
//   function SearchInput(props) {
//     return (
//       <div>
//         <h1 id="Title">Where Do You Want To Go?</h1>
//         <div
//           style={{
//             marginLeft: "auto",
//             marginRight: "auto",
//             width: "55%",
//             textAlign: "center",
//           }}
//         >
//           <div id="geocoder"></div>
//         </div>

//         <Button
//           variant="secondary"
//           style={{
//             marginTop: "20px",
//             backgroundColor: "#1A2637",
//             width: "100px",
//             padding: "8px",
//             fontfamily: "Roboto Slab",
//           }}
//           onClick={changePage}
//         >
//           GO
//         </Button>
//       </div>
//     );
//   }

//   //slider input | for search range
//   function SliderPage(props) {
//     return (
//       <div>
//         <h1 id="Title">What is your radius?</h1>
//         <div
//           style={{
//             marginLeft: "auto",
//             marginRight: "auto",
//             width: "50%",
//             textAlign: "center",
//           }}
//         >
//           <Slider />

//           <Button
//             variant="secondary"
//             style={{
//               marginTop: "20px",
//               backgroundColor: "#1A2637",
//               width: "100px",
//               padding: "8px",
//               fontfamily: "Roboto Slab",
//             }}
//             onClick={changePage}
//           >
//             GO
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   //controls viewable component | conditional components
//   function InputPage(props) {
//     console.log(currPage);
//     if (currPage == "Search") {
//       console.log("search page");
//       return <SearchInput />;
//     }
//     return <SliderPage />;
//   }

//   return (
//     <div>
//       <InputPage />
//     </div>
//   );
// }

// export default UserInput;
