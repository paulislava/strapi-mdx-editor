# Ошибки

## npm CI зависает на установке зависимостей (2026-10-06)

Стабильный релиз Strapi MDX-плагина застрял на `npm ci` в GitHub Actions. В `package-lock.json` сохранились 3426 ссылок на tarball в приватном `nexus.sberdevices.ru`, тогда как публичный CI должен устанавливать зависимости из npm. Все tarball URL в lockfile заменены на соответствующие адреса `registry.npmjs.org`; зависимости и их integrity-хеши не менялись.
