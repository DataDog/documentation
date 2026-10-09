---
aliases:
- /fr/observability_pipelines/performance/
- /fr/observability_pipelines/scaling_and_performance/handling_load_and_backpressure/
description: Découvrez comment Observability Pipelines utilise la mise en tampon et
  la contre-pression pour gérer les pannes de destination, et comment configurer les
  paramètres de tampon de destination.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines#set-up-a-pipeline
  tag: Documentation
  text: Configurez un pipeline
- link: observability_pipelines/sources
  tag: Documentation
  text: Sources
- link: observability_pipelines/processors
  tag: Documentation
  text: Processeurs
- link: observability_pipelines/destinations
  tag: Documentation
  text: Destinations
- link: https://www.datadoghq.com/architecture/observability-pipelines-a-guide-to-sizing-scaling-and-performance/
  tag: Architecture Center
  text: 'Observability Pipelines : un guide de dimensionnement, de mise à l''échelle
    et de performance'
title: Mise en tampon et contre-pression
---
## Présentation {#overview}

Les Observability Pipelines sont conçus pour la durabilité et pour atténuer l'impact lorsque les destinations sont indisponibles. Si une destination est indisponible (par exemple, en raison de problèmes de connexion), l'Observability Pipelines Worker retente sa connexion à cette destination jusqu'à ce que la connexion soit rétablie ou que la destination atteigne le délai d'expiration. Pendant ce temps, les événements s'accumulent dans les tampons internes des composants du pipeline, empêchant finalement la source d'ingérer de nouveaux événements. Ce comportement est appelé **contre-pression**.

Il est important de considérer comment la contre-pression se propage à travers votre architecture en cas de panne de destination. Par exemple, la contre-pression peut empêcher votre application d'envoyer des logs à Observability Pipelines et ces logs peuvent entrer en concurrence pour les ressources mémoire ou disque nécessaires à votre service. Pour éviter que la contre-pression n'atteigne votre application, [configurez un tampon de destination](#choosing-buffer-types) et dimensionnez-le en fonction du débit de votre pipeline, ce qui aide le Worker à absorber la contre-pression lorsque la destination est indisponible. Vous pouvez également configurer le [comportement du tampon plein](#choosing-buffer-on-full-behavior) sur `drop newest`, ce qui empêche la contre-pression en supprimant les événements entrants lorsque le tampon est plein. Consultez la [section sur les tampons de destination](#destination-buffers) pour plus d'informations sur les tampons de destination configurables.

Tous les composants de l'Observability Pipelines Worker disposent d'un tampon en mémoire pour faciliter le transfert des événements entre les composants. Toutes les sources disposent d'un tampon d'une capacité de 1 000 événements par thread de travail. Les sources écrivent les événements dans leur tampon aval respectif lors de l'ingestion. Tous les processeurs disposent d'un tampon en mémoire d'une capacité de 100 événements, que les processeurs consomment en amont. Les tampons des sources et des processeurs ne sont pas configurables.

## Tampons de destination {#destination-buffers}

Par défaut, les destinations disposent d'un tampon en mémoire d'une capacité de 500 événements. Ce tampon est configurable, vous permettant de contrôler ces paramètres :

- **Type de tampon** : Soit un tampon en mémoire, soit un tampon sur disque
- **Taille du tampon** : La capacité maximale en octets du tampon
- **Comportement du tampon lorsqu'il est plein** : Détermine le comportement de dépassement de capacité du tampon, soit bloquer les événements et propager la contre-pression, soit supprimer les événements entrants pour empêcher la propagation de la contre-pression.

Pour chacun de ces paramètres, choisissez l'option qui correspond le mieux à votre stratégie de journalisation.

### Choisir les types de tampon {#choosing-buffer-types}

**Les tampons en mémoire** privilégient le débit à la durabilité. Ils peuvent gérer une bande passante importante, mais les tampons en mémoire ne persistent pas entre les redémarrages du Worker.

Utilisez un tampon en mémoire si vous souhaitez empêcher la propagation de la contre-pression et si la perte de tous les logs dans le tampon lors d'un redémarrage est acceptable.

**Les tampons sur disque** privilégient la durabilité au débit. Les tampons sur disque écrivent d'abord dans le cache de page, puis vident les données sur le disque si la destination ne les envoie pas immédiatement. Les tampons sur disque attendent au maximum 500 ms avant d'appeler fsync et de vider un fichier de données sur le disque. Un tampon sur disque se vide plus fréquemment si un fichier de données atteint sa taille maximale de 128 Mo avant que les 500 ms ne se soient écoulées depuis le dernier vidage. Les tampons sur disque sont ordonnés, ce qui signifie que les événements sont envoyés en aval dans l'ordre où ils ont été écrits dans le tampon (premier entré, premier sorti).

Utilisez un tampon sur disque si vous devez limiter la perte de données et si le débit de votre pipeline n'est probablement pas limité par les E/S lors du vidage sur disque.

### Choisir le comportement du tampon lorsqu'il est plein {#choosing-buffer-on-full-behavior}

**Bloquer** (par défaut) : Si le tampon est plein, les événements entrants sont empêchés d'être écrits dans le tampon. Utilisez cette option si vous souhaitez vous assurer qu'aucun événement n'est perdu.

**Supprimer les plus récents** : Si le tampon est plein, les événements entrants sont supprimés. Cela permet à la source de continuer à ingérer des événements et empêche la contre-pression de se propager jusqu'à votre application. Consultez [Utilisation de tampons avec plusieurs destinations](#using-buffers-with-multiple-destinations) pour plus de détails sur le fonctionnement lorsque vous avez plusieurs destinations.

Ce tableau compare les différences entre le tampon en mémoire et le tampon sur disque.

| Propriété | Mémoire tampon | Tampon disque |
| -------------------------------------------------------- | ------------------------- | ------------------------------------ |
| Taille par défaut | Configurable<br>Taille de tampon minimale : 1 Mo<br>Taille de tampon maximale : 128 Go | Configurable<br>Taille de tampon minimale : 256 Mo<br> Taille de tampon maximale : 5 To<br>**Remarque** : Pour les versions de Worker antérieures à 2.20.x, la taille de tampon maximale est de 500 Go.       |
| Performances | Plus élevées | Plus faibles |
| Durabilité en cas de redémarrage ou de plantage inattendu du Worker | Aucune | Événements vidés sur le disque au plus tard toutes les 500 ms |
| Perte de données due à un redémarrage ou un plantage inattendu | Toutes les données mises en tampon sont perdues | Toutes les données mises en tampon sont conservées |
| Perte de données lors d'un arrêt normal | Toutes les données mises en tampon sont perdues | Aucune, toutes les données dans le pipeline sont vidées sur le disque avant la fermeture |

### Utilisation de tampons avec plusieurs destinations {#using-buffers-with-multiple-destinations}

Une fois que vos événements ont été traités par vos processeurs, ils sont envoyés en fanout vers toutes les destinations de votre pipeline. Si la contre-pression se propage au fanout depuis n'importe quelle destination, **toutes** les destinations sont bloquées. Aucun événement supplémentaire n'est envoyé par une destination tant que la destination bloquée ne reprend pas l'envoi d'événements avec succès.

Le comportement `drop_newest` on-full supprime les événements entrants lorsque le tampon d'une destination est plein. Cela empêche la contre-pression de se propager à la distribution depuis cette destination, permettant à vos autres destinations de continuer à ingérer les événements provenant de la distribution. Cela peut être utile si vous souhaitez garantir que les événements sont livrés de manière fiable à une destination, mais que vous acceptez qu'une autre destination supprime des événements si elle devient indisponible afin d'éviter la propagation de la contre-pression.

### Volumes persistants Kubernetes {#kubernetes-persistent-volumes}

Si vous activez la mise en tampon sur disque pour les destinations, vous devez activer les [volumes persistants][1] Kubernetes dans le chart Helm Observability Pipelines. Avec la mise en tampon sur disque activée, les événements sont d'abord envoyés vers le tampon et écrits sur les volumes persistants, puis envoyés en aval.

## Métriques de tampon {#buffer-metrics}

Utilisez ces métriques pour analyser les performances du tampon. Toutes les métriques sont émises à un intervalle d'une seconde, sauf indication contraire.

{{< tabs >}}
{{% tab "Sources" %}}

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "Processeurs" %}}

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "Destinations" %}}

{{% observability_pipelines/metrics/buffer/destinations %}}

{{% /tab %}}
{{< /tabs >}}

### Métriques de tampon obsolètes {#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/storage/persistent-volumes/