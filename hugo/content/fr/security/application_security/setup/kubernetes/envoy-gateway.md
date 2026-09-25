---
aliases:
- /fr/security/application_security/setup/envoy-gateway
code_lang: envoy-gateway
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
title: Activation de la protection des applications et des API pour Envoy Gateway
---
Vous pouvez activer [App and API Protection][12] de Datadog pour le trafic géré par [Envoy Gateway][1] afin d'inspecter et de protéger le trafic à la périphérie de votre infrastructure.

## Prérequis {#prerequisites}

- Un cluster Kubernetes en cours d'exécution avec [Envoy Gateway][1] installé.
- Le [Datadog Agent est installé et configuré][2] dans votre cluster Kubernetes.
  - Activez et configurez [Remote Configuration][3] pour permettre le blocage des attaquants via l'interface utilisateur Datadog.
  - Activez [APM][4] dans l'Agent pour permettre au service de processeur de sécurité d'envoyer ses propres traces à l'Agent.
    - Optionnellement, activez le [Cluster Agent Admission Controller][5] pour injecter automatiquement les informations de host du Datadog Agent dans le service du processeur de sécurité App and API Protection.

## Configuration automatisée avec App and API Protection pour Kubernetes {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  La configuration automatisée gère le déploiement du processeur de sécurité et la <code>EnvoyExtensionPolicy</code> création. C'est l'approche recommandée pour la plupart des utilisateurs.
</div>

### Configuration {#setup}

1. **Déployez le processeur de sécurité** en utilisant le manifeste de déploiement indiqué dans [Déployez le service de processeur de sécurité Datadog](#step-1-deploy-the-datadog-security-processor-service) ci-dessous.
2. **Activez la configuration automatique** en utilisant le Datadog Operator ou Helm.

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   Ajoutez des annotations à votre ressource `DatadogAgent`. L'annotation du nom de service est requise et doit correspondre à votre service de processeur de sécurité :

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/appsec.injector.enabled: "true"
       agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required
       agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
   spec:
     override:
       clusterAgent:
         env:
           - name: DD_CLUSTER_AGENT_APPSEC_INJECTOR_MODE
             value: "external"
   ```

   Appliquez la configuration :

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

   {{% /tab %}}
   {{% tab "Helm" %}}

   Ajoutez ce qui suit à votre `values.yaml` :

   ```yaml
   datadog:
     appsec:
       injector:
         enabled: true
         mode: "external"
         processor:
           service:
             name: datadog-aap-extproc-service  # Required: must match your security processor service name
             namespace: datadog                 # Must match the namespace where the service is deployed
   ```

   Installez ou mettez à niveau le chart Helm Datadog :

   ```bash
   helm upgrade -i datadog-agent datadog/datadog -f values.yaml
   ```

   {{% /tab %}}
   {{< /tabs >}}

   Une fois cette option activée, le Datadog Cluster Agent :
   - Détecte vos installations Envoy Gateway
   - Crée des ressources `EnvoyExtensionPolicy` pour chaque Gateway
   - Configure les politiques pour acheminer le trafic vers le processeur de sécurité
3. **Vérifiez** la configuration en recherchant les politiques créées :
   ```bash
   kubectl get envoyextensionpolicy -A
   ```

Pour les options de configuration et le dépannage, consultez [App and API Protection for Kubernetes][13].

## Configuration manuelle (alternative) {#manual-configuration-alternative}

Pour un contrôle précis sur des passerelles spécifiques, utilisez la configuration manuelle :

1. Déployez le service du processeur Datadog Security dans votre cluster.
2. Configurez un `EnvoyExtensionPolicy` qui pointe vers celui-ci.

### Étape 1 : Déployez le service du processeur de sécurité Datadog {#step-1-deploy-the-datadog-security-processor-service}

Ce serveur gRPC reçoit les requêtes et les réponses d'Envoy pour l'analyse App and API Protection.

Déployez-le dans un espace de noms accessible par votre passerelle Envoy. L'image Docker se trouve sur le [registre GitHub du traceur Go de Datadog][6].

Exemple de manifeste (`datadog-aap-extproc-service.yaml`) :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the security processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # Optional: Agent Configuration
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the security processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        # Disable TLS for communication between Envoy Gateway and the security processor. Default is true.
        # Cannot be enabled for now
        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"

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
  name: datadog-aap-extproc-service # This name will be used in the EnvoyExtensionPolicy configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
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

Le processeur Datadog Security expose certains paramètres :

| Variable d'environnement                      | Valeur par défaut       | Description                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Adresse d'écoute du serveur gRPC.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | Port du serveur gRPC.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Port du serveur HTTP pour les checks de santé.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS`                | `true`          | Activez la couche TLS gRPC.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS_KEY_FILE`       | `localhost.key` | Modifiez la clé par défaut de la couche TLS gRPC.                                                                           |
| `DD_SERVICE_EXTENSION_TLS_CERT_FILE`      | `localhost.crt` | Modifiez le certificat par défaut de la couche TLS gRPC.                                                                           |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `10485760`                 | Taille maximale des corps à traiter en octets. S'il est défini sur `0`, les corps ne sont pas traités. La valeur recommandée est `10485760` (10 Mo). (Pour activer complètement le traitement du corps, l'option `allowModeOverride` doit également être définie dans la configuration du filtre de traitement externe.) |
| `DD_SERVICE`                              | `serviceextensions` | Nom du service affiché dans l'interface utilisateur Datadog.                                                                                                    |


Configurez la connexion du processeur de sécurité au Datadog Agent en utilisant ces variables d'environnement :

| Variable d'environnement                   | Valeur par défaut | Description                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nom de host ou adresse IP de votre Datadog Agent.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port du Datadog Agent pour la collecte des traces.                                  |

Le processeur de sécurité est construit sur le [Datadog Go Tracer][7] et hérite de toutes ses variables d'environnement. Consultez [Configuring the Go SDK][8] et [App and API Protection Library Configuration][9].

<div class="alert alert-info">
  Comme le processeur de sécurité Datadog est construit sur le traceur Datadog Go, il suit généralement le même processus de publication que le traceur, et ses images Docker sont marquées avec la version correspondante du traceur (par exemple, <code>v2.2.2</code>). Dans certains cas, des versions préliminaires peuvent être publiées entre les versions officielles du Datadog Go Tracer, et ces images sont marquées avec un suffixe tel que <code>-docker.1</code>.
</div>

### Étape 2 : Configurez une EnvoyExtensionPolicy {#step-2-configure-an-envoyextensionpolicy}

Utilisez une `EnvoyExtensionPolicy` pour indiquer à Envoy Gateway d'appeler le processeur de sécurité Datadog. Vous pouvez attacher la politique à une passerelle ou à des ressources HTTPRoute/GRPCRoute spécifiques.

Cela envoie tout le trafic sur la passerelle sélectionnée vers le processeur de sécurité. Exemple de manifeste (`datadog-aap-extproc-eep.yaml`) :

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyExtensionPolicy
metadata:
  name: datadog-aap-extproc-eep
  namespace: <your-preferred-namespace> # same namespace as the Gateway
spec:
  targetRefs:
  # Target the entire Gateway
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: <your-gateway-name> # update to your specific gateway name
  # Target specific HTTPRoutes/GRPCRoutes
  #- group: gateway.networking.k8s.io
  #  kind: HTTPRoute
  #  name: <your-http-route-name>
  extProc:
  - backendRefs:
    - group: ""
      kind: Service
      name: datadog-aap-extproc-service
      namespace: <your-preferred-namespace> # namespace of the security processor Service
      port: 443

    # Optional: Enable fail open mode. Default is false.
    # Normally, if the security processor fails or times out, the filter fails and Envoy
    # returns a 5xx error to the downstream client. Setting this to true allows requests
    # to continue without error if a failure occurs.
    failOpen: true

    # Optional: Set a timeout by processing message. Default is 200ms.
    # There is a maxium of 2 messages per requests with headers only and 4 messages maximum
    # with body processing enabled.
    # Note: This timeout also includes the data communication between Envoy and the security processor.
    # The timeout should be adjusted to accommodate the additional possible processing time.
    # Larger payloads will require a longer timeout.
    messageTimeout: 200ms

    processingMode:
      # The security processor can dynamically override the processing mode as needed, instructing
      # Envoy to forward request and response bodies to the security processor.
      allowModeOverride: true
      # Only enable the request and response header modes by default.
      request: {}
      response: {}
```

#### Référence inter-espaces de noms {#crossnamespace-reference}

Si votre processeur de sécurité `Service` se trouve dans un **espace de noms différent** de la politique, ajoutez un [ReferenceGrant][10] dans l'espace de noms du processeur. Par exemple, vous pouvez le faire avec un manifeste tel que `datadog-aap-eep-rg.yaml`.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: datadog-aap-eep-rg
  namespace: <your-extproc-namespace>   # namespace of the security processor Service
spec:
  from:
  - group: gateway.envoyproxy.io
    kind: EnvoyExtensionPolicy
    namespace: <your-policy-namespace>  # namespace of the EnvoyExtensionPolicy (and the Gateway)
  to:
  - group: ""
    kind: Service
    name: datadog-aap-extproc-service
```

### Étape 3 : Validez {#step-3-validate}

Après avoir appliqué la politique, le trafic passant par la passerelle/les routes ciblées est inspecté par App and API Protection.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant le Signals Explorer et ses détails, ainsi que le Vulnerabilities Explorer et ses détails." video="true" >}}

## Limitations {#limitations}

Le mode d'observabilité (analyse asynchrone) n'est pas disponible pour Envoy Gateway.

Pour plus de détails sur les compatibilités de l'intégration Envoy Gateway, consultez la [page de compatibilité de l'intégration Envoy Gateway][11].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gateway.envoyproxy.io/docs/
[2]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[3]: /fr/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /fr/tracing/trace_collection/library_config/go/
[9]: /fr/security/application_security/policies/library_configuration/
[10]: https://gateway-api.sigs.k8s.io/api-types/referencegrant/
[11]: /fr/security/application_security/setup/compatibility/envoy-gateway
[12]: /fr/security/application_security/
[13]: /fr/containers/kubernetes/appsec