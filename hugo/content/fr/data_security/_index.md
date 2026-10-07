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
  text: Sécurité des données de Synthetic Monitoring
- link: /tracing/configure_data_security/
  tag: Documentation
  text: Sécurité des données de tracing
- link: /data_security/real_user_monitoring/
  tag: Documentation
  text: Sécurité des données RUM
- link: /session_replay/privacy_options?platform=browser
  tag: Documentation
  text: Options de confidentialité de Session Replay
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
title: Réduction des risques liés à vos données
---
<div class="alert alert-info">Cette page concerne les outils et la sécurité pour protéger les données envoyées à Datadog. Si vous recherchez des produits et fonctionnalités de sécurité cloud et applicative, consultez la section <a href="/security/" target="_blank">Security</a>.</div>

Dans le cadre normal de l'utilisation prévue de Datadog, vous envoyez des données à Datadog. Datadog collabore avec vous pour réduire les risques liés aux données en vous fournissant des outils pour limiter de manière appropriée les données que vous envoyez et en sécurisant les données pendant et après leur transmission.

Vous pouvez également consulter les informations disponibles sur [Datadog Security][1] et les dispositions de notre [politique de confidentialité][2].

## Comment les données passent de vous à Datadog {#how-data-gets-from-you-to-datadog}

Datadog vous permet d'envoyer des données à Datadog de plusieurs manières, notamment à partir de l'Agent, de [DogStatsD][3], de l'API publique et des intégrations. De plus, les SDK Real User Monitoring et les SDK APM génèrent des données basées sur le code de vos applications et services et les envoient à Datadog. 

Les données en transit via les outils fournis par Datadog sont protégées par TLS et HSTS. Les données stockées par Datadog sont protégées par chiffrement, contrôles d'accès et authentification. Pour plus de détails, lisez la suite sur [Datadog Security][1].

### Le Datadog Agent {#the-datadog-agent}

L'Agent est le canal principal pour le transfert de données de vos systèmes vers Datadog. [En savoir plus sur les mesures de sécurité des données dans l'Agent][4]. 

Pour découvrir comment éviter de stocker des secrets en texte brut dans les fichiers de configuration de l'Agent, consultez la section [Gestion des secrets][5].

### Intégrations de services tiers {#third-party-services-integrations}

Les intégrations pour certains services tiers sont configurées directement dans Datadog et peuvent nécessiter que vous fournissiez des identifiants pour permettre à Datadog de se connecter au service en votre nom. Les identifiants que vous fournissez sont chiffrés et stockés par Datadog dans un magasin d'identifiants sécurisé. 

Toutes les données transitant par ces intégrations sont chiffrées lorsqu'elles sont au repos dans les systèmes de Datadog et chiffrées en transit. L'accès au magasin d'identifiants sécurisé est contrôlé et audité, et les services ou actions spécifiques au sein des services tiers sont limités à ce qui est strictement nécessaire. Des outils de détection de comportement anormal surveillent en permanence les accès non autorisés. L'accès des employés de Datadog à des fins de maintenance est limité à un sous-ensemble restreint d'ingénieurs.

### Intégrations cloud {#cloud-integrations}

En raison de leur nature sensible, des mesures de sécurité supplémentaires sont mises en œuvre, dans la mesure du possible, lors de l'intégration avec des fournisseurs cloud, notamment l'utilisation d'identifiants dédiés à Datadog avec des autorisations limitées. Exemple :

* L'[intégration avec Amazon Web Services][6] nécessite que vous configuriez la délégation de rôle à l'aide d'AWS IAM, conformément au [guide des bonnes pratiques AWS IAM][7], et que vous accordiez des autorisations spécifiques avec une politique AWS.
* L'intégration avec [Microsoft Azure][8] repose sur la définition d'un locataire pour Datadog, avec un accès à une application spécifique accordé uniquement au rôle « lecteur » pour les abonnements que vous souhaitez surveiller.
* L'intégration avec [Google Cloud Platform][9] repose sur la définition d'un compte de service pour Datadog, et en lui attribuant uniquement les rôles 'Compute Viewer' et 'Monitoring Viewer'.

## Mesures que vous pouvez mettre en œuvre pour réduire vos risques liés aux données {#measures-you-can-implement-to-reduce-your-data-risk}

L'objectif de Datadog est de collecter, à partir de nombreuses sources de votre infrastructure et de vos services, des informations d'observabilité et de les centraliser en un seul endroit pour que vous puissiez les analyser et mener des investigations. Cela implique que vous envoyiez un large éventail de types de contenu de données vers les serveurs de Datadog. La plupart des données collectées pour l'utilisation prévue des produits Datadog ont peu de chances de contenir des données privées ou personnelles. Pour les données susceptibles de contenir des données privées ou personnelles inutiles, nous fournissons des instructions, des outils et des recommandations pour vous permettre de supprimer, d'obfusquer et de réduire autrement l'inclusion de données privées ou personnelles dans les données partagées avec Datadog.

### Sensitive Data Scanner {#sensitive-data-scanner}

Sensitive Data Scanner est un service de correspondance de modèles basé sur les flux que vous pouvez utiliser pour identifier, taguer et, éventuellement, masquer ou hacher des données sensibles. Grâce à sa mise en œuvre, vos équipes de sécurité et de conformité peuvent instaurer une ligne de défense pour empêcher que les données sensibles ne fuient en dehors de votre organisation. Pour plus d'informations sur le scanner et sa configuration, lisez [Sensitive Data Scanner][10].

### Gestion des logs {#logs-management}

Les logs sont des enregistrements produits par vos systèmes et services ainsi que par les activités qui s'y déroulent. Lisez les considérations relatives à la sécurité des données de logs, y compris les informations sur la façon dont vous pouvez filtrer et masquer les données de logs dans [Log Management Data Security][11]. 

Approfondissez le contrôle des données de logs avec le guide [Manage Sensitive Logs Data Access][12] et [Agent Advanced Configuration for Logs][13].

Une approche clé pour réduire les risques liés à la sécurité des données de logs est le contrôle d'accès. Lisez [How to set up RBAC for Logs][14] et [Logs RBAC Permissions][15] pour apprendre à le faire dans Datadog.

### Processus et conteneurs en direct {#live-processes-and-containers}

Pour éviter la fuite de données sensibles lorsque vous surveillez des processus et des conteneurs en direct, Datadog fournit un nettoyage par défaut des mots-clés sensibles dans les arguments de processus et dans les graphiques Helm. Vous pouvez masquer des séquences sensibles supplémentaires dans les commandes ou les arguments de processus en utilisant le [`custom_sensitive_words` paramètre][16], et ajouter des éléments à la liste de mots de nettoyage des conteneurs en utilisant la [`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` variable d'environnement][17].

### APM et autres produits basés sur SDK {#apm-and-other-sdk-based-products}

Les SDK Datadog sont utilisés pour instrumenter vos applications, services, tests et pipelines, et envoyer des données de performance via l'Agent vers Datadog. Les données de trace et de span (ainsi que bien plus encore) sont générées pour être utilisées par les produits suivants :

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- App and API protection

Pour en savoir plus sur la gestion des données provenant de la bibliothèque de tracing, sur les paramètres de sécurité de base par défaut, ainsi que sur l'obfuscation, le nettoyage, l'exclusion et la modification personnalisés des éléments liés aux traces, consultez la section [Configurer le Datadog Agent ou le traceur pour assurer la sécurité des données] [18].

### Tracing distribué Serverless {#serverless-distributed-tracing}

Vous pouvez utiliser Datadog pour collecter et visualiser les charges utiles JSON des requêtes et réponses des fonctions AWS Lambda. Pour éviter que des données sensibles contenues dans les objets JSON de requête ou de réponse ne soient envoyées à Datadog (comme des identifiants de compte ou des adresses), vous pouvez empêcher l'envoi de paramètres spécifiques à Datadog. Lisez [Obfuscating AWS Lambda payload contents][19] pour plus d'informations.

### Synthetic Monitoring {#synthetic-monitoring}

Les tests Synthetic simulent des requêtes et des transactions commerciales depuis des emplacements de test dans le monde entier. Lisez les considérations relatives au chiffrement pour les configurations, les actifs, les résultats et les identifiants, ainsi que la manière d'utiliser les options de confidentialité des tests, dans [Synthetic Monitoring Data Security][20].

### RUM & Session Replay {#rum-session-replay}

Vous pouvez modifier les données collectées par Real User Monitoring dans le navigateur pour protéger les informations personnellement identifiables et pour échantillonner les données RUM que vous collectez. Lisez [Modifying RUM Data and Context][21] pour plus de détails.
 
Les options de confidentialité de Session Replay protègent par défaut la vie privée des utilisateurs finaux et empêchent la collecte d'informations organisationnelles sensibles. Lisez les informations sur le masquage, le remplacement et la dissimulation d'éléments d'une relecture de session dans [Session Replay Privacy Options][22]. Le masquage de Session Replay est permanent: Les valeurs masquées ne quittent jamais l'appareil et ne peuvent pas être démasquées ultérieurement. Ceci diffère de l'[action de masquage de Sensitive Data Scanner][26], qui obfusque les valeurs correspondantes lors de l'ingestion et permet aux utilisateurs disposant de l'autorisation `Data Scanner Unmask` de voir la valeur originale.

### Database Monitoring {#database-monitoring}

L'Agent Database Monitoring obfusque tous les paramètres de liaison de requête envoyés à l'ingestion Datadog. Ainsi, les mots de passe, les PII (informations personnellement identifiables) et autres informations potentiellement sensibles stockées dans votre base de données ne seront pas visibles dans les métriques de requête, les échantillons de requête ou les plans d'exécution. Pour en savoir plus sur l'atténuation des risques pour d'autres types de données impliquées dans la surveillance des performances des bases de données, lisez [Données recueillies par la solution Database Monitoring][23].

## Autres sources de données potentiellement sensibles {#other-sources-of-potentially-sensitive-data}

En plus des données sensibles que vous pouvez automatiquement nettoyer, obfusquer et éviter de collecter, une grande partie des données collectées par Datadog se compose des noms et des descriptions des éléments. Nous vous recommandons de ne pas inclure d'informations privées ou personnelles dans le texte que vous envoyez. Considérez la liste suivante (non exhaustive) de données textuelles que vous envoyez à Datadog dans le cadre de l'utilisation prévue du produit :

Métadonnées et tags
: Les métadonnées consistent principalement en des [tags][24] au format `key:value`, par exemple, `env:prod`. Les métadonnées sont utilisées par Datadog pour filtrer et regrouper les données afin de vous aider à obtenir des informations significatives. 

Dashboards, notebooks, alertes, monitors, incidents, SLOs
: Les descriptions textuelles, titres et noms que vous donnez aux éléments que vous créez dans Datadog sont des données. 

Métriques
: Les métriques, y compris les métriques d'infrastructure et les métriques générées à partir d'intégrations et d'autres données ingérées telles que les logs, les traces, RUM et les tests Synthetic, sont des séries temporelles utilisées pour alimenter les graphiques. Elles ont généralement des tags associés.

Données APM
: Les données APM incluent des services, des ressources, des profils, des traces et des spans, ainsi que des tags associés. Lisez [le glossaire APM][25] pour obtenir une explication pour chacun. 

Signatures de requêtes de base de données
: Les données de surveillance de base de données se composent de métriques et d'échantillons, ainsi que de leurs tags associés, collectés par l'Agent et utilisés pour suivre les performances historiques des requêtes normalisées. La granularité de ces données est définie par leur signature de requête normalisée et leur identifiant de host unique. Tous les paramètres de requête sont obfusqués et supprimés des échantillons collectés avant d'être envoyés à Datadog.

Informations sur les processus
: Les processus se composent de métriques et de données provenant du `proc` système de fichiers, qui agit comme une interface avec les structures de données internes du noyau. Les données de processus peuvent contenir la commande du processus (y compris son chemin et ses arguments), le nom d'utilisateur associé, l'ID du processus et de son parent, l'état du processus et le répertoire de travail. Les données de processus ont généralement aussi des métadonnées de tags qui leur sont associées.

Événements et commentaires
: Les données d'événements sont agrégées à partir de sources multiples dans une vue consolidée, incluant les monitors déclenchés, les événements soumis par des intégrations, les événements soumis par l'application elle-même, et les commentaires envoyés par les utilisateurs ou via l'API. Les événements et les commentaires ont généralement des métadonnées de tags associées.

Pipelines et tests Continuous Integration
: Les noms des branches, des pipelines, des tests et des collections de tests sont toutes des données envoyées à Datadog.

### Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /fr/extend/dogstatsd/
[4]: /fr/data_security/agent/
[5]: /fr/agent/configuration/secrets-management/
[6]: /fr/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /fr/integrations/azure/
[9]: /fr/integrations/google_cloud_platform/
[10]: /fr/security/sensitive_data_scanner/
[11]: /fr/data_security/logs/
[12]: /fr/logs/guide/manage-sensitive-logs-data-access/
[13]: /fr/agent/logs/advanced_log_collection
[14]: /fr/logs/guide/logs-rbac
[15]: /fr/logs/guide/logs-rbac-permissions
[16]: /fr/infrastructure/process/#process-arguments-scrubbing
[17]: /fr/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /fr/tracing/configure_data_security/
[19]: /fr/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /fr/data_security/synthetics/
[21]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[22]: /fr/session_replay/privacy_options?platform=browser
[23]: /fr/database_monitoring/data_collected/#sensitive-information
[24]: /fr/getting_started/tagging/
[25]: /fr/tracing/glossary/
[26]: /fr/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action