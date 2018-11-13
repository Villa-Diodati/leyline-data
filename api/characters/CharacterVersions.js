const mongoose = require('mongoose')

const unit = {
  label: String,
  note: String,
  score: {
    type: Number,
    default: 0,
  },
}

const CharacterVersionSchema = new mongoose.Schema(
  {
    _cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
    class: [
      {
        label: String,
        level: {
          type: Number,
          default: 0,
        },
      }
    ],
    attributes: [ unit ],
    stats: [ unit ],
    features: [
      {
        ...unit,
        modifier: {
          target: String,
          value: Number,
        }
      }
    ],
  }
)

CharacterVersionSchema.methods = {
  toJSON: function() {
    return {
      currentVersionId: this._id,
      class: this.class,
      attributes: this.attributes,
      stats: this.stats,
      features: this.features,
    }
  },
}

mongoose.model('CharacterVersion', CharacterVersionSchema)
