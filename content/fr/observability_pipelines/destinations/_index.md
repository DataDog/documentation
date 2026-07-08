---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentation
  text: Pipelines de traitement de logs
title: Destinations
---
## Aperçu {#overview}

Utilisez le Worker des Pipelines d'Observabilité pour envoyer vos journaux et métriques traités ({{< tooltip glossary="aperçu" case="title" >}}) vers différentes destinations. La plupart des destinations des Pipelines d'Observabilité envoient des événements par lots à l'intégration en aval. Voir [Regroupement d'événements](#event-batching) pour plus d'informations. Certaines destinations des Pipelines d'Observabilité ont également des champs qui supportent la syntaxe de modèle, vous pouvez donc définir ces champs en fonction de champs spécifiques. Voir [Syntaxe de modèle](#template-syntax) pour plus d'informations.

Sélectionnez une destination dans le menu de navigation à gauche pour voir plus d'informations à son sujet.

## Destinations {#destinations}

Voici les destinations disponibles :

{{< tabs >}}
{{% tab "Logs" %}}

- [Amazon OpenSearch][1]
- [Amazon S3][22]
- [Amazon Security Lake][3]
- [Azure Storage][4]
- [CrowdStrike Next-Gen SIEM][6]
- [Databricks (Zerobus)][23]
- [Datadog Archives][2]
- [Datadog BYOC Logs][5]
- [Datadog Logs][7]
- [Elasticsearch][8]
- [Google Cloud Storage][10]
- [Google Pub/Sub][11]
- [Google SecOps][9]
- [HTTP Client][12]
- [Kafka][13]
- [Microsoft Sentinel][14]
- [New Relic][15]
- [OpenSearch][16]
- [SentinelOne][17]
- [Socket][18]
- [Splunk HTTP Event Collector (HEC)][19]
- [Sumo Logic Hosted Collector][20]
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
[19]: /fr/observability_pipelines/destinations/splunk_hec/
[20]: /fr/observability_pipelines/destinations/sumo_logic_hosted_collector/
[21]: /fr/observability_pipelines/destinations/syslog/
[22]: /fr/observability_pipelines/destinations/amazon_s3/
[23]: /fr/observability_pipelines/destinations/databricks/

{{% /tab %}}

{{% tab "Metrics" %}}

- [Datadog Metrics][1]
- [Elasticsearch][2]
- [HTTP/S Client][3]

[1]: /fr/observability_pipelines/destinations/datadog_metrics/
[2]: /fr/observability_pipelines/destinations/elasticsearch/
[3]: /fr/observability_pipelines/destinations/http_client/

{{% /tab %}}
{{< /tabs >}}

## Syntaxe de modèle {#template-syntax}

Les journaux sont souvent stockés dans des index séparés en fonction des données de journal, telles que le service ou l'environnement d'où proviennent les journaux ou un autre attribut de journal. Dans les Pipelines d'Observabilité, vous pouvez utiliser la syntaxe de modèle pour acheminer vos journaux vers différents index en fonction de champs de journal spécifiques.

Lorsque le Worker des Pipelines d'Observabilité ne peut pas résoudre le champ avec la syntaxe de modèle, le Worker applique le comportement spécifié pour cette destination. Par exemple, si vous utilisez le modèle `{{application_id}}` for the Datadog Archives destination's **Prefix** field, but there isn't an `application_id` field in the log, the Worker creates a folder called `OP_UNRESOLVED_TEMPLATE_LOGS/` et publie les journaux là-bas.

Le tableau suivant répertorie les destinations et les champs qui prennent en charge la syntaxe de modèle, ainsi que ce qui se passe lorsque le Worker ne peut pas résoudre le champ :

| Destination       | Champs qui prennent en charge la syntaxe de modèle | Comportement lorsque le champ ne peut pas être résolu                                                                                 |
|-------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Amazon Opensearch | Index                               | Le Worker écrit des journaux dans l'index `datadog-op`.                                                                          |
| Datadog Archives  | Préfixe                              | Le Worker crée un dossier nommé `OP_UNRESOLVED_TEMPLATE_LOGS/` et y écrit les journaux.                                |
| Azure Blob        | Préfixe                              | Le Worker crée un dossier nommé `OP_UNRESOLVED_TEMPLATE_LOGS/` et y écrit les journaux.                                |
| Elasticsearch     | Index                               | Le Worker écrit des journaux dans l'index `datadog-op`.                                                                          |
| Google Chronicle  | Type de journal                            | Par défaut, le type de journal est `DATADOG`.                                                                                            |
| Google Cloud      | Préfixe                              | Le Worker crée un dossier nommé `OP_UNRESOLVED_TEMPLATE_LOGS/` et y écrit les journaux.                                |
| Opensearch        | Index                               | Le Worker écrit des journaux dans l'index `datadog-op`.                                                                          |
| Splunk HEC        | Index<br>Type de source                | Le Worker envoie les journaux à l'index par défaut configuré dans Splunk.<br>Le Worker applique le type de source `httpevent`. |

#### Exemple {#example}

Si vous souhaitez acheminer les journaux en fonction du champ ID d'application du journal (par exemple, `application_id`) vers la destination Datadog Archives, utilisez la syntaxe des champs d'événements dans le champ **Préfixe pour l'appliquer à toutes les clés d'objet**.

{{< img src="observability_pipelines/amazon_s3_prefix_20250709.png" alt="La destination Datadog Archives montrant le champ Préfixe utilisant la syntaxe des champs d'événements /application_id={{ application_id }}/" style="width:40%;" >}}

### Syntaxe {#syntax}

#### Champs d'événements {#event-fields}

Utilisez `{{ <field_name> }}` pour accéder aux champs d'événements de journal individuels. Exemple :

```
{{ application_id }}
```

#### Spécificateurs strftime {#strftime-specifiers}

Utilisez les [spécificateurs strftime][3] pour la date et l'heure. Exemple :

```
year=%Y/month=%m/day=%d
```

#### Caractères d'échappement {#escape-characters}

Préfixez un caractère avec `\` pour échapper au caractère. Cet exemple échappe à la syntaxe du champ d'événement :

```
\{{ field_name }}
```

Cet exemple échappe aux spécificateurs strftime :

```
year=\%Y/month=\%m/day=\%d/
```

## Regroupement d'événements {#event-batching}

Les destinations des Pipelines d'Observabilité envoient des événements par lots à l'intégration en aval. Un lot d'événements est vidé lorsque l'un des paramètres suivants est atteint :

- Nombre maximum d'événements
- Nombre maximum d'octets
- Délai d'attente (secondes)

Par exemple, si les paramètres d'une destination sont :

- Nombre maximum d'événements = 2
- Nombre maximum d'octets = 100 000
- Délai d'attente (secondes) = 5

Et si la destination reçoit 1 événement dans une fenêtre de 5 secondes, elle vide le lot au délai d'attente de 5 secondes.

Si la destination reçoit 3 événements en 2 secondes, elle vide un lot avec 2 événements puis vide un second lot avec l'événement restant après 5 secondes. Si la destination reçoit 1 événement qui dépasse 100 000 octets, elle vide ce lot avec 1 événement.

{{% observability_pipelines/destination_batching %}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html#specifiers