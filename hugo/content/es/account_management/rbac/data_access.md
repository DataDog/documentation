---
description: Definir un conjunto de datos restringido para el control de acceso
further_reading:
- link: /data_security/
  tag: Documentación
  text: Reducir los riesgos que amenazan los datos
is_public: true
title: Control de acceso a los datos
---

## Información general

Tus datos en Datadog pueden contener datos confidenciales y deben manejarse con cuidado. Si estás ingiriendo datos confidenciales en Datadog, el Control de acceso a los datos permite a los administradores y gestores de acceso de una organización Datadog regular el acceso a estos datos. Utiliza el Control de acceso a los datos para identificar datos confidenciales con una consulta y restringir el acceso sólo a [Equipos][1] o [Roles][2] específicos.

Cuando se define un _Conjunto de datos restringido_, cualquier dato dentro de los límites de ese conjunto de datos queda restringido. Los datos fuera de cualquier conjunto de datos restringido permanecen sin restricciones y accesibles a los usuarios con los permisos apropiados. El control de acceso a los datos proporciona una interfaz intuitiva que permite a los gestores de acceso conceder únicamente a los usuarios autorizados acceso a los datos confidenciales incluidos en los conjuntos de datos.

## Requisitos previos

### Configurar controles de acceso

El Control de acceso a los datos se basa en la configuración del control del acceso existente de tu organización. Antes de configurar el Control de acceso a los datos, configura [controles de acceso][3].

### Etiquetar los datos entrantes

El Control de acceso a los datos se basa en etiquetas (tags) y atributos en tus datos, que pueden ser utilizados para definir un límite de acceso. Si no tienes etiquetas definidas, consulta [Empezando con etiquetas][4] antes de configurar el Control de acceso a los datos.

## Configurar el acceso a los datos

El Control de acceso a los datos permite crear un conjunto de datos restringido, especificando los datos a los que sólo pueden acceder los usuarios de los equipos o roles designados.

Para ver todos tus conjuntos de datos restringidos, ve a [Organization Settings][6] (Configuración de la organización) y selecciona [Data Access Controls][7] (Controles de acceso a datos) a la izquierda, bajo el título **Access** (Acceso).

### Sitio Datadog

Inicia sesión como usuario con el rol Admin Datadog o como cualquier usuario con un rol de tu organización con el [permiso `user_access_manage`][5].

1. Ve a [Parámetros de la organización][6].
1. En la parte izquierda de la página, selecciona [Controles de acceso a los datos][7].
1. Haz clic en **New Restricted Dataset** (Nuevo conjunto de datos restringido).

Para crear un conjunto de datos restringido, identifica los datos que quieres restringir con una consulta.

{{< img src="/account_management/rbac/restricted_dataset-2.png" alt="Crea un cuadro de diálogo de Conjunto de datos restingidos. Selecciona datos de RUM, APM, logs y métricas que coincidan con la etiqueta service:hr. Concede acceso a un equipo de Acceso privilegiado.">}}

Nombre del conjunto de datos
: un nombre descriptivo para ayudar a los usuarios a entender qué datos contiene el conjunto de datos.

Selecciona los datos que se incluirán en este conjunto de datos
: la definición de límites que describe qué datos restringir a un conjunto específico de usuarios. Los límites son declaraciones de consulta con limitaciones que permiten a un gestor de acceso definir el alcance de los datos confidenciales que deben protegerse. Los [tipos de telemetría compatibles][10] son métricas personalizadas, sesiones de RUM, trazas de APM, logs, costes de la nube, problemas de Error Tracking e información del repositorio de Software Delivery (pipelines de CI Visibility).

Concede acceso
: Seleccione uno o varios equipos o roles que pueden acceder al contenido del conjunto de datos restringido. Los usuarios que no pertenezcan a estos grupos no podrán acceder a estos datos.

Puedes crear un máximo de 10 pares clave:valor por conjunto de datos restringido. Considera la posibilidad de definir un conjunto de datos restringido adicional si necesitas más pares.

Tras rellenar todos los campos para definir el conjunto de datos, haz clic en **Create Restricted Dataset** (Crear conjunto de datos restringido) para aplicarlo a tu organización.

Puedes crear un máximo de 100 conjuntos de datos restringidos en el plan Enterprise, y un máximo de 10 conjuntos de datos en otros planes. Si necesitas un límite superior, ponte en contacto con el servicio de asistencia.

### Tipos de telemetría compatibles {#supported-telemetry}

- Trazas de APM
- Logs
- Sesiones RUM

Si lo deseas, puedes solicitar una vista previa de lo siguiente:
- Costes de la nube
- Métricas personalizadas
    - **Nota:** No se admiten las métricas estándar y OpenTelemetry (OpenTelemetry)
- Problemas de seguimiento de errores
- LLM Observability
- Información sobre el repositorio de Software Delivery (en pipelines de CI Visibility)

## Restricciones de uso

Después de activar el Control de acceso a datos, Datadog desactiva o limita otras funciones para controlar el acceso a datos confidenciales. Consulta la lista de funciones afectadas a continuación para ver cómo se restringen.

### Real User Monitoring (RUM)

#### Session Replay: retención ampliada
Por defecto, los datos de Session Replay se conservan durante 30 días. Para ampliar la retención a 15 meses, puedes activar la Retención ampliada en las repeticiones de sesiones individuales. Al crear un conjunto de datos restringido para RUM, Datadog desactiva la opción de Retención ampliada. 

#### Session Replay: listas de reproducción

Las listas de reproducción son colecciones de Session Replays que se pueden agregar en una estructura similar a una carpeta. Al crear un conjunto de datos restringido para RUM, Datadog desactiva las listas de reproducción de Session Replay.

### Logs
El Control de acceso a datos es independiente de la función existente [Permisos RBAC de logs][11], también conocida como consultas de restricción de logs. Datadog recomienda utilizar una única solución para restringir los datos de los logs. Si limitas el acceso de los usuarios utilizando tanto el Control de acceso a datos como las consultas de restricción de logs, se aplicarán ambos conjuntos de restricciones.

### Monitores
Los usuarios pueden crear monitores que consulten y alerten sobre la telemetría activa. Mientras que el usuario solo puede consultar directamente los datos a los que está autorizado a acceder, el monitor funciona como un usuario del sistema con pleno acceso a los datos.

Si te preocupa el acceso no autorizado a datos a través de monitores, Datadog te recomienda que realices un seguimiento de los monitores que crean tus usuarios. A continuación, restringe el acceso a la creación de monitores que lean datos confidenciales.

### Información sobre el repositorio de Software Delivery (pipelines de CI Visibility)

* **Telemetría compatible**: solo los pipelines de CI Visibility son compatibles. No se admiten los tests de Test Optimizations.
* **Logs de CI**: los logs de CI se almacenan en el producto de Log Management. Para restringir el acceso a los logs de CI, crea un conjunto de datos de logs.
* **Etiquetas de conjuntos de datos compatibles**: solo se admiten las siguientes etiquetas:
  * `@git.repository_url`
  * `@git.repository.id`
  * `@gitlab.groups`


## Seleccione etiquetas para el acceso

Cada conjunto de datos restringido puede controlar el acceso a varios tipos de datos, como métricas. Puedes utilizar la mismo o diferentes etiquetas para varios tipos de telemetría. Dentro de cada tipo de telemetría, debes utilizar una _única_ etiqueta o atributo para definir tu estrategia de acceso.

Si tienes demasiadas combinaciones de etiquetas o atributos, para ajustarte a estas restricciones considera [revisar tu etiquetado][4] para definir una nueva etiqueta que refleje mejor tu estrategia de acceso.

### Ejemplo compatible

#### Conjunto de datos restringido 1
- Tipo de telemetría: RUM
   - Filtros: `@application.id:ABCD`

#### Conjunto de datos restringido 2
* Tipo de telemetría: RUM
    * Filtros: `@application.id:EFGH`
* Tipo de telemetría: Métricas
    * Filtros: `env:prod`

### Ejemplo no compatible

#### Conjunto de datos restringido 1:
* Tipo de telemetría: RUM
    * Filtros: `@application.id:ABCD`

#### Conjunto de datos restringido 2:
* Tipo de telemetría: RUM
    * Filtros: `env:prod`

El conjunto de datos restringido 1 utiliza `@application.id` como etiqueta para los datos de RUM, por lo que un nuevo conjunto de datos restringido no puede cambiar a una etiqueta diferente. En su lugar, considera la posibilidad de reconfigurar el conjunto de datos restringido 2 para que utilice `@application.id` o de cambiar todos tus conjuntos de datos restringidos con datos de RUM para que utilicen otra etiqueta.

### Ejemplo no compatible

#### Conjunto de datos restringido 1:
* Tipo de telemetría: RUM
    * Filtros: `@application.id:ABCD`

#### Conjunto de datos restringido 2:
* Tipo de telemetría: RUM
    * Filtros: `@application.id:IJKL` `env:prod`

Este ejemplo utiliza correctamente la etiqueta `@application.id` para RUM, como se hizo para el Conjunto de datos restringido 1. Sin embargo, el límite es una etiqueta por tipo de telemetría. En su lugar, considere la posibilidad de crear un conjunto de datos restringido con  `application.id` o `env`, o identifica una etiqueta diferente que combine mejor estos atributos.

## Prácticas recomendadas

### Estrategia de acceso

Antes de configurar el Control de acceso a los datos, es importante que evalúes tu estrategia de acceso. Considera la posibilidad de revisar [Reducir los riesgos relacionados con los datos][8] al evaluar tu estrategia de acceso. Eliminar o reducir los datos innecesarios o confidenciales antes de que lleguen a Datadog reduce la necesidad de configuración de accesos adicionales.

#### Protección de datos confidenciales conocidos

Si ya has identificado qué datos deben protegerse, puedes crear tu configuración del Control de acceso a los datos en torno a estos datos específicos. Esto garantiza que los datos no confidenciales estén disponibles para los usuarios en general, lo que les permite colaborar y comprender los problemas o incidentes en curso.

Por ejemplo, si tienes una sola aplicación que está instrumentada con Real User Monitoring (RUM) y capturas entradas confidenciales de los usuarios, considera la posibilidad de crear un conjunto de datos restringido sólo para esa aplicación:
* **Nombre del conjunto de datos:** Datos RUM restringidos
* **Selecciona los datos que se incluirán en este conjunto de datos:**
    * Tipo de telemetría: RUM
        * Filtros: `@application.id:<rum-app-id>`
* **Acceso concedido:**
    * Equipos o roles de los usuarios que pueden ver estos datos de RUM

Este ejemplo de configuración protegería los datos de RUM de esta aplicación y mantendría otros datos de esta aplicación disponibles para los usuarios existentes en tu organización.

#### Proteger todos los datos de un servicio

Por el contrario, si lo que buscas es proteger los datos de un servicio específico, puedes crear tu configuración del Control de acceso a los datos en torno a la etiqueta `service:`.

Por ejemplo, si tienes un servicio `NewService` que está instrumentado con Real User Monitoring (RUM) y capturas entradas confidenciales de los usuarios, considera la posibilidad de crear un conjunto de datos restringido sólo para esa aplicación:

* **Nombre del conjunto de datos:** Datos restringidos del NuevoServicio
* **Selecciona los datos que se incluirán en este conjunto de datos:**
    * Tipo de telemetría: RUM
        * Filtros: `@service:NewService`
    * Tipo de telemetría: Métricas
        * Filtros: `@service:NewService`
    * Tipo de telemetría: APM
        * Filtros: `@service:NewService`
    * Tipo de telemetría: Logs
        * Filtros: `@service:NewService`
* **Acceso concedido:**
    * Equipo propietario del servicio

Este ejemplo de configuración protege todos los datos compatibles de `NewService`.

### Equipos y roles

El Control de acceso de datos admite la concesión de acceso a los usuarios a través de roles o equipos de Datadog. Al conceder el acceso, ten en cuenta tu configuración de control de acceso existente y la estrategia de acceso. Si estás siguiendo un enfoque basado en servicios y ya estás [personalizando el Software Catalog][9], aprovecha el modelo de propiedad de servicios utilizando Teams como parte de tu configuración de Control de acceso a datos.

**Nota:** Los equipos utilizados para el Control de acceso a los datos deben configurarse de tal manera que la adición o eliminación de usuarios sólo pueda ser realizada por los miembros del equipo o por un administrador, no por `Anyone in the organization`.

## Cumplimiento del acceso

Los usuarios de una organización Datadog con el Control de acceso a los datos activado sólo pueden ver los resultados de las consultas de los datos a los que tienen acceso, como en un dashboard, un explorador o a través de la API. Un conjunto de datos restringido elimina el acceso a los datos definidos en el conjunto de datos restringido para los usuarios que no tienen permiso, en todas las experiencias y puntos de entrada de Datadog.

### Exploradores de datos

Cuando se explora Datadog con las restricciones activadas, los usuarios sin permisos pueden seguir explorando las listas de nombres de recursos (aplicaciones o métricas), pero no pueden ver los resultados de las consultas, las principales etiquetas o los detalles de las facetas restringidas por conjuntos de datos. Por ejemplo, la consulta de una métrica con datos restringidos devuelve un gráfico en blanco, lo que hace que parezca que la consulta no coincide con ningún dato.

### Dashboards y notebooks

De forma similar a la exploración de datos en un explorador de datos como el Explorador RUM o el Explorador de métricas, la visualización de datos en dashboards en una organización que tiene habilitados los conjuntos de datos restringidos sólo muestra los datos a los que el usuario puede acceder. Dado que los dashboards son objetos compartidos a los que pueden acceder otras personas, es posible que dos usuarios que tengan accesos diferentes vean el mismo dashboard o notebook al mismo tiempo pero con datos diferentes.

**Nota**: Los visores de [Dashboards compartidos][12] ven todos los datos de telemetría mostrados en el dashboard de acuerdo con los permisos del creador. Revisa el contenido de tu dashboard antes de compartirlo para asegurarte de que no se exponen datos sensibles o confidenciales.

### API

Cuando se consultan datos a través de las API Datadog con restricciones activadas, los usuarios sin permisos **no** ven los resultados de las consultas que han sido restringidas por los conjuntos de datos restringidos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/teams/
[2]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /es/account_management/rbac/
[4]: /es/getting_started/tagging/
[5]: /es/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /es/data_security/
[9]: /es/software_catalog/customize/
[10]: /es/account_management/rbac/data_access/#supported-telemetry
[11]: /es/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /es/dashboards/sharing/shared_dashboards/