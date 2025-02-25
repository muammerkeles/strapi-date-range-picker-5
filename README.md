# date-range-picker-5

This date-range-picker plugin allows you to select a data range in one CustomField instead of adding two seperate date field.



**A newer version compatible with Strapi V5 is available at the link below: **

     👇👇👇👇👇👇👇

✅ 🚀 [Strapi Date Range Picker 5](https://github.com/muammerkeles/strapi-date-range-picker-5) 🚀

 
       👆👆👆👆👆👆👆

-- 

❌❌❌❌
# 📦 This repository is going to be archived !!.
### Strapi plugin - date-range-picker  BETA

Strapi Custom Field for Date Range 

[GitHub](https://github.com/muammerkeles/strapi-date-range-picker-plugin) - [npm](https://www.npmjs.com/package/strapi-date-range-picker-plugin)

How to use?

install npm package 

`npm i strapi-date-range-picker-5`

(create file **plugins.js** if not existing inside **config** folder)

config/plugins.js
then add this code inside **plugins.js**
```
module.exports = () => ({
    // ..
    'date-range-picker-5': {
        enabled: true,
        resolve: './src/plugins/date-range-picker-5'
      },
    //..
});

```
_npm run build --clean_

It's ready.

This date-range-picker-5 plugin allows you to select a data range in one CustomField instead of adding two seperate field. 

Watch the video:

![alt text](date-range-5.gif)