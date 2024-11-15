---
aliases:
- /fr/synthetics/identify_synthetics_bots
description: Identifier les requêtes Synthetic entrantes
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: /synthetics/
  tag: Documentation
  text: En savoir plus sur la surveillance Synthetic
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test Browser
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurer un test API
title: Identifier les bots Synthetic
---

## Présentation

Certaines parties de vos systèmes peuvent ne pas être accessibles aux robots sans identification appropriée. Il est parfois également préférable de ne pas recueillir de données d'analyse provenant des robots Datadog.

Essayez de combiner plusieurs des méthodes suivantes pour détecter les robots Datadog liés à la surveillance Synthetic.

## Adresses IP

Utilisez les **plages d'IP de la fonction de surveillance Synthetic** correspondant à chaque emplacement géré par Datadog :

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

Les IP répertoriées utilisent la notation CIDR (Classless Inter-Domain Routing). Il est possible que vous deviez les convertir en plages d'adresses IPv4 pour pouvoir les utiliser. Les IP répertoriées changent rarement, sauf pour les nouveaux emplacements gérés.

Si vous souhaitez recevoir des alertes en cas de changement des IP répertoriées, créez un test API sur l'endpoint ci-dessus avec une assertion JSONPath comme `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length`.

## En-têtes par défaut

Identifiez les robots Datadog en utilisant certains **en-têtes par défaut** qui sont joints aux requêtes générées par les tests Synthetic.

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

Un en-tête `sec-datadog` est ajouté à l'ensemble des requêtes exécutées par les tests Synthetic. Sa valeur inclut l'ID du test à son origine.

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

Vous pouvez tirer parti des **options avancées** lors de la configuration des tests Browser et API pour ajouter des identifiants spécifiques à vos requêtes de test. Il est par exemple possible d'ajouter des **en-têtes**, des **cookies** et des **corps de requête** personnalisés.

## Variables Browser

Lorsqu'un robot Datadog exécute votre application, la variable `window._DATADOG_SYNTHETICS_BROWSER` est définie sur `true`. Pour supprimer les actions du robot de vos données d'analyse, intégrez votre code d'analyse dans le test suivant :

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Si vous utilisez la variable browser pour identifier des bots Synthetic sur Firefox, Datadog nʼest pas en mesure de garantir quʼelle soit définie avant lʼexécution de votre code. 

## Cookies

Les cookies `datadog-synthetics-public-id` et `datadog-synthetics-result-id` font partie des cookies appliqués à votre navigateur.

Ces cookies sont disponibles pour toutes les étapes dans Firefox. Pour ce qui est de Microsoft Edge et Google Chrome, ils sont uniquement définis pour lʼURL de départ.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/apm/#how-are-traces-linked-to-tests