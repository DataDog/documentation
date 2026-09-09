---
further_reading:
- link: profiler/enabling
  tag: Documentation
  text: Activer le profileur en continu pour votre application
- link: getting_started/profiler
  tag: Documentation
  text: Prise en main du profileur
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Présentation du profiling continu en production dans Datadog
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: Centre d'apprentissage
  text: Diagnostiquez les problèmes de performance du code avec Continuous Profiler
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: Centre d'apprentissage
  text: Optimisez la latence des requêtes avec Profiling Timeline
title: Types de profils
---
Dans l'onglet {{< ui >}}Profiles{{< /ui >}}, vous pouvez voir tous les types de profils disponibles pour une langue donnée. Selon le langage et la version, les informations collectées sur votre profil diffèrent.

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,ddprof,full_host" >}}
{{< programming-lang lang="java" >}}

Une fois le profilage activé, les types de profils suivants sont collectés pour les [versions Java prises en charge][1] :


PROCESSEUR
: Le temps que chaque méthode a passé à s'exécuter sur le CPU. Il inclut votre code qui s'exécute dans la JVM (par exemple, Java, Kotlin), mais pas les opérations de la JVM ou le code natif appelé depuis la JVM.

Allocations
: Le nombre d'allocations du tas effectuées par chaque méthode, y compris les allocations qui ont été libérées par la suite.<br />
_Nécessite: Java 11_

Mémoire allouée
: La quantité de mémoire du tas allouée par chaque méthode, y compris les allocations qui ont été libérées par la suite.<br />
_Nécessite: Java 11_

Live Heap (v1.61.0+)
: Les objets et la mémoire alloués par chaque méthode qui n'ont pas encore été collectés par le ramasse-miettes. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles. Le profileur utilise automatiquement le moteur le plus précis disponible pour votre version de JVM.<br />
_Nécessite: Java 11+_

Wall Time
: Le temps écoulé par chaque méthode. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le processeur, attend des entrées/sorties, et tout ce qui se produit pendant l'exécution de la méthode.

Chargement de classe
: Le nombre de classes chargées par chaque méthode.

Exceptions levées
: Le nombre d'erreurs et d'exceptions levées par chaque méthode, ainsi que leur type.

File I/O
: Le temps que chaque méthode a passé à lire et à écrire dans des fichiers.

Lock
: Le temps que chaque méthode a passé à attendre un verrou.

Socket I/O
: Le temps que chaque méthode a passé à lire et à écrire en socket I/O.

[1]: /fr/profiler/enabling/java/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Une fois le profilage activé, les types de profils suivants sont collectés, en fonction de votre [version de Python][1] comme indiqué :


Wall Time
: Le temps écoulé utilisé par chaque fonction. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le processeur, attend des entrées/sorties, et tout ce qui se produit pendant que la fonction est en cours d'exécution.<br />
_Nécessite: Python 2.7+_

Temps d'attente de verrou
: Le temps que chaque fonction a passé à attendre un verrou.<br />
_Nécessite: Python 2.7+_

Temps de détention de verrou
: Le temps que chaque fonction a passé à détenir un verrou.<br />
_Nécessite: Python 2.7+_

Acquisitions de verrou
: Le nombre de fois que chaque fonction a acquis un verrou.<br />
_Nécessite: Python 2.7+_

Libérations de verrou
: Le nombre de fois que chaque fonction a libéré un verrou.<br />
_Nécessite : Python 2.7+_

PROCESSEUR
: Le temps que chaque fonction a passé à s'exécuter sur le CPU, y compris le code Python et le code natif.<br />
_Nécessite : Python 2.7+, plateforme POSIX_

Taille du tas en direct
: La quantité de mémoire du tas allouée par chaque fonction qui n'a pas encore été récupérée par le ramasse-miettes. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles.<br />
_Nécessite : Python 3.5+_

Mémoire allouée
: La quantité de mémoire du tas allouée par chaque fonction, y compris les allocations qui ont été libérées par la suite.<br />
_Nécessite : Python 3.5+_

Allocations
: Le nombre d'allocations du tas effectuées par chaque fonction, y compris les allocations qui ont été libérées par la suite.<br />
_Nécessite : Python 3.5+_

[1]: /fr/profiler/enabling/python/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Une fois le profilage activé, les types de profils suivants sont collectés pour les [versions de Go prises en charge][3] :


Temps CPU
: Le temps que chaque fonction a passé à s'exécuter sur le CPU. Le temps hors CPU, tel que l'attente réseau, les canaux, les mutex et le sommeil, n'est pas capturé dans ce profil. Voir les profils Mutex et Block.

Allocations
: Le nombre d'objets alloués par chaque fonction dans la mémoire du tas pendant la période de profilage (par défaut: 60s), y compris les allocations qui ont été libérées par la suite. Go appelle cela `alloc_objects`. Les allocations de pile ne sont pas suivies. Ceci est utile pour étudier la charge du ramasse-miettes. Voir aussi la note sur la façon dont cette mesure change dans la version `1.33.0` dans [Delta profiles](#delta-profiles).

Mémoire allouée
: La quantité de mémoire du tas allouée par chaque fonction durant la période de profilage (par défaut: 60s), y compris les allocations qui ont été libérées par la suite. Go appelle cela `alloc_space`. Les allocations de pile ne sont pas suivies. Ceci est utile pour étudier la charge du ramasse-miettes. Voir aussi la note sur la façon dont cette mesure change dans la version `1.33.0` dans [Delta profiles](#delta-profiles).

Objets vivants du tas
: Le nombre d'objets alloués par chaque fonction dans la mémoire du tas qui restent en usage après le ramasse-miettes. Go appelle cela `inuse_objects`. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles.

Taille du tas en direct
: La quantité de mémoire du tas allouée par chaque fonction qui reste en usage après le ramasse-miettes. Avec les paramètres par défaut (GOGC=100), cela représentera généralement ~50 % de l'utilisation RSS du processus. Go appelle cela `inuse_space`. Utilisez cette métrique pour examiner la consommation de mémoire et [diagnostiquer les fuites][4]. Pour plus de détails sur la façon dont Go gère la mémoire, consultez [Go memory metrics demystified][5] et [A Guide to the Go Garbage Collector][6].

Mutex
: Le temps pendant lequel les fonctions ont attendu sur des mutex durant la période de profilage (par défaut : 60s). Les traces de pile dans ce profil pointent vers l'opération `Unlock()` qui a permis à une autre goroutine bloquée sur le mutex de continuer. Les contentions de mutex courtes utilisant des spinlocks ne sont pas capturées par ce profil, mais peuvent être vues dans le profil CPU. Voir aussi la note sur la façon dont cette mesure change dans la version `1.33.0` dans [Delta profiles](#delta-profiles).

Block
Le temps pendant lequel les fonctions ont attendu sur des mutex et des opérations de channel pendant la période de profilage (par défaut : 60s). Sleep, GC, Network et Syscall ne sont pas capturés dans ce profil. Les opérations bloquantes ne sont capturées qu'après avoir été débloquées, ce profil ne peut donc pas être utilisé pour déboguer des applications qui semblent bloquées. Pour les contentions de mutex, les traces de pile dans ce profil pointent vers des opérations bloquées `Lock()`. Cela vous indique où votre programme est bloqué, tandis que le profil de mutex vous indique quelle partie de votre programme provoque la contention. Voir les recherches de Datadog sur le [Block Profiling in Go][1] pour des informations plus approfondies. Voir aussi la note sur la façon dont cette mesure change dans la version `1.33.0` dans [Delta profiles](#delta-profiles). **Note** : Le Block Profiler peut entraîner une surcharge notable pour les charges de travail en production. Si vous l'activez en production, préférez des taux élevés (tels que `100000000`, qui correspond à 100 millisecondes) et surveillez les signes d'augmentation de la latence ou de l'utilisation du CPU.

Goroutines
: Un instantané du nombre de goroutines exécutant actuellement les mêmes fonctions (à la fois sur CPU et en attente hors CPU). Un nombre croissant de goroutines entre les instantanés peut indiquer que le programme présente des fuites de goroutines. Dans la plupart des applications saines, ce profil est dominé par les pools de workers et le nombre de goroutines qu'ils utilisent. Les applications extrêmement sensibles à la latence et utilisant un grand nombre de goroutines (> 10 000) doivent être conscientes que l'activation de ce profil nécessite des pauses « stop-the-world ». Les pauses ne se produisent qu'une fois par période de profilage (par défaut 60s) et durent normalement environ `1µsec` par goroutine. Les applications typiques avec un SLO de latence p99 d'environ `100ms` peuvent généralement ignorer cet avertissement. Voir les recherches de Datadog sur le [Goroutine Profiling in Go][2] pour des informations plus approfondies.

#### Delta profiles {#delta-profiles}
<div class="alert alert-info">Dans les versions du Go Profiler antérieures à <code>1.33.0</code>, les métriques Allocations, Mémoire allouée, Mutex et Bloc sont affichées en tant que mesures <em>accumulées depuis le démarrage du processus</em>, par opposition à <em>pendant la période de profilage</em>. Le passage aux profils delta dans la version <code>1.33.0</code> vous permet de voir comment ces mesures changent au lieu de s'accumuler. Le profilage delta est activé par défaut. La version du profileur <code>1.35.0</code> vous permet de désactiver les profils delta en utilisant l'option <code>WithDeltaProfiles</code> option. <br/><br/>À partir de la version du profileur <code>1.37.0</code>, les profils accumulés ne sont plus téléchargés lorsque le profilage delta est activé afin de réduire l'utilisation de la bande passante de téléchargement. <a href="/help/">Contactez le support</a> pour discuter de votre cas d'utilisation si vous dépendez des profils accumulés complets.</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
[3]: /fr/profiler/enabling/go#requirements
[4]: /fr/profiler/guide/solve-memory-leaks
[5]: https://www.datadoghq.com/blog/go-memory-metrics/
[6]: https://go.dev/doc/gc-guide
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Une fois le profilage activé, les types de profils suivants sont collectés pour les [versions Ruby prises en charge][1] :

PROCESSEUR
: Le temps que chaque fonction a passé à s'exécuter sur le CPU, y compris le code Ruby et le code natif.

Wall Time
: Le temps écoulé utilisé par chaque fonction. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le CPU, attend des entrées/sorties, et tout ce qui se produit pendant que la fonction est en cours d'exécution.

Allocations (v2.3.0+)
: Le nombre d'objets alloués par chaque méthode pendant la période de profilage (par défaut: 60s), y compris les allocations qui ont été libérées par la suite. Ceci est utile pour étudier la charge du ramasse-miettes.<br />
_Requis :_ [Activation manuelle][2]

Objets vivants du tas (Aperçu, v2.18.0+)
: Le nombre d'objets alloués par chaque méthode dans la mémoire tas qui n'ont pas encore été collectés par le ramasse-miettes. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles.<br />
_Nécessite: Ruby 3.1+_ et [une activation manuelle][2]

Taille réelle du tas (Aperçu, v2.18.0+)
: La quantité de mémoire tas allouée par chaque méthode qui n'a pas encore été récupérée par le ramasse-miettes. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles.<br />
_Nécessite : Ruby 3.1+_ et [une activation manuelle][2] (Actuellement non compatible avec Ruby 4)

Profilage GVL (dans la chronologie) (v2.11.0+)
: Enregistre le temps pendant lequel les threads sont empêchés de travailler par d'autres threads « voisins bruyants », y compris les threads d'arrière-plan. Ceci est utile pour étudier les pics de latence dans l'application lors de l'utilisation de la visualisation chronologique.<br />
_Nécessite : Ruby 3.2+_

[1]: /fr/profiler/enabling/ruby/#requirements
[2]: /fr/profiler/enabling/ruby/#configuration
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Une fois le profilage activé, les types de profils suivants sont collectés pour les [versions de Node.js prises en charge][1] :

PROCESSEUR
: Le temps que chaque fonction a passé à s'exécuter sur le CPU, y compris le code JavaScript et le code natif.<br />
: Le profilage CPU est disponible sur Linux et macOS. Cette fonctionnalité n'est pas disponible sur Windows.

Wall Time
: Le temps écoulé utilisé par chaque fonction. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le CPU, attend des entrées/sorties, et tout ce qui se produit pendant que la fonction est en cours d'exécution.

Objets vivants du tas
: Le nombre d'objets alloués par chaque fonction dans la mémoire tas qui n'ont pas encore été récupérés par le ramasse-miettes. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles.

Taille du tas en direct
: La quantité de mémoire du tas allouée par chaque fonction qui n'a pas encore été récupérée par le ramasse-miettes. Ceci est utile pour étudier l'utilisation globale de la mémoire de votre service et identifier les fuites de mémoire potentielles.
: Les traces de pile profondes dans les profils de taille réelle du tas sont tronquées à 64 frames.

Mémoire allouée (Aperçu)
: La quantité de mémoire du tas allouée par chaque fonction, y compris les allocations qui ont été libérées par la suite.<br />
_Nécessite: Node.js 26+ et `DD_PROFILING_ALLOCATION_ENABLED=true`_

Allocations (Aperçu)
: Le nombre d'allocations du tas effectuées par chaque fonction, y compris les allocations qui ont été libérées par la suite.<br />
_Nécessite : Node.js 26+ et `DD_PROFILING_ALLOCATION_ENABLED=true`_

[1]: /fr/profiler/enabling/nodejs/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Une fois le profilage activé, les types de profils suivants sont collectés pour les [versions .NET prises en charge][1] :

Wall Time
: Le temps écoulé passé dans les méthodes gérées. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le processeur, attend des entrées/sorties, et tout ce qui se produit pendant l'exécution de la méthode.

CPU (v2.15+)
: Le temps que chaque méthode a passé à s'exécuter sur le CPU.

Exceptions levées (v2.31+)
: Le nombre d'exceptions interceptées ou non interceptées levées par chaque méthode, ainsi que leur type et leur message.

Allocations (v3.28+)
: Le nombre et la taille des objets alloués par chaque méthode, ainsi que leur type.
Pour .NET Framework, la taille n'est pas disponible.<br />
_Nécessite: .NET Framework (avec Datadog Agent 7.51+ et v3.2+) / .NET 6+, mais Datadog recommande .NET 10+ pour un échantillonnage plus précis.

Verrou (v2.49+)
: Le nombre de fois où les threads attendent un verrou et pendant combien de temps.<br />
_Nécessite: .NET Framework (nécessite Datadog Agent 7.51+) / .NET 5+_

Tas actif (v3.28+)
: Un sous-ensemble des objets alloués (avec leur nom de classe) qui sont toujours en mémoire.<br />
_Nécessite: .NET 7+ mais Datadog recommande .NET 10+ pour un échantillonnage plus précis.

Requêtes HTTP sortantes (dans la chronologie) (Aperçu, v3.19+)
: Début et fin des requêtes HTTP sortantes avec la durée des différentes phases (DNS, handshake de sécurité, socket, requête/réponse) et les redirections inattendues possibles.<br />
_Nécessite : .NET 7+_

Durée de vie des threads (dans la chronologie) (v3.19+)
: Début et fin de la durée de vie des threads pour détecter facilement la famine du ThreadPool et les threads à courte durée de vie.<br />
_Nécessite : .NET Framework (avec Datadog Agent 7.51+ et v3.2+) / .NET 5+_

Consommation CPU du Garbage Collector (v3.19+)
: Le temps que les threads du Garbage Collector ont passé à s'exécuter sur le CPU.<br />
_Nécessite : .NET Framework (avec Datadog Agent 7.51+ et v3.2+) / .NET 5+_

**Remarque** : Avant .NET 10, le profilage {{< ui >}}Allocations{{< /ui >}} et {{< ui >}}Live Heap{{< /ui >}} peut montrer davantage les objets plus volumineux que les plus petits en raison de l'algorithme d'échantillonnage utilisé par le runtime .NET. Datadog recommande d'utiliser .NET 10+ pour des résultats statistiquement plus corrects.


[1]: /fr/profiler/enabling/dotnet/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Une fois le profilage activé, les types de profils suivants sont collectés pour les [versions PHP prises en charge][1] :

Wall Time
: Le temps écoulé utilisé par chaque fonction. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le CPU, attend des entrées/sorties, et tout ce qui se produit pendant que la fonction est en cours d'exécution.

PROCESSEUR
: Affiche le temps que chaque fonction a passé à s'exécuter sur le CPU.

Allocations (v0.88+)
: Le nombre d'allocations par chaque fonction pendant la période de profilage (par défaut: 67s), y compris les allocations qui ont été libérées par la suite. Les allocations de pile ne sont pas suivies.<br />
_Remarque: Non disponible lorsque le JIT est actif sur PHP `8.0.0`-`8.1.20` et `8.2.0`-`8.2.7`_

Mémoire allouée (v0.88+)
: La quantité de mémoire tas allouée par chaque fonction pendant la période de profilage (par défaut: 67s), y compris les allocations qui ont été libérées par la suite. Les allocations de pile ne sont pas suivies.<br />
_Remarque : Non disponible lorsque le JIT est actif sur PHP `8.0.0`-`8.1.20` et `8.2.0`-`8.2.7`_

Exceptions levées (v0.92+)
: Le nombre d'exceptions interceptées ou non interceptées levées par chaque méthode, ainsi que leur type.

E/S de fichier (Aperçu, v1.7.2+)
: Le temps que chaque méthode a passé à lire et à écrire dans des fichiers, ainsi que la quantité d'octets lus et écrits dans des fichiers.

E/S de socket (Aperçu, v1.7.2+)
: Le temps que chaque méthode a passé à lire et à écrire dans un socket, ainsi que la quantité d'octets lus et écrits dans des sockets.

[1]: /fr/profiler/enabling/php/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ddprof" >}}

Une fois le profilage activé, les types de profil suivants sont collectés pour les [langages et versions pris en charge][1] :

PROCESSEUR
: Le temps que chaque fonction a passé à s'exécuter sur le CPU.

Allocations
: Le nombre d'allocations par chaque fonction pendant la période de profilage (par défaut: 59s), y compris les allocations qui ont été libérées par la suite. Les allocations de pile ne sont pas suivies.

Mémoire allouée
: La quantité de mémoire de tas allouée par chaque fonction pendant la période de profilage (par défaut : 59s), y compris les allocations qui ont été libérées par la suite. Les allocations de pile ne sont pas suivies.

[1]: /fr/profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< programming-lang lang="full_host" >}}

Une fois le profilage activé, les types de profil suivants sont collectés pour les [langages et versions pris en charge][1] :

Temps CPU (eBPF)
: Temps que chaque méthode ou fonction a passé à s'exécuter sur le CPU. Dans les programmes multithread, le temps CPU peut être supérieur au temps écoulé : si 2 threads s'exécutent pendant 45s chacun, vous verrez « Temps CPU eBPF, 1m 30s par minute ».

[1]: /fr/profiler/enabling/full_host/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}




## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}