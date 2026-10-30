---
disable_sidebar: true
further_reading:
- link: /profiler/enabling
  tag: Documentation
  text: Activation du profileur
title: Versions de langage et de bibliothèques pour les fonctionnalités du profileur
---
Les tableaux suivants résument les fonctionnalités disponibles pour chaque runtime de langage.
Les - **versions minimales** sont requises pour accéder à au moins une fonctionnalité. Si vous disposez d'une version antérieure, le profilage n'est pas disponible.
Les - **versions avec fonctionnalités complètes** vous donnent accès à **toutes** les fonctionnalités prises en charge. Il est généralement préférable de mettre à jour vers la dernière version de tous les SDK.

<div class="alert alert-info">Pour plus de détails, cliquez sur l'en-tête de langage dans n'importe quel tableau pour accéder à la page de configuration de ce langage.</div>

## Versions du runtime et du SDK {#runtime-and-sdk-versions}

Pour utiliser le profileur Datadog, utilisez au moins les versions minimales résumées dans le tableau suivant. Pour connaître la disponibilité des types de profil par version, consultez [Types de profil](#profile-types).

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>Version minimale du runtime</strong> | [JDK 8+][17]  | Python 2.7+ | [version majeure précédente de Go][21] | Ruby 2.5+ | Node.js 18+ | .NET Core 2.1+, .NET 5+, .NET Framework 4.6.1+ | PHP 7.1+ |                 |
| <strong>Version du runtime avec fonctionnalités complètes</strong>       | [JDK 11+][17] | Python 3.6+ | [dernière version majeure de Go][21] | Ruby 3.2+ | Node.js 18+ |                              .NET 7+                               | PHP 8.0+ |                 |
| <strong>Version du SDK avec fonctionnalités complètes</strong>        | [dernière][9]  |   [dernière][10]   | [dernière][11]  |  [dernière][12]  | [dernière][13]  |                              [dernière][14]                               | [dernière][15]  |  [dernière][16]   |

## Types de profil {#profile-types}

Le tableau suivant indique la disponibilité des types de profil par langage. Pour des performances optimales et un accès à toutes les fonctionnalités, Datadog recommande d'utiliser la dernière version du SDK pour votre langage. Si une version spécifique du runtime n'est pas indiquée, le type de profil est disponible avec la version minimale du runtime répertoriée dans les [Versions du runtime et du SDK](#runtime-and-sdk-versions).


| <div style="width:150px"><div>    |                     [Java][1]                     | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------------------------------------------------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="PROCESSEUR" >}}Le temps que chaque fonction/méthode a passé à s'exécuter sur le processeur.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}  | {{< tooltip glossary="aperçu" case="title" >}} |
| {{< ci-details title="Exceptions" >}}Le nombre d'exceptions levées, y compris celles qui ont été interceptées.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | {{< X >}} | {{< X >}}  | |
| {{< ci-details title="Quota" >}}Nombre et tailles des allocations mémoire effectuées par chaque fonction/méthode, y compris les allocations qui ont été libérées par la suite.{{< /ci-details >}}   |                [JDK 11+][17]                 | Python 3.6+ | {{< X >}} | {{< X >}} | {{< tooltip glossary="aperçu" case="title" >}}<br>Node.js 26+ | {{< tooltip glossary="aperçu" case="title" >}}<br>.NET 6+ <br>(.NET 10 recommandé)| {{< X >}} | {{< tooltip glossary="aperçu" case="title" >}} |
| {{< ci-details title="Heap" >}}La quantité de mémoire allouée dans le tas qui reste utilisée.{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+ | {{< X >}} | {{< tooltip glossary="aperçu" case="title" >}}<br>Ruby 3.1+<br>La taille active du tas n'est actuellement pas compatible avec Ruby 4 | {{< X >}} | {{< tooltip glossary="aperçu" case="title" >}}<br>.NET 7+ <br>(.NET 10 recommandé) | | {{< tooltip glossary="aperçu" case="title" >}} |
| {{< ci-details title="Wall time" >}}Le temps écoulé passé dans chaque fonction/méthode. Le temps écoulé inclut le temps pendant lequel le code s'exécute sur le processeur, attend des entrées/sorties, et tout ce qui se produit pendant que la fonction/méthode est en cours d'exécution.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Verrous" >}}Le temps que chaque fonction/méthode a passé à attendre et à détenir des verrous, ainsi que le nombre de fois où chaque fonction a acquis un verrou.{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | | | .NET 5+ | | |
| {{< ci-details title="E/S" >}}Le temps que chaque méthode a passé à lire et à écrire dans des fichiers et des sockets.{{< /ci-details >}}   |                 {{< X >}}                 | | | | | | {{< tooltip glossary="aperçu" case="title" >}} | |

## Autres fonctionnalités {#other-features}

Le tableau suivant présente les fonctionnalités de profilage supplémentaires par langage. Pour une fonctionnalité complète et des performances optimales, Datadog recommande d'utiliser la dernière version du SDK de votre langage. Si une version spécifique du runtime n'est pas indiquée, la fonctionnalité est disponible avec la version minimale du runtime indiquée dans les [Versions du runtime et du SDK](#runtime-and-sdk-versions).

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="Intégration de Trace avec Profiling" >}}Trouvez les lignes de code spécifiques liées aux problèmes de performance. <a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">En savoir plus</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Profilage des endpoints" >}}Identifiez les endpoints qui constituent des goulots d'étranglement ou qui sont responsables d'une forte consommation de ressources. <a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">En savoir plus</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Vue chronologique" >}}Affichez les modèles temporels et la répartition du travail sur la période d'un span. <a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">En savoir plus</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="Fuites de mémoire" >}}Un workflow guidé pour faciliter l'enquête sur les fuites de mémoire. <a href="/profiler/guide/solve-memory-leaks/">En savoir plus</a>{{< /ci-details >}}   | {{< X >}} | | {{< X >}} | | {{< X >}} | {{< X >}} | | |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/profiler/enabling/?prog_lang=java
[2]: /fr/profiler/enabling/?prog_lang=python
[3]: /fr/profiler/enabling/?prog_lang=go
[4]: /fr/profiler/enabling/?prog_lang=ruby
[5]: /fr/profiler/enabling/?prog_lang=node_js
[6]: /fr/profiler/enabling/?prog_lang=dot_net
[7]: /fr/profiler/enabling/?prog_lang=php
[8]: /fr/profiler/enabling/?prog_lang=rust
[9]: https://github.com/DataDog/dd-trace-java/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-go/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-js/releases
[14]: https://github.com/DataDog/dd-trace-dotnet/releases
[15]: https://github.com/DataDog/dd-trace-php/releases
[16]: https://github.com/DataDog/ddprof/releases
[17]: /fr/profiler/enabling/?prog_lang=java#requirements
[18]: /fr/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[19]: /fr/profiler/connect_traces_and_profiles/#endpoint-profiling
[20]: /fr/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[21]: https://go.dev/doc/devel/release