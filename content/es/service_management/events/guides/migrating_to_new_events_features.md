---
aliases:
- /es/events/guides/migrating_from_stream_to_explorer
- /es/events/guides/migrating_to_new_events_features
further_reading:
- link: https://www.datadoghq.com/blog/datadog-events/
  tag: Blog
  text: Solucionar problemas con mayor rapidez con los eventos de Datadog mejorados
title: Migración a las características de eventos nuevas
---

<div class="alert alert-warning">
El flujo de eventos y los monitores de eventos heredados de Datadog se retirarán el <strong>30 de junio de 2022</strong>. Datadog está migrando a todos los clientes a una experiencia de eventos nueva y mejorada. Esta página contiene información importante sobre esta migración. Antes de la fecha de retiro, sigue los pasos de esta página para asegurarte de que tus visualizaciones y monitores de eventos existentes sigan funcionando de manera correcta.</div>


## ¿Por qué cambiar las características de eventos?

Lanzado hace más de 10 años, el flujo de eventos de Datadog es una de sus primeras características. La experiencia de eventos nueva incluye muchas características nuevas que te permiten obtener aún más valor de los eventos. Estas incluyen el análisis de eventos, la capacidad de generar métricas a partir de tus eventos, la capacidad de crear pipelines para posprocesar eventos y una sintaxis de consulta mucho más fácil de utilizar e intuitiva que está mejor alineada con otros productos de Datadog, como Log Management y APM.

## ¿Cuál es el cronograma de migración?

<strong>Marzo de 2022</strong>: se puede acceder a los Events Explore y Analytics nuevos. Datadog comienza a migrar dashboards y monitores de clientes que no se gestionan con las API.

<strong>5 de mayo de 2022</strong>: el flujo de eventos se retira en favor del Event Explorer.

<strong>19 de mayo de 2022</strong>: a partir de esta fecha, si bien Datadog sigue evaluando los monitores de eventos que no se han migrado, ya no se pueden editar. Los monitores de eventos nuevos deben utilizar la sintaxis nueva.

<strong>30 de junio de 2022</strong>: Datadog deja de evaluar los monitores de eventos que no se han migrado. Los monitores de eventos heredados dejan de funcionar.

## ¿Qué acciones debo tomar?

Si <strong>no</strong> gestionas tus dashboard o monitores mediante herramientas externas basadas en API (como Terraform o scripts), <strong>no tendrás que hacer nada</strong>. Datadog migrará tus dashboards y monitores antes del 30 de abril de 2022. Además, dejará tus monitores antiguos, pero se silenciarán y se dejará de evaluarlos a más tardar el 30 de junio de 2022.

<strong>Si utilizas Terraform u otros scripts basados en API</strong> para gestionar todos o algunos de tus <strong>dashboards</strong>, Datadog migrará las consultas en los widgets y superposiciones de tus eventos a la sintaxis nueva, pero tendrás que actualizar los scripts para mantenerlos sincronizados antes del 30 de junio de 2022.

<strong>Si utilizas Terraform u otros scripts basados en API</strong> para gestionar todos o algunos de tus <strong>monitores</strong>, tienes hasta el 30 de junio de 2022 para actualizarlos. Después de esta fecha, Datadog creará versiones nuevas de cualquier monitor no migrado y silenciará los monitores existentes para garantizar que continúes recibiendo alertas.

Datadog también puede ayudarte a migrar los monitores al sugerirte actualizaciones o al aplicar estas actualizaciones a tus monitores.

## ¿Qué hay de nuevo?

### Events Explorer

El Events Explorer muestra los eventos más recientes generados por tu infraestructura y servicios o alertas de monitorización. Reemplaza el flujo de eventos y proporciona una sintaxis de consulta más fácil de utilizar e intuitiva. Consulta la sección de [Events Explorer][1] para obtener más información.

### Event Analytics

{{< img src="service_management/events/events-analytics.png" alt="Visualización de Events Analytics filtrada por 'source:cloudtrail'" >}}

Además de ver y buscar eventos en el Explorer, ahora puedes realizar gráficas como la serie temporal, lista principal o tabla y agrupar el número de eventos para una consulta determinada. Consulta la sección de [Event Analytics][2] para obtener más información.

También puedes [generar métricas][3] con retención de 15 meses a partir de cualquier consulta de búsqueda de eventos para crear monitores y alertas basados en eventos históricos.

{{< img src="service_management/events/generate-metrics.png" alt="Imagen de métricas con la consulta de búsqueda de eventos." >}}


### Graficar eventos en dashboards

{{< img src="service_management/events/graph-events.png" alt="Events Analytics">}}

Ahora puedes graficar eventos para una consulta determinada en tus dashboards como una gráfica de serie temporal, valor de consulta, lista principal, tabla y mucho más.

Por ejemplo, consulta el dashboard de [Información general sobre las notificaciones de monitorización][4], que analiza las tendencias de los eventos de alerta de monitorización para ayudarte a mejorar la configuración y reducir la fatiga de alertas.

### Experiencia de monitores de eventos nueva

Los monitores de eventos se han adaptado para utilizar el mismo conjunto estandarizado de características que otros productos (logs, RUM, APM) y tienen capacidades adicionales.

Al crear monitores de eventos, el campo de búsqueda de consultas nuevo utiliza la función de autocompletar, en lugar de la consulta heredada para completar espacios en blanco.

{{< img src="service_management/events/guides/events-migration-monitor-new.png" alt="Interfaz de usuario nueva para la sintaxis de consulta de monitores" style="width:100%;" >}}

La búsqueda de consultas nueva te permite utilizar consultas complejas en monitores de eventos con funcionalidades nuevas, como operadores booleanos o comodines.

### Pipelines

Datadog analiza de manera automática los eventos con formato JSON. Cuando los eventos no tienen formato JSON, se analizan y enriquecen al encadenarlos de manera secuencial a través de un pipeline de procesamiento. Los procesadores extraen información o atributos significativos del texto semiestructurado para reutilizarlos como facetas. Cada evento que pasa por los pipelines se prueba con cada filtro de pipeline. Si coincide con un filtro, todos los procesadores se aplican de manera secuencial antes de pasar al siguiente pipeline.

## Atributos reservados

En esta lista se describen los atributos reservados ingeridos de manera automática con eventos.

| Atributo | Descripción                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | El nombre del host de origen como se define en las métricas. Datadog recupera de manera automática las etiquetas de host correspondientes del host coincidente en Datadog y las aplica a tus eventos. El Agent establece este valor de manera automática.                          |
| `source`  | Corresponde al nombre de la integración, o a la tecnología de la que procede el evento. Cuando coincide con el nombre de una integración, Datadog instala de manera automática los analizadores y facetas correspondientes. Por ejemplo: `nginx` y `postgresql`, entre otros. |
| `status`  | Corresponde al nivel o gravedad de un evento.      |
| `service` | El nombre de la aplicación o servicio que genera los eventos. |
| `message` | De manera predeterminada, Datadog ingiere el valor del atributo `message` como el cuerpo de la entrada del evento. |                     

## ¿Qué ha cambiado?

**Nota:** El proceso para enviar eventos sigue siendo el mismo. Puedes continuar enviando eventos mediante la API, el Agent o la característica de eventos por correo electrónico como antes.

### Las agregaciones de eventos ya no se realizan ni se muestran en la interfaz de usuario
Datadog ya no realiza la agregación de eventos de manera automática, y ya no agrupa los eventos por el atributo `aggregation_key`. La interfaz de usuario ya no muestra la agregación de eventos.

### Los comentarios de los eventos ya no se admiten ni se muestran en la interfaz de usuario
Los comentarios creados mediante la API con el tipo de evento `user_update` se mostrarán como eventos normales.

### Reasignación de estados en las consultas
Algunos valores de estado han cambiado:

| Estado heredado | Estado nuevo |
|---------------|------------|
| success (correcto)       | ok (correcto)         |
| warning (advertencia)       | warn (advertencia)       |
| info (información)          | info (información)       |
| error         | error      |

### Reasignación de fuentes en las consultas
Muchos nombres de fuentes de eventos han cambiado. Consulta la lista completa de [nombres de fuentes][5] afectados.

### El período de evaluación de monitores se ha limitado a 48 horas
Tus monitores no se evalúan más allá de un período de 48 horas. Si necesitas utilizar un período de evaluación más largo, puedes [generar métricas personalizadas][3] a partir de eventos y utilizar un monitor de métricas, en el que el período de evaluación puede ser de hasta un mes.

### Solo puedes agrupar un máximo de 4 facetas
(Anteriormente: grupos ilimitados) Los valores principales, los valores de mayor frecuencia de un grupo, se limitan en función de la cantidad total de grupos. Por ejemplo, si un monitor se activa más veces que el límite de facetas, se ordena por grupo principal y solo muestra los grupos N principales. Por ejemplo, N = 30 hosts resultantes si se agrupa por dos facetas y una faceta es `host`.
  * Una faceta da lugar a un límite de 1000 valores principales.
  * Dos facetas dan como resultado un límite de 30 valores principales por faceta (como máximo 900 grupos)
  * Tres facetas dan como resultado un límite de 10 valores principales por faceta (como máximo 1000 grupos)
  * Cuatro facetas dan como resultado un límite de 5 valores principales por grupo (como máximo 625 grupos)

### Ya no se admiten umbrales de recuperación en los monitores
Los umbrales de los monitores de eventos ya no admiten los tipos de umbral `warning_recovery` y `critical_recovery`. Se deben eliminar los umbrales de recuperación en los monitores de eventos nuevos.

Si utilizas estas características, [ponte en contacto con el equipo de asistencia][6] para que te ayude a encontrar una solución alternativa.

## Ejemplos

### Ejemplos del antes y después de la sintaxis de consulta de eventos

Mostrar eventos de GitHub o Chef
: Sintaxis heredada</br>
`sources:github,chef`
: Sintaxis nueva </br>
`source:(github OR chef)`

Mostrar eventos etiquetados con `env-prod`
: Sintaxis heredada</br>
`tags:env-prod`
: Sintaxis nueva </br>
`tags:env-prod`

Mostrar eventos etiquetados con `#env-prod` o `#db`
: Sintaxis heredada</br>
`tags:env-prod,db`, `tags:env-prod OR db`
: Sintaxis nueva </br>
`tags:(env-prod OR db)`

Mostrar eventos etiquetados con `#security-group:sg-123` y `#role:common-node`
: Sintaxis heredada</br>
`tags:security-group:sg-123 AND role:common-node`
: Sintaxis nueva </br>
`tags:(security-group:sg-123 AND role:common-node)`

Utilizar comodines para buscar prefijos y sufijos
: Sintaxis heredada</br>
No disponible
: Sintaxis nueva </br>
`*web` coincide con todos los mensajes de eventos que terminan en `web`</br>
`source:amazon*` coincide con todos los eventos cuya fuente comienza con `amazon`

### Ejemplos del antes y después de la sintaxis de la API de los monitores de eventos

La [API de los monitores de eventos][7] tiene una sintaxis de consulta de monitores nueva (repasa la sección de «Consulta de alertas de eventos V2»), con métodos de rollup de promedio y cardinalidad y menos atributos requeridos.

Ningún evento de Slack en las últimas 24 horas
: Sintaxis heredada </br>
`events('priority:all sources:slack').rollup('count').last('1d') < 1`
: Sintaxis nueva </br>
`events("source:slack").rollup("count").last("1d") < 1`

Instancia EC2 marcada para mantenimiento
: Sintaxis heredada </br>
`events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`
: Sintaxis nueva </br>
`events("Upcoming AWS maintenance event").rollup("count").by("name,host").last("2d") >= 1`

Zabbix o Prometheus han activado una alerta por un servicio hoy
: Sintaxis heredada </br>
`events('tags:service priority:all status:error sources:prometheus sources:zabbix).rollup('count').last('1d') > 0`
: Sintaxis nueva </br>
`events("source:(prometheus OR zabbix) status:error tags:service").rollup("count").last("1d") > 0`

No se recibieron eventos en un centro de datos para el servicio `datadog-agent`
: Sintaxis heredada </br>
Los monitores de eventos heredados no admiten el rollup de cardinalidad.
: Sintaxis nueva </br>
`events("service:datadog-agent").rollup("cardinality", "datacenter").by("service").last("15m") < 1`

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/service_management/events/explorer
[2]: /es/service_management/events/explorer/analytics
[3]: service_management/events/usage/#custom-metrics
[4]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[5]: /es/service_management/events/guides/new_events_sources/
[6]: /es/help/
[7]: /es/api/latest/monitors/#create-a-monitor