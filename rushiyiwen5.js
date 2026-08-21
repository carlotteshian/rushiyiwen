import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// ============================================================
// 鲲鹏星尘 · 如是我闻
// 第五版
//
// 【本版核心】
//
// 1. 延续第四版的 PNG 粒子构型
// 2. 鲲鹏不再只是“平面 + 微弱 Z”
// 3. 中央身体形成明显的向前凸起
// 4. 翅膀向两侧、向后展开
// 5. 尾部形成后收的空间层次
// 6. 边缘具有轻微“厚度”
// 7. 旋转到侧面时可以明显看到前后关系
// 8. 仍然保持画像砖 / 古代星尘的视觉语言
// 9. 资料星继续真正嵌入鲲鹏构型
// 10. 保留分类 / 阅读 / 缩放 / 触控
//
// 注意：
// 这一版仍然不是传统 OBJ / GLB 那种实体 3D 模型。
// 它是“粒子体积 3D”。
// 这样可以继续保留 PNG 原来的鲲鹏古画像轮廓。
// ============================================================



// ============================================================
// 0. 鲲鹏 PNG
// ============================================================

const KUNPENG_IMAGE_URL =
  "https://raw.githubusercontent.com/carlotteshian/rushiyiwen/main/kunpeng.png";



// ============================================================
// 1. 资料库
// ============================================================

const DATA = [

  {
    id: "g001",
    category: "古籍",
    title: "佛说大乘同性经",
    text:
      "我等于未来世，在此娑婆刹中得成正觉，定断恶业为无上尊，为一切众生作利益故。",
    source:
      "《佛说大乘同性经》卷上",
    intro:
      "未来并不只是尚未抵达的时间，也可以成为一种愿望：人在当下，为尚未到来的众生承担自己的选择。",
    core: true
  },

  {
    id: "g002",
    category: "古籍",
    title: "别译杂阿含经",
    text:
      "不愁念过去，亦不求未来。",
    source:
      "《别译杂阿含经》卷第八",
    intro:
      "我们常常被过去牵引，也被未来催促。而真正能够被触及的，始终是此刻。",
    core: true
  },

  {
    id: "g003",
    category: "古籍",
    title: "南华真经",
    text:
      "芭蕉也，石火也，电光也，过去未来，其时甚长，竟不知始于何岁，卒于何岁，无本无标，如环不已。",
    source:
      "《南华经因然》卷五",
    intro:
      "时间究竟是一条线，还是不断循环、彼此交叠的存在？",
    core: false
  },

  {
    id: "g004",
    category: "古籍",
    title: "陶靖节诗集",
    text:
      "未来宁蚤计，既往复何言。百年六十化，念念竟非是。",
    source:
      "《陶靖节诗集·和饮酒二十首》",
    intro:
      "未来值得思考，却无法被完全预知；过去无法追回，而每一个当下又正在成为过去。",
    core: true
  },

  {
    id: "p001",
    category: "哲学",
    title: "未来与当下",
    text:
      "我们对于未来的认识，往往也是对于当下自身的认识。",
    source:
      "测试资料 · 哲学",
    intro:
      "这一条暂作为占位。之后替换成正式哲学资料。",
    core: true
  },

  {
    id: "p002",
    category: "哲学",
    title: "可能性",
    text:
      "未来并不是已经存在的地方，而是由选择不断打开的可能。",
    source:
      "测试资料 · 哲学",
    intro:
      "暂作为资料库结构测试。",
    core: false
  },

  {
    id: "psych001",
    category: "心理学",
    title: "未来想象",
    text:
      "人对未来的想象，会反过来影响今天如何理解自己。",
    source:
      "测试资料 · 心理学",
    intro:
      "暂作为资料库结构测试。",
    core: true
  },

  {
    id: "soc001",
    category: "社会学",
    title: "共同的未来",
    text:
      "我们想象怎样的未来，也正在决定今天愿意建设怎样的社会。",
    source:
      "测试资料 · 社会学",
    intro:
      "暂作为资料库结构测试。",
    core: false
  },

  {
    id: "lit001",
    category: "文学 / 小说",
    title: "未来",
    text:
      "未来有无数种可能，而人总是在其中选择自己愿意相信的一种。",
    source:
      "测试资料 · 文学",
    intro:
      "暂作为资料库结构测试。",
    core: true
  },

  {
    id: "science001",
    category: "科学与技术思想",
    title: "未知",
    text:
      "我们能够预测未来，并不意味着未来因此失去了未知。",
    source:
      "测试资料 · 科学与技术思想",
    intro:
      "暂作为资料库结构测试。",
    core: true
  },

  {
    id: "art001",
    category: "艺术 / 美学",
    title: "观看未来",
    text:
      "艺术所想象的未来，也许首先是一种尚未存在的观看方式。",
    source:
      "测试资料 · 艺术 / 美学",
    intro:
      "暂作为资料库结构测试。",
    core: false
  },

  {
    id: "modern001",
    category: "现代思想",
    title: "共同塑造",
    text:
      "未来不是等待发生的事情，而是正在被我们共同塑造的事情。",
    source:
      "测试资料 · 现代思想",
    intro:
      "这一类别将用于连接古籍思想与当代社会中的未来想象。",
    core: true
  },

  {
    id: "today001",
    category: "无字碑 / 今观",
    title: "今观",
    text:
      "如果未来可以被留下，你想留下什么？",
    source:
      "今观 · 未署名",
    intro:
      "这里没有既定答案。每个人都可以为这片星空留下属于自己的未来。",
    core: true
  }

];



// ============================================================
// 2. 分类
// ============================================================

const CATEGORIES = [
  "古籍",
  "哲学",
  "心理学",
  "社会学",
  "文学 / 小说",
  "科学与技术思想",
  "艺术 / 美学",
  "现代思想",
  "无字碑 / 今观"
];

let activeCategory = null;



// ============================================================
// 3. Scene
// ============================================================

const scene =
  new THREE.Scene();



// ============================================================
// 4. Camera
// ============================================================

const camera =
  new THREE.PerspectiveCamera(
    55,
    window.innerWidth /
      window.innerHeight,
    0.1,
    100
  );

camera.position.set(
  0,
  0,
  8
);



// ============================================================
// 5. Renderer
// ============================================================

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  });

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setClearColor(
  0x02030a,
  1
);

renderer.domElement.style.display =
  "block";

document.body.style.margin =
  "0";

document.body.style.padding =
  "0";

document.body.style.overflow =
  "hidden";

document.body.style.background =
  "#02030a";

document.body.style.touchAction =
  "none";

document.body.appendChild(
  renderer.domElement
);



// ============================================================
// 6. Universe
// ============================================================

const universe =
  new THREE.Group();

scene.add(
  universe
);



// ============================================================
// 7. 背景星
// ============================================================

const backgroundStars = [];



// ============================================================
// 8. 鲲鹏
// ============================================================

let kunpengParticles =
  null;

let kunpengGlowParticles =
  null;

let kunpengDustParticles =
  null;

let kunpengStructureParticles =
  null;

let kunpengVolumeParticles =
  null;



// 鲲鹏资料锚点
let kunpengAnchors = [];



createBackgroundStars();

createKunpeng();



// ============================================================
// 9. 资料星
// ============================================================

const infoStars = [];

const infoStarGroup =
  new THREE.Group();

universe.add(
  infoStarGroup
);

createInfoStars();



// ============================================================
// 10. Zoom
// ============================================================

let targetZoom = 1;

let currentZoom = 1;

const MIN_ZOOM =
  0.65;

const MAX_ZOOM =
  2.2;



// ============================================================
// 11. Tilt
// ============================================================

let targetTiltX = 0;

let targetTiltY = 0;

let currentTiltX = 0;

let currentTiltY = 0;



// ============================================================
// 12. Pointer
// ============================================================

const pointer = {
  x: 0,
  y: 0,
  active: false
};



// ============================================================
// 13. Reading
// ============================================================

let readingOpen =
  false;

let selectedInfoStar =
  null;



// ============================================================
// 14. UI
// ============================================================

createUI();



// ============================================================
// 15. Background stars
// ============================================================

function createBackgroundStars() {

  createStarLayer({
    count: 1700,
    size: 0.013,
    opacity: 0.50,
    color: 0xbfc9df,
    spreadX: 19,
    spreadY: 13,
    spreadZ: 9
  });


  createStarLayer({
    count: 320,
    size: 0.027,
    opacity: 0.66,
    color: 0xe1d7bb,
    spreadX: 18,
    spreadY: 12,
    spreadZ: 8
  });


  createStarLayer({
    count: 70,
    size: 0.055,
    opacity: 0.88,
    color: 0xf0d995,
    spreadX: 17,
    spreadY: 11,
    spreadZ: 7
  });


  createLargeStarbursts();

}



// ============================================================
// Background star layer
// ============================================================

function createStarLayer(
  options
) {

  const positions =
    new Float32Array(
      options.count * 3
    );

  const seeds =
    new Float32Array(
      options.count
    );


  for (
    let i = 0;
    i < options.count;
    i++
  ) {

    const i3 =
      i * 3;


    let x =
      (
        Math.random() -
        0.5
      ) *
      options.spreadX;


    let y =
      (
        Math.random() -
        0.5
      ) *
      options.spreadY;


    const centerDistance =
      Math.sqrt(
        x * x +
        y * y
      );


    if (
      centerDistance < 2.4
    ) {

      const angle =
        Math.atan2(
          y,
          x
        );

      const radius =
        2.4 +
        Math.random() *
        2.3;

      x =
        Math.cos(angle) *
        radius;

      y =
        Math.sin(angle) *
        radius;

    }


    const z =
      (
        Math.random() -
        0.5
      ) *
      options.spreadZ;


    positions[i3] =
      x;

    positions[i3 + 1] =
      y;

    positions[i3 + 2] =
      z;


    seeds[i] =
      Math.random();

  }


  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );


  const material =
    new THREE.PointsMaterial({

      color:
        options.color,

      size:
        options.size,

      transparent:
        true,

      opacity:
        options.opacity,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,

      sizeAttenuation:
        true

    });


  const points =
    new THREE.Points(
      geometry,
      material
    );


  points.userData.seeds =
    seeds;

  points.userData.baseOpacity =
    options.opacity;

  points.userData.speed =
    0.04 +
    Math.random() *
    0.08;


  universe.add(
    points
  );


  backgroundStars.push(
    points
  );

}



// ============================================================
// Large starbursts
// ============================================================

function createLargeStarbursts() {

  const positions = [

    [-5.8,  2.7, -1.0],
    [ 5.4,  2.3, -0.5],
    [-6.2, -2.1,  0.4],
    [ 5.8, -2.7, -0.8],
    [ 2.8,  3.2, -1.5],
    [-3.5, -3.0, -0.9],
    [ 7.0,  0.8, -1.8],
    [-7.0,  0.5, -1.2]

  ];


  positions.forEach(
    (
      position,
      index
    ) => {

      const texture =
        createStarTexture(
          index % 3 === 2
        );


      const material =
        new THREE.SpriteMaterial({

          map:
            texture,

          transparent:
            true,

          opacity:
            0.58 +
            Math.random() *
            0.25,

          depthWrite:
            false,

          blending:
            THREE.AdditiveBlending

        });


      const sprite =
        new THREE.Sprite(
          material
        );


      sprite.position.set(
        position[0],
        position[1],
        position[2]
      );


      const size =
        0.17 +
        Math.random() *
        0.10;


      sprite.scale.set(
        size,
        size,
        1
      );


      sprite.userData = {

        phase:
          Math.random() *
          Math.PI *
          2,

        baseSize:
          size,

        baseOpacity:
          material.opacity

      };


      universe.add(
        sprite
      );


      backgroundStars.push(
        sprite
      );

    }
  );

}



// ============================================================
// Star texture
// ============================================================

function createStarTexture(
  feather = false
) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    128;

  canvas.height =
    128;


  const ctx =
    canvas.getContext(
      "2d"
    );


  const cx = 64;

  const cy = 64;


  const gradient =
    ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      58
    );


  gradient.addColorStop(
    0,
    "rgba(255,244,198,1)"
  );

  gradient.addColorStop(
    0.15,
    "rgba(244,217,148,0.95)"
  );

  gradient.addColorStop(
    0.4,
    "rgba(225,193,113,0.25)"
  );

  gradient.addColorStop(
    1,
    "rgba(225,193,113,0)"
  );


  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    128,
    128
  );


  if (!feather) {

    ctx.save();

    ctx.translate(
      cx,
      cy
    );

    ctx.rotate(
      Math.PI / 4
    );


    ctx.beginPath();

    ctx.moveTo(
      0,
      -42
    );

    ctx.lineTo(
      5,
      -5
    );

    ctx.lineTo(
      42,
      0
    );

    ctx.lineTo(
      5,
      5
    );

    ctx.lineTo(
      0,
      42
    );

    ctx.lineTo(
      -5,
      5
    );

    ctx.lineTo(
      -42,
      0
    );

    ctx.lineTo(
      -5,
      -5
    );

    ctx.closePath();


    ctx.fillStyle =
      "rgba(255,238,177,0.9)";

    ctx.shadowBlur =
      16;

    ctx.shadowColor =
      "rgba(238,204,126,0.85)";

    ctx.fill();

    ctx.restore();

  }

  else {

    ctx.save();

    ctx.translate(
      cx,
      cy
    );

    ctx.rotate(
      -0.7
    );


    ctx.beginPath();

    ctx.moveTo(
      -8,
      34
    );

    ctx.bezierCurveTo(
      -5,
      15,
      7,
      -9,
      29,
      -32
    );

    ctx.bezierCurveTo(
      17,
      -11,
      2,
      9,
      -8,
      34
    );

    ctx.closePath();


    ctx.fillStyle =
      "rgba(244,220,158,0.85)";

    ctx.shadowBlur =
      13;

    ctx.shadowColor =
      "rgba(238,204,126,0.65)";

    ctx.fill();


    ctx.strokeStyle =
      "rgba(255,240,190,0.5)";

    ctx.lineWidth =
      1;


    for (
      let i = 0;
      i < 5;
      i++
    ) {

      ctx.beginPath();

      ctx.moveTo(
        -5 + i * 3,
        27 - i * 10
      );

      ctx.lineTo(
        15 + i * 2,
        12 - i * 9
      );

      ctx.stroke();

    }


    ctx.restore();

  }


  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.needsUpdate =
    true;


  return texture;

}



// ============================================================
// 16. Create Kunpeng
// ============================================================

function createKunpeng() {

  const loader =
    new THREE.TextureLoader();


  loader.setCrossOrigin(
    "anonymous"
  );


  loader.load(

    KUNPENG_IMAGE_URL,

    texture => {

      console.log(
        "鲲鹏 PNG 加载成功"
      );


      const image =
        texture.image;


      const canvas =
        document.createElement(
          "canvas"
        );


      canvas.width =
        image.naturalWidth ||
        image.width;

      canvas.height =
        image.naturalHeight ||
        image.height;


      const ctx =
        canvas.getContext(
          "2d",
          {
            willReadFrequently:
              true
          }
        );


      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );


      createParticleKunpengFromCanvas(
        canvas
      );

    },

    undefined,

    error => {

      console.warn(
        "PNG 加载失败，使用备用构型。",
        error
      );


      createKunpengFallback();

    }

  );

}



// ============================================================
// 17. PNG → 鲲鹏粒子
//
// 第五版核心升级：
// Z 深度不再只是随机值。
// 而是根据鲲鹏在图像中的空间位置
// 生成一个“体积函数”。
//
// 中央身体：明显向前
// 翅膀：向外、向后
// 尾部：向后
// 边缘：逐渐收薄
// ============================================================

function createParticleKunpengFromCanvas(
  canvas
) {

  const ctx =
    canvas.getContext(
      "2d",
      {
        willReadFrequently:
          true
      }
    );


  const W =
    canvas.width;

  const H =
    canvas.height;


  const imageData =
    ctx.getImageData(
      0,
      0,
      W,
      H
    );


  const pixels =
    imageData.data;


  const candidates = [];


  const step =
    W > 2500
      ? 4
      : 3;



  // ==========================================================
  // 找出有效区域
  // ==========================================================

  for (
    let y = 0;
    y < H;
    y += step
  ) {

    for (
      let x = 0;
      x < W;
      x += step
    ) {

      const index =
        (
          y * W +
          x
        ) * 4;


      const alpha =
        pixels[index + 3];

      const red =
        pixels[index];

      const green =
        pixels[index + 1];

      const blue =
        pixels[index + 2];


      if (
        alpha > 35 &&
        (
          red > 70 ||
          green > 60 ||
          blue > 50
        )
      ) {

        candidates.push({

          x,
          y,

          alpha,

          brightness:
            (
              red +
              green +
              blue
            ) / 765

        });

      }

    }

  }


  console.log(
    "鲲鹏有效采样点：",
    candidates.length
  );


  if (
    candidates.length < 100
  ) {

    console.warn(
      "PNG 有效像素不足，使用备用构型。"
    );

    createKunpengFallback();

    return;

  }



  // ==========================================================
  // 最大粒子
  // ==========================================================

  const MAX_PARTICLES =
    window.innerWidth < 600
      ? 18000
      : 32000;


  const selected = [];


  if (
    candidates.length <=
    MAX_PARTICLES
  ) {

    selected.push(
      ...candidates
    );

  }

  else {

    const ratio =
      MAX_PARTICLES /
      candidates.length;


    for (
      let i = 0;
      i < candidates.length;
      i++
    ) {

      if (
        Math.random() <
        ratio
      ) {

        selected.push(
          candidates[i]
        );

      }

    }

  }



  // ==========================================================
  // 尺寸
  // ==========================================================

  const TARGET_WIDTH =
    10.4;


  const scale =
    TARGET_WIDTH /
    W;


  const centerX =
    W / 2;


  const centerY =
    H / 2;



  // ==========================================================
  // 计算实际边界
  // ==========================================================

  let minX =
    Infinity;

  let maxX =
    -Infinity;

  let minY =
    Infinity;

  let maxY =
    -Infinity;


  selected.forEach(
    p => {

      if (
        p.x < minX
      )
        minX = p.x;

      if (
        p.x > maxX
      )
        maxX = p.x;

      if (
        p.y < minY
      )
        minY = p.y;

      if (
        p.y > maxY
      )
        maxY = p.y;

    }
  );


  const normalizedWidth =
    Math.max(
      1,
      maxX - minX
    );


  const normalizedHeight =
    Math.max(
      1,
      maxY - minY
    );



  // ==========================================================
  // 保存构型锚点
  // ==========================================================

  kunpengAnchors =
    [];


  for (
    let i = 0;
    i < selected.length;
    i += 18
  ) {

    const p =
      selected[i];


    const px =
      (
        p.x -
        centerX
      ) *
      scale;


    const py =
      -(
        p.y -
        centerY
      ) *
      scale;


    kunpengAnchors.push({

      x: px,

      y: py,

      alpha:
        p.alpha,

      brightness:
        p.brightness

    });

  }



  // ==========================================================
  // 主粒子数组
  // ==========================================================

  const count =
    selected.length;


  const positions =
    new Float32Array(
      count * 3
    );


  const sizes =
    new Float32Array(
      count
    );


  const phases =
    new Float32Array(
      count
    );


  const brightness =
    new Float32Array(
      count
    );


  const depths =
    new Float32Array(
      count
    );



  // ==========================================================
  // 第五版：
  // 体积函数
  //
  // 这一部分决定“像不像真的有厚度”。
  // ==========================================================

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const p =
      selected[i];


    const i3 =
      i * 3;


    const nx =
      (
        p.x -
        minX
      ) /
      normalizedWidth;


    const ny =
      (
        p.y -
        minY
      ) /
      normalizedHeight;


    const worldX =
      (
        p.x -
        centerX
      ) *
      scale;


    const worldY =
      -(
        p.y -
        centerY
      ) *
      scale;



    // --------------------------------------------------------
    // 到中心的归一化距离
    // --------------------------------------------------------

    const radial =
      Math.sqrt(
        worldX * worldX +
        worldY * worldY
      );


    const centerWeight =
      Math.exp(
        -(
          worldX * worldX +
          worldY * worldY * 1.45
        ) /
        8.5
      );



    // --------------------------------------------------------
    // 横向位置
    //
    // x 越接近 0：
    // 身体越厚
    //
    // x 越远：
    // 翅膀越薄
    // --------------------------------------------------------

    const wingWeight =
      THREE.MathUtils.clamp(
        Math.abs(worldX) / 5.2,
        0,
        1
      );



    // --------------------------------------------------------
    // 垂直位置
    //
    // 身体中心附近较厚
    // 上下边缘逐渐收薄
    // --------------------------------------------------------

    const verticalCenter =
      1 -
      THREE.MathUtils.clamp(
        Math.abs(
          worldY
        ) / 3.2,
        0,
        1
      );



    // --------------------------------------------------------
    // 边缘权重
    // --------------------------------------------------------

    const edgeDistance =
      Math.min(
        nx,
        1 - nx,
        ny,
        1 - ny
      );


    const edgeSoftness =
      THREE.MathUtils.clamp(
        edgeDistance * 8,
        0,
        1
      );



    // ========================================================
    // 第五版真正的深度公式
    //
    // 基础厚度
    // ========================================================

    let depth =
      0.06;



    // --------------------------------------------------------
    // 中央身体向前凸
    //
    // 最大增加约 0.85
    // --------------------------------------------------------

    depth +=
      centerWeight *
      0.82;



    // --------------------------------------------------------
    // 身体上下形成圆弧
    // --------------------------------------------------------

    depth +=
      verticalCenter *
      centerWeight *
      0.20;



    // --------------------------------------------------------
    // 翅膀向外以后逐渐后退
    // --------------------------------------------------------

    depth -=
      wingWeight *
      0.34;



    // --------------------------------------------------------
    // 越靠边缘越薄
    // --------------------------------------------------------

    depth *=
      0.74 +
      edgeSoftness *
      0.26;



    // --------------------------------------------------------
    // 尾部进一步向后
    //
    // 右侧通常是尾部所在区域。
    // 这里不直接假定完整形状，
    // 只做一个很柔和的后退。
    // --------------------------------------------------------

    if (
      worldX > 2.5
    ) {

      const tailWeight =
        THREE.MathUtils.clamp(
          (
            worldX -
            2.5
          ) / 3.2,
          0,
          1
        );


      depth -=
        tailWeight *
        0.18;

    }



    // --------------------------------------------------------
    // 很小的随机风化
    // --------------------------------------------------------

    depth +=
      (
        Math.random() -
        0.5
      ) *
      0.065;



    // --------------------------------------------------------
    // 最终限制
    // --------------------------------------------------------

    depth =
      THREE.MathUtils.clamp(
        depth,
        -0.08,
        0.98
      );



    // ========================================================
    // 边缘轻微散开
    // ========================================================

    let finalX =
      worldX;

    let finalY =
      worldY;


    if (
      edgeSoftness < 0.42
    ) {

      const angle =
        Math.atan2(
          worldY,
          worldX
        );


      const drift =
        (
          1 -
          edgeSoftness
        ) *
        (
          0.018 +
          Math.random() *
          0.035
        );


      finalX +=
        Math.cos(angle) *
        drift;


      finalY +=
        Math.sin(angle) *
        drift;

    }



    // ========================================================
    // 写入位置
    // ========================================================

    positions[i3] =
      finalX;

    positions[i3 + 1] =
      finalY;

    positions[i3 + 2] =
      depth;



    phases[i] =
      Math.random() *
      Math.PI *
      2;


    brightness[i] =
      0.72 +
      Math.random() *
      0.50;


    depths[i] =
      depth;



    // ========================================================
    // 粒子尺寸
    // ========================================================

    const centerFactor =
      centerWeight;


    const random =
      Math.random();


    let size;


    if (
      random < 0.10
    ) {

      size =
        0.025 +
        Math.random() *
        0.024;

    }

    else if (
      random < 0.62
    ) {

      size =
        0.016 +
        Math.random() *
        0.017;

    }

    else {

      size =
        0.009 +
        Math.random() *
        0.011;

    }


    size *=
      0.86 +
      centerFactor *
      0.25;


    size *=
      0.88 +
      edgeSoftness *
      0.15;


    sizes[i] =
      size;

  }



  // ==========================================================
  // Geometry
  // ==========================================================

  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );


  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(
      sizes,
      1
    )
  );


  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(
      phases,
      1
    )
  );


  geometry.setAttribute(
    "aBrightness",
    new THREE.BufferAttribute(
      brightness,
      1
    )
  );


  geometry.setAttribute(
    "aDepth",
    new THREE.BufferAttribute(
      depths,
      1
    )
  );



  // ==========================================================
  // 主鲲鹏 Shader
  // ==========================================================

  const material =
    new THREE.ShaderMaterial({

      transparent:
        true,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0
        },

        uPixelRatio: {
          value:
            Math.min(
              window.devicePixelRatio,
              2
            )
        },

        uOpacity: {
          value: 1
        }

      },


      vertexShader: `

        attribute float aSize;
        attribute float aPhase;
        attribute float aBrightness;
        attribute float aDepth;

        uniform float uTime;
        uniform float uPixelRatio;

        varying float vBrightness;
        varying float vDepth;


        void main() {

          vec3 p =
            position;


          // 非常轻微的呼吸
          float breathe =
            sin(
              uTime * 0.42 +
              aPhase
            ) *
            0.004;


          p.z +=
            breathe;


          // 深度轻微流动
          p.z +=
            sin(
              uTime * 0.18 +
              aPhase
            ) *
            0.006;


          vec4 mvPosition =
            modelViewMatrix *
            vec4(
              p,
              1.0
            );


          float twinkle =
            0.86 +
            0.14 *
            sin(
              uTime * 1.45 +
              aPhase
            );


          gl_PointSize =
            aSize *
            uPixelRatio *
            520.0 *
            twinkle /
            max(
              1.0,
              -mvPosition.z
            );


          gl_Position =
            projectionMatrix *
            mvPosition;


          vBrightness =
            aBrightness *
            twinkle;


          vDepth =
            aDepth;

        }

      `,


      fragmentShader: `

        uniform float uOpacity;

        varying float vBrightness;
        varying float vDepth;


        void main() {

          vec2 uv =
            gl_PointCoord -
            vec2(0.5);


          float d =
            length(uv);


          float glow =
            smoothstep(
              0.58,
              0.0,
              d
            );


          float core =
            smoothstep(
              0.24,
              0.0,
              d
            );


          vec3 warmGold =
            vec3(
              1.0,
              0.78,
              0.40
            );


          vec3 paleGold =
            vec3(
              1.0,
              0.94,
              0.74
            );


          vec3 color =
            mix(
              warmGold,
              paleGold,
              core
            );


          // 深度颜色变化
          color =
            mix(
              color,
              vec3(
                0.92,
                0.69,
                0.31
              ),
              clamp(
                vDepth * 0.28,
                0.0,
                0.25
              )
            );


          float alpha =
            glow *
            vBrightness *
            0.92 *
            uOpacity;


          gl_FragColor =
            vec4(
              color,
              alpha
            );

        }

      `

    });



  kunpengParticles =
    new THREE.Points(
      geometry,
      material
    );


  kunpengParticles.position.set(
    0,
    0.02,
    0.45
  );


  universe.add(
    kunpengParticles
  );



  // ==========================================================
  // 柔光
  // ==========================================================

  createKunpengGlow(
    positions,
    phases,
    sizes
  );



  // ==========================================================
  // 画像砖构型层
  // ==========================================================

  createKunpengStructure(
    positions,
    phases,
    sizes
  );



  // ==========================================================
  // 外围星尘
  // ==========================================================

  createKunpengDust(
    selected,
    scale,
    centerX,
    centerY
  );



  // ==========================================================
  // 第五版新增：
  // 背部体积层
  //
  // 这一层不是为了让正面更亮。
  // 是为了旋转到侧面时，
  // 看见鲲鹏后方仍然有一层粒子。
  // ==========================================================

  createKunpengVolumeLayer(
    positions,
    phases,
    sizes
  );



  // ==========================================================
  // 鲲鹏创建完成
  // ==========================================================

  placeInfoStarsInsideKunpeng();

}



// ============================================================
// 18. 鲲鹏柔光
// ============================================================

function createKunpengGlow(
  positions,
  phases,
  sizes
) {

  const count =
    phases.length;


  const glowPositions =
    new Float32Array(
      positions
    );


  const glowSizes =
    new Float32Array(
      count
    );


  const glowPhases =
    new Float32Array(
      phases
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    glowSizes[i] =
      sizes[i] *
      (
        1.55 +
        Math.random() *
        0.75
      );

  }


  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      glowPositions,
      3
    )
  );


  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(
      glowSizes,
      1
    )
  );


  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(
      glowPhases,
      1
    )
  );


  const material =
    new THREE.ShaderMaterial({

      transparent:
        true,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0
        },

        uOpacity: {
          value: 0.18
        }

      },


      vertexShader: `

        attribute float aSize;
        attribute float aPhase;

        uniform float uTime;

        varying float vAlpha;


        void main() {

          vec4 mv =
            modelViewMatrix *
            vec4(
              position,
              1.0
            );


          float pulse =
            0.90 +
            0.10 *
            sin(
              uTime * 0.85 +
              aPhase
            );


          gl_PointSize =
            aSize *
            480.0 *
            pulse /
            max(
              1.0,
              -mv.z
            );


          gl_Position =
            projectionMatrix *
            mv;


          vAlpha =
            pulse;

        }

      `,


      fragmentShader: `

        uniform float uOpacity;

        varying float vAlpha;


        void main() {

          vec2 uv =
            gl_PointCoord -
            vec2(0.5);


          float d =
            length(uv);


          float alpha =
            smoothstep(
              0.62,
              0.0,
              d
            ) *
            0.22 *
            vAlpha *
            uOpacity;


          vec3 color =
            vec3(
              1.0,
              0.76,
              0.35
            );


          gl_FragColor =
            vec4(
              color,
              alpha
            );

        }

      `

    });


  kunpengGlowParticles =
    new THREE.Points(
      geometry,
      material
    );


  kunpengGlowParticles.position.set(
    0,
    0.02,
    0.40
  );


  universe.add(
    kunpengGlowParticles
  );

}



// ============================================================
// 19. 画像砖构型层
// ============================================================

function createKunpengStructure(
  positions,
  phases,
  sizes
) {

  const count =
    Math.min(
      phases.length,
      9000
    );


  const structurePositions =
    new Float32Array(
      count * 3
    );


  const structureSizes =
    new Float32Array(
      count
    );


  const structurePhases =
    new Float32Array(
      count
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const sourceIndex =
      Math.floor(
        Math.random() *
        phases.length
      );


    const i3 =
      i * 3;

    const s3 =
      sourceIndex * 3;


    structurePositions[i3] =
      positions[s3] +
      (
        Math.random() - 0.5
      ) *
      0.035;


    structurePositions[i3 + 1] =
      positions[s3 + 1] +
      (
        Math.random() - 0.5
      ) *
      0.035;


    // 构型层略微靠前
    structurePositions[i3 + 2] =
      positions[s3 + 2] +
      0.025;


    structureSizes[i] =
      sizes[sourceIndex] *
      (
        0.55 +
        Math.random() *
        0.65
      );


    structurePhases[i] =
      Math.random() *
      Math.PI *
      2;

  }


  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      structurePositions,
      3
    )
  );


  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(
      structureSizes,
      1
    )
  );


  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(
      structurePhases,
      1
    )
  );


  const material =
    new THREE.ShaderMaterial({

      transparent:
        true,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0
        },

        uOpacity: {
          value: 0.20
        }

      },


      vertexShader: `

        attribute float aSize;
        attribute float aPhase;

        uniform float uTime;

        varying float vAlpha;


        void main() {

          vec3 p =
            position;


          p.x +=
            sin(
              uTime * 0.12 +
              aPhase
            ) *
            0.004;


          p.y +=
            cos(
              uTime * 0.10 +
              aPhase
            ) *
            0.003;


          vec4 mv =
            modelViewMatrix *
            vec4(
              p,
              1.0
            );


          gl_PointSize =
            aSize *
            420.0 /
            max(
              1.0,
              -mv.z
            );


          gl_Position =
            projectionMatrix *
            mv;


          vAlpha =
            0.75 +
            0.25 *
            sin(
              uTime * 0.45 +
              aPhase
            );

        }

      `,


      fragmentShader: `

        uniform float uOpacity;

        varying float vAlpha;


        void main() {

          vec2 uv =
            gl_PointCoord -
            vec2(0.5);


          float d =
            length(uv);


          float alpha =
            smoothstep(
              0.54,
              0.0,
              d
            ) *
            vAlpha *
            uOpacity;


          vec3 color =
            vec3(
              0.75,
              0.58,
              0.29
            );


          gl_FragColor =
            vec4(
              color,
              alpha
            );

        }

      `

    });


  kunpengStructureParticles =
    new THREE.Points(
      geometry,
      material
    );


  kunpengStructureParticles.position.set(
    0,
    0.02,
    0.38
  );


  universe.add(
    kunpengStructureParticles
  );

}



// ============================================================
// 20. 鲲鹏外围散落星尘
// ============================================================

function createKunpengDust(
  selected,
  scale,
  centerX,
  centerY
) {

  const count =
    window.innerWidth < 600
      ? 2200
      : 4200;


  const positions =
    new Float32Array(
      count * 3
    );


  const sizes =
    new Float32Array(
      count
    );


  const phases =
    new Float32Array(
      count
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const source =
      selected[
        Math.floor(
          Math.random() *
          selected.length
        )
      ];


    const x =
      (
        source.x -
        centerX
      ) *
      scale;


    const y =
      -(
        source.y -
        centerY
      ) *
      scale;


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      0.03 +
      Math.pow(
        Math.random(),
        1.65
      ) *
      1.05;


    const i3 =
      i * 3;


    positions[i3] =
      x +
      Math.cos(angle) *
      distance;


    positions[i3 + 1] =
      y +
      Math.sin(angle) *
      distance;


    positions[i3 + 2] =
      (
        Math.random() -
        0.5
      ) *
      0.85;


    sizes[i] =
      0.004 +
      Math.random() *
      0.015;


    phases[i] =
      Math.random() *
      Math.PI *
      2;

  }


  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );


  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(
      sizes,
      1
    )
  );


  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(
      phases,
      1
    )
  );


  const material =
    new THREE.ShaderMaterial({

      transparent:
        true,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0
        },

        uOpacity: {
          value: 0.92
        }

      },


      vertexShader: `

        attribute float aSize;
        attribute float aPhase;

        uniform float uTime;

        varying float vAlpha;


        void main() {

          vec3 p =
            position;


          p.x +=
            sin(
              uTime * 0.18 +
              aPhase
            ) *
            0.035;


          p.y +=
            cos(
              uTime * 0.14 +
              aPhase
            ) *
            0.025;


          vec4 mv =
            modelViewMatrix *
            vec4(
              p,
              1.0
            );


          gl_PointSize =
            aSize *
            170.0 /
            max(
              1.0,
              -mv.z
            );


          gl_Position =
            projectionMatrix *
            mv;


          vAlpha =
            0.18 +
            0.38 *
            (
              sin(
                uTime * 1.15 +
                aPhase
              ) + 1.0
            ) *
            0.5;

        }

      `,


      fragmentShader: `

        uniform float uOpacity;

        varying float vAlpha;


        void main() {

          vec2 uv =
            gl_PointCoord -
            vec2(0.5);


          float d =
            length(uv);


          float alpha =
            smoothstep(
              0.58,
              0.0,
              d
            ) *
            vAlpha *
            uOpacity;


          vec3 color =
            vec3(
              0.92,
              0.77,
              0.46
            );


          gl_FragColor =
            vec4(
              color,
              alpha
            );

        }

      `

    });


  kunpengDustParticles =
    new THREE.Points(
      geometry,
      material
    );


  kunpengDustParticles.position.set(
    0,
    0,
    0.30
  );


  universe.add(
    kunpengDustParticles
  );

}



// ============================================================
// 21. 第五版：鲲鹏背部体积层
//
// 这是这次新增的重点。
//
// 主粒子 = 正面古画像
//
// Volume = 背后的空间粒子
//
// 旋转时：
// 正面 → 仍然看到原来的鲲鹏
// 侧面 → 能看到厚度
// 背面 → 不会立即变成一张空纸
// ============================================================

function createKunpengVolumeLayer(
  positions,
  phases,
  sizes
) {

  const sourceCount =
    phases.length;


  const count =
    Math.min(
      sourceCount,
      window.innerWidth < 600
        ? 7000
        : 11000
    );


  const volumePositions =
    new Float32Array(
      count * 3
    );


  const volumeSizes =
    new Float32Array(
      count
    );


  const volumePhases =
    new Float32Array(
      count
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const sourceIndex =
      Math.floor(
        Math.random() *
        sourceCount
      );


    const s3 =
      sourceIndex * 3;

    const i3 =
      i * 3;


    const x =
      positions[s3];

    const y =
      positions[s3 + 1];

    const frontZ =
      positions[s3 + 2];



    // --------------------------------------------------------
    // 背部偏移
    //
    // 不完全复制。
    // 让后面形成稀疏的空间层。
    // --------------------------------------------------------

    const center =
      Math.exp(
        -(
          x * x +
          y * y * 1.35
        ) /
        9.5
      );


    const backDepth =
      0.16 +
      center * 0.36 +
      Math.random() * 0.20;



    volumePositions[i3] =
      x +
      (
        Math.random() -
        0.5
      ) *
      0.045;


    volumePositions[i3 + 1] =
      y +
      (
        Math.random() -
        0.5
      ) *
      0.045;


    volumePositions[i3 + 2] =
      frontZ -
      backDepth;


    volumeSizes[i] =
      sizes[sourceIndex] *
      (
        0.45 +
        Math.random() *
        0.45
      );


    volumePhases[i] =
      Math.random() *
      Math.PI *
      2;

  }


  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      volumePositions,
      3
    )
  );


  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(
      volumeSizes,
      1
    )
  );


  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(
      volumePhases,
      1
    )
  );


  const material =
    new THREE.ShaderMaterial({

      transparent:
        true,

      depthWrite:
        false,

      blending:
        THREE.AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0
        },

        uOpacity: {
          value: 0.22
        }

      },


      vertexShader: `

        attribute float aSize;
        attribute float aPhase;

        uniform float uTime;

        varying float vAlpha;


        void main() {

          vec3 p =
            position;


          p.z +=
            sin(
              uTime * 0.20 +
              aPhase
            ) *
            0.008;


          p.x +=
            sin(
              uTime * 0.12 +
              aPhase
            ) *
            0.008;


          vec4 mv =
            modelViewMatrix *
            vec4(
              p,
              1.0
            );


          gl_PointSize =
            aSize *
            360.0 /
            max(
              1.0,
              -mv.z
            );


          gl_Position =
            projectionMatrix *
            mv;


          vAlpha =
            0.55 +
            0.45 *
            (
              sin(
                uTime * 0.5 +
                aPhase
              ) + 1.0
            ) *
            0.5;

        }

      `,


      fragmentShader: `

        uniform float uOpacity;

        varying float vAlpha;


        void main() {

          vec2 uv =
            gl_PointCoord -
            vec2(0.5);


          float d =
            length(uv);


          float alpha =
            smoothstep(
              0.58,
              0.0,
              d
            ) *
            vAlpha *
            uOpacity;


          vec3 color =
            vec3(
              0.68,
              0.48,
              0.22
            );


          gl_FragColor =
            vec4(
              color,
              alpha
            );

        }

      `

    });


  kunpengVolumeParticles =
    new THREE.Points(
      geometry,
      material
    );


  kunpengVolumeParticles.position.set(
    0,
    0.02,
    0.20
  );


  universe.add(
    kunpengVolumeParticles
  );

}



// ============================================================
// 22. 备用鲲鹏
// ============================================================

function createKunpengFallback() {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    1000;

  canvas.height =
    700;


  const ctx =
    canvas.getContext(
      "2d"
    );


  ctx.fillStyle =
    "white";



  // 身体

  ctx.beginPath();

  ctx.ellipse(
    480,
    390,
    180,
    90,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();



  // 左翼

  ctx.beginPath();

  ctx.moveTo(
    400,
    350
  );

  ctx.bezierCurveTo(
    250,
    300,
    210,
    80,
    330,
    55
  );

  ctx.bezierCurveTo(
    420,
    150,
    445,
    250,
    470,
    330
  );

  ctx.closePath();

  ctx.fill();



  // 右翼

  ctx.beginPath();

  ctx.moveTo(
    540,
    350
  );

  ctx.bezierCurveTo(
    700,
    300,
    750,
    80,
    650,
    55
  );

  ctx.bezierCurveTo(
    570,
    150,
    550,
    250,
    530,
    330
  );

  ctx.closePath();

  ctx.fill();



  // 尾巴

  for (
    let i = 0;
    i < 6;
    i++
  ) {

    ctx.beginPath();

    ctx.moveTo(
      590,
      390 + i * 9
    );

    ctx.bezierCurveTo(
      700,
      370 + i * 8,
      800,
      450 + i * 10,
      880,
      350 + i * 30
    );

    ctx.lineWidth =
      18;

    ctx.strokeStyle =
      "white";

    ctx.stroke();

  }


  createParticleKunpengFromCanvas(
    canvas
  );

}



// ============================================================
// 23. 创建资料星
// ============================================================

function createInfoStars() {

  DATA.forEach(
    (
      item,
      index
    ) => {

      const isFeather =
        index % 4 === 2;


      const texture =
        createStarTexture(
          isFeather
        );


      const material =
        new THREE.SpriteMaterial({

          map:
            texture,

          transparent:
            true,

          opacity:
            item.core
              ? 0.95
              : 0.72,

          depthWrite:
            false,

          blending:
            THREE.AdditiveBlending

        });


      const sprite =
        new THREE.Sprite(
          material
        );


      const angle =
        (
          index /
          DATA.length
        ) *
        Math.PI *
        2;


      const radius =
        0.7 +
        Math.random() *
        1.0;


      sprite.position.set(

        Math.cos(angle) *
        radius,

        Math.sin(angle) *
        radius *
        0.7,

        0.75

      );


      const baseSize =
        item.core
          ? 0.30
          : 0.22;


      sprite.scale.set(
        baseSize,
        baseSize,
        1
      );


      sprite.userData = {

        data:
          item,

        baseSize,

        phase:
          Math.random() *
          Math.PI *
          2,

        index

      };


      infoStarGroup.add(
        sprite
      );


      infoStars.push(
        sprite
      );

    }
  );

}



// ============================================================
// 24. 把资料星真正放入鲲鹏
// ============================================================

function placeInfoStarsInsideKunpeng() {

  if (
    kunpengAnchors.length < 10
  ) {

    return;

  }


  infoStars.forEach(
    (
      sprite,
      index
    ) => {

      const anchorIndex =
        Math.floor(
          (
            index /
            infoStars.length
          ) *
          kunpengAnchors.length
        );


      const anchor =
        kunpengAnchors[
          anchorIndex
        ];


      const offsetX =
        (
          Math.random() -
          0.5
        ) *
        0.65;


      const offsetY =
        (
          Math.random() -
          0.5
        ) *
        0.45;


      sprite.position.set(

        anchor.x +
        offsetX,

        anchor.y +
        offsetY,

        // 资料星略微在鲲鹏前面
        0.90 +
        anchor.brightness *
        0.22 +
        Math.random() *
        0.25

      );


      sprite.userData.kunpengAnchor =
        anchor;

    }
  );

}



// ============================================================
// 25. UI
// ============================================================

function createUI() {

  const style =
    document.createElement(
      "style"
    );


  style.textContent = `

    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    html,
    body {
      width: 100%;
      height: 100%;
    }

    #projectTitle {

      position: fixed;

      left: 50%;
      top: 25px;

      transform:
        translateX(-50%);

      z-index: 20;

      color:
        rgba(236,220,180,0.76);

      font-family:
        "Noto Serif SC",
        "Songti SC",
        serif;

      font-size:
        15px;

      letter-spacing:
        0.12em;

      white-space:
        nowrap;

      pointer-events:
        none;

    }


    .titleStar {

      color:
        rgba(238,210,148,0.72);

      font-size:
        12px;

      margin:
        0 7px;

    }


    #hint {

      position: fixed;

      left: 50%;
      top: 50%;

      transform:
        translate(
          -50%,
          145px
        );

      z-index: 10;

      color:
        rgba(235,225,200,0.40);

      font-family:
        "Noto Serif SC",
        "Songti SC",
        serif;

      font-size:
        12px;

      letter-spacing:
        0.22em;

      pointer-events:
        none;

      transition:
        opacity 0.5s ease;

    }


    #categoryBar {

      position: fixed;

      left: 50%;
      bottom: 28px;

      transform:
        translateX(-50%);

      z-index: 20;

      display:
        flex;

      gap:
        8px;

      max-width:
        calc(100vw - 30px);

      overflow-x:
        auto;

      padding:
        7px 9px;

      border:
        1px solid
        rgba(235,210,150,0.18);

      border-radius:
        30px;

      background:
        rgba(3,5,15,0.52);

      backdrop-filter:
        blur(12px);

      -webkit-backdrop-filter:
        blur(12px);

      scrollbar-width:
        none;

      white-space:
        nowrap;

      transition:
        opacity 0.5s ease;

    }


    #categoryBar::-webkit-scrollbar {
      display: none;
    }


    .categoryButton {

      border:
        0;

      color:
        rgba(235,225,195,0.68);

      background:
        transparent;

      padding:
        8px 13px;

      border-radius:
        20px;

      font-family:
        "Noto Serif SC",
        "Songti SC",
        serif;

      font-size:
        13px;

      letter-spacing:
        0.08em;

      white-space:
        nowrap;

      cursor:
        pointer;

    }


    .categoryButton.active {

      color:
        #f6df9d;

      background:
        rgba(225,195,120,0.12);

      box-shadow:
        0 0 18px
        rgba(225,195,120,0.14);

    }


    #readingLayer {

      position:
        fixed;

      inset:
        0;

      z-index:
        30;

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      padding:
        30px;

      opacity:
        0;

      visibility:
        hidden;

      pointer-events:
        none;

      transition:
        opacity 0.7s ease,
        visibility 0.7s ease;

    }


    #readingLayer.show {

      opacity:
        1;

      visibility:
        visible;

      pointer-events:
        auto;

    }


    #readingCard {

      width:
        min(760px, 90vw);

      max-height:
        78vh;

      overflow-y:
        auto;

      padding:
        42px 38px;

      text-align:
        center;

      border-top:
        1px solid
        rgba(239,215,155,0.22);

      border-bottom:
        1px solid
        rgba(239,215,155,0.12);

      background:
        radial-gradient(
          ellipse at center,
          rgba(10,12,27,0.65),
          rgba(2,3,10,0.18)
        );

      backdrop-filter:
        blur(6px);

      -webkit-backdrop-filter:
        blur(6px);

      scrollbar-width:
        none;

    }


    #readingCard::-webkit-scrollbar {
      display:
        none;
    }


    #readingCategory {

      color:
        rgba(230,202,137,0.76);

      font-family:
        "Noto Serif SC",
        serif;

      font-size:
        12px;

      letter-spacing:
        0.3em;

      margin-bottom:
        44px;

    }


    #readingText {

      color:
        rgba(248,239,214,0.96);

      font-family:
        "Noto Serif SC",
        "Songti SC",
        serif;

      font-size:
        clamp(
          24px,
          4vw,
          38px
        );

      line-height:
        2;

      letter-spacing:
        0.08em;

      max-width:
        720px;

      margin:
        0 auto;

    }


    #readingSource {

      margin-top:
        20px;

      color:
        rgba(225,207,170,0.58);

      font-family:
        "Noto Serif SC",
        serif;

      font-size:
        12px;

      letter-spacing:
        0.08em;

    }


    #readingIntro {

      margin:
        8px auto 0;

      max-width:
        600px;

      color:
        rgba(225,220,205,0.58);

      font-family:
        "Noto Serif SC",
        "Songti SC",
        serif;

      font-size:
        13px;

      line-height:
        2;

      letter-spacing:
        0.08em;

    }


    #readingClose {

      margin-top:
        20px;

      color:
        rgba(235,220,180,0.42);

      font-family:
        "Noto Serif SC",
        serif;

      font-size:
        11px;

      letter-spacing:
        0.25em;

    }


    #selectedStar {

      position:
        fixed;

      width:
        90px;

      height:
        90px;

      z-index:
        40;

      pointer-events:
        none;

      transform:
        translate(
          -50%,
          -50%
        );

      opacity:
        0;

      transition:
        opacity 0.6s ease;

    }


    #selectedStar::before {

      content:
        "";

      position:
        absolute;

      inset:
        0;

      border-radius:
        50%;

      background:
        radial-gradient(
          circle,
          rgba(255,238,180,0.9) 0%,
          rgba(237,207,130,0.28) 18%,
          rgba(237,207,130,0) 68%
        );

      filter:
        blur(3px);

    }


    #selectedStar::after {

      content:
        "✦";

      position:
        absolute;

      inset:
        0;

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      color:
        #fff0bb;

      font-size:
        34px;

      text-shadow:
        0 0 10px
        rgba(255,226,147,0.9),
        0 0 28px
        rgba(225,193,110,0.7);

    }


    @media (max-width: 600px) {

      #projectTitle {

        top:
          18px;

        font-size:
          12px;

      }


      #hint {

        transform:
          translate(
            -50%,
            125px
          );

      }


      #categoryBar {

        bottom:
          15px;

      }


      .categoryButton {

        font-size:
          12px;

        padding:
          7px 11px;

      }


      #readingCard {

        padding:
          32px 20px;

      }


      #readingText {

        font-size:
          clamp(
            21px,
            6vw,
            30px
          );

        line-height:
          1.9;

      }

    }

  `;


  document.head.appendChild(
    style
  );



  // ==========================================================
  // Title
  // ==========================================================

  const title =
    document.createElement(
      "div"
    );


  title.id =
    "projectTitle";


  title.innerHTML =
    `<span class="titleStar">✦</span>
     <span>如 · 是 · 我 · 闻</span>
     <span class="titleStar">✦</span>`;


  document.body.appendChild(
    title
  );



  // ==========================================================
  // Hint
  // ==========================================================

  const hint =
    document.createElement(
      "div"
    );


  hint.id =
    "hint";


  hint.textContent =
    "触碰星辰，听见未来";


  document.body.appendChild(
    hint
  );



  // ==========================================================
  // Category bar
  // ==========================================================

  const bar =
    document.createElement(
      "div"
    );


  bar.id =
    "categoryBar";


  CATEGORIES.forEach(
    category => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "categoryButton";


      button.textContent =
        category;


      button.addEventListener(
        "click",
        () => {

          toggleCategory(
            category,
            button
          );

        }
      );


      bar.appendChild(
        button
      );

    }
  );


  document.body.appendChild(
    bar
  );



  // ==========================================================
  // Reading layer
  // ==========================================================

  const layer =
    document.createElement(
      "div"
    );


  layer.id =
    "readingLayer";


  layer.innerHTML = `

    <div id="readingCard">

      <div id="readingCategory"></div>

      <div id="readingText"></div>

      <div id="readingSource"></div>

      <div id="readingIntro"></div>

      <div id="readingClose">
        点击空白处返回星海
      </div>

    </div>

  `;


  document.body.appendChild(
    layer
  );



  // ==========================================================
  // Selected star
  // ==========================================================

  const selectedStar =
    document.createElement(
      "div"
    );


  selectedStar.id =
    "selectedStar";


  document.body.appendChild(
    selectedStar
  );

}



// ============================================================
// 26. Category
// ============================================================

function toggleCategory(
  category,
  button
) {

  if (
    activeCategory ===
    category
  ) {

    activeCategory =
      null;


    document
      .querySelectorAll(
        ".categoryButton"
      )
      .forEach(
        btn => {

          btn.classList.remove(
            "active"
          );

        }
      );

  }

  else {

    activeCategory =
      category;


    document
      .querySelectorAll(
        ".categoryButton"
      )
      .forEach(
        btn => {

          btn.classList.remove(
            "active"
          );

        }
      );


    button.classList.add(
      "active"
    );

  }

}



// ============================================================
// 27. Update info stars
// ============================================================

function updateInfoStars(
  time
) {

  infoStars.forEach(
    sprite => {

      const data =
        sprite.userData.data;


      const phase =
        sprite.userData.phase;


      const pulse =
        (
          Math.sin(
            time * 1.4 +
            phase
          ) + 1
        ) * 0.5;


      let targetOpacity =
        data.core
          ? 0.88 + pulse * 0.12
          : 0.58 + pulse * 0.14;


      let targetScale =
        sprite.userData.baseSize;


      if (
        activeCategory !== null
      ) {

        if (
          data.category ===
          activeCategory
        ) {

          targetOpacity =
            data.core
              ? 1
              : 0.88;


          targetScale *=
            data.core
              ? 1.22
              : 1.10;

        }

        else {

          targetOpacity =
            0.045;


          targetScale *=
            0.72;

        }

      }


      sprite.material.opacity +=
        (
          targetOpacity -
          sprite.material.opacity
        ) *
        0.08;


      const currentSize =
        sprite.scale.x;


      sprite.scale.x +=
        (
          targetScale -
          currentSize
        ) *
        0.08;


      sprite.scale.y =
        sprite.scale.x;

    }
  );

}



// ============================================================
// 28. Raycaster
// ============================================================

const raycaster =
  new THREE.Raycaster();


const pointerVector =
  new THREE.Vector2();



// ============================================================
// 29. 点击资料星
// ============================================================

renderer.domElement.addEventListener(
  "pointerup",
  function(event) {

    if (
      readingOpen
    ) {

      return;

    }


    if (
      pinchActive
    ) {

      return;

    }


    pointerVector.x =
      (
        event.clientX /
        window.innerWidth
      ) *
      2 -
      1;


    pointerVector.y =
      -(
        event.clientY /
        window.innerHeight
      ) *
      2 +
      1;


    raycaster.setFromCamera(
      pointerVector,
      camera
    );


    const intersections =
      raycaster.intersectObjects(
        infoStars,
        false
      );


    if (
      intersections.length === 0
    ) {

      return;

    }


    const selected =
      intersections[0].object;


    openReading(
      selected
    );

  }
);



// ============================================================
// 30. Open reading
// ============================================================

function openReading(
  sprite
) {

  const item =
    sprite.userData.data;


  selectedInfoStar =
    sprite;


  readingOpen =
    true;


  sprite.material.opacity =
    0;


  document.getElementById(
    "readingCategory"
  ).textContent =
    item.category;


  document.getElementById(
    "readingText"
  ).textContent =
    item.text;


  document.getElementById(
    "readingSource"
  ).textContent =
    item.source;


  document.getElementById(
    "readingIntro"
  ).textContent =
    item.intro;


  const screen =
    worldToScreen(
      sprite.position
    );


  const selectedStar =
    document.getElementById(
      "selectedStar"
    );


  selectedStar.style.left =
    screen.x + "px";


  selectedStar.style.top =
    screen.y + "px";


  selectedStar.style.opacity =
    "1";


  backgroundStars.forEach(
    object => {

      if (
        object.material &&
        object.material.opacity !==
        undefined
      ) {

        object.userData =
          object.userData || {};


        object.userData.normalOpacity =
          object.material.opacity;


        object.material.opacity *=
          0.08;

      }

    }
  );


  if (
    kunpengParticles
  ) {

    kunpengParticles.material.uniforms.uOpacity.value =
      0.34;

  }


  if (
    kunpengGlowParticles
  ) {

    kunpengGlowParticles.material.uniforms.uOpacity.value =
      0.07;

  }


  if (
    kunpengStructureParticles
  ) {

    kunpengStructureParticles.material.uniforms.uOpacity.value =
      0.08;

  }


  if (
    kunpengDustParticles
  ) {

    kunpengDustParticles.material.uniforms.uOpacity.value =
      0.12;

  }


  if (
    kunpengVolumeParticles
  ) {

    kunpengVolumeParticles.material.uniforms.uOpacity.value =
      0.06;

  }


  renderer.domElement.style.transition =
    "filter 0.7s ease, opacity 0.7s ease";


  renderer.domElement.style.filter =
    "blur(3px)";


  renderer.domElement.style.opacity =
    "0.55";


  document.getElementById(
    "categoryBar"
  ).style.opacity =
    "0";


  document.getElementById(
    "hint"
  ).style.opacity =
    "0";


  requestAnimationFrame(
    () => {

      document
        .getElementById(
          "readingLayer"
        )
        .classList.add(
          "show"
        );

    }
  );

}



// ============================================================
// 31. Close reading
// ============================================================

function closeReading() {

  if (
    !readingOpen
  ) {

    return;

  }


  readingOpen =
    false;


  document
    .getElementById(
      "readingLayer"
    )
    .classList.remove(
      "show"
    );


  renderer.domElement.style.filter =
    "blur(0px)";


  renderer.domElement.style.opacity =
    "1";


  document.getElementById(
    "categoryBar"
  ).style.opacity =
    "1";


  document.getElementById(
    "hint"
  ).style.opacity =
    "1";


  backgroundStars.forEach(
    object => {

      if (
        object.material &&
        object.userData &&
        object.userData.normalOpacity !==
        undefined
      ) {

        object.material.opacity =
          object.userData.normalOpacity;


        delete object.userData.normalOpacity;

      }

    }
  );


  if (
    selectedInfoStar
  ) {

    const data =
      selectedInfoStar.userData.data;


    selectedInfoStar.material.opacity =
      data.core
        ? 0.9
        : 0.68;


    selectedInfoStar =
      null;

  }


  if (
    kunpengParticles
  ) {

    kunpengParticles.material.uniforms.uOpacity.value =
      1;

  }


  if (
    kunpengGlowParticles
  ) {

    kunpengGlowParticles.material.uniforms.uOpacity.value =
      0.18;

  }


  if (
    kunpengStructureParticles
  ) {

    kunpengStructureParticles.material.uniforms.uOpacity.value =
      0.20;

  }


  if (
    kunpengDustParticles
  ) {

    kunpengDustParticles.material.uniforms.uOpacity.value =
      0.92;

  }


  if (
    kunpengVolumeParticles
  ) {

    kunpengVolumeParticles.material.uniforms.uOpacity.value =
      0.22;

  }


  document.getElementById(
    "selectedStar"
  ).style.opacity =
    "0";

}



// ============================================================
// 32. Reading layer close
// ============================================================

document
  .getElementById(
    "readingLayer"
  )
  .addEventListener(
    "pointerdown",
    function(event) {

      if (
        event.target.id ===
        "readingLayer"
      ) {

        closeReading();

      }

    }
  );



// ============================================================
// 33. World → Screen
// ============================================================

function worldToScreen(
  position
) {

  const vector =
    position.clone();


  vector.project(
    camera
  );


  return {

    x:
      (
        vector.x + 1
      ) *
      window.innerWidth /
      2,

    y:
      (
        -vector.y + 1
      ) *
      window.innerHeight /
      2

  };

}



// ============================================================
// 34. Pointer move
// ============================================================

window.addEventListener(
  "pointermove",
  function(event) {

    if (
      readingOpen
    ) {

      return;

    }


    pointer.x =
      (
        event.clientX /
        window.innerWidth
      ) *
      2 -
      1;


    pointer.y =
      -(
        event.clientY /
        window.innerHeight
      ) *
      2 +
      1;


    targetTiltY =
      pointer.x *
      0.035;


    targetTiltX =
      pointer.y *
      0.02;

  }
);



// ============================================================
// 35. Pointer
// ============================================================

window.addEventListener(
  "pointerdown",
  function() {

    if (
      !readingOpen
    ) {

      pointer.active =
        true;

    }

  }
);


window.addEventListener(
  "pointerup",
  function() {

    pointer.active =
      false;

  }
);


window.addEventListener(
  "pointercancel",
  function() {

    pointer.active =
      false;

  }
);



// ============================================================
// 36. Wheel zoom
// ============================================================

window.addEventListener(
  "wheel",
  function(event) {

    if (
      readingOpen
    ) {

      return;

    }


    event.preventDefault();


    const amount =
      event.deltaY > 0
        ? -0.10
        : 0.10;


    targetZoom +=
      amount;


    targetZoom =
      THREE.MathUtils.clamp(
        targetZoom,
        MIN_ZOOM,
        MAX_ZOOM
      );

  },
  {
    passive: false
  }
);



// ============================================================
// 37. Pinch
// ============================================================

let pinchActive =
  false;


let pinchStartDistance =
  0;


let pinchStartZoom =
  1;



function getTouchDistance(
  touches
) {

  const dx =
    touches[0].clientX -
    touches[1].clientX;


  const dy =
    touches[0].clientY -
    touches[1].clientY;


  return Math.sqrt(
    dx * dx +
    dy * dy
  );

}



renderer.domElement.addEventListener(
  "touchstart",
  function(event) {

    if (
      event.touches.length === 2
    ) {

      event.preventDefault();


      pinchActive =
        true;


      pinchStartDistance =
        getTouchDistance(
          event.touches
        );


      pinchStartZoom =
        targetZoom;

    }

  },
  {
    passive: false
  }
);



renderer.domElement.addEventListener(
  "touchmove",
  function(event) {

    if (
      event.touches.length !== 2
    ) {

      return;

    }


    event.preventDefault();


    const currentDistance =
      getTouchDistance(
        event.touches
      );


    if (
      pinchStartDistance <= 0
    ) {

      return;

    }


    const ratio =
      currentDistance /
      pinchStartDistance;


    targetZoom =
      pinchStartZoom *
      ratio;


    targetZoom =
      THREE.MathUtils.clamp(
        targetZoom,
        MIN_ZOOM,
        MAX_ZOOM
      );

  },
  {
    passive: false
  }
);



renderer.domElement.addEventListener(
  "touchend",
  function(event) {

    if (
      event.touches &&
      event.touches.length < 2
    ) {

      pinchActive =
        false;


      pinchStartDistance =
        0;

    }

  }
);



// ============================================================
// 38. Animation
// ============================================================

const clock =
  new THREE.Clock();



function animate() {

  requestAnimationFrame(
    animate
  );


  const time =
    clock.getElapsedTime();



  // ==========================================================
  // Zoom
  // ==========================================================

  currentZoom +=
    (
      targetZoom -
      currentZoom
    ) *
    0.08;


  universe.scale.set(
    currentZoom,
    currentZoom,
    currentZoom
  );



  // ==========================================================
  // Tilt
  // ==========================================================

  currentTiltX +=
    (
      targetTiltX -
      currentTiltX
    ) *
    0.025;


  currentTiltY +=
    (
      targetTiltY -
      currentTiltY
    ) *
    0.025;


  universe.rotation.x =
    currentTiltX;


  universe.rotation.y =
    currentTiltY;



  // ==========================================================
  // 鲲鹏主粒子
  // ==========================================================

  if (
    kunpengParticles
  ) {

    kunpengParticles
      .material
      .uniforms
      .uTime
      .value =
      time;


    const breathe =
      1 +
      Math.sin(
        time * 0.42
      ) *
      0.008;


    kunpengParticles.scale.set(
      breathe,
      breathe,
      breathe
    );

  }



  // ==========================================================
  // 柔光
  // ==========================================================

  if (
    kunpengGlowParticles
  ) {

    kunpengGlowParticles
      .material
      .uniforms
      .uTime
      .value =
      time;

  }



  // ==========================================================
  // 构型层
  // ==========================================================

  if (
    kunpengStructureParticles
  ) {

    kunpengStructureParticles
      .material
      .uniforms
      .uTime
      .value =
      time;

  }



  // ==========================================================
  // 星尘
  // ==========================================================

  if (
    kunpengDustParticles
  ) {

    kunpengDustParticles
      .material
      .uniforms
      .uTime
      .value =
      time;

  }



  // ==========================================================
  // 第五版体积层
  // ==========================================================

  if (
    kunpengVolumeParticles
  ) {

    kunpengVolumeParticles
      .material
      .uniforms
      .uTime
      .value =
      time;

  }



  // ==========================================================
  // Background
  // ==========================================================

  backgroundStars.forEach(
    (
      object,
      index
    ) => {

      if (
        !object.userData ||
        !object.userData.seeds
      ) {

        if (
          object.userData &&
          object.userData.phase !==
          undefined
        ) {

          const pulse =
            (
              Math.sin(
                time * 0.8 +
                object.userData.phase
              ) + 1
            ) *
            0.5;


          const scale =
            object.userData.baseSize *
            (
              0.92 +
              pulse * 0.14
            );


          object.scale.set(
            scale,
            scale,
            1
          );


          const normalOpacity =
            object.userData.baseOpacity !==
            undefined
              ? object.userData.baseOpacity
              : 0.65;


          object.material.opacity =
            readingOpen
              ? normalOpacity * 0.08
              : normalOpacity *
                (
                  0.72 +
                  pulse * 0.28
                );

        }

        return;

      }


      const seeds =
        object.userData.seeds;


      const position =
        object.geometry
          .attributes
          .position;


      const speed =
        object.userData.speed;


      for (
        let i = 0;
        i < position.count;
        i++
      ) {

        const i3 =
          i * 3;


        const seed =
          seeds[i];


        position.array[i3] +=
          Math.sin(
            time * speed +
            seed * 30
          ) *
          0.00010;


        position.array[i3 + 1] +=
          Math.cos(
            time * speed * 0.8 +
            seed * 25
          ) *
          0.00008;

      }


      position.needsUpdate =
        true;


      const baseOpacity =
        object.userData.baseOpacity;


      const normalPulse =
        0.88 +
        Math.sin(
          time * 0.5 +
          index
        ) *
        0.08;


      object.material.opacity =
        readingOpen
          ? baseOpacity * 0.12
          : baseOpacity *
            normalPulse;

    }
  );



  // ==========================================================
  // Info stars
  // ==========================================================

  updateInfoStars(
    time
  );



  // ==========================================================
  // Render
  // ==========================================================

  renderer.render(
    scene,
    camera
  );

}



// ============================================================
// 39. Start
// ============================================================

animate();



// ============================================================
// 40. Resize
// ============================================================

window.addEventListener(
  "resize",
  function() {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );


    if (
      kunpengParticles
    ) {

      kunpengParticles
        .material
        .uniforms
        .uPixelRatio
        .value =
        Math.min(
          window.devicePixelRatio,
          2
        );

    }

  }
);
