---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/terraform/README.md'
display_name: terraform
draft: false
git_integration_title: terraform
guid: d743cca9-e03e-481a-86d1-3ea15aa915cf
integration_id: terraform
integration_title: terraform
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ''
metric_to_check: ''
name: terraform
public_title: terraform
short_description: Gérer votre compte Datadog avec Terraform
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le fournisseur Datadog pour Terraform vous permet d'interagir avec l'API Datadog via une configuration Terraform. Vous aurez ainsi la possibilité de gérer vos ressources Datadog, telles que vos dashboards, vos monitors, vos configurations de logs, et ainsi de suite.

## Configuration

### Installation

Le fournisseur Datadog pour Terraform est disponible via le [registre Terraform][1].

### Configuration

1. [Installer Terraform][2]
2. Créez un répertoire destiné à stocker les fichiers de configuration de Terraform, par exemple : `terraform_config/`
3. Créez un fichier `main.tf` dans le répertoire `terraform_config/` avec le contenu suivant :
    ```
    terraform {
      required_providers {
        datadog = {
          source = "DataDog/datadog"
        }
      }
    }

    # Configure the Datadog provider
    provider "datadog" {
      api_key = var.datadog_api_key
      app_key = var.datadog_app_key
    }
    ```

4. Exécutez `terraform init`. Cette commande permet d'initialiser le répertoire pour l'utiliser avec Terraform et de récupérer le fournisseur Datadog.
5. Créez n'importe quel fichier `.tf` dans le répertoire `terraform_config/`, puis commencez à créer des ressources Datadog. par exemple :

    ```
    # monitor.tf
    resource "datadog_monitor" "process_alert_example" {
      name    = "Process Alert Monitor"
      type    = "process alert"
      message = "Multiple Java processes running on example-tag"
      query   = "processes('java').over('example-tag').rollup('count').last('10m') > 1"
      monitor_thresholds {
        critical          = 1.0
        critical_recovery = 0.0
      }

      notify_no_data    = false
      renotify_interval = 60
    }
    ```

6. Exécutez `terraform apply` pour créer ce monitor dans votre compte Datadog !

## Données collectées

### Métriques

Terraform n'inclut aucune métrique.

### Checks de service

Terraform n'inclut aucun check de service.

### Événements

Terraform n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[3]: https://docs.datadoghq.com/fr/help/