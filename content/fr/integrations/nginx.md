---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nginx/README.md'
display_name: Nginx
git_integration_title: nginx
guid: 88620208-3919-457c-ba51-d844d09ac97f
integration_id: nginx
integration_title: Nginx
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nginx.
metric_to_check: nginx.net.connections
name: nginx
process_signatures:
  - 'nginx: master process'
public_title: Intégration Datadog/Nginx
short_description: "Surveillez des métriques concernant les connexions et les requêtes. Obtenez davantage de métriques avec NGINX\_Plus. Plus."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard par défaut NGINX][1]

## Présentation

L'Agent Datadog peut recueillir de nombreuses métriques à partir des instances NGINX, notamment (sans s'y limiter) :

* Le nombre total de requêtes
* Les connexions (par ex., acceptées, traitées, actives)

Pour les utilisateurs de NGINX Plus, la version payante de NGINX, l'Agent peut recueillir les nombreuses métriques supplémentaires fournies concernant par exemple :

* Les erreurs (par ex., codes 4xx, codes 5xx)
* Les serveurs en amont (p. ex., connexions actives, codes 5xx, checks de santé, etc.)
* Les caches (p. ex., la taille, les accès, les échecs, etc.)
* Le protocole SSL (p. ex., les établissements de liaisons, les échecs lors des établissements de liaisons, etc.)

## Implémentation

### Installation

Le check NGINX est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs NGINX.

### Configuration

Le check NGINX récupère des métriques à partir d'un endpoint status local de NGINX. Vos binaires `nginx` doivent donc avoir été compilés à l'aide de l'un des deux modules de statut de NGINX :

* [Module stub status][3] (pour la version open source de NGINX)
* [Module http status][4] (seulement pour NGINX Plus)

#### Version open source de NGINX

Si vous utilisez la version open source de NGINX, il se peut que vos instances ne possèdent pas le module stub status. Vérifiez que votre binaire `nginx` inclut le module avant de passer à l'étape de **configuration** :

```
$ nginx -V 2>&1| grep -o http_stub_status_module
http_stub_status_module
```

Si la sortie de la commande ne comprend pas le module `http_stub_status_module`, vous devez installer le paquet NGINX qui inclut le module. Vous _pouvez_ compiler votre propre NGINX afin d'activer le module lors de sa compilation. Toutefois, la plupart des distributions Linux modernes fournissent des paquets NGINX alternatifs avec plusieurs combinaisons de modules supplémentaires intégrés. Vérifiez les paquets NGINX de votre système d'exploitation afin de trouver celui qui comprend le module stub status.

#### NGINX Plus 

Les paquets NGINX Plus avant la version 13 comprennent le module http status. Pour la version 13 et les versions ultérieures de NGINX Plus, le module status est obsolète. Utilisez plutôt la nouvelle API Plus. Consultez [cette annonce][5] pour en savoir plus.

#### Préparer NGINX

Sur chaque serveur NGINX, créez un fichier `status.conf` dans le répertoire qui contient vos autres fichiers de configuration NGINX (p. ex., `/etc/nginx/conf.d/`).

```
server {
  listen 81;
  server_name localhost;

  access_log off;
  allow 127.0.0.1;
  deny all;

  location /nginx_status {
    # Choisir votre module status

    # disponible gratuitement avec la version open source de NGINX
    stub_status;

    # pour la version open source < 1.7.5 de NGINX
    # stub_status on;

    # disponible seulement avec NGINX Plus
    # status;
  }
}
```

NGINX Plus peut également utiliser le module `stub_status`, mais puisque celui-ci fournit moins de métriques, nous vous conseillons plutôt d'utiliser le module `status` si vous possédez la version Plus.

Rechargez NGINX pour activer l'endpoint status. Vous n'avez pas besoin d'effectuer un redémarrage complet.

#### Collecte de métriques

1. Définissez le paramètre `nginx_status_url` sur `http://localhost:81/nginx_status/` dans votre fichier `nginx.d/conf.yaml` pour commencer à rassembler des [métriques NGINX](#metriques). Consultez [le fichier d'exemple nginx.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.
  **Remarque** : si vous utilisez NGINX Plus pour les versions 13 et ultérieures, définissez le paramètre `use_plus_api` sur `true` dans votre fichier de configuration `nginx.d/conf.yaml`.

3. Facultatif : si vous utilisez le module NGINX `vhost_traffic_status module`, définissez le paramètre `use_vts` sur `true` dans votre fichier de configuration `nginx.d/conf.yaml`.

4. [Redémarrez l'Agent][7] pour commencer à envoyer des métriques NGINX à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

  ```
  logs_enabled: true
  ```

*  Ajoutez ce bloc de configuration à votre fichier `nginx.d/conf.yaml` pour commencer à recueillir vos logs NGINX :

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
  Consultez le [fichier d'exemple nginx.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][7].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][8].**

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `nginx` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "nginx" >}}


Les métriques indiquées ne sont pas toutes disponibles pour les utilisateurs de la version open source de NGINX. Comparez les références des modules [stub status][3] (version open source de NGINX) et [http status][4] (NGINX Plus) pour consulter la liste des métriques fournies par chaque module.

Certaines métriques de la version open source de NGINX possèdent un nom différent dans NGINX Plus. Elles fonctionnent cependant de la même manière :

| NGINX                        | NGINX Plus                 |
| -------------------          | -------------------        |
| nginx.net.connections        | nginx.connections.active   |
| nginx.net.conn_opened_per_s  | nginx.connections.accepted |
| nginx.net.conn_dropped_per_s | nginx.connections.dropped  |
| nginx.net.request_per_s      | nginx.requests.total       |

Les métriques suivantes ne sont pas identiques, mais sont similaires :

| NGINX               | NGINX Plus             |
| ------------------- | -------------------    |
| nginx.net.waiting   | nginx.connections.idle |

Enfin, les métriques suivantes n'ont pas de réel équivalent :

|                     |                                                                                           |
| ------------------- | -------------------                                                                       |
| nginx.net.reading   | Nombre actuel de connexions pour lesquelles nginx lit l'en-tête de requête.              |
| nginx.net.writing   | Nombre actuel de connexions pour lesquelles nginx rédige une réponse à renvoyer au client. |

### Événements
Le check NGINX ne comprend aucun événement.

### Checks de service

`nginx.can_connect` :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à NGINX pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

Pour savoir comment surveiller les métriques de performance NGINX, consultez [notre série d'articles à ce sujet][12]. Vous y trouverez des informations supplémentaires sur les principales métriques de performance ainsi que des conseils pour [les recueillir][13] et pour [utiliser Datadog afin de surveiller NGINX][14].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/nginx/images/nginx_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html
[4]: https://nginx.org/en/docs/http/ngx_http_status_module.html
[5]: https://www.nginx.com/blog/nginx-plus-r13-released
[6]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/logs
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/nginx/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://www.datadoghq.com/blog/how-to-monitor-nginx
[13]: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
[14]: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html


{{< get-dependencies >}}