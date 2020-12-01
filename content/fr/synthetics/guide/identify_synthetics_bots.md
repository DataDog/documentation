---
title: Identifier les bots Synthetic
kind: documentation
description: Identifier les requêtes Synthetic entrantes
aliases:
  - /fr/synthetics/identify_synthetics_bots
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: Présentation de la surveillance Datadog Synthetic
  - link: /synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
---
## Présentation

Certaines parties de vos systèmes peuvent ne pas être accessibles aux robots sans identification appropriée. De plus, il est parfois préférable de ne pas recueillir les données d'analyse associées aux robots Datadog. Utilisez les méthodes ci-dessous pour détecter les robots de surveillance Datadog Synthetic :

## Adresses IP

{{< site-region region="us" >}}

Vous pouvez utiliser les [**plages d'IP de la fonction surveillance Synthetic**][1] de Datadog correspondant à chaque emplacement géré par Datadog.

[1]: https://ip-ranges.datadoghq.com/synthetics.json

{{< /site-region >}}

{{< site-region region="eu" >}}

Vous pouvez utiliser les [**plages d'IP de la fonction surveillance Synthetic**][1] de Datadog correspondant à chaque emplacement géré par Datadog.

[1]: https://ip-ranges.datadoghq.eu/synthetics.json

{{< /site-region >}}

## En-têtes par défaut

Vous pouvez également identifier les robots Datadog en utilisant certains **en-têtes par défaut** joints aux requêtes générées par les tests API et Browser :

{{< tabs >}}
{{% tab "Tests API" %}}

L'en-tête suivant est joint à tous les robots de test API de Datadog :

`sec-datadog: Request sent by a Datadog Synthetic API Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_PUBLIC_TEST_SYNTHETIC>`

Un `user-agent: Datadog/Synthetics` est également ajouté.

{{% /tab %}}
{{% tab "Tests Browser" %}}

L'en-tête suivant est joint à tous les robots de test Browser de Datadog :

`Sec-Datadog: Request sent by a Datadog Synthetic Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_PUBLIC_TEST_SYNTHETIC>`

Un en-tête `user-agent` avec une valeur reflétant le type d'exécution de test Browser (navigateur, appareil) est également ajouté.

{{% /tab %}}
{{< /tabs >}}

### En-têtes d'APM

Plusieurs [**autres en-têtes spécifiques à l'APM**][1] tels que `x-datadog-origin: synthetics` sont également ajoutés aux requêtes générées par les tests Synthetic API et Browser.

## Personnaliser les requêtes

Vous pouvez également tirer parti des **options avancées** lors de la configuration des tests Browser et d'API pour ajouter des identifiants spécifiques à vos requêtes de test. Par exemple, vous pouvez ajouter des **en-têtes**, des **cookies** ou des **corps de requête** personnalisés.

## Variable Browser

Lorsqu'un robot Datadog exécute votre application, la variable `window._DATADOG_SYNTHETICS_BROWSER` est définie sur `true`. Pour supprimer les actions du robot de vos données d'analyse, intégrez votre code d'analyse dans le test suivant :

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/apm/#how-are-traces-linked-to-tests