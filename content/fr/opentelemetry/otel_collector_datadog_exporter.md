---
aliases:
- /fr/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /fr/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
description: Envoyer des données OpenTelemetry au Collector OpenTelemetry et à l'exportateur
  Datadog
further_reading:
- link: tracing/glossary/
  tag: OpenTelemetry
  text: Documentation sur le Collector
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: GitHub
  text: Envoyer des métriques, des traces et des logs depuis le Collector OpenTelemetry
    vers Datadog via l'exportateur Datadog
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: GitHub
  text: Utiliser HiveMQ et OpenTelemetry pour surveiller les applications IoT dans
    Datadog
kind: documentation
title: Exportateur Datadog pour le Collector OpenTelemetry
---

Le Collector OpenTelemetry est un agent indépendant conçu pour la collecte et l'exportation de données de télémétrie émises par de nombreux processus. L'[exportateur Datadog][1] pour le Collector OpenTelemetry vous permet de transférer des données de traces, métriques et logs depuis les SDK OpenTelemetry vers Datadog (sans l'Agent Datadog). Il fonctionne avec tous les langages pris en charge et vous offre la possibilité d'[associer vos traces OpenTelemetry à vos logs d'application][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Bibliothèque d'instrumentation de l'application, intégrations cloud et autres solutions de surveillance (par exemple Prometheus) -> exportateur Datadog dans le Collector OTel -> Datadog" style="width:100%;">}}

## Configuration du Collector OTel avec l'exportateur Datadog

Pour exécuter le Collector OpenTelemetry avec l'exportateur Datadog :

### 1. Télécharger le Collector OpenTelemetry

Téléchargez la dernière version de la distribution OpenTelemetry Collector Contrib depuis [le référentiel du projet][3].

### 2. Configurer l'exportateur Datadog

Pour utiliser l'exportateur Datadog, ajoutez-le à la [configuration du Collector OpenTelemetry][4]. Créez un fichier de configuration et nommez-le `collector.yaml`. Après avoir configuré votre clé d'API Datadog via la variable d'environnement `DD_API_KEY`, utilisez le fichier d'exemple qui fournit une configuration basique prête à l'emploi :

{{< code-block lang="yaml" filename="collector.yaml" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      http:
      grpc:
  # Le récepteur hostmetrics est requis pour obtenir des métriques d'infrastructure valides dans Datadog.
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # Le récepteur prometheus scrape les métriques requises pour le dashboard du Collector OpenTelemetry.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

exporters:
  datadog:
    api:
      site: <SITE_DD>
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, otlp]
      processors: [batch]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
{{< /code-block >}}

Remplacez `<SITE_DD>` par votre site, {{< region-param key="dd_site" code="true" >}}.

La configuration ci-dessus établit la réception de données OTLP provenant de bibliothèques d'instrumentation OpenTelemetry via HTTP et gRPC, et configure un [processeur batch][5], qui est obligatoire pour tout environnement autre qu'un environnement de développement. Notez que le fait de traiter une trop grosse quantité de données de télémétrie dans le processeur batch peut engendrer des erreurs `413 - Request Entity Too Large`.

La configuration précise du processeur batch dépend de votre charge de travail ainsi que des types de signaux. L'admission Datadog applique une limite de charge utile différente pour chacun des 3 types de signaux :
- Admission des traces : 3,2 Mo
- Admission des logs : [5 Mo avant compression][15]
- Admission des métriques V2 : [500 Ko ou 5 Mo après décompression][16]

#### Configuration avancée

[Cet exemple de fichier de configuration entièrement documenté][6] montre l'ensemble des options de configuration possibles pour l'exportateur Datadog. Il peut exister d'autres options pertinentes pour votre déploiement, telles que `api::site` ou celles figurant dans la section `host_metadata`.

### 3. Configurer l'application

Pour améliorer les métadonnées des traces et optimiser l'intégration avec Datadog :

- **Utilisez des détecteurs de ressources** : s'ils sont fournis par le SDK, ajoutez les détails des conteneurs en tant qu'attributs de ressources. Par exemple, pour Go, utilisez l'option de ressource [`WithContainer()`][7].

- **Appliquez le [tagging de service unifié][8]** : assurez-vous d'avoir configuré votre application avec les attributs de ressource adéquats pour le tagging de service unifié. Cela a pour effet de lier les données de télémétrie Datadog entre elles avec des tags correspondant au nom du service, à l'environnement de déploiement et à la version du service. L'application doit définir ces tags en utilisant les conventions sémantiques d'OpenTelemetry : `service.name`, `deployment.environment` et `service.version`.

### 4. Exécuter le Collector

{{< tabs >}}
{{% tab "Sur un host" %}}

Exécutez le Collector en spécifiant le fichier de configuration à l'aide du paramètre `--config` :

```
otelcontribcol_linux_amd64 --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker (localhost)" %}}
Pour exécuter le Collector OpenTelemetry en tant qu'image Docker et recevoir des traces du même host :

1. Choisissez une image Docker publiée, telle que [`otel/opentelemetry-collector-contrib`][1].

2. Déterminez les ports à ouvrir sur votre conteneur de sorte que les traces OpenTelemetry soient envoyées au Collector OpenTelemetry. Par défaut, les traces sont envoyées via gRPC sur le port 4317. Si vous n'utilisez pas le framework gRPC, utilisez le port 4138.

3. Exécutez le conteneur et exposez le port nécessaire à l'aide du fichier `collector.yaml` préalablement défini. Par exemple, en supposant que vous utilisez le port 4317 :

   ```
   $ docker run \
       -p 4317:4317 \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```


[1]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
{{% /tab %}}
{{% tab "Docker (autres conteneurs)" %}}

Pour exécuter le Collector OpenTelemetry en tant qu'image Docker et recevoir des traces d'autres conteneurs :

1. Créez un réseau Docker :

    ```
    docker network create <NETWORK_NAME>
    ```

2. Exécutez le Collector OpenTelemetry et les conteneurs d'application au sein du même réseau.

   ```
   # Run the OpenTelemetry Collector
   docker run -d --name opentelemetry-collector \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
       otel/opentelemetry-collector-contrib
   ```

   Lorsque vous exécutez le conteneur d'application, assurez-vous que la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` configurée utilise le hostname approprié pour le Collector OpenTelemetry. Dans l'exemple ci-dessous, il s'agit de `opentelemetry-collector`.

   ```
   # Run the application container
   docker run -d --name app \
       --network <NETWORK_NAME> \
       --hostname $(hostname) \
       -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:4317 \
       company/app:latest
   ```

{{% /tab %}}
{{% tab "Kubernetes (DaemonSet)" %}}

Pour configurer une collection OTel dans un environnement Kubernetes, il est recommandé d'utiliser un DaemonSet. Pour déployer le Collector OpenTelemetry et l'exportateur Datadog dans une infrastructure Kubernetes :

1. Utilisez cet [exemple complet de configuration du Collector OpenTelemetry en utilisant l'exportateur Datadog en tant que DaemonSet][1], y compris l'exemple de configuration de l'application.

   Prêtez notamment attention à [ces options de configuration essentielles utilisées dans l'exemple][2], qui permettent de s'assurer que les ports essentiels du DaemonSet sont exposés et accessibles par votre application :

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

   Si vous n'avez pas besoin des ports HTTP et gRPC standard pour votre application, vous pouvez très bien les supprimer.

2. Recueillez les attributs Kubernetes pertinents utilisés pour le tagging des conteneurs Datadog, puis ajoutez l'IP du pod en tant qu'attribut de ressource, [comme indiqué dans l'exemple][3] :

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

   De cette façon, le [processeur d'attributs Kubernetes][4] qui est utilisé dans [la ConfigMap][5] sera en mesure d'extraire les métadonnées nécessaires à associer aux traces. Des [rôles][6] supplémentaires doivent être configurés pour autoriser l'accès à ces métadonnées. [L'exemple][1] est complet, prêt à l'emploi et contient déjà les rôles adéquats configurés.

3. Spécifiez votre [conteneur d'application][7]. Pour configurer votre conteneur d'application, assurez-vous que le hostname de l'endpoint OTLP utilisé est valide. Étant donné que le Collector OpenTelemetry s'exécute en tant que DaemonSet, le host actuel doit être ciblé. Configurez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` de votre conteneur d'application correctement, comme indiqué dans le [chart en exemple][8] :

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


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
{{% /tab %}}
{{% tab "Kubernetes (passerelle)" %}}

Pour déployer le Collector OpenTelemetry et l'exportateur Datadog dans un déploiement Kubernetes en tant que passerelle :

1. Utilisez cet [exemple complet de configuration du Collector OpenTelemetry en utilisant l'exportateur Datadog en tant que DaemonSet][1], y compris l'exemple de configuration de l'application.

   Prêtez notamment attention à [ces options de configuration essentielles utilisées dans l'exemple][2], qui permettent de s'assurer que les ports essentiels du DaemonSet sont exposés et accessibles par votre application :

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

   Si vous n'avez pas besoin des ports HTTP et gRPC standard pour votre application, vous pouvez très bien les supprimer.

2. Recueillez les attributs Kubernetes pertinents utilisés pour le tagging des conteneurs Datadog, puis ajoutez l'IP du pod en tant qu'attribut de ressource, [comme indiqué dans l'exemple][3] :

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

   De cette façon, le [processeur d'attributs Kubernetes][4] qui est utilisé dans [la ConfigMap][5] sera en mesure d'extraire les métadonnées nécessaires à associer aux traces. Des [rôles][6] supplémentaires doivent être configurés pour autoriser l'accès à ces métadonnées. [L'exemple][1] est complet, prêt à l'emploi et contient déjà les rôles adéquats configurés.

3. Spécifiez votre [conteneur d'application][7]. Pour configurer votre conteneur d'application, assurez-vous que le hostname de l'endpoint OTLP utilisé est valide. Étant donné que le Collector OpenTelemetry s'exécute en tant que DaemonSet, le host actuel doit être ciblé. Configurez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` de votre conteneur d'application correctement, comme indiqué dans le [chart en exemple][8] :

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

4. Modifiez le DaemonSet afin qu'il inclue un [exportateur OTLP][9] au lieu de l'exportateur Datadog [utilisé actuellement][10] :

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "<GATEWAY_HOSTNAME>:4317"
   # ...
   ```

5. Assurez-vous que les pipelines du service utilisent cet exportateur au lieu de celui de Datadog qui [est utilisé dans l'exemple][11] :

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

   De cette façon, chaque agent transmettra ses données à la passerelle Collector via le protocole OTLP. 

6. Remplacez `GATEWAY_HOSTNAME` par l'adresse de la passerelle de votre Collector OpenTelemetry.

7. Pour faire en sorte que les métadonnées Kubernetes continuent d'être appliquées aux traces, demandez au [processeur `k8sattributes`][12] de transmettre l'IP du pod à la passerelle Collector afin qu'elle puisse obtenir les métadonnées :

   ```yaml
   # ...
   k8sattributes:
     passthrough: true
   # ...
   ```

   Pour en savoir plus sur l'option `passthrough`, consultez [la documentation correspondante][13].

8. Assurez-vous que la configuration de la passerelle Collector utilise les mêmes réglages de l'exportateur Datadog que ceux qui ont été remplacés par l'exportateur OTLP dans les agents. Par exemple (remplacez `<SITE_DD>` par votre site, {{< region-param key="dd_site" code="true" >}}) :

   ```yaml
   # ...
   exporters:
     datadog:
       api:
         site: <DD_SITE>
         key: ${env:DD_API_KEY}
   # ...
   ```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L41-L46
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33-L40
[4]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor#section-readme
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L26-L27
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/roles.yaml
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L21-L22
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/deployment.yaml#L24-L32
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15-L18
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L27
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/e79d917/processor/k8sattributesprocessor/doc.go#L196-L220
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Pour utiliser l'Operator OpenTelemetry :

1. Consultez la [documentation officielle relative au déploiement de l'Operator OpenTelemetry][1]. Comme décrit dans ce document, déployez le Certificate Manager en plus de l'Operator.

2. Configurez l'Operator au moyen d'une des configurations Kubernetes standard du Collector OpenTelemetry :
   * [Déploiement en tant que Daemonset][2] : utilisez le déploiement en tant que DaemonSet si vous voulez vous assurer de recevoir les métriques du host. 
   * [Déploiement en tant que passerelle][3]

   Par exemple :

   ```yaml
   apiVersion: opentelemetry.io/v1alpha1
   kind: OpenTelemetryCollector
   metadata:
     name: opentelemetry-example
   spec:
     mode: daemonset
     hostNetwork: true
     image: otel/opentelemetry-collector-contrib
     env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             key:  datadog_api_key
             name: opentelemetry-example-otelcol-dd-secret
     config:
       receivers:
         otlp:
           protocols:
             grpc:
             http:
       hostmetrics:
         collection_interval: 10s
         scrapers:
           paging:
             metrics:
               system.paging.utilization:
                 enabled: true
           cpu:
             metrics:
               system.cpu.utilization:
                 enabled: true
           disk:
           filesystem:
             metrics:
               system.filesystem.utilization:
                 enabled: true
           load:
           memory:
           network:
       processors:
         k8sattributes:
         batch:
           send_batch_max_size: 100
           send_batch_size: 10
           timeout: 10s
       exporters:
         datadog:
           api:
             key: ${env:DD_API_KEY}
       service:
         pipelines:
           metrics:
             receivers: [hostmetrics, otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
           traces:
             receivers: [otlp]
             processors: [k8sattributes, batch]
             exporters: [datadog]
   ```




[1]: https://github.com/open-telemetry/opentelemetry-operator#readme
[2]: /fr/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[3]: /fr/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesgateway#4-run-the-collector
{{% /tab %}}
{{% tab "En même temps que l'Agent" %}}

Pour utiliser le Collector OpenTelemetry en même temps que l'Agent Datadog :

1. Configurez un DaemonSet supplémentaire pour vous assurer que l'Agent Datadog s'exécute sur chaque host en même temps que le [DaemonSet du Collector OpenTelemetry][1] précédemment configuré. Pour en savoir plus, consultez [la documentation relative au déploiement de l'Agent Datadog dans Kubernetes][2].

2. Activez [l'ingestion OTLP dans l'Agent Datadog][3].

3. À présent que l'Agent Datadog est prêt à recevoir les traces et métriques OTLP, modifiez le [DaemonSet du Collector OpenTelemetry][1] afin qu'il utilise l'[exportateur OTLP][4] au lieu de l'exportateur Datadog en ajoutant la configuration suivante à [votre ConfigMap][5] :

   ```yaml
   # ...
   exporters:
     otlp:
       endpoint: "${HOST_IP}:4317"
       tls:
         insecure: true
   # ...
   ```

4. Assurez-vous que la variable d'environnement `HOST_IP` est spécifiée [dans le DaemonSet][6] :

   ```yaml
   # ...
           env:
           - name: HOST_IP
             valueFrom:
               fieldRef:
                 fieldPath: status.hostIP
   # ...
   ```

5. Assurez-vous que les [pipelines du service][7] utilisent le protocole OTLP :

   ```yaml
   # ...
       service:
         pipelines:
           metrics:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
           traces:
             receivers: [otlp]
             processors: [resourcedetection, k8sattributes, batch]
             exporters: [otlp]
   # ...
   ```

   Ici, le récepteur `hostmetrics` ne doit pas être utilisé car ces métriques seront émises par l'Agent Datadog.

[1]: /fr/opentelemetry/otel_collector_datadog_exporter/?tab=kubernetesdaemonset#4-run-the-collector
[2]: /fr/containers/kubernetes/
[3]: /fr/opentelemetry/otlp_ingest_in_the_agent/?tab=kubernetesdaemonset#enabling-otlp-ingestion-on-the-datadog-agent
[4]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md#otlp-grpc-exporter
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L15
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml#L33
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/2c32722e37f171bab247684e7c07e824429a8121/exporter/datadogexporter/examples/k8s-chart/configmap.yaml#L30-L39
{{% /tab %}}
{{< /tabs >}}

### Résolution du hostname

Le hostname appliqué comme tag aux signaux OpenTelemetry est récupéré à partir des sources suivantes. Si une source n'est pas disponible ou n'est pas valide, la suivante est automatiquement utilisée, en respectant l'ordre suivant :

1. À partir des [attributs de ressource][9], par exemple `host.name` (beaucoup d'autres sont pris en charge).
2. À partir du champ `hostname` dans la configuration de l'exportateur.
3. À partir de l'API du fournisseur de cloud.
4. À partir du hostname Kubernetes.
5. À partir du nom de domaine complet.
6. À partir du hostname du système d'exploitation.

## Limites des différents déploiements

Le Collector OpenTelemetry propose [deux principales méthodes de déploiement][14] : en tant qu'agent ou en tant que passerelle. Selon la méthode de déploiement choisie, certains composants ne sont pas disponibles.

| Mode de déploiement | Métriques de host | Métriques d'orchestration Kubernetes | Traces | Auto-ingestion des logs |
| --- | --- | --- | --- | --- |
| En tant que passerelle | | {{< X >}} | {{< X >}} | |
| En tant qu'agent | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[8]: /fr/getting_started/tagging/unified_service_tagging/
[9]: https://opentelemetry.io/docs/reference/specification/resource/sdk/#sdk-provided-resource-attributes
[14]: https://opentelemetry.io/docs/collector/deployment/
[15]: https://docs.datadoghq.com/fr/api/latest/logs/
[16]: https://docs.datadoghq.com/fr/api/latest/metrics/#submit-metrics