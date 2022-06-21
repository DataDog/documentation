---
title: APM Synthetic
kind: documentation
description: APM et tracing distribué avec la surveillance Synthetic
aliases:
  - /fr/synthetics/apm
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
  - link: /tracing/
    tag: Documentation
    text: APM et tracing distribué
  - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
    tag: Guide
    text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre produits.
---
{{< img src="synthetics/apm/synthetics-apm.mp4" alt="APM et surveillance Synthetic" video="true"  >}}

## Présentation

L'intégration de l'APM avec la surveillance Synthetic vous permet d'identifier la cause de l'échec d'un test en visualisant les traces générées durant son exécution.

En accédant à des données réseau (grâce à votre test) ainsi qu'à des informations sur le backend, l'infrastructure et les logs (grâce à votre trace), vous avez la possibilité d'analyser en détail le comportement de votre application, tel que constaté par votre utilisateur.

## Utilisation

Les déclarations sur cette page s'appliquent [aux tests API][1] et aux [tests Browser][2] pour l'APM, sauf indication contraire.

### Prérequis

* Votre service, et l'endpoint sur lequel vous exécutez le test, sont soumis à un [tracing côté APM][3].
* Votre service utilise un serveur HTTP.
* Votre serveur HTTP utilise une bibliothèque qui prend en charge le tracing distribué.

Créez un test qui s'applique à votre serveur HTTP tracé, et Datadog associera automatiquement la trace générée par votre serveur au résultat de test correspondant.

Pour associer des résultats de test Browser, autorisez les URL auxquelles vous souhaitez ajouter les en-têtes d'intégration APM. Vous pouvez effectuer cette opération depuis les [réglages de Synthetic][4]. Utilisez `*` pour les caractères génériques :

```text
https://*.datadoghq.com/*
```

## Bibliothèques compatibles

Les bibliothèques de tracing Datadog suivantes sont prises en charge :

| Bibliothèque                             | Version minimale                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][5]                  | [0.22.0][6]                |
| [Go][7]                  | [1.10.0][8]                |
| [Java][9]                  | [0.24.1][10]                |
| [Ruby][11]                  | [0.20.0][12]                |
| [Node.js][13]                  | [0.10.0][14]                |
| [PHP][15]                  | [0.33.0][16]                |
| [.NET][17]                  | [1.18.2][18]                |

### Comment les traces sont-elles associées aux tests ?

Datadog utilise un protocole de tracing distribué et configure les en-têtes HTTP suivants :



`x-datadog-trace-id`
: Généré à partir du backend de surveillance Synthetic. Permet à Datadog d'associer la trace au résultat du test.

`x-datadog-parent-id: 0`
: Permet aux tests Synthetic d'être la span racine de la trace générée.

`x-datadog-origin: synthetics`
: Permet de s'assurer que les traces générées à partir des tests API [ne rentrent pas en compte dans le calcul de vos quotas de l'APM](#cela-a-t-il-une-incidence-sur-les-quotas-de-l-apm).

`x-datadog-origin: synthetics-browser` 
: Permet de s'assurer que les traces générées à partir des tests Browser [ne rentrent pas en compte dans le calcul de vos quotas de l'APM](#cela-a-t-il-une-incidence-sur-les-quotas-de-l-apm).

`x-datadog-sampling-priority: 1`
: Permet de s'assurer que l'Agent conserve la trace.

### Cela a-t-il une incidence sur les quotas de l'APM ?

L'en-tête `x-datadog-origin: synthetics` indique au backend APM que les traces sont générées par Synthetic. Les traces générées n'ont par conséquent aucune incidence sur les quotas standard de l'APM.

### Combien de temps les traces sont-elles conservées ?

Ces traces sont conservées [aussi longtemps comme vos traces APM standard][19].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/browser_tests/
[3]: /fr/tracing/
[4]: https://app.datadoghq.com/synthetics/settings/default
[5]: /fr/tracing/setup_overview/setup/python/
[6]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[7]: /fr/tracing/setup_overview/setup/go/
[8]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[9]: /fr/tracing/setup_overview/setup/java/
[10]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[11]: /fr/tracing/setup_overview/setup/ruby/
[12]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[13]: /fr/tracing/setup_overview/setup/nodejs/
[14]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[15]: /fr/tracing/setup_overview/setup/php/
[16]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[17]: /fr/tracing/setup_overview/setup/dotnet-core/
[18]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[19]: /fr/tracing/trace_retention/