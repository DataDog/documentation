---
code_lang: windows
code_lang_weight: 5
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentation
  text: Utiliser des composants OpenTelemetry personnalisés avec le Datadog Agent
title: Installer le Collector DDOT sur Windows
type: multi-code-lang
---
## Présentation {#overview}

Suivez ce guide pour installer la distribution Datadog du Collector OpenTelemetry (DDOT) sur des hosts bare-metal et des machines virtuelles basés sur Windows.

## Prérequis {#requirements}

Pour compléter ce guide, vous avez besoin des éléments suivants :

**Compte Datadog** :
1. [Créez un compte Datadog][1] si vous n'en avez pas.
1. Trouvez ou créez votre [clé d'API Datadog][2].

**Logiciel** :
- Une version Windows prise en charge (Windows Server 2016+ ou Windows 10+). Consultez les [plateformes prises en charge][14] pour plus de détails.

**Réseau** :

{{% otel-network-requirements %}}

## Installer le Datadog Agent avec le Collector OpenTelemetry {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">Cette installation est requise pour les configurations Datadog SDK + DDOT et OpenTelemetry SDK + DDOT. Bien que le SDK Datadog implémente l'API OpenTelemetry, il nécessite toujours le Collector DDOT pour traiter et transférer les métriques et logs OTLP.</div>

### Installation {#installation}

Pour installer le Collector DDOT sur un host Windows, utilisez la commande MSI suivante :

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" SITE="{{< region-param key="dd_site" >}}" DD_OTELCOLLECTOR_ENABLED=true'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```

Cette commande installe à la fois le package principal du Datadog Agent et le Collector DDOT qui s'exécute parallèlement.

**Remarque** : Pour l'Agent v7.78+, si le Datadog Agent est déjà installé sur le host, vous pouvez installer le Collector DDOT séparément. Exécutez depuis une **session PowerShell élevée** :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" otel install
```

### Validation {#validation}

Exécutez la [commande de statut][3] de l'Agent pour vérifier l'installation.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

Si aucune erreur n'a été rencontrée lors de l'installation, un rapport sur le statut de l'Agent est renvoyé. Les premières lignes ressemblent alors à ce qui suit :

```text
====================
Agent (v7.x.x)
====================
  Status date: 2025-08-22 18:35:17.449 UTC (1755887717449)
  Agent start: 2025-08-22 18:16:27.004 UTC (1755886587004)
  Pid: 2828211
  Go Version: go1.24.6
  Python Version: 3.12.11
  Build arch: amd64
  Agent flavor: agent
  FIPS Mode: not available
  Log Level: info
```

Il y aura également une {{< ui >}}OTel Agent{{< /ui >}} section de statut qui inclut des informations OpenTelemetry :

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.x.x
  Collector Version: v0.129.0

  Receiver
  ==========================
    Spans Accepted: 0
    Metric Points Accepted: 1055
    Log Records Accepted: 0

  Exporter
  ==========================
    Spans Sent: 0
    Metric Points Sent: 1055
    Log Records Sent: 0
```

## Configurez le Datadog Agent {#configure-the-datadog-agent}

### Activez le DDOT Collector {#enable-the-ddot-collector}
Le fichier de configuration du Datadog Agent est automatiquement installé à `C:\ProgramData\Datadog\datadog.yaml`. L'installateur ajoute les paramètres de configuration suivants à `C:\ProgramData\Datadog\datadog.yaml` pour activer le DDOT Collector :

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
{{< /code-block >}}

DDOT lie automatiquement l'OpenTelemetry Collector aux ports 4317 (grpc) et 4318 (http) par défaut.

### (Facultatif) Activez des fonctionnalités Datadog supplémentaires {#optional-enable-additional-datadog-features}

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Consultez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre responsable de la réussite client avant de continuer.</div>

Pour obtenir une liste complète des options disponibles, consultez le fichier de référence entièrement commenté sur `C:\ProgramData\Datadog\datadog.yaml.example`. Sinon, consultez le [fichier de configuration de l'Agent pour Windows][12] sur GitHub.

Lors de l'activation de fonctionnalités Datadog supplémentaires, utilisez toujours les fichiers de configuration du Collector Datadog ou du Collector OpenTelemetry au lieu de vous fier aux variables d'environnement Datadog.

## Configurez l'OpenTelemetry Collector {#configure-the-opentelemetry-collector}

L'installateur fournit un exemple de configuration de l'OpenTelemetry Collector sur `C:\ProgramData\Datadog\otel-config.yaml` que vous pouvez utiliser comme point de départ.

{{% collapse-content title="Exemple de fichier otel-config.yaml issu de l'installation" level="p" %}}
L'exemple `otel-config.yaml` issu de l'installation ressemblera à ceci :
{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
  cumulativetodelta:
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, cumulativetodelta]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### Composants clés {#key-components}

Pour envoyer des données de télémétrie à Datadog, les composants suivants sont définis dans la configuration :

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagramme illustrant le modèle de déploiement de l'Agent" style="width:100%;" >}}

##### Datadog connector {#datadog-connector}

Le [Datadog connector][4] calcule les métriques de trace Datadog APM.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog Exporter {#datadog-exporter}

Le [Datadog exporter][5] exporte des traces, des métriques et des logs vers Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**Remarque** : Si `key` n'est pas spécifié ou défini sur un secret, ou si `site` n'est pas spécifié, le système utilise les valeurs de la configuration principale de l'Agent. Par défaut, l'Agent principal définit le site sur `datadoghq.com` (US1).

##### Prometheus receiver {#prometheus-receiver}

Le [Prometheus receiver][6] collecte des métriques de santé depuis l'OpenTelemetry Collector pour le pipeline de métriques.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

Pour plus d'informations, consultez la documentation sur les [Métriques de santé de Collector][11].

## Envoyez votre télémétrie vers Datadog {#send-your-telemetry-to-datadog}

Pour envoyer vos données de télémétrie vers Datadog :

1. [Instrumentez votre application](#instrument-the-application)
2. [Configurez l'application](#configure-the-application)
3. [Corrélez les données d'observabilité](#correlate-observability-data)
4. [Exécutez votre application](#run-the-application)

### Instrumentez l'application {#instrument-the-application}

Instrumentez votre application [en utilisant l'API OpenTelemetry][7].

{{% collapse-content title="Exemple d'application instrumentée avec l'API OpenTelemetry" level="p" %}}
À titre d'exemple, vous pouvez utiliser l'[exemple d'application Calendrier][8] qui est déjà instrumenté pour vous. Le code suivant instrumente la méthode [CalendarService.getDate()][9] en utilisant les annotations et l'API OpenTelemetry :
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configurez l'application {#configure-the-application}

Votre application doit envoyer des données au DDOT Collector sur le même host. Assurez-vous que la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` est définie sur votre application.

Si vous utilisez l'application exemple, [`run-otel-local.sh`][13] configure les variables d'environnement requises et exécute l'application :
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
{{< /code-block >}}

**Remarque** : vous pouvez exécuter ce script dans Git Bash, qui est inclus avec Git pour Windows.
### Corréler les données d'observabilité {#correlate-observability-data}

[Unified service tagging][10] relie les données d'observabilité dans Datadog afin que vous puissiez naviguer entre les métriques, les traces et les logs avec des tags cohérents.

Dans les environnements bare-metal, `env`, `service` et `version` sont définis via les variables d'environnement des attributs de ressource OpenTelemetry. Le DDOT Collector détecte cette configuration de marquage et l'applique aux données qu'il collecte depuis les applications.

Dans l'application exemple, cela est effectué dans `run-otel-local.sh` :
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-calendar-service,service.version=1.0,deployment.environment.name=otel-test,host.name=calendar-host"
{{< /code-block >}}

### Exécutez l'application {#run-the-application}

Redéployez votre application pour appliquer les modifications apportées à vos variables d'environnement. Une fois la configuration mise à jour active, unified service tagging est entièrement activé pour vos métriques, traces et logs.

## Explorer les données d'observabilité dans Datadog {#explore-observability-data-in-datadog}

Utilisez Datadog pour explorer les données d'observabilité de votre application.

### Automatisation du parc {#fleet-automation}

Explorez vos configurations du Datadog Agent, du DDOT Collector et de l'OpenTelemetry Collector en amont.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Examinez la configuration de votre Agent et du Collector depuis la page Fleet Automation." style="width:100%;" >}}

### Surveillance de l'infrastructure {#infrastructure-monitoring}

Affichez les métriques d'exécution et d'infrastructure pour visualiser, surveiller et mesurer les performances de vos hosts.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Affichez les métriques d'exécution et d'infrastructure depuis la liste des hosts." style="width:100%;" >}}

### Logs {#logs}

Consultez les logs pour surveiller et diagnostiquer les opérations de l'application et du système.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Affichez les logs depuis le Log Explorer." style="width:100%;" >}}

### Traces {#traces}

Affichez les traces et les spans pour observer le statut et les performances des requêtes traitées par votre application, avec des métriques d'infrastructure corrélées dans la même trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Affichez les traces depuis le Trace Explorer." style="width:100%;" >}}

### Métriques d'exécution {#runtime-metrics}

Surveillez les métriques d'exécution (JVM) de vos applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Affichez les métriques JVM depuis le dashboard des métriques JVM." style="width:100%;" >}}

### Métriques de santé du Collector {#collector-health-metrics}

Affichez les métriques du DDOT Collector pour surveiller la santé du Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Affichez les métriques de santé du Collector depuis le dashboard OTel." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[7]: /fr/opentelemetry/instrument/api_support
[8]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[9]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[10]: /fr/opentelemetry/correlate/
[11]: /fr/opentelemetry/integrations/collector_health_metrics/
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/run-otel-local.sh
[14]: /fr/agent/supported_platforms/windows/