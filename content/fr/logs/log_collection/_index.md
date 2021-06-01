---
title: Collecte de logs et intégrations
kind: Documentation
description: 'Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
aliases:
  - /fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /fr/logs/languages
  - /fr/integrations/windows_event_log/
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: /logs/processing/parsing/
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
---
## Présentation

Choisissez une option de configuration ci-dessous pour commencer à ingérer vos logs. Si vous utilisez déjà un daemon log shipper, consultez la documentation dédiée pour [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4] ou [Logstash][5].

Consultez la [liste des endpoints de collecte de logs Datadog](#endpoints-de-journalisation) si vous souhaitez envoyer vos logs directement à Datadog.

**Remarque** : lorsque vous envoyez des logs au format JSON à Datadog, certains attributs sont réservés et possèdent une signification particulière dans Datadog. Consultez la [section sur les attributs réservés](#attributs-et-tags) pour en savoir plus.

## Configuration

{{< tabs >}}
{{% tab "Host" %}}

Suivez les [instructions d'installation de l'Agent Datadog][1] pour commencer à transmettre des logs avec vos métriques et vos traces. L'Agent peut [suivre des fichiers de log][2] ou [écouter les logs envoyés via UDP/TCP][2]. Vous pouvez également le configurer de façon à [exclure des logs][3], [nettoyer les données sensibles][3] ou agréger des [logs multilignes][4].


[1]: /fr/agent/logs/
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/logs/advanced_log_collection/#filter-logs
[4]: /fr/agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}

{{% tab "Application" %}}

Après avoir [activé la collecte de logs][1], configurez le langage de votre application pour générer des logs :

{{< partial name="logs/logs-languages.html" >}}

**Remarque** : la journalisation au format JSON facilite la gestion des logs d'application multilignes. Les logs au format JSON sont automatiquement parsés par Datadog. Si vous pouvez choisir le format des logs envoyés à Datadog, nous vous conseillons donc d'opter pour ce format : vous n'aurez pas besoin de créer de règles de parsing personnalisées.


[1]: /fr/agent/logs/
{{% /tab %}}

{{% tab "Conteneur" %}}

L'Agent Datadog peut [recueillir des logs directement à partir des flux stdout/stderr du conteneur][1] sans utiliser de pilote de log. Lorsque le check Docker de l'Agent est activé, les métadonnées du conteneur et de l'orchestrateur sont automatiquement ajoutées à vos logs en tant que tags.
Il est possible de recueillir les logs de tous vos conteneurs ou [d'un sous-ensemble filtré selon un nom, une étiquette ou une image de conteneur][2]. Autodiscovery peut également être utilisé pour [configurer la collecte de logs directement dans les étiquettes de conteneur][3]. Dans les environnements Kubernetes, vous pouvez aussi tirer parti de [l'installation via un DaemonSet][4].

Choisissez votre environnement ci-dessous pour obtenir des instructions sur la collecte de logs :

{{< partial name="logs/logs-containers.html" >}}


[1]: /fr/agent/docker/log/
[2]: /fr/agent/guide/autodiscovery-management/
[3]: /fr/agent/kubernetes/integrations/
[4]: /fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
{{% /tab %}}

{{% tab "Environnement sans serveur" %}}

Datadog recueille des logs depuis AWS Lambda. Pour activer cette fonctionnalité, consultez la [documentation sur la surveillance sans serveur][1].


[1]: /fr/serverless/forwarder
{{% /tab %}}

{{% tab "Cloud/integration" %}}

Sélectionnez votre fournisseur de Cloud ci-dessous pour savoir comment recueillir automatiquement vos logs et les transférer à Datadog :

{{< partial name="logs/logs-cloud.html" >}}

Les intégrations Datadog et la collecte de logs sont liées. Utilisez un fichier de configuration d'intégration par défaut pour activer son [traitement][1], son [parsing][2] et ses [facettes][3] dans Datadog.

Consultez la [liste des intégrations prises en charge et disponibles][4].


[1]: /fr/logs/processing/
[2]: /fr/logs/processing/parsing/
[3]: /fr/logs/explorer/facets/
[4]: /fr/integrations/#cat-log-collection
{{% /tab %}}
{{< /tabs >}}

## Options de configuration supplémentaires

### Endpoints de journalisation

Datadog fournit des endpoints de journalisation pour les connexions avec chiffrement SSL et les connexions non chiffrées. Utilisez l'endpoint chiffré tant que vous le pouvez. L'Agent Datadog utilise l'endpoint chiffré pour envoyer des logs à Datadog. Pour en savoir plus, consultez la [documentation sur la sécurité de Datadog][6].

Les endpoints suivants peuvent être utilisés pour envoyer des logs à Datadog, via des connexions avec un chiffrement SSL :


`{{< region-param key="tcp_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="tcp_endpoint_port" code="true" >}}` <br>
Utilisé par l'Agent pour envoyer des logs au format protobuf via une connexion TCP avec un chiffrement SSL.

`{{< region-param key="agent_http_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="agent_http_port" code="true" >}}`<br>
Utilisé par l'Agent pour envoyer des logs au format JSON via HTTPS. Consultez la [documentation sur l'envoi de logs via HTTP][7].

`{{< region-param key="http_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="http_port" code="true" >}}`<br>
Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la [documentation sur l'envoi de logs via HTTP][7].

`{{< region-param key="web_integrations_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="web_integrations_port" code="true" >}}`<br>
Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec un chiffrement SSL.

`{{< region-param key="lambda_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="lambda_port" code="true" >}}`<br>
Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec un chiffrement SSL.

`{{< region-param key="lambda_http_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="lambda_http_port" code="true" >}}`<br>
Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.

`{{< region-param key="functions_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="functions_port" code="true" >}}`<br>
Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec un chiffrement SSL. **Remarque** : cet endpoint peut servir pour d'autres fournisseurs de cloud.

L'endpoint suivant peut être utilisé pour envoyer des logs à Datadog, via une connexion sans chiffrement :

`{{< region-param key="web_integrations_endpoint" code="true" >}}`
: **Port** : `{{< region-param key="web_integrations_unencrypted_port" code="true" >}}`<br>
Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP non chiffrée.

### Transmission personnalisée de logs

Vous pouvez utiliser un processus ou une bibliothèque de journalisation personnalisé(e) capable de transmettre des logs via **TCP** ou **HTTP** pour gérer vos logs Datadog.

{{< tabs >}}
{{% tab "HTTP" %}}

Vous pouvez envoyer des logs à la plateforme Datadog via HTTP. Consultez la [documentation sur l'API de log HTTP de Datadog][1] pour en savoir plus.


[1]: /fr/api/v1/logs/#send-logs
{{% /tab %}}
{{% tab "TCP" %}}

{{< site-region region="us" >}}

L'endpoint TCP sécurisé est `intake.logs.datadoghq.com 10516` (utilisez le port `10514` pour les connexions non sécurisées).

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log. Par exemple :

```text
<CLÉ_API_DATADOG> <CHARGEUTILE>
```

**Remarque** : `<CHARGEUTILE>` peut être au format brut, Syslog ou JSON.

Testez votre charge utile manuellement avec telnet. Exemple de `<CHARGEUTILE>` au format brut :

```text
telnet intake.logs.datadoghq.com 10514
<CLÉ_API_DATADOG> Log envoyé directement via TCP
```

Vous obtenez alors le résultat suivant sur votre [page Live Tail][2] :

{{< img src="logs/custom_log_telnet.png" alt="Telnet personnalisé" style="width:70%;">}}

Si votre `<CHARGEUTILE>` est au format JSON, Datadog se charge de parser automatiquement ses attributs :

```text
telnet intake.logs.datadoghq.com 10514 
<CLÉ_API_DATADOG> {"message":"log au format json", "ddtags":"env:mon-env,user:mon-utilisateur", "ddsource":"mon-intégration", "hostname":"mon-hostname", "service":"mon-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Telnet personnalisé" style="width:100%;">}}


{{< /site-region >}}

{{< site-region region="eu" >}}

L'endpoint TCP sécurisé est `tcp-intake.logs.datadoghq.eu 443` (utilisez le port `1883` pour les connexions non sécurisées).

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log. Par exemple :

```text
<CLÉ_API_DATADOG> <CHARGEUTILE>
```

**Remarque** : `<CHARGEUTILE>` peut être au format brut, Syslog ou JSON.

Testez votre charge utile manuellement avec telnet. Exemple de `<CHARGEUTILE>` au format brut :

```text
telnet tcp-intake.logs.datadoghq.eu 443
<CLÉ_API_DATADOG> Log envoyé directement via TCP
```

Vous obtenez alors le résultat suivant sur votre [page Live Tail][2] :

{{< img src="logs/custom_log_telnet.png" alt="Telnet personnalisé" style="width:70%;">}}

Si votre `<CHARGEUTILE>` est au format JSON, Datadog se charge de parser automatiquement ses attributs :

```text
telnet tcp-intake.logs.datadoghq.eu 1883
<CLÉ_API_DATADOG> {"message":"log au format json", "ddtags":"env:mon-env,user:mon-utilisateur", "ddsource":"mon-intégration", "hostname":"mon-hostname", "service":"mon-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Telnet personnalisé" style="width:100%;">}}

{{< /site-region >}}

{{< site-region region="us3,gov" >}}
Un endpoint TCP n'est pas pris en charge pour cette région.
{{< /site-region >}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{< /tabs >}}

**Remarques** :

* Pour des performances optimales, Datadog vous conseille de limiter la taille d'un événement de log à 25 000 octets. Lorsque l'Agent Datadog est utilisé, les événements de log de plus de 256 Ko sont divisés en plusieurs entrées. Si vous utilisez directement l'API TCP ou HTTP de Datadog, la taille maximale d'un événement de log est de 1 Mo.
* Un événement de log ne doit pas comporter plus de 100 tags, et chaque tag ne doit pas dépasser 256 caractères pour un maximum de 10 millions de tags uniques par jour.
* Les événements de log convertis au format JSON doivent contenir moins de 256 attributs. Les clés de chacun de ces attributs doit être inférieure à 50 caractères, être imbriquée dans moins de 10 niveaux successifs, et leur valeur respective doit être inférieure à 1 024 caractères si elle est présentée en tant que facette.
* Les événements de log peuvent être envoyés jusqu'à 18 h avant ou 2 h après la réalisation de l'événement.

Les événements de log qui ne respectent pas ces limitations sont susceptibles d'être modifiés ou tronqués par le système. Ils peuvent aussi ne pas être indexés s'ils sont envoyés en dehors de l'intervalle de temps spécifié. Toutefois, Datadog s'efforce de préserver autant de données utilisateur que possible.

### Attributs et tags

Les attributs déterminent les [facettes des logs][8], qui servent à filtrer et à effectuer des recherches dans le Log Explorer. Reportez-vous à la documentation sur les [attributs et les alias][9] pour obtenir la liste des attributs standard et réservés, et pour en savoir plus sur la prise en charge d'une convention de nommage avec les attributs et les alias de logs.

#### Attributs pour les stack traces

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom du logger, le thread actuel, le type d'erreur et la stack trace.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Stack trace"  >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | Le nom du logger                                               |
| `logger.thread_name` | Le nom du thread actuel                                       |
| `error.stack`        | La stack trace réelle                                               |
| `error.message`      | Le message d'erreur contenu dans la stack trace                       |
| `error.kind`         | Le type d'erreur (comme « Exception », « OSError », etc.) |

**Remarque** : par défaut, les pipelines des intégrations tentent de remapper les paramètres par défaut de la bibliothèque de création de logs sur ces attributs spécifiques et parsent les stack traces ou tracebacks afin d'extraire automatiquement `error.message` et `error.kind`.

Pour en savoir plus, consultez la [documentation complète relative aux attributs de code source][10].

## Étapes suivantes

Une fois les logs recueillis et ingérés, ils sont disponibles dans le **Log Explorer**. Depuis cette vue, vous pouvez rechercher, enrichir et visualiser des alertes sur vos logs. Référez-vous à la [documentation relative au Log Explorer][11] pour commencer à analyser vos données de log, ou consultez les sections supplémentaires ci-dessous sur la gestion des logs.

{{< img src="logs/log_explorer_view.png" alt="Vue Log Explorer"  >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/integrations/rsyslog/
[2]: /fr/integrations/syslog_ng/
[3]: /fr/integrations/nxlog/
[4]: /fr/integrations/fluentd/#log-collection
[5]: /fr/integrations/logstash/#log-collection
[6]: /fr/security/logs/#information-security
[7]: /fr/agent/logs/#send-logs-over-https
[8]: /fr/logs/explorer/facets/
[9]: /fr/logs/processing/attributes_naming_convention
[10]: /fr/logs/processing/attributes_naming_convention/#source-code
[11]: /fr/logs/explore/