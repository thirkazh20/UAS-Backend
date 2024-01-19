// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  /**
   * Membuat method static all.
   * Digunakan untuk mengambil semua data pasien dari database.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Method untuk menambahkan data pasien kedalam database
   */
  static async create(data) {
    // Insert data pasien ke dalam database
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });
    
    const patient = await this.find(id);
    return patient;
  }

  // Mengupdate data pasien
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // Mencari data pasien yang baru saja diupdate
    const patient = await this.find(id);
    return patient;
  }

  // Menghapus data pasien dari database
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Mencari data berdasarkan dengan ID pasien
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Mencari data berdasarkan dengan Nama pasien
  static findByName(name) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE name = ?";
            db.query(sql, name, (err, results) => {
                const [patient] = results;
                resolve(patient);
            });
        });
    }

  // Mencari data berdasarkan dengan Status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM patients WHERE status = ?";
        db.query(sql, status, (error, results) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(results);
          }
        });
      });
    }
}

// export class Patient
module.exports = Patient;
