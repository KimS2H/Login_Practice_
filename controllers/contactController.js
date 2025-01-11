const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//GET all contact
//GET /contact
const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find(); //contact변수는 db 에서 가져온 값
  /*
  const users = [
    { name: "kim", email: "kim@naver.com", tel: "123456" },
    { name: "Lee", email: "Lee@naver.com", tel: "132456789" },
  ];
  */

  //res.render(ejs 파일, {변수, 전송 자료})
  res.render("NewJoin.ejs");
});

//Create contact
//Post /contact
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, tel } = req.body;
  if (!name || !email || !tel) {
    return res.send("필수 값이 입력되지 않았습니다");
  }

  const contact = await Contact.create({
    name,
    email,
    tel,
  });

  res.send("Create Contacts");
});

const getContact = asyncHandler(async (req, res) => {
  //본문의 id정보 읽기
  const contact = await Contact.findById(req.params.id);
  res.send(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id; //id 정의
  const { name, email, tel } = req.body; //수정할 내용 확인
  const contact = await Contact.findById(id); // 본문 내용 확인
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
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id; //id 정의
  const contact = await Contact.findById(id); // 본문 내용 확인
  if (!contact) {
    //만약 수정하고 싶은 contact가 존재하지 않으면 에러
    throw new Error("Contact not Found.");
  }
  await Contact.deleteOne();
  res.send("Delete");
});

module.exports = {
  getAllContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
