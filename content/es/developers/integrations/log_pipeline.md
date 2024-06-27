---
aliases:
- /es/logs/faq/partner_log_integration
- /es/developers/integrations/log_integration/
description: Aprende a crear una integración de logs en Datadog.
further_reading:
- link: /integrations/#cat-log-collection
  tag: Documentación
  text: Consultar las integraciones de logs de Datadog existentes
- link: /logs/explorer/facets/
  tag: Documentación
  text: Obtener más información sobre facetas de logs
- link: /logs/explorer/
  tag: Documentación
  text: Obtener más información sobre el Explorador de logs
- link: /logs/log_configuration/pipelines/
  tag: Documentación
  text: Obtener más información sobre pipelines de logs
kind: Documentación
title: Crear un pipeline de logs
---
## Información general

Esta página guía a los socios tecnológicos en la creación de un pipeline de logs. Se requiere un pipeline de logs si tu integración envía logs. 

## Integraciones de logs

Utiliza el [endpoint HTTP de consumo de logs][1] para enviar logs a Datadog.

## Proceso de desarrollo

### Directrices

Al crear un pipeline de logs, ten en cuenta las siguientes prácticas recomendadas:

Mapea tus datos a atributos estándar de Datadog
: La centralización de logs de varias tecnologías y aplicaciones puede generar decenas o centenas de atributos diferentes en un entorno de Log Management. En la medida de lo posible, las integraciones deben basarse en la [convención de nomenclatura estándar][17].

Configura la etiqueta (tag) `source` con el nombre de la integración.
: Datadog recomienda que la etiqueta `source` se configure como `<integration_name>` y que la etiqueta `service` se configure como el nombre del servicio que produce la telemetría. Por ejemplo, la etiqueta `service` puede utilizarse para diferenciar logs por línea de productos. </br></br> Para los casos en los que no haya diferentes servicios, configura `service` con el mismo valor que `source`. Las etiquetas `source` y `service` deben ser no editables por el usuario, ya que las etiquetas se utilizan para habilitar pipelines y dashboards de integraciones. Las etiquetas pueden configurarse en la carga útil o a través del parámetro de consulta, por ejemplo, `?ddsource=example&service=example`. </br></br> Las etiquetas `source` y `service` deben estar en letras minúsculas. 

La integración debe admitir todos los sitios Datadog.
: El usuario debe poder elegir entre los diferentes sitios Datadog, siempre que sea posible. Para obtener más información sobre las diferencias entre sitios, consulta [Empezando con sitios Datadog][2]. </br></br> El endpoint de tu sitio Datadog es `http-intake.logs`.{{< region-param key="dd_site" code="true" >}}.

Permite a los usuarios adjuntar etiquetas personalizadas mientras configuran la integración.
: Datadog recomienda que las etiquetas manuales de usuario se envíen como atributos clave-valor en el cuerpo del JSON. Si no es posible añadir etiquetas manuales a los logs, puedes enviar etiquetas utilizando el parámetro de consulta `ddtags=<TAGS>`. Para ver ejemplos, consulta la [documentación sobre el envío de logs a la API][1].

Envía datos sin matrices en el cuerpo del JSON, siempre que sea posible. 
: Aunque es posible enviar algunos datos como etiquetas, Datadog recomienda enviar los datos en el cuerpo del JSON y evitar las matrices. Esto te proporciona más flexibilidad en las operaciones que puedes realizar sobre los datos en Log Management de Datadog. 

No registres claves de API de Datadog.
: Las claves API de Datadog pueden transferirse en el encabezado o como parte de la ruta HTTP. Para ver ejemplos, consulta la [documentación sobre el envío de logs a la API][1]. Datadog recomienda utilizar métodos que no registren la clave de API en tu configuración.

No utilices claves de aplicación de Datadog.
: La clave de aplicación de Datadog es diferente de la clave de API y no es necesaria para enviar logs utilizando el endpoint HTTP. 

## Configurar los recursos de integraciones de logs en tu cuenta de socio Datadog 

Para obtener más información sobre cómo convertirte en socio tecnológico de Datadog y acceder a un espacio aislado de desarrollo de integraciones, consulta [Crear una integración][18].

### Requisitos de los pipelines de logs

Los logs enviados a Datadog se procesan en [pipelines de logs][13] para estandarizarlos y así facilitar su búsqueda y análisis.

Para configurar un pipeline de logs:

1. En la página [**Pipelines**][3], haz clic en **+ New Pipeline** (+ Nuevo pipeline).
2. En el campo **Filter** (Filtro), introduce una única etiqueta `source` que defina el origen de los logs para los logs del el socio tecnológico. Por ejemplo, `source:okta` para la integración con Okta. **Nota**: Asegúrate de que los logs enviados a través de la integración se etiquetan con las etiquetas de origen apropiadas, antes de ser enviados a Datadog.
3. También puedes añadir etiquetas y una descripción.
4. Haz clic en **Create** (Crear).

Puedes añadir procesadores dentro de tus pipelines para reestructurar tus datos y generar atributos.

**Requisitos**

- Utiliza el [remapeador de fechas][4] para definir la marca de tiempo oficial de los logs.
- Utiliza un remapeador de estados para remapear el `status` de un log o un [procesador de categorías][19] para estados mapeados según un rango (como con los códigos de estado HTTP).
- Utiliza el [remapeador][5] de atributos para remapear claves de atributo a [atributos de Datadog][6] estándar. Por ejemplo, una clave de atributo que contenga la dirección IP del cliente debe remapearse a `network.client.ip`, para que Datadog pueda mostrar logs del socio tecnológico en dashboards listos para utilizar. Elimina los atributos originales al remapear, utilizando `preserveSource:false` para evitar duplicados.
- Utiliza el [remapeador de servicios][7] para remapear el atributo `service` o configurarlo con el mismo valor que el atributo `source`.
- Utiliza el [procesador de grok][8] para extraer valores en logs con el fin de mejorar las búsquedas y los análisis. Para mantener un rendimiento óptimo, el analizador de grok debe ser específico. Evita las coincidencias con comodines.
- Utiliza el [remapeador de mensajes][9] para definir el mensaje oficial del log y hacer que determinados atributos se puedan buscar utilizando texto completo.

Para ver la lista de todos los procesadores de logs, consulta [Procesadores][10].

**Consejo**: Para obtener información general sobre procesadores de escritura y el aprovechamiento de los atributos estándar, sigue el curso gratuito [Profundizar los conocimientos sobre el procesamiento de logs][20]. 

### Requisitos de las facetas

También puedes crear [facetas][12] en el [Explorador de logs][16]. Las facetas son atributos específicos que pueden utilizarse para filtrar y acotar los resultados de las búsquedas. Aunque las facetas no son estrictamente necesarias para filtrar los resultados de las búsquedas, desempeñan un papel crucial a la hora de ayudar a los usuarios a conocer las dimensiones disponibles para refinar sus búsquedas.

Las medidas son un tipo específico de faceta que se utilizan para realizar búsquedas dentro de un rango. Por ejemplo, añadir una medida para la duración de la latencia permite a los usuarios buscar todos los logs que se encuentran por encima de una cierta latencia. 
**Nota**: Define la [unidad][11] de una faceta de medida en función de lo que representa el atributo.

Para añadir una faceta o medida:

1. Haz clic en un log que contenga el atributo al que quieres añadir una faceta o una medida. 
2. En el panel de logs, haz clic en el icono con el engranaje, situado junto al atributo.
3. Selecciona **Create facet/measure for @attribute** (Crear faceta/medida para @atributo).
4. En el caso de una medida, para definir la unidad, haz clic en **Advanced options** (Opciones avanzadas). Seleccione la unidad en función de lo que representa el atributo.
5. Haz clic en **Add** (Añadir).

Para ayudarte a navegar por la lista de facetas, estas se encuentran agrupadas. Para los campos específicos de logs de integraciones, crea un **grupo único con el mismo nombre** que la etiqueta `source`. 

1. En el panel de logs, haz clic en el icono del engranaje, situado junto al atributo que quieres incluir en el nuevo grupo.
2. Selecciona **Edit facet/measure for @attribute** (Editar faceta/medida para @atributo). Si aún no existe una faceta para el atributo, selecciona **Create facet/measure for @attribute** (Crear faceta/medida para @atributo).
3. Haz clic en **Advanced options** (Opciones avanzadas).
4. En el campo **Group** (Grupo), introduce el nombre del grupo que coincide con la etiqueta de origen y una descripción del nuevo grupo, y selecciona **New group** (Nuevo grupo).
5. Haz clic en **Update** (Actualizar).

**Directrices**
- Antes de crear una nueva faceta para una integración, revisa si el atributo debería remapearse a un [atributo estándar][6]. Cuando se publica el pipeline de logs, Datadog añade automáticamente facetas para atributos estándar.
- No todos los atributos están pensados para ser utilizados como facetas. Pero es posible seguir buscando atributos que no se utilizan como facetas. La necesidad de facetas en las integraciones se centra en tres cosas:
1. Las facetas que son medidas permiten asociar unidades a un atributo. Por ejemplo, un atributo "response_time" podría tener una unidad de "ms" o "s". 
2. Las facetas proporcionan una interfaz de filtrado directa para logs. Cada faceta aparece debajo del encabezado del grupo y puede utilizarse para filtrar.
3. Las facetas permiten renombrar atributos poco legibles utilizando una etiqueta más fácil de comprender. Por ejemplo: @deviceCPUper → Device CPU Utilization Percentage (@deviceCPUper → Porcentaje de utilización de CPU del dispositivo).

**Requisitos**
- En la medida de lo posible, utiliza atributos estándar.
- Todas las facetas que no se mapean a atributos reservados o estándar deben llevar un espacio de nombre con el nombre de la integración.
- Una faceta tiene un origen. Puede ser `log` para atributos o `tag` para etiquetas.
- Una faceta tiene un tipo (cadena, booleano, doble o entero) que coincide con el tipo de atributo. Si el tipo de valor del atributo no coincide con el de la faceta, el atributo no se indexa con la faceta.
- Las facetas dobles y enteras pueden tener una unidad. Las unidades se componen de una familia (como tiempo o bytes) y de un nombre (como milisegundo o gibibyte).
- Una faceta se almacena en grupos y tiene una descripción.
- Si remapeas un atributo y conservas ambos, define la faceta de uno solo.

## Revisar y desplegar la integración

Datadog revisa la integración del log basándose en las directrices y los requisitos documentados en esta página, y envía sus comentarios al socio tecnológico a través de GitHub. El socio tecnológico, por su parte, revisa y realiza cambios en consecuencia.

Para iniciar un proceso de revisión, exporta tu pipeline de logs y las facetas personalizadas pertinentes utilizando el icono **Export** (Exportar) de la [página de configuración de logs][3]. 

{{< img src="developers/integrations/export_pipeline.png" alt="Haz clic en el icono Exportar pipeline, para exportar tu pipeline de logs en Datadog" width="50%">}}

Incluye un ejemplo de logs sin procesar, con todos los atributos que esperas que la integración envíe a Datadog. Los logs sin procesar incluyen los mensajes sin procesar, generados directamente desde el origen, antes de que Datadog los consuma.

La exportación de tu pipeline de logs incluye dos archivos YAML:

- Uno con el pipeline de logs, que incluye facetas personalizadas, remapeadores de atributos y analizadores de grok.
- Uno con el ejemplo de log sin procesar, con un resultado vacío. 

Nota: Dependiendo de tu navegador, es posible que tengas que ajustar tus parámetros para permitir la descarga de archivos.

Una vez descargados estos archivos, ve a tu [solicitud de extracción de la integración][22] en GitHub y añádelos en el directorio **Assets** > **Logs* (Recursos > Logs). Si aún no existe una carpeta de logs, puedes crear una.

Las validaciones se ejecutan automáticamente en tu solicitud de extracción.

Tres errores de validación comunes son:
1. El campo `id` está presente en ambos archivos YAML: asegúrate de que el campo `id` coincide con el campo `app_id` del archivo `manifest.json` de tu integración, para conectar tu pipeline con tu integración. 
2. No recibes el resultado de la ejecución de los logs sin procesar que proporcionaste con respecto a tu pipeline. Si el resultado de la validación es preciso, toma ese resultado y añádelo al campo `result` del archivo YAML que contiene el ejemplo de log sin procesar.
3. Si envías `service` como parámetro, en lugar de enviarlo en la carga útil del log, debes incluir el campo `service` debajo de tus ejemplos de logs dentro del archivo yaml.


Una vez superadas las validaciones, Datadog crea y despliega los nuevos recursos de integraciones de logs. Si tienes alguna pregunta, añádela como comentario en tu solicitud de extracción. Un miembro del equipo de Datadog te responderá en un plazo de 2 a 3 días laborables.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/es/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/es/standard-attributes?product=log+management
[7]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: https://docs.datadoghq.com/es/logs/log_configuration/processors/
[11]: https://docs.datadoghq.com/es/logs/explorer/facets/#units
[12]: https://docs.datadoghq.com/es/logs/explorer/facets/
[13]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/
[14]: https://docs.datadoghq.com/es/glossary/#facet
[15]: https://docs.datadoghq.com/es/glossary/#measure
[16]: https://docs.datadoghq.com/es/logs/explorer/
[17]: https://docs.datadoghq.com/es/logs/log_configuration/attributes_naming_convention/#standard-attributes
[18]: https://docs.datadoghq.com/es/developers/integrations/?tab=integrations
[19]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#category-processor
[20]: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
[21]: https://partners.datadoghq.com/
[22]: https://docs.datadoghq.com/es/developers/integrations/create_a_tile/?tab=buildatileontheintegrationspage#open-a-pull-request