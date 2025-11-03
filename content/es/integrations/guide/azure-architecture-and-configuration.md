---
description: Guía de arquitectura de la integración de Azure con Datadog y opciones
  de configuración alternativas
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentación
  text: Integración Azure
title: Arquitectura y configuración de la integración de Azure
---

## Información general

En esta guía se proporciona información detallada y arquitecturas de referencia para los usuarios que configuran la integración de Azure de Datadog, así como opciones de configuración alternativas para casos de uso específicos.

### Arquitecturas de referencia

Los diagramas de esta guía brindan una representación visual del proceso de configuración y resultado al seguir los pasos de la [página de la integración de Azure][1]. En esta guía se proporciona una descripción detallada de la interacción de Datadog con tu entorno de Azure y se responden preguntas comunes sobre seguridad, cumplimiento y gobernanza.

### Configuraciones alternativas

Los procesos de configuración documentados en la [página de la integración de Azure][1] son ​​los pasos recomendados y dan como resultado la configuración ideal para la mayoría de los usuarios. Es posible que las opciones de configuración alternativas de este documento sean mejores para determinados casos de uso. Se describen las compensaciones necesarias en cuanto a rendimiento, funciones o facilidad de gestión.

## Recopilación de datos y métricas de Azure

Al habilitar la integración de Azure de Datadog, Datadog puede:

  - Descubrir y monitorizar todos los recursos en todas las suscripciones dentro del contexto determinado
  - Actualizar de manera automática las definiciones de métrica detectadas para garantizar que se recopilen todas las métricas disponibles en Azure Monitor
  - Ingerir una serie de metadatos generales y específicos de recursos (incluidas etiquetas [tags] de Azure personalizadas) y aplicarlos a las métricas de recursos asociadas en Datadog como etiquetas
  - Consultar las APIs de metadatos de Azure y usar las respuestas para [generar métricas útiles en Datadog][2] a fin de obtener información que no admite Azure Monitor

Las APIs de Azure que se usan y los datos recopilados son idénticos independientemente de si usas la versión estándar o la nativa de Azure de la integración.

{{% site-region region="us,us5,eu,gov,ap1,ap2" %}}

### Recopilación de datos y métricas de la integración estándar de Azure

_Disponible en todos los sitios de Datadog_

Sigue estos pasos para habilitar la integración estándar de Azure:

  1. Crea un registro de aplicaciones en tu Active Directory e ingresa las credenciales en la [página de la integración de Azure con Datadog][2].
  2. Concede a la aplicación acceso de lectura (rol de `Monitoring Reader` [Lector de monitorización]) a las suscripciones o al grupo de gestión que quieres monitorizar.

En el siguiente diagrama se describen el proceso y la arquitectura resultante de la configuración de la integración de Azure descrita en la documentación principal.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Diagrama de la configuración de la integración del registro de aplicaciones" >}}

Una vez que se complete esto, la recopilación de datos comienza de manera automática. La información del registro de aplicaciones ingresada en Datadog le permite a Datadog [solicitar un token de Azure Active Directory][1] (AD). Datadog usa este token como autorización para las llamadas a la API a varias APIs de Azure, para descubrir recursos en el contexto proporcionado y recopilar datos. Este proceso continuo se ejecuta con intervalos de dos minutos de manera predeterminada, y se usa para descubrir y recopilar datos de tu entorno de Azure. El proceso de recopilación de datos se muestra a continuación.

{{< img src="integraciones/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Diagrama de la configuración de la integración del registro de aplicaciones" >}}

[1]: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/
[2]: https://app.datadoghq.com/integrations/azure
{{% /site-region %}}
{{% site-region region="us3" %}}

### Recopilación de métricas de la integración nativa de Azure
_Solo disponible en el sitio US3 de Datadog_

**Vinculación de cuentas**: el recurso de Datadog en Azure vincula tu entorno de Azure y tu cuenta de Datadog. Esta vinculación permite la misma recopilación de datos que la integración estándar de Azure disponible para otros sitios de Datadog, pero con un mecanismo de autenticación diferente. Su acceso se asigna mediante una **identidad gestionada por el sistema** asociada con el recurso de Datadog en Azure, en lugar de un **registro de aplicaciones** creado y configurado por el usuario. 

**Permisos**: la asignación del rol de `Monitoring Reader` [Lector de monitorización] se produce de manera automática durante la creación del recurso de Datadog y está limitada a la suscripción principal del recurso de Datadog. Si añades suscripciones adicionales para la monitorización al recurso de Datadog, este contexto se actualiza de manera automática para la identidad gestionada.

Sigue estos pasos para habilitar la integración nativa de Azure:

1. Confirma que tu organización de Datadog se encuentre alojada en el [sitio de Datadog][1] US3 o [crea una cuenta de prueba de Datadog en el sitio US3][5].
2. Crea un recurso de Datadog en Azure que vincule al menos una suscripción.
3. De manera opcional, actualiza el recurso de Datadog para incluir otras suscripciones.

Como [ISV externo][6], hay un proceso adicional e independiente para solicitar y usar este acceso:

1. Datadog se autentica en Azure y usa un servicio privado de Azure para solicitar el token de cliente asociado con el recurso de Datadog determinado.
1. Este servicio de Azure verifica la identidad de Datadog y garantiza que el recurso de Datadog solicitado exista y se encuentre habilitado.
1. Azure devuelve un token de cliente de corta duración a Datadog. Este token permite el mismo nivel de acceso otorgado a la identidad gestionada del sistema asociado.
1. Datadog usa este token de cliente para consultar datos en el entorno monitorizado hasta que se acerca su fecha de vencimiento, momento en el que se repite el proceso.

En el siguiente diagrama se describen el proceso y la arquitectura resultante de la configuración de la integración nativa de Azure.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_integration_setup.png" alt="Diagrama de la configuración de la integración nativa de Azure" >}}

Una vez que esto se complete, la recopilación de datos comienza de manera automática. Datadog descubre y recopila métricas de tu entorno de Azure de manera continua, como se muestra en la siguiente imagen.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_metric_collection.png" alt="Diagrama de la configuración de la recopilación de métricas nativas de Azure" >}}

### Opciones de configuración alternativas para la recopilación de métricas

Independientemente de si usas la integración estándar o la nativa de Azure, Datadog recomienda encarecidamente usar la configuración predeterminada. Esto se debe a que la integración se mejora de manera continua para proporcionar información nueva y diferenciada, así como un mejor rendimiento y fiabilidad de la recopilación de datos. Estas mejoras pueden verse inhibidas por configuraciones más restrictivas para la recopilación de métricas.

#### Opciones para restringir el acceso

En las siguientes secciones se detallan las opciones para restringir el acceso y sus implicaciones.

##### 1. Asignación de acceso por debajo del nivel de suscripción

Puedes asignar acceso a Datadog por debajo del nivel de suscripción:

  - Por grupo de recursos   
  - Por recurso individual

**Nota**: Este acceso se gestiona a través del **registro de aplicaciones** para la integración estándar de Azure y a través de la **identidad gestiona del sistema** asociada con el recurso de Datadog para la integración nativa de Azure.

Si actualizas el contexto del acceso por debajo del nivel de suscripción, Datadog aún podrá descubrir recursos y sus métricas disponibles, e ingerirlos de manera dinámica en el contexto determinado.

Restringir el acceso de Datadog por debajo del nivel de suscripción provoca lo siguiente:

  - Inhibe la capacidad de agrupar llamadas de métricas, lo que genera demoras que van más allá de los típicos uno o dos minutos antes de que se completen en Datadog. La restricción por recurso individual tiene un mayor impacto que la restricción por grupo de recursos. La demora real depende en gran medida del tamaño, la composición y la distribución de tu entorno de Azure; es posible que no haya un efecto perceptible en algunos casos o una latencia de hasta 45 minutos en otros.
  - Aumenta las llamadas a la API de Azure, lo que puede generar costes más altos en Azure.
  - Limita el descubrimiento automático de recursos.
  - Requiere la actualización manual del contexto de asignación de roles para cualquier recurso, grupo de recursos o suscripción nuevos que se deban monitorizar.

##### 2. Asignación de roles más restrictivos que el del lector de monitorización

El rol de **lector de monitorización** brinda un amplio acceso para monitorizar recursos y datos a nivel de suscripción. Este acceso de solo lectura permite que Datadog proporcione la mejor experiencia de usuario tanto para las funciones existentes como para las capacidades nuevas. Los roles de Azure AD permiten la extensión de este acceso a los recursos de Azure AD a nivel de inquilino.

Las implicaciones de restringir el acceso por debajo del rol de lector de monitorización son:

  - Pérdida parcial o total de datos de monitorización
  - Pérdida parcial o total de metadatos en forma de etiquetas en las métricas de tus recursos
  - Pérdida parcial o total de los datos de [Cloud Security Misconfigurations][3] o del [Catálogo de recursos][4].
  - Pérdida parcial o total de las métricas que genera Datadog

Las implicaciones de restringir u omitir los roles de Azure AD son:

  - Pérdida parcial o total de los metadatos de los recursos de Azure AD en Cloud Security Misconfigurations
  - Pérdida parcial o total de la monitorización del vencimiento de credenciales para los recursos de Azure AD

[1]: /es/getting_started/site/
[2]: https://www.datadoghq.com/
[3]: /es/security/cloud_security_management/misconfigurations/
[4]: /es/infrastructure/resource_catalog/
[5]: https://us3.datadoghq.com/signup
[6]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{% /site-region %}}

## Recopilación de logs de Azure

{{% site-region region="us,us5,eu,gov,ap1,ap2" %}}

### Recopilación de logs de la integración estándar de Azure
_Disponible en todos los sitios de Datadog_

En el siguiente diagrama se proporciona una arquitectura de referencia para reenviar logs de Azure a Datadog, como se describe en la [sección de recopilación de logs][1] de la página de la integración de Azure.

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Diagrama de la configuración del reenvío manual de logs" >}}

### Opciones de configuración alternativas para el reenvío de logs con la integración estándar de Azure

La arquitectura predeterminada anterior es adecuada para la mayoría de los usuarios. Según la escala y la composición de tu entorno de Azure, así como los métodos que use tu organización para implementar esta arquitectura, en las siguientes secciones se detallan consideraciones adicionales que pueden ser relevantes.

#### Uso de las plantillas proporcionadas

El botón de **Desplegar en Azure** en la [sección principal de la recopilación de logs][1] de Azure proporciona una plantilla para crear un par de funciones de reenvío y centro de eventos. Además de usar esta plantilla a fin de desplegar de manera directa, puedes usar las plantillas de ARM subyacentes como punto de partida para tus propios despliegues de infraestructura como código.

Estas plantillas no añaden configuraciones de diagnóstico, excepto una configuración de diagnóstico opcional para los logs de actividad. En el caso de los logs de recursos, Datadog recomienda usar plantillas de ARM o Terraform para añadir configuraciones de diagnóstico a tus recursos de manera programática. Estas configuraciones de diagnóstico se deben añadir a cada recurso que necesite enviar logs de recursos a Datadog.

#### Consideraciones sobre la región

Las configuraciones de diagnóstico solo pueden enviar logs de recursos a los centros de eventos de la misma región que el recurso. Añade un par de funciones de reenvío y centro de eventos en cada región que contenga recursos para los que quieras enviar logs de recursos a Datadog.

Sin embargo, las configuraciones de diagnóstico no se limitan a enviar logs a los centros de eventos en la misma suscripción que el recurso. Si tienes varias suscripciones en tu inquilino de Azure, este puede compartir una única función de reenvío y centro de eventos de la misma región.

#### Consideraciones sobre logs de gran volumen

A medida que aumenta el volumen de logs, es posible que se produzcan cuellos de botella, que suelen surgir en los centros de eventos. Si planeas enviar grandes volúmenes de logs, puedes considerar añadir particiones adicionales o usar un nivel premium o dedicado.
Para volúmenes de logs especialmente altos, puedes considerar añadir pares de funciones de reenvío y centro de datos adicionales de la misma región y dividir el tráfico entre ellos.

[1]: /es/integrations/azure/#log-collection
{{% /site-region %}}
{{% site-region region="us3" %}}

### Recopilación de logs de la integración nativa de Azure
_Solo disponible en el sitio US3 de Datadog_

En el siguiente diagrama se describen el proceso y la arquitectura resultante de la configuración de reenvío de logs de la integración nativa de Azure.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_log_forwarding.png" alt="Diagrama de la configuración del reenvío de logs nativos de Azure" >}}

Con la integración nativa de Azure, no es necesario configurar nada fuera del recurso de Datadog para implementar el reenvío de logs de actividad o recursos de Azure a Datadog. Las configuraciones de diagnóstico se añaden o eliminan de manera automática para que coincidan con tu configuración usando solo las reglas de etiquetas especificadas en el recurso de Datadog.

**Nota**: Puedes habilitar los logs de recursos sin ningún filtro para enviar todos los logs de recursos, como se muestra a continuación.

{{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_metrics_and_logs.png" alt="Diagrama de la compilación del Datadog Agent" >}}

Las configuraciones de diagnóstico que ha creado el recurso de Datadog incluyen todas las categorías de log, se configuran con la `Send to Partner Solution` (Solución de enviar a socio) y envían logs al recurso de Datadog de origen. Siguen el formato de nombres `DATADOG_DS_V2_<UNIQUE_IDENTIFIER>`.

Cualquier cambio manual en el recurso, incluida su eliminación, se revierte en unos pocos minutos.

A continuación encontrarás un ejemplo de una configuración de diagnóstico que ha creado un recurso de Datadog:

{{< img src="integrations/guide/azure_architecture_and_configuration/diagnostic_setting.png" alt="Diagrama de la configuración de diagnóstico" >}}

### Opciones de configuración alternativas para el reenvío de logs con la integración nativa de Azure

Los botones de un solo clic para habilitar logs en el recurso de Datadog automatizan el proceso de añadir configuraciones de diagnóstico. En algunos casos, es posible que las organizaciones quieran gestionar y configurar las configuraciones de diagnóstico por su cuenta, mientras siguen aprovechando la capacidad de reenvío automático de logs con la integración nativa de Azure. 

Las configuraciones de diagnóstico que se crean de manera manual no se ven afectadas por las configuraciones de log en el recurso de Datadog y no se eliminan según las reglas de etiqueta especificadas en dicho recurso. No es necesario que se encuentren habilitados los logs de recursos en el recurso de Datadog para que funcione el reenvío manual de logs. Sin embargo, el recurso de Datadog que se usa para el reenvío de logs no debe estar en estado deshabilitado.

Las razones para gestionar de manera manual la configuración de diagnóstico incluyen:

  1. Políticas de infraestructura como código
       Políticas internas estrictas en torno a la IaC que requieren que todos los recursos se creen y gestionen de manera determinista (por ejemplo, si la creación automática de configuraciones de diagnóstico por parte del recurso de Datadog causara un conflicto sin solución entre el estado deseado y el real).

  2. Limitación de las categorías de logs de recursos
       Como las configuraciones de diagnóstico creadas de manera automática por el recurso de Datadog incluyen todas las categorías de logs, para especificar un subconjunto de estas categorías es necesario que crees por tu cuenta las configuraciones de diagnóstico.  
       **Nota**: También puedes usar [filtros de exclusión][1] para excluir estos logs de la indexación al incorporarlos en Datadog.

  3. Reenvío de logs entre suscripciones
       El reenvío de logs entre suscripciones es útil para enviar logs y ningún otro dato de una suscripción específica. Para habilitar el reenvío de logs entre suscripciones, registra el proveedor de recursos `Microsoft.Datadog` en cada suscripción destinada a enviar logs antes de crear la configuración de diagnóstico. El recurso de Datadog usado para el reenvío de logs aún recopila métricas y datos de su propia suscripción y de cualquier suscripción configurada a través de la hoja de recursos monitorizados.

       {{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_resource_providers.png" alt="Captura de pantalla de la página de proveedores de recursos en Azure Portal con Microsoft.Datadog que muestra el estado de registrado." >}}

  4. Tests 
       El envío de logs de ejemplo a Datadog puede resultar útil para realizar tests u otras investigaciones. En estos casos, añadir configuraciones de diagnóstico de manera manual puede ser más rápido que esperar a que se creen de manera automática a partir de etiquetas y configuraciones actualizadas.

Esta arquitectura se muestra a continuación, incluida la configuración entre suscripciones opcional:

{{< img src="integrations/guide/azure_architecture_and_configuration/custom_azure_native_log_forwarding.png" alt="Diagrama de la configuración personalizada del reenvío de logs nativos de Azure" >}}

[1]: /es/logs/log_configuration/indexes/#exclusion-filters
{{% /site-region %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/