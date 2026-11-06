---
description: Apprenez à limiter le nombre de sessions RUM conservées par jour grâce
  aux quotas de rétention.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentation
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentation
  text: Conserver les données avec des retention filter (filtre de rétention)
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentation
  text: Analysez les performances avec des métriques
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guide
  text: Bonnes pratiques pour les retention filter (filtre de rétention)
title: Contrôlez les coûts avec des quotas de rétention
---
## Présentation {#overview}

Les quotas de rétention vous permettent de limiter le nombre de sessions conservées par jour pour l'ensemble de vos retention filter (filtre de rétention).

Cela vous permet de mieux contrôler vos coûts et d'éviter les pics de facturation imprévus causés par des augmentations soudaines du trafic ou des filtres mal configurés.

## Fonctionnement des quotas {#how-quotas-work}

Vous définissez un quota quotidien comme un nombre maximal de sessions conservées. Une fois le quota atteint, vous pouvez choisir l'un des deux comportements suivants :

- {{< ui >}}Stop retention{{< /ui >}} : Datadog ne conserve aucune session supplémentaire pour le reste de la journée et rejette toutes les sessions entrantes jusqu'à la réinitialisation du quota.
- {{< ui >}}Slow down retention{{< /ui >}} : La rétention se poursuit, mais à un taux plus lent. Datadog ne conserve que 10 % des sessions qui seraient normalement conservées.

## Configuration {#setup}

Pour configurer un quota de rétention pour une application :

1. Dans Datadog, accédez à {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}.
2. Sélectionnez votre application.
3. Allez dans {{< ui >}}Product Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}.
4. Définissez un seuil de quota quotidien, une heure de réinitialisation et un comportement à adopter une fois le quota atteint.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-configuration.png" alt="Le panneau de configuration des quotas de rétention affiche le seuil de quota quotidien, l'heure de réinitialisation et les options de comportement." style="width:65%" >}}

<div class="alert alert-info">Les quotas ne s'appliquent pas aux sessions conservées par les <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">retention filter (filtre de rétention) permanente</a>.</div>

La configuration s'effectue au niveau de l'application, ce qui signifie que vous pouvez appliquer des stratégies de rétention différentes par application. Toute modification de configuration (limite de quota, comportement de rétention, heure de réinitialisation) est appliquée instantanément.

## Surveiller l'utilisation des quotas {#monitor-quota-usage}

La page des retention filter (filtre de rétention) affiche une ventilation des sessions utilisateur conservées, y compris les sessions bloquées une fois le quota atteint. Pour les dashboards et les alertes, utilisez la métrique `rum.measure.usage.quota_blocked_sessions`.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-usage.png" alt="Un graphique de répartition quotidienne montrant les sessions utilisateur conservées par des filtres personnalisés, les sessions conservées par des filtres permanents et les sessions bloquées une fois le quota atteint." style="width:100%" >}}

## API {#api}

Les quotas de rétention peuvent également être gérés via des [APIs][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/rum-retention-quotas/