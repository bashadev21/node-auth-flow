usercheck=`select * from bank_users where email= ?`;
register=`insert into bank_users set ?`;
managersID=`select id from bank_users where role_id= 2`;
myloans=`select * from loans where user_id= ?`;
lastID=`select manager_id from loans order by id desc limit 1`;
insertloan=`insert into loans set ?`;
managersLoans=`select * from loans where manager_id= ? and status ='Waiting for approval..!'`;
statusupdate=`update loans set status = ? where id = ?`;
adminloans=`select * from loans where status = 'Waiting for admin approval..!'`;



module.exports={
    usercheck,
    register,
    managersID,
    lastID,
    insertloan,
    managersLoans,
    myloans,
    statusupdate,
    adminloans
}