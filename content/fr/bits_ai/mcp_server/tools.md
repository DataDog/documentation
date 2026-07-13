---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
description: Parcourez tous les outils disponibles dans le serveur Datadog MCP, organisés
  par ensemble d'outils, avec des exemples d'invites.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentation
  text: Serveur Datadog MCP
- link: bits_ai/mcp_server/setup
  tag: Documentation
  text: Configurer le serveur Datadog MCP
title: Outils du serveur Datadog MCP
---
Les outils suivants sont disponibles dans le serveur Datadog MCP. Chaque entrée comprend l'ensemble d'outils requis, les autorisations et des exemples d'invites. Les outils sont regroupés par [ensembles d'outils][1], ce qui vous permet d'utiliser uniquement les outils dont vous avez besoin, économisant ainsi de l'espace précieux dans la fenêtre de contexte.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Pour activer des outils spécifiques au produit, incluez le paramètre de requête `toolsets` à la fin de l'URL de point de terminaison que vous utilisez pour vous connecter au serveur Datadog MCP. Par exemple, en fonction de votre [site Datadog][2] ({{< region-param key="dd_site_name" >}}), cette URL active _uniquement_ les outils d'observabilité APM et LLM :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

[2]: /fr/getting_started/site/
{{< /site-region >}}

Consultez [Configurer le serveur Datadog MCP][1] pour plus d'informations sur la connexion au serveur Datadog MCP et l'activation des ensembles d'outils.

<div class="alert alert-info">Les outils du serveur Datadog MCP font l'objet d'un développement actif et sont susceptibles d'évoluer. Utilisez <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">ce formulaire de commentaires</a> pour partager vos retours, cas d'utilisation ou problèmes rencontrés avec vos requêtes.</div>

## Outils principaux {#core-tools}

L'ensemble d'outils par défaut pour les journaux, les métriques, les traces, les tableaux de bord, les moniteurs, les incidents, les hôtes, les services, les événements et les carnets.

### `search_datadog_events` {#search-datadog-events}
*Ensemble d'outils : **core***\
*Autorisations requises : `Events` et `Timeseries`*\
Recherche d'événements tels que des alertes de moniteur, des notifications de déploiement, des changements d'infrastructure, des constats de sécurité et des changements de statut de service.

- Montrez-moi tous les événements de déploiement des dernières 24 heures.
- Trouvez des événements liés à notre environnement de production avec un statut d'erreur.
- Obtenez les événements étiquetés avec `service:api` de la dernière heure.

**Remarque** : Consultez l'[API de gestion des événements][15] pour plus de détails.

### `get_datadog_incident` {#get-datadog-incident}
*Ensemble d'outils : **core***\
*Autorisations requises : `Incidents Read`*\
Récupère des informations détaillées sur un incident.

- Obtenez les détails de l'incident ABC123.
- Quel est le statut de l'incident ABC123 ?
- Récupérez toutes les informations sur l'incident Redis d'hier.

**Remarque** : L'outil est opérationnel, mais ne comprend pas les données de chronologie des incidents.

### `get_datadog_metric` {#get-datadog-metric}
*Ensemble d'outils : **core***\
*Autorisations requises : `Cloud Cost Management Read` ou `Metrics` ou `Timeseries`*\
Interroge et analyse les données métriques historiques ou en temps réel, prenant en charge des requêtes et des agrégations personnalisées.

- Montrez-moi les métriques d'utilisation du CPU pour tous les hôtes au cours des 4 dernières heures.
- Obtenez les métriques de latence Redis pour l'environnement de production.
- Comment mes coûts cloud ont-ils changé de janvier à février ?

### `get_datadog_metric_context` {#get-datadog-metric-context}
*Ensemble d'outils : **core***\
*Autorisations requises : `Cloud Cost Management Read` ou `Metrics`*\
Récupère des informations détaillées sur une métrique, y compris les métadonnées, les balises disponibles et les valeurs de balises pour le filtrage et le regroupement.

- Quelles balises sont disponibles pour la métrique `system.cpu.user` ?
- Montrez-moi toutes les valeurs possibles pour la balise `env` sur `redis.info.latency_ms`.
- Obtenez les métadonnées et les dimensions pour la métrique `requests.count`.

### `search_datadog_monitors` {#search-datadog-monitors}
*Ensemble d'outils : **core***\
*Autorisations requises : `Monitors Read`*\
Récupère des informations sur les moniteurs Datadog, y compris leurs statuts, seuils et conditions d'alerte.

- Liste tous les moniteurs qui sont actuellement en alerte.
- Montrez-moi les moniteurs liés à notre service de paiement.
- Trouvez les moniteurs étiquetés avec `team:infrastructure`.

### `get_datadog_trace` {#get-datadog-trace}
*Ensemble d'outils : **core***\
*Permissions requises : `APM Read`*\
Récupère une trace complète depuis Datadog APM en utilisant un ID de trace.

- Obtenez la trace complète pour l'ID 7d5d747be160e280504c099d984bcfe0.
- Montrez-moi tous les spans pour la trace abc123 avec des informations de timing.
- Récupérez les détails de la trace, y compris les requêtes de base de données pour l'ID xyz789.

**Remarque** : Les grandes traces avec des milliers de spans peuvent être tronquées (et indiqué comme tel) sans possibilité de récupérer tous les spans.

### `search_datadog_dashboards` {#search-datadog-dashboards}
*Ensemble d'outils : **core***\
*Permissions requises : `Dashboards Read` et `User Access Read`*\
Liste les tableaux de bord Datadog disponibles et les détails clés.

- Montrez-moi tous les tableaux de bord disponibles dans notre compte.
- Liste les tableaux de bord liés à la surveillance de l'infrastructure.
- Trouvez les tableaux de bord partagés pour l'équipe d'ingénierie.

**Remarque** : Cet outil répertorie les tableaux de bord pertinents mais fournit des détails limités sur leur contenu. Utilisez `get_datadog_dashboard` pour récupérer les définitions complètes des widgets.

### `get_datadog_notebook` {#get-datadog-notebook}
*Ensemble d'outils : **core***\
*Permissions requises : `Notebooks Read`*\
Récupère des informations détaillées sur un carnet spécifique par ID, y compris le nom, le statut et l'auteur.

- Obtenez les détails pour le carnet abc-123-def.
- Montrez-moi le contenu du carnet de débogage d'hier.

### `search_datadog_notebooks` {#search-datadog-notebooks}
*Ensemble d'outils : **core***\
*Permissions requises : `Notebooks Read`*\
Répertorie et recherche les carnets Datadog avec filtrage par auteur, balises et contenu.

- Montrez-moi tous les carnets créés par l'équipe plateforme.
- Trouvez des carnets liés à l'investigation de performance.
- Liste des carnets étiquetés avec `incident-response`.

### `search_datadog_hosts` {#search-datadog-hosts}
*Ensemble d'outils : **core***\
*Permissions requises : `Hosts Read` et `Timeseries`*\
Répertorie et fournit des informations sur les hôtes surveillés, prenant en charge le filtrage et la recherche.

- Montrez-moi tous les hôtes dans notre environnement de production.
- Liste des hôtes non sains qui n'ont pas rapporté au cours de la dernière heure.
- Obtenez tous les hôtes étiquetés avec `role:database`.

### `search_datadog_incidents` {#search-datadog-incidents}
*Ensemble d'outils : **core***\
*Permissions requises : `Incidents Read`*\
Récupère une liste d'incidents Datadog, y compris leur état, leur gravité et leurs métadonnées.

- Montrez-moi tous les incidents actifs par gravité.
- Liste des incidents résolus de la semaine dernière.
- Trouvez les incidents ayant un impact sur les clients.

### `search_datadog_metrics` {#search-datadog-metrics}
*Ensemble d'outils : **core***\
*Permissions requises : `Metrics`*\
Liste des métriques disponibles, avec des options de filtrage et de métadonnées.

- Montrez-moi toutes les métriques Redis disponibles.
- Liste des métriques liées au CPU pour notre infrastructure.
- Trouvez les métriques étiquetées avec `service:api`.

### `search_datadog_services` {#search-datadog-services}
*Ensemble d'outils : **core***\
*Permissions Requises : `Service Catalog Read`*\
Liste des services dans le Catalogue de Logiciels de Datadog avec des détails et des informations sur l'équipe.

- Montrez-moi tous les services dans notre architecture de microservices.
- Liste des services appartenant à l'équipe plateforme.
- Trouvez les services liés au traitement des paiements.

### `search_datadog_service_dependencies` {#search-datadog-service-dependencies}
*Ensemble d'outils : **noyau***\
*Permissions requises : `APM Read` et `Service Catalog Read` et `Teams Read`*\
Récupère les dépendances de service (amont/aval) et les services appartenant à une équipe.

- Montrez-moi tous les services en amont qui appellent le checkout service.
- De quels services en aval l'API de paiement dépend-elle ?
- Listez tous les services appartenant à l'équipe plateforme.

### `search_datadog_spans` {#search-datadog-spans}
*Ensemble d'outils : **core***\
*Permissions requises : `APM Read`*\
Récupère les spans des traces APM avec des filtres tels que service, temps, ressource, etc.

- Montrez-moi les spans avec des erreurs du service de paiement.
- Trouvez les requêtes de base de données lentes des 30 dernières minutes.
- Obtenez les spans pour les requêtes API échouées vers notre service de paiement.

### `analyze_datadog_logs` {#analyze-datadog-logs}
*Ensemble d'outils : **core***\
*Permissions requises : `Logs Read Data` et `Logs Read Index Data` et `Timeseries`*\
Analysez les journaux Datadog en utilisant des requêtes SQL pour le comptage, les agrégations et l'analyse numérique. Utilisez ceci pour l'analyse statistique.

- Comptez les journaux d'erreurs par service au cours de la dernière heure.
- Montrez-moi les 10 codes d'état HTTP les plus utilisés avec leur nombre d'occurrences.
- Quels services ont généré le plus de logs pendant cette période ?

### `search_datadog_logs` {#search-datadog-logs}
*Ensemble d’outils : **core***\
*Permissions requises : `Logs Read Data` et `Logs Read Index Data`*\
Recherche dans les journaux avec des filtres (temps, requête, service, hôte, niveau de stockage, etc.) et renvoie les détails des journaux. Renommé depuis `get_logs`.

- Montrez-moi les journaux d'erreurs du service nginx au cours de la dernière heure.
- Trouvez les journaux contenant 'connection timeout' de notre service API.
- Obtenez tous les journaux avec le code d'état 500 en production.

### `search_datadog_rum_events` {#search-datadog-rum-events}
*Ensemble d’outils : **core***\
*Permissions requises : `RUM Apps Read`*\
Recherchez les événements RUM de Datadog en utilisant la syntaxe de requête avancée.

- Affichez les erreurs JavaScript et les avertissements de la console dans RUM.
- Trouvez les pages qui se chargent lentement (plus de 3 secondes).
- Montrez les interactions récentes des utilisateurs sur les pages de détails des produits.

### `create_datadog_notebook` {#create-datadog-notebook}
*Ensemble d’outils : **core***\
*Permissions requises : `Notebooks Read` et `Notebooks Write`*\
Crée un nouveau carnet Datadog.

- Créez un carnet pour documenter l'enquête sur le pic de latence du service de paiement.
- Créez un nouveau carnet pour notre revue de performance hebdomadaire.

### `edit_datadog_notebook` {#edit-datadog-notebook}
*Ensemble d’outils : **core***\
*Permissions requises : `Notebooks Read` et `Notebooks Write`*\
Modifie un carnet Datadog existant.

- Ajoutez une section au carnet abc-123-def avec les derniers résultats d'analyse des journaux.
- Mettez à jour le carnet de réponse aux incidents avec les résultats d'aujourd'hui.

## Alerting {#alerting}

Outils pour valider les moniteurs, rechercher des groupes de moniteurs et récupérer des modèles de moniteurs.

### `validate_datadog_monitor` {#validate-datadog-monitor}
*Ensemble d’outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Valide une définition de moniteur pour en vérifier la conformité avant de la créer ou de la mettre à jour.

- Validez cette définition de moniteur avant que je ne la crée.
- Vérifiez si la syntaxe de ma requête de moniteur est correcte.

### `get_datadog_monitor_templates` {#get-datadog-monitor-templates}
*Ensemble d'outils : **alerte***\
*Permissions requises : `Monitors Read`*\
Récupère les modèles de moniteurs disponibles pour vous aider à créer des moniteurs.

- Montrez-moi les modèles de moniteurs disponibles.
- Quels modèles puis-je utiliser pour créer un nouveau moniteur ?

### `search_datadog_monitor_groups` {#search-datadog-monitor-groups}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Recherche des groupes de moniteurs par nom ou critères.

- Montrez-moi tous les groupes de moniteurs dans un état d'alerte.
- Trouvez des groupes de moniteurs liés au service de paiement.

### `search_datadog_slos` {#search-datadog-slos}
*Ensemble d’outils : **alerting***\
*Permissions requises : `SLOs Read`*\
Recherche des SLOs Datadog par nom, étiquettes ou type. Prend en charge la syntaxe de requête pour filtrer par service, équipe ou autres attributs.

- Recherchez les SLOs liés à `service:checkout`.
- Listez tous les SLOs étiquetés avec `team:backend`.
- Listez les SLOs pour le service de paiement.

### `create_datadog_monitor` {#create-datadog-monitor}
*Ensemble d'outils : **alerting***\
*Permissions requises : `Monitors Write`*\
Crée un moniteur Datadog en mode brouillon. Les moniteurs créés avec cet outil n'envoient pas de notifications et sont définis sur priorité 5 (faible). Utilisez `validate_datadog_monitor` pour vérifier la définition avant de créer et `get_datadog_monitor_templates` pour des exemples de syntaxe de requête. Après la création, publiez le moniteur dans l'interface utilisateur de Datadog.

- Créez un moniteur d'alerte de métrique pour une utilisation élevée du CPU sur le service web.
- Configurez un moniteur d'alerte de journal pour les pics d'erreurs dans le service de paiement.
- Créez un moniteur pour suivre la latence p95 du point de terminaison de paiement.

### `get_monitor_coverage` {#get-monitor-coverage}
*Ensemble d’outils : **alerting***\
*Permissions requises : `Monitors Read`*\
Identifie les lacunes de surveillance et la couverture pour les services ou les hôtes. Retourne quels signaux (tels que le taux d'erreur, la latence et le taux de requêtes) sont couverts par les moniteurs existants et lesquels manquent. Utilisez avec `create_datadog_monitor` pour combler les lacunes.

- Obtenez la couverture de surveillance pour `service:checkout`.
- Quelles lacunes de surveillance existent pour `host:web-01` ?
- Trouvez les services qui manquent de moniteurs de taux d'erreur.

## APM {#apm}

Outils pour une analyse approfondie des traces [APM][50], recherche de spans, insights de Watchdog et investigation des performances.

<div class="alert alert-info">Le <code>apm</code> jeu d'outils est en aperçu. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">Inscrivez-vous pour accéder.</a></div>

### `apm_search_spans` {#apm-search-spans}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Recherche de spans en utilisant la syntaxe de requête APM, avec support pour la pagination et le filtrage par tags.

- Montrez-moi les spans avec des erreurs du service de paiement dans la dernière heure.
- Trouvez les requêtes de base de données lentes prenant plus de 2 secondes.
- Recherchez des spans avec `service:payments` et `status:error`.

### `apm_explore_trace` {#apm-explore-trace}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Exécute des requêtes sur les données de trace pour une analyse approfondie et l'exploration de spans spécifiques dans une trace.

- Explorez les spans dans la trace `abc123` et montrez-moi les appels de base de données.
- Analysez les spans d'erreur dans cette trace.

### `apm_trace_summary` {#apm-trace-summary}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Génère un résumé alimenté par l'IA d'une trace, fournissant une analyse de haut niveau de ce que montre la trace.

- Résumez la trace `7d5d747be160e280504c099d984bcfe0`.
- Donnez-moi un aperçu de ce qui s'est passé dans cette trace.

### `apm_trace_comparison` {#apm-trace-comparison}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Compare deux traces pour identifier les différences de performance et les goulets d'étranglement entre une trace rapide et une trace lente.

- Comparez ces deux traces pour découvrir pourquoi l'une est plus lente.
- Qu'est-ce qui a changé entre cette trace de référence et la trace lente ?

### `apm_analyze_trace_metrics` {#apm-analyze-trace-metrics}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Analyse les métriques de trace APM au fil du temps pour une opération spécifique, interrogeant les données métriques et fournissant une analyse générée par l'IA.

- Analysez les tendances de latence pour l'opération `web.request` sur `service:api` au cours des 6 dernières heures.
- Montrez-moi les métriques de taux d'erreur pour mon service de base de données.

### `apm_discover_span_tags` {#apm-discover-span-tags}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Découvre les clés de balise disponibles sur les spans dans une plage de temps.

- Quelles balises sont disponibles sur les spans pour `service:checkout` ?
- Montrez-moi les clés de balise par lesquelles je peux filtrer dans APM.

### `apm_get_primary_tag_keys` {#apm-get-primary-tag-keys}
*Jeu d'outils : **apm***\
*Permissions requises : `APM Read`*\
Récupère les clés de balise principales configurées pour l'organisation.

- Quelles sont les clés de balise principales de mon organisation ?

### `apm_search_watchdog_stories` {#apm-search-watchdog-stories}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Recherche des histoires de détection d'anomalies de Watchdog pour un service dans une plage de temps, fournissant des informations alimentées par l'IA sur la latence, le taux d'erreur et les anomalies de trafic.

- Montrez-moi les anomalies de Watchdog pour le service de paiement dans les dernières 24 heures.
- Y a-t-il des anomalies de latence détectées pour mon service API ?

### `apm_get_watchdog_story` {#apm-get-watchdog-story}
*Ensemble d’outils : **apm***\
*Permissions requises : `APM Read`*\
Récupère des informations détaillées sur une histoire spécifique de Watchdog par son ID.

- Obtenez les détails de l'histoire de Watchdog `abc123`.

### `apm_search_change_stories` {#apm-search-change-stories}
*Ensemble d’outils : **apm***\
Recherche des histoires de changement (déploiements, feature flags et changements d'infrastructure) pour un service dans une plage de temps.

- Montrez-moi les déploiements récents et les changements pour le service de paiement.
- Quels changements d'infrastructure ont eu lieu lors du pic de latence ?

### `apm_latency_bottleneck_analysis` {#apm-latency-bottleneck-analysis}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Analyse les goulets d'étranglement de latence sur les traces durant une période d'anomalie en calculant le temps propre.

- Quels sont les goulets d'étranglement de latence pour le service de paiement pendant cette anomalie ?
- Identifiez quels spans contribuent le plus à la latence.

### `apm_latency_tag_analysis` {#apm-latency-tag-analysis}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Compare les balises de span entre une période d'anomalie et une période de référence pour identifier ce qui a changé.

- Comparez les balises entre la fenêtre d'anomalie et la période de référence pour trouver ce qui a changé.
- Quelles valeurs de balises sont différentes pendant ce pic de latence ?

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

### `apm_investigation_methodology` {#apm-investigation-methodology}
*Ensemble d'outils : **apm***\
*Permissions requises : `APM Read`*\
Fournit des conseils pour enquêter sur les problèmes de service APM tels que la latence, les erreurs et les problèmes de performance.

- Comment devrais-je enquêter sur une augmentation de latence dans mon service API ?
- Guide-moi dans le débogage d'un pic d'erreurs en production.

## Cas {#cases}

Outils pour [Gestion des Cas][38], incluant la création, la recherche et la mise à jour des cas, la gestion des projets et le lien avec les tickets Jira.

### `search_datadog_cases` {#search-datadog-cases}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Read`*\
Recherche de cas dans [Gestion des cas][38] avec des filtres tels que le statut, la priorité, le projet et le responsable. Prend en charge le filtrage par plage de dates et la pagination.

- Montrez-moi tous les cas ouverts qui me sont assignés.
- Y a-t-il des cas P1 ouverts dans le projet des Revues de sécurité ?
- Montrez-moi tous les cas ouverts cette semaine liés au service de paiement.

### `get_datadog_case` {#get-datadog-case}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Read`*\
Récupère des informations détaillées sur un cas spécifique par ID ou clé, y compris le titre, le statut, la priorité, le responsable et les horodatages. Inclut éventuellement l'activité de la chronologie (commentaires et changements de statut) et des attributs personnalisés.

- Quelle est la dernière mise à jour sur CASE-1234 ? Montrez-moi la chronologie complète.
- Qui travaille sur ce cas et quels progrès ont été réalisés jusqu'à présent ?
- Affichez les détails et tous les commentaires pour le cas de migration de base de données.

### `create_datadog_case` {#create-datadog-case}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Write`*\
Créez un nouveau cas [Gestion des cas][38] avec un titre, un projet et des champs optionnels comme la description, la priorité et l’assigné.

- Je constate un pic de latence sur le service de paiement. Créez un cas P2 pour suivre l'enquête.
- Ouvrez un cas de revue de sécurité pour l'activité de connexion suspecte que nous avons trouvée dans les journaux.

### `update_datadog_case` {#update-datadog-case}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Write`*\
Met à jour les champs d'un cas existant tels que le statut, la priorité, le titre, la description, l'assigné, la date d'échéance et les attributs personnalisés. Seuls les champs que vous fournissez sont mis à jour.

- Ce problème a maintenant un impact sur le client. Escaladez CASE-1234 à P1.
- Marquez le cas de migration de base de données comme résolu.
- Définissez une date d'échéance pour la fin de la semaine sur CASE-1234.

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Write`*\
Ajoute un commentaire à la chronologie d'un cas. Les commentaires prennent en charge le formatage markdown.

- Ajoutez une note au cas résumant ce que nous avons trouvé dans les journaux et les traces.
- Publiez une mise à jour indiquant que le correctif a été déployé et que nous surveillons.
- Documentez les résultats de l'analyse des causes profondes sur ce cas.

### `link_jira_issue_to_datadog_case` {#link-jira-issue-to-datadog-case}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Write`*

- Lier le ticket Jira pour la migration de l'infrastructure à ce cas afin que nous puissions suivre les deux ensemble.
- Connectez PROJ-456 au cas Datadog afin que l'équipe d'ingénierie ait de la visibilité.

### `list_datadog_case_projects` {#list-datadog-case-projects}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Read`*\
Liste des projets [Gestion des cas][38] disponibles avec un filtrage optionnel par nom ou clé.

- Quels projets sont disponibles dans la Gestion des cas ?
- Y a-t-il un projet lié à la sécurité dans la Gestion des cas ?

### `get_datadog_case_project` {#get-datadog-case-project}
*Ensemble d'outils : **cas***\
*Permissions requises : `Cases Read`*\
Récupère les détails d'un projet de cas spécifique par ID.

- De quel projet fait partie ce cas ?

### `search_datadog_users` {#search-datadog-users}
*Ensemble d'outils : **cas***\
*Permissions requises : `User Access Read`*\
Recherche des utilisateurs de Datadog par e-mail, nom ou identifiant. Utile pour trouver la bonne personne à qui assigner un cas.

- Trouvez le compte utilisateur Datadog pour jane.doe@example.com.

## Tableaux de bord {#dashboards}

Outils pour récupérer, créer, mettre à jour et supprimer des [tableaux de bord][46], plus référence et validation du schéma des widgets.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*Ensemble d'outils : **noyau**, **tableaux de bord***\
*Permissions requises : `Dashboards Read` et `User Access Read`*\
Récupère un [tableau de bord][46] Datadog par ID, retournant son titre, sa description, ses étiquettes et ses widgets. Utilisez `search_datadog_dashboards` d'abord pour trouver les ID des tableaux de bord.

- Obtenez les détails complets du tableau de bord `ps7-mn3-kwf`.
- Montrez-moi les widgets et la mise en page du tableau de bord de l'aperçu de l'infrastructure.
- Récupérez les variables de modèle configurées sur ce tableau de bord.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*Ensemble d'outils : **noyau**, **tableaux de bord***\
*Permissions requises : `Dashboards Read` et `Dashboards Write`*\
Crée ou met à jour un [tableau de bord][46] Datadog. Pour mettre à jour un tableau de bord existant, fournissez l'ID du tableau de bord ; omettez-le pour en créer un nouveau. Appelez `get_widget_reference` pour les schémas de widgets avant de construire des widgets.

- Créez un tableau de bord montrant l'utilisation du CPU et de la mémoire sur tous les hôtes.
- Ajoutez un widget de séries temporelles pour le taux d'erreur au tableau de bord `abc-123-def`.
- Mettez à jour le titre et la description de mon tableau de bord d'aperçu de service.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*Ensemble d'outils : **tableaux de bord***\
*Permissions requises : `Dashboards Read` et `Dashboards Write`*\
Supprime définitivement un [tableau de bord][46] Datadog par ID. Cette action ne peut pas être annulée. Utilisez `search_datadog_dashboards` d'abord pour trouver les ID de tableau de bord.

- Supprimez le tableau de bord `ps7-mn3-kwf`.
- Supprimez l'ancien tableau de bord de l'environnement de staging.

### `get_widget_reference` {#get-widget-reference}
*Ensemble d'outils : **tableaux de bord***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read`*\
Renvoie des schémas et des instructions de construction pour les types de widgets de tableau de bord. Les définitions de widgets sont des objets JSON ; cet outil renvoie des définitions de type TypeScript représentant leurs schémas ainsi que des instructions de construction couvrant les modèles de requête, la syntaxe des formules et les pièges courants. Appelez ceci avant de générer des widgets avec `upsert_datadog_dashboard`.

- Obtenez le schéma pour un widget de séries temporelles.
- Montrez-moi comment construire un widget de liste principale et un tableau de requêtes.
- Quel est le schéma pour le widget de nuage de points ?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*Ensemble d'outils : **tableaux de bord***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read`*\
Valide une définition de widget par rapport au schéma du tableau de bord. Utilisez ceci pour vérifier le JSON du widget avant de le transmettre à `upsert_datadog_dashboard`.

- Validez ma définition de widget de séries temporelles avant de créer le tableau de bord.
- Vérifiez si ce JSON de widget de tableau de requêtes est correct.

### `ask_widget_expert` {#ask-widget-expert}
*Ensemble d'outils : **tableaux de bord***\
*Permissions requises : `Dashboards Read` ou `Dashboards Write` ou `Notebooks Read`*\
Posez une question à un expert en widgets Datadog sur la configuration des widgets, les schémas, la syntaxe des requêtes, l'utilisation des champs, le débogage ou les pièges. Idéal pour des questions ciblées : recherches de schémas, clarifications de champs, débogage d'une définition de widget existante ou compréhension du fonctionnement d'un type de widget spécifique.

- Quel response_format devrais-je utiliser pour une toplist ?
- Quel est le schéma pour le scatterplot widget ?
- Aidez-moi à déboguer pourquoi ce widget affiche des valeurs fractionnaires alors qu'il devrait s'agir d'un compte.
- Comment configurer une série temporelle pour afficher à la fois des barres et des lignes ?

## Surveillance de la base de données {#database-monitoring}

Outils pour interagir avec [Surveillance de la base de données][26].

### `find_datadog_database_instances` {#find-datadog-database-instances}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Découvre et classe les instances de base de données pour l'investigation DBM. Appelez ceci avant d'autres outils DBM qui nécessitent un paramètre `database_instance`. Accepte un ID de trace ou de span APM, des tags, ou les deux pour trouver des instances correspondantes, puis évalue et classe leur santé.

- Trouvez les instances de base de données corrélées avec la trace `abc123` d'il y a une heure.
- Quelles instances PostgreSQL correspondent à `cluster_name:payments-prod` ?
- Classez les instances de base de données pour le service `checkout-api` en fonction de leur santé.

### `get_datadog_database_calling_services` {#get-datadog-database-calling-services}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Identifie les services et ressources APM en amont qui effectuent des requêtes de base de données. Corrèle l'activité de la base de données avec les traces d'application pour une analyse des causes profondes à la frontière entre l'APM et la base de données.

- Quels services appellent les requêtes les plus lentes sur `db-prod-1` ?
- Trouvez l'appelant principal de la signature de requête `abc123def`.
- Montrez-moi les ressources APM générant une charge sur la base de données des paiements.

### `get_datadog_database_explain_plans` {#get-datadog-database-explain-plans}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère les plans d'explication PostgreSQL pour une signature de requête dans un cadre temporel. Retourne des structures de plan simplifiées avec des arbres d'opérateurs, l'utilisation d'index et des coûts estimés, triés par coût.

- Obtenez des plans d'explication pour la signature de requête `abc123def` sur `db-prod-1`.
- Montrez-moi les plans d'exécution les plus coûteux pour cette requête lente.
- Quelles variations de plan la signature de requête `xyz789` a-t-elle au cours de la dernière journée ?

### `get_datadog_database_health_signals` {#get-datadog-database-health-signals}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Effectue des vérifications de santé pour faire ressortir les problèmes potentiels de PostgreSQL tels que la saturation du CPU, les redémarrages, la latence des requêtes et le blocage. Compare une période de régression par rapport à une période de référence.

- Effectuez des vérifications de santé sur `db-prod-1` pour la dernière heure par rapport à l'heure précédente.
- Vérifiez la santé de la base de données autour de la période de l'incident.
- Quels signaux expliquent la régression sur la base de données des paiements ?

### `get_datadog_database_query_performance` {#get-datadog-database-query-performance}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Analyse les performances d'une requête PostgreSQL spécifique. Retourne le débit, la latence moyenne, le temps d'exécution, le nombre de lignes par exécution, le ratio de hits en cache, les statistiques d'E/S, l'activité de connexion, les événements d'attente et la durée des transactions, avec des statistiques globales et une analyse par tranche horaire.

- Analysez les performances pour la signature de requête `abc123def` au cours de la dernière heure.
- Pourquoi cette requête est-elle lente sur l'instance PostgreSQL de production ?
- Montrez les événements d'attente et le ratio de hits en cache pour la signature de requête `xyz789`.

### `get_datadog_database_query_statement` {#get-datadog-database-query-statement}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère le texte de l'instruction SQL pour une signature de requête donnée. Utilisez ceci pour mapper les hachages de signature au SQL concret pour l'enquête et le reporting.

- Obtenez le SQL pour la signature de requête `abc123def`.
- Montrez-moi l'instruction derrière ce hachage de requête sur `db-prod-1`.
- À quelle requête correspond la signature `xyz789` ?

### `get_datadog_database_recommendations` {#get-datadog-database-recommendations}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère des recommandations de base de données en direct pour une base de données, une requête, une table, un hôte ou un index. Renvoie les recommandations correspondantes avec statut, gravité et un bloc de portée normalisé mettant en évidence les instances affectées, les signatures de requête, les tables, les index, les services, les plans et les identifiants d'infrastructure.

- Montrez les recommandations de base de données ouvertes pour `db-prod-1`.
- Liste des recommandations d'index manquants sur la base de données des paiements.
- Obtenez des recommandations de haute gravité pour la signature de requête `abc123def`.

### `get_datadog_database_schemas` {#get-datadog-database-schemas}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Récupère les définitions de schéma (colonnes, index, clés étrangères, partitions) pour un ou plusieurs objets de base de données. Accepte les noms de table avec des qualificateurs de schéma, de base de données et d'instance optionnels.

- Montrez-moi le schéma de la table `orders`.
- Obtenez les colonnes et les index pour `public.users` sur `db-prod-1`.
- Récupère les clés étrangères pour la table `payments`.

### `optimize_datadog_database_query` {#optimize-datadog-database-query}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Analyse une requête PostgreSQL pour des opportunités d'optimisation en utilisant des règles déterministes. Renvoie des réécritures de requêtes, la détection de modèles anti-pattern (`SELECT *`, `OFFSET` sans `ORDER BY`, `ORDER BY` sans `LIMIT`), des suggestions d'index manquants et une analyse de l'impact des transactions inactives. Accepte soit du texte SQL soit une signature de requête.

- Optimisez la signature de requête `abc123def` sur la base de données des paiements.
- Vérifiez ce SQL pour les index manquants et les anti-patterns.
- Suggérez des réécritures pour la requête la plus lente sur `db-prod-1`.

### `search_datadog_database_plans` {#search-datadog-database-plans}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Recherche dans les plans d'exécution des requêtes [Surveillance de la base de données][26], qui montrent comment le moteur de base de données exécute les requêtes, y compris l'utilisation des index, les stratégies de jointure et les estimations de coût. Utilisez ceci pour analyser les performances des requêtes et identifier les opportunités d'optimisation.

- Montrez-moi les plans d'exécution pour les requêtes lentes sur `host:db-prod-1` de la dernière heure.
- Trouvez des plans de requêtes avec `@db.plan.type:explain_analyze` pour la base de données de production.
- Obtenez des plans d'exécution pour les requêtes par `@db.user:app_user` avec une durée supérieure à 1 seconde.

### `search_datadog_database_samples` {#search-datadog-database-samples}
*Ensemble d'outils : **dbm***\
*Permissions requises : `Database Monitoring Read`*\
Recherche dans les échantillons de requêtes [Surveillance de la base de données][26], qui représentent des exécutions de requêtes individuelles avec des métriques de performance. Utilisez ceci pour analyser les modèles d'activité de la base de données, identifier les requêtes lentes et enquêter sur les problèmes de performance de la base de données.

- Montrez-moi des échantillons de requêtes avec `@duration:>1000000000` (durée supérieure à 1 seconde) de `db:mydb`.
- Trouvez des requêtes lentes sur `host:db-prod-1` filtrées par `@db.user:app_user`.
- Obtenez des échantillons de requêtes récents pour `@db.query_signature:abc123def` et analysez les modèles de performance.

## DDSQL {#ddsql}

Outils pour interroger les données de Datadog en utilisant [DDSQL][41], un dialecte SQL prenant en charge les ressources d'infrastructure, les journaux, les métriques, RUM, les spans et d'autres sources de données Datadog.

### `ddsql_get_spec` {#ddsql-get-spec}
*Ensemble d'outils : **ddsql***\
Obtient une spécification de capacité DDSQL compacte, y compris les fonctions SQL prises en charge, les mots-clés SQL et les différences spécifiques à DDSQL par rapport à PostgreSQL standard. Appelez cet outil avant de composer des requêtes pour comprendre la syntaxe prise en charge.

- Quelles fonctions SQL sont prises en charge dans DDSQL ?
- Montrez-moi les règles de syntaxe des requêtes DDSQL et les différences par rapport à PostgreSQL.
- Quelles fonctions d'agrégation puis-je utiliser dans DDSQL&nbsp;?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*Ensemble d'outils : **ddsql***\
Recherche dans les ensembles de données DDSQL et renvoie des tables (sources de données publiques et tables de référence) et des métriques disponibles.

- Quelles tables sont disponibles pour interroger dans DDSQL&nbsp;?
- Recherchez des tables DDSQL liées à Kubernetes.
- Montrez-moi les métriques disponibles que je peux interroger avec DDSQL.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*Ensemble d'outils : **ddsql***\
Obtient les colonnes SQL statiques pour une table DDSQL à partir des métadonnées du schéma.

- Quelles colonnes sont disponibles dans la table `aws.ec2_instance`&nbsp;?
- Montrez-moi le schéma de la table `k8s.pods`.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*Ensemble d'outils : **ddsql***\
Recherche et classe les champs pour les sources DDSQL non structurées, telles que les journaux, RUM et les spans, triés par fréquence. Utilisez cet outil pour la découverte de schéma sur les sources consultables avant de revenir à `ddsql_schema_get_table_columns`.

- Quels champs sont disponibles dans les journaux DDSQL ?
- Trouvez les champs liés à `service` dans mes données RUM.
- Montrez-moi les champs les plus courants dans mes données de span.

### `ddsql_run_query` {#ddsql-run-query}
*Ensemble d'outils : **ddsql***\
Exécute une requête DDSQL et renvoie les résultats. Prend en charge l'utilisation de la syntaxe SQL pour interroger les ressources d'infrastructure, les journaux, les métriques, RUM, spans et d'autres sources de données Datadog. Consultez la [Référence DDSQL][42] pour les détails de syntaxe.

- Combien d'instances EC2 sont en cours d'exécution dans chaque région AWS ?
- Montrez-moi les 10 principaux services par nombre de journaux d'erreurs au cours de la dernière heure.
- Interrogez l'utilisation moyenne du CPU regroupée par hôte pour les dernières 24 heures.

### `ddsql_create_link` {#ddsql-create-link}
*Ensemble d'outils : **ddsql***\
Génère un lien UI Datadog vers l'[Éditeur DDSQL][41] avec une requête donnée pré-remplie.

- Générez un lien vers l'Éditeur DDSQL pour cette requête.
- Créez un lien partageable vers l'Éditeur DDSQL avec ma requête d'infrastructure.

## Suivi des erreurs {#error-tracking}

Outils pour interagir avec Datadog [Suivi des erreurs][49].

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*Ensemble d'outils : **error-tracking***\
*Permissions requises : `Error Tracking Read`*\
Recherche des Error Tracking Issues dans les sources de données (RUM, logs, traces).

- Montrez-moi tous les Error Tracking Issues dans le checkout service des dernières 24 heures.
- Quelles sont les erreurs les plus courantes dans mon application au cours de la semaine dernière ?
- Trouvez les Error Tracking Issues dans l'environnement de production avec `service:api`.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*Ensemble d'outils : **suivi-des-erreurs***\
*Permissions requises : `Cases Read` et `Error Tracking Read`*\
Récupère des informations détaillées sur un problème de suivi des erreurs spécifique depuis Datadog.

- Aidez-moi à résoudre le problème de suivi des erreurs `550e8400-e29b-41d4-a716-446655440000`.
- Quel est l'impact du problème de suivi des erreurs `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` ?
- Créez un cas de test pour reproduire le problème de suivi des erreurs `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

## Drapeaux de fonctionnalités {#feature-flags}

Outils pour gérer les drapeaux de fonctionnalités [51], y compris la création, le listing et la mise à jour des drapeaux et de leurs environnements.

### `list_datadog_feature_flags` {#list-datadog-feature-flags}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Liste les drapeaux de fonctionnalités avec support de pagination.

- Montrez-moi tous les drapeaux de fonctionnalités dans mon organisation.
- Liste des drapeaux de fonctionnalités pour le service de paiement.

### `get_datadog_feature_flag` {#get-datadog-feature-flag}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Récupère des détails sur un drapeau de fonctionnalité spécifique.

- Obtenez des détails pour le drapeau de fonctionnalité `dark-mode-enabled`.
- Quels sont les paramètres actuels pour le drapeau `new-checkout-flow` ?

### `create_datadog_feature_flag` {#create-datadog-feature-flag}
*Ensemble d'outils : **drapeaux-de-fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read` et `Feature Flag Write`*\
Crée un nouveau drapeau de fonctionnalité.

- Crée un drapeau de fonctionnalité appelé `enable-new-dashboard` pour un déploiement progressif.
- Configurez un nouveau drapeau de fonctionnalité booléen pour la fonctionnalité bêta.

### `list_datadog_feature_flag_environments` {#list-datadog-feature-flag-environments}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read`*\
Liste des environnements configurés pour les drapeaux de fonctionnalités.

- Montrez-moi les environnements de drapeaux de fonctionnalités disponibles.
- Quels environnements puis-je cibler avec des drapeaux de fonctionnalités ?

### `list_datadog_feature_flag_allocations` {#list-datadog-feature-flag-allocations}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Liste des allocations pour un drapeau de fonctionnalité dans un environnement spécifique.

- Montrez-moi les règles d'allocation pour le drapeau `new-checkout-flow` en production.

### `update_datadog_feature_flag_environment` {#update-datadog-feature-flag-environment}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read` et `Feature Flag Write`*\
Met à jour la configuration d'un drapeau de fonctionnalité dans un environnement spécifique.

- Activez le drapeau `dark-mode` dans l'environnement de staging.
- Déployez le drapeau `new-checkout-flow` à 50 % des utilisateurs en production.

### `check_datadog_flag_implementation` {#check-datadog-flag-implementation}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Environment Read` et `Feature Flag Read`*\
Vérifie si un drapeau de fonctionnalité est implémenté dans le code.

- Vérifiez que le drapeau de fonctionnalité `enable-new-dashboard` est implémenté dans ma base de code.

### `sync_datadog_feature_flag_allocations` {#sync-datadog-feature-flag-allocations}
*Ensemble d'outils : **drapeaux de fonctionnalités***\
*Permissions requises : `Feature Flag Write`*\
Synchronise les allocations du drapeau de fonctionnalité pour un environnement spécifique.

- Synchronisez les allocations pour le drapeau de fonctionnalité `new-checkout-flow` en production.

## Kubernetes {#kubernetes}

Outils pour rechercher et décrire les ressources [Kubernetes][55] et récupérer des manifestes à travers tous les clusters.

### `search_datadog_k8s_resources` {#search-datadog-k8s-resources}
*Ensemble d'outils : **kubernetes***\
*Permissions requises : `Hosts Read` et `Teams Read`*\
Recherche des ressources [Kubernetes][55] à travers tous les clusters. Utilisez cet outil au lieu de `kubectl` pour déterminer l'état des ressources Kubernetes telles que les déploiements, les pods, les nœuds, etc. Cet outil ne nécessite pas d'accès au cluster local, fonctionne à travers tous les clusters et renvoie des données enrichies avec des balises. Vous pouvez inclure des clés de balise spécifiques sur chaque résultat et inclure les noms des ressources parentes pour enquêter sur les relations entre les ressources (par exemple, le déploiement auquel appartient un pod).

- Montrez-moi tous les pods dans l'espace de noms `production` avec le statut `CrashLoopBackOff`.
- Trouvez les déploiements qui sont en cours de déploiement dans le cluster `general2`.
- Listez tous les nœuds dans mon cluster triés par utilisation du CPU.
- Groupez les déploiements par `service` et `env` pour voir comment mes services sont répartis à travers les environnements.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*Ensemble d'outils : **kubernetes***\
*Permissions requises : `Hosts Read`*\
Obtient des informations détaillées sur une ressource [Kubernetes][55] spécifique, y compris des détails spécifiques à la ressource tels que les demandes et limites de CPU et de mémoire, et éventuellement des balises, des étiquettes, des annotations, l'historique des manifestes, des ressources parentes et un lien direct vers l'[Explorateur Kubernetes][55]. Utilisez cet outil au lieu de `kubectl describe`. Identifiez une ressource par son UID d'une recherche précédente ou en fournissant des identifiants de ressource (cluster, namespace et nom de la ressource). Pour le manifeste brut complet, utilisez `get_datadog_k8s_manifest`.

- Décrivez le pod `my-app` dans le cluster `prod`, espace de noms `default`.
- Obtenez les détails du déploiement `api-server` dans l'espace de noms `default`, cluster `staging`.
- Montrez-moi les balises et annotations pour cette ressource Kubernetes.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*Ensemble d'outils : **kubernetes***\
*Permissions requises : `Hosts Read`*\
Récupère le manifeste YAML pour une ressource [Kubernetes][55] spécifique. Utilisez cet outil au lieu de `kubectl get -o yaml`. Prend en charge l'extraction de sous-arbres spécifiques avec une expression JSONPath `kubectl` et un mode concis qui omet `status` et `managedFields` pour réduire la taille de la réponse.

- Obtenez le manifeste pour le pod `my-app` dans le cluster `prod`, dans l'espace de noms `default`.
- Montrez-moi les ports de conteneur pour le déploiement `api-server` dans l'espace de noms `default`, cluster `staging`.
- Obtenez les images de conteneur à partir du manifeste du pod `my-app`.

## Réseaux {#networks}

Outils pour l'analyse de [Cloud Network Monitoring][31] et [Network Device Monitoring][32].

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*Ensemble d'outils : **réseaux***\
*Permissions requises : `Network Connections Read`*\
Examine les problèmes au niveau du réseau en utilisant les données de [Cloud Network Monitoring][31], en analysant les flux réseau pour détecter des anomalies telles que des taux de retransmission élevés.

- Analysez le trafic réseau entre mes serveurs web et le cluster de base de données.
- Y a-t-il des problèmes de retransmission entre `service:api` et `service:payments` ?
- Examinez les données de flux réseau pour détecter des anomalies dans l'environnement de production.

### `search_ndm_devices` {#search-ndm-devices}
*Ensemble d'outils : **réseaux***\
*Permissions requises : `NDM Read`*\
Recherche des appareils réseau (routeurs, commutateurs, pare-feu) surveillés par Datadog [Network Device Monitoring][32].

- Montrez-moi tous les appareils réseau dans le datacenter `us-east-1`.
- Trouvez les pare-feu qui signalent des erreurs.
- Listez tous les commutateurs surveillés et leurs statuts.

### `get_ndm_device` {#get-ndm-device}
*Ensemble d'outils : **réseaux***\
*Permissions requises : `NDM Read`*\
Récupère des informations détaillées sur un appareil réseau spécifique par son identifiant d'appareil.

- Obtenez les détails pour l'appareil réseau `device:abc123`.
- Montrez-moi la configuration et le statut de ce routeur.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*Ensemble d'outils : **réseaux***\
*Permissions requises : `NDM Read`*\
Récupère toutes les interfaces réseau pour un appareil spécifique.

- Montrez-moi toutes les interfaces sur l'appareil `device:abc123`.
- Listez les statuts des interfaces de mon routeur principal.

## Intégration {#onboarding}

Outils d'intégration agentique pour une configuration et un paramétrage guidés de Datadog.

### `browser_onboarding` {#browser-onboarding}
*Ensemble d'outils : **intégration***\
*Permissions requises : `RUM Apps Read`*\
Vous guide dans l'intégration de Browser RUM à Datadog.

- Aidez-moi à configurer la surveillance de Browser RUM pour mon application web.

### `devices_onboarding` {#devices-onboarding}
*Ensemble d'outils : **intégration***\
*Permissions requises : `RUM Apps Read`*\
Vous guide dans l'intégration des appareils à la surveillance Datadog.

- Aidez-moi à configurer la surveillance des appareils dans Datadog.

### `kubernetes_onboarding` {#kubernetes-onboarding}
*Ensemble d'outils : **intégration***\
*Permissions requises : Aucune*\
Vous guide dans l'intégration des clusters Kubernetes à Datadog.

- Aidez-moi à configurer la surveillance Datadog pour mon cluster Kubernetes.

### `llm_observability_onboarding` {#llm-observability-onboarding}
*Ensemble d'outils : **intégration***\
Vous guide lors de l'intégration de l'observabilité LLM dans Datadog.

- Aidez-moi à configurer l'observabilité LLM pour mon application d'IA.

### `test_optimization_onboarding` {#test-optimization-onboarding}
*Ensemble d'outils : **intégration***\
*Permissions requises : Aucune*\
Vous guide lors de l'intégration de l'optimisation des tests dans Datadog.

- Aidez-moi à configurer l'optimisation des tests pour mon pipeline CI.

### `serverless_onboarding` {#serverless-onboarding}
*Ensemble d'outils : **intégration***\
*Permissions requises : Aucune*\
Vous guide lors de l'intégration des applications sans serveur à Datadog, y compris les fonctions AWS Lambda, les services GCP Cloud Run et les fonctions Cloud Run (Gen 2).

- Aidez-moi à surveiller mes fonctions AWS Lambda avec Datadog.
- Aidez-moi à surveiller mes services GCP Cloud Run avec Datadog.
- Aidez-moi à surveiller mes fonctions GCP Cloud Run avec Datadog.

### `source_map_uploads` {#source-map-uploads}
*Ensemble d'outils : **intégration***\
Vous guide à travers le téléchargement des cartes sources pour le mappage des erreurs RUM.

- Aidez-moi à télécharger des cartes sources afin que mes erreurs RUM affichent le code source original.

## Tables de référence {#reference-tables}

Outils pour gérer [Tables de référence][45], y compris lister les tables, lire les lignes, ajouter des lignes et créer des tables à partir du stockage cloud.

### `list_reference_tables` {#list-reference-tables}
*Ensemble d'outils : **tables-de-référence***\
Liste et recherche [Tables de référence][45] dans l'organisation, avec filtrage optionnel par nom et tri.

- Liste toutes les tables de référence dans mon organisation.
- Trouvez des tables de référence avec `customer` dans le nom.
- Montrez-moi les tables de référence triées par date de dernière mise à jour.

### `get_reference_table_rows` {#get-reference-table-rows}
*Ensemble d'outils : **tables-de-référence***\
Récupère des lignes spécifiques d'une table de référence par leurs valeurs de clé primaire. Utilisez `list_reference_tables` d'abord pour trouver l'ID de la table et le schéma.

- Obtenez les lignes avec les clés primaires `user001` et `user002` de la table de référence des utilisateurs.
- Recherchez l'entrée pour l'ID de compte `acct-123` dans la table des comptes.

### `append_reference_table_rows` {#append-reference-table-rows}
*Ensemble d'outils : **tables de référence***\
Ajoute de nouvelles lignes à une table de référence existante. Cette opération n'ajoute que des lignes et ne modifie ni ne supprime les données existantes. Chaque ligne doit inclure tous les champs requis du schéma de la table, y compris le champ de clé primaire.

- Ajoutez une nouvelle ligne pour l'utilisateur `user003` avec le nom `Carol` et l'âge `28` à la table des utilisateurs.
- Ajoutez ces cinq nouvelles entrées de compte à la table de référence des comptes.

### `create_reference_table` {#create-reference-table}
*Ensemble d'outils : **tables de référence***\
Crée une nouvelle table de référence basée sur un fichier CSV dans Amazon S3, Google Cloud Storage ou Azure Blob Storage. Seuls les types de champs `INT32` et `STRING` sont pris en charge.

- Créez une table de référence appelée `ip_allowlist` à partir du fichier `allowlist.csv` dans mon bucket S3 `my-data-bucket`.
- Configurez une nouvelle table de référence basée sur GCS appelée `customer_tiers` avec la synchronisation automatique activée.

## Sécurité {#security}

Outils pour l'analyse de sécurité du code et la recherche de [signaux de sécurité][53] et de [constatations de sécurité][54].

### `datadog_secrets_scan` {#datadog-secrets-scan}
*Ensemble d'outils : **sécurité***\
Analyse le code à la recherche de secrets codés en dur et d’identifiants, en détectant les clés AWS, les clés API, les mots de passe, les tokens, les clés privées et les identifiants de base de données.

- Analysez mon code à la recherche de secrets codés en dur.
- Vérifiez s'il y a des clés API ou des mots de passe présents dans ce fichier.

### `search_datadog_security_signals` {#search-datadog-security-signals}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read`*\
Recherche et récupère des signaux de sécurité à partir de Datadog Security Monitoring, y compris les signaux Cloud SIEM, les signaux de protection des applications et des API, et les signaux de protection des charges de travail.

- Montrez-moi les signaux de sécurité des dernières 24 heures.
- Trouvez les signaux de sécurité de haute gravité liés à mon environnement de production.
- Listez les signaux Cloud SIEM déclenchés par des tentatives de connexion suspectes.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read` et `Timeseries`*\
Analyse les signaux de sécurité à l'aide de requêtes SQL pour les agrégations, le regroupement et l'analyse des tendances. Utilisez ceci pour les comptes, le top-N et les répartitions dans le temps. Pour lister ou récupérer des signaux spécifiques, utilisez `search_datadog_security_signals` ou `get_datadog_security_signal`.

- Montrez-moi les 10 règles SIEM avec le plus de signaux au cours des 7 derniers jours.
- Comptez les signaux de sécurité élevés et critiques regroupés par gravité.
- Combien de signaux de protection des applications et des API ont été déclenchés par service hier&nbsp;?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Signals Read`*\
Récupère les détails complets d'un signal de sécurité unique par ID, y compris les attributs, les informations sur la règle, l'état de triage, les étiquettes et les corrélations de cas.

- Obtenez les détails complets du signal de sécurité `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`.
- Montrez-moi la règle, l'état de triage et les cas liés à ce signal.

### `security_findings_schema` {#security-findings-schema}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Findings Read`*\
Retourne le schéma (champs disponibles et leurs types) pour les résultats de sécurité. Appelez ceci d'abord avant d'utiliser `analyze_security_findings` pour découvrir les champs interrogeables. Prend en charge le filtrage par type de résultat et contrôle la taille de la réponse.

- Quels champs sont disponibles pour les résultats de sécurité ?
- Montrez-moi le schéma des résultats de vulnérabilité de la bibliothèque.
- Obtenez le schéma complet, y compris les descriptions des résultats de mauvaise configuration.

### `analyze_security_findings` {#analyze-security-findings}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Findings Read` et `Timeseries`*\
Outil principal pour analyser les résultats de sécurité à l'aide de requêtes SQL. Interroge les données en direct des dernières 24 heures avec des agrégations SQL flexibles, un filtrage et un regroupement. Appelez `security_findings_schema` d'abord pour découvrir les champs disponibles, puis utilisez cet outil pour interroger.

- Montrez-moi les 10 règles avec les résultats les plus critiques.
- Comptez les résultats ouverts regroupés par gravité et type de résultat.
- Trouvez les vulnérabilités de la bibliothèque avec des exploits disponibles, regroupées par ressource.

### `search_security_findings` {#search-security-findings}
*Ensemble d'outils : **sécurité***\
*Permissions requises : `Security Monitoring Findings Read`*\
Outil de secours pour récupérer les détails complets des résultats de sécurité. Préférez `analyze_security_findings` pour la plupart des tâches d'analyse. Utilisez cet outil uniquement lorsque vous avez besoin d'objets de résultat complets ou lorsque les requêtes SQL sont insuffisantes.

- Obtenez des détails complets pour les résultats critiques dans mon environnement AWS.
- Récupérez des objets de résultat complets pour une règle spécifique.
- Listez tous les résultats de risque d'identité ouverts avec des métadonnées complètes.

## Livraison de logiciel {#software-delivery}

Outils pour interagir avec la Livraison de logiciel ([Visibilité CI][48] et [Optimisation des tests][24]).

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*Ensemble d'outils : **livraison-de-logiciel***\
*Permissions requises : `CI Visibility Read`*\
Recherche des événements CI avec des filtres et renvoie des détails à leur sujet.

- Montrez-moi tous les pipelines pour mon commit `58b1488`.
- Montrez-moi le dernier échec de pipeline dans la branche `my-branch`.
- Proposez une solution pour le travail `integration-test` qui échoue à chaque fois dans ma branche `my-branch`.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*Ensemble d'outils : **livraison-de-logiciel***\
*Permissions requises : `CI Visibility Read`*\
Agrège les événements de pipeline CI pour produire des statistiques, des métriques et des analyses groupées.

- Quelle est la durée moyenne des travaux pour les 7 derniers jours ?
- Combien de pipelines échoués y a-t-il eu au cours des 2 dernières semaines ?
- Montrez-moi le 95e percentile de la durée des pipelines regroupés par nom de pipeline.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*Ensemble d'outils : **livraison-de-logiciel***\
*Permissions requises : `Test Optimization Read`*\
Recherche dans Datadog [Test Optimization][24] pour des tests instables et renvoie des détails de triage (taux d'échec, catégorie, propriétaires, historique, impact CI), avec pagination et tri.

- Trouvez des tests instables actifs pour le service de paiement appartenant à `@team-abc`, triés par taux d'échec.
- Montrez les tests instables dans la branche `main` pour le dépôt `github.com/org/repo`, les plus récents en premier.
- Listez les tests instables dans la catégorie `timeout` avec un taux d'échec élevé (50%+) afin que je puisse prioriser les corrections.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*Toolset: **software-delivery***\
*Permissions requises : `Test Optimization Read`*\
Agrège les événements de Test Optimization de Datadog pour quantifier la fiabilité et les tendances de performance avec des fonctions d'agrégation, des métriques optionnelles, des facettes group-by et des niveaux de test configurables.

- Comptez le nombre de tests échoués au cours de la dernière semaine, regroupés par branche.
- Montrez-moi la durée au 95e percentile pour chaque suite de tests afin d'identifier les plus lentes.
- Comptez tous les tests réussis et échoués, regroupés par propriétaires de code.

### `search_datadog_test_events` {#search-datadog-test-events}
*Toolset: **software-delivery***\
*Permissions requises : `Test Optimization Read`*\
Recherche des événements de test [Test Optimization][24] avec des filtres et renvoie leurs détails.

- Montrez-moi les tests échoués sur la branche `main` des dernières 24 heures.
- Obtenez les exécutions de tests pour le commit `abc123` afin de voir ce qui a réussi et échoué.
- Montrez-moi tous les tests instables pour le service de paiement.
- Trouvez les tests appartenant à `@team-name` qui échouent.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*Toolset: **software-delivery***\
*Permissions requises : `Code Coverage read`*\
Récupère des métriques agrégées de résumé de couverture de code pour une branche de dépôt, y compris la couverture totale, la couverture de patch et les répartitions de service/propriétaire de code.

- Quelle est la couverture de code sur la branche `main` pour `github.com/my-org/my-repo` ?
- Montrez-moi le résumé de la couverture pour la branche `release/1.x` de `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*Toolset: **software-delivery***\
*Permissions requises : `Code Coverage read`*\
Récupère les métriques agrégées de couverture de code pour un commit de dépôt, y compris la couverture totale, la couverture des correctifs et les répartitions des services/propriétaires de code.

- Montre-moi la couverture de code pour le commit `abc123abc123abc123abc123abc123abc123abcd` dans `github.com/my-org/my-repo`.
- Quelle est la couverture des correctifs pour le dernier commit sur ma branche ?

## Synthetics {#synthetics}

Outils pour interagir avec Datadog [Synthetic tests][47].

### `get_synthetics_tests` {#get-synthetics-tests}
*Ensemble d'outils : **synthetics***\
*Permissions requises : `Synthetics Read`*\
Recherche des tests HTTP API Synthetic de Datadog.

- Aide-moi à comprendre pourquoi le test Synthetic sur le point de terminaison `/v1/my/tested/endpoint` échoue.
- Il y a une panne ; trouve tous les Synthetic tests échoués sur le domaine `api.mycompany.com`.
- Les Synthetic tests sur mon site web `api.mycompany.com` fonctionnent-ils encore au cours de la dernière heure ?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*Ensemble d'outils : **synthetics***\
*Permissions requises : `Synthetics Global Variable Read` et `Synthetics Read` et `Synthetics Write`*\
Modifie les tests HTTP API Synthetic de Datadog.

- Améliore les assertions du test Synthetic défini sur mon point de terminaison `/v1/my/tested/endpoint`.
- Mettez le test `aaa-bbb-ccc` en pause et limitez les emplacements aux seuls emplacements européens.
- Ajoutez mon tag d'équipe au test `aaa-bbb-ccc`.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*Ensemble d'outils : **synthetics***\
*Permissions requises : `Synthetics Global Variable Read` et `Synthetics Read` et `Synthetics Write`*\
Prévisualisez et créez les tests HTTP API Synthetic de Datadog.

- Créez des tests Synthetic sur chaque point de terminaison défini dans ce fichier de code.
- Créez un test Synthetic sur `/path/to/endpoint`.
- Créez un test Synthetic qui vérifie si mon domaine `mycompany.com` reste opérationnel.

## Flux de travail {#workflows}

Outils pour [Workflow Automation][39], y compris la liste, l'inspection, l'exécution et la configuration des workflows pour l'utilisation par les agents.

### `list_datadog_workflows` {#list-datadog-workflows}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Read`*\
Liste et recherche des flux de travail [Automatisation des Flux de Travail][39]. Prend en charge le filtrage par nom, étiquettes, propriétaire, identifiant et type de déclencheur (tel que `monitor`, `schedule`, `api` ou `incident`). Les résultats peuvent être triés par des champs tels que `name` ou `updatedAt`.

- Montrez-moi tous les workflows publiés étiquetés avec `team:platform`.
- Listez les workflows qui ont un agent trigger configuré.
- Trouvez tous les workflows liés à la réponse aux incidents appartenant à Alice Smith.

### `get_datadog_workflow` {#get-datadog-workflow}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Read`*\
Récupère des informations détaillées sur un flux de travail spécifique, y compris ses déclencheurs, étapes, connexions et schéma d'entrée.

- Obtenez les détails complets pour le flux de travail `00000000-0000-0000-0000-000000000000`.
- Montrez-moi les paramètres d'entrée et les étapes du flux de travail de restauration du déploiement.
- Quels déclencheurs sont configurés pour ce flux de travail ?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Run`*\
Exécute un flux de travail publié qui a un déclencheur d'agent, avec des paramètres d'entrée optionnels correspondant au schéma d'entrée du flux de travail.

- Exécutez le flux de travail d'escalade d'incidents pour le service `checkout-api` avec une gravité `high`.
- Exécutez le flux de travail de retour en arrière de déploiement pour le service de paiements.
- Déclenchez le flux de travail de notification On-Call avec le contexte de cette enquête.

**Remarque** : Le flux de travail doit être publié et avoir un déclencheur d'agent configuré. Utilisez `update_datadog_workflow_with_agent_trigger` pour en ajouter un si nécessaire.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Read`*\
Récupère le statut et les détails d'une instance d'exécution de flux de travail, y compris les résultats des étapes et les sorties.

- Quel est le statut de l'exécution du flux de travail que j'ai déclenchée ?
- Le flux de travail d'escalade d'incidents s'est-il terminé avec succès ?
- Montrez-moi les sorties détaillées de l'instance de flux de travail `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*Ensemble d'outils : **workflows***\
*Permissions requises : `Workflows Write`*\
Ajoute un déclencheur d'agent à un flux de travail et le publie, permettant au flux de travail d'être exécuté par des agents IA.

- Ajoutez un déclencheur d'agent au flux de travail de retour en arrière de déploiement afin que je puisse l'exécuter d'ici.
- Configurez le flux de travail de réponse aux incidents pour qu'il soit déclenchable par un agent.

[1]: /fr/bits_ai/mcp_server/setup#toolsets
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