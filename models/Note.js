const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Data structure for a note
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// When we start creating notes, a separate collection will be made named "counter" (w/ the help of mongoose-sequence). Tracks the sequental count and inserts it into our notes
noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

module.exports = mongoose.model("Note", noteSchema);
