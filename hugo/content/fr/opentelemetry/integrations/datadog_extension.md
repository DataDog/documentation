---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentation
  text: Configurer le Collector OpenTelemetry
- link: /infrastructure/list/
  tag: Documentation
  text: Liste d'insfrastructures
- link: /infrastructure/resource_catalog/
  tag: Documentation
  text: Resource Catalog
title: Datadog Extension
---
## Présentation {#overview}

À partir des [modules v0.129.0][4] d'OpenTelemetry Collector Contrib et des versions ultérieures, l'extension Datadog est incluse dans les [distributions contrib][5] d'OpenTelemetry Collector. Elle est également disponible pour les [builds personnalisés][6] d'OpenTelemetry Collector. Dans le [DDOT Collector][8], l'extension est automatiquement activée.

L'extension Datadog vous permet de visualiser les informations de configuration et de build du collecteur OpenTelemetry directement dans Datadog à l'aide de [Fleet Automation][7], de la [liste d'infrastructures][2] et de [Resource Catalog][3]. L'extension fonctionne avec la configuration recommandée de l'exportateur OTLP HTTP et avec l'exportateur Datadog.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Visualisez les configurations du collecteur OTel avec la visualisation de pipeline dans Fleet Automation" style="width:100%;" >}}

## Fonctionnalités clés {#key-features}

- **Collector Configuration Visibility** : Visualisez la configuration complète de n'importe quel OTel Collector dans votre infrastructure.
- **Informations de build** : consultez la version du collecteur, les détails du build et les informations sur les composants.
- **Endpoint d'inspection locale** : utilisez un endpoint HTTP pour le débogage local et la vérification de la configuration.
- **Gestion de parc** : surveillez et gérez votre parc de collecteurs OpenTelemetry depuis l'interface utilisateur Datadog.

## Configuration {#setup}

<div class="alert alert-danger">Si vous utilisez le <a href="/opentelemetry/setup/ddot_collector/">collecteur DDOT</a>, <strong>ne</strong> configurez pas manuellement l'extension Datadog. Elle est automatiquement activée dans toutes les versions du collecteur DDOT.</div>

### 1. Ajoutez l'extension Datadog à la configuration de votre collecteur {#1-add-the-datadog-extension-to-your-collector-configuration}

Configurez l'extension Datadog dans votre fichier de configuration du collecteur OpenTelemetry :

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match the hostname in exported telemetry

service:
  extensions: [datadog]
```

### 2. Configurez un pipeline de télémétrie actif {#2-configure-an-active-telemetry-pipeline}

Configurez au moins un pipeline de télémétrie actif et exportez ses données vers Datadog. Pour la configuration recommandée, utilisez la [configuration de l'exportateur OTLP HTTP][9].

L'extension utilise les métadonnées du collecteur et de l'hôte pour associer la configuration rapportée à l'hôte correspondant dans Datadog.

### 3. (Facultatif) Ajoutez des attributs de ressource personnalisés {#3-optional-add-custom-resource-attributes}

L'extension Datadog collecte automatiquement les attributs de ressource à partir de la télémétrie interne du Collector et les inclut dans la charge utile de métadonnées qu'elle envoie à Datadog. Pour joindre des attributs personnalisés tels que l'environnement de déploiement, l'équipe ou le nom du cluster Kubernetes, définissez-les sous `service.telemetry.resource` :

```yaml
service:
  telemetry:
    resource:
      deployment.environment.name: production
      team.name: platform
      k8s.cluster.name: prod-us-east1-cluster-a
```

Le Collector joint automatiquement `service.name`, `service.version` et `service.instance.id` (un UUID généré aléatoirement) à sa télémétrie interne. Vous n'avez pas besoin de les définir manuellement.

### 4. (Facultatif) Configurez la topologie de la passerelle (aperçu) {#4-optional-configure-gateway-topology-preview}

Lorsque vous disposez d'une configuration de passerelle OpenTelemetry Collector qui transfère la télémétrie via un ou plusieurs Collectors de passerelle avant d'atteindre Datadog, l'extension Datadog peut publier la topologie afin qu'elle apparaisse sous forme de graphe de pipeline connecté dans [Fleet Automation][7] :

{{< img src="opentelemetry/integrations/datadog_extension_gateway_topology.png" alt="Vue de la topologie de la passerelle dans Fleet Automation montrant des Collectors DaemonSet transférant les données via deux couches de Collectors de passerelle vers Datadog" style="width:100%;" >}}

Pour activer cette vue, configurez chaque Collector dans le pipeline :

- Définissez `deployment_type` sur `daemonset` pour les Collectors agent ou DaemonSet et `gateway` pour les Collectors de passerelle.
- Définissez `gateway_destination` sur les Collectors qui transfèrent les données vers une passerelle en aval. La valeur est le service Kubernetes de la passerelle réceptrice, sous la forme `<namespace>/<service>`.
- Définissez `gateway_service` sur les Collector de passerelle. La valeur est le service Kubernetes qui se trouve devant les pods de la passerelle.
- Une passerelle **intermédiaire** dans un pipeline multicouche définit **à la fois** `gateway_service` (son propre service) et `gateway_destination` (la passerelle suivante).
- Définissez `k8s.cluster.name` sous `service.telemetry.resource` sur chaque Collector du pipeline. Ceci est **requis** : avec `gateway_service` et `gateway_destination`, cela forme la clé de jointure que Fleet Automation utilise pour reconstruire le graphe du pipeline.
- Activez les métriques internes du Collector afin que l'extension puisse attribuer les données de volume des logs, métriques ou traces à chaque arête du graphe avec le bouton **Afficher le trafic**. Consultez [OpenTelemetry Collector Health Metrics][10].

L'exemple ci-dessous couvre le cas courant à deux couches : un DaemonSet local au nœud transfère les données vers un déploiement de passerelle, qui les envoie à Datadog avec l'exportateur Datadog.

Chaque Collector expose ses propres métriques de santé sur un endpoint de pull Prometheus via `service.telemetry.metrics`, récupère cet endpoint avec un récepteur `prometheus/internal`, et achemine le résultat via le même pipeline de métriques que la télémétrie d'application. C'est ce qui alimente chaque nœud et chaque arête dans la vue topologique.

#### Collecteur DaemonSet {#daemonset-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  otlp:
    endpoint: otelcol-gateway.monitoring.svc.cluster.local:4317
    tls:
      insecure: true

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: daemonset
    gateway_destination: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      exporters: [otlp]
```

Le pipeline `metrics` du DaemonSet inclut `prometheus/internal` afin que les métriques de santé du collecteur lui-même transitent via OTLP vers la passerelle aux côtés de la télémétrie applicative, atteignant Datadog par le biais de l'exportateur Datadog de la passerelle.

#### Collecteur de passerelle {#gateway-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    metrics:
      resource_attributes_as_tags: true
    sending_queue:
      batch:
        flush_timeout: 10s

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

Le pipeline `metrics` de la passerelle accepte à la fois la télémétrie transférée (depuis le DaemonSet via OTLP) et ses propres métriques internes provenant de `prometheus/internal`, puis exporte le tout vers Datadog.

#### Pipelines de passerelle multicouches {#multi-layer-gateway-pipelines}

Pour les pipelines comportant plus d'une couche de passerelle, définissez `gateway_service` et `gateway_destination` ensemble sur la couche intermédiaire. Par exemple, dans une topologie à trois couches avec une passerelle de couche 2 entre le DaemonSet et une passerelle de couche 1, l'extension de la passerelle de couche 2 est configurée comme suit :

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway-l2
    gateway_destination: monitoring/otelcol-gateway-l1
```

Le DaemonSet transfère vers `monitoring/otelcol-gateway-l2`, la passerelle de couche 2 transfère vers `monitoring/otelcol-gateway-l1`, et la passerelle de couche 1 envoie vers Datadog. Chaque Collector rapporte le même `k8s.cluster.name`.

## Options de configuration {#configuration-options}

| Paramètre | Description | Par défaut |
|-----------|-------------|---------|
| `api.key` | Clé Datadog API (requise). | - |
| `api.site` | Site Datadog (par exemple, `us5.datadoghq.com`). | `datadoghq.com` |
| `api.fail_on_invalid_key` | Quittez au démarrage si la clé d'API est invalide. | `true` |
| `hostname` | Nom d'hôte personnalisé pour le Collector. | Détecté automatiquement |
| `http.endpoint` | Endpoint du serveur HTTP local. | `localhost:9875` |
| `http.path` | Chemin du serveur HTTP pour les métadonnées. | `/metadata` |
| `deployment_type` | Identifie la manière dont le collecteur est déployé. Cette valeur apparaît dans [Fleet Automation][7] et est requise pour [la topologie de passerelle](#4-optional-configure-gateway-topology-preview). L'un des éléments suivants : `gateway`, `daemonset` ou `unknown`. La valeur par défaut `unknown` signifie que le type de déploiement n'a pas été défini. | `unknown` |
| `installation_method` | Comment le Collector a été installé. L'un des éléments suivants : `kubernetes`, `bare-metal`, `docker`, `ecs-fargate`, `eks-fargate` ou non défini. Disponible dans Collector v0.148.0 et versions ultérieures. | non défini |
| `gateway_service` | À définir uniquement sur les Collectors **passerelle**. Le service Kubernetes qui sert de façade aux pods du Collector de passerelle. Format : `service` ou `namespace/service`. Disponible dans Collector v0.150.0 et versions ultérieures. | - |
| `gateway_destination` | À définir sur tout Collector qui transfère la télémétrie vers une passerelle en aval. Le service Kubernetes vers lequel ce Collector transfère la télémétrie. Doit correspondre à `gateway_service` sur le Collector de passerelle récepteur. Format : `service` ou `namespace/service`. Disponible dans Collector v0.150.0 et versions ultérieures. | - |
| `proxy_url` | URL du proxy HTTP pour les requêtes sortantes. | - |
| `timeout` | Délai d'expiration pour les requêtes HTTP. | `30s` |
| `tls.insecure_skip_verify` | Ignorer la vérification du certificat TLS. | `false` |

<div class="alert alert-danger">
<strong>Correspondance du nom d'hôte</strong> : Si vous spécifiez un nom personnalisé <code>hostname</code> dans l'extension Datadog, il doit correspondre au nom d'hôte dans la télémétrie exportée. L'extension ne déduit pas de nom d'hôte à partir de la télémétrie de l'application dans vos pipelines ; elle obtient son nom d'hôte à partir des API du système ou du fournisseur cloud, ou d'une configuration manuelle. Si vous utilisez l'exportateur Datadog, sa <code>hostname</code> valeur doit également correspondre. Sinon, Datadog pourrait ne pas corréler la télémétrie au bon hôte, et des hôtes en double peuvent apparaître.
</div>

### Exemple de configuration complète avec l'exportateur Datadog {#complete-configuration-example-with-the-datadog-exporter}

L'exemple suivant utilise l'exportateur Datadog. L'extension elle-même ne le nécessite pas ; pour le pipeline recommandé, utilisez la configuration de l'exportateur HTTP OTLP depuis [Set Up the OpenTelemetry Collector][9].

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    http:
      endpoint: "localhost:9875"
      path: "/metadata"
    proxy_url: "http://proxy.example.com:8080"
    timeout: 30s
    tls:
      insecure_skip_verify: false

exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    sending_queue:
      batch:
        flush_timeout: 10s

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      exporters: [datadog/exporter]
```

## Affichage de la configuration du Collector {#viewing-collector-configuration}

Une fois configuré, vous pouvez afficher la configuration de l'OpenTelemetry Collector ainsi que les informations de build à divers endroits :

### Fleet Automation {#fleet-automation}
1. Accédez à [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}][7].
2. Filtrez les hôtes du Collector OTel en utilisant les facettes du Collector, puis cliquez sur un hôte.
3. Dans le panneau latéral, sélectionnez l'onglet {{< ui >}}Info{{< /ui >}} pour afficher les informations de build.
4. Sélectionnez l'onglet {{< ui >}}Configurations{{< /ui >}} pour afficher le fichier YAML complet ou une visualisation du pipeline de vos configurations du Collector OTel.

{{< img src="/agent/fleet_automation/fleet-automation-yaml-view.png" alt="Afficher les YAML de configuration du Collector OTel dans Fleet Automation" style="width:100%;" >}}

### Liste d'infrastructure (Liste des hôtes) {#infrastructure-list-host-list}

1. Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][2] dans votre compte Datadog.
2. Cliquez sur n'importe quel hôte exécutant l'OpenTelemetry Collector (**Remarque** : filtrez par `field:apps:otel` pour n'afficher que les instances du Collector).
3. Dans le panneau des détails de l'hôte, sélectionnez l'onglet {{< ui >}}OTel Collector{{< /ui >}} pour voir les informations de build et la configuration complète du Collector.

### Resource Catalog {#resource-catalog}

1. Accédez à [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Resource Catalog{{< /ui >}}][3] dans votre compte Datadog
2. Filtrez par hôtes ou recherchez vos instances de Collector.
3. Cliquez sur n'importe quel hôte exécutant l'OpenTelemetry Collector.
4. Faites défiler jusqu'à {{< ui >}}Collector{{< /ui >}} pour voir les informations de build et la configuration complète du Collector.

## Serveur HTTP local {#local-http-server}

L'extension Datadog inclut un serveur HTTP local pour le débogage et l'inspection :

```bash
# Access collector metadata locally
curl http://localhost:9875/metadata
```

Cet endpoint fournit :
- Configuration du Collector (nettoyée des informations sensibles)
- Informations sur la build et détails de la version
- Liste des composants actifs
- État de l'extension

## Dépannage {#troubleshooting}

### La configuration n'apparaît pas dans Datadog {#configuration-not-appearing-in-datadog}

1. **Vérifiez la correspondance du nom d'hôte** : confirmez que le nom d'hôte de l'extension Datadog correspond au nom d'hôte dans la télémétrie exportée. Si vous utilisez l'exportateur Datadog, confirmez que son nom d'hôte correspond également.
2. **Vérifiez la clé d'API** : confirmez que la clé d'API est valide et dispose des autorisations appropriées.
3. **Vérifiez les logs du Collector** : recherchez les logs d'initialisation de l'extension et de soumission des données.
4. **Confirmez que l'extension est activée** : vérifiez que l'extension est répertoriée dans la configuration du service.

### Problèmes de serveur HTTP {#http-server-issues}

1. **Conflits de port** : Assurez-vous que le port 9875 est disponible ou configurez un port différent.
2. **Accès réseau** : Vérifiez que le serveur HTTP est accessible depuis votre emplacement de débogage.
3. **Vérifiez les logs** : Examinez les logs de l'extension pour détecter les problèmes de démarrage du serveur HTTP.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/catalog
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.129.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.129.1
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/fleet
[8]: /fr/opentelemetry/setup/ddot_collector/
[9]: /fr/opentelemetry/setup/collector_exporter/
[10]: /fr/opentelemetry/integrations/collector_health_metrics/