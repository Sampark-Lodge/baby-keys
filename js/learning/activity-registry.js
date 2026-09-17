/**
 * Baby Keys - Activity Registry
 * Data-driven registry mapping concepts to activities, worlds, and response profiles.
 */

class BabyActivityRegistry {
    constructor() {
        this.registry = new Map();
        this.initDefaultActivities();
    }

    initDefaultActivities() {
        this.register({
            id: 'sensory-freeform',
            world: 'sensory',
            concepts: ['cause-and-effect', 'colours', 'sounds'],
            responseProfile: 'bouncy-burst'
        });

        this.register({
            id: 'colour-red-ball',
            world: 'colours',
            concepts: ['colour-red', 'object-ball'],
            responseProfile: 'gentle-bounce'
        });

        this.register({
            id: 'animal-dog-woof',
            world: 'animals',
            concepts: ['animal-dog', 'sound-woof'],
            responseProfile: 'animal-bounce'
        });

        this.register({
            id: 'number-counting-123',
            world: 'numbers',
            concepts: ['number-1', 'number-2', 'number-3'],
            responseProfile: 'count-bounce'
        });
    }

    register(activityConfig) {
        this.registry.set(activityConfig.id, activityConfig);
    }

    get(activityId) {
        return this.registry.get(activityId);
    }
}

const activityRegistry = new BabyActivityRegistry();
