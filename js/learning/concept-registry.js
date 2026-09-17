/**
 * Baby Keys - Concept Registry
 * Connective tissue bridging concepts across all 8 learning worlds.
 * Ensures concepts (e.g. Red, Apple, A, Dog, Circle) are shared, cross-linked,
 * and consumed consistently across different activity contexts.
 */

class BabyConceptRegistry {
    constructor() {
        this.concepts = new Map();
        this.categories = new Map();
    }

    register(concept) {
        if (!concept || !concept.id) return;
        this.concepts.set(concept.id, concept);

        const cat = concept.category || 'general';
        if (!this.categories.has(cat)) {
            this.categories.set(cat, []);
        }
        this.categories.get(cat).push(concept);
    }

    registerAll(conceptList = []) {
        conceptList.forEach(c => this.register(c));
    }

    get(id) {
        return this.concepts.get(id) || null;
    }

    getByCategory(category) {
        if (!category) return [];
        const singular = category.endsWith('s') ? category.slice(0, -1) : category;
        const plural = category.endsWith('s') ? category : category + 's';
        return this.categories.get(category) || this.categories.get(singular) || this.categories.get(plural) || [];
    }

    /**
     * Finds cross-linked concepts (e.g. concept-letter-a links to concept-apple and concept-red)
     */
    getLinkedConcepts(conceptId) {
        const primary = this.get(conceptId);
        if (!primary || !primary.associatedConcepts) return [];
        return primary.associatedConcepts
            .map(id => this.get(id))
            .filter(Boolean);
    }

    getRandomConceptByCategory(category) {
        const list = this.getByCategory(category);
        if (!list.length) return null;
        return list[Math.floor(Math.random() * list.length)];
    }
}

const conceptRegistry = new BabyConceptRegistry();
