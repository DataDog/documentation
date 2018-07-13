---
categories:
- web
- log collection
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/nginx/
git_integration_title: nginx
guid: 88620208-3919-457c-ba51-d844d09ac97f
has_logo: true
integration_title: Nginx
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: nginx
public_title: Intégration Datadog-Nginx
short_description: Surveillez les métriques concernant les connexions et les requêtes. Obtenez davantage de métriques grâce à NGINX.
  Plus.
support: core
supported_os:
- linux
- mac_os
- windows
---


{{< img src="integrations/nginx/nginx.jpg" alt="NGINX default dashboard" responsive="true" >}}

## Aperçu

L'agent Datadog peut collecter de nombreuses métriques à partir d'instances NGINX, notamment:

* Nombre total de requêtes
* Connexions (acceptées, gérées, actives)

Pour les utilisateurs de NGINX Plus, la version payante de NGINX, l'Agent peut recueillir les nombreuses métriques supplémentaires fournies par NGINX Plus, telles que :

* Erreurs (codes 4xx, codes 5xx)
* Serveurs en amont (connexions actives, codes 5xx, checks d'intégrité, etc.)
* Caches (taille, hits, misses, etc)
* SSL (handshakes, failed handshakes, etc)

## Implémentation
### Installation

Le check NGINX est fourni avec l'Agent ; il vous suffit donc d'[installer l'Agent][1] sur vos serveurs NGINX.

#### module NGINX status

Le check NGINX récupère des métriques à partir d'un point de terminaison d'état NGINX local. Vos binaires `nginx` doivent donc avoir été compilés à l'aide de l'un des deux modules d'état NGINX :

* [module stub status][2] : pour la version open source de NGINX
* [module http status][3] : uniquement pour NGINX Plus

Les packages NGINX Plus comprennent _toujours_ le module http status. Si vous utilisez la version Plus, vous pouvez donc passer dès maintenant à la section **Configuration**.
Pour la version 13 et les versions ultérieures de NGINX Plus, le module d'état est obsolète. Utilisez plutôt la nouvelle API Plus. Consultez [cette annonce][4] pour en savoir plus.

Toutefois, si vous utilisez le code open source NGINX, il se peut que le module stub status ne contienne pas vos instances. Vérifiez que votre binaire `nginx` inclut le module avant de passer à **Configuration**:

```
$ nginx -V 2>&1| grep -o http_stub_status_module
http_stub_status_module
```

Si le résultat de la commande n'inclut pas `http_stub_status_module`, vous devez installer un package NGINX qui comprend le module. Vous _pouvez_ compiler votre propre package NGINX et activer le module lors de la compilation. Cependant, la plupart des distributions récentes de Linux proposent d'autres packages NGINX avec différentes combinaisons de modules supplémentaires intégrés. Consultez les packages NGINX de votre système d'exploitation afin d'en trouver un qui contient le module stub status.

### Configuration

Modifiez le fichier « nginx.d/conf.yaml » dans le dossier « conf.d/ », à la racine du répertoire de l'Agent, pour commencer à recueillir vos [métriques](#metric-collection) et vos [logs](#collecte-logs) NGINX.
Consultez le [fichier d'exemple nginx.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Préparation de NGINX

Sur chaque serveur NGINX, créez un fichier « status.conf » dans le répertoire qui contient vos autres fichiers de configuration NGINX (p. ex., « /etc/nginx/conf.d/ »).

```
server {
  listen 81;
  server_name localhost;

  access_log off;
  allow 127.0.0.1;
  deny all;

  location /nginx_status {
    # Choose your status module

    # freely available with open source NGINX
    stub_status;

    # for open source NGINX < version 1.7.5
    # stub_status on;

    # available only with NGINX Plus
    # status;
  }
}
```

NGINX Plus peut également utiliser le module « stub_status », mais comme celui-ci fournit moins de métriques, nous vous conseillons plutôt d'utiliser le module « status » si vous possédez la version Plus.

Vous pouvez également configurer l'authentification HTTP de base au niveau du serveur. Toutefois, étant donné que le service n'écoute qu'au niveau local, cela n'est pas nécessaire.

Rechargez NGINX pour activer le point de terminaison d'état. Vous n'avez pas besoin d'effectuer un redémarrage complet.

#### Collecte de métrique

* Ajoutez cette configuration à votre fichier « nginx.d/conf.yaml » pour commencer à rassembler vos [métriques NGINX](#metrics) :

  ```
  init_config:

  instances:
    - nginx_status_url: http://localhost:81/nginx_status/
    # If you configured the endpoint with HTTP basic authentication
    # user: <USER>
    # password: <PASSWORD>
  ```
  Consultez le [fichier d'exemple nginx.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][6] pour commencer à envoyer des métriques NGINX à Datadog.

#### Collecte de log

**Disponible pour l'Agent >6.0**

* La collecte des logs est désactivée par défaut dans l'Agent Datadog, vous devez l'activer dans `datadog.yaml`:

  ```
  logs_enabled: true
  ```

*  Ajoutez cette configuration à votre fichier « nginx.d/conf.yaml » pour commencer à recueillir vos logs NGINX :

  ```
  logs:
    - type: file
      path: /var/log/nginx/access.log
      service: nginx
      source: nginx
      sourcecategory: http_web_access

    - type: file
      path: /var/log/nginx/error.log
      service: nginx
      source: nginx
      sourcecategory: http_web_access
  ```
  Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
  Consultez le [fichier d'exemple nginx.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][6]

**Pour en savoir plus sur la collecte de logs, consultez la [documentation relative aux logs][7]**

### Validation

[Exécutez la sous-commande « status » de l'Agent][8] et repérez « nginx » dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "nginx" >}}


Les métriques indiquées ne sont pas toutes disponibles pour les utilisateurs de la version open source de NGINX. Comparez les références des modules [stub status][2] (version open source de NGINX) et [http status][3] (NGINX Plus) pour découvrir quelles métriques sont fournies par chaque module.

Certaines métriques de la version open source de NGINX ont un nom différent dans NGINX Plus. Elles fonctionnent cependant de la même manière :

| NGINX | NGINX Plus |
|-------------------|-------------------|
| nginx.net.connections | nginx.connections.active |
| nginx.net.conn_opened_per_s | nginx.connections.accepted |
| nginx.net.conn_dropped_per_s | nginx.connections.dropped |
| nginx.net.request_per_s | nginx.requests.total |

Les métriques suivantes ne sont pas identiques, mais sont similaires :

| NGINX | NGINX Plus |
|-------------------|-------------------|
| nginx.net.waiting | nginx.connections.idle|

Enfin, les métriques suivantes n'ont pas vraiment d'équivalent :

|||
|-------------------|-------------------|
| nginx.net.reading | Nombre actuel de connexions pour lesquelles nginx lit l'en-tête de requête. |
| nginx.net.writing | Nombre actuel de connexions pour lesquelles nginx rédige une réponse à renvoyer au client. |

### Évènements
Le check NGINX n'inclut aucun événement pour le moment.

### Checks de Service

`nginx.can_connect`:

Renvoie CRITICAL lorsque l'Agent ne peut pas se connecter à NGINX pour recueillir des métriques ; renvoie OK dans le cas contraire.

## Troubleshooting
Les problèmes suivants peuvent apparaître dans le résultat de la sous-commande info de l'Agent Datadog.

### L'agent ne peut pas se connecter
```
  Checks
  ======

    nginx
    -----
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Le point de terminaison d'état local de NGINX ne s'exécute pas, ou l'Agent n'est pas configuré avec les bonnes informations de connexion.

Vérifiez que le principal fichier « nginx.conf » contient une ligne semblable à ce qui suit :

```
http{

  ...

  include <directory_that_contains_status.conf>/*.conf;
  # e.g.: include /etc/nginx/conf.d/*.conf;
}
```

Sinon, vérifiez la section **Configuration**.

## En apprendre plus
### Base de connaissances
Les données récupérées à partir de la page d'état de NGINX Plus sont décrites dans la [documentation NGINX][10].

### Blog Datadog
Pour savoir comment surveiller les métriques de performance NGINX, consultez [notre série d'articles][11]. Vous y trouverez des informations supplémentaires sur les principales métriques de performance ainsi que des conseils pour [les recueillir][12] et pour [utiliser Datadog afin de surveiller NGINX][13].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: http://nginx.org/en/docs/http/ngx_http_stub_status_module.html
[3]: http://nginx.org/en/docs/http/ngx_http_status_module.html
[4]: https://www.nginx.com/blog/nginx-plus-r13-released/
[5]: https://github.com/DataDog/integrations-core/blob/master/nginx/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/logs
[8]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/nginx/metadata.csv
[10]: http://nginx.org/en/docs/http/ngx_http_status_module.html#data
[11]: https://www.datadoghq.com/blog/how-to-monitor-nginx/
[12]: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
[13]: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html

