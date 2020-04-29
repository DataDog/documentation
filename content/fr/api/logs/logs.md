---
title: Logs
type: apicontent
order: 23
external_redirect: '/api/#logs'
---
## Logs

<mark>Les endpoints des logs ne sont pas pris en charge dans les bibliothèques client de Datadog. Pour demander cette fonctionnalité, contactez l’[assistance Datadog][1].</mark>

Envoyez vos logs à votre plateforme Datadog par HTTP. Les limites par requête HTTP sont les suivantes :

* Taille maximale du contenu par charge utile : 5 Mo
* Taille maximale d'un log : 256 Ko
* Taille maximale d'un tableau en cas d'envoi de plusieurs logs dans un tableau : 500 entrées

Tous les logs dépassant 256 Ko sont acceptés et tronqués par Datadog :

* Pour une requête avec un seul log, l'API réduit le log de façon à ce qu'il fasse 256 Ko et renvoie un code 2xx.
* Pour une requête avec plusieurs logs, l'API traite tous les logs, réduit uniquement les logs dépassant 256 Ko et renvoie un code 2xx.

**Remarque** : si vous utilisez le site européen de Datadog (`app.datadoghq.eu`), l'endpoint HTTP des logs est le suivant : `https://http-intake.logs.datadoghq.eu`.

[1]: /fr/help