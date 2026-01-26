import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

// Country data with coordinates and details
const countriesData = [
  {
    id: 'usa',
    name: 'United States',
    lat: 37.0902,
    lng: -95.7129,
    flag: '🇺🇸',
    universities: '4,500+',
    students: '1M+ International',
    topPrograms: ['Business', 'Engineering', 'Computer Science'],
    description: 'World-leading universities with cutting-edge research and diverse campus life.'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    lat: 55.3781,
    lng: -3.4360,
    flag: '🇬🇧',
    universities: '160+',
    students: '600K+ International',
    topPrograms: ['Law', 'Medicine', 'Finance'],
    description: 'Historic institutions offering world-class education and global recognition.'
  },
  {
    id: 'canada',
    name: 'Canada',
    lat: 56.1304,
    lng: -106.3468,
    flag: '🇨🇦',
    universities: '100+',
    students: '800K+ International',
    topPrograms: ['Technology', 'Healthcare', 'Environmental Science'],
    description: 'Welcoming multicultural environment with excellent post-study work options.'
  },
  {
    id: 'australia',
    name: 'Australia',
    lat: -25.2744,
    lng: 133.7751,
    flag: '🇦🇺',
    universities: '43',
    students: '750K+ International',
    topPrograms: ['Marine Biology', 'Mining Engineering', 'Tourism'],
    description: 'High quality of life with innovative teaching methods and research opportunities.'
  },
  {
    id: 'germany',
    name: 'Germany',
    lat: 51.1657,
    lng: 10.4515,
    flag: '🇩🇪',
    universities: '400+',
    students: '400K+ International',
    topPrograms: ['Engineering', 'Automotive', 'Research'],
    description: 'Tuition-free education at public universities with strong industry connections.'
  },
  {
    id: 'france',
    name: 'France',
    lat: 46.2276,
    lng: 2.2137,
    flag: '🇫🇷',
    universities: '250+',
    students: '350K+ International',
    topPrograms: ['Arts', 'Fashion', 'Culinary Arts'],
    description: 'Rich cultural heritage combined with excellent academic programs.'
  },
  {
    id: 'japan',
    name: 'Japan',
    lat: 36.2048,
    lng: 138.2529,
    flag: '🇯🇵',
    universities: '780+',
    students: '300K+ International',
    topPrograms: ['Technology', 'Robotics', 'Animation'],
    description: 'Cutting-edge technology education in a unique cultural setting.'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    flag: '🇸🇬',
    universities: '34',
    students: '75K+ International',
    topPrograms: ['Business', 'Finance', 'Biotechnology'],
    description: 'Global education hub with world-ranked universities and career opportunities.'
  },
  {
    id: 'india',
    name: 'India',
    lat: 20.5937,
    lng: 78.9629,
    flag: '🇮🇳',
    universities: '1,000+',
    students: 'Growing Hub',
    topPrograms: ['IT', 'Medicine', 'Management'],
    description: 'Rapidly growing education sector with affordable quality programs.'
  },
  {
    id: 'uae',
    name: 'UAE',
    lat: 23.4241,
    lng: 53.8478,
    flag: '🇦🇪',
    universities: '70+',
    students: '100K+ International',
    topPrograms: ['Business', 'Aviation', 'Hospitality'],
    description: 'Modern campuses with international branch universities and tax-free earnings.'
  }
]

const InteractiveGlobe = () => {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const globeRef = useRef(null)
  const markersRef = useRef([])
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const animationRef = useRef(null)
  const isRotatingRef = useRef(true)
  
  // Drag state refs
  const isDraggingRef = useRef(false)
  const previousMousePositionRef = useRef({ x: 0, y: 0 })
  
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = useCallback((lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    
    return new THREE.Vector3(x, y, z)
  }, [])

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return
    
    // Clear any existing canvas
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    
    markersRef.current = []

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create globe with enhanced shader
    const globeGeometry = new THREE.SphereGeometry(1.5, 64, 64)
    
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Enhanced gradient colors
          vec3 deepPurple = vec3(0.08, 0.05, 0.18);
          vec3 midPurple = vec3(0.15, 0.08, 0.30);
          vec3 brightPurple = vec3(0.35, 0.15, 0.55);
          vec3 accentPurple = vec3(0.55, 0.25, 0.85);
          
          // Fresnel for edge glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          
          // Multiple wave patterns for depth
          float wave1 = sin(vPosition.y * 4.0 + time * 0.3) * 0.5 + 0.5;
          float wave2 = sin(vPosition.x * 3.0 - time * 0.4) * 0.5 + 0.5;
          float wave3 = sin(vPosition.z * 5.0 + time * 0.2) * 0.5 + 0.5;
          
          // Combine waves
          float combinedWave = (wave1 + wave2 + wave3) / 3.0;
          
          // Create flowing energy pattern
          float energy = sin(vPosition.y * 8.0 + vPosition.x * 6.0 + time) * 0.5 + 0.5;
          
          // Mix colors based on patterns
          vec3 baseColor = mix(deepPurple, midPurple, combinedWave);
          vec3 energyColor = mix(baseColor, brightPurple, energy * 0.3);
          vec3 finalColor = mix(energyColor, accentPurple, fresnel * 0.4);
          
          // Add subtle glow
          finalColor += vec3(0.1, 0.05, 0.15) * fresnel;
          
          gl_FragColor = vec4(finalColor, 0.98);
        }
      `,
      transparent: true,
    })
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)
    globeRef.current = globe

    // Add elegant grid lines - latitude lines
    const createLatitudeLines = () => {
      const group = new THREE.Group()
      const segments = 64
      
      for (let lat = -80; lat <= 80; lat += 20) {
        const phi = (90 - lat) * (Math.PI / 180)
        const radius = 1.501 * Math.sin(phi)
        const y = 1.501 * Math.cos(phi)
        
        const curve = new THREE.EllipseCurve(
          0, 0,
          radius, radius,
          0, 2 * Math.PI,
          false,
          0
        )
        
        const points = curve.getPoints(segments)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x7c3aed,
          transparent: true,
          opacity: 0.15,
        })
        
        const line = new THREE.Line(geometry, material)
        line.rotation.x = Math.PI / 2
        line.position.y = y
        group.add(line)
      }
      return group
    }
    
    // Add longitude lines
    const createLongitudeLines = () => {
      const group = new THREE.Group()
      const segments = 64
      
      for (let lng = 0; lng < 180; lng += 15) {
        const points = []
        for (let lat = -90; lat <= 90; lat += 2) {
          const phi = (90 - lat) * (Math.PI / 180)
          const theta = lng * (Math.PI / 180)
          
          const x = 1.501 * Math.sin(phi) * Math.cos(theta)
          const y = 1.501 * Math.cos(phi)
          const z = 1.501 * Math.sin(phi) * Math.sin(theta)
          
          points.push(new THREE.Vector3(x, y, z))
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x9333ea,
          transparent: true,
          opacity: 0.15,
        })
        
        const line = new THREE.Line(geometry, material)
        group.add(line)
      }
      return group
    }
    
    const latLines = createLatitudeLines()
    const lngLines = createLongitudeLines()
    globe.add(latLines)
    globe.add(lngLines)
    
    // Add subtle particle field
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 1.52 + Math.random() * 0.3
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.01,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    globe.add(particles)

    // Add enhanced multi-layer atmosphere glow
    const atmosphereGeometry1 = new THREE.SphereGeometry(1.62, 64, 64)
    const atmosphereMaterial1 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.486, 0.227, 0.929, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const atmosphere1 = new THREE.Mesh(atmosphereGeometry1, atmosphereMaterial1)
    scene.add(atmosphere1)
    
    // Second atmosphere layer for extra glow
    const atmosphereGeometry2 = new THREE.SphereGeometry(1.75, 64, 64)
    const atmosphereMaterial2 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.659, 0.318, 0.976, 1.0) * intensity * 0.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const atmosphere2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2)
    scene.add(atmosphere2)

    // Add country markers
    const markerGroup = new THREE.Group()
    globe.add(markerGroup)

    countriesData.forEach((country) => {
      const position = latLngToVector3(country.lat, country.lng, 1.52)
      
      // Marker point with glow
      const markerGeometry = new THREE.SphereGeometry(0.035, 16, 16)
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      marker.position.copy(position)
      marker.userData = country
      markerGroup.add(marker)
      markersRef.current.push(marker)
      
      // Inner glow sphere
      const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xfcd34d,
        transparent: true,
        opacity: 0.4,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.copy(position)
      markerGroup.add(glow)

      // Animated pulse ring
      const ringGeometry = new THREE.RingGeometry(0.05, 0.08, 32)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.copy(position)
      ring.lookAt(new THREE.Vector3(0, 0, 0))
      markerGroup.add(ring)

      // Outer pulse ring
      const ring2Geometry = new THREE.RingGeometry(0.08, 0.11, 32)
      const ring2Material = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
      const ring2 = new THREE.Mesh(ring2Geometry, ring2Material)
      ring2.position.copy(position)
      ring2.lookAt(new THREE.Vector3(0, 0, 0))
      markerGroup.add(ring2)

      // Animate pulses with glow
      const animatePulse = () => {
        const time = Date.now() * 0.003 + country.lat
        const pulse = Math.sin(time) * 0.5 + 0.5
        
        ring.scale.setScalar(1 + pulse * 0.4)
        ringMaterial.opacity = 0.7 - pulse * 0.4
        
        ring2.scale.setScalar(1 + pulse * 0.6)
        ring2Material.opacity = 0.5 - pulse * 0.35
        
        glow.scale.setScalar(1 + pulse * 0.3)
        glowMaterial.opacity = 0.4 + pulse * 0.2
      }
      ring.onBeforeRender = animatePulse
      ring2.onBeforeRender = animatePulse
      glow.onBeforeRender = animatePulse
    })

    // Lighting - enhanced for more dramatic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight1.position.set(5, 3, 5)
    scene.add(directionalLight1)
    
    const directionalLight2 = new THREE.DirectionalLight(0x9333ea, 0.5)
    directionalLight2.position.set(-5, -3, -5)
    scene.add(directionalLight2)

    const pointLight1 = new THREE.PointLight(0x7c3aed, 1.5, 12)
    pointLight1.position.set(-3, 2, 4)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0xc084fc, 1.2, 10)
    pointLight2.position.set(3, -2, -4)
    scene.add(pointLight2)

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      if (isRotatingRef.current && globeRef.current) {
        globeRef.current.rotation.y += 0.002
        
        // Slowly rotate particles in opposite direction for depth
        const particles = globeRef.current.children.find(
          child => child instanceof THREE.Points
        )
        if (particles) {
          particles.rotation.y -= 0.001
          particles.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1
        }
      }
      
      // Update shader time uniform for animated globe surface
      if (globeRef.current && globeRef.current.material.uniforms) {
        globeRef.current.material.uniforms.time.value += 0.01
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      renderer.dispose()
    }
  }, [latLngToVector3])

  // Handle mouse interactions
  const handleMouseDown = useCallback((event) => {
    if (!containerRef.current || selectedCountry) return
    
    isDraggingRef.current = true
    setIsDragging(true)
    isRotatingRef.current = false
    previousMousePositionRef.current = {
      x: event.clientX,
      y: event.clientY
    }
  }, [selectedCountry])

  const handleMouseMove = useCallback((event) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // Handle dragging to rotate globe
    if (isDraggingRef.current && globeRef.current) {
      const deltaX = event.clientX - previousMousePositionRef.current.x
      const deltaY = event.clientY - previousMousePositionRef.current.y
      
      globeRef.current.rotation.y += deltaX * 0.005
      globeRef.current.rotation.x += deltaY * 0.005
      
      // Limit vertical rotation
      globeRef.current.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, globeRef.current.rotation.x))
      
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      }
      return
    }

    // Check for marker hover
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
    const intersects = raycasterRef.current.intersectObjects(markersRef.current)

    if (intersects.length > 0) {
      const country = intersects[0].object.userData
      setHoveredCountry(country)
      setIsHovering(true)
      isRotatingRef.current = false
      document.body.style.cursor = 'pointer'
    } else {
      setHoveredCountry(null)
      setIsHovering(false)
      if (!selectedCountry && !isDraggingRef.current) {
        isRotatingRef.current = true
      }
      document.body.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab'
    }
  }, [selectedCountry])

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      if (!selectedCountry && !hoveredCountry) {
        isRotatingRef.current = true
      }
    }
  }, [selectedCountry, hoveredCountry])

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false
    setIsDragging(false)
    document.body.style.cursor = 'default'
  }, [])

  const handleClick = useCallback((event) => {
    if (!containerRef.current) return
    
    // Don't trigger click if we were dragging
    if (isDragging) return
    
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
    const intersects = raycasterRef.current.intersectObjects(markersRef.current)

    if (intersects.length > 0) {
      const country = intersects[0].object.userData
      setSelectedCountry(country)
      isRotatingRef.current = false
    } else {
      setSelectedCountry(null)
      isRotatingRef.current = true
    }
  }, [isDragging])

  const closeDetails = useCallback(() => {
    setSelectedCountry(null)
    isRotatingRef.current = true
  }, [])

  return (
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[450px] lg:min-h-[650px]">
      {/* Globe Container */}
      <div 
        ref={containerRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        // style={{ minHeight: '100%' }}
      />

      {/* Hover Tooltip */}
      {hoveredCountry && !selectedCountry && (
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl backdrop-blur-lg animate-fadeIn"
          style={{ 
            background: 'rgba(26, 26, 62, 0.9)',
            border: '1px solid rgba(168, 85, 247, 0.3)'
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{hoveredCountry.flag}</span>
            <span className="text-white font-medium">{hoveredCountry.name}</span>
          </div>
          <p className="text-gray-400 text-xs mt-1">Click to view details</p>
        </div>
      )}

      {/* Country Details Panel */}
      {selectedCountry && (
        <div 
          className="absolute inset-0 flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div 
            className="relative max-w-sm w-full rounded-2xl p-6 backdrop-blur-xl animate-scaleIn"
            style={{ 
              background: 'linear-gradient(135deg, rgba(26, 26, 62, 0.95) 0%, rgba(45, 27, 78, 0.95) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={closeDetails}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Country Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{selectedCountry.flag}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedCountry.name}</h3>
                <p className="text-gray-400 text-sm">{selectedCountry.universities} Universities</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-400 text-xs mb-1">International Students</p>
                <p className="text-white font-semibold">{selectedCountry.students}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-400 text-xs mb-1">Universities</p>
                <p className="text-white font-semibold">{selectedCountry.universities}</p>
              </div>
            </div>

            {/* Top Programs */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs mb-2">Top Programs</p>
              <div className="flex flex-wrap gap-2">
                {selectedCountry.topPrograms.map((program, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
                      color: '#a855f7'
                    }}
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {selectedCountry.description}
            </p>

            {/* CTA Button */}
            <button 
              className="w-full py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                boxShadow: '0 10px 30px -10px rgba(124, 58, 237, 0.5)'
              }}
            >
              Explore Universities →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveGlobe