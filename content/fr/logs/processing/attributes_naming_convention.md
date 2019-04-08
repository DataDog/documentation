---
title: Attributs standard
kind: documentation
description: Attributs standard de Datadog pour les pipelines.
further_reading:
  - link: logs/processing/pipelines
    tag: Documentation
    text: Découvrir les pipelines de Datadog
  - link: logs/processing/processors
    tag: Documentation
    text: Consulter la liste complète des processeurs disponibles
  - link: logs/logging_without_limits
    tag: Documentation
    text: Collecte illimitée de logs
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
---
## Présentation

La centralisation des logs de diverses technologies et applications a tendance à générer des dizaines voire des centaines d'attributs différents dans un environnement de Log Management. C'est notamment le cas lorsque de nombreux utilisateurs (dotés chacun de leur propre mode d'utilisation) travaillent au sein de différentes équipes dans un même environnement.

Tout cela peut être source de confusion. En effet, une adresse IP client peut avoir les attributs suivants dans vos logs : `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc.

Dans ce contexte, le nombre d'attributs créés ou fournis peut prêter à confusion et rendre difficile la configuration ou la compréhension de l'environnement. Il est également fastidieux de savoir quels attributs correspondent aux logs pertinents. Par exemple, la corrélation d'un proxy Web avec des logs d'application Web risque d'être difficile. Bien que les technologies définissent différemment les attributs de leurs logs respectifs, la signification d'une URL, d'une adresse IP client ou d'une durée est universelle.

Les attributs standard sont conçus pour permettre à votre organisation de définir sa propre convention de nommage et de la faire adopter par un maximum d'utilisateurs et d'équipes fonctionnelles. Il convient de définir un sous-ensemble d'attributs qui bénéficiera des sémantiques partagées que tout le monde accepte d'utiliser.

Les intégrations de logs reposent de façon native sur l’[ensemble fourni par défaut](#liste-des-attributs-standard-par-defaut), mais votre organisation peut choisir de compléter ou de modifier cette liste.
Le tableau des attributs standard, ainsi que les pipelines, index et archives, sont disponibles dans les pages de configuration des logs.


{{< img src="logs/processing/attribute_naming_convention/standard_attributes.png" alt="Attributs standard" responsive="true" style="width:80%;">}}

Comment ces attributs standard sont-ils suggérés ou appliqués ?
Les administrateurs peuvent recopier un ensemble existant d'attributs (non standard) dans un ensemble standard afin que les sources de logs non conformes utilisent les attributs adoptés sans perdre aucune des informations précédentes.

## Liste des attributs standard

La tableau des attributs standard propose un ensemble d’[attributs standard prédéfinis](#liste-d-attributs-standard-par-défaut). Vous pouvez ajouter vos propres attributs à cette liste et modifier ou supprimer les attributs standard existants :

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Modifier les attributs standard" responsive="true" style="width:80%;">}}

### Ajouter ou mettre à jour des attributs standard

Un attribut standard est défini par les éléments suivants :

* `Path` : le chemin des attributs standard, tel qu'il apparaît dans votre fichier JSON (p. ex., `network.client.ip`).
* `Type` (`string`, `integer`, `double`, `boolean`) : le type de l'attribut utilisé pour convertir les éléments de la liste de remappage.
* `Description` : la description lisible de l'attribut.
* `Remapping list` : la liste des attributs non conformes séparés par une virgule qui doivent être remappés au format standard.

Le volet de l'attribut standard s'affiche lorsque vous ajoutez un nouvel attribut standard ou que vous modifiez un attribut existant :

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Définir l'attribut standard" responsive="true" style="width:80%;">}}

Tous les éléments de l'attribut standard peuvent être renseignés ou mis à jour. **Remarque** : vous pouvez seulement mettre à jour ou ajouter des informations pour un attribut standard d'un log récemment ingéré.

### Comportement de remappage des attributs standard

Une fois les logs traités dans les pipelines, la liste complète des attributs standard est appliquée à chaque log.
Pour chaque entrée d'un tableau d'attribut standard, si le log actuel possède un attribut correspondant à la liste de remappage, les opérations suivantes se produisent :

* Le premier attribut qui correspond à la liste fournie est remappé, et sa valeur est remplacée par la nouvelle si celle-ci existe déjà.
* Datadog applique le type d'attribut remappé. Si ce n'est pas possible, l'attribut est ignoré et la prochaine correspondance de la liste est utilisée.
* L'attribut d'origine est conservé dans le log.

**Remarque importante** : par défaut, le type d'un attribut standard existant reste inchangé si la liste de remappage est vide. Ajoutez l'attribut standard à sa propre liste de remappage pour appliquer son type.

#### Validation

Pour ajouter ou mettre à jour un attribut standard, suivez les règles suivantes :

* Un attribut standard ne peut pas être ajouté dans la liste de remappage d'un autre attribut standard.
* Un attribut personnalisé peut être remappé en un seul attribut standard.
* Pour respecter la structure JSON des logs, il n'est pas possible qu'un attribut standard soit l'enfant d'un autre (par exemple, `user` et `user.name` ne peuvent pas être tous les deux des attributs standard).

## Liste d'attributs standard par défaut

La liste d'attributs standard par défaut est séparée en sept domaines fonctionnels :

* [Réseau/communications](#network)
* [Requêtes HTTP](#http-requests)
* [Code source](#source-code)
* [Base de données](#database)
* [Performances](#performance)
* [Attributs associés à l'utilisateur](#user-related-attributes)
* [Syslog shippers et log shippers](#syslog-and-log-shippers)

### Réseau

Les attributs suivants sont liés aux données associées aux communications réseau. Tous les champs et toutes les métriques sont précédés par `network`.

| **Nom complet**               | **Type** | **Description**                                                                          |
| :---                       | :---     | :----                                                                                    |
| `network.client.ip`        | `string` | L'adresse IP du client à l'origine de la connexion TCP.                          |
| `network.destination.ip`   | `string` | L'adresse IP à laquelle le client est connecté.                                                  |
| `network.client.port`      | `string` | Le port du client qui a établi la connexion.                                    |
| `network.destination.port` | `string` | Le port TCP auquel le client s'est connecté.                                                    |
| `network.bytes_read`       | `number` | Le nombre total d'octets transmis depuis le client vers le serveur lorsque le log est envoyé. |
| `network.bytes_written`    | `number` | Le nombre total d'octets transmis depuis le serveur vers le client lorsque le log est envoyé. |

Des intégrations comme [Apache][1], [Varnish][2], [AWS ELB][3], [Nginx][4] ou encore [HAProxy][5] reposent sur ces attributs.

### Requêtes HTTP

Ces attributs sont liés aux données couramment utilisées dans les accès et requêtes HTTP. Tous les attributs sont précédés par `http`.

Des intégrations comme [Apache][1], Rails, [AWS CloudFront][6] ou encore des serveurs d'application Web reposent sur ces attributs.

#### Attributs courants


| **Nom complet**       | **Type** | **Description**                                                                                          |
| :---               | :---     | :----                                                                                                    |
| `http.url`         | `string` | L'URL de la requête HTTP.                                                                              |
| `http.status_code` | `number` | Le code de statut de la réponse HTTP.                                                                            |
| `http.method`      | `string` | Indique l'action à effectuer pour une ressource donnée.                                          |
| `http.referer`     | `string` | Le champ d'un en-tête HTTP qui identifie l'adresse de la page Web liée à la ressource demandée.|
| `http.request_id`  | `string` | L'ID de la requête HTTP.                                                                              |
| `http.useragent`   | `string` | Le user-agent tel qu'il est envoyé (format brut). [Consultez les informations ci-dessous pour obtenir plus d'informations](#attributs-de-user-agent). |

#### Attributs détaillés d'URL

Ces attributs fournissent des informations concernant les parties analysées de l'URL HTTP. Ils sont généralement générés grâce au [parser d'URL][7]. Tous les attributs sont précédés par `http.url_details`.

| **Nom complet**                   | **Type** | **Description**                                                                         |
| :---                           | :---     | :----                                                                                   |
| `http.url_details.host`        | `string` | La partie du host HTTP de l'URL.                                                          |
| `http.url_details.port`        | `number` | La partie du port HTTP de l'URL.                                                          |
| `http.url_details.path`        | `string` | La partie du chemin HTTP de l'URL.                                                          |
| `http.url_details.queryString` | `object` | Les parties de chaîne de requête HTTP de l'URL décomposées en attributs key/value des paramètres de requête. |
| `http.url_details.scheme`      | `string` | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

#### Attributs user-agent

Ces attributs fournissent des informations concernant les significations des attributs de user-agent. Ils sont généralement générés grâce au [parser de user-agent][8]. Tous les attributs sont précédés par `http.useragent_details`.

| **Nom complet**                            | **Type** | **Description**                                |
| :---                                    | :---     | :----                                          |
| `http.useragent_details.os.family`      | `string` | La famille du système d'exploitation indiquée par le user-agent.      |
| `http.useragent_details.browser.family` | `string` | La famille de navigateurs indiquée par le user-agent. |
| `http.useragent_details.device.family`  | `string` | La famille d'appareils indiquée par le user-agent.  |

### Code source

Ces attributs sont liés aux données utilisées lorsqu'un log ou une erreur est généré(e) via un enregistreur dans une application personnalisée. Tous les attributs sont précédés par `logger` ou `error`.

| **Nom complet**         | **Type** | **Description**                                                  |
| :---                 | :---     | :----                                                            |
| `logger.name`        | `string` | Le nom de l'enregistreur.                                          |
| `logger.thread_name` | `string` | Le nom du thread actuel lorsque le log est déclenché.            |
| `logger.method_name` | `string` | Le nom de la méthode de la classe.                                           |
| `error.kind`         | `string` | Le type ou le genre d'erreur (ou le code dans certains cas).                  |
| `error.message`      | `string` | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`        | `string` | La trace de pile ou les informations complémentaires relatives à l'erreur. |

Des intégrations comme *Java*, *NodeJs*, *.NET*, *Golang* ou encore *Python* reposent sur ces attributs.

### Base de données

Les attributs liés à une base de données sont précédés par `db`.

| **Nom complet**   | **Type** | **Description**                                                                                                                       |
| :---           | :---     | :----                                                                                                                                 |
| `db.instance`  | `string` | Nom de l'instance de la base de données. Par exemple, dans Java, pour `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, le nom de l'instance est `customers`.       |
| `db.statement` | `string` | Une déclaration de base de données pour le type de base de données fourni. Par exemple, `"SELECT * FROM wuser_table";` pour mySQL et `"SET mykey 'WuValue'"` pour Redis. |
| `db.operation` | `string` | L'opération effectuée (« query », « update », « delete », etc.).                                                                   |
| `db.user`      | `string` | L'utilisateur à l'origine de l'opération.                                                                                                     |

Des intégrations comme [Cassandra][9], [MySQL][10], [RDS][11] ou encore [Elasticsearch][12] reposent sur ces attributs.

### Performances

Attributs des métriques de performance.

| **Nom complet** | **Type** | **Description**                                                                                   |
| :---         | :---     | :----                                                                                             |
| `duration`   | `number` | Toute durée en **nanosecondes** : le délai de réponse HTTP, le délai d'interrogation d'une base de données, la latence, etc. |


Nous vous recommandons de vous référer à cet attribut, ou au moins de le remapper, puisque Datadog l'affiche et l'utilise comme [mesure][13] par défaut pour la [recherche de traces][14].

### Attributs associés à l'utilisateur

Tous les attributs et toutes les mesures sont précédés par `usr`.

| **Nom complet** | **Type** | **Description**         |
| :---         | :---     | :----                   |
| `usr.id`     | `string` | L'identificateur de l'utilisateur.    |
| `usr.name`   | `string` | Le nom convivial de l'utilisateur. |
| `usr.email`  | `string` | L'adresse e-mail de l'utilisateur.         |

### Syslog shippers et log shippers

Ces attributs sont liés aux données ajoutées par un Agent syslog-shipper ou log-shipper. Tous les champs et toutes les métriques sont précédés par `syslog`.

| **Nom complet**       | **Type** | **Description**                                                               |
| :---               | :---     | :----                                                                         |
| `syslog.hostname`  | `string` | Le hostname.                                                                  |
| `syslog.appname`   | `string` | Le nom de l'application. Généralement remappé vers l'attribut réservé `service`. |
| `syslog.severity`  | `string` | La sévérité du log. Généralement remappée vers l'attribut réservé `status`.      |
| `syslog.timestamp` | `string` | Le timestamp du log. Généralement remappé vers l'attribut réservé `date`.       |
| `syslog.env`       | `string` | Le nom de l'environnement d'où provient la source des logs.                      |

Des intégrations comme [Rsyslog][15], [NxLog][16], [Syslog-ng][17], [Fluentd][18] ou encore [Logstash][19] reposent sur ces attributs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/apache
[2]: /fr/integrations/varnish
[3]: /fr/integrations/amazon_elb
[4]: /fr/integrations/nginx
[5]: /fr/integrations/haproxy
[6]: /fr/integrations/amazon_elb
[7]: /fr/logs/processing/processors/#url-parser
[8]: /fr/logs/processing/processors/#user-agent-parser
[9]: /fr/integrations/cassandra
[10]: /fr/integrations/mysql
[11]: /fr/integrations/amazon_rds
[12]: /fr/integrations/elastic
[13]: /fr/logs/explorer/?tab=measures#setup
[14]: /fr/tracing/trace_search_and_analytics/search
[15]: /fr/integrations/rsyslog
[16]: /fr/integrations/nxlog
[17]: /fr/integrations/syslog_ng
[18]: /fr/integrations/fluentd
[19]: /fr/integrations/logstash