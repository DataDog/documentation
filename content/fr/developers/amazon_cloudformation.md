---
dependencies:
  - 'https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md'
kind: documentation
title: "Datadog/Amazon\_CloudFormation"
---
​
[AWS CloudFormation][1] vous fournit des modèles afin de décrire, de configurer et de provisionner simultanément toutes les ressources AWS de votre environnement. Les ressources Datadog/AWS CloudFormation vous permettent d’interagir avec les ressources Datadog prises en charge. Pour commencer :

1. Dans votre terminal, utilisez [l'outil aws-cli][2] pour ajouter une ressource Datadog.

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>"
    ```

2. Pour visualiser la version de la ressource que vous venez d'ajouter, exécutez ce qui suit dans votre terminal :

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

3. Définissez cette version comme version `default` en exécutant ce qui suit dans votre terminal :

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

   Assurez-vous de remplacer les paramètres fictifs suivants :
    * `<REGION>` : votre région AWS.
    * `<DATADOG_RESOURCE_NAME>` : le nom de la ressource à ajouter. Consultez le [tableau ci-dessous](#ressources-disponibles) pour vérifier les ressources prises en charge.
    * `<LINK_TO_S3>` : le lien S3 vers la ressource.
      * S3 link : `s3://datadog-cloudformation-resources/<DOSSIER_RESSOURCE>/<DOSSIER_RESSOURCE>-<VERSION_RESSOURCE>.zip`
      * Consultez la section [Ressources disponibles](#ressources-disponibles) pour obtenir des exemples de liens S3 récents pris en charge.
    * `VERSION_ID` : la version sous-jacente de la ressource, telle que spécifiée dans la sortie de la commande à l'étape `2`.

4. Dans votre compte AWS, [créez une pile AWS][3] qui comprend les ressources Datadog ajoutées.

Pour en savoir plus sur les commandes et les workflows disponibles, consultez la [documentation AWS officielle][4].

## Ressources disponibles

Les ressources Datadog suivantes peuvent être ajoutées à votre compte AWS. Consultez la documentation à leur sujet pour découvrir comment les configurer :

| Ressource                | Nom                              | Rôle                                             | Dossier                      | Liens vers le paquet S3              |
|-------------------------|-----------------------------------|---------------------------------------------------------|---------------------------------|-------------------------------|
| Dashboards              | `Datadog::Dashboards::Dashboard`  | [Créer, modifier et supprimer des dashboards Datadog][5]      | `datadog-dashboards-dashboard`  | [Versions du gestionnaire de schémas][6]  |
| Intégration Datadog/AWS | `Datadog::Integrations::AWS`      | [Gérer votre intégration Datadog/Amazon Web Services][7] | `datadog-integrations-aws`      | [Versions du gestionnaire de schémas][8]  |
| Monitors                | `Datadog::Monitors::Monitor`      | [Créer, modifier et supprimer des monitors Datadog][9]       | `datadog-monitors-monitor`      | [Versions du gestionnaire de schémas][10] |
| Downtimes               | `Datadog::Monitors::Downtime`     | [Activer ou désactiver des downtimes pour vos monitors][11]    | `datadog-monitors-downtime`     | [Versions du gestionnaire de schémas][12] |
| Utilisateur                    | `Datadog::IAM::User`              | [Créer et gérer des utilisateurs Datadog][13]                 | `datadog-iam-user`              | [Versions du gestionnaire de schémas][14] |

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[5]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-dashboards-dashboard-handler
[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-dashboards-dashboard-handler/CHANGELOG.md
[7]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[8]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[9]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[10]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[11]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[12]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[13]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[14]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[15]: https://docs.datadoghq.com/fr/help/