---
description: Definir un conjunto de datos restringido para el control de acceso
further_reading:
- link: /data_security/
  tag: documentation
  text: Reducir los riesgos que amenazan los datos
is_public: true
title: Control de acceso a los datos
---
{{< callout url="https://www.datadoghq.com/product-preview/" header="Únete a la Vista previa">}}
El Control de acceso a los datos está en Vista previa
{{< /callout >}}

## Información general

Tus datos en Datadog pueden contener datos confidenciales y deben manejarse con cuidado. Si estás ingiriendo datos confidenciales en Datadog, el Control de acceso a los datos permite a los administradores y gestores de acceso de una organización Datadog regular el acceso a estos datos. Utiliza el Control de acceso a los datos para identificar datos confidenciales con una consulta y restringir el acceso sólo a [Equipos][1] o [Roles][2] específicos.

Cuando se define un _Conjunto de datos restringido_, cualquier dato dentro de los límites de ese conjunto de datos queda restringido. Los datos fuera de cualquier conjunto de datos restringido permanecen sin restricciones y accesibles a los usuarios con los permisos apropiados. El control de acceso a los datos proporciona una interfaz intuitiva que permite a los gestores de acceso conceder únicamente a los usuarios autorizados acceso a los datos confidenciales incluidos en los conjuntos de datos.

## {{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Descubra cómo Datadog Sintético Monitorización es una solución proactiva Monitorización que le permite crear pruebas de API, navegador y móvil sin código para simular automáticamente los flujos y las solicitudes de los usuarios a sus aplicaciones, puntos finales clave y capas red.
{{< /learning-center-callout >}}

### Configurar controles de acceso

El Control de acceso a los datos se basa en la configuración del control del acceso existente de tu organización. Antes de configurar el Control de acceso a los datos, configura [controles de acceso][3].

### Etiquetar los datos entrantes

El Control de acceso a los datos se basa en etiquetas (tags) y atributos en tus datos, que pueden ser utilizados para definir un límite de acceso. Si no tienes etiquetas definidas, consulta [Empezando con etiquetas][4] antes de configurar el Control de acceso a los datos.

## Configurar el acceso a los datos

El Control de acceso a los datos permite crear un conjunto de datos restringido, especificando los datos a los que sólo pueden acceder los usuarios de los equipos o roles designados.

### Sitio de Datadog

Inicia sesión como usuario con el rol Admin Datadog o como cualquier usuario con un rol de tu organización con el [permiso `user_access_manage`][5].

1. Ve a [Parámetros de la organización][6].
1. En la parte izquierda de la página, selecciona [Controles de acceso a los datos][7].
1. Haz clic en **New Restricted Dataset** (Nuevo conjunto de datos restringido).

Para crear un conjunto de datos restringido, identifica los datos que quieres restringir con una consulta.

{{< img src="/account_management/rbac/restricted_dataset.png" alt="Crea un diálogo de conjunto de datos restringido. Selecciona datos en RUM, APM, logs y métricas coincidentes con la etiqueta service:hr. Concede acceso al equipo con acceso privilegiado.">}}

Nombra el conjunto de datos
: Ponle un nombre descriptivo para ayudar a los usuarios a saber qué datos contiene el conjunto de datos.

Selecciona los datos que se incluirán en este conjunto de datos
: Define los límites que describen qué datos restringir a un conjunto específico de usuarios. Los límites son sentencias de consulta con limitaciones que permiten a un gestor de acceso definir el contexto de datos sensibles que deben protegerse. Los tipos de telemetría admitidos son métricas personalizadas, RUM, trazas (traces) de APM, logs y pipelines de CI Visibility.

Concede acceso
: Seleccione uno o varios equipos o roles que pueden acceder al contenido del conjunto de datos restringido. Los usuarios que no pertenezcan a estos grupos no podrán acceder a estos datos.

Puedes crear un máximo de 10 pares clave:valor por conjunto de datos restringido. Considera la posibilidad de definir un conjunto de datos restringido adicional si necesitas más pares.

Tras rellenar todos los campos para definir el conjunto de datos, haz clic en **Create Restricted Dataset** (Crear conjunto de datos restringido) para aplicarlo a tu organización.

Puedes crear un máximo de 100 conjuntos de datos restringidos. Si necesitas un límite superior, ponte en contacto con el servicio de asistencia.

### API
La API de control de acceso a los datos está en fase de desarrollo y debe considerarse inestable. Las versiones futuras pueden ser incompatibles con versiones anteriores. 

La compatibilidad con Terraform se anunciará una vez que el Control de acceso a los datos esté disponible de forma general.

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
    * Equipos o roles de los usuarios que pueden ver estos datos RUM

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

El Control de acceso a los datos permite conceder acceso a los usuarios a través de roles o equipos de Datadog. A la hora de conceder acceso, ten en cuenta la configuración del control de acceso existente y la estrategia de acceso. Si estás siguiendo un enfoque basado en el servicio y ya estás [personalizando el Catálogo de servicios][9], aprovecha el modelo de propiedad del servicio utilizando Equipos como parte de tu configuración del Control de acceso a los datos.

**Nota:** Los equipos utilizados para el Control de acceso a los datos deben configurarse de tal manera que la adición o eliminación de usuarios sólo pueda ser realizada por los miembros del equipo o por un administrador, no por `Anyone in the organization`.

## Cumplimiento del acceso

Los usuarios de una organización Datadog con el Control de acceso a los datos activado sólo pueden ver los resultados de las consultas de los datos a los que tienen acceso, como en un dashboard, un explorador o a través de la API. Un conjunto de datos restringido elimina el acceso a los datos definidos en el conjunto de datos restringido para los usuarios que no tienen permiso, en todas las experiencias y puntos de entrada de Datadog.

### Exploradores de datos

Cuando se explora Datadog con las restricciones activadas, los usuarios sin permisos pueden seguir explorando las listas de nombres de recursos (aplicaciones o métricas), pero no pueden ver los resultados de las consultas, las principales etiquetas o los detalles de las facetas restringidas por conjuntos de datos. Por ejemplo, la consulta de una métrica con datos restringidos devuelve un gráfico en blanco, lo que hace que parezca que la consulta no coincide con ningún dato.

### Dashboards y notebooks

De forma similar a la exploración de datos en un explorador de datos como el Explorador RUM o el Explorador de métricas, la visualización de datos en dashboards en una organización que tiene habilitados los conjuntos de datos restringidos sólo muestra los datos a los que el usuario puede acceder. Dado que los dashboards son objetos compartidos a los que pueden acceder otras personas, es posible que dos usuarios que tengan accesos diferentes vean el mismo dashboard o notebook al mismo tiempo pero con datos diferentes.

### API

Cuando se consultan datos a través de las API Datadog con restricciones activadas, los usuarios sin permisos **no** ven los resultados de las consultas que han sido restringidas por los conjuntos de datos restringidos.

## {{< img src="synthetics/browser_test.mp4" alt="Browser tests" video=true style="width:100%;">}}

Grabar pruebas de aplicaciones móviles

[1]: /es/account_management/teams/
[2]: /es/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /es/account_management/rbac/
[4]: /es/getting_started/tagging/
[5]: /es/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /es/data_security/
[9]: /es/service_catalog/customize/