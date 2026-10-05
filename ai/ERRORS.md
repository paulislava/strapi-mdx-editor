# Ошибки

## npm CI зависает на установке зависимостей (2026-10-06)

Стабильный релиз Strapi MDX-плагина не проходил `npm ci` в GitHub Actions. В `package-lock.json` сохранились 3426 ссылок на tarball в приватном `nexus.sberdevices.ru` и ссылка на локальный `/tmp/paulislava-mdx-editor-0.1.15.tgz`, которого нет в CI. Все tarball URL заменены на соответствующие адреса `registry.npmjs.org`; опубликованный `@paulislava/mdx-editor@0.1.15` имеет тот же integrity-хеш. Версии зависимостей не менялись.
