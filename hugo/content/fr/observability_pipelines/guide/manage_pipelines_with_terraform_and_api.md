---
description: Apprenez à créer et à mettre à jour des pipelines à l'aide de l'API ou
  de Terraform.
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: Documentation
  text: Configurez un pipeline
- link: /api/latest/observability-pipelines/
  tag: Documentation
  text: Observability Pipelines API
title: Gérer les Observability Pipelines avec l'API ou Terraform
---
## Présentation {#overview}

Si vous gérez de nombreux déploiements d'Observability Pipelines et souhaitez réduire les erreurs de configuration manuelle, vous pouvez utiliser l'API ou Terraform pour gérer vos pipelines par programmation. Ce guide décrit comment configurer et mettre à jour vos pipelines avec l'[API](#manage-pipelines-with-the-api) ou [Terraform](#manage-pipelines-with-terraform).

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de :

- Disposer des clés d'API et d'application Datadog pour l'authentification.<br>**Remarque** : La clé d'API doit être [activée pour Remote Configuration][1].
- Si vous comptez utiliser Terraform :
  - Avoir la dernière version de Terraform installée sur votre machine.
  - Avoir consulté le [fournisseur Terraform Datadog][2] et la [ressource Observability Pipelines][3].
- Si vous comptez utiliser l'API, consultez les spécifications des endpoints de l'[Observability Pipelines API][4] ainsi que les paramètres de configuration supplémentaires.

## Gérer les pipelines avec l'API {#manage-pipelines-with-the-api}

Vous pouvez effectuer des opérations CRUD (création, lecture, mise à jour, suppression) avec l'Observability Pipelines API. Cette section décrit comment utiliser ces endpoints dans votre workflow. Pour chaque exemple de requête, remplacez les espaces réservés suivants :

- `<PIPELINE_ID>` par l'identifiant obtenu lors de la création du pipeline
- `<DD_API_KEY>` par votre clé d'API Datadog
- `<DD_APP_KEY>` par votre clé d'application Datadog

Les exemples de charges utiles incluent également des valeurs `id` (telles que `my-processor-group` et `datadog-agent-source`) pour les sources, les processeurs et les destinations. Il s'agit de noms que vous choisissez et que vous pouvez renommer pour les adapter à vos propres conventions. Les valeurs `type` (telles que `datadog_agent`, `filter` et `datadog_logs`) sont fixes et doivent correspondre à un type de composant pris en charge.


### Créer un pipeline {#create-a-pipeline}

Pour [créer un pipeline][5], envoyez une requête `POST` avec une charge utile JSON qui définit le nom du pipeline et ses composants principaux : sources, processeurs et destinations.

Exemple de requête :

```bash
curl -X POST "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "config": {
        "destinations": [
          { "id": "datadog-logs-destination", "type": "datadog_logs", "inputs": ["my-processor-group"] }
        ],
        "pipeline_type": "logs",
        "processor_groups": [
          {
            "enabled": true,
            "id": "my-processor-group",
            "include": "service:my-service",
            "inputs": [
              "datadog-agent-source"
            ],
            "processors": [
              { "id": "filter-processor", "enabled": true, "type": "filter", "include": "service:my-service" }
            ]
          }
        ],
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ]
      },
      "name": "Main Observability Pipeline"
    },
    "type": "pipelines"
  }
}'
```

### Récupérer une configuration de pipeline {#retrieve-a-pipeline-configuration}

Pour [auditer ou vérifier une configuration de pipeline existante][6], envoyez une requête `GET` avec l'ID de pipeline spécifique.

Exemple de requête :

```bash
curl -X GET "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

### Mettre à jour un pipeline existant {#update-an-existing-pipeline}

Pour [mettre à jour la configuration d'un pipeline existant][7], envoyez une requête `PUT` avec les modifications du pipeline dans la charge utile JSON.

Exemple de requête :

```bash
curl -X PUT "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "name": "Updated Pipeline Name",
      "config": {
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ],
        "processors": [
          { "id": "filter-processor", "type": "filter", "include": "service:my-updated-service", "inputs": ["datadog-agent-source"] }
        ],
        "destinations": [
          { "id": "updated-datadog-logs-destination", "type": "datadog_logs", "inputs": ["filter-processor"] }
        ]
      }
    },
    "type": "pipelines"
  }
}'
```

### Supprimer un pipeline {#delete-a-pipeline}

Pour [supprimer un pipeline][8], envoyez une requête `DELETE` à l'endpoint correspondant. Une suppression réussie entraîne un code d'état `204` indiquant que le pipeline a été supprimé.

**Remarque** : l'opération de suppression est irréversible. Utilisez cet endpoint uniquement lorsque vous êtes certain que le pipeline n'est plus nécessaire.

Exemple de requête :

```bash
curl -X DELETE "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

## Gérer les pipelines avec Terraform {#manage-pipelines-with-terraform}

Vous pouvez utiliser les ressources Terraform pour créer et déployer un pipeline.

### Créer un pipeline à l'aide de Terraform {#create-a-pipeline-using-terraform}

Définissez un pipeline à l'aide de la ressource [datadog_observability_pipeline][9]. Conservez ce fichier dans votre système de contrôle de version pour suivre les modifications.

Définissez les variables d'environnement suivantes avant d'exécuter Terraform, afin que les informations d'identification ne soient pas stockées dans votre fichier de configuration :

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_APP_KEY=<DD_APP_KEY>
export DD_HOST={{< region-param key="dd_api" code="true" >}}
```

Exemple de configuration de pipeline Terraform :

```hcl
terraform {
  required_providers {
    datadog = {
      source = "DataDog/datadog"
      version = "~> 3.84"
    }
  }
}

provider "datadog" {}

resource "datadog_observability_pipeline" "main" {
  name = "Main Observability Pipeline"

  config {
    source {
      id = "datadog-agent-source"

      datadog_agent {}
    }

    processor_group {
      id      = "filter-processor"
      enabled = true
      include = "service:my-service"
      inputs  = ["datadog-agent-source"]

      processor {
        id      = "filter-1"
        enabled = true
        include = "service:my-service"

        filter {}
      }
    }

    destination {
      id     = "datadog-logs-destination"
      inputs = ["filter-processor"]

      datadog_logs {}
    }
  }
}
```

Remplacez `service:my-service` par une requête de recherche qui correspond aux logs que vous souhaitez que le pipeline traite.

### Déployez un pipeline avec Terraform {#deploy-a-pipeline-with-terraform}

Après avoir défini une nouvelle configuration de pipeline ou mis à jour une configuration existante, exécutez les commandes Terraform suivantes pour déployer votre configuration de pipeline :

```bash
terraform init
terraform plan
terraform apply
```

- `terraform init` initialise votre répertoire de travail.
- `terraform plan` prévisualise les modifications apportées.
- `terraform apply` applique les modifications, ce qui crée ou met à jour votre pipeline en conséquence.

Après avoir déployé la configuration, [installez le Worker][10] pour envoyer des données via le pipeline. Un pipeline ne traite pas de données tant qu'au moins un Worker n'est pas en cours d'exécution pour celui-ci.

**Remarque** : Vous ne pouvez pas supprimer un pipeline actif. Arrêtez tous les Workers du pipeline avant de supprimer son bloc de ressources. Consultez [Supprimer un pipeline][11] pour plus d'informations.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /fr/api/latest/observability-pipelines/
[5]: /fr/api/latest/observability-pipelines/create-a-new-pipeline/
[6]: /fr/api/latest/observability-pipelines/get-a-specific-pipeline/
[7]: /fr/api/latest/observability-pipelines/update-a-pipeline/
[8]: /fr/api/latest/observability-pipelines/delete-a-pipeline/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[10]: /fr/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-the-api
[11]: /fr/observability_pipelines/configuration/set_up_pipelines/?tab=logs#delete-a-pipeline