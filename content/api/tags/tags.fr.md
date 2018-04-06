---
title: Tags
type: apicontent
order: 20
external_redirect: /api/#tags
---

## Tags
L'endpoint tag vous permet de tagger les hosts avec des mots-clés significatifs pour vous - comme `role:database`.
Toutes les métriques envoyées par un host se voient appliquer ses tags. Lors de l'application de tags à un host particulier, reportez-vous à la section hosts par nom (yourhost.example.com).

Le composant de votre infrastructure responsable d'un tag est identifié par une source. Les sources valides sont: nagios, hudson, jenkins, utilisateurs, flux, chef, marionnette, git, bitbucket, fabric, capistrano ... [Liste complète des valeurs d'attribut source](/integrations/faq/list-of-api-source-attribute-value).

[En savoir plus sur les tags sur la page de documentation dédiée](/getting_started/tagging).