// import Model Patient
const Patient = require("../models/Patient")

// buat class PatientController
class PatientController {
  // Menampilkan semua data
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all();

    // Data array lebih dari 0
    if (patients.length > 0) {
      const data = {
          message: "Menampilkan semua pasien",
          data: [patients],
      };
      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Data pasien kosong",
      };
      res.status(200).json(data);
    }
  }

  // Menambahkan data pasien
  async store(req, res) {
      /**
     * Validasi sederhana
     * - Handle jika salah satu data tidak dikirim
     */
      
    // destructing object req.body
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;
    
    // Jika data undefined maka kirim response error
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: `Semua data harus dikirim`,
      };
      return res.status(422).json(data);
    }
    // jika terisi semua
    const patient = await Patient.create(req.body);
    const data = {
      message: `Berhasil menambahkan data pasien`,
      data: patient,
    };
    return res.status(422).json(data);
  }

  // Mengupdate data pasien
  async update(req, res) {
    const { id } = req.params;
    // Mencari id pasien yang ingin diupdate
    const patient = await Patient.find(id);

    if (patient) {
      // Melakukan update data sesuai id dan data body yang diisi
      const patient = await Patient.update(id, req.body);
      const data = {
          message: "Berhasil mengupdate data pasien",
          data: patient,
      };
      res.status(200).json(data);
    }
    // jika tidak berhasil
    else {
      const data = {
        message: "Data pasien tidak ditemukan"
      };
      res.status(404).json(data);
    }
  }

  // Menghapus data pasien
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      // Melakukan hapus data sesuai id
      await Patient.delete(id);
      const data = {
        message: "Data pasien berhasil di hapus",
      };
      res.status(200).json(data);
    // jika tidak berhasil
    } else {
      const data = {
        message: "Data pasien tidak ditemukan",
      };
      res.status(404).json(data);
    }
  }

  // Menemukan data details sesuai dengan id
  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: "Menampilkan detail dari data pasien",
        data: patient,
      };
      res.status(200).json(data);
    } 
    else {
      const data = {
        message: "Data pasien tidak ditemukan",
      };
      res.status(404).json(data);
    }
  }

  // Menampilkan data berdasarkan nama
  async showName(req, res) {
    const { name } = req.params;
    const patient = await Patient.findByName(name);

    if (patient) {
      const data = {
        message: "Get searched resource",
        data: patient,
      };
      res.status(200).json(data);
    } 
    else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }

   // Menampilkan data berdasarkan status positif
  async showPositive(req, res) {
    try { 
      const patient = await Patient.findByStatus("positive");

      if (patient.length > 0) {
        const data = {
          message: "Menampilkan pasien berdasarkan status positif",
          data: patient,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: "Resource not found",
        };
        res.status(404).json(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Menampilkan data berdasarkan status sembuh
  async showRecovered(req, res) {
    const patient = await Patient.findByStatus("recovered");

    if (patient) {
      const data = {
        message: "Menampilkan pasien dengan status sembuh",
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }

  // Menampilkan data berdasarkan status meninggal
  async showDead(req, res) {
    const patient = await Patient.findByStatus("dead");

    if (patient) {
      const data = {
        message: "Menampilkan pasien dengan status meninggal",
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };
      res.status(404).json(data);
    }
  }


}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
