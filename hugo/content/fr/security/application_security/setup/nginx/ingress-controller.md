---
aliases:
- /fr/security/application_security/setup/nginx/kubernetes/
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Configurez App and API Protection pour Nginx dans Kubernetes
type: multi-code-lang
---
{{< partial name="app_and_api_protection/callout.html" >}}

# Prise en charge d'Ingress-nginx pour Datadog {#ingress-nginx-support-for-datadog}

[Ingress-nginx][1] est un [contrôleur d'entrée Kubernetes][2]
qui utilise NGINX comme proxy inverse et équilibreur de charge. Dans un cluster Kubernetes, l'accès externe est restreint par défaut pour des raisons de sécurité.
Un contrôleur d'entrée utilise des règles pour contrôler la façon dont le trafic externe peut atteindre vos services.

Vous pouvez activer [App and API Protection][10] pour votre contrôleur ingress-nginx afin d'inspecter et de protéger le trafic à la périphérie de votre cluster. Datadog prend en charge deux méthodes de configuration :

- **Configuration automatique** (recommandée) : le Datadog Cluster Agent injecte le module `nginx-datadog` dans vos pods de contrôleur ingress-nginx.
- **Configuration manuelle** : vous ajoutez vous-même un init container Datadog et des extraits de configuration NGINX.

## Configuration automatisée avec App and API Protection pour Kubernetes {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  La configuration automatique permet au Datadog Cluster Agent d'injecter le <code>nginx-datadog</code> module dans vos pods de contrôleur ingress-nginx, sans ajout manuel d'init container ni modification des extraits de configuration NGINX. C'est l'approche recommandée pour la plupart des utilisateurs.
</div>

### Configuration {#setup}

Cette configuration nécessite :

- Le Datadog Cluster Agent `v7.79.0` ou version ultérieure.
- Pour la méthode Helm, le chart Helm Datadog `v3.217.0` ou version ultérieure.
- Pour la méthode Datadog Operator, Datadog Operator `v1.31.0` ou version ultérieure.

Activez la configuration automatique à l'aide de Datadog Operator ou de Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Configurez l'injecteur dans la section `spec.features.appsec.injector` de votre ressource `DatadogAgent` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    appsec:
      injector:
        enabled: true
        # Optional: override the path where the nginx-datadog module is mounted
        # in the controller pod (default: /modules_mount)
        # nginx:
        #   moduleMountPath: /modules_mount
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
      # Optional: override the path where the nginx-datadog module is mounted
      # in the controller pod (default: /modules_mount)
      # nginx:
      #   moduleMountPath: "/modules_mount"
```

Installez ou mettez à niveau le chart Helm Datadog (`v3.217.0` ou version ultérieure) :

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

Une fois la configuration automatique activée, le Datadog Cluster Agent :

- Détecte vos pods de contrôleur ingress-nginx
- Injecte le module `nginx-datadog` dans le contrôleur
- Configure le contrôleur pour charger le module et appliquer App and API Protection

Vous pouvez activer ou désactiver App and API Protection via [Remote Configuration][8] sans modifier cette configuration.

Pour les options de configuration, consultez [App and API Protection pour Kubernetes][9].

### Validez {#validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vidéo montrant le Signals Explorer et ses détails, ainsi que le Vulnerabilities Explorer et ses détails." video="true" >}}

## Configuration manuelle (alternative) {#manual-configuration-alternative}

Le contrôleur ingress-nginx est géré via des [ressources Kubernetes][3],
mais les possibilités de personnaliser la configuration NGINX sous-jacente sont généralement limitées en dehors de son cas d'utilisation prévu. Cependant, ingress-nginx permet
l'ajout de modules NGINX supplémentaires pour étendre ses fonctionnalités. Pour profiter de cette fonctionnalité avec `nginx-datadog`, Datadog fournit des **init containers**.

### Comment activer `nginx-datadog` dans ingress-nginx ? {#how-to-enable-nginx-datadog-in-ingress-nginx}
Pour intégrer `nginx-datadog` à ingress-nginx, ajoutez un [init container][4] Datadog à la spécification
de votre pod et configurez NGINX pour charger le module `nginx-datadog`.

Les valeurs Helm suivantes montrent comment injecter le module `nginx-datadog` dans un contrôleur ingress-nginx :

```yaml
controller:
  config: 
    main-snippet: "load_module /modules_mount/ngx_http_datadog_module.so;"
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        # The tag should match the version of the ingress-nginx controller
        # For example, this will inject the Datadog module for ingress v1.10.0
        # Check <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags> 
        # for the list of all versions supported.
        tag: "v1.10.0"
        distroless: false
```

Consultez les [exemples détaillés][5] pour vous aider à configurer ingress-nginx avec `nginx-datadog`.

### Comment cela fonctionne-t-il ? {#how-does-it-work}
Les init containers sont des conteneurs spéciaux qui s'exécutent avant le conteneur principal dans un pod Kubernetes. Dans ce cas,
l'init container Datadog est chargé de copier le module `nginx-datadog` dans un volume partagé auquel le
conteneur principal ingress-nginx peut accéder.

Lorsque le contrôleur principal ingress-nginx démarre, la configuration NGINX doit être mise à jour avec la directive `load_module`,
lui permettant de charger le module Datadog.

<div class="alert alert-danger">
Datadog fournit un init container spécifique <b>pour chaque version du contrôleur ingress-nginx</b>, à partir de <code>v1.10.0</code>. C'est essentiel, car <b>chaque</b> init container doit correspondre à la version NGINX sous-jacente. Pour confirmer la compatibilité, vérifiez que la version de l'init container Datadog correspond à votre version d'ingress-nginx.
</div>

### Interaction avec OpenTelemetry {#interaction-with-opentelemetry}
Par défaut, ingress-nginx inclut un module OpenTelemetry (oTel) qui peut être activé à l'aide du paramètre `enable-opentelemetry: true`
dans la [ConfigMap ingress-nginx][6].
Cependant, si vous utilisez `nginx-datadog` pour le traçage, Datadog recommande de **désactiver** OpenTelemetry pour éviter les données de traçage en double provenant à la fois
des modules oTel et Datadog.

Pour désactiver OpenTelemetry, définissez `enable-opentelemetry: false`.

### Activation d'AppSec {#enabling-appsec}

Vous pouvez activer le WAF fourni par AppSec pour protéger vos applications contre les menaces de sécurité. Pour ce faire, mettez à jour vos valeurs Helm pour inclure la configuration AppSec :

```yaml
controller:
  config:
    main-snippet: |
      load_module /modules_mount/ngx_http_datadog_module.so;
      # AppSec thread pool configuration (adjust threads and max_queue as needed)
      thread_pool waf_thread_pool threads=2 max_queue=16;
    http-snippet: |
      # Enable AppSec
      datadog_appsec_enabled on;
      datadog_waf_thread_pool_name waf_thread_pool;
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        tag: "v1.10.0"
        distroless: false
```

**Paramètres de configuration clés :**
- `thread_pool waf_thread_pool` : Crée un pool de threads dédié pour le traitement AppSec. Ajustez `threads` et `max_queue` en fonction des caractéristiques de votre trafic et des ressources disponibles.
- `datadog_appsec_enabled on` : Active le module Application Security pour la détection et la protection contre les menaces. Ce paramètre peut être omis afin qu'AppSec puisse être activé ou désactivé via Remote Configuration.
- `datadog_waf_thread_pool_name waf_thread_pool` : Associe les requêtes correspondantes au pool de threads configuré.

Consultez la [référence de configuration][7] pour plus d'options configurables.

<div class="alert alert-info">
Pour les environnements de production, surveillez les performances du pool de threads et ajustez les <code>threads</code> et <code>max_queue</code> paramètres en fonction de votre volume de trafic et de vos exigences de latence.
</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
[7]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[8]: /fr/agent/remote_config/?tab=helm#enabling-remote-configuration
[9]: /fr/containers/kubernetes/appsec
[10]: /fr/security/application_security/