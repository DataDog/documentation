---
code_lang: php
code_lang_weight: 40
title: Requisitos de compatibilidad de PHP
type: lenguaje de código múltiple
---

## Funciones de seguridad de las aplicaciones

Las siguientes funciones de seguridad de las aplicaciones son compatibles con la librería PHP para la versión de rastreador especificada:

| Función de seguridad de las aplicaciones                   | Versión mínima de rastreador PHP |
| -------------------------------- |----------------------------|
| Detección de amenazas | 0.84.0                     |
| Protección frente a amenazas  | 0.86.0                     |
| Personalizar la respuesta a las solicitudes bloqueadas | 0.86.0 |
| Análisis de la composición del software (SCA) | 0.90.0              |
| Seguridad del código        | No compatible              |
| Rastreo automático de los eventos de actividad de los usuarios | 0.89.0                     |
| Seguridad de la API | 0.98.0 |

La versión mínima de rastreador para contar con todas las funciones de ASM compatibles para PHP es v0.98.0.


<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>

### Tipos de despliegue compatibles
| Tipo        | Compatibilidad con la detección de amenazas | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate |                          |                               |
| AWS Lambda  |                          |                               |

## Compatibilidad con lenguajes y marcos

<div class="alert alert-info">
<strong>Nota:</strong>
Se recomienda utilizar <a href="https://www.PHP.net/supported-versions">versiones oficialmente compatibles</a> de PHP, especialmente v8.0, v8.1 yv 8.2.
</div>

| Versión de PHP    | Nivel de compatibilidad                         | Versión del paquete |
|:---------------|:--------------------------------------|:----------------|
| 8.3.x          | Disponibilidad general                  | anterior a `0.95.0 o posterior`     |
| 8.2.x          | Disponibilidad general                  | anterior a `0.82.0 o posterior`     |
| 8.1.x          | Disponibilidad general                  | anterior a `0.66.0 o posterior`     |
| 8.0.x          | Disponibilidad general                  | anterior a `0.52.0 o posterior`     |
| 7.4.x          | Disponibilidad general                  | Todas             |
| 7.3.x          | Disponibilidad general                  | Todas             |
| 7.2.x          | Disponibilidad general                  | Todas             |
| 7.1.x          | Disponibilidad general                  | Todas             |
| 7.0.x          | Disponibilidad general                  | Todas             |

Las funciones de seguridad de las aplicaciones para PHP admiten los siguientes SAPI:

| SAPI           | Tipo de compatibilidad    |
|:---------------|:----------------|
| apache2handler | Totalmente compatible |
| cli            | Totalmente compatible |
| fpm-fcgi       | Totalmente compatible |
| cgi-fcgi       | Totalmente compatible |

## Arquitecturas de procesador compatibles

Las funciones de seguridad de las aplicaciones para PHP admiten las siguientes arquitecturas:

| Arquitecturas de procesadores                   | Nivel de compatibilidad         | Versión del paquete                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)      | GA                    | Todas                                    |
| Linux MUSL amd64 (`x86-64-linux-musl`)    | GA                    | Todas                                    |
| Linux GNU arm64 (aarch64-linux-gnu)       | GA                    | &gt; `0.95.0`                             |
| Linux MUSL arm64 (aarch64-linux-musl)     | GA                    | &gt; `0.95.0`                             |

La librería PHP de Datadog es compatible con PHP versión 7.0 y posteriores en las siguientes arquitecturas:

- Linux (GNU) x86-64 y arm64
- Alpine Linux (musl) x86-64 y arm64

La librería admite el uso de todos los marcos PHP y también el uso de ningún marco.


### Compatibilidad con web frameworks

- Detalles de una solicitud HTTP originada por un atacante
- Etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- Rastreo distribuido para visualizar flujos (flows) de ataques en tus aplicaciones

##### Notas sobre la función de seguridad de las aplicaciones
- El **Análisis de la composición del software** no es compatible
- La **Seguridad del código** no es compatible

Los siguientes marcos no son instrumentados directamente por la Seguridad de las aplicaciones, pero son indirectamente compatibles a través de la instrumentación del tiempo de ejecución.

| Marco                | Versiones    | ¿Es compatible la detección de amenazas? | ¿Es compatible la protección frente a amenazas? |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| CakePHP       | 2.x       |  {{< X >}} | {{< X >}} |
| CodeIgniter   | 2.x       |  {{< X >}} | {{< X >}} |
| FuelPHP       | 1.1        |  {{< X >}} | {{< X >}} |
| Laravel       | 4.2, 5.x, 6.x        | {{< X >}} | {{< X >}} |
| Laravel 8     | 8.x (tracer 0.52.0 o posterior) | {{< X >}} | {{< X >}} |
| Lumen         | 1.9-2.29    |  {{< X >}} | {{< X >}} |
| Magento       |  3.8 o posterior       |  {{< X >}} | {{< X >}} |
| Neos Flow     |  3.0.x      |  {{< X >}} | {{< X >}} |
| Phalcon       | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Slim          | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Symfony 4     | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Symfony 5     | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Wordpress     | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Yii           | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Zend          | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1 o posterior        |  {{< X >}} | {{< X >}} |
| RoadRunner    | 2.x         |  {{< X >}} | {{< X >}} |


### Compatibilidad con almacenes de datos

**El rastreo de almacenes de datos proporciona:**

- Detección de ataques SQL
- información de consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y stacktraces

##### Notas sobre la función de seguridad de las aplicaciones
- El **Análisis de la composición del software** no es compatible
- La **Seguridad del código** no es compatible
- La **Protección frente a amenazas** también funciona en la capa de solicitud HTTP (entrada), por lo que funciona para todas las bases de datos por defecto, incluso aquellas que no aparecen en la siguiente tabla.

| Marco         | Versiones | ¿Es compatible la detección de amenazas?    | ¿Es compatible la protección frente a amenazas?|
|-------------------|-----------------|-----------------|---------------|
| Amazon RDS        | Cualquier PHP compatible | {{< X >}}  |   {{< X >}} |
| Eloquent       | Versiones de Laravel compatibles | {{< X >}} | {{< X >}} |
| Memcached        | Cualquier PHP compatible |   {{< X >}}    | {{< X >}} |
| MySQLi        | Cualquier PHP compatible | {{< X >}} | {{< X >}} |
| PDO        | Cualquier PHP compatible| {{< X >}}| {{< X >}} |
| PHPRedis        | 3, 4, 5 |   {{< X >}}    | {{< X >}} |
| Predis        | 1.1 | {{< X >}} |   {{< X >}}    |

### Compatibilidad con marcos de autenticación de usuarios

**Las integraciones con marcos de autenticación de usuarios proporcionan:**

- Eventos de inicio de sesión de usuarios, incluidos los ID de usuarios
- Monitorización de la detección de la apropiación de cuentas para eventos de inicio de sesión de usuarios

| Marco | Versión mínima de marco |
|-----------|---------------------------|
| Laravel   | 4.2                       |
| Symfony   | 3.3                       |
| Wordpress | 4.8                       |

[1]: /es/tracing/trace_collection/compatibility/php/
[2]: /es/agent/remote_config/#enabling-remote-configuration
