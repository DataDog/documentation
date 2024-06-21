---
aliases:
- /fr/logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
- link: /logs/guide/logs-rbac/
  tag: Documentation
  text: Configurer le RBAC (contrôle d'accès basé sur les rôles) pour Log Management
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: Filtrer et remplacer le contenu des logs avec la collecte de logs avancée
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Exclure des conteneurs de la collecte de logs avec Autodiscovery
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Concevoir une stratégie de conformité, gouvernance et transparence pour toutes
    vos équipes avec le journal d'audit Datadog
kind: guide
title: Contrôler les données de logs sensibles
---

## Présentation

Étant donné que vos logs peuvent contenir des données sensibles, ils doivent être traités avec le plus grand soin. Si vous ingérez des données sensibles dans Datadog, gardez à l'esprit les deux points suivants :

- Si vous avez intentionnellement configuré vos logs pour qu'ils comportent des données sensibles à des fins de dépannage et d'audit légitimes, utilisez le **RBAC** pour configurer les restrictions appropriées et faire ainsi en sorte que seuls les utilisateurs autorisés ayant accès à votre compte Datadog puissent accéder à ces données. Pour en savoir plus, consultez le [guide d'utilisation du RBAC pour les logs][1] pour découvrir comment le configurer pour votre organisation.
- Si des données sensibles sont loguées de façon involontaire, traitez-les sans attendre pour éviter tout problème en aval. Continuez à lire cette page pour en savoir plus.

Il n'est pas toujours facile de contrôler l'ensemble de vos données, en particulier sur des plateformes vastes et collaboratives. Ce guide présente les différentes options pour découvrir et gérer les données sensibles qui sont ingérées dans Datadog.

## Scanner de données sensibles

Le [scanner de données sensibles][2] est un service de détection d'expressions en temps réel que vous pouvez utiliser pour identifier, taguer et éventuellement censurer ou hacher des données sensibles. Cette fonctionnalité permet à vos équipes de conformité et de sécurité de mettre en place une ligne de défense contre les fuites de données sensibles en dehors de votre organisation. Le scanner de données sensibles est disponible dans vos [paramètres d'organisation][3].

Si vous avez déjà indexé des logs qui contiennent des données sensibles, suivez les trois étapes ci-après :

1. [Déterminer le contexte des données envoyées](#determiner-le-contexte-des-donnees-envoyees)
2. [Corriger la source de données en amont](#corriger-la-source-de-donnees-en-amont)
3. [Traiter les données déjà envoyées à Datadog](#traiter-les-donnees-deja-envoyees-et-indexees-dans-datadog)

## Déterminer le contexte des données envoyées

### Quelle est la requête de log utilisée pour définir les données sensibles ?

Définissez d'abord une requête correspondant aux données sensibles. Cette requête renverra alors tous les logs comportant des données sensibles.

Des requêtes comme `version:x.y.z source:python status:debug` peuvent par exemple répondre à cette exigence. Consultez la documentation sur la [syntaxe de recherche de log][4] si vous avez besoin d'utiliser des opérateurs avancés (wildcards, opérateurs booléens, etc.).

Ce guide utilise l'expression **requête de recherche des données sensibles** pour faire référence à cette requête.

### Où se trouvent les données sensibles dans Datadog ?

Une fois que des données sensibles dans des logs ont été envoyées à votre plateforme Datadog, elles peuvent se trouver à plusieurs endroits. Vérifiez donc chacun des emplacements suivants (classés selon la probabilité, de la plus forte à la plus faible, qu'ils contiennent des données sensibles) :

* Les [index][5] Datadog conservent vos logs jusqu'à ce qu'ils soient trop anciens, selon le paramètre de rétention des index. Vérifiez les index Datadog en premier : il est moins probable que les logs situés ailleurs présentent des problèmes de conformité. Examinez les [filtres d'index][6] et les [filtres d'exclusion][7] pour vérifier si des logs avec des données sensibles sont indexés.

* Vérifiez vos [archives][8] de logs : c'est là que les logs sont envoyés par Datadog afin d'être stockés. Configurez des filtres d'archives pour vérifier si votre archive contient des logs sensibles.

* Vérifiez également les [métriques générées à partir de logs][9] qui stockent des métriques agrégées. Les données sensibles ont probablement été filtrées. Passez en revue les filtres de métriques custom pour vérifier si des logs avec des données sensibles ont été traités.

* Les notifications des [log monitors][10] peuvent inclure des [exemples de log][11]. Vérifiez notamment les monitors qui se sont déclenchés pendant la période d'envoi de données sensibles.

* Les flux [Livetail][12] permettent aux utilisateurs de votre organisation de visualiser en temps réel les logs. Il n'y a aucune persistance au-delà des 50 logs mis en cache dans les navigateurs, et pour les requêtes plus vastes, les résultats peuvent présenter un niveau d'échantillonnage très élevé.

## Corriger la source de données en amont

### Censurer les données sensibles lors de streaming de logs à l'aide du scanner de données sensibles

Utilisez des règles prêtes à l'emploi ou personnalisées pour [identifier et censurer les autres types de données sensibles][2] qui continuent d'arriver dans vos logs.

### Arrêter l'indexation de logs sensibles

Si vous n'utilisez pas le scanner de données sensibles, déterminez si vous souhaitez empêcher tous les nouveaux logs contenant des données sensibles d'être indexés. Vous devrez dans tous les cas traiter les logs contenant des données sensibles déjà indexés dans Datadog.

* Recherchez les index qui contiennent des logs avec des données sensibles.
* Pour chaque index, ajoutez un filtre d'exclusion en fonction de la requête de recherche des données sensibles.

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="Filtres d'exclusion des données sensibles" style="width:80%;" >}}

### Arrêter d'envoyer des données sensibles à Datadog

Si certains types de données sensibles ne doivent pas quitter votre environnement et sont ingérées dans Datadog, ajoutez des règles de nettoyage au niveau de la collection source.

Si vous pouvez modifier directement les loggers, Datadog propose des solutions pour empêcher l'envoi de données sensibles en dehors de votre plateforme lorsque vous utilisez l'[Agent Datadog][13] pour la collecte de logs :

* [Nettoyez les données sensibles][14] de vos logs avant de les envoyer à Datadog.
* Vous pouvez également définir avec précision les conteneurs sur lesquels la collecte de logs doit être effectuée avec [Autodiscovery][15].

Des fonctionnalités de nettoyage des données similaires sont disponibles pour le [Forwarder sans serveur][16].

## Traiter les données déjà envoyées et indexées dans Datadog

Effectuez les étapes suivantes conformément à vos exigences de conformité. Veuillez noter que vous n'aurez peut-être pas à effectuer toutes ces étapes.

### Faire en sorte que les logs sensibles ne puissent pas être interrogés dans Datadog (jusqu'à ce qu'ils soient trop anciens)

Grâce à cette étape, les logs comportant des données sensibles, aussi bien ceux qui ont déjà été envoyés que ceux susceptibles d'être envoyés plus tard, ne peuvent pas faire l'objet d'une requête dans Datadog (Log Explorer, dashboards et Livetail).

Accédez à la [page de configuration de l'accès aux données][17] et utilisez une requête de recherche de données sensibles pour définir une [restriction][18] qui s'applique à tous les membres de votre organisation. Il peut s'agir par exemple de la requête utilisée ci-dessus : `version:x.y.z source:python status:debug`.

**Remarque** : si vous utilisez l'opérateur **NOT** dans la requête de recherche des données sensibles, les utilisateurs n'auront plus accès qu'aux logs correspondants.

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="Accès à des données sensibles" style="width:80%;" >}}

### Modifier vos archives

Si vous devez modifier vos archives afin de supprimer des données sensibles, consultez la documentation sur le [format des archives][19] générées par Datadog.

## Assistance

Si vous avez des questions concernant la conformité des logs ou si vous avez besoin d'aide, n'hésitez pas à contacter l'[équipe d'assistance][20] Datadog. Assurez-vous au préalable d'avoir à disposition les informations suivantes :

* La requête de recherche des données sensibles ou tout élément pouvant être utilisé pour définir les données sensibles, comme un intervalle, un service ou un environnement.
* Si vous utilisez le [scanner de données sensibles][21] ou non.
* Si des données sensibles sont encore envoyées à Datadog.
* Si des données sensibles ont été indexées (et dans quels index) ou transformées en métriques.
* Si vous avez déjà fait en sorte que les données sensibles ne puissent plus faire l'objet d'une requête.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/guide/logs-rbac/
[2]: /fr/sensitive_data_scanner/
[3]: /fr/account_management/org_settings/
[4]: /fr/logs/search_syntax/
[5]: /fr/logs/indexes
[6]: /fr/logs/indexes#indexes-filters
[7]: /fr/logs/indexes#exclusion-filters
[8]: /fr/logs/archives
[9]: /fr/logs/logs_to_metrics/
[10]: /fr/monitors/types/log/
[11]: /fr/monitors/types/log/#notifications
[12]: /fr/logs/explorer/live_tail/
[13]: /fr/agent/
[14]: /fr/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[15]: /fr/agent/guide/autodiscovery-management/?tab=containerizedagent
[16]: /fr/serverless/forwarder#log-forwarding-optional
[17]: https://app.datadoghq.com/logs/pipelines/data-access
[18]: /fr/account_management/rbac/permissions/?tab=ui#logs_read_data
[19]: /fr/logs/archives/?tab=awss3#format-of-the-archives
[20]: /fr/help/
[21]: https://www.datadoghq.com/blog/sensitive-data-scanner/