import WisataModel from "../model/wisata.model.js";
import { apiResponse,apiResponseValidation } from "../utils/response.js";
import { storeWisataSchema,updateWisataSchema } from "../schemas/wisata.schema.js";
class WisataController {
    static async index(req,res) {
        const { search, sortBy = "createdAt", sort } = req.query; 
        const filter = {}; 
        if (search) { 
            filter.name = { 
            $regex: search, 
            $options: "i", 
            }; 
        }
        
        const sortOption = { 
            createdAt: sort === "desc" ? -1 : 1, 
            [sortBy]: sort === "desc" ? -1 : 1,
        }; 

        const listWisata = await WisataModel.find(filter).select({
            _id: 1,
            nama_wisata: 1,
            kota: 1,
            harga: 1,
        })
        .sort(sortOption)

        return apiResponse({
            res,
            status : 200,
            message : "List Wisata",
            data : listWisata
        })
    }
    static async show(req,res) {
        const wisataId = req.params.id;

        const wisata = await WisataModel.findById(filter).select({
            _id: 1,
            nama_wisata: 1,
            kota: 1,
            harga: 1,
        })
        .sort(sortOption)
        .populate({ path: 'wisata', select: '_id nama_wisata kota harga' })
        return apiResponse({
            res,
            status : 200,
            message : "Detail Wisata",
            data : wisata
        })
    }
    static async store(req,res){
        const result = storeWisataSchema.safeParse(req.body);
        if(!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }
        const{nama_wisata, kota, harga, is_Visited} = result.data;

        const wisata = await WisataModel.create({
            nama_wisata : nama_wisata,
            kota : kota,
            harga : harga,
            is_Visited : is_Visited
        })
        return apiResponse({
            res,
            status : 200,
            message : "Data Wisata berhasil di buat",
            data : wisata 
        })
    }
    static async update(req, res) {
        const wisataId = req.params.id
        const result = updateWisataSchema.safeParse(req.body);
        if(!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }
        const{nama_wisata, kota, harga, is_Visited} = result.data;
   
        const exists = await WisataModel.exists({ _id: wisataId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Wisata tidak ditemukan' })
    }
        const updateWisata = await WisataModel.findOneAndUpdate(
            { _id: wisataId },
            { nama_wisata, kota, harga, is_Visited },
            { new: true }
    )
        return apiResponse({ res, status: 200, data: updateWisata })
  }
    static async delete(req, res) {
        const wisataId = req.params.id
        const exists = await WisataModel.exists({ _id: wisataId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Wisata tidak ditemukan' })
    }
        await WisataModel.findOneAndDelete({ _id: wisataId })
            return apiResponse({ res, status: 200, message: 'Data Wisata berhasil dihapus', data: null })
  }

}

export default WisataController