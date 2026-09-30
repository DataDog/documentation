---
description: Conservez uniquement les données RUM dont vous avez besoin tout en maintenant
  une visibilité complète sur les indicateurs de performance de vos applications.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentation
  text: Conservez les données avec des filtres de rétention
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guide
  text: Meilleures pratiques pour les filtres de rétention
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentation
  text: Analysez la performance avec des indicateurs de performance
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentation
  text: Contrôlez les coûts grâce aux quotas de rétention
- link: https://www.datadoghq.com/blog/rum-without-limits/
  tag: Blog
  text: 'Présentation de RUM sans limites™ : Capturez tout, conservez ce qui est important'
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centre d'apprentissage
  text: 'Laboratoire interactif : Filtres de rétention RUM'
title: RUM sans limites
---
<div class="alert alert-info">RUM sans limites est automatiquement activé pour les clients ayant des plans RUM non engagés. Contactez votre équipe de compte ou <a href="/help/">le support Datadog</a> pour activer cette fonctionnalité.</div>

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="Détails des indicateurs d'utilisation estimés dans le panneau latéral" style="width:90%" >}}

## Aperçu {#overview}

RUM sans limites vous offre une flexibilité sur le volume de vos sessions RUM en découplant l'ingestion des données de session de l'indexation. Cela vous permet de :

- Définir dynamiquement des filtres de rétention depuis l'interface utilisateur de Datadog sans décisions d'échantillonnage préalables ni modifications de code
- Conserver les sessions avec des erreurs ou des problèmes de performance et rejeter celles moins significatives, comme celles avec peu d'interactions utilisateur

Même si vous ne conservez qu'une fraction de vos sessions, Datadog fournit des [indicateurs de performance][1] pour toutes les sessions ingérées. Cela garantit une vue d'ensemble précise et à long terme de la santé et de la performance de l'application, même si seule une fraction des données de session est conservée.

**Remarque** : En mode RUM sans limites, vous ne pouvez utiliser que des filtres par défaut sur la [page de résumé de la surveillance de la performance][7]. Cela vous permet de voir l'ensemble du jeu de données et empêche les indicateurs de performance biaisés puisque les données sont échantillonnées et qu'il y a moins de balises disponibles que dans les attributs d'événements.

Cette page identifie les composants clés de RUM sans limites qui peuvent vous aider à gérer le volume de vos sessions RUM dans le cadre de votre budget d'observabilité.

### Pour les nouvelles applications {#for-new-applications}

Pour commencer avec RUM sans limites pour les nouvelles applications, à l'étape [instrumentation][2] :

1. Assurez-vous que le `sessionSampleRate` est réglé à 100 %. Datadog recommande de le régler à ce taux pour une visibilité optimale et une précision des métriques.

2. Choisissez un `sessionReplaySampleRate` qui répond à vos besoins d'observabilité.

3. Pour les applications avec l'[intégration APM activée][3], configurez le pourcentage de sessions pour lesquelles vous souhaitez vous assurer que les traces APM backend sont ingérées avec `traceSampleRate` (navigateur), `traceSampler` (Android) ou `sampleRate` (iOS).

4. Activez `traceContextInjection: sampled` pour permettre aux SDK backend de prendre leurs propres décisions d'échantillonnage pour les sessions où le SDK RUM décide de ne pas conserver la trace.

   <div class="alert alert-danger">Les étapes 1, 3 et 4 peuvent avoir un impact sur l'ingestion de vos traces APM. Pour garantir que les volumes de spans ingérés restent stables, configurez le <code>traceSampleRate</code> au précédent configuré <code>sessionSampleRate</code>. Par exemple, si vous aviez <code>sessionSampleRate</code> réglé à 10 % et que vous le portez à 100 % pour RUM sans limites, réduisez le <code>traceSampleRate</code> de 100 % à 10 % en conséquence pour ingérer le même nombre de traces.</div>

5. Déployez votre application pour appliquer la configuration.

### Pour les applications existantes {#for-existing-applications}
Les utilisateurs de RUM existants doivent redéployer les applications pour utiliser pleinement RUM sans limites. Assurez-vous que votre taux d'échantillonnage de sessions est de 100 % pour toutes les applications.

#### Étape 1 : Ajustez les taux d'échantillonnage {#step-1-adjust-sampling-rates}
Si vous collectez déjà des replays, augmenter le taux d'échantillonnage des sessions nécessite de réduire le taux d'échantillonnage des replays pour collecter le même nombre de replays (voir exemple ci-dessous). Le taux d'échantillonnage de la relecture est basé sur le taux d'échantillonnage de la session existante.

Avant :

```java
   sessionSampleRate: 20,
   sessionReplaySampleRate: 10,
```

Après :

```java
   sessionSampleRate: 100,
   sessionReplaySampleRate: 2,
```

1. Naviguez vers [**Digital Experiences > Real User Monitoring > Manage Applications**][4].
1. Cliquez sur l'application que vous souhaitez migrer.
1. Cliquez sur l'onglet **SDK Configuration**.
1. Assurez-vous que `sessionSampleRate` est réglé sur 100 %.
1. Réglez `sessionReplaySampleRate` sur un taux qui donne le même nombre de replays avant d'augmenter le taux d'échantillonnage de la session.
1. Utilisez le code généré pour mettre à jour votre code source et redéployez vos applications pour vous assurer que la nouvelle configuration est appliquée.

#### Étape 2 : Ajustez le traçage {#step-2-adjust-tracing}

Si vous avez augmenté `sessionSampleRate`, vous pourriez augmenter le nombre de spans APM ingérés puisque le SDK RUM a la capacité de remplacer les décisions d'échantillonnage des traces backend pour établir la corrélation.

Pour atténuer cela, réglez `traceSampleRate` sur un pourcentage inférieur à 100 % (par rapport au `sessionSampleRate` précédemment défini) et réglez `traceContextInjection: sampled` pour permettre aux SDK backend de prendre leurs propres décisions d'échantillonnage pour les sessions où le SDK RUM décide de ne pas conserver la trace.

#### Étape 3 : Créez des filtres de rétention {#step-3-create-retention-filters}

Sur les applications mobiles, de nombreuses versions concurrentes peuvent coexister. Cependant, les versions existantes n'envoient pas nécessairement 100 % des sessions, ce qui signifie que la création de nouveaux filtres de rétention réduit les données disponibles dans Datadog pour ces versions d'application.

Datadog recommande de créer les mêmes filtres de rétention pour toutes les versions d'application, indépendamment de la configuration du taux d'échantillonnage du SDK, qu'il soit réglé sur 100 % ou non. En fin de compte, toutes les sessions précieuses sont toujours collectées même si certaines sessions ne sont pas ingérées pour certaines versions plus anciennes.

Voir les filtres de rétention suggérés et les cas d'utilisation dans [Meilleures pratiques pour les filtres de rétention][5].

## Prochaines étapes {#next-steps}

Créez et configurez [filtres de rétention][6].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/rum_without_limits/metrics
[2]: /fr/real_user_monitoring/application_monitoring/browser/setup/
[3]: /fr/real_user_monitoring/platform/connect_rum_and_traces/
[4]: https://app.datadoghq.com/rum/list
[5]: /fr/real_user_monitoring/guide/retention_filter_best_practices/
[6]: /fr/real_user_monitoring/rum_without_limits/retention_filters
[7]: https://app.datadoghq.com/rum/performance-monitoring