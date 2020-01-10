---
title: Collecte de logs avec NodeJS
kind: documentation
aliases:
  - /fr/logs/languages/nodejs
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
## Présentation

Utilisez [Winston][1] pour la création de logs depuis votre application NodeJS afin de profiter de toutes les fonctionnalités dont vous avez besoin pour élaborer votre stratégie de journalisation. 

Winston est disponible via [NPM][2]. Pour démarrer, vous devez ajouter la dépendance à votre code :

```
npm install --save winston
```

`package.js` est mis à jour avec les dépendances correspondantes :

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

## Implémentation

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez les instructions de journalisation NodeJS pour l'APM][3] afin d'ajouter automatiquement des identifiants de trace et de span à vos logs.

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

## Configurer votre Agent Datadog

Créez un fichier `nodejs.d/conf.yaml` dans votre dossier `conf.d/` avec le contenu suivant :

```yaml
init_config:

instances:

##Section Log
logs:

    ## - type (obligatoire) : type de fichier de la source d'entrée de log (tcp/udp/file).
    ##   port / path (obligatoire) : définit le type tcp ou udp du port. Choisit le chemin si le type est défini sur file.
    ##   service (obligatoire) : nom du service propriétaire du log.
    ##   source (obligatoire) : attribut qui définit l'intégration qui envoie les logs.
    ##   sourcecategory (facultatif) : attribut à valeur multiple. Il peut être utilisé pour préciser l'attribut source.
    ##   tags (facultatif) : ajoute des tags à chaque log recueilli.

  - type: file
    path: <NOM_CHEMIN_FICHIER>.log
    service: nodejs
    source: nodejs
    sourcecategory: sourcecode
```


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
[3]: /fr/tracing/connect_logs_and_traces/?tab=nodejs