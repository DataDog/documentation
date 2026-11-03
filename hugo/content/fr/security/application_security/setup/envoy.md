---
aliases:
- /fr/security/application_security/threats/setup/threat_detection/envoy
- /fr/security/application_security/threats_detection/envoy
- /fr/security/application_security/setup/threat_detection/envoy
- /fr/security/application_security/setup/standalone/envoy
code_lang: envoy
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
title: Activation de la protection des applications et des API pour Envoy
---
Vous pouvez activer la protection des applications et des API pour le proxy Envoy. L'intégration Datadog Envoy prend en charge la détection et le blocage des menaces.

## Prérequis {#prerequisites}

- Le [Datadog Agent][1] est installé et configuré pour le système d'exploitation, le conteneur, le cloud ou l'environnement virtuel de votre application.
- [Configurez l'Agent avec Remote Configuration][2] pour bloquer les attaquants via l'interface utilisateur Datadog.

## Activation de la détection des menaces {#enabling-threat-detection}
### Démarrer {#get-started}

L'intégration Envoy de protection des applications et des API utilise le filtre de traitement externe Envoy.

1. Déployez un nouveau conteneur avec l'image Docker du processeur externe Datadog. L'image est disponible sur le [registre GitHub de Datadog][5].

   Ce service est un serveur gRPC avec lequel Envoy communique pour faire analyser les requêtes et les réponses par la protection des applications et des API.

   Le processeur externe Datadog expose certains paramètres :
   | Variable d'environnement                      | Valeur par défaut       | Description                                                                                                                              |
   |-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Adresse d'écoute du serveur gRPC.                                                                                                           |
   | `DD_SERVICE_EXTENSION_PORT`               | `443`               | Port du serveur gRPC.                                                                                                                        |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Port du serveur HTTP pour les checks de santé.                                                                                                      |
   | `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Taille maximale des corps à traiter en octets. S'il est défini sur `0`, les corps ne sont pas traités. La valeur recommandée est `10000000` (10 Mo). (Pour activer complètement le traitement du corps, l'option `allow_mode_override` doit également être définie dans la configuration du filtre de traitement externe) |
   | `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Activer l'analyse asynchrone. Cela désactive également les capacités de blocage. (Pour activer complètement le mode d'observabilité, cette option doit également être définie dans la configuration du filtre de traitement externe) |
   | `DD_SERVICE`                              | `serviceextensions` | Nom du service affiché dans l'interface utilisateur Datadog.                                                                                                    |

   Configurez le Datadog Agent pour recevoir les traces du processeur externe en utilisant les variables d'environnement suivantes :

   | Variable d'environnement                   | Valeur par défaut | Description                                                                      |
   |----------------------------------------|---------------|----------------------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Nom de host ou adresse IP de votre Datadog Agent.                                            |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | Port du Datadog Agent pour la collecte des traces.                                  |

2. Mettez à jour votre configuration Envoy pour ajouter le [filtre de traitement externe][3] à votre liste `http_filters`, et définissez le cluster gRPC correspondant dans votre section `clusters`. Exemple :

#### Section des filtres HTTP

   ```yaml
   http_filters:
     # This filter should be the first filter in the filter chain
     - name: envoy.filters.http.ext_proc
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
         ## Normally, if the external processor fails or times out, the filter fails and Envoy
         ## returns a 5xx error to the downstream client. Setting this to true allows requests
         ## to continue without error if a failure occurs.
         failure_mode_allow: true # It won't cause 5xx error if an error occurs.

         ## Mandatory: Only enable the request and response header modes.
         ## If you want to enable body processing, please see the section below.
         processing_mode:
           request_header_mode: SEND
           response_header_mode: SEND

         ## Optional for headers analysis only but **mandatory** for body processing.
         ## The external processor can dynamically override the processing mode as needed instructing
         ## Envoy to forward request and response bodies to the external processor. Body processing is
         ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
         allow_mode_override: true

         ## Optional: Set a timeout by processing message. Default is 200ms.
         ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
         ## with body processing enabled.
         ## Note: This timeout also includes the data communication between Envoy and the external processor.
         ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
         ## the additional possible processing time. Larger payloads will require a longer timeout. 
         #message_timeout: 200ms

         ## Optional: Enable asynchronous mode analysis. Default is false.
         ## This mode will disable all blocking capabilities. The external processor should also be
         ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
         ## Beware, there is no flow control implemented in Envoy
         ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
         #observability_mode: true
         ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
         ## timeout starts when the http request is finished, to let the External Processor
         ## process all processing messages. Default is 5s.
         #deferred_close_timeout: 5s

     # ... other filters
   ```

#### Section des clusters

   ```yaml
   clusters:
       # ... other clusters
       - name: datadog_aap_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
             sni: "localhost"
         load_assignment:
           cluster_name: datadog_aap_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: 12.0.0.1 # Replace with the host address of the Datadog External Processor docker image (configured in the next step)
                         port_value: 443
   ```

   **Remarque** : Veuillez lire attentivement l'exemple de configuration fourni et l'adapter à votre infrastructure et à votre environnement. Vous trouverez d'autres options de configuration disponibles dans la [documentation du processeur externe Envoy][4].

3. Validation.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant le Signals Explorer et ses détails, ainsi que le Vulnerabilities Explorer et ses détails." video="true" >}}

## Intégration de Datadog Go Tracer et d'Envoy {#datadog-go-tracer-and-envoy-integration}

Le processeur externe est construit sur le [Datadog Go Tracer][6] et hérite de toutes les variables d'environnement du Datadog Go Tracer. Consultez [Configuration du SDK Go][7] et [Configuration de la bibliothèque de protection des applications et des API][8].

<div class="alert alert-info">
  <strong>Remarque :</strong> Comme le Datadog External Processor est construit sur le Datadog Go Tracer, il suit généralement le même processus de publication que ce dernier, et ses images Docker sont marquées avec la version correspondante du tracer (par exemple, <code>v2.2.2</code>). Dans certains cas, des versions préliminaires peuvent être publiées entre les versions officielles du Datadog Go Tracer, et ces images sont marquées avec un suffixe tel que <code>-docker.1</code>.
</div>

## Limitations {#limitations}

L'intégration Envoy présente les limitations suivantes :

* L'inspection des corps de requête et de réponse est prise en charge lors de l'utilisation de l'image du Datadog External Processor version `v2.2.2` ou ultérieure.

Pour plus de détails sur les compatibilités de l'intégration Envoy, consultez la [page de compatibilité de l'intégration Envoy][9].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/tracing/guide/remote_config
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: /fr/tracing/trace_collection/library_config/go/
[8]: /fr/security/application_security/policies/library_configuration/
[9]: /fr/security/application_security/setup/compatibility/envoy