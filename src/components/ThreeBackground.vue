<template>
  <div ref="threeContainer" class="absolute-full z-0 overflow-hidden"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const threeContainer = ref(null)
let scene, camera, renderer, particles, animationId
const props = defineProps({
    color: { type: Number, default: 0x40c4ff }
})

const initThree = () => {
    if (!threeContainer.value) return

    // Scene
    scene = new THREE.Scene()
    
    // Gradient Background (Simulated with CSS in parent, or simple fog here)
    // scene.fog = new THREE.FogExp2(0x0a192f, 0.002)

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    threeContainer.value.appendChild(renderer.domElement)

    // Particles
    const geometry = new THREE.BufferGeometry()
    const count = 400
    const positions = new Float32Array(count * 3)

    for(let i = 0; i < count * 3; i++) {
        // Spread particles wider
        positions[i] = (Math.random() - 0.5) * 150
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
        size: 0.7,
        color: props.color,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    })

    particles = new THREE.Points(geometry, material)
    scene.add(particles)
    
    // Connecting Lines (Globe/Network effect)
    const lineMaterial = new THREE.LineBasicMaterial({
        color: props.color,
        transparent: true,
        opacity: 0.15
    })
    
    const sphereGeo = new THREE.IcosahedronGeometry(35, 1)
    const wireframe = new THREE.WireframeGeometry(sphereGeo)
    const line = new THREE.LineSegments(wireframe, lineMaterial)
    scene.add(line)

    // Animation Loop
    const animate = () => {
        animationId = requestAnimationFrame(animate)
        
        if(particles) {
            particles.rotation.y += 0.0008
            particles.rotation.x += 0.0004
        }
        
        if(line) {
            line.rotation.y -= 0.0005
            line.rotation.x -= 0.0005
        }

        renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
    if(camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
}

onMounted(() => {
    initThree()
})

onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onWindowResize)
    if (renderer) renderer.dispose()
})
</script>

<style scoped>
/* Ensure container doesn't block clicks if placed on top, but here it is z-0 */
</style>
