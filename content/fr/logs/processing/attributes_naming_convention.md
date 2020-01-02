---
title: Attributs standards
kind: documentation
description: Attributs standards de Datadog pour les pipelines.
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

La centralisation des logs issus de diverses technologies et applications a tendance à générer des dizaines voire des centaines d'attributs différents dans un environnement de Log Management. C'est notamment le cas lorsque de nombreux utilisateurs (chacun ayant ses propres habitudes) travaillent au sein de différentes équipes dans un même environnement.

Cette vaste quantité d'attributs peut poser problème. Par exemple, une adresse IP client peut avoir les attributs suivants dans vos logs : `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc.

Dans ce contexte, le nombre d'attributs créés ou fournis peut prêter à confusion et rendre difficile la configuration ou la compréhension de l'environnement. L'identification des attributs correspondant aux logs pertinents peut également être fastidieuse, empêchant la mise en corrélation efficace d'un proxy Web avec des logs d'application Web (par exemple). Même si chaque technologie définit ses attributs de log respectifs d'une façon qui lui est propre, la signification d'une URL, d'une IP client ou d'une durée est universelle.

Les attributs standards sont conçus pour permettre à votre organisation de définir sa propre convention de nommage et de la faire adopter par un maximum d'utilisateurs et d'équipes fonctionnelles. Il convient de définir un sous-ensemble d'attributs qui bénéficiera des sémantiques partagées que tout le monde accepte d'utiliser.

### Configurer des attributs standards

Les intégrations de logs reposent de façon native sur les [attributs fournis par défaut](#liste-des-attributs-standards-par-defaut), mais votre organisation peut choisir de compléter ou de modifier cette liste.
Le tableau des attributs standards ainsi que les pipelines et les autres fonctions d'admission des logs (génération de métriques, archives, filtres d'exclusion, etc.) sont disponibles dans les pages de configuration des logs.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Attributs standards"  style="width:60%;">}}

Pour appliquer ces attributs standards, les administrateurs ont la possibilité de copier un ensemble d'attributs non standards existant dans un ensemble d'attributs standards. De cette façon, il est possible de rendre conformes les sources de logs qui ne le sont pas, sans qu'aucune des informations existantes ne soit perdue.

### Attributs standards dans le Log Explorer

Généralement, durant une période de transition, les attributs standards peuvent coexister avec leur version non standard dans votre organisation. Pour aider vos utilisateurs à sélectionner les attributs standards dans ce contexte, ces derniers sont identifiés comme tels dans le Log Explorer (par exemple dans la liste des facettes ainsi que dans les sélecteurs de mesure ou de groupe dans la section Analytics).

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_explorer.png" alt="Attributs standards"  style="width:60%;">}}

Si vous êtes un administrateur ou le responsable de la convention de nommage dans votre organisation, profitez de cette période de transition pour en discuter avec les autres utilisateurs et les inviter à utiliser les attributs standards.

## Liste des attributs standards

La tableau des attributs standards propose un ensemble d'[attributs standards prédéfinis](#liste-des-attributs-standards-par-défaut). Vous pouvez ajouter vos propres attributs à cette liste et modifier ou supprimer des attributs standards existants :

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Modifier les attributs standards"  style="width:80%;">}}

### Ajouter ou modifier des attributs standards

Un attribut standard est défini par les éléments suivants :

* `Path` : le chemin des attributs standards, tel qu'il apparaît dans votre fichier JSON (p. ex., `network.client.ip`).
* `Type` (`string`, `integer`, `double`, `boolean`) : le type de l'attribut utilisé pour convertir les éléments de la liste de remappage.
* `Description` : la description lisible de l'attribut.
* `Remapping list` : la liste des attributs non conformes qui doivent être remappés vers leur version standard, séparés par des virgules.

Le volet de l'attribut standard s'affiche lorsque vous ajoutez un nouvel attribut standard ou que vous modifiez un attribut existant :

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Définir un attribut standard"  style="width:80%;">}}

Tous les éléments des attributs standards peuvent être renseignés ou mis à jour.

**Remarque** : il est uniquement possible de mettre à jour ou d'ajouter des informations pour un attribut standard d'un log récemment ingéré.

### Comportement de remappage des attributs standards

Une fois les logs traités dans les pipelines, la liste complète des attributs standards est appliquée à chaque log.
Pour chaque entrée du tableau des attributs standards, si un attribut du log actuel correspond à un attribut de la liste de remappage, les opérations suivantes se produisent :

* Le premier attribut qui correspond à la liste fournie est remappé, et sa valeur est remplacée par la nouvelle si celle-ci existe déjà.
* Datadog applique le type d'attribut remappé. Si ce n'est pas possible, l'attribut est ignoré et la prochaine correspondance de la liste est utilisée.
* L'attribut d'origine est conservé dans le log.

**Remarque importante** : par défaut, le type d'un attribut standard existant reste inchangé si la liste de remappage est vide. Ajoutez l'attribut standard à sa propre liste de remappage pour modifier son type.

#### Validation

Pour ajouter ou mettre à jour un attribut standard, suivez les règles suivantes :

* Un attribut standard ne peut pas être ajouté dans la liste de remappage d'un autre attribut standard.
* Un attribut personnalisé peut être remappé vers un seul attribut standard.
* Pour respecter la structure JSON des logs, un attribut standard ne peut pas être l'enfant d'un autre (par exemple, `user` et `user.name` ne peuvent pas être tous les deux des attributs standards).

## Liste des attributs standards par défaut

La liste des attributs standards par défaut est séparée en sept domaines fonctionnels :

* [Réseau/communications](#network)
* [Requêtes HTTP](#http-requests)
* [Code source](#source-code)
* [Base de données](#database)
* [Performances](#performance)
* [Attributs associés à l'utilisateur](#user-related-attributes)
* [Syslog shippers et log shippers](#syslog-and-log-shippers)
* [DNS](#dns)

### Réseau

Les attributs suivants sont liés aux données de communication réseau. Tous les champs et toutes les métriques sont précédés par `network`.

| **Nom complet**               | **Type** | **Description**                                                                          |
|:---------------------------|:---------|:-----------------------------------------------------------------------------------------|
| `network.client.ip`        | `string` | L'adresse IP du client à l'origine de la connexion TCP.                          |
| `network.destination.ip`   | `string` | L'adresse IP à laquelle le client est connecté.                                                  |
| `network.client.port`      | `number` | Le port du client à l'origine de la connexion.                                    |
| `network.destination.port` | `number` | Le port TCP auquel le client s'est connecté.                                                    |
| `network.bytes_read`       | `number` | Le nombre total d'octets transmis depuis le client vers le serveur lorsque le log est envoyé. |
| `network.bytes_written`    | `number` | Le nombre total d'octets transmis depuis le serveur vers le client lorsque le log est envoyé. |

Des intégrations comme [Apache][1], [Varnish][2], [AWS ELB][3], [Nginx][4] ou encore [HAProxy][5] reposent sur ces attributs.

### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP utilisées dans les communications réseau. Tous les champs sont précédés par `network.client.geoip` ou `network.destination.geoip`.

| **Nom complet**                                | **Type** | **Description**                                                                                                                      |
|:--------------------------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | `string` | Nom du pays                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | [Code ISO][6] du pays (par exemple : `US` pour les États-Unis, `FR` pour la France)                                                  |
| `network.client.geoip.continent.code`       | `string` | Code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | Nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | Nom du premier niveau de division du pays (par exemple : `California` aux États-Unis ou le département de la `Sarthe` en France) |
| `network.client.geoip.subdivision.iso_code` | `string` | [Code ISO][6] du premier niveau de division du pays (par exemple : `CA` aux États-Unis ou le département `SA` en France)    |
| `network.client.geoip.city.name`            | `string` | Le nom de la ville (par exemple : `Paris`, `New York`)                                                                                   |

### Requêtes HTTP

Ces attributs sont liés aux données couramment utilisées dans les accès et requêtes HTTP. Tous les attributs sont précédés par `http`.

Des intégrations comme [Apache][1], Rails, [AWS CloudFront][3] ou encore des serveurs d'application Web reposent sur ces attributs.

#### Attributs courants

| **Nom complet**       | **Type** | **Description**                                                                                           |
|:-------------------|:---------|:----------------------------------------------------------------------------------------------------------|
| `http.url`         | `string` | L'URL de la requête HTTP.                                                                              |
| `http.status_code` | `number` | Le code de statut de la réponse HTTP.                                                                            |
| `http.method`      | `string` | Indique l'action à effectuer pour une ressource donnée.                                        |
| `http.referer`     | `string` | Le champ d'en-tête HTTP qui identifie l'adresse de la page Web liée à la ressource demandée. |
| `http.request_id`  | `string` | L'ID de la requête HTTP.                                                                               |
| `http.useragent`   | `string` | Le user-agent tel qu'il est envoyé (format brut). [Consultez les informations ci-dessous pour obtenir plus d'informations](#attributs-de-user-agent).          |
| `http.version`     | `string` | La version HTTP utilisée pour la requête.                                                                 |

#### Attributs liés aux détails de l'URL

Ces attributs fournissent des informations sur les éléments parsés de l'URL HTTP. Ils sont généralement générés à l'aide du [parser d'URL][7]. Tous les attributs sont précédés par `http.url_details`.

| **Nom complet**                   | **Type** | **Description**                                                                         |
|:-------------------------------|:---------|:----------------------------------------------------------------------------------------|
| `http.url_details.host`        | `string` | La partie du host HTTP de l'URL.                                                          |
| `http.url_details.port`        | `number` | La partie de l'URL correspondant au port HTTP.                                                          |
| `http.url_details.path`        | `string` | La partie de l'URL correspondant au chemin HTTP.                                                          |
| `http.url_details.queryString` | `object` | Les parties de chaîne de requête HTTP de l'URL décomposées en attributs key/value des paramètres de requête. |
| `http.url_details.scheme`      | `string` | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

#### Attributs user-agent

Ces attributs fournissent des informations sur la signification des attributs user-agent. Ils sont généralement générés à l'aide du [parser de user-agent][8]. Tous les attributs sont précédés par `http.useragent_details`.

| **Nom complet**                            | **Type** | **Description**                                |
|:----------------------------------------|:---------|:-----------------------------------------------|
| `http.useragent_details.os.family`      | `string` | La famille du système d'exploitation indiquée par le user-agent.      |
| `http.useragent_details.browser.family` | `string` | La famille de navigateurs indiquée par le user-agent. |
| `http.useragent_details.device.family`  | `string` | La famille d'appareils indiquée par le user-agent.  |

### Code source

Ces attributs sont liés aux données utilisées lorsqu'un log ou une erreur est généré(e) via un logger dans une application personnalisée. Tous les attributs sont précédés par `logger` ou `error`.

| **Nom complet**         | **Type** | **Description**                                                  |
|:---------------------|:---------|:-----------------------------------------------------------------|
| `logger.name`        | `string` | Le nom du logger.                                          |
| `logger.thread_name` | `string` | Le nom du thread actuel lorsque le log est envoyé.            |
| `logger.method_name` | `string` | Le nom de la méthode de la classe.                                           |
| `error.kind`         | `string` | Le type ou la catégorie d'erreur (ou le code dans certains cas).                  |
| `error.message`      | `string` | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`        | `string` | La trace de pile ou les informations complémentaires relatives à l'erreur. |

Des intégrations comme *Java*, *NodeJs*, *.NET*, *Golang* ou encore *Python* reposent sur ces attributs.

### Base de données

Les attributs liés à une base de données sont précédés par `db`.

| **Nom complet**   | **Type** | **Description**                                                                                                                       |
|:---------------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------|
| `db.instance`  | `string` | Nom de l'instance de la base de données. Par exemple, dans Java, pour `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, le nom de l'instance est `customers`.       |
| `db.statement` | `string` | Une déclaration de base de données pour le type de base de données fourni. Par exemple, `"SELECT * FROM wuser_table";` pour mySQL et `"SET mykey 'WuValue'"` pour Redis. |
| `db.operation` | `string` | L'opération effectuée (« query », « update », « delete », etc.).                                                                   |
| `db.user`      | `string` | L'utilisateur à l'origine de l'opération.                                                                                                     |

Des intégrations comme [Cassandra][9], [MySQL][10], [RDS][11] ou encore [Elasticsearch][12] reposent sur ces attributs.

### Performances

Attributs des métriques de performance.

| **Nom complet** | **Type** | **Description**                                                                                   |
|:-------------|:---------|:--------------------------------------------------------------------------------------------------|
| `duration`   | `number` | Toute durée en **nanosecondes** : le délai de réponse HTTP, le délai d'interrogation d'une base de données, la latence, etc. |


Étant donné que cet attribut est affiché et utilisé comme [mesure][13] par défaut pour la [recherche de traces][14], nous vous conseillons d'y faire appel ou tout du moins de configurer un remappage vers celui-ci.

### Attributs associés à l'utilisateur

Tous les attributs et toutes les mesures sont précédés par `usr`.

| **Nom complet** | **Type** | **Description**         |
|:-------------|:---------|:------------------------|
| `usr.id`     | `string` | L'identifiant de l'utilisateur.    |
| `usr.name`   | `string` | Le nom courant de l'utilisateur. |
| `usr.email`  | `string` | L'adresse e-mail de l'utilisateur.         |

### Syslog shippers et log shippers

Ces attributs sont liés aux données ajoutées par un Agent syslog-shipper ou log-shipper. Tous les champs et toutes les métriques sont précédés par `syslog`.

| **Nom complet**       | **Type** | **Description**                                                               |
|:-------------------|:---------|:------------------------------------------------------------------------------|
| `syslog.hostname`  | `string` | Le hostname.                                                                  |
| `syslog.appname`   | `string` | Le nom de l'application. Généralement remappé vers l'attribut réservé `service`. |
| `syslog.severity`  | `number` | La sévérité du log. Généralement remappée vers l'attribut réservé `status`.      |
| `syslog.timestamp` | `string` | Le timestamp du log. Généralement remappé vers l'attribut réservé `date`.       |
| `syslog.env`       | `string` | Le nom de l'environnement d'où provient la source des logs.                      |

Des intégrations comme [Rsyslog][15], [NxLog][16], [Syslog-ng][17], [Fluentd][18] ou encore [Logstash][19] reposent sur ces attributs.

### DNS

Tous les attributs et toutes les mesures sont précédés par `dns`.

| **Nom complet**         | **Type** | **Description**                                                           |
|:---------------------|:---------|:--------------------------------------------------------------------------|
| `dns.id`             | `string` | L'identificateur de la question DNS.                                                 |
| `dns.question.name`  | `string` | L'URL de l'adresse IP que la requête DNS souhaite trouver.                  |
| `dns.question.type`  | `string` | Un [code de deux octets][20] spécifiant le type de question DNS.             |
| `dns.question.class` | `string` | La classe recherchée par la question DNS (p. ex. IN lorsque vous utilisez Internet). |
| `dns.question.size`  | `number` | La taille de la question DNS en octets.                                           |
| `dns.answer.name`    | `string` | Le nom de domaine interrogé.                                                  |
| `dns.answer.type`    | `string` | Un [code de deux octets][20] spécifiant le type de réponse DNS.               |
| `dns.answer.class`   | `string` | La classe correspondant à la réponse du DNS.                                            |
| `dns.answer.size`    | `number` | La taille de la réponse du DNS en octets.                                             |
| `dns.flags.rcode`    | `string` | Le code de réponse du DNS.                                                       |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/apache
[2]: /fr/integrations/varnish
[3]: /fr/integrations/amazon_elb
[4]: /fr/integrations/nginx
[5]: /fr/integrations/haproxy
[6]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[7]: /fr/logs/processing/processors/#url-parser
[8]: /fr/logs/processing/processors/#user-agent-parser
[9]: /fr/integrations/cassandra
[10]: /fr/integrations/mysql
[11]: /fr/integrations/amazon_rds
[12]: /fr/integrations/elastic
[13]: /fr/logs/explorer/?tab=measures#setup
[14]: /fr/tracing/app_analytics/search
[15]: /fr/integrations/rsyslog
[16]: /fr/integrations/nxlog
[17]: /fr/integrations/syslog_ng
[18]: /fr/integrations/fluentd
[19]: /fr/integrations/logstash
[20]: https://en.wikipedia.org/wiki/List_of_DNS_record_types