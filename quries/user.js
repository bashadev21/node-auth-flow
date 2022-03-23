//Resgiter
userCheck=`select * from users where email= ?`;
register=`insert into users set ?`;

//login
passwordCheck=`select password from users where email= ?`;
nameGet=`select name from users where email= ?`;

module.exports={
    register,
    userCheck,
    passwordCheck,
    nameGet
}