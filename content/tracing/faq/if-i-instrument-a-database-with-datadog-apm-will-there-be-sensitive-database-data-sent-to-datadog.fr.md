---
title: Si j'instrumente une base de données avec Datadog APM, y aura-t-il des données de base de données sensibles envoyées à Datadog?
kind: faq
---

À l'origine, la façon dont nous communiquons avec les bases de données ne devrait pas transmettre les paramètres de configuration réels, donc vous ne devriez pas avoir cette situation. (Les paramètres nommés, par exemple "?" seront stockés).

