let users = require('../db/models/models')
const { success_function, error_function } = require('../util/responceHandler')
// const bcrypt = require('bcrypt');




exports.createl = async function (req, res) {

    try {
        let body = req.body;
        console.log("body", body);
        let new_book = await users.create(body)
        console.log("new_book", new_book)

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added.."
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}
exports.getall = async function (req, res) {
    try {


        let book_list = await users.find();
        console.log("book_list", book_list);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added..",
            data : book_list
        });
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        });
        res.status(response.statuscode).send(response)
        return;

    }
}

exports.getsingle = async function (req, res) {

    try {

        const bookId = req.params.id;
        console.log("productId", bookId);

        const pro = await users.findOne({ _id: bookId });
        console.log("pro", pro);
        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added..",
            data:pro
        })
        res.status(response.statuscode).send(response)
        return;
    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.userupdate = async function (req, res) {
    try {
        let body = req.body;
        console.log("body", body);
        let data = {
            title: body.title,
            released: body.released,
            price: body.price,
            witer: body.witer,
            cover: body.cover,
            description: body.description,
            review: body.review,
            image: body.image,
            about: body.about,
        }
        console.log("data", data);

        let id = req.params.id;
        console.log("id", id);
        let user_data = await users.updateOne({ _id: id }, data);
        console.log("user_data", user_data);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added..",
            data: user_data
        })
        res.status(response.statuscode).send(response)
        return;
    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }
}   

exports.deleteuser = async function(req,res){
    try {
        let deleteid = req.params.id;
        console.log("deleteid",deleteid);
        let singledel = await users.deleteOne({_id: deleteid});
        console.log("singledel",singledel);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added..",
            data: singledel
            
        })
        res.status(response.statuscode).send(response)
        return;
    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    
    }

}