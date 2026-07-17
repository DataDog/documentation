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
  text: Activer le profileur en continu pour votre application
- link: getting_started/profiler
  tag: Documentation
  text: Premiers pas avec le profileur en continu
- link: profiler/profile_visualizations
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: /extend/guide/data-collection-resolution/
  tag: Documentation
  text: Collecte de données et résolution
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: Blog
  text: Concentrez-vous sur le code qui compte avec des aperçus de code source dans
    le Profiler Continu
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
- link: https://www.datadoghq.com/blog/continuous-profiler-context-attributes/
  tag: Blog
  text: Comment notre équipe Cloud SIEM utilise les attributs de contexte avec le
    Profiler Continu pour obtenir des informations cruciales sur les performances
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: Blog
  text: Rendre les visualisations de profilage accessibles aux ingénieurs de tous
    niveaux
- link: https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/
  tag: Blog
  text: Pourquoi le profilage continu est le quatrième pilier de l'observabilité
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour maintenir le bon fonctionnement
    des applications
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration du code source GitLab
    dans Datadog
title: Profiler en continu
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/441865141/rendition/1080p/file.mp4?loc=external&signature=ebc774b892f062e45922dcae82f4ebff0a906c8ec30f34b9d77494b0051748ad" poster="/images/poster/profiler.png" >}}

<br>

Trouvez les goulots d'étranglement au niveau du processeur, de la mémoire et des E/S, répartis par nom de méthode, nom de classe et numéro de ligne, afin de réduire considérablement la latence pour l'utilisateur final et les coûts d'infrastructure.

### Faible impact en production {#low-impact-in-production}

Le Profiler Continu fonctionne en production sur tous les services en utilisant des technologies telles que JDK Flight Recorder pour avoir un impact minimal sur l'utilisation du CPU et de la mémoire de votre hôte.

## Commencer {#getting-started}

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

## Guide d'utilisation du profiler {#guide-to-using-the-profiler}

Le guide [Premier pas avec le profileur en continu][1] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

## Explorez le Profiler Continu Datadog {#explore-datadog-profiler}

Après avoir configuré votre application pour envoyer des profils à Datadog, commencez à obtenir des informations sur les performances de votre code.

Par défaut, les profils sont conservés pendant huit jours, et les métriques générées à partir des données de profil sont conservées pendant un mois.

{{< learning-center-callout header="Essayez de diagnostiquer les problèmes de performance du code dans le Centre d’apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/continuous-profiler-course">}}
  Le Centre d’apprentissage Datadog est rempli de cours pratiques pour vous aider à en savoir plus sur ce sujet. Inscrivez-vous sans frais pour enquêter et améliorer les performances du code des applications en production avec le Profiler Continu Datadog.
{{< /learning-center-callout >}}

### Types de profils {#profile-types}

Voir [Types de profils][6] pour des descriptions des types de données de profil collectées pour chaque langue prise en charge.

{{< img src="profiler/profile-types2.png" alt="La liste des types de profils collectés pour les applications Java" style="width:100%;" >}}

### Rechercher des profils par tags {#search-profiles-by-tags}

[Utilisez des tags pour rechercher des profils][2] dans n'importe quelle dimension, que ce soit un hôte spécifique, un service, une version ou toute combinaison.

{{< img src="profiler/search_profiles4.mp4" alt="Rechercher des profils par tags" video=true >}}

### Suivre la performance des fonctions au fil des déploiements {#track-function-performance-over-deployments}

Obtenez des métriques de profiling clés à partir de services tels que l'utilisation principale du processeur par méthode, les principales allocations de mémoire par thread et l'utilisation du processeur par version pour les visualiser dans vos dashboards.

{{< img src="profiler/profiling-metric-dashboard.mp4" alt="Ajoutez des métriques de profilage à vos tableaux de bord." video=true >}}

### Connecter les traces aux données de profilage {#connect-traces-to-profiling-data}

Les processus d'application qui ont à la fois [APM distributed tracing][3] et le profiler continu activés sont automatiquement liés, vous permettant de passer directement des informations de span aux données de profilage dans l'onglet [Profils][4] pour trouver des lignes de code spécifiques liées aux problèmes de performance.

{{< img src="profiler/profiles_tab.png" alt="L'onglet Profils affiche des informations de profilage pour un span de trace APM" >}}

### Trouver des changements de performance en comparant des profils {#find-changes-in-performance-by-comparing-profiles}

Comparer des profils similaires provenant de différents moments, environnements ou déploiements peut vous aider à comprendre les causes possibles et les solutions aux problèmes de performance. Le Profiler Continu Datadog propose des [visualisations de comparaison][5] pour comprendre pourquoi les profils diffèrent en fonction des périodes ou des tags que vous définissez.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/profiler/
[2]: /fr/profiler/search_profiles
[3]: /fr/tracing/
[4]: /fr/profiler/connect_traces_and_profiles/
[5]: /fr/profiler/compare_profiles/
[6]: /fr/profiler/profile_types/