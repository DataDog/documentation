---
aliases:
- /es/logs/faq/partner_log_integration
- /es/developers/integrations/log_integration/
description: Aprende a crear un pipeline de integración de logs en Datadog.
further_reading:
- link: /integrations/#cat-log-collection
  tag: Documentación
  text: Consultar las integraciones de logs en Datadog existentes
- link: /logs/explorer/facets/
  tag: Documentación
  text: Obtener más información sobre facetas de logs
- link: /logs/explorer/
  tag: Documentación
  text: Obtener más información sobre el Explorador de logs
- link: /logs/log_configuration/pipelines/
  tag: Documentación
  text: Obtener más información sobre pipelines de log
title: Crear un pipeline de log
---
## Información general

Esta página guía a los socios tecnológicos en la creación de un pipeline de log. Se requiere un pipeline de log, si tu integración envía logs a Datadog.


Al desarrollar tu integración para enviar logs a Datadog, sigue estas instrucciones para garantizar una mejor experiencia a tus usuarios.

## Prácticas recomendadas

Antes de crear un pipeline de log, ten en cuenta las siguientes instrucciones y prácticas recomendadas:

La integración debe utilizar endpoints compatibles con los logs de Datadog
: Tu integración debe utilizar uno de los [endpoints compatibles][23] expuestos por Datadog para la ingestión de logs. De lo contrario, puedes utilizar el [endpoint HTTP para la ingestión de logs][1] para enviar logs a Datadog.

La integración debe ser compatible con todos los sitios Datadog
: Los usuarios deben poder elegir entre los diferentes sitios Datadog, siempre que sea posible. Consulta [Empezando con sitios Datadog][2] para obtener más información sobre las diferencias entre sitios. </br></br> El endpoint de tu sitio Datadog es `http-intake.logs`.{{< region-param key="dd_site" code="true" >}}.

Permite a los usuarios adjuntar etiquetas (tags) personalizadas al configurar sus integraciones
: Las etiquetas (tags) pueden configurarse como atributos clave-valor en el cuerpo JSON de la carga útil de los logs de tu integración. Datadog recomienda permitir a los usuarios configurar etiquetas (tags) personalizadas para una integración. Si la integración [envía logs a través de la API][1], las etiquetas (tags) también pueden configurarse utilizando el parámetro de consulta `ddtags=<TAGS>`.

Configura la etiqueta (tag) de log `source` de la integración con el nombre de la integración 
: Datadog recomienda configurar la etiqueta (tag) `source`como `<integration_name>` (`source:okta`) para una aplicación. `source` debe configurarse antes de enviar logs a endpoints de Datadog, ya que no se puede reasignar en la interfaz de usuario Datadog. </br></br> La etiqueta (tag) `source` debe estar en minúsculas y no debe ser editable por los usuarios, ya que se utiliza para habilitar pipelines y dashboards de integración.

Evita enviar logs que contengan matrices en el cuerpo JSON, siempre que sea posible 
: Aunque es posible enviar datos de matrices en tus logs, Datadog recomienda evitar las matrices, ya que no se pueden [facetar][24].

No registres claves de API Datadog
: Las claves de API Datadog se pueden pasar en la cabecera o como parte de la ruta HTTP de tus solicitudes de API. Para ver ejemplos, consulta la [documentación sobre el envío de logs a la API][1]. Evita registrar la clave de API en tu configuración.

No utilices claves de aplicación Datadog
: Las claves de aplicación Datadog no son necesarias para enviar logs utilizando el endpoint HTTP. 

## Crear recursos de integración de logs

Puedes crear y diseñar tus recursos de integración de logs directamente en tu cuenta de socio de Datadog.

Las integraciones de logs cuentan con dos conjuntos de recursos: los [pipelines][13] y las [facetas][12] asociados. Centralizar logs de varias tecnologías y aplicaciones puede producir muchos atributos únicos. Para utilizar dashboards predefinidos, las integraciones del socio tecnológico deben basarse en la [convención de nomenclatura estándar][17] de Datadog para la creación de integraciones.

Una vez que finalice el diseño de la integración de Datadog y se envéin los logs al endpoint de logs de Datadog, define tus pipelines y facetas de log para enriquecer y estructurar los logs de tu integración.

Para obtener más información sobre cómo convertirte en socio tecnológico de Datadog y acceder a un entorno aislado (sandbox) de desarrollo de integraciones, consulta [Crear una integración][18].

<div class="alert alert-danger">Para ser revisadas por el equipo de integraciones de Datadog, las integraciones de logs deben incluir recursos y contar con procesadores o facetas de pipeline.</div>

### Información general de los pipelines

Los logs enviados a Datadog se procesan en [pipelines de log][13], utilizando procesadores de pipelines. Estos procesadores permiten a los usuarios analizar, reasignar y extraer información de atributos, enriqueciendo y normalizando los logs para su uso en toda la plataforma.

#### Crear un pipeline

Crea un pipeline de log para procesar logs especificado con procesadores de pipelines.


1. En la página [**Pipelines**][3], haz clic en **+ New Pipeline** (+ Nuevo pipeline).
2. En el campo **Filtrar**, introduce la etiqueta (tag) `source` única que define la fuente de logs del socio tecnológico. Por ejemplo, `source:okta` para la integración Okta.
**Nota**: Asegúrate de que los logs enviados a través de la integración están etiquetados con las etiquetas (tags) de fuente correctas antes de ser enviados a Datadog.
3. También puedes añadir etiquetas (tags) y una descripción.
4. Haz clic en **Create** (Crear).

Una vez configurado un pipeline, añade procesadores para enriquecer y estructurar aún más los logs.
#### Añadir procesadores de pipeline

Antes de definir tus procesadores de pipeline, consulta los [atributos estándar de Datadog][6].

Utiliza procesadores en tus pipelines para enriquecer y reestructurar tus datos y generar atributos de log. Para consultar la lista de todos los procesadores de logs, consulta la documentación [Procesadores][10].

##### Requisitos

Asigna los atributos de log de la aplicación a los atributos estándar de Datadog 
: Utiliza el [reasignador de atributos][5] para asignar claves de atributos a [atributos estándar de Datadog][6], siempre que sea posible. Por ejemplo, un atributo de un valor IP de cliente de servicio de red debe reasignarse a `network.client.ip`.

Asigna la etiqueta (tag) de log `service` al nombre del servicio que produce la telemetría
: Utiliza el [reasignador de servicios][7] para reasignar el atributo `service`. Cuando la fuente y el [servicio][26] compartan el mismo valor, reasigna la etiqueta (tag) `service` a la etiqueta (tag) `source`. Las etiquetas (tags) `service` deben estar en minúsculas.

Asigna la marca de tiempo interna del log a tu marca de tiempo oficial de Datadog 
: Utiliza el [reasignador de fechas][4] para definir la marca de tiempo de los logs. Si la marca de tiempo de un log no se corresponde a un [atributo de fecha estándar][28], Datadog define su marca de tiempo en el momento de la ingesta.

Asigna los atributos de estado personalizados de los logs al atributo oficial `status` de Datadog 
: Utiliza el [reasignador de estado][25] para reasignar el `status` de un log o un [procesador de categorías][19] para los estados asignados a un rango (como con los códigos de estado HTTP).

Asigna el atributo de mensaje personalizado de los logs al atributo oficial `message` de Datadog 
: Utiliza el [reasignador de mensajes][9] para definir el mensaje oficial del log, si los logs de aplicación no se asignan al atributo de mensaje estándar. Esto permite a los usuarios buscar logs utilizando texto libre.

Define un espacio de nombres para atributos personalizados de tus logs
: Los atributos genéricos de logs que no se asignan a un [atributo estándar de Datadog][6] deben tener un espacio de nombres, si se asignan a [facetas][14]. Por ejemplo, `file` se reasignaría a `integration_name.file`.
Utiliza el [reasignador de atributos][5] para definir las claves de atributo para un nuevo atributo con espacio de nombres.

1. Expande el pipeline recientemente creado y haz clic en **Add Processor** (Añadir procesador) para empezar a crear tu pipeline utilizando procesadores.
2. Si los logs de integraciones no están en formato JSON, añade el [procesador Grok][8] para extraer información de atributos. Los procesadores Grok analizan los atributos y enriquecen los logs antes de la reasignación o del procesamiento posterior.
3. Después de extraer los atributos de los logs, reasígnalos a [atributos estándar de Datadog][6], cuando sea posible, utilizando [reasignadores de atributos][5].
4. Define la marca de tiempo de los logs de una integración para que sea su marca de tiempo oficial de Datadog, utilizando el [reasignador de fechas][4].
5. Para procesar y transformar datos de forma más avanzada, utiliza [procesadores][10] adicionales.
Por ejemplo, el `Arithmetic Processor` puede utilizarse para calcular información basada en atributos o el `String Builder Processor` puede concatenar varios atributos de cadena.

**Consejos**
* Elimina los atributos originales al reasignar atributos de log utilizando `preserveSource:false`. Esto ayuda a evitar confusiones y elimina duplicados.
* Para asegurar un rendimiento óptimo del análisis grok, evita los emparejadores comodín como `%{data:}` y `%{regex(".*"):}`. Haz que tus sentencias de análisis sean lo más específicas posible.
* Sigue el curso gratuito [Profundizando en el procesamiento de logs][20] para obtener información general sobre los procesadores de texto y saber cómo aprovechar los atributos estándar.

### Información general sobre las facetas

Las facetas son atributos cualitativos o cuantitativos específicos que pueden utilizarse para filtrar y delimitar los resultados de las búsquedas. Aunque las facetas no son estrictamente necesarias para filtrar los resultados de las búsquedas, desempeñan un papel esencial a la hora de ayudar a los usuarios a comprender las dimensiones disponibles para refinar sus búsquedas.

Las facetas para atributos estándar son añadidas automáticamente por Datadog cuando se publica un pipeline. Consulta si el atributo debe reasignarse a un [atributo estándar de Datadog][6].

No todos los atributos están pensados para ser utilizados como facetas. La necesidad de facetas en las integraciones se centra en dos cosas:
* Las facetas proporcionan una interfaz sencilla para filtrar logs. Son aprovechadas por las funciones de autocompletar de Log Management, lo que permite a los usuarios buscar y agregar la información clave que encuentran en sus logs.
* Las facetas permiten renombrar los atributos poco legibles con una etiqueta (label) más fácil de entender. Por ejemplo: `@deviceCPUper` → `Device CPU Utilization Percentage`.

Puedes crear [facetas][12] en el [Explorador de logs][16].

#### Crear facetas

Es importante definir correctamente las facetas, ya que mejoran la facilidad de uso de los logs indexados en análisis, monitores y funciones de agregación de todo el producto Log Management de Datadog.

Permiten facilitar la búsqueda de logs de aplicaciones rellenando las funciones de autocompletar en Log Management.

<div class="alert alert-info">Las facetas cuantitativas, denominadas "Medidas", permiten a los usuarios filtrar logs en un rango de valores numéricos utilizando operadores relacionales.  
Por ejemplo, una medida de un atributo de latencia permite a los usuarios buscar todos los logs que superan una duración determinada. </div>

##### Requisitos

Los atributos asignados a facetas personalizadas primero deben tener un espacio de nombres
: Los atributos personalizados genéricos que no se asignan a [atributos estándar de Datadog][6] deben tener un espacio de nombres cuando se utilizan con [facetas][14] personalizadas. Se puede utilizar un [reasignador de atributos][5] para colocar un espacio de nombres a un atributo con el nombre de la integración.  
Por ejemplo, reasignando `attribute_name` a `integration_name.attribute_name`.

Las facetas personalizadas no deben duplicar una faceta de Datadog existente
: Para evitar confusiones con facetas ya existentes en Datadog, no crees facetas personalizadas que dupliquen cualquier faceta existente ya asignada a [atributos estándar de Datadog][6].

Las facetas personalizadas deben agruparse bajo el nombre `source` 
: Al crear una faceta personalizada se debe asignar un grupo. Configura el valor del `Group` como `source`, igual que con el nombre de la integración.

Las facetas personalizadas deben tener el mismo tipo de datos que el atributo asignado
: Configura el tipo de datos de la faceta (Cadena, Booleano, Doble o Entero) con el mismo tipo que el atributo asignado a ella. Los tipos no coincidentes impiden que la faceta se utilice según lo previsto y pueden hacer que se rellene incorrectamente.

**Añadir una faceta o medida**

1. Haz clic en un log que contenga el atributo al que quieres añadir una faceta o una medida. 
2. En el panel de logs, haz clic en el icono con el engranaje, situado junto al atributo.
3. Selecciona **Create facet/measure for @attribute** (Crear faceta/medida para @atributo).
4. En el caso de una medida, para definir la unidad, haz clic en **Advanced options** (Opciones avanzadas). Seleccione la unidad en función de lo que representa el atributo.
**Nota**: Define la [unidad][11] de una medida en función de lo que representa el atributo.
5. Especifica un **Grupo** de facetas para facilitar la navegación por la lista de facetas. Si el grupo de facetas no existe, selecciona **Nuevo grupo**, introduce el nombre del grupo que coincide con la etiqueta (tag) de origen y añade una descripción para el nuevo grupo.
6. Para crear la faceta, haz clic en **Add** (Añadir).

#### Configurar y editar facetas

1. En el panel de logs, haz clic en el icono de engranaje situado junto al atributo que quieres configurar o agrupar.
2. Selecciona **Edit facet/measure for @attribute** (Editar faceta/medida para @atributo). Si aún no existe una faceta para el atributo, selecciona **Create facet/measure for @attribute** (Crear faceta/medida para @atributo).
3. Haz clic en **Add** (Añadir) o **Update** (Actualizar) cuando termines.

**Consejos**
* Las medidas deben tener una unidad siempre que sea posible. A las medidas se les puede asignar una [unidad][27]. Existen dos familias de unidades, `TIME` y `BYTES`, con unidades como `millisecond` o `gibibyte`.
* A las facetas se les puede asignar una descripción. Una descripción clara de la faceta puede ayudar a los usuarios a entender cómo utilizarla mejor.
* Si reasignas un atributo y conservas el atributo original mediante la opción `preserveSource:true`, define una faceta en uno solo de ellos.
* Cuando configures manualmente facetas en los archivos de configuración `.yaml` de un pipeline, ten en cuenta que se les asigna una `source`. Ésta indica el lugar del que se obtuvo el atributo y puede ser `log` para atributos o `tag` para etiquetas (tags).

## Revisar y desplegar la integración

Datadog revisa la integración del log basándose en las directrices y los requisitos documentados en esta página, y envía sus comentarios al socio tecnológico a través de GitHub. El socio tecnológico, por su parte, revisa y realiza cambios en consecuencia.

Para iniciar un proceso de revisión, exporta tu pipeline de log y las facetas personalizadas pertinentes utilizando el icono **Export** (Exportar) de la [página de configuración de logs][3]. 

{{< img src="developers/integrations/export_pipeline.png" alt="Haz clic en el icono Exportar pipeline, para exportar tu pipeline de log en Datadog" width="50%">}}

Incluye una muestra de logs sin procesar con **todos** los atributos que esperas que tu integración envíe a Datadog. Los logs sin procesar incluyen los mensajes sin procesar generados directamente desde la aplicación de origen, **antes** de ser enviados a Datadog.

La exportación de tu pipeline de log incluye dos archivos YAML:

* Uno con el pipeline de log, que incluya facetas personalizadas, reasignadores de atributos y analizadores grok. El archivo exportado se denomina `pipeline-name.yaml`.
* Uno con la muestra de logs sin procesar proporcionada y una sección `result` vacía. El archivo exportado se denomina `pipeline-name_test.yaml`.

**Nota**: Dependiendo de tu navegador, es posible que tengas que ajustar la configuración para permitir la descarga de archivos.

Una vez descargados estos archivos, ve a tu [pull request de la integración][22] en GitHub y añádelos en el directorio **Assets** > **Logs* (Recursos > Logs). Si aún no existe una carpeta de logs, puedes crear una.

Las validaciones se ejecutan automáticamente en tu pull request y validan tus pipelines frente a las muestras sin procesar proporcionadas. Éstas producirán un resultado que puedes definir como la sección `result` de tu archivo `pipeline-name_test.yaml`.
Una vez que las validaciones se ejecuten nuevamente, si no se detectan problemas, la validación de los logs debería realizarse de forma correcta.

Tres errores de validación comunes son:
1. El campo `id` está presente en ambos archivos YAML: asegúrate de que el campo `id` coincide con el campo `app_id` del archivo `manifest.json` de tu integración, para conectar tu pipeline con tu integración. 
2. No proporciones el `result` de la ejecución de logs sin procesar que proporcionaste para tu pipeline. Si el resultado de la validación es exacto, toma ese resultado y añádelo al campo `result` en el archivo YAML que contiene el ejemplo de logs sin procesar.
3. Si envías `service` como parámetro, en lugar de enviarlo en la carga útil del log, debes incluir el campo `service` debajo de tus ejemplos de logs dentro del archivo yaml.

Una vez aprobadas las validaciones, Datadog crea y despliega los nuevos recursos de integración de logs. Si tienes alguna pregunta, añádela como comentario en tu pull request. Los miembros del equipo de Datadog te responderán en un plazo de 2 a 3 días laborables.

## Referencias adicionales

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
[23]: https://docs.datadoghq.com/es/logs/log_collection/?tab=http#additional-configuration-options
[24]: https://docs.datadoghq.com/es/logs/explorer/search_syntax/#arrays
[25]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#log-status-remapper
[26]: https://docs.datadoghq.com/es/getting_started/tagging/#overview
[27]: https://docs.datadoghq.com/es/logs/explorer/facets/#units
[28]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/?tab=date#date-attribute