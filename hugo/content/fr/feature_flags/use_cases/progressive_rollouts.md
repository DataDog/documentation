---
description: Déployez progressivement les feature flags selon un planning avec des
  métriques de garde-fou optionnelles pour les déploiements canaris.
title: Déploiements progressifs et canaries
---
[**Les déploiements progressifs**](#progressive-rollouts) introduisent progressivement de nouvelles fonctionnalités en incrémentant le pourcentage de sujets exposés à la fonctionnalité au fil du temps. [**Les Canaries**](#canaries) sont des déploiements progressifs qui surveillent des métriques de garde-fou et se mettent automatiquement en pause ou s'arrêtent lorsqu'ils détectent des régressions.

## Déploiements progressifs {#progressive-rollouts}

### Configurer un déploiement progressif {#configure-a-progressive-rollout}

1. Accédez à votre feature flag et ouvrez **Targeting Rules & Rollouts** pour l'environnement cible.
2. Cliquez sur **Add Targeting Rule** et sélectionnez **Add Rollout Steps** pour créer un déploiement en plusieurs étapes.
3. Configurez les étapes de déploiement :
   - Personnalisez le pourcentage pour chaque étape et ajoutez ou supprimez des étapes selon vos besoins.
   - Modifiez le délai entre les étapes pour un déploiement plus lent ou plus rapide.
   - Cliquez sur **Split Traffic** pour déployer plusieurs variantes en même temps.

{{< img src="feature_flags/create-progressive-rollout.png" alt="Configuration de déploiement progressif en plusieurs étapes." style="width:100%;" >}}

### Démarrez et contrôlez le déploiement {#start-and-control-the-rollout}

1. **Activez** le feature flag dans l'environnement afin que les SDKs évaluent vos règles de ciblage.
2. Cliquez sur **Start Rollout** pour lancer le déploiement progressif.

{{< img src="feature_flags/start-progressive-rollout.png" alt="Affichage de déploiement progressif en plusieurs étapes." style="width:100%;" >}}

Pour démarrer le déploiement automatiquement à une date et une heure ultérieures au lieu de cliquer sur **Start Rollout**, choisissez [Schedule a start time](/feature_flags/concepts/scheduled_rollouts/) lors de la configuration de la règle.

Une fois le déploiement démarré :

- Cliquez sur **Pause Rollout** pour arrêter temporairement la progression.
- Cliquez sur **Stop Rollout** pour annuler toute progression du déploiement.

Surveillez la progression avec le suivi de l'évaluation et configurez des notifications pour les événements de déploiement.

## Canaries {#canaries}

Un canary est un déploiement progressif qui inclut des **métriques de garde-fou**. Les métriques de garde-fou mesurent les indicateurs clés de performance (KPI), tels que le taux d'erreur, la latence et le nombre de tâches longues.

### Fonctionnement des canaries {#how-canaries-work}

Lorsque les métriques de garde-fou sont configurées, le déploiement surveille les métriques dans les deux groupes :

- **Treatment** : Sujets recevant la variante que vous déployez
- **Control** : Sujets ne recevant pas la variante de traitement

Lorsque le déploiement canary détecte un changement défavorable statistiquement significatif dans une métrique de garde-fou, il **met en pause** ou **arrête** automatiquement le déploiement.

### Utilisez les métriques de garde-fou APM{#use-apm-guardrail-metrics}

<div class="alert alert-info">Les métriques de garde-fou APM pour les déploiements canary sont en préversion. Contactez votre représentant Datadog pour demander l'accès.</div>

Les métriques de garde-fou APM utilisent des spans conservés pour comparer les performances des applications entre les groupes de contrôle et de traitement. Vous pouvez surveiller :

- Durée moyenne des spans
- Taux d'erreur
- Durée des spans P90
- Moyenne d'un attribut de span numérique

[L'enrichissement des traces APM][1] est requis avant d'ajouter une métrique APM à un déploiement canary. L'enrichissement enregistre l'allocation du feature flag, la variante et le sujet sur chaque trace afin que le déploiement canary puisse associer les données APM au groupe correct.

Une fois l'enrichissement activé :

1. Vérifiez que l'application évalue le feature flag lors des requêtes tracées.
2. Dans Trace Explorer, confirmez que les spans racines contiennent l'attribut `@feature_flags.<flag_key>` décodé.
3. Créez une métrique APM avec une requête de span qui correspond aux requêtes que vous souhaitez surveiller.
4. Sélectionnez la métrique APM comme garde-fou lors de la configuration du canary.

L'analyse canary utilise l'échantillon conservé des traces correspondantes. Si le volume de traces conservées est faible, le déploiement canary attend d'avoir suffisamment de sujets et d'événements échantillonnés pour prendre une décision. Pour augmenter l'échantillon aléatoire conservé, configurez une rétention temporaire des traces pour le déploiement canary. La rétention temporaire ne récupère pas les traces abandonnées avant qu'elles n'atteignent Datadog.

{{< img src="feature_flags/apm_canaries/apm-metric-create-flow-1.png" alt="Flux de création de métrique avec des spans APM sélectionnés et des types de métriques de garde-fou APM pris en charge, y compris la durée de span P90." style="width:90%;" >}}

{{< img src="feature_flags/apm_canaries/apm-metric-create-flow-2.png" alt="Flux de création de métrique APM avec une requête de span APM et un aperçu des spans correspondants." style="width:90%;" >}}

### Configurez un déploiement canary {#configure-a-canary-rollout}

1. Créez une règle de ciblage de déploiement progressif comme décrit dans la section [Configurer un déploiement progressif](#configure-a-progressive-rollout).
2. Ajoutez des métriques de garde-fou à la configuration du déploiement.
3. Pour un garde-fou APM, configurez une rétention temporaire des traces si vous souhaitez augmenter l'échantillon conservé.
4. Choisissez si les échecs de garde-fou doivent mettre en pause ou arrêter le déploiement.

{{< img src="feature_flags/canary-rollout-config.png" alt="Configuration de déploiement canary montrant les étapes de déploiement avec des métriques de garde-fou et une variante de contrôle." style="width:90%;" >}}

{{< img src="feature_flags/apm_canaries/apm-canary-metric-monitored-with-retention.png" alt="Configuration de déploiement canary avec un garde-fou sur la durée de span P90, une action d'abandon, une rétention temporaire des traces APM et une variante de contrôle." style="width:90%;" >}}

## Bonnes pratiques {#best-practices}

- Configurez des notifications sur le feature flag pour être alerté lorsque le déploiement démarre, se met en pause ou s'arrête.
- Configurez les notifications de déploiement canary avant de démarrer le déploiement. Les notifications vous alertent lorsqu'une métrique de garde-fou suspend ou arrête le déploiement.
- Utilisez le suivi d'évaluation pour surveiller combien de sujets reçoivent chaque variante au fur et à mesure que le déploiement progresse.
- Pour les garde-fous APM, confirmez que l'échantillon conservé contient suffisamment de sujets et d'événements échantillonnés avant d'augmenter l'exposition du déploiement.

[1]: /fr/feature_flags/guide/apm_trace_enrichment/