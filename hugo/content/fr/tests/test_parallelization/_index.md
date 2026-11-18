---
description: Réduisez le temps de test CI en répartissant les fichiers de test sur
  des nœuds ou des workers CI grâce aux données Test Optimization.
further_reading:
- link: https://www.datadoghq.com/blog/ci-cd-optimization/
  tag: Blog
  text: Livrez plus rapidement, améliorez la fiabilité et maîtrisez les coûts de CI
    avec Datadog CI/CD Optimization
title: Parallélisation des tests
---
## Présentation {#overview}

Test Parallelization vous aide à raccourcir les exécutions de tests et à utiliser les ressources CI plus efficacement en répartissant les fichiers de test entre les nœuds CI ou les workers locaux. Test Parallelization utilise les données de durée de test issues de Test Optimization pour équilibrer la charge de travail afin que les nœuds CI terminent leur travail à peu près au même moment.

Associez Test Parallelization à [Test Impact Analysis][1] pour réduire davantage les coûts de CI. Test Impact Analysis ignore les tests non affectés par vos modifications de code. Test Parallelization réduit automatiquement le nombre de nœuds CI en fonction de la charge de travail restante. Cela permet d'économiser le coût et le temps liés au provisionnement et à la configuration de runners inutiles.

## Configuration {#setup}

Avant de configurer la parallélisation des tests, configurez [Test Optimization][2]. Configurez également, si vous le souhaitez, [Test Impact Analysis][1] si vous prévoyez de l'utiliser avec la parallélisation des tests. Ensuite, [choisissez votre fournisseur CI, votre langage et votre framework][3] et suivez les instructions.

## Compatibilité {#compatibility}

Test Parallelization est pris en charge pour les langages et frameworks suivants :

| Langage | Frameworks | Version minimale de la bibliothèque |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.42.0` ou version ultérieure |
| Python   | pytest | `ddtrace` package `4.11.0` ou version ultérieure |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest, WebdriverIO | `dd-trace` package `6.14.0` ou version ultérieure |

[WebdriverIO](/tests/test_parallelization/setup/?prog_lang=javascript&platform=webdriverio#webdriverio) nécessite le runner local avec Mocha ou Jasmine.

## Fonctionnement {#how-it-works}

La parallélisation des tests utilise la `ddtest` CLI pour planifier et exécuter les tests :

1. Exécutez `ddtest plan` une fois pour créer un nouveau `.testoptimization/` plan pour ce workflow, cette suite et cet environnement d'exécution.
2. Partagez le répertoire `.testoptimization/` avec chaque job CI qui exécute des tests.
3. Exécutez `ddtest run --ci-node <CI_NODE_INDEX>` dans chaque job CI pour n'exécuter que les fichiers assignés à ce nœud CI.

Pour des exemples à nœud unique et multi-nœuds, consultez [Set Up Test Parallelization][3].

## Étapes suivantes {#next-steps}

{{< whatsnext desc="Installez ddtest, configurez votre fournisseur CI et personnalisez la façon dont la parallélisation des tests divise les fichiers de test." >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}Configurez la parallélisation des tests{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}Configurez la parallélisation des tests{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Bonnes pratiques pour la parallélisation des tests.{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}Dépannage de la parallélisation des tests{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/test_impact_analysis/
[2]: /fr/tests/setup/
[3]: /fr/tests/test_parallelization/setup/