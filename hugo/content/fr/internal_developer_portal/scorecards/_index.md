---
aliases:
- /fr/tracing/software_catalog/scorecards
- /fr/tracing/service_catalog/scorecards
- /fr/service_catalog/scorecards
- /fr/software_catalog/scorecards
cascade:
  site_support_id: idp
description: Évaluez automatiquement les entités de votre catalogue par rapport à
  des critères définis afin de mesurer la santé des logiciels et de promouvoir les
  meilleures pratiques d'ingénierie au sein des équipes.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Transformez les retours en actions au sein de votre organisation d'ingénierie
    avec Datadog Forms
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Catalog
- link: /api/latest/service-scorecards/
  tag: Documentation
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorisez et promouvez les meilleures pratiques d'observabilité des services
    avec les Scorecards
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalisez les meilleures pratiques avec des Scorecards personnalisés
- link: /delivery_performance/dora_metrics/
  tag: Documentation
  text: Suivez les DORA Metrics avec Datadog
- link: https://www.datadoghq.com/blog/scorecards-dogfooding/
  tag: Blog
  text: Comment nous utilisons les Scorecards pour définir et communiquer les meilleures
    pratiques à grande échelle
title: Scorecards
---
{{< img src="/tracing/software_catalog/scorecard-overview-updated.png" alt="Dashboard des Scorecards mettant en évidence les performances des règles" style="width:90%;" >}}

## Présentation {#overview}

Les Scorecards aident votre équipe à mesurer et à améliorer continuellement la santé et les performances de vos logiciels. En tant qu'ingénieurs de plateforme, vous pouvez créer des Scorecards pour évaluer automatiquement les entités de votre catalogue par rapport à des critères définis afin de faire ressortir les domaines nécessitant une attention particulière.

Vous avez un contrôle total sur la manière dont les Scorecards sont définis. En plus des trois ensembles de Scorecards principaux fournis par la plateforme Datadog concernant la préparation à la production, les meilleures pratiques d'observabilité, ainsi que la documentation et la propriété, vous pouvez personnaliser les règles par défaut ou en créer de nouvelles pour répondre aux priorités de votre équipe et refléter vos propres normes opérationnelles. Cette flexibilité vous permet d'adapter les Scorecards à la culture et à la maturité d'ingénierie de votre organisation.

Datadog évalue les Scorecards par défaut toutes les 24 heures pour toutes les entités enregistrées dans le catalogue par rapport à un ensemble de critères de réussite ou d'échec. Vous pouvez désactiver ces évaluations par défaut à tout moment. Vous pouvez configurer la saisie des données, les critères d'évaluation et la fréquence d'évaluation pour toutes les règles personnalisées en utilisant le [Scorecards API][1] ou [Datadog Workflow Automation][2].  

Datadog peut résumer les résultats des Scorecards dans des rapports automatisés et les transmettre directement via Slack, aidant ainsi votre équipe à rester alignée, à suivre les améliorations et à combler efficacement les lacunes.

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="Inscrivez-vous pour obtenir un accès anticipé à nos prochaines fonctionnalités !" >}}
{{< /callout >}}

## Démarrez {#get-started}

{{< whatsnext desc="Configurez les Scorecards et découvrez comment ils peuvent aider votre équipe :" >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Configurer les Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}Créer des règles personnalisées{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Découvrez ce que vous pouvez faire avec les Scorecards{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/service-scorecards/
[2]: /fr/actions/workflows/