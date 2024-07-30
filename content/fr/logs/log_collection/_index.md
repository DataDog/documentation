---
aliases:
- /fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
- /fr/logs/languages
- /fr/integrations/windows_event_log/
description: Configurez votre environnement pour rassembler les logs de votre host,
  de vos conteneurs et de vos services.
further_reading:
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: Blog
  text: Comment gérer des fichiers de log avec Logrotate
- link: /agent/logs/advanced_log_collection
  tag: Documentation
  text: Configurations avancées pour la collecte de logs
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

## Présentation

Choisissez une option de configuration ci-dessous pour commencer à ingérer vos logs. Si vous utilisez déjà un daemon log shipper, consultez la documentation dédiée pour [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] ou [Logstash][5].

Consultez la [liste des endpoints de collecte de logs Datadog](#endpoints-de-journalisation) si vous souhaitez envoyer vos logs directement à Datadog.

**Remarque** : lorsque vous envoyez des logs au format JSON à Datadog, certains attributs sont réservés et possèdent une signification particulière dans Datadog. Consultez la [section sur les attributs réservés](#attributs-et-tags) pour en savoir plus.

## Implémentation

{{< tabs >}}
{{% tab "Host" %}}

1. Installez l'[Agent Datadog][1].
2. Pour activer la collecte de logs, remplacez `logs_enabled: false` par `logs_enabled: true` dans le principal fichier de configuration de votre Agent (`datadog.yaml`). Consultez la section [Collecte de logs de l'Agent de host][5] pour obtenir plus de détails et d'exemples.
3. Une fois la collecte activée, vous pouvez configurer l'Agent Datadog afin de [suivre les fichiers de log ou de détecter les logs envoyés via UDP/TCP][2], de [filtrer les logs ou de nettoyer les données sensibles][3] et d'[agréger les logs multiligne][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/logs/advanced_log_collection/#filter-logs
[4]: /fr/agent/logs/advanced_log_collection/#multi-line-aggregation
[5]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Application" %}}

1. Installez l'[Agent Datadog][1].
2. Pour activer la collecte de logs, remplacez `logs_enabled: false` par `logs_enabled: true` dans le fichier de configuration principal de votre Agent (`datadog.yaml`). Consultez la section [Collecte de logs de l'Agent de host][2] pour obtenir plus de détails et d'exemples.
3. Suivez les instructions d'installation correspondant au langage de votre application pour configurer un logger et commencer à générer des logs :

{{< partial name="logs/logs-languages.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Conteneur" %}}

Choisissez un fournisseur de conteneurs ou d'orchestrateurs et suivez les instructions relatives à la collecte de logs :

{{< partial name="logs/logs-containers.html" >}}

**Remarques** :

- L'Agent Datadog peut [recueillir des logs directement à partir du stdout/stderr des conteneurs][21] sans utiliser de pilote de log. Lorsque le check Docker de l'Agent est activé, les métadonnées relatives aux conteneurs et orchestrateurs sont automatiquement ajoutées à vos logs en tant que tags.

- Il est possible de recueillir les logs pour l'ensemble de vos conteneurs ou [uniquement ceux d'un sous-ensemble filtré par image, étiquette ou nom de conteneur][2].

- Grâce à Autodiscovery, vous pouvez également [configurer la collecte de logs directement dans les étiquettes de conteneur][3].

- Dans les environnements Kubernetes, vous pouvez également tirer parti de [l'installation de Daemonset][4].

[1]: /fr/agent/docker/log/
[2]: /fr/agent/guide/autodiscovery-management/
[3]: /fr/agent/kubernetes/integrations/
[4]: /fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Environnement sans serveur" %}}

Utilisez le Forwarder Datadog, une fonction AWS Lambda qui transmet des logs à Datadog depuis votre environnement. Pour activer la collecte de logs dans votre environnement AWS sans serveur, consultez la section [Forwarder Datadog][1].

[1]: /fr/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/integration" %}}

Sélectionnez votre fournisseur de Cloud ci-dessous pour savoir comment recueillir automatiquement vos logs et les transférer à Datadog :

{{< partial name="logs/logs-cloud.html" >}}

Les intégrations Datadog et la collecte de logs sont liées. Vous pouvez utiliser un fichier de configuration d'intégration par défaut pour activer les [processeurs][1], le [parsing][2] et les [facettes][3] dans Datadog. Pour commencer à recueillir des logs avec une intégration, procédez comme suit :

1. Sélectionnez une intégration depuis la [page Integrations][6] et suivez les instructions de configuration.
2. Suivez les instructions de l'intégration concernant la collecte de logs. Cette section décrit comment supprimer la mise en commentaire de la section logs du fichier `conf.yaml` de l'intégration en question et comment la configurer pour votre environnement.

[1]: /fr/logs/log_configuration/processors
[2]: /fr/logs/log_configuration/parsing
[3]: /fr/logs/explorer/facets/
[4]: /fr/agent/kubernetes/log/#autodiscovery
[5]: /fr/agent/docker/log/#log-integrations
[6]: /fr/integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## Options de configuration supplémentaires

### Endpoints de journalisation

Datadog fournit des endpoints de journalisation pour les connexions avec chiffrement SSL et les connexions non chiffrées. Utilisez l'endpoint chiffré tant que vous le pouvez. L'Agent Datadog utilise l'endpoint chiffré pour envoyer des logs à Datadog. Pour en savoir plus, consultez la [documentation sur la sécurité de Datadog][6].

#### Endpoints pris en charge

Utilisez le menu déroulant situé à droite de la page pour sélectionner votre [site][13] Datadog et afficher les endpoints qu'il prend en charge.

{{< site-region region="us" >}}

| Site | Type        | Endpoint                                                                  | Port         | Description                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US   | HTTPS       | `http-intake.logs.datadoghq.com`                                          | 443   | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation relative à l'API Logs HTTP][1].                                                    |
| US   | HTTPS       | `agent-http-intake-pci.logs.datadoghq.com`                                | 443   | Utilisé par l'Agent pour envoyer des logs via HTTPS à une organisation pour laquelle la conformité PCI DSS est activée. Consultez la section [Conformité PCI DSS pour Log Management][3] pour en savoir plus.                 |
| US   | HTTPS       | `agent-http-intake.logs.datadoghq.com`                                    | 443   | Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [section Collecte de logs de l'Agent de host][2].                                                             |
| US   | HTTPS       | `lambda-http-intake.logs.datadoghq.com`                                   | 443   | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                                                                            |
| US   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443   | Utilisé par le SDK Browser pour envoyer des logs au format JSON via HTTPS.                                                                                                             |
| US   | TCP         | `agent-intake.logs.datadoghq.com`                                         | 10514 | Utilisé par l'Agent pour envoyer les logs sans TLS.
| US   | TCP et TLS | `agent-intake.logs.datadoghq.com`                                         | 10516 | Utilisé par l'Agent pour envoyer les logs via TLS.
| US   | TCP et TLS | `intake.logs.datadoghq.com`                                               | 443   | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                 |
| US   | TCP et TLS | `functions-intake.logs.datadoghq.com`                                     | 443   | Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL. **Remarque** : cet endpoint peut servir pour d'autres fournisseurs de cloud. |
| US   | TCP et TLS | `lambda-intake.logs.datadoghq.com`                                        | 443   | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                  |

[1]: /fr/api/latest/logs/#send-logs
[2]: /fr/agent/logs/#send-logs-over-https
[3]: /fr/data_security/logs/#pci-dss-compliance-for-log-management
{{< /site-region >}}

{{< site-region region="eu" >}}

| Site | Type        | Endpoint                                                                  | Port | Description                                                                                                                                                                 |
|------|-------------|---------------------------------------------------------------------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Union européenne   | HTTPS       | `http-intake.logs.datadoghq.eu`                                           | 443  | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation relative à l'API Logs HTTP][1].                                                    |
| Union européenne   | HTTPS       | `agent-http-intake.logs.datadoghq.eu`                                     | 443  | Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [section Collecte de logs de l'Agent de host][2].                                                             |
| Union européenne   | HTTPS       | `lambda-http-intake.logs.datadoghq.eu`                                    | 443  | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                                                                            |
| Union européenne   | HTTPS       | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilisé par le SDK Browser pour envoyer des logs au format JSON via HTTPS.                                                                                                             |
| Union européenne   | TCP et TLS | `agent-intake.logs.datadoghq.eu`                                          | 443  | Utilisé par l'Agent pour envoyer des logs au format protobuf via une connexion TCP avec chiffrement SSL.                                                                                     |
| Union européenne   | TCP et TLS | `functions-intake.logs.datadoghq.eu`                                      | 443  | Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL. **Remarque** : cet endpoint peut servir pour d'autres fournisseurs de cloud. |
| Union européenne   | TCP et TLS | `lambda-intake.logs.datadoghq.eu`                                         | 443  | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                  |

[1]: /fr/api/latest/logs/#send-logs
[2]: /fr/agent/logs/#send-logs-over-https
{{< /site-region >}}

{{< site-region region="us3" >}}

| Site | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|------|-------|---------------------------------------------                              |------|--------------------------------------------------------------------------------------------------------------------------|
| US3  | HTTPS | `http-intake.logs.us3.datadoghq.com`                                      | 443  | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation relative à l'API Logs HTTP][1]. |
| US3  | HTTPS | `lambda-http-intake.logs.us3.datadoghq.com`                               | 443  | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                         |
| US3  | HTTPS | `agent-http-intake.logs.us3.datadoghq.com`                                | 443  | Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [section Collecte de logs de l'Agent de host][2].          |
| US3  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilisé par le SDK Browser pour envoyer des logs au format JSON via HTTPS.                                                          |

[1]: /fr/api/latest/logs/#send-logs
[2]: /fr/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="us5" >}}

| Site | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US5  | HTTPS | `http-intake.logs.us5.datadoghq.com`                                      | 443  | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation relative à l'API Logs HTTP][1]. |
| US5  | HTTPS | `lambda-http-intake.logs.us5.datadoghq.com`                               | 443  | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                         |
| US5  | HTTPS | `agent-http-intake.logs.us5.datadoghq.com`                                | 443  | Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [section Collecte de logs de l'Agent de host][2].          |
| US5  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilisé par le SDK Browser pour envoyer des logs au format JSON via HTTPS.                                                          |

[1]: /fr/api/latest/logs/#send-logs
[2]: /fr/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="ap1" >}}

| Site | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US5  | HTTPS | `http-intake.logs.ap1.datadoghq.com`                                      | 443  | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation relative à l'API Logs HTTP][1]. |
| US5  | HTTPS | `lambda-http-intake.logs.ap1.datadoghq.com`                               | 443  | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                         |
| US5  | HTTPS | `agent-http-intake.logs.ap1.datadoghq.com`                                | 443  | Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [section Collecte de logs de l'Agent de host][2].          |
| US5  | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilisé par le SDK Browser pour envoyer des logs au format JSON via HTTPS.                                                          |

[1]: /fr/api/latest/logs/#send-logs
[2]: /fr/agent/logs/#send-logs-over-https

{{< /site-region >}}

{{< site-region region="gov" >}}

| Site    | Type  | Endpoint                                                                  | Port | Description                                                                                                              |
|---------|-------|---------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------|
| US1-FED | HTTPS | `http-intake.logs.ddog-gov.com`                                          | 443  | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation relative à l'API Logs HTTP][1]. |
| US1-FED | HTTPS | `lambda-http-intake.logs.ddog-gov.datadoghq.com`                          | 443  | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                         |
| US1-FED | HTTPS | `agent-http-intake.logs.ddog-gov.datadoghq.com`                           | 443  | Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [section Collecte de logs de l'Agent de host][2].          |
| US1-FED | HTTPS | `logs.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}} | 443  | Utilisé par le SDK Browser pour envoyer des logs au format JSON via HTTPS.                                                          |

[1]: /fr/api/latest/logs/#send-logs
[2]: /fr/agent/logs/#send-logs-over-https

{{< /site-region >}}

### Transmission personnalisée de logs

Vous pouvez utiliser un processus ou une bibliothèque de journalisation personnalisé(e) capable de transmettre des logs via **TCP** ou **HTTP** pour gérer vos logs Datadog.

{{< tabs >}}
{{% tab "HTTP" %}}

Vous pouvez envoyer des logs à la plateforme Datadog via HTTP. Consultez la [documentation sur l'API de log HTTP de Datadog][1] pour en savoir plus.

[1]: /fr/api/latest/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

Vous pouvez tester manuellement votre connexion avec OpenSSL, GnuTLS ou un autre client SSL/TLS. Pour GnuTLS, exécutez la commande suivante :

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

Pour OpenSSL, exécutez la commande suivante :

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log, puis ajouter une charge utile.

```
<CLÉ_API_DATADOG> Log sent directly using TLS
```

Votre charge utile, `Log sent directly using TLS` dans cet exemple, peut être au format brut, Syslog ou JSON. Si votre charge utile est au format JSON, Datadog parse automatiquement ses attributs.

```text
<CLÉ_API_DATADOG> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}

[1]: /fr/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="eu" >}}

Vous pouvez tester manuellement votre connexion avec OpenSSL, GnuTLS ou un autre client SSL/TLS. Pour GnuTLS, exécutez la commande suivante :

```shell
gnutls-cli tcp-intake.logs.datadoghq.eu:443
```

Pour OpenSSL, exécutez la commande suivante :

```shell
openssl s_client -connect tcp-intake.logs.datadoghq.eu:443
```

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log, puis ajouter une charge utile.

```
<CLÉ_API_DATADOG> Log sent directly using TLS
```

Votre charge utile, `Log sent directly using TLS` dans cet exemple, peut être au format brut, Syslog ou JSON. Si votre charge utile est au format JSON, Datadog parse automatiquement ses attributs.

```text
<CLÉ_API_DATADOG> {"message":"json formatted log", "ddtags":"env:my-env,user:my-user", "ddsource":"my-integration", "hostname":"my-hostname", "service":"my-service"}
```

[1]: /fr/account_management/api-app-keys/#api-keys

{{< /site-region >}}

{{< site-region region="us3" >}}
Il n'est pas recommandé d'utiliser l'endpoint TCP pour ce site. Contactez l'[assistance][1] pour en savoir plus.

[1]: /fr/help
{{< /site-region >}}

{{< site-region region="gov,us5,ap1" >}}

L'endpoint TCP n'est pas pris en charge par ce site.

[1]: /fr/help
{{< /site-region >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**Remarques** :

* L'API HTTPS prend en charge les logs d'une taille maximale de 1 Mo. Toutefois, pour obtenir des performances optimales, il est recommandé que chaque log ne dépasse pas 25 Ko. Si vous utilisez l'Agent Datadog pour générer des logs, il est configuré pour créer un nouveau log dès que le précédent atteint 256 Ko (256 000 octets).
* Un événement de log ne doit pas comporter plus de 100 tags, et chaque tag ne doit pas dépasser 256 caractères pour un maximum de 10 millions de tags uniques par jour.
* Les événements de log convertis au format JSON doivent contenir moins de 256 attributs. Les clés de chacun de ces attributs doivent être inférieures à 50 caractères, être imbriquées dans moins de 10 niveaux successifs, et leur valeur respective doit être inférieure à 1 024 caractères si elle est présentée en tant que facette.
* Les événements de log peuvent être envoyés avec un [timestamp][14] jusqu'à 18 h dans le passé.

Les événements de log qui ne respectent pas ces limitations sont susceptibles d'être modifiés ou tronqués par le système. Ils peuvent aussi ne pas être indexés s'ils sont envoyés en dehors de l'intervalle de temps spécifié. Toutefois, Datadog s'efforce de préserver autant de données utilisateur que possible.

### Attributs et tags

Les attributs déterminent les [facettes des logs][9] qui servent à filtrer le Log Explorer et à y effectuer des recherches. Pour obtenir la liste des attributs standard et réservés et pour en savoir plus sur la mise en place d'une convention de nommage avec les attributs et les alias de log, consultez la documentation relative aux [attributs et aux alias][10].

#### Attributs pour les stack traces

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom du logger, le thread actuel, le type d'erreur et la stack trace.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Attributs d'une stack trace parsée" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                             |
|----------------------|-------------------------------------------------------------------------|
| `logger.name`        | Le nom du logger                                                      |
| `logger.thread_name` | Le nom du thread actuel                                              |
| `error.stack`        | La stack trace réelle                                                      |
| `error.message`      | Le message d'erreur contenu dans la stack trace                              |
| `error.kind`         | Le type d'erreur (par exemple, « Exception » ou « OSError ») |

**Remarque** : par défaut, les pipelines des intégrations tentent de remapper les paramètres par défaut de la bibliothèque de création de logs sur ces attributs spécifiques et parsent les stack traces ou tracebacks afin d'extraire automatiquement `error.message` et `error.kind`.

Pour en savoir plus, consultez la [documentation relative aux attributs de code source][11].

## Étapes suivantes

Une fois les logs recueillis et ingérés, ils sont disponibles dans le **Log Explorer**. Depuis cette vue, vous pouvez rechercher, enrichir et visualiser des alertes sur vos logs. Référez-vous à la [documentation relative au Log Explorer][12] pour commencer à analyser vos données de log, ou consultez les sections supplémentaires ci-dessous sur la gestion des logs.

{{< img src="logs/explore.png" alt="Logs visibles dans le Log Explorer" style="width:100%" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


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