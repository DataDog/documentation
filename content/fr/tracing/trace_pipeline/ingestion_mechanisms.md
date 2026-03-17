---
aliases:
- /fr/tracing/trace_ingestion/mechanisms
description: AperûÏu des mûˋcanismes dans le traceur et l'Agent qui contrûÇlent l'ingestion
  des traces.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: ContrûÇles d'ingestion
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Conservation des traces
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Mûˋtriques d'utilisation
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimiser Datadog û  grande ûˋchelle : observabilitûˋ rentable chez Zendesk'
title: Mûˋcanismes d'ingestion
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Rû´gles d'ûˋchantillonnage d'ingestion" >}}


Plusieurs mûˋcanismes sont responsables du choix des spans gûˋnûˋrûˋs par vos applications qui sont envoyûˋs û  Datadog (_ingûˋrûˋs_). La logique derriû´re ces mûˋcanismes rûˋside dans les [bibliothû´ques de traûÏage][1] et dans l'Agent Datadog. Selon la configuration, tout ou une partie du trafic gûˋnûˋrûˋ par les services instrumentûˋs est ingûˋrûˋ.

û chaque span ingûˋrûˋ, est attachûˋ un **raison d'ingestion** unique se rûˋfûˋrant û  l'un des mûˋcanismes dûˋcrits sur cette page. [Mûˋtriques d'utilisation][2] `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` sont ûˋtiquetûˋes par `ingestion_reason`.

Utilisez le [tableau de bord des raisons d'ingestion][3] pour enquûˆter dans le contexte chacune de ces raisons d'ingestion. Obtenez un aperûÏu du volume attribuûˋ û  chaque mûˋcanisme, pour savoir rapidement sur quelles options de configuration se concentrer.

## ûchantillonnage basûˋ sur l'en-tûˆte

Le mûˋcanisme d'ûˋchantillonnage par dûˋfaut s'appelle _ûˋchantillonnage basûˋ sur l'en-tûˆte_. La dûˋcision de conserver ou de supprimer une trace est prise au tout dûˋbut de la trace, au dûˋbut du [span racine][4]. Cette dûˋcision est ensuite propagûˋe û  d'autres services dans le cadre de leur contexte de demande, par exemple sous forme d'en-tûˆte de requûˆte HTTP.

Parce que la dûˋcision est prise au dûˋbut de la trace et ensuite transmise û  toutes les parties de la trace, il est garanti que la trace soit conservûˋe ou supprimûˋe dans son ensemble.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="ûchantillonnage basûˋ sur l'en-tûˆte" style="width:100%;" >}}

Vous pouvez dûˋfinir des taux d'ûˋchantillonnage pour l'ûˋchantillonnage basûˋ sur l'en-tûˆte û  deux endroits :
- Au niveau de l''**[Agent](#in-the-agent)** (par dûˋfaut)
- Au niveau de la **[Bibliothû´que de traûÏage](#in-tracing-libraries-user-defined-rules)** : tout mûˋcanisme de bibliothû´que de traûÏage remplace la configuration de l'Agent.

### Dans l'Agent
`ingestion_reason: auto`

L'Agent Datadog envoie en continu des taux d'ûˋchantillonnage aux bibliothû´ques de traûÏage û  appliquer û  la racine des traces. L'Agent ajuste les taux pour atteindre un objectif de dix traces par seconde au total, rûˋparties entre les services en fonction du trafic.

Par exemple, si le service `A` a plus de trafic que le service `B`, l'Agent pourrait varier le taux d'ûˋchantillonnage pour `A` de sorte que `A` ne conserve pas plus de sept traces par seconde, et ajuster de mûˆme le taux d'ûˋchantillonnage pour `B` afin que `B` ne conserve pas plus de trois traces par seconde, pour un total de 10 traces par seconde.

#### Configuration û  distance

La configuration du taux d'ûˋchantillonnage dans l'Agent est configurable û  distance si vous utilisez la version de l'Agent [7.42.0][20] ou supûˋrieure. Pour commencer, configurez [Configuration û  distance][21] puis paramûˋtrez le paramû´tre `ingestion_reason` depuis la [page de contrûÇle d'ingestion][5]. La configuration û  distance vous permet de modifier le paramû´tre sans avoir û  redûˋmarrer l'Agent. La configuration û  distance a la prioritûˋ sur les configurations locales, y compris les variables d'environnement et les paramû´tres de `datadog.yaml`.

#### Configuration locale

Dûˋfinissez le nombre de traces par seconde cible de l'Agent dans son fichier de configuration principal (`datadog.yaml`) ou en tant que variable d'environnement :
```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Notes**:
- Le taux d'ûˋchantillonnage de traces par seconde dûˋfini dans l'Agent ne s'applique qu'aux bibliothû´ques de traûÏage Datadog. Il n'a aucun effet sur d'autres bibliothû´ques de traûÏage telles que les SDK OpenTelemetry.
- L'objectif n'est pas une valeur fixe. En rûˋalitûˋ, il fluctue en fonction des pics de trafic et d'autres facteurs.

Tous les spans d'une trace ûˋchantillonnûˋe û  l'aide de l'Agent Datadog [taux d'ûˋchantillonnage calculûˋs automatiquement](#in-the-agent) sont ûˋtiquetûˋs avec la raison d'ingestion `auto`. Le tag `ingestion_reason` est ûˋgalement dûˋfini sur [les mûˋtriques d'utilisation][2]. Les services utilisant le mûˋcanisme par dûˋfaut de l'Agent Datadog sont ûˋtiquetûˋs comme `Automatic` dans la colonne Configuration de la [page de contrûÇle d'ingestion][5].

### Dans les bibliothû´ques de traûÏage : rû´gles dûˋfinies par l'utilisateur
`ingestion_reason: rule`

Pour un contrûÇle plus granulaire, utilisez les options de configuration d'ûˋchantillonnage des bibliothû´ques de traûÏage :
- Dûˋfinissez un taux d'ûˋchantillonnage ** spûˋcifique û  appliquer û  la racine de la trace**, par service, et/ou par nom de ressource, en remplaûÏant le mûˋcanisme par dûˋfaut de l'Agent [.](#in-the-agent)Dûˋfinissez une **limite de taux** sur le nombre de traces ingûˋrûˋes par seconde. La limite de taux par dûˋfaut est de 100 traces par seconde par instance de service (lors de l'utilisation du [mûˋcanisme par dûˋfaut de l'Agent](#in-the-agent), le limiteur de taux est ignorûˋ).

**Remarque** : Les rû´gles d'ûˋchantillonnage sont ûˋgalement des contrûÇles d'ûˋchantillonnage basûˋs sur l'en-tûˆte. Si le trafic pour un service est supûˋrieur au maximum configurûˋ de traces par seconde, alors les traces sont abandonnûˋes û  la racine. Cela ne crûˋe pas de traces incomplû´tes.

La configuration peut ûˆtre dûˋfinie par des variables d'environnement ou directement dans le code :

{{< tabs >}}
{{% tab "Java" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, pour les applications Java, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis l'interface <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">de la page de contrûÇle d'ingestion</a>.

Lisez-en plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans le [guide d'ûˋchantillonnage basûˋ sur les ressources][1].

**Remarque** : La configuration û  distance a la prioritûˋ sur la configuration locale.

**Configuration locale**

Pour les applications Java, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource (û  partir de la version [v1.26.0][3] pour l'ûˋchantillonnage basûˋ sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces des autres points de terminaison, dûˋfinissez :

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

La valeur du nom du service est sensible û  la casse et doit correspondre û  la casse du nom rûˋel du service.

Configurez une limite de taux en dûˋfinissant la variable d'environnement `DD_TRACE_RATE_LIMIT` û  un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est dûˋfinie, une limite de 100 traces par seconde est appliquûˋe.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolû´te. Utilisez `DD_TRACE_SAMPLING_RULES` û  la place. Par exemple, si vous avez dûˋjû  dûˋfini `DD_TRACE_SAMPLE_RATE` û  `0.1`, dûˋfinissez `DD_TRACE_SAMPLING_RULES` û  `[{"sample_rate":0.1}]` û  la place.

Lisez-en plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Java][2].

[1]: /fr/tracing/guide/resource_based_sampling
[2]: /fr/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, pour les applications Python, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de contrûÇle d'ingestion</a>.

Lisez-en plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans le [guide d'ûˋchantillonnage basûˋ sur les ressources][3].

**Remarque** : La configuration dûˋfinie û  distance prend le pas sur la configuration locale.

**Configuration locale**
Pour les applications Python, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource (û  partir de la version [v2.8.0][1] pour l'ûˋchantillonnage basûˋ sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces des autres points de terminaison, dûˋfinissez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configurez une limite de taux en dûˋfinissant la variable d'environnement `DD_TRACE_RATE_LIMIT` û  un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est dûˋfinie, une limite de 100 traces par seconde est appliquûˋe.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolû´te. Utilisez `DD_TRACE_SAMPLING_RULES` û  la place. Par exemple, si vous avez dûˋjû  dûˋfini `DD_TRACE_SAMPLE_RATE` û  `0.1`, dûˋfinissez `DD_TRACE_SAMPLING_RULES` û  `[{"sample_rate":0.1}]` û  la place.

Lisez-en plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
[3]: /fr/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, pour les applications Ruby, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de contrûÇle d'ingestion</a>.

Lisez-en plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans le [guide d'ûˋchantillonnage basûˋ sur les ressources][1].

**Remarque** : La configuration dûˋfinie û  distance prend le pas sur la configuration locale.

**Configuration locale**
Pour les applications Ruby, dûˋfinissez un taux d'ûˋchantillonnage global pour la bibliothû´que en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Dûˋfinissez les taux d'ûˋchantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommûˋ `my-service` et 10 % des autres traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configurez une limite de taux en dûˋfinissant la variable d'environnement `DD_TRACE_RATE_LIMIT` û  un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est dûˋfinie, une limite de 100 traces par seconde est appliquûˋe.

Lisez-en plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Ruby][1].

[1]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, pour les applications Go, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis l'interface <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de contrûÇle d'ingestion</a>. 

En savoir plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans cet [article][3].

**Remarque** : La configuration dûˋfinie û  distance a la prioritûˋ sur la configuration locale.

**Configuration locale**

Pour les applications Go, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource (û  partir de la version [v1.60.0][2] pour l'ûˋchantillonnage basûˋ sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces des autres points de terminaison, dûˋfinissez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configurez une limite de taux en dûˋfinissant la variable d'environnement `DD_TRACE_RATE_LIMIT` û  un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est dûˋfinie, une limite de 100 traces par seconde est appliquûˋe.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolû´te. Utilisez `DD_TRACE_SAMPLING_RULES` û  la place. Par exemple, si vous avez dûˋjû  dûˋfini `DD_TRACE_SAMPLE_RATE` û  `0.1`, dûˋfinissez `DD_TRACE_SAMPLING_RULES` û  `[{"sample_rate":0.1}]` û  la place.

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Go][1].

[1]: /fr/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /fr/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, pour les applications Node.js, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis l'interface <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de contrûÇle d'ingestion</a>.

En savoir plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans le [guide d'ûˋchantillonnage basûˋ sur les ressources][1].

**Remarque** : La configuration dûˋfinie û  distance a la prioritûˋ sur la configuration locale.

**Configuration locale**

Pour les applications Node.js, dûˋfinissez un taux d'ûˋchantillonnage global dans la bibliothû´que en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`.

Vous pouvez ûˋgalement dûˋfinir les taux d'ûˋchantillonnage par service. Par exemple, pour envoyer 50 % des traces pour le service nommûˋ `my-service` et 10 % pour le reste des traces :

```javascript
tracer.init({
    ingestion: {
        sampler: {
            sampleRate: 0.1,
            rules: [
                { sampleRate: 0.5, service: 'my-service' }
            ]
        }
    }
});
```

Configurez une limite de taux en dûˋfinissant la variable d'environnement `DD_TRACE_RATE_LIMIT` û  un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est dûˋfinie, une limite de 100 traces par seconde est appliquûˋe.

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, pour les applications PHP, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">Page de contrûÇle d'ingestion</a>.

En savoir plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans le [guide d'ûˋchantillonnage basûˋ sur les ressources][1].

**Remarque** : La configuration dûˋfinie û  distance a la prioritûˋ sur la configuration locale.

**Configuration locale**

Pour les applications PHP, dûˋfinissez un taux d'ûˋchantillonnage global pour la bibliothû´que en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Dûˋfinissez les taux d'ûˋchantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommûˋ `my-service`, 20 % des traces d'autres points de terminaison, et 10 % pour le reste des traces, dûˋfinissez :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage PHP][1].

[1]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuration û  distance**

û partir de la version <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, pour les applications C++, dûˋfinissez les taux d'ûˋchantillonnage par service et par ressource depuis l'interface <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de contrûÇle d'ingestion</a>.

Lisez-en plus sur la faûÏon de configurer û  distance les taux d'ûˋchantillonnage par service et par ressource dans le [guide d'ûˋchantillonnage basûˋ sur les ressources][1].

**Remarque** : La configuration dûˋfinie û  distance prend le pas sur la configuration locale.

**Configuration locale**
û partir de [v0.1.0][1], la bibliothû´que C++ de Datadog prend en charge les configurations suivantes :
- Taux d'ûˋchantillonnage global : `DD_TRACE_SAMPLE_RATE` variable d'environnement
- Taux d'ûˋchantillonnage par service : `DD_TRACE_SAMPLING_RULES` variable d'environnement.
- Paramû´tre de limite de taux : `DD_TRACE_RATE_LIMIT` variable d'environnement.

Par exemple, pour envoyer 50 % des traces pour le service nommûˋ `my-service` et 10 % pour le reste des traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ ne fournit pas d'intûˋgrations pour l'instrumentation automatique, mais il est utilisûˋ par le traûÏage proxy tel qu'Envoy, Nginx ou Istio. En savoir plus sur la faûÏon de configurer l'ûˋchantillonnage pour les proxies dans [TraûÏage des proxies][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /fr/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Pour les applications .NET, dûˋfinissez un taux d'ûˋchantillonnage global pour la bibliothû´que en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Dûˋfinissez les taux d'ûˋchantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommûˋ `my-service` et 10 % pour le reste des traces :

```
#using powershell
$env:DD_TRACE_SAMPLE_RATE=0.1
$env:DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'

#using JSON file   
{
    "DD_TRACE_SAMPLE_RATE": "0.1",
    "DD_TRACE_SAMPLING_RULES": "[{\"service\": \"my-service\", \"resource\": \"GET /checkout\", \"sample_rate\": 0.5}]"
}
```

<div class="alert alert-info">û partir de la version 2.35.0, si <a href="/remote_configuration">la configuration û  distance de l'agent</a> est activûˋe oû¿ le service s'exûˋcute, vous pouvez dûˋfinir un <code>DD_TRACE_SAMPLE_RATE</code> par service dans l'interface <a href="/tracing/software_catalog">du catalogue logiciel</a>.</div>

Configurez une limite de taux en dûˋfinissant la variable d'environnement `DD_TRACE_RATE_LIMIT` û  un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est dûˋfinie, une limite de 100 traces par seconde est appliquûˋe.

Lisez-en plus sur les contrûÇles d'ûˋchantillonnage dans la [.NET documentation de la bibliothû´que de traûÏage][1].\
Lisez-en plus sur [la configuration des variables d'environnement pour .NET][2].

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Tous les spans d'une trace ûˋchantillonnûˋe û  l'aide d'une configuration de bibliothû´que de traûÏage sont ûˋtiquetûˋs avec la raison d'ingestion `rule`. Les services configurûˋs avec des rû´gles d'ûˋchantillonnage dûˋfinies par l'utilisateur sont marquûˋs comme `Configured` dans la colonne Configuration de la [page de contrûÇle d'ingestion][5].

## Erreurs et traces rares

Pour les traces non capturûˋes par l'ûˋchantillonnage basûˋ sur le head, deux mûˋcanismes d'ûˋchantillonnage supplûˋmentaires de l'agent Datadog garantissent que les traces critiques et diverses sont conservûˋes et ingûˋrûˋes. Ces deux ûˋchantillonneurs conservent un ensemble diversifiûˋ de traces locales (ensemble de spans du mûˆme hûÇte) en capturant toutes les combinaisons d'un ensemble prûˋdûˋterminûˋ d'ûˋtiquettes :

- **Traces d'erreur** : ûchantillonner les erreurs est important pour fournir une visibilitûˋ sur les ûˋventuelles pannes du systû´me.
- **Traces rares** : ûchantillonner les traces rares vous permet de garder une visibilitûˋ sur votre systû´me dans son ensemble, en veillant û  ce que les services et ressources û  faible trafic soient toujours surveillûˋs.

**Remarque** : Les ûˋchantillonneurs d'erreurs et de traces rares sont ignorûˋs pour les services pour lesquels vous avez dûˋfini [des rû´gles d'ûˋchantillonnage de bibliothû´que](#in-tracing-libraries-user-defined-rules).

### Traces d'erreur
`ingestion_reason: error`

L'ûˋchantillonneur d'erreurs capture des morceaux de traces contenant des spans d'erreur qui ne sont pas capturûˋs par l'ûˋchantillonnage basûˋ sur le head. Il capture les traces d'erreur jusqu'û  un taux de 10 traces par seconde (par agent). Il garantit une visibilitûˋ complû´te sur les erreurs lorsque le taux d'ûˋchantillonnage basûˋ sur le head est faible.

Avec la version 7.33 de l'agent et ultûˋrieure, vous pouvez configurer l'ûˋchantillonneur d'erreurs dans le fichier de configuration principal de l'agent (`datadog.yaml`) ou avec des variables d'environnement :
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="ûchantillonnage des erreurs" style="width:100%;" >}}

**Remarques** :
1. Dûˋfinissez le paramû´tre sur `0` pour dûˋsactiver l'ûˋchantillonneur d'erreurs.
2. L'ûˋchantillonneur d'erreurs capture les traces locales avec des spans d'erreur au niveau de l'agent. Si la trace est distribuûˋe, il n'y a aucune garantie que la trace complû´te soit envoyûˋe û  Datadog.
3. Par dûˋfaut, les spans supprimûˋs par les rû´gles de bibliothû´que de traûÏage ou la logique personnalisûˋe telle que `manual.drop` sont **exclus** sous l'ûˋchantillonneur d'erreurs.

#### Agent Datadog 7.42.0 et supûˋrieur

L'ûˋchantillonnage des erreurs est configurûˋ û  distance si vous utilisez la version de l'agent [7.42.0][20] ou supûˋrieure. Suivez la [documentation][21] pour activer la configuration û  distance dans vos agents. Avec la configuration û  distance, vous pouvez activer la collecte de spans rares sans avoir û  redûˋmarrer l'agent Datadog.

#### Agent Datadog 6/7.41.0 et supûˋrieur

Pour remplacer le comportement par dûˋfaut afin que les spans supprimûˋs par les rû´gles de bibliothû´que de traûÏage ou la logique personnalisûˋe telle que `manual.drop` soient **inclus** par l'ûˋchantillonneur d'erreurs, activez la fonctionnalitûˋ avec : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans l'agent Datadog (ou le conteneur d'agent de trace dûˋdiûˋ dans le pod de l'agent Datadog dans Kubernetes).


#### Agent Datadog 6/7.33 û  6/7.40.x

Le comportement par dûˋfaut de l'ûˋchantillonnage des erreurs ne peut pas ûˆtre modifiûˋ pour ces versions de l'agent. Mettez û  niveau l'agent Datadog vers Datadog Agent 6/7.41.0 et supûˋrieur.


### Traces rares
`ingestion_reason: rare`

L'ûˋchantillonneur rare envoie un ensemble de spans rares û  Datadog. Il capture des combinaisons de `env`, `service`, `name`, `resource`, `error.type` et `http.status` jusqu'û  5 traces par seconde (par agent). Il garantit la visibilitûˋ sur les ressources û  faible trafic lorsque le taux d'ûˋchantillonnage basûˋ sur l'en-tûˆte est faible.

**Remarque** : Le rare sampler capture des traces locales au niveau de l'Agent. Si la trace est distribuûˋe, il n'y a aucun moyen de garantir que la trace complû´te sera envoyûˋe û  Datadog.

#### Datadog Agent 7.42.0 et supûˋrieur

Le taux d'ûˋchantillonnage rare est configurûˋ û  distance si vous utilisez la version de l'Agent [7.42.0][20] ou supûˋrieure. Suivez la [documentation][21] pour activer la configuration û  distance dans vos agents. Avec la configuration û  distance, vous pouvez changer la valeur du paramû´tre sans avoir û  redûˋmarrer l'Agent Datadog.

#### Datadog Agent 6/7.41.0 et supûˋrieur

Par dûˋfaut, le rare sampler n'est **pas activûˋ**.

**Remarque** : Lorsque **activûˋ**, les spans supprimûˋs par les rû´gles de la bibliothû´que de traûÏage ou la logique personnalisûˋe telle que `manual.drop` sont **exclus** sous ce sampler.

Pour configurer le rare sampler, mettez û  jour le paramû´tre `apm_config.enable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_ENABLE_RARE_SAMPLER` :

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Pour ûˋvaluer les spans supprimûˋs par les rû´gles de la bibliothû´que de traûÏage ou la logique personnalisûˋe telle que `manual.drop`,
 activez la fonctionnalitûˋ avec : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans le Trace Agent.


#### Datadog Agent 6/7.33 û  6/7.40.x

Par dûˋfaut, le rare sampler est activûˋ.

**Remarque** : Lorsque **activûˋ**, les spans supprimûˋs par les rû´gles de la bibliothû´que de traûÏage ou la logique personnalisûˋe telle que `manual.drop` **sont exclus** sous ce sampler. Pour inclure ces spans dans cette logique, mettez û  niveau vers Datadog Agent 6.41.0/7.41.0 ou supûˋrieur.

Pour changer les paramû´tres par dûˋfaut du rare sampler, mettez û  jour le paramû´tre `apm_config.disable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_DISABLE_RARE_SAMPLER` :

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forcer la conservation et la suppression
`ingestion_reason: manual`

Le mûˋcanisme d'ûˋchantillonnage basûˋ sur l'en-tûˆte peut ûˆtre remplacûˋ au niveau de la bibliothû´que de traûÏage. Par exemple, si vous devez surveiller une transaction critique, vous pouvez forcer la trace associûˋe û  ûˆtre conservûˋe. En revanche, pour des informations inutiles ou rûˋpûˋtitives comme les vûˋrifications de santûˋ, vous pouvez forcer la trace û  ûˆtre supprimûˋe.

- Dûˋfinissez la conservation manuelle sur un span pour indiquer qu'il et tous les spans enfants doivent ûˆtre ingûˋrûˋs. La trace rûˋsultante peut sembler incomplû´te dans l'UI si le span en question n'est pas le span racine de la trace.

- Dûˋfinissez la suppression manuelle sur un span pour vous assurer que **aucun** span enfant n'est ingûˋrûˋ. [Les ûˋchantillonneurs d'erreurs et rares](#error-and-rare-traces) seront ignorûˋs dans l'Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Conservez manuellement une trace :

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always keep the trace
        span.setTag(DDTags.MANUAL_KEEP, true);
        // method impl follows
    }
}
```

Supprimez manuellement une trace :

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always Drop the trace
        span.setTag(DDTags.MANUAL_DROP, true);
        // method impl follows
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Conservez manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    # method impl follows
```

Supprimez manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Drop the Trace
    span.set_tag(MANUAL_DROP_KEY)
    # method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Conservez manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Supprimez manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Conservez manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext" 
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)
    //method impl follows

}
```

Supprimez manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Conservez manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Supprimez manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)
//method impl follows

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Conservez manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    //method impl follows
}
```

Supprimez manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always drop this trace
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


Conservez manuellement une trace :

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always keep this trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  }
?>
```

Supprimez manuellement une trace :

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always drop this trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Conservez manuellement une trace :

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto span = tracer.create_span(span_cfg);
// Always keep this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_KEEP));
//method impl follows
```

Supprimez manuellement une trace :

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

using namespace dd = datadog::tracing;

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto another_span = tracer.create_span(span_cfg);
// Always drop this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_DROP));
//method impl follows
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

La conservation manuelle des traces doit se faire avant la propagation du contexte. Si elle est conservûˋe aprû´s la propagation du contexte, le systû´me ne peut pas garantir que l'ensemble de la trace est conservûˋ û  travers les services. La conservation de la trace manuelle est dûˋfinie û  l'emplacement du client de traûÏage, de sorte que la trace peut toujours ûˆtre abandonnûˋe par l'agent ou l'emplacement du serveur en fonction des rû´gles d'ûˋchantillonnage.


## Spans uniques
`ingestion_reason: single_span`

Si vous devez ûˋchantillonner un span spûˋcifique, mais que vous n'avez pas besoin que la trace complû´te soit disponible, les bibliothû´ques de traûÏage vous permettent de dûˋfinir un taux d'ûˋchantillonnage û  configurer pour un seul span.

Par exemple, si vous construisez [des mûˋtriques û  partir de spans][6] pour surveiller des services spûˋcifiques, vous pouvez configurer des rû´gles d'ûˋchantillonnage de spans pour garantir que ces mûˋtriques sont basûˋes sur 100 % du trafic de l'application, sans avoir û  ingûˋrer 100 % des traces pour toutes les requûˆtes circulant û  travers le service.

Cette fonctionnalitûˋ est disponible pour Datadog Agent v[7.40.0][19]+.

**Remarque** : Les rû´gles d'ûˋchantillonnage de spans uniques **ne peuvent** pas ûˆtre utilisûˋes pour abandonner des spans qui sont conservûˋs par [l'ûˋchantillonnage basûˋ sur l'en-tûˆte](#head-based-sampling), mais seulement pour conserver des spans supplûˋmentaires qui sont abandonnûˋs par l'ûˋchantillonnage basûˋ sur l'en-tûˆte.

{{< tabs >}}
{{% tab "Java" %}}
û partir de la bibliothû´que de traûÏage [version 1.7.0][1], pour les applications Java, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter 100 % des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  50 spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lisez-en plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /fr/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
û partir de la version [v1.4.0][1], pour les applications Python, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Lisez-en plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
û partir de la version [v1.5.0][1], pour les applications Ruby, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
û partir de la version [v1.41.0][1], pour les applications Go, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
û partir de la version [v1.60.0][3], pour les applications Go, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par ressource et par balises avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service pour la ressource `POST /api/create_issue`, pour la balise `priority` avec la valeur `high` :

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /fr/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Pour les applications Node.js, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
û partir de la version [v0.77.0][1], pour les applications PHP, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
û partir de la version [v0.1.0][1], pour les applications C++, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
û partir de la version [v2.18.0][1], pour les applications .NET, dûˋfinissez les rû´gles d'ûˋchantillonnage de **span** par service et par nom d'opûˋration avec la `DD_SPAN_SAMPLING_RULES` variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommûˋ `my-service`, pour l'opûˋration `http.request`, jusqu'û  `50` spans par seconde :

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

En savoir plus sur les contrûÇles d'ûˋchantillonnage dans la [documentation de la bibliothû´que de traûÏage .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> Le mûˋcanisme <a href="/tracing/legacy_app_analytics/">App Analytics</a> est complû´tement obsolû´te. Pour ingûˋrer des spans uniques sans la trace complû´te, utilisez la configuration <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">ûchantillonnage de Span Unique</a>. Pour ingûˋrer des traces complû´tes, utilisez les configurations <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">ûchantillonnage Basûˋ sur la Tûˆte</a>.</div>

## Spans de produit ingûˋrûˋs

### Traces RUM
`ingestion_reason:rum`

Une requûˆte d'une application web ou mobile gûˋnû´re une trace lorsque les services backend sont instrumentûˋs. [L'intûˋgration APM avec la Surveillance des Utilisateurs Rûˋels][7] relie les requûˆtes des applications web et mobiles û  leurs traces backend correspondantes afin que vous puissiez voir vos donnûˋes frontend et backend complû´tes û  travers une seule lentille.

û partir de la version `4.30.0` du SDK navigateur RUM, vous pouvez contrûÇler les volumes ingûˋrûˋs et conserver un ûˋchantillonnage des traces backend en configurant le paramû´tre d'initialisation `traceSampleRate`. Dûˋfinissez `traceSampleRate` û  un nombre compris entre `0` et `100`.
Si aucune valeur `traceSampleRate` n'est dûˋfinie, un dûˋfaut de 100 % des traces provenant des requûˆtes du navigateur sont envoyûˋes û  Datadog.

De mûˆme, contrûÇlez le taux d'ûˋchantillonnage des traces dans d'autres SDK en utilisant des paramû´tres similaires :

| SDK         | Paramû´tre             | Version minimale    |
|-------------|-----------------------|--------------------|
| Navigateur     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _Le taux d'ûˋchantillonnage est rapportûˋ dans la page de contrûÇle d'ingestion depuis [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _Le taux d'ûˋchantillonnage est rapportûˋ dans la page de contrûÇle d'ingestion depuis [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _Le taux d'ûˋchantillonnage est rapportûˋ dans la page de contrûÇle d'ingestion depuis [1.2.0][18]_  |

### Les traces synthûˋtiques
`ingestion_reason:synthetics` et `ingestion_reason:synthetics-browser`

Les tests HTTP et navigateur gûˋnû´rent des traces lorsque les services backend sont instrumentûˋs. [L'intûˋgration APM avec les Tests Synthûˋtiques][13] relie vos tests synthûˋtiques aux traces backend correspondantes. Naviguez d'un test ûˋchouûˋ û  la cause racine du problû´me en consultant la trace gûˋnûˋrûˋe par ce test.

Par dûˋfaut, 100 % des tests HTTP et navigateur synthûˋtiques gûˋnû´rent des traces backend.

### Autres produits

Certaines raisons d'ingestion supplûˋmentaires sont attribuûˋes aux spans gûˋnûˋrûˋs par des produits Datadog spûˋcifiques :

| Produit    | Raison d'ingestion                    | Description du mûˋcanisme d'ingestion |
|------------|-------------------------------------|---------------------------------|
| Sans serveur | `lambda` et `xray`                   | Vos traces reûÏues des [applications sans serveur][14] tracûˋes avec les bibliothû´ques de traûÏage Datadog ou l'intûˋgration AWS XRay. |
| Protection des applications et des API     | `appsec`                            | Traces ingûˋrûˋes û  partir des bibliothû´ques de traûÏage Datadog et signalûˋes par [AAP][15] comme une menace. |
| Observabilitûˋ des donnûˋes : Surveillance des travaux    | `data_jobs`                            | Traces ingûˋrûˋes û  partir de l'intûˋgration Datadog Java Tracer Spark ou de l'intûˋgration Databricks. |

## Mûˋcanismes d'ingestion dans OpenTelemetry
`ingestion_reason:otel`

Selon votre configuration avec les SDK OpenTelemetry (utilisant le Collecteur OpenTelemetry ou l'Agent Datadog), vous avez plusieurs faûÏons de contrûÇler l'ûˋchantillonnage d'ingestion. Voir [ûchantillonnage d'Ingestion avec OpenTelemetry][22] pour des dûˋtails sur les options disponibles pour l'ûˋchantillonnage au niveau des SDK OpenTelemetry, du Collecteur OpenTelemetry et de l'Agent Datadog dans diverses configurations OpenTelemetry.

## Lectures complûˋmentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/dd_libraries/
[2]: /fr/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /fr/tracing/glossary/#trace-root-span
[5]: /fr/tracing/trace_pipeline/ingestion_controls/
[6]: /fr/tracing/trace_pipeline/generate_metrics/
[7]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: https://github.com/DataDog/browser-sdk/releases/tag/v4.30.0
[9]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[10]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[11]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0
[13]: /fr/synthetics/apm/
[14]: /fr/serverless/distributed_tracing/
[15]: /fr/security/application_security/
[16]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.13.0
[17]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.15.0
[18]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.2.0
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.40.0
[20]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[21]: /fr/tracing/guide/remote_config/
[22]: /fr/opentelemetry/guide/ingestion_sampling_with_opentelemetry