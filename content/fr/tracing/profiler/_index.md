---
title: Profileur en continu
kind: Documentation
aliases:
  - /fr/tracing/profiling
further_reading:
  - link: tracing/profiler/getting_started
    tag: Documentation
    text: Activez le profileur en continu pour votre application.
  - link: tracing/profiler/intro_to_profiling
    tag: Documentation
    text: Présentation du profiling
  - link: tracing/profiler/search_profiles
    tag: Documentation
    text: En savoir plus sur les types de profils disponibles
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: Blog
    text: Présentation du profiling continu en production dans Datadog
  - link: 'https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/'
    tags: Blog
    text: Analyse en continu des vulnérabilités avec l'action GitHub Datadog
---
{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="Explorer le flamegraph de profiling">}}

Identifiez les goulots d'étranglement au niveau du processeur, de la mémoire et des E/S, répartis par nom de méthode, nom de classe et numéro de ligne, afin de réduire considérablement la latence pour l'utilisateur final et les coûts d'infrastructure.

### Faible impact en production

Le profileur en continu est conçu pour être exécuté en production dans tous les services. Il exploite des technologies telles que JDK Flight Recorder afin de minimiser l'impact sur la charge processeur et la charge mémoire de votre host.

## Prise en main

Le profiling de votre service vous permet de visualiser toutes vos stack traces au même endroit en quelques minutes seulement.

### 1. Instrumentez votre application

Ajoutez une bibliothèque de profileur à votre application pour commencer à envoyer des profils à l'Agent Datadog.

Pour recevoir une notification lorsqu'une bêta privée est disponible pour le profileur **Node**, **Ruby**, **PHP** ou **.NET**, inscrivez-vous [ici][1].

{{< partial name="profiling/profiling-languages.html" >}}

## Explorer le profileur Datadog

Maintenant que vous avez configuré votre application pour qu'elle envoie des profils à Datadog, vous pouvez commencer à analyser les performances de votre code :

### Rechercher des profils en fonction de tags

[Utilisez les tags pour rechercher les profils][2] associés à n'importe quel contexte, qu'il s'agisse d'un host, d'un service, d'une version ou d'une combinaison d'entre eux.

{{< img src="tracing/profiling/search_profiles.gif" alt="Rechercher des profils en fonction de tags">}}

### Suivre les performances des fonctions au fil des déploiements

Obtenez des métriques de profiling clés à partir de vos services, tels que la charge processeur maximale par méthode, les allocations de mémoire les plus élevées par thread et la charge processeur par version, afin de les visualiser dans vos dashboards.

{{< img src="tracing/profiling/profiling-metric-dashboard.gif" alt="Ajouter des métriques de profiling à vos dashboards.">}}

### Associer des traces à des données de profiling

Les données des processus d'application sont automatiquement liées lorsque le [tracing distribué de l'APM][3] ainsi que le profileur en continu sont activés. Vous pouvez donc passer directement des informations d'une span aux données de profiling depuis l'[onglet Code Hotspots][4], afin d'identifier les lignes de code précises entraînant des problèmes de performance.

{{< img src="tracing/profiling/code_hotspots_tab.gif" alt="Onglet Code Hotspots affichant les informations de profiling pour une span de trace de l'APM">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
[2]: /fr/tracing/profiling/search_profiles
[3]: /fr/tracing/
[4]: /fr/tracing/profiler/connect_traces_and_profiles/