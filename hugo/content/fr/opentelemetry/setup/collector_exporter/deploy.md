---
aliases:
- /fr/opentelemetry/collector_exporter/deployment
further_reading:
- link: /opentelemetry/setup/collector_exporter/datadog_exporter/
  tag: Documentation
  text: Configurer l'exportateur et le connecteur Datadog
- link: https://opentelemetry.io/docs/collector/deployment/
  tag: Site externe
  text: Déploiement de l'OpenTelemetry Collector
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Architecture Center
  text: Collecteur OpenTelemetry dans Kubernetes
title: Déployer l'OpenTelemetry Collector avec l'exportateur Datadog
---
Cette page vous guide à travers diverses options de déploiement pour l'OpenTelemetry Collector avec l'exportateur Datadog, vous permettant d'envoyer des traces, des métriques et des logs à Datadog.

## Déployer le Collector {#deploy-the-collector}

L'OpenTelemetry Collector peut être déployé dans divers environnements pour répondre aux différents besoins en infrastructure. Cette section couvre les options de déploiement suivantes :

- [Sur un host](#on-a-host)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

Il est important de noter que certaines fonctionnalités et capacités peuvent varier en fonction de la méthode de déploiement. Pour un aperçu détaillé de ces différences, consultez les [limitations basées sur le déploiement](#deployment-based-limitations).

Choisissez l'option de déploiement qui correspond le mieux à votre infrastructure et suivez les instructions suivantes.

### Sur un host {#on-a-host}

Exécutez le Collector en spécifiant le fichier de configuration à l'aide du paramètre `--config` :

```shell
otelcontribcol_linux_amd64 --config collector.yaml
```

### Docker {#docker}

{{< tabs >}}
{{% tab "localhost" %}}
Pour exécuter l'OpenTelemetry Collector en tant qu'image Docker et recevoir des traces depuis le même host :

1. Choisissez une image Docker publiée telle que [`otel/opentelemetry-collector-contrib`][1].

2. Déterminez quels ports ouvrir sur votre conteneur afin que les traces OpenTelemetry soient envoyées à l'OpenTelemetry Collector. Par défaut, les traces sont envoyées via gRPC sur le port 4317. Si vous n'utilisez pas gRPC, utilisez le port 4318.

3. Exécutez le conteneur et exposez le port nécessaire, en utilisant le fichier `collector.yaml`. Par exemple, si vous utilisez le port 4317 :

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "Autres conteneurs" %}}

Pour exécuter le Collector OpenTelemetry en tant qu'image Docker et recevoir des traces d'autres conteneurs :

1. Créez un réseau Docker :

    ```
    docker network create <NETWORK_NAME>
    ```

2. Exécutez l'OpenTelemetry Collector et les conteneurs d'application au sein du même réseau.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   Lors de l'exécution du conteneur d'application, assurez-vous que la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` est configurée pour utiliser le nom de host approprié pour l'OpenTelemetry Collector. Dans l'exemple ci-dessous, il s'agit de `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}
{{< /tabs >}}

### Kubernetes {#kubernetes}

{{< tabs >}}
{{% tab "DaemonSet" %}}

L'utilisation d'un DaemonSet est le moyen le plus courant et recommandé pour configurer la collecte OpenTelemetry dans un environnement Kubernetes. Pour déployer l'OpenTelemetry Collector et le Datadog Exporter dans une infrastructure Kubernetes :

1. Utilisez cet [exemple de configuration][1], incluant la configuration de l'application, pour configurer l'OpenTelemetry Collector avec le Datadog Exporter en tant que DaemonSet.
2. Assurez-vous que les ports essentiels pour le DaemonSet sont exposés et accessibles à votre application. Les options de configuration suivantes [issues de l'exemple][2] définissent ces ports :
   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
   <div class="alert alert-info">Si votre application ne nécessite pas à la fois HTTP et gRPC, supprimez les ports inutilisés de la configuration.</div>

1. Pour collecter des attributs Kubernetes précieux, qui sont utilisés pour le marquage des conteneurs Datadog, rapportez l'IP du Pod en tant qu'attribut de ressource, [comme indiqué dans l'exemple][3] :

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   Cela garantit que le [processeur d'attributs Kubernetes][4], qui est utilisé dans [la config map][5], est capable d'extraire les métadonnées nécessaires pour les associer aux traces. Il existe des [rôles][6] supplémentaires qui doivent être définis pour permettre l'accès à ces métadonnées. [L'exemple][1] est complet, prêt à l'emploi et dispose des rôles correctement configurés.
  
1. Configurez votre [conteneur d'application][7] pour utiliser le nom de host d'endpoint OTLP correct. Comme l'OpenTelemetry Collector s'exécute en tant que DaemonSet, le host actuel doit être ciblé. Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` de votre conteneur d'application en conséquence, comme dans le [graphique d'exemple][8] :

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```
   
  1. Configurez la collecte des métadonnées du host pour garantir des informations de host précises. Configurez votre DaemonSet pour collecter et transférer les métadonnées du host :

     ```yaml
     processors:
       resourcedetection:
         detectors: [system, env]
       k8sattributes:
         # existing k8sattributes config
       transform:
         trace_statements:
           - context: resource
             statements:
               - set(attributes["datadog.host.use_as_metadata"], true)
     ...
     service:
       pipelines:
         traces:
           receivers: [otlp]
           processors: [resourcedetection, k8sattributes, transform, batch]
           exporters: [datadog]
     ```

   Cette configuration collecte les métadonnées du host à l'aide du processeur `resourcedetection`, ajoute les métadonnées Kubernetes avec le processeur `k8sattributes` et définit l'attribut `datadog.host.use_as_metadata` sur `true`. Pour plus d'informations, consultez [Mappage des conventions sémantiques OpenTelemetry aux informations des hosts de la liste des infrastructures][9].


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: /fr/opentelemetry/schema_semantics/host_metadata/


{{% /tab %}}
{{% tab "Passerelle" %}}

Pour déployer le Collector OpenTelemetry et l'exportateur Datadog dans un déploiement Kubernetes en tant que passerelle :

1. Utilisez cet [exemple de configuration][1], incluant la configuration de l'application, pour configurer l'OpenTelemetry Collector avec le Datadog Exporter en tant que DaemonSet.
2. Assurez-vous que les ports essentiels pour le DaemonSet sont exposés et accessibles à votre application. Les options de configuration suivantes [issues de l'exemple][2] définissent ces ports :
   ```yaml
   # ...
        ports:
        - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
          hostPort: 4318
        - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
          hostPort: 4317
        - containerPort: 8888  # Default endpoint for querying Collector observability metrics.
   # ...
   ```
   <div class="alert alert-info">Si votre application ne nécessite pas à la fois HTTP et gRPC, supprimez les ports inutilisés de la configuration.</div>

1. Pour collecter des attributs Kubernetes précieux, qui sont utilisés pour le marquage des conteneurs Datadog, rapportez l'IP du Pod en tant qu'attribut de ressource, [comme indiqué dans l'exemple][3] :

   ```yaml
   # ...
           env:
           - name: POD_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.podIP
           # The k8s.pod.ip is used to associate pods for k8sattributes
           - name: OTEL_RESOURCE_ATTRIBUTES
             value: "k8s.pod.ip=$(POD_IP)"
   # ...
   ```

   Cela garantit que le [processeur d'attributs Kubernetes][4], qui est utilisé dans [la config map][5], est capable d'extraire les métadonnées nécessaires pour les associer aux traces. Il existe des [rôles][6] supplémentaires qui doivent être définis pour permettre l'accès à ces métadonnées. [L'exemple][1] est complet, prêt à l'emploi et dispose des rôles correctement configurés.
  
1. Configurez votre [conteneur d'application][7] pour utiliser le nom de host d'endpoint OTLP correct. Comme l'OpenTelemetry Collector s'exécute en tant que DaemonSet, le host actuel doit être ciblé. Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` de votre conteneur d'application en conséquence, comme dans le [graphique d'exemple][8] :

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
             # The application SDK must use this environment variable in order to successfully
             # connect to the DaemonSet's collector.
           - name: OTEL_EXPORTER_OTLP_ENDPOINT
             value: "http://$(HOST_IP):4318"
   # ...
   ```

1. Modifiez le DaemonSet pour inclure un [exportateur OTLP][9] au lieu de l'exportateur Datadog [actuellement en place][10] :

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

1. Assurez-vous que les pipelines de service utilisent cet exportateur, au lieu de celui de Datadog qui [est en place dans l'exemple][11] :

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   Cela garantit que chaque Agent transmet ses données via le protocole OTLP à la passerelle du collecteur. 

1. Remplacez `<GATEWAY_HOSTNAME>` par l'adresse de votre passerelle OpenTelemetry Collector.

1. Configurez le [processeur `k8sattributes`][12] pour transférer l'adresse IP du Pod au collecteur de passerelle afin qu'il puisse obtenir les métadonnées :

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   Pour plus d'informations sur l'option `passthrough`, lisez [sa documentation][13] :

1. Assurez-vous que la configuration du collecteur de passerelle utilise les mêmes paramètres d'exportateur Datadog que ceux qui ont été remplacés par l'exportateur OTLP dans les agents : Par exemple (où `<DD_SITE>` est votre site, {{< region-param key="dd_site" code="true" >}}) :

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```
1. Configurez la collecte des métadonnées de host :
   Dans un déploiement de passerelle, vous devez vous assurer que les métadonnées de host sont collectées par les collecteurs d'agent et préservées par le collecteur de passerelle. Cela garantit que les métadonnées de host sont collectées par les agents et correctement transférées via la passerelle vers Datadog.  
   Pour plus d'informations, consultez [Mappage des conventions sémantiques OpenTelemetry aux informations des hosts de la liste des infrastructures][14].

   **Configuration du collecteur d'Agent** :

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true

   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [resourcedetection, k8sattributes, transform, batch]
         exporters: [otlp]
   ```

   **Configuration du collecteur de passerelle** :

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]

   exporters:
     datadog:
       api:
         key: ${DD_API_KEY}
       hostname_source: resource_attribute

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [k8sattributes, batch]
         exporters: [datadog]
   ```

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L38
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L48-L57
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L32-L39
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L56-L59
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L136-L148
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L69
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#as-a-gateway
[14]: /fr/opentelemetry/schema_semantics/host_metadata/

{{% /tab %}}
{{% tab "Opérateur" %}}

Pour utiliser l'opérateur OpenTelemetry, suivez la [documentation officielle pour le déploiement de l'opérateur OpenTelemetry][1]. Tel que décrit dans la documentation, déployez également le gestionnaire de certificats en plus de l'opérateur.

Configurez l'Operator au moyen d'une des configurations Kubernetes standard du Collector OpenTelemetry :
* [Déploiement DaemonSet][2] - Utilisez le déploiement DaemonSet si vous souhaitez vous assurer de recevoir les métriques du host. 
* [Déploiement Gateway][3]


[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /fr/opentelemetry/collector_exporter/deployment/?tab=daemonset#kubernetes
[3]: /fr/opentelemetry/collector_exporter/deployment/?tab=gateway#kubernetes
{{% /tab %}}

{{< /tabs >}}


## Résolution du nom de host {#hostname-resolution}

Consultez [Mapping OpenTelemetry Semantic Conventions to Hostnames][25] pour comprendre comment le nom de host est résolu.

## Limitations liées au déploiement {#deployment-based-limitations}

L'OpenTelemetry Collector dispose de [deux méthodes de déploiement principales][20] : Agent et Gateway. Selon votre méthode de déploiement, les composants suivants sont disponibles :

| Mode de déploiement | Métriques du host | Métriques d'orchestration Kubernetes | Traces | Auto-ingestion de logs |
| --- | --- | --- | --- | --- |
| en tant que Gateway | | {{< X >}} | {{< X >}} | |
| en tant qu'Agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[18]: /fr/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
[19]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[20]: https://opentelemetry.io/docs/collector/deployment/
[21]: https://app.datadoghq.com/integrations/otel
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[24]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[25]: /fr/opentelemetry/schema_semantics/hostname/