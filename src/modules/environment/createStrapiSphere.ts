import * as THREE from 'three';
import strapiEvent from '../../classes/strapiEvent';
import TimeLine from "../../timeLine";

//@ts-ignore
export default (timeline: TimeLine, strapiEventObject: strapiEvent, timelineLineWidth: number, dateLineSpaceUnit: number, eventTypes: string[], sphere_geometry: THREE.SphereBufferGeometry) => {

    let color = '#000000';

    // mycode
    let randomType = Math.floor(Math.random() * 5) + 1;
    if(randomType == 1) color = '#faff72'; //鸭黄
    else if(randomType == 2) color = '#70f3ff'; //蔚蓝
    else if(randomType == 3) color = '#bce672';//松花色
    else if(randomType == 4) color = '#ff461f';//朱砂
    else if(randomType == 5) color = '#8c4356';//绛紫
    else color = '#f3f9f1';//茶白


    console.log("COLOR");
    console.log(color)

    //let material = new THREE.LineBasicMaterial({color: color});
    let material = new THREE.MeshBasicMaterial({
        color: color
    });
    material.wireframe = timeline.eventWireFrame;
    material.wireframeLinewidth = 1.2;

    console.log(material.color);

    let sphere = new THREE.Mesh(sphere_geometry, material);

    //  evenly distribute them, if the list is sorted after dates then a rotater should be enough
    let placementX: number = -((timeline.bars - 1) * (timelineLineWidth / 2)) + (timeline.eventPlanePlacementRotater * timelineLineWidth);
    let barsCorrector = 1;

    if (timeline.eventPlanePlacementRotater < timeline.bars - barsCorrector) {
        timeline.eventPlanePlacementRotater++;
    } else {
        timeline.eventPlanePlacementRotater = 0;
    }

    sphere.translateX(placementX); // adjust this to put it on the correct timebar

    // Y placement
    sphere.translateY(2 * timeline.scale); // so it is on top

    // Z placement logic
    const planeEventStart = -(dateLineSpaceUnit * strapiEventObject.startyear);
    sphere.translateZ(planeEventStart); // adjust to put it into the correct timezone

    sphere.rotateX(THREE.Math.degToRad(90)); // for planes, this was to lay them flat on the ground. For spheres, it is so they look more interesting and ligned out.

    sphere.userData = {
        Clicked: false
    };

    return sphere;

}