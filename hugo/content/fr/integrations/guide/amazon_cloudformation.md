---
aliases:
- /fr/developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
title: Datadog/Amazon CloudFormation
---
​
[AWS CloudFormation][1] vous fournit des modèles afin de décrire, de configurer et de provisionner simultanément toutes les ressources AWS de votre environnement. Les ressources Datadog/AWS CloudFormation vous permettent d’interagir avec les ressources Datadog prises en charge, d'envoyer des ressources à un datacenter Datadog et d'ajouter de façon privée une extension dans n'importe quelle région possédant des ressources Datadog.

Pour accéder à ces ressources, utilisez AWS Management Console (IU) ou l'interface de ligne de commande AWS (CLI).

## AWS Management Console

Pour commencer :

1. Connectez-vous à [AWS Management Console][16] à l'aide de votre compte et accédez à CloudFormation.

2. Sélectionnez Public extensions dans le volet de gauche, puis filtrez l'option Publisher sur Third Party.

3. Utilisez la barre de recherche pour appliquer un filtre basé sur le préfixe « Datadog ».

  Remarque : toutes les ressources Datadog officielles commencent par `Datadog::`. Elles comportent également le message `Published by Datadog`.

4. Sélectionnez le nom de ressource de votre choix pour afficher plus d'informations sur son schéma, puis cliquez sur **Activate**.

5. Sur la page **Extension details**, indiquez les éléments suivants :
  - Le nom de l'extension
  - L'ARN du rôle d'exécution
  - Les mises à jour automatiques pour les versions mineures
  - La configuration

6. Pour la configuration de la ressource, **il est fortement recommandé d'utiliser [AWS Secrets Manager][17] ou un service similaire afin de stocker vos clés d'API et d'application Datadog au lieu d'utiliser du texte en clair.**

  Avec AWS Secrets Manager, vous pouvez pointer de façon dynamique vers vos clés d'API et d'application dans la configuration. Pour en savoir plus, consultez la [documentation AWS[18] (en anglais).

  Par exemple :

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```

7. Une fois votre ressource configurée, [créez une pile AWS][3] qui comprend une ou plusieurs des ressources Datadog activées.

Pour en savoir plus sur les commandes et les workflows disponibles, consultez la [documentation AWS officielle][4] (en anglais).

## Interface de ligne de commande AWS

Pour commencer :

1. Dans votre terminal, utilisez [l'outil aws-cli][2] pour ajouter une ressource Datadog :

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

4. Définissez la nouvelle configuration de ressource ajoutée en exécutant ce qui suit dans votre terminal :

    ```shell
    aws cloudformation set-type-configuration \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --type RESOURCE \
        --configuration '{"DatadogCredentials": {"ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}", "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"}}'
    ```

5. Dans votre compte AWS, [créez une pile AWS][3] qui comprend les ressources Datadog ajoutées.

Pour en savoir plus sur les commandes et les workflows disponibles, consultez la [documentation AWS officielle][4] (en anglais).

## Ressources disponibles

Les ressources Datadog suivantes peuvent être ajoutées à votre compte AWS. Consultez la documentation à leur sujet pour découvrir comment les configurer :

| Ressource                | Nom                              | Description                                             | Dossier                          | Liens vers le paquet S3              |
|-------------------------|-----------------------------------|---------------------------------------------------------|---------------------------------|-------------------------------|
| Dashboards              | `Datadog::Dashboards::Dashboard`  | [Créer, modifier et supprimer des dashboards Datadog][5]      | `datadog-dashboards-dashboard`  | [Versions du gestionnaire de schémas][6]  |
| Intégration Datadog/AWS | `Datadog::Integrations::AWS`      | [Gérer votre intégration Datadog/Amazon Web Services][7] | `datadog-integrations-aws`      | [Versions du gestionnaire de schémas][8]  |
| Monitors                | `Datadog::Monitors::Monitor`      | [Créer, modifier et supprimer des monitors Datadog][9]        | `datadog-monitors-monitor`      | [Versions du gestionnaire de schémas][10] |
| Downtimes               | `Datadog::Monitors::Downtime`     | [Activer ou désactiver des downtimes pour vos monitors][11]     | `datadog-monitors-downtime`     | [Versions du gestionnaire de schémas][12] |
| Utilisateur                    | `Datadog::IAM::User`              | [Créer et gérer des utilisateurs Datadog][13]                  | `datadog-iam-user`              | [Versions du gestionnaire de schémas][14] |
| SLO                    | `Datadog::SLOs::SLO`              | [Créer et gérer des SLO Datadog][19]                   | `datadog-slos-slo`              | [Versions du gestionnaire de schémas][20] |

## Régions prises en charge

Les ressources Datadog/Amazon CloudFormation sont disponibles dans le registre public de CloudFormation dans les régions suivantes :

| Code            | Name                      |
|-----------------|---------------------------|
| us-east-1       | US East (N. Virginia)     |
| us-east-2       | US East (Ohio)            |
| us-west-1       | US West (N. California)   |
| us-west-2       | US West (Oregon)          |
| ap-south-1      | Asia Pacific (Mumbai)     |
| ap-northeast-1  | Asia Pacific (Tokyo)      |
| ap-northeast-2  | Asia Pacific (Seoul)      |
| ap-southeast-1  | Asia Pacific (Singapore)  |
| ap-southeast-2  | Asia Pacific (Sydney)     |
| ca-central-1    | Canada (Central)          |
| eu-central-1    | Europe (Frankfurt)        |
| eu-west-1       | Europe (Ireland)          |
| eu-west-2       | Europe (London)           |
| eu-west-3       | Europe (Paris)            |
| eu-north-1      | Europe (Stockholm)        |
| sa-east-1       | South America (São Paulo) |

**Remarque** : pour ajouter de façon privée une ressource dans une autre région, utilisez les packages fournis.

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
[16]: https://aws.amazon.com/console/
[17]: https://aws.amazon.com/secrets-manager/
[18]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-secretsmanager
[19]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-slos-slo-handler
[20]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-slos-slo-handler/CHANGELOG.md