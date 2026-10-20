
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ChainAnimation() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));

    const keyLight = new THREE.DirectionalLight(0xffd6a0, 4);
    keyLight.position.set(3, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xf47b54, 28, 20);
    rimLight.position.set(-4, 1, 3);
    scene.add(rimLight);

    const greenLight = new THREE.PointLight(0x7bc8a4, 18, 20);
    greenLight.position.set(4, -2, 3);
    scene.add(greenLight);

    const chain = new THREE.Group();
    scene.add(chain);

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6bd83,
      metalness: 0.82,
      roughness: 0.23,
    });

    const greenMaterial = new THREE.MeshStandardMaterial({
      color: 0x8bbda3,
      metalness: 0.7,
      roughness: 0.26,
    });

    function createLink(material, position, rotation, scale = 1) {
      const group = new THREE.Group();

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.42, 0.0, 0),
        new THREE.Vector3(-0.42, 0.25, 0),
        new THREE.Vector3(-0.22, 0.4, 0),
        new THREE.Vector3(0.22, 0.4, 0),
        new THREE.Vector3(0.42, 0.2, 0),
        new THREE.Vector3(0.42, -0.2, 0),
        new THREE.Vector3(0.22, -0.4, 0),
        new THREE.Vector3(-0.22, -0.4, 0),
        new THREE.Vector3(-0.42, -0.25, 0),
        new THREE.Vector3(-0.42, 0, 0),
      ], true);

      const geometry = new THREE.TubeGeometry(curve, 96, 0.085, 12, true);
      const mesh = new THREE.Mesh(geometry, material);

      group.add(mesh);
      group.position.set(...position);
      group.rotation.set(...rotation);
      group.scale.setScalar(scale);

      return group;
    }

    chain.add(
      createLink(goldMaterial, [-0.42, 0.5, 0], [0.45, 0.15, 0.2], 1.3),
      createLink(greenMaterial, [0.42, -0.5, 0], [-0.45, -0.15, 0.95], 1.3),
      createLink(goldMaterial, [0, 0, -0.45], [0.8, 0.2, 0.7], 1.15)
    );

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 170;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xd9c6a5,
        size: 0.025,
        transparent: true,
        opacity: 0.75,
      })
    );

    scene.add(particles);

    let frameId;
    let disposed = false;

    function animate() {
      if (disposed) return;

      frameId = requestAnimationFrame(animate);
      chain.rotation.y += 0.003;
      chain.rotation.x = Math.sin(performance.now() * 0.00035) * 0.12;
      chain.position.y = Math.sin(performance.now() * 0.0007) * 0.12;
      particles.rotation.y -= 0.0003;

      renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!mount.clientWidth || !mount.clientHeight) return;

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });

    resizeObserver.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => material.dispose());
        }
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="chain-animation" ref={mountRef} aria-label="Animated 3D chain links" />;
}