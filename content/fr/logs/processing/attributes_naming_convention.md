---
title: Attributs et alias
kind: documentation
description: Apprenez à utiliser les attributs et à appliquer une convention de nommage.
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

La centralisation des logs issus de diverses technologies et applications a tendance à générer des dizaines voire des centaines d'attributs différents dans un environnement de Log Management. C'est notamment le cas lorsque de nombreuses équipes travaillent au sein d'un même environnement.

Par exemple, l'IP d'un client peut contenir divers attributs de logs : `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. Les attributs `exec_time`, `request_latency` ou encore `request.time_elapsed` peuvent désigner le délai d'exécution d'une requête.

Utilisez les **attributs** et les **alias** afin d'unifier votre environnement de logs.

## Types d'attributs et alias

Les attributs déterminent les [facettes des logs][1] et les [tags][27], qui servent à filtrer le Log Explorer et à y effectuer des recherches.

  * Les [**attributs réservés**](#attributs-reserves) sont automatiquement ingérés.

  * Les [**attributs standard**](#attributs-standard) constituent la base de la convention de nommage de votre organisation. Un ensemble d'attributs standard par défaut est disponible dans [l'app][2]. Néanmoins, cette liste peut être personnalisée afin de créer une **convention de nommage** pour votre équipe.

  * Vous pouvez utiliser des [**alias**](#alias) après avoir implémenté une convention de nommage avec des attributs standard, ou encore pour créer une facette standard unique provenant de plusieurs sources de logs. Il est par exemple possible de surveiller les clients qui souffrent le plus de latence dans une infrastructure hybride basée sur [Apache][3] et [Amazon Cloud Front][4] à l'aide de la facette standard `Network Client IP` et de la `duration` standard. Les alias permettent d'implémenter une convention de nommage sans avoir à modifier la pile technique d'une équipe.

## Attributs réservés

Vous trouverez ci-dessous la liste des attributs réservés qui sont automatiquement ingérés avec les logs :

**Remarque** : si vous recueillez également des traces ou des métriques, nous vous conseillons de configurer le tagging de service unifié. Cette configuration lie entre elles les données de télémétrie de Datadog à l'aide de trois tags standard : `env`, `service` et `version`. Consultez la [documentation dédiée][5] pour en savoir plus.

| Attribut | Rôle                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | Le nom du host d'origine, tel que défini dans les métriques. Nous récupérons automatiquement les tags de host correspondants à partir du host associé dans Datadog. Nous les appliquons ensuite à vos logs. L'Agent définit automatiquement cette valeur.                          |
| `source`  | Cet attribut correspond au nom de l'intégration, à savoir la technologie à l'origine du log. Lorsqu'il a pour valeur le nom d'une intégration, Datadog installe automatiquement les parsers et les facettes correspondants. Par exemple : `nginx`, `postgresql`, etc. |
| `status`  | Cet attribut correspond au niveau ou à la sévérité d'un log. Il permet de définir des [patterns][6]. L'interface des log Datadog comporte une disposition distincte pour cet attribut.                                                                                                     |
| `service` | Le nom de l'application ou du service qui génère les événements de log. Il est utilisé pour passer des logs à l'APM. Assurez-vous donc de définir la même valeur lorsque vous utilisez les deux produits.                                                                |
| `trace_id` | Cet attribut correspond à l'ID des traces. Il sert à [mettre en corrélation votre log avec sa trace][28].                                                                                                                                 |
| `message` | Par défaut, Datadog ingère la valeur de l'attribut `message` en la considérant comme le corps de l'entrée de log. Cette valeur est alors mise en avant et affichée sur la page Live Tail. Elle est également indexée afin de pouvoir effectuer des recherches en texte intégral.                                    |

## Attributs standard

Les intégrations de logs reposent nativement sur un [ensemble](#liste-d-attributs-standard-par-defaut) d'attributs standard fourni par défaut.

Les administrateurs de votre organisation peuvent ajuster la liste des attributs standard :

- **Transformez** des attributs existants en attributs standard depuis la vue [Log Explorer][1].
- **Créez** des attributs standard depuis la [page de configuration][2].

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Attributs standard" style="width:60%;">}}

Le tableau des attributs standard est doté d'un ensemble d'[attributs standard prédéfinis](#liste-des-attributs-standard-par-defaut). Vous pouvez ajouter vos propres attributs à cette liste et modifier ou supprimer des attributs standard existants :

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Modifier les attributs standard" style="width:80%;">}}

Un attribut standard est défini par les éléments suivants :

- `Path` : le chemin de l'attribut **transformé** en attribut standard, tel qu'il apparaît dans votre fichier JSON (p. ex., `network.client.ip`).
- `Type` (`string`, `integer`, `double`, `boolean`) : le type de l'attribut utilisé pour convertir les éléments de la liste de remappage.
- `Aliasing list` : la liste des attributs pour lesquels un **alias** est créé, séparés par des virgules.
- `Description` : la description lisible de l'attribut.

Le volet des attributs standard s'affiche lorsque vous ajoutez un nouvel attribut standard ou que vous modifiez un attribut existant :

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Définir un attribut standard" style="width:80%;">}}

### Liste des attributs standard par défaut

La liste des attributs standard par défaut comporte plusieurs catégories fonctionnelles :

- [Réseau/communications](#network)
- [Requêtes HTTP](#http-requests)
- [Code source](#source-code)
- [Base de données](#database)
- [Performances](#performance)
- [Attributs associés à l'utilisateur](#user-related-attributes)
- [Syslog shippers et log shippers](#syslog-and-log-shippers)
- [DNS](#dns)

#### Réseau

Les attributs suivants sont liés aux données de communication réseau. Tous les champs et toutes les métriques sont précédés par `network`.

| **Nom complet**               | **Type** | **Description**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | L'adresse IP du client à l'origine de la connexion TCP.                          |
| `network.destination.ip`   | `string` | L'adresse IP à laquelle le client est connecté.                                                  |
| `network.client.port`      | `number` | Le port du client à l'origine de la connexion.                                    |
| `network.destination.port` | `number` | Le port TCP auquel le client s'est connecté.                                                    |
| `network.bytes_read`       | `number` | Le nombre total d'octets transmis depuis le client vers le serveur lorsque le log est envoyé. |
| `network.bytes_written`    | `number` | Le nombre total d'octets transmis depuis le serveur vers le client lorsque le log est envoyé. |

Des intégrations comme [Apache][3], [Varnish][7], [AWS ELB][8], [Nginx][9] ou encore [HAProxy][10] reposent sur ces attributs.

#### Géolocalisation

Les attributs suivants sont liés à la géolocalisation des adresses IP utilisées dans les communications réseau. Tous les champs sont précédés par `network.client.geoip` ou `network.destination.geoip`.

| **Nom complet**                                | **Type** | **Description**                                                                                                                      |
| :------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `network.client.geoip.country.name`         | `string` | Le nom du pays.                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | Le [code ISO][5] du pays (par exemple, `US` pour les États-Unis, `FR` pour la France).                                                  |
| `network.client.geoip.continent.code`       | `string` | Code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | Nom du continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | Nom du premier niveau de division du pays (par exemple : `California` aux États-Unis ou le département de la `Sarthe` en France) |
| `network.client.geoip.subdivision.iso_code` | `string` | [Code ISO][5] du premier niveau de division du pays (par exemple : `CA` aux États-Unis ou le département `SA` en France)    |
| `network.client.geoip.city.name`            | `String` | Le nom de la ville (par exemple : `Paris`, `New York`)                                                                                   |

#### Requêtes HTTP

Ces attributs sont liés aux données couramment utilisées dans les accès et requêtes HTTP. Tous les attributs sont précédés par `http`.

Des intégrations comme [Apache][3], Rails, [AWS CloudFront][8] ou encore des serveurs d'application Web reposent sur ces attributs.

##### Attributs courants

| **Nom complet**       | **Type** | **Description**                                                                                           |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| `http.url`         | `string` | L'URL de la requête HTTP.                                                                              |
| `http.status_code` | `number` | Le code de statut de la réponse HTTP.                                                                            |
| `http.method`      | `string` | Indique l'action à effectuer pour une ressource donnée.                                        |
| `http.referer`     | `string` | Le champ d'en-tête HTTP qui identifie l'adresse de la page Web liée à la ressource demandée. |
| `http.request_id`  | `string` | L'ID de la requête HTTP.                                                                               |
| `http.useragent`   | `string` | Le user-agent tel qu'il est envoyé (format brut). [Consultez les informations ci-dessous pour en savoir plus](#attributs-user-agent).          |
| `http.version`     | `string` | La version HTTP utilisée pour la requête.                                                                 |

##### Attributs liés aux détails de l'URL

Ces attributs fournissent des informations sur les éléments parsés de l'URL HTTP. Ils sont généralement générés à l'aide du [parser d'URL][11]. Tous les attributs sont précédés par `http.url_details`.

| **Nom complet**                   | **Type** | **Description**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | La partie de l'URL correspondant au host HTTP.                                                          |
| `http.url_details.port`        | `number` | La partie de l'URL correspondant au port HTTP.                                                          |
| `http.url_details.path`        | `string` | La partie de l'URL correspondant au chemin HTTP.                                                          |
| `http.url_details.queryString` | `object` | Les parties de l'URL correspondant à la chaîne de requête HTTP, décomposées en attributs key/value de paramètres de requête. |
| `http.url_details.scheme`      | `string` | Le nom du protocole de l'URL (HTTP ou HTTPS).                                            |

##### Attributs user-agent

Ces attributs fournissent des informations sur la signification des attributs user-agent. Ils sont généralement générés à l'aide du [parser de user-agent][12]. Tous les attributs sont précédés par `http.useragent_details`.

| **Nom complet**                            | **Type** | **Description**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | La famille du système d'exploitation indiquée par le user-agent.      |
| `http.useragent_details.browser.family` | `string` | La famille de navigateurs indiquée par le user-agent. |
| `http.useragent_details.device.family`  | `string` | La famille d'appareils indiquée par le user-agent.  |

#### Code source

Ces attributs sont liés aux données utilisées lorsqu'un log ou une erreur est généré(e) via un logger dans une application personnalisée. Tous les attributs sont précédés par `logger` ou `error`.

| **Nom complet**         | **Type** | **Description**                                                  |
| :------------------- | :------- | :--------------------------------------------------------------- |
| `logger.name`        | `string` | Le nom du logger.                                          |
| `logger.thread_name` | `string` | Le nom du thread actuel lorsque le log est envoyé.            |
| `logger.method_name` | `string` | Le nom de la méthode de la classe.                                           |
| `logger.version`     | `string` | La version du logger.                                       |
| `error.kind`         | `string` | Le type ou la catégorie d'erreur (ou le code dans certains cas).                  |
| `error.message`      | `string` | Un message d'une ligne lisible et concis décrivant l'événement. |
| `error.stack`        | `string` | La stack trace ou les informations complémentaires relatives à l'erreur. |

Des intégrations comme _Java_, _NodeJs_, _.NET_, _Golang_ ou encore _Python_ reposent sur ces attributs.

#### Base de données

Les attributs liés à une base de données sont précédés par `db`.

| **Nom complet**   | **Type** | **Description**                                                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `db.instance`  | `string` | Nom de l'instance de la base de données. Par exemple, dans Java, pour `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, le nom de l'instance est `customers`.       |
| `db.statement` | `string` | Une déclaration de base de données pour le type de base de données fourni. Par exemple, `"SELECT * FROM wuser_table";` pour mySQL et `"SET mykey 'WuValue'"` pour Redis. |
| `db.operation` | `string` | L'opération effectuée (« query », « update », « delete », etc.).                                                                   |
| `db.user`      | `string` | L'utilisateur à l'origine de l'opération.                                                                                                     |

Des intégrations comme [Cassandra][13], [MySQL][14], [RDS][15] ou encore [Elasticsearch][16] reposent sur ces attributs.

#### Performances

Attributs des métriques de performance.

| **Nom complet** | **Type** | **Description**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | Toute durée en **nanosecondes** : le délai de réponse HTTP, le délai d'interrogation d'une base de données, la latence, etc. |

Étant donné que cet attribut est affiché et utilisé comme [mesure][1] par défaut pour la [recherche de traces][18], nous vous conseillons de [remapper][17] toutes les durées de vos logs sur cet attribut.

#### Attributs associés à l'utilisateur

Tous les attributs et toutes les mesures sont précédés par `usr`.

| **Nom complet** | **Type** | **Description**         |
| :----------- | :------- | :---------------------- |
| `usr.id`     | `string` | L'identifiant de l'utilisateur.    |
| `usr.name`   | `string` | Le nom courant de l'utilisateur. |
| `usr.email`  | `string` | L'adresse e-mail de l'utilisateur.         |

#### Syslog shippers et log shippers

Ces attributs sont liés aux données ajoutées par un Agent syslog-shipper ou log-shipper. Tous les champs et toutes les métriques sont précédés par `syslog`.

| **Nom complet**       | **Type** | **Description**                                                               |
| :----------------- | :------- | :---------------------------------------------------------------------------- |
| `syslog.hostname`  | `string` | Le hostname.                                                                  |
| `syslog.appname`   | `string` | Le nom de l'application. Généralement remappé vers l'attribut réservé `service`. |
| `syslog.severity`  | `number` | La gravité du log. Généralement remappée vers l'attribut réservé `status`.      |
| `syslog.timestamp` | `string` | Le timestamp du log. Généralement remappé vers l'attribut réservé `date`.       |
| `syslog.env`       | `string` | Le nom de l'environnement d'où provient la source des logs.                      |

Des intégrations comme [Rsyslog][19], [NxLog][20], [Syslog-ng][21], [Fluentd][22] ou encore [Logstash][23] reposent sur ces attributs.

#### DNS

Tous les attributs et toutes les mesures sont précédés par `dns`.

| **Nom complet**         | **Type** | **Description**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | L'identificateur de la question DNS.                                                 |
| `dns.question.name`  | `string` | Le nom de domaine interrogé.                                                  |
| `dns.question.type`  | `string` | Un [code de deux octets][24] spécifiant le type de question DNS.             |
| `dns.question.class` | `string` | La classe recherchée par la question DNS (p. ex. IN lorsque vous utilisez Internet). |
| `dns.question.size`  | `number` | La taille de la question DNS en octets.                                           |
| `dns.answer.name`    | `string` | L'adresse IP avec laquelle le DNS répond.                                 |
| `dns.answer.type`    | `string` | Un [code de deux octets][24] spécifiant le type de réponse DNS.               |
| `dns.answer.class`   | `string` | La classe correspondant à la réponse du DNS.                                            |
| `dns.answer.size`    | `number` | La taille de la réponse du DNS en octets.                                             |
| `dns.flags.rcode`    | `string` | Le code de réponse du DNS.                                                       |

#### Événements

Tous les attributs sont précédés par `evt`.

| **Nom complet** | **Type** | **Description**                                                                       |
|:--------------|:---------|:-------------------------------------------------------------------------------------|
| `evt.name`    | `string` | Le nom partagé entre les événements générés par une même activité (p. ex., authentification). |
| `evt.outcome` | `string` | Le résultat de l'événement (p. ex., `success`, `failure`).                                 |

## Alias

La création d'un alias pour un attribut source mappé avec un attribut cible permet aux logs de transmettre à la fois l'attribut source et cible.

Les utilisateurs peuvent choisir d'interagir entre l'attribut à facette avec alias (l'attribut source) ou standard (l'attribut cible). Les utilisateurs sont cependant [invités][25] à utiliser la facette standard plutôt que celle avec un alias. Cela les incite à respecter la convention de nommage et réduit la création de ressources (comme des vues enregistrées ou des dashboards) à partir de contenu atypique.

Voici quelques **informations supplémentaires concernant l'utilisation d'alias** :

- L'application d'alias s'effectue après le traitement des logs par les pipelines. Tout attribut extrait ou traité peut être utilisé comme source pour un alias.
- Datadog applique le type d'attribut avec un alias. Si ce n'est pas possible, l'alias n'est pas créé.
- Lorsqu'un log transmet déjà l'attribut cible, l'alias écrase la valeur.
- Lorsque plusieurs attributs possèdent un alias vers un attribut standard, si le log transmet plusieurs de ces attributs source, un alias n'est appliqué qu'à un seul des attributs source.
- Il est uniquement possible de modifier ou d'ajouter des informations pour un attribut standard d'un log récemment ingéré.
- Il est impossible d'appliquer un alias à un attribut standard.
- Un alias peut uniquement être créé vers un attribut standard.
- Pour respecter la structure JSON des logs, il n'est pas possible qu'un attribut standard soit l'enfant d'un autre (par exemple, `user` et `user.name` ne peuvent pas être tous les deux des attributs standard).

Consultez la [documentation à ce sujet][26] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[3]: /fr/integrations/apache/
[4]: /fr/integrations/amazon_cloudfront/
[5]: /fr/getting_started/tagging/unified_service_tagging/
[6]: /fr/logs/explorer/patterns/
[7]: /fr/integrations/varnish/
[8]: /fr/integrations/amazon_elb/
[9]: /fr/integrations/nginx/
[10]: /fr/integrations/haproxy/
[11]: /fr/logs/processing/processors/#url-parser
[12]: /fr/logs/processing/processors/#user-agent-parser
[13]: /fr/integrations/cassandra/
[14]: /fr/integrations/mysql/
[15]: /fr/integrations/amazon_rds/
[16]: /fr/integrations/elastic/
[17]: /fr/logs/processing/processors/#remapper
[18]: /fr/tracing/app_analytics/search/
[19]: /fr/integrations/rsyslog/
[20]: /fr/integrations/nxlog/
[21]: /fr/integrations/syslog_ng/
[22]: /fr/integrations/fluentd/
[23]: /fr/integrations/logstash/
[24]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
[25]: /fr/logs/explorer/facets/#aliased-facets
[26]: /fr/logs/explorer/facets/#alias-facets
[27]: /fr/logs/search_syntax/#tags
[28]: /fr/tracing/connect_logs_and_traces/