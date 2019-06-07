---
title: Logs
type: apicontent
order: 22
external_redirect: "/api/#logs"
---

## Logs

Envoyez vos logs à votre plateforme Datadog par HTTP. Les limites par requête HTTP sont les suivantes :

* Taille maximale du contenu par charge utile : 2 Mo
* Taille maximale d'un log : 256 Ko
* Taille maximale d'un tableau en cas d'envoi de plusieurs logs dans un tableau : 50 entrées

**Remarque** : si vous utilisez le site européen de Datadog (`app.datadoghq.eu`), l'endpoint HTTP des logs est le suivant : `https://http-intake.logs.datadoghq.eu`.
