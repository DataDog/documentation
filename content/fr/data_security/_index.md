---
aliases:
- /fr/security/
- /fr/security/other/
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
- link: /tracing/setup_overview/configure_data_security/
  tag: Documentation
  text: Sécurité des données de tracing
- link: /real_user_monitoring/browser/modifying_data_and_context/
  tag: Documentation
  text: Sécurité des données RUM
- link: /real_user_monitoring/session_replay/privacy_options
  tag: Documentation
  text: Options de confidentialité de Session Replay
- link: /account_management/org_settings/sensitive_data_detection/
  tag: Documentation
  text: Scanner de données sensibles
kind: documentation
title: Réduction des risques liés à l'exposition des données
---

<div class="alert alert-info">Cette page est consacrée à la protection des données transmises à Datadog et aux outils permettant de l'assurer. Si vous cherchez des fonctionnalités et solutions relatives à la sécurité des applications et du cloud, consultez la section <a href="/security_platform/" target="_blank">Plateforme de sécurité</a>.</div>

En temps normal, vous utilisez Datadog pour lui transmettre vos données. Avec votre collaboration, Datadog s'emploie à réduire les risques liés à l'exposition des données en vous fournissant des outils permettant de limiter les données que vous transmettez de manière appropriée et en protégeant vos données pendant et après leur transmission.

Vous pouvez également consulter les informations disponibles sur la [Sécurité de Datadog][1] et les dispositions de notre [Politique de confidentialité][2].

## Comment vos données sont transmises à Datadog

Datadog vous permet de transmettre des données vers celui-ci de plusieurs manières, notamment en utilisant un Agent, [DogStatsD][3], une API publique et des intégrations. De plus, le SDK Real User Monitoring et les bibliothèques de tracing génèrent des données basées sur le code de votre application et de vos services avant de les transmettre à Datadog.

Les données en mouvement via les outils fournis par Datadog sont protégées par les protocoles TLS et HSTS. Les données stockées par Datadog sont protégées par chiffrement, un contrôle des droits d'accès et une procédure d'authentification. Pour plus de détails, consultez la section [Sécurité de Datadog][1].

### L'agent Datadog

L'Agent est le principal canal de transmission des données de vos systèmes vers Datadog. [En savoir plus sur les mesures de protection des données dans l'Agent][4].

Pour savoir comment éviter de stocker des secrets en texte brut dans les fichiers de configuration de l'Agent, consultez la section [Gestion des secrets][5].

### Intégrations de services tiers

Les intégrations de certains services tiers sont configurées directement dans Datadog et vous devez parfois fournir des identifiants pour permettre à Datadog de se connecter au service pour vous. Les identifiants fournis sont chiffrés et stockés par Datadog dans un datastore d'identifiants sécurisé.

Toutes les données transitant via ces intégrations sont chiffrées durant leur stockage dans les systèmes de Datadog et leur transfert. L'accès au datastore sécurisé est contrôlé et surveillé.  Chaque service et chaque action des services tiers a uniquement accès aux données qui lui sont nécessaires. Des outils de détection des comportements anormaux surveillent en permanence les accès non autorisés. L'accès des employés de Datadog à des fins de maintenance est limité à un petit groupe d'ingénieurs.

### Intégrations cloud

En raison de leur nature sensible, des mesures de sécurité supplémentaires sont mises en place lors de l'intégration avec les fournisseurs cloud lorsque cela est possible, notamment via l'utilisation d'identifiants spécifiques à Datadog avec des autorisations limitées. Par exemple :

* L'[intégration avec Amazon Web Services][6] nécessite que vous configuriez la délégation des rôles par le biais d'AWS IAM, conformément au [guide des bonnes pratiques pour AWS IAM][7]. Vous devez également accorder les autorisations spécifiques avec une stratégie AWS.
* Pour configurer l'intégration avec [Microsoft Azure][8], vous devez définir un locataire pour Datadog. L'accès à une application spécifique n'est accordé qu'au rôle « reader » pour les abonnements que vous souhaitez surveiller.
* Pour configurer l'intégration avec [Google Cloud Platform][9], vous devez définir un compte de service pour Datadog. Vous devez également octroyer les rôles « Compute Viewer » et « Monitoring Viewer » uniquement.

## Mesures que vous pouvez mettre en œuvre pour réduire le risque lié à l'exposition de données

Datadog a pour objectif de collecter des informations sur l'observabilité à partir de nombreuses sources issues de votre infrastructure et de vos services, et ce, afin que vous puissiez les analyser et les étudier en un même endroit. Pour cela, vous devez transmettre différents contenus de données aux serveurs de Datadog. La plupart des données recueillies pour l'utilisation prévue des produits Datadog ne devraient pas contenir de données privées ou personnelles. Pour les données susceptibles de contenir des données privées ou personnelles superflues, nous fournissons des instructions, des outils et des recommandations vous permettant de supprimer, d'obfusquer et sinon de réduire l'inclusion de données privées ou personnelles dans les données partagées avec Datadog.

### Scanner de données sensibles

Le Scanner de données sensibles est un service de détection d'expressions en temps réel que vous pouvez utiliser pour identifier, taguer et éventuellement censurer ou hacher des données sensibles. Cette implémentation permet à vos équipes de conformité et de sécurité de mettre en place une nouvelle ligne de défense contre les fuites de données sensibles en dehors de votre organisation. Pour en savoir plus sur le scanner et sa configuration, consultez la section [Scanner de données sensibles][10].

### Gestion des logs

Les logs sont des enregistrements générés par vos systèmes et services, ainsi que par les activités qui s'y déroulent. Pour en savoir plus sur les considérations relatives à la sécurité des données des logs, notamment les informations sur le filtrage et l'obfuscation des données des logs, consultez la section [Sécurité des données de Log Management] [11].

Pour en savoir plus sur le contrôle des données des logs, consultez le guide [Contrôle des données de logs sensibles][12] et [Configuration avancée de l'agent pour les logs][13].

Le contrôle d'accès est un élément clé permettant de réduire les risques liés à la sécurité des données des logs. Consultez les sections [Configuration du RBAC pour les logs][14] et [Autorisations RBAC pour les logs][15] pour découvrir comment procéder dans Datadog.

### Live processes et conteneurs

Afin d'éviter toute fuite de données sensibles lorsque vous surveillez des live processes et des live containers, Datadog nettoie par défaut les mots clés sensibles dans les arguments du processus et dans les charts Helm. Vous pouvez obfusquer les séquences sensibles supplémentaires dans les commandes ou les arguments de processus en utilisant le [paramètre `custom_sensitive_words`][16]. Vous pouvez aussi  contribuer à la liste de mots de nettoyage du conteneur en utilisant la [variable d'environnement `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`][17].

### APM et autres produits basés sur une bibliothèque de tracing

Les bibliothèques de tracing Datadog servent à instrumenter vos applications, services, tests et pipelines. Ils servent aussi à transmettre des données de performance via l'Agent à Datadog. Les données des traces et des spans (ainsi que bien d'autres) sont générées pour les produits suivants :

- Application Security Monitoring (APM)
- Profileur en continu
- CI Visibility
- Application Security Monitoring

Pour en savoir plus sur la gestion des données provenant de la bibliothèque de tracing, les paramètres de sécurité de base par défaut, ainsi que l'obfuscation, le nettoyage, l'exclusion et la modification personnalisés des éléments liés à la trace, consultez la section [Configuration de l'agent et du traceur pour la sécurité des données de trace] [18].

### Tracing distribué sans serveur

Vous pouvez utiliser Datadog pour collecter et visualiser les charges utiles des requêtes et réponses JSON des fonctions Lambda AWS. Afin d'éviter toute transmission à Datadog de données sensibles dans les objets JSON des requêtes ou réponses (comme des identifiants de compte ou des adresses), vous pouvez faire en sorte que certains paramètres ne soient pas transmis à Datadog. Consultez la section [Obfuscation du contenu des charges utiles Lambda AWS][19] pour en savoir plus.

### Surveillance Synthetic

Les tests Synthetic simulent les requêtes et les transactions commerciales depuis divers emplacements de test dans le monde. Pour en savoir plus sur les considérations de chiffrement pour les configurations, les actifs, les résultats et les identifiants, ainsi que sur l'utilisation des options de confidentialité des tests, consultez ma section [Sécurité des données liées à la surveillance Synthetic][20].

### RUM et Session Replay

Vous pouvez modifier les données collectées par la solution Real User Monitoring dans le navigateur pour protéger les informations personnelles et pour échantillonner les données RUM que vous collectez. Consultez la section [Modifier des données RUM et leur contexte][21] pour plus de détails.

Les options de confidentialité de Session Replay protègent par défaut la confidentialité de l'utilisateur final et empêchent la collecte d'informations organisationnelles sensibles. Pour en savoir plus sur le masquage, le remplacement et la dissimulation d'éléments d'une session replay, consultez la section [Options de confidentialité de Session Replay][22].

### Database Monitoring

L'Agent Database Monitoring procède à l'obfuscation de tous les paramètres de liaison de requête envoyés à l'endpoint d'admission de Datadog. De ce fait, les mots de passe, les informations personnelles et d'autres informations potentiellement sensibles qui sont stockées dans votre base de données ne seront pas visibles dans les métriques de requêtes, les échantillons de requêtes ou les plans d'exécution. Pour en savoir plus sur la réduction des risques pour d'autres types de données impliquées dans la surveillance des performances des bases de données, consultez la section [Données recueillies par la solution Database Monitoring] [23].

## Autres sources de données potentiellement sensibles

En plus des données sensibles que vous pouvez automatiquement nettoyer, obfusquer et sinon éviter de collecter, la plupart des données collectées par Datadog sont des noms et des descriptions. Nous vous recommandons de n'inclure aucune information privée ou personnelle dans le texte que vous envoyez. Prenez en considération la liste (non exhaustive) des données textuelles suivante que vous transmettez à Datadog dans le cadre de l'utilisation prévue du produit :

Métadonnées et tags
: Les métadonnées regroupent principalement les [tags][24] au format `key:value`, par exemple, `env:prod`. Datadog utilise les métadonnées pour filtrer et regrouper les données afin de vous aider à obtenir des informations utiles.

Dashboards, notebooks, alertes, moniteurs, alertes, incidents, SLO
: Les textes descriptifs, les titres et les noms que vous attribuez aux choses que vous créez dans Datadog sont des données.

Métriques
: Les métriques, y compris les métriques d'infrastructure et les métriques provenant des intégrations et d'autres données ingérées telles que les logs, les traces, le RUM et les tests Synthetic, sont des séries temporelles permettant de remplir des graphiques. Ils ont généralement des tags associés.

Données d'APM
: Les données d'APM incluent les services, les ressources, les profils, les traces et les spans, ainsi que les tags associés. Consultez [le glossaire de l'APM] [25] pour en savoir plus sur chacun d'entre eux.

Signatures des requêtes de bases de données
: Les données de la solution Database Monitoring se composent de mesures et d'échantillons, ainsi que de leurs tags associés, collectés par l'agent et utilisés pour surveiller les performances historiques des requêtes normalisées. La granularité de ces données est définie par leur signature de requête normalisée et l'identifiant unique du host. Tous les paramètres de requête sont obfusqués et supprimés des échantillons recueillis avant leur envoi à Datadog.

Informations sur le processus
: Les processus sont des métriques et des données du système de fichiers `proc`, qui agit en tant qu'interface sur les structures de données internes dans le kernel. Les données de processus peuvent contenir la commande du processus (y compris son chemin et ses arguments), le nom d'utilisateur associé, l'ID du processus et son parent, l'état du processus et le répertoire actif. En général, les données de processus sont également associées à des métadonnées de tags.

Événements et commentaires
: Les données d'événements sont combinées à partir de plusieurs sources en une vue consolidée, incluant les monitors déclenchés, les événements soumis par les intégrations, les événements soumis par l'application elle-même et les commentaires envoyés par les utilisateurs ou via l'API. Les événements et les commentaires ont généralement des métadonnées de tags associées.

Pipelines et tests d'intégration continue
: Les noms des branches, des pipelines, des tests et des collections de tests sont toutes des données transmises à Datadog.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /fr/developers/dogstatsd/
[4]: /fr/data_security/agent/
[5]: /fr/agent/guide/secrets-management/
[6]: /fr/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /fr/integrations/azure/
[9]: /fr/integrations/google_cloud_platform/
[10]: /fr/account_management/org_settings/sensitive_data_detection/
[11]: /fr/data_security/logs/
[12]: /fr/logs/guide/control-sensitive-logs-data/
[13]: /fr/agent/logs/advanced_log_collection
[14]: /fr/logs/guide/logs-rbac
[15]: /fr/logs/guide/logs-rbac-permissions
[16]: /fr/infrastructure/process/#process-arguments-scrubbing
[17]: /fr/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /fr/tracing/setup_overview/configure_data_security/
[19]: /fr/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /fr/data_security/synthetics/
[21]: /fr/real_user_monitoring/browser/modifying_data_and_context/
[22]: /fr/real_user_monitoring/session_replay/privacy_options
[23]: /fr/database_monitoring/data_collected/#sensitive-information
[24]: /fr/getting_started/tagging/
[25]: /fr/tracing/visualization/