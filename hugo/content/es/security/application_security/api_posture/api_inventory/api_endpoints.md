---
description: Haga un seguimiento del tráfico de la API para evaluar el riesgo de los
  puntos de conexión, la autenticación, los flujos de datos confidenciales y la exposición.
title: Puntos de conexión de la API
---
El explorador de [puntos de conexión de la API][1] hace un seguimiento del tráfico de su API para proporcionar visibilidad sobre la postura de Security de sus APIs, incluyendo:

- **Autenticación**: Si la API aplica autenticación.
- **Método de autenticación**: Tipo de autenticación utilizada, como Basic Auth y clave de API.
- **Exposición pública**: Si la API está procesando tráfico desde internet.
- **Flujos de datos confidenciales**: Datos confidenciales manejados por la API y los flujos entre APIs.
- **Exposición a ataques**: Si el punto de conexión es objetivo de ataques.
- **Lógica de negocio**: Lógica de negocio y sugerencias de lógica de negocio asociadas para esta API.
- **Vulnerabilidades**: Si el punto de conexión contiene una vulnerabilidad (con tecnología de [Code Security][2] y [Software Composition Analysis][3]).
- **Hallazgos**: Hallazgos de seguridad identificados en esta API.
- **Dependencias**: APIs y bases de datos de las que depende la API.

Al usar puntos de conexión de la API puede:

- Ver qué puntos de conexión procesan datos confidenciales, están autenticados, tienen vulnerabilidades o hallazgos, o están disponibles públicamente.
- Ver qué puntos de conexión están en riesgo y dirigirse directamente al servicio de [Threat Monitoring and Protection][4] para una investigación o respuesta adicional.
- Ver qué puntos de conexión están asociados a la lógica de su negocio y encontrar sugerencias de lógica de negocio basadas en el historial de tráfico de su punto de conexión.

## Configuración {#configuration}

Para ver los puntos de conexión de la API en sus servicios, **debe tener habilitada la Detección de Amenazas de App and API Protection**.

Para la integración de Amazon Web Services (AWS) API Gateway, debe configurar lo siguiente:

- [Amazon Web Services][5]
- [Amazon API Gateway Integration][6]

Los puntos de conexión de la API se descubren desde el Catálogo de Datadog y específicamente desde las definiciones de API [cargadas en Datadog][7]. Para obtener instrucciones sobre cómo cargar definiciones de API, consulte [Crear entidades][8].

Para obtener información sobre qué versiones de biblioteca son compatibles con API Inventory, consulte [Habilitar App and API Protection][9]. Se requiere [Remote Configuration][10].

|Tecnología|Versión mínima del tracer| Soporte para escaneo de datos confidenciales |
|----------|----------|----------|
|Python    | v2.1.6   | Solicitudes y respuestas |
|Java      | v1.31.0  | Solo solicitudes |
|PHP      | v0.98.0  | Solicitudes y respuestas |
|.NET Core | v2.42.0  | Solicitudes y respuestas |
|.NET Fx   | v2.47.0  | Solicitudes y respuestas |
|Ruby      | v1.15.0  | Solo solicitudes |
|Golang    | v1.59.0  | Solo solicitudes |
|Node.js   | v3.51.0, v4.30.0 o v5.6.0 | Solicitudes y respuestas |

**Nota**: En los tracers de .NET Core y .NET Fx, debe configurar la variable de entorno `DD_API_SECURITY_ENABLED=true` para que las funciones de seguridad de API funcionen correctamente.

## Cómo funciona {#how-it-works}

Los puntos de conexión de la API recopilan metadatos de seguridad sobre el tráfico de API utilizando el SDK de Datadog con App and API Protection habilitado, junto con las configuraciones de Amazon API Gateway y las definiciones de API cargadas. Estos datos incluyen el esquema de API descubierto, los tipos de datos confidenciales (PII) procesados y el esquema de autenticación en uso. La información de la API se evalúa continuamente, lo que ayuda a garantizar una vista completa y actualizada de toda su superficie de ataque de API.

Los puntos de conexión de la API utilizan [Remote Configuration][10] para administrar y configurar las reglas de escaneo que detectan datos confidenciales y autenticación.

Para verificar si los puntos de conexión descubiertos son accesibles públicamente y requieren autenticación, habilite [Escaneo de puntos de conexión][11]. El escaneo de puntos de conexión analiza activamente los puntos de conexión elegibles y enriquece el Inventario de API con la accesibilidad pública verificada, el estado de autenticación, el estado de respuesta HTTP y los datos de la última evaluación.

Se calculan los siguientes riesgos para cada punto de conexión.

## Fuentes de datos {#data-sources}

En el explorador de [puntos de conexión de la API][1], los {{< ui >}}Data Sources{{< /ui >}} muestran el origen de la visibilidad.

Se exploran las siguientes fuentes de datos.

### Amazon API Gateway {#amazon-api-gateway}

<div class="alert alert-info">Para deshabilitar esta integración para una API específica, agregue la <code>dd_skip_endpoint:true</code> etiqueta al recurso.</div>

El servicio Amazon API Gateway define formalmente la estructura de su API. La integración de Datadog AWS lee esta configuración predefinida de Amazon API Gateway, y luego Datadog utiliza esta configuración para crear entradas de puntos de conexión de la API en {{< ui >}}Inventory{{< /ui >}}.

Utilice {{< ui >}}AWS API Gateway{{< /ui >}} en {{< ui >}}Data Source{{< /ui >}} para obtener visibilidad de estos puntos de conexión expuestos. También puede utilizar la consulta `datasource:aws_apigateway`.

### Catalog {#catalog}

La fuente de datos {{< ui >}}Catalog{{< /ui >}} muestra los puntos de conexión de la API que Datadog detectó a partir de la especificación formal cargada en Datadog. La especificación de la API se adjunta o se registra como un componente de API dedicado dentro de la entidad de servicio IDP.

Esta fuente garantiza que su inventario de API esté completo al incluir todos los puntos de conexión planificados y documentados formalmente.

### Trazas de APM {#apm-traces}

La fuente de datos {{< ui >}}Spans{{< /ui >}} muestra el tráfico real y la exposición de datos. La corrección debe realizarse inmediatamente en el código, la configuración o los controles de acceso.

Las acciones que tome dependen de la superficie de ataque:

- **Vulnerabilidades:** Aplique parches a cualquier biblioteca vulnerable detectada por SCA o por el Análisis de código en tiempo de ejecución, y luego vuelva a implementar el servicio.
- **Hallazgos de API descubiertos:** Revise cada problema en el contexto del servicio rastreado, corrija cualquier código o configuración y luego valide utilizando nuevas trazas.
- **Procesamiento de datos confidenciales:** Confirme que el manejo de datos cumpla con la política, sanee o cifre la PII y limite el acceso a los servicios necesarios.
- **Punto de conexión sin autenticar:** Si el punto de conexión no es intencionalmente público, aplique la autenticación y actualice las configuraciones del servicio.

### Detección de puntos de conexión estáticos {#static-endpoint-discovery}

<div class="alert alert-info">La detección de puntos de conexión estáticos está en versión preliminar.</div>

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">La detección de puntos de conexión estáticos no está disponible para el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

La fuente de datos {{< ui >}}Source Code{{< /ui >}} muestra puntos de conexión de la API descubiertos directamente desde su código fuente. Esto complementa la detección basada en tiempo de ejecución al mostrar puntos de conexión antes en el ciclo de vida de desarrollo, incluidos los puntos de conexión que pueden no recibir tráfico en vivo.

Para usar esta fuente de datos, configure la [Integración de código fuente][12] con GitHub, GitLab o Azure DevOps. Se admiten los siguientes lenguajes y frameworks:

| Lenguaje | Framework |
|----------|-----------|
| Python   | FastAPI, Flask, Tornado |
| Java     | Spring    |
| Go       | Beego, Chi, Echo, Fiber, Gin, Gorilla Mux, fasthttp, go-zero |
| C#       | ASP.NET Core MVC |
| Node.js  | Express, Fastify |

Para filtrar por puntos de conexión de código fuente, use {{< ui >}}Source Code{{< /ui >}} en la faceta {{< ui >}}Data Source{{< /ui >}} o la consulta `datasource:source_code`. Los escaneos se ejecutan cuando se envía código a la rama predeterminada y en un horario recurrente de 8 horas. Los puntos de conexión descubiertos se eliminan después de 12 horas si no se vuelven a descubrir en un escaneo posterior.

#### Asignar puntos de conexión de código fuente a servicios {#map-source-code-endpoints-to-services}

El descubrimiento de puntos de conexión estáticos utiliza heurísticas para inferir a qué servicio pertenece un punto de conexión. Para un mapeo más preciso, defina explícitamente las relaciones entre servicio y código utilizando el campo `codeLocations` en su [Datadog Software Catalog service definition (v3 schema)][13]:

```yaml
apiVersion: v3
kind: service
metadata:
  name: my-service
  owner: my-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
```

Sin `codeLocations` explícito, es posible que los puntos de conexión no se combinen correctamente con los datos de otras fuentes.

## Visualizar y comparar esquemas de punto de conexión {#view-and-compare-endpoint-schemas}

API Posture crea un esquema OpenAPI para cada punto de conexión a partir del tráfico que observa. Este esquema **inferido** describe lo que su API expone en producción: sus rutas, parámetros, cuerpos de solicitud y respuesta, y autenticación. Cuando su equipo también publica un esquema **declarado**, una definición de OpenAPI registrada en el Datadog Software Catalog, puede comparar ambos para encontrar dónde la API en ejecución se ha desviado de su documentación.

### Visualizar el esquema de un punto de conexión {#view-an-endpoints-schema}

En [API Endpoints][1], haga clic en un punto de conexión para abrir su panel de detalles. La sección **Definición** muestra los parámetros de solicitud, el cuerpo de la solicitud y las respuestas del punto de conexión. Los campos que contienen datos confidenciales están marcados con el tipo de datos confidenciales observados.

{{< img src="/security/application_security/api/api_endpoint_definition_schema_cropped.png" alt="La sección Definición del panel de detalles de un punto de conexión, que muestra sus parámetros de solicitud y los botones Ver esquema sin procesar y Ver esquemas inferidos" style="width:100%;" >}}

Cuando el punto de conexión está asociado con una API en el Datadog Software Catalog, la sección **Definición** muestra la especificación OpenAPI declarada. De lo contrario, muestra el esquema inferido del tráfico en vivo.

En la sección **Definición**, usted puede:

- {{< ui >}}View Raw Schema{{< /ui >}}: Visualizar el esquema mostrado como YAML sin procesar.
- {{< ui >}}View Inferred Schemas{{< /ui >}}: Visualizar el esquema inferido del tráfico en vivo como una vista previa o YAML, incluso cuando hay un esquema declarado disponible. El esquema inferido se puede exportar como un archivo OpenAPI en YAML o JSON.

Para reducir el ruido, el esquema inferido solo incluye campos observados al menos tres veces y descarta los campos que no se han vuelto a observar en un plazo de 7 días. Esto evita que el tráfico único, como una sola solicitud mal formada o un atacante que sondea un punto de conexión con un campo inesperado, contamine el esquema inferido. De lo contrario, podría aparecer como una desviación al compararse con el esquema declarado.

### Comparar esquemas declarados e inferidos {#compare-declared-and-inferred-schemas}

Para comparar esquemas inferidos y declarados, debe:

- [Habilitar la protección de aplicaciones y API][9] en el servicio para que los puntos de conexión se descubran a partir del tráfico en vivo.
- Registre la definición de OpenAPI del esquema declarado en el Datadog Software Catalog. Consulte [Crear entidades][8].

Las diferencias de esquema aparecen directamente en la vista de esquema del punto de conexión, resaltadas por gravedad:

| Gravedad | Significado |
|----------|---------|
| Crítico | Es probable que el cambio afecte a los clientes que dependen del contrato declarado, como un campo que se volvió obligatorio o un cambio en el tipo de parámetro. |
| Advertencia | El cambio es una desviación que vale la pena revisar, como un campo no declarado observado en el tráfico o un parámetro que se volvió opcional. |
| Información | La diferencia es de bajo riesgo, como un punto de conexión que está declarado pero no tiene tráfico observado. |

Las diferencias pueden aparecer en las siguientes áreas del esquema:

- **Parámetros**: Un parámetro agregado, eliminado o cambiado de opcional a obligatorio (o viceversa).
- **Cuerpo de la solicitud**: Un cuerpo de solicitud agregado, eliminado o cambiado de opcional a obligatorio (o viceversa).
- **Propiedades del esquema**: Una propiedad agregada, eliminada, cambiada de opcional a obligatorio (o viceversa), o un cambio en el tipo, formato, nulabilidad o valores de enumeración.
- **Restricciones de valor**: Se cambió un límite numérico o de longitud (`minimum`, `maximum`, `minLength`, `maxLength`), un patrón o una restricción de unicidad.
- **Composición del esquema**: Una discrepancia introducida en la composición `oneOf` o `allOf`, o en un discriminador.
- **Respuestas**: Se agregó o eliminó un código de estado, un encabezado de respuesta o un tipo de contenido.

Para reducir el ruido, algunas diferencias se excluyen porque no representan una desviación significativa del contrato:

- **Parámetros de encabezado y cookie de solicitud:** A menudo contienen valores como tokens de autenticación o identificadores de sesión que no forman parte del contrato de la API.
- **Cambios de tipo en parámetros de consulta:** Los parámetros de consulta siempre se observan como cadenas en el tráfico, incluso cuando se declaran como otro tipo, como un entero o booleano.
- **Códigos de estado eliminados:** El esquema inferido solo incluye códigos de estado observados en el tráfico, por lo que un código de estado declarado que aún no ha ocurrido durante la observación siempre aparece como eliminado.
- **`anyOf` desajustes de composición:** Los esquemas declarados e inferidos pueden usar `anyOf` en diferentes niveles del esquema mientras siguen siendo equivalentes.

## Procesamiento de datos confidenciales {#processing-sensitive-data}

App and API Protection detecta y clasifica los datos confidenciales procesados por sus puntos de conexión, etiquetando cada punto de conexión con la categoría y el tipo de datos encontrados. Para ver qué puntos de conexión procesan datos confidenciales y crear escáneres de datos de API personalizados, consulte [Datos confidenciales][16].

## Lógica de negocio {#business-logic}

Estas etiquetas (`users.login.success`, `users.login.failure`, etc.) se determinan por la presencia de trazas de lógica de negocio asociados con el punto de conexión.

<div class="alert alert-tip">Datadog puede sugerir una etiqueta de lógica de negocio para su punto de conexión según su método HTTP, códigos de estado de respuesta y URL.</div>

## Accesible públicamente {#publicly-accessible}

Datadog marca un punto de conexión como público si la dirección IP del cliente está fuera de estos rangos:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

Consulte [Configuración de un encabezado de IP de cliente][14] para obtener más información sobre la configuración de biblioteca requerida.

## Autenticación de punto de conexión {#endpoint-authentication}

La autenticación se determina mediante:

- La presencia de encabezados `Authorization`, `Token` o `X-Api-Key`.
- La presencia de un ID de usuario dentro de la traza (por ejemplo, el atributo `@usr.id` de APM).
- Un código de estado 401 o 403 devuelto por el punto de conexión.
- Reglas personalizadas de [Etiquetado de puntos de conexión][15] que configuró


Cuando el tipo de autenticación está disponible, Datadog lo informa en un encabezado a través de la faceta {{< ui >}}Authentication Method{{< /ui >}}.

### Métodos de autenticación admitidos {#supported-authentication-methods}

| Categoría                                          | Faceta de categoría   |
|---------------------------------------------------|------------------|
| JSON Web Token (JWT)                              | `json_web_token` |
| Tokens de portador (encontrados en encabezados `Authorization`)  | `bearer_token`   |
| Autenticación básica                              | `basic_auth`     |
| Autenticación de acceso implícita (Digest)                      | `digest_auth`    |

### Soporte de autenticación personalizada {#custom-authentication-support}

La detección de autenticación personalizada es posible configurando [Reglas de etiquetado de puntos de conexión][15]. Estas reglas requieren las siguientes versiones mínimas del tracer:

|Tecnología| Versión mínima del tracer |
|----------|------------------------|
|Java      | v1.55.0                |
|.NET      | Próximamente            |
|Node.js   | v5.76.0                |
|Python    | v3.17.0                |
|Ruby      | v2.23.0                |
|PHP       | v1.15.0                |
|Golang    | v2.4.0                 |

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /es/security/code_security/iast/
[3]: /es/security/code_security/software_composition_analysis/
[4]: /es/security/application_security/
[5]: /es/integrations/amazon-web-services
[6]: /es/integrations/amazon-api-gateway
[7]: /es/internal_developer_portal/catalog/entity_model/native_entities/?tab=api#native-entity-types
[8]: /es/internal_developer_portal/catalog/set_up/create_entities/#through-the-datadog-ui
[9]: /es/security/application_security/setup/
[10]: /es/tracing/guide/remote_config/
[11]: /es/security/application_security/api_posture/endpoint_scanning/
[12]: /es/integrations/guide/source-code-integration/
[13]: /es/internal_developer_portal/catalog/entity_model/
[14]: /es/security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[15]: https://app.datadoghq.com/security/configuration/asm/trace-tagging
[16]: /es/security/application_security/api_posture/sensitive_data/