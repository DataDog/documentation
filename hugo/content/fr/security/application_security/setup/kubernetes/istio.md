---
aliases:
- /fr/security/application_security/threats_detection/istio
- /fr/security/application_security/setup/istio
- /fr/security/application_security/setup/standalone/istio
code_lang: istio
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: Code source
  text: Code source de l'intégration Envoy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Activation d'App and API Protection pour Istio
---
Vous pouvez activer App and API Protection au sein d'un maillage de services Istio pour inspecter et protéger le trafic à la périphérie de votre infrastructure. Cela fonctionne au niveau de la passerelle d'entrée Istio ou au niveau du sidecar.

## Prérequis {#prerequisites}

Avant de commencer, vérifiez que vous disposez des éléments suivants :

- Un cluster Kubernetes en cours d'exécution avec [Istio][1] installé.
- Le [Datadog Agent est installé et configuré][2] dans votre cluster Kubernetes.
  - Activez et configurez [Remote Configuration][3] pour permettre le blocage des attaquants via l'interface utilisateur Datadog.
  - Activez [APM][4] dans l'Agent. Cela permet au service de processeur de sécurité d'envoyer ses propres traces à l'Agent.
    - Optionnellement, activez le [Cluster Agent Admission Controller][5] pour injecter automatiquement les informations de host du Datadog Agent dans le service du processeur de sécurité App and API Protection.

## Configuration automatisée avec App and API Protection pour Kubernetes {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  <p>La configuration automatisée utilise le <strong>mode sidecar</strong> : le processeur de sécurité s'exécute en tant que conteneur injecté dans vos pods de passerelle Istio. Aucun déploiement de processeur distinct n'est nécessaire.</p>
  <p>Pour une configuration en <strong>mode externe</strong>, consultez <a href="/containers/kubernetes/appsec/">App and API Protection for Kubernetes</a>.</p>
</div>

### Configuration {#setup}

Activez la configuration automatique à l'aide de Helm ou de Datadog Operator.

{{< tabs >}}
{{% tab "Helm" %}}

Ajoutez ce qui suit à votre `values.yaml` :

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Installez ou mettez à niveau le chart Helm Datadog :

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Ajoutez des annotations à votre ressource `DatadogAgent`. Le mode sidecar est le mode par défaut, il suffit donc d'activer l'injecteur :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

Appliquez avec :

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

Une fois cette option activée, le Datadog Cluster Agent :
- Injecte un conteneur de processeur sidecar dans vos pods de passerelle Istio
- Crée des ressources `EnvoyFilter` pour acheminer le trafic vers le processeur sidecar colocalisé
- Surveille les nouvelles passerelles Istio et les configure automatiquement

**Vérifiez** la configuration en recherchant les filtres créés :

```bash
kubectl get envoyfilter -n istio-system
```

Pour le réglage et le dépannage des ressources sidecar, consultez [App and API Protection for Kubernetes][12].

## Configuration manuelle (alternative) {#manual-configuration-alternative}

Pour un contrôle précis sur des passerelles ou des sidecars spécifiques, utilisez la configuration manuelle ci-dessous. Cela implique deux étapes :
1. Déploiement du service de processeur de sécurité Datadog.
2. Configuration d'un `EnvoyFilter` pour diriger le trafic de votre passerelle d'entrée Istio (ou sidecars) vers ce service.

### Étape 1 : Déployez le service du processeur de sécurité Datadog {#step-1-deploy-the-datadog-security-processor-service}

Ce serveur gRPC reçoit les requêtes et les réponses d'Envoy pour l'analyse App and API Protection.

Déployez-le dans un espace de nom accessible par votre passerelle d'entrée Istio. L'image Docker se trouve sur le [registre GitHub du traceur Go de Datadog][6].

Exemple de manifeste (`datadog-aap-extproc-service.yaml`) :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
  labels:
    app: datadog-aap-extproc
spec:
  replicas: 1 # Adjust replica count based on your load
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.2.2 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the security processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # ---- Optional: Agent Configuration ----
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the security processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        readinessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service # This name will be used in the EnvoyFilter configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
  labels:
    app: datadog-aap-extproc
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
    protocol: TCP
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

#### Options de configuration pour le processeur de sécurité {#configuration-options-for-the-security-processor}

Le processeur de sécurité Datadog expose certains paramètres :

| Variable d'environnement                      | Valeur par défaut       | Description                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Adresse d'écoute du serveur gRPC.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | Port du serveur gRPC.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Port du serveur HTTP pour les checks de santé.                                                                                                      |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Taille maximale des corps à traiter en octets. S'il est défini sur `0`, les corps ne sont pas traités. La valeur recommandée est `10000000` (10 Mo). (Pour activer complètement le traitement du corps, l'option `allow_mode_override` doit également être définie dans la configuration du filtre de traitement externe) |
| `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Activez l'analyse asynchrone des requêtes. Cela désactive également les capacités de blocage. (Pour activer complètement le mode d'observabilité, cette option doit également être définie dans la configuration du filtre de traitement externe) |
| `DD_SERVICE`                              | `serviceextensions` | Nom du service affiché dans l'interface utilisateur Datadog.                                                                                                    |


Configurez la connexion du processeur de sécurité au Datadog Agent en utilisant ces variables d'environnement :

| Variable d'environnement                   | Valeur par défaut | Description                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nom de host ou adresse IP de votre Datadog Agent.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port du Datadog Agent pour la collecte des traces.                                  |

Le processeur de sécurité est construit sur le [Datadog Go Tracer][7] et hérite de toutes ses variables d'environnement. Consultez [Configuring the Go SDK][8] et [App and API Protection Library Configuration][9].

<div class="alert alert-info">
  Comme le processeur de sécurité Datadog est construit sur le traceur Datadog Go, il suit généralement le même processus de publication que le traceur, et ses images Docker sont marquées avec la version correspondante du traceur (par exemple, <code>v2.2.2</code>). Dans certains cas, des versions préliminaires peuvent être publiées entre les versions officielles du Datadog Go Tracer, et ces images sont marquées avec un suffixe tel que <code>-docker.1</code>.
</div>

### Étape 2 : Configurer un EnvoyFilter {#step-2-configure-an-envoyfilter}

Créez une ressource `EnvoyFilter` pour envoyer le trafic de votre passerelle d'entrée Istio ou de vos proxys sidecar vers le `datadog-aap-extproc-service` que vous avez déployé.

{{< tabs >}}
{{% tab "Passerelle d'entrée Istio" %}}

Applique App and API Protection à tout le trafic passant par votre passerelle d'entrée Istio (trafic Nord-Sud).

L'exemple de manifeste suivant (`datadog-aap-gateway-filter.yaml`) cible la passerelle d'entrée Istio par défaut dans l'espace de nom `istio-system` avec l'étiquette `istio: ingressgateway`.

**Remarque** : Lisez attentivement l'exemple de configuration fourni et adaptez-le à votre infrastructure et à votre environnement. Vous trouverez plus d'options de configuration dans la [documentation du processeur de sécurité Envoy](https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto).

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-gateway-filter
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
spec:
  ## If workloadSelector is omitted, the following patches apply to Gateway pods in this EnvoyFilter's namespace
  ## Use workloadSelector to target a specific Gateway instance.
  # workloadSelector:
  #   labels:
  #     istio: ingressgateway # Label for the default Istio Gateway implementation
  configPatches:
    # Patch to add the External Processing Filter to the Gateway's HTTP connection manager
    - applyTo: HTTP_FILTER
      match:
        context: GATEWAY
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        # Insert this filter before the router filter. This filter needs to be the earliest filter in the chain to process malicious traffic before the data is sent to an application.
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the security processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The security processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the security processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the security processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the security processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The security processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the security processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: GATEWAY
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog security processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{% tab "Sidecar" %}}

Cette configuration applique App and API Protection à des pods spécifiques au sein de votre maillage de services en ciblant leurs proxys sidecar Istio. Cela permet un contrôle plus granulaire des services protégés.

Voici un exemple de manifeste (`datadog-aap-sidecar-filter.yaml`) qui cible les pods avec l'étiquette `app: <your-app-label>` dans l'espace de nom `<your-application-namespace>`. Vous devez mettre à jour ces paramètres pour les adapter à votre application spécifique.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-sidecar-filter
  namespace: <your-application-namespace> # Namespace of your application
spec:
  workloadSelector:
    labels:
      app: <your-app-label> # Label of your application pods
  configPatches:
    # Patch to add the External Processing HTTP Filter to the Sidecar's connection manager
    - applyTo: HTTP_FILTER
      match:
        context: SIDECAR_INBOUND
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the security processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The security processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the security processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the security processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the security processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The security processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the security processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the Cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: SIDECAR_INBOUND
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog security processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{< /tabs >}}

Une fois que vous avez appliqué le `EnvoyFilter`, le processeur de sécurité Datadog commence à traiter le trafic via votre passerelle d'entrée Istio ou les sidecars sélectionnés.

### Étape 3 : Validez {#step-3-validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant le Signals Explorer et ses détails, ainsi que le Vulnerabilities Explorer et ses détails." video="true" >}}

## Limitations {#limitations}

Limitations connues :

* L'inspection des corps de requête et de réponse est prise en charge lors de l'utilisation de la version `v2.2.2` ou ultérieure de l'image du processeur de sécurité Datadog.

Pour plus de détails sur les compatibilités de l'intégration Istio, consultez la [page de compatibilité de l'intégration Istio][11].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://istio.io/
[2]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[3]: /fr/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /fr/tracing/trace_collection/library_config/go/
[9]: /fr/security/application_security/policies/library_configuration/
[10]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[11]: /fr/security/application_security/setup/compatibility/istio
[12]: /fr/containers/kubernetes/appsec/