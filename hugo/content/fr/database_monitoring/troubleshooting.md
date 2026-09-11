---
description: Dépannage de la solution Database Monitoring
title: Dépannage de la solution Database Monitoring
---

Cette page décrit les problèmes courants liés à la configuration et à l'utilisation de la solution Database Monitoring qui s'appliquent à toutes les bases de données et explique comment les résoudre. Datadog recommande de rester sur la dernière version stable de l'Agent et de suivre les dernières [instructions de configuration][1], car elles peuvent changer en fonction des versions de l'Agent.

Pour résoudre les problèmes de configuration concernant des bases de données spécifiques, consultez la page pertinente :

* [Dépannage de la configuration MySQL][2]
* [Dépannage de la configuration Oracle][8]
* [Dépannage de la configuration Postgres][3]
* [Dépannage de la configuration SQL Server][4]
* [Dépannage de la configuration MongoDB][9]

## Diagnostiquer les problèmes courants
### Les paramètres de liaison de requête ne peuvent pas être affichés

À l'heure actuelle, les paramètres de liaison des requêtes brutes sont obfusqués pour les Query Samples et les Explain Plans, et sont remplacés par un caractère `?`.


### Limite d'instances DBM

Selon la complexité des bases de données surveillées, un trop grand nombre de hosts DBM sur un Agent peut surcharger ce dernier et retarder la collecte des données. Si l'Agent est surchargé, vous verrez probablement des avertissements tels que `Job loop stopping due to check inactivity in the Agent logs`.

Il est recommandé qu'un seul Agent Datadog surveille au maximum 30 instances de base de données. Si vous avez plus de 30 instances de base de données, envisagez de les répartir sur plusieurs Agents Datadog.


### Aucune donnée DBM visible dans Datadog : problèmes de connexion ?

Si votre configuration vous semble correcte mais que vous ne voyez pas de données dans vos pages DBM, il est possible que votre Agent ne soit pas en mesure d'envoyer des données aux endpoints de collecte de données de Datadog. Pour diagnostiquer les problèmes de connexion, suivez les étapes de dépannage de connexion suivantes depuis l'emplacement où l'Agent s'exécute.

1. Testez la connectivité TCP sur les endpoints de collecte DBM :

```
telnet dbm-metrics-intake.{{< region-param key="dd_site" code="true" >}} 443
telnet dbquery-intake.{{< region-param key="dd_site" code="true" >}} 443
```

2. Testez l'envoi d'une charge utile vide avec une clé d'API invalide sur les deux endpoints DBM.
Ces commandes doivent échouer avec le code HTTP `403: Forbidden`.

```
curl -vvv -X POST "https://dbm-metrics-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"

curl -vvv -X POST "https://dbquery-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"
```

Les réponses doivent contenir `{"status":"error","code":403,"errors":["Forbidden"],...}` si les requêtes ont bien été envoyées et qu'une réponse a été reçue.

Parmi les causes courantes d'échec de connexion figurent les [configurations de proxy][7] et les pare-feux, qui bloquent le trafic sortant vers les endpoints de Datadog. Si vous utilisez un proxy ou un pare-feu, assurez-vous que les adresses IP des endpoints DBM sont autorisées. Ces adresses sont disponibles dans le bloc APM à l'adresse `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

## Besoin d'aide supplémentaire ?

Si votre problème persiste, contactez l'[assistance Datadog][5] pour obtenir de l'aide.


[1]: /fr/database_monitoring/#getting-started
[2]: /fr/database_monitoring/setup_mysql/troubleshooting/
[3]: /fr/database_monitoring/setup_postgres/troubleshooting/
[4]: /fr/database_monitoring/setup_sql_server/troubleshooting/
[5]: /fr/help/
[7]: /fr/agent/configuration/proxy/?tab=linux
[8]: /fr/database_monitoring/setup_oracle/troubleshooting/
[9]: /fr/database_monitoring/setup_mongodb/troubleshooting/