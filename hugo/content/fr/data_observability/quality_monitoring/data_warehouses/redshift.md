---
description: Connectez Amazon Redshift à Datadog Data Observability pour surveiller
  la qualité des données, suivre l'utilisation et détecter les problèmes.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentation
  text: Monitors Data Observability
title: Redshift
---
## Présentation {#overview}

L'intégration Redshift connecte Datadog à votre cluster Amazon Redshift pour synchroniser les métadonnées, l'historique des requêtes et les métriques au niveau des tables. Utilisez-la pour surveiller la fraîcheur des données, détecter les anomalies et suivre la traçabilité dans votre entrepôt et vos outils en aval.

Datadog prend en charge à la fois les clusters Redshift provisionnés et les groupes de travail Redshift Serverless.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Un [compte AWS connecté dans Datadog][3].
  - Le transfert de logs n'est pas requis pour Data Observability.
- Un superutilisateur Redshift ou un utilisateur de base de données qui peut créer des rôles et accorder des privilèges.
- Si votre cluster ou groupe de travail Redshift restreint l'accès réseau par IP, ajoutez les adresses IP des webhooks Datadog aux règles entrantes de votre groupe de sécurité VPC. Pour obtenir la liste des adresses IP, consultez la section `webhooks` du {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Configurez votre compte dans Redshift {#set-up-your-account-in-redshift}

Connectez-vous à votre cluster Redshift en tant que superutilisateur et exécutez les instructions SQL suivantes pour créer un rôle dédié à Datadog.

1. Créez un rôle et accordez l'accès aux vues du catalogue système.

   ```sql
   -- Create a dedicated role for Datadog monitoring
   CREATE ROLE datadog_role;

   -- Required for table size metrics
   GRANT SELECT ON svv_table_info TO ROLE datadog_role;
   ```

2. Accordez un accès en lecture seule à vos données. Choisissez une option.

   {{< tabs >}}
   {{% tab "All schemas (recommandé)" %}}

   Donne à Datadog un accès en lecture à tous les schémas, tables et vues existants et futurs de la base de données, y compris les schémas créés par dbt pour les pull requests. Cette option est requise pour la CI/CD de dbt.

   ```sql
   GRANT USAGE FOR SCHEMAS IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   ```

   {{% /tab %}}
   {{% tab "Schémas spécifiques" %}}

   Exécutez ce qui suit pour chaque schéma que vous souhaitez que Datadog surveille. Cela couvre les tables et vues actuelles et futures du schéma, y compris celles créées par d'autres utilisateurs tels que dbt :

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   ```

   Les schémas créés ultérieurement, tels que les schémas CI dbt, ne sont pas couverts. Pour la CI/CD de dbt, utilisez l'option **All schemas**.

   {{% /tab %}}
   {{< /tabs >}}

3. Créez ou assignez l'utilisateur de base de données Datadog.

   {{< tabs >}}
   {{% tab "Cluster provisionné" %}}

   Créez un utilisateur de base de données dédié et assignez le rôle :

   ```sql
   -- Replace <STRONG_PASSWORD> with a secure password
   CREATE USER datadog_user PASSWORD '<STRONG_PASSWORD>' SYSLOG ACCESS UNRESTRICTED;
   GRANT ROLE datadog_role TO datadog_user;
   ```

   {{% /tab %}}
   {{% tab "Serverless" %}}

   Dans Redshift Serverless, les utilisateurs de base de données sont automatiquement mappés à partir des identités IAM. Par exemple, un rôle IAM nommé `DatadogIntegrationRole` est mappé à l'utilisateur de base de données `IAMR:DatadogIntegrationRole`.

   Accordez le `datadog_role` à votre utilisateur de base de données mappé par IAM :

   ```sql
   GRANT ROLE datadog_role TO "IAMR:<YOUR_IAM_ROLE_NAME>";
   ALTER USER "IAMR:<YOUR_IAM_ROLE_NAME>" SYSLOG ACCESS UNRESTRICTED;
   ```

   {{% /tab %}}
   {{< /tabs >}}

## Configurez les politiques IAM {#configure-iam-policies}

Ajoutez les politiques suivantes au rôle IAM de l'intégration AWS de Datadog associé au compte AWS qui contient votre cluster Redshift.

{{< tabs >}}
{{% tab "Cluster provisionné" %}}

Attachez la politique gérée par AWS `AmazonRedshiftDataFullAccess` et une politique en ligne accordant `redshift:GetClusterCredentials` à l'utilisateur de base de données Datadog créé dans la section précédente :

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentials",
            "Resource": [
                "arn:aws:redshift:<REGION>:<ACCOUNT_ID>:dbuser:<CLUSTER_IDENTIFIER>/datadog_user"
            ]
        }
    ]
}
```

{{% /tab %}}
{{% tab "Serverless" %}}

Attachez la politique gérée par AWS `AmazonRedshiftDataFullAccess` et une politique en ligne accordant `redshift-serverless:GetCredentials` pour votre groupe de travail :

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift-serverless:GetCredentials",
            "Resource": "arn:aws:redshift-serverless:<REGION>:<ACCOUNT_ID>:workgroup/<WORKGROUP_ID>"
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Configurez l'intégration Redshift dans Datadog {#configure-the-redshift-integration-in-datadog}

Pour configurer l'intégration Redshift dans Datadog :

1. Accédez à [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1].
2. Cliquez sur le bouton {{< ui >}}Configure{{< /ui >}} pour l'option Redshift.

   {{< img src="data_observability/redshift/data_obs_redshift_on_integrations_page.png" alt="Redshift sur la page Settings des intégrations Data Observability" style="width:100%;" >}}

3. Sélectionnez un compte AWS connecté ou ajoutez un nouveau compte AWS.

   {{< img src="data_observability/redshift/data_obs_redshift_integration_flow.png" alt="Sélection d'un compte AWS déjà connecté ou d'un nouveau compte AWS pour l'intégration Redshift Data Observability." style="width:100%;" >}}

4. Saisissez les détails de connexion de votre cluster :

   {{< tabs >}}
   {{% tab "Cluster provisionné" %}}

   - {{< ui >}}Cluster identifier{{< /ui >}} : l'identifiant de votre cluster Redshift.
   - {{< ui >}}Region{{< /ui >}} : la région AWS où votre cluster est hébergé (par exemple, `us-east-1`).
   - {{< ui >}}Database user{{< /ui >}} : l'utilisateur Datadog créé lors de la configuration (par exemple, `datadog_user`).
   - {{< ui >}}Initial database{{< /ui >}} : le nom de la base de données à laquelle se connecter (par défaut `dev`).

   {{% /tab %}}
   {{% tab "Serverless" %}}

   - {{< ui >}}Workgroup name{{< /ui >}} : le nom de votre groupe de travail Redshift Serverless.
   - {{< ui >}}Region{{< /ui >}} : la région AWS où votre groupe de travail est hébergé (par exemple, `us-east-1`).
   - {{< ui >}}Initial database{{< /ui >}} : le nom de la base de données à laquelle se connecter (par défaut `dev`).

   {{% /tab %}}
   {{< /tabs >}}

   {{< img src="data_observability/redshift/data_obs_redshift_add_credentials.png" alt="Champs de saisie des identifiants Redshift pour les intégrations Data Observability" style="width:100%;" >}}

5. Cliquez sur {{< ui >}}Add account{{< /ui >}}.

## Étapes suivantes {#next-steps}

Une fois enregistré, Datadog commence à synchroniser votre schéma d'informations et votre historique de requêtes en arrière-plan. Les synchronisations initiales peuvent prendre plusieurs heures selon la taille de votre déploiement Redshift.

Une fois la synchronisation initiale terminée, créez un [Data Observability monitor][2] pour commencer à recevoir des alertes sur la fraîcheur des données, les métriques au niveau des colonnes et les métriques SQL personnalisées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: /fr/monitors/types/data_observability/
[3]: /fr/integrations/amazon-web-services/