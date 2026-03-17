---
aliases:
- /es/service_management/case_management/customization/
further_reading:
- link: /incident_response/case_management/
  tag: Documentación
  text: Información general de Case Management
- link: /incident_response/case_management/create_case
  tag: Documentación
  text: Crear un caso
- link: /incident_response/case_management/settings
  tag: Documentación
  text: Configuración
title: Personalización
---

## Información general

Datadog Case Management permite la personalización para adaptarse a los procesos, las necesidades de captura de datos y los requisitos de elaboración de informes específicos de tu equipo.

## Tipos personalizados de incidencia

<div class="alert alert-danger">
  Debes tener permisos de escritura de configuración compartida de incidencia <code>(cases_shared_settings_write</code>). Para obtener más información, consulta
  <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Permisos de rol de Datadog</a>.
</div>

Datadog proporciona cinco [tipos de incidencias incorporados][1], cada uno diseñado para procesos comunes. Para adaptar Case Management a las necesidades de tu equipo, puedes definir tus propios tipos personalizados de incidencia. Esto te permite:

* Alcance de la captura de datos personalizados a los tipos de trabajo pertinentes
* Automatización selectiva
* Análisis e informes más detallados

##### Crear un tipo de incidencia personalizado

1. Ve a [**Settings > Shared Settings > Case Types**][2] (Configuración > Configuración compartida > Tipos de casos).
2. Haz clic en **+ Create Case Type** (+ Crear tipo de incidencia).
3. Proporciona un **Name** (Nombre) y una **Description** (Descripción) opcional.
4. Guarda tu nuevo tipo de incidencia.
5. (Opcional) Consulta la sección [atributos personalizados](#custom-attributes) de esta página para añadir atributos personalizados.

##### Activar un tipo de incidencia personalizado

Después de crear un tipo de incidencia personalizado, debes asignarlo explícitamente a cada proyecto en el que deba estar disponible. Sigue los pasos que se indican a continuación para habilitar tu nuevo tipo de incidencia dentro de un proyecto de Case Management específico.

1. De vuelta en la [página **Settings** (Configuración)][2], localiza el proyecto de destino en **Starred Projects** (Proyectos iniciados) u **Other Projects** (Otros proyectos).
2. Despliega el menú del proyecto haciendo clic en el nombre del proyecto.
3. Haz clic en **General** para abrir el panel de configuración del proyecto.
4. Desplázate hasta la sección Case Types (Tipos de incidencia) en el panel de configuración.
5. En **From your organization** (De tu organización), abre el desplegable y selecciona el tipo de incidencia personalizado que has creado.

{{< img src="/service_management/case_management/customization/enable_custom_attribute.png" alt="Activar un tipo de incidencia personalizado en la configuración del proyecto" style="width:100%;" >}}

Una vez añadido el tipo de incidencia, estará disponible como opción al crear una nueva incidencia dentro de ese proyecto.

Tu nuevo tipo de incidencia está disponible para:

* Creación manual de casos
* Creación basada en API
* Creación automatizada de incidencias mediante Workflows

## Atributos personalizados

Los atributos personalizados te permiten capturar los datos estructurados que tu equipo necesita para trabajar con eficiencia y elaborar informes eficaces. Todos los tipos de incidencia, ya sean proporcionados por Datadog o personalizados, incluyen cinco atributos reservados que no se pueden eliminar ni modificar:

* Equipos
* Servicios
* Entornos
* Centros de datos
* Versiones

{{< img src="/service_management/case_management/customization/add_custom_attribute.png" alt="Añadir un atributo personalizado a un tipo de incidencia" style="width:100%;" >}}

Puedes añadir atributos que reflejen las necesidades específicas de tu equipo, como niveles de escalado, propietarios de componentes, impacto empresarial o enlaces externos. Para añadir un atributo personalizado:

1. Ve a [**Settings > Shared Settings > Case Types**][2] (Configuración > Configuración compartida > Tipos de casos).
2. Haz clic en el tipo de incidencia deseado.
3. Haz clic en **+ Add Attribute** (+ Añadir atributo).
4. Proporciona:
   * Nombre para mostrar (como "Región")
   * Clave (utilizada para el acceso programático y la elaboración de informes)
   * Descripción (contexto opcional para tu equipo)
   * Tipo de datos, elige entre:
     * Texto
     * URL
     * Número
   * Elige si deseas permitir múltiples valores para este atributo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/case_management/create_case#case-types
[2]: https://app.datadoghq.com/cases/settings?type=shared