const asyncHandler = require("express-async-handler");
const TamnaUser = require("../models/contactModel");

//GET join window
//GET /newjoin
const getWindowForNew = asyncHandler(async (req, res) => {
  const contacts = await TamnaUser.find(); //contact변수는 db 에서 가져온 값
  res.render("NewJoin.ejs");
});

//CREATE usermembership
//POST /newjoin
const getNewTamnaMember = asyncHandler(async (req, res) => {
  const { id, pw, pwcheck, userEmail, userTel, username } = req.body;
  console.log("------");
  if (!id || !pw || !pwcheck || !userEmail || !userTel || !username) {
    console.log("Missing fields", req.body);
    return res.render("Join_Fail_Form.ejs");
  }
  try {
    const newUser = new TamnaUser({
      id,
      pw,
      pwcheck,
      userEmail,
      userTel,
      username,
    });

    await newUser.save();
    res.render("Join_Success_Form.ejs");
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    res.render("Join_Fail_Form.ejs");
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id; //id 정의
  const { name, email, tel } = req.body; //수정할 내용 확인
  const contact = await TamnaUser.findById(id); // 본문 내용 확인
  if (!contact) {
    //만약 수정하고 싶은 contact가 존재하지 않으면 에러
    throw new Error("Contact not Found.");
  }
  contact.name = name; //true라면 새로 저장
  contact.email = email;
  contact.tel = tel;

  contact.save(); //db에 적용

  res.json(contact); //화면 표시
});

module.exports = { getWindowForNew, getNewTamnaMember, updateContact };
