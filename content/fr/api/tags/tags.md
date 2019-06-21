---
title: Tags
type: apicontent
order: 30
external_redirect: '/api/#tags'
---
## Tags
L'endpoint tag vous permet de taguer les hosts avec des mots-clés qui vous sont utiles, comme `role:database`.
Toutes les métriques envoyées par un host se voient appliquer ses tags. Pour la récupération et l'application de tags à un host spécifique, utilisez le nom des hosts (yourhost.example.com) pour vous y référer.

Le composant de votre infrastructure responsable d'un tag est identifié par une source. Les sources valides sont : nagios, hudson, jenkins, users, feed, chef, puppet, git, bitbucket, fabric, capistrano, ... [Liste complète des valeurs d'attribut source][1].

[En savoir plus sur les tags sur la page de la documentation dédiée][2].

[1]: /fr/integrations/faq/list-of-api-source-attribute-value
[2]: /fr/tagging