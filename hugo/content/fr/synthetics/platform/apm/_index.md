---
aliases:
- /fr/synthetics/apm
description: APM et tracing distribué avec Synthetic Monitoring
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de Datadog Synthetic Monitoring
- link: /tracing/
  tag: Documentation
  text: APM et tracing distribué
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
products:
- icon: synthetics
  name: Tests d'API HTTP
  url: /synthetics/api_tests/http_tests/
- icon: synthetics
  name: Tests API Multistep
  url: /synthetics/multistep/
- icon: browser
  name: Test Browser
  url: /synthetics/browser_tests/
title: APM Synthetic
---
{{< product-availability >}}

{{< img src="synthetics/apm/synthetics_apm_new.mp4" alt="Un test d'API ayant échoué avec le panneau latéral ouvert sur l'onglet Trace, montrant la trace APM générée par l'exécution de test avec des spans codés par couleur à travers les services" video="true" >}}

## Présentation {#overview}

L'intégration de l'APM avec Synthetic Monitoring vous permet d'identifier la cause de l'échec d'un test en visualisant les traces générées durant son exécution.

En ayant à votre disposition les détails associés au réseau (grâce à votre test), ainsi qu'un backend, une infrastructure et des informations de log (grâce à votre trace), vous pouvez accéder à un niveau de détails supérieur en ce qui concerne le comportement de votre application, tel que constaté par votre utilisateur.

## Utilisation {#usage}

### Prérequis {#prerequisites}

* Votre service, ainsi que l'endpoint sur lequel votre test s'exécute, sont [tracés du côté APM][4].
* Votre service utilise un serveur HTTP.
* Votre serveur HTTP utilise une bibliothèque qui prend en charge le traçage distribué.

Créez un test qui s'applique à votre serveur HTTP soumis à un tracing, et Datadog associe automatiquement la trace générée par votre serveur au résultat de check correspondant.

Pour lier les résultats des tests de navigateur, autorisez les URL auxquelles vous souhaitez ajouter les en-têtes d'intégration APM. Vous pouvez le faire dans [{{< ui >}}Synthetic Settings{{< /ui >}}][5]. 

Utilisez `*` pour les caractères génériques. Dans le domaine, `*` correspond à une étiquette de sous-domaine unique et ne correspond pas au-delà des points. Dans le chemin d'URL, `*` correspond à n'importe quel caractère, y compris `/`.

Par exemple, si vous ajoutez `https://*.datadoghq.com/*` :
| URL | Autorisé | Raison |
| --- | --- | --- |
| `https://www.datadoghq.com/product` | Oui | `*` correspond à l'étiquette unique `www` |
| `https://www.datadoghq.com/product/synthetic-monitoring` | Oui | Le caractère générique de chemin d'URL correspond à `/` |
| `https://www.docs.datadoghq.com/synthetics` | Non | `*` ne peut pas correspondre à `www.docs`, qui contient un point |

## Bibliothèques prises en charge {#supported-libraries}

Les SDK Datadog suivants sont pris en charge :

| Bibliothèque                             | Version minimale                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][6]                  | [0.50.4][7]                |
| [Go][8]                  | [1.10.0][9]                |
| [Java][10]                  | [0.24.1][11]                |
| [Ruby][12]                  | [0.20.0][13]                |
| [Node.js][14]                  | [0.10.0][15]                |
| [PHP][16]                  | [0.33.0][17]                |
| [.NET][18]                  | [1.18.2][19]                |

### Comment les traces sont-elles liées aux tests ? {#how-are-traces-linked-to-tests}

Datadog utilise le protocole de tracing distribué et configure les en-têtes HTTP suivants :


{{< tabs >}}
{{% tab "Datadog" %}}
`x-datadog-trace-id`
: Généré à partir du backend de Synthetic Monitoring. Permet à Datadog de lier la trace au résultat du test.

`x-datadog-parent-id: 0`
: Pour que les tests Synthetic soient le span racine de la trace générée.

`x-datadog-origin: synthetics`
: Pour identifier les traces générées par vos tests d'API. Les spans de ces traces sont marqués avec `ingestion_reason:synthetics`.

`x-datadog-origin: synthetics-browser`
: Pour identifier les traces générées par vos tests de navigateur. Ces traces sont marquées avec `ingestion_reason:synthetics-browser`.

`x-datadog-sampling-priority: 1`
: Pour s'assurer que Datadog Agent conserve la trace.
{{% /tab %}}
{{% tab "Contexte de trace W3C" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: La spécification suppose que la version est définie sur `00`.
: `trace id`: ID de trace 128 bits, hexadécimal sur 32 caractères. L'ID de trace source est de 64 bits pour maintenir la compatibilité avec l'APM.
: `parent id` : ID de span 64 bits, hexadécimal sur 16 caractères.
: `trace flags` : Échantillonné (`01`) ou non échantillonné (`00`)

**Exemple** :
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{< /tabs >}}

### Combien de temps les traces sont-elles conservées ? {#how-long-are-traces-retained}

Ces traces sont conservées pendant 15 jours avec le filtre de rétention {{< ui >}}Synthetics Default{{< /ui >}}, [tout comme vos traces APM classiques][20].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[4]: /fr/tracing/
[5]: https://app.datadoghq.com/synthetics/settings/integrations
[6]: /fr/tracing/trace_collection/dd_libraries/python/
[7]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.50.4
[8]: /fr/tracing/trace_collection/dd_libraries/go/
[9]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[10]: /fr/tracing/trace_collection/dd_libraries/java/
[11]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[12]: /fr/tracing/trace_collection/dd_libraries/ruby/
[13]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[14]: /fr/tracing/trace_collection/dd_libraries/nodejs/
[15]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[16]: /fr/tracing/trace_collection/dd_libraries/php/
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[18]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/
[19]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[20]: /fr/tracing/trace_pipeline/trace_retention/