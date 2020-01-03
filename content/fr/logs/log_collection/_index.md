---
title: Collecte de logs et intégrations
kind: Documentation
description: 'Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
aliases:
  - /fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
  - /fr/logs/languages
  - /fr/integrations/windows_event_log/
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/live_tail
    tag: Documentation
    text: Fonctionnalité Live Tail de Datadog
  - link: logs/explorer
    tag: Documentation
    text: Découvrir comment explorer vos logs
  - link: logs/logging_without_limits
    tag: Documentation
    text: Collecte illimitée de logs
---
Suivez les [instructions d'installation de l'Agent Datadog][1] pour commencer à transférer des logs avec vos métriques et vos traces. L'Agent peut [suivre des fichiers de log][2] ou [effecuter une écoute afin d'identifier des logs envoyés via UDP/TCP][3]. Vous pouvez également le configurer de façon à [exclure des logs][4], [nettoyer les données sensibles][5] ou agréger des [logs multilignes][6]. Enfin, choisissez le langage de votre application ci-dessous afin d'obtenir les meilleures pratiques dédiées à la journalisation.
Si vous utilisez déjà un daemon log-shipper, consultez la documentation relative à [Rsyslog][7], [Syslog-ng][8], [NXlog][9], [FluentD][10], et [Logstash][11].

La gestion de logs Datadog contient également un ensemble de solutions intégré pour recueillir vos logs et les envoyer vers Datadog :

* [**Recueillir des logs depuis vos hosts**][12].
* [**Recueillir des logs depuis vos applications**](?tab=ussite#application-log-collection).
* [**Recueillir des logs depuis un environnement docker**](?tab=ussite#collecte-de-logs-depuis-un-conteneur).
* [**Recueillir des logs depuis un environnement sans serveur**](?tab=ussite#collecte-de-logs-depuis-un-environnement-sans-serveur).
* [**Recueillir des logs depuis votre fournisseur de Cloud**](?tab=ussite#collecte-de-logs-depuis-un-fournisseur-de-cloud).

Les intégrations Datadog et la collecte de logs sont liées. Utilisez un fichier de configuration d'intégration par défaut pour activer son [processing][13], son [parsing][14] et ses [facettes][15] dans Datadog.

<div class="alert alert-warning">
<a href="/integrations/#collecte-de-logs-cat">Consultez la liste actuelle des intégrations prises en charge disponibles</a>.
</div>

Vous trouverez en bas de cette page la [liste des endpoints de collecte de logs Datadog disponibles](#endpoints-de-logs-datadog) si vous souhaitez envoyer vos logs directement à Datadog.

**Remarque** : lorsque vous envoyez des logs au format JSON à Datadog, certains attributs sont réservés et se comportent de façon spécifique dans Datadog. Consultez la [section Attributs réservés](#attributs-reserves) pour en savoir plus.

## Collecte de logs depuis une application

Après avoir [activé la collecte de logs][1], configurez le langage de votre application pour générer des logs :

{{< partial name="logs/logs-languages.html" >}}

## Collecte de logs depuis un conteneur

L'Agent Datadog peut [recueillir des logs directement à partir des flux stdout/stderr du conteneur][16] sans utiliser de pilote de log. Lorsque le check Docker de l'Agent est activé, les métadonnées du conteneur et de l'orchestrateur sont automatiquement ajoutées à vos logs en tant que tags.
Il est possible de recueillir les logs de tous vos conteneurs ou [d'un sous-ensemble filtré selon une image de conteneur, une étiquette ou un nom][17]. Autodiscovery peut également être utilisé pour [configurer la collecte de logs directement dans les étiquettes de conteneur][18]. Dans les environnements Kubernetes, vous pouvez également tirer parti de [l'installation via un DaemonSet][19].

Choisissez votre environnement ci-dessous pour obtenir des instructions sur la collecte de logs :

{{< partial name="logs/logs-containers.html" >}}

## Collecte de logs depuis un environnement sans serveur

Datadog peut recueillir des logs depuis AWS Lambda. Pour activer cette fonctionnalité, consultez la [documentation sur l'intégration AWS Lambda][20].

## Collecte de logs depuis un fournisseur de Cloud

Sélectionnez votre fournisseur de Cloud ci-dessous pour savoir comment recueillir automatiquement vos logs et les transférer à Datadog :

{{< partial name="logs/logs-cloud.html" >}}

## Redirecteur de logs personnalisé

Vous pouvez utiliser un processus ou une [bibliothèque de journalisation][21] personnalisé(e) capable de transmettre des logs via **TCP** ou **HTTP** pour gérer vos logs Datadog. Choisissez ci-dessous le site Datadog vers lequel vous souhaitez transférer vos logs :

{{< tabs >}}
{{% tab "TCP (site américain)" %}}

L'endpoint TCP sécurisé est `intake.logs.datadoghq.com:10516` (utilisez le port `10514` pour les connexions non sécurisées).

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log. Par exemple :

```
<CLÉ_API_DATADOG> <CHARGEUTILE>
```

**Remarque** : `<CHARGEUTILE>` peut être au format brut, Syslog ou JSON.

Testez votre charge utile manuellement avec telnet. Exemple de `<CHARGEUTILE>` au format brut :

```
telnet intake.logs.datadoghq.com 10514
<CLÉ_API_DATADOG> Log envoyé directement via TCP
```

Vous obtenez alors le résultat suivant sur votre [page Live Tail][2] :

{{< img src="logs/custom_log_telnet.png" alt="Telnet personnalisé" responsive="true" style="width:70%;">}}

Si votre `<CHARGEUTILE>` est au format JSON, Datadog se charge de parser automatiquement ses attributs :

```
telnet intake.logs.datadoghq.com 10514 
<CLÉ_API_DATADOG> {"message":"log au format json", "ddtags":"env:mon-env,user:mon-utilisateur", "ddsource":"mon-intégration", "hostname":"mon-hostname", "service":"mon-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Telnet personnalisé" responsive="true" style="width:100%;">}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{% tab "TCP (site européen)" %}}

L'endpoint TCP sécurisé est `tcp-intake.logs.datadoghq.eu:443` (utilisez le port `1883` pour les connexions non sécurisées).

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log. Par exemple :

```
<CLÉ_API_DATADOG> <CHARGEUTILE>
```

**Remarque** : `<CHARGEUTILE>` peut être au format brut, Syslog ou JSON.

Testez votre charge utile manuellement avec telnet. Exemple de `<CHARGEUTILE>` au format brut :

```
telnet tcp-intake.logs.datadoghq.eu 1883
<CLÉ_API_DATADOG> Log envoyé directement via TCP
```

Vous obtenez alors le résultat suivant sur votre [page Live Tail][2] :

{{< img src="logs/custom_log_telnet.png" alt="Telnet personnalisé" responsive="true" style="width:70%;">}}

Si votre `<CHARGEUTILE>` est au format JSON, Datadog se charge de parser automatiquement ses attributs :

```
telnet tcp-intake.logs.datadoghq.eu 1883
<CLÉ_API_DATADOG> {"message":"log au format json", "ddtags":"env:mon-env,user:mon-utilisateur", "ddsource":"mon-intégration", "hostname":"mon-hostname", "service":"mon-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Telnet personnalisé" responsive="true" style="width:100%;">}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{% tab "HTTP" %}}

Pour envoyer des logs via HTTPS vers le site **européen** ou **américain** de Datadog, consultez la [documentation relative à l'API HTTP de log Datadog][1].

[1]: https://docs.datadoghq.com/fr/api/?lang=python#send-logs-over-http
{{% /tab %}}
{{< /tabs >}}

## Endpoints de logs Datadog

Datadog fournit des endpoints de logs pour les connexions avec chiffrement SSL et les connexions non chiffrées.
Utilisez l'endpoint chiffré si vous le pouvez. L'Agent Datadog utilise l'endpoint chiffré pour envoyer les logs à Datadog (pour en savoir plus, consultez la [documentation sur la sécurité de Datadog][22]).

Les endpoints suivants peuvent être utilisés pour l'envoi de logs à Datadog :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}


| Endpoints pour connexions avec chiffrement SSL | Port    | Description                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.com`       | `10516` | Utilisé par l'Agent pour envoyer des logs au format protobuf via une connexion TCP avec chiffrement SSL.                                                                                     |
| `agent-http-intake.logs.datadoghq.com`  | `443`   | Utilisé par l'Agent pour envoyer des logs au format protobuf via HTTPS. Consultez la section [Envoyer des logs via HTTP][1].                                                        |
| `http-intake.logs.datadoghq.com`        | `443`   | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la section [Envoyer des logs via HTTP][1].                                         |
| `intake.logs.datadoghq.com`             | `10516` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                 |
| `lambda-intake.logs.datadoghq.com`      | `10516` | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                  |
| `lambda-http-intake.logs.datadoghq.com` | `443`   | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                                                                            |
| `functions-intake.logs.datadoghq.com`   | `10516` | Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL. **Remarque** : cet endpoint peut servir pour d'autres fournisseurs de cloud. |


| Endpoint pour connexions non chiffrées | Port    | Description                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `intake.logs.datadoghq.com`          | `10514` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP non chiffrée. |

[1]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

| Endpoints pour connexions avec chiffrement SSL | Port  | Description                                                                                                                                                                 |
|-----------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.eu`        | `443` | Utilisé par l'Agent pour envoyer des logs au format protobuf via une connexion TCP avec chiffrement SSL.                                                                                     |
| `agent-http-intake.logs.datadoghq.eu`   | `443` | Utilisé par l'Agent pour envoyer des logs au format protobuf via HTTPS. Consultez la section [Envoyer des logs via HTTP][1].                                                        |
| `http-intake.logs.datadoghq.eu`        | `443`   | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format JSON ou texte brut via HTTPS. Consultez la section [Envoyer des logs via HTTP][1].                                         |
| `tcp-intake.logs.datadoghq.eu`          | `443` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                 |
| `lambda-intake.logs.datadoghq.eu`       | `443` | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL.                                                                  |
| `lambda-http-intake.logs.datadoghq.eu`  | `443` | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON via HTTPS.                                                                                            |
| `functions-intake.logs.datadoghq.eu`    | `443` | Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP avec chiffrement SSL. **Remarque** : cet endpoint peut servir pour d'autres fournisseurs de cloud. |


| Endpoint pour connexions non chiffrées | Port   | Description                                                                                                     |
|--------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `tcp-intake.logs.datadoghq.eu`       | `1883` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON via une connexion TCP non chiffrée. |


[1]: /fr/agent/logs/?tab=tailexistingfiles#send-logs-over-https
{{% /tab %}}
{{< /tabs >}}

Pour envoyer des logs via HTTPS, consultez la [documentation relative à l'API HTTP de log Datadog][23].


## Attributs réservés

Voici quelques attributs clés auxquels vous devez prêter attention lors de la configuration de votre projet :

| Attribut | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | Le nom du host d'origine, tel que défini dans les métriques. Les tags de host correspondants sont automatiquement récupérés à partir du host associé dans Datadog, et sont ensuite appliqués à vos logs. L'Agent définit automatiquement cette valeur.                          |
| `source`  | Cet attribut correspond au nom de l'intégration, à savoir la technologie à l'origine du log. Lorsqu'il a pour valeur le nom d'une intégration, Datadog installe automatiquement les parsers et les facettes correspondants. Par exemple : `nginx`, `postgresql`, etc. |
| `status` | Indique le niveau ou la sévérité d'un log. Cet attribut permet de définir des [patterns][24]. Il s'affiche de façon distincte dans l'interface utilisateur pour les logs Datadog.|
| `service` | Le nom de l'application ou du service qui génère les événements de log. Il est utilisé pour passer des logs à l'APM. Assurez-vous donc de définir la même valeur lorsque vous utilisez les deux produits.                                                            |
| `message` | Par défaut, Datadog ingère la valeur de l'attribut `message` comme corps de l'entrée du log. Cette valeur est alors mise en évidence et affichée dans le flux de logs, où elle est indexée pour d'éventuelles recherches plein texte.                                |


Vos logs sont recueillis et rassemblés dans la vue [Log Explorer][25]. Vous pouvez également rechercher et enrichir vos logs, et recevoir des alertes les concernant.

{{< img src="logs/log_explorer_view.png" alt="Vue Log Explorer" responsive="true" >}}

### Comment tirer le meilleur parti de vos logs d'application

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom du logger, le thread actuel, le type d'erreur et la trace de pile.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Trace de pile" responsive="true" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | Le nom du logger                                               |
| `logger.thread_name` | Le nom du thread actuel                                       |
| `error.stack`        | La trace de pile actuelle                                               |
| `error.message`      | Le message d'erreur contenu dans la trace de pile                       |
| `error.kind`         | Le type d'erreur (comme « Exception », « OSError », etc.) |

**Remarque** : par défaut, les pipelines des intégrations tentent de remapper les paramètres par défaut de la bibliothèque de création de logs sur ces attributs spécifiques et analysent les traces ou tracebacks de pile afin d'extraire automatiquement `error.message` et `error.kind`.

### Envoyer vos logs d'application au format JSON

Pour les frameworks d'intégration, Datadog propose des instructions relatives à l'enregistrement de logs au format JSON dans un fichier. L'enregistrement au format JSON facilite la gestion des logs d'application multiligne, et les logs sont automatiquement parsés par Datadog.

#### Avantages de la collecte de logs au format JSON

Les logs au format JSON sont automatiquement parsés par Datadog. Si vous pouvez choisir le format de log envoyé à Datadog, nous vous conseillons donc d'opter pour ce format : de cette façon, vous n'aurez pas besoin de créer de règles de parsing personnalisées.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs
[2]: /fr/agent/logs/#tail-existing-files
[3]: /fr/agent/logs/#stream-logs-through-tcp-udp
[4]: /fr/agent/logs/#filter-logs
[5]: /fr/agent/logs/#scrub-sensitive-data-in-your-logs
[6]: /fr/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[7]: /fr/integrations/rsyslog
[8]: /fr/integrations/syslog_ng
[9]: /fr/integrations/nxlog
[10]: /fr/integrations/fluentd/#log-collection
[11]: /fr/integrations/logstash/#log-collection
[12]: /fr/agent/logs/?tab=tailexistingfiles#custom-log-collection
[13]: /fr/logs/processing
[14]: /fr/logs/processing/parsing
[15]: /fr/logs/explorer/?tab=facets#setup
[16]: /fr/agent/docker/log
[17]: /fr/agent/autodiscovery/management
[18]: /fr/agent/autodiscovery/integrations
[19]: /fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[20]: /fr/integrations/amazon_lambda/#log-collection
[21]: /fr/logs/log_collection/#how-to-get-the-most-of-your-application-logs
[22]: /fr/security/logs/#information-security
[23]: /fr/api/?lang=bash#send-logs-over-http
[24]: /fr/logs/explorer/patterns
[25]: /fr/logs/explore