---
aliases:
- /fr/logs/processing/attributes_naming_convention/
description: En savoir plus sur les attributs et comment prendre en charge une convention
  de nommage
further_reading:
- link: logs/log_configuration/pipelines
  tag: Documentation
  text: Découvrir les pipelines de Datadog
- link: logs/log_configuration/processors
  tag: Documentation
  text: Consulter la liste complète des processeurs disponibles
- link: logs/logging_without_limits
  tag: Documentation
  text: Logging without limit
- link: logs/explorer
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilisez des requêtes en notation CIDR pour filtrer vos journaux de trafic
    réseau
title: Attributs et alias
---
## Aperçu {#overview}

Centraliser les logs provenant de technologies et d'applications diverses peut générer des dizaines ou des centaines d'attributs différents dans un environnement Log Management, notamment lorsque plusieurs équipes travaillent dans le même environnement.

Par exemple, une adresse IP client peut avoir divers attributs de journal, tels que `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. Le temps d'exécution d'une requête peut être désigné par `exec_time`, `request_latency`, `request.time_elapsed`, etc.

Utilisez les **attributs** et l'**aliasing** pour unifier votre environnement de journaux.

## Types d'attributs et aliasing {#attribute-types-and-aliasing}

Les attributs déterminent les [facettes des logs][1] et les [tags][2], qui servent à filtrer le Log Explorer et à y effectuer des recherches.

  * [**Les attributs réservés**](#reserved-attributes) sont automatiquement ingérés.

  * [**Les attributs standards**](#standard-attributes) sont la colonne vertébrale de la convention de nommage pour votre organisation. Il existe un ensemble par défaut d'attributs standards disponibles dans [l'application][3]. Cependant, cette liste peut être personnalisée pour créer une **convention de nommage** pour votre équipe.

  Utilisez * l'aliasing**](#aliasing) une fois que vous avez mis en œuvre une convention de nommage avec des attributs standards ou si vous essayez de créer une facette standard unique à partir de plusieurs sources de journaux. Par exemple, suivez les clients les plus impactés par les latences sur une infrastructure hybride [Apache][4] et [Amazon Cloud Front][5], en utilisant la facette standard `Network Client IP` aux côtés du standard `duration`. L'aliasing permet de mettre en œuvre une convention de nommage sans avoir à changer la pile technique d'une équipe.

## Attributs réservés {#reserved-attributes}

Voici une liste d'attributs réservés qui sont automatiquement ingérés avec les journaux.

**Remarque** : Si vous collectez également des traces ou des métriques, il est recommandé de configurer le balisage de service unifié. Cette configuration relie la télémétrie Datadog grâce à l'utilisation de trois balises standard : `env`, `service` et `version`. Consultez la documentation dédiée au [balisage de service unifié][6] pour plus d'informations.

| Attribut | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | Le nom de l'hôte d'origine tel que défini dans les métriques. Datadog récupère automatiquement les balises d'hôte correspondantes de l'hôte correspondant dans Datadog et les applique à vos journaux. L'Agent définit cette valeur automatiquement.                          |
| `source`  | Cela correspond au nom de l'intégration, à la technologie dont le journal est issu. Lorsqu'il correspond à un nom d'intégration, Datadog installe automatiquement les parseurs et facettes correspondants. Par exemple, `nginx`, `postgresql`, etc. |
| `status`  | Cela correspond au niveau/sévérité d'un journal. Il est utilisé pour définir [des modèles][7] et a une mise en page dédiée dans l'interface utilisateur des journaux Datadog.                                                                                                     |
| `service` | Le nom de l'application ou du service générant les événements de journal. Il est utilisé pour passer des journaux à l'APM, donc assurez-vous de définir la même valeur lorsque vous utilisez les deux produits.                                                                |
| `trace_id` | Cela correspond à l'ID de trace utilisé pour les traces. Il est utilisé pour [corréler votre journal avec sa trace][8].                                                                                                                                 |
| `message` | Par défaut, Datadog ingère la valeur de l'attribut `message` comme le corps de l'entrée de journal. Cette valeur est ensuite mise en surbrillance et affichée dans Live Tail, où elle est indexée pour une recherche en texte intégral.                                    |

## Attributs standard {#standard-attributes}

Les intégrations de journaux s'appuient nativement sur un [ensemble par défaut][9] d'attributs standard.

Le tableau des attributs standard est accompagné d'un ensemble de [attributs standard prédéfinis](#default-standard-attribute-list). Vous pouvez compléter cette liste avec vos propres attributs et modifier ou supprimer les attributs standard existants.

### Créer un nouvel attribut standard {#create-a-new-standard-attribute}
**Les utilisateurs administrateurs** peuvent organiser la liste des attributs standard :
1. Accédez à la [page de configuration des attributs standard][3].
1. Cliquez {{< ui >}}New Standard Attribute{{< /ui >}}.
1. Définissez l'attribut standard :
    - {{< ui >}}Path{{< /ui >}} : Le chemin des attributs standard tel que vous le trouveriez dans votre JSON (par exemple, network.client.ip).
    - {{< ui >}}Type{{< /ui >}} : (`string`, `integer`, `double`, `boolean`) : Le type de l'attribut, qui est utilisé pour caster les éléments de la liste de remappage.
    - {{< ui >}}Description{{< /ui >}} : Description compréhensible par l'utilisateur de l'attribut.
    - (optionnel) {{< ui >}}Remapping list{{< /ui >}} : Liste séparée par des virgules des attributs non conformes qui doivent être remappés à l'attribut standard.

### Liste d'attributs standard par défaut {#default-standard-attribute-list}

Voir la liste complète des [attributs standards par défaut de gestion des logs][9], qui est divisée en domaines fonctionnels :
  
| Attribut Standard               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Réseau/communications][10]     | Ces attributs sont liés aux données utilisées dans la communication réseau. Tous les champs et métriques sont préfixés par `network`.                                                                                                                                                                                                                                                                                                                                                                             |
| [Géolocalisation][11]                | Ces attributs sont liés à la géolocalisation des adresses IP utilisées dans la communication réseau. Tous les champs sont préfixés par `network.client.geoip` ou `network.destination.geoip`.                                                                                                                                                                                                                                                                                                                     |
| [Requêtes HTTP][12]              | Ces attributs sont liés aux données couramment utilisées dans les requêtes et accès HTTP. Tous les attributs sont préfixés par `http`. Les intégrations typiques reposant sur ces attributs incluent [Apache][4], Rails, [AWS CloudFront][13], serveurs d'applications web, etc. Les attributs de détails d'URL sont préfixés par `http.url_details`. Ces attributs fournissent des détails sur les parties analysées de l'URL HTTP. Ils sont générés par le [parseur d'URL][14].                             |
| [Code source][15]                | Ces attributs sont liés aux données utilisées lorsqu'un log ou une erreur est généré à l'aide d'un logger dans une application personnalisée. Tous les attributs sont préfixés soit par `logger` soit par `error`. Les intégrations typiques reposant sur ces attributs incluent Java, Node.js, .NET, Golang, Python, etc.                                                                                                                                                                        |
| [Base de données][16]                   | Les intégrations typiques reposant sur ces attributs incluent [Cassandra][17], [MySQL][18], [RDS][19], [Elasticsearch][20], etc.                                                                                                                                                                                                                                                                                                                                                                         |
| [Performance][21]                | Ces attributs sont liés aux métriques de performance. Datadog recommande de [remapper][22] toutes les durées dans vos journaux sur cet attribut car elles sont affichées et utilisées comme une [mesure][1] par défaut pour [la recherche de traces][23].                                                                                                                                                                                                                                                                           |
| [Attributs liés à l'utilisateur][24]    | Tous les attributs et mesures sont préfixés par `usr`.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Syslog et expéditeurs de journaux][25]    | Ces attributs sont liés aux données ajoutées par un agent syslog ou un expéditeur de journaux. Tous les champs et métriques sont préfixés par `syslog`. Les intégrations qui en dépendent incluent [Rsyslog][26], [NxLog][27], [Syslog-ng][28], [Fluentd][29], et [Logstash][30].                                                                                                                                                                                                                                              |
| [DNS][31]                        | Tous les attributs et mesures sont préfixés par `dns`.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Événements][32]                     | Tous les attributs sont préfixés par `evt`.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Aliasing {#aliasing}

La création d'un alias pour un attribut source mappé avec un attribut cible permet aux logs de transmettre à la fois l'attribut source et cible.

Les utilisateurs peuvent interagir soit avec l'attribut facetté aliasé (source), soit avec l'attribut facetté standard (destination). Cependant, les utilisateurs sont [encouragés][33] à utiliser la facette standard plutôt que la facette aliasée. Cela fournit des indications sur la convention de nommage et décourage les utilisateurs de créer des actifs (tels que des vues enregistrées ou des tableaux de bord) basés sur un contenu non standard.

**Détails supplémentaires concernant l'aliasing** :

- L'aliasing se produit après que les journaux ont été traités par des pipelines. Tout attribut extrait ou traité peut être utilisé comme source pour l'aliasing.
- Datadog impose le type d'un attribut sous alias. Si cela n'est pas possible, l'aliasing est ignoré.
- Dans le cas d'un journal qui porte déjà l'attribut de destination, l'aliasing remplace la valeur de ce journal.
- Pour un attribut standard auquel plusieurs attributs sont aliasés, si un journal porte plusieurs de ces attributs source, un seul de ces attributs source est aliasé.
- Toute mise à jour ou ajout d'attributs standard ne s'applique qu'aux journaux nouvellement ingérés.
- Les attributs standard ne peuvent pas être aliasés.
- Les attributs ne peuvent être aliasés qu'à des attributs standard.
- Pour respecter la structure JSON des journaux, il n'est pas possible d'avoir un attribut standard comme enfant d'un autre (par exemple, `user` et `user.name` ne peuvent pas être tous deux des attributs standard).

Voir [Alias Facets][34] pour des informations supplémentaires.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: /fr/logs/search_syntax/#tags
[3]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[4]: /fr/integrations/apache/
[5]: /fr/integrations/amazon_cloudfront/
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: /fr/logs/explorer/patterns/
[8]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[9]: /fr/standard-attributes/?product=log+management
[10]: /fr/standard-attributes/?product=log+management&search=network
[11]: /fr/standard-attributes/?product=log+management&search=geolocation
[12]: /fr/standard-attributes/?search=http.&product=log+management
[13]: /fr/integrations/amazon_elb/
[14]: /fr/logs/log_configuration/processors/url_parser/
[15]: /fr/standard-attributes/?search=logger+error&product=log+management
[16]: /fr/standard-attributes/?search=db&product=log+management
[17]: /fr/integrations/cassandra/
[18]: /fr/integrations/mysql/
[19]: /fr/integrations/amazon_rds/
[20]: /fr/integrations/elastic/
[21]: /fr/standard-attributes/?search=duration&product=log+management
[22]: /fr/logs/log_configuration/processors/remapper/
[23]: /fr/tracing/app_analytics/search/
[24]: /fr/standard-attributes/?search=usr&product=log+management
[25]: /fr/standard-attributes/?search=syslog&product=log+management
[26]: /fr/integrations/rsyslog/
[27]: /fr/integrations/nxlog/
[28]: /fr/integrations/syslog_ng/
[29]: /fr/integrations/fluentd/
[30]: /fr/integrations/logstash/
[31]: /fr/standard-attributes/?search=dns&product=log+management
[32]: /fr/standard-attributes/?search=evt&product=log+management
[33]: /fr/logs/explorer/facets/#aliased-facets
[34]: /fr/logs/explorer/facets/#alias-facets