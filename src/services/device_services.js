import api_admin from '@auths//api_admin';
const get_list_device = () => {
    return api_admin.get(`/management/api/v1/list-device`,);
}
const delete_device = (id) => {
    return api_admin.delete(`/management/api/v1/delete-device/${id}`,);
}
const create_device = (data) => {
    return api_admin.post(`/management/api/v1/create-device`, data,);
}
const edit_device = (id, data) => {
    return api_admin.put(`/management/api/v1/update-device/${id}`, data,);
}
const get_device = (id) => {
    return api_admin.get(`/management/api/v1/get-device/${id}`,);
}
export {
    get_list_device, delete_device, create_device, edit_device, get_device
}