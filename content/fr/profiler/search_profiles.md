---
aliases:
- /fr/tracing/profiling/search_profiles/
- /fr/tracing/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: Documentation
  text: Activer le profileur en continu pour votre application
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tags: Blog
  text: Présentation du profiling continu en production dans Datadog
kind: documentation
title: Rechercher des profils
---

{{< img src="profiler/search_profiles.mp4" alt="Rechercher des profils en fonction de tags" video=true >}}

Chaque ligne correspond au profil d'un processus pendant une courte période. Par défaut, les profils sont importés toutes les minutes. En fonction du langage, le profil de ces processus couvre une durée de 15 à 60 secondes.

Vous pouvez filtrer les données selon des tags d'infrastructure ou d'application définis depuis la [configuration du tracing de votre environnement][1]. Par défaut, les facettes suivantes sont disponibles :

| Facette   | Définition                                                                |
| ------- | ------------------------------------------------------------------------- |
| Env     | L'environnement sur lequel votre application s'exécute (`production`, `staging`). |
| Service | Le nom du [service][2] que votre code exécute.                        |
| Version | La version de votre code.                                                 |
| Host    | Le hostname sur lequel votre processus profilé s'exécute.                         |
| Runtime | Le type de runtime que le processus profilé exécute (`JVM`, `CPython`).   |

Les mesures suivantes sont disponibles :

| Mesure                | Définition                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                    | L'utilisation du processus, mesurée en cœurs.                                                                                                                                                            |
| Memory Allocation | Le débit d'allocation de mémoire pour le profiling. Cette valeur peut dépasser la quantité de mémoire de votre système, car la mémoire allouée peut faire l'objet d'un nettoyage au cours du processus. |
| Wall time              | Le temps écoulé associé au code. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution du code.  |

Un ensemble de métriques plus large est disponible pour chaque runtime. Vous pouvez [consulter la liste par série temporelle ici][4].

## Profils

Cliquez sur une ligne pour afficher un profil spécifique :

{{< img src="profiler/profiling_flamegraph.mp4" alt="Un profil spécifique" video=true >}}

L'en-tête contient des informations associées à votre profil, telles que le service qui l'a généré ou l'environnement et la version du code pertinents.

Quatre onglets se trouvent sous l'en-tête de profil :

| Onglet               | Définition                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Profils          | Flamegraph et tableau de synthèse du profil consulté. Vous pouvez basculer entre plusieurs types de profils (par exemple, `CPU` et `Memory allocation`). |
| Analysis          | Ensemble de fonctions heuristiques qui indiquent d'éventuels problèmes ou points à améliorer dans votre code. Cet onglet est uniquement disponible pour Java.            |
| Métriques           | Métriques du profileur provenant de tous les profils du même service.                                                                        |
| Runtime Info | Propriétés du runtime dans les langages pris en charge et tags des profils.                                                                          |

**Remarque** : en haut à droite de chaque profil, vous pouvez effectuer les opérations suivantes :

- Télécharger le profil
- Afficher le profil en mode plein écran


### Types de profils

Dans l'onglet **Profiles**, vous pouvez consulter tous les types de profils disponibles pour un langage donné. Les informations recueillies à propos de votre profil varient en fonction du langage. Consultez la section [Types de profils][3] pour découvrir la liste des types de profils disponibles pour chaque langage.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/send_traces/#configure-your-environment
[2]: /fr/tracing/glossary/#services
[3]: /fr/profiler/profile_types/
[4]: https://app.datadoghq.com/profiling/search?viz=timeseries