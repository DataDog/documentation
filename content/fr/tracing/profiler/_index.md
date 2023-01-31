---
aliases:
- /fr/tracing/profiling
further_reading:
- link: /tracing/profiler/enabling
  tag: Documentation
  text: Activez le profileur en continu pour votre application.
- link: getting_started/profiler
  tag: Documentation
  text: Premiers pas avec le profileur en continu
- link: tracing/profiler/search_profiles
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: /developers/guide/data-collection-resolution-retention/
  tag: Documentation
  text: Collecte, résolution et rétention des données
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Présentation du profiling continu en production dans Datadog
- link: https://www.datadoghq.com/blog/datadog-github-action-vulnerability-analysis/
  tag: Blog
  text: Analyse en continu des vulnérabilités avec l'action GitHub Datadog
- link: https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/
  tag: Blog
  text: Comparer et optimiser votre code avec la comparaison de profils Datadog
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: Blog
  text: Comment nous avons optimisé notre application Akka grâce au profileur en continu
    Datadog
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analyser les performances de code Ruby avec le profileur en continu Datadog
kind: Documentation
title: Profileur en continu
---

{{< vimeo 441865141 >}}

</br>

Identifiez les goulots d'étranglement au niveau du processeur, de la mémoire et des E/S, répartis par nom de méthode, nom de classe et numéro de ligne, afin de réduire considérablement la latence pour l'utilisateur final et les coûts d'infrastructure.

### Faible impact en production

Le profileur en continu s'exécute en production dans tous les services. Il exploite des technologies telles que JDK Flight Recorder afin de minimiser l'impact sur la charge processeur et la charge mémoire de votre host.

## Prise en main

Le profiling de votre service vous permet de visualiser toutes vos stack traces au même endroit en quelques minutes seulement.

### Instrumenter votre application

{{< partial name="profiling/profiling-languages.html" >}}


Pour les applications rédigées dans des langages compilés, comme **C**, **C++** ou **Rust** :

{{< partial name="profiling/profiling-unmanaged-code.html" >}}

## Guide d'utilisation du profileur

Le guide [Premier pas avec le profileur en continu][1] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

## Explorer le profileur Datadog

Dès lors que votre application envoie des profils à Datadog, vous pouvez commencer à consulter des informations exploitables sur les performances de votre code. Par défaut, les profils sont conservés pendant sept jours, tandis que les métriques générées à partir des données d'un profil sont conservées pendant un mois.

### Rechercher des profils en fonction de tags

[Utilisez les tags pour rechercher les profils][2] associés à n'importe quel contexte, qu'il s'agisse d'un host, d'un service, d'une version ou d'une combinaison d'entre eux.

{{< img src="tracing/profiling/search_profiles.mp4" alt="Rechercher des profils en fonction de tags" video=true >}}

### Suivre les performances des fonctions au fil des déploiements

Obtenez des métriques de profiling clés à partir de vos services, tels que la charge processeur maximale par méthode, les allocations de mémoire les plus élevées par thread et la charge processeur par version, afin de les visualiser dans vos dashboards.

{{< img src="tracing/profiling/profiling-metric-dashboard.mp4" alt="Ajouter des métriques de profiling à vos dashboards" video=true >}}

### Associer des traces à des données de profiling

Les données des processus d'application sont automatiquement liées lorsque le [tracing distribué de l'APM][3] ainsi que le profileur en continu sont activés. Vous pouvez donc passer directement des informations d'une span aux données de profiling depuis l'[onglet Code Hotspots][4], afin d'identifier les lignes de code précises entraînant des problèmes de performance.

{{< img src="tracing/profiling/code_hotspots_tab.mp4" alt="Onglet Code Hotspots affichant les informations de profiling pour une span de trace de l'APM" video=true >}}

### Comparer des profils pour identifier les changements de performance

Pour mieux comprendre les causes potentielles de vos problèmes de performance, et identifier des solutions, vous pouvez comparer des profils similaires. Le profileur Datadog propose des [visualisations de comparaison][5] vous permettant de déterminer ce qui différencie vos profils, en fonction des intervalles ou tags appliqués.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/profiler/
[2]: /fr/tracing/profiling/search_profiles
[3]: /fr/tracing/
[4]: /fr/tracing/profiler/connect_traces_and_profiles/
[5]: /fr/tracing/profiler/compare_profiles/