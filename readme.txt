* 包含关系：
  document.body → renderer → scene → mesh → geometry
                                          → material
                                   → pointLight
                           → camera

* Object3D：
  · Three.Object3D是threejs中的基类，是一切的三维空间的基础，就是一个抽象概念
  · bject3D最主要是具有下面四点特性：
    ~ Rotation 旋转
    ~ RPosition 位置
    ~ RScale 缩放
    ~ RVisiblity 可见性
  · add：添加子对象
  · remove：移除子对象
  · traverse:递归遍历
  · getObjectByName / getObjectById ：查找某个具体的模型  
  · updateMatrix：
    ~ 文档：https://www.jianshu.com/p/8aa21a1ae6a6
    ~ 设置不自动更新：object3d.matrixAutoUpdate = false;
    ~ 手动更新：object3d.updateMatrix();
  · layers：层级属性

* Scene:
  · 继承自Object3D，几乎与Object3D相同。 
  · 属性：
    ~ fog：雾。分为线性雾（Fog）和指数雾（FogExp2）
  · 它的目的是将要渲染的对象添加到一个统一的容器中。
  · 场景允许你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。

* Group：
  · 继承自Object3D，几乎与Object3D相同。 
  · 它的目的是使对一组对象的处理在句法上更清晰。

* Layers：
  · 图层，与CAD的图层概念类似，用于控制放在该层中的对象的显示与否
  · 和相机处于同一层次的对象可见，否则不可见。切换模式就只需切换一下相机的层次就可以了。
  · 一个独立的类，未继承任何其他类
  · 0-31，共32层级
  · 所有对象默认为0层
  · 例子：
    let layer = new THREE.Layers();
    layer.set(2);
    mesh.layers = layer;
  · 属性：
    ~ mask：用bit mask表示当前图层对象与0 - 31中的哪些图层相对应。所属层所对应的比特位为1，其他位位0。
  · 方法
    ~ disable(layer:Integer): 删除图层对象与参数指定图层的对应关系。
    ~ enable(layer:Integer): 增加图层对象与参数指定图层的对应关系。
    ~ set(layer:Integer): 删除图层对象已有的所有对应关系，增加与参数指定的图层的对应关系。
    ~ test(layers:Layers):如果传入图层对象与当前对象属于相同的一组图层，则返回 true，否则返回 false。
    ~ toggle(layer:Integer):根据参数切换对象所属图层。
  · 文档：http://www.webgl3d.cn/threejs/docs/#api/zh/core/Layers
  · demo：https://threejs.org/examples/webgl_layers.html

* 物体：
  · Bone：
    ~ 骨骼（Bone）
    ~ 骨骼是Skeleton（骨架）的一部分。骨架是由SkinnedMesh（蒙皮网格）依次来使用的。 骨骼几乎和空白Object3D相同。
  · Group：详见Group
  · InstancedMesh：
    ~ 实例化网格
    ~ 具有实例渲染支持的 特殊Mesh版本。如果您必须渲染大量具有相同几何体和材质但具有不同世界变换的对象，请使用InstancedMesh。InstancedMesh的使用将帮助您减少绘制调用的数量，从而提高应用程序的整体渲染性能。
    ~ 例子：http://www.webgl3d.cn/threejs/examples/#webgl_instancing_suzanne
  · Line：
    ~ 一条连续的线
    ~ 它几乎和LineSegments是一样的，唯一的区别是它在渲染时使用的是gl.LINE_STRIP，而不是gl.LINES
  · LineLoop：
    ~ 环线
    ~ 它几乎和Line是相同的，唯一的区别是它在渲染时使用的是gl.LINE_LOOP， 而不是gl.LINE_STRIP，它绘制一条直线到下一个顶点，并将最后一个顶点连回第一个顶点。
  · LineSegments
    ~ 线段
    ~ 在若干对的顶点之间绘制的一系列的线。它和Line几乎是相同的，唯一的区别是它在渲染时使用的是gl.LINES，而不是gl.LINE_STRIP。
  · LOD：
    ~ 多细节层次（Levels of Detail）
    ~ 在显示网格时，根据摄像机距离物体的距离，来使用更多或者更少的几何体来对其进行显示。
    ~ 每一个级别都和一个几何体相关联，且在渲染时，可以根据给定的距离，来在这些级别对应的几何体之间进行切换。 通常情况下，你会创建多个几何体，比如说三个，一个距离很远（低细节），一个距离适中（中等细节），还有一个距离非常近（高质量）
    ~ 例子：http://www.webgl3d.cn/threejs/examples/#webgl_lod
  · Mesh：详见Mesh
  · Points
    ~ 点
    ~ 一个用于显示点的类。由WebGLRenderer渲染的点使用gl.POINTS
  · Skeleton
    ~ 骨架
    ~ 使用一个bones数组来创建一个可以由SkinnedMesh使用的骨架。
  · SkinnedMesh:
    ~ 蒙皮网格
    ~ 具有Skeleton（骨架）和bones（骨骼）的网格，可用于给几何体上的顶点添加动画。 其材质必须支持蒙皮，并且已经启用了蒙皮 
  · Sprite
    ~ 精灵
    ~ 精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。
    ~ 精灵不会投射任何阴影，即使设置了

* Mesh：
  · Mesh = Geometry + Material
  · Mesh: 就是对应的Triangle三角面处理过程；
  · Geometry: 就是在准备顶点数据，对应Vertex处理过程；
  · Material：对应Fragment片元处理过程，对每个三角面片进行着色、贴图等等处理；

* Geometry / BufferGeometry：
  · 几何体：webgl的顶点数据源
  · 属性：
    ~ index：顶点索引
    ~ attributes：
      ~ position： 顶点数据，记录模型顶点位置
      ~ color：颜色数据，用于顶点颜色数据插值计算
      ~ normal：法向量数据。用计算漫反射、镜面反射等效果，使表面明暗自然不同，在分界位置有棱角感。
      ~ uv：uv贴映射数据。uv映射就是将二维的贴图映射到对象的一个面（或者多个面）上，实现对纹理对象Texture旋转、偏移、裁剪等。 例子：《28、几何体顶点纹理坐标UV.html》
      ~ tangent：切线数据。作用未知，该数据可以通过其他几个属性计算得到
  · 方法：
    ~ merge：通过merge合并其他几何体以提升性能。merge以后只是一个整体，无法再分开，也没办法判断点击的哪个物体，这只适合合并一些场景内不再修改的模型。
  · geometry和BufferGeometry区别：
    ~ Geometry更适合于人来理解，自定义的地方比较多，但性能比较低一些；
    ~ BufferGeometry更适合计算机来理解，自定义的地方很少，适合对图形学非常了解的人使用，但是性能很高。
  · Three.js一共有23种内置的图元：
    ~ 盒子(Box)：BoxBufferGeometry、BoxGeometry
    ~ 平面圆(Circle)：CircleBufferGeometry、CircleGeometry
    ~ 锥形(Cone)：ConeBufferGeometry、ConeGeometry
    ~ 圆柱(Cylinder)：CylinderBufferGeometry、CylinderGeometry
    ~ 边界(Edges)：EdgesBufferGeometry、EdgesGeometry
    ~ 十二面体(Dodecahedron)：DodecahedronBufferGeometry、DodecahedronGeometry
    ~ 受挤压的2D形状(Extrude)：ExtrudeBufferGeometry、ExtrudeGeometry
    ~ 二十面体(Icosahedron)：IcosahedronBufferGeometry、IcosahedronGeometry
    ~ 由线旋转形成的形状(Lathe)：LatheBufferGeometry、LatheGeometry
    ~ 八面体(Octahedron)：OctahedronBufferGeometry、OctahedronGeometry
    ~ 由函数生成的形状(Parametric)：ParametricBufferGeometry、ParametriceGeometry
    ~ 2D平面矩形(Plane)：PlaneBufferGeometry、PlaneGeometry
    ~ 多面体(Polyhedron)：PolyhedronBufferGeometry、PolyhedronGeometry
    ~ 环形/孔形(Ring)：RingBufferGeometry、RingGeometry
    ~ 2D形状(Shape)：ShapeBufferGeometry、ShapeGeometry
    ~ 球体(Sphere)：SphereBufferGeometry、SphereGeometry
    ~ 四面体(Tetrahedron)：TetrahedronBufferGeometry、TetrahedronGeometry
    ~ 3D文字(Text)：TextBufferGeometry、TextGeometry
    ~ 环形体(Torus)：TorusBufferGeometry、TorusGeometry
    ~ 环形结(TorusKnot)：TorusKnotBufferGeometry、TorusKnotGeometry
    ~ 管道/管状(Tube)：TubeBufferGeometry、TubeGeometry
    ~ 几何体的所有边缘(Edges)：EdgesGeometry
    ~ 线框图(Wireframe)：WireframeGeometry


                           
* Material：
  · 材质：材料的质感。材料可以看成是材料和质感的结合。在渲染程式中，它是表面各可视属性的结合，这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。
  · 分类：
    ~ LineBasicMaterial：基础线条材质。一种用于绘制线框样式几何体的材质。
    ~ LineDashedMaterial
    ~ Material
    ~ MeshBasicMaterial：基础网格材质，不受光照影响的材质
    ~ MeshDepthMaterial
    ~ MeshDistanceMaterial
    ~ MeshLambertMaterial：Lambert网格材质，与光照有反应，漫反射
    ~ MeshMatcapMaterial
    ~ MeshNormalMaterial
    ~ MeshPhongMaterial：高光Phong材质,与光照有反应。有明显的高光区，适用于湿滑的，表面具有光泽的物体。如：玻璃、水滴、金属类明亮的物体等。有镜面反射的效果。
    ~ MeshPhysicalMaterial
    ~ MeshStandardMaterial：PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果
    ~ MeshToonMaterial
    ~ PointsMaterial
    ~ RawShaderMaterial
    ~ ShaderMaterial
    ~ ShadowMaterial
    ~ SpriteMaterial



* 顶点法向量：
  · 表面三维模型通常采用网格，尤其是三角网格来表示，即三角形和顶点，而同一个顶点可能由多个三角形共享。表面上某位置的法线是该处切平面的垂线，单个顶点肯定是无法计算法线的，所以网格上的法线通常是通过三角形的法线来计算的。比如上图左在渲染的时候每个三角形一个法线，渲染的结果就是一个个三角平面，如果我们想渲染光滑的曲面呢，那也很简单，每个顶点一个法线，三角形内的颜色之类的属性通过插值得到，而这个顶点法线用其相邻的三角形的法线加权平均得到，那么问题来了，这样的方式会抹去一些sharp feature，比如上图中的sharp的棱被抹去了，解决这个问题也很简单，比如某个二面角的角度大于一个阈值，我们认为这个是sharp feature，不能平滑，这时对于edge上的顶点就存储两个法线，渲染不同的两个三角形的时候用不同的法线，这样就既做到了平滑渲染又保留了sharp feature。
    https://www.zhihu.com/question/294271776/answer/544982916

  · computeVertexNormals：https://zhuanlan.zhihu.com/p/361633307
  · 如何确定顶点法向量的方向：对于顶点v。找出所有包含这个顶点的三角形，存在face_list里面。求出face_list里面每一个三角形的平面法线，然后把所有这些法线加起来，归一化，就是顶点v的法线。




* 光源：
  Object3D → Light  → AmbientLight：环境光
                    → DirectionalLight：平行光
                    → PointLight：点光源
                    → SpotLight：聚光灯光源

* 常用库：
  · ammo.wasm.js：目前知名物理引擎Bullet 3D已经提供对应的JS版本——Ammo，并提供了js与wasm两个版本供Web开发者使用。
  · stats.js：主要用于检测动画运行时的帧数
  · OrbitControls.js：轨道控制器OrbitControls.js是一个相当神奇的控件，用它可以实现场景用鼠标交互，让场景动起来，控制场景的旋转、平移，缩放
  · ConvexObjectBreaker.js:
  · ConvexGeometry.js:通过THREE.ConvexGeometry，我们可以围绕一组点创建一个凸包。所谓凸包就是包围这组点的最小图形。也就是所有的点都在当前模型的体内，而且当前图形还是实现的体积最小的一个模型。
  · dat.gui.js：Dat.gui 是一个GUI组件，他可以为你的demo提供参数的设置，并且很容易上手。https://www.cnblogs.com/xiaoniuzai/p/6685556.html
  · Lensflare.js：Three.js通过Lensflare可以创造出我们看向太阳的时候出现的那种光晕的效果。                  
  · EffectComposer.js：后期处理

* 模型：
  · 默认支持的格式：
  · 不支持格式可以参考其他loader依葫芦画瓢地写出来
  · Obj：
  · mtl：


* PostProcessing：
  · 概念：
    后处理也叫PostProcessing，是图形渲染或者游戏引擎中非常常见的一种技术。
    它的实现方式通常是在普通的场景渲染结束后对结果再执行进一步的处理,一般是通过绘制一个铺满屏幕的四方形（quad），并将渲染的buffer作为texture传入，调用shader计算，将计算结果写入到另一个buffer中，最终显示在屏幕上。每个计算流程和普通的模型场景渲染一样,不同之处在于在vertex shader中通常只是简单的拷贝,主要的逻辑计算写在fragement shader中。
    一般我们将一组特定的功能代码组织在一起配合shader处理，这样一次处理我们叫一个pass，然后将多个pass一起组合在一起组成了整个后处理的渲染流水线。
  · 文档：https://zhuanlan.zhihu.com/p/151254866
  

* 坑：
  · FBXLoader有时候加载不出纹理是因为版本问题












