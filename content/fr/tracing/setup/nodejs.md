---
title: Tracer des applications Node.js
kind: documentation
aliases:
  - /fr/tracing/nodejs/
  - /fr/tracing/languages/nodejs/
  - /fr/tracing/languages/javascript/
  - /fr/tracing/setup/javascript/
  - /fr/agent/apm/nodejs/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-js'
    tag: GitHub
    text: Code source
  - link: 'https://datadog.github.io/dd-trace-js'
    tag: Documentation
    text: Documentation sur l'API
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: tracing/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Installation et démarrage

Si vous avez déjà un compte Datadog, vous trouverez des [instructions détaillées][1] dans nos guides intégrés à l'application pour les configurations basées sur un host et les configurations basées sur un conteneur.

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][2].

Pour en savoir plus sur la configuration et l'utilisation de l'API, consultez la [documentation relative à l'API][3] de Datadog.

Pour en savoir plus sur les contributions, consultez le [guide de développement][4].

### Prise en main

<div class="alert alert-warning">
Cette bibliothèque <strong>DOIT</strong> être importée et initialisée avant tous les autres modules instrumentés. Lors de l'utilisation d'un transcompilateur, vous <strong>DEVEZ</strong> importer et initialiser la bibliothèque de tracing dans un fichier externe, puis importer ce fichier en entier pendant la compilation de votre application. Cela empêche l'accès aux variables avant leur définition et garantit que la bibliothèque de tracing est importée et initialisée avant l'importation des autres modules instrumentés.
</div>

Pour commencer le tracing d'applications Node.js, commencez par [installer et configurer l'Agent Datadog][5], puis consultez la documentation supplémentaire relative au [tracing d'applications Docker][6] ou au tracing d'[applications Kubernetes][7].

Installez ensuite la bibliothèque de tracing Datadog avec npm :

```sh
npm install --save dd-trace
```

Enfin, importez et initialisez le traceur :

##### JavaScript

```js
// Cette ligne doit précéder l'importation des modules instrumentés.
const tracer = require('dd-trace').init();
```

##### TypeScript

```typescript
// server.ts
import './tracer'; // doit précéder l'importation des modules instrumentés.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialisé dans un fichier différent pour empêcher l'accès aux variables avant leur définition.
export default tracer;
```

Consultez les [paramètres du traceur][8] pour obtenir la liste des options d'initialisation.

## Configuration

Les réglages du traceur peuvent être configurés en tant que paramètre de la méthode `init()` ou en tant que variables d'environnement.

| Configuration         | Variable d'environnement         | Valeur par défaut     | Description                                                                                                                                                                                                                                                                |
| -------------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled        | `DD_TRACE_ENABLED`           | `true`      | Indique si le traceur doit être activé.                                                                                                                                                                                                                                              |
| debug          | `DD_TRACE_DEBUG`             | `false`     | Active la journalisation de debugging dans le traceur.                                                                                                                                                                                                                                        |
| service        | `DD_SERVICE`            | `null`      | Le nom du service à utiliser pour ce programme.                                                                                                                                                                                                                              |
| version        | `DD_VERSION`            | `null`      | Le numéro de version de l'application. Par défaut, correspond à la valeur du champ version dans package.json.
                                                                               |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | L'URL de l'Agent de trace auquel le traceur transmet des données. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix grâce au paramètre `apm_config.receiver_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_APM_RECEIVER_SOCKET`. |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | L'adresse de l'Agent auquel le traceur transmet des données.                                                                                                                                                                                                                       |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | Le port de l'Agent de trace auquel le traceur transmet des données.                                                                                                                                                                                                                    |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | Le port de l'Agent DogStatsD auquel les métriques sont transmises.                                                                                                                                                                                                             |
| env            | `DD_ENV`                     | `null`      | Définit l'environnement de l'application, p. ex. `prod`, `pre-prod` ou encore `stage`.                                                                                                                                                                                                    |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | Active l'injection automatique d'ID de trace dans les logs, pour les bibliothèques de journalisation prises en charge.                                                                                                                                                                                           |
| tags           | `DD_TAGS`                    | `{}`        | Définit des tags globaux qui doivent être appliqués à l'ensemble des spans et métriques. Lorsque ce paramètre est transmis en tant que variable d'environnement, son format correspond à `key:value, key:value`.                                                                                                                             |
| sampleRate     | -                            | `1`         | Pourcentage de spans à échantillonner. Valeur flottante comprise entre `0` et `1`.                                                                                                                                                                                                              |
| flushInterval  | -                            | `2000`      | Intervalle (en millisecondes) de transmission par le traceur des traces à l'Agent.                                                                                                                                                                                                |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | Indique si l'enregistrement des métriques runtime doit être activé. Le port `8125` (ou le port configuré avec `dogstatsd.port`) doit être ouvert sur l'Agent pour le transport UDP.                                                                                                                                        |
| reportHostname | `DD_TRACE_REPORT_HOSTNAME`   | `false`     | Indique si le hostname du système doit être transmis pour chaque trace. Lorsque cette option est désactivée, le hostname de l'Agent est transmis à la place.                                                                                                                                                          |
| experimental   | -                            | `{}`        | Les fonctionnalités expérimentales peuvent toutes être activées simultanément à l'aide de la valeur booléenne « true », ou individuellement à l'aide de paires key/value. [Contactez l'assistance][9] pour en savoir plus sur les fonctionnalités expérimentales disponibles.                                                                                   |
| plugins        | -                            | `true`      | Indique si l'instrumentation automatique des bibliothèques externes à l'aide des plug-ins intégrés doit être activée.                                                                                                                                                                       |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | Token client pour le tracing sur navigateur. Peut être généré dans Datadog en accédant à **Integrations** -> **APIs**.                                                                                                                                                                             |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | Chaîne de caractères indiquant le niveau minimum des logs du traceur à utiliser lorsque la journalisation de debugging est activée. Exemple : `error` ou `debug`.                                                                                                                                                             |

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le module de tracing NodeJS recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

Pour utiliser un autre protocole (tel qu'UDS), spécifiez l'URL complète en tant que variable d'environnement `DD_TRACE_AGENT_URL` unique.

```sh
DD_TRACE_AGENT_URL=unix:<CHEMIN_SOCKET> node server
```

## Compatibilité

Les versions `>=8` de Node sont prises en charge par cette bibliothèque. Seules les versions paires telles que 8.x et 10.x sont officiellement prises en charge. Les versions impaires telles que 9.x et 11.x devraient fonctionner, mais elles ne sont pas officiellement prises en charge.

Les versions 4 et 6 de Node sont prises en charge par la version 0.13 du traceur `dd-trace-js`. Cette version sera prise en charge jusqu'au **30 avril 2020**, mais aucune fonctionnalité ne sera ajoutée.

**Remarque** : de manière générale, chaque version de Node est prise en charge par le traceur JS Datadog (corrections de bugs uniquement) jusqu'à 1 an après la fin de son cycle de vie.

### Intégrations

L'APM intègre une solution d'instrumentation pour de nombreux frameworks et bibliothèques populaires via un système de plug-ins. Si vous souhaitez la prise en charge d'un module qui ne fait pas partie de la liste ci-dessous, [contactez l'assistance][9] pour en faire la demande.

Pour découvrir comment activer et configurer des plug-ins, consultez la [documentation de l'API][10].

#### Compatibilité des frameworks Web

| Module                  | Versions | Type de prise en charge    | Remarques                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][11]           | `>=2`    | Prise en charge complète |                                            |
| [express][12]           | `>=4`    | Prise en charge complète | Prend en charge Sails, Loopback et [plus encore][13]   |
| [fastify][14]           | `>=1`    | Prise en charge complète |                                            |
| [graphql][15]           | `>=0.10` | Prise en charge complète | Prend en charge Apollo Server et express-graphql |
| [gRPC][16]              | `>=1.13` | Prise en charge complète |                                            |
| [hapi][17]              | `>=2`    | Prise en charge complète | Prend en charge [@hapi/hapi] versions `>=17.9`    |
| [koa][18]               | `>=2`    | Prise en charge complète |                                            |
| [microgateway-core][19] | `>=2.1`  | Prise en charge complète | Bibliothèque principale pour Apigee Edge. La prise en charge de la CLI [edgemicro][20]  nécessite d'appliquer un patch statique avec [@datadog/cli][21]. |
| [paperplane][22]        | `>=2.3`  | Prise en charge complète | Non pris en charge en [mode sans serveur][23]     |
| [restify][24]           | `>=3`    | Prise en charge complète |                                            |

#### Compatibilité des modules natifs

| Module      | Type de prise en charge        | Remarques |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][25]   | Prise en charge complète     |       |
| [fs][26]    | Prise en charge complète     |       |
| [http][27]  | Prise en charge complète     |       |
| [https][28] | Prise en charge complète     |       |
| [http2][29] | Prise en charge partielle | Seuls les clients HTTP2, et non les serveurs, sont pris en charge pour le moment. |
| [net][30]   | Prise en charge complète     |       |

#### Compatibilité des datastores

| Module                 | Versions | Type de prise en charge    | Remarques                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][31] | `>=3`    | Prise en charge complète |                                                  |
| [couchbase][32]        | `^2.4.2` | Prise en charge complète |                                                  |
| [elasticsearch][33]    | `>=10`   | Prise en charge complète | Prend en charge `@elastic/elasticsearch` versions `>=5` |
| [ioredis][34]          | `>=2`    | Prise en charge complète |                                                  |
| [knex][35]             | `>=0.8`  | Prise en charge complète | Cette intégration est uniquement pour la propagation en contexte |
| [memcached][36]        | `>=2.2`  | Prise en charge complète |                                                  |
| [mongodb-core][37]     | `>=2`    | Prise en charge complète | Prend en charge Mongoose                                |
| [mysql][38]            | `>=2`    | Prise en charge complète |                                                  |
| [mysql2][39]           | `>=1`    | Prise en charge complète |                                                  |
| [pg][40]               | `>=4`    | Prise en charge complète | Prend en charge `pg-native` en cas d'utilisation conjointe avec `pg`         |
| [redis][41]            | `>=0.12` | Prise en charge complète |                                                  |
| [tedious][42]          | `>=1`    | Prise en charge complète | Pilote SQL Server pour `mssql` et `sequelize`    |

#### Compatibilité des workers

| Module                     | Versions | Type de prise en charge    | Remarques                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][43] | `>=1.2`  | Prise en charge complète |                                                        |
| [amqp10][44]               | `>=3`    | Prise en charge complète | Prend en charge les agents AMQP 1.0 (p. ex. ActiveMQ, Apache Qpid) |
| [amqplib][45]              | `>=0.5`  | Prise en charge complète | Prend en charge les agents AMQP 0.9 (p. ex. RabbitMQ, Apache Qpid) |
| [generic-pool][46]         | `>=2`    | Prise en charge complète |                                                        |
| [kafka-node][47]           |          | Disponible prochainement     |                                                        |
| [rhea][48]                 | `>=1`    | Prise en charge complète |                                                        |

#### Compatibilité des SDK

| Module             | Versions   | Type de prise en charge    | Remarques                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][49]      | `>=2.1.35` | Prise en charge complète | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS et requêtes génériques. |

#### Compatibilité des bibliothèques Promise

| Module           | Versions  | Type de prise en charge    |
| ---------------- | --------- | --------------- |
| [bluebird][50]   | `>=2`     | Prise en charge complète |
| [promise][51]    | `>=7`     | Prise en charge complète |
| [promise-js][52] | `>=0.0.3` | Prise en charge complète |
| [q][53]          | `>=1`     | Prise en charge complète |
| [when][54]       | `>=3`     | Prise en charge complète |

#### Compatibilité des loggers

| Module           | Versions  | Type de prise en charge    |
| ---------------- | --------- | --------------- |
| [bunyan][55]     | `>=1`     | Prise en charge complète |
| [paperplane][56] | `>=2.3.2` | Prise en charge complète |
| [pino][57]       | `>=2`     | Prise en charge complète |
| [winston][58]    | `>=1`     | Prise en charge complète |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /fr/tracing/visualization/
[3]: https://datadog.github.io/dd-trace-js
[4]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[5]: /fr/tracing/send_traces/
[6]: /fr/tracing/setup/docker/
[7]: /fr/agent/kubernetes/apm/
[8]: https://datadog.github.io/dd-trace-js/#tracer-settings
[9]: /fr/help/
[10]: https://datadog.github.io/dd-trace-js/#integrations
[11]: https://github.com/senchalabs/connect
[12]: https://expressjs.com
[13]: https://expressjs.com/en/resources/frameworks.html
[14]: https://www.fastify.io
[15]: https://github.com/graphql/graphql-js
[16]: https://grpc.io/
[17]: https://hapijs.com
[18]: https://koajs.com
[19]: https://github.com/apigee/microgateway-core
[20]: https://github.com/apigee-internal/microgateway
[21]: https://www.npmjs.com/package/@datadog/cli
[22]: https://github.com/articulate/paperplane
[23]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[24]: http://restify.com
[25]: https://nodejs.org/api/dns.html
[26]: https://nodejs.org/api/fs.html
[27]: https://nodejs.org/api/http.html
[28]: https://nodejs.org/api/https.html
[29]: https://nodejs.org/api/http2.html
[30]: https://nodejs.org/api/net.html
[31]: https://github.com/datastax/nodejs-driver
[32]: https://github.com/couchbase/couchnode
[33]: https://github.com/elastic/elasticsearch-js
[34]: https://github.com/luin/ioredis
[35]: https://knexjs.org
[36]: https://github.com/3rd-Eden/memcached
[37]: http://mongodb.github.io/node-mongodb-native/core
[38]: https://github.com/mysqljs/mysql
[39]: https://github.com/sidorares/node-mysql2
[40]: https://node-postgres.com
[41]: https://github.com/NodeRedis/node_redis
[42]: http://tediousjs.github.io/tedious
[43]: https://github.com/googleapis/nodejs-pubsub
[44]: https://github.com/noodlefrenzy/node-amqp10
[45]: https://github.com/squaremo/amqp.node
[46]: https://github.com/coopernurse/node-pool
[47]: https://github.com/SOHU-Co/kafka-node
[48]: https://github.com/amqp/rhea
[49]: https://github.com/aws/aws-sdk-js
[50]: https://github.com/petkaantonov/bluebird
[51]: https://github.com/then/promise
[52]: https://github.com/kevincennis/promise
[53]: https://github.com/kriskowal/q
[54]: https://github.com/cujojs/when
[55]: https://github.com/trentm/node-bunyan
[56]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[57]: http://getpino.io
[58]: https://github.com/winstonjs/winston