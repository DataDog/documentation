---
title: Collecte de logs avec NodeJS
kind: documentation
aliases:
  - /fr/logs/languages/nodejs
further_reading:
  - link: /logs/processing/
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: /logs/processing/parsing/
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: /logs/explorer/
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: '/logs/explorer/#visualiser-les-donnees'
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
## Configurer votre logger

Utilisez [Winston][1] pour la création de logs depuis votre application NodeJS afin de profiter de toutes les fonctionnalités dont vous avez besoin pour élaborer votre stratégie de journalisation. 

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

### Journalisation dans un fichier

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
            name: '<NOM_LOGGER>',
            filename: '<NOM_FICHIER>.log',
      json: true,
            level: 'info'
        })
    ]
});

// Example logs
logger.log('info', 'Voici un log simple');
logger.info('Voici un log avec des métadonnées',{color: 'blue' });
```

{{% /tab %}}
{{< /tabs >}}

Vérifiez le contenu du fichier `<NOM_FICHIER>.log` pour vous assurer que Winston prend déjà en charge la journalisation de tous les éléments en JSON :

```json
{"level":"info","message":"Voici un log simple","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Voici un log avec des métadonnées","timestamp":"2015-04-23T16:52:05.339Z"}
```

## Associer votre service à l'ensemble des logs et traces

Si l'APM est activé pour cette application, associez vos logs et vos traces en ajoutant automatiquement l'ID des traces, l'ID des spans et les paramètres `env`, `service` et `version` à vos logs. Pour ce faire, [suivez les instructions relatives à l'utilisation de NodeJS pour l'APM][3] (en anglais).

**Remarque** : si le traceur de l'APM injecte `service` dans vos logs, cela remplace la valeur définie dans la configuration de l'Agent.

## Configurer votre Agent Datadog

Créez un fichier `nodejs.d/conf.yaml` dans votre dossier `conf.d/` avec le contenu suivant :

```yaml
init_config:

instances:

## Section Logs
logs:

  - type: file
    path: "<CHEMIN_NOM_FICHIER>.log"
    service: nodejs
    source: nodejs
    sourcecategory: sourcecode
```

## Logging sans agent

Vous pouvez transmettre vos logs depuis votre application à Datadog sans installer d'Agent sur votre host. Veuillez cependant noter qu'il est conseillé d'utiliser un Agent pour l'envoi de vos logs, en raison de ses capacités natives de gestion de la connexion.

Utilisez le [transport HTTP Winston][4] pour envoyer vos logs directement via l'[API Log Datadog][5].
Dans votre fichier Bootstrap ou dans votre code, déclarez le logger comme suit :

{{< site-region region="us" >}}

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/v1/input/<CLÉ_API>?ddsource=nodejs&service=<NOM_APPLICATION>',
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

// Exemples de log
logger.log('info', 'Voici un log simple !');
logger.info('Voici un log avec des métadonnées !',{color: 'blue' });
```

Remarque : vous pouvez également tester le [transport Datadog][1] créé par la communauté.

[1]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.eu',
  path: '/v1/input/<CLÉ_API>?ddsource=nodejs&service=<NOM_APPLICATION>',
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

// Exemples de log
logger.log('info', 'Voici un log simple !');
logger.info('Voici un log avec des métadonnées !',{color: 'blue' });
```

[1]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[2]: /fr/api/v1/logs/#send-logs

{{< /site-region >}}

## Dépannage

Si jamais vous rencontrez des erreurs de correspondance DNS ou si votre application plante, il se peut que ce problème découle des exceptions logstash non détectées.
Un gestionnaire doit être ajouté comme suit :

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
[3]: /fr/tracing/connect_logs_and_traces/nodejs/
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: /fr/api/v1/logs/#send-logs