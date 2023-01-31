---
title: Comparer des profils
kind: documentation
further_reading:
    - link: tracing/profiler/enabling
      tag: Documentation
      text: Activer le profileur en continu pour votre application
    - link: getting_started/profiler
      tag: Documentation
      text: Prise en main du profileur
    - link: "https://www.datadoghq.com/blog/introducing-datadog-profiling/"
      tag: Blog
      text: Présentation du profiling continu en production dans Datadog
    - link: "https://www.datadoghq.com/blog/code-optimization-datadog-profile-comparison/"
      tags: Blog
      text: Comparer et optimiser votre code avec la comparaison de profils Datadog
    - link: "https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/"
      tags: Blog
      text: Comment nous avons optimisé notre application Akka grâce au profileur en continu Datadog
---

Le profileur en continu peut comparer ou agréger deux profils afin de vous aider à identifier les améliorations de performance de votre code, les régressions et les modifications structurelles. Vous pouvez comparer un profil avec :

- des profils établis à différentes dates ;
- une moyenne des profils du service, déterminée au fil du temps ; ou
- des profils avec un autre ensemble de tags (par exemple, avec des environnements, versions ou data center différents).

Cette fonctionnalité vous permet de vérifier si un service est plus lent ou plus rapide, s'il utilise plus ou moins de mémoire, s'il effectue plus ou moins d'allocations, s'ils génèrent plus ou moins d'exceptions, ou s'il implique plus ou moins de code et d'appels qu'auparavant.

## Scénarios de comparaison

Les comparaisons sont plus pertinentes si le workload de l'application (le nombre total de requêtes) est similaire à celui des données historiques.

Voici quelques exemples de scénarios de comparaison :

- Comparaison entre les deux derniers déploiements : vérifiez par exemple si le dernier correctif déployé réduit le nombre d'allocations de mémoire effectuées par votre méthode.

- Comparaison entre deux périodes différentes : calculez par exemple la différence entre l'utilisation actuelle du CPU et celle d'il y a 7 jours. Vous pouvez ainsi déterminer les méthodes qui augmentent ou réduisent l'utilisation du CPU.

- Comparaison entre deux ensembles de tags : comparez par exemple des profils avec différents environnements, zones de disponibilité, pods ou canaries, ou utilisez d'autres tags personnalisés Datadog.

## Accéder à la vue comparative

Vous pouvez ouvrir plusieurs types de comparaisons dans différentes sections de l'interface.

### Comparer un profil à une période historique

Depuis la vue Profiler Search, sélectionnez un profil dans la liste. Cliquez sur **Compare** pour ouvrir la vue comparative. Par défaut, le profil sélectionné correspond au profil B. Pour le profil A, sélectionnez des tags et un intervalle d'agrégation, ou un ID de profil spécifique.

Sélectionnez la métrique que vous souhaitez comparer (la liste varie en fonction du langage du code). Cette fonctionnalité vous permet par exemple de visualiser les pics d'allocation pendant que vous consultez les profils CPU.

{{< img src="tracing/profiling/compare_time_frames.mp4" alt="Ouverture de la vue comparative permettant de comparer un profil avec une agrégation pour un intervalle" video="true">}}

Les couleurs affichées indiquent différentes informations :
 - Plus une méthode est rouge, plus elle chronophage dans le profil B.
 - Plus une méthode est verte, moins elle est chronophage dans le profil B.
 - Les méthodes bleues sont uniquement utilisées dans le profil A.
 - Les méthodes violettes sont uniquement utilisées dans le profil B.

Cette légende vous permet d'identifier les modifications structurelles dans votre code entre plusieurs versions, intervalles ou canaries, et de mieux comprendre leur incidence sur les performances.

{{< img src="tracing/profiling/comparison_legend.png" alt="Légende des comparaisons de profils" >}}

Passez le curseur sur des méthodes du profil pour afficher des métriques précises sur les méthodes les plus rapides ou les plus lentes, ou celles qui effectuent plus ou moins d'allocations que pour l'autre profil.

{{< img src="tracing/profiling/compare_hover.png" alt="Passer le curseur sur une méthode dans le profil pour afficher la comparaison des métriques" >}}

### Comparer des versions récentes

Dans la vue Aggregation, sélectionnez un service pour afficher son profil agrégé en fonction d'une certaine métrique (par exemple, le wall time) sur l'intervalle sélectionné. Cliquez ensuite sur **Compare** pour comparer ce profil au profil agrégé d'une autre version.

{{< img src="tracing/profiling/compare_recent_versions.mp4" alt="Ouverture de la vue comparative pour deux versions" video="true">}}

### Vues comparatives Side-by-side et Combined

Basculez entre les vues **Side-by-side** et **Combined** pour déterminer laquelle des deux affichent des données plus pertinentes selon vos besoins.

Les comparaisons juxtaposées (Side-by-side) vous permettent de conserver le contexte des profils A et B. Dans cette vue, le flamegraph de gauche représente le profil filtré en fonction des tags et de l'intervalle du profil A. De la même façon, le framegraph de droite représente le profil filtré en fonction des tags et de l'intervalle du profil B.

Les méthodes en bleu dans le flamegraph de gauche correspondent aux méthodes qui n'ont pas été exécutées dans le profil B durant la période observée ou pour l'ensemble de tags interrogé. Il en va de même pour les méthodes violettes : elles n'ont pas été observées dans le profil A.

La vue Combined vous permet de visualiser les changements de performance du code au sein d'une vue unique. Elle contient un flamegraph représentant les durées de méthode moyennes pour le profil A et B. Vous pouvez également consulter la différence moyenne entre les durées des méthodes des deux requêtes.

Les méthodes supprimées sont indiquées en vert. Vous pouvez passer votre curseur sur la zone réservée aux méthodes pour les afficher. Le code ajouté est indiqué en rouge.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}