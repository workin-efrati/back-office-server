import { create , read, readOne } from "../../DL/controller/playlist.controller.js"

export const createPlaylist = async (data) => {
    const res = await create(data)
    return res
}
export const readPlaylist = async (filter) => {
    const res = await read(filter)
    return res
}
export const readOnePlaylist = async (id) => {
    const res = await readOne(id)
    return res
}