---
aliases:
- /fr/graphing/infrastructure/
cascade:
- _target:
    path: /infrastructure/resource_catalog/aws_iam_user.md
  aliases:
  - /security/cspm/custom_rules/aws_iam_user/
- _target:
    path: /infrastructure/**/*
  algolia:
    rank: 70
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Infrastructure%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de la surveillance d'infrastructure Datadog
    (connexion à l'application requise).
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour booster la surveillance de votre
    infrastructure
kind: documentation
title: Infrastructure
---

{{< img src="infrastructure/Hostmap-compressed.mp4" alt="Vidéo d'une hostmap filtrée pour garder uniquement les hosts Nginx" video="true">}}

## Présentation

La surveillance d'infrastructure comprend des fonctionnalités Datadog essentielles qui permettent de visualiser, de surveiller et de mesurer les performances de vos hosts, conteneurs et processus.

## Composants

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="/infrastructure/list" >}}<u>Liste des infrastructures</u> : consultez la liste de tous vos hosts surveillés par Datadog.{{< /nextlink >}}
    {{< nextlink href="/infrastructure/hostmap" >}}<u>Hostmap et Container Map</u> : visualisez tous vos hosts au sein d'une vue grâce à des regroupements personnalisés, des filtres et des métriques identifiées par des couleurs et formes pour faciliter leur compréhension.{{< /nextlink >}}
    {{< nextlink href="/infrastructure/containers" >}}<u>Vue des conteneurs</u> : surveillez les conteneurs de votre environnement en les consultant en temps réel.{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process" >}}<u>Vue des processeurs</u> : surveillez vos processus en consultant en temps réel les éléments les plus granulaires de votre déploiement.{{< /nextlink >}}

{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}