---
aliases:
- /fr/tracing/advanced/runtime_metrics/
- /fr/tracing/metrics/runtime_metrics/dotnet
- /fr/tracing/metrics/runtime_metrics/java
- /fr/tracing/metrics/runtime_metrics/nodejs
- /fr/tracing/metrics/runtime_metrics/python
- /fr/tracing/metrics/runtime_metrics/ruby
- /fr/tracing/runtime_metrics/dotnet
- /fr/tracing/runtime_metrics/java
- /fr/tracing/runtime_metrics/nodejs
- /fr/tracing/runtime_metrics/python
- /fr/tracing/runtime_metrics/ruby
description: Obtenez des informations supplémentaires sur les performances d'une application
  grâce aux métriques d'exécution associées à vos traces.
further_reading:
- link: /opentelemetry/integrations/runtime_metrics/
  tag: Documentation
  text: Métriques de runtime OpenTelemetry
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Corrélez vos logs et vos traces
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumentez votre application manuellement pour créer des traces.
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Métriques runtime
---
## Présentation {#overview}

Les métriques d'exécution surveillent l'utilisation de la mémoire, le ramasse-miettes et la parallélisation de votre application. Les SDK Datadog collectent automatiquement ces métriques pour les environnements pris en charge.

Ces métriques vous aident à identifier les goulots d'étranglement, à résoudre les problèmes de performance et à optimiser l'utilisation des ressources. En consultant les métriques d'exécution parallèlement aux traces et aux logs, vous bénéficiez d'une visibilité complète sur la santé et les performances de votre application.

Pour les métriques d'exécution collectées par les SDK OpenTelemetry en amont, consultez [OpenTelemetry Runtime Metrics][10] pour obtenir les instructions de configuration.

## Compatibilité {#compatibility}

Les métriques d'exécution sont disponibles pour plusieurs langages de programmation et environnements d'exécution, avec différents niveaux de prise en charge et différentes options de configuration. 

{{< tabs >}}
{{% tab "Java" %}}

- **Activé par défaut** : Oui
- **Version de la bibliothèque** : 0.29.0+
- **Environnements d'exécution** : Java 8+

<div class="alert alert-danger">La collecte de métriques JMX n'est pas prise en charge dans les environnements AWS Lambda.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 0.30.0+
  - **Niveau de prise en charge** : Préversion
  - **Environnements d'exécution** : Toutes les versions de Python prises en charge

{{% /tab %}}

{{% tab "Ruby" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 0.44.0+
  - **Environnements d'exécution** : Toutes les versions de Ruby prises en charge


<div class="alert alert-info">Vous devez ajouter la gem <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> à votre application.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 1.18.0+
  - **Environnements d'exécution** : Toutes les versions de Go prises en charge

{{% /tab %}}

{{% tab "Node.js" %}}

  - **Activé par défaut** : Non
  - **Version de la bibliothèque** : 3.0.0+
  - **Environnements d'exécution** : Toutes les versions de Node.js prises en charge

{{% /tab %}}

{{% tab ".NET" %}}

  - **Activé par défaut** : Oui, sur .NET 6+ (v3.40.0+).
  - **Version de la bibliothèque** : 1.23.0+
  - **Environnements d'exécution** : .NET Framework 4.6.1+ et .NET Core 3.1+ (y compris .NET 5 et versions ultérieures).

#### Autorisations pour Internet Information Services (IIS) (.NET Framework uniquement) {#permissions-for-internet-information-services-iis-net-framework-only}

Sur .NET Framework, les métriques sont collectées à l'aide de compteurs de performance. Les utilisateurs dans des sessions d'ouverture de session non interactives (ce qui inclut les comptes de pool d'applications IIS et certains comptes de service) doivent être ajoutés au groupe {{< ui >}}Performance Monitoring Users{{< /ui >}} pour accéder aux données des compteurs.

Les pools d'applications IIS utilisent des comptes spéciaux qui n'apparaissent pas dans la liste des utilisateurs. Pour les ajouter au groupe Performance Monitoring Users, recherchez `IIS APPPOOL\<name of the pool>`. Par exemple, l'utilisateur pour le DefaultAppPool serait `IIS APPPOOL\DefaultAppPool`.

Vous pouvez le faire depuis l'interface « Computer Management » ou depuis une invite de commande administrateur :

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-danger">Les métriques d'exécution pour PHP ne sont pas prises en charge.</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class="alert alert-danger">Les métriques d'exécution pour C++ ne sont pas prises en charge.</div>

{{% /tab %}}
{{< /tabs >}}

## Instructions de configuration {#setup-instructions}

Les instructions suivantes exportent les métriques d'exécution via DogStatsD. Pour l'exportation OTLP, consultez [Exporter des métriques d'exécution via OTLP][12].

Pour configurer les métriques d'exécution, vous devez configurer à la fois le Datadog Agent et votre application.

### 1. Configurez le Datadog Agent {#1-configure-the-datadog-agent}

Activez [DogStatsD pour l'Agent][2]. Par défaut, le Datadog Agent est configuré pour ingérer des métriques via UDP sur le port `8125`.

{{% collapse-content title="Configuration spécifique aux conteneurs" level="h4" expanded=false %}}

Lorsque vous exécutez l'Agent dans des environnements conteneurisés, une configuration supplémentaire est requise :

1. Vérifiez que le trafic non local DogStatsD est activé. Ce paramètre est activé par défaut. Si vous l'avez précédemment désactivé, définissez `dogstatsd_non_local_traffic: true` dans votre [fichier de configuration `datadog.yaml`][8] principal, ou définissez la [variable d'environnement][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Suivez ces instructions de configuration spécifiques aux conteneurs :

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2,uk1" >}}

3. Définissez `DD_SITE` dans le Datadog Agent sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon emplacement Datadog.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configurez votre application {#2-configure-your-application}

Configurez les métriques d'exécution dans votre application à l'aide de variables d'environnement. Certains langages prennent également en charge la configuration des métriques d'exécution [directement dans le code](#code-based-configuration).

#### Variables d'environnement {#environment-variables}

Utilisez les variables d'environnement suivantes pour configurer les métriques d'exécution dans votre application :

`DD_RUNTIME_METRICS_ENABLED`
: **Par défaut**: `true` pour Java et .NET 6+ (v3.40.0+), `false` pour tous les autres langages et environnements d'exécution. <br>
**Description**: Active la collecte des métriques d'exécution. Les métriques sont envoyées au Datadog Agent, conformément à la configuration de l'application instrumentée.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Par défaut**: `true` pour Java, `false` pour Node.js, Ruby et Python. N'existe pas pour .NET et Go ; le `runtime_id` est toujours rapporté. <br>
**Description** : Active les métriques d'exécution améliorées, fournissant un tag `runtime_id` avec chaque métrique. Le `runtime_id` représente l'identifiant de processus de l'application et vous permet de corréler directement les métriques d'exécution avec les applications en cours d'exécution individuelles. 

`DD_AGENT_HOST`
: **Par défaut** : `localhost` <br>
**Description** : Définit l'adresse du host pour la soumission des métriques du SDK. Il peut s'agir d'un nom de host ou d'une adresse IP.

`DD_DOGSTATSD_PORT`
: **Par défaut** : `8125` <br>
**Description** : Définit le port pour la soumission des métriques du SDK.

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **Par défaut** : `true` à partir de la version 3.40.0 du traceur sur .NET 8+ et sur .NET 6/7 lorsque `DD_RUNTIME_METRICS_ENABLED` n'est pas explicitement défini, sinon `false`. <br>
**Description** : Disponible à partir de .NET 6. Ce paramètre contrôle si le traceur .NET utilise la nouvelle API [`System.Diagnostics.Metrics`][9] pour collecter les métriques au lieu du collecteur basé sur `EventListener`.

#### Configuration basée sur le code {#code-based-configuration}

En plus des variables d'environnement, certains langages prennent en charge la configuration des métriques d'exécution directement dans le code.

{{< tabs >}}
{{% tab "Java" %}}

Vous pouvez uniquement activer les métriques d'exécution avec des [variables d'environnement](#environment-variables).

Cependant, vous pouvez étendre les métriques collectées en ajoutant des métriques JMX personnalisées. Pour plus d'informations, consultez la documentation sur l'[intégration JMX][100].

[100]: /fr/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

Vous pouvez activer les métriques d'exécution avec des [variables d'environnement](#environment-variables) ou dans le code :

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">Ceci s'applique uniquement si vous n'utilisez pas <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

Vous pouvez activer les métriques d'exécution avec des [variables d'environnement](#environment-variables) ou dans le code :

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
{{% /tab %}}

{{% tab "Go" %}}

Vous pouvez activer les métriques d'exécution avec des [variables d'environnement](#environment-variables) ou dans le code :

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

L'option `WithDogstatsdAddr` vous permet de spécifier une adresse personnalisée pour le serveur DogStatsD. Utilisez l'option [`WithDogstatsdAddr`][101] (ou [`WithDogstatsdAddress` v1][100]) si votre adresse diffère de la valeur par défaut `localhost:8125`. (Disponible pour 1.18.0+)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

Vous pouvez activer les métriques d'exécution avec des [variables d'environnement](#environment-variables) ou dans le code :

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

Vous pouvez uniquement activer les métriques d'exécution avec des [variables d'environnement](#environment-variables).

{{% /tab %}}
{{< /tabs >}}

## Exporter les métriques d'exécution via OTLP {#export-runtime-metrics-over-otlp}

Utilisez l'un des SDK DDOT suivants pour exporter les métriques d'exécution via OTLP :

| SDK | Version minimale du SDK | Exigence d'exécution |
|-----|---------------------|---------------------|
| Java | v1.63.0 | Java 8+ |
| .NET | v3.44.0 | .NET 6+ |
| Node.js | v5.107.0 | Une version de Node.js prise en charge par le SDK |
| Go | v2.10.0 | Une version de Go prise en charge par le SDK |

Pour plus d'informations sur les variables d'environnement et les paramètres d'endpoint, consultez la documentation sur l'[exportation des métriques d'exécution via OTLP][11].

## Dashboards {#dashboards}

Une fois la configuration terminée, vous pouvez consulter les métriques d'exécution dans :

- La page de détails du service instrumenté
- L'onglet {{< ui >}}Metrics{{< /ui >}} flame graph
- Dashboards d'exécution par défaut

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## Dépannage {#troubleshooting}
- Pour associer les métriques d'exécution aux flame graphs, assurez-vous que le tag `env` (sensible à la casse) est défini et identique dans l'ensemble de votre environnement.
- Pour que les métriques d'exécution apparaissent sur la page du service lors de l'utilisation de Fargate, assurez-vous que `DD_DOGSTATSD_TAGS` est défini sur votre tâche d'Agent et que le tag `env` configuré correspond au `env` du service instrumenté.

## Données collectées {#data-collected}

Chaque langage pris en charge collecte un ensemble de métriques d'exécution qui fournissent des informations sur l'utilisation de la mémoire, le garbage collection, l'utilisation du processeur et d'autres indicateurs de performance.

{{< tabs >}}
{{< tab "Java" >}}
{{< get-metrics-from-git "java" >}}
{{< /tab >}}

{{< tab "Python" >}}
{{< get-metrics-from-git "python" >}}
{{< /tab >}}

{{< tab "Ruby" >}}
{{< get-metrics-from-git "ruby" >}}
{{< /tab >}}

{{< tab "Go" >}}
{{< get-metrics-from-git "go" >}}
{{< /tab >}}

{{< tab "Node.js" >}}
{{< get-metrics-from-git "node" >}}
{{< /tab >}}

{{< tab ".NET" >}}
{{< get-metrics-from-git "dotnet" >}}
{{< /tab >}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/extend/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[7]: /fr/extend/dogstatsd/unix_socket/
[8]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file
[9]: https://learn.microsoft.com/dotnet/api/system.diagnostics.metrics
[10]: /fr/opentelemetry/integrations/runtime_metrics/
[11]: /fr/opentelemetry/config/environment_variable_support/#export-runtime-metrics-over-otlp
[12]: #export-runtime-metrics-over-otlp