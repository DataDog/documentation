---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md'
display_name: RabbitMQ
git_integration_title: rabbitmq
guid: a790a556-fbaa-4208-9d39-c42c3d57084b
integration_id: rabbitmq
integration_title: RabbitMQ
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: rabbitmq.
metric_to_check: rabbitmq.queue.messages
name: rabbitmq
process_signatures:
  - rabbitmq
public_title: Intégration Datadog/RabbitMQ
short_description: 'Surveillez la taille de file d''attente, le nombre de clients, les messages sans accusé de réception, et plus encore. more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard RabbitMQ][1]

## Présentation

Ce check permet de surveiller [RabbitMQ][2] avec l'Agent Datadog. Il peut être utilisé pour :

* Surveiller des statistiques liées aux files d'attente : la taille de file d'attente, le nombre de clients, les messages sans accusé de réception, les messages renvoyés, etc.
* Surveiller des statistiques liées aux nœuds : processus en attente, sockets utilisés, descripteurs de fichiers utilisés, etc.
* Surveiller la disponibilité et le nombre de connexions des vhosts.

Et plus encore.

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check RabbitMQ est inclus avec le paquet de l'[Agent Datadog][4]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Modifiez le fichier `rabbitmq.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) RabbitMQ. Consultez le [fichier d'exemple rabbitmq.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

#### Préparer RabbitMQ

Activez le plug-in de gestion RabbitMQ. Consultez la [documentation relative à RabbitMQ][7] pour l'activer.

L'utilisateur Agent doit alors au moins disposer du tag `monitoring` et de ces autorisations :

| Autorisation | Commande            |
|------------|--------------------|
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

Créez un utilisateur Agent pour votre vhost par défaut avec les commandes suivantes :

```
rabbitmqctl add_user datadog <SECRET>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

Ici, `/` correspond au host par défaut. Définissez ce paramètre sur le hostname virtuel que vous avez spécifié. Consultez la [documentation de RabbitMQ][8] (en anglais) pour en savoir plus.

#### Collecte de métriques

* Ajoutez ce bloc de configuration à votre fichier `rabbitmq.d/conf.yaml` pour commencer à recueillir vos [métriques RabbitMQ](#metriques) :

```
init_config:

instances:
  - rabbitmq_api_url: http://localhost:15672/api/
  #  rabbitmq_user: <UTILISATEUR_RABBIT> # si votre API RabbitMQ nécessite une authentification ; la valeur par défaut est guest
  #  rabbitmq_pass: <MOTDEPASSE_RABBIT> # la valeur par défaut est guest
  #  tag_families: true           # la valeur par défaut est false
  #  vhosts:
  #    - <VOTRE_VHOST>             # ne pas définir si vous souhaitez récupérer tous les vhosts
```

Si vous ne définissez pas `vhosts`, l'Agent envoie à TOUS les vhosts :

1. Le check de service `rabbitmq.aliveness`
2. La métrique `rabbitmq.connections`

Si vous définissez `vhosts`, l'Agent envoie ce check et cette métrique uniquement aux vhosts que vous avez spécifiés.

Des options similaires sont disponibles pour `queues` et `nodes`. Par défaut, l'Agent effectue des checks sur toutes les files d'attente et tous les nœuds, mais vous pouvez définir des listes ou des expressions régulières pour limiter ce comportement. Consultez le fichier [rabbitmq.d/conf.yaml][6] pour découvrir des exemples.

Options de configuration :

| Option                           | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rabbitmq_api_url`               | Oui      | Pointe vers l'URL d'API du [plug-in de gestion RabbitMQ][9].                                                                                                                                                                                                                                                                                                                                                |
| `rabbitmq_user`                  | Non       | Nom d'utilisateur, prend la valeur 'guest' par défaut                                                                                                                                                                                                                                                                                                                                                                              |
| `rabbitmq_pass`                  | Non       | Mot de passe, prend la valeur 'guest' par défaut                                                                                                                                                                                                                                                                                                                                                                               |
| `tag_families`                   | Non       | Permet de taguer les « familles » de files d'attente en fonction des correspondances des expressions régulières, prend la valeur false par défaut                                                                                                                                                                                                                                                                                                                                         |
| `nodes` ou `nodes_regexes`       | Non       | Utilisez ces paramètres pour spécifier les nœuds sur lesquels vous souhaitez recueillir des métriques (jusqu'à 100). Si vous avez moins de 100 nœuds, vous n'avez pas à définir ce paramètre. Par défaut, les métriques sont recueillies pour tous les nœuds.                                                                                                                                                                                            |
| `queues` ou `queues_regexes`     | Non       | Utilisez ces paramètres pour spécifier les files d'attente sur lesquelles vous souhaitez recueillir des métriques (jusqu'à 100). Si vous avez moins de 200 files d'attente, vous n'avez pas à définir ce paramètre. Par défaut, les métriques sont recueillies pour toutes les files d'attente. Si vous avez configuré des vhosts, les noms de file d'attente définis doivent correspondre à `nom_vhost/nom_file`. Si vous avez activé le paramètre `tag_families`, le premier groupe capturé dans l'expression régulière est utilisé en tant que tag `famille_files`. |
| `exchanges` ou `exchanges_regex` | Non       | Utilisez ces paramètres pour spécifier les exchanges sur lesquels vous souhaitez recueillir des métriques (jusqu'à 50). Si vous avez moins de 50 exchanges, vous n'avez pas à définir ce paramètre. Par défaut, les métriques sont recueillies pour tous les exchanges.                                                                                                                                                                                  |
| `vhosts`                         | Non       | Par défaut, une liste de tous les vhosts est récupérée et chaque vhost est vérifié avec l'API Aliveness. Si vous préférez surveiller uniquement certains vhosts, spécifiez les vhosts qui vous intéressent.                                                                                                                                                                                                                              |

[Redémarrez l'Agent][10] pour commencer à envoyer vos métriques, événements et checks de service RabbitMQ à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. Pour modifier l'emplacement du fichier de log par défaut, définissez la variable d'environnement `RABBITMQ_LOGS` ou ajoutez ces lignes à votre fichier de configuration RabbitMQ (`/etc/rabbitmq/rabbitmq.conf`) :

    ```conf
      log.dir = /var/log/rabbit
      log.file = rabbit.log
    ```

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

3. Ajoutez ce bloc de configuration à votre fichier `rabbitmq.d/conf.yaml` pour commencer la collecte de vos logs RabbitMQ :

    ```yaml
      logs:
          - type: file
            path: /var/log/rabbit/*.log
            source: rabbitmq
            service: myservice
            log_processing_rules:
              - type: multi_line
                name: logs_starts_with_equal_sign
                pattern: "="
    ```

4. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `rabbitmq` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "rabbitmq" >}}


L'Agent tague les métriques `rabbitmq.queue.*` par nom de file d'attente et les métriques `rabbitmq.node.*` par nom de nœud.

### Événements

Pour des raisons de performances, le check RabbitMQ limite le nombre d'exchanges, de files d'attente et de nœuds pour lesquels il recueille des métriques. Si le check se rapproche de cette limite, il envoie un événement de type warning sur votre flux d'événements.

Si vous avez besoin d'augmenter le nombre d'exchanges, de files d'attente ou de nœuds, contactez [l'assistance Datadog][13].

### Checks de service

**rabbitmq.aliveness**:<br>
L'Agent envoie ce check de service pour tous les vhosts (si `vhosts` n'est pas configuré) OU pour un sous-ensemble de vhosts (ceux qui sont configurés dans `vhosts`). Chaque check de service se voit attribuer le tag `vhost:<nom_vhost>`. Renvoie `CRITICAL` en cas d'échec du check de disponibilité. Si ce n'est pas le cas, renvoie `OK`.

**rabbitmq.status**:
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à RabbitMQ pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

### Blog Datadog
* [Métriques clés pour la surveillance RabbitMQ][14]
* [Recueillir des métriques avec les outils de surveillance RabbitMQ][15]
* [Surveiller les performances de RabbitMQ avec Datadog][16]

### FAQ
* [Taguer des files d'attente RabbitMQ par famille de tags][17]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[7]: https://www.rabbitmq.com/management.html
[8]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[9]: https://www.rabbitmq.com/management.html
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/metadata.csv
[13]: https://docs.datadoghq.com/fr/help
[14]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[15]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[16]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
[17]: https://docs.datadoghq.com/fr/integrations/faq/tagging-rabbitmq-queues-by-tag-family


{{< get-dependencies >}}