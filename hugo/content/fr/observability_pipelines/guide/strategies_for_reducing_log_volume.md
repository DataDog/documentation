---
description: Apprenez des stratégies, telles que l'échantillonnage et le filtrage
  des logs, pour réduire le volume de logs avec les processeurs Observability Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: Documentation
  text: Configurez un pipeline
- link: /observability_pipelines/processors/
  tag: Documentation
  text: Processeurs d'Observability Pipelines
title: Stratégies pour réduire le volume de logs
---
## Présentation {#overview}

Observability Pipelines vous permet de collecter et de traiter des logs, ainsi que de déterminer où vous souhaitez les acheminer, le tout avant que les données ne quittent votre environnement sur site ou cloud.

Les logs n'ont pas tous la même valeur. Par exemple, les logs d'erreurs sont souvent plus utiles que les logs d'informations lors du dépannage des opérations en direct. Les logs provenant d'environnements de production sont également plus importants que les logs provenant d'environnements hors production. Par conséquent, acheminer tous vos logs vers une solution indexée peut diluer la valeur globale de vos données et vous amener à dépasser votre budget.

Les situations suivantes peuvent également augmenter inutilement votre volume de logs et vos coûts :

- Une équipe d'application active par inadvertance la journalisation de débogage.
- Vous déployez une nouvelle version avec une condition de boucle d'erreur qui déclenche un déluge d'erreurs.
- Les équipes tentent d'ajouter autant de données de performance et de métriques que possible dans les logs, car cela semble plus facile que de mettre en œuvre d'autres solutions de télémétrie.
- Les logs contiennent des champs et des valeurs supplémentaires qui ne sont jamais utilisés.

Ce guide vous présente des stratégies pour réduire votre volume de logs à l'aide des processeurs d'Observability Pipelines, afin que vous puissiez respecter votre budget et augmenter la valeur de vos données stockées.

## Stratégies pour réduire votre volume de logs {#strategies-for-reducing-your-log-volume}

Suivez ces stratégies pour réduire votre volume de logs :

### Échantillonnez vos logs {#sample-your-logs}

Réduisez votre volume global de logs en supprimant un pourcentage de logs à haut volume dont vous savez qu'ils sont répétitifs, bruyants ou moins précieux. Utilisez le [processeur d'échantillonnage][1] pour faire correspondre un sous-ensemble de logs basé sur la requête de filtre et ne conserver que le pourcentage de logs que vous avez spécifié. Cela vous fournit une vue représentative des flux de logs à haut volume, tout en maintenant la visibilité et la capacité d'analyse.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="Un processeur d'échantillonnage qui conserve 50 % des logs correspondant à la requête de filtre pour http.status_code:200 et http.method:GET" style="width:100%;" >}}

### Filtrez vos logs {#filter-your-logs}

Tous les logs ne sont pas utiles et n'ont pas besoin d'être stockés. Par exemple, conserver les logs de débogage provenant de systèmes hors production n'est probablement pas critique pour votre organisation. Par conséquent, utilisez le [processeur de filtrage][2] pour supprimer ces logs, afin qu'ils ne soient pas envoyés à vos solutions de gestion des logs.

### Supprimez des attributs de vos logs {#drop-attributes-in-your-logs}

Les logs peuvent contenir des centaines d'attributs, et souvent seul un petit nombre d'attributs est utilisé pour l'investigation et l'analyse. Utilisez le [processeur d'édition de champs][3] pour réduire la taille globale de vos logs en supprimant les attributs inutilisés ou inutiles, ce qui réduit vos coûts d'ingestion de logs.

### Réduisez vos logs {#reduce-your-logs}

Les systèmes peuvent émettre des centaines, voire des milliers, de logs par seconde. Réduisez ces logs en un seul événement en fusionnant les champs à l'aide de différentes stratégies, telles que la concaténation, la sommation, la création d'un tableau de valeurs, et plus encore. Utilisez le [processeur de réduction][4] pour réduire plusieurs événements de log en un seul, en fonction de la stratégie de fusion sélectionnée. Cela réduit le nombre total d'événements envoyés vers votre destination.

### Dédupliquez vos logs {#deduplicate-your-logs}

La déduplication de vos logs peut aider à maintenir l'exactitude et la cohérence de vos données et à vous protéger contre les erreurs en amont qui dupliquent accidentellement vos logs. Utilisez le [processeur de déduplication][5] pour comparer les champs, vérifier s'il existe un contenu identique, puis supprimer les doublons, réduisant ainsi votre volume total de logs.

### Mettez en œuvre des quotas {#implement-quotas}

Gérez et contrôlez vos logs à différents niveaux en utilisant des quotas. Par exemple, à un niveau granulaire, vous pouvez appliquer une limite de quota à des logs d'application spécifiques (`app:xyz`) ou, à un niveau supérieur, appliquer une limite aux logs d'information (`status:info`). Cela peut vous aider à respecter les exigences budgétaires et d'utilisation.

Utilisez le [processeur de quota][6] pour :
1. Définissez un filtre pour les logs qui vous intéressent. Cela permet de filtrer les logs à un niveau élevé, comme pour un environnement, ou à un niveau plus granulaire, comme pour une équipe spécifique. Vous pouvez également filtrer en utilisant une combinaison d'attributs de logs.
1. Définissez un quota basé sur le nombre d'octets ou d'événements. Vous pouvez choisir d'ignorer les logs reçus une fois le quota atteint, ou simplement d'être alerté que la limite a été atteinte afin de pouvoir enquêter et remédier à la situation.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="Un processeur de quota avec une requête de filtre pour http.status_code:200 et une limite fixée à 1 To par jour" style="width:100%;" >}}

### Acheminez vos logs directement vers une archive {#route-your-logs-directly-to-an-archive}

Acheminez les logs directement vers votre propre stockage cloud (Amazon S3, Google Cloud Storage ou Azure Storage) dans un format réhydratable par Datadog. Vous pouvez ensuite réhydrater l'archive dans Datadog selon vos besoins. Consultez [Archive Logs][7] pour plus d'informations.

## Candidats idéaux pour les stratégies de réduction du volume de logs {#strong-candidates-for-log-volume-reduction-strategies}

Les utilisateurs ont mis en œuvre les stratégies ci-dessus pour réduire leurs volumes globaux de logs. La liste suivante est un exemple de sources de logs qui sont des candidats idéaux pour l'utilisation de stratégies de réduction de logs :

- CDN
- VPC et flux réseau
- Activité du serveur web
- Équilibreurs de charge
- Services CI/CD
- Plans de contrôle
- Maillage de services
- Pare-feux
- Appareils réseau
- DNS
- Logs de débogage
- Logs d'audit
- Logs d'environnement hors production

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/processors/sample
[2]: /fr/observability_pipelines/processors/filter
[3]: /fr/observability_pipelines/processors/edit_fields
[4]: /fr/observability_pipelines/processors/reduce
[5]: /fr/observability_pipelines/processors/dedupe
[6]: /fr/observability_pipelines/processors/quota
[7]: /fr/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs