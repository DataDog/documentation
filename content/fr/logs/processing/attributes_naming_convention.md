---
title: Attributs standard et alias
kind: documentation
description: Prise en charge d'une convention de nommage
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
## Conventions de nommage

La centralisation des logs issus de diverses technologies et applications a tendance à générer des dizaines voire des centaines d'attributs différents dans un environnement de Log Management. C'est notamment le cas lorsque de nombreux utilisateurs (chacun ayant ses propres habitudes) travaillent au sein de différentes équipes dans un même environnement.

Par exemple, une adresse IP client peut être transcrite avec différents attributs dans vos logs : `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. Les attributs `exec_time`, `request_latency` ou encore `request.time_elapsed` peuvent désigner le délai d'exécution d'une requête.

Dans ce contexte, le nombre d'attributs créés ou fournis peut prêter à confusion et rendre difficile la configuration ou la compréhension de l'environnement. L'identification des attributs correspondant aux logs pertinents peut également être fastidieuse, empêchant la mise en corrélation efficace d'un proxy Web avec des logs d'application Web (par exemple).

Même si chaque technologie et chaque équipe définissent nativement leurs attributs de log respectifs d'une façon qui leur est propre, la signification d'une URL, d'une IP client ou d'une durée est universelle. Une **convention de nommage** définit les noms standard à utiliser pour les concepts métiers ou techniques de structuration. Grâce à elle, chacun accepte d'utiliser une terminologie commune.

## Attributs standard et alias

Les **attributs standard** constituent la base de la convention de nommage de votre organisation.

Les **alias** vous permettent d'agréger vos logs provenant de sources hétérogènes et d'y effectuer des recherches. Ainsi, vous pouvez appliquer votre convention de nommage à divers utilisateurs de plusieurs équipes, sans qu'ils aient à modifier leur pile technique.

Les alias se révèlent particulièrement utiles pour le filtrage et l'agrégation de logs provenant de différentes sources, c'est-à-dire lorsqu'ils sont [utilisés comme facettes][1]. Grâce au regroupement du contenu de multiples sources hétérogènes au sein d'une **facette standard** unique, il est bien plus simple de déceler des informations exploitables ou de faire pivoter vos données dans toute l'entreprise.

Par exemple, suivez les clients qui souffrent le plus de latence sur une infrastructure hybride reposant sur [Apache][2] et [Amazon Cloud Front][3] à l'aide de la facette standard `Network Client IP` et de la `duration` standard.

### Sélectionner des attributs standard

Les intégrations de logs reposent nativement sur un [ensemble par défaut](#liste-d-attributs-standard-par-defaut) d'attributs standard.

Les administrateurs de votre organisation peuvent ajuster la liste des attributs standard :

- En **transformant**, depuis la vue [Log Explorer][1], des attributs existants en attributs standard.
- En **créant**, depuis la [page de configuration](#attributs-standard-dans-le-log-explorer) des attributs standard, des attributs standard de toute pièce.

### Alias

L'application d'un alias entre un attribut source et un attribut cible permet aux logs disposant de l'attribut source de transmettre à la fois l'attribut source et cible, avec la même valeur.

Les utilisateurs peuvent choisir d'interagir entre l'attribut à facette avec alias (l'attribut source) ou standard (l'attribut cible). Les utilisateurs sont cependant [invités][4] à utiliser la facette standard plutôt que celle avec un alias. Cela les incite à respecter la convention de nommage et réduit la création de ressources (comme des vues enregistrées ou des tableaux de bord) à partir de contenu atypique.

Voici quelques informations supplémentaires concernant l'utilisation d'alias :

- L'application d'alias s'effectue après le traitement des logs par les pipelines. Tout attribut extrait ou traité peut être utilisé comme source pour un alias.
- Datadog applique le type d'attribut avec un alias. Si ce n'est pas possible, l'alias n'est pas créé.
- Lorsqu'un log transmet déjà l'attribut cible, l'alias écrase la valeur.
- Lorsque plusieurs attributs possèdent un alias vers un attribut standard, si le log transmet plusieurs de ces attributs source, un alias n'est appliqué qu'à un seul des attributs source.
- Il est uniquement possible de mettre à jour ou d'ajouter des informations pour un attribut standard d'un log récemment ingéré.
- Il est impossible d'appliquer un alias à un attribut standard.
- Un alias peut uniquement être créé vers un attribut standard.
- Pour respecter la structure JSON des logs, un attribut standard ne peut pas être l'enfant d'un autre (par exemple, `user` et `user.name` ne peuvent pas être tous les deux des attributs standard).

## Attributs standard dans la configuration des logs

Le tableau des attributs standard, ainsi que les pipelines et les autres fonctions d'admission des logs (génération de métriques, archives, filtres d'exclusion, etc.), sont disponibles dans les pages de configuration des logs.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Attributs standard" style="width:60%;">}}

### Liste des attributs standard

La tableau des attributs standard propose un ensemble d'[attributs standard prédéfinis](#liste-des-attributs-standard-par-défaut). Vous pouvez ajouter vos propres attributs à cette liste et modifier ou supprimer des attributs standard existants :

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Modifier les attributs standard" style="width:80%;">}}

Un attribut standard est défini par les éléments suivants :

- `Path` : le chemin de l'attribut **transformé** en attribut standard, tel qu'il apparaît dans votre fichier JSON (p. ex., `network.client.ip`).
- `Type` (`string`, `integer`, `double`, `boolean`) : le type de l'attribut utilisé pour convertir les éléments de la liste de remappage.
- `Aliasing list` : la liste des attributs pour lesquels un **alias** est créé, séparés par des virgules.
- `Description` : la description lisible de l'attribut.

Le volet de l'attribut standard s'affiche lorsque vous ajoutez un nouvel attribut standard ou que vous modifiez un attribut existant :

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Définir un attribut standard" style="width:80%;">}}

## Attributs standard dans le Log Explorer

Vous pouvez créer des alias pour les attributs directement depuis le Log Explorer. Consultez la [documentation à ce sujet][5] pour en savoir plus.

## Liste des attributs standard par défaut

La liste des attributs standard par défaut est séparée en sept domaines fonctionnels :

- [Réseau/communications](#network)
- [Requêtes HTTP](#http-requests)
- [Code source](#source-code)
- [Base de données](#database)
- [Performances](#performance)
- [Attributs associés à l'utilisateur](#user-related-attributes)
- [Syslog shippers et log shippers](#syslog-and-log-shippers)
- [DNS](#dns)

### Réseau

Les attributs suivants sont liés aux données de communication réseau. Tous les champs et toutes les métriques sont précédés par `network`.

| **Nom complet**               | **Type** | **Description**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | L'adresse IP du client à l'origine de la connexion TCP.                          |
| `network.destination.ip`   | `string` | L'adresse IP à laquelle le client est connecté.                                                  |
| `network.client.port`      | `number` | Le port du client à l'origine de la connexion.                                    |
| `network.destination.port` | `number` | Le port TCP auquel le client s'est connecté.                                                    |
| `network.bytes_read`       | `number` | Le nombre total d'octets transmis depuis le client vers le serveur lorsque le log est envoyé. |
| `network.bytes_written`    | `number` | Le nombre total d'octets transmis depuis le serveur vers le client lorsque le log est envoyé. |

Des intégrations comme [Apache][6], [Varnish][7], [AWS ELB][8], [Nginx][9] ou encore [HAProxy][10] reposent sur ces attributs.

### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP utilisées dans les communications réseau. Tous les champs sont précédés par `network.client.geoip` ou `network.destination.geoip`.

| **Nom complet**                                | **Type** | **Description**                                                                                                                      |
| :------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `network.client.geoip.country.name`         | `string` | Nom du pays                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | [Code ISO][11] du pays (par exemple : `US` pour les États-Unis, `FR` pour la France)                                                  |
| `network.client.geoip.continent.code`       | `string` | Code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | Nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | Nom du premier niveau de division du pays (par exemple : `California` aux États-Unis ou le département de la `Sarthe` en France) |
| `network.client.geoip.subdivision.iso_code` | `string` | [Code ISO][11] du premier niveau de division du pays (par exemple : `CA` aux États-Unis ou le département `SA` en France)    |
| `network.client.geoip.city.name`            | `string` | Le nom de la ville (par exemple : `Paris`, `New York`)                                                                                   |

### Requêtes HTTP

Ces attributs sont liés aux données couramment utilisées dans les accès et requêtes HTTP. Tous les attributs sont précédés par `http`.

Des intégrations comme [Apache][6], Rails, [AWS CloudFront][8] ou encore des serveurs d'application Web reposent sur ces attributs.

#### Attributs courants

| **Nom complet**       | **Type** | **Description**                                                                                           |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| `http.url`         | `string` | L'URL de la requête HTTP.                                                                              |
| `http.status_code` | `number` | Le code de statut de la réponse HTTP.                                                                            |
| `http.method`      | `string` | Indique l'action à effectuer pour une ressource donnée.                                        |
| `http.referer`     | `string` | Le champ d'en-tête HTTP qui identifie l'adresse de la page Web liée à la ressource demandée. |
| `http.request_id`  | `string` | L'ID de la requête HTTP.                                                                               |
| `http.useragent`   | `string` | Le user-agent tel qu'il est envoyé (format brut). [Consultez les informations ci-dessous pour obtenir plus d'informations](#attributs-de-user-agent).          |
| `http.version`     | `string` | La version HTTP utilisée pour la requête.                                                                 |

#### Attributs liés aux détails de l'URL

Ces attributs fournissent des informations sur les éléments parsés de l'URL HTTP. Ils sont généralement générés à l'aide du [parser d'URL][12]. Tous les attributs sont précédés par `http.url_details`.

| **Nom complet**                   | **Type** | **Description**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | La partie de l'URL correspondant au host HTTP.                                                          |
| `http.url_details.port`        | `number` | La partie de l'URL correspondant au port HTTP.                                                          |
| `http.url_details.path`        | `string` | La partie de l'URL correspondant au chemin HTTP.                                                          |
| `http.url_details.queryString` | `object` | Les parties de l'URL correspondant à la chaîne de requête HTTP, décomposées en attributs key/value de paramètres de requête. |
| `http.url_details.scheme`      | `string` | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

#### Attributs user-agent

Ces attributs fournissent des informations sur la signification des attributs user-agent. Ils sont généralement générés à l'aide du [parser de user-agent][13]. Tous les attributs sont précédés par `http.useragent_details`.

| **Nom complet**                            | **Type** | **Description**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | La famille du système d'exploitation indiquée par le user-agent.      |
| `http.useragent_details.browser.family` | `string` | La famille de navigateurs indiquée par le user-agent. |
| `http.useragent_details.device.family`  | `string` | La famille d'appareils indiquée par le user-agent.  |

### Code source

Ces attributs sont liés aux données utilisées lorsqu'un log ou une erreur est généré(e) via un logger dans une application personnalisée. Tous les attributs sont précédés par `logger` ou `error`.

| **Nom complet**         | **Type** | **Description**                                                  |
| :------------------- | :------- | :--------------------------------------------------------------- |
| `logger.name`        | `string` | Le nom du logger.                                          |
| `logger.thread_name` | `string` | Le nom du thread actuel lorsque le log est envoyé.            |
| `logger.method_name` | `string` | Le nom de la méthode de la classe.                                           |
| `logger.version`     | `string` | La version du logger.                                       |
| `error.kind`         | `string` | Le type ou la catégorie d'erreur (ou le code dans certains cas).                  |
| `error.message`      | `string` | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`        | `string` | La trace de pile ou les informations complémentaires relatives à l'erreur. |

Des intégrations comme _Java_, _NodeJs_, _.NET_, _Golang_ ou encore _Python_ reposent sur ces attributs.

### Base de données

Les attributs liés à une base de données sont précédés par `db`.

| **Nom complet**   | **Type** | **Description**                                                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `db.instance`  | `string` | Nom de l'instance de la base de données. Par exemple, dans Java, pour `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, le nom de l'instance est `customers`.       |
| `db.statement` | `string` | Une déclaration de base de données pour le type de base de données fourni. Par exemple, `"SELECT * FROM wuser_table";` pour mySQL et `"SET mykey 'WuValue'"` pour Redis. |
| `db.operation` | `string` | L'opération effectuée (« query », « update », « delete », etc.).                                                                   |
| `db.user`      | `string` | L'utilisateur à l'origine de l'opération.                                                                                                     |

Des intégrations comme [Cassandra][14], [MySQL][15], [RDS][16] ou encore [Elasticsearch][17] reposent sur ces attributs.

### Performances

Attributs des métriques de performance.

| **Nom complet** | **Type** | **Description**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | Toute durée en **nanosecondes** : le délai de réponse HTTP, le délai d'interrogation d'une base de données, la latence, etc. |

Étant donné que cet attribut est affiché et utilisé comme [mesure][19] par défaut pour la [recherche de traces][20], nous vous conseillons de [remapper][18] toutes les durées de vos logs sur cet attribut.

### Attributs associés à l'utilisateur

Tous les attributs et toutes les mesures sont précédés par `usr`.

| **Nom complet** | **Type** | **Description**         |
| :----------- | :------- | :---------------------- |
| `usr.id`     | `string` | L'identifiant de l'utilisateur.    |
| `usr.name`   | `string` | Le nom courant de l'utilisateur. |
| `usr.email`  | `string` | L'adresse e-mail de l'utilisateur.         |

### Syslog shippers et log shippers

Ces attributs sont liés aux données ajoutées par un Agent syslog-shipper ou log-shipper. Tous les champs et toutes les métriques sont précédés par `syslog`.

| **Nom complet**       | **Type** | **Description**                                                               |
| :----------------- | :------- | :---------------------------------------------------------------------------- |
| `syslog.hostname`  | `string` | Le hostname.                                                                  |
| `syslog.appname`   | `string` | Le nom de l'application. Généralement remappé vers l'attribut réservé `service`. |
| `syslog.severity`  | `number` | La sévérité du log. Généralement remappée vers l'attribut réservé `status`.      |
| `syslog.timestamp` | `string` | Le timestamp du log. Généralement remappé vers l'attribut réservé `date`.       |
| `syslog.env`       | `string` | Le nom de l'environnement d'où provient la source des logs.                      |

Des intégrations comme [Rsyslog][21], [NxLog][22], [Syslog-ng][23], [Fluentd][24] ou encore [Logstash][25] reposent sur ces attributs.

### DNS

Tous les attributs et toutes les mesures sont précédés par `dns`.

| **Nom complet**         | **Type** | **Description**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | L'identificateur de la question DNS.                                                 |
| `dns.question.name`  | `string` | L'URL de l'adresse IP que la requête DNS souhaite trouver.                  |
| `dns.question.type`  | `string` | Un [code de deux octets][26] spécifiant le type de question DNS.             |
| `dns.question.class` | `string` | La classe recherchée par la question DNS (p. ex. IN lorsque vous utilisez Internet). |
| `dns.question.size`  | `number` | La taille de la question DNS en octets.                                           |
| `dns.answer.name`    | `string` | Le nom de domaine interrogé.                                                  |
| `dns.answer.type`    | `string` | Un [code de deux octets][26] spécifiant le type de réponse DNS.               |
| `dns.answer.class`   | `string` | La classe correspondant à la réponse du DNS.                                            |
| `dns.answer.size`    | `number` | La taille de la réponse du DNS en octets.                                             |
| `dns.flags.rcode`    | `string` | Le code de réponse du DNS.                                                       |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: /fr/integrations/apache/
[3]: /fr/integrations/amazon_cloudfront/
[4]: /fr/logs/explorer/facets/#aliased-facets
[5]: /fr/logs/explorer/facets/#alias-facets
[6]: /fr/integrations/apache
[7]: /fr/integrations/varnish
[8]: /fr/integrations/amazon_elb
[9]: /fr/integrations/nginx
[10]: /fr/integrations/haproxy
[11]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[12]: /fr/logs/processing/processors/#url-parser
[13]: /fr/logs/processing/processors/#user-agent-parser
[14]: /fr/integrations/cassandra
[15]: /fr/integrations/mysql
[16]: /fr/integrations/amazon_rds
[17]: /fr/integrations/elastic
[18]: /fr/logs/processing/processors/#remapper
[19]: /fr/logs/explorer/facets
[20]: /fr/tracing/app_analytics/search
[21]: /fr/integrations/rsyslog
[22]: /fr/integrations/nxlog
[23]: /fr/integrations/syslog_ng
[24]: /fr/integrations/fluentd
[25]: /fr/integrations/logstash
[26]: https://en.wikipedia.org/wiki/List_of_DNS_record_types