---
aliases:
- /fr/synthetics/identify_synthetics_bots
description: Identifier les requêtes Synthetic entrantes
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de Datadog Synthetic Monitoring
- link: /synthetics/
  tag: Documentation
  text: En savoir plus sur la Synthetic Monitoring
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test de navigateur
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurer un test API
title: Identifier les bots Synthetics
---
## Présentation {#overview}

Certaines parties de vos systèmes peuvent ne pas être accessibles aux robots sans l'identification appropriée. Vous pouvez également souhaiter éviter de collecter des données d'analyse provenant des robots Datadog. 

Essayez de combiner plusieurs des méthodes suivantes pour détecter les robots Datadog liés à la surveillance Synthetic.

## Adresses IP {#ip-addresses}

Utilisez les **plages d'adresses IP de Synthetic Monitoring** correspondant à chaque emplacement géré par Datadog :

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

Les adresses IP listées utilisent la notation CIDR (Classless Inter-Domain Routing) et peuvent nécessiter une conversion en plages d'adresses IPv4 avant utilisation. Sauf dans le cas des adresses IP de nouveaux emplacements gérés, les adresses IP listées changent rarement. 

Si vous souhaitez être alerté lorsque les adresses IP listées changent, créez un test API sur le point de terminaison ci-dessus avec une assertion JSONPath telle que `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length`.

## En-têtes par défaut {#default-headers}

Identifiez les robots Datadog en utilisant les **en-têtes par défaut**, qui sont joints aux requêtes générées par les tests Synthetic.

### `user-agent` {#user-agent}

Par défaut, un en-tête `user-agent` est ajouté à toutes les requêtes effectuées par les tests Synthetic. Tout en-tête `user-agent` personnalisé ajouté dans le test remplace celui par défaut.

{{< tabs >}}
{{% tab "Tests API à une ou plusieurs étapes" %}}

Pour les tests API à une ou plusieurs étapes, l'en-tête `user-agent` par défaut est `Datadog/Synthetics`.

{{% /tab %}}
{{% tab "Tests Browser" %}}

Pour les tests de navigateur, la valeur de l'en-tête `user-agent` par défaut varie en fonction du navigateur et de l'appareil exécutant le test. La valeur `user-agent` par défaut se termine toujours par `DatadogSynthetics` pour vous permettre d'identifier les tests Synthetic.

{{% /tab %}}
{{< /tabs >}}

### En-têtes APM {#apm-headers}

Un certain nombre d'[**autres en-têtes spécifiques à l'APM**][1], tels que `x-datadog-origin: synthetics`, sont également ajoutés aux requêtes générées par les tests API et les tests de navigateur Synthetic.

## Personnaliser les requêtes {#customize-requests}

Vous pouvez tirer parti de votre configuration de test d'API et de navigateur dans {{< ui >}}Advanced options{{< /ui >}} et ajouter des identifiants spécifiques aux requêtes de vos tests tels que **des en-têtes personnalisés**, **des cookies** et **des corps de requête**.

## Variables de navigateur {#browser-variables}

Lorsqu'un robot Datadog effectue le rendu de votre application, la variable `window._DATADOG_SYNTHETICS_BROWSER` est définie sur `true`. Pour supprimer les actions du robot de vos données analytiques, entourez le code de votre outil d'analyse avec le test suivant :

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Si vous utilisez la variable browser pour identifier des bots Synthetic sur Firefox, Datadog nʼest pas en mesure de garantir quʼelle soit définie avant lʼexécution de votre code. 

## Cookies {#cookies}

Les cookies déposés dans votre navigateur comprennent `datadog-synthetics-public-id` et `datadog-synthetics-result-id`.

Ces cookies sont disponibles pour toutes les étapes dans Firefox. Pour Microsoft Edge et Google Chrome, ces cookies sont définis uniquement pour l'URL de départ.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/apm/#how-are-traces-linked-to-tests