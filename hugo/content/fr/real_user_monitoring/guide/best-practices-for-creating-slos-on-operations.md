---
description: Apprenez à créer des SLO de disponibilité et de latence à partir de métriques
  d'opérations RUM.
further_reading:
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: Documentation
  text: Découvrez la surveillance des opérations
- link: /service_level_objectives/metric/
  tag: Documentation
  text: Créer des SLO basés sur des métriques
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: Guide
  text: Meilleures pratiques pour configurer les opérations RUM
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: Blog
  text: Surveillez les performances des étapes critiques des parcours utilisateur
    avec des opérations RUM
- link: https://www.datadoghq.com/blog/rum-synthetic-slos-slis/
  tag: Blog
  text: Créez de meilleurs SLO avec des SLI RUM et synthétiques
title: Bonnes pratiques pour la création de SLO pour les opérations RUM
---
## Présentation {#overview}

Les [opérations RUM][1] mesurent la disponibilité et la latence des étapes techniques d'un [parcours utilisateur][2]. Par exemple, une opération peut suivre si une demande de paiement réussit et combien de temps elle met à aboutir.

Utilisez deux métriques d'opération pour créer des [SLO basés sur des métriques][3] :

- Utilisez `rum.measure.operation` pour créer un **SLO de disponibilité** basé sur le taux de réussite de l'opération.
- Utilisez `rum.measure.operation.duration` pour créer un **SLO de latence** basé sur le temps d'exécution de l'opération.

Les deux métriques incluent les tags `operation.name`, `operation.status`, `operation.failure_reason` et `application.id`, que vous utilisez pour définir les requêtes de SLO.

Créez des SLO de disponibilité et de latence distincts pour mesurer ces aspects différents de la santé des opérations.

## Prérequis {#prerequisites}

- [RUM without Limits][4] est activé pour votre organisation.
- Vous avez [configuré au moins une opération RUM][5].

## Comprendre les résultats des opérations {#understand-operation-outcomes}

La façon dont vous gérez chaque résultat d'opération dépend de ce que le SLO mesure :

| Résultat                | SLO de disponibilité | SLO de latence                                      |
|------------------------|------------------|--------------------------------------------------|
| Succès                | Événement favorable       | Favorable si inférieur ou égal au seuil ; indésirable au-dessus     |
| Erreur ou autre échec | Événement indésirable        | Exclu                                         |
| Abandon            | Exclu         | Indésirable au-dessus du seuil ; sinon exclu      |
| Délai d'attente                | Événement indésirable        | Exclu                                         |

**Les SLO de disponibilité excluent les abandons** car un utilisateur qui part avant la fin d'une opération n'a pas nécessairement subi une défaillance technique. **Les SLO de latence incluent les abandons** uniquement lorsque leur durée dépasse le seuil. Ce traitement empêche également un abandon d'être comptabilisé dans les deux SLO.

**Les SLO de disponibilité incluent les délais d'attente** comme événements indésirables afin de les traiter comme les autres échecs d'opération et d'éviter de masquer des problèmes potentiels dans les chemins qui n'enregistrent pas la fin d'une opération. **Les SLO de latence excluent les délais d'attente** car RUM enregistre le début de l'opération mais pas sa fin, de sorte que la durée ne mesure pas de manière fiable les performances de l'application.

## Naviguer vers la création de SLO {#navigate-to-slo-creation}

Vous pouvez ouvrir le workflow de création de SLO depuis RUM ou depuis la page SLO.

### Naviguer depuis RUM {#navigate-from-rum}

Démarrer depuis le rapport d'opération est plus pratique car Datadog utilise l'opération sélectionnée pour initialiser la requête SLO. Démarrer depuis la page SLO vous oblige à construire la requête d'opération à partir de zéro.

1. Allez dans **RUM > Performance Monitoring > Operations**.
2. Sélectionnez une opération dans le catalogue.
3. Dans la section {{< ui >}}SLOs{{< /ui >}} en haut du rapport d'opération, cliquez sur {{< ui >}}Create{{< /ui >}}.
4. Sélectionnez le type de SLO à créer.

### Naviguer depuis la page SLO {#navigate-from-the-slo-page}

1. Dans la navigation de gauche, sélectionnez **Monitoring > SLOs**.
2. Cliquez sur {{< ui >}}\+ New SLO{{< /ui >}}, puis sélectionnez {{< ui >}}By Count{{< /ui >}}.

Une fois le workflow de création de SLO ouvert, [configurez la requête SLO](#configure-the-slo-query) pour un SLO de disponibilité ou de latence.

## Configurer la requête de SLO {#configure-the-slo-query}

Choisissez la requête qui correspond au type de SLO que vous souhaitez créer. Remplacez `<OPERATION_NAME>` par le nom de l'opération et `<APPLICATION_ID>` par l'ID de l'application RUM.

### SLO de disponibilité {#availability-slo}

Un SLO de disponibilité mesure si l'opération se termine avec succès :

- **Les événements favorables** incluent les opérations réussies.
- **Les événements indésirables** incluent les opérations ayant échoué, autres que les abandons.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-availability-slo-example.png" alt="Page de création de SLO montrant un SLO de disponibilité basé sur le nombre avec des requêtes d'événements favorables et indésirables et des graphiques de prévisualisation" style="width:100%;" >}}

Utilisez cette requête brute pour les événements favorables :

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

Utilisez cette requête brute pour les événements indésirables :

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND NOT operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

Le SLO calcule la disponibilité selon `successful operations / (successful operations + non-abandoned failures)`.

### SLO de latence {#latency-slo}

Un SLO de latence mesure si l'opération se termine dans une durée acceptable. Choisissez un seuil basé sur l'expérience utilisateur attendue et la durée observée de l'opération. Par exemple, si les utilisateurs s'attendent à ce qu'une soumission de paiement se termine en trois secondes, utilisez un seuil de trois secondes.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-latency-slo-example.png" alt="Page de création de SLO montrant un SLO de latence basé sur le nombre avec des requêtes d'événements favorables et indésirables et des graphiques de prévisualisation" style="width:100%;" >}}

La métrique `rum.measure.operation.duration` utilise des nanosecondes. Multipliez les secondes par `1,000,000,000` pour convertir le seuil en nanosecondes. Par exemple, trois secondes équivalent à `3,000,000,000` nanosecondes.

Remplacez `<LATENCY_THRESHOLD_NS>` par le seuil en nanosecondes, puis configurez les événements suivants :

- **Les événements favorables** incluent les opérations réussies dont la durée est inférieure ou égale au seuil.
- **Les événements indésirables** incluent les opérations réussies et abandonnées dont la durée dépasse le seuil.

Utilisez cette requête brute pour les événements favorables :

{{< code-block lang="text" >}}
count(v: v<=<LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

Définissez les événements indésirables comme la somme de ces deux requêtes brutes :

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

Le SLO calcule la latence selon `fast successful operations / (all successful operations + slow abandoned operations)`.

### Finalisez le SLO {#complete-the-slo}

Après avoir configuré la requête de disponibilité ou de latence :

1. Commencez avec un objectif de 99 % sur une fenêtre glissante de 30 jours pour un parcours utilisateur critique. Ajustez l'objectif en fonction des exigences de fiabilité du parcours et des performances historiques.
2. Appliquez le même périmètre, les mêmes filtres et les mêmes groupes à chaque requête.
3. Ajoutez un nom descriptif et, éventuellement, des tags.
4. Enregistrez le SLO.

## Validez les SLO {#validate-the-slos}

Validez les SLO après les avoir créés :

1. Vérifiez que les requêtes d'événements favorables et indésirables ne se chevauchent pas.
2. Vérifiez que toutes les requêtes utilisent le même périmètre d'opération, les mêmes filtres et les mêmes groupes.
3. Comparez le nombre d'événements SLO avec le volume d'opérations sur la page {{< ui >}}Operations{{< /ui >}}.
4. Examinez les [opérations ayant expiré][6] (voir la remarque sous **Parallélisation**). Un taux d'expiration élevé peut indiquer que certains chemins d'application démarrent une opération sans enregistrer sa fin.
5. Confirmez que le seuil de latence utilise des nanosecondes et représente un temps d'exécution acceptable pour l'opération.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /fr/journey_monitoring/
[3]: /fr/service_level_objectives/metric/
[4]: /fr/real_user_monitoring/rum_without_limits/
[5]: /fr/real_user_monitoring/guide/best-practices-for-operations-setup/
[6]: /fr/real_user_monitoring/operations_monitoring/?tab=browser#parallelization