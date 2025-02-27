const { mongoose, Schema } = require("mongoose");

const withdrawRequestSchema = new Schema(
  {
    agentId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
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

const Withdrawrequest = mongoose.models.Withdrawrequest ?? mongoose.model("Withdrawrequest", withdrawRequestSchema);
module.exports = Withdrawrequest;
