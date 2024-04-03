import TimeLine from "../timeLine";
// Raycaster光线追踪
export default (timeline: TimeLine, raycaster: THREE.Raycaster, resetEventPlaneColor: boolean, eventPlaneColorChanged: THREE.Mesh, copyr: number, copyg: number, copyb: number) => {
    // variables
    let setColors: boolean = false;
    let _copyb = copyb;
    let _copyr = copyr;
    let _copyg = copyg;
    // @ts-ignore
    const intersects: Intersection[] = raycaster.intersectObjects(timeline.eventPlanes);

    // functions
    const tempStoreColor = () => {
        _copyb = intersects[0].object.material.color.b.valueOf();
        _copyg = intersects[0].object.material.color.g.valueOf();
         _copyr = intersects[0].object.material.color.r.valueOf();
    }

    const changePreviousPlaneColorBack = () => {
        // @ts-ignore the object is a Mesh, then it is a BasicMeshMaterial so all properties are correct
        eventPlaneColorChanged.material.color.r = _copyr; // if we move from plane to no plane to change previous plane color back
        // @ts-ignore the object is a Mesh, then it is a BasicMeshMaterial so all properties are correct
        eventPlaneColorChanged.material.color.g = _copyg;
        // @ts-ignore the object is a Mesh, then it is a BasicMeshMaterial so all properties are correct
        eventPlaneColorChanged.material.color.b = _copyb;
    }

    const changeColorOfPlane = () => {
        intersects[0].object.material.color.set(timeline.eventPlaneMoveOverColor); // 更改颜色以显示/指示交互性change color to visualize/indicate interactivity
        resetEventPlaneColor = true; // 我将这个变量设置为只在颜色发生变化时重置颜色，而不是一直重置
        eventPlaneColorChanged = <THREE.Mesh>intersects[0].object; //加载新的移动平面到变量进行比较 load new moved over plane into variable for the comparison
    }

    // logic
    if (intersects.length > 0) {
        if (resetEventPlaneColor) { // is false if not loaded in yet
            if (eventPlaneColorChanged === intersects[0].object) { // if we move on same plane do nothing
            } else { // we changed plane from plane
                changePreviousPlaneColorBack();
                tempStoreColor();
                changeColorOfPlane();
            }
        } else { // if we move mouse on object first time
            tempStoreColor();
            changeColorOfPlane();
            setColors = true;
        }
    } else { // we left object
        if (resetEventPlaneColor) {
            changePreviousPlaneColorBack();
            resetEventPlaneColor = false;
        }
    }


    return {
        copyb: _copyb,
        copyg: _copyg,
        copyr: _copyr,
        resetEventPlaneColor: resetEventPlaneColor,
        eventPlaneColorChanged: eventPlaneColorChanged,
        setColors: setColors,
    };

}

/**********************************************************************************************************************/
/* END OF INTERSECTION LOGIC */