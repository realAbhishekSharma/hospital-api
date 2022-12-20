const connection = require('../../config/database_sql')


class admin{

    checkService( req , res , next ){
        const serviceName = req.body.service_name
        const query = `select * from services where service_name ="${serviceName}"`
        console.log(query)
    
        connection.query(query, (err, data)=>{
            
            if (err){
                throw err
            }
            if(data[0]){
                console.log(data[0])
                res.send("Data Already exits.")
            }else{
                next()
            }
        })
    
    }
    checkDoctor(req , res , next){
        const phone = req.body.phone
        const query = `select * from doctors where phone ="${phone}"`
        console.log(query)
        connection.query(query, (err, rows)=>{
            
            if (err){
                throw err
            }
            if(rows[0]){
                console.log(rows[0])
                res.send("Data Already exits.")
            }else{
                next()
            }
        })

    }

    checkDepartment(req , res , next){
        const department_name = req.body.department_name
        const query = `select * from departments where department_name ="${department_name}"`
        console.log(query)
        connection.query(query, (err, rows)=>{
            
            if (err){
                throw err
            }
            if(rows[0]){
                console.log(rows[0])
                res.send("Data Already exits.")
            }else{
                next()
            }
        })

    }

    checkHospital(req , res , next){
        const hospital_name = req.body.hospital_name
        const query = `select * from hospital where hospital_name ="${hospital_name}"`
        console.log(query)
        connection.query(query, (err, rows)=>{
            
            if (err){
                throw err
            }
            if(rows[0]){
                console.log(rows[0])
                res.send("Data Already exits.")
            }else{
                next()
            }
        })

    }

}

module.exports = new admin()

