* 包含关系：
  document.body → renderer → scene → mesh → geometry
                                          → material
                                   → pointLight
                           → camera

* 渲染器:
  ·分类：
    ~ WebGLMultisampleRenderTarget
      ~ 一个特殊的渲染目标，可以用来利用多采样渲染缓冲区。
      ~ WebGLMultisampleRenderTarget只能与WebGL 2渲染上下文一起使用。  
    ~ WebGLRenderer
    ~ WebGLRenderTarget:
      ~ render target是一个缓冲，就是在这个缓冲中，视频卡为正在后台渲染的场景绘制像素。 它用于不同的效果，例如用于在一个图像显示在屏幕上之前先做一些处理。
    ~ WebGLRenderTargetCube:
      ~ 被CubeCamera作为它的WebGLRenderTarget使用

* 摄像机：
  · 分类：
    ~ ArrayCamera：
      ~ 摄像机阵列
      ~ ArrayCamera用于更加高效地使用一组已经预定义的摄像机来渲染一个场景。这将能够更好地提升VR场景的渲染性能。
      ~ 一个ArrayCamera的实例中总是包含着一组子摄像机，应当为每一个子摄像机定义viewport（视口）这个属性，这一属性决定了由该子摄像机所渲染的视口区域的大小。
    ~ Camera
      ~ 摄像机的抽象基类。在构建新摄像机时，应始终继承此类。
    ~ CubeCamera
      ~ 立方相机
      ~ 创建6个摄像机，并将它们所拍摄的场景渲染到WebGLRenderTargetCube上。
    ~ OrthographicCamera
      ~ 正交相机
      ~ 这一摄像机使用orthographic projection（正交投影）来进行投影。在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。
    ~ PerspectiveCamera
      ~ 透视相机
      ~ 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
    ~ StereoCamera
      ~ 立体相机
      ~ 双透视摄像机（立体相机）常被用于创建3D Anaglyph（3D立体影像）或者Parallax Barrier（视差效果）。

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

* 顶点法向量：
  · 表面三维模型通常采用网格，尤其是三角网格来表示，即三角形和顶点，而同一个顶点可能由多个三角形共享。表面上某位置的法线是该处切平面的垂线，单个顶点肯定是无法计算法线的，所以网格上的法线通常是通过三角形的法线来计算的。比如上图左在渲染的时候每个三角形一个法线，渲染的结果就是一个个三角平面，如果我们想渲染光滑的曲面呢，那也很简单，每个顶点一个法线，三角形内的颜色之类的属性通过插值得到，而这个顶点法线用其相邻的三角形的法线加权平均得到，那么问题来了，这样的方式会抹去一些sharp feature，比如上图中的sharp的棱被抹去了，解决这个问题也很简单，比如某个二面角的角度大于一个阈值，我们认为这个是sharp feature，不能平滑，这时对于edge上的顶点就存储两个法线，渲染不同的两个三角形的时候用不同的法线，这样就既做到了平滑渲染又保留了sharp feature。
    https://www.zhihu.com/question/294271776/answer/544982916
  · computeVertexNormals：https://zhuanlan.zhihu.com/p/361633307
  · 如何确定顶点法向量的方向：对于顶点v。找出所有包含这个顶点的三角形，存在face_list里面。求出face_list里面每一个三角形的平面法线，然后把所有这些法线加起来，归一化，就是顶点v的法线。
                           
* Material：
  · 材质：材料的质感。材料可以看成是材料和质感的结合。在渲染程式中，它是表面各可视属性的结合，这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。
  · Material在渲染管线中哪个位置呢？其实就是对应管线中Fragment片元处理的过程，就像拿起一直画笔，读取Material设置的参数变量（化妆品），一一涂抹的过程。
  · 常见属性：
    ~ side: THREE.DoubleSide  //双面显示
    ~ rotation: Math.PI / 4   //旋转精灵对象45度，弧度值
    ~ type: 材质的类型，穿着布料的类型
    ~ color: 0x999999 //材质颜色
    ~ lightMap: textureLight  //光照贴图，物体的不同部分对光有不同反映
    ~ lightMapIntensity:1 //烘培光照的强度
    ~ map: texture  //设置颜色贴图属性值
    ~ normalMap: textureNormal   //法线贴图
    ~ normalScale: new THREE.Vector2(5, 5)  //设置深浅程度，默认值(1,1)。
    ~ aomap：//环境光遮蔽体贴，就像画眼影，在一些细节支出，增加立体效果
    ~ specular: 0xff0000  //高光部分的颜色
    ~ shininess: 30 //高光部分的亮度，默认30
    ~ specularMap：//高光贴图，就是一种特殊的贴图而已，打光
    ~ envMap：//环境贴图，就是整个环境在人身上的映射
    ~ reflectivity: 0.1 // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
    ~ combine：//就是环境光贴图与灯光之间计算的方式，有三种：add, mix，multiply，计算方式不同，最终输出结果自然不同
    ~ vertexColors: THREE.VertexColors //顶点颜色
    ~ transparent: true //允许透明设置
    ~ size: 10.0 //点对象像素尺寸
    ~ 更多：https://www.cnblogs.com/amy2011/p/6148736.html
  · 分类：
    ~ LineBasicMaterial：基础线条材质。一种用于绘制线框样式几何体的材质。
    ~ LineDashedMaterial：虚线材质。一种用于绘制虚线样式几何体的材质。
    ~ Material：
      ~ 材质的抽象基类。
      ~ 材质描述了对象objects的外观。它们的定义方式与渲染器无关， 因此，如果您决定使用不同的渲染器，不必重写材质。
      ~ 官方文档：http://www.webgl3d.cn/threejs/docs/#api/zh/materials/Material
    ~ MeshBasicMaterial：基础网格材质。一个以简单着色（平面或线框）方式来绘制几何体的材质。不受光照影响的材质
    ~ MeshDepthMaterial：深度网格材质。一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。
    ~ MeshDistanceMaterial:MeshDistanceMaterial在内部用于使用PointLight来实现阴影映射。 也可以用于通过将MeshDistanceMaterial实例指定给Object3D.customDistanceMaterial，来自定义物体阴影投射。 下列示例演示了这一方法，以确保物体的透明部分不投射阴影。
    ~ MeshLambertMaterial：
      ~ 一种非光泽表面的材质，没有镜面高光。与光照有反应，产生漫反射。
      ~ Lambert = ambient（环境光 ） + diffuse（漫反射）
      ~ 该材质使用基于非物理的Lambertian模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。
    ~ MeshMatcapMaterial：MeshMatcapMaterial 由一个材质捕捉（MatCap，或光照球（Lit Sphere））纹理所定义，其编码了材质的颜色与明暗。由于mapcap图像文件编码了烘焙过的光照，因此MeshMatcapMaterial 不对灯光作出反应。 它将会投射阴影到一个接受阴影的物体上(and shadow clipping works)，但不会产生自身阴影或是接受阴影。
    ~ MeshNormalMaterial：一种把法向量映射到RGB颜色的材质。
    ~ MeshPhongMaterial：
      ~ 一种用于具有镜面高光的光泽表面的材质。
      ~ Phong = ambient（环境光 ） + diffuse（漫反射） + specular（镜面反射）
      ~ 该材质使用非物理的Blinn-Phong模型来计算反射率。 与MeshLambertMaterial中使用的Lambertian模型不同，该材质可以模拟具有镜面高光的光泽表面（例如涂漆木材）。
      ~ 高光Phong材质,与光照有反应。有明显的高光区，适用于湿滑的，表面具有光泽的物体。如：玻璃、水滴、金属类明亮的物体等。有镜面反射的效果。
    ~ MeshPhysicalMaterial：物理网格材质，MeshStandardMaterial的扩展，能够更好地控制反射率。
    ~ MeshStandardMaterial：
      ~ 一种基于物理的标准材质，使用Metallic-Roughness工作流程。
      ~ 基于物理的渲染（PBR）最近已成为许多3D应用程序的标准，例如Unity， Unreal和 3D Studio Max。
      ~ 这种方法与旧方法的不同之处在于，不使用近似值来表示光与表面的相互作用，而是使用物理上正确的模型。 我们的想法是，不是在特定照明下调整材质以使其看起来很好，而是可以创建一种材质，能够“正确”地应对所有光照场景。在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。
      ~ PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果
    ~ MeshToonMaterial：
      ~ 卡通网格材质
      ~ 文档：https://zhuanlan.zhihu.com/p/368650959
    ~ PointsMaterial：点材质，Points使用的默认材质。
    ~ RawShaderMaterial：原始着色器材质，此类的工作方式与ShaderMaterial类似，不同之处在于内置的uniforms和attributes的定义不会自动添加到GLSL shader代码中。
    ~ ShaderMaterial：着色器材质。使用自定义shader渲染的材质。 shader是一个用GLSL编写的小程序 ，在GPU上运行。 您可能需要使用自定义shader，如果你要：要实现内置 materials 之外的效果或者将许多对象组合成单个Geometry或BufferGeometry以提高性能。
    ~ ShadowMaterial：阴影材质，此材质可以接收阴影，但在其他方面完全透明。
    ~ SpriteMaterial：精灵材质，一种使用Sprite的材质。
  · 各种标准材质的构建速度从最快到最慢：MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial。构建速度越慢的材质，做出的场景越逼真，但在低功率或移动设备上，你可能需要思考代码的设计，使用构建速度较快的材质。


* Texture：
  · 纹理贴图技术
  · 贴图的步骤：
    第1步：通过将投影方程（projector function）运用于空间中的点 ，从而得到一组称为参数空间值（parameter-space values）的关于纹理的数值。
    第2步：在使用这些新值访问纹理之前，可以使用一个或者多个映射函数（corresponder function）将参数空间值（parameter-space values ）转换到纹理空间。
    第3步：使用这些纹理空间值（texture-space locations）从纹理中获取相应的值（obtain value）。例如，可以使用图像纹理的数组索引来检索像素值。
    第4步：再使用值变换函数（value transform function）对检索结果进行值变换，最后使用得到的新值来改变表面属性，如材质或者着色法线等等



* 光源：
  · 分类：
    ~ AmbientLight：环境光
    ~ DirectionalLight：平行光
    ~ HemisphereLight
    ~ Light
    ~ PointLight：点光源
    ~ RectAreaLight
    ~ SpotLight：聚光灯光源
  · 继承关系
    Object3D → Light  → AmbientLight
                      → DirectionalLight
                      → PointLight
                      → ...
  · 属性：
    ~ color 光源颜色
    ~ intensity 光强，决定着光线输出到场景中的能量
    ~ isLight (Read Only)
    ~ receiveShadow
    ~ shadow
  · 不受灯光影响的材质：
    ~ MeshBasicMaterial    
    ~ MeshNormalMaterial
    ~ MeshMatcapMaterial ；
  · 受灯光影响的材质：
    ~ MeshLambertMaterial
    ~ MeshPhongMaterial
    ~ MeshStandardMaterial
    ~ MeshPhysicalMaterial
    ~ MeshToonMaterial
  · AmbientLight：
    ~ 环境光只是简单地将材质的颜色与光照颜色进行叠加（PhotoShop 里的正片叠底模式），再乘以光照强度
    ~ 只有两个属性：color和intensity
    ~ 特点：
      ~ 可以照亮三维场景中的所有物体，雨露匀沾；
      ~ 没有阴影；
      ~ 光线均匀的向各个方向和距离传播

* Loader：
  · 默认支持的格式：
  · 不支持格式可以参考其他loader依葫芦画瓢地写出来
  · Obj：
  · mtl：

* Shadow：
  · 分类：
    ~ LightShadow
    ~ PointLightShadow
    ~ DirectionalLightShadow
    ~ SpotLightShadow

* Raycaster：
  · 构造函数：var raycaster = new THREE.Raycaster( origin, direction, near, far );
  · 主要属性：
    ~ origin：射线放射的位置
    ~ direction ：方向向量，应该是标准化的.normalize()
    ~ near ：能投射的最近距离default：0
    ~ far： 能投射的最远距离 default：Infinity 
  · webGL中获取鼠标交互物体的原理：通过三维空间中相机视点与鼠标在屏幕上的位置的连线，形成一条直线，捕获与此直线相交的空间中的物体，即为交互对象物体。
  · Raycaster来检测碰撞：
    ~ 原理：以物体的中心为起点，向各个顶点（vertices）发出射线，然后检查射线是否与其它的物体相交。如果出现了相交的情况，检查最近的一个交点与射线起点间的距离，如果这个距离比射线起点至物体顶点间的距离要小，则说明发生了碰撞
    ~ 缺点：当物体的中心在另一个物体内部时，是不能够检测到碰撞的。而且当两个物体能够互相穿过，且有较大部分重合时，检测效果也不理想。
            还有需要 注意 的一点是：在Three.js中创建物体时，它的顶点（veritces）数目是与它的分段数目相关的，分段越多，顶点数目越多。为了检测过程中的准确度考虑，需要适当增加物体的分段。
  · raycatser实现picking功能：我们可以定义一个由mouse(鼠标)发出的射线，从而来拾取物体。获取第一个和射线相交的物体，进一步可以进行其他操作（本篇用于改变获取物体的颜色）
  · raycaster实现measure功能：首先获取屏幕坐标位置，转化为三维坐标位置。再将得到的三维向量坐标转为视点坐标系（参照是摄像机），并且创建射线，方向是选定模型点与摄像机两点的连线
  


* LOD（Levels of Detail）：
  · 多细节层次
  · 本质原理就是不同距离绘制不同精度的模型，来提高渲染性能。
  · 文档：https://zhuanlan.zhihu.com/p/370333596

* 粒子系统：
  · 粒子效果的实现原理大概分为三种：
    ~ Javascript直接计算粒子的状态变化，即基于CPU实现；
    ~ Javascript通知顶点着色器粒子的生命周期，由顶点着色器运行，即基于GPU实现；
    ~ 粒子生成与状态维护全部由片元着色器负责，即屏幕特效，同样是基于GPU中实现。
  · THREE.Sprite：
    ~ 使用useScreenCoordinates:true属性建立一个独立于camera摄像范围之外的元素，即它在屏幕上的位置不受camera的位置和焦点变化而变化，它的移动、定位、缩放是基于屏幕坐标的。
    ~ 与在CanvasRenderer渲染器中使用THREE.Particle创建粒子一样，不需要使用THREE.ParticleSytem， 在WebGlRenderer渲染器中使用THREE.Sprite创建的粒子可以直接添加到scene中。三维场景中创建出来的精灵总是面向镜头的。即不会有倾斜变形之类透视变化，只有近大远小的变化
  · THREE.Particle：
    如果项目使用的渲染器是CanvasRenderer,直接使用THREE.Particle创建完粒子即可直接添加到scene中
  · THREE.ParticleSytem：
    如果使用的是WebGlRenderer渲染器，那就要先创建THREE.ParticleSytem对象，然后通过这个对象来创建粒子。PatricleSystem具有形体和材质两个属性，因此使用PatitlceSystem可以借助几何体生成粒子，也可以先创建一个由多个点构成的形体后去创建粒子。
  · 文档：
    ~ http://feg.netease.com/archives/403.html

* CSG（Constructive Solid Geometry）
  · 构造实体几何
  · CSG是一种用于实体建模的技术，允许建模人员通过在称为图元（长方体，圆柱体，棱柱，金字塔，球体）的实体对象上使用布尔运算符（联合，相交，差）来创建复杂的曲面/对象，视锥细胞）。 通过这些基本操作，可以从简单对象开始创建具有高复杂性的对象。
  · 文档：https://zhuanlan.zhihu.com/p/370433947

* PostProcessing：
  · 概念：
    后处理也叫PostProcessing，是图形渲染或者游戏引擎中非常常见的一种技术。
    它的实现方式通常是在普通的场景渲染结束后对结果再执行进一步的处理,一般是通过绘制一个铺满屏幕的四方形（quad），并将渲染的buffer作为texture传入，调用shader计算，将计算结果写入到另一个buffer中，最终显示在屏幕上。每个计算流程和普通的模型场景渲染一样,不同之处在于在vertex shader中通常只是简单的拷贝,主要的逻辑计算写在fragement shader中。
    一般我们将一组特定的功能代码组织在一起配合shader处理，这样一次处理我们叫一个pass，然后将多个pass一起组合在一起组成了整个后处理的渲染流水线。
  · 文档：
    ~ 《简单入门webgl后处理》：https://zhuanlan.zhihu.com/p/151254866
    ~ 《一个例子：物体边界线条高亮处理》：https://blog.csdn.net/qq_39503511/article/details/111031800

* 常用库：
  · ammo.wasm.js：目前知名物理引擎Bullet 3D已经提供对应的JS版本——Ammo，并提供了js与wasm两个版本供Web开发者使用。
  · stats.js：主要用于检测动画运行时的帧数
  · OrbitControls.js：轨道控制器OrbitControls.js是一个相当神奇的控件，用它可以实现场景用鼠标交互，让场景动起来，控制场景的旋转、平移，缩放
  · ConvexObjectBreaker.js:
  · ConvexGeometry.js:通过THREE.ConvexGeometry，我们可以围绕一组点创建一个凸包。所谓凸包就是包围这组点的最小图形。也就是所有的点都在当前模型的体内，而且当前图形还是实现的体积最小的一个模型。
  · dat.gui.js：Dat.gui 是一个GUI组件，他可以为你的demo提供参数的设置，并且很容易上手。https://www.cnblogs.com/xiaoniuzai/p/6685556.html
  · Lensflare.js：Three.js通过Lensflare可以创造出我们看向太阳的时候出现的那种光晕的效果。                  
  · EffectComposer.js：后期处理
  · tween.js：缓动动画
  
* Spector.js：
  · 着色分析工具

* 坑：
  · FBXLoader有时候加载不出纹理是因为版本问题












