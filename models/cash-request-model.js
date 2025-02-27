const { mongoose, Schema } = require("mongoose");

const cashRequestSchema = new Schema(
  {

    agentId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
   
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Cashrequest = mongoose.models.Cashrequest ?? mongoose.model("Cashrequest", cashRequestSchema);
module.exports = Cashrequest;
