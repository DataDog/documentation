---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /fr/logs/languages
- /fr/integrations/windows_event_log/
description: Configurez votre environnement afin de collecter les logs depuis votre
  host, vos conteneurs et vos services.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Comment gérer les fichiers de logs avec Logrotate
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: Configurations avancées de collecte de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Découvrir comment traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/live_tail/
  tag: Documentation
  text: Fonctionnalité Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging Without Limits*
title: Collecte de logs et intégrations
---
## Aperçu

Choisissez une option de configuration ci-dessous pour commencer à ingérer vos journaux. Si vous utilisez déjà un démon de transfert de journaux, consultez la documentation dédiée pour [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] ou [Logstash][5].

Consultez la [liste des points de collecte de journaux disponibles de Datadog](#logging-endpoints) si vous souhaitez envoyer vos journaux directement à Datadog.

**Remarque** : Lors de l'envoi de journaux au format JSON à Datadog, il existe un ensemble d'attributs réservés qui ont une signification spécifique au sein de Datadog. Consultez la [section des Attributs Réservés](#attributes-and-tags) pour en savoir plus.

## Implémentation

{{< tabs >}}
{{% tab "Host" %}}

1. Installez l'[Agent Datadog][1].
2. Pour activer la collecte de journaux, changez `logs_enabled: false` en `logs_enabled: true` dans le fichier de configuration principal de votre Agent (`datadog.yaml`). Consultez la [documentation de collecte de journaux de l'Agent Hôte][5] pour plus d'informations et d'exemples.
3. Une fois la collecte activée, vous pouvez configurer l'Agent Datadog afin de [suivre les fichiers de log ou de détecter les logs envoyés via UDP/TCP][2], de [filtrer les logs ou de nettoyer les données sensibles][3] et d'[agréger les logs multiligne][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/logs/advanced_log_collection/#filter-logs
[4]: /fr/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Application" %}}

1. Installez l'[Agent Datadog][1].
2. Pour activer la collecte de journaux, changez `logs_enabled: false` en `logs_enabled: true` dans le fichier de configuration principal de votre Agent (`datadog.yaml`). Consultez la [documentation de collecte de journaux de l'Agent Hôte][2] pour plus d'informations et d'exemples.
3. Suivez les instructions d'installation correspondant au langage de votre application pour configurer un logger et commencer à générer des logs :

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Container" %}}

Choisissez un fournisseur de conteneurs ou d'orchestrateurs et suivez les instructions relatives à la collecte de logs :

{{< partial name="logs/logs-containers.html" >}}

**Remarques** :

- L'Agent Datadog peut [collecter des journaux directement à partir de stdout/stderr de conteneur][1] sans utiliser de pilote de journalisation. Lorsque la vérification Docker de l'Agent est activée, les métadonnées des conteneurs et des orchestrateurs sont automatiquement ajoutées en tant que balises à vos journaux.

- Il est possible de recueillir les logs pour l'ensemble de vos conteneurs ou [uniquement ceux d'un sous-ensemble filtré par image, étiquette ou nom de conteneur][2].

- Grâce à Autodiscovery, vous pouvez également [configurer la collecte de logs directement dans les étiquettes de conteneur][3].

- Dans les environnements Kubernetes, vous pouvez également tirer parti de [l'installation de Daemonset][4].

[1]: /fr/agent/docker/log/
[2]: /fr/agent/guide/autodiscovery-management/
[3]: /fr/agent/kubernetes/integrations/
[4]: /fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Environnement sans serveur" %}}

Utilisez le Datadog Forwarder, une fonction AWS Lambda qui expédie les journaux de votre environnement vers Datadog. Pour activer la collecte de journaux dans votre environnement sans serveur AWS, consultez la [documentation du Datadog Forwarder][1].

[1]: /fr/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Intégration" %}}

Sélectionnez votre fournisseur de Cloud ci-dessous pour savoir comment recueillir automatiquement vos logs et les transférer à Datadog :

{{< partial name="logs/logs-cloud.html" >}}

Les intégrations Datadog et la collecte de journaux sont liées. Vous pouvez utiliser le fichier de configuration par défaut d'une intégration pour activer des [processeurs][1], [analyses][2] et [facettes][3] dédiés dans Datadog. Pour commencer la collecte de journaux avec une intégration :

1. Sélectionnez une intégration depuis la [page des intégrations][6] et suivez les instructions de configuration.
2. Suivez les instructions de collecte des journaux de l'intégration. Cette section explique comment décommenter la section des journaux dans le fichier `conf.yaml` de cette intégration et le configurer pour votre environnement.

## Réduire les frais de transfert de données

Utilisez le [Monitoring Réseau Cloud][7] de Datadog pour identifier les applications à plus haut débit de votre organisation. Connectez-vous à Datadog via des connexions privées prises en charge et envoyez des données sur un réseau privé pour éviter Internet public et réduire vos frais de transfert de données. Après avoir basculé vers des liens privés, utilisez les outils de [Gestion des Coûts Cloud][8] de Datadog pour vérifier l'impact et surveiller la réduction de vos coûts cloud.

Pour plus d'informations, consultez [Comment envoyer des logs à Datadog tout en réduisant les frais de transfert de données][9] (en anglais).

[1]: /fr/logs/log_configuration/processors
[2]: /fr/logs/log_configuration/parsing
[3]: /fr/logs/explorer/facets/
[4]: /fr/agent/kubernetes/log/#autodiscovery
[5]: /fr/agent/docker/log/#log-integrations
[6]: /fr/integrations/#cat-log-collection
[7]: /fr/network_monitoring/cloud_network_monitoring/
[8]: /fr/cloud_cost_management/
[9]: /fr/logs/guide/reduce_data_transfer_fees/


{{% /tab %}}

{{% tab "Check de l'Agent" %}}

Si vous développez une intégration d'Agent personnalisée, vous pouvez soumettre des journaux de manière programmatique depuis votre vérification d'Agent en utilisant la méthode `send_log`. Cela permet à votre intégration personnalisée d'émettre des journaux aux côtés des métriques, des événements et des vérifications de service.

Pour apprendre comment soumettre des journaux depuis votre vérification d'Agent personnalisée, consultez [Collecte des Journaux d'Intégration d'Agent][15].

[15]: /fr/logs/log_collection/agent_checks/
{{% /tab %}}
{{< /tabs >}}

## Options de configuration supplémentaires

### Points de terminaison de journalisation

Datadog fournit des points de terminaison de journalisation pour les connexions SSL chiffrées et non chiffrées. Utilisez le point de terminaison chiffré lorsque cela est possible. L'Agent Datadog utilise le point de terminaison chiffré pour envoyer des journaux à Datadog. Plus d'informations sont disponibles dans la [documentation de sécurité de Datadog][6].

#### Endpoints pris en charge

Utilisez le menu déroulant situé à droite de la page pour sélectionner votre [site][13] Datadog et afficher les endpoints qu'il prend en charge.

| Site | Type | Point de terminaison | Port | Description |
|------|-------|----------|------|-------------|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=http_endpoint >}}</code> | 443 | Utilisé par le forwarder personnalisé pour envoyer des journaux au format JSON ou texte brut via HTTPS. Consultez la [documentation de l'API HTTP des journaux][16]. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=agent_http_endpoint >}}</code> | 443 | Utilisé par l'Agent pour envoyer des journaux au format JSON via HTTPS. Consultez la [documentation de collecte des journaux de l'Agent Hôte][17]. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=lambda_http_endpoint >}}</code> | 443 | Utilisé par les fonctions Lambda pour envoyer des journaux au format brut, Syslog ou JSON via HTTPS. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>journaux.{{< region-param key=browser_sdk_endpoint_domain >}}</code> | 443 | Utilisé par le SDK du Navigateur pour envoyer des journaux au format JSON via HTTPS. |

### Transfert de journaux personnalisé

Tout processus ou bibliothèque de journalisation personnalisée capable de transférer des journaux via **HTTP** peut être utilisé en conjonction avec Datadog Logs.

Vous pouvez envoyer des journaux à la plateforme Datadog via HTTP. Référez-vous à la [documentation de l'API HTTP des journaux Datadog][15] pour commencer.

**Notes** :

* L'API HTTPS prend en charge des journaux d'une taille allant jusqu'à 1 Mo. Cependant, pour des performances optimales, il est recommandé qu'un journal individuel ne dépasse pas 25 Ko. Si vous utilisez l'Agent Datadog pour la journalisation, il est configuré pour diviser un journal à 900 Ko (900000 octets).
* Un événement de log ne doit pas avoir plus de 100 tags, et chaque tag ne doit pas dépasser 256 caractères pour un maximum de 10 millions de tags uniques par jour.
* Un événement de journal converti au format JSON doit contenir moins de 256 attributs. Chacune des clés de ces attributs doit comporter moins de 50 caractères, être imbriquée en moins de 20 niveaux successifs, et leur valeur respective doit comporter moins de 1024 caractères si promue en facette.
* Les événements de log peuvent être envoyés avec un [timestamp][14] jusqu'à 18 h dans le passé.

<div class="alert alert-info">
<b>Aperçu disponible</b> : Vous pouvez soumettre des journaux des 7 derniers jours, au lieu de la limite actuelle de 18 heures. <a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">Inscrivez-vous pour l'Aperçu</a>.
</div>

Les événements de journal qui ne respectent pas ces limites peuvent être transformés ou tronqués par le système ou non indexés s'ils sont en dehors de la plage horaire fournie. Cependant, Datadog essaie de préserver autant de données utilisateur que possible.

Il existe une troncature supplémentaire dans les champs qui s'applique uniquement aux journaux indexés : la valeur est tronquée à 75 Ko pour le champ message et 25 Ko pour les champs non-message. Datadog stocke toujours le texte complet, et il reste visible dans les requêtes de liste régulières dans l'Explorateur de journaux. Cependant, la version tronquée sera affichée lors de l'exécution d'une requête groupée, comme lors du regroupement des journaux par ce champ tronqué ou lors de l'exécution d'opérations similaires qui affichent ce champ spécifique.

{{% collapse-content title="TCP" level="h3" expanded=false %}}

{{% logs-tcp-disclaimer %}}


| Site | Type        | Point de terminaison                                                                  | Port         | Description                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Utilisé par l'Agent pour envoyer des journaux sans TLS.
| US   | TCP et TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Utilisé par l'Agent pour envoyer des journaux avec TLS.
| US   | TCP et TLS | `intake.logs.datadoghq.com`                                               | 443   | Utilisé par des transmetteurs personnalisés pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL.                                                                 |
| US   | TCP et TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Utilisé par les fonctions Azure pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL. **Note**: Ce point de terminaison peut être utile avec d'autres fournisseurs de cloud. |
| US   | TCP et TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | Utilisé par les fonctions Lambda pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL.                                                                  |
| EU   | TCP et TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | Utilisé par l'Agent pour envoyer des journaux au format protobuf via une connexion TCP chiffrée SSL.                                                                                     |
| EU   | TCP et TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Utilisé par les fonctions Azure pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL. **Note**: Ce point de terminaison peut être utile avec d'autres fournisseurs de cloud. |
| EU   | TCP et TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | Utilisé par les fonctions Lambda pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL.                                                                  |

{{% /collapse-content %}}

### Attributs et étiquettes

Les attributs prescrivent [les facettes des journaux][9], qui sont utilisés pour le filtrage et la recherche dans l'Explorateur de journaux. Consultez la documentation dédiée [aux attributs et à l'aliasing][10] pour une liste des attributs réservés et standard et pour apprendre à soutenir une convention de nommage avec les attributs de journaux et l'aliasing.

#### Attributs pour les stack traces

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom du logger, le thread actuel, le type d'erreur et la trace de pile.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Attributs pour une trace de pile analysée" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Nom du logger                                                      |
| `logger.thread_name` | Nom du thread actuel                                              |
| `error.stack`        | Trace de pile actuelle                                                      |
| `error.message`      | Message d'erreur contenu dans la trace de pile                              |
| `error.kind`         | Le type ou le "genre" d'une erreur (par exemple, "Exception" ou "OSError") |

**Note** : Par défaut, les pipelines d'intégration tentent de remapper les paramètres de la bibliothèque de journalisation par défaut à ces attributs spécifiques et d'analyser les traces de pile ou les retours en arrière pour extraire automatiquement le `error.message` et le `error.kind`.

Pour en savoir plus, consultez la [documentation relative aux attributs de code source][11].

## Étapes suivantes

Une fois les journaux collectés et ingérés, ils sont disponibles dans **Log Explorer**. Log Explorer est l'endroit où vous pouvez rechercher, enrichir et visualiser des alertes sur vos journaux. Consultez la documentation de [Log Explorer][12] pour commencer à analyser vos données de journal, ou consultez la documentation supplémentaire sur la gestion des journaux ci-dessous.

{{< img src="logs/explore.png" alt="Journaux apparaissant dans le Log Explorer" style="width:100%" >}}

## Lectures supplémentaires

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/integrations/rsyslog/
[2]: /fr/integrations/syslog_ng/
[3]: /fr/integrations/nxlog/
[4]: /fr/integrations/fluentd/#log-collection
[5]: /fr/integrations/logstash/#log-collection
[6]: /fr/data_security/logs/#information-security
[7]: /fr/agent/logs/#send-logs-over-https
[8]: /fr/api/v1/logs/#send-logs
[9]: /fr/logs/explorer/facets/
[10]: /fr/logs/log_configuration/attributes_naming_convention
[11]: /fr/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /fr/logs/explore/
[13]: /fr/getting_started/site/
[14]: /fr/logs/log_configuration/pipelines/?tab=date#date-attribute
[15]: /fr/api/latest/logs/#send-logs
[16]: /fr/api/latest/logs/#send-logs
[17]: /fr/agent/logs/#send-logs-over-https