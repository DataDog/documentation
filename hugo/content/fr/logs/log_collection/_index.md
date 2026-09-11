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
- link: https://learn.datadoghq.com/courses/advanced-log-configuration
  tag: Centre d'apprentissage
  text: Configuration avancée des journaux
- link: https://learn.datadoghq.com/courses/log-config-docker
  tag: Centre d'apprentissage
  text: Configurer la collecte des journaux pour une application conteneurisée
title: Collecte de logs et intégrations
---
## Aperçu {#overview}

Choisissez une option de configuration ci-dessous pour commencer à ingérer vos journaux. Si vous utilisez déjà un démon expéditeur de journaux, consultez la documentation dédiée pour [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] ou [Logstash][5].

Consultez la [liste des points de terminaison de collecte de journaux Datadog disponibles](#logging-endpoints) si vous souhaitez envoyer vos journaux directement à Datadog.

**Remarque** : Lors de l'envoi de journaux au format JSON à Datadog, il existe un ensemble d'attributs réservés qui ont une signification spécifique au sein de Datadog. Consultez la [section des Attributs Réservés](#attributes-and-tags) pour en savoir plus.

## Configuration {#setup}

{{< tabs >}}
{{% tab "Host" %}}

1. Installez le [Datadog Agent][1].
2. Pour activer la collecte des journaux, changez `logs_enabled: false` en `logs_enabled: true` dans le fichier de configuration principal de votre Agent (`datadog.yaml`). Consultez la [documentation de collecte des journaux de l'Agent Hôte][5] pour plus d'informations et d'exemples.
3. Une fois activé, l'Agent Datadog peut être configuré pour [suivre les fichiers journaux ou écouter les journaux envoyés par UDP/TCP][2], [filtrer les journaux ou supprimer des données sensibles][3], et [agréger des journaux multi-lignes][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/logs/advanced_log_collection/#filter-logs
[4]: /fr/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Application" %}}

1. Installez le [Datadog Agent][1].
2. Pour activer la collecte des journaux, changez `logs_enabled: false` en `logs_enabled: true` dans le fichier de configuration principal de votre Agent (`datadog.yaml`). Consultez la [documentation de collecte des journaux de l'Agent Hôte][2] pour plus d'informations et d'exemples.
3. Suivez les instructions d'installation de votre langage d'application pour configurer un logger et commencer à générer des journaux :

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Container" %}}

Choisissez un fournisseur de conteneurs ou d'orchestrateurs et suivez les instructions relatives à la collecte de logs :

{{< partial name="logs/logs-containers.html" >}}

**Remarques** :

- L'Agent Datadog peut [collecter des journaux directement à partir de stdout/stderr des conteneurs][1] sans utiliser de pilote de journalisation. Lorsque le contrôle Docker de l'Agent est activé, les métadonnées des conteneurs et de l'orchestrateur sont automatiquement ajoutées en tant que balises à vos journaux.

- Il est possible de collecter des journaux de tous vos conteneurs ou [uniquement d'un sous-ensemble filtré par image de conteneur, étiquette ou nom][2].

- L'autodécouverte peut également être utilisée pour [configurer la collecte des journaux directement dans les étiquettes de conteneur][3].

- Dans les environnements Kubernetes, vous pouvez également tirer parti de [l'installation du daemonset][4].

[1]: /fr/agent/docker/log/
[2]: /fr/agent/guide/autodiscovery-management/
[3]: /fr/agent/kubernetes/integrations/
[4]: /fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Environnement sans serveur" %}}

Utilisez le Forwarder Datadog, une fonction AWS Lambda qui envoie des journaux de votre environnement vers Datadog. Pour activer la collecte des journaux dans votre environnement sans serveur AWS, consultez la [documentation du Forwarder Datadog][1].

[1]: /fr/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/Intégration" %}}

Sélectionnez votre fournisseur de Cloud ci-dessous pour savoir comment recueillir automatiquement vos logs et les transférer à Datadog :

{{< partial name="logs/logs-cloud.html" >}}

Les intégrations Datadog et la collecte des journaux sont liées. Vous pouvez utiliser le fichier de configuration par défaut d'une intégration pour activer des [processeurs][1], [l'analyse][2] et [les facettes][3] dédiés dans Datadog. Pour commencer la collecte des journaux avec une intégration :

1. Sélectionnez une intégration sur la [page des intégrations][6] et suivez les instructions de configuration.
2. Suivez les instructions de collecte des journaux de l'intégration. Cette section explique comment décommenter la section des journaux dans le fichier `conf.yaml` de cette intégration et le configurer pour votre environnement.

## Réduisez les frais de transfert de données {#reduce-data-transfer-fees}

Utilisez [la surveillance du réseau Cloud de Datadog][7] pour identifier les applications à plus fort débit de votre organisation. Connectez-vous à Datadog via des connexions privées prises en charge et envoyez des données sur un réseau privé pour éviter l'internet public et réduire vos frais de transfert de données. Après être passé aux liens privés, utilisez les outils de [gestion des coûts cloud de Datadog][8] pour vérifier l'impact et surveiller la réduction de vos coûts cloud.

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

Pour apprendre à soumettre des journaux depuis votre vérification d'Agent personnalisée, consultez [la collecte des journaux d'intégration d'Agent][15].

[15]: /fr/logs/log_collection/agent_checks/
{{% /tab %}}
{{< /tabs >}}

## Options de configuration supplémentaires {#additional-configuration-options}

### Points de terminaison de journalisation {#logging-endpoints}

Datadog fournit des points de terminaison de journalisation pour les connexions SSL chiffrées et non chiffrées. Utilisez le point de terminaison chiffré lorsque cela est possible. L'Agent Datadog utilise le point de terminaison chiffré pour envoyer des journaux à Datadog. Plus d'informations sont disponibles dans la [documentation de sécurité de Datadog][6].

#### Points de terminaison pris en charge {#supported-endpoints}

Utilisez le menu déroulant situé à droite de la page pour sélectionner votre [site][13] Datadog et afficher les endpoints qu'il prend en charge.

| Site | Type | Point de terminaison | Port | Description |
|------|-------|----------|------|-------------|
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=http_endpoint >}}</code> | 443 | Utilisé par le forwarder personnalisé pour envoyer des journaux au format JSON ou texte brut via HTTPS. Consultez la [documentation de l'API HTTP des journaux][16]. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=agent_http_endpoint >}}</code> | 443 | Utilisé par l'Agent pour envoyer des journaux au format JSON via HTTPS. Consultez la [documentation de collecte des journaux de l'Agent Hôte][17]. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>{{< region-param key=lambda_http_endpoint >}}</code> | 443 | Utilisé par les fonctions Lambda pour envoyer des journaux au format brut, Syslog ou JSON via HTTPS. |
| {{< region-param key=dd_datacenter >}} | HTTPS | <code>logs.{{< region-param key=browser_sdk_endpoint_domain >}}</code> | 443 | Utilisé par le SDK du navigateur pour envoyer des journaux au format JSON via HTTPS. |

### Transfert de journaux personnalisé {#custom-log-forwarding}

Tout processus personnalisé ou bibliothèque de journalisation capable de transférer des journaux via **HTTP** peut être utilisé en conjonction avec Datadog Logs.

Vous pouvez envoyer des journaux à la plateforme Datadog via HTTP. Référez-vous à la [documentation de l'API HTTP des journaux de Datadog][15] pour commencer.

**Notes**:

* L'API HTTPS prend en charge des journaux de tailles allant jusqu'à 1 Mo. Cependant, pour des performances optimales, il est recommandé qu'un journal individuel ne dépasse pas 25 Ko. Si vous utilisez l'Agent Datadog pour la journalisation, il est configuré pour diviser un journal à 900 Ko (900000 octets).
* Un événement de journal ne doit pas avoir plus de 100 balises, et chaque balise ne doit pas dépasser 256 caractères pour un maximum de 10 millions de balises uniques par jour.
* Un événement de journal converti au format JSON doit contenir moins de 256 attributs. Chacune des clés de ces attributs doit comporter moins de 50 caractères, être imbriquée en moins de 20 niveaux successifs, et leur valeur respective doit être inférieure à 1024 caractères si elle est promue en tant que facette.
* Les événements de journal peuvent être soumis avec un [timestamp][14] qui remonte jusqu'à 18 heures dans le passé.

<div class="alert alert-info">
<b>Aperçu disponible</b> : Vous pouvez soumettre des journaux des 7 derniers jours, au lieu de la limite actuelle de 18 heures. <a href="https://www.datadoghq.com/product-preview/ingest-logs-up-to-7-days-old/">Inscrivez-vous pour l'Aperçu</a>.
</div>

Les événements de journal qui ne respectent pas ces limites peuvent être transformés ou tronqués par le système ou non indexés s'ils sont en dehors de la plage horaire fournie. Cependant, Datadog essaie de préserver autant de données utilisateur que possible.

Il y a une troncature supplémentaire dans les champs qui s'applique uniquement aux journaux indexés : la valeur est tronquée à 75 Ko pour le champ message et 25 Ko pour les champs non-message. Datadog stocke toujours le texte complet, et il reste visible dans les requêtes de liste régulières dans le Logs Explorer. Cependant, la version tronquée sera affichée lors de l'exécution d'une requête groupée, comme lors du regroupement des journaux par ce champ tronqué ou lors de l'exécution d'opérations similaires qui affichent ce champ spécifique.

{{% collapse-content title="TCP" level="h3" expanded=false %}}

{{% logs-tcp-disclaimer %}}


| Site | Type        | Point de terminaison                                                                  | Port         | Description                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Utilisé par l'Agent pour envoyer des journaux sans TLS.
| US   | TCP et TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Utilisé par l'Agent pour envoyer des journaux avec TLS.
| US   | TCP et TLS | `intake.logs.datadoghq.com`                                               | 443   | Utilisé par des transmetteurs personnalisés pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL.                                                                 |
| US   | TCP et TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Utilisé par les fonctions Azure pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL. **Remarque** : Ce point de terminaison peut être utile avec d'autres fournisseurs de cloud. |
| US   | TCP et TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | Utilisé par les fonctions Lambda pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL.                                                                  |
| EU   | TCP et TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | Utilisé par l'Agent pour envoyer des journaux au format protobuf via une connexion TCP chiffrée SSL.                                                                                     |
| UE   | TCP et TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Utilisé par les fonctions Azure pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL. **Remarque** : Ce point de terminaison peut être utile avec d'autres fournisseurs de cloud. |
| UE   | TCP et TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | Utilisé par les fonctions Lambda pour envoyer des journaux au format brut, Syslog ou JSON via une connexion TCP chiffrée SSL.                                                                  |

{{% /collapse-content %}}

### Attributs et balises {#attributes-and-tags}

Les attributs définissent [les facettes des journaux][9], utilisés pour filtrer et rechercher dans l'Explorateur de journaux. Consultez la documentation dédiée [aux attributs et à l'aliasing][10] pour consulter la liste des attributs réservés et standards et pour apprendre à appliquer une convention de nommage pour les attributs de journaux et l'aliasing.

#### Attributs pour les traces de pile {#attributes-for-stack-traces}

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom du logger, le thread actuel, le type d'erreur et la trace de pile.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Attributs pour une trace de pile analysée" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Nom du logger                                                      |
| `logger.thread_name` | Nom du thread actuel                                              |
| `error.stack`        | Trace de pile actuelle                                                      |
| `error.message`      | Message d'erreur contenu dans la trace de pile                              |
| `error.kind`         | Le type ou la catégorie d'une erreur (par exemple, "Exception" ou "OSError") |

**Remarque** : Par défaut, les pipelines d'intégration tentent de remapper les paramètres de la bibliothèque de journalisation par défaut sur ces attributs spécifiques et d'analyser les traces de pile ou le traceback pour extraire automatiquement le `error.message` et le `error.kind`.

Pour en savoir plus, consultez la [documentation relative aux attributs de code source][11].

## Prochaines étapes {#next-steps}

Une fois les journaux collectés et ingérés, ils sont disponibles dans **l'Explorateur de journaux**. L'Explorateur de journaux est l'endroit où vous pouvez rechercher, enrichir et visualiser des alertes sur vos journaux. Consultez la documentation de [l'Explorateur de journaux][12] pour commencer à analyser vos données de journaux, ou consultez la documentation supplémentaire sur la gestion des journaux ci-dessous.

{{< img src="logs/explore.png" alt="Journaux apparaissant dans l'Explorateur de journaux" style="width:100%" >}}

## Lectures complémentaires {#further-reading}

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