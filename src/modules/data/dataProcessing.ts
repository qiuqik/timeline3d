import * as THREE from "three";
import strapiEvent from "../../classes/strapiEvent";
import strapiEra from "../../classes/strapiEra";
import strapiTimespan from "../../classes/strapiTimespan";
import TimeLine from "../../timeLine";
import buildWorld from "../environment/buildWorld";
import createStrapiSphere from "../environment/createStrapiSphere";
import createStrapiTimespanSphere from "../environment/createStrapiTimespanSphere";
import strapiMeta from "../../classes/strapiMeta";

// import Event from '../../data/Event.json'
// import Era from '../../data/Era.json'


export default (
  timeline: TimeLine,
  __retSetUp: {
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
  },
  timelineLineWidth: number,
  dateLineSpace: number,
  dateLineSpaceUnit: number
) => {
  console.log(Event)
  let strapiEventObjects: strapiEvent[] = [];
  let strapiEraObjects: strapiEra[] = [];
  let strapiEraTitles: string[] = [];
  let strapiTimespanObjects: strapiTimespan[] = [];
  let strapiMetaEventObjects: strapiMeta[] = [];
  let timelineStartDate: number = 0;
  let timelineEndDate: number = 0;

  // PS maybe include .catch statement if api calls go southways
  const requestStrapiData = async () => {
    // log
    console.log("Fetching data ...");

    // prepare url
    // let url = window.location.href.substr(0, window.location.href.lastIndexOf("/"));

    // fetch data, this is synchronous so we have all the data to continue获取数据，这是同步的，所以我们有所有数据可以继续
    // const eventsResponse = await fetch('../../data/Event.json');
    const eventsData = [
      {
          "id": 1,
          "title": "事件1",
          "startyear":1801,
          "endyear":1801,
          "teaser": "事件1的简介",
          "content": "事件1的详细内容",
          "type": 1,
          "image":"https://lht.rwi.app/uploads/small_Stammesrechte_9687f890d9.png",
          "era":1,
          "timespans":[],
          "metaevents":[],
          "events":[]
      },
      {
          "id": 2,
          "title": "事件2",
          "startyear":1901,
          "endyear":1911,
          "teaser": "事件2的简介",
          "content": "事件2的详细内容",
          "type": 2,
          "image":"https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E5%8D%8E%E7%AB%A0%E5%BE%A1%E9%94%A6/10%E7%BB%9B%E7%BA%A2%E5%9C%B0%E5%9B%A2%E9%BE%99%E7%BB%87%E9%87%91%E5%A6%86%E8%8A%B1%E7%BC%8E%E9%BE%99%E8%A2%8D%E6%96%99.JPG",
          "era":2,
          "timespans":[],
          "metaevents":[],
          "events":[]
      },
      {
          "id": 3,
          "title": "事件3",
          "startyear":11,
          "endyear":11,
          "teaser": "事件3的简介",
          "content": "事件3的详细内容",
          "type": 2,
          "image":"https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E5%8D%8E%E7%AB%A0%E5%BE%A1%E9%94%A6/10%E7%BB%9B%E7%BA%A2%E5%9C%B0%E5%9B%A2%E9%BE%99%E7%BB%87%E9%87%91%E5%A6%86%E8%8A%B1%E7%BC%8E%E9%BE%99%E8%A2%8D%E6%96%99.JPG",
          "era":2,
          "timespans":[],
          "metaevents":[],
          "events":[]
      }
  ]

    // const typesResponse = await fetch("/types?_limit=-1");
    // const typesData = await typesResponse.json();

    // const erasResponse = await fetch('../../data/Era.json');
    const erasData = [
      {
          "id":1,
          "title":"唐朝",
          "startyear":1800,
          "endyear":1900,
          "events":[],
          "timespans":[]
      },
      {
          "id":2,
          "title":"宋朝",
          "startyear":1910,
          "endyear":2000,
          "events":[],
          "timespans":[]
      },
      {
          "id":3,
          "title":"明朝",
          "startyear":10,
          "endyear":60,
          "events":[],
          "timespans":[]
      }
  ]

    // const metaeventsResponse = await fetch("/metaevents?_limit=-1");
    // const metaeventsData = await metaeventsResponse.json();

    // const timespansResponse = await fetch("/timespans?_limit=-1");
    // const timespansData = await timespansResponse.json();

    // const metasResponse = await fetch("/metaevents?_limit=-1");
    // const metasData = await metasResponse.json();

    // log the data as info
    console.log("All data fetched.");

    console.log("Events:");
    console.log(eventsData);
    // console.log("Types:");
    // console.log(typesData);
    console.log("Eras:");
    console.log(erasData);
    // console.log("Metaevents:");
    // console.log(metaeventsData);
    // console.log("Timespans:");
    // console.log(timespansData);
    // console.log("MetaEvents:");
    // console.log(metasData);

    /* ----- process Data ----- */

    // add types to timeline object
    // typesData.forEach((element: any) => {
    //   timeline.eventTypes.push(element.title);
    // });

    // store it as an object so we still have id - value structure
    timeline.eventTypes = [];

    // events - create eventPlanes and add them to eventPlaneObjects array, which will be returned
    eventsData.forEach((event: any) => {
      let eventPlaneObject: strapiEvent;
      if (event.image) {
        eventPlaneObject = new strapiEvent(
          event.id,
          event.title,
          event.startyear,
          event.endyear,
          event.teaser,
          event.content,
          event.type,
          event.image,
          event.era,
          event.timespans,
          event.metaevents,
          event.relates_to_event
        );
      } else {
        eventPlaneObject = new strapiEvent(
          event.id,
          event.title,
          event.startyear,
          event.endyear,
          event.teaser,
          event.content,
          event.type,
          event.image,
          event.era,
          event.timespans,
          event.metaevents,
          event.relates_to_event
        );
      }
      strapiEventObjects.push(eventPlaneObject);
    });

    // eras - create eventPlanes, add to defaultEventObjects and defaultEventTitles Arrays. Ajdust timeline length.
    erasData.forEach((era: any) => {
      // what do we do with timespans?

      let eraObject: strapiEra = new strapiEra(
        era.id,
        era.title,
        era.startyear,
        era.endyear,
        era.events,
        era.timespans
      );
      strapiEraObjects.push(eraObject);
      strapiEraTitles.push(eraObject.title);

      // timeline lenght, since all events are contained within an era, so the timeline goes as long as the latest era point.
      // also it is the same lenght into the past, as to ensure the camera always starts in the middle, or at the 0 year point
      // also restricting panning
      if (eraObject.endyear > timelineEndDate) {
        timelineEndDate = eraObject.endyear;
      }
      if (eraObject.startyear < timelineStartDate) {
        timelineStartDate = eraObject.startyear;
      }
    });

    // timespans, create eventPlanes and add to rightEventObjects Array
    // timespansData.forEach((timespan: any) => {
    //   // metaevents?
    //   let timespanObject: strapiTimespan = new strapiTimespan(
    //     timespan.id,
    //     timespan.title,
    //     timespan.startyear,
    //     timespan.endyear,
    //     timespan.teaser,
    //     timespan.content,
    //     timespan.image,
    //     timespan.era,
    //     timespan.events
    //   );
    //   strapiTimespanObjects.push(timespanObject);
    //   timeline.rightEventObjects = strapiTimespanObjects;
    // });

    // metaevents - create objects
    // metaeventsData.forEach((event: any) => {
    //   let eventObject: strapiMeta = new strapiMeta(
    //     event.id,
    //     event.title,
    //     event.content,
    //     event.events
    //   );
    //   strapiMetaEventObjects.push(eventObject);
    // });

    timeline.metaEventObjects = strapiMetaEventObjects;

    timeline.timelineLineHeight =
      Math.ceil((timelineEndDate * timeline.scale) / 100) * 100;

    console.log("Building world ... ");

    // Build whole Timeline
    buildWorld(
      timeline,
      __retSetUp.scene,
      timelineLineWidth,
      timeline.timelineLineHeight,
      timelineEndDate,
      dateLineSpace,
      strapiTimespanObjects,
      strapiEraObjects
    );

    console.log("World built.");

    console.log("Creating spheres ... ");

    // eventPlaneObjects is a sorted list according to date
    let planesGroup: THREE.Group = new THREE.Group();
    planesGroup.name = "PlanesGroup";

    let labelsGroup: THREE.Group = new THREE.Group();
    labelsGroup.name = "LabelsGroup";

    //eventPlaneObjects.sort((a, b) => (a.startDate > b.startDate ? 1 : -1)); //do we even need sorting?

    // reuse
    let eventPlaneSphere: THREE.Mesh;
    let sphere_geometry: THREE.SphereBufferGeometry = new THREE.SphereBufferGeometry(timeline.sphereRadius, timeline.sphereWidthSegments, timeline.sphereHeightSegments);

    // strapiEvent spheres on timeline
    for (let i: number = 0; i < strapiEventObjects.length; i++) {
      //let eventPlaneSphere: THREE.Mesh;
      eventPlaneSphere = createStrapiSphere(
        timeline,
        strapiEventObjects[i],
        timelineLineWidth,
        dateLineSpaceUnit,
        timeline.eventTypes,
        sphere_geometry
      ); // returns sphere
      eventPlaneSphere.name = strapiEventObjects[i].title; // identifier. We need this to identify which object belongs to this evenplane since we can only directly call properties on the generated geometry not the object that was used to generate it
      strapiEventObjects[i]._correspondingMesh = eventPlaneSphere;
      planesGroup.add(eventPlaneSphere);
      // @ts-ignore  because inspector sais we cannot assign Mesh to Mesh[], but we actually do can push, we do not assign here.
      timeline.eventPlanes.push(eventPlaneSphere); // i think i need this for interactivity. check.
    }

    // spheres right side
    for (let i: number = 0; i < strapiTimespanObjects.length; i++) {
      //let eventPlaneSphere: THREE.Mesh;
      eventPlaneSphere = createStrapiTimespanSphere(
        timeline,
        strapiTimespanObjects[i],
        timelineLineWidth,
        dateLineSpaceUnit,
        timeline.eventTypes
      ); // returns sphere
      eventPlaneSphere.name = strapiTimespanObjects[i].title; // identifier. We need this to identify which object belongs to this evenplane since we can only directly call properties on the generated geometry not the object that was used to generate it
      strapiTimespanObjects[i]._correspondingMesh = eventPlaneSphere;
      planesGroup.add(eventPlaneSphere);
      // @ts-ignore  because inspector sais we cannot assign Mesh to Mesh[], but we actually do can push, we do not assign here.
      timeline.eventPlanes.push(eventPlaneSphere);
    }

    console.log("Spheres created.");
    console.log("Creating text labels for spheres ... ");

    // text labels for spheres
    for (let i: number = 0; i < planesGroup.children.length; i++) {
      // find corresponding object because the mesh does not hold the title
      const correspondingObject = strapiEventObjects.find(
        (object) =>
          object._correspondingMesh.uuid === planesGroup.children[i].uuid
      );

      // nullcheck - therefore we prevent timespan spheres to receive an additional textlabel
      if (correspondingObject) {
        // date text elements are created as 3D Objects and need to get placed at the right place in 3D spac
        let color: number;
        color = timeline.timelineColor;

        // load font
        const loader: THREE.FontLoader = new THREE.FontLoader();
        loader.load(timeline.font, (font) => {
          const matLite: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            side: THREE.DoubleSide,
          });
          // standard title
          let message: string = "Standard Label";

          // append single date or timespan to title
          if (correspondingObject.startyear === correspondingObject.endyear) {
            message = correspondingObject.title.trim() + " [" + correspondingObject.startyear + "]";
          } else {
            message = correspondingObject.title.trim() + " [" + correspondingObject.startyear + " - " + correspondingObject.endyear + "]";
          }


          let shapes: any[] = font.generateShapes(
            message,
            0.3 * timeline.scale,
            0
          );
          let geometry: THREE.ShapeBufferGeometry = new THREE.ShapeBufferGeometry(
            shapes
          );
          geometry.computeBoundingBox();
          let label: THREE.Mesh = new THREE.Mesh(geometry, matLite);
          // position close to sphere
          label.position.y = planesGroup.children[i].position.y + 0.8;
          label.position.x = planesGroup.children[i].position.x + 0.8;
          label.position.z = planesGroup.children[i].position.z;
          // add to group
          labelsGroup.add(label);
        });
      }
    }
    console.log("Textlabels created.");

    console.log("Adding spheres and labels to the scene ... ");

    // add to scene
    __retSetUp.scene.add(planesGroup);
    __retSetUp.scene.add(labelsGroup);

    // store original colors of events if not already done to be able to restore the color
    for (let i = 0; i < timeline.eventPlanes.length; i++) {
      //@ts-ignore
      timeline.eventPlanesOriginalColor.push(
        //@ts-ignore
        Object.assign({}, timeline.eventPlanes[i].material.color)
      ); // careful, Object.assign makes a shallow copy, which means it only passes top-level enumerables by value, but nested objects would be passed by reference. Since we do not have nested objects, this is fine, but keep shallow copy in mind.
    }

    console.log("Update user view with processed data and created spheres");

    timeline.finishedLoading = true;
  };

  // call the whole function
  requestStrapiData();

  // we currently need to return (unless we refactor other methods aswell): timelineStartDate, timelineEndDate, eventPlaneObjects, defaultEventObjects, rightEventObjects
  return {
    timelineStartDate,
    timelineEndDate,
    strapiEventObjects,
    strapiEraObjects,
    strapiTimespanObjects,
  };
};
