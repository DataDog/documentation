---
description: Dépannage de la solution Database Monitoring
title: Dépannage de la solution Database Monitoring
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

Cette page décrit les problèmes courants liés à la configuration et à l'utilisation de la solution Database Monitoring qui s'appliquent à toutes les bases de données et explique comment les résoudre. Datadog recommande de rester sur la dernière version stable de l'Agent et de suivre les dernières [instructions de configuration][1], car elles peuvent changer en fonction des versions de l'Agent.

Pour résoudre les problèmes de configuration concernant des bases de données spécifiques, consultez la page pertinente :

* [Dépannage de la configuration MySQL][2]
* [Dépannage de la configuration Postgres][3]

## Diagnostiquer les problèmes courants
### Les paramètres de liaison de requête ne peuvent pas être affichés

Pour le moment, les paramètres de liaison de requête brute sont obfusqués dans les échantillons de requête et les plans d'exécution, le caractère `?` étant utilisé à la place. Dans une prochaine version, nous ajouterons des paramètres permettant d'exposer les paramètres de liaison de requête non obfusqués.


### Limite de hosts DBM

Selon la complexité des bases de données surveillées, un trop grand nombre de hosts DBM sur un Agent peut surcharger ce dernier et retarder la collecte des données. Si l'Agent est surchargé, vous verrez probablement des avertissements tels que `Job loop stopping due to check inactivity in the Agent logs`.

Il est recommandé de ne pas surveiller plus de 10 hosts DBM avec un même Agent Datadog. Si vous avez plus de 10 hosts DBM, il est préférable de les répartir sur plusieurs Agents Datadog.

## Besoin d'aide supplémentaire ?

Si votre problème persiste, contactez l'[assistance Datadog][4] pour obtenir de l'aide.


[1]: /fr/database_monitoring/#getting-started
[2]: /fr/database_monitoring/setup_mysql/troubleshooting/
[3]: /fr/database_monitoring/setup_postgres/troubleshooting/
[4]: /fr/help/