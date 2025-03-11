---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centre d'apprentissage
  text: Présentation de Log Management
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: Centre d'apprentissage
  text: Des analyses plus poussées grâce au traitement des logs
- link: /logs/log_collection/
  tag: Documentation
  text: Collecte de logs et intégrations
- link: /getting_started/tagging/unified_service_tagging
  tag: Documentation
  text: Apprendre à configurer le tagging de service unifié
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour optimiser votre gestion des logs
title: Débuter avec les logs
---

## Présentation

Utilisez la fonction Datadog Log Management, également appelée logs, pour recueillir les logs issus de plusieurs sources de journalisation, comme votre serveur, votre conteneur, votre environnement Cloud, votre application ou vos processeurs et forwarders de logs existants. Avec un système de journalisation conventionnel, vous devez choisir les logs à analyser et à conserver afin de limiter les coûts. La fonctionnalité Logging without Limits* de Datadog vous permet de recueillir, traiter, archiver, explorer et surveiller vos logs sans limites de journalisation.

Cette page vous montre comment débuter avec la solution Log Management dans Datadog. Si vous ne l'avez pas encore fait, créez un [compte Datadog][1].

## Configurer une source de journalisation

Avec la solution Log Management, vous pouvez analyser et explorer vos données dans le Log Explorer, associer vos [traces][2] à vos [métriques][3] pour mettre en corrélation des données importantes sur toute la plateforme Datadog, et utiliser les logs ingérés pour la solution [Cloud SIEM][4] de Datadog. Le cycle de vie d'un log dans Datadog commence lorsqu'il est ingéré à partir d'une source de journalisation.

{{< img src="/getting_started/logs/getting-started-overview.png" alt="Différents types de configurations de logs">}}

### Serveur

Plusieurs [intégrations][5] peuvent être utilisées pour transmettre les logs de votre serveur à Datadog. Ces intégrations utilisent un bloc de configuration des logs dans leur fichier `conf.yaml`, qui est disponible dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent, pour transmettre les logs à Datadog depuis votre serveur.

```yaml
logs:
  - type: file
    path: /chemin/vers/votre/intégration/access.log
    source: nom_intégration
    service: nom_intégration
    sourcecategory: http_web_access
```

Pour commencer à recueillir des logs à partir d'un serveur :

1. Si vous ne l'avez pas déjà fait, installez l'[Agent Datadog][6] en fonction de votre plateforme.

    **Remarque** : la collecte de logs nécessite l'Agent Datadog v6+.

2. La collecte de logs n'est **pas activée** par défaut dans l'Agent Datadog. Pour activer la collecte de logs, définissez `logs_enabled` sur `true` dans votre fichier `datadog.yaml`.

    {{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

3. Redémarrez l'[Agent Datadog][7].

4. Suivez les [étapes d'activation][8] de l'intégration ou les étapes de collecte de logs de fichiers personnalisés sur le site Datadog.

    **Remarque** : si vous recueillez des logs à partir de fichiers personnalisés et avez besoin d'exemples pour les fichiers suivis, TCP/UDP, journald ou événements Windows, consultez la section [Collecte de logs personnalisés][9].

### Container

À partir de l'Agent Datadog v6, l'Agent peut recueillir des logs à partir de conteneurs. Chaque service de conteneurisation dispose d'instructions de configuration spécifiques en fonction de l'emplacement où l'Agent est déployé ou exécuté, ou encore de l'acheminement des logs.

Par exemple, pour [Docker][10], l'Agent peut être installé de deux façons : sur votre host, où l'Agent est externe à l'environnement Docker, ou via le déploiement d'une version conteneurisée de l'Agent dans votre environnement Docker.

[Kubernetes][11] nécessite que l'Agent Datadog s'exécute dans votre cluster Kubernetes, et la collecte de logs peut être configurée en utilisant une spécification DaemonSet, un chart Helm ou avec l'Operator Datadog.

Pour commencer à recueillir des logs à partir d'un service de conteneur, suivez les [instructions dans l'application][12].

### Cloud

Vous pouvez transmettre à Datadog les logs provenant de divers fournisseurs cloud, comme AWS, Azure, et Google Cloud. Chaque fournisseur cloud dispose d'instructions de configuration différentes.

Par exemple, les logs du service ​AWS sont généralement stockés dans des compartiments S3 ou des groupes de logs CloudWatch. Vous pouvez vous abonner à ces logs et les transmettre à un flux Amazon Kinesis pour les transmettre à nouveau à une ou plusieurs destinations. Datadog est l'une des destinations par défaut pour les flux de diffusion Amazon Kinesis.​

Pour commencer à recueillir des logs à partir d'un service cloud, suivez les [instructions dans l'application][13].

### Client

Datadog vous permet de recueillir des logs à partir de clients via des SDK ou bibliothèques. Par exemple, utilisez le SDK `datadog-logs` pour envoyer des logs à partir de clients JavaScript à Datadog.

Pour commencer à recueillir des logs à partir d'un client, suivez les [instructions dans l'application][14].

### Autre

Si vous utilisez des utilitaires ou services de journalisation existants, comme rsyslog, Fluentd ou Logstash, Datadog offre des plug-ins et options de transmission de logs.

Si vous ne voyez pas votre intégration, vous pouvez la saisir dans la zone *other integrations* afin de recevoir une notification lorsque l'intégration sera disponible.

Pour commencer à recueillir des logs à partir d'un service cloud, suivez les [instructions dans l'application][15].

## Explorer vos logs

Une fois qu'une source de journalisation est configurée, vos logs sont disponibles dans le [Log Explorer][16]. Cet explorateur vous permet de filtrer, d'agréger et de consulter vos logs.

Par exemple, si vous souhaitez analyser en détail les logs d'un service donné, filtrez vos logs en fonction de `service`. Vous pouvez ensuite les filtrer en fonction de `status`, comme `ERROR`, puis sélectionner [Aggregate by Patterns][17] pour voir la partie de votre service qui génère le plus d'erreurs.

{{< img src="/getting_started/logs/error-pattern.png" alt="Filtrage dans le Log Explorer par pattern d'erreur">}}

Agrégez vos logs en fonction du paramètre `Field` de `Source` et passez à l'option de visualisation **Top List** pour voir vos services qui génèrent le plus de logs. Sélectionnez une source, comme `error`, et sélectionnez **View Logs** dans le menu déroulant. Le volet latéral affiche des logs en fonction des erreurs, ce qui vous permet d'identifier rapidement les hosts et services qui nécessitent votre attention.

{{< img src="/getting_started/logs/top-list-view.png" alt="Affichage Top List dans le Log Explorer">}}

## Et ensuite ?

Une fois qu'une source de journalisation est configurée et que vos logs sont disponibles dans le Log Explorer, vous pouvez commencer à explorer d'autres aspects de la gestion des logs.

### Configuration des logs

* Définissez des [attributs et alias][18] afin d'unifier votre environnement de logs.
* Contrôlez le traitement de vos logs avec des [pipelines][19] et [processeurs][20].
* Étant donné que la fonctionnalité Logging without Limits* dissocie l'ingestion et l'indexation de logs, vous pouvez [configurer vos logs][21] de façon à choisir ceux que vous souhaitez indexer, conserver ou archiver.

### Mise en corrélation des logs

* [Associez vos logs à vos traces][2] pour extraire les logs associés à un paramètre `env`, `service` ou `version` spécifique.
* Si vous utilisez déjà des métriques dans Datadog, vous pouvez [mettre en corrélation des logs et des métriques][3] afin d'obtenir des données de contexte sur un problème.

### Guides

* [Meilleures pratiques pour la solution Log Management][22]
* Explorer en détail la fonctionnalité [Logging without Limits*][23]
* Gérer les données de log sensibles avec les [réglages RBAC][24]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: https://www.datadoghq.com
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[3]: /fr/logs/guide/correlate-logs-with-metrics/
[4]: /fr/security/cloud_siem/
[5]: /fr/getting_started/integrations/
[6]: /fr/agent/
[7]: https://github.com/DataDog/datadog-agent/blob/main/docs/agent/changes.md#cli
[8]: https://app.datadoghq.com/logs/onboarding/server
[9]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[10]: /fr/agent/docker/log/?tab=containerinstallation
[11]: /fr/agent/kubernetes/log/?tab=daemonset
[12]: https://app.datadoghq.com/logs/onboarding/container
[13]: https://app.datadoghq.com/logs/onboarding/cloud
[14]: https://app.datadoghq.com/logs/onboarding/client
[15]: https://app.datadoghq.com/logs/onboarding/other
[16]: /fr/logs/explorer/
[17]: /fr/logs/explorer/#patterns
[18]: /fr/logs/log_configuration/attributes_naming_convention/
[19]: /fr/logs/log_configuration/pipelines/
[20]: /fr/logs/log_configuration/processors/
[21]: /fr/logs/log_configuration/
[22]: /fr/logs/guide/best-practices-for-log-management/
[23]: /fr/logs/guide/getting-started-lwl/
[24]: /fr/logs/guide/logs-rbac/