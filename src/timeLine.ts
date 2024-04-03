/* IMPORTS */

/**********************************************************************************************************************/
import "particles.js";
import * as THREE from "three";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";
import "../styles/ext.css";
import init from "./modules/environment/initialize";
import strapiTimespan from "../src/classes/strapiTimespan";
import { Spinner } from "spin.js";
import strapiMeta from "./classes/strapiMeta";

/**********************************************************************************************************************/
/* END OF IMPORTS */

/* CONSTRUCTOR TimeLine Object*/

/**********************************************************************************************************************/
class TimeLine {
  // parameters

  url: string; // to fetch the data.
  container: HTMLElement; // where we display the scene.
  font: any; // 用于3D年份数字的字体。
  onClick: any; // 由用户提供的函数说明如果单击事件将发生什么，否则有一个默认实现，它只是将详细信息打印到浏览器控制台。
  consoleOutput: boolean; // 将一些信息打印到浏览器控制台，例如从url获取的所有对象以及由于任务数据而被忽略的对象。
  scale: number; // 这是为了防止应用在手机屏幕上过大或过小。
  eventPlaneMoveOverColor: number; // 鼠标悬停时事件变为的颜色，以指示交互性。
  eventPlaneColors: number[]; // 用于事件类型的颜色数组。
  disableConsoleOutput: boolean; // this can be set for production because threejs displays a lot of resizing messages etc. dependent on the display.
  bars: number; //在时间线上生成了多少条车道。
  fontFamily: string; // fonts used for the text displayed on the event plane in isometricview, or i think even font used for infotext when eventplane is clicked.
  spinner?: Spinner; // 加载图标在开始时使用并显示，直到所有数据被获取和处理，我们已经在此期间显示背景，并构建时间轴和事件几何图形，但只有在一切完成后才显示它，以避免显示未完成的令人困惑的应用程序。
  backgroundColor: number; // 用于背景的颜色。
  particleColor: number; // 颜色用于背景中的粒子(粒子波背景)。
  timelineColor: number; // 时间线的颜色。
  sphereRadius: number; // 球体事件(在walkview中的事件平面)有多大。
  sphereWidthSegments: number = 5; // segments of sphere.球缺
  sphereHeightSegments: number = 5; // segments of sphere.球缺
  clickedSize: number = 2; // 当点击时球体的大小(=活动)。根据模式，当取消选择时将调整大小为正常大小或将永久保持此大小。
  cameraPositionX: number = 0; // position x of camera for the main scene.
  cameraPositionY: number = 12; // position y of camera for the main scene.
  cameraPositionZ: number = 100; // position z of camera for the main scene.
  cameraFov: number; // Fov of camera for the main scene.
  twitchingOnlyActiveObject: boolean; // 活动的(选中的)球体将会四处跳动。
  twitchingExtent: number; // 抽动有多极端，主动球的线会抽动多远how extreme the twitching is, how far out the lines will twitch of the active sphere
  eventWireFrame: boolean; // 球体以线框的形式显示，可以停用以显示填充的事件球体，但对我来说，抽搐不再那么酷了。
  inactiveSize: number; // 球体的默认大小(未选择)。
  alternativeOnClickBehavior: boolean; // 一个不同的行为，将使所有其他(未选择的)球体暂时变小和相同的颜色，以帮助选中的大颜色变化的球体真正站起来/弹出。
  rotateScene: boolean = true; // 尝试自然的相机运动，使整个场景/应用程序不那么静态，通过在零点旋转时间轴来工作。在所有的尝试中，这是最有效的，并且与控件混淆最少，它使整个场景不那么静态。
  // 不是参数，而是需要的控制值，有时被代码覆盖not parameters but control values needed and sometimes overwritten by code

  onClickOverwrite: boolean = false; // 不是参数，派生自“onClick”方法参数。
  eventPlanePlacementRotater: number = 0; // 均匀分布生成的平面。
  blobUpdateCounter: number = 0; // 对于从animate中调用的更新函数;让它慢下来。
  finishedLoading: boolean = false; // 在所有获取的数据被处理后，这个设置为true，然后让spinner消失并显示场景。
  spinnerStopped: boolean = false; //如果我们停止旋转。 if we stopped the spinner.
  objectActive: boolean = false; // 如果我们点击一个球体，我们将其设置为全局，所以我们改变所有非活动球体。
  activeObject: THREE.Mesh | null = null; // 跟踪哪个对象是活动对象。
  animationFrame: number = 0; // 我想我需要这个来停止和重新启动粒子的背景动画，这样当我们在控件中改变粒子的颜色时，我们就会停止动画，重建背景并重新启动波的动画。
  eventTypes: string[] = []; // 从获取的数据派生，然后我们可以构建控件过滤器。
  timelineLineHeight: number = 0; // 时间轴有多远，它应该从数据获取的最新日期中得到它。
  eventPlanesOriginalColor: any[] = []; // 保存球体在悬停改变之前的颜色，这样它就可以在悬停之后变回原来的颜色。
  eventPlanes: THREE.Mesh[] = []; // 从获取的数据导出的事件平面。
  eventTypesValues: string[] = [];
  background: number = 1; // 所选择的背景，如果它是一个粒子js或三个ejs的一个，对于三个ejs的一个，我们创建一个单独的场景与它自己的相机和图层，否则与粒子js的背景，我们层画布在DOM本身。
  _showAllRelatedCurves: boolean = false; // 对于控制器，显示所有相关的曲线for controllers, show all related Curves
  _allRelatedCurves: any; //存储所有相关的曲线，以便在控制时从场景中添加或删除
  currentTimePeriod: string = ""; // as above
  indexedArrayDefaultEvents: { [key: string]: number } = {}; // 这包含默认事件，epoch，当我们在eventlistener中移动相机时，在mouseup上，我们检查相机的位置和我们所处的时间段。关键字是时间段，数字是这个事件世界中的startZCoordinate
  rightEventObjects: strapiTimespan[] = [];
  metaEventObjects: strapiMeta[] = [];

  // 背景控件默认值，这些(或大多数)可以在控件中进行调整

 particlesBackground = {
    amount: 40,
    density: 289.1476416322727,
    opacity: 1,
    opacityRandom: true,
    size: 2,
    sizeRandom: true,
    moveSpeed: 0.1,
    onHover: false, // 由于我们正在进行的画布分层，这些交互性参数目前不起作用，我们已经在前景中捕获了三个ejs的鼠标事件。在控件中禁用。
    onClick: false, // disabled in controls.
    onHoverDistance: 53.91608391608392, // disabled in controls.
  };

  // constructor with default values
  constructor({
    spinner,
    url,
    container,
    font,
    onClick,
    consoleOutput = false,
    scale = 1,
    eventPlaneMoveOverColor = 0xffffff,
    eventPlaneColors = [0x0074d9, 0xb10dc9, 0xffdc00, 0xff4136],
    disableConsoleOutput = false,
    bars = 4,
    fontFamily = "'lucida grande', 'lucida sans unicode', 'lucida,helvetica','Hiragino Sans GB','Microsoft YaHei','WenQuanYi Micro Hei'",//font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    backgroundColor = 0x472D30,//背景颜色
    timelineColor = 0xFFE1A8,//时间线颜色
    particleColor = 0xC9CBA3,//背景小点点颜色
    cameraFov = 25,
    sphereRadius = 1,
    sphereWidthSegments = 50,
    sphereHeightSegments = 15,
    clickedSize = 2,
    cameraPositionX = 0,
    cameraPositionY = 16,
    cameraPositionZ = 100,
    twitchingOnlyActiveObject = true,
    eventWireFrame = true,
    inactiveSize = 0.4,
    alternativeOnClickBehavior = true,
    twitchingExtent = 0.12,
    background = 1,
  }: {
    // 区分强制参数和可选参数以及分配类型differentiating between mandatory and optional parameters and assigning types
    spinner?: Spinner;
    url: string;
    container: HTMLElement;
    font: any;
    memoryMode?: boolean;
    onClick?: any;
    disableEventShadows?: boolean;
    consoleOutput?: boolean;
    scale?: number;
    portraitScale?: number;
    eventPlaneLimit?: number;
    eventPlaneMoveOverColor?: number;
    eventPlaneColors?: number[];
    disableConsoleOutput?: boolean;
    filledDefaultPlanes?: boolean;
    bars?: number;
    fontFamily?: string;
    backgroundColor?: number;
    timelineColor?: number;
    particleColor?: number;
    cameraFov?: number;
    sphereRadius?: number;
    sphereWidthSegments?: number;
    sphereHeightSegments?: number;
    clickedSize?: number;
    cameraPositionX?: number;
    cameraPositionY?: number;
    cameraPositionZ?: number;
    twitching?: boolean;
    twitchingOnlyActiveObject?: boolean;
    eventWireFrame?: boolean;
    inactiveSize?: number;
    alternativeOnClickBehavior?: boolean;
    twitchingExtent?: number;
    background?: number;
  }) {
    this.spinner = spinner;
    this.url = url;
    this.container = container;
    this.font = font;
    this.onClick = onClick;
    this.consoleOutput = consoleOutput;
    this.scale = scale;
    this.eventPlaneMoveOverColor = eventPlaneMoveOverColor;
    this.eventPlaneColors = eventPlaneColors;
    this.disableConsoleOutput = disableConsoleOutput;
    this.bars = bars;
    this.fontFamily = fontFamily;
    this.backgroundColor = backgroundColor;
    this.timelineColor = timelineColor;
    this.particleColor = particleColor;
    this.cameraFov = cameraFov;
    this.sphereRadius = sphereRadius;
    this.sphereWidthSegments = sphereWidthSegments;
    this.sphereHeightSegments = sphereHeightSegments;
    this.clickedSize = clickedSize;
    this.cameraPositionX = cameraPositionX;
    this.cameraPositionY = cameraPositionY;
    this.cameraPositionZ = cameraPositionZ;
    this.twitchingOnlyActiveObject = twitchingOnlyActiveObject;
    this.eventWireFrame = eventWireFrame;
    this.inactiveSize = inactiveSize;
    this.alternativeOnClickBehavior = alternativeOnClickBehavior;
    this.twitchingExtent = twitchingExtent;
    this.background = background;
  }

  build = () => {
    console.log("build timeline object");

    if (this.onClick === undefined) {
      // 如果用户没有传递onClick函数作为参数。
      this.onClickOverwrite = true;
    }
    init(this).then(); // 这是为了启动整个应用程序，我们忽略承诺返回。This is to start the whole application, we ignore promise returned.
  };
}

/**********************************************************************************************************************/
/* END OF CONSTRUCTOR TIMELINE OBJECT*/

export default TimeLine; // export this object
