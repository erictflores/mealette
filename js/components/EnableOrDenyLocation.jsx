  var MainCarousel = require('../carousel/MainCarousel.jsx');

  var EnableOrDenyLocation = React.createClass({
    getInitialState: function() {
      return {
        restaurant_objects: [],
        user_location: false
      }
    },

    componentDidMount: function() {
      this.getLocation();
    },

    getLocation: function() {
      var x = document.getElementById("enable-location-request");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }, // ends getLocation

    showPosition: function(position) {
      var x = document.getElementById("enable-location-request");

      var esto = this;
      var request = $.ajax({
        url: "https://mealette-backend.herokuapp.com/api",
        method: "get",
        data: {lat: position.coords.latitude, lon: position.coords.longitude},
        dataType: "JSON"
      });

      request.done(function(response) {
        esto.setState({ restaurant_objects: response, user_location: true });
      });

      request.fail(function(errors) {
        console.error(errors);
      });

    }, // ends show position

    showError: function(error) {
      var x = document.getElementById("enable-location-request");
      switch(error.code) {
        case error.PERMISSION_DENIED:
        x.innerHTML = "Please provide your address."
        break;
        case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        x.innerHTML = "The request to get location timed out."
        break;
        case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
      }
    }, // ends showError

    render: function() {

      var showOrNoShow;
      var enableLocation = this.state.user_location;

      if (enableLocation) {
        showOrNoShow = <MainCarousel cardData={this.state.restaurant_objects} />;
      } else {
        showOrNoShow = <SearchBar />;
      }

      return (
        <div>
        {showOrNoShow}
        </div>
        );
    }
  }); // ends EnableOrDenyLocation


  // DISPLAY SEARCH BAR COMPONENT ====================================================
  var SearchBar = React.createClass({
    getInitialState: function() {
      return {
        restaurant_objects: [],
        user_location: false
      }
    }, // ends getInitialState

    codeAddress: function(e) {
      e.preventDefault();
      var address = React.findDOMNode(this.refs.address).value.trim();

      console.log(address);
      var esto = this;

      var request = $.ajax({
        url: "http://localhost:3000/api",
        // url: "https://mealette-backend.herokuapp.com/api",
        method: "get",
        dataType: "json",
        data: {address: address}
      });

      request.done(function(response){
        if (response.status === 400) {
          $('#enable-location-request').html("Please try again");
          $('#enable-location-request').css("color", "red");
          $('#address').val('');
        } else {
          esto.setState({ restaurant_objects: response, user_location: true });
          $('#enable-location-request').html("Please provide your address.");
          $('#enable-location-request').css("color", "black");
          $('#address').val('');
        }
      });

      request.fail(function(error) {
        console.error(error);
      });

    }, // ends codeAddress

    render: function() {
      var showOrNoShow;
      var enableLocation = this.state.user_location;
      if (enableLocation) {
        showOrNoShow = <MainCarousel cardData={this.state.restaurant_objects} />;
      }

      return (
        <div>
          <form onSubmit={this.codeAddress}>
            <input id="address" type="textbox" placeholder="Enter your location" ref="address" />
            <input id="search-button" type="submit" value="Geocode" />
          </form>

          <div>{showOrNoShow}</div>
        </div>
        );
    }
  }); // ends SearchBar

module.exports = EnableOrDenyLocation;

