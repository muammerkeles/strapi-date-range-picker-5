const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('date-range-picker-5')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
});

export default controller;
