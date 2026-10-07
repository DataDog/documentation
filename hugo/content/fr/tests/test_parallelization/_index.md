---
description: Réduisez le temps de test CI en répartissant les fichiers de test sur
  des nœuds ou des workers CI grâce aux données Test Optimization.
title: Parallélisation des tests
---
## Présentation {#overview}

La parallélisation des tests vous aide à réduire le temps de test CI en répartissant les fichiers de test sur des nœuds CI ou des workers locaux. Elle utilise les données Test Optimization pour détecter les fichiers de test à exécuter, estimer leur durée et créer un plan d'exécution.

La parallélisation des tests est conçue pour fonctionner avec [Test Impact Analysis][1]. Test Impact Analysis ignore les tests qui ne sont pas affectés par une modification du code. La parallélisation des tests répartit uniformément les fichiers de test restants sur les nœuds CI sélectionnés.

Utilisez la parallélisation des tests lorsque votre collection de tests prend beaucoup de temps à s'exécuter. Lorsqu'elle est utilisée avec Test Impact Analysis, la parallélisation des tests n'exécute que les fichiers contenant des tests non ignorés. Cela permet également de réduire les coûts de CI en ne choisissant que le nombre de nœuds CI nécessaires, ce qui peut diminuer le nombre total de minutes CPU.

## Configuration {#setup}

Avant de configurer la parallélisation des tests, configurez [Test Optimization][2]. Configurez également, si vous le souhaitez, [Test Impact Analysis][1] si vous prévoyez de l'utiliser avec la parallélisation des tests. Suivez ensuite [Set Up Test Parallelization][3] pour installer `ddtest` et configurer votre fournisseur CI.

## Compatibilité {#compatibility}

La parallélisation des tests est prise en charge pour les langages et frameworks suivants :

| Langage | Frameworks | Version minimale de la bibliothèque |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.31.0` ou version ultérieure |
| Python   | pytest | `ddtrace` package `4.11.0` ou version ultérieure |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest | `dd-trace` package `5.111.0` ou version ultérieure pour `v5` et `6.0.0` ou version ultérieure pour `v6` |

Pour JavaScript, `ddtest` nécessite Cypress 12 ou version ultérieure, Mocha 8 ou version ultérieure, Playwright 1.18 ou version ultérieure, et Vitest 1.6 ou version ultérieure. La prise en charge de Cucumber.js est testée avec les versions 7 à 13. Ces frameworks nécessitent `ddtest` 1.6.0 ou version ultérieure. La version de votre framework doit également répondre aux [`dd-trace` exigences de compatibilité][4].

## Fonctionnement {#how-it-works}

La parallélisation des tests utilise la `ddtest` CLI pour planifier et exécuter les tests :

1. Exécutez `ddtest plan` une fois pour créer un plan `.testoptimization/` réutilisable.
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

[1]: /fr/tests/test_impact_analysis/
[2]: /fr/tests/setup/
[3]: /fr/tests/test_parallelization/setup/
[4]: /fr/tests/setup/javascript/#compatibility