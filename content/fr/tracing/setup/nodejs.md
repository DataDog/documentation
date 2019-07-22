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
  - link: tracing/advanced/
    tag: Utilisation avancée
    text: Utilisation avancée
---
## Installation et démarrage

Pour connaître la définition des termes utilisés dans l'APM, consultez la [documentation officielle][1].

Pour obtenir des détails sur la configuration et l'utilisation de l'API, consultez la [documentation relative à l'API][2] de Datadog.

Pour en savoir plus sur les contributions, consultez le [guide de développement][3].

### Démarrage rapide

<div class="alert alert-warning">
Cette bibliothèque <strong>DOIT</strong> être importée et initialisée avant tous les autres modules instrumentés. Lors de l'utilisation d'un transcompilateur, vous <strong>DEVEZ</strong> importer et initialiser la bibliothèque de tracing dans un fichier externe, puis importer ce fichier en entier pendant la compilation de votre application. Cela empêche l'accès aux variables avant leur définition et garantit que la bibliothèque de tracing est importée et initialisée avant l'importation des autres modules instrumentés.
</div>

Pour commencer le tracing d'applications Node.js, commencez par [installer et configurer l'Agent Datadog][4], puis consultez la documentation supplémentaire relative au [tracing d'applications Docker][5] ou au tracing d'[applications Kubernetes][6].

Installez ensuite la bibliothèque de tracing Datadog avec npm :

```sh
npm install --save dd-trace
```

Enfin, importez et initialisez le traceur :

##### JavaScript

```js
// Cette ligne doit précéder l'importation des modules instrumentés.
const tracer = require('dd-trace').init()
```

##### TypeScript

```js
// server.js
import "./tracer"; // doit précéder l'importation des modules instrumentés.

// tracer.js
import tracer from "dd-trace";
tracer.init(); // initialisé dans un fichier différent pour empêcher l'accès aux variables avant leur définition.
export default tracer;
```

Consultez les [paramètres du traceur][7] pour obtenir la liste des options d'initialisation.

## Modifier le hostname de l'Agent

Configurez vos traceurs d'applications de façon à envoyer des traces à un hostname d'Agent personnalisé :

Le module de tracing NodeJS recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
```

Pour utiliser un autre protocole (tel qu'UDS), spécifiez l'URL complète en tant que variable ENV `DD_TRACE_AGENT_URL` unique.

```sh
DD_TRACE_AGENT_URL=unix:<CHEMIN_SOCKET> node server
```

## Compatibilité

Les versions `>=8` de Node sont prises en charge par cette bibliothèque. Seules les versions paires telles que 8.x et 10.x sont officiellement prises en charge. Les versions impaires telles que 9.x et 11.x devraient fonctionner, mais elles ne sont pas officiellement prises en charge.

Les versions 4 et 6 de Node sont prises en charge par la version 0.13 du traceur `dd-trace-js`. Cette version sera prise en charge jusqu'au **30 avril 2020**, mais aucune fonctionnalité ne sera ajoutée.

**Remarque** : de manière générale, chaque version de Node est prise en charge par le traceur JS Datadog (corrections de bugs uniquement) jusqu'à 1 an après la fin de son cycle de vie.

### Intégrations

L'APM intègre une solution d'instrumentation pour de nombreux frameworks et bibliothèques populaires via un système de plug-ins. Si vous souhaitez la prise en charge d'un module qui ne fait pas partie de la liste ci-dessous, [contactez l'assistance][8] pour en faire la demande.

Pour découvrir comment activer et configurer des plug-ins, consultez la [documentation de l'API][9].

#### Compatibilité des frameworks Web

| Module           | Versions | Type de prise en charge    | Remarques                                      |
|------------------|----------|-----------------|--------------------------------------------|
| [connect][45]    | `>=2`    | Complète |                                            |
| [express][10]    | `>=4`    | Complète | Prend en charge Sails, Loopback et [plus encore][11]   |
| [fastify][47]    | `>=1`    | Complète |                                            |
| [graphql][12]    | `>=0.10` | Complète | Prend en charge Apollo Server et express-graphql |
| [hapi][13]       | `>=2`    | Complète |                                            |
| [koa][14]        | `>=2`    | Complète |                                            |
| [paperplane][41] | `>=2.3`  | Complète | Non pris en charge en [mode sans serveur][42]     |
| [restify][15]    | `>=3`    | Complète |                                            |

#### Compatibilité des modules natifs

| Module      | Type de prise en charge    |
|-------------|-----------------|
| [dns][16]   | Complète |
| [http][17]  | Complète |
| [https][18] | Complète |
| [net][19]   | Complète |

#### Compatibilité des datastores

| Module                 | Versions | Type de prise en charge    | Remarques                                            |
|------------------------|----------|-----------------|--------------------------------------------------|
| [cassandra-driver][20] | `>=3`    | Complète |                                                  |
| [elasticsearch][21]    | `>=10`   | Complète | Prend en charge `@elastic/elasticsearch` versions `>=5` |
| [ioredis][22]          | `>=2`    | Complète |                                                  |
| [knex][40]             | `>=0.8`  | Complète | Cette intégration est uniquement pour la propagation en contexte |
| [memcached][23]        | `>=2.2`  | Complète |                                                  |
| [mongodb-core][24]     | `>=2`    | Complète | Prend en charge Mongoose                                |
| [mysql][25]            | `>=2`    | Complète |                                                  |
| [mysql2][26]           | `>=1`    | Complète |                                                  |
| [pg][27]               | `>=4`    | Complète | Prend en charge `pg-native` si utilisé avec `pg`         |
| [redis][28]            | `>=0.12` | Complète |                                                  |
| [tedious][46]          | `>=1`    | Complète | Pilote SQL Server pour `mssql` et `sequelize`    |

#### Compatibilité des workers

| Module             | Versions | Type de prise en charge    | Remarques                                                  |
|--------------------|----------|-----------------|--------------------------------------------------------|
| [amqp10][29]       | `>=3`    | Complète | Prend en charge les agents AMQP 1.0 (p. ex. ActiveMQ, Apache Qpid) |
| [amqplib][30]      | `>=0.5`  | Complète | Prend en charge les agents AMQP 0.9 (p. ex. RabbitMQ, Apache Qpid) |
| [generic-pool][31] | `>=2`    | Complète |                                                        |
| [kafka-node][32]   |          | Disponible prochainement     |                                                        |
| [rhea][33]         |          | Disponible prochainement     |                                                        |

#### Compatibilité des bibliothèques Promise

| Module           | Versions  | Type de prise en charge    |
|------------------|-----------|-----------------|
| [bluebird][34]   | `>=2`     | Complète |
| [promise][43]    | `>=7`     | Complète |
| [promise-js][44] | `>=0.0.3` | Complète |
| [q][35]          | `>=1`     | Complète |
| [when][36]       | `>=3`     | Complète |

#### Compatibilité des enregistreurs

| Module        | Versions | Type de prise en charge    |
|---------------|----------|-----------------|
| [bunyan][37]  | `>=1`    | Complète |
| [pino][38]    | `>=2`    | Complète |
| [winston][39] | `>=1`    | Complète |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization
[2]: https://datadog.github.io/dd-trace-js
[3]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[4]: /fr/tracing/setup
[5]: /fr/tracing/setup/docker
[6]: /fr/agent/kubernetes/daemonset_setup/#trace-collection
[7]: https://datadog.github.io/dd-trace-js/#tracer-settings
[8]: /fr/help
[9]: https://datadog.github.io/dd-trace-js/#integrations
[10]: https://expressjs.com
[11]: https://expressjs.com/en/resources/frameworks.html
[12]: https://github.com/graphql/graphql-js
[13]: https://hapijs.com
[14]: https://koajs.com
[15]: http://restify.com
[16]: https://nodejs.org/api/dns.html
[17]: https://nodejs.org/api/http.html
[18]: https://nodejs.org/api/https.html
[19]: https://nodejs.org/api/net.html
[20]: https://github.com/datastax/nodejs-driver
[21]: https://github.com/elastic/elasticsearch-js
[22]: https://github.com/luin/ioredis
[23]: https://github.com/3rd-Eden/memcached
[24]: http://mongodb.github.io/node-mongodb-native/core
[25]: https://github.com/mysqljs/mysql
[26]: https://github.com/sidorares/node-mysql2
[27]: https://node-postgres.com
[28]: https://github.com/NodeRedis/node_redis
[29]: https://github.com/noodlefrenzy/node-amqp10
[30]: https://github.com/squaremo/amqp.node
[31]: https://github.com/coopernurse/node-pool
[32]: https://github.com/SOHU-Co/kafka-node
[33]: https://github.com/amqp/rhea
[34]: https://github.com/petkaantonov/bluebird
[35]: https://github.com/kriskowal/q
[36]: https://github.com/cujojs/when
[37]: https://github.com/trentm/node-bunyan
[38]: http://getpino.io
[39]: https://github.com/winstonjs/winston
[40]: https://knexjs.org/
[41]: https://github.com/articulate/paperplane
[42]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[43]: https://github.com/then/promise
[44]: https://github.com/kevincennis/promise
[45]: https://github.com/senchalabs/connect
[46]: http://tediousjs.github.io/tedious/
[47]: https://www.fastify.io/