import moongoose from 'mongoose'

const WisataSchema = new moongoose.Schema({
    name :{
        nama_wisata : String,
        kota : String,
        harga : Number,
        is_Visited : Boolean
    }
},{
    timestamps : true
})

const WisataModel = moongoose.model('Wisata',WisataSchema)
export default WisataModel