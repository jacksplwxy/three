· 层级关系：
  document.body → renderer → scene → mesh → geometry
                                          → material
                                   → point
                                   → ambient
                             
                           → camera




* 类关系：
  Object3D → Light  → AmbientLight：环境光
                    → DirectionalLight：平行光
                    → PointLight：点光源
                    → SpotLight：聚光灯光源

                           
* 材质：
  · MeshBasicMaterial：基础网格材质，不受光照影响的材质
  · MeshLambertMaterial：Lambert网格材质，与光照有反应，漫反射
  · MeshPhongMaterial：高光Phong材质,与光照有反应
  · MeshStandardMaterial：PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果

* 顶点法向量：
  · 表面三维模型通常采用网格，尤其是三角网格来表示，即三角形和顶点，而同一个顶点可能由多个三角形共享。表面上某位置的法线是该处切平面的垂线，单个顶点肯定是无法计算法线的，所以网格上的法线通常是通过三角形的法线来计算的。比如上图左在渲染的时候每个三角形一个法线，渲染的结果就是一个个三角平面，如果我们想渲染光滑的曲面呢，那也很简单，每个顶点一个法线，三角形内的颜色之类的属性通过插值得到，而这个顶点法线用其相邻的三角形的法线加权平均得到，那么问题来了，这样的方式会抹去一些sharp feature，比如上图中的sharp的棱被抹去了，解决这个问题也很简单，比如某个二面角的角度大于一个阈值，我们认为这个是sharp feature，不能平滑，这时对于edge上的顶点就存储两个法线，渲染不同的两个三角形的时候用不同的法线，这样就既做到了平滑渲染又保留了sharp feature。
    https://www.zhihu.com/question/294271776/answer/544982916

  · computeVertexNormals：https://zhuanlan.zhihu.com/p/361633307
  · 如何确定顶点法向量的方向：对于顶点v。找出所有包含这个顶点的三角形，存在face_list里面。求出face_list里面每一个三角形的平面法线，然后把所有这些法线加起来，归一化，就是顶点v的法线。

· geometry 和 BufferGeometry 区别：https://blog.csdn.net/weixin_41192637/article/details/109217785


* 常用库：
  · ammo.wasm.js：目前知名物理引擎Bullet 3D已经提供对应的JS版本——Ammo，并提供了js与wasm两个版本供Web开发者使用。
  · stats.js：主要用于检测动画运行时的帧数
  · OrbitControls.js：轨道控制器OrbitControls.js是一个相当神奇的控件，用它可以实现场景用鼠标交互，让场景动起来，控制场景的旋转、平移，缩放
  · ConvexObjectBreaker.js:
  · ConvexGeometry.js:通过THREE.ConvexGeometry，我们可以围绕一组点创建一个凸包。所谓凸包就是包围这组点的最小图形。也就是所有的点都在当前模型的体内，而且当前图形还是实现的体积最小的一个模型。
  · dat.gui.js：Dat.gui 是一个GUI组件，他可以为你的demo提供参数的设置，并且很容易上手。https://www.cnblogs.com/xiaoniuzai/p/6685556.html
  · Lensflare.js：Three.js通过Lensflare可以创造出我们看向太阳的时候出现的那种光晕的效果。                  
  · EffectComposer.js：后期处理


















