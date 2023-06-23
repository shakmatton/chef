import {loadGLTF} from "./loader.js" 

const THREE = window.MINDAR.IMAGE.THREE

document.addEventListener("DOMContentLoaded", () => {
    const start = async() => {
                        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./targets.mind"
        })

        const {scene, camera, renderer} = mindarThree

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
        scene.add(light)

        // const geometry = new THREE.PlaneGeometry(1, 1)
        // const material = new THREE.MeshBasicMaterial({color: 'blue', transparent: true, opacity: 0.5})
        // const plane = new THREE.Mesh(geometry, material)

        const apple = await loadGLTF("./assets/maçã/Maçã.gltf")
        const pepper = await loadGLTF("./assets/pimenta/Pimenta.gltf")
        const carrot = await loadGLTF ("./assets/cenoura/Cenoura.gltf")

        apple.scene.scale.set(0.05, 0.05, 0.05)
        apple.scene.position.set(-0.44, 0.09, 0)
        
        pepper.scene.scale.set(0.4, 0.4, 0.4)
        pepper.scene.position.set(-0.01, 0.48, 0)

        carrot.scene.scale.set(0.275, 0.275, 0.275)
        carrot.scene.position.set(-0.285, 0.425, 0)

        const chefAnchor = mindarThree.addAnchor(0)
        
        chefAnchor.group.add(apple.scene)
        chefAnchor.group.add(pepper.scene)
        chefAnchor.group.add(carrot.scene)
        
        
        const appleMixer = new THREE.AnimationMixer(apple.scene)
        const pepperMixer = new THREE.AnimationMixer(pepper.scene)
        const carrotMixer = new THREE.AnimationMixer(carrot.scene)

        const appleAction = appleMixer.clipAction(apple.animations[0])        
        const pepperAction = pepperMixer.clipAction(pepper.animations[0])
        const carrotAction = carrotMixer.clipAction(carrot.animations[0])
        
        appleAction.play()
        pepperAction.play()
        carrotAction.play()

       /* const appleMixer = new THREE.AnimationMixer(apple.scene)
        apple.animations.forEach((clip) => {
            appleMixer.clipAction(clip).play(); 
        }); */

        // const clock = new THREE.Clock()

        await mindarThree.start()

        renderer.setAnimationLoop(() => {

            // const delta = clock.getDelta()

            // apple.scene.rotation.set(0, apple.scene.rotation.y + delta, 0) 
            // pepper.scene.rotation.set(0, apple.scene.rotation.y + delta, 0) 
            // carrot.scene.rotation.set(0, carrot.scene.rotation.y + delta, 0) 

            // appleMixer.update(delta)
            // pepperMixer.update(delta)
            // carrotMixer.update(delta)

            renderer.render(scene, camera)
        })
    }
    start()
})
