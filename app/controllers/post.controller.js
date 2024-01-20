const BlogPost = require("../models/post.model.js");

// Simpan Data Post Baru ke Tabel tbl_post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Konten tidak boleh kosong!"
        });
    }

    // Membuat Post Baru
    const tutorial = new BlogPost({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // Simpan Post in the database
    BlogPost.create(tutorial, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Beberapa Kesalahan Terjadi saat membuat post di database"

        });
        else res.send(data);
    });
};

// Retrieve Semua Data Pada Post from the database (Tanpa Kondisi).
exports.findAll = (req, res) => {
    const title = req.query.title;
    BlogPost.getAll(title, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Beberapa kesalahan terjadi saat mengambil data post."

        });
        else res.send(data);
    });
};

// Menampilkan single pencarian berdasarkan id
exports.findOne = (req, res) => {
    BlogPost.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Data tidak ditemukan di tabel Post berdasarkan ID ${req.params.id}.`

                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post Berdasarkan Id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all published Post
exports.findAllPublished = (req, res) => {
    BlogPost.getAllPublished((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Beberapa kesalahan terjadi saat mengambil data post."
        });
        else res.send(data);
    });
};

// Update a post identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Tidak boleh kosong!"
        });
    }

    console.log(req.body);

    BlogPost.updateById(
        req.params.id,
        new BlogPost(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post dengan id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error Updating Post dengan id " + req.params.id
                    });
                }
            } else res.send(data);
    });
}

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    BlogPost.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post dengan id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete Post dengan id " + req.params.id
                    });
                }
            } else res.send({ message: `Post was deleted successfully!`});
    });
};

// Delete all tutorials from the database.
exports.deleteAll = (req, res) => {
    BlogPost.removeAll((err, data) => {
        if (err)
            res.status(500).send({
            message: 
            err.message || "Beberapa kesalahan terjadi saat menghapus semua data post."
        });
        else res.send({ message: 'Semua Data Post Berhasil di Hapus! '});
    });
};

