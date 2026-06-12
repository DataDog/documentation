---
aliases:
- /fr/agent/kubernetes/apm
description: Activez la collecte de traces APM pour les applications conteneurisées
  fonctionnant dans des environnements Kubernetes.
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
title: Collecte de traces APM avec Kubernetes
---
{{< learning-center-callout header="Essayez Introduction to Monitoring Kubernetes dans le Learning Center" btn_title="Inscrivez-vous maintenant." btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  Apprenez sans frais sur une véritable capacité de calcul cloud et un compte d'essai Datadog. Commencez ces laboratoires pratiques pour vous familiariser avec les métriques, les journaux et les traces APM spécifiques à Kubernetes.
{{< /learning-center-callout >}}

Cette page décrit comment configurer [Application Performance Monitoring (APM)][10] pour votre application Kubernetes.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="Le pipeline de dépannage APM : le traceur envoie des traces et des données de métriques depuis le pod de l'application vers le pod de l'Agent, qui les envoie au backend Datadog pour être affichées dans l'interface utilisateur de Datadog.">}}

Vous pouvez envoyer des traces via Unix Domain Socket (UDS), TCP (`IP:Port`) ou le service Kubernetes. Datadog recommande d'utiliser UDS, mais il est possible d'utiliser les trois en même temps, si nécessaire.

**Note** : Pour une instrumentation automatique sans configuration manuelle, voir [Single Step Instrumentation for Kubernetes][13].

## Configuration {#setup}
1. Si vous ne l'avez pas encore fait, [installez l'Agent Datadog][1] dans votre environnement Kubernetes.
2. [Configurez l'Agent Datadog](#configure-the-datadog-agent-to-collect-traces) pour collecter des traces.
3. [Configurez les pods d'application](#configure-your-application-pods-to-submit-traces-to-datadog-agent) pour soumettre des traces à l'Agent Datadog.

### Configurez l'Agent Datadog pour collecter des traces {#configure-the-datadog-agent-to-collect-traces}

Les instructions de cette section configurent l'Agent Datadog pour recevoir des traces via UDS. Pour utiliser TCP, voir la section [configuration supplémentaire](#additional-configuration). Pour utiliser le service Kubernetes, voir [Configuration de l'APM avec le service Kubernetes][9].

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Modifiez votre `datadog-agent.yaml` pour définir `features.apm.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      unixDomainSocketConfig:
        path: /var/run/datadog/apm.socket # default
```

Lorsque l'APM est activé, la configuration par défaut crée un répertoire sur l'hôte et le monte dans l'Agent. L'Agent crée ensuite et écoute sur un fichier socket `/var/run/datadog/apm/apm.socket`. Les pods d'application peuvent alors monter ce volume de manière similaire et écrire sur ce même socket. Vous pouvez modifier le chemin et le socket avec la valeur de configuration `features.apm.unixDomainSocketConfig.path`.

{{% k8s-operator-redeploy %}}

**Remarque** : Sur minikube, vous pouvez recevoir une erreur `Unable to detect the kubelet URL automatically`. Dans ce cas, définissez `global.kubelet.tlsVerify` sur `false`.

{{% /tab %}}
{{% tab "Helm" %}}

Si vous [avez utilisé Helm pour installer l'Agent Datadog][1], APM est **activé par défaut** via UDS ou un pipe nommé Windows.

Pour vérifier, assurez-vous que `datadog.apm.socketEnabled` est défini sur `true` dans votre `datadog-values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

La configuration par défaut crée un répertoire sur l'hôte et le monte dans l'Agent. L'Agent crée ensuite et écoute sur un fichier socket `/var/run/datadog/apm.socket`. Les pods d'application peuvent alors monter ce volume de manière similaire et écrire sur ce même socket. Vous pouvez modifier le chemin et le socket avec les valeurs de configuration `datadog.apm.hostSocketPath` et `datadog.apm.socketPath`.

```yaml
datadog:
  apm:
    # the following values are default:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

Pour désactiver APM, définissez `datadog.apm.socketEnabled` sur `false`.

{{% k8s-helm-redeploy %}}

**Remarque** : Sur minikube, vous pouvez recevoir une erreur `Unable to detect the kubelet URL automatically`. Dans ce cas, définissez `datadog.kubelet.tlsVerify` sur `false`.

[1]: /fr/containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### Configurez vos pods d'application pour soumettre des traces à l'Agent Datadog {#configure-your-application-pods-to-submit-traces-to-datadog-agent}

{{< tabs >}}

{{% tab "Contrôleur d'admission Datadog" %}}
Le Contrôleur d'Admission Datadog est un composant de l'Agent de Cluster Datadog qui simplifie la configuration de vos pods d'application. En savoir plus en lisant la [documentation du Contrôleur d'Admission Datadog][1].

Utilisez le Contrôleur d'Admission Datadog pour injecter des variables d'environnement et monter les volumes nécessaires sur de nouveaux pods d'application, configurant automatiquement la communication des traces entre le pod et l'Agent. Apprenez à configurer automatiquement votre application pour soumettre des traces à l'Agent Datadog en lisant la documentation sur [l'injection de bibliothèques à l'aide du Contrôleur d'Admission][2].

[1]: /fr/agent/cluster_agent/admission_controller/
[2]: /fr/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Socket de Domaine Unix (UDS)" %}}
Si vous envoyez des traces à l'Agent en utilisant UDS, montez le répertoire hôte dans lequel se trouve le socket (que l'Agent a créé) dans le conteneur d'application et spécifiez le chemin vers le socket avec `DD_TRACE_AGENT_URL` :

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
        - name: DD_TRACE_AGENT_URL
          value: 'unix:///var/run/datadog/apm.socket'
        volumeMounts:
        - name: apmsocketpath
          mountPath: /var/run/datadog
        #(...)
      volumes:
        - hostPath:
            path: /var/run/datadog/
          name: apmsocketpath
```

### Configurez vos SDK d'application pour émettre des traces : {#configure-your-application-sdks-to-emit-traces}
Après avoir configuré votre Agent Datadog pour collecter des traces et donné à vos pods d'application la configuration sur *où* envoyer les traces, installez le SDK Datadog dans vos applications pour émettre les traces. Une fois cela fait, le SDK envoie les traces au point de terminaison approprié `DD_TRACE_AGENT_URL`.

{{% /tab %}}


{{% tab TCP %}}
Si vous envoyez des traces à l'Agent en utilisant TCP (`<IP_ADDRESS>:8126`), fournissez cette adresse IP à vos pods d'application—soit automatiquement avec le [Contrôleur d'Admission Datadog][1], soit manuellement en utilisant l'API descendante pour récupérer l'IP de l'hôte. Le conteneur d'application a besoin de la variable d'environnement `DD_AGENT_HOST` qui pointe vers `status.hostIP` :

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```
**Remarque :** Cette configuration nécessite que l'Agent soit configuré pour accepter des traces via TCP

### Configurez vos SDK d'application pour émettre des traces : {#configure-your-application-sdks-to-emit-traces-1}
Après avoir configuré votre Agent Datadog pour collecter des traces et avoir donné à vos pods d'application la configuration sur *où* envoyer les traces, installez le SDK Datadog dans vos applications pour émettre les traces. Une fois cela fait, le SDK envoie automatiquement les traces au point de terminaison approprié `DD_AGENT_HOST`.

[1]: /fr/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

Consultez la [documentation sur APM propre à votre langage][2] pour obtenir davantage d'exemples.

## Configuration supplémentaire {#additional-configuration}

### Configurez l'Agent Datadog pour accepter des traces via TCP {#configure-the-datadog-agent-to-accept-traces-over-tcp}
{{< tabs >}}
{{% tab "Operator Datadog" %}}

Mettez à jour votre `datadog-agent.yaml` avec ce qui suit :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
        hostPort: 8126 # default
```

{{% k8s-operator-redeploy %}}

**Avertissement** : Le paramètre `hostPort` ouvre un port sur votre hôte. Assurez-vous que votre pare-feu n'autorise l'accès qu'à vos applications ou à des sources de confiance. Si votre plugin réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` dans les spécifications de votre pod Agent. Cela partage l'espace de noms réseau de votre hôte avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont ouverts sur l'hôte. Si un port est utilisé à la fois sur l'hôte et dans votre conteneur, ils entrent en conflit (puisqu'ils partagent le même espace de noms réseau) et le pod ne démarre pas. Certaines installations Kubernetes ne permettent pas cela.
{{% /tab %}}
{{% tab "Helm" %}}

Mettez à jour votre fichier `datadog-values.yaml` avec la configuration APM suivante :

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**Avertissement** : Le paramètre `datadog.apm.portEnabled` ouvre un port sur votre hôte. Assurez-vous que votre pare-feu n'autorise l'accès qu'à vos applications ou à des sources de confiance. Si votre plugin réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` dans les spécifications de votre pod Agent. Cela partage l'espace de noms réseau de votre hôte avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont ouverts sur l'hôte. Si un port est utilisé à la fois sur l'hôte et dans votre conteneur, ils entrent en conflit (puisqu'ils partagent le même espace de noms réseau) et le pod ne démarre pas. Certaines installations Kubernetes ne permettent pas cela.
{{% /tab %}}
{{< /tabs >}}

## Variables d'environnement APM {#apm-environment-variables}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Définissez des variables d'environnement APM supplémentaires sous `override.nodeAgent.containers.trace-agent.env` :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Définissez des variables d'environnement APM supplémentaires sous `agents.containers.traceAgent.env` :
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "DaemonSet" %}}
Ajoutez des variables d'environnement au DaemonSet ou au Déploiement (pour l'Agent de Cluster Datadog).

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

Liste des variables d'environnement disponibles pour configurer APM :

| Variable d'environnement | Description |
| -------------------- | ----------- |
| `DD_APM_ENABLED`           | Lorsqu'il est défini sur `true`, l'Agent Datadog accepte les métriques de trace. <br/>**Par défaut** : `true` (Agent 7.18+) |
| `DD_APM_ENV`           | Définit la balise `env:` sur les traces collectées.  |
| `DD_APM_RECEIVER_SOCKET` | Pour le traçage via UDS. Lorsqu'il est défini, doit pointer vers un fichier de socket valide. |
| `DD_APM_RECEIVER_PORT`     | Pour le traçage via TCP, le port sur lequel le récepteur de trace de l'Agent Datadog écoute. <br/>**Par défaut** : `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | Autoriser le trafic non local lors du traçage depuis d'autres conteneurs. <br/>**Par défaut** : `true` (Agent 7.18+) |
| `DD_APM_DD_URL`            | Le point de terminaison API Datadog où vos traces sont envoyées : `https://trace.agent.{{< region-param key="dd_site" >}}`. <br/>**Default**:  `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | The target traces per second to sample. <br/>**Default**: `10` |
| `DD_APM_ERROR_TPS`     | The target error trace chunks to receive per second. <br/>**Default**: `10` |
| `DD_APM_MAX_EPS`     | Maximum number of APM events per second to sample. <br/>**Default**: `200` |
| `DD_APM_MAX_MEMORY`     | What the Datadog Agent aims to use in terms of memory. If surpassed, the API rate limits incoming requests. <br/>**Default**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | The CPU percentage that the Datadog Agent aims to use. If surpassed, the API rate limits incoming requests. <br/>**Default**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | Collects only traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_FILTER_TAGS_REJECT`     | Rejects traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_REPLACE_TAGS` | [Scrub sensitive data from your span's tags][4]. |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. <br/>For example: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | Path to file where APM logs are written. |
| `DD_APM_CONNECTION_LIMIT`  | Maximum connection limit for a 30 second time window. <br/>**Default**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | Send data to multiple endpoints and/or with multiple API keys. <br/>See [Dual Shipping][12]. |
| `DD_APM_DEBUG_PORT`     | Port for the debug endpoints for the Trace Agent. Set to `0` to disable the server. <br/>**Default**: `5012`. |
| `DD_BIND_HOST`             | Set the StatsD and receiver hostname. |
| `DD_DOGSTATSD_PORT`        | For tracing over TCP, set the DogStatsD port. |
| `DD_ENV`                   | Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used. |
| `DD_HOSTNAME`         | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent. |
| `DD_LOG_LEVEL`             | Set the logging level. <br/>**Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off` |
| `DD_PROXY_HTTPS`     | Configurez l'URL pour le proxy à utiliser. |


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/containers/kubernetes/installation
[2]: /fr/tracing/setup/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/tracing/configure_data_security/?tab=kubernetes#replace-tags
[5]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/fr/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /fr/tracing
[11]: /fr/tracing/guide/ignoring_apm_resources/?tab=kubernetes
[12]: /fr/agent/configuration/dual-shipping/
[13]: /fr/tracing/trace_collection/single-step-apm/kubernetes/