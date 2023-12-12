import api_admin from '../auths/api_admin';
const get_list_device = () => {
    return api_admin.get(`/management/api/v1/list-device`,);
}
const delete_device = (id) => {
    return api_admin.delete(`/management/api/v1/delete-device/${id}`,);
}
export {
    get_list_device, delete_device
}