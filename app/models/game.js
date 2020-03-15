import DS from 'ember-data';
import { computed } from '@ember/object';

const TEMPLATES = [
    ["indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "orange", "purple", "purple", "purple", "purple", "purple", "purple", "pink", "indigo", "indigo", "orange", "purple", "purple", "purple", "purple", "purple", "purple", "pink", "indigo", "indigo", "orange", "green", "green", "green", "green", "green", "green", "pink", "indigo", "indigo", "orange", "yellow", "teal", "red", "red", "teal", "yellow", "pink", "indigo", "indigo", "orange", "yellow", "teal", "red", "red", "teal", "yellow", "pink", "indigo", "indigo", "orange", "green", "green", "green", "green", "green", "green", "pink", "indigo", "indigo", "orange", "purple", "purple", "purple", "purple", "purple", "purple", "pink", "indigo", "indigo", "orange", "purple", "purple", "purple", "purple", "purple", "purple", "pink", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo", "indigo"],
    ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "white", "white", "blue", "white", "white", "white", "blue", "blue", "white", "white", "white", "white", "white", "blue", "white", "white", "white", "blue", "blue", "white", "white", "white", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "green", "green", "purple", "purple", "purple", "purple", "purple", "green", "green", "green", "green", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "green", "green", "green", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "green", "green", "green", "purple", "purple", "purple", "purple", "purple", "purple", "green", "green", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "yellow", "green", "green", "yellow", "green", "green", "yellow", "green"]
];

export default DS.Model.extend({
    templatePicture: DS.belongsTo('picture', { async: false }),
    playerPicture: DS.belongsTo('picture', { async: false }),

    init() {
        this._super(...arguments);

        this.set('templatePicture', this.store.createRecord('picture'));
        this.set('playerPicture', this.store.createRecord('picture'));

        this.pickRandomTemplate();
    },

    correctCellsCount: computed('templatePicture.cells.@each.{color}', 'playerPicture.cells.@each.{color}', function() {
        let count = 0;

        for(let i = 0; i < this.templatePicture.cells.length; i++) {
            if (this.templatePicture.cells.objectAt(i).color === this.playerPicture.cells.objectAt(i).color) {
                count++;
            }
        }

        return count;
    }),

    isComplete: computed.equal('correctCellsCount', 100),

    pickRandomTemplate() {
        let randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        this.templatePicture.load(randomTemplate);
        this.playerPicture.clear();
    }
});
