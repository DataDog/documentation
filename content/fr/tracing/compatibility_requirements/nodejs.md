---
title: Exigences de compatibilité NodeJS
kind: documentation
description: Exigences de compatibilité pour le traceur NodeJS
further_reading:
  - link: tracing/setup/nodejs
    tag: Documentation
    text: Instrumenter votre application
---
La bibliothèque de tracing Datadog NodeJS est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

Les versions `>=8` de Node sont prises en charge par cette bibliothèque. Seules les versions paires telles que 8.x et 10.x sont officiellement prises en charge. Les versions impaires telles que 9.x et 11.x devraient fonctionner, mais cela n'a pas été officiellement confirmé.

## Intégrations prises en charge

L'APM intègre une solution d'instrumentation pour de nombreux frameworks et bibliothèques populaires via un système de plug-ins. Pour demander la prise en charge d'un module qui ne fait pas partie de la liste ci-dessous, [contactez notre formidable équipe d'assistance][2].

Pour découvrir comment activer et configurer des plug-ins, consultez la [documentation de l'API][3].

### Compatibilité des frameworks Web

| Module                  | Versions | Type de prise en charge    | Remarques                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][4]           | `>=2`    | Prise en charge complète |                                            |
| [express][5]           | `>=4`    | Prise en charge complète | Prend en charge Sails, Loopback et [plus encore][6]   |
| [fastify][7]           | `>=1`    | Prise en charge complète |                                            |
| [graphql][8]           | `>=0.10` | Prise en charge complète | Prend en charge Apollo Server et express-graphql |
| [gRPC][9]              | `>=1.13` | Prise en charge complète |                                            |
| [hapi][10]              | `>=2`    | Prise en charge complète | Prend en charge [@hapi/hapi] versions `>=17.9`    |
| [koa][11]               | `>=2`    | Prise en charge complète |                                            |
| [microgateway-core][12] | `>=2.1`  | Prise en charge complète | Bibliothèque centrale d'Apigee Edge. La prise en charge de la CLI [edgemicro][13] nécessite l'application d'un patch statique avec [@datadog/cli][14]. |
| [paperplane][15]        | `>=2.3`  | Prise en charge complète | Non pris en charge en [mode sans serveur][16]     |
| [restify][17]           | `>=3`    | Prise en charge complète |                                            |

### Compatibilité des modules natifs

| Module      | Type de prise en charge        | Remarques |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][18]   | Prise en charge complète     |       |
| [fs][19]    | Prise en charge complète     |       |
| [http][20]  | Prise en charge complète     |       |
| [https][21] | Prise en charge complète     |       |
| [http2][22] | Prise en charge partielle | Seuls les clients HTTP2, et non les serveurs, sont pris en charge pour le moment. |
| [net][23]   | Prise en charge complète     |       |

### Compatibilité des datastores

| Module                 | Versions | Type de prise en charge    | Remarques                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][24] | `>=3`    | Prise en charge complète |                                                  |
| [couchbase][25]        | `^2.4.2` | Prise en charge complète |                                                  |
| [elasticsearch][26]    | `>=10`   | Prise en charge complète | Prend en charge `@elastic/elasticsearch` versions `>=5` |
| [ioredis][27]          | `>=2`    | Prise en charge complète |                                                  |
| [knex][28]             | `>=0.8`  | Prise en charge complète | Cette intégration est uniquement pour la propagation en contexte |
| [memcached][29]        | `>=2.2`  | Prise en charge complète |                                                  |
| [mongodb-core][30]     | `>=2`    | Prise en charge complète | Prend en charge Mongoose                                |
| [mysql][31]            | `>=2`    | Prise en charge complète |                                                  |
| [mysql2][32]           | `>=1`    | Prise en charge complète |                                                  |
| [pg][33]               | `>=4`    | Prise en charge complète | Prend en charge `pg-native` en cas d'utilisation conjointe avec `pg`         |
| [redis][34]            | `>=0.12` | Prise en charge complète |                                                  |
| [tedious][35]          | `>=1`    | Prise en charge complète | Pilote SQL Server pour `mssql` et `sequelize`    |

### Compatibilité des workers

| Module                     | Versions | Type de prise en charge    | Remarques                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][36] | `>=1.2`  | Prise en charge complète |                                                        |
| [amqp10][37]               | `>=3`    | Prise en charge complète | Prend en charge les agents AMQP 1.0 (p. ex. ActiveMQ, Apache Qpid) |
| [amqplib][38]              | `>=0.5`  | Prise en charge complète | Prend en charge les agents AMQP 0.9 (p. ex. RabbitMQ, Apache Qpid) |
| [generic-pool][39]         | `>=2`    | Prise en charge complète |                                                        |
| [kafka-node][40]           |          | Disponible prochainement     |                                                        |
| [rhea][41]                 | `>=1`    | Prise en charge complète |                                                        |

### Compatibilité des SDK

| Module             | Versions   | Type de prise en charge    | Remarques                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][42]      | `>=2.1.35` | Prise en charge complète | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS et requêtes génériques. |

### Compatibilité des bibliothèques Promise

| Module           | Versions  | Type de prise en charge    |
| ---------------- | --------- | --------------- |
| [bluebird][43]   | `>=2`     | Prise en charge complète |
| [promise][44]    | `>=7`     | Prise en charge complète |
| [promise-js][45] | `>=0.0.3` | Prise en charge complète |
| [q][46]          | `>=1`     | Prise en charge complète |
| [when][47]       | `>=3`     | Prise en charge complète |

### Compatibilité des loggers

| Module           | Versions  | Type de prise en charge    |
| ---------------- | --------- | --------------- |
| [bunyan][48]     | `>=1`     | Prise en charge complète |
| [paperplane][49] | `>=2.3.2` | Prise en charge complète |
| [pino][50]       | `>=2`     | Prise en charge complète |
| [winston][51]    | `>=1`     | Prise en charge complète |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js
[2]: /fr/help/
[3]: https://datadog.github.io/dd-trace-js/#integrations
[4]: https://github.com/senchalabs/connect
[5]: https://expressjs.com
[6]: https://expressjs.com/en/resources/frameworks.html
[7]: https://www.fastify.io
[8]: https://github.com/graphql/graphql-js
[9]: https://grpc.io/
[10]: https://hapijs.com
[11]: https://koajs.com
[12]: https://github.com/apigee/microgateway-core
[13]: https://github.com/apigee-internal/microgateway
[14]: https://www.npmjs.com/package/@datadog/cli
[15]: https://github.com/articulate/paperplane
[16]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[17]: http://restify.com
[18]: https://nodejs.org/api/dns.html
[19]: https://nodejs.org/api/fs.html
[20]: https://nodejs.org/api/http.html
[21]: https://nodejs.org/api/https.html
[22]: https://nodejs.org/api/http2.html
[23]: https://nodejs.org/api/net.html
[24]: https://github.com/datastax/nodejs-driver
[25]: https://github.com/couchbase/couchnode
[26]: https://github.com/elastic/elasticsearch-js
[27]: https://github.com/luin/ioredis
[28]: https://knexjs.org
[29]: https://github.com/3rd-Eden/memcached
[30]: http://mongodb.github.io/node-mongodb-native/core
[31]: https://github.com/mysqljs/mysql
[32]: https://github.com/sidorares/node-mysql2
[33]: https://node-postgres.com
[34]: https://github.com/NodeRedis/node_redis
[35]: http://tediousjs.github.io/tedious
[36]: https://github.com/googleapis/nodejs-pubsub
[37]: https://github.com/noodlefrenzy/node-amqp10
[38]: https://github.com/squaremo/amqp.node
[39]: https://github.com/coopernurse/node-pool
[40]: https://github.com/SOHU-Co/kafka-node
[41]: https://github.com/amqp/rhea
[42]: https://github.com/aws/aws-sdk-js
[43]: https://github.com/petkaantonov/bluebird
[44]: https://github.com/then/promise
[45]: https://github.com/kevincennis/promise
[46]: https://github.com/kriskowal/q
[47]: https://github.com/cujojs/when
[48]: https://github.com/trentm/node-bunyan
[49]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[50]: http://getpino.io
[51]: https://github.com/winstonjs/winston