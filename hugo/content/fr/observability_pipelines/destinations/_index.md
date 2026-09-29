---
aliases:
- /fr/observability_pipelines/destinations/datadog_apm/
- /fr/observability_pipelines/destinations/opentelemetry/traces/
- /fr/observability_pipelines/destinations/opentelemetry/metrics/
- /fr/observability_pipelines/destinations/prometheus/
description: Découvrez les destinations disponibles pour l'Observability Pipelines
  Worker.
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentation
  text: Pipelines de traitement de logs
title: Destinations
---
## Présentation {#overview}

Utilisez l'Observability Pipelines Worker pour envoyer vos logs et métriques traités vers différentes destinations. La plupart des destinations Observability Pipelines envoient des événements par lots à l'intégration en aval. Consultez [le traitement par lots des événements](#event-batching) pour plus d'informations. Certaines destinations Observability Pipelines disposent également de champs prenant en charge la syntaxe de modèle, ce qui vous permet de définir ces champs en fonction de champs spécifiques. Consultez [la syntaxe de modèle](#template-syntax) pour plus d'informations.

**Remarques** :
- Vous pouvez ajouter un total de 20 destinations pour un pipeline.
- Si vous ajoutez plusieurs destinations du même type à un pipeline, vous devez utiliser [Secrets Management][4]. Par exemple, si vous ajoutez deux destinations de Client HTTP pour deux clients HTTP différents, vous devez utiliser des identifiants de secret pour les URI de Client HTTP. Vous ne pouvez pas utiliser la `DESTINATION_HTTP_CLIENT_URI` par défaut pour stocker les deux URI de Client HTTP différents.

## Destinations {#destinations}

Voici les destinations disponibles :

{{< tabs >}}
{{% tab "Logs" %}}

- [Amazon OpenSearch][1]
- [Amazon S3][22]
- [Amazon Security Lake][3]
- [Azure Storage][4]
- [ClickHouse][24]
- [CrowdStrike Next-Gen SIEM][6]
- [Databricks (Zerobus)][23]
- [Datadog Archives][2]
- [Datadog BYOC Logs][5]
- [Datadog Logs][7]
- [Elasticsearch][8]
- [Google Cloud Storage][10]
- [Google Pub/Sub][11]
- [Google SecOps][9]
- [Client HTTP][12]
- [Kafka][13]
- [Microsoft Sentinel][14]
- [New Relic][15]
- [OpenSearch][16]
- [SentinelOne][17]
- [Socket][18]
- [Splunk HTTP Event Collector (HEC)][19]
- [Collecteur hébergé Sumo Logic][20]
- [Syslog][21]

[1]: /fr/observability_pipelines/destinations/amazon_opensearch/
[2]: /fr/observability_pipelines/destinations/datadog_archives/
[3]: /fr/observability_pipelines/destinations/amazon_security_lake/
[4]: /fr/observability_pipelines/destinations/azure_storage/
[5]: /fr/observability_pipelines/destinations/datadog_byoc_logs/
[6]: /fr/observability_pipelines/destinations/crowdstrike_ng_siem/
[7]: /fr/observability_pipelines/destinations/datadog_logs/
[8]: /fr/observability_pipelines/destinations/elasticsearch/
[9]: /fr/observability_pipelines/destinations/google_secops/
[10]: /fr/observability_pipelines/destinations/google_cloud_storage/
[11]: /fr/observability_pipelines/destinations/google_pubsub/
[12]: /fr/observability_pipelines/destinations/http_client/
[13]: /fr/observability_pipelines/destinations/kafka/
[14]: /fr/observability_pipelines/destinations/microsoft_sentinel/
[15]: /fr/observability_pipelines/destinations/new_relic/
[16]: /fr/observability_pipelines/destinations/opensearch/
[17]: /fr/observability_pipelines/destinations/sentinelone/
[18]: /fr/observability_pipelines/destinations/socket/
[19]: /fr/observability_pipelines/destinations/splunk_hec/logs/
[20]: /fr/observability_pipelines/destinations/sumo_logic_hosted_collector/
[21]: /fr/observability_pipelines/destinations/syslog/
[22]: /fr/observability_pipelines/destinations/amazon_s3/
[23]: /fr/observability_pipelines/destinations/databricks/
[24]: /fr/observability_pipelines/destinations/clickhouse/

{{% /tab %}}

{{% tab "Métriques" %}}

- [Datadog Metrics][1]
- [Elasticsearch][2]
- [Client HTTP/S][3]
- [Splunk HEC][4]

[1]: /fr/observability_pipelines/destinations/datadog_metrics/
[2]: /fr/observability_pipelines/destinations/elasticsearch/
[3]: /fr/observability_pipelines/destinations/http_client/
[4]: /fr/observability_pipelines/destinations/splunk_hec/metrics

{{% /tab %}}
{{< /tabs >}}

## Syntaxe de modèle {#template-syntax}

Les logs sont souvent stockés dans des index distincts en fonction des données de log, telles que le service ou l'environnement dont proviennent les logs ou un autre attribut de log. Dans Observability Pipelines, vous pouvez utiliser la syntaxe de modèle pour acheminer vos logs vers différents index en fonction de champs de log spécifiques.

Lorsque l'Observability Pipelines Worker ne peut pas résoudre le champ avec la syntaxe de modèle, le Worker utilise par défaut un comportement spécifié pour cette destination. Par exemple, si vous utilisez le modèle `{{application_id}}` for the Datadog Archives destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/` et y publie les logs.

Le tableau suivant répertorie les destinations et les champs qui prennent en charge la syntaxe de modèle, et ce qui se passe lorsque le Worker ne peut pas résoudre le champ :

| Destination       | Champs prenant en charge la syntaxe de modèle                        | Comportement lorsque le champ ne peut pas être résolu                                                                                 |
|-------------------|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Index (mode Bulk)<br><br>Type, Dataset, Namespace (mode Data streams) | Le Worker écrit les logs dans l'index `datadog-op`.<br><br>Le Worker supprime les logs si l'un de ces champs ne peut pas être résolu. |
| Datadog Archives  | Préfixe                              | Le Worker crée un dossier nommé `OP_UNRESOLVED_TEMPLATE_LOGS/` et y écrit les logs.                                |
| Azure Blob        | Préfixe                              | Le Worker crée un dossier nommé `OP_UNRESOLVED_TEMPLATE_LOGS/` et y écrit les logs.                                |
| Elasticsearch     | Index (mode Bulk)<br><br>Type, Dataset, Namespace (mode Data streams) | Le Worker écrit les logs dans l'index `datadog-op`.<br><br>Le Worker supprime les logs si l'un de ces champs ne peut pas être résolu. |
| Google Chronicle  | Type de log                            | Utilise par défaut le type de log `DATADOG`.                                                                                            |
| Google Cloud      | Préfixe                              | Le Worker crée un dossier nommé `OP_UNRESOLVED_TEMPLATE_LOGS/` et y écrit les logs.                                |
| Opensearch        | Index (mode Bulk)<br><br>Type, Dataset, Namespace (mode Data streams) | Le Worker écrit les logs dans l'index `datadog-op`.<br><br>Le Worker supprime les logs si l'un de ces champs ne peut pas être résolu. |
| Prometheus*        | ID de locataire                           | Le Worker supprime la métrique.  |
| Splunk HEC        | Index<br>Type de source                | Le Worker envoie les logs à l'index par défaut configuré dans Splunk.<br>Le Worker utilise par défaut le type de source `httpevent`. |

*Le modèle doit avoir un préfixe littéral, tel que `prefix-{{ tenant_id }}` or `prefix/{{ tenant_id }}`. Templates without a literal prefix, such as `{{ tenant_id }}`, sont rejetés ; le Worker enregistre une erreur et le pipeline n'est pas démarré.

#### Exemple {#example}

Si vous souhaitez acheminer des logs en fonction du champ d'ID d'application du log (par exemple, `application_id`) vers la destination Datadog Archives, utilisez la syntaxe des champs d'événement dans le champ **Préfixe à appliquer à toutes les clés d'objet**.

{{< img src="observability_pipelines/amazon_s3_prefix_20250709.png" alt="La destination Datadog Archives affichant le champ de préfixe utilisant la syntaxe des champs d'événement /application_id={{ application_id }}/" style="width:40%;" >}}

### Syntax {#syntax}

#### Champs d'événement {#event-fields}

Utilisez `{{ <field_name> }}` pour accéder aux champs individuels des événements de log. Exemple :

```
{{ application_id }}
```

#### Spécificateurs Strftime {#strftime-specifiers}

Utilisez les [spécificateurs strftime][3] pour la date et l'heure. Exemple :

```
year=%Y/month=%m/day=%d
```

#### Caractères d'échappement {#escape-characters}

Faites précéder un caractère de `\` pour échapper le caractère. Cet exemple échappe la syntaxe des champs d'événement :

```
\{{ field_name }}
```

Cet exemple échappe les spécificateurs strftime :

```
year=\%Y/month=\%m/day=\%d/
```

## Traitement par lots d'événements {#event-batching}

Les destinations Observability Pipelines envoient les événements par lots à l'intégration en aval. Un lot d'événements est envoyé lorsque l'un des paramètres suivants est atteint :

- Nombre maximal d'événements
- Nombre maximal d'octets
- Délai d'expiration (secondes)

Par exemple, si les paramètres d'une destination sont :

- Nombre maximal d'événements = 2
- Nombre maximal d'octets = 100 000
- Délai d'expiration (secondes) = 5

Et la destination reçoit 1 événement dans une fenêtre de 5 secondes, elle vide le lot à l'expiration du délai de 5 secondes.

Si la destination reçoit 3 événements en l'espace de 2 secondes, elle vide un lot contenant 2 événements, puis vide un second lot avec l'événement restant après 5 secondes. Si la destination reçoit 1 événement de plus de 100 000 octets, elle vide ce lot avec cet unique événement.

{{% observability_pipelines/destination_batching %}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers
[4]: /fr/observability_pipelines/configuration/secrets_management/