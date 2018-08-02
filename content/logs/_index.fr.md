---
title: Log Management
kind: Documentation
description: "Configurez votre Agent Datadog pour rassembler les logs de votre hôte, de vos conteneurs et de vos services."
further_reading:
- link: "logs/analytics"
  tag: "Documentation"
  text: "Construire des analyses de log"
- link: "logs/processing"
  tag: "Documentation"
  text: Apprenez à traiter vos logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: En savoir plus sur le parsing
---

La solution Log Management est une solution complète tout-en-un qui comprend [la collecte][34], [le processing][33], le live tailing, [l'exploration][17], [la création de graphiques][23], [la préparation de dashboards][36], [les alertes][35] et l'archivage de l'ensemble des logs générés par [votre application][16], ainsi que votre infrastructure.

{{< vimeo 243374392 >}}

## Collecte de logs

La collecte de log est le début de votre voyage dans le monde merveilleux de la gestion des logs. Utilisez [l'agent Datadog][6] pour collecter directement les logs à partir de vos hôtes ou de vos environnements conteneurisés. Vous pouvez collecter les logs de service AWS avec notre [fonction AWS Lambda](#from-aws-services). Si vous utilisez déjà un daemon log-shipper, consultez notre documentation dédiée pour [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] et [Logstash][5].

Les intégrations et la collecte de logs sont étroitement liées. En collectant les logs de façon adéquate, vous êtes en mesure d'assurer la configuration automatique de tous les composants associés tels que [le processing][33], [le parsing][29] et [les facettes][18] dans l'explorateur. **[Découvrir les intégrations de log actuellement prises en charge par Datadog][37]**. Vous pouvez également définir des sources de log personnalisées s'il n'existe pas encore d'intégration pour votre source.

<div class="alert alert-warning">
Toutes les intégrations n'incluent pas les configurations pour la collecte de logs.  <a href="https://docs.datadoghq.com/integrations/#cat-log-collection">Consultez la liste actuelle des intégrations prenant en charge la collecte de log.</a>.
</div>

Vous trouverez ci-dessous les techniques et les emplacements pris en charge pour la collecte de logs.

### À partir de vos hôtes

Suivez les [instructions d'installation de l'agent Datadog][6] pour commencer à transférer des logs avec vos métriques et vos traces.
L'agent permet d'effectuer un [tail de fichiers de log][7] ou de [détecter les logs envoyés par UDP/TCP][8]. Vous pouvez également le configurer pour [exclure des logs][9], [scruber les données sensibles][10] ou agréger [les logs à plusieurs lignes][11].

### À partir d'un environnement Docker

L'agent Datadog peut [collecter des logs directement à partir d'un stdout/stderr de conteneur][14] sans utiliser de driver de logs. Lorsque le check docker de l'Agent est activé, les métadonnées du système d'orchestration et du conteneur sont automatiquement ajoutées à vos logs en tant que tags.

Il est possible de collecter les logs de tous vos conteneurs ou d'un sous-ensemble filtré par image de conteneur, par label ou par nom. Autodiscovery peut également être utilisé pour configurer la collecte de logs directement dans les labels de conteneur.

Dans les environnements Kubernetes, vous pouvez également exploiter [l'installation daemonset][15].

### À partir des services AWS

L'agent Datadog peut être utilisé pour collecter les logs directement des instances ECS ou EC2 et des applications qui les utilisent.

Cependant, les logs des services AWS sont collectés grâce à notre [fonction Lambda][12]. Les déclencheurs sont définis ([manuellement ou automatiquement][13]) pour transférer les logs à partir de n'importe quel compartiment S3, groupe de logs Cloudwatch ou événement Cloudwatch.

### À partir d'un forwarder personnalisé

Nous avons un endpoint TCP `intake.logs.datadoghq.com` qui est accessible sur le port `10516` (pour une connexion sécurisée) ou `10514`. Ainsi, tous les processus personnalisés et toutes les [bibliothèques de logging][16] capables de transférer des logs par TCP peuvent être utilisés.

### Attributs réservés

Voici quelques attributs clés auxquels vous devez faire attention lors de la configuration de votre projet :

| Attribut   | Description                                                                                                                                                                                           |
| :-------    | :------                                                                                                                                                                                               |
| **Host**    | Le nom de l'hôte d'origine comme défini dans les métriques. Nous récupérons automatiquement les tags d'hôte correspondants à partir de l'hôte associé dans Datadog et nous les appliquons à vos logs. L'Agent définit automatiquement cette valeur.                          |
| **Source**  | Cet attribut correspond au nom de l'intégration : la technologie à l'origine du log. Lorsqu'il correspond au nom d'une intégration, Datadog installe automatiquement les parseurs et les facettes associés. Par exemple : nginx, postgresql, etc.|
| **Service** | Il s'agit du nom de l'application ou du service qui génère les événements de log. Il est utilisé pour passer de Logs à APM. Veillez donc à définir la même valeur lorsque vous utilisez les deux produits.                       |
| **Message** | Par défaut, Datadog ingère l'attribut `message` comme corps de l'entrée de log. Cette valeur est alors mise en surbrillance et affichée dans le flux de logs, où elle est indexée pour la recherche de texte intégral.               |

Vos logs sont désormais collectés et centralisés dans la vue [Explorateur de logs][17], mais ce n'est que le commencement : vous pouvez maintenant rechercher, enrichir et créer des alertes sur vos logs.

{{< img src="logs/log_explorer_view.png" alt="Log explorer view" responsive="true" >}}

## Rechercher dans vos logs

Si votre environnement dépend de certaines intégrations, alors les processors, les parseurs et les facettes sont probablement déjà installés. Utilisez les [facettes][18] d'intégration ou [ajoutez des facettes personnalisées][19] pour découper vos logs comme bon vous semble. Vous pouvez également utiliser les tags partagés par les logs, les métriques et les traces pour filtrer vos données ou même effectuer une [recherche de texte libre][20] sur le message de log :

{{< img src="logs/search_your_logs.gif" alt="Search your logs" responsive="true" >}}

Suivez notre [guide pour explorer vos logs][17] pour une explication plus détaillée de toutes les fonctions de l'explorateur de log, y compris les caractères génériques et les requêtes de valeurs numériques.

## Graphiques et analyses

Maintenant que vos logs sont parsés et que vous avez des facettes et une mesure sur les attributs importants, vous pouvez créer des graphiques à partir des requêtes de log et voir le maximum, les moyennes, les percentiles, les valeurs uniques et bien plus encore.

1. Choisissez une [mesure][21] ou une [facette][18] à représenter sous forme de graphique. [Une mesure][21] vous permet de choisir une fonction d'agrégation tandis qu'une [facette][18] affiche le nombre de valeurs uniques.
2. Sélectionnez la fonction d'agrégation pour la [mesure][21] que vous souhaitez représenter :
3. Utilisez un tag ou une [facette][18] pour séparer le graphique.
4. Choisissez d'afficher les X valeurs les plus élevées ou les plus faibles en fonction de la [mesure][21] sélectionnée.

{{< img src="logs/log_graph.png" alt="Log Analytics" responsive="true" style="width:70%;">}}

Pour afficher les logs correspondant à une valeur ou à une plage de valeurs dans le graphique, cliquez simplement sur le point souhaité et choisissez « [afficher les logs][22] » pour ouvrir un volet contextuel contenant tous les logs associés :

Suivez notre [guide sur la création de graphiques à partir de logs][23] pour en savoir plus sur l'option de création de graphiques.

## Processing de logs

Pour les logs en provenance d'une intégration, vous pouvez ignorer cette section, car les pipelines de processing d'intégration de Datadog seront automatiquement activés et parseront vos logs de manière adéquate et pratique. Pour les logs personnalisés au format JSON ou Syslog, nous proposons également des processors d'intégration qui extraient automatiquement les attributs importants des logs bruts. Vous pouvez ainsi tirer pleinement parti d'un très grand nombre de logs sans aucune configuration manuelle.

Cela étant, si vous avez modifié vos logs d'intégration ou si vos logs personnalisés ne sont pas au format JSON ou Syslog, vous bénéficiez toujours d'un contrôle total sur la manière dont les logs sont traités à partir de la page Pipeline de processing dans votre application Datadog centralisée. De cette façon, si vous souhaitez modifier la manière dont votre solution Log Management consomme vos logs, vous n'avez pas à changer votre manière de logger et vous n'avez pas à déployer de modifications sur les règles de processing côté serveur.

### Logs JSON

Comme expliqué plus haut, Datadog propose des [attributs réservés][24] tels que timestamp, status, host, service et même le message de log.
Si vous avez des noms d'attribut différents, pas d'inquiétude. Utilisez les [remappeurs d'attributs réservés][25] disponibles dans le pipeline.

Par exemple, prenons un service qui génère les logs ci-dessous :

```json
{
    "myhost": "host123",
    "myapp": "test-web-2",
    "logger_severity": "Error",
    "log": "cannot establish connection with /api/v1/test",
    "status_code": 500
}
```

Accéder au pipeline et modifier le mappage par défaut par le suivant :

{{< img src="logs/reserved_attribute_remapper.png" alt="Reserved attribute remapper" responsive="true" style="width:70%;">}}

Donnerait alors le log suivant :

{{< img src="logs/log_post_remapping.png" alt="Log post remapping" responsive="true" style="width:70%;">}}

### Règles de processing de log personnalisées

Pour les logs d'intégration, nous installons automatiquement un pipeline qui prend en charge le parsing de vos logs, comme dans l'exemple suivant pour les logs ELB :

{{< img src="logs/elb_log_post_processing.png" alt="ELB log post processing" responsive="true" style="width:70%;">}}

* Un [pipeline][26] prend un sous-ensemble filtré de logs entrants et leur applique une liste de processors séquentiels.
* Un processor exécute au sein d'un [pipeline][26] une action de structuration des données ([remappage d'un attribut][27], [parsing Grok][28], etc.) sur un log.


En revanche, nous savons que les formats de log peuvent être totalement personnalisés. C'est pourquoi vous pouvez définir des règles de processing personnalisées.
En utilisant la syntaxe de log de votre choix, vous pouvez extraire tous vos attributs et, lorsque nécessaire, les remapper vers des attributs plus globaux ou canoniques.

Par exemple, avec des règles de processing personnalisées, vous pouvez transformer ce log :

{{< img src="logs/log_pre_processing.png" alt="Log pre processing" responsive="true" style="width:50%;">}}

En celui ci :

{{< img src="logs/log_post_processing.png" alt="Log post processing" responsive="true" style="width:50%;">}}

Suivez notre [guide de formation au parsing][29] pour en savoir plus sur le parsing.
Nous avons également un guide des [Meilleures pratiques de parsing][30] et un guide de [Troubleshooting de parsing][31] qui pourraient vous intéresser.
Il existe de nombreuses sortes de processors. Pour obtenir la liste complète et découvrir comment les utiliser, [cliquez ici][32].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/rsyslog
[2]: /integrations/syslog_ng
[3]: /integrations/nxlog
[4]: /integrations/fluentd/#log-collection
[5]: /integrations/logstash/#log-collection
[6]: /logs/log_collection/#getting-started-with-the-agent
[7]: /logs/log_collection/#tail-existing-files
[8]: /logs/log_collection/#stream-logs-through-tcp-udp
[9]: /logs/log_collection/#filter-logs
[10]: /logs/log_collection/#scrub-sensitive-data-in-your-logs
[11]: /logs/log_collection/#multi-line-aggregation
[12]: /integrations/amazon_web_services/#log-collection
[13]: /integrations/amazon_web_services/#enable-logging-for-your-aws-service
[14]: /logs/log_collection/docker/
[15]: /agent/basic_agent_usage/kubernetes/#log-collection-setup
[16]: /logs/languages/
[17]: /logs/explore
[18]: /logs/explore/#facets
[19]: /logs/explore/#create-a-facet
[20]: /logs/explore/#search-syntax
[21]: /logs/explore/#measures
[22]: /logs/analytics/#related-logs
[23]: /logs/analytics/
[24]: /logs/log_collection/#reserved-attributes
[25]: /logs/log_collection/#edit-reserved-attributes
[26]: /logs/processing/#processing-pipelines
[27]: /logs/processing/#attribute-remapper
[28]: /logs/processing/#grok-parser
[29]: /logs/processing/parsing/
[30]: /logs/faq/log-parsing-best-practice/
[31]: /logs/faq/how-to-investigate-a-log-parsing-issue/
[32]: /logs/processing/#processors
[33]: /logs/processing
[34]: /logs/log_collection/
[35]: /monitors/monitor_types/log
[36]: /graphing/dashboards/widgets/#timeseries
[37]: /integrations/#cat-log-collection
