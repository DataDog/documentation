---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: Documentation
  text: En savoir plus sur les attributs standard de la solution Log Management
- link: /real_user_monitoring/browser/data_collected
  tag: Documentation
  text: Données RUM recueillies (Browser)
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Apprendre à explorer vos traces
kind: documentation
title: Sémantique des tags de span
---

## Présentation
Les [bibliothèques de tracing Datadog][1] fournissent une prise en charge prête à l'emploi pour l'instrumentation d'un grand nombre de bibliothèques. Ces instrumentations génèrent des spans représentant les unités de travail logiques dans les systèmes distribués. Chaque span se compose de [tags de span][2] dont le but est de fournir des informations supplémentaires sur l'unité de travail en action dans le système. La convention de nommage décrit le nom et le contenu pouvant être utilisés dans les événements de span.

## Convention de nommage des tags de span
### Core
Les tags de span suivants constituent les concepts clés permettant de décrire l'instrumentation utilisée ainsi que le type d'opération exécutée :

| **Nom**    | **Type** | **Description**                                                                                                                                                                                                                                                                   |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `language`  | `string` | Le langage utilisé par le SDK du client pour générer la span. Il peut s'agir de l'une des valeurs suivantes : `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python` ou `ruby`.                                                                                                                                                                                                                                 |
| `env`       | `string` | La valeur de la variable d'environnement `DD_ENV` ou de la variable `env` définie par l'utilisateur pour le processus en cours d'exécution.                                                                                                                                                                                            |
| `version`   | `string` | La valeur de la variable d'environnement `DD_VERSION` ou de la variable `version` définie par l'utilisateur pour le processus en cours d'exécution.                                                                                                                                                                                      |
| `span.kind` | `string` | La chaîne représentant le type de l'unité de travail gérée par la span. Il peut s'agir de l'une des valeurs suivantes : `server`, `client`, `producer`, `consumer` ou `internal`.<br>Pour en savoir plus, consultez la [documentation OpenTelemetry sur le SpanKind][3] (en anglais). |
| `component` | `string` | Le nom de la bibliothèque ou de l'intégration qui a créé la span.                                                                                                                                                                                                                        |

### Communications réseau
Les tags de span suivants peuvent être utilisés pour décrire les unités de travail correspondant aux communications réseau :

| **Nom**                    | **Type** | **Description**                                                           |
|---------------------------------|----------|---------------------------------------------------------------------------|
| `network.client.ip`             | `string` | L'adresse IP du client à l'origine de la connexion entrante.        |
| `network.destination.ip`        | `string` | L'adresse IP de destination de la connexion sortante.             |
| `network.host.ip`               | `string` | L'adresse IP du host local.                                                     |
| `network.client.port`           | `number` | Le port du client à l'origine de la connexion.                      |
| `network.destination.port`      | `number` | Le numéro de port distant de la connexion sortante.                             |
| `network.client.name`           | `string` | Le hostname du client à l'origine de la connexion entrante.          |
| `network.destination.name`      | `string` | Le hostname distant (ou équivalent) de destination de la connexion sortante. |
| `network.host.name`             | `string` | Le hostname local.                                                            |
| `network.client.transport`      | `string` | Le protocole de transport utilisé pour la connexion entrante.                    |
| `network.destination.transport` | `string` | Le protocole de transport utilisé pour la connexion sortante.                   |

### Requêtes HTTP
Les tags de span suivants peuvent être utilisés pour décrire les spans de client et de serveur HTTP :

| **Nom**                                | **Description**                                                                                                                                                                                                              |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `http.status_code`                          | Type : `string` <br> Le code de statut de la réponse HTTP.                                                                                                                                                                                                |
| `http.url`                                  | Type : `string` <br>  L'URL de la requête HTTP, avec la chaîne de requête obfusquée. Pour en savoir plus sur l'obfuscation, consultez la documentation relative à la [configuration de la sécurité des données][4].                                                         |
| `http.version`                              | Type : `string` <br> La version HTTP utilisée pour la requête.                                                                                                                                                                                     |
| `http.method`                               | Type : `string` <br>  Le port du client à l'origine de la connexion.                                                                                                                                                                         |
| `http.route`                                | Type : `string` <br>  La route correspondante (le modèle de chemin).<br>Exemple : `/users/:userID`                                                                                                                                                              |
| `http.client_ip`                            | Type : `string` <br>  L'adresse IP du client d'origine derrière tous les proxies, si elle est disponible. Cette adresse est déterminée à partir des en-têtes tels que `X-Forwarded-For`.                                                                                                        |
| `http.useragent`                            | Type : `string` <br>  Le user-agent indiqué dans l'en-tête de la requête reçue.                                                                                                                                                                              |
| `http.request.content_length`               | Type : `number` <br>  La taille en octets du corps de la charge utile de la requête.                                                                                                                                                                                |
| `http.response.content_length`              | Type : `number` <br> La taille en octets du corps de la charge utile de la réponse.                                                                                                                                                                                |
| `http.request.content_length_uncompressed`  | Type : `number` <br> La taille du corps de la charge utile de la requête sans compression après décodage du transport.                                                                                                                                                   |
| `http.response.content_length_uncompressed` | Type : `number` <br> La taille du corps de la charge utile de la réponse sans compression après décodage du transport.                                                                                                                                                  |
| `http.request.headers.*`                    | Type : `string` <br> Les en-têtes HTTP de la requête. Par défaut, aucun en-tête n'est recueilli, mais vous pouvez utiliser la variable d'environnement `DD_TRACE_HEADER_TAGS` pour recueillir ceux qui vous intéressent.<br>Pour en savoir plus sur la collecte des en-têtes, consultez la [configuration de la bibliothèque][5] correspondante.  |
| `http.response.headers.*`                   | Type : `string` <br> Les en-têtes HTTP de la réponse. Par défaut, aucun en-tête n'est recueilli, mais vous pouvez utiliser la variable d'environnement `DD_TRACE_HEADER_TAGS` pour collecter ceux qui vous intéressent.<br>Pour en savoir plus sur la collecte des en-têtes, consultez la [configuration de la bibliothèque][5] correspondante. |

### Base de données
Les tags de span suivants peuvent être utilisés pour décrire les spans de base de données :

| **Nom**           | **Type** | **Description**                                                                                              |
|------------------------|----------|--------------------------------------------------------------------------------------------------------------|
| `db.system`            | `string` | L'identifiant du système de gestion de bases de données (solution SGBD utilisée).                                       |
| `db.connection_string` | `string` | La chaîne utilisée pour la connexion à la base de données.                                                        |
| `db.user`              | `string` | Le nom d'utilisateur utilisé pour accéder à la base de données.                                                                          |
| `db.instance`          | `string` | Le nom de la base de données à laquelle la connexion est établie.                                                                  |
| `db.statement`         | `string` | L'instruction de base de données en cours d'exécution.                                                                        |
| `db.operation`         | `string` | Le nom de l'opération en cours d'exécution. <br>Exemples : `SELECT`, `findAndModify` ou `HMSET`                     |
| `db.sql.table`         | `number` | Le nom de la table principale à laquelle s'applique l'opération, y compris le nom de la base de données (le cas échéant). |
| `db.row_count`         | `number` | Le nombre de lignes/résultats renvoyés par la requête ou l'opération.                                                      |

Le préfixe `db.<db.system>` est appliqué aux attributs relatifs à des technologies de base de données spécifiques.

### File d'attente de messages
Les tags de span suivants peuvent être utilisés pour décrire les spans correspondant aux systèmes de messagerie :

| **Nom**                     | **Type** | **Description**                                                                                                                                                                                                                  |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | L'identifiant du système de messagerie.                                                                                                                                                                                               |
| `messaging.destination`          | `string` | Le nom de la destination du message.                                                                                                                                                                                                     |
| `messaging.destination_kind`     | `string` | Le type de la destination du message.                                                                                                                                                                                                  |
| `messaging.protocol`             | `string` | Le nom du protocole de transport.                                                                                                                                                                                               |
| `messaging.protocol_version`     | `string` | La version du protocole de transport.                                                                                                                                                                                            |
| `messaging.url`                  | `string` | La chaîne de connexion au système de messagerie.                                                                                                                                                                                    |
| `messaging.message_id`           | `string` | Le nom de la table principale à laquelle s'applique l'opération, y compris le nom du système de messagerie (le cas échéant).                                                                                                                     |
| `messaging.conversation_id`      | `string` | Le nombre de lignes/résultats renvoyés par la requête ou l'opération.                                                                                                                                                                          |
| `messaging.message_payload_size` | `number` | La taille en octets de la charge utile du message sans compression.                                                                                                                                                                            |
| `messaging.operation`            | `string` | Une chaîne identifiant le type de consommation du message. <br>Exemples : `send` (un message est envoyé à un producteur), `receive` (un message est reçu par un consommateur) ou `process` (un message précédemment reçu est traité par un consommateur). |
| `messaging.consumer_id`          | `string` | L'identifiant du consommateur recevant un message.                                                                                                                                                                              |

Le préfixe `messaging.<messaging.system>` est appliqué aux attributs relatifs à des systèmes de messagerie spécifiques.

### Appels de procédure à distance
Les tags de span suivants peuvent être utilisés pour décrire les spans correspondant à des appels de procédure à distance comme RMI ou gRPC :

| **Nom**  | **Type** | **Description**                      |
|---------------|----------|--------------------------------------|
| `rpc.system`  | `string` | L'identifiant du système distant.    |
| `rpc.service` | `string` | Le nom du service appelé. |
| `rpc.method`  | `string` | Le nom de la méthode appelée.  |

### Erreurs
Les tags de span suivants peuvent être utilisés pour décrire les erreurs associées aux spans :

| **Nom**    | **Type** | **Description**                                                  |
|-----------------|----------|------------------------------------------------------------------|
| `error.message` | `string` | Le type ou la catégorie d'erreur (ou le code dans certains cas).                  |
| `error.type`    | `string` | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`   | `string` | La stack trace ou les informations complémentaires relatives à l'erreur. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup_overview/
[2]: /fr/tracing/visualization/#span-tags
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /fr/tracing/setup_overview/configure_data_security/
[5]: /fr/tracing/trace_collection/library_config/