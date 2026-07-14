---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Databricks (Zerobus) Destination
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="Rejoignez la version préliminaire !">}}
La destination Databricks (Zerobus) est en version préliminaire. Contactez votre responsable de compte pour demander l'accès.
{{< /callout >}}

## Aperçu {#overview}

Utilisez la destination Databricks (Zerobus) des Observability Pipelines pour envoyer des logs vers une table Unity Catalog. La destination diffuse les journaux vers l'[API d'ingestion Zerobus][1] et s'authentifie auprès de Databricks avec un principal de service OAuth.

## Prérequis {#prerequisites}

Avant de configurer la destination Databricks (Zerobus), vous devez :

- [Configurer un schéma et une table Unity Catalog ](#set-up-a-schema-and-table) auxquels le Worker des Observability Pipelines écrit des journaux.
- [Configurer un principal de service ](#set-up-a-service-principal) que le Worker utilise pour s'authentifier auprès de Databricks. Le principal de service a besoin de permissions pour lire et écrire dans la table.

### Configurer un schéma et une table {#set-up-a-schema-and-table}

Les exemples SQL dans cette section utilisent les espaces réservés suivants :

| Espace réservé               | Description                                | Exemple                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | L'utilisateur qui crée le schéma et la table. | `databricks-user@example.com` |
| `<CATALOG_NAME>`          | Le nom du Unity Catalog.                    | `main`                     |
| `<SCHEMA_NAME>`           | Le nom du schéma.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | Le nom de la table.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (Optionnel) L'URI de l'emplacement géré.       | `s3://your-bucket/managed` |

**Remarque** : Les `GRANT` commandes doivent être exécutées par un administrateur de l'espace de travail Databricks.

Dans l'espace de travail Databricks :

1. Si vous n'êtes pas un administrateur de l'espace de travail Databricks, demandez à un administrateur d'exécuter la commande suivante pour accorder à votre utilisateur la permission de créer un schéma :
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. Créez le schéma :
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. Si vous n'êtes pas un utilisateur administrateur, demandez à un administrateur d'exécuter la commande suivante pour accorder à votre utilisateur la permission de créer une table dans le schéma :
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Exécutez la commande suivante pour créer la table à laquelle les pipelines d'observabilité écrivent les données de journal :
    ```sql
    CREATE TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      host STRING,
      message STRING,
      service STRING,
      source_type STRING,
      timestamp TIMESTAMP
    );
    ```
    - See Databricks' [Create a Unity Catalog Managed Table][3] documentation for more information.

Le nom de la table entièrement qualifié est `catalog.schema.table`, par exemple `main.obs_pipelines.apache_common_logs`. C'est la valeur que vous entrez pour **Nom de la table** lorsque vous configurez la destination Databricks des pipelines d'observabilité.

### Configurez un principal de service {#set-up-a-service-principal}

L'[API d'ingestion Zerobus de Databricks][1] utilise l'authentification OAuth. Lorsque vous créez le principal de service, le secret client OAuth est généré et l'ID client OAuth est l'UUID du principal de service.

Pour créer un principal de service :

1. Dans votre espace de travail Databricks, accédez à **Paramètres utilisateur** > **Identité et accès** > **Principaux de service**.
1. Cliquez sur **Ajouter un principal de service**.
1. Après la création du principal de service, générez un secret OAuth pour celui-ci.
    - Prenez note de l'**ID d'application** du principal de service (ID client) et du secret client OAuth. Vous avez besoin des deux lorsque vous configurez la destination Databricks des pipelines d'observabilité.
1. Exécutez ce SQL dans Databricks pour accorder au principal de service l'accès au catalogue, au schéma et à la table. Remplacez `<SERVICE_PRINCIPAL_UUID>` par l'ID d'application du principal de service de l'étape précédente :
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

Consultez la documentation de Databricks sur [Ajouter des principaux de service à votre compte][4] et [Accorder des permissions sur un objet][5] pour plus d'informations.

## Configuration {#setup}

Configurez la destination Databricks (Zerobus) lorsque vous [mettez en place un pipeline][6]. Vous pouvez mettre en place un pipeline dans l'[UI][7], en utilisant l'[API][8], ou avec [Terraform][9]. Les étapes de cette section sont configurées dans l'UI.

**Remarque** : Les champs de journal qui ne sont pas présents dans le schéma de la table sont supprimés. Par exemple, si un journal a les champs `id`, `name`, et `host`, et que le schéma de la table ne contient que les colonnes `name` et `host`, alors le champ `id` est supprimé et n'est pas écrit dans la table.

Après avoir sélectionné la destination Databricks (Zerobus) dans l'UI du pipeline :

<div class="alert alert-warning">Databricks (Zerobus) ne convertit pas les horodatages au format chaîne en <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"> de Databricks<code>TIMESTAMP</code> type</a>. Si votre table utilise une colonne d'horodatage, consultez <a href="#convert-string-timestamps-to-timestamp-format">Convertir les horodatages de chaîne en format d'horodatage</a> pour plus d'informations.</div>

<div class="alert alert-danger">Pour la gestion des secrets : Entrez uniquement l'identifiant du secret client OAuth. Ne <b>pas</b> entrer la valeur réelle.</div>

{{% observability_pipelines/secrets_env_var_note %}}

1. Entrez le **Point de terminaison d'ingestion** pour votre espace de travail Databricks, tel que `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`. Le Worker envoie des journaux à ce point de terminaison.
1. Entrez le **Nom de la table** au format `catalog.schema.table`, tel que `main.obs_pipelines.apache_common_logs`.
1. Entrez le **Point de terminaison du catalogue Unity** pour votre espace de travail Databricks, tel que `https://<workspace>.cloud.databricks.com`. Le Worker utilise ce point de terminaison pour lire le schéma de la table.
1. Dans le champ **Auth - ID client**, entrez l'ID de l'application du principal de service, tel que `abcdefgh-1234-5678-abcd-ef0123456789`.
1. Dans le champ **Auth - Secret client**, entrez l'identifiant de votre secret client OAuth. Si vous le laissez vide, le [par défaut](#secret-defaults) est utilisé.

### Paramètres optionnels {#optional-settings}

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

### Convertir les horodatages de chaîne en format d'horodatage {#convert-string-timestamps-to-timestamp-format}

Si vos journaux ont des horodatages au format chaîne et que votre table Databricks a une colonne d'horodatage déclarée comme un [`TIMESTAMP` type][11], vous devez convertir la chaîne en format d'horodatage avant d'envoyer les journaux à la destination Databricks (Zerobus). Databricks (Zerobus) ne peut convertir le format d'horodatage qu'en son type `TIMESTAMP`.

Si vous ne convertissez pas l'horodatage de chaîne, le Worker génère une erreur similaire à :

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Pour convertir les horodatages au format chaîne en format d'horodatage :

1. Ajoutez un [Processeur personnalisé][12] à votre pipeline.
1. Ajoutez une fonction avec le script personnalisé suivant :
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## Valeurs par défaut secrètes {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant secret du client OAuth Databricks :
    - Fait référence au secret client OAuth pour le principal de service que le Worker des pipelines d'observabilité utilise pour s'authentifier auprès de Databricks.
    - L'identifiant par défaut est `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Voir [regroupement d'événements][10] pour plus d'informations.

| Événements maximum | Taille maximum (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 10                | 1                   |

[1]: https://docs.databricks.com/aws/en/ingestion/zerobus-overview
[2]: https://docs.databricks.com/aws/en/schemas/create-schema
[3]: https://docs.databricks.com/aws/en/tables/managed#create-a-managed-table
[4]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals#-add-service-principals-to-your-account
[5]: https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/?language=Catalog%C2%A0Explorer#-grant-permissions-on-an-object
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /fr/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /fr/observability_pipelines/destinations/#event-batching
[11]: https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type
[12]: /fr/observability_pipelines/processors/custom_processor#setup
[13]: /fr/observability_pipelines/processors/custom_processor/#parse_timestamp