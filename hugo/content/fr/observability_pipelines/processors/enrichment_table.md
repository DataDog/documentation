---
description: Apprenez à utiliser le processeur Enrichment Table pour ajouter du contexte
  aux logs avec des jeux de données de correspondance.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: Blog
  text: Ajoutez un contexte mis à jour dynamiquement aux logs avec les Reference Tables
    et Observability Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: Blog
  text: Enrichissez les logs avec le contexte ServiceNow CMDB avant de les acheminer
    vers un SIEM ou un outil de journalisation.
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Enrichment Table
---
{{< product-availability >}}

## Présentation {#overview}

Les logs peuvent contenir des informations telles que des adresses IP, des identifiants utilisateur ou des noms de service qui nécessitent souvent un contexte supplémentaire. Avec le processeur Enrichment Table, vous pouvez ajouter du contexte à vos logs en utilisant des jeux de données de correspondance stockés dans les [Reference Tables][1] de Datadog, des fichiers locaux ou des tableaux MaxMind GeoIP. Le processeur fait correspondre les logs en fonction d'une clé spécifiée et ajoute des informations provenant de votre fichier de correspondance au log. Si vous utilisez des Reference Tables, vous pouvez vous connecter à des jeux de données basés sur le SaaS directement stockés dans ServiceNow, Snowflake, S3, et plus encore, pour enrichir vos logs.

Vous pouvez également utiliser le processeur Enrichment Table avec un fichier de correspondance pour mapper des secrets, tels qu'une clé d'API Datadog, des jetons Splunk HEC ou un en-tête personnalisé dans une requête HTTP, afin de filtrer et d'acheminer les logs. Consultez [Utiliser un secret comme attribut source](#use-a-secret-as-a-source-attribute) pour plus d'informations.

### Quand utiliser ce processeur {#when-to-use-this-processor}

Voici des cas d'utilisation pour l'enrichissement des logs provenant d'intégrations.

#### Stockage d'objets cloud {#cloud-object-storage}

Les services de stockage d'objets cloud (Amazon S3, Azure Blob Storage, Google Cloud Storage) sont des services de stockage évolutifs pour de grands volumes de données de référence structurées et non structurées.

Utilisez le processeur Enrichment Table pour enrichir les logs avec des jeux de données de référence gérés en externe, tels que des flux de cyber-menaces, des listes d'autorisation et de refus, des inventaires d'actifs, des mappages de conformité stockés sous forme de CSV, ou d'autres types de fichiers mis à jour régulièrement.

#### Databricks {#databricks}

Databricks est un data lakehouse basé sur le cloud utilisé pour l'apprentissage automatique (ML), l'analyse avancée et les charges de travail Big Data.

Utilisez le processeur Enrichment Table pour :
- Ajouter des prédictions ou des scores générés par des modèles de ML, tels que les probabilités de fraude et les résultats de détection d'anomalies.
- Jeux de données de référence stockés dans Databricks, tels que des profils clients, des informations sur les appareils ou des informations de sécurité.

Dans la documentation d'intégration Databricks de Datadog, consultez [Configuration des Reference Tables][6] pour savoir comment configurer les Reference Tables pour Databricks.

#### Salesforce {#salesforce}

Salesforce est un outil de gestion de la relation client (CRM) utilisé pour suivre et stocker les opportunités de vente, les comptes, les contacts, les transactions et les contrats.

Utilisez le processeur Enrichment Table pour :
- Ajoutez les informations sur le client et le compte, telles que le type d'industrie, l'ARR et le propriétaire, aux logs opérationnels pour hiérarchiser les incidents.
- Enrichissez les dashboards axés sur le marketing ou les ventes avec des signaux opérationnels tels que les pics de latence liés aux clients.

Dans la documentation de l'intégration Salesforce de Datadog, consultez [Activer l'ingestion des Reference Tables][2] pour obtenir des informations sur la configuration des Reference Tables pour Salesforce.

#### ServiceNow (CMDB) {#servicenow-cmdb}

ServiceNow est une plateforme de gestion des services informatiques dotée d'une base de données de gestion de configuration (CMDB) qui suit les actifs d'infrastructure, les applications et les dépendances.

Utilisez le processeur Enrichment Table pour :
- Enrichissez les logs avec le contexte de propriété et de dépendance de l'infrastructure, tel que l'équipe propriétaire de l'host et l'unité commerciale que cette équipe prend en charge.
- Ajoutez des informations directement à partir des enregistrements CMDB à la télémétrie.

Dans la documentation de l'intégration CMDB ServiceNow de Datadog, consultez [Reference Tables][7] pour obtenir des informations sur la configuration des Reference Tables pour la CMDB ServiceNow.

#### Snowflake {#snowflake}

Snowflake est un entrepôt/lac de données natif du cloud qui centralise les données structurées et semi-structurées.

Utilisez le processeur Enrichment Table pour :
- Ajoutez des métadonnées client (niveau de compte, région, SLA) aux logs.
- Associez les événements de sécurité aux attributs d'utilisateur ou d'actif stockés dans Snowflake.

Dans la documentation de l'intégration Snowflake de Datadog, consultez [Reference Tables][3] pour obtenir des informations sur la configuration des Reference Tables pour Snowflake.

## Configuration {#setup}

Pour configurer le processeur Enrichment Table :

1. Cliquez sur {{< ui >}}Add enrichment{{< /ui >}}.
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Syntaxe de recherche de logs][8] pour plus d'informations.
   - Seuls les logs correspondant au filtre sont envoyés via le processeur.
   - Tous les logs, qu’ils correspondent ou non à la requête de filtrage, sont envoyés à l’étape suivante du pipeline.
1. Dans la section {{< ui >}}Set lookup mapping{{< /ui >}}, sélectionnez le type de jeu de données de correspondance que vous souhaitez utiliser.
  {{< tabs >}}
  {{% tab "Reference Table" %}}

  1. Sélectionnez le Reference Table dans le menu déroulant. Consultez [Utilisation des Reference Tables](#using-reference-tables) pour plus d'informations.
  1. Cliquez sur {{< ui >}}Manage{{< /ui >}} pour accéder à la page de configuration des Reference Tables.
  1. (Facultatif) Sélectionnez des colonnes spécifiques avec lesquelles enrichir vos logs.
      - Par défaut, Observability Pipelines enrichit les logs avec toutes les colonnes du tableau. Chaque colonne du tableau est ajoutée en tant qu'attribut au log, où le nom de l'attribut est le nom de la colonne et la valeur de l'attribut est la valeur de la colonne.
      - Si vous souhaitez enrichir vos logs avec des colonnes spécifiques de votre Reference Table, sélectionnez les attributs correspondant aux colonnes dans le menu déroulant.
  1. Saisissez un identifiant de clé d'application Datadog. Observability Pipelines utilise des [clés d'application][1] pour accéder à l'API programmatique de Datadog lors de l'enrichissement des données. Assurez-vous que votre clé d'application est :
      - Associée à un [compte de service][2] (et non à un compte utilisateur Datadog personnel).
      - Limitée au périmètre [`reference_tables_read`][3].
  1. Saisissez l'attribut source du log. La valeur de l'attribut source est ce que vous souhaitez qu'Observability Pipelines trouve dans le Reference Table. Consultez l'[exemple d'enrichissement](#enrichment-example) pour plus d'informations.
  1. Saisissez l'attribut cible. La valeur de l'attribut cible stocke, sous forme d'objet JSON, les informations trouvées dans le Reference Table. Consultez l'[exemple de fichier d'enrichissement](#enrichment-file-example) pour plus d'informations.
  1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: /fr/account_management/api-app-keys/#application-keys
[2]: /fr/account_management/org_settings/service_accounts#service-account-application-keys
[3]: /fr/account_management/rbac/permissions/#reference-tables

  {{% /tab %}}
  {{% tab "Fichier" %}}

  1. Saisissez le chemin d'accès au fichier.
      - **Remarque** : Tous les chemins de fichiers sont relatifs au répertoire de données de configuration, qui est `/var/lib/observability-pipelines-worker/config/` par défaut. Le fichier doit appartenir à l'utilisateur `observability-pipelines-worker group` et `observability-pipelines-worker`, ou être au moins lisible par le groupe ou l'utilisateur. Voir [Configurations avancées des workers][1] pour plus d'informations.
  1. Saisissez le nom de la colonne. Le nom de la colonne dans le tableau d'enrichissement est utilisé pour faire correspondre la valeur de l'attribut source. Consultez l'[exemple d'enrichissement](#enrichment-example) pour plus d'informations.
  1. ({{< tooltip glossary="aperçu" case="title" >}}) Si vous utilisez un secret comme attribut source, activez {{< ui >}}Use Secret as source attribute{{< /ui >}} pour l'activer.
      - Sélectionnez le type de secret ({{< ui >}}Datadog API Key{{< /ui >}} ou {{< ui >}}Splunk HEC token{{< /ui >}}).
      - Consultez [l'exemple d'utilisation d'un secret comme attribut source](#use-a-secret-as-a-source-attribute) pour plus d'informations.
  1. Si vous n'utilisez pas de secret, saisissez l'attribut source du log. La valeur de l'attribut source est utilisée comme clé pour correspondre au nom de colonne dans votre fichier local.
  1. Saisissez l'attribut cible. La valeur de l'attribut cible stocke les informations trouvées dans le fichier sous forme d'objet JSON.
  1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{% tab "GeoIP" %}}

  1. Pour GeoIP, saisissez le chemin GeoIP vers votre fichier `.mmdb` relatif au répertoire `<DD_OP_DATA_DIR>/config`.
      - **Remarque** : Tous les chemins de fichiers sont relatifs au répertoire de données de configuration, qui est `/var/lib/observability-pipelines-worker/config/` par défaut. Le fichier doit appartenir à l'utilisateur `observability-pipelines-worker group` et `observability-pipelines-worker`, ou être au moins lisible par le groupe ou l'utilisateur. Voir [Configurations avancées des workers][1] pour plus d'informations.
  1. Saisissez l'attribut source du log. La valeur de l'attribut source est ce que vous souhaitez qu'Observability Pipelines trouve dans le Reference Table. Consultez l'[exemple de fichier d'enrichissement](#enrichment-file-example) pour plus d'informations.
  1. Saisissez l'attribut cible. La valeur de l'attribut cible stocke les informations trouvées dans le Reference Table sous forme d'objet JSON. Consultez l'[exemple de fichier d'enrichissement](#enrichment-file-example) pour plus d'informations.
  1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  {{% /tab %}}
  {{< /tabs >}}

### Exemple d'enrichissement {#enrichment-example}

Pour cet exemple:

- Il s'agit du Reference Table ou du fichier utilisé par le processeur d'enrichissement :
  | merch_id | merchant_name   | city      | state    |
  | -------- | --------------- | --------- | -------- |
  | 803      | Andy's Ottomans | Boise     | Idaho    |
  | 536      | Cindy's Couches | Boulder   | Colorado |
  | 235      | Debra's Benches | Las Vegas | Nevada   |
- `merchant_id` est utilisé comme attribut source et `merchant_info` comme attribut cible.
- `merch_id` est défini comme le nom de colonne que le processeur utilise pour trouver la valeur de l'attribut source. **Remarque**: La valeur de l'attribut source n'a pas besoin de correspondre au nom de la colonne.

Si le processeur d'enrichissement reçoit un log avec `"merchant_id":"536"`:

- Le processeur recherche la valeur `536` dans la colonne `merch_id` du Reference Table.
- Une fois la valeur trouvée, il ajoute la ligne entière d'informations du Reference Table à l'attribut `merchant_info` sous forme d'objet JSON :

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

### Utiliser un secret comme attribut source {#use-a-secret-as-a-source-attribute}

Pour l'option de recherche de fichier, vous pouvez activer {{< ui >}}Use Secret as source attribute{{< /ui >}} pour mapper vers un secret, tel qu'une clé d'API Datadog, un jeton Splunk HEC ou un en-tête personnalisé dans une requête HTTP, dans votre fichier CSV local. Le secret est utilisé comme clé pour correspondre au nom de colonne dans votre fichier local.

**Remarque**: Si vous souhaitez mapper vers des jetons Splunk HEC, vous devez utiliser une [source Splunk HEC][9] et activer {{< ui >}}Store HEC token{{< /ui >}} sur la source.

#### Exemple Splunk HEC {#splunk-hec-example}

Par exemple, si vous souhaitez filtrer et acheminer les logs en fonction des jetons Splunk HEC :

1. Activez {{< ui >}}Store HEC token{{< /ui >}} sur la source Splunk HEC pour stocker le jeton dans les métadonnées de l'événement.
1. Utilisez l'option de recherche de fichier dans le processeur Enrichment Table pour utiliser le jeton HEC stocké dans les métadonnées de l'événement comme clé de recherche. Le Worker enrichit l'événement afin que vous puissiez filtrer et acheminer les logs en fonction de cette valeur.

Exemple d'un fichier CSV de recherche local avec des jetons Splunk HEC mappés à une valeur :

| Jeton Splunk HEC (secret) | Valeur du jeton HEC |
| ------------------------- | --------------- |
| `abcdef`                  | `hec_token_one` |
| `uvwxyz`                  | `hec_token_two` |

Pour cet exemple, saisissez `Splunk HEC token (secret)` comme nom de colonne lors de la configuration du processeur. Si `token_value` est le chemin d'attribut cible, il s'agit de la valeur du jeton HEC ajoutée à un log d'exemple :

```
{
  "message": "this is a test"
  "token_value": "hec_token_one"
}

```

Vous pouvez filtrer et acheminer les logs en fonction de `token_value: hec_token_one`.

## Métriques de santé {#health-metrics}

### Métriques du processeur {#processor-metrics}

Pour voir les métriques concernant votre processeur Enrichment Table, ajoutez les tags `component_type=enrichment_table` et `component_id=<processor_id>` aux métriques du processeur :

`pipelines.enrichment_rows_not_found_total`
: Nombre de logs traités qui n'ont pas de lignes correspondantes dans le tableau.

`pipelines.component_errors_total`
: Nombre de logs qui ne peuvent pas être enrichis en raison d'une erreur. Ces erreurs sont signalées avec le tag `error_code=did_not_enrich_event`.
: Le tag `reason` peut contenir les valeurs suivantes : <br>- `target_exists`: La valeur cible pour stocker les données enrichies existe déjà et n'est pas un objet.<br>- `too_many_pending_lookups`: La mémoire tampon ou la file d'attente de recherche est pleine.<br>- `lookup_failed`: La clé de recherche n'a pas été trouvée dans le log, n'est pas une chaîne ou n'est pas un entier.

### Métriques de la mémoire tampon (lors de l'utilisation de Reference Tables) {#buffer-metrics-when-using-reference-tables}

Le tampon du processeur Enrichment Table n'est activé que lors de l'enrichissement à partir d'un Reference Table.

Pour voir les métriques de tampon de votre processeur Enrichment Table, ajoutez ces tags aux métriques de tampon :

- `component_type=enrichment_table`
- `component_id=<processor_id>`
- `buffer_id=enrichment_table_buffer`

`pipelines.buffer_events`
: **Description**: Nombre d'événements dans le tampon du processeur.
: **Type de métrique**: jauge

`pipelines.buffer_size_bytes`
: **Description**: Nombre d'octets dans le tampon du processeur.
: **Type de métrique**: jauge

`pipelines.buffer_received_events_total`
: **Description**: Événements reçus par le tampon du processeur.
: **Type de métrique**: compteur

`pipelines.buffer_received_bytes_total`
: **Description**: Octets reçus par le tampon du processeur.
**Type de métrique** : compteur

`pipelines.buffer_sent_events_total`
: **Description** : Événements envoyés en aval par le tampon du processeur.
**Type de métrique** : compteur

`pipelines.buffer_sent_bytes_total`
: **Description** : Octets envoyés en aval par le tampon du processeur.
**Type de métrique** : compteur

### Métriques du Reference Table {#reference-table-metrics}

Pour voir les métriques concernant votre processeur Enrichment Table utilisant une Reference Table, ajoutez les tags `component_type:enrichment_table` et `component_id=<processor_id>` aux métriques ci-dessous. Le tag `reference_table_id:<table_uuid>` peut également être utilisée pour agréger les données de tous les processeurs utilisant la même Reference Table.

`pipelines.enrichment_rows_not_found_total`
: Ce compteur est incrémenté pour chaque log traité qui ne possède pas de ligne correspondante dans le tableau. Disponible dans la version 2.14 et ultérieure de Worker.

`pipelines.enrichment_cache_hits_total`
: Nombre de succès de cache, c'est-à-dire les logs qui ont pu être enrichis sans être mis en tampon.

`pipelines.enrichment_cache_misses_total`
: Nombre de défauts de cache, c'est-à-dire les logs qui ont nécessité une mise en mémoire tampon et l'envoi d'une requête à l'API Reference Tables.

`pipelines.component_errors_total`
: Nombre de logs qui ne peuvent pas être enrichis en raison d'une erreur. Ces erreurs sont signalées avec le tag `error_code=did_not_enrich_event`.
: Le tag `reason` peut contenir les valeurs suivantes :<br>- `target_exists` : La valeur cible pour stocker les données enrichies existe déjà et n'est pas un objet.<br>- `too_many_pending_lookups` : La mémoire tampon ou la file d'attente de recherche est pleine.<br>- `lookup_failed` : La clé de recherche n'a pas été trouvée dans le log, n'est pas une chaîne ou un entier.<br>- `reference_table_read_error` : Des erreurs irrécupérables ou trop d'erreurs consécutives se sont produites lors de la tentative de lecture de la Reference Table.


Les métriques ci-dessous sont communes à tous les processeurs consommant la même Reference Table et utilisent les tags `component_type:enrichment_table`, `component_id=reference_table_<table_uuid>` et `reference_table:<table_uuid>`.

`pipelines.reference_table_cached_rows`
: Cette métrique de jauge rapporte le nombre de lignes stockées dans le cache local. Le tag `found:true` rapporte les lignes existant dans le tableau, et `found:false` rapporte les lignes qui n'existent pas dans le tableau.

`pipelines.reference_table_queued_keys`
: Cette métrique de jauge rapporte le nombre de clés de ligne en attente d'être lues depuis l'API Reference Tables. La file d'attente a une capacité maximale de 5 000 clés. Lorsqu'un log tente d'insérer une clé qui dépasserait cette limite, le log est immédiatement envoyé en aval sans enrichissement.

`pipelines.reference_table_fetched_keys_total`
: Pour chaque requête envoyée à l'API Reference Tables, ce compteur est incrémenté du nombre de lignes récupérées dans cette requête.

## Fonctionnement du processeur {#how-the-processor-works}

### Utilisation des Reference Tables {#using-reference-tables}

[Reference Tables][4] vous permettent de stocker des informations telles que les détails des clients, les listes d'actifs et les informations sur les dépendances de service dans Datadog. Le processeur Enrichment Table extrait les lignes des Reference Tables à la demande et les met en cache localement. Les lignes de tableau persistent dans le cache pendant environ 10 minutes (30 minutes pour une recherche négative, lorsque la ligne n'a pas été trouvée dans le tableau). Après cela, elles sont supprimées ou actualisées.

Lorsque le processeur rencontre un log qui n'a pas de ligne correspondante dans le cache, les données du log sont mises en mémoire tampon jusqu'à ce que la ligne soit récupérée de la Reference Table. Si la mémoire tampon atteint sa capacité maximale (20 000 événements), elle commence à envoyer les logs mis en mémoire tampon les plus anciens en aval sans enrichissement. Le processeur n'exerce pas de contre-pression en amont.

Une demande de lecture des Reference Tables est envoyée chaque seconde ou lorsque 250 clés sont mises en file d'attente pour une recherche.

Si une erreur d'authentification se produit lors de la connexion au Reference Table ou après une série de demandes infructueuses, Datadog vide les logs mis en mémoire tampon en aval sans enrichissement, afin d'éviter que les logs n'attendent indéfiniment, et la mémoire tampon cesse d'accepter de nouveaux logs. Le processeur réessaie périodiquement les demandes et reprend automatiquement ses opérations normales lorsqu'une demande aboutit.

Si une erreur entraînant l'envoi d'un log sans enrichissement se produit, vous pouvez la consulter dans les logs du Worker. Il incrémente également la métrique [`pipelines.component_errors_total`](#processor-metrics).

Datadog déconseille d'utiliser le processeur sur un champ de log à cardinalité élevée (de l'ordre de 10 000 valeurs possibles ou plus dans un intervalle de 10 minutes). L'API des Reference Tables est soumise à des limites de débit et peut refuser les demandes du Worker. Contactez [Datadog support][5] si vous continuez à remarquer des avertissements de limite de débit dans les logs du Worker lors de l'exécution du processor.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/reference_tables/?tab=cloudstorage
[2]: /fr/integrations/salesforce/#optional-enable-ingestion-of-reference-tables
[3]: /fr/integrations/snowflake-web/#reference-tables
[4]: https://docs.datadoghq.com/fr/reference_tables/?tab=cloudstorage#reference-table-limits
[5]: /fr/help/
[6]: /fr/integrations/databricks/?tab=useaserviceprincipalforoauth#reference-table-configuration
[7]: /fr/integrations/guide/servicenow-cmdb-enrichment-setup/#reference-tables
[8]: /fr/observability_pipelines/search_syntax/logs/
[9]: /fr/observability_pipelines/sources/splunk_hec/?tab=secretsmanagement