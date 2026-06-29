---
further_reading:
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Mitigar los principales riesgos para la seguridad de las API
title: Inventario de seguridad de la API
---

## Información general

El [Inventario de seguridad de la API][7] monitoriza el tráfico de tu API para proporcionar visibilidad de la postura de seguridad de tus API, incluyendo:

- **Autenticación**: Tipo de autenticación utilizada, como autorización básica y mediante clave de API.
- **Exposición pública**: Si la API procesa tráfico de Internet.
- **Estado de producción**: Si la API se está ejecutando en un entorno de producción.
- **Flujos de datos confidenciales**: Datos confidenciales gestionados por la API y flujos entre las API.
- **Exposición a ataques**: Si el endpoint es objetivo de ataques (con la tecnología de la [Gestión de amenazas a aplicaciones][2]).
- **Vulnerabilidades**: Si el endpoint contiene una vulnerabilidad (con la tecnología del [Análisis de la composición del software][3]).

Con el Inventario de seguridad de la API puedes:

- Observar rápidamente tus endpoints expuestos públicamente que no requieren solicitudes autenticadas.
- Observar rápidamente tus endpoints expuestos públicamente que gestionan datos confidenciales, como números de tarjetas de pago.
- Ver qué endpoints están en riesgo y pasar directamente al servicio de [Monitorización y protección contra amenazas][2] para una mejor investigación o respuesta.

{{< img src="security/application_security/api/api_endpoints.png" alt="Página principal del Inventario de seguridad de la API">}}

## Configuración

Las siguientes versiones de librería son compatible con el Inventario de seguridad de la API. Se requiere la [configuración remota][1].

|Tecnología|Versión mínima| Compatibilidad con el análisis de datos confidenciales |
|----------|----------|----------|
|Python    | v2.1.6   | Solicitudes y respuestas |
|Java      | v1.31.0  | Sólo solicitudes |
|PHP      | v0.98.0  | Solicitudes y respuestas |
|.NET Core | v2.42.0  | Solicitudes y respuestas |
|.NET Fx   | v2.47.0  | Solicitudes y respuestas |
|Ruby      | v1.15.0  | Sólo solicitudes |
|Golang    | v1.59.0  | Sólo solicitudes |
|Node.js   | v3.51.0, v4.30.0 o v5.6.0 | Solicitudes y respuestas |

## Cómo funciona

El inventario de la API aprovecha la librería de rastreo de Datadog con ASM habilitado para recopilar metadatos de seguridad sobre el tráfico de la API, incluido el esquema de la API, los tipos de datos confidenciales procesados y el esquema de autenticación.

El Inventario de seguridad de la API utiliza la [configuración remota][4] para gestionar y configurar reglas de análisis que detectan datos confidenciales y autenticaciones.

En cada endpoint se calculan los siguientes riesgos:

### Servicio en producción

La etiqueta (tag) `env` se comprueba en busca de patrones que representen con frecuencia entornos de no producción. Por ejemplo, si detecta valores de `dev`, `alpha`, `beta`, `sandbox`, o similares, marca el entorno como de no producción. Todos los demás entornos se marcan como de producción.


### Servicio bajo ataque

Este riesgo se detecta en los endpoints de API que han sufrido [ataques][2] en la última semana.

### Procesamiento de datos confidenciales

[ASM][2] busca patrones conocidos de datos confidenciales en las solicitudes de API. Si encuentra una coincidencia, el endpoint se etiqueta con el tipo de dato confidencial procesado.

La coincidencia se produce dentro de tu aplicación y no se envía ningún dato confidencial a Datadog.

#### Tipos de datos compatibles

| Categoría                                          | Faceta de categoría   | Faceta de tipo        |
|---------------------------------------------------|------------------|-------------------|
| Números de la seguridad social de Canadá                 | `pii`            | `canadian_sin`    |
| Números de la seguridad social de Estados Unidos             | `pii`            | `us_ssn`          |
| Números de la seguridad social del Reino Unido                     | `pii`            | `uk_nin`          |
| Números de identificación de vehículos de EE. UU.                 | `pii`            | `vin`             |
| Números de pasaporte                                  | `pii`            | `passport_number` |
| Direcciones de correo electrónico                                  | `pii`            | `email`           |
| Token web JSON (JWT)                              | `credentials`    | `json_web_token`  |
| Tokens de portador (se encuentran en las cabeceras `Authorization` )  | `credentials`    | `bearer_token`    |
| Número de tarjeta American Express                      | `payment`        | `card`            |
| Número de tarjeta Diners Club                           | `payment`        | `card`            |
| Número de tarjeta JCB                                   | `payment`        | `card`            |
| Número de tarjeta Maestro                               | `payment`        | `card`            |
| Número de tarjeta Mastercard                            | `payment`        | `card`            |
| Número de tarjeta VISA                                  | `payment`        | `card`            |
| Número de cuenta bancaria IBAN                          | `payment`        | `iban`            |

### Acceso público

Datadog marca un endpoint como público si la dirección IP del cliente está fuera de estos rangos:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

Para obtener más información sobre la configuración de librería requerida, consulta [Configuración de una cabecera IP de cliente][6].

### Endpoint no autenticado

La autenticación es determinada por:

- La presencia de las cabeceras `Authorization`, `Token` o `X-Api-Key`.
- La presencia de un ID de usuario en la traza (trace) (por ejemplo, el atributo `@usr.id` de APM).
- La solicitud ha respondido con un código de estado 401 o 403.

### Contiene vulnerabilidades explotables

Este riesgo se determina mediante el [Análisis de la composición del software][3] para el servicio que aloja el endpoint.

## Impacto en el rendimiento

Por defecto, el Inventario de seguridad de la API evalúa una de cada diez solicitudes (frecuencia de muestreo del 10%).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[2]: /es/security/application_security/threats/
[3]: /es/security/application_security/software_composition_analysis/
[4]: /es/agent/remote_config/
[6]: /es/security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[7]: https://app.datadoghq.com/security/appsec/inventory/apis
