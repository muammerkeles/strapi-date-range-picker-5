import pluginPkg from '../../package.json';
import { PLUGIN_ID } from '../../admin/src/pluginId';


const date_range_component = "date-range-picker";
const register = ({ strapi }) => {
 
  strapi.customFields.register({
    name: `${date_range_component}`,
    plugin: `${PLUGIN_ID}`,
    type: "json"
  });
};

export default register;