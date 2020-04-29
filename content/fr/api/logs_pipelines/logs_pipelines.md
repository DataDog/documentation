---
title: Pipelines de logs
type: apicontent
order: 25
external_redirect: '/api/#pipelines-de-logs'
---
## Pipelines de logs

<mark>Les endpoints Pipelines de logs ne sont pas pris en charge dans les bibliothèques client de Datadog. Pour demander cette fonctionnalité, contactez l’[assistance Datadog][1]. Pour configurer les permissions de vos pipelines, consultez la documentation: [accorder des permissions avec un scope limité][2] </mark>

Les pipelines et les processeurs fonctionnent sur les logs entrants, effectuant le parsing et la transformation de ces derniers en attributs structurés pour faciliter les requêtes.

* Consultez la [page de configuration des pipelines][3] pour obtenir une liste des pipelines et des processeurs actuellement configurés dans notre interface utilisateur.
* Pour en savoir plus sur les pipelines, consultez la [documentation à ce sujet][4].

**Remarque** : ces endpoints sont uniquement disponibles pour les utilisateurs admin. Veillez à utiliser une clé d'application créée par un admin.

[1]: /fr/help
[2]: /fr/account_management/faq/managing-global-role-permissions/#granting-permissions-within-limited-scopes
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /fr/logs/processing