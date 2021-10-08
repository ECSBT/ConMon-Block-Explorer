import Particles from "react-particles-js";

const P2Particles = () => {
    return (
        <Particles
        params={{
          "particles": {
          "number": {
            "value": 75,
            "density": {
              "enable": true,
              "value_area": 1000
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "polygon",
            "stroke": {
              "width": 1.5,
              "color": "#892CDC"
            },
            "polygon": {
              "nb_sides": 8
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 3,
              "size_min": 0.5,
              "sync": true
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 125,
            "color": "#BC6FF1",
            "opacity": 0.5,
            "width": 0.5
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "bounce",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 2500,
              "rotateY": 2500
            }
          }
        },
        "interactivity": {
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 150,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 800,
              "size": 80,
              "duration": 2,
              "opacity": 0.8
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 1
            },
            "remove": {
              "particles_nb": 1
            }
          }
        },
        "retina_detect": true
        }}
        />
    )
}

export default P2Particles