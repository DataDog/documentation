---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
aliases:
- /fr/bits_ai/mcp_server/tools/
description: Parcourez tous les outils disponibles dans le serveur Datadog MCP, organisés
  par ensemble d'outils, avec des exemples d'invites.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Serveur Datadog MCP
- link: mcp_server/setup
  tag: Documentation
  text: Configurer le serveur Datadog MCP
title: Outils du serveur Datadog MCP
---
Les outils suivants sont disponibles dans le serveur Datadog MCP. Chaque entrée comprend l'ensemble d'outils requis, les autorisations et des exemples d'invites. Les outils sont regroupés par [ensembles d'outils][1], ce qui vous permet d'utiliser uniquement les outils dont vous avez besoin, économisant ainsi de l'espace précieux dans la fenêtre de contexte.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Pour activer des outils spécifiques au produit, incluez le paramètre de requête `toolsets` à la fin de l'URL de point de terminaison que vous utilisez pour vous connecter au serveur Datadog MCP. Par exemple, en fonction de votre [site Datadog][2] ({{< region-param key="dd_site_name" >}}), cette URL active _uniquement_ les outils APM et d'observabilité de l'Agent :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Vous pouvez également exclure des outils spécifiques avec le paramètre de requête `omit_tools`.

[2]: /fr/getting_started/site/
{{< /site-region >}}

Consultez [Configurer le serveur Datadog MCP][1] pour plus d'informations sur la connexion au serveur MCP, l'activation des ensembles d'outils et l'omission d'outils spécifiques.

<div class="alert alert-info">Les outils du serveur Datadog MCP sont en développement significatif et sont susceptibles de changer. Utilisez <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">ce formulaire de retour d'information</a> pour partager vos retours, cas d'utilisation ou problèmes rencontrés avec vos invites et requêtes.</div>

## Outils principaux {#core-tools}

L'ensemble d'outils par défaut pour les journaux, les métriques, les traces, les tableaux de bord, les moniteurs, les incidents, les hôtes, les services, les événements et les carnets.

### `search_datadog_events` {#search-datadog-events}
*Ensemble d'outils : **principal***\
*Autorisations requises : `Events` et `Timeseries`*\
Recherche d'événements tels que des alertes de moniteur, des notifications de déploiement, des changements d'infrastructure, des résultats de sécurité et des changements d'état de service.

- Montrez-moi tous les événements de déploiement des dernières 24 heures.
- Trouvez des événements liés à notre environnement de production avec un statut d'erreur.
- Obtenez les événements étiquetés avec `service:api` de la dernière heure.

**Remarque** : Consultez l'[API de gestion des événements][15] pour plus de détails.

### `get_datadog_incident` {#get-datadog-incident}
*Ensemble d'outils : **principal***\
*Permissions requises : `Incidents Read`*\
Récupère des informations détaillées sur un incident.

- Obtenez les détails de l'incident ABC123.
- Quel est le statut de l'incident ABC123 ?
- Récupérez toutes les informations sur l'incident Redis d'hier.

**Remarque** : L'outil est opérationnel, mais n'inclut pas les données de chronologie des incidents.

### `get_datadog_metric` {#get-datadog-metric}
*Ensemble d'outils : **principal***\
*Permissions requises : `Cloud Cost Management Read` ou `Metrics` ou `Timeseries`*\
Interroge et analyse les données métriques historiques ou en temps réel, prenant en charge des requêtes et des agrégations personnalisées.

- Montrez-moi les métriques d'utilisation du CPU pour tous les hôtes au cours des 4 dernières heures.
- Obtenez les métriques de latence Redis pour l'environnement de production.
- Comment mes coûts cloud ont-ils changé de janvier à févriera?

### `get_datadog_metric_context` {#get-datadog-metric-context}
*Ensemble d'outils : **Core***\
*Permissions requises : `Cloud Cost Management Read` ou `Metrics`*\
Récupère des informations détaillées sur une métrique, y compris les métadonnées, les balises disponibles et les valeurs de balises pour le filtrage et le regroupement.

- Quelles balises sont disponibles pour la métrique `system.cpu.user` ?
- Montrez-moi toutes les valeurs possibles pour la balise `env` sur `redis.info.latency_ms`.
- Obtenez les métadonnées et les dimensions pour la métrique `requests.count`.

### `search_datadog_monitors` {#search-datadog-monitors}
*Ensemble d'outils : **Core***\
*Permissions requises : `Monitors Read`*\
Récupère des informations sur les moniteurs Datadog, y compris leurs statuts, seuils et conditions d'alerte.

- Liste tous les moniteurs qui sont actuellement en alerte.
- Montrez-moi les moniteurs liés à notre service de paiement.
- Trouvez les moniteurs étiquetés avec `team:infrastructure`.

### `get_datadog_trace` {#get-datadog-trace}
*Ensemble d'outils : **Core***\
*Permissions requises : `APM Read`*\
Récupère une trace complète depuis Datadog APM en utilisant un ID de trace.

- Obtenez la trace complète pour l'ID 7d5d747be160e280504c099d984bcfe0.
- Montrez-moi tous les spans pour la trace abc123 avec des informations de timing.
- Récupérez les détails de la trace, y compris les requêtes de base de données pour l'ID xyz789.

**Remarque**a: Les grandes traces avec des milliers de spans peuvent être tronquées (et indiquées comme telles) sans possibilité de récupérer tous les spans.

### `search_datadog_dashboards` {#search-datadog-dashboards}
*Ensemble d'outils : **Core***\
*Permissions requises : `Dashboards Read` et `User Access Read`*\
Liste des tableaux de bord Datadog disponibles et des détails clés.

- Montrez-moi tous les tableaux de bord disponibles dans notre compte.
- Liste des tableaux de bord liés à la surveillance de l'infrastructure.
- Trouvez des tableaux de bord partagés pour l'équipe d'ingénierie.

**Remarque** : Cet outil répertorie les tableaux de bord pertinents mais fournit peu de détails sur leur contenu. Utilisez `get_datadog_dashboard` pour récupérer les définitions complètes des widgets.

### `get_datadog_notebook` {#get-datadog-notebook}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Notebooks Read`*\
Récupère des informations détaillées sur un carnet spécifique par ID, y compris le nom, le statut et l'auteur.

- Obtenez les détails pour le carnet abc-123-def.
- Montrez-moi le contenu du carnet de débogage d'hier.

### `search_datadog_notebooks` {#search-datadog-notebooks}
*Ensemble d'outils : **Core***\
*Permissions requises : `Notebooks Read`*\
Répertorie et recherche des carnets Datadog avec filtrage par auteur, tags et contenu.

- Montrez-moi tous les carnets créés par l'équipe plateforme.
- Trouvez des carnets liés à l'investigation de performance.
- Listez les carnets étiquetés avec `incident-response`.

### `search_datadog_hosts` {#search-datadog-hosts}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Hosts Read` et `Timeseries`*\
Répertorie et fournit des informations sur les hôtes surveillés, prenant en charge le filtrage et la recherche.

- Montrez-moi tous les hôtes dans notre environnement de production.
- Listez les hôtes non sains qui n'ont pas rapporté au cours de la dernière heure.
- Obtenez tous les hôtes étiquetés avec `role:database`.

### `search_datadog_incidents` {#search-datadog-incidents}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Incidents Read`*\
Récupère une liste d'incidents Datadog, y compris leur état, leur gravité et leurs métadonnées.

- Montrez-moi tous les incidents actifs par gravité.
- Listez les incidents résolus de la semaine dernière.
- Trouvez les incidents ayant un impact sur les clients.

### `search_datadog_metrics` {#search-datadog-metrics}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Metrics`*\
Liste des métriques disponibles, avec des options de filtrage et des métadonnées.

- Montrez-moi toutes les métriques Redis disponibles.
- Liste des métriques liées au CPU pour notre infrastructure.
- Trouvez les métriques étiquetées avec `service:api`.

### `search_datadog_services` {#search-datadog-services}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Service Catalog Read`*\
Liste des services dans le catalogue de Datadog avec des détails et des informations sur l'équipe.

- Montrez-moi tous les services dans notre architecture de microservices.
- Liste des services appartenant à l'équipe plateforme.
- Trouvez les services liés au traitement des paiements.

### `search_datadog_service_dependencies` {#search-datadog-service-dependencies}
*Ensemble d'outils : **noyau***\
*Permissions requises : `APM Read` et `Service Catalog Read` et `Teams Read`*\
Récupère les dépendances de service (en amont/aval) et les services appartenant à une équipe.

- Montrez-moi tous les services en amont qui appellent le service de paiement.
- De quels services en aval l'API de paiement dépend-elle ?
- Liste tous les services appartenant à l'équipe plateforme.

### `search_datadog_spans` {#search-datadog-spans}
*Ensemble d'outils : **noyau***\
*Permissions requises : `APM Read`*\
Récupère les intervalles des traces APM avec des filtres tels que service, temps, ressource, etc.

- Montre-moi les intervalles avec des erreurs du service de paiement.
- Trouve les requêtes de base de données lentes des 30 dernières minutes.
- Obtiens les intervalles pour les requêtes API échouées vers notre service de paiement.

### `analyze_datadog_logs` {#analyze-datadog-logs}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Logs Read Data` et `Logs Read Index Data` et `Timeseries`*\
Analyse les journaux Datadog en utilisant des requêtes SQL pour le comptage, les agrégations et l'analyse numérique. Utilisez ceci pour l'analyse statistique.

- Comptez les journaux d'erreur par service dans la dernière heure.
- Affichez les 10 codes d'état HTTP les plus fréquents avec leur nombre.
- Quels services ont généré le plus de journaux pendant cette période ?

### `search_datadog_logs` {#search-datadog-logs}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Logs Read Data` et `Logs Read Index Data`*\
Recherche des journaux avec des filtres (temps, requête, service, hôte, niveau de stockage, etc.) et renvoie les détails des journaux. Renommé à partir de `get_logs`.

- Montrez-moi les journaux d'erreurs du service nginx au cours de la dernière heure.
- Trouvez les journaux contenant 'délai de connexion' de notre service API.
- Obtenez tous les journaux avec le code d'état 500 de la production.

### `search_datadog_rum_events` {#search-datadog-rum-events}
*Ensemble d'outils : **noyau***\
*Permissions requises : `RUM Apps Read`*\
Recherchez les événements RUM de Datadog en utilisant la syntaxe de requête avancée.

- Montrez les erreurs JavaScript et les avertissements de la console dans RUM.
- Trouvez les pages qui se chargent lentement (plus de 3 secondes).
- Montrez les interactions récentes des utilisateurs sur les pages de détails des produits.

### `create_datadog_notebook` {#create-datadog-notebook}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Notebooks Read` et `Notebooks Write`*\
Créez un nouveau carnet Datadog.

- Créez un carnet pour documenter l'enquête sur le pic de latence du service de paiement.
- Créez un nouveau carnet pour notre revue de performance hebdomadaire.

### `edit_datadog_notebook` {#edit-datadog-notebook}
*Ensemble d'outils : **noyau***\
*Permissions requises : `Notebooks Read` et `Notebooks Write`*\
Modifiez un carnet Datadog existant.

- Ajoutez une section au carnet abc-123-def avec les derniers résultats d'analyse des journaux.
- Mettez à jour le carnet de réponse aux incidents avec les résultats d'aujourd'hui.

## Alerting {#alerting}

Outils pour valider les moniteurs, rechercher des groupes de moniteurs et récupérer des modèles de moniteurs.

### `validate_datadog_monitor` {#validate-datadog-monitor}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Valide une définition de moniteur pour en vérifier la conformité avant de la créer ou de la mettre à jour.

- Validez cette définition de moniteur avant de la créer.
- Vérifiez si la syntaxe de votre requête de moniteur est correcte.

### `get_datadog_monitor_templates` {#get-datadog-monitor-templates}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Récupère les modèles de moniteurs disponibles pour vous aider à créer des moniteurs.

- Montrez-moi les modèles de moniteurs disponibles.
- Quels modèles pouvez-vous utiliser pour créer un nouveau moniteur ?

### `search_datadog_monitor_groups` {#search-datadog-monitor-groups}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Recherche des groupes de moniteurs par nom ou critères.

- Montrez-moi tous les groupes de moniteurs dans un état d'alerte.
- Trouvez les groupes de moniteurs liés au service de paiement.

### `search_datadog_slos` {#search-datadog-slos}
*Ensemble d'outils : **alerting***\
*Permissions requises : `SLOs Read`*\
Recherche des SLOs Datadog par nom, étiquettes ou type. Prend en charge la syntaxe de requête pour filtrer par service, équipe ou autres attributs.

- Recherchez les SLOs liés à `service:checkout`.
- Listez tous les SLOs étiquetés avec `team:backend`.
- Listez les SLOs pour le service de paiement.

### `create_datadog_monitor` {#create-datadog-monitor}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Write`*\
Créez un moniteur Datadog en mode brouillon. Les moniteurs créés avec cet outil n'envoient pas de notifications et sont réglés sur la priorité 5 (faible). Utilisez `validate_datadog_monitor` pour vérifier la définition avant de créer et `get_datadog_monitor_templates` pour des exemples de syntaxe de requête. Après la création, publiez le moniteur dans l'interface utilisateur de Datadog.

- Créez un moniteur d'alerte de métrique pour une utilisation élevée du CPU sur le service web.
- Configurez un moniteur d'alerte de journal pour les pics d'erreurs dans le service de paiement.
- Créez un moniteur pour suivre la latence p95 pour le checkout endpoint.

### `get_monitor_coverage` {#get-monitor-coverage}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Identifie les lacunes de surveillance et la couverture pour les services ou les hôtes. Retourne quels signaux (tels que le taux d'erreur, la latence et le taux de requêtes) sont couverts par les moniteurs existants et lesquels manquent. Utilisez avec `create_datadog_monitor` pour combler les lacunes.

- Obtenez la couverture de surveillance pour `service:checkout`.
- Quelles lacunes de surveillance existent pour `host:web-01`?
- Trouvez des services qui manquent de moniteurs de taux d'erreur.

## APM {#apm}

Outils pour une analyse approfondie des traces [APM][50], recherche de spans, insights de Watchdog et enquête sur la performance.

<div class="alert alert-info">Le <code>apm</code> L'ensemble d'outils est en aperçu. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">Inscrivez-vous pour accéder.</a></div>

### `apm_search_spans` {#apm-search-spans}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Recherche de spans en utilisant la syntaxe de requête APM, avec support pour la pagination et le filtrage par tags.

- Montrez-moi les spans avec des erreurs du service de paiement dans la dernière heure.
- Trouvez des requêtes de base de données lentes prenant plus de 2 secondes.
- Recherchez des spans avec `service:payments` et `status:error`.

### `apm_query_trace` {#apm-query-trace}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Interroge les données de span d'une trace pour filtrer, agréger ou classer les spans, comme trouver ceux ayant le plus de self-time ou tracer une erreur jusqu'à son service d'origine.

- Trouvez les 5 spans avec le plus de self-time dans la trace `abc123`.
- Montrez tous les messages d'erreur et leurs services d'origine dans la trace `abc123`.
- Quels appels de base de données dans cette trace ont pris plus de 500 ms ?

### `apm_discover_span_tags` {#apm-discover-span-tags}
*Ensemble d'outils : **apm***\.
*Permissions requises : `APM Read`*\.
Découvre les clés de balise disponibles sur les spans dans une plage de temps.

- Quelles balises sont disponibles sur les spans pour `service:checkout` ?
- Montrez-moi les clés de balise par lesquelles vous pouvez filtrer dans APM.

### `apm_get_primary_tag_keys` {#apm-get-primary-tag-keys}
*Ensemble d'outils : **apm***\.
*Permissions requises : `APM Read`*\.
Récupère les clés de balise principales configurées pour l'organisation.

- Quelles sont les clés de balise principales de mon organisation ?

### `apm_search_watchdog_stories` {#apm-search-watchdog-stories}
*Ensemble d'outils : **apm***\.
*Permissions requises : `APM Read`*\.
Recherche des histoires de détection d'anomalies de Watchdog pour un service dans une plage de temps, fournissant des informations alimentées par l'IA sur la latence, le taux d'erreur et les anomalies de trafic.

- Montre-moi les anomalies de Watchdog pour le service de paiement dans les dernières 24 heures.
- Y a-t-il des anomalies de latence détectées pour mon service API ?

### `apm_get_watchdog_story` {#apm-get-watchdog-story}
*Outils : **apm***\
*Autorisations requises : `APM Read`*\
Récupère des informations détaillées sur une histoire spécifique de Watchdog par son ID.

- Obtenez les détails de l'histoire de Watchdog `abc123`.

### `apm_latency_bottleneck_summary` {#apm-latency-bottleneck-summary}
*Ensemble d'outils : **apm***\.
*Permissions requises : `APM Read`*\.
Analyse les goulets d'étranglement de latence à travers les traces dans une période d'anomalie en utilisant des calculs de self-time. Identifie quelles combinaisons de services et de ressources consomment le plus de self-time, détecte les schémas d'appels en cascade et met en lumière les causes profondes des pics de latence.

- Résume les goulets d'étranglement de latence pour le service de paiement entre 14h et 15h aujourd'hui.
- Qu'est-ce qui consomme le plus de self-time dans le service de paiement pendant ce pic de latence ?
- Identifie quels points de terminaison sont les principaux goulets d'étranglement pour `service:api` entre 10h00 et 10h30.

### `get_change_stories` {#get-change-stories}
*Ensemble d'outils : **apm***\.
Récupère les histoires de changement depuis l'API de suivi des changements pour les services APM. Utilisez ceci pour identifier ce qui a changé (déploiements, drapeaux de fonctionnalités, mises à jour de configuration et événements d'infrastructure) pendant une plage horaire et corréler les changements avec des problèmes de performance ou des incidents.

- Montrez-moi les déploiements récents et les changements pour le service de paiement.
- Quels changements d'infrastructure se sont produits autour du moment de ce pic de latence ?
- Trouvez les modifications apportées aux feature flags et aux configurations du checkout service au cours de la dernière heure.

### `semantic_search_change_stories` {#semantic-search-change-stories}
*Ensemble d'outils : **apm***\
Recherche des histoires de changement en utilisant le langage naturel et la recherche sémantique alimentée par l'IA. Utilisez ceci pour trouver des changements de drapeaux de fonctionnalités ou de déploiement liés à un comportement, un problème signalé par un utilisateur ou une partie du produit que vous examinez.

- Qu'est-ce qui a changé récemment et pourrait affecter le chargement du tableau de bord pour les utilisateurs d'essai ?
- Quels drapeaux pourraient avoir un impact sur l'authentification dans la page des paramètres de facturation ?
- Trouvez les changements liés aux données de télémétrie manquantes au cours de la dernière semaine.

### `apm_search_recommendations` {#apm-search-recommendations}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Recherche des recommandations APM de Datadog.

- Montrez-moi les recommandations APM pour mes services.
- Y a-t-il des suggestions d'optimisation pour mon application ?

### `apm_get_recommendation` {#apm-get-recommendation}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Récupère les détails complets d'une recommandation APM spécifique par ID.

- Obtenez les détails de la recommandation `abc123`.

## Cas {#cases}

Outils pour [Gestion des cas][38], y compris la création, la recherche et la mise à jour des cas ; la gestion des projets ; et le lien avec les problèmes Jira.

### `search_datadog_cases` {#search-datadog-cases}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Read`*\
Recherche des cas [Gestion des cas][38] avec des filtres incluant le statut, la priorité, le projet et le responsable. Prend en charge le filtrage par plage de dates et la pagination.

- Montrez-moi tous les cas ouverts qui me sont assignés.
- Y a-t-il des cas P1 ouverts dans le projet des Revues de sécurité ?
- Montrez-moi tous les cas ouverts cette semaine liés au service de paiement.

### `get_datadog_case` {#get-datadog-case}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Read`*\
Récupère des informations détaillées sur un cas spécifique par ID ou clé, y compris le titre, le statut, la priorité, le responsable et les horodatages. Inclut éventuellement l'activité de la chronologie (commentaires et changements de statut) et des attributs personnalisés.

- Quelle est la dernière mise à jour sur CASE-1234 ? Montrez-moi la chronologie complète.
- Qui travaille sur ce dossier et quels progrès ont été réalisés jusqu'à présent ?
- Récupérez les détails et tous les commentaires concernant le dossier de migration de base de données.

### `create_datadog_case` {#create-datadog-case}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `Cases Write`*\
Crée un nouveau dossier de [Gestion des cas][38] avec un titre, un projet et des champs optionnels tels que la description, la priorité et le responsable.

- Je constate une augmentation de la latence sur le service de checkout. Créez un dossier P2 pour suivre l'enquête.
- Ouvrez un dossier de révision de sécurité pour l'activité de connexion suspecte que nous avons trouvée dans les journaux.

### `update_datadog_case` {#update-datadog-case}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `Cases Write`*\
Met à jour les champs d'un dossier existant tels que le statut, la priorité, le titre, la description, le responsable, la date d'échéance et les attributs personnalisés. Seuls les champs que vous fournissez sont mis à jour.

- Ce problème a maintenant un impact sur les clients. Escaladez le dossier CASE-1234 à P1.
- Marquez le dossier de migration de base de données comme résolu.
- Fixez une date d'échéance pour la fin de la semaine sur le dossier CASE-1234.

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `Cases Write`*\
Ajoute un commentaire à la chronologie d'un dossier. Les commentaires prennent en charge le formatage markdown.

- Ajoutez une note au dossier résumant ce que nous avons trouvé dans les journaux et les traces.
- Publiez une mise à jour indiquant que le correctif a été déployé et que nous surveillons.
- Documentez les résultats de l'analyse des causes profondes de ce dossier.

### `link_jira_issue_to_datadog_case` {#link-jira-issue-to-datadog-case}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `Cases Write`*

- Liez le ticket Jira pour la migration de l'infrastructure à ce dossier afin que nous puissions suivre les deux ensemble.
- Connectez PROJ-456 au dossier Datadog afin que l'équipe d'ingénierie ait de la visibilité.

### `list_datadog_case_projects` {#list-datadog-case-projects}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `Cases Read`*\
Liste des projets disponibles [Gestion des cas][38] avec filtrage optionnel par nom ou clé.

- Quels projets sont disponibles dans Case Management ?
- Y a-t-il un projet lié à la sécurité dans Case Management ?

### `get_datadog_case_project` {#get-datadog-case-project}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `Cases Read`*\
Récupère les détails d'un projet de dossier spécifique par ID.

- À quel projet ce dossier appartient-il ?

### `search_datadog_users` {#search-datadog-users}
*Ensemble d'outils : **dossiers***\
*Permissions requises : `User Access Read`*\
Recherche des utilisateurs Datadog par e-mail, nom ou identifiant. Utile pour trouver la bonne personne à qui assigner un dossier.

- Trouvez le compte utilisateur Datadog pour jane.doe@example.com.

## Exécution de code {#code-execution}

Un outil unique qui exécute du TypeScript écrit par des agents dans un bac à sable géré par Datadog, avec un accès direct aux API de Datadog, pour une enquête multi-signal et une exploration de données ad hoc en un seul appel.

<div class="alert alert-info">Le <code>code-exec</code> L'ensemble d'outils est en preview. <a href="https://www.datadoghq.com/product-preview/mcp-codexec/">Inscrivez-vous</a> pour le preview ou contactez <a href="/help"> le support Datadog</a> pour demander l'accès.</div>

Le code exécuté par cet ensemble d'outils s'exécute contre vos API Datadog en utilisant votre propre identité utilisateur. Le bac à sable applique vos [permissions de rôle existantes][56] à chaque appel API, de sorte qu'un agent ne peut lire ou modifier que les données auxquelles vous pouvez déjà accéder dans Datadog.

### `execute_code` {#execute-code}
*Ensemble d'outils : **code-exec***\
*Permissions requises : Toute permission de rôle spécifique au produit nécessaire pour accéder aux ressources sous-jacentes de Datadog avec lesquelles le code exécuté interagit (par exemple, `Logs Read` pour lire les journaux).*\
Exécute du TypeScript écrit par des agents dans un bac à sable géré par Datadog. Le code reçoit un `dd.*` espace de noms avec des aides pour interroger les journaux, les métriques, les traces, les services, les événements de changement, les incidents, les moniteurs, les tableaux de bord et d'autres API Datadog, et renvoie une valeur structurée à l'agent. Cela peut réduire le nombre d'allers-retours nécessaires pour des enquêtes multi-signal et une exploration de données ad hoc.

- Pour le `checkout-api` service au cours des deux dernières heures, récupérez les journaux d'erreurs, les métriques de latence et les déploiements récents ensemble et dites-moi quel déploiement coïncide avec le pic d'erreurs.
- Comparez les comptes de spans d'erreur, les alertes de moniteur et les changements de configuration pour le `payments` service au cours de la dernière journée, et identifiez tout ce qui a bougé en même temps.
- Pour `auth-service`, corrélez les principaux modèles d'erreurs dans les journaux avec les métriques de CPU et de mémoire de la dernière heure pour voir si les erreurs suivent la pression des ressources.

## Tableaux de bord {#dashboards}

Outils pour récupérer, créer, mettre à jour et supprimer des [tableaux de bord][46], plus référence et validation du schéma des widgets.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*Ensemble d'outils : **core**, **tableaux de bord***\
*Permissions requises : `Dashboards Read` et `User Access Read`*\
Récupère un [tableau de bord][46] Datadog par ID, renvoyant son titre, sa description, ses tags et ses widgets. Utilisez `search_datadog_dashboards` d'abord pour trouver les identifiants des tableaux de bord.

- Obtenez les détails complets du tableau de bord `ps7-mn3-kwf`.
- Montrez-moi les widgets et la mise en page du tableau de bord de l'aperçu de l'infrastructure.
- Récupérez les variables de modèle configurées sur ce tableau de bord.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*Ensemble d'outils : **core**, **tableaux de bord***\
*Permissions requises : `Dashboards Read` et `Dashboards Write`*\
Crée ou met à jour un [tableau de bord][46] Datadog. Pour mettre à jour un tableau de bord existant, fournissez l'identifiant du tableau de bord ; omettez-le pour en créer un nouveau. Appelez `get_widget_reference` pour les schémas de widget avant de construire des widgets.

- Créez un tableau de bord montrant l'utilisation du CPU et de la mémoire sur tous les hôtes.
- Ajoutez un widget de séries temporelles pour le taux d'erreur au tableau de bord `abc-123-def`.
- Mettez à jour le titre et la description de mon tableau de bord d'aperçu de service.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*Ensemble d'outils : **dashboards***\
*Permissions requises : `Dashboards Read` et `Dashboards Write`*\
Supprime définitivement un [dashboard][46] Datadog par ID. Cette action ne peut pas être annulée. Utilisez `search_datadog_dashboards` d'abord pour trouver les dashboard IDs.

- Supprimez le dashboard `ps7-mn3-kwf`.
- Retirez l'ancien dashboard de l'environnement de staging.

### `get_widget_reference` {#get-widget-reference}
*Ensemble d'outils : **dashboards***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read`*\
Renvoie des schémas et des instructions de construction pour les types de widgets de dashboard. Les définitions de widgets sont des objets JSON ; cet outil renvoie des définitions de type TypeScript représentant leurs schémas ainsi que des instructions de construction couvrant les modèles de requête, la syntaxe des formules et les pièges courants. Appelez ceci avant de générer des widgets avec `upsert_datadog_dashboard`.

- Obtenez le schéma pour un widget de séries temporelles.
- Montrez-moi comment construire un toplist et un query table widget.
- Quel est le schéma pour le scatterplot widget ?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*Ensemble d'outils : **tableaux de bord***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read`*\
Valide une définition de widget par rapport au schéma du dashboard. Utilisez ceci pour vérifier le JSON du widget avant de le passer à `upsert_datadog_dashboard`.

- Validez ma définition de widget de séries temporelles avant de créer le dashboard.
- Vérifiez si ce JSON de query table widget est correct.

### `ask_widget_expert` {#ask-widget-expert}
*Ensemble d'outils : **dashboards***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read`*\
Posez une question à un expert en widgets Datadog sur la configuration des widgets, les schémas, la syntaxe des requêtes, l'utilisation des champs, le débogage ou les pièges. Idéal pour des questions ciblées : recherches de schémas, clarifications de champs, débogage d'une définition de widget existante ou compréhension du fonctionnement d'un type de widget spécifique.

- Quel response_format devrais-je utiliser pour un toplist ?
- Quel est le schéma pour le scatterplot widget ?
- Aidez-moi à déboguer pourquoi ce widget affiche des valeurs fractionnaires alors qu'il devrait être un count.
- Comment configurer une série temporelle pour afficher à la fois des barres et des lignes ?

## Database Monitoring {#database-monitoring}

Outils pour interagir avec [Database Monitoring][26].

### `find_datadog_database_instances` {#find-datadog-database-instances}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Découvre et classe les instances de base de données pour l'investigation DBM. Appelez ceci avant d'autres outils DBM qui nécessitent un paramètre `database_instance`. Accepte un ID de trace ou de span APM, des tags, ou les deux pour trouver des instances correspondantes, puis évalue et classe leur santé.

- Trouvez les instances de base de données corrélées avec la trace `abc123` d'il y a une heure.
- Quelles instances PostgreSQL correspondent à `cluster_name:payments-prod` ?
- Classez les instances de base de données pour le service `checkout-api` par santé.

### `get_datadog_database_calling_services` {#get-datadog-database-calling-services}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Identifie les services et ressources APM en amont qui effectuent des requêtes de base de données. Corrèle l'activité de la base de données avec les traces d'application pour une analyse des causes profondes à travers la frontière APM-base de données.

- Quels services appellent les requêtes les plus lentes sur `db-prod-1` ?
- Trouvez l'appelant principal de query signature `abc123def`.
- Montrez-moi les ressources APM générant une charge sur la base de données des paiements.

### `get_datadog_database_explain_plans` {#get-datadog-database-explain-plans}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère les explain plans PostgreSQL pour une query signature dans un intervalle de temps. Renvoie des structures de plan simplifiées avec des arbres d'opérateurs, l'utilisation d'index et des coûts estimés, triés par coût.

- Obtenez les explain plans pour la query signature `abc123def` sur `db-prod-1`.
- Montrez-moi les execution plans les plus coûteux pour cette requête lente.
- Quelles variations de plan possède la query signature `xyz789` au cours de la dernière journée ?

### `get_datadog_database_health_signals` {#get-datadog-database-health-signals}
*Ensemble d'outils : **dbm***\
*Permissions Requises : `Database Monitoring Read`*\
Effectue des vérifications de santé pour faire ressortir les problèmes potentiels de PostgreSQL tels que la saturation du CPU, les redémarrages, la latence des requêtes et les blocages. Compare une période de régression à une période de référence.

- Exécute des vérifications de santé sur `db-prod-1` pour la dernière heure par rapport à l'heure précédente.
- Vérifie la santé de la base de données autour de la période de l'incident.
- Quels signaux expliquent la régression sur la base de données des paiements ?

### `get_datadog_database_query_performance` {#get-datadog-database-query-performance}
*Ensemble d'outils : **dbm***\
*Permissions Requises : `Database Monitoring Read`*\
Analyse la performance d'une requête PostgreSQL spécifique. Retourne le débit, la latence moyenne, le temps d'exécution, le nombre de lignes par exécution, le ratio de hits du cache, les statistiques d'E/S, l'activité de connexion, les événements d'attente et la durée des transactions, avec des statistiques globales et une analyse par tranche horaire.

- Analyse la performance pour la signature de requête `abc123def` au cours de la dernière heure.
- Pourquoi cette requête est-elle lente sur l'instance PostgreSQL de production ?
- Montre les événements d'attente et le ratio de hits du cache pour la signature de requête `xyz789`.

### `get_datadog_database_query_statement` {#get-datadog-database-query-statement}
*Ensemble d'outils : **dbm***\
*Permissions Requises : `Database Monitoring Read`*\
Récupère le texte de l'instruction SQL pour une signature de requête donnée. Utilisez ceci pour mapper les hachages de signature au SQL concret pour l'investigation et le reporting.

- Obtenez le SQL pour la signature de requête `abc123def`.
- Montrez-moi l'instruction derrière ce hachage de requête sur `db-prod-1`.
- À quelle requête correspond la signature `xyz789` ?

### `get_datadog_database_recommendations` {#get-datadog-database-recommendations}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère des recommandations de base de données en direct pour une base de données, une requête, une table, un hôte ou un index. Renvoie les recommandations correspondantes avec le statut, la gravité et un bloc de portée normalisé mettant en évidence les instances affectées, les signatures de requête, les tables, les index, les services, les plans et les identifiants d'infrastructure.

- Affichez les recommandations de base de données ouvertes pour `db-prod-1`.
- Listez les recommandations d'index manquants sur la base de données des paiements.
- Obtenez des recommandations de haute gravité pour la signature de requête `abc123def`.

### `get_datadog_database_schemas` {#get-datadog-database-schemas}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère les définitions de schéma (colonnes, index, clés étrangères, partitions) pour un ou plusieurs objets de base de données. Accepte les noms de table avec des qualificateurs de schéma, de base de données et d'instance optionnels.

- Montrez-moi le schéma de la table `orders`.
- Obtenez les colonnes et les index pour `public.users` sur `db-prod-1`.
- Récupérez les clés étrangères pour la table `payments`.

### `optimize_datadog_database_query` {#optimize-datadog-database-query}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Analyse une requête PostgreSQL pour des opportunités d'optimisation en utilisant des règles déterministes. Renvoie des réécritures de requête, la détection de modèles anti-pattern (`SELECT *`, `OFFSET` sans `ORDER BY`, `ORDER BY` sans `LIMIT`), des suggestions d'index manquants et une analyse de l'impact des transactions inactives. Accepte soit du texte SQL soit une signature de requête.

- Optimisez la signature de requête `abc123def` sur la base de données des paiements.
- Vérifiez ce SQL pour les index manquants et les anti-patterns.
- Suggérez des réécritures pour la requête la plus lente sur `db-prod-1`.

### `search_datadog_database_plans` {#search-datadog-database-plans}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Recherche [Surveillance de la base de données][26] des plans d'exécution des requêtes, qui montrent comment le moteur de base de données exécute les requêtes, y compris l'utilisation des index, les stratégies de jointure et les estimations de coût. Utilisez ceci pour analyser les performances des requêtes et identifier les opportunités d'optimisation.

- Montrez-moi les plans d'exécution pour les requêtes lentes sur `host:db-prod-1` de la dernière heure.
- Trouvez des plans de requêtes avec `@db.plan.type:explain_analyze` pour la base de données de production.
- Obtenez des plans d'exécution pour les requêtes par `@db.user:app_user` avec une durée supérieure à 1 seconde.

### `search_datadog_database_samples` {#search-datadog-database-samples}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Recherche [Surveillance de la base de données][26] des échantillons de requêtes, qui représentent des exécutions de requêtes individuelles avec des métriques de performance. Utilisez ceci pour analyser les modèles d'activité de la base de données, identifier les requêtes lentes et enquêter sur les problèmes de performance de la base de données.

- Montrez-moi des échantillons de requêtes avec `@duration:>1000000000` (durée supérieure à 1 seconde) de `db:mydb`.
- Trouvez des requêtes lentes sur `host:db-prod-1` filtrées par `@db.user:app_user`.
- Obtenez des échantillons de requêtes récents pour `@db.query_signature:abc123def` et analysez les modèles de performance.

## DDSQL {#ddsql}

Outils pour interroger les données de Datadog en utilisant [DDSQL][41], un dialecte SQL avec support pour les ressources d'infrastructure, les journaux, les métriques, RUM, les spans et d'autres sources de données Datadog.

### `ddsql_get_spec` {#ddsql-get-spec}
*Ensemble d'outils : **ddsql***\
Obtenez une spécification compacte des capacités DDSQL, y compris les fonctions SQL prises en charge, les mots-clés SQL et les différences spécifiques à DDSQL par rapport à PostgreSQL standard. Appelez cet outil avant de composer des requêtes pour comprendre la syntaxe prise en charge.

- Quelles fonctions SQL sont prises en charge dans DDSQL ?
- Montrez-moi les règles de syntaxe des requêtes DDSQL et les différences par rapport à PostgreSQL.
- Quelles fonctions d'agrégation puis-je utiliser dans DDSQL ?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*Ensemble d'outils : **ddsql***\
Recherche dans les ensembles de données DDSQL et renvoie des tables (sources de données publiques et tables de référence) et des métriques disponibles.

- Quelles tables sont disponibles pour interroger dans DDSQL ?
- Recherchez des tables DDSQL liées à Kubernetes.
- Montrez-moi les métriques disponibles que je peux interroger avec DDSQL.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*Ensemble d'outils : **ddsql***\
Obtient les colonnes SQL statiques pour une table DDSQL à partir des métadonnées du schéma.

- Quelles colonnes sont disponibles dans la table `aws.ec2_instance` ?
- Montrez-moi le schéma de la table `k8s.pods`.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*Ensemble d'outils : **ddsql***\
Recherche et classe les champs pour les sources DDSQL non structurées, telles que les journaux, RUM et spans, triés par fréquence. Utilisez cet outil pour la découverte de schéma sur les sources consultables avant de revenir à `ddsql_schema_get_table_columns`.

- Quels champs sont disponibles dans les journaux DDSQL ?
- Trouvez des champs liés à `service` dans mes données RUM.
- Montrez-moi les champs les plus courants dans mes données de span.

### `ddsql_run_query` {#ddsql-run-query}
*Ensemble d'outils : **ddsql***\
Exécute une requête DDSQL et renvoie les résultats. Prend en charge l'utilisation de la syntaxe SQL pour interroger les ressources d'infrastructure, les journaux, les métriques, RUM, les spans et d'autres sources de données Datadog. Consultez la [Référence DDSQL][42] pour les détails de syntaxe.

- Combien d'instances EC2 sont en cours d'exécution dans chaque région AWS ?
- Montrez-moi les 10 principaux services par nombre de journaux d'erreurs au cours de la dernière heure.
- Interrogez l'utilisation moyenne du CPU regroupée par hôte pour les dernières 24 heures.

### `ddsql_create_link` {#ddsql-create-link}
*Ensemble d'outils : **ddsql***\
Génère un lien UI Datadog vers l'[Éditeur DDSQL][41] avec une requête donnée pré-remplie.

- Générez un lien vers l'Éditeur DDSQL pour cette requête.
- Créez un lien partageable vers l'Éditeur DDSQL avec ma requête d'infrastructure.

## Suivi des erreurs {#error-tracking}

Outils pour interagir avec Datadog [Suivi des erreurs][49].

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*Ensemble d'outils : **error-tracking***\
*Permissions requises : `Error Tracking Read`*\
Recherche des problèmes de suivi des erreurs à travers les sources de données (RUM, Journaux, Traces).

- Montrez-moi tous les problèmes de suivi des erreurs dans le service checkout des dernières 24 heures.
- Quelles sont les erreurs les plus courantes dans mon application au cours de la semaine dernière ?
- Trouvez des problèmes de suivi des erreurs dans l'environnement de production avec `service:api`.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*Ensemble d'outils : **error-tracking***\
*Permissions requises : `Cases Read` et `Error Tracking Read`*\
Récupère des informations détaillées sur un problème de suivi d'erreur spécifique dans Datadog.

- Aidez-moi à résoudre le problème de suivi d'erreur `550e8400-e29b-41d4-a716-446655440000`.
- Quel est l'impact du problème de suivi d'erreur `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` ?
- Créez un cas de test pour reproduire le problème de suivi d'erreur `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

### `analyze_datadog_error_tracking_errors` {#analyze-datadog-error-tracking-errors}
*Toolset: **error-tracking***\
*Permissions requises : `Error Tracking Read` et `Timeseries`*\
Analyse les erreurs de Datadog Error Tracking à l'aide de requêtes SQL pour le comptage, les agrégations et l'analyse numérique. Opère sur des échantillons d'erreurs individuels, pas sur des Error Tracking Issues (groupes d'erreurs).

- Comptez les erreurs par service au cours de la dernière heure.
- Montrez-moi les principaux types d'erreurs dans le checkout service au cours de la semaine dernière.
- Décomposez les erreurs par version afin d'identifier quel déploiement a introduit un Error Tracking Issue.

### `update_datadog_error_tracking_issue` {#update-datadog-error-tracking-issue}
*Toolset: **error-tracking***\
*Permissions requises : `Cases Read`, `Cases Write`, `Error Tracking Read` et `Error Tracking Write`*\
Met à jour l'état ou l'assigné d'un Error Tracking Issue dans Datadog.

- Marquez l'Error Tracking Issue `550e8400-e29b-41d4-a716-446655440000` comme résolu.
- Assignez l'Error Tracking Issue `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` à moi.
- Définissez l'état de l'Error Tracking Issue `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f` sur ignoré.

## Feature Flags {#feature-flags}

Outils pour gérer [Feature Flags][51], notamment créer, lister et mettre à jour les Feature Flags et leurs environnements.

### `list_datadog_feature_flags` {#list-datadog-feature-flags}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Liste les Feature Flags avec prise en charge de la pagination.

- Montrez-moi tous les Feature Flags dans mon organisation.
- Listez les Feature Flags pour le checkout service.

### `get_datadog_feature_flag` {#get-datadog-feature-flag}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Récupère les détails d'un Feature Flag spécifique.

- Obtenez les détails pour le Feature Flag `dark-mode-enabled`.
- Quels sont les paramètres actuels pour le Feature Flag `new-checkout-flow` ?

### `create_datadog_feature_flag` {#create-datadog-feature-flag}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read` et `Feature Flag Write`*\
Crée un nouveau Feature Flag.

- Créez un Feature Flag appelé `enable-new-dashboard` pour un déploiement progressif.
- Configurez un nouveau Feature Flag booléen pour la fonctionnalité bêta.

### `list_datadog_feature_flag_environments` {#list-datadog-feature-flag-environments}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read`*\
Liste les environnements configurés pour les Feature Flags.

- Montrez-moi les environnements de Feature Flags disponibles.
- Quels environnements puis-je cibler avec les Feature Flags ?

### `list_datadog_feature_flag_allocations` {#list-datadog-feature-flag-allocations}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Liste les allocations pour un Feature Flag dans un environnement spécifique.

- Montrez-moi les règles d'allocation pour le Feature Flag `new-checkout-flow` en production.

### `update_datadog_feature_flag_environment` {#update-datadog-feature-flag-environment}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read` et `Feature Flag Write`*\
Met à jour la configuration d'un Feature Flag dans un environnement spécifique.

- Activez le Feature Flag `dark-mode` dans l'environnement de staging.
- Déployez le Feature Flag `new-checkout-flow` à 50 % des utilisateurs en production.

### `check_datadog_flag_implementation` {#check-datadog-flag-implementation}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Vérifie si un Feature Flag est implémenté dans le code.

- Vérifiez que le Feature Flag `enable-new-dashboard` est implémenté dans ma base de code.

### `sync_datadog_feature_flag_allocations` {#sync-datadog-feature-flag-allocations}
*Toolset: **feature-flags***\
*Permissions Requises : `Feature Flag Write`*\
Synchronise les allocations de Feature Flags pour un environnement spécifique.

- Synchronisez les allocations pour le Feature Flag `new-checkout-flow` en production.

## Kubernetes {#kubernetes}

Outils pour rechercher et décrire les ressources [Kubernetes][55] et récupérer les manifests à travers tous les clusters.

### `search_datadog_k8s_resources` {#search-datadog-k8s-resources}
*Ensemble d'outils : **kubernetes***\
*Permissions Requises : `Hosts Read` et `Teams Read`*\
Recherche des ressources [Kubernetes][55] dans tous les clusters. Utilisez cet outil au lieu de `kubectl` pour déterminer l'état des ressources Kubernetes telles que les déploiements, les pods, les nœuds, etc. Cet outil ne nécessite pas d'accès au cluster local, fonctionne sur tous les clusters et renvoie des données enrichies avec des balises. Vous pouvez inclure des clés de balises spécifiques sur chaque résultat et inclure les noms des ressources parentes pour examiner les relations entre les ressources (par exemple, le déploiement auquel appartient un pod).

- Montrez-moi tous les pods dans l'espace de noms `production` avec le statut `CrashLoopBackOff`.
- Trouvez les déploiements avec des déploiements en cours dans le cluster `general2`.
- Listez tous les nœuds dans mon cluster triés par utilisation du CPU.
- Groupez les déploiements par `service` et `env` pour voir comment mes services sont répartis entre les environnements.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*Ensemble d'outils : **kubernetes***\
*Permissions requises : `Hosts Read`*\
Obtient des informations détaillées sur une ressource [Kubernetes][55] spécifique, y compris des détails spécifiques à la ressource tels que les demandes et limites de CPU et de mémoire, et éventuellement des balises, des étiquettes, des annotations, l'historique des manifestes, les ressources parentes et un lien direct vers l'[Explorateur Kubernetes][55]. Utilisez cet outil au lieu de `kubectl describe`. Identifiez une ressource par son UID d'une recherche précédente ou en fournissant des identifiants de ressource (cluster, espace de noms et nom de la ressource). Pour le manifeste brut complet, utilisez `get_datadog_k8s_manifest`.

- Décrivez le pod `my-app` dans le cluster `prod`, espace de noms `default`.
- Obtenez les détails pour le déploiement `api-server` dans l'espace de noms `default`, cluster `staging`.
- Montrez-moi les balises et annotations pour cette ressource Kubernetes.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*Ensemble d'outils : **kubernetes***\
*Permissions requises : `Hosts Read`*\
Récupère le manifeste YAML pour une ressource [Kubernetes][55] spécifique. Utilisez cet outil au lieu de `kubectl get -o yaml`. Prend en charge l'extraction de sous-arbres spécifiques avec une expression JSONPath `kubectl` et un mode concis qui omet `status` et `managedFields` pour réduire la taille de la réponse.

- Obtenez le manifeste pour le pod `my-app` dans le cluster `prod`, espace de noms `default`.
- Montrez-moi les ports de conteneur pour le déploiement `api-server` dans l'espace de noms `default`, cluster `staging`.
- Obtenez les images de conteneur à partir du manifeste du pod `my-app`.

## Networks {#networks}

Outils pour l'analyse de [Cloud Network Monitoring][31] et [Network Device Monitoring][32].

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*Toolset: **networks***\
*Permissions requises : `Network Connections Read`*\
Analysez les problèmes au niveau du réseau en utilisant les données de [Cloud Network Monitoring][31], en analysant les données de flux réseau pour détecter des anomalies telles que des taux de retransmission élevés.

- Analysez le trafic réseau entre mes serveurs web et le cluster de base de données.
- Y a-t-il des problèmes de retransmission entre `service:api` et `service:payments` ?
- Investiguer les données de flux réseau pour des anomalies dans l'environnement de production.

### `search_ndm_devices` {#search-ndm-devices}
*Toolset: **networks***\
*Permissions requises : `NDM Read`*\
Recherche des dispositifs réseau (routeurs, commutateurs, pare-feu) surveillés par Datadog [Network Device Monitoring][32].

- Montrez-moi tous les dispositifs réseau dans le datacenter `us-east-1`.
- Trouvez les pare-feu qui signalent des erreurs.
- Listez tous les commutateurs surveillés et leurs statuts.

### `get_ndm_device` {#get-ndm-device}
*Toolset: **networks***\
*Permissions requises : `NDM Read`*\
Récupère des informations détaillées sur un appareil réseau spécifique par son identifiant d'appareil.

- Obtenez les détails de l'appareil réseau `device:abc123`.
- Montrez-moi la configuration et l'état de ce routeur.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*Toolset: **networks***\
*Permissions requises : `NDM Read`*\
Récupère toutes les interfaces réseau pour un appareil spécifique.

- Montrez-moi toutes les interfaces sur l'appareil `device:abc123`.
- Listez les états des interfaces pour mon routeur principal.

## Onboarding {#onboarding}

Outils d'agentic onboarding pour la configuration et la mise en place guidées de Datadog.

### `browser_onboarding` {#browser-onboarding}
*Ensemble d'outils : **onboarding***\
*Permissions requises : `RUM Apps Read`*\
Vous guide à travers l'intégration de Browser RUM à Datadog.

- Aidez-moi à configurer la surveillance de Browser RUM pour mon application web.

### `devices_onboarding` {#devices-onboarding}
*Ensemble d'outils : **onboarding***\
*Permissions requises : `RUM Apps Read`*\
Vous guide à travers l'intégration des appareils à la surveillance Datadog.

- Aidez-moi à configurer la surveillance des appareils dans Datadog.

### `kubernetes_onboarding` {#kubernetes-onboarding}
*Ensemble d'outils : **onboarding***\
*Permissions requises : Aucune*\
Vous guide à travers l'intégration des clusters Kubernetes à Datadog.

- Aidez-moi à configurer la surveillance Datadog pour mon cluster Kubernetes.

### `llm_observability_onboarding` {#llm-observability-onboarding}
*Ensemble d'outils : **onboarding***\
Vous guide à travers l'intégration de l'Observabilité de l'Agent dans Datadog.

- Aidez-moi à configurer l'Observabilité de l'Agent pour mon application IA.

### `test_optimization_onboarding` {#test-optimization-onboarding}
*Ensemble d'outils : **onboarding***\
*Permissions requises : Aucune*\
Vous guide à travers l'intégration de l'Optimisation des Tests dans Datadog.

- Aidez-moi à configurer l'Optimisation des Tests pour mon pipeline CI.

### `serverless_onboarding` {#serverless-onboarding}
*Ensemble d'outils : **onboarding***\
*Permissions requises : Aucune*\
Vous guide à travers l'intégration des applications sans serveur à Datadog, y compris les fonctions AWS Lambda et GCP Cloud Run et Cloud Run (Gen 2).

- Aidez-moi à surveiller mes fonctions AWS Lambda avec Datadog.
- Aidez-moi à surveiller mes services GCP Cloud Run avec Datadog.
- Aidez-moi à surveiller mes fonctions GCP Cloud Run avec Datadog.

### `source_map_uploads` {#source-map-uploads}
*Ensemble d'outils : **onboarding***\
Vous guide à travers le téléchargement des cartes sources pour le mappage des erreurs RUM.

- Aidez-moi à télécharger des cartes sources afin que mes erreurs RUM affichent le code source original.

## Profilage {#profiling}
Outils en lecture seule pour découvrir, explorer et analyser les données [Profil continu][62] à travers les services, runtimes et traces.

### `get_profiling_profile_types` {#get-profiling-profile-types}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie les types de profils et les familles disponibles pour un contexte de requête donné (chaîne de requête et plage horaire) ou un contexte de trace/span. Utilisez ceci d'abord pour découvrir ce qui est interrogeable.

- Montrez-moi quels types de profils sont disponibles pour `service:checkout-api` dans la dernière heure.
- Quelles familles de profils sont disponibles pour la trace `7d5d747be160e280504c099d984bcfe0` ?
- Listez les types de profils disponibles dans mon environnement de production.

### `get_profiling_services` {#get-profiling-services}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Listez les services profilés et leurs familles de profilage dans le périmètre. Les résultats ne sont pas ordonnés et n'impliquent pas d'importance ou de niveau d'activité.

- Listez tous les services avec le profilage activé en production.
- Montrez-moi quels services ont des données de profilage JVM.
- Quels services sont profilés dans l'environnement de l'équipe des paiements ?

### `get_profiling_runtime_ids` {#get-profiling-runtime-ids}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie les runtime IDs individuels (processes ou containers) dans le périmètre. Par défaut, cela se limite au top-1 par CPU ; le paramètre de limite contrôle combien.

- Montrez-moi les 10 runtime IDs les plus élevés par CPU pour `service:checkout-api`.
- Obtenez le runtime avec le plus haut CPU pour mon service Go.
- Listez les runtime IDs profilés pour le service de paiements au cours de la dernière heure.

### `get_profiling_service_insights` {#get-profiling-service-insights}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie des informations de service pré-calculées, y compris un résumé de haut niveau, des signaux contextuels (méthodes affectées, paquets, processus) et des étapes recommandées.

- Montrez-moi les informations de profilage pour `service:checkout-api`.
- Quels problèmes de performance sont signalés sur le service de paiements ?
- Obtenez des recommandations de profilage pour mon service Java.

### `explore_profiling_flame_graph` {#explore-profiling-flame-graph}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie les traces de pile top-N par contribution de valeur pour un type de profil donné. Prend en charge le filtrage par cadre, point de terminaison ou expression régulière d'attribut. Service unique. Accepte soit `service:family` soit un traceContext.

- Montrez-moi le graphique de flamme CPU pour `service:checkout-api` au cours de la dernière heure.
- Trouvez les principaux points chauds d'allocation pour le service de paiements.
- Explorez le graphique de flamme pour la trace `7d5d747be160e280504c099d984bcfe0`.

### `explore_profiling_call_graph` {#explore-profiling-call-graph}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie une vue de graphe d'appels (edges appelant-à-appelé) des fonctions chaudes pour un type de profil donné. Par défaut, les 20 nœuds principaux, un seuil de 5 % et 5 edges par nœud. Service unique.

- Montrez-moi le graphe d'appels pour les fonctions CPU gourmandes dans `service:checkout-api`.
- Quelles fonctions appellent les chemins les plus lents dans mon service Go ?
- Obtenez le graphe d'appels d'allocation pour le service de paiements.

### `explore_profiling_timeline` {#explore-profiling-timeline}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie une chronologie des lane groups (threads, garbage collection, etc.) avec une activité CPU et I/O. Prend en charge un mode de chemin critique (Go uniquement ; nécessite traceContext) pour identifier les goulets d'étranglement de latence dans un span.

- Montrez-moi la chronologie des threads pour `service:checkout-api` au cours des 15 dernières minutes.
- Trouvez le chemin critique pour la trace `abc123` dans mon service Go.
- Explorez l'activité de garbage collection et de CPU autour du pic de latence.

### `get_profiling_timeseries` {#get-profiling-timeseries}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie des données de profilage agrégées sous forme de séries temporelles (métriques de taux). Idéal pour les tendances, la comparaison entre services et la détection de régressions. Prend en charge le groupement par champs de trame, contextes et étiquettes.

- Montrez-moi les séries temporelles de profil CPU pour `service:checkout-api` au cours des 24 dernières heures.
- Comparez les taux d'allocation entre mes services Java regroupés par version.
- Détectez les régressions de profil au cours de la dernière semaine regroupées par déploiement.

### `get_profiling_tag_names` {#get-profiling-tag-names}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Découvre les noms de balises disponibles (tels que service, hôte, env, version, famille, runtime-id, kube_*) pour filtrer les données de profilage. Renvoie jusqu'à 50 résultats, triés par pertinence.

- Quels noms de balises sont disponibles pour filtrer les données de profilage en production ?
- Listez les noms de balises de profilage pour `service:checkout-api`.

### `get_profiling_tag_values` {#get-profiling-tag-values}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie les valeurs pour une balise de profilage spécifique (par exemple, toutes les valeurs de la balise service). Renvoie jusqu'à 50 résultats, triés par fréquence.

- Quelles versions du service de paiements avons-nous des données de profilage pour la dernière heure ?
- Quels sont les deux centres de données avec le plus de données de profilage disponibles pour `service:checkout-api` ?

### `get_profiling_fields` {#get-profiling-fields}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Découvre les champs de facette de cadre et de contexte (tels que `@stack.function` et `@labels.trace_endpoint`) utilisables dans les paramètres groupBy et filter de `get_profiling_timeseries`. Filtré par type d'échantillon.

- Quels champs de cadre puis-je regrouper pour les profils CPU ?
- Montrez-moi les champs de facette disponibles pour les profils d'allocation.
- Listez les champs de contexte par lesquels je peux filtrer les séries temporelles pour `service:checkout-api`.

### `get_profiling_field_values` {#get-profiling-field-values}
*Ensemble d'outils : **profilage***\
*Permissions requises : `Continuous Profiler Read`*\
Renvoie les valeurs pour un champ de cadre ou de contexte spécifique découvert avec `get_profiling_fields`. Triés par fréquence.

- Montrez-moi les valeurs les plus élevées pour `@stack.function` dans mes profils CPU.
- Obtenez les valeurs des points de terminaison les plus élevées à partir de `@labels.trace_endpoint`.
- Listez les valeurs pour le champ de paquet dans les profils d'allocation.

## Tables de référence {#reference-tables}

Outils pour gérer [Tables de référence][45], y compris la liste des tables, la lecture des lignes, l'ajout de lignes et la création de tables à partir du stockage cloud.

### `list_reference_tables` {#list-reference-tables}
*Toolset: **reference-tables***\
Liste et recherche [Tables de référence][45] dans l'organisation, avec filtrage optionnel par nom et tri.

- Liste toutes les tables de référence dans mon organisation.
- Trouvez des tables de référence avec `customer` dans le nom.
- Montrez-moi les tables de référence triées par date de dernière mise à jour.

### `get_reference_table_rows` {#get-reference-table-rows}
*Toolset: **reference-tables***\
Récupère des lignes spécifiques d'une table de référence par leurs valeurs de clé primaire. Utilisez `list_reference_tables` d'abord pour trouver l'ID de la table et le schéma.

- Obtenez les lignes avec les clés primaires `user001` et `user002` de la table de référence des utilisateurs.
- Recherchez l'entrée pour l'ID de compte `acct-123` dans la table des comptes.

### `append_reference_table_rows` {#append-reference-table-rows}
*Toolset: **reference-tables***\
Ajoute de nouvelles lignes à une table de référence existante. Cette opération n'ajoute que des lignes et ne modifie ni ne supprime les données existantes. Chaque ligne doit inclure tous les champs requis du schéma de la table, y compris le champ de clé primaire.

- Ajoutez une nouvelle ligne pour l'utilisateur `user003` avec le nom `Carol` et l'âge `28` dans la table des utilisateurs.
- Ajoutez ces cinq nouvelles entrées de compte à la table de référence des comptes.

### `create_reference_table` {#create-reference-table}
*Toolset: **reference-tables***\
Crée une nouvelle table de référence basée sur un fichier CSV dans Amazon S3, Google Cloud Storage ou Azure Blob Storage. Seules les types de champs `INT32` et `STRING` sont pris en charge.

- Créez une table de référence appelée `ip_allowlist` à partir du fichier `allowlist.csv` dans mon seau S3 `my-data-bucket`.
- Configurez une nouvelle table de référence basée sur GCS appelée `customer_tiers` avec la synchronisation automatique activée.

## Remote Actions {#remote-actions}

<div class="alert alert-info">Le <code>remote-actions</code> toolset est en Preview. <a href="https://www.datadoghq.com/product-preview/datadog-agent-mcp/">Inscrivez-vous pour obtenir l'accès.</a></div>

Outils pour exécuter des diagnostics en lecture seule sur des hôtes instrumentés avec l'Agent Datadog. Les commandes atteignent l'hôte via le Private Action Runner (PAR) en utilisant un [interpréteur de shell restreint][63]. Toutes les commandes s'exécutent en tant que fonctions intégrées Go sûres sans accès en écriture, sans exécution de binaire externe et sans sortie réseau. La liste des commandes autorisées est contrôlée par version de l'Agent depuis le backend Datadog.

### `datadog_remote_action_restricted_shell_run_command` {#datadog-remote-action-restricted-shell-run-command}
*Toolset: **remote-actions***\
*Permissions requises : `Connections Resolve` et `Private Action Runner Contribute`*\
Exécute une commande shell en lecture seule sur un hôte spécifié. Les commandes prises en charge incluent : `cat`, `ls`, `head`, `tail`, `find`, `grep`, `sed`, `cut`, `sort`, `uniq`, `wc`, `ping`, `ss` et `ip`. Prend en charge les pipes, les boucles, les conditionnels, l'assignation de variables et le globbing.

- Montrez-moi les 100 dernières lignes du journal de l'Agent Datadog sur l'hôte `prod-web-01`.
- Trouvez toutes les entrées d'ERREUR dans `/var/log/app/` sur l'hôte `db-replica-3` de la dernière heure.
- Obtenez le contenu de `/etc/datadog-agent/datadog.yaml` sur l'hôte `prod-worker-07`.

## RUM {#rum}

Outils pour [Surveillance des Utilisateurs Réels][58], y compris la résolution des applications, le résumé des performances, la mise en avant des insights agrégés pour les vues, l'exploration des métriques et l'inspection de la configuration des applications.

<div class="alert alert-info">Le <code>rum</code> toolset est en Preview. Contactez <a href="/help">le support Datadog</a> pour demander l'accès.</div>

### `search_rum_applications` {#search-rum-applications}
*Toolset: **rum***\
*Permissions requises : `RUM Apps Read`*\
Liste vos applications RUM et résout le `application_id` à utiliser pour les appels d'outils RUM suivants.

- Trouvez l'application RUM nommée "checkout-web" et renvoyez son ID d'application.
- Liste toutes mes applications RUM.

### `get_rum_summary` {#get-rum-summary}
*Toolset: **rum***\
*Permissions requises : `RUM Apps Read` et `Timeseries`*\
Renvoie un résumé des métriques vitales pour une application RUM, avec des différences d'une période à l'autre.

- Résumez les performances de l'application RUM "checkout-web" pour les dernières 24 heures.
- Comment les Core Web Vitals de ma principale application RUM ont-ils changé d'une semaine à l'autre ?

### `get_rum_insight` {#get-rum-insight}
*Toolset: **rum***\
*Permissions requises : `RUM Apps Read`*\
Renvoie des insights agrégés pour RUM Views : waterfall, long tasks, vital distributions et tag analysis.

- Pour la `/checkout` vue dans l'application "shop", montrez-moi le waterfall de ressources agrégé de la dernière heure.
- Décomposez la distribution INP par type d'appareil pour la page d'accueil.

### `search_rum_metrics` {#search-rum-metrics}
*Ensemble d'outils : **rum***\
*Permissions requises : `RUM Apps Read`*\
Explore les métriques RUM pour une application, y compris les métriques prêtes à l'emploi et les métriques personnalisées.

- Listez les métriques RUM personnalisées définies sur l'application "checkout-web".
- Montrez-moi les métriques RUM disponibles liées au temps de chargement de la page sur mon application principale.

### `search_rum_retention_filters` {#search-rum-retention-filters}
*Ensemble d'outils : **rum***\
*Permissions requises : `RUM Retention Filters Read`*\
Liste les filtres de rétention configurés sur une application RUM. Lecture seule ; disponible pour les clients [RUM without Limits][59].

- Listez les filtres de rétention configurés sur l'application "checkout-web".
- Quels filtres de rétention ai-je sur mon application RUM principale ?

## Sécurité {#security}

Outils pour le scan de sécurité du code, l'analyse, la recherche et le triage des [signaux de sécurité][53], la gestion des [règles de détection][60] et des [suppressions][61], et l'analyse des [découvertes de sécurité][54].

### `datadog_secrets_scan` {#datadog-secrets-scan}
*Ensemble d'outils : **sécurité***\
Scanne le code à la recherche de secrets et de credentials codés en dur, détectant les clés AWS, les clés API, les mots de passe, les tokens, les clés privées et les credentials de base de données.

- Scannez mon code à la recherche de secrets codés en dur.
- Vérifiez s'il y a des clés API ou des mots de passe commis dans ce fichier ?

### `get_datadog_security_signals_schema` {#get-datadog-security-signals-schema}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read`*\
Renvoie les champs disponibles et leurs types pour les signaux de sécurité. Les types de signaux correspondent à des valeurs `@workflow.rule.type` telles que `Log Detection`, `Application Security` et `Workload Security`.

- Quels champs puis-je utiliser pour filtrer les signaux de sécurité ?
- Montrez-moi les champs disponibles pour les signaux Cloud SIEM.
- Quelles valeurs d'énumération sont valides pour le champ de type de règle de signal ?

### `search_datadog_security_signals` {#search-datadog-security-signals}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read`*\
Recherche et récupère des signaux de sécurité à partir de Datadog Security Monitoring, y compris les signaux Cloud SIEM, les signaux de protection des applications et des API, et les signaux de protection des charges de travail.

- Montrez-moi les signaux de sécurité des dernières 24 heures.
- Trouvez des signaux de sécurité de haute gravité liés à mon environnement de production.
- Liste des signaux Cloud SIEM déclenchés par des tentatives de connexion suspectes.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read` et `Timeseries`*\
Analyse les signaux de sécurité à l'aide de requêtes SQL pour les agrégations, le regroupement et l'analyse des tendances. Utilisez ceci pour les dénombrements, le top-N et les répartitions dans le temps. Pour lister ou récupérer des signaux spécifiques, utilisez `search_datadog_security_signals` ou `get_datadog_security_signal`.

- Montrez-moi les 10 meilleures règles SIEM par nombre de signaux au cours des 7 derniers jours.
- Comptez les signaux de sécurité élevés et critiques regroupés par gravité.
- Combien de signaux de protection des applications et des API ont été déclenchés par service hier ?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read`*\
Récupère les détails complets d'un signal de sécurité unique par ID, y compris les attributs, les informations sur la règle, l'état de triage, les étiquettes et les corrélations de cas.

- Obtenez les détails complets du signal de sécurité `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`.
- Montrez-moi la règle, l'état de triage et les cas liés à ce signal.

### `update_datadog_security_signals_triage` {#update-datadog-security-signals-triage}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Write`*\
Met à jour l'état de triage ou l'assigné d'un ou plusieurs signaux de sécurité en masse (jusqu'à 500 signaux). Accepte soit une liste d'IDs de signaux, soit une requête de filtre correspondant à tous les signaux à mettre à jour.

- Archive tous les signaux de la règle "Brute Force Login" au cours des dernières 24 heures.
- Définissez tous les signaux ouverts pour `service:checkout` comme étant en cours d'examen et assignez-les-moi.
- Marquez le signal `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu` comme archivé avec la raison "testing".

### `get_datadog_security_detection_rules_schema` {#get-datadog-security-detection-rules-schema}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Rules Read`*\
Retourne la référence d'auteur et le schéma pour les règles de détection. Couvre les types de règles pris en charge, les méthodes de détection, la syntaxe des requêtes, les conventions d'étiquetage et les facettes de recherche valides. Utilisez ceci avant de rédiger ou de requêter des règles de détection. Types de règles actuellement pris en charge : log detection, API security et AppSec.

- Quels champs et options sont disponibles lors de la création d'une règle de détection par seuil ?
- Montrez-moi le schéma pour les règles de détection de séquence.
- Quelles conventions d'étiquetage et syntaxe de requête l'API des règles de détection utilise-t-elle ?

### `list_datadog_security_detection_rules` {#list-datadog-security-detection-rules}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Rules Read`*\
Liste des règles de détection pour l'organisation. Les règles de détection définissent les conditions sous lesquelles des signaux de sécurité sont générés. Accepte une requête en texte libre facultative pour filtrer les résultats côté serveur. Utilisez `get_datadog_security_detection_rule` pour récupérer la définition complète d'une règle spécifique.

- Listez toutes les règles de détection Cloud SIEM activées.
- Montrez-moi les règles de détection étiquetées avec `source:cloudtrail`.
- Quelles règles sont configurées pour la détection de voyages impossibles ?

### `get_datadog_security_detection_rule` {#get-datadog-security-detection-rule}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Rules Read`*\
Récupère la définition complète d'une seule règle de détection par ID, y compris les requêtes, les cas, les options, les filtres et les métadonnées. Utilisez `list_datadog_security_detection_rules` pour trouver les ID de règle.

- Obtenez la définition complète de la règle de détection `abc-123-def`.
- Montrez-moi les requêtes et les cas pour la règle générant ce signal.
- Quels seuils et champs de regroupement cette règle de détection utilise-t-elle ?

### `get_datadog_security_suppressions` {#get-datadog-security-suppressions}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Suppressions Read`*\
Récupère les suppressions de surveillance de la sécurité. Prend en charge trois modes : lister toutes les suppressions, obtenir une seule suppression par ID, ou obtenir les suppressions affectant une règle de détection spécifique. Les suppressions empêchent les règles de détection de générer des signaux pour des conditions correspondantes.

- Listez toutes les suppressions actives.
- Montrez-moi les suppressions pour la règle de détection `abc-123-def`.
- Obtenez les détails complets de la suppression `sup-456-xyz`.

### `create_datadog_security_suppression` {#create-datadog-security-suppression}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Suppressions Write`*\
Crée une nouvelle règle de suppression qui empêche une règle de détection de générer des signaux pour des conditions spécifiques. Au moins un des `suppression_query` ou `data_exclusion_query` doit être fourni.

- Supprimez les signaux de la règle de force brute pour l'IP `10.0.0.1`.
- Créez une suppression pour la règle de détection d'anomalies qui ignore l'environnement `staging`.
- Supprimez les signaux de la règle `abc-123-def` où `@usr.email` correspond à nos comptes de test.

### `update_datadog_security_suppression` {#update-datadog-security-suppression}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Suppressions Write`*\
Met à jour une règle de suppression existante. Ne change que les champs fournis. Fournir `version` permet le contrôle de concurrence optimiste pour éviter d'écraser des modifications concurrentes.

- Mettez à jour la suppression pour la règle de force brute pour exclure également `10.0.0.2`.
- Changez la date d'expiration de la suppression `sup-456-xyz` au trimestre prochain.
- Désactivez la suppression pour la règle de détection d'anomalies sans la supprimer.

### `delete_datadog_security_suppression` {#delete-datadog-security-suppression}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Suppressions Write`*\
Supprime une règle de suppression.

- Supprimer la suppression `sup-456-xyz`.
- Retirez la suppression qui empêchait la règle de détection de force brute de générer des signaux.

### `get_datadog_security_findings_schema` {#get-datadog-security-findings-schema}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Findings Read`*\
Renvoie le schéma (champs disponibles et leurs types) pour les résultats de sécurité. Appelez ceci en premier avant d'utiliser `analyze_datadog_security_findings` pour découvrir les champs interrogeables. Prend en charge le filtrage par type de résultat et le contrôle de la taille de la réponse.

- Quels champs sont disponibles pour les résultats de sécurité ?
- Montrez-moi le schéma pour les résultats de vulnérabilité de bibliothèque.
- Obtenez le schéma complet, y compris les descriptions pour les résultats de mauvaise configuration.

### `analyze_datadog_security_findings` {#analyze-datadog-security-findings}
*Ensemble d'outils : **security***\
*Permissions Requises : `Security Monitoring Findings Read` et `Timeseries`*\
Outil principal pour analyser les security findings à l'aide de requêtes SQL. Interroge les données en direct des dernières 24 heures avec des agrégations SQL flexibles, un filtrage et un regroupement. Appelez `get_datadog_security_findings_schema` d'abord pour découvrir les champs disponibles, puis utilisez cet outil pour interroger.

- Montrez-moi les 10 règles avec les security findings les plus critiques.
- Comptez les security findings ouverts regroupés par gravité et type de finding.
- Trouvez les vulnérabilités de bibliothèque avec des exploits disponibles, regroupées par ressource.

### `search_datadog_security_findings` {#search-datadog-security-findings}
*Ensemble d'outils : **security***\
*Permissions requises : `Security Monitoring Findings Read`*\
Outil de secours pour récupérer les détails complets des security findings. Préférez `analyze_datadog_security_findings` pour la plupart des tâches d'analyse. Utilisez cet outil uniquement lorsque vous avez besoin d'objets de security findings complets ou lorsque les requêtes SQL sont insuffisantes.

- Obtenez des détails complets pour les security findings critiques dans mon environnement AWS.
- Récupérez des objets de security findings complets pour une règle spécifique.
- Listez tous les security findings de risque d'identité ouverts avec des métadonnées complètes.

### `get_datadog_security_findings_ticket_suggestions` {#get-datadog-security-findings-ticket-suggestions}
*Ensemble d'outils : **security***\
*Permissions requises : `Security Monitoring Findings Read`, `Cases Read`*\
Renvoie des suggestions de projets classées pour le ticketing des security findings. Affiche les projets Case Management, Jira et ServiceNow disponibles avec des données d'utilisation sur 30 jours. Appelez ceci avant `create_datadog_security_findings_ticket` pour découvrir quel projet utiliser.

- Quels projets Jira puis-je utiliser pour créer des tickets pour les security findings ?
- Montrez-moi les projets ServiceNow disponibles pour le ticketing.
- Quels projets Case Management sont les plus utilisés pour les security findings ?

### `create_datadog_security_findings_ticket` {#create-datadog-security-findings-ticket}
*Ensemble d'outils : **security***\
*Permissions requises : `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*\
Crée un cas Case Management, une issue Jira ou un ticket ServiceNow pour les security findings. Nécessite des identifiants de security findings spécifiques et un identifiant de projet. Utilisez `get_datadog_security_findings_ticket_suggestions` d'abord pour découvrir les projets disponibles.

- Créez un ticket Jira pour ces security findings critiques dans le projet SECURITY.
- Ouvrez un cas Case Management pour les security findings de cette règle.
- Créez un ticket ServiceNow pour ces vulnérabilités de bibliothèque.

### `detach_datadog_security_findings_ticket` {#detach-datadog-security-findings-ticket}
*Ensemble d'outils : **security***\
*Permissions requises : `Security Monitoring Findings Write`, `Cases Write`*\
Détache les security findings de leur cas ou ticket lié. Étant donné que les tickets Jira et ServiceNow sont liés via Case Management, détacher le cas détache également tout ticket en aval.

- Détachez ces security findings de leur ticket Jira lié.
- Supprimez l'association de cas pour ces security findings.

### `mute_datadog_security_findings` {#mute-datadog-security-findings}
*Ensemble d'outils : **security***\
*Permissions requises : `Security Monitoring Findings Write`*\
Met en sourdine ou rétablit les security findings afin de les supprimer des alertes et des tableaux de bord. Nécessite un motif de mise en sourdine (`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK` ou `OTHER`) et prend en charge une description et une date d'expiration optionnelles.

- Mettez ces security findings en sourdine en tant que faux positifs.
- Mettez cette mauvaise configuration en sourdine en tant que risque accepté avec une expiration de 90 jours.
- Rétablissez les security findings qui étaient précédemment marqués comme en attente de correction.

### `assign_datadog_security_findings` {#assign-datadog-security-findings}
*Ensemble d'outils : **security***\
*Permissions requises : `Security Monitoring Findings Write`*\
Assigne ou désassigne des security findings à un utilisateur. L'attribution se propage à tous les cas liés. Omettez l'ID de l'assigné pour désassigner.

- Assignez ces security findings critiques au security team lead.
- Désassignez les security findings qui ne sont plus pertinentes.
- Assignez tous les security findings de cette règle à moi.

## Software Delivery {#software-delivery}

Outils pour interagir avec Software Delivery ([CI Visibility][48] et [Test Optimization][24]).

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `CI Visibility Read`*\
Recherche des événements CI avec des filtres et renvoie des détails à leur sujet.

- Montrez-moi tous les pipelines pour mon commit `58b1488`.
- Montrez-moi le dernier échec de pipeline dans la branche `my-branch`.
- Proposez une solution pour le travail `integration-test` qui échoue à chaque fois dans ma branche `my-branch`.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `CI Visibility Read`*\
Agrège les événements de pipeline CI pour produire des statistiques, des métriques et des analyses groupées.

- Quelle est la durée moyenne des travaux pour les 7 derniers jours ?
- Combien de pipelines échoués y a-t-il eu au cours des 2 dernières semaines ?
- Montrez-moi le 95e percentile de la durée des pipelines regroupés par nom de pipeline.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*Ensemble d'outils : **livraison-de-logiciels***\
*Permissions requises : `Test Optimization Read`*\
Recherche dans Datadog [Test Optimization][24] les flaky tests et renvoie les détails de triage (taux d'échec, catégorie, propriétaires, historique, impact CI), avec pagination et tri.

- Trouvez les flaky tests actifs pour le checkout service appartenant à `@team-abc`, triés par taux d'échec.
- Afficher les flaky tests sur la branche `main` pour le dépôt `github.com/org/repo`, les plus récents en premier.
- Listez les flaky tests dans la catégorie `timeout` avec un taux d'échec élevé (50 %+) afin de pouvoir prioriser les corrections.

### `update_datadog_flaky_test_states` {#update-datadog-flaky-test-states}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `Test Optimization Write`*\
Définit l'état d'un ou plusieurs flaky tests à `quarantined` (suppress failures), `disabled` (skip test), `fixed` (mark resolved), ou `active` (restore). Ceci est une opération d'écriture qui nécessite une approbation explicite de l'utilisateur. Tous les changements d'état sont réversibles.

- Mettez en quarantaine tous les flaky tests actifs dans le dépôt `checkout-service`.
- Marquez le flaky test `AuthServiceTest::testLogin` comme corrigé.
- Désactiver les tests instables appartenant à `@team-payments` avec un taux d'échec supérieur à 50 %.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `Test Optimization Read`*\
Agrège les événements de Datadog Test Optimization pour quantifier les tendances de fiabilité et de performance à l'aide de fonctions d'agrégation, de métriques optionnelles, de facettes de groupement et de niveaux de test configurables.

- Compter le nombre de tests échoués au cours de la dernière semaine, regroupés par branche.
- Montrez-moi la durée au 95ème percentile pour chaque suite de tests afin d'identifier les plus lentes.
- Compter tous les tests réussis et échoués, regroupés par propriétaires de code.

### `search_datadog_test_events` {#search-datadog-test-events}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `Test Optimization Read`*\
Recherche les événements de test de [Test Optimization][24] avec des filtres et renvoie des détails sur ceux-ci.

- Montrez-moi les tests échoués sur la branche `main` des dernières 24 heures.
- Obtenez les exécutions de test pour le commit `abc123` afin de voir ce qui a réussi et ce qui a échoué.
- Montrez-moi tous les tests instables pour le service de checkout.
- Trouvez les tests appartenant à `@team-name` qui échouent.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `Code Coverage read`*\
Récupère des métriques agrégées récapitulatives de couverture de code pour une branche de dépôt, y compris la couverture totale, la couverture des correctifs et la répartition par service/propriétaire de code.

- Quelle est la couverture de code sur la branche `main` pour `github.com/my-org/my-repo` ?
- Montrez-moi le résumé de la couverture pour la branche `release/1.x` de `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `Code Coverage read`*\
Récupère des métriques agrégées récapitulatives de couverture de code pour un commit de dépôt, y compris la couverture totale, la couverture des correctifs et la répartition par service/propriétaire de code.

- Montrez-moi la couverture de code pour le commit `abc123abc123abc123abc123abc123abc123abcd` dans `github.com/my-org/my-repo`.
- Quelle est la couverture des correctifs pour le dernier commit sur ma branche ?

### `get_datadog_test_optimization_settings` {#get-datadog-test-optimization-settings}
*Ensemble d'outils : **software-delivery***\
*Permissions requises : `Test Optimization Read`*\
Récupère les fonctionnalités Test Optimization activées pour un service, y compris Test Impact Analysis (ITR), Early Flake Detection (EFD), Auto Test Retries (ATR), Failed Test Replay, la collecte de Code Coverage, et PR Comments.

- Quelles fonctionnalités d'optimisation des tests sont activées pour le `auth-service` ?
- Montrez-moi les paramètres d'optimisation des tests pour mon service de checkout.

### `get_datadog_flaky_tests_management_policies` {#get-datadog-flaky-tests-management-policies}
*Ensemble d'outils : **livraison de logiciels***\
*Permissions requises : `Test Optimization Read`*\
Récupère les politiques de gestion des tests instables configurées pour un dépôt, y compris les fenêtres d'auto-quarantaine, les règles de branche, les seuils de taux d'échec, les politiques de désactivation et les paramètres de réessai.

- Montrez-moi les politiques de gestion des tests instables pour `github.com/my-org/my-repo`.
- Quelles règles d'auto-quarantaine sont configurées pour le dépôt du service de checkout ?

### `search_dora_deployments` {#search-dora-deployments}
*Ensemble d'outils : **livraison de logiciels***\
*Permissions requises : `DORA Metrics Read`*\
Recherche des événements de déploiement DORA avec des filtres, ou récupère les détails complets pour un seul déploiement par ID.

- Montrez-moi les déploiements pour le service `checkout` au cours des 7 derniers jours.
- Obtenez les détails pour le déploiement DORA `abc123`.
- Trouvez les déploiements échoués dans l'environnement de production ce mois-ci.

### `aggregate_dora_deployments` {#aggregate-dora-deployments}
*Ensemble d'outils : **livraison de logiciels***\
*Permissions requises : `Timeseries`*\
Retourne les métriques DORA (fréquence de déploiement, délai de changement, taux d'échec de changement, temps de récupération) pour un service, une équipe ou un dépôt, sous forme de valeurs scalaires ou de séries temporelles. Utilisez pour des questions sur la performance de livraison de logiciels sur une période donnée.

- Quelle est la fréquence de déploiement et le taux d'échec de changement pour le service `checkout` au cours des 30 derniers jours ?
- Montrez-moi la tendance du délai de changement pour le service `payments` au cours du dernier trimestre.
- Obtenez les quatre métriques DORA pour l'équipe `auth-service`.

## Synthetics {#synthetics}

Outils pour interagir avec Datadog [Synthetic tests][47].

### `get_synthetics_tests` {#get-synthetics-tests}
*Ensemble d'outils : **synthetics***\
*Permissions requises : `Synthetics Read`*\
Recherche des Synthetic HTTP API tests de Datadog.

- Aidez-moi à comprendre pourquoi le Synthetic test sur le point de terminaison `/v1/my/tested/endpoint` échoue.
- Il y a une panne ; trouvez tous les Synthetic tests échoués sur le domaine `api.mycompany.com`.
- Les Synthetic tests sur mon site web `api.mycompany.com` fonctionnent-ils toujours au cours de la dernière heure ?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*Ensemble d'outils : **synthetics***\
*Permissions requises : `Synthetics Global Variable Read` et `Synthetics Read` et `Synthetics Write`*\
Modifie les Synthetic HTTP API tests de Datadog.

- Améliorez les assertions du Synthetic test défini sur mon point de terminaison `/v1/my/tested/endpoint`.
- Mettez le test `aaa-bbb-ccc` en pause et définissez les emplacements uniquement sur des emplacements européens.
- Ajoutez mon tag d'équipe au test `aaa-bbb-ccc`.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*Ensemble d'outils : **synthetics***\
*Permissions requises : `Synthetics Global Variable Read` et `Synthetics Read` et `Synthetics Write`*\
Prévisualisez et créez les Datadog Synthetics HTTP API Tests.

- Créez des tests Synthetics sur chaque point de terminaison défini dans ce fichier de code.
- Créez un test Synthetics sur `/path/to/endpoint`.
- Créez un test Synthetics qui vérifie si mon domaine `mycompany.com` reste opérationnel.

## Widgets {#widgets}

Outils pour la visualisation, la validation et la conversion de type des widgets [dashboard][46] et [notebook][57].

### `get_widget` {#get-widget}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Dashboards Read` ou `Timeseries` ou `Monitors Read` ou `APM Read` ou `RUM Apps Read`*\
Récupère et visualise les métriques, traces, journaux et autres données de Datadog sous forme de graphiques interactifs. Prend en charge trois modes : recherche de tableau de bord, définition directe ou résolution d'URL.

- Afficher la série temporelle d'utilisation du CPU pour `service:api` au cours de la dernière heure.
- Récupérer les données du widget pour le widget `2228368921512806` sur le dashboard `abc-123-def`.
- Visualiser les données à partir de ce lien de partage Datadog.

### `get_widget_reference_compressed` {#get-widget-reference-compressed}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read` ou `Notebooks Write`*\
Retourne des schémas TypeScript compressés et des instructions de construction pour les types de widgets. Appeler avant de générer le JSON du widget. Lors de la construction de widgets de groupe, inclure à la fois `group` et tous les types de widgets enfants prévus dans un seul appel pour éviter la duplication.

- Obtenir le schéma compressé pour un widget de série temporelle.
- Afficher les instructions de construction pour les widgets de liste principale et de tableau de requête.

### `search_datadog_widgets` {#search-datadog-widgets}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read` ou `Notebooks Write`*\
Recherche et récupère des informations sur les widgets à travers les dashboards Datadog, y compris leurs ID, titres et requêtes sous-jacentes.

- Trouver tous les widgets de série temporelle qui interrogent la métrique `system.cpu.user`.
- Rechercher des widgets liés aux taux d'erreur sur tous les dashboards.

### `swap_widget_type` {#swap-widget-type}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read` ou `Notebooks Write`*\
Convertit une définition de widget d'un type de visualisation à un autre tout en préservant les requêtes. Prend en charge les types de widgets basés sur des requêtes de formule : séries temporelles, valeur de requête, liste principale, tableau de requête, treemap, sunburst, distribution, carte thermique, géomap et liste_stream.

- Convertir ce widget de séries temporelles en une liste principale.
- Changer le widget de tableau de requête en une visualisation de treemap.

### `validate_notebook_cell` {#validate-notebook-cell}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Timeseries`*\
Valide les définitions de widgets de cellules de notebook, y compris la validité SQL pour les cellules analysis_sql. Lors de la validation d'une cellule analysis_sql, incluez ses widgets de source de données en amont afin que le point de terminaison puisse vérifier les expressions SQL par rapport à leurs schémas.

- Validez ces définitions de cellules de notebook avant de sauvegarder.
- Vérifiez si la cellule SQL d'analyse fait référence à des colonnes valides du widget en amont.

### `validate_notebook_cells` {#validate-notebook-cells}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Timeseries`*\
Valide plusieurs définitions de widgets de cellules de notebook en un seul appel, y compris la validité SQL pour les cellules analysis_sql.

- Validez toutes les cellules de ce notebook avant de publier.
- Vérifiez ces trois cellules d'analyse pour des erreurs SQL.

### `verify_widget_data` {#verify-widget-data}
*Ensemble d'outils : **widgets***\
*Permissions requises : `Dashboards Read` ou `Timeseries` ou `Monitors Read` ou `APM Read` ou `RUM Apps Read`*\
Vérifie si les définitions de widgets renvoient des données pour la dernière heure. Appelez après avoir ajouté des widgets à un dashboard pour confirmer que les requêtes renvoient des données réelles. Renvoie un résultat par widget indiquant si des données ont été trouvées, avec une raison si ce n'est pas le cas.

- Vérifiez si ces définitions de widget renvoient des données.
- Vérifiez que les widgets ajoutés au dashboard affichent des métriques réelles.

### `visualize_tabular_data` {#visualize-tabular-data}
*Ensemble d'outils : **widgets***\
*Permissions requises : Aucune permission spécifique requise.*\
Rend les données tabulaires sous forme de visualisation interactive (sunburst, treemap ou liste principale). Utilisez après avoir agrégé des données provenant de requêtes pour visualiser des relations hiérarchiques ou des classements.

- Visualisez ces données métriques groupées sous forme de graphique sunburst.
- Affichez ces données agrégées sous forme de décomposition en treemap.

## Workflows {#workflows}

Outils pour [Workflow Automation][39], y compris la liste, l'inspection, l'exécution et la configuration des workflows pour l'utilisation par les agents.

### `list_datadog_workflows` {#list-datadog-workflows}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Read`*\
Liste et recherche des workflows [Workflow Automation][39]. Prend en charge le filtrage par nom, étiquettes, propriétaire, identifiant et type de déclencheur (tel que `monitor`, `schedule`, `api` ou `incident`). Les résultats peuvent être triés par des champs comme `name` ou `updatedAt`.

- Montrez-moi tous les workflows publiés étiquetés avec `team:platform`.
- Listez les workflows qui ont un déclencheur d'agent configuré.
- Trouvez tous les workflows liés à la réponse aux incidents appartenant à Alice Smith.

### `get_datadog_workflow` {#get-datadog-workflow}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Read`*\
Récupère des informations détaillées sur un flux de travail spécifique, y compris ses déclencheurs, étapes, connexions et schéma d'entrée.

- Obtenez les détails complets pour le flux de travail `00000000-0000-0000-0000-000000000000`.
- Affichez les paramètres d'entrée et les étapes pour le flux de travail de retour en arrière de déploiement.
- Quels déclencheurs sont configurés pour ce flux de travail ?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*Ensemble d'outils : **flux de travail***\
*Permissions requises : `Workflows Run`*\
Exécute un flux de travail publié qui a un déclencheur d'agent, avec des paramètres d'entrée optionnels correspondant au schéma d'entrée du flux de travail.

- Exécutez le flux de travail d'escalade d'incidents pour le service `checkout-api` avec une gravité `high`.
- Exécutez le flux de travail de retour en arrière de déploiement pour le service de paiement.
- Déclenchez le flux de travail de notification d'astreinte avec le contexte de cette enquête.

**Remarque** : Le flux de travail doit être publié et avoir un déclencheur d'agent configuré. Utilisez `update_datadog_workflow_with_agent_trigger` pour en ajouter un si nécessaire.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*Ensemble d'outils : **flux de travail***\
*Permissions requises : `Workflows Read`*\
Récupère le statut et les détails d'une instance d'exécution de flux de travail, y compris les résultats des étapes et les sorties.

- Quel est le statut de l'exécution du flux de travail que j'ai déclenchée ?
- Le flux de travail d'escalade d'incidents s'est-il terminé avec succès ?
- Affichez les sorties détaillées de l'instance de flux de travail `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*Ensemble d'outils : **flux de travail***\
*Permissions requises : `Workflows Write`*\
Ajoute un déclencheur d'agent à un flux de travail et le publie, permettant ainsi au flux de travail d'être exécuté par des agents IA.

- Ajoutez un déclencheur d'agent au flux de travail de retour en arrière de déploiement afin que je puisse l'exécuter depuis ici.
- Configurez le flux de travail de réponse aux incidents pour qu'il puisse être déclenché par un agent.

[1]: /fr/mcp_server/setup#toolsets
[15]: /fr/api/latest/events/
[24]: /fr/tests/
[26]: /fr/database_monitoring/
[31]: /fr/network_monitoring/cloud_network_monitoring/
[32]: /fr/network_monitoring/devices/
[38]: /fr/service_management/case_management/
[39]: /fr/actions/workflows/
[41]: /fr/ddsql_editor/
[42]: /fr/ddsql_reference/ddsql_default/
[45]: /fr/reference_tables/
[46]: /fr/dashboards/
[47]: /fr/synthetics/
[48]: /fr/continuous_integration/
[49]: /fr/error_tracking/
[50]: /fr/tracing/
[51]: /fr/feature_flags/
[53]: /fr/security/threats/security_signals/
[54]: /fr/security/misconfigurations/findings/
[55]: /fr/containers/monitoring/kubernetes_explorer/
[60]: /fr/security/detection_rules/
[61]: /fr/security/suppressions/
[62]: /fr/getting_started/profiler/
[56]: /fr/account_management/rbac/permissions/
[57]: /fr/notebooks/
[58]: /fr/real_user_monitoring/
[59]: /fr/real_user_monitoring/rum_without_limits/
[63]: /fr/agent/guide/rshell/