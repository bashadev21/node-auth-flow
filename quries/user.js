//Resgiter
userCheck=`select * from users where email= ?`;
register=`insert into users set ?`;

//login
passwordCheck=`select password from users where email= ?`;
nameGet=`select name from users where email= ?`;

//Passport
passportCheck=`select * from passport where email= ?`;
insertPassport=`insert into passport set ?`;
getallPassport=`select * from passport`;
getparticularID=`select * from passport where id = ?`;

module.exports={
    register,
    userCheck,
    passwordCheck,
    nameGet,
    passportCheck,
    insertPassport,
    getallPassport,
    getparticularID,

}