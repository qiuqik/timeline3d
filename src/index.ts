// imports
import TimeLine from "./timeLine"; // import timeline
import { spinnerOptions } from "./modules/startUp/spinnerOptions"; // import spinner options like linesize etc. these options can be adapted in the module code.
import { Spinner } from "spin.js"; // import spinner for loading screen
import "spin.js/spin.css"; // import spinner stylesheet for animation
import Font from "../fonts/AaGuDianKeBenSong_Regular.json"; // import Font to be used
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";
import "../styles/ext.css";
import toRGBAColor from "./modules/helper/toRGBAColor";
import WEBGL from "./modules/helper/WebGL";
import strapiMeta from "./classes/strapiMeta";

// WEBGL check
if (!WEBGL.isWebGLAvailable()) {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("scene-container")!.appendChild(warning);
  throw new Error("WEBGL not supported by this browser");
}

// variables
//const url: string = "https://rwi-itp01.uzh.ch/thier-mgr/_backend/get/latest/timeline/?target=test&get"; // url with data provided
const url: string = ""; // url with data provided http://lht.rwi.app
const container: HTMLElement | null = document.getElementById(
  "scene-container"
); // fetch container to hold the rendering mainScene
// loading screen Spinner. We load and display it before anything else.
if (container) {
  // not null (or undefined/NaN/''/0/false) check


  //  we load and show the spinner before everything else. If it is a mobile, we first display the button (in timeline.ts) and then show the spinner if clicked (when loading data)
  let spinner = new Spinner(spinnerOptions).spin(container);

  // create timeline object
  // for more parameters to create the TimeLine object with specific parameters, have a look into the code (constructor of the object)
  const timelineWalkView = new TimeLine({
    spinner: spinner, 
    url: url, 
    container: container, 
    font: Font, 
    disableConsoleOutput: true, 

    onClick: (data: any) => {
      let image = data.image;
      console.log("图像url:", data);
      
      let text;
      if (data.startyear != data.endyear) {
        text = "<h1>" + data.title + " " + data.startyear + " - " + data.endyear + "</h1>" + data.content.replaceAll("<a href", "<a target=\"_blank\" href");
      } else {
        text = "<h1>" + data.title + " " + data.startyear + "</h1>" + data.content.replaceAll("<a href", "<a target=\"_blank\" href");
      }

      let body =
        '<div class="modal-body">' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="col-sm-12">' +
        '<div class="row">' +
        '<div class="col image">' + "<img src=\"" + image + "\">" +
        "<p>" +
        text +
        " </p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      const $modal = $(
        '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">' +
        '<div class="modal-content" style="border: 0px;">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="align-self: end;"><span aria-hidden="true" style="color: white;">&times;</span></button>' +
        '<div class="modal-body">' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
      );

      if (!$(".modal:visible").length) {
        $modal.find(".modal-body").replaceWith(body);
        $modal.modal("show");
        $modal[0].style.color = toRGBAColor(timelineWalkView.timelineColor);
      }

      if (data.metaevents && data.metaevents.length > 0) {

        let addMetaButtons = function () {

          data.metaevents.forEach((element: any) => {
            let metaEventObject: strapiMeta | undefined = timelineWalkView.metaEventObjects.find(metaeventobject => metaeventobject.id === element.id);
            if (metaEventObject) {
              let metaBody =
                '<div class="modal-body">' +
                '<div class="container-fluid">' +
                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="row">' +
                '<div class="col">' + "<img src=\"" + "" + "\">" +
                "<p>" +
                metaEventObject.title +
                " </p>" +
                "<p>" +
                //@ts-ignore
                metaEventObject.content.replaceAll("<a href", "<a target=\"_blank\" href") +
                " </p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";

              var button = document.createElement("button");
              button.style.color = "#4CAF50";
              button.style.backgroundColor = "transparent";
              button.style.borderRadius = "4px";
              button.style.border = "2px solid #4CAF50";
              button.style.padding = "0px 2px";
              button.innerHTML = metaEventObject.title;
              button.addEventListener("click", function () {
                $modal.find(".modal-body").replaceWith(metaBody);
                $modal.find(".modal-body").prepend(buttonBack);
              });
              $modal.find(".modal-body").prepend("<br>");
              $modal.find(".modal-body").prepend("<br>");
              $modal.find(".modal-body").prepend(button);
            }
          });
        }

        addMetaButtons();

        // add Back button
        var buttonBack = document.createElement("button");
        buttonBack.innerHTML = "Back to Event";
        buttonBack.style.color = toRGBAColor(timelineWalkView.timelineColor);
        buttonBack.style.backgroundColor = "transparent";
        buttonBack.style.borderRadius = "4px";
        buttonBack.style.border = "2px solid " + toRGBAColor(timelineWalkView.timelineColor);
        buttonBack.style.padding = "0px 2px";

        buttonBack.addEventListener("click", function () {
          $modal.find(".modal-body").replaceWith(body);
          addMetaButtons();
        });
      }
    },
  });

  // build the object / start the whole process
  timelineWalkView.build();
}
