---
aliases:
- /fr/integrations/phpfpm
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    php-fpm: assets/dashboards/php-fpm_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    php-fpm_processes: assets/saved_views/php-fpm_processes.json
  service_checks: assets/service_checks.json
categories:
- web
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/php_fpm/README.md
display_name: PHP-FPM
draft: false
git_integration_title: php_fpm
guid: 47f2c337-83ac-4767-b460-1927d8343764
integration_id: php-fpm
integration_title: PHP FPM
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: php_fpm.
metric_to_check: php_fpm.processes.total
name: php_fpm
process_signatures:
- php-fpm
- 'php-fpm:'
- php7.0-fpm
- php7.0-fpm start
- service php-fpm
- php7.0-fpm restart
- restart php-fpm
- systemctl restart php-fpm.service
- php7.0-fpm.service
public_title: Intégration Datadog/PHP FPM
short_description: Surveillez les états de processus, les requêtes lentes et les requêtes
  acceptées.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Présentation de PHP][1]

## Présentation

Le check PHP-FPM permet de surveiller l'état de votre pool FPM ainsi que les performances de vos requêtes.

## Configuration

### Installation

Le check PHP-FPM est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien à installer sur votre serveur.

### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour la configuration dans un environnement conteneurisé.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `php_fpm.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple php_fpm.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param status_url - string - required
     ## Get metrics from your FPM pool with this URL
     ## The status URLs should follow the options from your FPM pool
     ## See http://php.net/manual/en/install.fpm.configuration.php
     ##   * pm.status_path
     ## You should configure your fastcgi passthru (nginx/apache) to catch these URLs and
     ## redirect them through the FPM pool target you want to monitor (FPM `listen`
     ## directive in the config, usually a UNIX socket or TCP socket.
     #
     - status_url: http://localhost/status

       ## @param ping_url - string - required
       ## Get a reliable service check of your FPM pool with `ping_url` parameter
       ## The ping URLs should follow the options from your FPM pool
       ## See http://php.net/manual/en/install.fpm.configuration.php
       ##   * ping.path
       ## You should configure your fastcgi passthru (nginx/apache) to
       ## catch these URLs and redirect them through the FPM pool target
       ## you want to monitor (FPM `listen` directive in the config, usually
       ## a UNIX socket or TCP socket.
       #
       ping_url: http://localhost/ping

       ## @param use_fastcgi - boolean - required - default: false
       ## Communicate directly with PHP-FPM using FastCGI
       #
       use_fastcgi: false

       ## @param ping_reply - string - required
       ## Set the expected reply to the ping.
       #
       ping_reply: pong
   ```

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<NOM_INTÉGRATION>` | `php_fpm`                                                                                                                |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                            |
| `<CONFIG_INSTANCE>`  | `{"status_url":"http://%%host%%/status", "ping_url":"http://%%host%%/ping", "use_fastcgi": false, "ping_reply": "pong"}` |

#### Options supplémentaires

##### Pools multiples

Il est possible de surveiller plusieurs pools PHP-FPM avec le même serveur proxy, ce qui est particulièrement utile si vous utilisez Kubernetes. Pour ce faire, modifiez les itinéraires de votre serveur de façon à les rediriger vers chacune de vos instances PHP-FPM. Voici un exemple de configuration NGINX :

```text
server {
    ...

    location ~ ^/(status1|ping1)$ {
        access_log off;
        fastcgi_pass instance1_ip:instance1_port;
        include fastcgi_params;
        fastcgi_param NOMFICHIER_SCRIPT $document_root$fastcgi_script_name;
    }

    location ~ ^/(status2|ping2)$ {
        access_log off;
        fastcgi_pass instance2_ip:instance2_port;
        include fastcgi_params;
        fastcgi_param NOMFICHIER_SCRIPT $document_root$fastcgi_script_name;
    }
}
```

Si cette méthode est trop fastidieuse à grande échelle, définissez `use_fastcgi` sur `true` pour obliger le check à ignorer les serveurs proxy et à communiquer directement avec PHP-FPM en utilisant FastCGI. Lorsqu'aucun port n'est précisé dans les paramètres `status_url` et `ping_url`, il est défini par défaut sur `9000`.

##### Sockets Unix

Si votre installation PHP-FPM utilise des sockets Unix, vous devez activer `use_fastcgi` et appliquer la syntaxe ci-dessous pour `status_url` et `ping_url` :

| Paramètre     | Valeur                             |
| ------------- | --------------------------------- |
| `status_url`  | `unix:///<CHEMIN_FICHIER>.sock/status` |
| `ping_url`    | `unix:///<CHEMIN_FICHIER>.sock/ping`   |
| `ping_reply`  | `pong`                            |
| `use_fastcgi` | `true`                            |

**Remarque** : avec Autodiscovery, si l'Agent s'exécute dans un conteneur, une tâche ou un pod distinct, il ne peut pas accéder au fichier de sockets Unix de votre pool FPM. Pour y remédier, exécutez l'Agent en tant que sidecar.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `php_fpm` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "php_fpm" >}}


### Événements

Le check PHP-FPM n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "php_fpm" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/