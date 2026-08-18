---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Vault - Overview: assets/dashboards/vault_overview.json
  logs:
    source: vault
  metrics_metadata: metadata.csv
  monitors:
    '[Vault] S3 time to access secrets is high': assets/monitors/vault_S3_time_high.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    service_name_overview: assets/saved_views/service_name_overview.json
    vault_patern: assets/saved_views/vault_patern.json
  service_checks: assets/service_checks.json
categories:
  - security
  - configuration & deployment
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vault/README.md'
display_name: Vault
draft: false
git_integration_title: vault
guid: d65af827-c818-44ce-9ec3-cd7ead3ac4ce
integration_id: vault
integration_title: Vault
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vault.
metric_to_check: vault.is_leader
name: vault
public_title: Intégration Datadog/Vault
short_description: Vault est un service de gestion de secrets
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille la santé du cluster [Vault][1] et les changements de leader.

## Configuration

### Installation

Le check Vault est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

#### Prérequis

1. Vérifiez que vous avez activé les [métriques Prometheus dans la configuration de Vault][3].

2. Pour garantir le bon fonctionnement du check Vault, vous devez activer l'accès non authentifié aux métriques Vault (Vault 1.3.0+) ou fournir un token client Vault :

   **Pour activer l'accès non authentifié**, définissez le paramètre [`unauthenticated_metrics_access`][4] de Vault sur `true`. Cette opération permet d'accéder sans authentification à l'endpoint `/v1/sys/metrics`.

     **Remarque** : pour recueillir des métriques, l'endpoint `/sys/metrics` requiert Vault 1.1.0 ou ultérieur.

    **Pour utiliser un token client Vault**, suivez l'exemple ci-dessous reposant sur la méthode d'authentification JWT. Vous pouvez toutefois utiliser d'autres [méthodes d'authentification][5]. 

L'intégration Vault nécessite la configuration suivante :

     Contenu de `metrics_policy.hcl` :
   ```text
   path "sys/metrics*" {
     capabilities = ["read", "list"]
   }
   ```

      Rôle et stratégie de configuration :

   ```text
   $ vault policy write metrics /path/to/metrics_policy.hcl
   $ vault auth enable jwt
   $ vault write auth/jwt/config jwt_supported_algs=RS256 jwt_validation_pubkeys=@<CHEMIN_VERS_PEM_PUBLIC>
   $ vault write auth/jwt/role/datadog role_type=jwt bound_audiences=<AUDIENCE> user_claim=name token_policies=metrics
   $ vault agent -config=/path/to/agent_config.hcl
   ```

   Contenu de `agent_config.hcl` :
   ```
   exit_after_auth = true
   pid_file = "/tmp/agent_pid"

   auto_auth {
     method "jwt" {
       config = {
         path = "<CHEMIN_CLAIM_JWT>"
         role = "datadog"
       }
     }

     sink "file" {
       config = {
         path = "<CHEMIN_TOKEN_CLIENT>"
       }
     }
   }

   vault {
     address = "http://0.0.0.0:8200"
   }
   ```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `vault.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance vault. Consultez le [fichier d'exemple vault.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

    Configuration pour faire fonctionner l'intégration sans token (avec le paramètre de configuration Vault `unauthenticated_metrics_access` défini sur true) :

    ```yaml
    init_config:

    instances:
        ## @param api_url - string - required
        ## URL of the Vault to query.
        #
      - api_url: http://localhost:8200/v1

        ## @param no_token - boolean - optional - default: false
        ## Attempt metric collection without a token.
        #
        no_token: true
    ```

    Configuration pour faire fonctionner l'intégration avec un token client :

    ```yaml
    init_config:

    instances:
        ## @param api_url - string - required
        ## URL of the Vault to query.
        #
      - api_url: http://localhost:8200/v1

        ## @param client_token - string - optional
        ## Client token necessary to collect metrics.
        #
        client_token: <CLIENT_TOKEN>

        ## @param client_token_path - string - optional
        ## Path to a file containing the client token. Overrides `client_token`.
        ## The token will be re-read after every authorization error.
        #
        # client_token_path: <CLIENT_TOKEN_PATH>
    ```

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/vault/datadog_checks/vault/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                    |
| -------------------- | ---------------------------------------- |
| `<NOM_INTÉGRATION>` | `vault`                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                            |
| `<CONFIG_INSTANCE>`  | `{"api_url": "http://%%host%%:8200/v1"}` |

`INSTANCE_CONFIG` doit être personnalisé en fonction de votre configuration d'authentification Vault. Pour consulter un exemple de configuration, reportez-vous à la section Host ci-dessus.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Configurez Vault de façon à activer les logs d'audit et serveur.

   - Les logs d'audit doivent être activés par un utilisateur disposant des privilèges et des stratégies nécessaires. Consultez la section [Enabling audit devices][2] (en anglais) pour en savoir plus.

     ```shell
     vault audit enable file file_path=/vault/vault-audit.log
     ```

   - Assurez-vous que les [logs serveur][3] sont écrits dans un fichier. Vous pouvez configurer les logs serveur statiques dans le [script de lancement systemd de Vault][4].
     Le script suivant permet d'écrire les logs dans `/var/log/vault.log`.

     ```text
     ...
     [Service]
     ...
     ExecStart=/bin/sh -c '/home/vagrant/bin/vault server -config=/home/vagrant/vault_nano/config/vault -log-level="trace" > /var/log/vault.log
     ...
     ```

3. Ajoutez ce bloc de configuration à votre fichier `vault.d/conf.yaml` pour commencer à recueillir vos logs Vault :

   ```yaml
   logs:
     - type: file
       path: /vault/vault-audit.log
       source: vault
       service: "<SERVICE_NAME>"
     - type: file
       path: /var/log/vault.log
       source: vault
       service: "<SERVICE_NAME>"
   ```

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#enabling-audit-devices
[3]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#vault-server-logs
[4]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#not-finding-the-server-logs
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `vault` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "vault" >}}


### Événements

`vault.leader_change` :
Cet événement se déclenche en cas de changement de leader du cluster.

### Checks de service

**vault.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Vault. Si ce n'est pas le cas, renvoie `OK`.

**vault.unsealed** :<br>
Renvoie `CRITICAL` si Vault est scellé. Si ce n'est pas le cas, renvoie `OK`.

**vault.initialized** :<br>
Renvoie `CRITICAL` si Vault n'est pas encore initialisé. Si ce n'est pas le cas, renvoie `OK`.

**vault.prometheus.health** :<br>
Renvoie `CRITICAL` si le check ne parvient pas à se connecter à l'endpoint de métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller HashiCorp Vault avec Datadog][8]
- [Surveiller les métriques et les logs d'HashiCorp Vault][9]
- [Outils pour la surveillance d'HashiCorp Vault][10]
- [Comment surveiller HashiCorp Vault avec Datadog][11]


[1]: https://www.vaultproject.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://www.vaultproject.io/docs/configuration/telemetry#prometheus
[4]: https://www.vaultproject.io/docs/configuration/listener/tcp#unauthenticated_metrics_access
[5]: https://www.vaultproject.io/docs/auth
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog
[9]: https://www.datadoghq.com/blog/monitor-vault-metrics-and-logs/
[10]: https://www.datadoghq.com/blog/vault-monitoring-tools
[11]: https://www.datadoghq.com/blog/vault-monitoring-with-datadog