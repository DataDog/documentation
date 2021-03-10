---
title: Rechercher des profils
kind: documentation
aliases:
  - /fr/tracing/profiling/search_profiles
further_reading:
  - link: tracing/profiler/getting_started
    tag: Documentation
    text: Activez le profileur en continu pour votre application.
  - link: tracing/profiler/intro_to_profiling
    tag: Documentation
    text: Présentation du profiling
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: Blog
    text: Présentation du profiling continu en production dans Datadog
---
{{< img src="tracing/profiling/search_profiles.gif" alt="Rechercher des profils en fonction de tags">}}

Chaque ligne correspond au profil d'un processus pendant une courte période. Par défaut, les profils sont importés toutes les minutes. En fonction du langage, le profil de ces processus couvre une durée de 15 à 60 secondes.

Vous pouvez filtrer les données selon des tags d'infrastructure ou d'application définis depuis la [configuration du tracing de votre environnement][1]. Par défaut, les facettes suivantes sont disponibles :

| Facette    | Définition                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------ |
| Env      | L'environnement sur lequel votre application s'exécute (`production`, `staging`).                                    |
| Service  | Le nom du [service][2] que votre code exécute.                                                     |
| Version  | La version de votre code.                                                                              |
| Host     | Le hostname sur lequel votre processus profilé s'exécute. |
| Runtime  | Le type de runtime que le processus profilé exécute (`JVM`, `CPython`).                                |

Les mesures suivantes sont disponibles :

| Mesure           | Définition                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CPU              | L'utilisation du processus, mesurée en nœuds. |
| Memory Allocation | Le débit d'allocation de mémoire pour le profiling. Cette valeur peut dépasser la quantité de mémoire de votre système, car la mémoire allouée peut faire l'objet d'un nettoyage au cours du processus. |



## Profils

Cliquez sur une ligne pour afficher un profil spécifique :

{{< img src="tracing/profiling/profiling_flamegraph.gif" alt="Un profil spécifique">}}

L'en-tête contient des informations associées à votre profil, telles que le service qui l'a généré ou l'environnement et la version du code pertinents.

Quatre onglets se trouvent sous l'en-tête de profil :

| Onglet          | Définition                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Profils     | Flamegraph et tableau de synthèse du profil consulté. Vous pouvez basculer entre plusieurs types de profils (`CPU`, `Memory allocation`). |
| Analysis     | Ensemble de fonctions heuristiques qui indiquent d'éventuels problèmes ou points à améliorer dans votre code. Cet onglet est actuellement uniquement disponible pour Java.                   |
| Métriques      | Métriques du profileur provenant de tous les profils du même service.                                                                              |
| Runtime Info | Propriétés du runtime dans les langages pris en charge et tags des profils.                                                                                                     |

**Remarque** : en haut à droite de chaque profil, vous pouvez effectuer les opérations suivantes :

- Télécharger le profil
- Afficher le profil en mode plein écran


### Types de profils

Dans l'onglet **Profiles**, vous pouvez consulter tous les types de profils disponibles pour un langage donné. Les informations recueillies à propos de votre profil varient en fonction du langage.

{{< programming-lang-wrapper langs="java,python,go" >}}
{{< programming-lang lang="java" >}}

{{< img src="tracing/profiling/profile.png" alt="Un profil spécifique">}}

Une fois les profils activés, les types suivants sont recueillis :

| Type de profil             | Définition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU in Java Code         | Affiche la durée d'exécution de chaque méthode sur le processeur. Cela inclut le code qui s'exécute sur la JVM (Java, Kotlin, etc.), mais pas les opérations JVM ou le code natif appelé à partir de la JVM.                                                                                                                                                                     |
| Allocation               | Affiche la quantité de mémoire de tas allouée par chaque méthode, y compris les allocations qui ont été libérées par la suite.                                                                                                                                                                                     |
| Wall Time in Native Code | Affiche le temps passé en code natif. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la méthode. Ce profil n'inclut pas le temps passé lors de l'exécution du bytecode JVM, qui constitue généralement une grande partie du code de votre application. |
| Class load               | Affiche le nombre de classes chargées par chaque méthode.                                                                                                                                                                                                                                                 |
| Exception Profile                    | Affiche le nombre d'erreurs et d'exceptions renvoyées par chaque méthode.                                                                                                                                                                                                                                                  |
| File I/O                 | Affiche le temps passé par chaque méthode pour la lecture et l'écriture de fichiers.                                                                                                                                                                                                                                        |
| Lock                     | Affiche le temps passé par chaque méthode à attendre un verrouillage.                                                                                                                                                                                                                                                                                                                           |
| Socket I/O               | Affiche le temps passé par chaque méthode pour la lecture et l'écriture du socket E/S.                                                                                                                                                                                                                                              |
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Une fois les profils activés, les types suivants sont recueillis :

| Type de profil             | Définition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU         | Affiche la durée d'exécution de chaque fonction sur le processeur, y compris le code Python et natif.                                                                                                                         |
| Allocation               | Affiche la quantité de mémoire de tas allouée par chaque fonction, y compris les allocations qui ont été libérées par la suite. Uniquement disponible avec Python 3.                                                                                                                                                                                    |
| Allocation Count         | Affiche le nombre d'allocations de tas effectuées par chaque méthode, y compris les allocations qui ont été libérées par la suite.     |
| Wall Time | Affiche la durée de chaque fonction. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la fonction. |
| Exceptions               | Affiche le nombre d'exceptions interceptées ou non provenant de chaque fonction.                                                                                           |
| Lock                     | Affiche le temps passé par chaque fonction pour le verrouillage (à savoir, l'attente ou le maintien d'un verrouillage) ou le nombre de fois qu'une fonction a activé/désactivé un verrouillage. |
| Uncaught Exceptions      | Affiche les exceptions qui n'ont pas été interceptées par un bloc try/except. |
| Exceptions              | Affiche les exceptions qui ont été renvoyées lors de l'exécution du programme. |

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Une fois les profils activés, les types suivants sont recueillis :

| Type de profil             | Définition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                      | Affiche la durée d'exécution de chaque fonction sur le processeur.                                                                          |
| Allocation               | Affiche la quantité de mémoire de tas allouée par chaque fonction depuis le lancement de l'application, y compris les allocations qui ont été libérées par la suite. Cette valeur correspond à `alloc_space` pour Go. Il s'agit d'une mesure très utile pour étudier la charge de nettoyage de la mémoire.              |
| Allocation Count         | Affiche le nombre d'objets alloués dans le mémoire de tas par chaque fonction depuis le lancement de l'application, y compris les allocations qui ont été libérées par la suite. Il s'agit d'une mesure très utile pour étudier la charge de nettoyage de la mémoire.     |
| Heap                     | Affiche la quantité de mémoire de tas allouée par chaque fonction qui est restée allouée depuis le lancement de l'application et qui a été active depuis le dernier nettoyage de la mémoire. Cette valeur correspond à `inuse_space` pour Go. Il s'agit d'une mesure très utile pour étudier l'utilisation globale de la mémoire pour votre service.               |
| Heap Count               | Affiche le nombre d'objets alloués en mémoire de tas par chaque fonction, ainsi que les objets qui sont restés alloués depuis le lancement de l'application et qui ont été actives depuis le dernier nettoyage de la mémoire. Il s'agit d'une mesure très utile pour étudier l'utilisation globale de la mémoire pour votre service.                              |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/send_traces/#configure-your-environment
[2]: /fr/tracing/visualization/#services