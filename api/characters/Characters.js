const mongoose = require('mongoose')

const unit = {
  label: String,
  note: String,
  count: {
    type: Number,
    default: 0,
  },
}

const CharacterSchema = new mongoose.Schema(
  {
    _uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    _tid: String,
    name: {
      type: String,
      require: true,
    },
    bio: String,
    versions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CharacterVersion',
        required: true,
      }
    ],
    points: [ unit ],
    inventory: [
      {
        ...unit,
        flavor: String,
        active: Boolean,
        modifier: [
          {
            target: String,
            value: Number,
          }
        ],
        category: {
          type: String,
          default: 'Misc.'
        },
      }
    ]
  }
)

CharacterSchema.methods = {
  toJSON: function() {
    return {
      _id: this._id,
      _tid: this._tid,
      name: this.name,
      bio: this.bio,
      points: this.points,
      inventory: this.inventory,
      versions: this.versions,
    }
  },
}

mongoose.model('Character', CharacterSchema)
