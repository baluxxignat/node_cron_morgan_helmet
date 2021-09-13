module.exports = {

    getAllItems: (BD, data) => BD.find(data),

    createItem: (BD, newUser) => BD.create(newUser),

    deleteCurrentItem: (BD, id) => BD.deleteOne({ _id: id }),

    updateItem: (BD, id, info) => BD.findByIdAndUpdate(id, info)

};
