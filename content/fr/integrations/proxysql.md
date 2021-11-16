---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  logs:
    source: proxysql
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - caching
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md'
display_name: ProxySQL
draft: false
git_integration_title: proxysql
guid: 8d759c9d-eb9e-4c78-9f26-1c2c844233a5
integration_id: proxysql
integration_title: ProxySQL
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: proxysql.
metric_to_check: proxysql.active_transactions
name: proxysql
public_title: Intégration Datadog/ProxySQL
short_description: Recueillez vos métriques et logs ProxySQL.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [ProxySQL][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

L'intégration ProxySQL est incluse avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Activation de l'authentification SSL
Pour exiger une validation SSL/TLS complète lors de la connexion à ProxySQL, activez l'option `tls_verify` dans `conf.yaml`. Spécifiez les certificats et mots de passe requis pour la connexion via SSL/TLS.

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `proxysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance ProxySQL. Consultez le [fichier d'exemple proxysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez les fichiers de logs qui vous intéressent à votre fichier `proxysql.d/conf.yaml` pour commencer à recueillir vos logs ProxySQL :

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple proxysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

#### Collecte de métriques

| Paramètre            | Valeur                                                      |
|----------------------|------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `proxysql`                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                              |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<UTILISATEUR>", "password": "<MOTDEPASSE>"}`       |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                     |
|----------------|-------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "proxysql", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `proxysql` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "proxysql" >}}


### Checks de service

**proxysql.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à ProxySQL. Si ce n'est pas le cas, renvoie `OK`. Ce check de service reçoit les tags `server` et `port`

**proxysql.backend.status** :<br>
Renvoie `CRITICAL` si ProxySQL considère que le host du backend est SHUNNED ou OFFLINE_HARD. Renvoie `WARNING` si le host du backend est `OFFLINE_SOFT`. Si ce n'est pas le cas, renvoie `OK`. Ce check de service reçoit les tags `hostgroup`, `srv_host` et `srv_port`.

### Événements

Le check ProxySQL n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help