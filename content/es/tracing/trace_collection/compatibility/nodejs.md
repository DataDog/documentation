---
aliases:
- /es/tracing/compatibility_requirements/nodejs
- /es/tracing/setup_overview/compatibility_requirements/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Requisitos de compatibilidad del rastreador de Node.js
further_reading:
- link: tracing/trace_collection/dd_libraries/nodejs
  tag: Documentación
  text: Instrumentar tu aplicación
title: Requisitos de compatibilidad de Node.js
type: multi-code-lang
---
## Versiones

### Control de versiones

El control de versiones de la biblioteca de rastreo de Datadog Node.js sigue [control de versiones semántico][1]. Cuando se publica una nueva versión principal, se convierte en la línea de publicación principal, donde aterrizan todas las nuevas funciones, correcciones de errores y parches de seguridad. Aquí hay un esquema de lo que constituye cada tipo de cambio de control de versiones semántico:

| Principal          | Secundaria                                                          | Parche    |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| Cambios incompatibles con versiones anteriores                  | Añadir cualquier cosa que sea compatible con versiones anteriores (no las interrumpe) | Correcciones de seguridad        |
| Cambios en la API incompatibles con versiones anteriores                         | Incorporaciones a la API                   | Corrección de errores             |
| Cambios de funcionalidad incompatibles con versiones anteriores | Funciones adicionales                                                 | |
| Dejar de dar soporte técnico a, por ejemplo, versiones de Node.js, <txprotected>bibliotecas con soporte técnico</txprotected> u otras funciones     | Añadir soporte técnico probado para, por ejemplo, versiones de Node.js, <txprotected>bibliotecas con soporte técnico</txprotected> u otras funciones   |  |

Cuando una versión tiene cambios que podrían estar en múltiples categorías de control de versiones semántico, se elige la más alta. Las [Notas de lanzamiento][2] se publican con cada versión de GitHub.

### Mantenimiento

El modo de mantenimiento es un periodo durante el cual una versión recibe solo correcciones de seguridad y de errores siempre que sea posible, pero no nuevas funciones, salvo en casos concretos. Las versiones principales de `dd-trace` entran en el modo de mantenimiento cuando se lanza la siguiente versión principal de dd-trace. El periodo de mantenimiento dura un año después de la fecha de lanzamiento de la versión posterior.

Por ejemplo, si la versión 5.0.0 de `dd-trace` se lanza el 4 de mayo de 2023, la línea de versiones 4.x.x tendrá soporte técnico en el modo de mantenimiento hasta el 4 de mayo de 2024. Durante este periodo de modo de mantenimiento, se aplicarán parches de seguridad y errores siempre que sea posible.

Si tienes alguna pregunta o duda sobre nuestro soporte técnico para una versión concreta de `dd-trace-js`, [ponte en contacto con el servicio de soporte técnico][3] para hablar de ello.

### Soporte técnico de versiones de Node.js

Cuando el proyecto Node.js deja de dar soporte técnico a una línea de versión principal LTS (cuando pasa a EOL), se le deja de dar soporte técnico en la siguiente versión principal de `dd-trace`.
La última línea de versión principal que da soporte técnico de la biblioteca de `dd-trace` brinda soporte técnico a esa versión EOL de Node.js durante por lo menos otro año en el modo de mantenimiento.

Algunos problemas no pueden resolverse en `dd-trace` y deben solucionarse en Node.js. Cuando esto ocurre y la versión de Node.js en cuestión es EOL, no es posible resolver el problema sin pasar a otra versión que no sea EOL.
En  Datadog no se realizan nuevas versiones de `dd-trace` para ofrecer soporte técnico para las líneas de versiones principales de Node.js que no son LTS (versiones impares).

Para obtener el mejor nivel de soporte técnico, ejecuta siempre la última versión LTS de Node.js, y la última versión principal de `dd-trace`. Sea cual sea la línea de lanzamiento de Node.js que utilices, utiliza también la última versión de Node.js en esa línea de lanzamiento, para asegurarte de que tenga las últimas correcciones de seguridad.

Para más información sobre la versión de Node.js, consulta la [documentación oficial de Node.js][4].

### Soporte técnico de sistemas operativos

Los siguientes sistemas operativos tienen soporte técnico oficial de `dd-trace`. Es probable que cualquier sistema operativo que no aparezca en la lista siga funcionando, pero con algunas funciones ausentes, por ejemplo ASM, perfilado y métricas de tiempo de ejecución. Hablando en general, se brinda soporte técnico a los sistemas operativos que se mantienen activamente en el momento del lanzamiento inicial de una versión principal.

| Versión de dd-trace    | Sistema operativo      | Arquitecturas         | Versiones mínimas                         |
| ------------------- | --------------------- | --------------------- | ---------------------------------------- |
| 3.x                 | Linux (glibc)         | arm, arm64, x64       | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
|                     | Linux (musl)          | arm, arm64, x64       | Alpine 3.13                              |
|                     | macOS                 | arm64, x64            | Catalina (10.15)                         |
|                     | Windows               | ia32, x64             | Windows 8.1, Windows Server 2012         |
| 2.x                 | Linux (glibc)         | arm, arm64, ia32, x64 | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
|                     | Linux (musl)          | arm, arm64, ia32, x64 | Alpine 3.10                              |
|                     | macOS                 | arm64, x64            | Yosemite (10.10)                         |
|                     | Windows               | ia32, x64             | Windows 8.1, Windows Server 2012         |

## Integraciones con soporte técnico

APM proporciona Instrumentación predefinida para muchos marcos de trabajo populares y <txprotected>bibliotecas</txprotected> mediante un sistema de extensiones. Para solicitar soporte técnico para un módulo que no está en la lista, contacta con nuestro impresionante [equipo de soporte técnico][3].

Para obtener más información sobre cómo intercambiar y configurar las extensiones, restaura la [documentación de la API][5].

### Compatibilidad con marcos web

| Módulo                  | Versiones | Tipo de soporte técnico    | Notas                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][6]           | `>=2`    | Totalmente compatible |                                             |
| [express][7]           | `>=4`    | Totalmente compatible | Compatible con Sails, Loopback y [más][8]     |
| [fastify][9]           | `>=1`    | Totalmente compatible |                                             |
| [graphql][10]           | `>=0.10` | Totalmente compatible | Compatible con Apollo Server y express-graphql |
| [graphql-yoga][65]      | `>=3.6.0`| Totalmente compatible | Compatible con el ejecutor graphql-yoga v3          |
| [gRPC][11]              | `>=1.13` | Totalmente compatible |                                            |
| [hapi][12]              | `>=2`    | Totalmente compatible | Admite versiones [@hapi/hapi] `>=17.9`    |
| [koa][13]               | `>=2`    | Totalmente compatible |                                            |
| [microgateway-core][14] | `>=2.1`  | Totalmente compatible | Biblioteca de núcleo para Apigee Edge. La compatibilidad con la CLI [edgemicro][15] requiere la aplicación de parches estáticos mediante [@Datadog/cli][16]. |
| [moleculer][17]         | `>=0.14` | Totalmente compatible |                                            |
| [next][18]              | `>=9.5`  | Totalmente compatible | Consulta la nota sobre el uso de Complex framework.<br /><br />El rastreador admite las siguientes funciones de Next.js: <ul><li>Standalone (`output: 'standalone'`)</li><li>App Router</li><li>Middleware: no rastreado, utiliza las versiones del rastreador `4.18.0` y `3.39.0` o superiores para obtener la mejor experiencia.</li></ul> |
| [paperplane][19]        | `>=2.3`  | Totalmente compatible | No se admite en [modo sin servidor][20]     |
| [restify][21]           | `>=3`    | Totalmente compatible |                                            |

#### Uso de marco complejo

Algunos marcos de Node.js modernos y complejos, como Next.js y Nest.js, proporcionan su propio punto de entrada a una aplicación. Por ejemplo, en lugar de ejecutar `node app.js`, puede que necesites ejecutar `next start`. En estos casos, el punto de entrada es un archivo que viene en el paquete de marco, no un archivo local de la aplicación (`app.js`).

Cargar el rastreador de Datadog al principio del código de la aplicación no es efectivo porque el marco podría haber cargado ya módulos que deberían instrumentarse.

Para cargar el rastreador antes que el marco, utiliza uno de los siguientes métodos:

Antepón a todos los comandos que ejecutes una variable entorno:

```shell
NODE_OPTIONS='--require dd-trace/init' npm start

O bien, modifica el archivo `package.json` si sueles iniciar una aplicación con scripts de ejecución npm o yarn:

```plain
    // comando existente
    "start": "next start",

    // comando sugerido
    "start": "node --require dd-trace/initialize ./node_modules/next start",
    "start": "NODE_OPTIONS='--require dd-trace/initialize' ./node_modules/next start",
```

**Nota**: Los ejemplos anteriores utilizan Next.js, pero el mismo enfoque se aplica a otros marcos con puntos de entrada personalizados, como Nest.js. Adapta los comandos a tu marco y configuración específicos. Cualquiera de los comandos debería funcionar, pero el uso de `NODE_OPTIONS` también se aplica a cualquier proceso secundario de Node.js.


### Compatibilidad con módulos nativos

| Módulo      | Tipo de soporte técnico        | Notas |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][22]   | Totalmente compatible     |       |
| [http][24]  | Totalmente compatible     |       |
| [https][25] | Totalmente compatible     |       |
| [http2][26] | Compatibilidad parcial | Actualmente solo se admiten clientes HTTP2 y no servidores. |
| [net][27]   | Totalmente compatible     |       |

### Compatibilidad con almacenes de datos

| Módulo                 | Versiones | Tipo de soporte técnico    | Notas                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][28] | `>=3`    | Totalmente compatible |                                                  |
| [couchbase][29]        | `^2.4.2` | Totalmente compatible |                                                  |
| [elasticsearch][30]    | `>=10`   | Totalmente compatible | Compatible con las versiones de `@elastic/elasticsearch` `>=5` |
| [ioredis][31]          | `>=2`    | Totalmente compatible |                                                  |
| [knex][32]             | `>=0.8`  | Totalmente compatible | Esta integración es solo para la propagación de contexto |
| [mariadb][63]          | `>=3`    | Totalmente compatible |                                                  |
| [memcached][33]        | `>=2.2`  | Totalmente compatible |                                                  |
| [mongodb-core][34]     | `>=2`    | Totalmente compatible | Compatible con Mongoose                                |
| [mysql][35]            | `>=2`    | Totalmente compatible |                                                  |
| [mysql2][36]           | `>=1`    | Totalmente compatible |                                                  |
| [oracledb][37]         | `>=5`    | Totalmente compatible |                                                  |
| [pg][38]               | `>=4`    | Totalmente compatible | Admite `pg-native` cuando se utiliza con `pg`         |
| [redis][39]            | `>=0.12` | Totalmente compatible |                                                  |
| [sharedb][40]          | `>=1`    | Totalmente compatible |                                                  |
| [tedious][41]          | `>=1`    | Totalmente compatible | Controlador de SQL Server para `mssql` y `sequelize`    |

### Compatibilidad con Worker

| Módulo                     | Versiones | Tipo de soporte técnico    | Notas                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][42] | `>=1.2`  | Totalmente compatible |                                                        |
| [amqp10][43]               | `>=3`    | Totalmente compatible | Compatible con brokers AMQP 1.0 (como ActiveMQ o Apache Qpid) |
| [amqplib][44]              | `>=0.5`  | Totalmente compatible | Compatible con brokers AMQP 0.9 (como RabbitMQ o Apache Qpid) |
| [generic-pool][45]         | `>=2`    | Totalmente compatible |                                                        |
| [kafkajs][46]         | `>=1.4`    | Totalmente compatible |                                                        |
| [rhea][48]                 | `>=1`    | Totalmente compatible |                                                        |

### Compatibilidad con SDK

| Módulo             | Versiones   | Tipo de soporte técnico    | Notas                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][49]      | `>=2.1.35` | Totalmente compatible | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS y solicitudes genéricas. |
| [openai][64]       | `3.x`      | Totalmente compatible |                                                        |

### Compatibilidad con biblioteca Promise

| Módulo           | Versiones  | Tipo de soporte ténico    |
| ---------------- | --------- | --------------- |
| [bluebird][50]   | `>=2`     | Totalmente compatible |
| [promise][51]    | `>=7`     | Totalmente compatible |
| [promise-js][52] | `>=0.0.3` | Totalmente compatible |
| [q][53]          | `>=1`     | Totalmente compatible |
| [when][54]       | `>=3`     | Totalmente compatible |

### Compatibilidad con registradores

| Módulo           | Versiones  | Tipo de soporte técnico    |
| ---------------- | --------- | --------------- |
| [bunyan][55]     | `>=1`     | Totalmente compatible |
| [paperplane][56] | `>=2.3.2` | Totalmente compatible |
| [pino][57]       | `>=2`     | Totalmente compatible |
| [winston][58]    | `>=1`     | Totalmente compatible |

## <txprotected>Bibliotecas</txprotected> sin soporte técnico

### Fibers

[`fibers`][59] es incompatible con `async_hooks`, un [módulo] de Node.js[60] utilizado por `dd-trace-js` para rastrear contextos asíncronos asegurando así un rastreo preciso. Las interacciones entre `fibers` y `async_hooks` pueden dar lugar a bloqueos imprevisibles y comportamientos indefinidos. Así, el uso de `dd-trace-js` con aplicaciones que invocan `fibers` directa o indirectamente a través de marcos como [Meteor][61] puede derivar en inestabilidad (bloqueos) o rastreo incorrecto.

Para más información o para debatir [deja un comentario en este tema de github][62] o [ponte en contacto con el servicio de soporte técnico][3] para seguir hablando.

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: https://github.com/DataDog/dd-trace-js/releases
[3]: /es/help/
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://datadog.github.io/dd-trace-js/#integrations
[6]: https://github.com/senchalabs/connect
[7]: https://expressjs.com
[8]: https://expressjs.com/en/resources/frameworks.html
[9]: https://www.fastify.io
[10]: https://github.com/graphql/graphql-js
[11]: https://grpc.io/
[12]: https://hapijs.com
[13]: https://koajs.com
[14]: https://github.com/apigee/microgateway-core
[15]: https://github.com/apigee-internal/microgateway
[16]: https://www.npmjs.com/package/@datadog/cli
[17]: https://moleculer.services/
[18]: https://nextjs.org/
[19]: https://github.com/articulate/paperplane
[20]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[21]: http://restify.com
[22]: https://nodejs.org/api/dns.html
[23]: https://nodejs.org/api/fs.html
[24]: https://nodejs.org/api/http.html
[25]: https://nodejs.org/api/https.html
[26]: https://nodejs.org/api/http2.html
[27]: https://nodejs.org/api/net.html
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: http://mongodb.github.io/node-mongodb-native/core
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/googleapis/nodejs-pubsub
[43]: https://github.com/noodlefrenzy/node-amqp10
[44]: https://github.com/squaremo/amqp.node
[45]: https://github.com/coopernurse/node-pool
[46]: https://github.com/tulios/kafkajs
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
[59]: https://github.com/laverdet/node-fibers
[60]: https://nodejs.org/api/async_hooks.html
[61]: https://www.meteor.com/
[62]: https://github.com/DataDog/dd-trace-js/issues/1229
[63]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[64]: https://github.com/openai/openai-node
[65]: https://github.com/dotansimha/graphql-yoga