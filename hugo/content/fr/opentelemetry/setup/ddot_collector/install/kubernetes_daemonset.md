---
aliases:
- /fr/opentelemetry/agent/install_agent_with_collector
- /fr/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentation
  text: Utiliser des composants OpenTelemetry personnalisés avec le Datadog Agent
title: Installez le collecteur DDOT en tant que DaemonSet Kubernetes
type: multi-code-lang
---
## Présentation {#overview}

Suivez ce guide pour déployer le collecteur Datadog Distribution of OpenTelemetry (DDOT) en tant que DaemonSet Kubernetes à l'aide de Helm ou de Datadog Operator.

<div class="alert alert-info">
  <strong>Besoin de composants OpenTelemetry supplémentaires?</strong> Si vous avez besoin de composants autres que ceux inclus dans le package par défaut, suivez <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> pour étendre les capacités de Datadog Agent. Pour obtenir une liste des composants inclus par défaut, consultez <a href="/opentelemetry/agent/#opentelemetry-collector-components">Composants du collecteur OpenTelemetry</a>.
</div>

## Prérequis {#requirements}

Pour compléter ce guide, vous avez besoin des éléments suivants :

**Compte Datadog** :
1. [Créez un compte Datadog][1] si vous n'en avez pas.
1. Trouvez ou créez votre [clé Datadog API][2].

**Logiciels** :
Installez et configurez les éléments suivants sur votre machine :

- Un cluster Kubernetes (v1.29+)
- [Helm (v3+)][54]
- [kubectl][5]

**Réseau** : {{% otel-network-requirements %}}

## Installer le Datadog Agent avec le Collector OpenTelemetry {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">Cette installation est requise pour les configurations Datadog SDK + DDOT et OpenTelemetry SDK + DDOT. Bien que le SDK Datadog implémente l'API OpenTelemetry, il nécessite toujours le Collector DDOT pour traiter et transférer les métriques et logs OTLP.</div>

### Sélectionnez la méthode d'installation {#select-installation-method}

Choisissez l'une des méthodes d'installation suivantes :

- [Datadog Operator][55] : une approche [native Kubernetes][56] qui réconcilie et maintient automatiquement votre configuration Datadog. Il signale le statut de déploiement, l'état de santé et les erreurs dans le statut de sa ressource personnalisée, et il limite le risque de mauvaise configuration grâce à des options de configuration de plus haut niveau.
- [Helm chart][4] : un moyen simple de déployer Datadog Agent. Il offre des capacités de versioning, de restauration et de templating, rendant les déploiements cohérents et plus faciles à répliquer.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Installez Datadog Operator{#install-the-datadog-operator}

Vous pouvez installer Datadog Operator dans votre cluster à l'aide du [Helm chart de Datadog Operator][1] :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Ajoutez le dépôt Helm Datadog{#add-the-datadog-helm-repository}

Pour ajouter le dépôt Datadog à vos dépôts Helm :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configurez la clé Datadog API {#set-up-datadog-api-key}

1. Obtenez la [clé d'API][2] Datadog.
1. Stockez la clé d'API en tant que secret Kubernetes :
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Remplacez `<DD_API_KEY>` par votre clé Datadog API réelle.

### Configurez Datadog Agent{#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Après avoir déployé Datadog Operator, créez la ressource `DatadogAgent` qui déclenche le déploiement de Datadog Agent, de l'Agent de cluster et des exécuteurs de vérifications de cluster (si utilisés) dans votre cluster Kubernetes. Datadog Agent se déploie en tant que DaemonSet, exécutant un pod sur chaque nœud de votre cluster.

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
  - Remplacez `<DATADOG_SITE>` par votre [site Datadog][1]. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le {{< ui >}}DATADOG SITE{{< /ui >}} correct est sélectionné sur la droite.)

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Pour FED, définissez également <code>useFIPSAgent: true</code> sous <code>spec.global</code> pour utiliser l'image d'agent conforme FIPS. Consultez <a href="/agent/configuration/fips-compliance/">la conformité FIPS</a>.</div>
{{% /site-region %}}

2. Activez le collecteur OpenTelemetry :

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

Datadog Operator lie automatiquement le collecteur OpenTelemetry aux ports `4317` (nommés `otel-grpc`) et `4318` (nommés `otel-http`) par défaut.

3. (Facultatif) Activez des fonctionnalités Datadog supplémentaires :

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Consultez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Customer Success Manager avant de continuer.</div>

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

Lors de l'activation de fonctionnalités Datadog supplémentaires, utilisez toujours les fichiers de configuration du Collector Datadog ou du Collector OpenTelemetry au lieu de vous fier aux variables d'environnement Datadog.

**Remarque** : À partir de l'opérateur `v1.22.0`, le conteneur DDOT utilise l'image `ddot-collector` au lieu de l'image d'agent `-full`.
- Lors du remplacement de la balise d'image de l'agent de nœud, utilisez une balise >= `7.67.0` afin que le conteneur OTel soit planifié (l'image `ddot-collector` n'est prise en charge qu'à partir de >= `7.67.0`).
- L'image `ddot-collector` n'a pas de variante `-full`. Si vous avez besoin d'une image `-full`, définissez `spec.override.nodeAgent.image.name` sur une image d'agent complète (par exemple, `registry.datadoghq.com/agent:7.72.1-full`).

[1]: /fr/getting_started/site
[2]: /fr/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Utilisez un fichier YAML pour spécifier les paramètres du Helm chart pour le [Datadog Agent chart][1].

1. Créez un fichier `datadog-values.yaml` vide :

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Les paramètres non spécifiés utilisent les valeurs par défaut de <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configurez le secret de la clé Datadog API :

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

Définissez `<DATADOG_SITE>` sur votre [site Datadog][2]. Sinon, il utilise par défaut `datadoghq.com`, le site US1.

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Pour FED, définissez également <code>useFIPSAgent: true</code> à la racine de votre <code>datadog-values.yaml</code> pour utiliser l'image d'agent conforme FIPS. Consultez <a href="/agent/configuration/fips-compliance/">la conformité FIPS</a>.</div>
{{% /site-region %}}

3. Activez le collecteur OpenTelemetry et configurez les ports essentiels :

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

Définissez le `hostPort` pour exposer le port du conteneur au réseau externe. Cela permet de configurer l'exportateur OTLP pour qu'il pointe vers l'adresse IP du nœud où Datadog Agent est affecté.

Si vous ne souhaitez pas exposer le port, vous pouvez utiliser le service de l'Agent à la place :
   - Supprimez les <code>hostPort</code> entrées de votre <code>datadog-values.yaml</code> fichier.
   - Dans le fichier de déploiement de votre application (`deployment.yaml`), configurez l'exportateur OTLP pour utiliser le service de l'Agent :
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (Facultatif) Activez des fonctionnalités Datadog supplémentaires :

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Consultez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Customer Success Manager avant de continuer.</div>

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

Lors de l'activation de fonctionnalités Datadog supplémentaires, utilisez toujours les fichiers de configuration du Collector Datadog ou du Collector OpenTelemetry au lieu de vous fier aux variables d'environnement Datadog.

5. (Facultatif) Collectez les étiquettes de pod et utilisez-les comme tags à associer aux métriques, aux traces et aux logs :

<div class="alert alert-warning">Les Custom Metrics peuvent avoir une incidence sur la facturation. Consultez la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">page de facturation des Custom Metrics</a> pour plus d'informations.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Fichier datadog-values.yaml terminé" level="p" %}}
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

### Configurez le collecteur OpenTelemetry {#configure-the-opentelemetry-collector}

Comme le collecteur DDOT s'exécute au sein de Datadog Agent, les attributs de nom d'hôte sur la télémétrie entrante peuvent correspondre à un nom différent de celui de l'Agent. Le processeur `infraattributes` peut appliquer le nom d'hôte de l'Agent à la place. Consultez [Hostname and Tagging][58] pour la configuration recommandée.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Datadog Operator fournit un exemple de configuration de collecteur OpenTelemetry que vous pouvez utiliser comme point de départ. Si vous devez modifier cette configuration, Datadog Operator prend en charge deux méthodes pour fournir une configuration de collecteur personnalisée :

- **Configuration en ligne** : Ajoutez votre configuration de collecteur personnalisée directement dans le champ `features.otelCollector.conf.configData`.
- **Configuration basée sur une ConfigMap** : Stockez votre configuration de collecteur dans une ConfigMap et référencez-la dans le champ `features.otelCollector.conf.configMap`. Cette approche vous permet de garder la configuration du collecteur découplée de la ressource `DatadogAgent`.

####  Configuration du collecteur en ligne {#inline-collector-configuration}

Dans l'extrait ci-dessous, la configuration du collecteur est placée directement sous le paramètre `features.otelCollector.conf.configData` :

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
            cumulativetodelta:
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
                processors: [infraattributes, cumulativetodelta]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

Lorsque vous appliquez le fichier `datadog-agent.yaml` contenant cette ressource `DatadogAgent`, l'opérateur monte automatiquement la configuration du collecteur dans le DaemonSet de l'Agent.

{{% collapse-content title="Fichier datadog-agent.yaml complété" level="p" %}}
Le `datadog-agent.yaml` complété avec une configuration de collecteur en ligne devrait ressembler à ceci :
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
            cumulativetodelta:
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
                processors: [infraattributes, cumulativetodelta]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### Configuration du collecteur basée sur une ConfigMap {#configmap-based-collector-configuration}

Pour des configurations plus complexes ou fréquemment mises à jour, stocker la configuration du collecteur dans une ConfigMap peut simplifier le contrôle de version.

1. Créez une ConfigMap contenant votre configuration de collecteur :

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
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
      cumulativetodelta:
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
          processors: [infraattributes, cumulativetodelta]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-danger">Le champ pour la configuration du collecteur dans la ConfigMap doit être nommé <code>otel-config.yaml</code>.</div>

2. Référencez la ConfigMap `otel-agent-config-map` dans votre ressource `DatadogAgent` en utilisant le paramètre `features.otelCollector.conf.configMap` :
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

L'opérateur monte automatiquement `otel-config.yaml` depuis la ConfigMap dans le DaemonSet du collecteur OpenTelemetry de l'Agent.

{{% collapse-content title="Fichier datadog-agent.yaml complété avec la configuration du collecteur dans la ConfigMap" level="p" %}}
Le `datadog-agent.yaml` complété avec la configuration du collecteur définie comme ConfigMap devrait ressembler à ceci :
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
      cumulativetodelta:
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
          processors: [infraattributes, cumulativetodelta]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Le Helm chart Datadog fournit un exemple de configuration de collecteur OpenTelemetry que vous pouvez utiliser comme point de départ. Cette section vous guide à travers les pipelines prédéfinis et les composants OpenTelemetry inclus.

Voici la configuration complète du collecteur OpenTelemetry dans `otel-config.yaml` :

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
  cumulativetodelta:
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
      processors: [infraattributes, cumulativetodelta]
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

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagramme illustrant le modèle de déploiement de l'Agent" style="width:100%;" >}}

##### Datadog connector {#datadog-connector}

Le [connecteur Datadog][6] calcule les métriques de trace de Datadog APM.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog Exporter {#datadog-exporter}

L'[exportateur Datadog][7] exporte les traces, les métriques et les logs vers Datadog.

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

**Remarque** : Si `key` n'est pas spécifié ou défini sur un secret, ou si `site` n'est pas spécifié, le système utilise les valeurs de la configuration principale de l'Agent. Par défaut, l'Agent principal définit le site sur `datadoghq.com` (US1).

##### Prometheus receiver {#prometheus-receiver}

Le [récepteur Prometheus][8] collecte les métriques de santé du collecteur OpenTelemetry pour le pipeline de métriques.

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

Pour plus d'informations, consultez la documentation sur les [métriques de santé du collecteur][8].

### Déployez l'Agent avec le collecteur OpenTelemetry {#deploy-the-agent-with-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Déployez Datadog Agent avec le fichier de configuration :

```shell
kubectl apply -f datadog-agent.yaml
```

Ceci déploie Datadog Agent en tant que DaemonSet avec le collecteur OpenTelemetry DDOT. Le collecteur s'exécute sur le même hôte que votre application, en suivant le [modèle de déploiement de l'Agent][1]. Pour le [modèle de déploiement de passerelle][2], suivez le [guide d'installation de la passerelle Kubernetes DDOT][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Pour installer ou mettre à niveau Datadog Agent avec le collecteur OpenTelemetry dans votre environnement Kubernetes, utilisez l'une des commandes Helm suivantes :

- Pour une configuration par défaut du collecteur OpenTelemetry :
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- Pour une configuration personnalisée du collecteur OpenTelemetry :
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   Cette commande vous permet de spécifier votre propre fichier `otel-config.yaml`.

Remplacez `<RELEASE_NAME>` par le nom de la release Helm que vous utilisez.

<div class="alert alert-info">Vous pourriez voir des avertissements pendant le processus de déploiement. Ces avertissements peuvent être ignorés.</div>

Ce Helm chart déploie Datadog Agent avec le collecteur OpenTelemetry en tant que DaemonSet. Le collecteur est déployé sur le même hôte que votre application, en suivant le [modèle de déploiement de l'Agent][1]. Pour le [modèle de déploiement de passerelle][2], suivez le [guide d'installation de la passerelle Kubernetes DDOT][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Diagramme de déploiement" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagramme illustrant le modèle de déploiement de l'Agent" style="width:100%;" >}}
{{% /collapse-content %}}

## Envoyez votre télémétrie à Datadog {#send-your-telemetry-to-datadog}

Pour envoyer vos données de télémétrie à Datadog :

1. [Instrumentez votre application](#instrument-the-application)
2. [Configurez l'application](#configure-the-application)
3. [Corrélez les données d'observabilité](#correlate-observability-data)
4. [Exécutez votre application](#run-the-application)

### Instrumentez l'application {#instrument-the-application}

Instrumentez votre application [en utilisant l'API OpenTelemetry][12].

{{% collapse-content title="Exemple d'application instrumentée avec l'API OpenTelemetry" level="p" %}}
À titre d'exemple, vous pouvez utiliser l'[exemple d'application Calendar][9] qui est déjà instrumenté pour vous. Le code suivant instrumente la méthode [CalendarService.getDate()][10] en utilisant les annotations et l'API OpenTelemetry :
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

Votre conteneur d'application doit envoyer des données au collecteur DDOT sur le même hôte. Comme le Collector s'exécute en tant que DaemonSet, vous devez spécifier l'hôte local comme endpoint OTLP.

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

Le [Unified service tagging][14] relie les données d'observabilité dans Datadog afin que vous puissiez naviguer entre les métriques, les traces et les logs avec des tags cohérents.

Dans les environnements conteneurisés, définissez `env`, `service` et `version` à l'aide des variables d'environnement des attributs de ressource OpenTelemetry. Le collecteur DDOT détecte cette configuration de marquage et l'applique aux données qu'il collecte à partir des conteneurs.

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

<div class="alert alert-info">Alternativement, vous pouvez utiliser <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">des étiquettes Kubernetes spécifiques à Datadog</a> pour configurer le unified service tagging. N'utilisez pas les deux approches, car cela crée des étiquettes en double.</div>

### Exécutez l'application{#run-the-application}

Redéployez votre application pour appliquer les modifications apportées au manifeste de déploiement. Une fois la configuration mise à jour active, le unified service tagging sera entièrement activé pour vos métriques, traces et logs.

## Explorez les données d'observabilité dans Datadog{#explore-observability-data-in-datadog}

Utilisez Datadog pour explorer les données d'observabilité de votre application.

### Automatisation du parc {#fleet-automation}

Explorez la configuration de votre Agent et de votre Collector Datadog.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Examinez la configuration de votre Agent et du Collector depuis la page Fleet Automation." style="width:100%;" >}}

### Surveillance des conteneurs en temps réel {#live-container-monitoring}

Surveillez l'état de vos conteneurs à l'aide des fonctionnalités de Live Container Monitoring.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Surveillez l'état de vos conteneurs depuis la page Containers." style="width:100%;" >}}

### État de santé des nœuds d'infrastructure {#infrastructure-node-health}

Affichez les métriques d'exécution et d'infrastructure pour visualiser, surveiller et mesurer les performances de vos nœuds.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Affichez les métriques d'exécution et d'infrastructure depuis la liste des hosts." style="width:100%;" >}}

### Logs {#logs}

Consultez les logs pour surveiller et diagnostiquer les opérations de l'application et du système.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Affichez les logs depuis le Log Explorer." style="width:100%;" >}}

### Traces {#traces}

Affichez les traces et les spans pour observer l'état et les performances des requêtes traitées par votre application, avec des métriques d'infrastructure corrélées dans la même trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Affichez les traces depuis le Trace Explorer." style="width:100%;" >}}

### Métriques runtime {#runtime-metrics}

Surveillez les métriques runtime (JVM) pour vos applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Affichez les métriques JVM depuis le dashboard des métriques JVM." style="width:100%;" >}}

### Métriques de santé du Collector {#collector-health-metrics}

Affichez les métriques du DDOT Collector pour surveiller la santé du Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Affichez les métriques de santé du Collector depuis le dashboard OTel." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

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
[58]: /fr/opentelemetry/config/hostname_tagging/#ddot-collector-exporting-directly-to-datadog