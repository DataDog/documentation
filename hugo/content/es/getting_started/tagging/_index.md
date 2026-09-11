---
algolia:
  tags:
  - tagging
aliases:
- /es/getting_started/getting_started_with_tags
- /es/guides/getting_started/tagging/
- /es/developers/getting_started/tagging/
- /es/tagging
- /es/guides/tagging/
- /es/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Aprende a asignar y usar etiquetas en Datadog.
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: Documentación
  text: Aprende a asignar etiquetas
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Aprende a configurar unified service tagging
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Aprende a usar etiquetas
- link: https://dtdg.co/fe
  tag: Habilitación de Fundamentos
  text: Únete a una sesión interactiva sobre etiquetado efectivo con Datadog
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseña tableros ejecutivos efectivos con Datadog
- link: https://learn.datadoghq.com/courses/tagging-best-practices
  tag: Centro de Aprendizaje
  text: Mejores Prácticas de Etiquetado
title: Introducción a las Etiquetas
---
## Resumen {#overview}

Las etiquetas son una forma de agregar dimensiones a la telemetría de Datadog para que puedan ser filtradas, agregadas y comparadas en las visualizaciones de Datadog. [Usar etiquetas][1] te permite observar el rendimiento agregado a través de varios hosts y (opcionalmente) reducir el conjunto aún más basado en elementos específicos. En resumen, el etiquetado es un método para observar puntos de datos agregados.

Una etiqueta puede estar formateada como `<key>:<value>` o `<value>`. Datadog recomienda usar el formato `<key>:<value>`, ya que a menudo es semánticamente más claro y permite capacidades de consulta más ricas (por ejemplo, agrupar por clave). Al usar un par `<key>:<value>`:

- La **clave de etiqueta** es el identificador. Las claves de etiqueta comúnmente utilizadas son `env`, `instance` y `name`.
- El valor de la etiqueta **** es la información o dato específico asociado con la clave. Los valores de las etiquetas no son únicos por recurso y pueden ser utilizados en muchos recursos en un `<key>:<value>` par.

El etiquetado une diferentes tipos de datos en Datadog, permitiendo la correlación y llamadas a la acción entre métricas, trazas y registros. Esto se logra con claves de etiqueta **reservadas**:
| Clave de etiqueta   | Permite                                                             |
|-----------|------------------------------------------------------------------------|
| `host`    | Correlación entre métricas, trazas, procesos y registros.              |
| `device`  | Segregación de métricas, trazas, procesos y registros por dispositivo o disco. |
| `source`  | Filtrado de tramos y creación automatizada de canalizaciones para Log Management.     |
| `service` | Alcance de datos específicos de la aplicación a través de métricas, trazas y registros. |
| `env`     | Alcance de datos específicos de la aplicación a través de métricas, trazas y registros. |
| `version` | Alcance de datos específicos de la aplicación a través de métricas, trazas y registros. |
| `team`    | Asignación de propiedad a cualquier recurso.                                  |

Datadog recomienda observar contenedores, máquinas virtuales e infraestructura en la nube a nivel `service` en conjunto. Por ejemplo, observe el uso de CPU a través de una colección de hosts que representa un servicio, en lugar de observar el uso de CPU del servidor A o del servidor B por separado.

Debido a que los contenedores y los entornos en la nube cambian regularmente de hosts, es importante utilizar etiquetas para agregar las métricas.

## Definir etiquetas {#define-tags}

Las cadenas de etiquetas (es decir, el contenido completo de `<key>:<value>` o `<value>`) deben cumplir con los siguientes requisitos:

- Las cadenas de etiquetas deben **comenzar con una letra** (esto se aplica independientemente de si la etiqueta utiliza el formato `<key>:<value>` o `<value>`). Después de la letra inicial, la cadena de etiquetas puede contener los caracteres que se enumeran a continuación:

    - Letras (se admiten todas las letras Unicode; por ejemplo, a, ó, 気, 녕, ك y ดี)
    - Números
    - Guiones bajos (los guiones bajos iniciales y finales se eliminan, y los guiones bajos contiguos se colapsan en uno solo)
    - Guiones
    - Dos puntos
    - Puntos
    - Barras inclinadas
    - (Solo para etiquetas en registros [ingresados a través de HTTP][28]) signos de arroba (`@`)

    Todos los demás caracteres (incluidos comas, emoji, barras invertidas y espacios) se convierten en guiones bajos.
    
    **Notas**:
    - Una etiqueta que comienza con un dígito puede ser aceptada en algunos contextos, como las etiquetas `env` establecidas a nivel de agente. Sin embargo, las etiquetas que no siguen las reglas estándar de nomenclatura pueden no funcionar de manera consistente en todos los productos de Datadog y pueden aumentar la cardinalidad de las etiquetas. Comience las etiquetas con una letra a menos que un producto específico lo soporte explícitamente de otra manera.
    - La variable de entorno `DD_TAGS` utiliza espacios en blanco como separador entre etiquetas. Los espacios en blanco en los valores de `DD_TAGS` no se **convierten** en guiones bajos. Por ejemplo, `DD_TAGS="test:this is a test"` produce cuatro etiquetas separadas: `test:this`, `is`, `a` y `test`. Para establecer un valor de etiqueta que contenga espacios, use un archivo de configuración YAML o anotaciones de integración, donde los espacios en blanco se convierten en guiones bajos.

- Las etiquetas pueden tener **hasta 200 caracteres** de longitud. Si la etiqueta tiene el formato `<key>:<value>`, la clave, `:`, y el valor cuentan para el límite de caracteres.
- [Las etiquetas de tramo][26] y las etiquetas métricas se normalizan a minúsculas, así que evite usar camel case en las claves de las etiquetas. Los proveedores de la nube normalizan el camel case de manera inconsistente. Por ejemplo, AWS convierte `TestTag` en `testtag`, mientras que Alibaba Cloud convierte `TestTag` en `test_tag`.
    - A diferencia de las etiquetas, [los atributos de tramo][27] y los atributos de log son sensibles a mayúsculas y no se normalizan.
- Al usar el formato `<key>:<value>`, la clave siempre precede al primer dos puntos de la definición global de la etiqueta. Por ejemplo:
    
    | Etiqueta                | Clave           | Valor          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

- Las etiquetas no deben originarse de fuentes no limitadas, como marcas de tiempo de época, ID de usuario o ID de solicitud. Hacerlo puede causar un crecimiento ilimitado en su número de [métricas][2].


## Asigne etiquetas {#assign-tags}

### Métodos de etiquetado {#tagging-methods}

Las etiquetas pueden asignarse utilizando cualquiera (o todos) de los siguientes métodos.

| Método                   | Asignar etiquetas                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Archivos de configuración][3] | Manualmente en los archivos de configuración de su Agent o integración. |
| [Interfaz de usuario][4]                  | En el sitio de Datadog.                                             |
| [API][5]                 | Al utilizar la API de Datadog.                                        |
| [DogStatsD][6]           | Al enviar métricas con DogStatsD.                          |

Para más información, consulte [Asignación de etiquetas][7].

#### Unified service tagging {#unified-service-tagging}

Como mejor práctica, Datadog recomienda utilizar unified service tagging al asignar etiquetas. El unified service tagging vincula la telemetría de Datadog a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender a configurar su entorno con unified service tagging, consulte [Unified Service Tagging][8].

### Herencia de etiquetas {#tag-inheritance}

Todas las métricas, registros, trazas e integraciones pasan por un proceso de `host-tag` herencia a medida que los datos se ingieren en Datadog. Dado que los datos están asociados con un nombre de host dado, esos componentes heredan todas las `host-level` etiquetas asociadas con ese host. Estas etiquetas son visibles en la [lista de infraestructura][12] para un host dado, obtenidas ya sea del proveedor de la nube o del Agent de Datadog. Consulta [etiquetas `host-level` faltantes en nuevos hosts o nodos][25] para más información.

Debido a que las etiquetas pueden ser heredadas de múltiples fuentes, elige nombres de clave únicos y específicos para evitar duplicarlas entre fuentes. Por ejemplo, si has establecido una clave `service` en un host (`service:my-host`) y una clave `service` en un pod que se ejecuta en ese host (`service:my-service`), tus datos heredan ambas etiquetas. Opta por nombres de clave más diferenciados (como `infra_service`) para evitar claves de etiqueta duplicadas.

### Prioridad de etiquetas {#tag-precedence}

El Datadog Agent **no** impone un orden de prioridad para las etiquetas establecidas desde diferentes fuentes. En cambio, el Datadog Agent recopila todas las etiquetas de cada fuente disponible, almacena cada valor único para una clave de etiqueta dada y emite todas ellas con la telemetría.

Esto significa que una sola clave de etiqueta puede tener múltiples valores si se configura de manera diferente entre fuentes. Por ejemplo, si la etiqueta `service` está configurada como `payments` en una variable de entorno, `checkout` en el YAML del Agente y `orders` en una configuración de cliente de trazado, la telemetría para ese servicio podría incluir:

```
service:payments
service:checkout
service:orders
```

Los filtros o tableros descendentes deben filtrar explícitamente el valor deseado si esperas solo uno.

## Uso {#usage}

Después de que hayas [asignado etiquetas][7] a nivel de host y [de integración][9], comienza a usarlas para filtrar y agrupar tus métricas, trazas y registros. Las etiquetas se utilizan en las siguientes áreas de tu plataforma de Datadog.

| Área                 | Usa etiquetas para                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Eventos][10]         | Filtra el flujo de eventos.                                                                          |
| [Dashboards][11]     | Filtra y agrupa métricas en gráficos.                                                               |
| [Infraestructura][12] | Filtra y agrupa en el mapa de servidores, la lista de infraestructura, los contenedores en vivo y las vistas de procesos en vivo. |
| [Monitors][13] | Gestiona los monitores, crea monitores o administra el tiempo de inactividad.                                             |
| [Metrics][14] | Filtra y agrupa con el Explorador de Métricas.                                                        |
| [Integrations][15] | Opcionalmente limita las métricas para AWS, Google Cloud y Azure.                                        |
| [APM][16] | Filtra servicios, trazas y perfiles, o navega a otras áreas con el Service Map.           |
| [RUM & Session Replay][17] | Filtra la búsqueda de eventos, análisis, patrones, reproducciones y problemas con el RUM Explorer.        |
| [Synthetic Monitoring & Continuous Testing][18] | Filtra y agrupa las pruebas Synthetic o las pruebas que se ejecutan en canalizaciones de CI con el Synthetic Monitoring & Testing Results Explorer.   |
| [Notebooks][19] | Filtrar y agrupar métricas en gráficos.                                                               |
| [Registros][20] | Filtra búsqueda de registros, análisis, patrones, seguimiento de las últimas líneas y canalizaciones.                                |
| [SLOs][21] | Buscar SLOs, SLOs agrupados por métricas y SLOs agrupados por monitores.                       |
| [Developers][22] | Obtén información o configura diferentes áreas en la interfaz de usuario con la API.                                |
| [Billing][23] | Reporta el uso de Datadog eligiendo hasta tres etiquetas, por ejemplo: `env`, `team`, y `account_id`. |
| [CI Visibility][24]  | Filtra y agrupa las ejecuciones de prueba o de canalización con el Explorador de Visibilidad CI. |

Para más información, consulta [Using Tags][1].

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/using_tags/
[2]: /es/metrics/
[3]: /es/getting_started/tagging/assigning_tags/#configuration-files
[4]: /es/getting_started/tagging/assigning_tags/#ui
[5]: /es/getting_started/tagging/assigning_tags/#api
[6]: /es/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /es/getting_started/tagging/assigning_tags/
[8]: /es/getting_started/tagging/unified_service_tagging
[9]: /es/integrations/
[10]: /es/getting_started/tagging/using_tags/#events
[11]: /es/getting_started/tagging/using_tags/#dashboards
[12]: /es/getting_started/tagging/using_tags/#infrastructure
[13]: /es/getting_started/tagging/using_tags/#monitors
[14]: /es/getting_started/tagging/using_tags/#metrics
[15]: /es/getting_started/tagging/using_tags/#integrations
[16]: /es/getting_started/tagging/using_tags/#apm
[17]: /es/getting_started/tagging/using_tags/#rum--session-replay
[18]: /es/getting_started/tagging/using_tags/#synthtics
[19]: /es/getting_started/tagging/using_tags/#notebooks
[20]: /es/getting_started/tagging/using_tags/#logs
[21]: /es/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /es/getting_started/tagging/using_tags/#developers
[23]: /es/account_management/billing/usage_attribution/
[24]: /es/getting_started/tagging/using_tags/#ci-visibility
[25]: /es/containers/troubleshooting/log-collection?tab=datadogoperator#missing-host-level-tags-on-new-hosts-or-nodes
[26]: /es/tracing/trace_collection/tracing_naming_convention/#span-tags
[27]: /es/tracing/trace_collection/tracing_naming_convention/#span-attributes
[28]: /es/api/latest/logs/#send-logs