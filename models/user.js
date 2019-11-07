const conn = require('../database/connection');

module.exports = {
    signup: ({ email, password, name, oauth_signup }, callback) => { 
      let sql = 'INSERT INTO users (email, password, name, oauth_signup) VALUES (?, ?, ?, ?);';
      const arg = [email, password, name, oauth_signup];
      conn.query(sql, arg, (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
      });
    },

    signin: ({ email, password }, callback) => {
      let sql = `SELECT * FROM users WHERE email='${email}'`
      conn.query(sql, (err, results) => {
        if(err) callback(err, null);
        else {
          if(!results.length) callback(null, 'No match Email')
          else {
            sql = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`
            conn.query(sql, (err, results) => {
              if(err) callback(err, null);
              else{
                if(!results.length) callback(null, 'No match password')
                else callback(null, results);
              }
            })        
          }
        }
      })
    },

    sendPassword: ({ email, name }, callback) => {
      let sql = `SELECT * FROM users WHERE email='${email}';`
      conn.query(sql, (err, results) => {
        if(err) callback(err, null);
        else {
          if(!results.length) callback(null, 'No match Email');
          else {
            sql = `SELECT * FROM users WHERE email='${email}' AND name='${name}';`
            conn.query(sql, (err, results) => {
              if(err) callback(err, null);
              else {
                if(!results.length) callback(null, 'No match Name');
                else {
                  callback(null, results)
                }
              }
            })
          }
        }
      })
    },

    get: (id, callback) => {
      let sql = `SELECT * FROM users WHERE id='${id}'`;
      conn.query(sql, (err, results) => {
        if(err){
          callback(err, null);
        } else callback(null, results);
      });
    },

    put: ({ email, password, name, id }, callback) => {
      let sql = `UPDATE users SET email='${email}', password='${password}', name='${name}' WHERE id='${id}';`
      conn.query(sql, (err, results) => {
        if(err) callback(err, null);
        else {
          sql = `SELECT * FROM users WHERE id='${id}';`
          conn.query(sql, (err, results) => {
            if(err) callback(err, null);
            else callback(null, results);
          })
        }
      })
    },
    
    delete: (id, callback) => {
      let sql = `DELETE FROM users WHERE id='${id}';`
      conn.query(sql, (err, results) => {
        if(err) callback(err, null);
        else {
          sql = `DELETE FROM shared WHERE user_id='${id}';`
          conn.query(sql, (err, results) => {
            if(err) callback(err, null); 
            else callback(null, results);                
          })
        }
      })
    }
  }