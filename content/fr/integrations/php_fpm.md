---
aliases:
  - /fr/integrations/phpfpm
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/php_fpm/README.md'
display_name: PHP-FPM
git_integration_title: php_fpm
guid: 47f2c337-83ac-4767-b460-1927d8343764
integration_id: php-fpm
integration_title: PHP FPM
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: php_fpm.
metric_to_check: php_fpm.processes.total
name: php_fpm
process_signatures:
  - php-fpm
  - php7.0-fpm
  - php7.0-fpm start
  - service php-fpm
  - php7.0-fpm restart
  - restart php-fpm
  - systemctl restart php-fpm.service
  - php7.0-fpm.service
public_title: "Intégration Datadog/PHP\_FPM"
short_description: 'Surveillez les états de processus, les requêtes lentes et les requêtes acceptées.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Présentation de PHP][1]

## Présentation

Le check PHP-FPM permet de surveiller l'état de votre pool FPM ainsi que les performances de vos requêtes.

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Utilisez ensuite la méthode `lambda_metric` pour envoyer des métriques custom depuis votre fonction vers Datadog :

Le check PHP-FPM est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs utilisant PHP-FPM.

### Configuration

Modifiez le fichier `php_fpm.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple php_fpm.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - status_url: http://localhost/status # ou l'URL définie pour pm.status_path dans votre .ini PHP
    ping_url: http://localhost/ping     # ou l'URL définie pour ping.path dans votre .ini PHP
    ping_reply: pong                    # la réponse attendue au ping ; par défaut, il s'agit de « pong »
 #  user: <VOTRE_NOMUTILISATEUR>     # si les URL définies pour status_url et ping_url nécessitent une authentification HTTP basique
 #  password: <VOTRE_MOTDEPASSE> # si les URL définies pour status_url et ping_url nécessitent une authentification HTTP basique
 #  http_host: <HOST>         # si votre pool FPM est uniquement accessible via un vhost HTTP spécifique
 #  tags:
 #    - instance:foo
```

Options de configuration :

* `status_url` (obligatoire) : l'URL pour la page de statut de PHP-FPM, définie dans le fichier de configuration du pool FPM (pm.status_path).
* `ping_url` (obligatoire) : l'URL pour la page de ping de PHP-FPM, définie dans le fichier de configuration du pool FPM (ping.path).
* `use_fastcgi` (facultatif) : communiquez directement avec PHP-FPM en utilisant FastCGI.
* `ping_reply` (obligatoire) : réponse envoyée par ping_url. Si aucune réponse n'est définie, il s'agit de `pong`.
* `user` (facultatif) : utilisé si les pages de statut et de ping nécessitent une authentification basique.
* `password` (facultatif) : utilisé si les pages de statut et de ping nécessitent une authentification basique.
* `http_host` (facultatif) : si votre pool FPM est uniquement accessible via un vhost HTTP spécifique, indiquez-le ici.

[Redémarrez l'Agent][6] pour commencer à envoyer des métriques PHP-FPM à Datadog.

#### Pools multiples

Il est également possible de surveiller plusieurs pools PHP-FPM avec le même serveur proxy, ce qui est particulièrement utile si vous utilisez Kubernetes.

Pour ce faire, modifiez les itinéraires de votre serveur de façon à les rediriger vers chacune de vos instances PHP-FPM. Voici un exemple de configuration Nginx :

```
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

### Sockets Unix

Si votre installation PHP-FPM utilise des sockets Unix, vous devez activer `use_fastcgi` et appliquer la syntaxe ci-dessous pour `status_url` et `ping_url` :

```
init_config:

instances:
  - status_url: unix:///chemin/vers/fichier.sock/status
    ping_url: unix:///chemin/vers/fichier.sock/ping
    ping_reply: pong
    use_fastcgi: true
```

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `php_fpm` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "php_fpm" >}}


### Événements
Le check PHP-FPM n'inclut aucun événement.

### Checks de service

`php_fpm.can_ping` :

Renvoie CRITICAL si l'Agent n'est pas capable de ping PHP-FPM sur le `ping_url` configuré. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/metadata.csv
[9]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}