import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const EYE_HEIGHT = 1.7;
const WALK_SPEED = 8;
const SPRINT_SPEED = 16;
const JUMP_VELOCITY = 8;
const GRAVITY = 22;

/**
 * First-person player with PointerLockControls, WASD, jump, and sprint.
 */
export class Player {
  /**
   * @param {THREE.Camera} camera
   * @param {HTMLElement} domElement
   */
  constructor(camera, domElement) {
    this.camera = camera;
    this.controls = new PointerLockControls(camera, domElement);

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.canJump = false;
    this.sprint = false;

    this.camera.position.set(0, EYE_HEIGHT, 0);

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }

  get object() {
    return this.controls.object;
  }

  lock() {
    this.controls.lock();
  }

  /**
   * @param {(event: Event) => void} fn
   */
  onLock(fn) {
    this.controls.addEventListener('lock', fn);
  }

  /**
   * @param {(event: Event) => void} fn
   */
  onUnlock(fn) {
    this.controls.addEventListener('unlock', fn);
  }

  /**
   * @param {KeyboardEvent} event
   */
  _onKeyDown(event) {
    switch (event.code) {
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'KeyD':
        this.moveRight = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.sprint = true;
        break;
      case 'Space':
        if (this.canJump) {
          this.velocity.y = JUMP_VELOCITY;
          this.canJump = false;
        }
        break;
      default:
        break;
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  _onKeyUp(event) {
    switch (event.code) {
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'KeyD':
        this.moveRight = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.sprint = false;
        break;
      default:
        break;
    }
  }

  /**
   * @param {number} delta seconds
   */
  update(delta) {
    if (!this.controls.isLocked) {
      return;
    }

    const speed = this.sprint ? SPRINT_SPEED : WALK_SPEED;

    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    this.velocity.y -= GRAVITY * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    if (this.moveForward || this.moveBackward) {
      this.velocity.z -= this.direction.z * speed * 10.0 * delta;
    }
    if (this.moveLeft || this.moveRight) {
      this.velocity.x -= this.direction.x * speed * 10.0 * delta;
    }

    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);

    this.camera.position.y += this.velocity.y * delta;

    if (this.camera.position.y < EYE_HEIGHT) {
      this.velocity.y = 0;
      this.camera.position.y = EYE_HEIGHT;
      this.canJump = true;
    }
  }

  dispose() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    this.controls.dispose();
  }
}
