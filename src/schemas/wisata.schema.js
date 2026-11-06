import z from "zod";

export const storeWisataSchema = z.object({
    nama_wisata : z.string().trim().max(50, "Nama Wisata maksimal 50 karkter"),
    kota : z.string().trim().max(50, "Nama Kota maksimal 50 karakter"),
    harga : z.number().optional(),
    is_Visited : z.boolean().optional()
});
export const updateWisataSchema = z.object({
    nama_wisata : z.string().trim().max(50, "Nama Wisata maksimal 50 karkter"),
    kota : z.string().trim().max(50, "Nama Kota maksimal 50 karakter"),
    harga : z.number().optional(),
    is_Visited : z.boolean().optional()
})