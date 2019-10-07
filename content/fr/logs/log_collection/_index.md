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
* [**Recueillir des logs depuis un environnement docker**](?tab=ussite#container-log-collection).
* [**Recueillir des logs depuis votre fournisseur de Cloud**](?tab=ussite#collecte-de-logs-depuis-des-fournisseurs-de-cloud).

Les intégrations Datadog et la collecte de logs sont liées. Utilisez un fichier de configuration d'intégration par défaut pour activer son [processing][13] dédié, son [parsing][14] et ses [facettes][15] dans Datadog.

<div class="alert alert-warning">
<a href="/integrations/#collecte-de-logs-cat">Consultez la liste actuelle des intégrations prises en charge disponibles</a>.
</div>

Vous trouverez en bas de cette page la [liste des endpoints de collecte de logs Datadog disponibles](#endpoints-de-logs-datadog) si vous souhaitez envoyer vos logs directement à Datadog.

**Remarque** : lorsque vous envoyez des logs au format JSON à Datadog, un ensemble d'attributs est spécifiquement réservé à Datadog. Consultez la [section Attributs réservés](#attributs-reserves) pour en savoir plus.

## Collecte de logs depuis l'application

Après avoir [activé la collecte de logs][1], configurez le langage de votre application pour générer des logs :

{{< partial name="logs/logs-languages.html" >}}

## Collecte de logs depuis un conteneur

L'Agent Datadog peut [recueillir des logs directement à partir du conteneur stdout/stderr][16] sans utiliser de pilote de log. Lorsque le check du Docker de l'Agent est activé, les métadonnées du conteneur et du gestionnaire d'orchestration sont automatiquement ajoutées à vos logs en tant que tags.
Il est possible de recueillir les logs de tous vos conteneurs ou [d'un sous-ensemble filtré selon une image de conteneur, une étiquette ou un nom][17]. Autodiscovery peut également être utilisé pour [configurer la collecte de logs directement dans les étiquettes de conteneur][18]. Dans les environnements Kubernetes, vous pouvez également tirer parti de [l'installation de Daemonset][19].

Choisissez votre environnement ci-dessous pour obtenir des instructions sur la collecte de logs :

{{< partial name="logs/logs-containers.html" >}}

## Collecte de logs depuis des fournisseurs de Cloud

Sélectionnez votre fournisseur de Cloud ci-dessous pour savoir comment recueillir automatiquement vos logs et les transférer à Datadog :

{{< partial name="logs/logs-cloud.html" >}}

## Redirecteur de logs personnalisé

Vous pouvez utiliser un processus ou une [bibliothèque de journalisation][20] personnalisés capables de transmettre des logs via **TCP** ou **HTTP** pour gérer vos logs Datadog. Choisissez ci-dessous le site Datadog vers lequel vous souhaitez transférer des logs :

{{< tabs >}}
{{% tab "TCP US Site" %}}

L'endpoint TCP sécurisé est `intake.logs.datadoghq.com:10516` (ou avec le port `10514` pour les connexions instables). 

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log. Par exemple :

```
<CLÉ_API_DATADOG> Ceci est mon log
```

Testez-la manuellement avec telnet :

```
telnet intake.logs.datadoghq.com 10514
<CLÉ_API_DATADOG> Log envoyé directement via TCP
```

Cela génère le résultat suivant dans votre [page Live Tail][2] :

{{< img src="logs/custom_log_telnet.png" alt="Telnet personnalisé" responsive="true" style="width:70%;">}}

Datadog analyse automatiquement les attributs des messages au format JSON.

```
telnet intake.logs.datadoghq.com 10514 
<CLÉ_API_DATADOG> {"message":"log au format json", "ddtags":"env:mon-env,user:mon-utilisateur", "ddsource":"mon-intégration", "hostname":"mon-hostname", "service":"mon-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Telnet personnalisé" responsive="true" style="width:100%;">}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{% tab "TCP EU Site" %}}

L'endpoint TCP sécurisé est `tcp-intake.logs.datadoghq.eu:443` (ou avec le port `1883` pour les connexions instables). 

Vous devez ajouter un préfixe correspondant à votre [clé d'API Datadog][1] à l'entrée de log. Par exemple :

```
<CLÉ_API_DATADOG> Ceci est mon log
```

Testez-la manuellement avec telnet :

```
telnet tcp-intake.logs.datadoghq.eu 1883
<CLÉ_API_DATADOG> Log envoyé directement via TCP
```

Cela génère le résultat suivant dans votre [page Live Tail][2] :

{{< img src="logs/custom_log_telnet.png" alt="Telnet personnalisé" responsive="true" style="width:70%;">}}

Datadog analyse automatiquement les attributs des messages au format JSON.

```
telnet tcp-intake.logs.datadoghq.eu 1883
<CLÉ_API_DATADOG> {"message":"log au format json", "ddtags":"env:mon-env,user:mon-utilisateur", "ddsource":"mon-intégration", "hostname":"mon-hostname", "service":"mon-service"}
```

{{< img src="logs/custom_log_telnet_json_.png" alt="Telnet personnalisé" responsive="true" style="width:100%;">}}


[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/logs/livetail
{{% /tab %}}
{{% tab "HTTP" %}}

Pour envoyer des logs via HTTP pour le site **EU** ou **US**, consultez la [documentation relative à l'API HTTP de log Datadog](https://docs.datadoghq.com/api/?lang=python#send-logs-over-http).

{{% /tab %}}
{{< /tabs >}}

## Endpoints des logs Datadog

Datadog fournit des endpoints de logs pour les connexions avec un chiffrement SSL et les connexions non chiffrées.
Nous vous conseillons d'utiliser le endpoint chiffré dès que possible. L'Agent Datadog utilise le endpoint chiffré pour envoyer les logs à Datadog (pour en savoir plus, consultez la [documentation sur la sécurité de Datadog][21]).

Endpoints pour l'envoi de logs à Datadog :

{{< tabs >}}
{{% tab "Site américain" %}}


| Endpoints pour les connexions avec un chiffrement SSL | Port    | Description                                                                                                                                                                 |
|-----------------------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.com`       | `10516` | Utilisé par l'Agent pour envoyer des logs au format protobuf avec une connexion TCP chiffrée en SSL.                                                                                     |
| `intake.logs.datadoghq.com`             | `10516` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP chiffrée en SSL.                                                                 |
| `lambda-intake.logs.datadoghq.com`      | `10516` | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP chiffrée en SSL.                                                                  |
| `lambda-http-intake.logs.datadoghq.com` | `443`   | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON avec HTTPS.                                                                  |
| `functions-intake.logs.datadoghq.com`   | `10516` | Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP chiffrée en SSL. **Remarque** : ce endpoint peut être utile avec les autres fournisseurs de Cloud. |


| Endpoint pour les connexions non chiffrées | Port    | Description                                                                                              |
|--------------------------------------|---------|----------------------------------------------------------------------------------------------------------|
| `intake.logs.datadoghq.com`          | `10514` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP non chiffrée. |

{{% /tab %}}
{{% tab "Site européen" %}}

| Endpoints pour les connexions avec un chiffrement SSL | Port  | Description                                                                                                                                                                 |
|-----------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent-intake.logs.datadoghq.eu`        | `443` | Utilisé par l'Agent pour envoyer des logs au format protobuf avec une connexion TCP chiffrée en SSL.                                                                                     |
| `tcp-intake.logs.datadoghq.eu`          | `443` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP chiffrée en SSL.                                                                 |
| `lambda-intake.logs.datadoghq.eu`       | `443` | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP chiffrée en SSL.                                                                  |
| `lambda-http-intake.logs.datadoghq.eu` | `443`   | Utilisé par les fonctions Lambda pour envoyer des logs au format brut, Syslog ou JSON avec HTTPS.                                                                  |
| `functions-intake.logs.datadoghq.eu`    | `443` | Utilisé par les fonctions Azure pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP chiffrée en SSL. **Remarque** : ce endpoint peut être utile avec les autres fournisseurs de Cloud. |


| Endpoint pour les connexions non chiffrées | Port   | Description                                                                                                     |
|--------------------------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `tcp-intake.logs.datadoghq.eu`       | `1883` | Utilisé par les redirecteurs personnalisés pour envoyer des logs au format brut, Syslog ou JSON avec une connexion TCP non chiffrée. |


{{% /tab %}}
{{< /tabs >}}

Pour envoyer des logs via HTTP, consultez la [documentation relative à l'API HTTP de log Datadog][22].


## Attributs réservés

Voici quelques attributs clés auxquels vous devriez faire attention lors de la configuration de votre projet :

| Attribut | Description                                                                                                                                                                                                                            |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | Le nom du host d'origine, tel que défini dans les métriques. Nous récupérons automatiquement les tags de host correspondants à partir du host associé dans Datadog. Nous les appliquons ensuite à vos logs. L'Agent définit automatiquement cette valeur.                      |
| `source`  | Cet attribut correspond au nom de l'intégration, à savoir la technologie à l'origine du log. Lorsqu'il a pour valeur le nom d'une intégration, Datadog installe automatiquement les parsers et les facettes correspondants. Par exemple : `nginx`, `postgresql`, etc. |
| `status` | Cet attribut correspond au niveau ou à la sévérité d'un log. Il permet de définir des [patterns][23]. L'interface utilisateur pour les logs Datadog comporte une disposition distincte pour cet attribut.|
| `service` | Le nom de l'application ou du service génère les événements de log. Il est utilisé pour passer des logs à l'APM, alors assurez-vous de définir la même valeur lorsque vous utilisez les deux produits.                                                            |
| `message` | Par défaut, Datadog ingère la valeur de l'attribut `message` comme corps de l'entrée du log. Cette valeur est alors mise en évidence et affichée dans le flux de logs, où elle est indexée pour d'éventuelles recherches plein texte.                                |

Vos logs sont recueillis et rassemblés dans la vue [Log Explorer][24]. Vous pouvez également rechercher et enrichir vos logs, et recevoir des alertes les concernant.

{{< img src="logs/log_explorer_view.png" alt="Vue Log Explorer" responsive="true" >}}

### Comment tirer le meilleur parti de vos logs d'application

Lorsque vous enregistrez des traces de pile, des attributs spécifiques disposent d'un affichage de l'interface utilisateur dédié au sein de votre application Datadog, comme le nom de l'enregistreur, le thread actuel, le type d'erreur et la trace de pile.

{{< img src="logs/log_collection/stack_trace.png" style="width:80%;" alt="Trace de pile" responsive="true" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants :

| Attribut            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `logger.name`        | Le nom de l'enregistreur                                               |
| `logger.thread_name` | Le nom du thread actuel                                       |
| `error.stack`        | La trace de pile actuelle                                               |
| `error.message`      | Le message d'erreur contenu dans la trace de pile                       |
| `error.kind`         | Le type d'erreur (comme « Exception », « OSError », etc.) |

**Remarque** : par défaut, les pipelines des intégrations tentent de remapper les paramètres par défaut de la bibliothèque de création de logs sur ces attributs spécifiques et analysent les traces ou tracebacks de pile pour extraire automatiquement `error.message` et `error.kind`.

### Envoyer vos logs d'application au format JSON

Pour les frameworks d'intégration, Datadog apporte des recommandations sur l'enregistrement de logs au format JSON dans un fichier. L'enregistrement au format JSON permet de gérer les logs d'application multilignes et est automatiquement analysé par Datadog.

#### Les avantages de la collecte de logs au format JSON

Datadog analyse automatiquement les logs au format JSON. C'est pour cela que si vous pouvez choisir le format de log envoyé à Datadog, nous vous recommandons d'opter pour le format JSON afin d'éviter de créer des règles de parsing personnalisées.

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
[20]: /fr/logs/log_collection/#how-to-get-the-most-of-your-application-logs
[21]: /fr/security/logs/#information-security
[22]: /fr/api/?lang=bash#send-logs-over-http
[23]: /fr/logs/explorer/patterns
[24]: /fr/logs/explore