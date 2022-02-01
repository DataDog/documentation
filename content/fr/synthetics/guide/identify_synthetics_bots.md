---
title: Identifier les bots Synthetic
kind: documentation
description: Identifier les requêtes Synthetic entrantes
aliases:
  - /fr/synthetics/identify_synthetics_bots
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
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

Vous pouvez utiliser les **plages d'IP de la fonction de surveillance Synthetic** correspondant à chaque emplacement géré par Datadog :

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

**Remarque** : les adresses IP répertoriées utilisent la syntaxe CIDR et peuvent nécessiter une conversion vers des plages d'adresses IPv4 avant toute utilisation.

**Remarque** : les adresses IP répertoriées varient rarement, sauf en cas de nouveaux emplacements gérés. Si vous souhaitez tout de même recevoir une notification lorsque les adresses IP répertoriées sont modifiées, vous pouvez créer un test API sur l'endpoint ci-dessus, avec une assertion JSONPath comme `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length`.

## En-têtes par défaut

Vous pouvez également identifier les robots Datadog en utilisant certains **en-têtes par défaut** joints aux requêtes générées par les tests Synthetic :

### `user-agent`

Par défaut, un en-tête `user-agent` est ajouté à l'ensemble des requêtes exécutées par les tests Synthetic. Tout `user-agent` personnalisé qui est ajouté au test remplace l'en-tête par défaut.

{{< tabs >}}
{{% tab "Tests API uniques et à plusieurs étapes" %}}

Pour les tests API uniques et à plusieurs étapes, l'en-tête `user-agent` par défaut est `Datadog/Synthetics`.

{{% /tab %}}
{{% tab "Tests Browser" %}}

Pour les tests Browser, la valeur de l'en-tête `user-agent` varie en fonction du navigateur et de l'appareil exécutant le test. La valeur `user-agent` par défaut se termine toujours par `DatadogSynthetics`, afin que vous puissiez facilement déterminer qu'il s'agit de tests Synthetic.

{{% /tab %}}
{{< /tabs >}}

### `sec-datadog`

Un en-tête `sec-datadog` est ajouté à l'ensemble des requêtes exécutées par les tests Synthetic. Sa valeur inclut notamment l'ID du test à son origine.

{{< tabs >}}
{{% tab "Tests API uniques et à plusieurs étapes" %}}

```
sec-datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_PUBLIQUE_TEST_SYNTHETIC>
```

{{% /tab %}}
{{% tab "Tests Browser" %}}

```
sec-datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_PUBLIQUE_TEST_SYNTHETIC>
```

{{% /tab %}}
{{< /tabs >}}

### En-têtes d'APM

Plusieurs [**autres en-têtes spécifiques à l'APM**][1] tels que `x-datadog-origin: synthetics` sont également ajoutés aux requêtes générées par les tests Synthetic API et Browser.

## Personnaliser les requêtes

Vous pouvez également tirer parti des **options avancées** lors de la configuration des tests Browser et d'API pour ajouter des identifiants spécifiques à vos requêtes de test. Par exemple, vous pouvez ajouter des **en-têtes**, des **cookies** ou des **corps de requête** personnalisés.

## Variable Browser

<div class="alert alert-warning">
La variable Browser est désormais obsolète. Nous vous recommandons d'utiliser plutôt l'en-tête user-agent.
</div>

Lorsqu'un robot Datadog exécute votre application, la variable `window._DATADOG_SYNTHETICS_BROWSER` est définie sur `true`. Pour supprimer les actions du robot de vos données d'analyse, intégrez votre code d'analyse dans le test suivant :

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/apm/#how-are-traces-linked-to-tests