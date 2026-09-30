---
aliases:
- /fr/opentelemetry/agent/install_agent_with_collector
- /fr/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentation
  text: Utilisez des composants OpenTelemetry personnalisés avec l'agent Datadog
title: Installez le collecteur DDOT en tant que DaemonSet Kubernetes
type: multi-code-lang
---
## Aperçu {#overview}

Suivez ce guide pour déployer la distribution Datadog du collecteur OpenTelemetry (DDOT) en tant que DaemonSet Kubernetes en utilisant Helm ou l'opérateur Datadog.

<div class="alert alert-info">
  <strong>Besoin de composants OpenTelemetry supplémentaires ?</strong> Si vous avez besoin de composants au-delà de ceux inclus dans le package par défaut, suivez <a href="/opentelemetry/setup/ddot_collector/custom_components">Utilisez des composants OpenTelemetry personnalisés</a> pour étendre les capacités de l'agent Datadog. Pour une liste des composants inclus par défaut, consultez <a href="/opentelemetry/agent/#opentelemetry-collector-components">Composants du collecteur OpenTelemetry</a>.
</div>

## Exigences {#requirements}

Pour compléter ce guide, vous avez besoin des éléments suivants :

**Compte Datadog** :
1. [Créez un compte Datadog][1] si vous n'en avez pas.
1. Trouvez ou créez votre [clé API Datadog][2].

**Logiciel** :
Installez et configurez ce qui suit sur votre machine :

- Un cluster Kubernetes (v1.29+)
- [Helm (v3+)][54]
- [kubectl][5]

**Réseau** : {{% otel-network-requirements %}}

## Installez l'agent Datadog avec le collecteur OpenTelemetry {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">Cette installation est requise pour les configurations Datadog SDK + DDOT et OpenTelemetry SDK + DDOT. Bien que le SDK Datadog implémente l'API OpenTelemetry, il nécessite toujours le collecteur DDOT pour traiter et transférer les métriques et les journaux OTLP.</div>

### Sélectionnez la méthode d'installation {#select-installation-method}

Choisissez l'une des méthodes d'installation suivantes :

- [Opérateur Datadog][55] : Une approche [native à Kubernetes][56] qui réconcilie et maintient automatiquement votre configuration Datadog. Il rapporte l'état de déploiement, la santé et les erreurs dans son statut de ressource personnalisée, et il limite le risque de mauvaise configuration grâce à des options de configuration de niveau supérieur.
- [Helm chart][4] : Un moyen simple de déployer l'Agent Datadog. Il fournit des capacités de versionnage, de rollback et de templating, rendant les déploiements cohérents et plus faciles à reproduire.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
### Installez l'Opérateur Datadog {#install-the-datadog-operator}

Vous pouvez installer l'Opérateur Datadog dans votre cluster en utilisant le [Datadog Operator Helm chart][1] :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Ajoutez le dépôt Helm de Datadog {#add-the-datadog-helm-repository}

Pour ajouter le dépôt Datadog à vos dépôts Helm :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configurez la clé API Datadog {#set-up-datadog-api-key}

1. Obtenez la [clé API Datadog][2].
1. Stockez la clé API en tant que secret Kubernetes :
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Remplacez `<DD_API_KEY>` par votre véritable clé API Datadog.

### Configurez l'Agent Datadog {#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Après avoir déployé l'Opérateur Datadog, créez la ressource `DatadogAgent` qui déclenche le déploiement de l'Agent Datadog, de l'Agent de Cluster et des Runners de Vérifications de Cluster (si utilisés) dans votre cluster Kubernetes. L'Agent Datadog se déploie en tant que DaemonSet, exécutant un pod sur chaque nœud de votre cluster.

1. Utilisez le fichier `datadog-agent.yaml` pour spécifier votre configuration de déploiement `DatadogAgent`.

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
{{< /code-block >}}

  - Remplacez `<CLUSTER_NAME>` par un nom pour votre cluster.
  - Remplacez `<DATADOG_SITE>` par votre [site Datadog][1]. Votre site est {{< region-param key="dd_site" code="true" >}}(Assurez-vous que le bon **SITE DATADOG** est sélectionné à droite.)

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Pour FED, définissez également <code>useFIPSAgent: true</code> sous <code>spec.global</code> pour utiliser l'image de l'Agent conforme aux normes FIPS. Voir <a href="/agent/configuration/fips-compliance/">la conformité FIPS</a>.</div>
{{% /site-region %}}

2. Activez le Collecteur OpenTelemetry :

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

L'Opérateur Datadog lie automatiquement le Collecteur OpenTelemetry aux ports `4317` (nommé `otel-grpc`) et `4318` (nommé `otel-http`) par défaut.

3. (Optionnel) Activez des fonctionnalités supplémentaires de Datadog :

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Examinez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Responsable du Succès Client avant de continuer.</div>

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
  ...
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
{{< /code-block >}}

Lors de l'activation de fonctionnalités supplémentaires de Datadog, utilisez toujours les fichiers de configuration de Datadog ou du Collecteur OpenTelemetry au lieu de vous fier aux variables d'environnement Datadog.

**Remarque** : À partir de l'opérateur `v1.22.0`, le conteneur DDOT utilise l'image `ddot-collector` au lieu de l'image de l'agent `-full`.
- Lorsque vous remplacez le tag de l'image de l'agent de nœud, utilisez un tag >= `7.67.0` afin que le conteneur OTel soit programmé (l'image `ddot-collector` n'est prise en charge que dans >= `7.67.0`).
- L'image `ddot-collector` n'a pas de variante `-full`. Si vous avez besoin d'une image `-full`, définissez `spec.override.nodeAgent.image.name` sur une image d'agent complète (par exemple, `registry.datadoghq.com/agent:7.72.1-full`).

[1]: /fr/getting_started/site
[2]: /fr/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Utilisez un fichier YAML pour spécifier les paramètres du [Datadog Agent Helm chart][1].

1. Créez un fichier `datadog-values.yaml` vide :

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Les paramètres non spécifiés utilisent les valeurs par défaut de <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configurez le secret de la clé API Datadog :

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

Définissez `<DATADOG_SITE>` sur votre [site Datadog][2]. Sinon, il utilise par défaut `datadoghq.com`, le site US1.

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Pour FED, définissez également <code>useFIPSAgent: true</code> à la racine de votre <code>datadog-values.yaml</code> pour utiliser l'image de l'Agent conforme aux normes FIPS. Voir <a href="/agent/configuration/fips-compliance/">la conformité FIPS</a>.</div>
{{% /site-region %}}

3. Activez le Collecteur OpenTelemetry et configurez les ports essentiels :

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # default port for OpenTelemetry gRPC receiver.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # default port for OpenTelemetry HTTP receiver
        hostPort: "4318"
        name: otel-http
{{< /code-block >}}

Définissez le `hostPort` pour exposer le port du conteneur au réseau externe. Cela permet de configurer l'exportateur OTLP pour pointer vers l'adresse IP du nœud où l'Agent Datadog est assigné.

Si vous ne souhaitez pas exposer le port, vous pouvez utiliser le service Agent à la place :
   - Supprimez le <code>hostPort</code> les entrées de votre <code>datadog-values.yaml</code> fichier.
   - Dans le fichier de déploiement de votre application (`deployment.yaml`), configurez l'exportateur OTLP pour utiliser le service Agent :
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (Optionnel) Activez des fonctionnalités Datadog supplémentaires :

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Examinez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Responsable du Succès Client avant de continuer.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
{{< /code-block >}}

Lors de l'activation de fonctionnalités supplémentaires de Datadog, utilisez toujours les fichiers de configuration de Datadog ou du Collecteur OpenTelemetry au lieu de vous fier aux variables d'environnement Datadog.

5. (Optionnel) Collectez les étiquettes de pod et utilisez-les comme tags à attacher aux métriques, traces et journaux :

<div class="alert alert-warning">Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">page de facturation des métriques personnalisées</a> pour plus d'informations.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Fichier datadog-values.yaml complété" level="p" %}}
Votre fichier `datadog-values.yaml` devrait ressembler à ceci :
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: /fr/getting_started/site/
[3]: /fr/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Configurez le Collecteur OpenTelemetry {#configure-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
L'Opérateur Datadog fournit une configuration d'exemple du Collecteur OpenTelemetry que vous pouvez utiliser comme point de départ. Si vous devez modifier cette configuration, l'Opérateur Datadog prend en charge deux façons de fournir une configuration de Collecteur personnalisée :

- **Configuration en ligne** : Ajoutez votre configuration de Collecteur personnalisée directement dans le champ `features.otelCollector.conf.configData`.
- **Configuration basée sur ConfigMap** : Stockez votre configuration de Collecteur dans un ConfigMap et référencez-le dans le champ `features.otelCollector.conf.configMap`. Cette approche vous permet de garder la configuration du Collecteur découplée de la ressource `DatadogAgent`.

####  Configuration du collecteur en ligne {#inline-collector-configuration}

Dans l'extrait ci-dessous, la configuration du Collecteur est placée directement sous le paramètre `features.otelCollector.conf.configData` :

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "otelcol"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
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
                key: ${env:DD_API_KEY}
                site: ${env:DD_SITE}
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

Lorsque vous appliquez le fichier `datadog-agent.yaml` contenant cette ressource `DatadogAgent`, l'Opérateur monte automatiquement la configuration du Collecteur dans le DaemonSet de l'Agent.

{{% collapse-content title="Fichier datadog-agent.yaml complété avec la configuration du Collecteur en ligne" level="p" %}}
Le `datadog-agent.yaml` complété avec la configuration du Collecteur en ligne devrait ressembler à ceci :
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "datadog-agent"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
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
                key: ${env:DD_API_KEY}
                site: ${env:DD_SITE}
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### Configuration du collecteur basée sur ConfigMap {#configmap-based-collector-configuration}

Pour des configurations plus complexes ou fréquemment mises à jour, stocker la configuration du Collecteur dans un ConfigMap peut simplifier le contrôle de version.

1. Créez un ConfigMap qui contient votre configuration de Collecteur :

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
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
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-danger">Le champ pour la configuration du Collecteur dans le ConfigMap doit s'appeler <code>otel-config.yaml</code>.</div>

2. Référencez le ConfigMap `otel-agent-config-map` dans votre ressource `DatadogAgent` en utilisant le paramètre `features.otelCollector.conf.configMap` :
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
{{< /code-block >}}

L'Opérateur monte automatiquement `otel-config.yaml` depuis le ConfigMap dans le DaemonSet OpenTelemetry Collector de l'Agent.

{{% collapse-content title="Fichier datadog-agent.yaml complété avec la configuration du Collecteur dans le ConfigMap" level="p" %}}
Le `datadog-agent.yaml` complété avec la configuration du Collecteur définie comme ConfigMap devrait ressembler à ceci :
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
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
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Le Datadog Helm chart fournit un exemple de configuration OpenTelemetry Collector que vous pouvez utiliser comme point de départ. Cette section vous guide à travers les pipelines prédéfinis et les composants OpenTelemetry inclus.

Voici la configuration complète du Collecteur OpenTelemetry dans `otel-config.yaml` :

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
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
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]

{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

{{% /tab %}}
{{< /tabs >}}

#### Composants clés {#key-components}

Pour envoyer des données de télémétrie à Datadog, les composants suivants sont définis dans la configuration :

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagramme représentant le modèle de déploiement de l'Agent" style="width:100%;" >}}

##### Connecteur Datadog {#datadog-connector}

Le [connecteur Datadog][6] calcule les métriques de trace APM de Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Exportateur Datadog {#datadog-exporter}

L'[exportateur Datadog][7] exporte les traces, les métriques et les journaux vers Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**Remarque** : Si `key` n'est pas spécifié ou est défini comme un secret, ou si `site` n'est pas spécifié, le système utilise les valeurs de la configuration de base de l'Agent. Par défaut, l'Agent de base définit le site sur `datadoghq.com` (US1).

##### Récepteur Prometheus {#prometheus-receiver}

Le [récepteur Prometheus][8] collecte les métriques de santé du Collecteur OpenTelemetry pour le pipeline de métriques.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

Pour plus d'informations, consultez la documentation sur les [Métriques de santé du Collecteur][8].

### Déployez l'Agent avec le Collecteur OpenTelemetry {#deploy-the-agent-with-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Déployez l'Agent Datadog avec le fichier de configuration :

```shell
kubectl apply -f datadog-agent.yaml
```

Cela déploie l'Agent Datadog en tant que DaemonSet avec le Collecteur OpenTelemetry DDOT. Le Collecteur s'exécute sur le même hôte que votre application, suivant le [modèle de déploiement de l'Agent][1]. Le [modèle de déploiement de la passerelle][2] est en aperçu ; pour les instructions d'installation, suivez le [guide d'installation de la passerelle Kubernetes DDOT][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Pour installer ou mettre à niveau l'Agent Datadog avec le Collecteur OpenTelemetry dans votre environnement Kubernetes, utilisez l'une des commandes Helm suivantes :

- Pour la configuration par défaut du Collecteur OpenTelemetry :
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- Pour la configuration personnalisée du Collecteur OpenTelemetry :
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   Cette commande vous permet de spécifier votre propre fichier `otel-config.yaml`.

Remplacez `<RELEASE_NAME>` par le nom de la release Helm que vous utilisez.

<div class="alert alert-info">Vous pouvez voir des avertissements pendant le processus de déploiement. Ces avertissements peuvent être ignorés.</div>

Ce chart Helm déploie l'Agent Datadog avec le Collecteur OpenTelemetry en tant que DaemonSet. Le Collecteur est déployé sur le même hôte que votre application, suivant le [modèle de déploiement de l'Agent][1]. Le [modèle de déploiement de la passerelle][2] est en aperçu ; pour les instructions d'installation, suivez le [guide d'installation de la passerelle Kubernetes DDOT][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Diagramme de déploiement" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagramme représentant le modèle de déploiement de l'Agent" style="width:100%;" >}}
{{% /collapse-content %}}

## Envoyez vos données de télémétrie à Datadog {#send-your-telemetry-to-datadog}

Pour envoyer vos données de télémétrie à Datadog :

1. [Instrumentez votre application](#instrument-the-application)
2. [Configurez l'application](#configure-the-application)
3. [Corrélez les données d'observabilité](#correlate-observability-data)
4. [Exécutez votre application](#run-the-application)

### Instrumentez l'application {#instrument-the-application}

Instrumentez votre application [en utilisant l'API OpenTelemetry][12].

{{% collapse-content title="Exemple d'application instrumentée avec l'API OpenTelemetry" level="p" %}}
Par exemple, vous pouvez utiliser l'[application d'exemple Calendar][9] qui est déjà instrumentée pour vous. Le code suivant instrumente la méthode [CalendarService.getDate()][10] en utilisant les annotations et l'API OpenTelemetry :
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

Votre conteneur d'application doit envoyer des données au Collecteur DDOT sur le même hôte. Puisque le Collecteur fonctionne en tant que DaemonSet, vous devez spécifier l'hôte local comme point de terminaison OTLP.

Si la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` n'est pas déjà définie, ajoutez-la au fichier manifeste de déploiement de votre application :
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   {{< /code-block >}}

### Corrélez les données d'observabilité {#correlate-observability-data}

[Le balisage de service unifié][14] relie les données d'observabilité dans Datadog afin que vous puissiez naviguer à travers les métriques, les traces et les journaux avec des balises cohérentes.

Dans les environnements conteneurisés, définissez `env`, `service` et `version` en utilisant les variables d'environnement des attributs de ressource OpenTelemetry. Le Collecteur DDOT détecte cette configuration de balisage et l'applique aux données qu'il collecte à partir des conteneurs.

Ajoutez les variables d'environnement suivantes au manifeste de déploiement de votre application :

{{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  template:
    spec:
      containers:
      - name: <SERVICE>
        env:
          - name: OTEL_SERVICE_NAME
            value: "<SERVICE>"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
{{< /code-block >}}

<div class="alert alert-info">Alternativement, vous pouvez utiliser <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">des étiquettes Kubernetes spécifiques à Datadog</a> pour configurer le balisage de service unifié. N'utilisez pas les deux approches, car cela crée des balises en double.</div>

### Exécutez l'application {#run-the-application}

Redéployez votre application pour appliquer les modifications apportées au manifeste de déploiement. Une fois la configuration mise à jour active, le balisage de service unifié sera entièrement activé pour vos métriques, traces et journaux.

## Explorez les données d'observabilité dans Datadog {#explore-observability-data-in-datadog}

Utilisez Datadog pour explorer les données d'observabilité de votre application.

### Automatisation de flotte {#fleet-automation}

Explorez la configuration de votre Agent et Collecteur Datadog.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Examinez la configuration de votre Agent et Collecteur depuis la page d'automatisation de la flotte." style="width:100%;" >}}

### Surveillance en direct des conteneurs {#live-container-monitoring}

Surveillez la santé de vos conteneurs en utilisant les capacités de surveillance en direct des conteneurs.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Surveillez la santé de vos conteneurs depuis la page des conteneurs." style="width:100%;" >}}

### Santé des nœuds d'infrastructure {#infrastructure-node-health}

Consultez les métriques d'exécution et d'infrastructure pour surveiller et mesurer la performance de vos nœuds.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Visualisez les métriques d'exécution et d'infrastructure à partir de la liste des hôtes." style="width:100%;" >}}

### Journaux {#logs}

Consultez les logs pour surveiller et diagnostiquer les opérations de l'application et du système.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Visualisez les journaux depuis l'Explorateur de journaux." style="width:100%;" >}}

### Traces {#traces}

Visualisez les traces et les spans pour observer l'état et la performance des requêtes traitées par votre application, avec des métriques d'infrastructure corrélées dans la même trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Visualisez les traces depuis l'Explorateur de traces." style="width:100%;" >}}

### Métriques d'exécution {#runtime-metrics}

Surveillez vos métriques d'exécution (JVM) pour vos applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Visualisez les métriques JVM depuis le tableau de bord des métriques JVM." style="width:100%;" >}}

### Métriques de santé du collecteur {#collector-health-metrics}

Visualisez les métriques du Collecteur DDOT pour surveiller la santé du collecteur.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Visualisez les métriques de santé du collecteur depuis le tableau de bord OTel." style="width:100%;" >}}

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
[12]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L71-L72
[14]: /fr/getting_started/tagging/unified_service_tagging
[15]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L75-L83
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://docs.docker.com/engine/install/
[51]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml#L7
[52]: /fr/getting_started/site/
[53]: /fr/containers/guide/changing_container_registry/
[54]: https://helm.sh
[55]: /fr/containers/datadog_operator
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md