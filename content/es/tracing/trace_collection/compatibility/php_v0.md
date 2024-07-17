---
description: 'Requisitos de compatibilidad para el rastreador de PHP '
further_reading:
- link: tracing/trace_collection/dd_libraries/php
  tag: Documentación
  text: Instrumentar tu aplicación
kind: documentación
title: Requisitos de compatibilidad de PHC (heredado)
---
<div class="alert alert-warning">Esta documentación es para el rastreador de PHP v0.x. Si estás buscando la documentación del rastreador de PHP v1.x, consulta la última documentación de <a href="/tracing/trace_collection/compatibility/PHP/">Requisitos de compatibilidad de PHP </a>.
.</div>

## Política de soporte técnico de tiempo de ejecución de PHP APM

La biblioteca de PHP Datadog Trace es de código abierto - consulta el [repositorio GitHub][1] para obtener más información.

Datadog APM para PHP se basa en dependencias definidas en versiones específicas del sistema operativo host, el tiempo de ejecución de PHP,
determinadas <txprotected>bibliotecas</txprotected> de PHP y el Datadog Agent o API.
Cuando estas versiones dejan de tener soporte técnico de sus encargados de mantenimiento, Datadog APM para PHP limita su soporte técnico a estas también.

#### Niveles de soporte técnico

| **Nivel**                                              | **Asistencia prestada**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte técnico</span>      |  Sin implementación. [Ponte en contacto con nuestro equipo de atención al cliente para solicitudes especiales][2].                                                             |
| <span id="support-beta">Beta</span>                    |  Implementación inicial. Puede que aún no contenga todas las funciones. El soporte técnico para nuevas funciones, correcciones de errores y de seguridad se proporciona en el mejor de los casos.                                    |
| <span id="support-ga">Disponibilidad general (GA)</span> |  Implementación completa de todas las funciones. Soporte técnico completo para nuevas funciones, correcciones de errores y de seguridad.                                                                                    |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Soporte técnico solo para correcciones de errores y seguridad.                                                              |
| <span id="support-legacy">Heredado</span>                |  Implementación heredada. Puede tener función limitada, pero no se proporciona mantenimiento. [Ponte en contacto con el equipo de asistencia][2] para solicitudes especiales. |
| <span id="support-eol">Final del servicio (EOL)</span>        |  Sin soporte técnico. La versión todavía se puede utilizar, pero no se proporcionan correcciones de errores.                                                                                                  |


PHP APM admite las siguientes versiones de PHP (ZTS y NTS):

<div class="alert alert-info">
<strong>Nota:</strong>
PHP versión 5.x tiene soporte técnico total hasta la versión 0.75.0. Ahora está en modo de mantenimiento y recibe soporte técnico con correcciones de seguridad y errores importantes hasta el 31 de diciembre de 2023.
<br>
Si estás utilizando la versión PHP 5.x en tu aplicación y tienes una solicitud de función que es crítica para las necesidades de tu negocio, ponte en contacto con <a href="https://www.datadoghq.com/support/">Soporte técnico de Datadog</a>.
<br>
Se recomienda utilizar <a href="https://www.PHP.net/supported-versions">versiones con soporte técnico oficial</a> de PHP, especialmente 7.4, 8.0 y 8.1.
</div>

| PHP Versión    | Nivel de soporte técnico                         | Paquete versión |
|:---------------|:--------------------------------------|:----------------|
| 8.3.x          | Beta (hasta el lanzamiento oficial de PHP) | > `0.93.0+`     |
| 8.2.x          | Disponibilidad general                  | > `0.82.0+`     |
| 8.1.x          | Disponibilidad general                  | > `0.66.0+`     |
| 8.0.x          | Disponibilidad general                  | > `0.52.0+`     |
| 7.4.x          | Disponibilidad general                  | Todas             |
| 7.3.x          | Disponibilidad general                  | Todas             |
| 7.2.x          | Disponibilidad general                  | Todas             |
| 7.1.x          | Disponibilidad general                  | Todas             |
| 7.0.x          | Disponibilidad general                  | Todas             |
| 5.6.x          | Mantenimiento (hasta el 31 de diciembre de 2023) | Todas             |
| 5.5.x          | Mantenimiento (hasta el 31 de diciembre de 2023) | Todas             |
| 5.4.x          | Mantenimiento (hasta el 31 de diciembre de 2023) | Todas             |

PHP APM admite los siguientes SAPI:

| SAPI           | Tipo de soporte técnico    |
|:---------------|:----------------|
| apache2handler | Totalmente compatible |
| cli            | Totalmente compatible |
| fpm-fcgi       | Totalmente compatible |
| cgi-fcgi       | Totalmente compatible |

## Arquitecturas de procesador compatibles

PHP APM es compatible con las siguientes arquitecturas:

| Arquitecturas de procesadores                 | Nivel de soporte técnico     | Paquete versión | Tipo de soporte técnico               |
|-----------------------------------------|-------------------|---------------|----------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)    | [GA](#support-ga) | Todas           | Todas las versiones compatibles de PHP  |
| Linux MUSL amd64 (`x86-64-linux-musl`)  | [GA](#support-ga) | Todas           | Todas las versiones compatibles de PHP  |
| Linux GNU arm64 (`aarch64-linux-gnu`)   | [GA](#support-ga) | > `0.78.0`    | Todas las versiones compatibles de PHP  |
| Linux MUSL arm64 (`aarch64-linux-musl`) | [GA](#support-ga) | > `0.78.0`    | Todas las versiones compatibles de PHP  |
| Windows amd64 (`x86_64-windows`)        | [GA](#support-ga) | > `0.98.0`    | PHP 7.2+                   |

### Integraciones

#### Compatibilidad con marcos web

Por defecto, Datadog **soporta todos los marcos web de PHP** desde el primer momento, ya sea con instrumentación al nivel del marco o con rastreo web genérico.

La instrumentación al nivel del marco incluye el rastreo de métodos internos y el etiquetado de marcos específicos.

El rastreo web genérico incluye un tramo (span) `web.request` para rastrear la latencia y los errores que se originan en la llamada, además de tramos para las <txprotected>bibliotecas</txprotected> con soporte técnico - por ejemplo: base de datos y clientes HTTP.

En la siguiente tabla se enumeran algunos de los marcos y versiones que Datadog rastrea con éxito.

**Marcos web**:

| Módulo         | Versiones                                | Tipo de soporte técnico               | Nivel de instrumentación           |
|:---------------|:----------------------------------------|:---------------------------|:--------------------------------|
| CakePHP        | 2.x, 3.x, 4.x, 5.x                      | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| CodeIgniter    | 2.x, 3.x                                | PHP 7+                     | Instrumentación al nivel del marco |
| Drupal         |                                         | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| FuelPHP        | 1.1                                     | PHP 7+                     | Rastreo web genérico             |
| Laminas        |                                         | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Laravel        | 4.2, 5.x, 6.x                           | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Laravel 8+     | 8.x, 9.x, 10.x, 11.x (rastreador `0.52.0+`) | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Lumen          | 5.2+                                    | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Magento        | 1                                       | Todas las versiones compatibles de PHP  | Rastreo web genérico             |
| Magento        | 2                                       | PHP 7+                     | Instrumentación al nivel del marco |
| Neos Flow      | 1.1                                     | Todas las versiones compatibles de PHP  | Rastreo web genérico             |
| Phalcon        | 1.3, 3.4                                | Todas las versiones compatibles de PHP  | Rastreo web genérico             |
| RoadRunner     | 2.x                                     | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Slim           | 2.x, 3.x, 4.x                           | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Symfony        | 2.x, 3.3, 3.4, 4.x, 5.x, 6.x, 7.x       | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| WordPress      | 4.x, 5.x, 6.x                           | PHP 7+                     | Instrumentación al nivel del marco |
| Yii            | 1.1, 2.0                                | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Zend Framework | 1.12, 1.21                              | Todas las versiones compatibles de PHP  | Instrumentación al nivel del marco |
| Zend Framework | 2.x                                     | Todas las versiones compatibles de PHP  | Rastreo web genérico             |

Ten en cuenta que aunque no veas tu marco web en esta lista, es compatible con la última versión del rastreador.

Datadog está añadiendo continuamente más soporte técnico para el rastreo en profundidad de marcos web de PHP. Para solicitar soporte técnico para metadatos de tramos adicionales e información interna del marco, ponte en contacto con nuestro impresionante [equipo de soporte][3].

#### Compatibilidad con biblioteca CLI 

El rastreo del CLI SAPI está desactivado por defecto. Para habilitar el rastreo de los scripts CLI de PHP, configura `DD_TRACE_CLI_ENABLED=true`.

| Módulo          | Versiones            | Tipo de soporte técnico    |
|:----------------|:--------------------|:----------------|
| Consola CakePHP | 2.x                 | Totalmente compatible |
| Laravel Artisan | 5.x, 8.x, 9.x, 10.x | Totalmente compatible |
| Symfony CLI     | 4.x, 5.x, 6.x       | Totalmente compatible |

Para solicitar soporte técnico para <txprotected>bibliotecas</txprotected>CLI adicionales, ponte en contacto con nuestro magnífico [equipo de soporte][3].

#### Compatibilidad de almacenes de datos

| Módulo                                                                  | Versiones                   | Tipo de soporte técnico    |
|-------------------------------------------------------------------------|----------------------------|-----------------|
| Amazon RDS (utilizando PDO o MySQLi)                                        | *(Cualquier PHP compatible)*      | Totalmente compatible |
| Elasticsearch                                                           | 1+                         | Totalmente compatible |
| Eloquent                                                                | Versiones de Laravel compatibles | Totalmente compatible |
| Colas Laravel                                                          | Versiones de Laravel compatibles | Totalmente compatible |
| Memcache                                                                | *(Cualquier PHP compatible)*      | Totalmente compatible |
| Memcached                                                               | *(Cualquier PHP compatible)*      | Totalmente compatible |
| MongoDB - a través de la extensión [mongo][4]                                      | 1.4.x                      | Totalmente compatible |
| MySQLi                                                                  | *(Cualquier PHP compatible)*      | Totalmente compatible |
| PDO                                                                     | *(Cualquier PHP compatible)*      | Totalmente compatible |
| PhpRedis                                                                | 3, 4, 5                    | PHP 7, 8        |
| Predis                                                                  | 1.1                        | Totalmente compatible |
| SQLSRV                                                                  | *(Cualquier PHP compatible)*      | Totalmente compatible |

Para solicitar soporte técnico para almacenes de datos adicionales, ponte en contacto con nuestro impresionante [equipo de asistencia][3].

#### Compatibilidad de bibliotecas

| Módulo                                                    | Versiones              | Tipo de soporte técnico    |
|:----------------------------------------------------------|:----------------------|:----------------|
| [php-amqplib][10] | 2.x, 3.x              | PHP 7.1+        |
| Curl                                                      | *(Cualquier PHP compatible)* | Totalmente compatible |
| Guzzle                                                    | 5.x, 6.x, 7.x         | Totalmente compatible |


Para solicitar soporte técnico para <txprotected>bibliotecas</txprotected>adicionales, ponte en contacto con nuestro magnífico [equipo de asistencia][3].

#### Stacks tecnológicos de llamadas en profundidad en PHP 5

El stack tecnológico de llamadas está limitado en PHP 5. Consulta la [página para solucionar problemas del stack tecnológico de llamadas en profundidad][5] para obtener más información.

### Generadores

La instrumentación [generadores][6] no es compatible con PHP 5 y PHP 7.

### PCNTL

Datadog soporta el rastreo de procesos bifurcados usando [pcntl][7]. Cuando se detecta una llamada a `pcntl_fork`, se crea un tramo dedicado y se instrumenta el proceso bifurcado. Esto puede desactivarse con `DD_TRACE_FORKED_PROCESS`. Consulta la [página de configuración de bibliotecas][9] para obtener más detalles.

Si la aplicación invoca `pcntl_unshare(CLONE_NEWUSER);` y el rastreador está instalado, la aplicación se bloquea fatalmente. Esto ocurre porque `unshare` con `CLONE_NEWUSER` requiere que el proceso [no sea encadenado][8], mientras que el rastreador PHP utiliza un subproceso separado para enviar trazas (traces) al Datadog Agent sin bloquear el proceso principal.

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-php
[2]: https://www.datadoghq.com/support/
[3]: /es/help