---
aliases:
- /fr/tracing/trace_ingestion/mechanisms
description: Aperçu des mécanismes dans le traceur et l'Agent qui contrôlent l'ingestion
  des traces.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Contrôles d'ingestion
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Conservation des traces
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métriques d'utilisation
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : observabilité rentable chez Zendesk'
title: Mécanismes d'ingestion
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles d'échantillonnage d'ingestion" >}}


Plusieurs mécanismes sont responsables du choix des spans générés par vos applications qui sont envoyés à Datadog (_ingérés_). La logique derrière ces mécanismes réside dans les [bibliothèques de traçage][1] et dans l'Agent Datadog. Selon la configuration, tout ou une partie du trafic généré par les services instrumentés est ingéré.

À chaque span ingéré, est attaché un unique **raison d'ingestion** se référant à l'un des mécanismes décrits sur cette page. [Métriques d'utilisation][2] `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` sont étiquetées par `ingestion_reason`.

Utilisez le [tableau de bord des raisons d'ingestion][3] pour enquêter dans le contexte chacune de ces raisons d'ingestion. Obtenez un aperçu du volume attribué à chaque mécanisme, pour savoir rapidement sur quelles options de configuration se concentrer.

## Échantillonnage basé sur l'en-tête

Le mécanisme d'échantillonnage par défaut est appelé _échantillonnage basé sur l'en-tête_. La décision de conserver ou de supprimer une trace est prise au tout début de la trace, au début du [span racine][4]. Cette décision est ensuite propagée à d'autres services dans le cadre de leur contexte de requête, par exemple sous forme d'en-tête de requête HTTP.

Parce que la décision est prise au début de la trace et ensuite transmise à toutes les parties de la trace, la trace est garantie d'être conservée ou supprimée dans son ensemble.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Échantillonnage basé sur l'en-tête" style="width:100%;" >}}

Vous pouvez définir des taux d'échantillonnage pour l'échantillonnage basé sur la tête à deux endroits :
- Au niveau de l'**[Agent](#in-the-agent)** (par défaut)
- Au niveau de la **[Bibliothèque de Tracage](#in-tracing-libraries-user-defined-rules)** : tout mécanisme de bibliothèque de traçage remplace la configuration de l'Agent.

### Dans l'Agent
`ingestion_reason: auto`

L'Agent Datadog envoie en continu des taux d'échantillonnage aux bibliothèques de traçage à appliquer à la racine des traces. L'Agent ajuste les taux pour atteindre un objectif de dix traces par seconde au total, réparties entre les services en fonction du trafic.

Par exemple, si le service `A` a plus de trafic que le service `B`, l'Agent peut varier le taux d'échantillonnage pour `A` de sorte que `A` ne conserve pas plus de sept traces par seconde, et ajuster de manière similaire le taux d'échantillonnage pour `B` afin que `B` ne conserve pas plus de trois traces par seconde, pour un total de 10 traces par seconde.

#### Configuration à distance

La configuration du taux d'échantillonnage dans l'Agent peut être configurée à distance si vous utilisez la version de l'Agent [7.42.0][20] ou supérieure. Pour commencer, configurez [Configuration à Distance][21] puis configurez le paramètre `ingestion_reason` depuis la [page de Contrôle d'Ingestion][5]. La Configuration à Distance vous permet de modifier le paramètre sans avoir à redémarrer l'Agent. La configuration à distance a la priorité sur les configurations locales, y compris les variables d'environnement et les paramètres de `datadog.yaml`.

#### Configuration locale

Définissez le nombre cible de traces par seconde de l'Agent dans son fichier de configuration principal (`datadog.yaml`) ou en tant que variable d'environnement :

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Notes** :
- Le taux d'échantillonnage de traces par seconde défini dans l'Agent ne s'applique qu'aux bibliothèques de traçage Datadog. Il n'a aucun effet sur d'autres bibliothèques de traçage telles que les SDK OpenTelemetry.
- L'objectif n'est pas une valeur fixe. En réalité, il fluctue en fonction des pics de trafic et d'autres facteurs.

Tous les spans d'une trace échantillonnée à l'aide de l'Agent Datadog [taux d'échantillonnage automatiquement calculés](#in-the-agent) sont étiquetés avec la raison d'ingestion `auto`. La balise `ingestion_reason` est également définie sur [les métriques d'utilisation][2]. Les services utilisant le mécanisme par défaut de l'Agent Datadog sont étiquetés comme `Automatic` dans la colonne Configuration de la [Page de Contrôle d'Ingestion][5].

### Dans les bibliothèques de traçage : règles définies par l'utilisateur
`ingestion_reason: rule`

Pour un contrôle plus granulaire, utilisez les options de configuration d'échantillonnage de la bibliothèque de traçage :
- Définissez un taux d'échantillonnage spécifique **à appliquer à la racine du traçage**, par service et/ou nom de ressource, en remplaçant le [mécanisme par défaut](#in-the-agent) de l'Agent.
- Définissez une **limite de taux** sur le nombre de traces ingérées par seconde. La limite de taux par défaut est de 100 traces par seconde par instance de service (lors de l'utilisation du [mécanisme par défaut](#in-the-agent) de l'Agent, le limiteur de taux est ignoré).

**Remarque** : Les règles d'échantillonnage sont également des contrôles d'échantillonnage basés sur l'en-tête. Si le trafic pour un service est supérieur au maximum configuré de traces par seconde, alors les traces sont abandonnées à la racine. Cela ne crée pas de traces incomplètes.

La configuration peut être définie par des variables d'environnement ou directement dans le code :

{{< tabs >}}
{{% tab "Java" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, pour les applications Java, définissez les taux d'échantillonnage par service et par ressource depuis l'interface <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de Contrôle d'Ingestion</a>.

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance a la priorité sur la configuration locale.

**Configuration locale**

Pour les applications Java, définissez les taux d'échantillonnage par service et par ressource (à partir de la version [v1.26.0][3] pour l'échantillonnage basé sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces d'autres points de terminaison, définissez :

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

La valeur du nom de service est sensible à la casse et doit correspondre à la casse du nom de service réel.

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` à un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` à `0.1`, définissez `DD_TRACE_SAMPLING_RULES` à `[{"sample_rate":0.1}]` à la place.

Lisez-en plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Java][2].

[1]: /fr/tracing/guide/resource_based_sampling
[2]: /fr/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, pour les applications Python, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de Contrôle d'Ingestion</a>.

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et par ressource dans le [guide d'échantillonnage basé sur les ressources][3].

**Remarque** : La configuration définie à distance a la priorité sur la configuration locale.

**Configuration locale**
Pour les applications Python, définissez les taux d'échantillonnage par service et par ressource (à partir de la version [v2.8.0][1] pour l'échantillonnage basé sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces d'autres points de terminaison, définissez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` à un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` à `0.1`, définissez `DD_TRACE_SAMPLING_RULES` à `[{"sample_rate":0.1}]` à la place.

Lisez-en plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
[3]: /fr/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, pour les applications Ruby, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de Contrôle d'Ingestion</a>.

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance a la priorité sur la configuration locale.

**Configuration locale**
Pour les applications Ruby, définissez un taux d'échantillonnage global pour la bibliothèque en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % du reste des traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` à un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

Lisez-en plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Ruby][1].

[1]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, pour les applications Go, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de Contrôle d'Ingestion</a>. 

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et par ressource dans cet [article][3].

**Remarque** : La configuration définie à distance prend le pas sur la configuration locale.

**Configuration locale**

Pour les applications Go, définissez les taux d'échantillonnage par service et par ressource (à partir de la version [v1.60.0][2] pour l'échantillonnage basé sur les ressources) avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour capturer 100 % des traces pour la ressource `GET /checkout` du service `my-service`, et 20 % des traces d'autres points de terminaison, définissez :

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` à un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

**Remarque** : L'utilisation de `DD_TRACE_SAMPLE_RATE` est obsolète. Utilisez `DD_TRACE_SAMPLING_RULES` à la place. Par exemple, si vous avez déjà défini `DD_TRACE_SAMPLE_RATE` à `0.1`, définissez `DD_TRACE_SAMPLING_RULES` à `[{"sample_rate":0.1}]` à la place.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Go][1].

[1]: /fr/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /fr/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, pour les applications Node.js, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de Contrôle d'Ingestion</a>.

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance a la priorité sur la configuration locale.

**Configuration locale**

Pour les applications Node.js, définissez un taux d'échantillonnage global dans la bibliothèque en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`.

Vous pouvez également définir des taux d'échantillonnage par service. Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % pour le reste des traces :

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

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` à un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

En savoir plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, pour les applications PHP, définissez les taux d'échantillonnage par service et par ressource depuis la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">Page de Contrôle d'Ingestion</a>.

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance a la priorité sur la configuration locale.

**Configuration locale**

Pour les applications PHP, définissez un taux d'échantillonnage global pour la bibliothèque en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez les taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service`, 20 % des traces d'autres points de terminaison, et 10 % pour le reste des traces, définissez :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage PHP][1].

[1]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuration distante**

À partir de la version <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, pour les applications C++, définissez les taux d'échantillonnage par service et par ressource depuis l'interface utilisateur de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Page de Contrôle d'Ingestion</a>.

Lisez-en plus sur la façon de configurer à distance les taux d'échantillonnage par service et ressource dans le [guide d'échantillonnage basé sur les ressources][1].

**Remarque** : La configuration définie à distance a la priorité sur la configuration locale.

**Configuration locale**
À partir de [v0.1.0][1], la bibliothèque C++ de Datadog prend en charge les configurations suivantes :
- Taux d'échantillonnage global : variable d'environnement `DD_TRACE_SAMPLE_RATE`
- Taux d'échantillonnage par service : variable d'environnement `DD_TRACE_SAMPLING_RULES`.
- Paramètre de limitation de taux : variable d'environnement `DD_TRACE_RATE_LIMIT`.

Par exemple, pour envoyer 50 % des traces pour le service nommé `my-service` et 10 % pour le reste des traces :

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ ne fournit pas d'intégrations pour l'instrumentation automatique, mais il est utilisé par le traçage proxy tel qu'Envoy, Nginx ou Istio. En savoir plus sur la façon de configurer l'échantillonnage pour les proxies dans [Tracing proxies][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /fr/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Pour les applications .NET, définissez un taux d'échantillonnage global pour la bibliothèque en utilisant la variable d'environnement `DD_TRACE_SAMPLE_RATE`. Définissez des taux d'échantillonnage par service avec la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

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

<div class="alert alert-info">À partir de la version 2.35.0, si <a href="/remote_configuration">la configuration distante de l'agent</a> est activée où le service s'exécute, vous pouvez définir un <code>DD_TRACE_SAMPLE_RATE</code> par service dans l'interface utilisateur du <a href="/tracing/software_catalog">catalogue de logiciels</a>.</div>

Configurez une limite de taux en définissant la variable d'environnement `DD_TRACE_RATE_LIMIT` à un nombre de traces par seconde par instance de service. Si aucune valeur `DD_TRACE_RATE_LIMIT` n'est définie, une limite de 100 traces par seconde est appliquée.

En savoir plus sur les contrôles d'échantillonnage dans la [.NET tracing library documentation][1].\
En savoir plus sur [la configuration des variables d'environnement pour .NET][2].

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Tous les spans d'une trace échantillonnée à l'aide d'une configuration de bibliothèque de traçage sont étiquetés avec la raison d'ingestion `rule`. Les services configurés avec des règles d'échantillonnage définies par l'utilisateur sont marqués comme `Configured` dans la colonne Configuration de la [page de contrôle d'ingestion][5].

## Erreurs et traces rares

Pour les traces non captées par l'échantillonnage basé sur l'en-tête, deux mécanismes d'échantillonnage supplémentaires de l'agent Datadog garantissent que les traces critiques et diverses sont conservées et ingérées. Ces deux échantillonneurs conservent un ensemble diversifié de traces locales (ensemble de spans provenant du même hôte) en capturant toutes les combinaisons d'un ensemble prédéterminé d'étiquettes :

- **Traces d'erreur** : Échantillonner les erreurs est important pour fournir une visibilité sur les potentielles défaillances du système.
- **Traces rares** : Échantillonner les traces rares vous permet de garder une visibilité sur votre système dans son ensemble, en veillant à ce que les services et ressources à faible trafic soient toujours surveillés.

**Remarque** : Les échantillonneurs d'erreurs et de traces rares sont ignorés pour les services pour lesquels vous avez défini [des règles d'échantillonnage de bibliothèque](#in-tracing-libraries-user-defined-rules).

### Traces d'erreur
`ingestion_reason: error`

L'échantillonneur d'erreurs capture des morceaux de traces contenant des spans d'erreur qui ne sont pas captés par l'échantillonnage basé sur l'en-tête. Il capture des traces d'erreur jusqu'à un taux de 10 traces par seconde (par agent). Il garantit une visibilité complète sur les erreurs lorsque le taux d'échantillonnage basé sur l'en-tête est faible.

Avec la version 7.33 de l'agent et les versions ultérieures, vous pouvez configurer l'échantillonneur d'erreurs dans le fichier de configuration principal de l'agent (`datadog.yaml`) ou avec des variables d'environnement :

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Échantillonnage d'erreurs" style="width:100%;" >}}

**Notes** :
1. Définissez le paramètre sur `0` pour désactiver l'échantillonneur d'erreurs.
2. L'échantillonneur d'erreurs capture des traces locales avec des intervalles d'erreurs au niveau de l'Agent. Si la trace est distribuée, il n'y a aucune garantie que la trace complète soit envoyée à Datadog.
3. Par défaut, les intervalles supprimés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` sont **exclus** sous l'échantillonneur d'erreurs.

#### Datadog Agent 7.42.0 et supérieur

L'échantillonnage d'erreurs est configuré à distance si vous utilisez la version de l'Agent [7.42.0][20] ou supérieure. Suivez la [documentation][21] pour activer la configuration à distance dans vos Agents. Avec la configuration à distance, vous pouvez activer la collecte d'intervalles rares sans avoir à redémarrer l'Agent Datadog.

#### Datadog Agent 6/7.41.0 et supérieur

Pour remplacer le comportement par défaut afin que les intervalles supprimés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` soient **inclus** par l'échantillonneur d'erreurs, activez la fonctionnalité avec : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans l'Agent Datadog (ou le conteneur dédié de l'Agent de traçage dans le pod de l'Agent Datadog dans Kubernetes).


#### Datadog Agent 6/7.33 à 6/7.40.x

Le comportement par défaut de l'échantillonnage d'erreurs ne peut pas être modifié pour ces versions de l'Agent. Mettez à niveau l'Agent Datadog vers Datadog Agent 6/7.41.0 et supérieur.


### Traces rares
`ingestion_reason: rare`

L'échantillonneur rare envoie un ensemble d'intervalles rares à Datadog. Il capture des combinaisons de `env`, `service`, `name`, `resource`, `error.type` et `http.status` jusqu'à 5 traces par seconde (par Agent). Il garantit la visibilité sur les ressources à faible trafic lorsque le taux d'échantillonnage basé sur l'en-tête est faible.

**Remarque** : L'échantillonneur rare capture des traces locales au niveau de l'Agent. Si la trace est distribuée, il n'y a aucun moyen de garantir que la trace complète sera envoyée à Datadog.

#### Datadog Agent 7.42.0 et supérieur

Le taux d'échantillonnage rare est configuré à distance si vous utilisez la version Agent [7.42.0][20] ou supérieure. Suivez la [documentation][21] pour activer la configuration à distance dans vos Agents. Avec la configuration à distance, vous pouvez changer la valeur du paramètre sans avoir à redémarrer l'Agent Datadog.

#### Datadog Agent 6/7.41.0 et supérieur

Par défaut, l'échantillonneur rare n'est **pas activé**.

**Remarque** : Lorsque **activé**, les spans supprimés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` sont **exclus** sous cet échantillonneur.

Pour configurer l'échantillonneur rare, mettez à jour le paramètre `apm_config.enable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_ENABLE_RARE_SAMPLER` :

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Pour évaluer les spans supprimés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop`,
 activez la fonctionnalité avec : `DD_APM_FEATURES=error_rare_sample_tracer_drop` dans l'Agent de traçage.


#### Datadog Agent 6/7.33 à 6/7.40.x

Par défaut, l'échantillonneur rare est activé.

**Remarque** : Lorsque **activé**, les spans supprimés par les règles de la bibliothèque de traçage ou par une logique personnalisée telle que `manual.drop` **sont exclus** sous cet échantillonneur. Pour inclure ces spans dans cette logique, mettez à niveau vers l'Agent Datadog 6.41.0/7.41.0 ou supérieur.

Pour changer les paramètres par défaut de l'échantillonneur rare, mettez à jour le paramètre `apm_config.disable_rare_sampler` dans le fichier de configuration principal de l'Agent (`datadog.yaml`) ou avec la variable d'environnement `DD_APM_DISABLE_RARE_SAMPLER` :

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forcer garder et supprimer
`ingestion_reason: manual`

Le mécanisme d'échantillonnage basé sur l'en-tête peut être remplacé au niveau de la bibliothèque de traçage. Par exemple, si vous devez surveiller une transaction critique, vous pouvez forcer le traçage associé à être conservé. D'autre part, pour des informations inutiles ou répétitives comme les vérifications de santé, vous pouvez forcer le traçage à être supprimé.

- Définissez le maintien manuel sur un span pour indiquer que celui-ci et tous les spans enfants doivent être ingérés. Le traçage résultant peut sembler incomplet dans l'interface utilisateur si le span en question n'est pas le span racine du traçage.

- Définissez la suppression manuelle sur un span pour vous assurer que **aucun** span enfant n'est ingéré. [Les échantillonneurs d'erreurs et rares](#error-and-rare-traces) seront ignorés dans l'Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Conservez manuellement un traçage :

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

Déposez manuellement une trace :

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

Conservez manuellement un traçage :

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

Déposez manuellement une trace :

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

Conservez manuellement un traçage :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Déposez manuellement une trace :

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Conservez manuellement un traçage :

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

Déposez manuellement une trace :

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

Conservez manuellement un traçage :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Déposez manuellement une trace :

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

Conservez manuellement un traçage :

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

Déposez manuellement une trace :

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


Conservez manuellement un traçage :

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

Déposez manuellement une trace :

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

Conservez manuellement un traçage :

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

Déposez manuellement une trace :

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

La conservation manuelle des traces doit se faire avant la propagation du contexte. Si elle est conservée après la propagation du contexte, le système ne peut pas garantir que l'ensemble de la trace est conservé à travers les services. La conservation manuelle des traces est définie à l'emplacement du client de traçage, de sorte que la trace peut toujours être déposée par l'agent ou l'emplacement du serveur en fonction des règles d'échantillonnage.


## Spans uniques
`ingestion_reason: single_span`

Si vous devez échantillonner un span spécifique, mais que vous n'avez pas besoin que la trace complète soit disponible, les bibliothèques de traçage vous permettent de définir un taux d'échantillonnage à configurer pour un seul span.

Par exemple, si vous construisez [des métriques à partir de spans][6] pour surveiller des services spécifiques, vous pouvez configurer des règles d'échantillonnage de spans pour garantir que ces métriques sont basées sur 100 % du trafic de l'application, sans avoir à ingérer 100 % des traces pour toutes les requêtes circulant à travers le service.

Cette fonctionnalité est disponible pour Datadog Agent v[7.40.0][19]+.

**Remarque** : Les règles d'échantillonnage de spans uniques **ne peuvent** pas être utilisées pour déposer des spans qui sont conservés par [l'échantillonnage basé sur l'en-tête](#head-based-sampling), mais seulement pour conserver des spans supplémentaires qui sont déposés par l'échantillonnage basé sur l'en-tête.

{{< tabs >}}
{{% tab "Java" %}}
À partir de la version de la bibliothèque de traçage [1.7.0][1], pour les applications Java, définissez les règles d'échantillonnage de spans **par service** et **par nom d'opération** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter 100 % des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à 50 spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lisez-en plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /fr/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
À partir de la version [v1.4.0][1], pour les applications Python, définissez les règles d'échantillonnage de spans **par service** et **par nom d'opération** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Lisez-en plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /fr/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
À partir de la version [v1.5.0][1], pour les applications Ruby, définissez les règles d'échantillonnage de spans **par service** et **par nom d'opération** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /fr/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
À partir de la version [v1.41.0][1], pour les applications Go, définissez les règles d'échantillonnage de spans **par service** et **par nom d'opération** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
À partir de la version [v1.60.0][3], pour les applications Go, définissez les règles d'échantillonnage de spans **par ressource** et **par balises avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service pour la ressource `POST /api/create_issue`, pour la balise `priority` avec la valeur `high` :

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /fr/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Pour les applications Node.js, définissez les règles d'échantillonnage de spans **par service** et **par nom d'opération** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

En savoir plus sur les contrôles d'échantillonnage dans la [documentation de la bibliothèque de traçage Node.js][1].

[1]: /fr/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
À partir de la version [v0.77.0][1], pour les applications PHP, définissez les règles d'échantillonnage par service et par nom d'opération **span** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /fr/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
À partir de la version [v0.1.0][1], pour les applications C++, définissez les règles d'échantillonnage par service et par nom d'opération **span** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
À partir de la version [v2.18.0][1], pour les applications .NET, définissez les règles d'échantillonnage par service et par nom d'opération **span** avec la variable d'environnement `DD_SPAN_SAMPLING_RULES`.

Par exemple, pour collecter `100%` des spans du service nommé `my-service`, pour l'opération `http.request`, jusqu'à `50` spans par seconde :

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Pour en savoir plus sur les contrôles d'échantillonnage, consultez la [documentation de la bibliothèque de traçage .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> Le mécanisme <a href="/tracing/legacy_app_analytics/">App Analytics</a> est entièrement obsolète. Pour ingérer des spans uniques sans la trace complète, utilisez la configuration <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">Single Span sampling</a>. Pour ingérer des traces complètes, utilisez les configurations <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">Head-Based sampling</a>.</div>

## Spans de produit ingérés

### Traces RUM
`ingestion_reason:rum`

Une requête d'une application web ou mobile génère une trace lorsque les services backend sont instrumentés. [L'intégration APM avec le suivi des utilisateurs réels][7] relie les requêtes des applications web et mobiles à leurs traces backend correspondantes afin que vous puissiez voir vos données frontend et backend complètes à travers un seul prisme.

À partir de la version `4.30.0` du SDK navigateur RUM, vous pouvez contrôler les volumes ingérés et conserver un échantillonnage des traces backend en configurant le paramètre d'initialisation `traceSampleRate`. Définissez `traceSampleRate` sur un nombre compris entre `0` et `100`.
Si aucune valeur `traceSampleRate` n'est définie, un défaut de 100 % des traces provenant des requêtes du navigateur est envoyé à Datadog.

De même, contrôlez le taux d'échantillonnage des traces dans d'autres SDK en utilisant des paramètres similaires :

| SDK         | Paramètre             | Version minimale    |
|-------------|-----------------------|--------------------|
| Navigateur     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _Le taux d'échantillonnage est rapporté dans la page de contrôle d'ingestion depuis [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _Le taux d'échantillonnage est rapporté dans la page de contrôle d'ingestion depuis [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _ Le taux d'échantillonnage est rapporté dans la page de contrôle d'ingestion depuis [1.2.0][18]_  |

### Traces synthétiques
`ingestion_reason:synthetics` et `ingestion_reason:synthetics-browser`

Les tests HTTP et de navigateur génèrent des traces lorsque les services backend sont instrumentés. [L'intégration APM avec les tests synthétiques][13] relie vos tests synthétiques aux traces backend correspondantes. Naviguez d'un test qui a échoué à la cause racine du problème en consultant la trace générée par ce test.

Par défaut, 100 % des tests HTTP et de navigateur synthétiques génèrent des traces backend.

### Autres produits

Certaines raisons d'ingestion supplémentaires sont attribuées à des spans générés par des produits Datadog spécifiques :

| Produit    | Raison d'ingestion                    | Description du mécanisme d'ingestion |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` et `xray`                   | Vos traces reçues des [applications Serverless][14] tracées avec les bibliothèques de traçage Datadog ou l'intégration AWS X-Ray. |
| Protection des applications et des API     | `appsec`                            | Traces ingérées à partir des bibliothèques de traçage Datadog et signalées par [AAP][15] comme une menace. |
| Observabilité des données : Surveillance des travaux    | `data_jobs`                            | Traces ingérées à partir de l'intégration Datadog Java Tracer Spark ou de l'intégration Databricks. |

## Mécanismes d'ingestion dans OpenTelemetry
`ingestion_reason:otel`

En fonction de votre configuration avec les SDK OpenTelemetry (en utilisant le collecteur OpenTelemetry ou l'agent Datadog), vous avez plusieurs façons de contrôler l'échantillonnage d'ingestion. Voir [Échantillonnage d'ingestion avec OpenTelemetry][22] pour des détails sur les options disponibles pour l'échantillonnage au niveau des SDK OpenTelemetry, du collecteur OpenTelemetry et de l'agent Datadog dans diverses configurations OpenTelemetry.

## Lectures complémentaires

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