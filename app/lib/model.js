const { Schema, model, default: mongoose } = require("mongoose");


const userlogi= new Schema(
  { 
    email: {type:String,required:true,},
    credits:{type:Number,default:2},

  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export const userlogin =
  mongoose.models.Hookup || new mongoose.model("Hookup", userlogi);

