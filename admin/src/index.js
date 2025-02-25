import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import pluginPkg from '../../package.json';

import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
const date_range_component = "date-range-picker";

export default {
  register(app) {

    app.customFields.register({
      name:`${date_range_component}`,
      icon: PluginIcon,
      pluginId: PLUGIN_ID,
      type: "json",
      intlLabel: {
        id: `${PLUGIN_ID}.${date_range_component}.label`,
        defaultMessage: "Date Range Picker",
      },
      intlDescription: {
        id:  `${PLUGIN_ID}.${date_range_component}.description`,
        defaultMessage: "Date Range Picker to add custom field",
      },
      components: {
        Input: async () => import('./components/DateRange'),
      },
      options: {
        //default: 'Preview', // Nok
        baseName: 'Preview Button', // Nok
        base: []
      }
    })

    /*app.addMenuLink({
      to: `plugins/${PluginIcon}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });
*/
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
