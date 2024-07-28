---
code_lang: NodeJS
code_lang_weight: 50
title: Requisitos de compatibilidad de Node.js
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la biblioteca Node.js, para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones                         | Versión mínima del rastreador NodeJS                       |
|----------------------------------------|----------------------------------------------------|
| Detección de amenazas                       | 4.0.0                                              |
| Protección frente a amenazas                      | 4.0.0                                              |
| Personalizar la respuesta a las solicitudes bloqueadas | 4.1.0                                              |
| Análisis de la composición del software (SCA)    | 4.0.0                                              |
| Seguridad del código                          | 4.18.0 para Node.js 16 o posterior, o 5.0.0 para Node.js 18 o posterior.   |
| Seguimiento automático de los eventos de actividades de usuarios | 4.4.0 para Node.js 16 o posterior                              |
| Seguridad de la API                           | 4.30.0 para Node.js 16 o posterior, o 5.6.0 para Node.js 18 o posterior.   |

La versión mínima del rastreador para obtener todas las funciones de seguridad de las aplicaciones compatibles con Node.js es la v4.30.0.


**Nota**:
- La protección frente a amenazas requiere habilitar la [configuración remota][2], que se incluye en la versión mínima del rastreador indicada.

### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Análisis de la composición del software |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | beta                          |

## Compatibilidad con lenguajes y marcos

### Compatibilidad con versiones de Node.js

Cuando el proyecto Node.js deja de ser compatible con una versión principal de LTS (cuando llega al fin de su ciclo de vida), también deja de ser compatible con la siguiente versión principal de `dd-trace`.
La última versión principal de la biblioteca `dd-trace` es compatible con esa versión EOL de Node.js durante al menos otro año en modo de mantenimiento.

Algunos problemas no pueden solucionarse en `dd-trace` y deben solucionarse en Node.js. Cuando esto ocurre y la versión de Node.js en cuestión es EOL, no es posible solucionar el problema sin pasar a otra versión que no sea EOL.
Datadog no ofrece nuevas versiones de `dd-trace` para ofrecer una compatibilidad específica para las líneas de versiones principales de Node.js que no son LTS (versiones impares).

Para obtener el mejor nivel de compatibilidad, ejecuta siempre la última versión LTS de Node.js y la última versión principal de `dd-trace`. Sea cual sea la versión de Node.js que utilices, utiliza también la última versión de Node.js en esa línea de versiones, para asegurarte de que dispones de las últimas correcciones de seguridad.

Para obtener más información sobre la versión de Node.js, consulta la [documentación oficial de Node.js][4].



### Compatibilidad con sistemas operativos

Los siguientes sistemas operativos son oficialmente compatibles con `dd-trace`. Es probable que cualquier sistema operativo que no aparezca en la lista funcione, pero con algunas características ausentes, por ejemplo, las funciones de seguridad de las aplicaciones, la generación de perfiles y las métricas de tiempo de ejecución. En general, son compatibles los sistemas operativos que se mantienen de forma activa en el momento del lanzamiento inicial de una versión principal.


| Sistema operativo | Arquitecturas | Versiones mínimas                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |





### Compatibilidad con marcos web

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- Si tu marco no se encuentra en la siguiente lista, *La *Seguridad del código** seguirá detectando las siguientes vulnerabilidades: Cifrado débil, Hashing débil, Cookie insegura, Cookie sin marca HttpOnly y Cookie sin marca SameSite.


| Marco | Versiones | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Seguridad del código? |
|-----------|----------|-----------------------------|------------------------------|----------------------------------------------------|
| express   | igual o anterior a la v4      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| nextjs    | igual o anterior a la v11.1   | {{< X >}}                   |                              |                                                    |





<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>


### Compatibilidad de marcos de red


**El rastreo de redes proporciona:**

- Rastreo distribuido en tus aplicaciones
- Bloqueo basado en solicitudes

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.



| Marco | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Seguridad del código? |
|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| http      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| https     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


<div class="alert alert-info">Si no encuentras el marco que buscas en la lista, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Compatibilidad con almacenes de datos


**El rastreo de almacenes de datos proporciona:**

- Temporización de la solicitud a la respuesta
- Información de consulta (por ejemplo, una cadena de consulta desinfectada)
- Captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- **El Análisis de la composición del software** es compatible con todos los marcos.
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.


| Marco                | Versiones  | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? | ¿Seguridad del código? |
|--------------------------|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| [@apollo/server][43]     | `>=4`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [apollo-server-core][44] | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [cassandra-driver][28]   | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [couchbase][29]          | `^2.4.2`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [elasticsearch][30]      | `>=10`    | {{< X >}}                   | {{< X >}}                    |                                                    |
| [ioredis][31]            | `>=2`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [knex][32]               | `>=0.8`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mariadb][5]             | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [memcached][33]          | `>=2.2`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql][35]              | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql2][36]             | `>=1`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [oracledb][37]           | `>=5`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [pg][38]                 | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [redis][39]              | `>=0.12`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sharedb][40]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [tedioso][41]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sequelize][42]          | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco       | Versión mínima de marco |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /es/tracing/trace_collection/compatibility/nodejs/
[2]: /es/agent/remote_config/#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
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
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core