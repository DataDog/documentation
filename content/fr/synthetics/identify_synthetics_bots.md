---
title: Identifier les Bots Synthetics
kind: documentation
disable_toc: true
description: Identifier les requêtes Synthetics entrantes
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
Certaines parties de votre système peuvent ne pas être accessibles aux robots sans identification appropriée. Il est parfois également préférable de ne pas recueillir de données d'analyse provenant des robots Datadog. Pour détecter les robots Datadog, utilisez :

* Les [en-têtes](#en-tetes) joints à toutes les requêtes des robots de Datadog.
* Les [**plages d'IP Synthetics**][1] de Datadog.
* Les **Advanced options** afin de définir des en-têtes personnalisés pour vos tests Browser et tests API. Vous pouvez également ajouter localement des **cookies, des en-têtes ou une authentification basique** à vos tests API et des **cookies et en-têtes** à vos tests Browser.
* La variable `window._DATADOG_SYNTHETICS_BROWSER` [variable JavaScript dans le code de votre application](#variable_datadog_synthetics_browser).

#### En-têtes

Utilisez l'en-tête joint aux robots Datadog afin de les détecter pour vos tests Browser et tests API.

{{< tabs >}}
{{% tab "Tests API" %}}

L'en-tête suivant est joint à tous les robots de test API de Datadog :

`Sec-Datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - public_id: <ID_TEST_SYNTHETICS_PUBLIC>`

L'en-tête `x-datadog-origin: synthetics` est également ajouté à toutes les requêtes lancées pour un test API Datadog.

{{% /tab %}}
{{% tab "Tests Browser" %}}

L'en-tête suivant est joint à tous les robots de test Browser de Datadog :

`Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - public_id: <ID_TEST_SYNTHETICS_PUBLIC>`

{{% /tab %}}
{{< /tabs >}}

##### En-têtes d'APM

Si l'APM est activé, [**d'autres en-têtes spécifiques de l'APM**][2] comme `x-datadog-trace-id` sont ajoutés à toutes les requêtes lancées par les tests API.

#### Variable _DATADOG_SYNTHETICS_BROWSER

Lorsqu'un robot Datadog exécute votre application, la variable `window._DATADOG_SYNTHETICS_BROWSER` est définie sur `true`. Pour supprimer les actions du robot de vos données d'analyse, intégrez votre code d'analyse dans le test suivant :

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/synthetics.json
[2]: /fr/synthetics/apm/#how-are-traces-linked-to-tests