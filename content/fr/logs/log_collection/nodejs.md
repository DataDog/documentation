---
aliases:
- /fr/logs/languages/nodejs
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guide de dépannage pour la collecte de logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
title: Collecte de logs avec NodeJS
---


## Configurer votre logger

Pour envoyer vos logs à Datadog, activez la journalisation au sein d'un fichier et suivez ce fichier avec l'Agent Datadog. Utilisez la bibliothèque de journalisation [Winston][1] pour effectuer la journalisation depuis votre application Node.js.

Winston est disponible via [NPM][2]. Pour démarrer, vous devez ajouter la dépendance à votre code :

```text
npm install --save winston
```

`package.json` est mis à jour avec les dépendances correspondantes :

```js
{
  "name": "...",

  //...
  "dependencies": {
    //...
    "winston": "x.y.z",
    //...
  }
}
```

### Écrire les logs dans un fichier

Dans votre fichier Bootstrap ou dans votre code, déclarez le logger comme suit :

{{< tabs >}}
{{% tab "Winston 3.0" %}}

```js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/<NOM_FICHIER>.log` }),
  ],
});

module.exports = logger;

// Exemple de logs
logger.log('info', 'Voici un log simple');
logger.info('Voici un log avec des métadonnées',{color: 'blue' });
```

{{% /tab %}}
{{% tab "Winston 2.0" %}}

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: '<LOGGER_NAME>',
            filename: '<FILE_NAME>.log',
            json: true,
            level: 'info'
        })
    ]
});

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{< /tabs >}}

Vérifiez le contenu du fichier `<NOM_FICHIER>.log` pour vous assurer que Winston prend en charge la journalisation en JSON :

```json
{"level":"info","message":"Voici un log simple","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Voici un log avec des métadonnées","timestamp":"2015-04-23T16:52:05.339Z"}
```

## Configurer votre Agent Datadog

Une fois la [collecte de logs activée][6], configurez la [collecte de logs personnalisée][7] pour suivre vos fichiers de logs et les transmettre les nouveaux logs à Datadog.

1. Créez un dossier `nodejs.d/` dans le [répertoire de configuration de l'Agent][6] `conf.d/`.
2. Créez un fichier `conf.yaml` dans votre dossier `nodejs.d/` avec le contenu suivant :

```yaml
init_config:

instances:

##Log section
logs:

  - type: file
    path: "<FILE_NAME_PATH>.log"
    service: <SERVICE_NAME>
    source: nodejs
    sourcecategory: sourcecode
```

3. [Redémarrez l'Agent][9].
4. Lancez la [sous-commande status de l'Agent][10] et cherchez `nodejs` dans la section `Checks` pour vérifier que les logs sont bien transmis à Datadog.

Si les logs sont au format JSON, Datadog [parse automatiquement les messages de log][11] pour extraire les attributs. Utilisez le [Log Explorer][12] pour visualiser et dépanner vos logs.

## Associer votre service à l'ensemble des logs et traces

Si l'APM est activé pour cette application, associez vos logs et vos traces en ajoutant automatiquement l'ID des traces, l'ID des spans et les paramètres `env`, `service` et `version` à vos logs. Pour ce faire, [suivez les instructions relatives à l'utilisation de Node.js pour l'APM][3] (en anglais).

**Remarque** : si le traceur de l'APM injecte `service` dans vos logs, cela remplace la valeur définie dans la configuration de l'Agent.

## Logging sans Agent

Vous pouvez transmettre vos logs depuis votre application à Datadog sans installer d'Agent sur votre host. Veuillez cependant noter qu'il est conseillé d'utiliser un Agent pour l'envoi de vos logs, en raison de ses capacités natives de gestion de la connexion.

Utilisez le [transport HTTP Winston][4] pour envoyer vos logs directement via l'[API Log Datadog][5].
Dans votre fichier Bootstrap ou dans votre code, déclarez le logger comme suit :

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.{{< region-param key="dd_site" >}}',
  path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<APPLICATION_NAME>',
  ssl: true
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

Remarque : vous pouvez également utiliser le [transport Datadog][1] créé par la communauté.


## Dépannage

Si jamais vous rencontrez des erreurs de correspondance DNS, il se peut que ce problème découle des exceptions logstash non détectées. Un gestionnaire doit être ajouté comme suit :

```js
var logstash = new winston.transports.Logstash({ ... });
logstash.on('error', function(err) {
    console.error(err); // remplacer par vos propres fonctionnalités ici
});
```

Assurez-vous de ne pas définir le paramètre `max_connect_retries` sur `1` (valeur par défaut : `4`).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/winstonjs/winston
[2]: https://www.npmjs.com
[3]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: /fr/api/v1/logs/#send-logs
[6]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[7]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[9]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[10]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[11]: /fr/logs/log_configuration/parsing/?tab=matchers
[12]: /fr/logs/explorer/#overview
[13]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport
[14]: /fr/glossary/#tail