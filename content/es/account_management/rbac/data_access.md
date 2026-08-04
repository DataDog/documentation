---
description: Defina un conjunto de datos restringido para Access Control
further_reading:
- link: /data_security/
  tag: Documentación
  text: Reducción de los riesgos relacionados con los datos
is_public: true
title: Data Access Control
---
## Descripción general {#overview}

Sus datos en Datadog pueden contener datos confidenciales y deben manejarse con cuidado. Si está ingiriendo datos confidenciales en Datadog, el Data Access Control permite a los administradores y gestores de acceso dentro de una organización de Datadog regular el acceso a estos datos. Utilice el Data Access Control para identificar datos confidenciales con una consulta y restringir el acceso solo a [Teams][1] o [roles][2] específicos.

Cuando define un _conjunto de datos restringido_, cualquier dato dentro del límite de ese conjunto de datos queda restringido. Los datos fuera de cualquier conjunto de datos restringido permanecen sin restricciones y accesibles para los usuarios con los permisos adecuados. Data Access Control proporciona una interfaz intuitiva que permite a los administradores de acceso otorgar acceso a datos confidenciales incluidos en los conjuntos de datos solo a los usuarios permitidos.

## Requisitos previos {#prerequisites}

### Configurar controles de acceso {#configure-access-controls}

Data Access Control se basa en la configuración de Access Control de Datadog existente en su organización. Configure los [Access Controls][3] antes de configurar Data Access Control.

### Etiquetar datos entrantes {#tag-incoming-data}

El Data Access Control depende de las etiquetas y los atributos de sus datos que se pueden utilizar para definir un límite de acceso. Si no tiene etiquetas definidas, considere [comenzar con las etiquetas][4] antes de configurar el Data Access Control.

## Configurar el acceso a los datos {#configure-data-access}

El Data Access Control le permite crear un conjunto de datos restringido, especificando los datos a los que solo pueden acceder los usuarios de los equipos o roles designados.

Para ver todos sus Conjuntos de datos restringidos, navegue a [Organization Settings][6] y seleccione [Data Access Controls][7] a la izquierda, bajo el encabezado {{< ui >}}Access{{< /ui >}}.

### Sitio de Datadog {#datadog-site}

Inicie sesión como un usuario asignado al rol de Datadog Admin, o cualquier usuario con un rol en su organización con el permiso [`user_access_manage`][5].

1. Navegue a [Organization Settings][6].
1. En el lado izquierdo de la página, seleccione [Data Access Controls][7].
1. Haga clic en {{< ui >}}New Restricted Dataset{{< /ui >}}.

Para crear un Conjunto de datos restringido, identifique los datos que se restringirán con una consulta.

{{< img src="/account_management/rbac/restricted_dataset-3.png" alt="Cuadro de diálogo Crear conjunto de datos restringido. Selecciona datos en RUM, APM, Logs y Metrics que coincidan con la etiqueta service:hr. Otorga acceso a un equipo de acceso privilegiado.">}}

Nombre del conjunto de datos
: Un nombre descriptivo para ayudar a los usuarios a entender qué datos contiene el conjunto de datos.

Seleccione los datos que se incluirán en este conjunto de datos
: La definición de límite que describe qué datos restringir a un conjunto específico de usuarios. Los límites son declaraciones de consulta con limitaciones que permiten a un administrador de acceso definir el alcance de los datos confidenciales que se deben proteger. Los [tipos de telemetría admitidos][10] son métricas personalizadas, sesiones de RUM, trazas de APM, registros, costos en la nube, problemas de seguimiento de errores, información del repositorio de Software Delivery (pipelines de CI Visibility) y eventos del agente de Workload Protection.

Otorgar acceso
: Seleccione uno o más equipos o roles que puedan acceder al contenido vinculado en el Conjunto de datos restringido. Cualquier usuario que no sea miembro de estos grupos tiene bloqueado el acceso a estos datos.

**Nota:** Se puede vincular un máximo de 50 principales (roles o equipos) a un Conjunto de datos restringido determinado.

Puede crear un máximo de 10 pares clave:valor por conjunto de datos restringido. Considere definir un conjunto de datos restringido adicional si necesita pares adicionales.

Después de completar todos los campos para definir el conjunto de datos, haga clic en {{< ui >}}Create Restricted Dataset{{< /ui >}} para aplicarlo a su organización.

Puede crear un máximo de 100 conjuntos de datos restringidos bajo el plan Enterprise, y un máximo de 10 conjuntos de datos en otros casos. Los clientes Enterprise que utilizan [Modo estricto](#strict-mode) pueden crear hasta 1,000 conjuntos de datos restringidos.

### Tipos de telemetría admitidos {#supported-telemetry}

- Trazas de Agent Observability
- Trazas de APM
- Costos de la nube
- Problemas de Error Tracking
- Registros
- Sesiones de RUM
- Información del repositorio de Software Delivery (en pipelines de CI Visibility)
- Eventos del agente de Workload Protection

Los siguientes están disponibles como vista previa bajo solicitud:
- Métricas personalizadas
    - **Nota:** Las métricas estándar y de OpenTelemetry (OTel) no son compatibles

## Configuración avanzada {#advanced-configuration}

### Modo estricto {#strict-mode}

De forma predeterminada, el Data Access Control opera en _Modo estándar_, lo que significa que cualquier dato fuera de un conjunto de datos restringido permanece visible para los usuarios con los permisos adecuados. _El modo estricto_ invierte esto para un tipo de telemetría específico: una vez habilitado, los usuarios no ven datos para ese tipo de telemetría a menos que se les otorgue acceso explícitamente a través de un conjunto de datos restringido.

El modo estricto es útil para datos especialmente confidenciales, cuando:
- El etiquetado de telemetría es inconsistente, por lo que un límite de modo estándar corre el riesgo de dejar registros confidenciales sin cubrir.
- Se agregan nuevos valores de etiqueta con frecuencia y no puede garantizar que cada valor nuevo coincida con un conjunto de datos restringido existente.
- La postura de Compliance requiere una postura de denegación predeterminada para un tipo de telemetría.

El modo estricto se configura por tipo de telemetría. Un tipo de telemetría debe tener al menos un conjunto de datos restringido antes de que pueda cambiarse al modo estricto. Esto evita la pérdida involuntaria de acceso. Si todos los conjuntos de datos restringidos se eliminan posteriormente de un tipo de telemetría en modo estricto, solo los [grupos de usuarios sin restricciones](#unrestricted-user-groups) conservan el acceso hasta que se creen nuevos conjuntos de datos o se vuelva a cambiar el modo a estándar.

Los conjuntos de datos restringidos no se pueden compartir entre los modos estándar y estricto (cada conjunto de datos pertenece a un modo).

**Antes de habilitar el modo estricto**, verifique qué datos _no_ están ya en un conjunto de datos restringido para ese tipo de telemetría. Esos datos se ocultan una vez que se habilita el modo estricto. Revise los conjuntos de datos restringidos existentes en la página [Data Access Controls][7] para confirmar la cobertura.

Para cambiar el modo de restricción de un tipo de telemetría, navegue a [Data Access Controls][7]. Los usuarios deben tener el [`user_access_manage` permiso][5] para cambiar los modos de restricción.

### Grupos de usuarios sin restricciones {#unrestricted-user-groups}

Algunos usuarios, como los administradores con privilegios elevados o los equipos de observabilidad central con acceso a datos en toda la organización, necesitan una visibilidad completa de un tipo de telemetría independientemente de cualquier conjunto de datos restringido. En lugar de agregar a estos usuarios a cada conjunto de datos restringido individualmente, puede otorgar a su equipo o rol _acceso sin restricciones_ para un tipo de telemetría específico.

Un equipo o rol con acceso sin restricciones para un tipo de telemetría ve todos los datos de ese tipo de telemetría, independientemente de los límites del conjunto de datos restringido o del modo de restricción. El acceso sin restricciones se otorga a equipos o roles (no a usuarios individuales) y se configura por tipo de telemetría. Por ejemplo, un rol puede tener acceso sin restricciones a registros sin afectar el acceso a RUM.

Los Grupos de usuarios sin restricciones combinan especialmente bien con el Modo estricto porque permiten que los administradores designados sigan trabajando sin ser agregados a cada conjunto de datos.

**Nota:** Otros métodos de control de acceso (como [Consultas de restricción de Logs][11] y [Permisos][3]) siguen aplicándose a los usuarios en Grupos de usuarios sin restricciones.

## Restricciones de uso {#usage-constraints}

Después de activar el Data Access Control, Datadog deshabilita o limita otras funciones para controlar el acceso a datos confidenciales. Consulte la lista de funciones afectadas a continuación para ver cómo están restringidas.

### Real User Monitoring (RUM) {#real-user-monitoring-rum}

#### Session Replay: Retención extendida {#session-replay-extended-retention}
De forma predeterminada, los datos de Session Replay se conservan durante 30 días. Para extender la retención a 15 meses, puede habilitar la Retención extendida en reproducciones de sesión individuales. Cuando crea un conjunto de datos restringido para RUM, Datadog deshabilita la opción de Retención extendida.

#### Session Replay: Playlists {#session-replay-playlists}

Las listas de reproducción son colecciones de Session Replay que puede agregar en una estructura similar a una carpeta. Cuando crea un conjunto de datos restringido para RUM, Datadog deshabilita las Session Replay Playlists.

### Logs {#logs}
Data Access Control es independiente de la función existente de [permisos RBAC de Logs][11], también conocida como consultas de restricción de registros. Datadog recomienda usar una única solución para restringir los datos de registros. Si limita el acceso de los usuarios usando tanto Data Access Control como las consultas de restricción de registros, se aplican ambos conjuntos de restricciones.

### Monitors {#monitors}
Los usuarios pueden crear monitores que consulten y alerten sobre telemetría activa. Aunque el usuario solo puede consultar directamente los datos a los que tiene permiso de acceso, el monitor opera como un usuario del sistema con acceso total a los datos.

Si le preocupa el acceso no autorizado a los datos a través de monitores, Datadog recomienda que realice un seguimiento de los monitores que crean sus usuarios. Luego, restrinja el acceso a la creación de monitores que lean datos confidenciales.

### Información del repositorio de Entrega de software (CI Visibility pipelines) {#software-delivery-repository-info-ci-visibility-pipelines}

* **Telemetría admitida**: Solo se admiten los CI Visibility pipelines. No se admiten las pruebas de Test Optimization.
* **CI Logs**: CI Logs se almacenan en el producto de Log Management. Para restringir el acceso a CI Logs, cree un Logs dataset.
* **Etiquetas de conjunto de datos admitidas**: Solo se admiten las siguientes etiquetas:
  * `@git.repository_url`
  * `@git.repository.id`
  * `@git.repository.id_v2`
  * `@gitlab.groups`

### Agent Observability {#agent-observability}

* **Telemetría admitida**: Se admiten las trazas de Agent Observability. Los datos de eventos de experimentos (tramos y métricas de evaluación) para experimentos en un proyecto también están restringidos por `ml_app`conjuntos de datos restringidos con clave. Solo los datos de eventos están restringidos; las vistas de lista de experimentos y los metadatos no lo están. No se admiten conjuntos de datos, colas de anotación ni prompts gestionados.
* **OpenTelemetry**: Al usar [instrumentación de OpenTelemetry][13], algunos datos enviados a Agent Observability también pueden escribirse en trazas de APM, así como en métricas y monitores. Si está protegiendo datos confidenciales con un Conjunto de datos restringido en Agent Observability, considere también configurar Conjuntos de datos restringidos en APM, métricas o monitores con límites de datos coincidentes.


## Seleccione etiquetas para el acceso {#select-tags-for-access}

Cada conjunto de datos restringido puede controlar el acceso a múltiples tipos de datos, como métricas. Usted es libre de usar las mismas o diferentes etiquetas en múltiples tipos de telemetría. Dentro de cada tipo de telemetría, debe usar una _sola_ etiqueta o atributo para definir su estrategia de acceso.

Si tiene demasiadas combinaciones de etiquetas o atributos para ajustarse a estas restricciones, considere [revisar su etiquetado][4] para definir una nueva etiqueta que refleje mejor su estrategia de acceso.

### Ejemplo admitido {#supported-example}

#### Conjunto de datos restringido 1 {#restricted-dataset-1}
- Tipo de telemetría: RUM
   - Filtros: `@application.id:ABCD`

#### Conjunto de datos restringido 2 {#restricted-dataset-2}
* Tipo de telemetría: RUM
    * Filtros: `@application.id:EFGH`
* Tipo de telemetría: Custom Metrics
    * Filtros: `env:prod`

### Ejemplo no admitido {#not-supported-example}

#### Conjunto de datos restringido 1: {#restricted-dataset-1-1}
* Tipo de telemetría: RUM
    * Filtros: `@application.id:ABCD`

#### Conjunto de datos restringido 2: {#restricted-dataset-2-1}
* Tipo de telemetría: RUM
    * Filtros: `env:prod`

El Conjunto de datos restringido 1 utiliza `@application.id` como etiqueta para los datos RUM, por lo que un nuevo Conjunto de datos restringido no puede cambiar a una etiqueta diferente. En su lugar, considere reconfigurar el Conjunto de datos restringido 2 para usar `@application.id`, o cambiar todos sus Conjuntos de datos restringidos con datos RUM para usar otra etiqueta.

### Ejemplo no admitido {#not-supported-example-1}

#### Conjunto de datos restringido 1: {#restricted-dataset-1-2}
* Tipo de telemetría: RUM
    * Filtros: `@application.id:ABCD`

#### Conjunto de datos restringido 2: {#restricted-dataset-2-2}
* Tipo de telemetría: RUM
    * Filtros: `@application.id:IJKL` `env:prod`

Este ejemplo utiliza correctamente la etiqueta `@application.id` para RUM, tal como se hizo para el Conjunto de datos restringido 1. Sin embargo, el límite es una etiqueta por tipo de telemetría. En su lugar, considere crear un Conjunto de datos restringido con _ya sea_ `application.id` o `env`, o identifique una etiqueta diferente que combine mejor estos atributos.

## Mejores prácticas {#best-practices}

### Estrategia de acceso {#access-strategy}

Antes de configurar Data Access Control, es importante evaluar su estrategia de acceso. Considere revisar [Reducción de riesgos relacionados con los datos][8] mientras evalúa su estrategia de acceso. Eliminar o reducir los datos innecesarios o confidenciales antes de que lleguen a Datadog reduce la necesidad de una configuración de acceso adicional.

#### Protección de datos sensibles conocidos {#protecting-known-sensitive-data}

Si ya ha identificado qué datos deben protegerse, puede crear su configuración de Data Access Control en torno a estos datos específicos. Esto garantiza que los datos no sensibles estén generalmente disponibles para sus usuarios, permitiéndoles colaborar y comprender los problemas o incidentes en curso.

Por ejemplo, si tiene una sola aplicación que está instrumentada con Real User Monitoring (RUM) y captura entradas sensibles de los usuarios, considere crear un conjunto de datos restringido solo para esa aplicación:
* {{< ui >}}Name dataset:{{< /ui >}} Datos restringidos de RUM
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * Tipo de telemetría: RUM
        * Filtros: `@application.id:<rum-app-id>`
* {{< ui >}}Grant access:{{< /ui >}}
    * Equipos o roles de usuarios que pueden ver estos datos de RUM

Este ejemplo de configuración protegería los datos de RUM de esta aplicación y mantendría otros datos de esta aplicación disponibles para los usuarios existentes en su organización.

#### Protección de todos los datos de un servicio {#protecting-all-data-from-a-service}

Si en cambio busca proteger los datos de un servicio específico, puede crear su configuración de Data Access Control en torno a la etiqueta `service:`.

Por ejemplo, si tiene un servicio `NewService` que está instrumentado con Real User Monitoring (RUM) y captura entradas sensibles de los usuarios, considere crear un conjunto de datos restringido solo para esa aplicación:

* {{< ui >}}Name Dataset:{{< /ui >}} Datos restringidos de NewService
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * Tipo de telemetría: RUM
        * Filtros: `@service:NewService`
    * Telemetría type: Custom Metrics
        * Filtros: `@service:NewService`
    * Tipo de telemetría: APM
        * Filtros: `@service:NewService`
    * Tipo de telemetría: Logs
        * Filtros: `@service:NewService`
* {{< ui >}}Grant access:{{< /ui >}}
    * Equipo propietario del servicio

Este ejemplo de configuración protege todos los datos admitidos de `NewService`.

### Equipos y roles {#teams-and-roles}

Data Access Control permite otorgar acceso a los usuarios a través de roles o equipos de Datadog. Al otorgar acceso, considere su configuración de Data Access Control y su estrategia de acceso existentes. Si está siguiendo un enfoque basado en servicios y ya está [personalizando el Catálogo][9], aproveche el modelo de propiedad de servicios utilizando Teams como parte de su configuración de Data Access Control.

**Nota:** Los equipos utilizados para Data Access Control deben configurarse de tal manera que agregar o eliminar usuarios solo pueda ser realizado por miembros del equipo o un administrador, no por `Anyone in the organization`.

## Aplicación de acceso {#access-enforcement}

Los usuarios en una organización de Datadog con Data Access Control habilitado solo pueden ver los resultados de las consultas de los datos a los que tienen acceso, como en un Dashboard, en un Explorer o a través de la API. Un conjunto de datos restringido elimina el acceso a los datos definidos en el conjunto de datos restringido para los usuarios que no tienen permiso, en todas las experiencias y puntos de entrada de Datadog.

### Data explorers {#data-explorers}

Al explorar Datadog con restricciones habilitadas, los usuarios sin permisos aún pueden navegar por la lista de nombres de activos (aplicaciones o métricas), pero no pueden ver los resultados de las consultas, las etiquetas principales o los detalles de facetas restringidos por los conjuntos de datos. Por ejemplo, consultar una métrica con datos restringidos devuelve un gráfico en blanco, lo que hace que parezca que la consulta no coincide con ningún dato.

### Dashboards y Notebooks {#dashboards-and-notebooks}

De manera similar a la exploración de datos en un explorador de datos como el RUM Explorer o el Metrics Explorer, ver datos en dashboards en una organización que tiene conjuntos de datos restringidos habilitados solo muestra los datos a los que el usuario puede acceder. Dado que los Dashboards son objetos compartidos a los que otros pueden acceder, es posible que dos usuarios con diferentes permisos vean el mismo Dashboard o Notebooks al mismo tiempo y observen datos diferentes.

**Nota**: Los visores de [Dashboards compartidos][12] ven todos los datos de telemetría mostrados en el Dashboard de acuerdo con los permisos del creador. Revise el contenido de su Dashboard antes de compartirlo para asegurarse de que no se expongan datos confidenciales o sensibles.

### APIs {#apis}

Al consultar datos a través de las API de Datadog con las restricciones habilitadas, los usuarios sin permisos **no** ven los resultados de consulta que han sido restringidos por Restricted Datasets.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/teams/
[2]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /es/account_management/rbac/
[4]: /es/getting_started/tagging/
[5]: /es/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /es/data_security/
[9]: /es/internal_developer_portal/catalog/set_up/
[10]: /es/account_management/rbac/data_access/#supported-telemetry
[11]: /es/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /es/dashboards/sharing/shared_dashboards/
[13]: /es/llm_observability/instrumentation/otel_instrumentation/