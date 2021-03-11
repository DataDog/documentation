---
title: Présentation du profiling
kind: Documentation
---
Le profiling est censé améliorer la rapidité et la fiabilité de vos services tout en réduisant leurs coûts. Toutefois, sans une certaine expérience avec un profileur, ces avantages restent hors de portée.

Ce guide présente le fonctionnement du profiling en se basant sur un exemple de service problématique. Vous découvrirez comment le profileur en continu peut vous aider à identifier et à corriger les problèmes de performance.

## En quoi consiste le profiling ?

Un profileur indique la quantité de « travail » accompli par chaque fonction. Pour ce faire, il recueille des données sur le programme pendant son exécution. Les fonctionnalités de surveillance d'infrastructure peuvent par exemple identifier que les serveurs de votre application utilisent 80 % de leur CPU. Toutefois, vous ne savez pas ce qui justifie ce chiffre. À l'inverse, grâce au profiling, vous pouvez découvrir que la fonction `doSomeWork` utilise 48 % du CPU, la fonction `renderGraph` 19 %, etc. Cette logique se révèle particulièrement importante pour diagnostiquer les problèmes de performance. En effet, de nombreux programmes consacrent la majorité de leur temps à effectuer un faible nombre de tâches. Pourtant, il n'est pas toujours simple d'identifier la nature de ces tâches. Grâce à un profileur, nous pouvons toutefois déterminer les éléments du code à optimiser pour tirer pleinement profit de vos ressources.

Si vous utilisez un outil d'APM, le profiling s'apparente à un traceur plus précis qui fournit une vision extrêmement détaillée de votre code, sans la moindre instrumentation.

Le profileur en continu Datadog peut surveiller un grand nombre d'opérations, notamment l'utilisation du CPU, les types et la quantité d'objets alloués à la mémoire, le volume de l'E/S du réseau ou des fichiers, et plus encore. Les types de profils disponibles varient en fonction du langage en question.

Nous avons conçu un [exemple de service][1] avec un problème de performance. Vous pouvez vous en servir pour tester le profiling. Ce service dispose d'une API permettant d'interroger une « base de données » composée de 5 000 films. Nous nous baserons sur cette API pour résoudre le problème de performance. Ce guide vous explique la marche à suivre. Toutefois, si vous souhaitez suivre de votre côté les étapes, vous pouvez le faire depuis vos propres shell, navigateur et IDE.

## Prérequis

Vous aurez besoin des éléments suivants :
1. [docker-compose][2]
2. Un compte Datadog et une [clé d'API][3] (aucune clé d'application requise) ; si vous n'avez pas de compte Datadog, [inscrivez-vous pour bénéficier d'un essai gratuit][4]

## Exécution de l'exemple

Lancez l'exemple de service avec la commande suivante :
```
git clone https://github.com/DataDog/dd-continuous-profiler-example.git
cd dd-continuous-profiler-example
echo "DD_API_KEY=YOUR_API_KEY" > docker.env
docker-compose up -d
```

Une fois tous les conteneurs créés et exécutés, vous pouvez accéder à un conteneur de testing afin de prendre en main les fonctionnalités de profiling :
```
docker exec -it dd-continuous-profiler-example_toolbox_1 bash
```

Vous pouvez tester l'API avec la commande suivante :
```
curl -s http://movies-api-java:8080/movies?q=wars | jq
```

Il existe également une version Python de l'exemple de service, `movies-api-py`. Si vous préférez utiliser cette version, vous pouvez ajuster les commandes de ce guide pour Python.

## Création de références

Nous allons générer davantage de trafic à l'aide de l'outil ApacheBench [ab][5]. Notre service exécutera ainsi simultanément 10 clients HTTP, qui enverront des requêtes pendant 20 secondes. Depuis le conteneur de testing :
```
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
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

## Lecture d'un profil

Accédez à la fonctionnalité de [recherche de profil][6] et cherchez un profil couvrant la période durant laquelle nous avons généré du trafic. La recherche peut prendre une minute ou deux. Pour identifier le profil qui inclut le test de charge, recherchez celui avec une utilisation élevée du CPU :

{{< img src="tracing/profiling/intro_to_profiling/list.png" alt="Liste des profils" style="width:80%;">}}

Lorsque vous ouvrez le profil, une visualisation s'affiche :

{{< img src="tracing/profiling/intro_to_profiling/flame_graph.png" alt="Flamegraph">}}

Il s'agit d'un flamegraph. Parmi les informations affichées, vous pouvez notamment voir l'utilisation du CPU par méthode (puisqu'il s'agit d'un profil CPU), ainsi que le type d'appel de chaque méthode. Par exemple, grâce à la deuxième ligne en partant du haut, on découvre que `Thread.run()` a appelé, entre autres, `QueuedThreadPool$2.run()`, qui a appelé `QueuedThreadPool.runjob(Runnable)`, qui a à son tour appelé `ReservedTheadExecutor$ReservedThread.run()`, etc.

Si nous agrandissons la fin du flamegraph, voici ce qui s'affiche :

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_parse.png" alt="Cadre parse() du flamegraph">}}

L'infobulle nous indique que le CPU a consacré 390 ms (soit 0,90 % de son temps) à la fonction `parse()`. `String.length()` se trouve directement sous `parse()`, ce qui signifie que `parse()` l'a appelé.

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_length.png" alt="Cadre String.length() du flamegraph">}}

Si nous passons notre curseur sur `String.length()`, nous pouvons voir que le CPU a consacré environ 122 ms à cette fonction. On en déduit donc que le CPU a consacré réellement 278 ms (390 - 112) pour `parse()`. Cette différence est représentée par l'espace vide sous le cadre `parse()`.

Il convient de noter que le flamegraph ne permet _pas_ de visualiser le temps écoulé, comme l'illustre cette partie du profil :

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_write.png" alt="Section du flamegraph avec les cadres write() côte à côte">}}

`Gson$1.write()` ne s'est pas exécuté avant `TypeAdapters$16.write()`, mais ne s'est peut-être pas non plus exécuté après. En effet, il est possible que les deux fonctions aient été exécutées simultanément. Il se peut également que le programme ait exécuté plusieurs appels d'une fonction, plusieurs appels de l'autre fonction, puis qu'il ait continué à basculer d'une fonction à une autre. Le flamegraph fusionne toutes les occurrences d'exécution d'une même série de fonctions. Ainsi, vous pouvez identifier rapidement les parties du code qui utilisent le plus de CPU, sans avoir à étudier des centaines de lignes pour chaque appel de fonction.

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_replyjson.png" alt="Flamegraph avec le curseur sur replyJSON()">}}

Si nous revenons à la vue d'ensemble du flamegraph, nous pouvons voir que 87 % du CPU ont été consacrés à la méthode `replyJSON()`. Examinons maintenant ce qui se trouve en dessous :

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_replyjson_arrows.png" alt="Flamegraph avec des flèches indiquant les stack traces sous replyJSON()">}}

Il apparaît que `replyJSON()`, et les méthodes qu'il appelle, se divisent en quatre chemins de code principaux (ou « stack traces »). Chacun de ces chemins exécute les fonctions associées au tri et au parsing de date.

Enfin, le profil CPU contient également la partie suivante :

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_gc.png" alt="Flamegraph illustrant le nettoyage de la mémoire" style="width:60%;">}}

## Types de profils

Puisque le CPU a consacré 6 % de son temps au nettoyage de la mémoire, il est probable que notre service génère une grosse quantité de « déchets ». Pour vérifier cela, nous allons utiliser le type de profil réservé à la mémoire allouée :

{{< img src="tracing/profiling/intro_to_profiling/types.png" alt="Sélecteur de type de profil" style="width:60%;">}}

Sur ce profil, la taille des lignes indique la quantité de mémoire allouée à chaque fonction, ainsi que la pile d'appels à l'origine des fonctions qui allouent de la mémoire. Sur une période d'une minute, nous pouvons voir que la méthode `replyJSON()`, ainsi que les autres méthodes qu'elle appelle, ont alloué 17,47 Gio, principalement pour le même code de parsing de date que dans le profil CPU :

{{< img src="tracing/profiling/intro_to_profiling/alloc_flame_graph_replyjson_arrows.png" alt="Flamegraph du profil d'allocation avec des flèches indiquant les stack traces sous replyJSON()">}}

## Correction du problème

Examinons à présent le code, pour mieux comprendre ce qu'il se passe. D'après le flamegraph CPU, ces chemins de code problématiques passent par une fonction Lambda à la ligne 66, qui appelle `LocalDate.parse()` :

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_sort_lambda.png" alt="Flamegraph avec le curseur sur la fonction lambda de tri">}}

Cela correspond au segment de code ci-dessous du fichier [`dd-continuous-profiler-example/java/src/main/java/movies-api/Server.java`][7]. Nous voyons en effet l'appel de `LocalDate.parse()` à la ligne 66 :

{{< img src="tracing/profiling/intro_to_profiling/slow_sort_code.png" alt="Code de tri lent">}}

Il s'agit de la logique de tri de l'API. Elle est utilisée pour renvoyer les résultats par ordre décroissant de date de sortie. Pour effectuer ce tri, la date de sortie est convertie en `LocalDate`, qui est alors utilisée en tant que clé de tri. Nous pourrions ajouter ces `LocalDate` au cache afin de parser une seule fois la date de sortie de chaque film, plutôt que d'effectuer le parsing pour chaque requête. Toutefois, il existe une solution encore plus simple. En effet, les dates sont parsées au format ISO 8601 (aaaa-mm-jj). Au lieu de les parser, nous pouvons donc tout simplement les trier en tant que chaînes !

Remplaçons la logique try/catch par `return m.releaseDate;` :

{{< img src="tracing/profiling/intro_to_profiling/optimized_sort_code.png" alt="Code de tri optimisé">}}

Il ne nous reste plus qu'à générer à nouveau le code et à redémarrer le service :
```
docker-compose build movies-api-java
docker-compose up -d
```

## Test des modifications

Voyons à présent si notre changement porte ses fruits. Comme précédemment, nous générons du trafic :
```
docker exec -it dd-continuous-profiler-example_toolbox_1 bash
ab -c 10 -t 20 http://movies-api-java:8080/movies?q=the
```

Voici les résultats obtenus :
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

Le 99e centile est passé de 795 ms à 218 ms. De manière générale, notre code est quatre à six fois rapide qu'auparavant !

Si vous accédez au profil comprenant ce nouveau test de charge et étudiez le profil CPU, vous découvrirez que les parties `replyJSON` du flamegraph représentent désormais un bien plus faible pourcentage de l'utilisation totale du CPU.

{{< img src="tracing/profiling/intro_to_profiling/flame_graph_optimized_replyjson.png" alt="Flamegraph avec les stack traces replyJSON() optimisées">}}

## Nettoyage

Une fois votre enquête terminée, vous pouvez procéder au nettoyage avec la commande suivante :
```
docker-compose down
```

## Réduction des coûts

Une telle optimisation de l'utilisation du CPU peut entraîner d'importantes réductions des coûts. S'il s'agissait d'un véritable service, cette petite amélioration nous aurait permis d'utiliser seulement la moitié des serveurs, et ainsi d'économiser plusieurs milliers de dollars par an. Pas mal, pour 10 minutes de travail !

## Amélioration de vos services

Bien que nous ayons seulement abordé les bases, vous savez désormais comment utiliser le profiling. **[Il ne vous reste plus qu'à utiliser ces fonctionnalités sur vos services][8]** !

{{< site-region region="us" >}}{{< /site-region >}}
{{< site-region region="eu" >}}{{< /site-region >}}

[1]: https://github.com/DataDog/dd-continuous-profiler-example
[2]: https://docs.docker.com/compose/install/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://app.datadoghq.com/signup
[5]: https://httpd.apache.org/docs/2.4/programs/ab.html
[6]: https://app.datadoghq.com/profiling?query=env%3Aexample%20service%3Amovies-api-java
[7]: https://github.com/DataDog/dd-continuous-profiler-example/blob/25819b58c46227ce9a3722fa971702fd5589984f/java/src/main/java/movies/Server.java#L66
[8]: /fr/tracing/profiler/getting_started/