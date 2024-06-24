---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /data_security/logs/
  tag: Documentation
  text: Sécurité des données des logs
- link: /data_security/agent/
  tag: Documentation
  text: Sécurité des données de l'Agent
- link: /data_security/synthetics/
  tag: Documentation
  text: Sécurité des données liées à la surveillance Synthetic
- link: /tracing/configure_data_security/
  tag: Documentation
  text: Sécurité des données de tracing
- link: /data_security/real_user_monitoring/
  tag: Documentation
  text: Sécurité des données RUM
- link: /real_user_monitoring/session_replay/browser/privacy_options
  tag: Documentation
  text: Options de confidentialité de Session Replay
- link: /sensitive_data_scanner/
  tag: Documentation
  text: Scanner de données sensibles
kind: documentation
title: Réduction des risques liés à vos données
---

<div class="alert alert-info">Cette page est consacrée à la protection des données transmises à Datadog et aux outils permettant de l'assurer. Si vous cherchez des fonctionnalités et solutions relatives à la sécurité des applications et du cloud, consultez la section <a href="/security/" target="_blank">Plateforme de sécurité Datadog</a>.</div>

Pour exploiter la plateforme Datadog, vous devez lui envoyer des données. Avec votre collaboration, Datadog s'emploie à réduire les risques liés à vos données en vous fournissant des outils permettant de restreindre efficacement les données que vous transmettez et de sécuriser vos données pendant et après leur transmission.

Vous pouvez également consulter les informations disponibles sur la [plateforme de sécurité de Datadog][1] et les dispositions de notre [politique de confidentialité][2].

## Comment vos données sont transmises à Datadog

Il existe différentes façons d'envoyer vos données à Datadog. Vous pouvez notamment utiliser l'Agent, [DogStatsD][3], l'API publique et des intégrations. De plus, les bibliothèques de tracing et les SDK Real User Monitoring génèrent des données basées sur le code de votre application et de vos services avant de les transmettre à Datadog.

Les données transmises via les outils Datadog sont protégées par les protocoles TLS et HSTS. Les données stockées par Datadog sont protégées par chiffrement, des paramètres de contrôle d'accès ainsi qu'une procédure d'authentification. Pour plus de détails, consultez la section [Sécurité][1].

### L'Agent Datadog

L'Agent est le principal canal de transmission des données depuis vos systèmes vers Datadog. [Familiarisez-vous avec les mesures de protection des données appliquées par l'Agent][4].

Pour découvrir comment éviter de stocker des secrets en texte brut dans les fichiers de configuration de l'Agent, consultez la section [Gestion des secrets][5].

### Intégrations de services tiers

Les intégrations de certains services tiers sont configurées directement dans Datadog. Vous devez parfois fournir des identifiants pour permettre à Datadog de se connecter au service pour vous. Les identifiants fournis sont chiffrés et stockés par Datadog dans un datastore d'identifiants sécurisé.

Toutes les données transitant via ces intégrations sont chiffrées durant leur stockage dans les systèmes de Datadog et leur transfert. L'accès au datastore sécurisé est contrôlé et surveillé. Les services et opérations exécutées au sein des services tiers ont uniquement accès aux données nécessaires. Des outils de détection des comportements anormaux surveillent en permanence les accès non autorisés. Seul un petit groupe d'ingénieurs possède l'accès nécessaire aux opérations de maintenance.

### Intégrations cloud

En raison du caractère sensible des fournisseurs cloud, des mesures de sécurité supplémentaires sont mises en place dès que possible pour leur intégration. Datadog utilise notamment des identifiants distincts dotés d'autorisations limitées. Exemples :

* L'[intégration d'Amazon Web Services][6] nécessite de configurer la délégation des rôles par le biais d'AWS IAM, conformément aux [bonnes pratiques de sécurité dans IAM][7]. Vous devez également accorder des autorisations spécifiques avec une stratégie AWS.
* Afin de configurer l'intégration [Microsoft Azure][8], vous devez définir un locataire pour Datadog. L'accès à une application spécifique n'est accordé qu'au rôle « reader » pour les abonnements que vous souhaitez surveiller.
* Pour configurer l'intégration [Google Cloud Platform][9], vous devez définir un compte de service pour Datadog. Il est également nécessaire de lui octroyer uniquement les rôles « Compute Viewer » et « Monitoring Viewer ».

## Mesures à appliquer pour réduire les risques liés à vos données

Datadog s'efforce de recueillir des informations d'observabilité à partir de nombreuses sources issues de votre infrastructure et de vos services, puis de les regrouper au sein d'une unique interface afin que vous puissiez les analyser en détail. Pour cela, vous devez transmettre différents types de données aux serveurs Datadog. La plupart des données recueillies pour l'utilisation prévue des produits Datadog ne devraient pas contenir de données privées ou personnelles. Pour éviter l'envoi de données privées ou personnelles superflues, nous fournissons des instructions, des outils et des recommandations vous permettant de supprimer et d'obfusquer ces données, ou de limiter leur partage avec Datadog.

### Scanner de données sensibles

Le scanner de données sensibles est un service de détection de patterns basés sur des flux vous permettant d'identifier, de taguer et éventuellement de censurer ou de hacher des données sensibles. Grâce à cette solution, vos équipes de conformité et de sécurité sont à même de mettre en place une nouvelle ligne de défense contre les fuites de données sensibles en dehors de votre organisation. Pour en savoir plus sur le scanner et sa configuration, consultez la section [Scanner de données sensibles][10].

### Gestion des logs

Les logs sont des enregistrements générés par vos systèmes et services, ainsi que par les opérations qu'ils effectuent. Pour en savoir plus sur les considérations relatives à la sécurité des données des logs, et notamment découvrir comment filtrer et obfusquer les données de vos logs, consultez la section [Sécurité des données de Log Management][11].

Pour approfondir vos connaissances sur le contrôle des données des logs, consultez le guide [Contrôler les données de logs sensibles][12] et [Configurations avancées pour la collecte de logs][13].

Le contrôle d'accès contribue grandement à la réduction des risqués liés à la sécurité des données des logs. Consultez les sections [Configuration du RBAC pour les logs][14] et [Autorisations RBAC pour les logs][15] pour découvrir les étapes à suivre dans Datadog.

### Live processes et live containers

Afin d'éviter toute fuite de données sensibles dans le cadre de la surveillance de vos live processes et live containers, Datadog nettoie par défaut des mots-clés sensibles dans les arguments des processus et dans les charts Helm. Vous pouvez obfusquer des séquences sensibles supplémentaires situées dans les commandes ou les arguments de processus à l'aide du [paramètre `custom_sensitive_words`][16]. Vous pouvez aussi compléter la liste de mots à nettoyer dans le conteneur grâce à la [variable d'environnement `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`][17].

### APM et autres produits basés sur une bibliothèque de tracing

Les bibliothèques de tracing Datadog servent à instrumenter vos applications, services, tests et pipelines. Elles permettent également d'envoyer des données de performance à Datadog via l'Agent. Les données des traces et des spans, entre autres, qui sont générées peuvent être utilisées par les produits suivants :

- Application Security Monitoring (APM)
- Profileur en continu
- CI Visibility
- Application Security Management

Pour en savoir plus sur la gestion des données provenant de la bibliothèque de tracing, sur les paramètres de sécurité de base par défaut, ainsi que sur l'obfuscation, le nettoyage, l'exclusion et la modification personnalisés des éléments liés aux traces, consultez la section [Configurer l'Agent Datadog ou le traceur pour assurer la sécurité des données] [18].

### Tracing distribué sans serveur

La plateforme Datadog vous permet de recueillir et de visualiser les charges utiles des requêtes et réponses JSON des fonctions AWS Lambda. Afin d'éviter toute transmission à Datadog de données sensibles dans les objets JSON des requêtes ou réponses (comme des identifiants de compte ou des adresses), vous pouvez faire en sorte que certains paramètres ne soient pas transmis à Datadog. Consultez la documentation relative à l'[obfuscation du contenu des charges utiles AWS Lambda][19] pour en savoir plus.

### Surveillance Synthetic

Les tests Synthetic simulent les requêtes et les transactions commerciales depuis divers emplacements de test dans le monde entier. Pour en savoir plus sur les considérations en matière de chiffrement pour les configurations, ressources, résultats et identifiants, ainsi que sur l'utilisation des options de confidentialité des tests, consultez la section [Sécurité des données liées à la surveillance Synthetic][20].

### RUM et Session Replay

Vous pouvez modifier les données recueillies par la solution Real User Monitoring dans le navigateur pour protéger les informations personnelles et pour échantillonner les données RUM que vous recueillez. Consultez la section [Modifier des données RUM et leur contexte][21] pour plus de détails.

Par défaut, les options de confidentialité de Session Replay protègent la confidentialité des utilisateurs finaux et empêchent la collecte d'informations sensibles au niveau de l'organisation. Pour en savoir plus sur le masquage, le remplacement et la dissimulation d'éléments d'une session Replay, consultez la section [Options de confidentialité de Session Replay][22].

### Database Monitoring

L'Agent Database Monitoring procède à l'obfuscation de tous les paramètres de liaison de requête envoyés à l'endpoint d'admission de Datadog. De ce fait, les mots de passe, les informations personnelles et d'autres informations potentiellement sensibles qui sont stockées dans votre base de données ne seront pas visibles dans les métriques de requêtes, les échantillons de requêtes ou les plans d'exécution. Pour en savoir plus sur la réduction des risques pour d'autres types de données impliquées dans la surveillance des performances des bases de données, consultez la section [Données recueillies par la solution Database Monitoring][23].

## Autres sources de données potentiellement sensibles

Les données sensibles que vous pouvez automatiquement nettoyer, obfusquer ou éviter de recueillir ne sont pas les seules données à protéger. En effet, la plupart des données recueillies par Datadog représentent des noms et des descriptions. Nous vous recommandons de n'inclure aucune information privée ou personnelle dans le texte que vous envoyez. La liste suivante répertorie une partie des données textuelles que vous envoyez à Datadog dans le cadre de l'utilisation normale de la plateforme :

Métadonnées et tags
: Les métadonnées sont principalement composées de [tags][24] au format `key:value`, par exemple `env:prod`. Datadog utilise les métadonnées pour filtrer et regrouper vos données afin de vous aider à générer des insights.

Dashboards, notebooks, alertes, moniteurs, incidents et SLO
: Les textes descriptifs, les titres et les noms que vous attribuez aux éléments que vous créez dans Datadog constituent des données.

Métriques
: Les métriques, y compris les métriques d'infrastructure et les métriques provenant des intégrations et d'autres données ingérées, telles que les logs, les traces, les données RUM et les tests Synthetic, forment des séries temporelles qui peuvent être représentées en tant que graphiques. Des tags sont généralement associés aux métriques.

Données APM
: Les données APM comprennent les services, ressources, profils, traces et spans, ainsi que les tags associés. Consultez [le glossaire APM][25] pour en savoir plus sur chaque type de données APM.

Signatures des requêtes de bases de données
: Les données de la solution Database Monitoring comprennent des mesures et échantillons, ainsi que leurs tags associés. Ces données sont recueillies par l'Agent et servent à surveiller les performances historiques de requêtes normalisées. La granularité de ces données est définie par leur signature de requête normalisée et par l'identifiant unique du host. Tous les paramètres de requête sont obfusqués et supprimés des échantillons recueillis avant leur envoi à Datadog.

Informations sur le processus
: Les processus comprennent des métriques et des données du système de fichiers `proc`, qui occupe le rôle d'interface pour les structures de données internes dans le kernel. Les données de processus peuvent contenir la commande du processus (y compris son chemin et ses arguments), le nom de l'utilisateur associé, l'ID du processus et son parent, l'état du processus, ainsi que le répertoire actif. En général, des métadonnées de tag sont également associées aux données de processus.

Événements et commentaires
: Les données des événements sont regroupées au sein d'une vue consolidée à partir de plusieurs sources. Elles comprennent les monitors déclenchés, les événements envoyés par les intégrations et l'application, et les commentaires envoyés par les utilisateurs ou via l'API. En général, des métadonnées de tag sont également associées aux événements et commentaires.

Pipelines et tests d'intégration continue
: Les noms des branches, pipelines, tests et collections de tests sont tous envoyés à Datadog.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /fr/developers/dogstatsd/
[4]: /fr/data_security/agent/
[5]: /fr/agent/configuration/secrets-management/
[6]: /fr/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /fr/integrations/azure/
[9]: /fr/integrations/google_cloud_platform/
[10]: /fr/sensitive_data_scanner/
[11]: /fr/data_security/logs/
[12]: /fr/logs/guide/control-sensitive-logs-data/
[13]: /fr/agent/logs/advanced_log_collection
[14]: /fr/logs/guide/logs-rbac
[15]: /fr/logs/guide/logs-rbac-permissions
[16]: /fr/infrastructure/process/#process-arguments-scrubbing
[17]: /fr/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /fr/tracing/configure_data_security/
[19]: /fr/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /fr/data_security/synthetics/
[21]: /fr/real_user_monitoring/browser/advanced_configuration/
[22]: /fr/real_user_monitoring/session_replay/browser/privacy_options
[23]: /fr/database_monitoring/data_collected/#sensitive-information
[24]: /fr/getting_started/tagging/
[25]: /fr/tracing/glossary/