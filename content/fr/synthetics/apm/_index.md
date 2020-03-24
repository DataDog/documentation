---
title: APM Synthetics
kind: documentation
description: APM et tracing distribué avec Synthetics
aliases:
  - /fr/synthetics/apm
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: tracing/
    tag: Documentation
    text: APM et tracing distribué
---
{{< img src="synthetics/apm/synthetics-apm.mp4" alt="APM et Synthetics" video="true" >}}

## Présentation

L'intégration d'APM avec Synthetics vous permet de passer d'un test qui a éventuellement échoué vers la cause racine du problème en regardant la trace générée par ce test spécifique.

En ayant à votre disposition les détails associés au réseau (grâce à votre test), ainsi qu'un backend, une infrastructure et des informations de journalisation (grâce à votre trace), vous pouvez accéder à un niveau de détails supérieur en ce qui concerne le comportement de votre application, tel que constaté par votre utilisateur.

## Utilisation

Les déclarations sur cette page s'appliquent [aux tests API][1] et aux [tests Browser][2] pour l'APM, sauf indication contraire.

### Prérequis

* Votre service, et l'endpoint sur lequel vous exécutez le test, sont soumis à un [tracing côté APM][3].
* Votre service utilise un serveur HTTP.
* Votre serveur HTTP utilise une bibliothèque qui prend en charge le tracing distribué.

Créez un test qui s'applique à votre serveur HTTP soumis à un tracing, et Datadog associe automatiquement la trace générée par votre serveur au résultat de check correspondant.

Pour associer des résultats de test Browser, ajoutez à la liste blanche les URL auxquelles vous souhaitez ajouter les en-têtes d'intégration APM. Utilisez `*` pour les caractères génériques :

```text
https://*.datadoghq.com/*
```

## Bibliothèques prises en charge

Les bibliothèques de tracing Datadog suivantes sont prises en charge :

* [Python][4]
* [Go][5]
* [Java][6]
* [Ruby][7]
* [JavaScript][8]
* [PHP][9]

### Comment les traces sont-elles associées aux tests ?

Datadog utilise le protocole de tracing distribué et configure les en-têtes HTTP suivants :

| Header                                 | Description                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `x-datadog-trace-id`                   | Généré à partir du backend Synthetics. Permet à Datadog d'associer la trace au résultat du test.                           |
| `x-datadog-parent-id: 0`               | Permet à Synthetics d'être la span racine de la trace générée.                                                             |
| `x-datadog-origin: synthetics`         | S'assure que les traces générées à partir des tests API [ne rentrent pas en compte dans le calcul de vos quotas de l'APM](#cela-a-t-il-une-incidence-sur-les-quotas).     |
| `x-datadog-origin: synthetics-browser` | S'assure que les traces générées à partir des tests Browser [ne rentrent pas en compte dans le calcul de vos quotas de l'APM](#cela-a-t-il-une-incidence-sur-les-quotas). |
| `x-datadog-sampling-priority: 1`       | [S'assure que l'Agent conserve la trace][10].                                                                      |

### Cela a-t-il une incidence sur les quotas de l'APM ?

L'en-tête `x-datadog-origin: synthetics` indique au backend APM que les traces sont générées par Synthetics. Les traces générées n'ont par conséquent aucune incidence sur les quotas standard de l'APM.

### Combien de temps les traces sont-elles conservées ?

Ces traces sont conservées [de la même manière que vos traces APM standard][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests
[2]: /fr/synthetics/browser_tests
[3]: /fr/tracing
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[7]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[9]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[10]: /fr/tracing/guide/trace_sampling_and_storage/#how-it-works
[11]: /fr/tracing/guide/trace_sampling_and_storage/#trace-storage