---
description: Apprenez à envoyer des journaux ou des métriques vers Elasticsearch à
  l'aide d'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destination Elasticsearch
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Elasticsearch d'Observability Pipelines pour envoyer des journaux ou des métriques vers Elasticsearch.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identificateurs pour l'URL de l'endpoint Elasticsearch, le nom d'utilisateur et le mot de passe. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Elasticsearch lorsque vous [configurez un pipeline][7]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][8] ou avec [Terraform][9]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Elasticsearch dans l'interface utilisateur du pipeline :

1. Saisissez les identificateurs de votre nom d'utilisateur et de votre mot de passe Elasticsearch. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'identifiant pour l'URL de votre endpoint Elasticsearch. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. (Facultatif) Saisissez la version d'Elasticsearch.
1. Dans le menu déroulant {{< ui >}}Mode{{< /ui >}}, sélectionnez {{< ui >}}Bulk{{< /ui >}} ou {{< ui >}}Data stream{{< /ui >}}.
	- {{< ui >}}Bulk{{< /ui >}} mode
		- Utilise l'[API Bulk][5] d'Elasticsearch pour envoyer des événements groupés directement dans un index standard.
		- Choisissez ce mode lorsque vous souhaitez un contrôle direct sur le nommage de l'index et la gestion du cycle de vie. Les données sont ajoutées à l'index que vous spécifiez, et vous êtes responsable de la gestion des rollovers, des suppressions et des mappings.
		- Pour configurer le mode {{< ui >}}Bulk{{< /ui >}} :
			- (Facultatif) Dans le champ {{< ui >}}Index{{< /ui >}}, saisissez le nom de l'index Elasticsearch. Vous pouvez utiliser la [syntaxe de modèle][3] pour acheminer dynamiquement les données vers différents index en fonction de champs spécifiques dans vos journaux, par exemple `logs-{{service}}` or `metrics-{{service}}`.
	- {{< ui >}}Data streams{{< /ui >}} mode
		- Uses [Elasticsearch Data Streams][4] for data storage. Data streams automatically manage backing indexes and rollovers, making them ideal for time series log data.
		- Choose this mode when you want Elasticsearch to manage the index lifecycle for you. Data streams ensure smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} mode, spécifiez éventuellement le nom du flux de données et configurez les paramètres de routage et de synchronisation.
			1. In the {{< ui >}}Type{{< /ui >}} champ, saisissez la catégorie de données ingérées, par exemple logs` or `metrics`.
			1. In the {{< ui >}}Dataset{{< /ui >}} champ, spécifiez le format ou la source de données qui décrit la structure, par exemple apache`.
			1. In the {{< ui >}}Namespace{{< /ui >}} champ, saisissez le regroupement pour organiser vos flux de données, par exemple production`.
			1. Enable the {{< ui >}}Auto routing{{< /ui >}} activez pour acheminer automatiquement les événements vers un flux de données en fonction du contenu de l'événement.
			1. Enable the {{< ui >}}Sync fields{{< /ui >}} activez pour synchroniser les champs du flux de données avec le mappage d'index Elasticsearch.
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}, {{< ui >}}Dataset{{< /ui >}} et {{< ui >}}Namespace{{< /ui >}} champs pour construire dynamiquement le nom du flux de données en fonction de champs spécifiques dans vos logs ou métriques.
			- In the UI, there is a preview of the data stream name you configured. If the fields are left blank, the default data stream name used is `logs-generic-default` for logs and `metrics-generic-default` for metrics. With the above example inputs, the data stream name that the Worker writes to is:
				- `logs-apache-production` for logs
				- `metrics-apache-production` pour les métriques

{{% observability_pipelines/secrets_env_var_note %}}

#### Paramètres facultatifs {#optional-settings}

##### Activer TLS {#enable-tls}

Activez le commutateur pour {{< ui >}}Enable TLS{{< /ui >}}.
- Si vous utilisez la gestion des secrets, saisissez l'identifiant de la clé de passe. Consultez [Paramètres par défaut des secrets](#secret-defaults) pour connaître la valeur par défaut utilisée si le champ est laissé vide.
- Les fichiers de certificat et de clé suivants sont requis pour TLS :
  - `Server Certificate Path` : Le chemin d'accès au fichier de certificat qui a été signé par votre fichier racine d'autorité de certification (CA) au format DER, PEM ou CRT (X.509).
  - `CA Certificate Path` : Le chemin d'accès au fichier de certificat qui est votre fichier racine d'autorité de certification (CA) au format DER, PEM ou CERT (X.509).
  - `Private Key Path` : Le chemin d'accès au fichier de clé privée `.key` qui appartient à votre chemin de certificat serveur au format DER, PEM ou CERT (PKCS #8).
  - **Remarques** :
    - Le répertoire de données de configuration `/var/lib/observability-pipelines-worker/config/` est automatiquement ajouté aux chemins de fichiers. Consultez [Configurations avancées des workers][6] pour plus d'informations.
    - Le fichier doit être lisible par le groupe et l'utilisateur `observability-pipelines-worker`.

##### Compression {#compression}

Vous pourriez vouloir utiliser la compression si vous envoyez un volume élevé d'événements vers vos clusters Elasticsearch.

Activez le commutateur pour activer {{< ui >}}Compression{{< /ui >}}. Sélectionnez un algorithme de compression (`gzip`, `snappy`, `zlib`, `zstd`) dans le menu déroulant. La valeur par défaut est aucune compression.

##### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

##### Options avancées {#advanced-options}

1. Dans le champ {{< ui >}}ID Key{{< /ui >}}, saisissez le nom du champ utilisé comme ID de document dans Elasticsearch.
1. Dans le champ {{< ui >}}Pipeline{{< /ui >}}, saisissez le nom d'un pipeline d'ingestion Elasticsearch à appliquer aux événements avant l'indexation.
1. Activez le commutateur {{< ui >}}Retry partial failures{{< /ui >}} pour réessayer une requête en masse ayant échoué lorsque certains événements d'un lot échouent alors que d'autres réussissent.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL de l'endpoint Elasticsearch :
	- L'identifiant par défaut est `DESTINATION_ELASTICSEARCH_ENDPOINT_URL`.
- Identifiant du nom d'utilisateur pour l'authentification Elasticsearch :
	- L'identifiant par défaut est `DESTINATION_ELASTICSEARCH_USERNAME`.
- Identifiant du mot de passe pour l'authentification Elasticsearch :
	- L'identifiant par défaut est `DESTINATION_ELASTICSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: /fr/observability_pipelines/destinations/#template-syntax
[4]: https://www.elastic.co/docs/reference/fleet/data-streams
[5]: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk
[6]: /fr/configuration/install_the_worker/advanced_worker_configurations/
[7]: /fr/observability_pipelines/configuration/set_up_pipelines/
[8]: /fr/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline