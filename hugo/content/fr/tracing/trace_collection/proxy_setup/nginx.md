---
aliases:
- /fr/tracing/proxies/nginx
- /fr/tracing/nginx/
- /fr/tracing/setup/nginx/
- /fr/tracing/proxies
- /fr/tracing/setup_overview/nginx/
- /fr/tracing/setup_overview/proxy_setup/
code_lang: nginx
code_lang_weight: 50
further_reading:
- link: https://www.nginx.com/
  tag: Site externe
  text: Site Web de NGINX
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/
  tag: Site externe
  text: OpenTelemetry pour Ingress-NGINX Controller
title: Instrumentation de NGINX
type: multi-code-lang
---
Datadog APM prend en charge NGINX dans les configurations suivantes :
- NGINX utilisé comme proxy avec traçage fourni par le module Datadog.
- NGINX en tant que contrôleur d'entrée pour Kubernetes.
- [OpenResty](#openresty-with-datadog-module), qui est basé sur NGINX, avec traçage fourni par une version spécifique à OpenResty du module Datadog.

## NGINX avec le module Datadog {#nginx-with-datadog-module}
Datadog fournit un module NGINX pour le traçage distribué.

### Installation du module {#module-installation}
Pour installer le module Datadog NGINX, suivez ces instructions :
1. Téléchargez la version appropriée depuis la [dernière publication de nginx-datadog sur GitHub][1]
2. Choisissez l'archive correspondant à la version spécifique de NGINX et à l'architecture CPU.

Chaque version inclut deux archives par combinaison de version NGINX et d'architecture CPU.
L'archive principale contient un seul fichier, `ngx_http_datadog_module.so`, qui est le module Datadog NGINX. Le second contient les symboles de débogage ; il est facultatif.

Par souci de simplicité, le script suivant télécharge uniquement le module pour la dernière version :

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64|arm64)
      echo "arm64"
      ;;
    x86_64|amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

NGINX_VERSION="1.29.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

Extrayez le fichier `ngx_http_datadog_module.so` de l'archive téléchargée en utilisant `tar` et placez-le dans le répertoire des modules NGINX, généralement situé à `/usr/lib/nginx/modules`.

### Configuration NGINX avec le module Datadog {#nginx-configuration-with-datadog-module}
Dans la section supérieure de la configuration NGINX, chargez le module Datadog.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

La configuration par défaut se connecte à un Datadog Agent local et produit des traces
pour toutes les locations NGINX. Spécifiez une configuration personnalisée à l'aide
des directives `datadog_*` décrites dans la [documentation de l'API][4] du module Datadog.

Par exemple, la configuration NGINX suivante définit le nom du service comme
`usage-internal-nginx` et fixe le taux d'échantillonnage à 10 %.

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servers, locations...
}
```

## Ingress-NGINX Controller pour Kubernetes {#ingress-nginx-controller-for-kubernetes}

Datadog prend en charge la surveillance d'Ingress-NGINX Controller dans Kubernetes.
Choisissez parmi les méthodes d'instrumentation suivantes en fonction de votre version de contrôleur et de vos besoins :

- [v1.10.0+ avec les fonctionnalités Datadog](#controller-v1100-using-datadogs-features).
- [v1.10.0+ avec OpenTelemetry](#controller-v1100-using-opentelemetry).
- [v1.9.0 et versions antérieures](#controller-v190-and-older).

### Contrôleur v1.10.0+ utilisant les fonctionnalités de Datadog {#controller-v1100-using-datadogs-features}

Cette méthode d'instrumentation utilise [nginx-datadog][6] et tire parti du mécanisme [init-container][7] de Kubernetes
pour installer le module au sein de l'instance du contrôleur Ingress-NGINX.

Pour instrumenter Ingress-NGINX **v1.10.0+** avec le module Datadog, suivez ces étapes :

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Vérifiez votre version d'Ingress-NGINX**<br>
Vérifiez la version de votre Ingress-NGINX Controller et assurez-vous de disposer de l'init-container Datadog correspondant.
La version de l'init-container ([datadog/ingress-nginx-injection][1]) doit correspondre exactement à la version de votre contrôleur pour éviter tout problème au démarrage.
Par exemple, si vous exécutez Ingress-NGINX v1.11.3, vous avez besoin de [datadog/ingress-nginx-injection:v1.11.3][2].

<div class="alert alert-info">Les rolling tags tels que <code>v1.11.3</code> sont des tags dont la version peut changer. Le module Datadog NGINX sous-jacent peut être mis à jour alors que le tag reste le même. Pour fixer une version exacte, référencez l'image par son digest (par exemple, <code>datadog/ingress-nginx-injection@sha256:...</code>).</div>

**2. Modifiez la spécification de pod de votre contrôleur**<br>
Mettez à jour la spécification de pod du contrôleur pour inclure l'init-container et configurez la variable d'environnement du host du Datadog Agent :


{{< highlight yaml "hl_lines=4-10 13-16 19-22 25-26" >}}
    spec:
      template:
        spec:
          initContainers:
            - name: init-datadog
              image: datadog/ingress-nginx-injection:<MY_INGRESS_NGINX_VERSION>
              command: ['/datadog/init_module.sh', '/opt/datadog-modules']
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
          containers:
            - name: controller
              image: registry.k8s.io/ingress-nginx/controller:<MY_INGRESS_NGINX_VERSION>
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
              env:
                - ...
                - name: DD_AGENT_HOST
                  valueFrom:
                    fieldRef:
                      fieldPath: status.hostIP
          volumes:
            - ...
            - name: nginx-module
              emptyDir: {}
{{< /highlight >}}

**Note** : Pour une autre façon d'accéder au Datadog Agent, consultez le [guide d'installation Kubernetes][1].

**3. Configurez Ingress-NGINX** <br>
Créez ou modifiez le `ConfigMap` pour charger le module Datadog :

{{< highlight yaml "hl_lines=5 7-8" >}}
    kind: ConfigMap
    apiVersion: v1
    ...
    data:
      enable-opentelemetry: "false"
      error-log-level: notice
      main-snippet: |
        load_module /opt/datadog-modules/ngx_http_datadog_module.so;
{{< /highlight >}}

**4. Appliquez la ConfigMap** <br>
Appliquez la `ConfigMap` mise à jour pour vous assurer que le module Datadog est correctement chargé.

Cette configuration garantit que le module Datadog est chargé et prêt à tracer les requêtes entrantes.

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1
{{% /tab %}}

{{% tab "Helm" %}}
**1. Vérifiez votre version d'Ingress-NGINX**<br>
Vérifiez la version de votre Ingress-NGINX Controller et assurez-vous de disposer de l'init-container Datadog correspondant.
La version de l'init-container ([datadog/ingress-nginx-injection][1]) doit correspondre exactement à la version de votre contrôleur pour éviter tout problème au démarrage.
Par exemple, si vous exécutez Ingress-NGINX v1.11.3, vous avez besoin de [datadog/ingress-nginx-injection:v1.11.3][2].

<div class="alert alert-info">Les rolling tags tels que <code>v1.11.3</code> sont des tags dont la version peut changer. Le module Datadog NGINX sous-jacent peut être mis à jour alors que le tag reste le même. Pour fixer une version exacte, référencez l'image par son digest (par exemple, <code>datadog/ingress-nginx-injection@sha256:...</code>).</div>

**2. Remplacement des valeurs du chart Helm**<br>
Pour personnaliser le chart Helm Ingress-NGINX et charger le module Datadog requis, créez un fichier YAML ou modifiez-en un existant avec la configuration suivante :

{{< code-block lang="yaml" filename="values.yaml" >}}
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
  extraEnvs:
    - name: DD_AGENT_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
{{< /code-block >}}

**3. Déployez**<br>
Installez ou mettez à niveau la release Helm en utilisant l'option `-f` pour appliquer les valeurs personnalisées créées à l'étape précédente.

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1

{{% /tab %}}
{{< /tabs >}}

### Contrôleur v1.10.0+ utilisant OpenTelemetry {#controller-v1100-using-opentelemetry}

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Préparez le Datadog Agent** <br>
Assurez-vous que [gRPC OTLP Ingestion est activé][1] sur votre Datadog Agent pour qu'il puisse agir en tant qu'OpenTelemetry Collector.

**2. Configurez le contrôleur Ingress** <br>
Pour commencer, vérifiez que la variable d'environnement `HOST_IP` est définie dans la spécification du pod de votre contrôleur Ingress. Si ce n'est pas le cas, ajoutez l'entrée suivante au bloc `env` dans la spécification du pod :

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

Ensuite, activez l'instrumentation OpenTelemetry pour le contrôleur. Créez ou modifiez une ConfigMap avec les détails suivants :

{{< highlight yaml "hl_lines=7-11" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Defaults
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
{{< /highlight >}}

[1]: /fr/opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Helm" %}}
**1. Préparez le Datadog Agent** <br>
Assurez-vous que [gRPC OTLP Ingestion est activé][1] sur votre Datadog Agent pour qu'il puisse agir en tant qu'OpenTelemetry Collector.

**2. Remplacement des valeurs du chart Helm**<br>
Pour personnaliser le chart Helm Ingress-NGINX et charger le module Datadog requis, créez un fichier YAML ou modifiez-en un existant avec la configuration suivante :

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  opentelemetry:
    enabled: true
  config:
    otel-service-name: "nginx"
    otel-sampler: AlwaysOn
    otel-sampler-ratio: 0.01
  extraEnvs:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317"
{{< /code-block >}}

**3. Déployez**
Installez ou mettez à niveau la release Helm en utilisant l'option `-f` pour appliquer les valeurs personnalisées créées à l'étape précédente.

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: /fr/opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

### Contrôleur v1.9.0 et versions antérieures {#controller-v190-and-older}
Pour activer le traçage Datadog, créez ou modifiez une ConfigMap afin de définir `enable-opentracing: "true"` et le `datadog-collector-host` vers lequel les traces doivent être envoyées.
Le nom de la ConfigMap est cité explicitement par l'argument de ligne de commande du conteneur d'Ingress-NGINX Controller, avec `--configmap=<POD_NAMESPACE>/nginx-configuration` par défaut.
Si `ingress-nginx` a été installé à l'aide d'un chart Helm, le nom de la ConfigMap suivra le modèle `<RELEASE_NAME>-nginx-ingress-controller`.

Le contrôleur Ingress gère à la fois les fichiers `nginx.conf` et `/etc/nginx/opentracing.json`. Le traçage est activé pour tous les blocs `location`.

{{< highlight yaml "hl_lines=6-7 9-15" >}}
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Defaults
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
{{< /highlight >}}

De plus, assurez-vous que la variable d'environnement `HOST_IP` est définie dans la spécification du pod de votre contrôleur. Ajoutez cette entrée au bloc `env:` qui contient les variables d'environnement `POD_NAME` et `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Pour définir un nom de service différent par Ingress à l'aide d'annotations :

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
Ce qui précède remplace le nom de service `nginx-ingress-controller.ingress-nginx` par défaut.

## OpenResty avec le module Datadog {#openresty-with-datadog-module}

OpenResty est basé sur NGINX, et chaque version `nginx-datadog` inclut une compilation distincte du module pour OpenResty.

Pour installer le module Datadog NGINX pour OpenResty :
1. Téléchargez la version appropriée préfixée par `openresty-` depuis la [dernière version GitHub `nginx-datadog`][1].
2. Choisissez l'archive tar qui correspond à votre version d'OpenResty et à votre architecture CPU. Utilisez la version OpenResty en quatre parties de `openresty -v` (par exemple, `1.31.1.1`), et non la version du cœur NGINX sur laquelle elle est basée.
3. Extrayez `ngx_http_datadog_module.so` de l'archive tar et placez-le dans `/usr/local/openresty/nginx/modules`. Créez le répertoire s'il n'existe pas.
4. En haut de `/usr/local/openresty/nginx/conf/nginx.conf`, chargez le module :

    ```nginx
    load_module modules/ngx_http_datadog_module.so;
    ```

Les directives `datadog_*` décrites dans la [documentation de l'API][4] du module et les variables d'environnement `DD_*` fonctionnent de la même manière dans OpenResty que dans NGINX.

## Corrélation des traces avec les logs {#correlating-traces-to-logs}

Une fois le traçage APM activé, vous pouvez connecter vos traces aux logs NGINX correspondants. Cette corrélation lie chaque trace et chaque span aux événements de log spécifiques générés pendant cette requête, vous permettant de basculer entre eux pour résoudre les problèmes.

### Prérequis {#prerequisites}

Avant de commencer, assurez-vous d'avoir effectué les opérations suivantes :
- Activé le traçage APM pour NGINX en suivant les étapes décrites plus haut dans ce guide.
- Configuré la collecte des logs NGINX dans Datadog.

### Étape 1 : injectez les ID de trace et de span dans les logs NGINX {#step-1-inject-trace-and-span-ids-into-nginx-logs}

Modifiez votre directive `log_format` pour inclure l'ID de trace et l'ID de span. Les variables que vous utilisez dépendent de votre méthode d'instrumentation. Sélectionnez l'onglet approprié ci-dessous pour obtenir les instructions correspondant à votre configuration.

{{< tabs >}}
{{% tab "Datadog NGINX Module" %}}

Si vous avez installé le [module Datadog NGINX][100], utilisez les variables `$datadog_trace_id` et `$datadog_span_id`. Cette valeur est `-` pour les requêtes qui ne sont pas tracées.

Mettez à jour votre fichier de configuration NGINX (par exemple, `/etc/nginx/nginx.conf`) :

```nginx
http {
  log_format main_datadog '$remote_addr - $remote_user [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for" '
                         'dd.trace_id="$datadog_trace_id"' 'dd.span_id="$datadog_span_id"';

  access_log /var/log/nginx/access.log main_datadog;
}
```
[100]: https://github.com/DataDog/nginx-datadog/releases/latest

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

Si vous utilisez le [module NGINX OpenTelemetry][100], utilisez les variables `$otel_trace_id` et `$otel_span_id`. Cette valeur est une chaîne vide pour les requêtes qui ne sont pas tracées.

Mettez à jour votre fichier de configuration NGINX (par exemple, `/etc/nginx/nginx.conf`) :

```nginx
http {
  log_format main_opentelemetry '$remote_addr - $remote_user [$time_local] "$request" '
                               '$status $body_bytes_sent "$http_referer" '
                               '"$http_user_agent" "$http_x_forwarded_for" '
                               'dd.trace_id="$otel_trace_id"' 'dd.span_id="$otel_span_id"' ;

  access_log /var/log/nginx/access.log main_opentelemetry;
}
```
[100]: https://nginx.org/en/docs/ngx_otel_module.html
{{% /tab %}}
{{< /tabs >}}

Après avoir enregistré vos modifications, rechargez la configuration NGINX. Par exemple :

```sh
sudo nginx -s reload
```

### Étape 2 : Configurez le pipeline de logs pour analyser les ID de trace et de span {#step-2-configure-the-log-pipeline-to-parse-the-trace-and-span-ids}

Par défaut, les logs capturent `dd.trace_id` et `dd.span_id` au format hexadécimal :

```
10.244.0.1 - - [12/Sep/2025:22:41:03 +0000] "GET /health HTTP/1.1" 200 87 0.002 "-" "kube-probe/1.32" "-" dd.trace_id="68c4a17f000000009aed12af2ccb1ead" dd.span_id="9aed12af2ccb1ead"
```

Pour activer la corrélation entre les logs et les traces dans Datadog, configurez un pipeline de traitement de logs pour convertir ces ID de l'hexadécimal au décimal. Suivez les mêmes étapes quelle que soit la méthode d'instrumentation que vous utilisez.

1. Dans Datadog, accédez à la page [{{< ui >}}Log Configuration{{< /ui >}}][9].
2. Survolez votre pipeline NGINX actif et cliquez sur l'icône {{< ui >}}Clone{{< /ui >}} pour créer une version modifiable.
3. Cliquez sur le pipeline cloné.
4. Cliquez sur {{< ui >}}Add Processor{{< /ui >}}.
5. Sélectionnez [Grok Parser][11] comme type de processeur.
6. Définissez la règle de parsing suivante pour extraire l'attribut d'ID de trace d'un événement de log. Cette règle fonctionne à la fois pour le module Datadog et pour les sorties OpenTelemetry :
   ```text
   extract_correlation_ids %{data} dd.trace_id="%{notSpace:dd.trace_id:nullIf("-")}" dd.span_id="%{notSpace:dd.span_id:nullIf("-")}"
   ```
7. Cliquez sur {{< ui >}}Create{{< /ui >}}.
8. Cliquez à nouveau sur {{< ui >}}Add Processor{{< /ui >}}.
9. Sélectionnez [Trace ID Remapper][10] comme type de processeur. Ce processeur associe l'ID analysé à sa trace APM correspondante.
10. Dans le champ {{< ui >}}Set trace id attribute(s){{< /ui >}}, saisissez `dd.trace_id`.
11. Cliquez sur {{< ui >}}Create{{< /ui >}}.
12. Cliquez à nouveau sur {{< ui >}}Add Processor{{< /ui >}}.
13. Sélectionnez [Span ID Remapper][12] comme type de processeur. Ce processeur associe l'ID analysé à son span APM correspondant.
14. Dans le champ {{< ui >}}Set span id attribute(s){{< /ui >}}, saisissez `dd.span_id`.
15. Cliquez sur {{< ui >}}Create{{< /ui >}}.
16. Enregistrez et activez votre nouveau pipeline.

Une fois le pipeline actif, les nouveaux logs NGINX sont automatiquement corrélés avec leurs traces et leurs spans.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[6]: https://github.com/DataDog/nginx-datadog/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
[8]: /fr/logs/guide/ease-troubleshooting-with-cross-product-correlation
[9]: https://app.datadoghq.com/logs/pipelines
[10]: /fr/logs/log_configuration/processors/trace_remapper/
[11]: /fr/logs/log_configuration/processors/grok_parser/
[12]: /fr/logs/log_configuration/processors/span_remapper/