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
        "title": "纺织最早的雏形出现",
        "startyear":-100000,
        "endyear":-99990,
        "teaser": "大约十万年前，人类首次制作出纺织品的雏形——网兜",
        "content": "距今大约十万年前，为了使狩猎用的石球投掷得更远，原始社会的先民创造了类似网兜的藤蔓编织物，这种网兜就是纺织最早的雏形。",
        "type": 1,
        "image":"https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E5%8D%8E%E7%AB%A0%E5%BE%A1%E9%94%A6/10%E7%BB%9B%E7%BA%A2%E5%9C%B0%E5%9B%A2%E9%BE%99%E7%BB%87%E9%87%91%E5%A6%86%E8%8A%B1%E7%BC%8E%E9%BE%99%E8%A2%8D%E6%96%99.JPG",
        "era":1,
        "timespans":[],
        "metaevents":[],
        "events":[]
    },
    {
        "id": 2,
        "title": "首枚骨针诞生",
        "startyear":-18005,
        "endyear":-18000,
        "teaser": "18000年前，“山顶洞人”制造出了中国缝制工艺史上的第一枚骨针",
        "content": "大约18000年前，在北京周口店龙骨山里，生活着一批被称作“山顶洞人”的远古人类，他们不仅会人工取火，而且制造出了中国缝制工艺史上的第一枚骨针，骨针约同火柴棍般粗细，长82毫米。",
        "type": 2,
        "image":"https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/2.jpg",
        "era":1,
        "timespans":[],
        "metaevents":[],
        "events":[]
    },
    {
        "id": 3,
        "title": "植物纤维制成的绳子出现",
        "startyear": -4905,
        "endyear": -4900,
        "teaser": "考古人员在河姆渡遗址中发现了用植物纤维制作的绳子",
        "content": "在距今4900年的河姆渡遗址中，考古人员发现了原始社会时期人们用植物纤维制作的绳子。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/3.jpg",
        "era": 1,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 4,
        "title": "嫘祖教民养蚕制丝",
        "startyear": -2610,
        "endyear": -2600,
        "teaser": "公元前26世纪，黄帝的妻子嫘祖教民养蚕制丝",
        "content": "嫘祖是世界上蚕桑丝绸的伟大发明家，泽被中华，惠及全球，在中华和世界文明史上，写下了极其光辉灿烂篇章，历来受到人民的尊崇。《修葺嫘轩宫碑序》记载： “ 黄帝元妃嫘祖。生于本邑嫘祖山，殁于衡阳道，尊嘱葬于青龙之首，碑碣犹存。生前首创种桑养蚕之法，抽丝编绢之术。谏诤黄帝，旨定农桑，法制衣裳。兴嫁娶，尚礼仪，架官室，奠国基，统一中原，弼政之功，殁世不忘，是以尊为先蚕 …… 忆官史。据前碑所志，补建于蜀王之先祖蚕丛。后文翁治蜀，大加阔筑。历经兵燹，已三缺三圆矣。”   西平县是嫘祖出生地和始蚕地。每年农历四月二十三日，当地群众都要在这里举办盛大的庙会，用来纪念嫘祖发明养蚕缫丝的功德，所以庙会又被称为“蚕桑节”。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/4.jpg",
        "era": 1,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 5,
        "title": "夏朝纺织材料多样化",
        "startyear": -2070,
        "endyear": -1600,
        "teaser": "从夏朝开始，中国的纺织材料已经在向多样化方向发展了，其中比较值得注意的纺织材料包括蚕丝和苎麻这两种制衣必需品。",
        "content": "先秦时期除了养蚕缫丝技术日益成熟，以苎麻为原料的纺织技术也逐渐流行了开来。苎麻面料价格便宜，更适用于各个阶层，而且苎麻对的生存条件的要求并不苛刻，非常容易栽培，用苎麻织出来的衣服轻薄舒适，也能满足普通人对衣物舒适性的要求。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/5.jpg",
        "era": 2,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 6,
        "title": "腰机出现",
        "startyear": -1600,
        "endyear": -1046,
        "teaser": "商代出现了一种新的纺织工具：腰机",
        "content": "商代出现了一种纺织工具：腰机，腰机操作简单，需要纺织者坐在地上纺织，其缺点就是对纺织者的负担很大，而且腰机的纺织效率也比较低",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/6.jpg",
        "era": 3,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 7,
        "title": "周人开始研究衣物染色技术",
        "startyear": -1046,
        "endyear": -771,
        "teaser": "西周时期的人们已经对衣物之美有了一定追求，所以周人们就开始研究起衣物染色技术了。",
        "content": "据《考工记》记载：周朝的染色技术已趋于成熟，而一种被称作“七入”的染色技法，更是在当时大为流行；所谓“一入谓之縓，一入谓之縓……七入谓之缁”。“七入”中的每一入都代表一种不同的颜色，比如縓指的是红色；由此看来，周人在衣物颜色选择上的空间已经相当大了。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/7.jpg",
        "era": 4,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 8,
        "title": "斜织机出现",
        "startyear": -770,
        "endyear": -476,
        "teaser": "春秋时期，斜织机取代了腰机",
        "content": "在纺织工具器械方面，一种用脚踏的斜织机取代了全靠双手反复交替进行织布的腰机。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/8.jpg",
        "era": 5,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 9,
        "title": "染色成为专门技术",
        "startyear": -475,
        "endyear": -221,
        "teaser": "战国时期，染色成为一门专门技术",
        "content": "矿物、植物染料染色等已有文字记载。染色方法有涂染、揉染、浸染、媒染等。为了染出各种颜色，还有一染、再染乃至七染这样的复杂工序。人们已掌握了使用不同媒染剂，用同一染料染出不同色彩的技术，色谱齐全，还用五色雉的羽毛作为染色的色泽标样。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/9.jpg",
        "era": 6,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 10,
        "title": "纺织品种类与数量大幅增加",
        "startyear": -206,
        "endyear": 9,
        "teaser": "汉代的纺织品种类与数量都非常的多，绢、纱、绮、罗、锦等在汉代都有所发展",
        "content": "湖南长沙马王堆曾经出土的素纱蝉衣，是汉代轻纱服饰的典范。这件素纱蝉衣仅49克重，此等纺织品放在今天都让人震撼。宋代大诗人陆游在《老学庵笔记》做出了非常真切的比喻：“亳州出轻纱，举之若无，裁以为衣，真若烟雾。”",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/10.jpg",
        "era": 8,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 11,
        "title": "锦的织造水平提高",
        "startyear": -206,
        "endyear": 9,
        "teaser": "汉代最能代表纺织水平的纺织品是锦，采用平纹重经组织，以各色丝线织成，华丽精美，常由贵族或富豪佩戴，并因此而得名的地方有锦江、锦里和锦官城。",
        "content": "最能代表汉代纺织水平的纺织品是锦。《拾遗记》记载：“员峤山有冰蚕，霜覆之，然後成茧。其色五采，後代效之，染五色丝，织以为锦。”锦采用的纺织方式是平纹重经组织，是用各种色彩的丝线纺织而成，十分华丽，一般都是贵族或者富豪才穿得起。说来还有因锦而得名的地方，《广舆记》记载：“成都府城南有锦江，一名汶江，织锦濯此则鲜丽，其地曰锦里，其城曰锦官城。”",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/11.jpg",
        "era": 8,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 12,
        "title": "织物更加多样",
        "startyear": 220,
        "endyear": 280,
        "teaser": "在新疆吐鲁番阿斯塔那墓群中出土了大量丝、棉、毛、麻织物",
        "content": "在新疆吐鲁番阿斯塔那墓群中出土了大量丝、棉、毛、麻织物，其中以丝织品尤为丰富，有锦、绮、绫、绢、缣、纱、罗、刺绣、染缬等。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/12.jpg",
        "era": 9,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 13,
        "title": "织锦工艺开始变得复杂",
        "startyear": 226,
        "endyear": 420,
        "teaser": "晋朝的织锦工艺也开始变得复杂，主要品种仍为平纹经锦",
        "content": "织锦工艺也开始变得复杂，主要品种仍为平纹经锦，花纹虽沿袭汉锦花纹传统，但已采用了中亚、西亚流行的狮、象及佛教艺术的化生、莲花等花纹。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/13.jpg",
        "era": 10,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 14,
        "title": "东晋时期，在建康设立锦署",
        "startyear": 417,
        "endyear": 417,
        "teaser": "“锦署”的成立被看作南京云锦诞生的标志",
        "content": "417年，东晋在建康设立专门管理织锦的官府——锦署。东晋末年，刘裕灭后秦，将长安的百工迁至建康，其中织锦工匠占很大比例，这些织锦工匠继承和吸收了各民族织锦技艺。北魏时期，纺织工艺在北方少数民族中已非常普及，并逐渐与中原地区和江南织造技艺融合。“锦署”的成立也被看作南京云锦诞生的标志，从此，南京云锦作为一个独立的丝织品种登上历史舞台。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/15.jpg",
        "era": 10,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 15,
        "title": "七夕节拜星乞巧",
        "startyear": 420,
        "endyear":425,
        "teaser": "七夕节拜星乞巧的传说侧面印证了南京云锦早在很多年以前就已经诞生",
        "content": "传说自南朝起，妇女都要在七夕节这天拜星乞巧，希望织女能赐给她们织锦的工艺技巧。得到织女和牛郎传授技艺的南京姑娘，织出的织锦雍容华贵、灿若云霞，于是云锦的艺人们都称织女为“云锦娘娘”，这里织出的锦就被赞誉为“南京云锦”了。这也从侧面印证了，南京云锦早在很多年以前就诞生了。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/14.jpg",
        "era": 11,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 16,
        "title": "隋朝丝织业得到了进一步的发展和推广",
        "startyear": 581,
        "endyear": 618,
        "teaser": "隋朝纺织业中以丝织业最为有名，所产绫、绢、锦等都很精美",
        "content": "隋朝纺织业中以丝织业最为有名，所产绫、绢、锦等都很精美。当时还采用波斯锦的织造技法，织出了质量很高的仿波斯锦。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/16.jpg",
        "era": 12,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 17,
        "title": "唐代丝织品的工艺水平达到了巅峰",
        "startyear":618,
        "endyear": 907,
        "teaser": "唐代的纺织业有毛纺、麻纺、丝纺之别，其中以丝织最为发达",
        "content": "唐代的纺织业有毛纺、麻纺、丝纺之别。其中以丝织最为发达，如成都的蜀锦、定州的绫、亳州的纱都很有名。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/17.jpg",
        "era": 13,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 18,
        "title": "唐朝开设手工业监管部门",
        "startyear": 618,
        "endyear": 907,
        "teaser": "唐朝的手工业主要有官府经营的手工业与私营手工业",
        "content": "唐朝的手工业主要有官府经营的手工业与私营手工业。在农业、商业发展的基础上，主要的手工业部门如纺织业、制瓷业、造船业、矿冶业、造纸业、制茶业等都有较大的发展。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/18.jpg",
        "era": 13,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 19,
        "title": "宋锦出现",
        "startyear": 907,
        "endyear":1279,
        "teaser": "宋锦成为宋朝纺织的主流",
        "content": "宋锦成为当时纺织的主流。宋锦40多个品种中，重锦是最贵重的品种，多用于宫廷、殿堂里的各种陈设品以及巨幅挂轴等。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/19.jpg",
        "era": 15,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 20,
        "title": "刺绣渐成体系",
        "startyear": 907,
        "endyear": 1279,
        "teaser": "宋代的刺绣开始向艺术品过渡，这时还逐步形成了刺绣准则",
        "content": "宋代的刺绣开始向艺术品过渡，这时还逐步形成了刺绣准则，出现了模仿书画的绣品，涌现了一批制作人物花鸟，山水楼阁绣品的能工巧匠。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/20.jpg",
        "era": 15,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 21,
        "title": "元代织金锦是云锦的前身",
        "startyear": 1271,
        "endyear": 1368,
        "teaser": "元代纺织品以织金锦最为著名，通常由金线、纹纬、地纬三组纬线组成。",
        "content": "元代纺织品以织金锦最为著名，通常由金线、纹纬、地纬三组纬线组成。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/22.jpg",
        "era": 16,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 22,
        "title": "元代为云锦的发展奠定了基础",
        "startyear": 1271,
        "endyear": 1368,
        "teaser": "南京云锦是在继承元代著名的织金锦基础上逐渐发展起来的",
        "content": "元代的南京丝织之所以能重新得到发展，除了与宋王朝南渡后给江南经济生产带来的有利形势有关外，也和南宋以后建康地位的变化、以及附近某些昔日繁华的城市，如广陵（今扬州）在宋、金战争中遭到兵燹有关。  元代在南京设立的官办织造机构名叫东织染局、西织染局，东、西织染局隶属资政院、于元末时属于顺帝皇后完者忽都位下的，其所织币帛锦缎等丝织品专供皇室、贵族享受，并用以“章贵贱，别等威”和祭祀领赏之需。元代在全国各地几乎都设有织染刺绣机构。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/24.jpg",
        "era": 16,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 23,
        "title": "明代",
        "startyear": 1368,
        "endyear": 1640,
        "teaser": "明代的官营织造，经营单位多，分布地区广，规模庞大",
        "content": "明代的官营织造，经营单位多，分布地区广，规模庞大，但经营搜刮的重心则在江南，并以南京、苏州、杭州三地为重点。从经营体制分，有属中央系统的，有属地方系统的。两京织染（分设在南京和北京的两处织染局）和设在南京的神帛堂与供应机房，都是属于中央系统管辖的。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/26.jpg",
        "era": 17,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 24,
        "title": "明朝民间锦缎织造业同样繁荣",
        "startyear": 1370,
        "endyear":1640,
        "teaser": "宫廷生活的奢靡和最高统治者赏赐的无度，在一定程度上刺激了民间锦缎织造业的繁荣和发展",
        "content": "宫廷生活的奢靡和最高统治者赏赐的无度，使锦缎耗费的数量极为惊人。宫廷和官府除需索于官办织造外，往往采用领织、收购、采办等等方式，向民间搜罗缎匹，把对锦缎需求的相当一部分转嫁于民间机户的织造上，以弥补官办织造供应之不足，这在一定程度上刺激了民间锦缎织造业的繁荣和发展。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/27.jpg",
        "era": 17,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 25,
        "title": "清代云锦业的发展与官营织造联系紧密",
        "startyear": 1655,
        "endyear":1840,
        "teaser": "清代的官营织造，只在京城北京和江南的江宁（南京）、苏州、杭州四处设局。",
        "content": "同明代一样，清代云锦业的发展也是与官营织造分不开的。清代的官营织造，只在京城北京和江南的江宁（南京）、苏州、杭州四处设局。清代的江宁织造通常分为两个部分：织造署，是督理织造官吏驻扎及管理织造行政事务的官署；织局，是预造生产的官局作场。织局分为三个生产部分：供应机房、倭缎机房、诰帛机房。织局的生产、技术分工很细，完全是建立在互相协作的基础上进行的，具有工场手工业组织形式的特点。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/28.jpg",
        "era": 18,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 26,
        "title": "江宁织造署毁于战火",
        "startyear": 1851,
        "endyear": 1852,
        "teaser": "太平天国运动期间，江宁织造署俱毁于战火",
        "content": "道光三十年十一月十日(1851年1月11日)，洪秀全领导金国村起义，建号太平天国。咸丰三年(1853)太平天国定都南京，改名为“天京”。汉府织局及在淮青桥东北新建的江宁织造署俱毁于战火",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/29.jpg",
        "era": 18,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 27,
        "title": "裁撤江宁织造",
        "startyear": 1904,
        "endyear": 1904,
        "teaser": "1904年，清光绪皇帝将江宁织造裁撤",
        "content": "光绪三十年(1904)五月二十七日，清光绪皇帝将江宁织造裁撤，经历了元、明、清三个历史时代、延续达六百二十多年的江宁官办织务，从此正式宜告结束。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/30.jpg",
        "era": 18,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 28,
        "title": "南京云锦进入衰弱的历史时期",
        "startyear": 1911,
        "endyear": 1930,
        "teaser": "1911年发生了辛亥革命，推翻了中国历史上最后一个封建王朝，建立了中华民国。从此，兴盛于明、清两代的南京云锦，进入了衰弱的历史时期",
        "content": "主要原因是：云锦为封建宫廷服务的工艺，封建王朝被推翻后，失去了服务的主要对象；帝国主义列强的呢绒、哔叽等舶来品大量倾销中国，影响了云锦的销路；军阀的连年混战，使通往东北、西北云锦传统销路的交通不畅；蒙古人民共和国成立(1924)后，与旧中国政府一度断绝贸易关系",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/31.jpg",
        "era": 19,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 29,
        "title": "云锦迎来短暂春天",
        "startyear": 1921,
        "endyear": 1931,
        "teaser": "1921~1931年，南京云锦行业不断创新，风靡一时",
        "content": "1921~1931年，南京云锦行业中曾一度创造了一些结合时代生活的实用新产品，专门向来华的外国人和归国侨胞推销，风靡一时，但由于旧政府对民族工艺的改革和发展采取漠视的态度，行业中缺乏专门力量研究和倡导，再加上一些机户为了牟利，忽视产品质量，严重地影响了这些新产品的声誉，终至销路断绝。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/32.jpg",
        "era": 19,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 30,
        "title": "云锦再受重创",
        "startyear": 1941,
        "endyear": 1941,
        "teaser": "太平洋战争的爆发让云锦的生机全部断绝",
        "content": "1941年太平洋战争爆发。在日寇的封锁下，海陆交通中断，销路全部断绝，号家关闭，工人失业，云锦的生机全部断绝。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/33.jpg",
        "era": 19,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 31,
        "title": "抗日战争胜利",
        "startyear": 1945,
        "endyear": 1945,
        "teaser": "抗日战争胜利后，部分号家恢复生产",
        "content": "1945年抗日战争胜利后，只有部分号家恢复生产，其余的皆因遭受战乱摧残过重，元气大伤，一时难以振兴恢复。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/39.png",
        "era": 19,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 32,
        "title": "国共内战爆发",
        "startyear": 1945,
        "endyear": 1949,
        "teaser": "国民党政府发动内战，刚刚开始复苏的云锦生产再次遭到致命的打击",
        "content": "国民党政府发动内战，南京与东北、西北、西南各地的交通遭到阻滞或断绝，形成云锦产品积压，再加上政府的苛捐杂税、通货膨胀和限价政策的迫害，使刚开始复苏的云锦生产再次遭到致命的打击，濒于奄奄待毙的境地。到1949年4月南京解放前夕为止，全市云锦织造机台仅存150台左右。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/34.jpg",
        "era": 19,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 33,
        "title": "第一次全国工艺美术展览会",
        "startyear":1953,
        "endyear": 1953,
        "teaser": "1953年，国家在北京举办了第一次全国工艺美术展览会，这次展览是新中国成立后对全国传统工艺美术品的一次大检阅。",
        "content": "南京云锦业送展的作品中有一件“大红地加金龙风祥云妆花缎”，气势宏大，富丽堂皇，引起了各界参观者的兴趣和注意。展览会闭幕后，华东军政委员会文化部根据国家文化部的指示，专门颁布了挖掘、整理、研究南京云锦等民间工艺美术遗产的指示。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/35.jpg",
        "era": 20,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 34,
        "title": "南京云锦研究所成立",
        "startyear": 1957,
        "endyear": 1957,
        "teaser": "1957年12月，江苏省政府正式批准成立了南京云锦研究所，这是新中国成立后国家批准的第一个工艺美术专业研究机构。",
        "content": "从此，南京云锦研究所作为全国唯一的云锦专业研究机构，承担着云锦继承和保护的历史重任。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/36.jpg",
        "era": 20,
        "timespans": [],
        "metaevents": [],
        "events": []
    },
    {
        "id": 35,
        "title": "云锦生机盎然",
        "startyear": 1998,
        "endyear": 1999,
        "teaser": "科技部、文物局来到南京云锦研究所视察",
        "content": "1998、1999年科技部、文物局领导都分别来到南京云锦研究所视察，制订下一步南京云锦的发展方向，并表示，将继续支持南京云锦的发展。",
        "type": 2,
        "image": "https://dylan-ch.oss-cn-shanghai.aliyuncs.com/%E6%97%B6%E9%97%B4%E8%BD%B4/%E6%97%B6%E9%97%B4%E8%BD%B4%E5%9B%BE%E7%89%87/38.jpg",
        "era": 20,
        "timespans": [],
        "metaevents": [],
        "events": []
    }
    
]
    // const typesResponse = await fetch("/types?_limit=-1");
    // const typesData = await typesResponse.json();

    // const erasResponse = await fetch('../../data/Era.json');
    const erasData = [
    {
        "id": 1,
        "title": "原始社会",
        "startyear": -1700000,
        "endyear": -2070,
        "events": [],
        "timespans": []
    },
    {
        "id": 2,
        "title": "夏朝",
        "startyear": -2070,
        "endyear": -1600,
        "events": [],
        "timespans": []
    },
    {
        "id": 3,
        "title": "商朝",
        "startyear": -1600,
        "endyear": -1046,
        "events": [],
        "timespans": []
    },
    {
        "id": 4,
        "title": "西周",
        "startyear": -1046,
        "endyear": -771,
        "events": [],
        "timespans": []
    },
    {
        "id": 5,
        "title": "春秋时期",
        "startyear": -770,
        "endyear": -476,
        "events": [],
        "timespans": []
    },
    {
        "id": 6,
        "title": "战国时期",
        "startyear": -476,
        "endyear": -221,
        "events": [],
        "timespans": []
    },
    {
        "id": 7,
        "title": "秦朝",
        "startyear": -221,
        "endyear": -206,
        "events": [],
        "timespans": []
    },
    {
        "id": 8,
        "title": "汉朝",
        "startyear": -206,
        "endyear": 220,
        "events": [],
        "timespans": []
    },
    {
        "id": 9,
        "title": "三国",
        "startyear": 220,
        "endyear": 280,
        "events": [],
        "timespans": []
    },
    {
        "id": 10,
        "title": "晋朝",
        "startyear": 266,
        "endyear": 420,
        "events": [],
        "timespans": []
    },
    {
        "id": 11,
        "title": "南北朝",
        "startyear": 420,
        "endyear": 589,
        "events": [],
        "timespans": []
    },
    {
        "id": 12,
        "title": "隋朝",
        "startyear": 581,
        "endyear": 618,
        "events": [],
        "timespans": []
    },
    {
        "id": 13,
        "title": "唐朝",
        "startyear": 618,
        "endyear": 907,
        "events": [],
        "timespans": []
    },
    {
        "id": 14,
        "title": "五代十国",
        "startyear": 907,
        "endyear": 960,
        "events": [],
        "timespans": []
    },
    {
        "id": 15,
        "title": "宋朝",
        "startyear": 960,
        "endyear": 1279,
        "events": [],
        "timespans": []
    },
    {
        "id": 16,
        "title": "元朝",
        "startyear": 1271,
        "endyear": 1368,
        "events": [],
        "timespans": []
    },
    {
        "id": 17,
        "title": "明朝",
        "startyear": 1368,
        "endyear": 1644,
        "events": [],
        "timespans": []
    },
    {
        "id": 18,
        "title": "清朝",
        "startyear": 1636,
        "endyear": 1912,
        "events": [],
        "timespans": []
    },
    {
        "id": 19,
        "title": "近代",
        "startyear": 1840,
        "endyear": 1949,
        "events": [],
        "timespans": []
    },
    {
        "id": 20,
        "title": "现代",
        "startyear": 1949,
        "endyear": 2024,
        "events": [],
        "timespans": []
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
