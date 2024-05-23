import { combineReducers } from 'redux';
import dark_mode_reducers from '@reducers/dark_mode_reducers';
import brand_reducers from '@reducers/brand_reducers';
import charge_of_reducers from '@reducers/charge_of_reducers';
import device_reducers from '@reducers/device_reducers';
import makeup_hair_reducers from '@reducers/makeup_hair_reducers';
import role_reducers from '@reducers/role_reducers';
import schedule_reducers from '@reducers/schedule_reducers';
import stylist_reducers from '@reducers/stylist_reducers';
import time_location_reducers from '@reducers/time_location_reducers';
import user_reducers from '@reducers/user_reducers';
export default combineReducers({
    dark_mode: dark_mode_reducers,
    brand: brand_reducers,
    charge_of: charge_of_reducers,
    device: device_reducers,
    makeup_hair: makeup_hair_reducers,
    role: role_reducers,
    schedule: schedule_reducers,
    stylist: stylist_reducers,
    time_location: time_location_reducers,
    user: user_reducers,
})