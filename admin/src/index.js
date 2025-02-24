import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import pluginPkg from '../../package.json';

import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
const name = pluginPkg.strapi.name;

export default {
  register(app) {

    app.customFields.register({
      name,
      icon: PluginIcon,

//      name:"date-range-picker",
      /*plugin: name,// "strapi-custom-date-range-picker-field",
      */
      id: PLUGIN_ID,

      //pluginId: pluginId,
      type: "json",
      intlLabel: {
        id: `${PLUGIN_ID}.${name}.label`,
        defaultMessage: "Date Range Picker",
      },
      intlDescription: {
        id:  `${PLUGIN_ID}.${name}.description`,
        defaultMessage: "Date Range Picker to add custom field",
      },
      components: {
        Input: async () => import('./components/DateRange'),
      },
    })

    app.addMenuLink({
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
