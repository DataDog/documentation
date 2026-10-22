---
aliases:
- /fr/observability_pipelines/configuration/export_pipeline_configuration/
description: Apprenez à exporter la configuration d’un pipeline (brouillon ou déployé)
  au format JSON ou Terraform, et à importer une configuration JSON dans l’interface
  utilisateur Observability Pipelines.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: Documentation
  text: Configurez un pipeline
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentation
  text: Mettez à jour un pipeline existant.
- link: https://docs.datadoghq.com/api/latest/observability-pipelines/
  tag: Documentation
  text: Observability Pipelines API
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
  tag: Documentation
  text: Ressource Terraform Observability Pipelines
title: Exporter et importer la configuration d’un pipeline
---
## Présentation {#overview}

La configuration et la mise à jour d’un pipeline avec Terraform ou l’API peuvent être fastidieuses, nécessiter des interventions manuelles et être sujettes à des erreurs de syntaxe. Vous pouvez créer ou mettre à jour un pipeline dans l’interface utilisateur, puis exporter la configuration au format JSON ou Terraform pour créer ou mettre à jour le pipeline par programmation. De plus, vous pouvez importer la configuration JSON d’un pipeline dans l’interface utilisateur.


## Exporter la configuration d'un pipeline en mode brouillon {#export-the-configuration-of-a-pipeline-in-draft-mode}

Lors de la création d'un pipeline qui n'a pas encore été déployé, vous pouvez configurer le pipeline dans l'interface utilisateur, puis exporter la configuration du pipeline au format JSON ou Terraform pour le créer par programmation.

1. Accédez à [Observability Pipelines][1].
1. [Configurez un pipeline][2] en ajoutant votre source, vos processeurs et vos destinations.
1. Une fois votre pipeline configuré, cliquez sur {{< ui >}}Export Pipeline{{< /ui >}}.
   {{< img src="observability_pipelines/export_pipeline/export_draft_pipeline.png" alt="Le bouton d'exportation mis en surbrillance dans l'interface utilisateur du pipeline" style="width:100%;" >}}
1. Cliquez sur le bouton de copie ou de téléchargement pour exporter la configuration au format JSON ou Terraform.
   {{< img src="observability_pipelines/export_pipeline/export_json_modal.png" alt="La fenêtre modale d'exportation affichant la configuration du pipeline au format JSON" style="width:100%;" >}}
1. Déployez la configuration du pipeline à l'aide de l'[API][3] ou de [Terraform][4].
1. [Installez le Worker][7] pour commencer à envoyer et à traiter des données via le pipeline.

## Exporter la configuration d'un pipeline déployé {#export-the-configuration-of-a-deployed-pipeline}

Un pipeline déployé dispose d'un Worker installé pour envoyer des données via le pipeline et peut être actif ou inactif.

### Exporter la configuration d'un pipeline {#export-a-pipelines-configuration}

Lors de la consultation d'un pipeline déployé dans l'interface utilisateur, vous pouvez exporter sa configuration au format JSON ou Terraform pour le créer par programmation.

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un pipeline déployé (le statut peut être `active` ou `inactive`) pour afficher la configuration.
1. Cliquez sur {{< ui >}}Export Pipeline{{< /ui >}}.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline.png" alt="Le bouton d'exportation sur une page de pipeline déployé" style="width:100%;" >}}
1. Cliquez sur le bouton de copie ou de téléchargement pour exporter la configuration au format JSON ou Terraform.
1. Mettez à jour la configuration JSON ou Terraform pour toute modification supplémentaire que vous souhaitez apporter, puis déployez la configuration par programmation.
   - [Documentation de l'API][5]
   - [Documentation Terraform][4]

### Exporter la configuration d'un pipeline après avoir apporté des modifications au pipeline {#export-a-pipelines-configuration-after-making-edits-to-the-pipeline}

Lors de la modification d'un pipeline déployé, vous pouvez ajouter de nouveaux composants tels que des [Packs][6] ou mettre à jour les règles de contrôle de volume dans l'interface utilisateur et exporter la configuration au format JSON ou Terraform pour déployer les modifications par programmation.

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un pipeline déployé (le statut peut être `active` ou `inactive`) pour afficher la configuration.
1. Apportez des modifications à votre source, à vos destinations ou à vos processeurs.
1. Avant de quitter le pipeline, cliquez sur {{< ui >}}Export Pipeline{{< /ui >}}.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline_edit.png" alt="Le bouton d'exportation mis en surbrillance sur la page de modification du pipeline" style="width:100%;" >}}
1. Cliquez sur le bouton de copie ou de téléchargement pour exporter la configuration au format JSON ou Terraform.
   - **Remarque** : Après avoir effectué des mises à jour de votre pipeline dans l'interface utilisateur, la configuration exportée inclut les dernières modifications, même si vous n'avez pas enregistré ou déployé ces modifications.
   {{< img src="observability_pipelines/export_pipeline/export_terraform_modal.png" alt="La fenêtre modale d'exportation affichant la configuration du pipeline au format Terraform" style="width:100%;" >}}
1. Cliquez sur le logo Observability Pipelines en haut à gauche de la page pour quitter le pipeline sans enregistrer les modifications effectuées dans l'interface utilisateur.
   {{< img src="observability_pipelines/export_pipeline/exit_export_deployed_pipeline.png" alt="Le log Observability Pipelines mis en surbrillance sur la page du pipeline" style="width:100%;" >}}
1. Utilisez la configuration copiée ou téléchargée pour mettre à jour votre pipeline par programmation.
   - [Documentation de l'API][5]
   - [Documentation Terraform][4]

## Importer la configuration JSON d'un pipeline dans l'interface utilisateur {#import-a-pipelines-json-configuration-to-the-ui}

Pour vous aider à créer vos pipelines et à transférer les configurations de pipeline entre les organisations Datadog, vous pouvez également importer le JSON d'un pipeline dans l'interface utilisateur.

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un pipeline brouillon pour afficher la configuration.
1. Cliquez sur les paramètres et sélectionnez {{< ui >}}Import Pipeline{{< /ui >}}
   {{< img src="observability_pipelines/export_pipeline/import_access.png" alt="Le menu des paramètres affichant Importer le pipeline" style="width:100%;" >}}
1. Choisissez une configuration de pipeline sous forme de fichier JSON depuis votre ordinateur.
   {{< img src="observability_pipelines/export_pipeline/import_select.png" alt="La fenêtre modale d'importation offrant l'option de sélectionner un fichier JSON" style="width:100%;" >}}
1. Cliquez sur {{< ui >}}Import{{< /ui >}}. Ceci remplace votre configuration de pipeline actuelle par la configuration de pipeline du JSON importé.
1. [Installez Observability Pipelines Worker et déployez votre pipeline en utilisant l'interface utilisateur][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-in-the-ui
[3]: https://docs.datadoghq.com/fr/api/latest/observability-pipelines/#create-a-new-pipeline
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://docs.datadoghq.com/fr/api/latest/observability-pipelines/#update-a-pipeline
[6]: /fr/observability_pipelines/packs/
[7]: /fr/observability_pipelines/configuration/install_the_worker/#api-or-terraform-pipeline-setup
[8]: https://docs.datadoghq.com/fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management