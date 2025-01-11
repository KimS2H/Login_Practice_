const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },

    pwcheck: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userTel: {
      type: String,
      required: [true, "전화번호는 꼭 기입해주세요."],
    },
    username: {
      type: String,
      required: true, //필수 속성
    },
  },
  {
    timestamps: true, // 자료가 작성되거나 수정되는 시간을 기록
  }
);

//스키마를 모델로 변환해야한다
//mongoose.model(모델명, 스키마명)

const tamnauser = mongoose.model("tamnauser", contactSchema);

module.exports = tamnauser;
