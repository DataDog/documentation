---
title: Comment Datadog récupère mes données? Mes données et informations d'identification sont-elles sécurisées?
kind: faq
---

* Le trafic est toujours initié par l'Agent vers Datadog. Aucune session n'est jamais initiée depuis Datadog vers l'Agent.
* Tout le traffic est envoyé en SSL
* Toutes les communications vers Datadog s'effectuent via HTTPS.
* [Full license agreement](https://app.datadoghq.com/policy/license).
* [l'Agent Datadog est complètement open-source](https://github.com/DataDog/dd-agent/).
* Certaines installations (par exemple, l'installation de l'agent sur CentOS 5), demandent votre mot de passe. Le mot de passe est nécessaire car il installe des paquets - Datadog ne le conserve pas de toute façon. Vous pouvez également utiliser les instructions étape par étape si vous préférez voir exactement ce que fait le script.

[Consultez la liste des adresses IP et des ports utilisés pour la communication vers Datadog dans cet article](/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service).