import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.js";
import { evaluate } from "../util/eval.js";

class VideoScroll extends ScrollyVideo {
  constructor(item) {
    // console.log(item.dataset);
    const config = evaluate(item.dataset);
    // console.log(config);

    super({
      scrollyVideoContainer: item,
      src: item.dataset.videoScroll,
      transitionSpeed: 8,
      frameThreshold: 0.1,
      cover: false,
      sticky: false,
      full: false,
    });
  }
}

/** --------- init */
window.videoScroll = [...document.querySelectorAll("[data-video-scroll]")].map(
  (item) => new VideoScroll(item)
);

// console.log(window.videoScroll);

/*
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e11209aa1ae061b08ea374_No Agenda - Shredder-transcode.mp4
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e11209aa1ae061b08ea374_No Agenda - Shredder-transcode.webm
*/

/*
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e1173d84767148d32f298a_Sequence 01_1-transcode.mp4
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e1173d84767148d32f298a_Sequence 01_1-transcode.webm
*/

/* bg
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e11bde6fb704f80e1159f9_bg-transcode.mp4
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e11bde6fb704f80e1159f9_bg-transcode.webm

front
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e11be46fb70468c5115a0e_front-transcode.mp4
https://assets.website-files.com/63e1107f455055f9541b0a9d/63e11be46fb70468c5115a0e_front-transcode.webm

*/
