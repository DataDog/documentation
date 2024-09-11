---
aliases:
- /fr/tracing/profiling/intro_to_profiling
- /fr/tracing/profiler/intro_to_profiling
further_reading:
- link: /profiler/
  tag: Documentation
  text: Profileur en continu
- link: /profiler/enabling/
  tag: Documentation
  text: Activer le profileur
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: Centre d'apprentissage
  text: Présentation d'Application Performance Monitoring
- link: https://www.datadoghq.com/blog/engineering/how-we-optimized-our-akka-application-using-datadogs-continuous-profiler/
  tag: GitHub
  text: Comment nous avons optimisé notre application Akka grâce au profileur en continu
    Datadog
title: Premiers pas avec le profileur en continu
---

Le profiling est censé améliorer la rapidité et la fiabilité de vos services tout en réduisant leurs coûts. Toutefois, sans une certaine expérience avec un profileur, il peut être difficile d'obtenir de tels avantages.

Ce guide présente le fonctionnement du profiling, en se basant sur un exemple de service problématique. Vous découvrirez comment le profileur en continu Datadog permet de mieux comprendre le problème et de le corriger.

## Présentation

Un profileur affiche la quantité de travail effectué par chaque fonction en recueillant des données sur le programme lors de son exécution. Par exemple, si la surveillance de l'infrastructure indique que les serveurs de votre application utilisent 80 % de leur CPU, il peut être intéressant de déterminer ce qui entraîne une telle utilisation. Le profiling présente la répartition du travail. Exemple :

| Fonction      | Utilisation du CPU |
|---------------|-----------|
| `doSomeWork`  | 48 %       |
| `renderGraph` | 19 %       |
| Autre         | 13 %       |

Ces informations contribuent grandement à la résolution des problèmes de performance. En effet, de nombreux programmes consacrent la plupart de leur temps à effectuer des tâches à quelques emplacements, dont certains ne sont pas faciles à identifier. Les ingénieurs perdent énormément de temps à essayer de deviner les parties du programme qu'ils doivent améliorer, et obtiennent rarement de bons résultats. En utilisant un profileur, vous pouvez identifier avec précision les sections de votre code à améliorer.

Si vous utilisez un outil d'APM, le profiling s'apparente à un traceur plus précis qui fournit une vision détaillée de votre code, sans la moindre instrumentation.

Le profileur en continu Datadog peut surveiller un grand nombre d'opérations, notamment l'utilisation du CPU, les types et la quantité d'objets alloués à la mémoire, le temps d'attente avant l'acquisition de verrous, le volume de l'E/S du réseau ou des fichiers, et plus encore. Les types de profils disponibles varient en fonction du langage en question.

## Configuration

### Prérequis

Avant de commencer, vérifiez que vous disposez des ressources suivantes :

1. [docker-compose][1]
2. Un compte Datadog et une [clé d'API][2]. Si vous n'avez pas de compte Datadog, [inscrivez-vous pour bénéficier d'un essai gratuit][3].

### Installation

Le référentiel [dd-continuous-profiler-example][4] contient un exemple de service problématique vous permettant de tester le profiling. Une API est incluse : elle permet d'effectuer des recherches parmi une « base de données » de 5 000 films.

Installez et exécutez l'exemple de service :

```shell
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

### Validation

Une fois les conteneurs créés et exécutés, vous pouvez accéder à un conteneur de testing afin de prendre en main les fonctionnalités de profiling :

```
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
```

Utilisez l'API avec :
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

Il existe également une version Python de l'exemple de service, `movies-api-py`. Si vous préférez utiliser cette version, ajustez les commandes de ce guide.

### Générer des données

Générez du trafic à l'aide de l'outil ApacheBench [ab][5]. Exécutez-le pour 10 clients HTTP simultanés, en envoyant des requêtes pendant 20 secondes. Depuis le conteneur de testing, exécutez ce qui suit :

```shell
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

Exemple de sortie :

```text
...
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%    464
  66%    503
  75%    533
  80%    553
  90%    614
  95%    683
  98%    767
  99%    795
 100%    867 (longest request)
```

## Analyser les résultats

### Lire le profil

Utilisez la [fonctionnalité de recherche de profil][6] pour trouver le profil couvrant la période durant laquelle vous avez généré du trafic. Le chargement de la recherche peut prendre une à deux minutes. Le profil avec le test de charge possède une utilisation élevée du CPU :

{{< img src="profiler/intro_to_profiling/list.png" alt="Liste des profils" style="width:80%;">}}

Lorsque vous ouvrez le profil, une visualisation s'affiche :

{{< img src="profiler/intro_to_profiling/flame_graph.png" alt="Flamegraph">}}

Il s'agit d'un flamegraph. Parmi les informations affichées, vous pouvez notamment voir l'utilisation du CPU par méthode (puisqu'il s'agit d'un profil CPU), ainsi que le type d'appel de chaque méthode. Par exemple, grâce à la deuxième ligne en partant du haut, vous découvrez que `Thread.run()` a appelé, entre autres, `QueuedThreadPool$2.run()`, qui a appelé `QueuedThreadPool.runjob(Runnable)`, qui a à son tour appelé `ReservedTheadExecutor$ReservedThread.run()`, etc.

Si vous zoomez sur le bas du framegraph, une infobulle vous informe que le CPU a consacré environ 309 ms (0,90 % de son temps) dans cette fonction `parse()` :

{{< img src="profiler/intro_to_profiling/flame_graph_parse.png" alt="Frame parse() du flamegraph">}}

`String.length()` se trouve directement sous la fonction `parse()`. Cela signifie que c'est `parse()` qui l'a appelé. Lorsque vous passez votre curseur sur `String.length()`, vous pouvez voir que cette fonction utilise le CPU pendant 112 ms.

{{< img src="profiler/intro_to_profiling/flame_graph_length.png" alt="Frame String.length() du flamegraph">}}

Vous pouvez en déduire que le CPU a consacré réellement 197 ms (309 - 112) pour `parse()`. Cette différence est représentée par l'espace vide sous le frame `parse()`.

Attention : le flamegraph ne représente _pas_ une évolution temporelle. Si vous regardez cette partie du profil, vous pouvez voir que `Gson$1.write()` ne s'est pas exécuté avant `TypeAdapters$16.write()`, mais peut-être pas après non plus.

{{< img src="profiler/intro_to_profiling/flame_graph_write.png" alt="Section du flamegraph avec les frames write() côte à côte">}}

 En effet, il est possible que les deux fonctions aient été exécutées simultanément. Il se peut également que le programme ait exécuté plusieurs appels d'une fonction, plusieurs appels de l'autre fonction, puis qu'il ait continué à basculer d'une fonction à une autre. Le flamegraph fusionne toutes les occurrences d'exécution d'une même série de fonctions. Ainsi, vous pouvez identifier rapidement les parties du code qui utilisent le plus de CPU, sans avoir à étudier des centaines de lignes pour chaque appel de fonction.

Si vous dézoomez, vous pouvez voir que 87 % de l'utilisation du CPU concerne la méthode `replyJSON()`. Sous celle-ci, le graphique affiche `replyJSON()`. Les méthodes qu'elle appelle sont réparties en quatre principaux chemins de code (ou stack traces) qui exécutent des fonctions associées au tri et au parsing de dates :

{{< img src="profiler/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="Flamegraph avec des flèches indiquant les stack traces sous replyJSON()">}}

Enfin, vous pouvez également voir cette partie du profil CPU :

{{< img src="profiler/intro_to_profiling/flame_graph_gc.png" alt="Flamegraph illustrant le nettoyage de la mémoire (garbage collection)" style="width:80%;">}}

### Types de profils

Le CPU a consacré quasiment 6 % de son temps au nettoyage de la mémoire. Ainsi, il est probable que nos services génèrent une grosse quantité de « déchets ». Étudiez donc le type de profil **Allocated Memory** :

{{< img src="profiler/intro_to_profiling/types.png" alt="Sélecteur de type de profil" style="width:60%;">}}

Sur ce profil, la taille des lignes indique la quantité de mémoire allouée à chaque fonction, ainsi que la pile d'appels à l'origine des fonctions qui allouent de la mémoire. Sur une période d'une minute, vous pouvez voir que la méthode `replyJSON()`, ainsi que les autres méthodes qu'elle appelle, ont alloué 17,47 Gio, principalement pour le même code de parsing de dates que dans le profil CPU :

{{< img src="profiler/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="Flamegraph du profil d'allocation avec des flèches indiquant les stack traces sous replyJSON()">}}

## Remédiation

### Corriger le code

Examinez le code pour mieux comprendre ce qu'il se passe. D'après le flamegraph CPU, ces chemins de code problématiques passent par une fonction Lambda à la ligne 66, qui appelle `LocalDate.parse()` :

{{< img src="profiler/intro_to_profiling/flame_graph_sort_lambda.png" alt="Flamegraph avec le curseur sur la fonction lambda de tri">}}

Cela correspond à la partie du code ci-dessous dans [`dd-continuous-profiler-example`][7], où s'effectue l'appel de `LocalDate.parse()` :

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    // Problème : une datetime est parsée pour chaque élément à trier.
    // Exemple de solution :
    //   Puisque la date est déjà au format (aaaa-mm-jj) les valeurs sont facilement triables avec un tri de chaîne standard.
    //   `return m.releaseDate`
    try {
      return LocalDate.parse(m.releaseDate);
    } catch (Exception e) {
      return LocalDate.MIN;
    }
  }).reversed());
}
```

Il s'agit de la logique de tri de l'API. Elle renvoie les résultats par ordre décroissant de date de sortie. Pour effectuer ce tri, la date de sortie est convertie en `LocalDate`, qui est alors utilisée en tant que clé de tri. Pour gagner du temps, vous pourriez ajouter ces `LocalDate` au cache afin de parser seulement la date de sortie de chaque film, plutôt que d'effectuer le parsing pour chaque requête. Toutefois, il existe une solution encore plus simple. En effet, les dates sont parsées au format ISO 8601 (aaaa-mm-jj). Au lieu de les parser, vous pouvez donc tout simplement les trier en tant que chaînes.

Remplacez la logique `try` et `catch` par `return m.releaseDate;` :

```java
private static Stream<Movie> sortByDescReleaseDate(Stream<Movie> movies) {
  return movies.sorted(Comparator.comparing((Movie m) -> {
    return m.releaseDate;
  }).reversed());
}
```

Il ne vous reste plus qu'à générer à nouveau le code et à redémarrer le service :
```
docker-compose build movies-api-java
docker-compose up -d
```

### Test des modifications

Pour tester les résultats, générez de nouveau du trafic :

```shell
docker exec -it dd-continuous-profiler-example-toolbox-1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

Exemple de sortie :

```
Reported latencies by ab:
Percentage of the requests served within a certain time (ms)
  50%     82
  66%    103
  75%    115
  80%    124
  90%    145
  95%    171
  98%    202
  99%    218
 100%    315 (longest request)
```

Le 99e centile est passé de 795 ms à 218 ms. Globalement, votre code est quatre à six fois rapide qu'auparavant.

Repérez le [profil](#lire-le-profil) contenant le nouveau test de charge et regardez le profil CPU. Les éléments `replyJSON` du flamegraph représentent un pourcentage bien plus faible de l'utilisation totale du CPU que lors du précédent test :

{{< img src="profiler/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="Flamegraph avec les stack traces replyJSON() optimisées">}}

### Nettoyage

Une fois votre enquête terminée, procédez au nettoyage avec la commande suivante :

```shell
docker-compose down
```

## Recommandations

### Réduction des coûts

Une telle optimisation de l'utilisation du CPU peut entraîner d'importantes réductions des coûts. S'il s'agissait d'un véritable service, cette petite amélioration vous aurait permis d'utiliser seulement la moitié des serveurs, et ainsi d'économiser plusieurs milliers de dollars par an. Pas mal, pour 10 minutes de travail !

### Amélioration de votre service

Bien que ce guide aborde uniquement les bases, vous savez désormais comment vous servir du profiling. **[Activez à présent le profileur pour vos services][8]**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.docker.com/compose/install/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/signup
[4]: https://github.com/DataDog/dd-continuous-profiler-example
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /fr/profiler/enabling/