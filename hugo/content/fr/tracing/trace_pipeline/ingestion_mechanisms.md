---
aliases:
- /fr/tracing/trace_ingestion/mechanisms
description: Présentation des mécanismes du SDK et de l'Agent qui contrôlent l'ingestion
  des traces.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Paramètres d'ingestion
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Rétention des traces
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métriques d'utilisation
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité économique chez
    Zendesk'
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: Centre d'apprentissage
  text: 'Limitation du débit et rétention APM :'
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: 'Optimiser le traçage distribué : bonnes pratiques pour respecter le budget
    et capturer les traces critiques'
title: Mécanismes d'ingestion
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles d'échantillonnage d'ingestion" >}}


De multiples mécanismes déterminent si les spans générés par vos applications sont envoyés à Datadog (_ingérés_). La logique derrière ces mécanismes se trouve dans les [SDK][1] et dans le Datadog Agent. Selon la configuration, tout ou partie du trafic généré par les services instrumentés est ingéré.

Chaque span ingéré possède une **raison d'ingestion** unique qui fait référence à l'un des mécanismes décrits sur cette page. Les [métriques d'utilisation][2] `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` sont taguées par `ingestion_reason`.

Utilisez le [dashboard des raisons d'ingestion][3] pour étudier chaque raison d'ingestion dans son contexte et identifier les options de configuration sur lesquelles se concentrer.

## Échantillonnage basé sur le début de la trace {#head-based-sampling}

Le mécanisme d'échantillonnage par défaut est appelé _échantillonnage basé sur le début de la trace_. La décision de conserver ou de supprimer une trace est prise au début du [root span][4], puis propagée aux autres services dans le cadre de leur contexte de requête (par exemple, sous forme d'en-tête de requête HTTP).

Comme la décision est prise au début de la trace et transmise à toutes les parties, la trace est conservée ou supprimée dans son intégralité.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Échantillonnage basé sur le début de la trace" style="width:100%;" >}}

Vous pouvez définir les taux d'échantillonnage pour l'échantillonnage en amont à deux endroits :
- Au niveau de l'**[Agent](#in-the-agent)** (par défaut)
- Au niveau du **[SDK](#in-sdks-user-defined-rules)** : tout mécanisme du SDK remplace la configuration de l'Agent.

### Dans l'Agent {#in-the-agent}
`ingestion_reason: auto`

Le Datadog Agent envoie en continu des taux d'échantillonnage aux SDK pour qu'ils les appliquent à la racine des traces. L'Agent ajuste les taux pour atteindre un objectif global de dix traces par seconde, réparties entre les services en fonction du trafic.

Par exemple, si le service `A` a plus de trafic que le service `B`, l'Agent peut faire varier le taux d'échantillonnage pour `A` de sorte que `A` ne conserve pas plus de sept traces par seconde, et ajuster de la même manière le taux d'échantillonnage pour `B` de sorte que `B` ne conserve pas plus de trois traces par seconde, pour un total de 10 traces par seconde.

#### Configuration à distance {#remote-configuration}

La configuration du taux d'échantillonnage dans l'Agent est configurable à distance si vous utilisez la version [7.42.0][20] ou supérieure de l'Agent. Pour commencer, configurez la [Remote Configuration][21], puis configurez le paramètre `ingestion_reason` depuis la [page Ingestion Control][5]. La Remote Configuration vous permet de modifier le paramètre sans redémarrer l'Agent. La configuration définie à distance prévaut sur les configurations locales, y compris les variables d'environnement et les paramètres de `datadog.yaml`.

#### Configuration locale {#local-configuration}

Définissez le nombre cible de traces par seconde de l'Agent dans son fichier de configuration principal (`datadog.yaml`) ou en tant que variable d'environnement :

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Remarques** :
- Le taux d'échantillonnage des traces par seconde défini dans l'Agent s'applique uniquement aux SDK Datadog. Il n'a aucun effet sur les autres SDK tels que les SDK OpenTelemetry.
- La cible n'est pas une valeur fixe. En réalité, elle fluctue en fonction des pics de trafic et d'autres facteurs.

Les spans des traces échantillonnées par les [taux d'échantillonnage automatiques](#in-the-agent) du Datadog Agent sont marqués avec la raison d'ingestion `auto`. Le tag `ingestion_reason` est également défini sur les [métriques d'utilisation][2]. Les services utilisant ce mécanisme par défaut sont étiquetés `Automatic` dans la colonne Configuration de la [page Ingestion Control][5].

### Dans les SDK : règles définies par l'utilisateur {#in-sdks-user-defined-rules}
`ingestion_reason: rule`

Pour un contrôle plus granulaire, utilisez les options de configuration d'échantillonnage du SDK :
- Définissez un **taux d'échantillonnage spécifique à appliquer à la racine de la trace** par nom de service ou de ressource, en remplaçant le [mécanisme par défaut](#in-the-agent) de l'Agent.
- Définissez une **limite de débit** sur le nombre de traces ingérées par seconde. La limite de débit par défaut est de 100 traces par seconde par instance de service. Lorsque vous utilisez le [mécanisme par défaut](#in-the-agent) de l'Agent, le limiteur de débit est ignoré.

**Remarque** : Les règles d'échantillonnage sont également des contrôles d'échantillonnage basés sur le début de la trace. Si le trafic d'un service est supérieur au nombre maximal de traces par seconde configuré, les traces sont abandonnées à la racine. Cela ne crée pas de traces incomplètes.

Les options de configuration peuvent être définies via des variables d'environnement ou directement dans le code :

{{< tabs >}}
{{% tab "Java" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, pour les applications Java, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page Ingestion Control</a>.

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications Java, définissez les taux d'échantillonnage par service et par ressource (à partir de la version [v1.26.0][3] pour l'échantillonnage basé sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces des autres points de terminaison, définissez :

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Le nom du service est sensible à la casse et doit correspondre à la casse du nom réel du service.

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]` à la place.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Java][2].

[1]: /fr/tracing/guide/resource_based_sampling
[2]: /fr/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, pour les applications Python, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page Ingestion Control</a>.

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][3].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**
Pour les applications Python, définissez les taux d'échantillonnage par service et par ressource (à partir de la version [v2.8.0][1] pour l'échantillonnage basé sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces des autres points de terminaison, définissez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]` à la place.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
[3]: /fr/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, pour les applications Ruby, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page Ingestion Control</a>.

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**
Pour les applications Ruby, définissez un taux d'échantillonnage global pour la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % du reste des traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Ruby][1].

[1]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, pour les applications Go, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page Ingestion Control</a>. 

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans cet [article][3].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications Go, définissez les taux d'échantillonnage par service et par ressource (à partir de la version [v1.60.0][2] pour l'échantillonnage basé sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces des autres points de terminaison, définissez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` sur `0.1`, définissez `DD_TRACE_SAMPLING_RULES` sur `[{"sample_rate":0.1}]` à la place.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Go][1].

[1]: /fr/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /fr/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, pour les applications Node.js, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page Ingestion Control</a>.

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications Node.js, définissez un taux d'échantillonnage global dans la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`.

Vous pouvez également définir des taux d'échantillonnage par service. Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % pour le reste des traces :

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

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, pour les applications PHP, définissez les taux d'échantillonnage par service et par ressource depuis la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">page Ingestion Control</a>.

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**

Pour les applications PHP, définissez un taux d'échantillonnage global pour la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service`, 20 % des traces des autres points de terminaison et 10 % pour le reste des traces, définissez :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK PHP][1].

[1]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuration à distance**

À partir de la version <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, pour les applications C++, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">page Ingestion Control</a>.

En savoir plus sur la configuration à distance des taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance prévaut sur la configuration locale.

**Configuration locale**
À partir de la version [v0.1.0][1], la bibliothèque C++ de Datadog prend en charge les configurations suivantes :
- Taux d'échantillonnage global : `DD_TRACE_SAMPLE_RATE` variable d'environnement
- Taux d'échantillonnage par service : `DD_TRACE_SAMPLING_RULES` variable d'environnement.
- Paramètre de limite de débit : `DD_TRACE_RATE_LIMIT` variable d'environnement.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % pour le reste des traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Le C++ ne fournit pas d'intégrations pour l'instrumentation automatique, mais il est utilisé par le traçage de proxy tel qu'Envoy, NGINX ou Istio. En savoir plus sur la configuration de l'échantillonnage pour les proxys dans [Traçage des proxys][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /fr/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab "Rust" %}}
**Configuration locale**

Pour les applications Rust, définissez les taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % pour le reste des traces :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5},{"sample_rate": 0.1}]'
```

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Rust][1].

[1]: /fr/tracing/trace_collection/dd_libraries/rust
{{% /tab %}}
{{% tab ".NET" %}}
Pour les applications .NET, définissez un taux d'échantillonnage global pour la bibliothèque à l'aide de la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % pour le reste des traces :

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

<div class="alert alert-info">À partir de la version 2.35.0, si l'<a href="/remote_configuration">Agent Remote Configuration</a> est activée là où le service s'exécute, vous pouvez définir un taux par service <code>DD_TRACE_SAMPLE_RATE</code> dans l'interface utilisateur du <a href="/internal_developer_portal/catalog/">Catalogue</a>.</div>

Configurez une limite de débit en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` sur le nombre maximal de traces par seconde et par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK .NET][1].\
En savoir plus sur la [configuration des variables d'environnement pour .NET][2].

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Remarque** : toutes les spans d'une trace échantillonnée à l'aide d'une configuration SDK sont marquées avec la raison d'ingestion `rule`. Les services configurés avec des règles d'échantillonnage définies par l'utilisateur sont marqués comme `Configured` dans la colonne Configuration de la [page Ingestion Control][5].

## Traces d'erreurs et rares {#error-and-rare-traces}

Pour les traces non capturées par l'échantillonnage basé sur le début de la trace, deux mécanismes d'échantillonnage supplémentaires du Datadog Agent capturent les traces critiques et diverses qui seraient autrement abandonnées. Ces échantillonneurs conservent un ensemble diversifié de traces locales (spans provenant du même host) en capturant toutes les combinaisons d'un ensemble prédéterminé de tags :

- **Traces d'erreurs** : L'échantillonnage d'erreurs offre une visibilité sur les défaillances potentielles du système.
- **Traces rares** : L'échantillonnage de traces rares maintient la visibilité sur les services et ressources à faible trafic dans l'ensemble de votre système.

**Remarque** : Les échantillonneurs d'erreurs et de traces rares sont ignorés pour les services pour lesquels vous définissez des [règles d'échantillonnage de bibliothèque](#in-sdks-user-defined-rules).

### Traces d'erreurs {#error-traces}
`ingestion_reason: error`

L'échantillonneur d'erreurs capture des parties de traces contenant des spans d'erreur non capturées par l'échantillonnage basé sur le début de la trace, à un taux allant jusqu'à 10 traces par seconde par Agent. Cela permet de maintenir la visibilité sur les erreurs lorsque le taux d'échantillonnage basé sur le début de la trace est faible.

À partir de la version 7.33 de l'Agent, vous pouvez configurer l'échantillonneur d'erreurs dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec des variables d'environnement :

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Échantillonnage d'erreurs" style="width:100%;" >}}

**Remarques** :
1. Définissez le paramètre sur `0` pour désactiver l'échantillonneur d'erreurs.
2. L'échantillonneur d'erreurs capture les traces d'erreurs locales au niveau de l'Agent. Si la trace est distribuée, il est possible que la trace complète ne soit pas envoyée à Datadog.
3. Par défaut, les spans abandonnés par les règles du SDK ou une logique personnalisée telle que `manual.drop` sont **exclus** de l'échantillonneur d'erreurs.

#### Datadog Agent 7.42.0 et versions ultérieures {#datadog-agent-7420-and-higher}

L'échantillonnage d'erreurs est configurable à distance si vous utilisez l'Agent en version [7.42.0][20] ou supérieure. Suivez la [documentation][21] pour activer la configuration à distance dans vos Agents. Grâce à la configuration à distance, vous pouvez activer la collecte de spans rares sans redémarrer le Datadog Agent.

#### Datadog Agent 6/7.41.0 et versions ultérieures {#datadog-agent-67410-and-higher}

Pour remplacer le comportement par défaut afin que les spans supprimés par les règles du SDK ou par une logique personnalisée telle que `manual.drop` soient **inclus** par l'échantillonneur d'erreurs, activez la fonctionnalité avec : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans le Datadog Agent (ou le conteneur Trace Agent dédié au sein du pod du Datadog Agent dans Kubernetes).

#### Datadog Agent 6/7.33 à 6/7.40.x {#datadog-agent-6733-to-6740x}

Le comportement par défaut de l'échantillonnage d'erreurs ne peut pas être modifié pour ces versions de l'Agent. Mettez à niveau l'Agent Datadog vers Datadog Agent 6/7.41.0 ou une version ultérieure.

### Traces rares {#rare-traces}
`ingestion_reason: rare`

L'échantillonneur de traces rares envoie un ensemble de spans rares à Datadog. Il capture des combinaisons de `env`, `service`, `name`, `resource`, `error.type` et `http.status` jusqu'à 5 traces par seconde par Agent. Cela permet de maintenir la visibilité sur les ressources à faible trafic lorsque le taux d'échantillonnage head-based est faible.

**Remarque** : L'échantillonneur de traces rares capture les traces locales au niveau de l'Agent. Si la trace est distribuée, il n'y a aucune garantie que la trace complète soit envoyée à Datadog.

#### Datadog Agent 7.42.0 et versions ultérieures {#datadog-agent-7420-and-higher-1}

L'échantillonnage de traces rares est configurable à distance si vous utilisez l'Agent en version [7.42.0][20] ou supérieure. Suivez la [documentation][21] pour activer la configuration à distance dans vos Agents. Grâce à la configuration à distance, vous pouvez modifier la valeur du paramètre sans redémarrer le Datadog Agent.

#### Datadog Agent 6/7.41.0 et versions ultérieures {#datadog-agent-67410-and-higher-1}

Par défaut, l'échantillonneur de traces rares **n'est pas activé**.

**Remarque** : Lorsqu'il est **activé**, les spans supprimés par les règles du SDK ou par une logique personnalisée telle que `manual.drop` sont **exclus** par cet échantillonneur.

Pour configurer l'échantillonneur de traces rares, mettez à jour le paramètre `apm_config.enable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_ENABLE_RARE_SAMPLER` :

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Pour évaluer les spans supprimés par les règles du SDK ou par une logique personnalisée telle que `manual.drop`, activez la fonctionnalité avec : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans le Trace Agent.

#### Datadog Agent 6/7.33 à 6/7.40.x {#datadog-agent-6733-to-6740x-1}

Par défaut, l'échantillonneur rare est activé.

**Remarque** : Lorsqu'il est **activé**, les spans supprimés par les règles du SDK ou par une logique personnalisée telle que `manual.drop` **sont exclus** par cet échantillonneur. Pour inclure ces spans dans cette logique, effectuez une mise à niveau vers Datadog Agent 6.41.0/7.41.0 ou une version ultérieure.

Pour modifier les paramètres par défaut de l'échantillonneur rare, mettez à jour le paramètre `apm_config.disable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_DISABLE_RARE_SAMPLER` :

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forcer la conservation et la suppression {#force-keep-and-drop}
`ingestion_reason: manual`

Le mécanisme d'échantillonnage head-based peut être remplacé au niveau du SDK. Par exemple, si vous devez surveiller une transaction critique, vous pouvez forcer la conservation de la trace associée. En revanche, pour des informations inutiles ou répétitives comme les bilans de santé, vous pouvez forcer la suppression de la trace.

- Définissez Manual Keep sur un span pour indiquer que lui et tous ses spans enfants doivent être ingérés. La trace résultante peut sembler incomplète dans l'interface utilisateur si le span en question n'est pas le span racine de la trace.

- Définissez Manual Drop sur un span pour vous assurer qu'**aucun** span enfant n'est ingéré. Les [échantillonneurs d'erreurs et rares](#error-and-rare-traces) sont ignorés dans l'Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,rust" >}}
{{< programming-lang lang="java" >}}

Pour conserver manuellement une trace :

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

Pour supprimer manuellement une trace :

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

Pour conserver manuellement une trace :

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

Pour supprimer manuellement une trace :

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

Pour conserver manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Pour supprimer manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Pour conserver manuellement une trace :

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

Pour supprimer manuellement une trace :

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

Pour conserver manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Pour supprimer manuellement une trace :

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

Pour conserver manuellement une trace :

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

Pour supprimer manuellement une trace :

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


Pour conserver manuellement une trace :

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

Pour supprimer manuellement une trace :

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

Pour conserver manuellement une trace :

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

Pour supprimer manuellement une trace :

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
{{< programming-lang lang="rust" >}}

<div class="alert alert-info">Le SDK Rust utilise l'API OpenTelemetry et ne prend pas en charge Datadog <code>ManualKeep</code>/<code>ManualDrop</code> tags. Pour forcer la conservation ou la suppression d'une trace en Rust, définissez l'attribut OpenTelemetry <code>sampling.priority</code> sur le span racine à l'aide d'<a href="/tracing/trace_collection/custom_instrumentation/rust">instrumentation personnalisée</a>.</div>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Définissez Manual Keep avant la propagation du contexte. S'il est défini après la propagation du contexte, la trace entière pourrait ne pas être conservée entre les services. Comme cette décision est définie au niveau du client de tracing, la trace peut toujours être supprimée par l'Agent ou le serveur en fonction des règles d'échantillonnage.


## Spans uniques {#single-spans}
`ingestion_reason: single_span`

Si vous avez besoin d'échantillonner un span spécifique mais que vous n'avez pas besoin de la trace complète, les SDK vous permettent de définir un taux d'échantillonnage pour un seul span.

Par exemple, si vous créez des [métriques à partir de spans][6] pour surveiller des services spécifiques, vous pouvez configurer des règles d'échantillonnage de spans afin que ces métriques soient basées sur 100 % du trafic de l'application, sans ingérer 100 % des traces pour toutes les requêtes transitant par le service.

Cette fonctionnalité est disponible pour le Datadog Agent v[7.40.0][19]+.

**Remarque** : Les règles d'échantillonnage d'un seul span **ne peuvent pas** être utilisées pour supprimer des spans conservés par le head-based sampling [, mais uniquement pour conserver des spans supplémentaires qui sont supprimés par le head-based sampling ](#head-based-sampling).

{{< tabs >}}
{{% tab "Java" %}}
À partir de la version [1.7.0][1] du SDK, pour les applications Java, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter 100 % des étendues du service nommé `my-service`, pour l'opération `http.request`, jusqu'à 50 étendues par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /fr/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
À partir de la version [v1.4.0][1], pour les applications Python, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
À partir de la version [v1.5.0][1], pour les applications Ruby, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
À partir de la version [v1.41.0][1], pour les applications Go, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
À partir de la version [v1.60.0][3], pour les applications Go, définissez des règles d'échantillonnage de **span** par ressource et par tags avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service pour la ressource `POST /api/create_issue`, pour le tag `priority` avec la valeur `high` :

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /fr/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Pour les applications Node.js, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la `DD_SPAN_SAMPLING_RULES`variable d'environnement.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
À partir de la version [v0.77.0][1], pour les applications PHP, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
À partir de la version [v0.1.0][1], pour les applications C++, définissez des règles d'échantillonnage de **span** par service et par nom d'opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab "Rust" %}}
Pour les applications Rust, définissez des règles d'échantillonnage de **span** par service et par opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
{{% /tab %}}
{{% tab ".NET" %}}
À partir de la version [v2.18.0][1], pour les applications .NET, définissez des règles d'échantillonnage de **span** par service et par opération avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation du SDK .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">L'ancien mécanisme <a href="/tracing/legacy_app_analytics/">App Analytics</a> est totalement obsolète. Utilisez <strong>Single span sampling</strong> (décrit ci-dessus) pour ingérer des spans individuels, ou <a href="#head-based-sampling">head-based sampling</a> pour ingérer des traces complètes.</div>

## Spans ingérés par le produit {#product-ingested-spans}

### Traces RUM {#rum-traces}
`ingestion_reason:rum`

Une requête provenant d'une application web ou mobile génère une trace lorsque les services backend sont instrumentés. [L'intégration APM avec le Real User Monitoring][7] lie les requêtes des applications web et mobiles à leurs traces backend correspondantes afin que vous puissiez visualiser l'ensemble de vos données frontend et backend via une seule interface.

À partir de la version `4.30.0` du RUM browser SDK, vous pouvez contrôler les volumes ingérés et conserver un échantillonnage des traces backend en configurant le paramètre d'initialisation `traceSampleRate`. Définissez `traceSampleRate` sur un nombre compris entre `0` et `100`.
Si aucune valeur `traceSampleRate` n'est définie, une valeur par défaut de 100 % des traces provenant des requêtes du navigateur sont envoyées à Datadog.

Vous pouvez également contrôler le taux d'échantillonnage des traces dans d'autres SDK :

| SDK         | Paramètre             | Version minimale    |
|-------------|-----------------------|--------------------|
| Navigateur     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _Le taux d'échantillonnage est rapporté dans la page Ingestion Control depuis [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _Le taux d'échantillonnage est rapporté dans la page Ingestion Control depuis [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _Le taux d'échantillonnage est rapporté dans la page Ingestion Control depuis [1.2.0][18]_  |

### Traces synthétiques {#synthetic-traces}
`ingestion_reason:synthetics` et `ingestion_reason:synthetics-browser`

Les tests HTTP et de navigateur génèrent des traces lorsque les services backend sont instrumentés. [L'intégration APM avec Synthetic Testing][13] relie vos tests Synthetic aux traces backend correspondantes. Naviguez depuis une exécution de test ayant échoué jusqu'à la cause première du problème en examinant la trace générée par cette exécution de test.

Par défaut, 100 % des tests HTTP et Browser Synthetic génèrent des traces en backend.

### Autres produits {#other-products}

D'autres motifs d'ingestion peuvent être attribués aux spans générées par certains produits Datadog :

| Produit    | Raison de l'ingestion                    | Description du mécanisme d'ingestion |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` et `xray`                   | Vos traces reçues depuis les [applications Serverless][14] tracées avec les SDK Datadog ou l'intégration AWS X-Ray. |
| App and API Protection     | `appsec`                            | Traces ingérées depuis les SDK Datadog et signalées par [AAP][15] comme une menace. |
| Data Observability: Jobs Monitoring    | `data_jobs`                            | Traces ingérées depuis l'intégration Spark du Datadog Java Tracer ou l'intégration Databricks. |

## Mécanismes d'ingestion dans OpenTelemetry {#ingestion-mechanisms-in-opentelemetry}
`ingestion_reason:otel`

Selon votre configuration avec les SDK OpenTelemetry (en utilisant le collecteur OpenTelemetry ou le Datadog Agent), vous disposez de plusieurs moyens pour contrôler l'échantillonnage de l'ingestion. Consultez [Ingestion Sampling with OpenTelemetry][22] pour plus de détails sur les options disponibles pour l'échantillonnage au niveau du SDK OpenTelemetry, du collecteur OpenTelemetry et du Datadog Agent dans diverses configurations OpenTelemetry.

## Pour aller plus loin {#further-reading}

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