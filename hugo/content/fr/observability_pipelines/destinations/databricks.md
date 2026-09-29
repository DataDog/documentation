---
description: Apprenez à envoyer des logs vers un tableau Databricks Unity Catalog
  en utilisant la destination Databricks (Zerobus).
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Databricks (Zerobus)
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="Rejoignez la Preview !">}}
La destination Databricks (Zerobus) est en préversion. Contactez votre responsable de compte pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Utilisez la destination Databricks (Zerobus) des Observability Pipelines pour envoyer des logs vers un tableau Databricks Unity Catalog. La destination diffuse les logs vers le [Zerobus Ingest API][1] et s'authentifie auprès de Databricks avec un principal de service OAuth.

## Prérequis {#prerequisites}

Avant de configurer la destination Databricks (Zerobus), vous devez :

- [Configurer un schéma et un tableau Unity Catalog](#set-up-a-schema-and-table) dans lesquels l'Observability Pipelines Worker écrit les logs.
- [Configurer un principal de service](#set-up-a-service-principal) que le Worker utilise pour s'authentifier auprès de Databricks. Le principal de service doit disposer de l'autorisation de lire et d'écrire dans le tableau.

### Configurer un schéma et un tableau {#set-up-a-schema-and-table}

Les exemples SQL de cette section utilisent les espaces réservés suivants :

| Espace réservé               | Description                                | Exemple                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | L'utilisateur qui crée le schéma et le tableau. | `databricks-user@example.com` |
| `<CATALOG_NAME>`          | Le nom du Unity Catalog.                    | `main`                     |
| `<SCHEMA_NAME>`           | Le nom du schéma.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | Le nom du tableau.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (Facultatif) L'URI de l'emplacement géré.       | `s3://your-bucket/managed` |

**Remarque** : Les commandes `GRANT` doivent être exécutées par un administrateur d'espace de travail Databricks.

Dans l'espace de travail Databricks :

1. Si vous n'êtes pas administrateur d'espace de travail Databricks, demandez à un administrateur d'exécuter la commande suivante pour accorder à votre utilisateur l'autorisation de créer un schéma :
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. Créez le schéma :
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. Si vous n'êtes pas un utilisateur administrateur, demandez à un administrateur d'exécuter la commande suivante pour accorder à votre utilisateur l'autorisation de créer un tableau sur le schéma :
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Exécutez la commande suivante pour créer le tableau dans laquelle Observability Pipelines écrit les logs :
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

Le nom complet du tableau est `catalog.schema.table`, par exemple `main.obs_pipelines.apache_common_logs`. C'est la valeur que vous saisissez pour {{< ui >}}Table Name{{< /ui >}} lorsque vous configurez la destination Databricks Observability Pipelines.

### Configurez un principal de service {#set-up-a-service-principal}

Le [Zerobus Ingest API][1] de Databricks utilise l'authentification OAuth. Lorsque vous créez le principal de service, le secret client OAuth est généré et l'ID client OAuth correspond à l'UUID du principal de service.

Pour créer un principal de service :

1. Dans votre espace de travail Databricks, accédez à **Paramètres utilisateur** > **Identité et accès** > **Principaux de service**.
1. Cliquez sur **Ajouter un principal de service**.
1. Une fois le principal de service créé, générez un secret OAuth pour celui-ci.
    - Notez l'**ID d'application** (ID client) du principal de service ainsi que le secret client OAuth. Vous avez besoin des deux pour configurer la destination Databricks d'Observability Pipelines.
1. Exécutez ce SQL dans Databricks pour accorder au principal de service l'accès au catalogue, au schéma et à le tableau. Remplacez `<SERVICE_PRINCIPAL_UUID>` par l'ID d'application du principal de service obtenu à l'étape précédente :
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

Consultez la documentation Databricks [Ajouter des principaux de service à votre compte][4] et [Accorder des autorisations sur un objet][5] pour plus d'informations.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant du secret client OAuth. Ne <b>saisissez pas</b> la valeur réelle.</div>

Configurez la destination Databricks (Zerobus) lorsque vous [configurez un pipeline][6]. Vous pouvez configurer un pipeline dans l'[UI][7], en utilisant l'[API][8] ou avec [Terraform][9]. Les étapes de cette section sont configurées dans l'interface utilisateur.

**Remarque** : les champs de log qui ne sont pas présents dans le schéma du tableau sont supprimés. Par exemple, si un log contient les champs `id`, `name` et `host`, et que le schéma du tableau ne contient que les colonnes `name` et `host`, alors le champ `id` est supprimé et n'est pas écrit dans le tableau.

Après avoir sélectionné la destination Databricks (Zerobus) dans l'interface utilisateur du pipeline :

<div class="alert alert-warning">

<ul>
<li>Databricks (Zerobus) ne convertit pas les horodatages sous forme de chaîne au format <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"> de Databricks<code>TIMESTAMP</code> type</a>. Si votre tableau utilise une colonne d'horodatage, consultez <a href="#convert-string-timestamps-to-timestamp-format">Convertir les horodatages sous forme de chaîne au format horodatage</a> pour plus d'informations.

<li> Les valeurs des champs de log doivent correspondre au type de données de leur colonne correspondante dans le schéma du tableau. Consultez <a href="#data-type-of-log-field-values">Type de données des valeurs de champ de log</a> pour plus d'informations.
</ul>
</div>

1. Saisissez le {{< ui >}}Ingestion Endpoint{{< /ui >}} de votre espace de travail Databricks, tel que `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`. Le Worker envoie les logs à cet endpoint.
1. Saisissez le {{< ui >}}Table Name{{< /ui >}} au format `catalog.schema.table`, tel que `main.obs_pipelines.apache_common_logs`.
1. Saisissez le {{< ui >}}Unity Catalog Endpoint{{< /ui >}} de votre espace de travail Databricks, tel que `https://<workspace>.cloud.databricks.com`. Le Worker utilise cet endpoint pour lire le schéma du tableau.
1. Dans le champ {{< ui >}}Auth - Client ID{{< /ui >}}, saisissez l'ID d'application du principal de service, tel que `abcdefgh-1234-5678-abcd-ef0123456789`.
1. Dans le champ {{< ui >}}Auth - Client Secret{{< /ui >}}, saisissez l'identifiant de votre secret client OAuth. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Convertir les horodatages sous forme de chaîne au format horodatage {#convert-string-timestamps-to-timestamp-format}

Si vos logs contiennent des horodatages sous forme de chaîne et que votre tableau Databricks possède une colonne d'horodatage déclarée en tant que type [`TIMESTAMP`][11], vous devez convertir la chaîne au format horodatage avant d'envoyer les logs vers la destination Databricks (Zerobus). Databricks (Zerobus) ne peut convertir le format d'horodatage qu'en son type `TIMESTAMP`.

Si vous ne convertissez pas l'horodatage sous forme de chaîne, le Worker génère une erreur similaire à :

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Pour convertir les horodatages sous forme de chaîne au format horodatage :

1. Ajoutez un [Processeur personnalisé][12] à votre pipeline.
1. Ajoutez une fonction avec le script personnalisé suivant :
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## Type de données des valeurs de champ de log {#data-type-of-log-field-values}

Les valeurs des champs de log doivent correspondre au type de données de leur colonne correspondante dans le schéma du tableau. Par exemple, si le schéma du tableau définit `message` comme `STRING`, mais que le champ `message` d'un log entrant est un objet, tel que `{"message": {"some": "string"}}`, le Worker ne peut pas encoder l'événement, abandonne le lot entier et génère une erreur similaire à :

```
error=Some(EncodingError { message: "Failed to encode batch: SerializingError(Arrow JSON decoding error: Json error: whilst decoding field 'message': expected string got {...})" }) request_id=1142 error_type="request_failed" stage="sending"
```

Pour éviter cette erreur, utilisez le [Processeur personnalisé][17] afin de convertir les champs de log dans le type de données attendu par le schéma du tableau.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant du secret client OAuth Databricks :
    - Référence le secret client OAuth pour le principal de service que l'Observability Pipelines Worker utilise pour s'authentifier auprès de Databricks.
    - L'identifiant par défaut est `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][14] et les [métriques de tampon de destination][15] émises par toutes les destinations, consultez la documentation sur les [Métriques d'utilisation des pipelines][16]. Pour filtrer ou regrouper par métriques de destination Databricks, utilisez le tag `component_type:databricks_zerobus`.

## Comment fonctionne la destination {#how-the-destination-works}

### Traitement par lots d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][10] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
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
[14]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[15]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[16]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[17]: /fr/observability_pipelines/processors/custom_processor/