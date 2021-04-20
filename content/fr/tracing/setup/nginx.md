---
title: NGINX
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.nginx.com/'
    tag: Documentation
    text: Site Web NGINX
  - link: 'https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/'
    tag: Documentation
    text: NGINX Ingress Controller OpenTracing
  - link: 'https://github.com/opentracing-contrib/nginx-opentracing'
    tag: Code source
    text: Plug-in NGINX pour OpenTracing
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: Code source
    text: Client C++ OpenTracing Datadog
aliases:
  - /fr/tracing/proxies/nginx
  - /fr/tracing/nginx/
---
L'APM Datadog peut prendre en charge NGINX en utilisant une combinaison de plug-ins et de configurations.
Les instructions ci-dessous utilisent le paquet NGINX disponible dans les [référentiels Linux][1] officiels et des binaires pré-compilés pour les plug-ins.

## Version open source de NGINX

### Installation des plug-ins

**Remarque** : ce plug-in ne fonctionne pas sur les distributions Linux qui utilisent des versions antérieures de `libstdc++`, notamment RHEL/Centos 7 et AmazonLinux 1.
Une solution consiste à exécuter NGINX à partir d'un conteneur Docker. Un exemple de Dockerfile est disponible [ici][2].

Les plug-ins suivants doivent être installés :

- Plug-in NGINX pour OpenTracing - [linux-amd64-nginx-${VERSION_NGINX}-ot16-ngx_http_module.so.tgz][3] : installé dans `/usr/lib/nginx/modules`
- Plug-in Datadog OpenTracing C++ - [linux-amd64-libdd_opentracing_plugin.so.gz][4] : installé à un emplacement accessible pour NGINX, p. ex. `/usr/local/lib`

Commandes pour télécharger et installer ces modules :

```bash
# Récupérer le dernier numéro de version depuis Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.17.3
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Installer le plug-in NGINX pour OpenTracing
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Installer le plug-in C++ Datadog pour Opentracing
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

### Configuration de NGINX

La configuration de NGINX doit charger le module OpenTracing.

```nginx
# Charger le module OpenTracing
load_module modules/ngx_http_opentracing_module.so;
```

Le bloc `http` active le module OpenTracing et charge le traceur Datadog :

```nginx
    opentracing on; # Activer OpenTracing.
    opentracing_tag http_user_agent $http_user_agent; # Ajouter un tag à chaque trace.
    opentracing_trace_locations off; # Émettre une seule span par requête.

    # Charger l'implémentation de tracing Datadog et le fichier de configuration donné.
    opentracing_load_tracer /usr/local/lib/libdd_opentracing_plugin.so /etc/dd-config.json;
```

Ajoutez les lignes suivantes au bloc `location` dans le serveur où vous souhaitez effectuer le tracing :

```nginx
            opentracing_operation_name "$request_method $uri";
            opentracing_propagate_context;
```

Un fichier de configuration pour l'implémentation du tracing Datadog est également requis :

```json
{
  "environment": "prod",
  "service": "nginx",
  "operation_name_override": "nginx.handle",
  "agent_host": "localhost",
  "agent_port": 8126
}
```

La valeur `service` peut être modifiée afin d'être adaptée à votre utilisation de NGINX.
Il est possible que vous soyez contraint de modifier la valeur `agent_host` si NGINX s'exécute dans un conteneur ou un environnement orchestré.

Exemples complets :

* [nginx.conf][5]
* [dd-config.json][6]

Une fois cette configuration terminée, les requêtes HTTP transmises à NGINX initieront et propageront les traces Datadog, qui s'afficheront dans l'interface graphique de l'APM.

#### NGINX et FastCGI

Lorsque l'emplacement dessert un backend FastCGI au lieu de HTTP, le bloc `location` doit utiliser `opentracing_fastcgi_propagate_context` au lieu de `opentracing_propagate_context`.

## NGINX Ingress Controller pour Kubernetes

Les versions 0.23.0 et ultérieures du contrôleur [Kubernetes ingress-nginx][7] incluent le plug-in NGINX pour OpenTracing.

Pour activer ce plug-in, créez ou modifiez une ConfigMap en définissant `enable-opentracing: "true"` et `datadog-collector-host`, à savoir l'emplacement où les traces doivent être envoyées.
Le nom de la ConfigMap sera cité explicitement par l'argument de ligne de commande du conteneur du contrôleur nginx-ingress. Par défaut, sa valeur est `--configmap=$(POD_NAMESPACE)/nginx-configuration`.
Si ingress-nginx a été installé avec une chart helm, le nom de cette ConfigMap suivra le modèle suivant : `Nom-Version-nginx-ingress-controller`.

Le contrôleur Ingress gère les fichiers `nginx.conf` et `/etc/nginx/opentracing.json`. Le tracing est activé pour tous les blocs `location`.

```yaml
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
  # Valeurs par défaut
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
```

En outre, vérifiez que les spécifications de pod de votre contrôleur nginx-ingress définissent la variable d'environnement `HOST_IP`. Ajoutez cette entrée au bloc `env:` qui contient les variables d'environnement `POD_NAME` et `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Pour définir un nom de service différent selon le contrôleur Ingress à l'aide d'annotations :

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
Ce qui précède remplace le nom de service par défaut `nginx-ingress-controller.ingress-nginx`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: https://github.com/kubernetes/ingress-nginx
