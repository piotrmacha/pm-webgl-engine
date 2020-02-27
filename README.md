# pm-webgl-engine

Game engine based on WebGL meant to be used as a simple framework
for rapid development of 2D/3D indie and game jam games.

Project is in an early stage so there is not documentation. 
All features and interfaces may change in the future.

## Features

* [x] Entity-Component-System [1]
* [x] Asset Manager
* [x] Scenes
* [x] Actor System (Scripting)
* [x] WebGL: Basic Rendering
* [ ] WebGL: 2D Sprites
* [ ] WebGL: Post-Processing
* [ ] WebGL: Lighting
* [ ] WebGL: G-Buffer Rendering
* [ ] WebGL: PBR Rendering
* [ ] Physics: Colliders
* [ ] Physics: Dynamics

[1] Implementation is simplified, specifically the components aren't
organized in continuous memory like they should in AAA-class ECS. 

## Usage

Engine is configured in **src/index.ts**. This file let's you
define systems and scenes in the game

Example scene in defined in **src/example/example-scene.ts**

**Component** is a structure with some values.

**Entity** is a collection of components.

**Scene** is an object that manages its entities. It should create
necessary game objects and then let **System** and **ActorScript** 
execute game logic.

**System** is a class that iterates through entities in **Scene** and
execute logic on them.

**ActorScript** is a behavior assigned to the specific **Entity** and
it can manipulate **Scene** dynamically.

## Build
```
npm install
webpack --watch
```

### Serve using static-server
```
npm install -g static-server
static-server
```
