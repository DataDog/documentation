---
title: Rechercher des profils
kind: documentation
aliases:
  - /fr/tracing/profiling/search_profiles
further_reading:
  - link: tracing/profiler/enabling
    tag: Documentation
    text: Activer le profileur en continu pour votre application
  - link: getting_started/profiler
    tag: Documentation
    text: Débuter avec le profileur
  - link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
    tags: Blog
    text: Présentation du profiling continu en production dans Datadog
---
{{< img src="tracing/profiling/search_profiles.mp4" alt="Rechercher des profils en fonction de tags" video=true >}}

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
| CPU              | L'utilisation du processus, mesurée en cœurs. |
| Memory Allocation | Le débit d'allocation de mémoire pour le profiling. Cette valeur peut dépasser la quantité de mémoire de votre système, car la mémoire allouée peut faire l'objet d'un nettoyage au cours du processus. |



## Profils

Cliquez sur une ligne pour afficher un profil spécifique :

{{< img src="tracing/profiling/profiling_flamegraph.mp4" alt="Un profil spécifique" video=true >}}

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

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,linux" >}}
{{< programming-lang lang="java" >}}

{{< img src="tracing/profiling/profile.png" alt="Un profil spécifique">}}

Une fois les profils activés, les types suivants sont recueillis :


CPU
: Affiche la durée d'exécution de chaque méthode sur le processeur. Cela inclut le code qui s'exécute sur la JVM (Java, Kotlin, etc.), mais pas les opérations JVM ni le code natif appelé à partir de la JVM.

Allocations
: Affiche la quantité de mémoire de tas allouée par chaque méthode, y compris les allocations qui ont été libérées par la suite.

Wall Time in Native Code
: Affiche le temps passé en code natif. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la méthode. Ce profil n'inclut pas le temps passé lors de l'exécution du bytecode JVM, qui constitue généralement une grande partie du code de votre application.

Class Load
: Affiche le nombre de classes chargées par chaque méthode.

Thrown Exceptions
: Affiche le nombre d'erreurs et d'exceptions renvoyées par chaque méthode.

File I/O
: Affiche le temps passé par chaque méthode pour la lecture et l'écriture de fichiers.

Lock
: Affiche le temps passé par chaque méthode à attendre un verrouillage.

Socket I/O
: Affiche le temps passé par chaque méthode pour la lecture et l'écriture du socket E/S.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Une fois les profils activés, les types suivants sont recueillis :


CPU
: Affiche la durée d'exécution de chaque fonction sur le processeur, y compris le code Python et natif.

Wall Time
: Affiche la durée de chaque fonction. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la fonction.

Heap Live Size
: Affiche la quantité de mémoire de tas allouée par chaque fonction qui n'a pas (encore) fait l'objet d'un nettoyage de la mémoire. Il s'agit d'une mesure très utile pour étudier l'utilisation globale de la mémoire pour votre service et pour identifier les pertes de mémoire éventuelles.

Allocated Memory
: Affiche la quantité de mémoire de tas allouée par chaque fonction, y compris pour les allocations qui ont été libérées par la suite. Uniquement disponible avec Python 3.

Allocations
: Affiche le nombre d'allocations de tas effectuées par chaque fonction, y compris les allocations qui ont été libérées par la suite.

Thrown Exceptions
: Affiche le nombre d'exceptions interceptées ou non provenant de chaque fonction.

Lock Wait Time
: Affiche le temps passé par chaque fonction à attendre un verrouillage.

Locked Time
: Affiche le temps passé par chaque fonction à maintenir un verrouillage.

Lock Acquires
: Affiche le nombre d'acquisitions d'un verrouillage de chaque fonction.

Lock Releases
: Affiche le nombre de libérations d'un verrouillage de chaque fonction.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Une fois les profils activés, les types suivants sont recueillis :


CPU Time
: Affiche la durée d'exécution de chaque fonction sur le processeur. Ce profil n'enregistre pas le temps écoulé en dehors du CPU, notamment pour le réseau, les canaux, les mutex et les mises en veille. Pour obtenir ces durées, consultez les profils Mutex et Block.

Allocations
: Affiche le nombre d'objets alloués par chaque fonction dans la mémoire de tas pendant la période de profiling (valeur par défaut : 60s), y compris pour les allocations qui ont été libérées par la suite. Cette valeur correspond à `alloc_objects` pour Go. Les allocations de piles ne font pas l'objet d'un suivi. Il s'agit d'un profil très utile pour étudier la charge de nettoyage de la mémoire. Consultez également la note sur les modifications de cette mesure avec la version `1.33.0` dans les [profils delta](#profils-delta).

Allocated Memory
: Affiche la quantité de mémoire de tas allouée par chaque fonction lors de la période de profiling (valeur par défaut : 60s), y compris pour les allocations qui ont été libérées par la suite. Cette valeur correspond à `alloc_space` pour Go. Les allocations de piles ne font pas l'objet d'un suivi. Il s'agit d'un profil très utile pour étudier la charge de nettoyage de la mémoire. Consultez également la note sur les modifications de cette mesure avec la version `1.33.0` dans les [profils delta](#profils-delta).

Heap Live Objects
: Affiche le nombre d'objets alloués par chaque fonction dans la mémoire de tas qui n'ont pas (encore) fait l'objet d'un nettoyage de la mémoire. Cette valeur correspond à `inuse_objects` pour Go. Il s'agit d'un profil très utile pour étudier l'utilisation globale de la mémoire pour votre service et pour identifier les pertes de mémoire éventuelles.

Heap Live Size
: Affiche la quantité de mémoire de tas allouée par chaque fonction qui n'a pas (encore) fait l'objet d'un nettoyage de la mémoire. Cette valeur correspond à `inuse_space` pour Go. Il s'agit d'un profil très utile pour étudier l'utilisation globale de la mémoire pour votre service et pour identifier les pertes de mémoire éventuelles.

Mutex
: Affiche la durée pendant laquelle les fonctions ont attendu des mutex lors de la période de profiling (valeur par défaut : 60s). Les stack traces dans ce profil pointent vers l'opération `Unlock()` qui a autorisé l'exécution d'une autre goroutine bloquée sur le mutex. Les conflits de mutex de courte durée utilisant des spinlocks ne sont pas enregistrés par ce profil, mais peuvent être observés dans le profil CPU. Consultez également la note sur les modifications de cette mesure avec la version `1.33.0` dans les [profils delta](#profils-delta).

Block
: Affiche la durée pendant laquelle les fonctions ont attendu des mutex et des opérations de canal lors de la période de profiling (valeur par défaut : 60s). Les opérations de mise en veille, de nettoyage de la mémoire, d'appel système et réseau ne sont pas enregistrées dans ce profil. Les opérations de blocage sont enregistrées uniquement une fois qu'elles deviennent débloquées, ce qui fait que ce profil ne peut pas être utilisé pour effectuer le debugging d'applications qui semblent bloquées. Pour les conflits de mutex, les stack traces dans ce profil pointent vers les opérations `Lock()` bloquées, ce qui indique les emplacements où votre programme est bloqué. Le profil Mutex permet d'identifier quelle partie de votre programme est à l'origine du conflit. Référez-vous à notre documentation sur le [profiling de Block dans Go][1] (en anglais) pour en savoir plus. Consultez également la note sur les modifications de cette mesure avec la version `1.33.0` dans les [profils delta](#profils-delta).

**Remarque** : le profileur de blocage peut entraîner une surcharge considérable pour les workloads de production. Si vous l'activez dans un environnement de production, définissez des débits élevés (comme `100000000`, à savoir 100 ms) et vérifiez si votre latence ou charge CPU augmente.

Goroutines
: Affiche un snapshot du nombre de goroutines qui exécutent actuellement les mêmes fonctions (sur le processeur, ainsi que celles en attente en dehors du processeur). Une augmentation du nombre de goroutines entre les snapshots peut indiquer des pertes de goroutines dans le programme. Dans la plupart des applications saines, ce profil est principalement constitué de pools de workers et affiche le nombre de goroutines qu'ils utilisent. Pour les applications sensibles à la latence utilisant un grand nombre de goroutines (plus de 10 000), sachez que l'activation de ce profil nécessite des interruptions Stop-The-World O(N). Ces interruptions n'ont lieu qu'une fois pendant chaque période de profiling (valeur par défaut : 60s) et durent normalement `~1μsec` par goroutine. Les applications standard présentant un SLO de latence au 99e centile de `~100ms` peuvent généralement ignorer cet avertissement. Consultez notre documentation sur le [profiling de goroutines dans Go][2] (en anglais) pour en savoir plus.

#### Profils delta
<div class="alert alert-info"><strong>Remarque</strong> : pour les versions du profileur Go antérieures à <code>1.33.0</code>, les métriques Allocations, Allocated Memory, Mutex et Block sont affichées sous forme de mesures <em>depuis le lancement du processus</em>, et non de mesures <em>pendant la période de profiling</em>. La version <code>1.33.0</code> du profileur modifie les profils delta et vous permet d'observer l'évolution de ces métriques au lieu de consulter uniquement leur valeur totale. Vous pouvez télécharger les mesures cumulées recueillies à l'aide de l'icône <strong>Download Profile Data</strong>, en sélectionnant les options <code>block.pprof</code>, <code>heap.pprof</code> et <code>mutex.pprof</code>. <br/><br/>Il est possible que Datadog cesse de proposer la fonctionnalité de stockage des mesures cumulées dans ses prochaines versions. Si vous utilisez cette fonctionnalité, <a href="/help/">contactez l'assistance</a> afin de présenter votre scénario d'utilisation.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Une fois les profils activés, les types suivants sont recueillis :

CPU
: Affiche la durée d'exécution de chaque fonction sur le processeur, y compris le code Ruby et natif.

Wall Time
: Affiche la durée de chaque fonction. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la fonction.

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Une fois les profils activés, les types suivants sont recueillis :

Wall Time
: Affiche la durée de chaque fonction. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la fonction.

Heap Live Size
: Affiche la quantité de mémoire de tas allouée par chaque fonction qui n'a pas (encore) fait l'objet d'un nettoyage de la mémoire. Il s'agit d'un profil très utile pour étudier l'utilisation globale de la mémoire pour votre service et pour identifier les pertes de mémoire éventuelles.

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{< img src="tracing/profiling/profile_dotnet.png" alt="Un profil .NET">}}

Une fois le profil activé, le type suivant est recueilli :

Wall Time
: Affiche le temps passé dans des méthodes gérées. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la méthode. 

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Une fois les profils activés, les types suivants sont recueillis :

Wall Time
: Affiche la durée de chaque fonction. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la fonction.

{{< /programming-lang >}}
{{< programming-lang lang="linux" >}}

Une fois les profils activés, les types suivants sont recueillis :

CPU
: Affiche la durée d'exécution de chaque fonction sur le processeur.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/send_traces/#configure-your-environment
[2]: /fr/tracing/visualization/#services