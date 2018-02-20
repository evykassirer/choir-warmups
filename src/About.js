import React, { Component } from 'react';

import './About.css';
import conducting_pic from './conducting_pic.jpeg';

class About extends Component {

  render() {
    return <div className="about">
      <img className="about-pic" src={conducting_pic}/>

      <p>
      Hi I'm <a href="http://www.evykassirer.com/music">Evy</a>! I love singing, musical movement, pedagogy, and community. I've sung in choirs since I was 11 and have been studying conducting for almost four years. Jan-April 2018 is the final term of my computer science degree and music minor at the University of Waterloo.
      </p>

      <p>
      This warmup collection is part of a course I’ve built, over this last term of school, to learn more about choir conducting (<a href="https://uwflow.com/course/music380">"Directed Study in Music"</a>, under the supervision of <a href="http://www.grandphilchoir.com/about-us/our-people/mark-vuorinen/">Mark Vuorinen</a> at the University of Waterloo).
      </p>

      <p>
      Warm-ups are short exercises used at the beginning of rehearsal to prepare the choir for rehearsal. A <a href="http://www.vocaltechnique.info/">vocal techniques book</a> I read for this course says that "for many amateur singers in choirs, conductors may be the only source of information about vocal technique [and] thus [have] a valuable opportunity […] to encourage great vocal technique and vocal health."" And how can this be done? One way is warm-ups, which "are critical for teaching, practicing, and improving vocal technique".
      </p>

      <p>
      This is why one of the biggest projects I’m working on this term will be reading several sources of vocal warm-ups and exercises, collecting my favourites, and putting them on the internet. What you see right now is a work in progress - I have many plans for more features. This is an exciting opportunity for me to combine my software engineering and musician skills.
      </p>

      <p>
      You can read more about this process behind this project and other conducting projects in my <a href="https://medium.com/@evyconducts">weekly conducting blog posts</a>!
      </p>

    </div>;
  }
}


export default About;
