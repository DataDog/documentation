---
aliases:
- /es/tracing/security
- /es/tracing/guide/security
- /es/tracing/guide/agent_obfuscation
- /es/tracing/guide/agent-obfuscation
- /es/tracing/custom_instrumentation/agent_customization
- /es/tracing/faq/if-i-instrument-a-database-with-datadog-apm-will-there-be-sensitive-database-data-sent-to-datadog
- /es/tracing/setup_overview/configure_data_security/
description: Configura la biblioteca cliente o Agent para controlar la recopilación
  de datos confidenciales en trazas (traces).
further_reading:
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Establecer una organización de Datadog que cumpla con el estándar PCI
kind: documentación
title: Seguridad de datos
---
## Información general

Las bibliotecas de rastreo de Datadog recopilan datos de una aplicación instrumentada. Esos datos se envían a Datadog como trazas (traces) y pueden contener datos confidenciales, como información de identificación personal (PII). Si estás ingiriendo datos confidenciales como trazas (traces) en Datadog, se pueden añadir remediaciones en la ingestión con [Sensitive Data Scanner][12]. También puedes configurar Datadog Agent o la biblioteca de rastreo para corregir datos confidenciales en la recopilación antes de que se envíen las trazas (traces) a Datadog.

Si las configuraciones aquí descritas no cubren tus requisitos de conformidad, ponte en contacto con [el equipo de asistencia de Datadog][1].

### Información personal en datos de rastreo

Las bibliotecas de rastreo APM de Datadog recopilan datos de observabilidad relevantes sobre las aplicaciones. Debido a que estas bibliotecas recopilan cientos de atributos únicos en datos de rastreo, esta página describe categorías de datos, centrándose en los atributos que pueden contener información personal sobre tus empleados y usuarios finales.

En la siguiente tabla se describen las categorías de datos personales recopilados por la instrumentación automática que proporcionan las bibliotecas de rastreo, con algunos ejemplos comunes.

| Categoría            | Descripción                                                                                                            |
|:--------------------|:-----------------------------------------------------------------------------------------------------------------------|
| Nombre                | El nombre completo de un usuario interno (tu empleado) o usuario final.                                                         |
| Correo electrónico               | La dirección de correo electrónico de un usuario interno (tu empleado) o usuario final.                                                     |
| IP del cliente           | La dirección IP de tu usuario final asociada a una solicitud entrante o la dirección IP externa de una solicitud saliente. |
| Declaraciones de base de datos | El literal, la secuencia de literales o las variables de enlace utilizadas en una declaración de base de datos ejecutada.                           |
| Localización geográfica | Coordenadas de longitud y latitud que pueden utilizarse para identificar a una persona o un hogar.                            |
| Parámetros de URI      | Los valores de los parámetros en la parte variable de la ruta o la consulta del URI.                                            |
| userinfo de URI        | El subcomponente userinfo del URI que puede contener el nombre de usuario.                                                   |

La siguiente tabla describe el comportamiento predeterminado de cada biblioteca de rastreo de lenguajes con respecto a si se recopila una categoría de datos y si se enmascara por defecto.

{{% tabs %}}

{{% tab ".NET" %}}

| Categoría            | Recopilado                       | Enmascarado                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nombre                | <i class="icon-check-bold"></i> |                                 |
| Correo electrónico               | <i class="icon-check-bold"></i> |                                 |
| IP del cliente           | <i class="icon-check-bold"></i> |                                 |
| Declaraciones de base de datos | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Localización geográfica |                                 |                                 |
| Parámetros de URI      | <i class="icon-check-bold"></i> |                                 |
| userinfo de URI        |                                 |                                 |

{{% /tab %}}

{{% tab "Java" %}}

**Nota:** Las declaraciones de base de datos no se recopilan por defecto y deben habilitarse.

| Categoría            | Recopilado                       | Enmascarado                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nombre                | <i class="icon-check-bold"></i> |                                 |
| Correo electrónico               | <i class="icon-check-bold"></i> |                                 |
| IP del cliente           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Declaraciones de base de datos | <i class="icon-check-bold"></i> |                                 |
| Localización geográfica |                                 |                                 |
| Parámetros de URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| userinfo de URI        |                                 |                                 |

{{% /tab %}}

{{% tab "Node.js" %}}

**Nota:** Los parámetros de URI no se recopilan por defecto y deben habilitarse.

| Categoría            | Recopilado                       | Enmascarado                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nombre                | <i class="icon-check-bold"></i> |                                 |
| Correo electrónico               | <i class="icon-check-bold"></i> |                                 |
| IP del cliente           | <i class="icon-check-bold"></i> |                                 |
| Declaraciones de base de datos | <i class="icon-check-bold"></i> |                                 |
| Localización geográfica |                                 |                                 |
| Parámetros de URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| userinfo de URI        |                                 |                                 |

{{% /tab %}}

{{% tab "PHP" %}}

**Nota:** El nombre y el correo electrónico no se recopilan por defecto y deben habilitarse.

| Categoría            |            Recopilado            |           Enmascarado            |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nombre                | <i class="icon-check-bold"></i> |                                 |
| Correo electrónico               | <i class="icon-check-bold"></i> |                                 |
| IP del cliente           | <i class="icon-check-bold"></i> |                                 |
| Declaraciones de base de datos | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Localización geográfica |                                 |                                 |
| Parámetros de URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| userinfo de URI        | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |

{{% /tab %}}

{{% tab "Python" %}}

**Nota:** Los parámetros IP del cliente, localización geográfica y URI no se recopilan por defecto y deben habilitarse.

| Categoría            | Recopilado                       | Enmascarado                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nombre                | <i class="icon-check-bold"></i> |                                 |
| Correo electrónico               | <i class="icon-check-bold"></i> |                                 |
| IP del cliente           | <i class="icon-check-bold"></i> |                                 |
| Declaraciones de base de datos | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Localización geográfica | <i class="icon-check-bold"></i> |                                 |
| Parámetros de URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| userinfo de URI        |                                 |                                 |

[1]: /es/tracing/trace_collection/compatibility/python/#datastore-compatibility
{{% /tab %}}

{{% tab "Ruby" %}}

**Nota:** Las IPs de los clientes no se recopilan por defecto y deben habilitarse.

| Categoría            | Recopilado                       | Enmascarado                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Nombre                | <i class="icon-check-bold"></i> |                                 |
| Correo electrónico               | <i class="icon-check-bold"></i> |                                 |
| IP del cliente           | <i class="icon-check-bold"></i> |                                 |
| Declaraciones de base de datos | <i class="icon-check-bold"></i> |                                 |
| Localización geográfica |                                 |                                 |
| Parámetros de URI      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| userinfo de URI        |                                 |                                 |

{{% /tab %}}

{{% tab "Go" %}}

**Nota:** Las IPs de los clientes no se recopilan por defecto y deben habilitarse. Datadog Agent enmascara las declaraciones de base de datos.

| Categoría                | Recopilado                       | Enmascarado                      |
|:------------------------|:-------------------------------:|:-------------------------------:|
| Nombre                    |                                 |                                 |
| Correo electrónico                   |                                 |                                 |
| IP del cliente               | <i class="icon-check-bold"></i> |                                 |
| Declaraciones de base de datos     | <i class="icon-check-bold"></i> |                                 |
| Localización geográfica     |                                 |                                 |
| Ruta del URI del cliente         | <i class="icon-check-bold"></i> |                                 |
| Cadena de consulta del URI del cliente | <i class="icon-check-bold"></i> |                                 |
| Ruta del URI del servidor         | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Cadena de consulta del URI del servidor | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Cuerpo HTTP               | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Cookies HTTP            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Cabeceras HTTP            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |

{{% /tab %}}

{{% tab "Nginx" %}}

| Categoría                | Recopilado                       | Enmascarado |
|:------------------------|:-------------------------------:|:----------:|
| Nombre                    |                                 |            |
| Correo electrónico                   |                                 |            |
| IP del cliente               | <i class="icon-check-bold"></i> |            |
| Declaraciones de base de datos     |                                 |            |
| Localización geográfica     |                                 |            |
| Ruta del URI del cliente         | <i class="icon-check-bold"></i> |            |
| Cadena de consulta del URI del cliente | <i class="icon-check-bold"></i> |            |
| Ruta del URI del servidor         |                                 |            |
| Cadena de consulta del URI del servidor |                                 |            |
| Cuerpo HTTP               |                                 |            |
| Cookies HTTP            |                                 |            |
| Cabeceras HTTP            |                                 |            |

{{% /tab %}}

{{% tab "Kong" %}}

| Categoría                | Recopilado                       | Enmascarado |
|:------------------------|:-------------------------------:|:----------:|
| Nombre                    |                                 |            |
| Correo electrónico                   |                                 |            |
| IP del cliente               | <i class="icon-check-bold"></i> |            |
| Declaraciones de base de datos     |                                 |            |
| Localización geográfica     |                                 |            |
| Ruta del URI del cliente         | <i class="icon-check-bold"></i> |            |
| Cadena de consulta del URI del cliente |                                 |            |
| Ruta del URI del servidor         |                                 |            |
| Cadena de consulta del URI del servidor |                                 |            |
| Cuerpo HTTP               |                                 |            |
| Cookies HTTP            |                                 |            |
| Cabeceras HTTP            |                                 |            |

{{% /tab %}}

{{% tab "Envoy" %}}

| Categoría                | Recopilado                       | Enmascarado |
|:------------------------|:-------------------------------:|:----------:|
| Nombre                    |                                 |            |
| Correo electrónico                   |                                 |            |
| IP del cliente               | <i class="icon-check-bold"></i> |            |
| Declaraciones de base de datos     |                                 |            |
| Localización geográfica     |                                 |            |
| Ruta del URI del cliente         |                                 |            |
| Cadena de consulta del URI del cliente |                                 |            |
| Ruta del URI del servidor         |                                 |            |
| Cadena de consulta del URI del servidor |                                 |            |
| Cuerpo HTTP               |                                 |            |
| Cookies HTTP            |                                 |            |
| Cabeceras HTTP            |                                 |            |

{{% /tab %}}

{{% /tabs %}}

Si utilizas Datadog Application Security Management (ASM), las bibliotecas de rastreo recopilan datos de solicitudes HTTP para ayudarte a comprender la naturaleza de una traza (trace) de seguridad. Datadog ASM oculta automáticamente ciertos datos y tú puedes configurar tus propias reglas de detección. Obtén más información sobre estos valores predeterminados y las opciones de configuración en la documentación sobre la [privacidad de datos][13] de Datadog ASM.

## Agent

### Nombres de los recursos

Los tramos (spans) de Datadog incluyen un atributo de nombre de recurso que puede contener datos confidenciales. Datadog Agent implementa el enmascaramiento de nombres de recursos para varios casos conocidos:

* **Los literales numéricos SQL y las variables de enlace están enmascarados**: Por ejemplo, la siguiente consulta `SELECT data FROM table WHERE key=123 LIMIT 10` se se enmascara como `SELECT data FROM table WHERE key = ? LIMIT ?` antes de establecer el nombre del recurso para el tramo (span) de la consulta.
* **Las cadenas de literales SQL se identifican utilizando las comillas estándar de ANSI para SQL**: esto significa que las cadenas deben ir entre comillas simples (`'`). Algunas variantes de SQL admiten opcionalmente comillas dobles (`"`) para las cadenas, pero la mayoría tratan las cosas entre comillas dobles como identificadores. El enmascarador de Datadog las trata como identificadores y no como cadenas, y no las enmascara.
* **Las consultas de Redis se cuantifican al seleccionar solo los tokens de comando**: por ejemplo, la siguiente consulta `MULTI\nSET k1 v1\nSET k2 v2` se cuantifica a `MULTI SET SET`.

### Enmascaramiento de trazas (traces)

Datadog Agent también enmascara datos de [trazas (traces)][2] confidenciales que no están dentro del nombre del recurso. Puedes configurar las reglas de enmascaramiento utilizando variables de entorno o el archivo de configuración `datadog.yaml`.

Los siguientes metadatos pueden enmascararse:

* Consultas de MongoDB
* Cuerpos de solicitud de ElasticSearch
* Comandos de Redis
* Comandos de MemCached
* URLs HTTP
* Stack traces

**Nota:** El enmascaramiento puede tener un impacto en el rendimiento de tu sistema, o podría ocultar información importante que no es confidencial. Considera qué enmascaramiento necesitas para tu configuración y personaliza tu configuración adecuadamente.

**Nota:** Puedes utilizar la limpieza automática para varios tipos de servicios al mismo tiempo. Configura cada uno de ellos en la sección `obfuscation` de tu archivo `datadog.yaml`.
{{< tabs >}}

{{% tab "MongoDB" %}}

Las consultas de MongoDB dentro de un [tramo (span)][1] del tipo `mongodb` se enmascaran por defecto.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    mongodb:
      ## Configura reglas de enmascaramiento para tramos (spans) del tipo "mongodb". Habilitado por defecto.
      enabled: true
      keep_values:
        - document_id
        - template_id
      obfuscate_sql_values:
        - val1
```

También puede deshabilitarse con la variable de entorno `DD_APM_OBFUSCATION_MONGODB_ENABLED=false`.

* `keep_values` o la variable de entorno`DD_APM_OBFUSCATION_MONGODB_KEEP_VALUES` definen un conjunto de claves a excluir del enmascaramiento de trazas (traces) de Datadog Agent. Si no se define, se enmascaran todas las claves.
* `obfuscate_sql_values` o la variable de entorno `DD_APM_OBFUSCATION_MONGODB_OBFUSCATE_SQL_VALUES`  definen un conjunto de claves a incluir en el enmascaramiento de trazas (traces) de Datadog Agent. Si no se define, se enmascaran todas las claves.

[1]: /es/tracing/glossary/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

Los cuerpos de las peticiones de ElasticSearch dentro de un [tramo (span)][1] del tipo `elasticsearch` se enmascaran por defecto.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    elasticsearch:
      ## Configura las reglas de enmascaramiento para tramos (spans) del tipo "elasticsearch". Habilitado por defecto.
      enabled: true
      keep_values:
        - client_id
        - product_id
      obfuscate_sql_values:
        - val1
```

También puede deshabilitarse con la variable de entorno `DD_APM_OBFUSCATION_ELASTICSEARCH_ENABLED=false`.

* `keep_values` o la variable de entorno`DD_APM_OBFUSCATION_ELASTICSEARCH_KEEP_VALUES` definen un conjunto de claves a excluir del enmascaramiento de trazas (traces) de Datadog Agent. Si no se define, se enmascaran todas las claves.
* `obfuscate_sql_values` o la variable de entorno`DD_APM_OBFUSCATION_ELASTICSEARCH_OBFUSCATE_SQL_VALUES` definen un conjunto de claves a incluir en el enmascaramiento de trazas (traces) de Datadog Agent. Si no se define, se enmascaran todas las claves.

[1]: /es/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Redis" %}}

Los comandos de Redis dentro de un [tramo (span)][1] del tipo `redis` se enmascaran por defecto.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## Configura las reglas de enmascaramiento para tramos (spans) del tipo "redis". Habilitado por defecto.
    redis:
      enabled: true
      remove_all_args: true
```

También puede deshabilitarse con la variable de entorno `DD_APM_OBFUSCATION_REDIS_ENABLED=false`.

* `remove_all_args` o la variable de entorno `DD_APM_OBFUSCATION_REDIS_REMOVE_ALL_ARGS` reemplazan todos los argumentos de un comando de redis con un único "?" si el valor es true. Está deshabilitado por defecto.

[1]: /es/tracing/glossary/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

Los comandos de MemCached dentro de un [tramo (span)][1] del tipo `memcached` se enmascaran por defecto.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      ## Configura las reglas de enmascaramiento para tramos (spans) del tipo "memcached". Habilitado por defecto.
      enabled: true
```

También puede deshabilitarse con la variable de entorno `DD_APM_OBFUSCATION_MEMCACHED_ENABLED=false`.

[1]: /es/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Http" %}}

Las URLs HTTP dentro de un [tramo (span)][1] del tipo `http` o `web` no se enmascaran por defecto.

**Nota:** Datadog no recopila las contraseñas dentro del Userinfo de una URL.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      ## Habilita el enmascaramiento de cadenas de consulta en URLs. Deshabilitado por defecto.
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string` o la variable de entorno`DD_APM_OBFUSCATION_HTTP_REMOVE_QUERY_STRING`: si tienen el valor true, se enmascaran las cadenas de consulta en las URL (`http.url`).
* `remove_paths_with_digits` o la variable de entorno`DD_APM_OBFUSCATION_HTTP_REMOVE_PATHS_WITH_DIGITS`: tienen el valor true, los segmentos de ruta en las URLs (`http.url`) que contienen solo dígitos se sustituyen por "?".

[1]: /es/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Stack traces" %}}

Está deshabilitado por defecto.

Establece el parámetro `remove_stack_traces` en true para eliminar las stack traces y sustituirlas por `?`.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## Permite eliminar las stack traces para reemplazarlas por "?". Deshabilitado por defecto.
    remove_stack_traces: true # default false
```

También puede habilitarse con la variable de entorno `DD_APM_OBFUSCATION_REMOVE_STACK_TRACES=true`.

{{% /tab %}}
{{< /tabs >}}

### Sustituir etiquetas (tags)

Para limpiar datos confidenciales de las etiquetas (tags) de tu [tramo (span)][4], utiliza la configuración `replace_tags` [en tu archivo de configuración datadog.yaml][5] o la variable de entorno `DD_APM_REPLACE_TAGS`. El valor de la configuración o de la variable de entorno es una lista de uno o más grupos de parámetros que especifican cómo sustituir los datos confidenciales en tus etiquetas (tags). Estos parámetros son:

* `name`: la clave de la etiqueta (tag) a sustituir. Para que coincida con todas las etiquetas (tags), utiliza `*`. Para que coincida con el recurso, utiliza `resource.name`.
* `pattern`: el patrón regexp con el que debe coincidir.
* `repl`: la cadena de sustitución.

Por ejemplo:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # Sustituye todos los caracteres a partir de la cadena `token/` en la etiqueta (tag) "http.url" con "?"
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Elimina el carácter "/" final en los nombres de recursos
      pattern: "(.*)\/$"
      repl: "$1"
    # Sustituye todas las apariciones de "foo" en cualquier etiqueta (tag) por "bar"
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Elimina todos los valores de la etiqueta (tag) "error.stack"
    - name: "error.stack"
      pattern: "(?s).*"
    # Sustituye series de números en mensajes de error
    - name: "error.msg"
      pattern: "[0-9]{10}"
      repl: "[REDACTED]"
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

```json
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "resource.name",
        "pattern": "(.*)\/$",
        "repl": "$1"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      },
      {
        "name": "error.msg",
        "pattern": "[0-9]{10}",
        "repl": "[REDACTED]"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Configura la variable de entorno `DD_APM_REPLACE_TAGS`:
- Para Datadog Operator, en `override.nodeAgent.env` en tu `datadog-agent.yaml`
- Para Helm, en `agents.containers.traceAgent.env` en tu `datadog-values.yaml`
- Para la configuración manual, en la sección del contenedor `trace-agent` de tu manifiesto

```yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "resource.name",
              "pattern": "(.*)\/$",
              "repl": "$1"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            },
            {
              "name": "error.msg",
              "pattern": "[0-9]{10}",
              "repl": "[REDACTED]"
            }
          ]'
```

#### Ejemplos

Datadog Operator:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_APM_REPLACE_TAGS
          value: '[
                   {
                     "name": "http.url",
                  # (...)
                  ]'
```

Helm:

```yaml
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_REPLACE_TAGS
          value: '[
                   {
                     "name": "http.url",
                  # (...)
                  ]'
```

[1]: /es/containers/kubernetes/installation/?tab=daemonset
[2]: /es/containers/kubernetes/installation/?tab=helm
{{% /tab %}}
{{% tab "Docker Compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"resource.name","pattern":"(.*)\/$","repl":"$1"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"},{"name":"error.msg","pattern":"[0-9]{10}","repl":"[REDACTED]"}]
```

{{% /tab %}}
{{< /tabs >}}

### Ignorar recursos

Para conocer en profundidad las opciones a fin de evitar el rastreo de recursos específicos, consulta [Ignorar recursos no deseados][6].

Si tus servicios incluyen tráfico simulado como, por ejemplo, checks de estado, es posible que quieras excluir estas trazas (traces) de la recopilación para que las métricas de tus servicios coincidan con el tráfico de producción.

El agente puede configurarse para excluir un recurso específico de las trazas (traces) enviadas por el agente a Datadog. Para evitar el envío de recursos específicos, utiliza la configuración `ignore_resources` en el archivo `datadog.yaml`. A continuación, crea un lista de una o más expresiones regulares, especificando qué recursos filtra el agente con base en su nombre de recurso.

Si estás ejecutando en un entorno de contenedores, establece `DD_APM_IGNORE_RESOURCES` en el contenedor con Datadog Agent en su lugar. Consulta las [variables de entorno del APM Agent en Docker][7] para obtener más detalles.

```text
###### @param ignore_resources - lista de cadenas - opcional

###### Se puede proporcionar una lista de expresiones regulares para excluir ciertas trazas (traces) según su nombre de recurso.

###### Todas las entradas deben estar entre comillas dobles y separadas por comas.

###### ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]

```

## Biblioteca

### HTTP

Datadog está estandarizando la [semántica de etiquetas (tags) de tramo (span)][3] en todas las bibliotecas de rastreo. La información de las solicitudes HTTP se añaden como etiquetas (tags) de tramo (span) con el prefijo `http.`. Las bibliotecas tienen las siguientes opciones de configuración para controlar los datos confidenciales recopilados en tramos (span) HTTP.

#### Ocultar cadenas de consulta

Se le asigna a la etiqueta (tag) `http.url` el valor completo de la URL, incluida la cadena de consulta. La cadena de consulta podría contener datos confidenciales, por lo que, de forma predeterminada, Datadog la analiza y oculta los valores de aspecto sospechoso. Este proceso de ocultamiento es configurable. Para modificar la expresión regular utilizada para el ocultamiento, establece la variable de entorno`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` en una expresión regular válida de tu elección. La expresión regular válida depende de la plataforma. Cuando la expresión regular encuentra un par clave-valor sospechoso, lo sustituye por `<redacted>`.

Si no deseas recopilar la cadena de consulta, establece la variable de entorno`DD_HTTP_SERVER_TAG_QUERY_STRING` en `false`. El valor predeterminado es `true`.

#### Recopilar encabezados

Para recopilar etiquetas (tags) de encabezados de traza (trace), establece la variable de entorno `DD_TRACE_HEADER_TAGS` con un mapa de claves de encabezado que no distinga mayúsculas de minúsculas para etiquetar nombres. La biblioteca aplica los valores de encabezado coincidentes como etiquetas (tags) en los tramos (spans) raíz. La configuración también acepta entradas sin un nombre de etiqueta (tag) especificado, por ejemplo:

```
DD_TRACE_HEADER_TAGS=CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name
```

### Procesamiento

Algunas bibliotecas de rastreo proporcionan una interfaz para el procesamiento de tramos (spans) a fin de modificar o eliminar manualmente los datos confidenciales recopilados en trazas (traces):

* Java: [interfaz TraceInterceptor][9]
* Ruby: [Pipeline de procesamiento][10]
* Python: [Filtrado de trazas (traces)][11]

## Recopilación de telemetría

Datadog puede recopilar información del entorno y de diagnóstico sobre tus bibliotecas de rastreo para el procesamiento; esto puede incluir información sobre el host que ejecuta una aplicación, el sistema operativo, el lenguaje de programación y el tiempo de ejecución, las integraciones de APM utilizadas y las dependencias de la aplicación. Además, Datadog puede recopilar información como registros de diagnóstico, volcados de memoria con stack traces enmascaradas y varias métricas de rendimiento del sistema.

Puedes deshabilitar esta recopilación de telemetría utilizando cualquiera de estos ajustes:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  telemetry:
    enabled: false
```

{{% /tab %}}
{{% tab "Variables de entorno" %}}

```bash
export DD_INSTRUMENTATION_TELEMETRY_ENABLED=false
```

{{% /tab %}}
{{< /tabs >}}

## Cumplimiento del estándar PCI DSS para el cumplimiento de APM

{{< site-region region="us" >}}

<div class="alert alert-warning">
El cumplimiento del estándar PCI para APM solo está disponible para las organizaciones de Datadog en el <a href="/getting_started/site/">sitio US1</a>.
</div>

Para configurar una organización de Datadog que cumpla con el estándar PCI, sigue estos pasos:

{{% pci-apm %}}

Consulta [Cumplimiento del estándar PCI DSS][1] para obtener más información. Para habilitar el cumplimiento del estándar PCI para logs, consulta [Cumplimiento del estándar PCI DSS para Log Management][2].

[1]: /es/data_security/pci_compliance/
[2]: /es/data_security/pci_compliance/?tab=logmanagement

{{< /site-region >}}

{{< site-region region="us2,us3,us5,eu,gov" >}}
El cumplimiento del estándar PCI para APM no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
{{< /site-region >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/tracing/glossary/#trace
[3]: /es/tracing/trace_collection/tracing_naming_convention/#http-requests
[4]: /es/tracing/glossary/#spans
[5]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /es/tracing/guide/ignoring_apm_resources/
[7]: /es/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[8]: /es/tracing/guide/send_traces_to_agent_by_api/
[9]: /es/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
[10]: /es/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[11]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
[12]: /es/sensitive_data_scanner/
[13]: /es/security/application_security/how-appsec-works/#data-privacy