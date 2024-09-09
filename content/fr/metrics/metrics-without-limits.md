---
aliases:
- /fr/metrics/faq/metrics-without-limits/
- /fr/metrics/guide/metrics-without-limits-getting-started/
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Contrôler de façon dynamique le volume des métriques custom grâce à Metrics
    without Limits™
- link: /observability_pipelines/guide/custom-metrics-governance
  tag: Documentation
  text: Utiliser des pipelines d'observabilité pour contrôler vos métriques custom
title: Metrics without Limits™
---

## Présentation

La solution Metrics without Limits™ dissocie l'ingestion et l'indexation des métriques custom afin de vous offrir un plus grand contrôle sur les volumes de vos métriques custom ainsi qu'une plus grande flexibilité. Ainsi, vous ne payez que pour les tags des métriques custom dont votre organisation a besoin.

Metrics without Limits™ vous permet de configurer des tags pour tous les types de métriques disponibles dans l'application Datadog. Vous pouvez également personnaliser les agrégations des métriques count, rate et gauge sans avoir à modifier ni à redéployer votre code. Metrics without Limits™ inclut une liste d'autorisation vous permettant de configurer dans l'application les tags pouvant être interrogés sur toute la plateforme Datadog. Les tags dont vous n'avez pas besoin et qui sont liés à des métriques d'application ou métier (comme le tag `host`) sont ainsi automatiquement exclus. Cette fonctionnalité est disponible sur la page [Metrics Summary][1].

Cette section présente les fonctionnalités clés de Metrics without Limits™ susceptibles de faciliter la gestion de vos volumes de métriques custom et le respect de votre budget d'observabilité.

### Configuration des tags

Cliquez sur un nom de métrique pour ouvrir son volet latéral et consulter plus de détails. Accédez ensuite à **Manage Tags** -> **Include Tags...** pour configurer les tags pouvant être interrogés dans les dashboards et les monitors. La fenêtre de configuration des tags propose automatiquement une liste d'autorisation en fonction des tags les plus interrogés dans les dashboards, les notebooks, les monitors et via l'API au cours des 30 derniers jours (ces tags sont affichés en bleu avec une icône). Vous pouvez également ajouter d'autres tags de votre choix. Avant de cliquer sur **Save**, consultez l'estimation du volume de métriques custom indexées découlant de la configuration de tags que vous venez de définir.

{{< img src="metrics/mwl_tag_config.mp4" alt="Configuration des tags" video=true >}}


Vous avez également la possibilité d'utiliser des API pour [créer][2], [modifier][3] et [supprimer][4] une configuration de tags. Il existe même une [API][5] vous permettant d'estimer l'incidence potentielle de votre configuration.

Par défaut, lors de la configuration de tags pour des métriques count, rate et gauge, vous pouvez ajouter à vos requêtes la combinaison d'agrégations temporelles/spatiales les plus fréquemment utilisées.

### Ajuster et optimiser vos agrégations

Il est possible d'affiner davantage vos filtres de métriques custom en ajoutant d'autres [agrégations de métriques][6] pour vos métriques count, gauge ou rate. Pour veiller à la précision mathématique de vos requêtes, Datadog stocke uniquement la combinaison d'agrégations temporelles/spatiales les plus souvent interrogées pour un type de métrique donné :

- Les métriques count et rate configurées peuvent être interrogées à l'aide d'agrégations temporelles/spatiales de type SUM.
- Les métriques gauge configurées peuvent être interrogées à l'aide d'agrégations temporelles/spatiales de type AVG.

Vous pouvez ajouter ou supprimer à tout moment des agrégations, sans avoir à modifier vos Agents ni votre code.

La fenêtre de configuration des tags propose automatiquement une liste d'autorisation en fonction des agrégations les plus interrogées dans les dashboards, les notebooks, les monitors et via l'API au cours des 30 derniers jours (ces agrégations sont affichées en bleu avec une icône). Vous pouvez également ajouter d'autres agrégations de votre choix.


### Configurer simultanément plusieurs métriques

Optimisez les volumes de vos métriques custom à l'aide de la [fonctionnalité de configuration groupée des tags pour les métriques][7]. L'option **Include Tags...** de la page Metrics Summary vous permet de spécifier un espace de nommage, puis de configurer toutes les métriques correspondant au préfixe de cet espace avec une unique liste d'autorisation des tags.

## Facturation de Metrics without Limits™

En configurant vos tags et agrégations, vous pouvez définir précisément les métriques custom pouvant être interrogées, ce qui réduit votre nombre de métriques custom facturées. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Vous pouvez continuer à envoyer à Datadog toutes vos données (toutes les informations sont ingérées) et ajouter des tags à une liste d'autorisation, afin d'interroger uniquement ces tags sur la plateforme Datadog. Si le volume de données ingérées par Datadog pour vos métriques configurées est plus important que le volume indexé restant, ces deux volumes sont indiqués sur les pages Usage et Metrics Summary.

- **Ingested Custom Metrics** : le volume initial de métriques custom basé sur tous les tags ingérés (qui ont été envoyés par le code).
- **Indexed Custom Metrics** : le volume de métriques custom pouvant être interrogées sur la plateforme Datadog (en fonction des configurations Metrics without Limits™).

**Remarque : seules les métriques configurées rentrent en compte dans le calcul du volume des métriques custom.** Si vous n'avez pas configuré Metrics without Limits™ pour une métrique, seul le volume des métriques custom indexées vous est facturé.

En savoir plus sur la [facturation des métriques custom][8].

## Prise en main de la solution Metrics without Limits™

1. Configurez vos 20 principales métriques sur votre [page Plan & Usage][9], depuis la page Metrics Summary ou à l'aide de l'[API][2].
   Vous pouvez appliquer une configuration groupée pour vos métriques (avec la syntaxe `*`) afin de configurer rapidement des tags pour plusieurs métriques. Datadog vous prévient lorsque la tâche de configuration groupée est terminée.

**Remarque :** si vous utilisez l'[API de création de configuration de tags][2], commencez par vous servir de l'[API d'estimation de la cardinalité des configurations de tags][5] pour vérifier l'incidence potentielle de vos configurations de tags avant de les créer. Si l'interface ou l'API d'estimation renvoie un nombre de métriques indexées supérieur au nombre de métriques ingérées, n'enregistrez pas votre configuration de tags.

2. Ajoutez des configurations de tags vides aux métriques que vous n'interrogez pas.

   Au fur et à mesure que vos équipes continueront à filtrer les métriques inutiles qui ne sont jamais interrogées sur la plateforme Datadog, en leur attribuant une liste d'autorisation sans le moindre tag, vos coûts diminueront progressivement.

   Pour obtenir un rapport sur les métriques que vous n'interrogez pas, contactez votre chargé de compte.

3. Étudiez votre charge et vos coûts. Une fois vos métriques configurées, vous pouvez vérifier de trois façons différentes l'incidence de vos modifications :

   - Avant d'enregistrer votre configuration, l'outil d'estimation de la cardinalité de la configuration de tags indique le nombre estimé de métriques custom indexées que vous obtiendrez après l'application de cette configuration. Cette valeur doit être inférieure au volume de métriques custom ingérées.
   - Une fois votre configuration enregistrée, le volet de détails de la page Metrics Summary affiche normalement un volume de métriques custom indexées inférieur au volume de métriques custom ingérées.
   - 24 heures après avoir enregistré votre configuration, vous pouvez également vérifier l'impact de cette configuration dans le tableau **Top Custom Metrics** de la page Plan & Usage. Vous devriez observer une réduction du volume de métriques custom entre l'onglet **Month-to-Date** et l'onglet **Most Recent Day** de ce tableau.

## Meilleures pratiques

- Vous pouvez configurer des alertes sur votre métrique d'[utilisation estimée des métriques custom][10] afin de pouvoir corréler les pics d'utilisation avec des configurations.

- Vous pouvez également utiliser des [autorisations RBAC][11] pour Metrics without Limits™ afin de contrôler les utilisateurs pouvant accéder à cette fonctionnalité, puisqu'elle a une incidence directe sur vos coûts.

- Les événements d'audit vous permettent de surveiller n'importe quelle configuration de tags ou agrégation par centile que vous avez appliquée et pouvant potentiellement être corrélée avec les pics de métriques custom. Recherchez « tags:audit » et une configuration de tags interrogeables ou des agrégations par centile dans votre [flux d'événements][12].

\*Metrics without Limits est une marque déposée de Datadog, Inc.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/api/latest/metrics/#create-a-tag-configuration
[3]: /fr/api/latest/metrics/#update-a-tag-configuration
[4]: /fr/api/latest/metrics/#delete-a-tag-configuration
[5]: /fr/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /fr/metrics/#time-and-space-aggregation
[7]: /fr/metrics/summary/#configuration-of-multiple-metrics
[8]: /fr/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /fr/account_management/billing/usage_metrics/
[11]: /fr/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream