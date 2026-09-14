---
aliases:
- /fr/security/application_security/threats/setup/threat_detection/gateway_api
- /fr/security/application_security/threats_detection/gateway_api
- /fr/security/application_security/setup/gateway-api
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/k8s.io/gateway-api
  tag: Code source
  text: Code source de l'intégration de Gateway API.
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Activation de l'AAP pour Gateway API dans Kubernetes
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

<div class="alert alert-danger">
  L'AAP pour Gateway API est expérimental. Veuillez suivre les instructions ci-dessous pour l'essayer.
</div>

## Présentation {#overview}

Le **Datadog AppSec Gateway API Request Mirror** améliore la sécurité des applications en tirant parti de la fonctionnalité **RequestMirror** dans les Kubernetes Gateway APIs pour dupliquer le trafic vers un endpoint Datadog App & API Protection. Cela permet la détection et l'analyse en temps réel des attaques potentielles au niveau de l'application, la découverte des endpoints d'API, et plus encore, le tout sans impacter le flux de requêtes principal.

## Prérequis {#prerequisites}

- Un cluster Kubernetes avec [les CRDs Gateway API installés][9].
- Un [contrôleur compatible avec le filtre RequestMirror de Gateway API][10].
- [Go][11] 1.23+ installé sur votre machine locale.

## Activation de la détection des menaces {#enabling-threat-detection}

### Installation {#installation}

1. **Déployez l'Agent Datadog** dans votre cluster Kubernetes en suivant le [guide d'installation Kubernetes][12].

2. **Configurez l'Agent Datadog** pour [prendre en charge les charges utiles AppSec entrantes][13] en utilisant l'APM comme transport.

3. **Déployez l'AppSec Gateway API Request Mirror** dans l'espace de nom de votre choix (par ex. `datadog`) ainsi que son service :

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/DataDog/dd-trace-go/refs/heads/main/contrib/k8s.io/gateway-api/cmd/request-mirror/deployment.yml
   ```

4. **Vérifiez le déploiement** :

   ```bash
   kubectl get pods -l app=request-mirror
   ```

5. **Appliquez un correctif à vos ressources Gateway** pour autoriser l'accès à l'espace de nom avec le déploiement :

   ```bash
   git clone https://github.com/DataDog/dd-trace-go.git
   cd dd-trace-go
   go run ./contrib/k8s.io/gateway-api/cmd/patch-gateways
   ```

   Utilisez l'indicateur `-help` pour voir les options de personnalisation du comportement de correction.

6. **Appliquez un correctif à vos ressources HTTPRoute** pour rediriger le trafic vers le service :

   ```bash
   go run ./contrib/k8s.io/gateway-api/cmd/patch-httproutes
   ```

   Cette commande ajoute un filtre [RequestMirror][14] à toutes les ressources `HTTPRoute` dans tous les espaces de nom. Utilisez l'indicateur `-help` pour les options de configuration.

   **Remarque** : L'exécution régulière de cette commande garantit que toutes les ressources `HTTPRoute` nouvellement créées incluent automatiquement le filtre `RequestMirror`. Envisagez d'ajouter le correctif résultant à votre pipeline CI/CD où les ressources `HTTPRoute` sont modifiées.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant l'explorateur de signaux et ses détails, ainsi que l'explorateur de vulnérabilités et ses détails." video="true" >}}

## Configuration {#configuration}

### Variables d'environnement {#environment-variables}

Le déploiement du Request Mirror de Gateway API peut être configuré à l'aide des variables d'environnement suivantes :

| Variable d'environnement                 | Valeur par défaut | Description                                                                                                                |
|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `DD_REQUEST_MIRROR_LISTEN_ADDR`      | `:8080`       | Adresse et port où le service de mise en miroir des requêtes écoute les requêtes mises en miroir entrantes                                   |
| `DD_REQUEST_MIRROR_HEALTHCHECK_ADDR` | `:8081`       | Adresse et port où le endpoint de vérification de l'état est servi                                                                 |

Configurez l'Agent Datadog pour recevoir les traces de l'intégration en utilisant les variables d'environnement suivantes :

| Variable d'environnement                   | Valeur par défaut | Description                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nom de host où votre Agent Datadog est en cours d'exécution                          |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port de l'Agent Datadog pour la collecte des traces                        |

### Exemple de déploiement {#deployment-example}

Le déploiement par défaut crée un service qui écoute sur le port 8080 pour les requêtes mises en miroir et expose un endpoint de vérification de l'état sur le port 8081 :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: request-mirror
  labels:
    app.kubernetes.io/component: request-mirror
    app.kubernetes.io/name: datadog
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: request-mirror
  template:
    metadata:
      labels:
        app: request-mirror
    spec:
      containers:
        - name: request-mirror
          image: ghcr.io/datadog/dd-trace-go/request-mirror:latest
          ports:
            - containerPort: 8080
              name: http
          livenessProbe:
            httpGet:
              path: /
              port: 8081
          readinessProbe:
            httpGet:
              path: /
              port: 8081
          env:
            - name: DD_AGENT_HOST
              value: "datadog-agent"  # Adjust to your Agent service name
---
apiVersion: v1
kind: Service
metadata:
  name: request-mirror
spec:
  selector:
    app: request-mirror
  ports:
    - name: http
      port: 8080
      targetPort: 8080
```

## Intégration Datadog Go Tracer et Gateway API {#datadog-go-tracer-and-gateway-api-integration}

<div class="alert alert-info">
  L'intégration AAP Gateway API est construite sur le Datadog Go Tracer. Elle suit le même processus de publication que le tracer, et ses images Docker sont marquées avec la version correspondante du tracer.
</div>

L'intégration Gateway API utilise le [Datadog Go Tracer][6] et hérite de toutes les variables d'environnement du tracer. Vous trouverez plus d'informations dans [Configuration du SDK Go][7] et [Configuration de la bibliothèque AAP][8].

## Activation du traçage APM {#enabling-apm-tracing}

Par défaut, les traces de miroir de requête n'activeront pas le produit APM de Datadog. Si vous souhaitez utiliser la protection des applications et des API sans la fonctionnalité de traçage APM, il s'agit du comportement par défaut. 

Pour activer le traçage APM, définissez la variable d'environnement `DD_APM_TRACING_ENABLED=true` dans le déploiement du miroir de requête.

Si vous souhaitez désactiver explicitement le traçage APM tout en utilisant la protection des applications et des API :

1. Configurez votre déploiement avec la variable d'environnement `DD_APM_TRACING_ENABLED=false` en plus de la variable d'environnement `DD_APPSEC_ENABLED=true`.
2. Cette configuration réduira la quantité de données APM envoyées à Datadog au minimum requis par les produits App and API Protection.

Pour plus de détails, consultez [Protection autonome des applications et des API][15].

## Limitations {#limitations}

L'intégration de Gateway API présente les limitations suivantes :

- Il ne peut pas accéder aux réponses HTTP
- Aucun blocage de requête ne peut être appliqué
- Seul le format JSON est pris en charge pour l'analyse des corps de requête HTTP.

Pour une analyse plus fine et d'autres fonctionnalités AAP, envisagez d'essayer d'autres intégrations AAP.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/dd-trace-go
[7]: /fr/tracing/trace_collection/library_config/go/
[8]: /fr/security/application_security/policies/library_configuration/
[9]: https://gateway-api.sigs.k8s.io/guides/#installing-gateway-api
[10]: https://gateway-api.sigs.k8s.io/implementations
[11]: https://go.dev/doc/install
[12]: /fr/containers/kubernetes/installation/
[13]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service/
[14]: https://gateway-api.sigs.k8s.io/guides/http-request-mirroring/
[15]: /fr/security/application_security/setup/standalone/