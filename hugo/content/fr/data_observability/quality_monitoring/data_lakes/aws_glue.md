---
description: Connectez AWS Glue à Datadog Data Observability pour surveiller les métadonnées,
  la fraîcheur et la qualité des tables Iceberg.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /integrations/amazon-web-services/
  tag: Documentation
  text: Intégration AWS
- link: /monitors/types/data_observability/
  tag: Documentation
  text: Monitors Data Observability
title: Tables Iceberg (AWS Glue)
---
## Présentation {#overview}

Si vous [utilisez le framework Iceberg dans AWS Glue][5], vous pouvez voir les métadonnées de vos tables Iceberg dans Datadog via l'[intégration AWS Glue][6]. Utilisez ces données pour surveiller les schémas de table, la fraîcheur des données, le nombre de lignes et la taille des tables.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Un compte AWS avec des tables Glue Iceberg que vous souhaitez surveiller.
- Un [compte AWS connecté dans Datadog][1].
  - Le transfert de logs n'est pas requis pour Data Observability.
- Des autorisations IAM pour modifier les politiques du rôle Datadog.
- (Facultatif) Accès à AWS Lake Formation si vous l'utilisez pour gérer les autorisations de table.

## Configurez le compte AWS {#configure-the-aws-account}

1. Accédez à [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][2].
2. Cliquez sur {{< ui >}}Configure{{< /ui >}} à côté d'AWS Glue.

   {{< img src="data_observability/aws_glue/settings-configure-button.png" alt="Option de configuration AWS Glue sur la page des paramètres de Data Observability" style="width:100%;" >}}

3. Sélectionnez un compte AWS existant déjà connecté à Datadog, ou ajoutez-en un nouveau. Pour obtenir de l'aide sur l'ajout d'un nouveau compte, consultez la [documentation de l'intégration AWS][1].

   {{< img src="data_observability/aws_glue/account-selection.png" alt="Menu déroulant de sélection de compte AWS dans le flux de configuration" style="width:100%;" >}}

## Ajoutez les autorisations IAM requises {#add-required-iam-permissions}

Le crawler Data Observability nécessite des autorisations supplémentaires pour surveiller les tables Glue Iceberg. Attachez la politique suivante au rôle IAM Datadog configuré pour votre intégration AWS :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetCatalog",
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetJobRun",
        "glue:GetJobRuns",
        "glue:GetJob",
        "glue:GetJobs",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetTags",
        "glue:ListJobs",
        "s3:ListBucket",
        "kms:Decrypt",
        "lakeformation:GetDataAccess"
      ],
      "Resource": ["*"]
    },
    {
      "Sid": "AllowIcebergMetadataOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::*/metadata/*"
      ]
    }
  ]
}
```

### (Facultatif) Restreindre l'accès à des bases de données et des tables spécifiques {#optional-restrict-access-to-specific-databases-and-tables}

La politique ci-dessus accorde l'accès à toutes les ressources Glue. Pour surveiller uniquement des bases de données ou des tables spécifiques, remplacez `Resource: ["*"]` dans l'exemple de politique ci-dessus par les ARN explicites des bases de données ou des tables à surveiller.

Les autorisations IAM AWS Glue sont hiérarchiques. Pour accéder à une table, la politique doit inclure le catalogue, la base de données et la table. L'omission de n'importe quel niveau entraîne une erreur d'accès refusé.

| Ressource | Format ARN | Exemple |
|----------|------------|---------|
| Catalogue | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:catalog` | `arn:aws:glue:us-east-1:123456789012:catalog` |
| Base de données | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:database/<DB_NAME>` | `arn:aws:glue:us-east-1:123456789012:database/analytics` |
| Table | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:table/<DB_NAME>/<TABLE_NAME>` | `arn:aws:glue:us-east-1:123456789012:table/analytics/events` |

#### Exemples de politiques {#example-policies}

{{< tabs >}}
{{% tab "Bases de données spécifiques" %}}

Pour surveiller toutes les tables dans des bases de données spécifiques, incluez le catalogue, chaque base de données et un caractère générique pour les tables dans ces bases de données :

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:database/analytics_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/*",
    "arn:aws:glue:us-east-1:123456789012:table/analytics_db/*"
  ]
}
```

{{% /tab %}}
{{% tab "Tables spécifiques" %}}

Pour surveiller uniquement des tables spécifiques, listez chaque table explicitement. Vous pouvez également utiliser des caractères génériques pour faire correspondre des modèles de noms de table :

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/orders",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/customers",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/events_*"
  ]
}
```

Le caractère générique `events_*` correspond à des tables comme `events_clicks`, `events_purchases` et toute autre table commençant par `events_`.

{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations, consultez les [exemples de politiques basées sur l'identité AWS Glue][4].

## (Facultatif) Configurer l'accès à Lake Formation {#optional-configure-lake-formation-access}

Si vous utilisez AWS Lake Formation pour gérer l'accès à vos tables de catalogue Glue, accordez au rôle Datadog l'accès aux bases de données et aux tables que vous souhaitez surveiller.

{{< tabs >}}
{{% tab "AWS CLI" %}}

Utilisez les commandes suivantes en remplaçant les valeurs de substitution par votre ID de compte, nom de rôle, nom de base de données et compartiment S3 réels :

```bash
PRINCIPAL=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<YOUR_DATADOG_ROLE_NAME>

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"Database":{"Name":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"TableWildcard":{"DatabaseName":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"DataLocation":{"ResourceArn":"arn:aws:s3:::<YOUR_S3_BUCKET_NAME>"}}' \
  --permissions DATA_LOCATION_ACCESS
```

{{% /tab %}}
{{% tab "Console AWS" %}}

1. Dans la console AWS, accédez à {{< ui >}}Lake Formation{{< /ui >}} > {{< ui >}}Data lake permissions{{< /ui >}}.
2. Cliquez sur {{< ui >}}Grant{{< /ui >}}.
3. Sous {{< ui >}}Principals{{< /ui >}}, sélectionnez {{< ui >}}IAM users and roles{{< /ui >}} et choisissez votre rôle Datadog.
4. Sous {{< ui >}}LF-Tags or catalog resources{{< /ui >}}, sélectionnez la base de données et les tables que vous souhaitez surveiller.
5. Sous {{< ui >}}Permissions{{< /ui >}}, sélectionnez {{< ui >}}DESCRIBE{{< /ui >}} et {{< ui >}}SELECT{{< /ui >}}.
6. Cliquez sur {{< ui >}}Grant{{< /ui >}}.

{{< img src="data_observability/aws_glue/lakeformation-permissions.png" alt="Boîte de dialogue d'octroi des autorisations Lake Formation dans la console AWS" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Configurez le crawler {#configure-the-crawler}

1. Sélectionnez les régions AWS où se trouvent vos tables Glue Iceberg.
2. Activez le commutateur {{< ui >}}Quality Monitoring for Apache Iceberg{{< /ui >}}.
3. (Facultatif) Activez le commutateur {{< ui >}}Job Monitoring{{< /ui >}} si vous souhaitez également surveiller l'état et les performances des jobs Glue.
4. Choisissez une fréquence de synchronisation.

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="Configuration du crawler affichant la sélection de la région et les options de fréquence de synchronisation" style="width:100%;" >}}

5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Étapes suivantes {#next-steps}

Une fois la configuration terminée, Datadog commence à synchroniser les métadonnées de vos tables Glue Iceberg en arrière-plan. Les synchronisations initiales peuvent prendre jusqu'à une heure selon le nombre de tables dans votre catalogue.

Une fois la synchronisation terminée, vos tables apparaissent dans le [Data Catalog][3]. Vous pouvez également créer un [Data Observability monitor][7] pour commencer à recevoir des alertes sur la fraîcheur et le nombre de lignes.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/data-obs/settings/integrations
[3]: https://app.datadoghq.com/data-obs/catalog?integration=awsglue%2Fdatabase_account
[4]: https://docs.aws.amazon.com/glue/latest/dg/security_iam_id-based-policy-examples.html
[5]: https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html
[6]: /fr/integrations/amazon-glue/
[7]: /fr/monitors/types/data_observability/