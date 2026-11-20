---
algolia:
  tags:
  - profiler
aliases:
- /fr/tracing/profiling/
- /fr/tracing/profiler/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /profiler/enabling
  tag: Documentation
  text: Activer Continuous Profiler pour votre application
- link: getting_started/profiler
  tag: Documentation
  text: Premiers pas avec Continuous Profiler
- link: profiler/profile_visualizations
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: /extend/guide/data-collection-resolution/
  tag: Documentation
  text: Collecte et résolution des données
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: Centre d'apprentissage
  text: Optimisez la latence des requêtes avec Profiling Timeline
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: Blog
  text: Concentrez-vous sur le code qui compte grâce aux aperçus du code source dans
    Continuous Profiler
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
  text: Comment nous avons optimisé notre application Akka grâce au Continuous Profiler
    de Datadog
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analyser les performances de code Ruby avec Datadog Continuous Profiler
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: Blog
  text: Comment notre équipe Cloud SIEM utilise les attributs de contexte avec Continuous
    Profiler pour obtenir des informations cruciales sur les performances
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: Blog
  text: Rendre les visualisations de profilage accessibles aux ingénieurs de tous
    niveaux
- link: https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/
  tag: Blog
  text: Pourquoi le profilage continu est le quatrième pilier de l'observabilité
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour assurer le bon fonctionnement de
    vos applications.
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration GitLab Source Code
    dans Datadog
title: Continuous Profiler
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

<br>

Trouvez les goulots d'étranglement au niveau du processeur, de la mémoire et des E/S, répartis par nom de méthode, nom de classe et numéro de ligne, afin de réduire considérablement la latence pour l'utilisateur final et les coûts d'infrastructure.

### Faible impact en production {#low-impact-in-production}

Continuous Profiler s'exécute en production sur tous les services en utilisant des technologies telles que JDK Flight Recorder pour avoir un impact minimal sur l'utilisation du processeur et de la mémoire de votre hôte.

## Mise en route {#getting-started}

Le profiling de votre service vous permet de visualiser toutes les stack traces au même endroit en quelques minutes seulement.

### Instrumentez votre application {#instrument-your-application}

{{< card-grid image_width="400" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=java&runtime=graalvm_native_image" src="integrations_logos/graalvm.png" alt="GraalVM" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=node_js" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=dot_net" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=rust" src="integrations_logos/rust.png" alt="Rust" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=c" src="integrations_logos/c.png" alt="C" >}}
  {{< image-card href="/profiler/enabling/?prog_lang=cpp" src="integrations_logos/cpp.png" alt="C++" >}}
{{< /card-grid >}}

## Guide d'utilisation du profileur {#guide-to-using-the-profiler}

Le guide [Premier pas avec le profileur en continu][1] présente un exemple de service problématique et vous explique comment utiliser Continuous Profiler pour mieux comprendre le problème et le corriger.

## Explorer le profileur Datadog {#explore-datadog-profiler}

Une fois votre application configurée pour envoyer des profils à Datadog, commencez à obtenir des informations sur les performances de votre code.

Par défaut, les graphiques en flammes, les graphiques d'appels et les chronologies de threads sont conservés pendant huit jours, et les métriques de profil sont conservées pendant un mois. Exportez un graphique en flammes vers un notebook pour le conserver pendant un an.

{{< learning-center-callout header="Essayez de diagnostiquer les problèmes de performance du code dans le Centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
  Le Datadog Learning Center regorge de cours pratiques pour vous aider à en apprendre davantage sur ce sujet. Inscrivez-vous gratuitement pour analyser et améliorer les performances du code en production avec Datadog Continuous Profiler.
{{< /learning-center-callout >}}

### Types de profils {#profile-types}

Consultez [Types de profils][6] pour obtenir des descriptions des types de données de profil collectées pour chaque langage pris en charge.

{{< img src="profiler/profile-types2.png" alt="La liste des types de profils collectés pour les applications Java" style="width:100%;" >}}

### Rechercher des profils par tags {#search-profiles-by-tags}

[Utilisez des tags pour rechercher des profils][2] sur n'importe quelle dimension, qu'il s'agisse d'un hôte, d'un service, d'une version spécifique ou de toute combinaison.

{{< img src="profiler/search_profiles4.mp4" alt="Rechercher des profils par tags" video=true >}}

### Suivez les performances des fonctions au fil des déploiements {#track-function-performance-over-deployments}

Obtenez des métriques de profiling clés à partir de services tels que l'utilisation principale du processeur par méthode, les principales allocations de mémoire par thread et l'utilisation du processeur par version pour les visualiser dans vos dashboards.

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="Ajoutez des métriques de profilage à vos dashboards." video=true >}}

### Connectez les traces aux données de profilage {#connect-traces-to-profiling-data}

Les processus d'application pour lesquels le [tracing distribué APM][3] et Continuous Profiler sont activés sont automatiquement liés, ce qui vous permet de passer directement des informations de span aux données de profilage dans l'onglet [{{< ui >}}Profiles{{< /ui >}}][4] pour trouver les lignes de code spécifiques liées aux problèmes de performance.

{{< img src="profiler/profiles_tab.png" alt="L'onglet Profils affiche les informations de profilage pour un span de trace APM" >}}

### Identifiez les changements de performance en comparant les profils {#find-changes-in-performance-by-comparing-profiles}

La comparaison de profils similaires provenant de moments, d'environnements ou de déploiements différents peut vous aider à comprendre les causes possibles des problèmes de performance et leurs solutions. Le profileur Datadog propose des [visualisations de comparaison][5] pour comprendre pourquoi les profils diffèrent en fonction des périodes ou des tags que vous définissez.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/profiler/
[2]: /fr/profiler/search_profiles
[3]: /fr/tracing/
[4]: /fr/profiler/connect_traces_and_profiles/
[5]: /fr/profiler/compare_profiles/
[6]: /fr/profiler/profile_types/