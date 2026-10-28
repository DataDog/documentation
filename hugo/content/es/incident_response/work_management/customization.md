---
aliases:
- /es/service_management/case_management/customization/
- /es/incident_response/case_management/customization/
description: Personalice la gestión de trabajo de Datadog con tipos de trabajo, atributos
  y estados personalizados
further_reading:
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: Blog
  text: Cómo centralizamos y remediamos riesgos con Datadog Case Management
- link: /incident_response/work_management/
  tag: Documentación
  text: Descripción general de la gestión de trabajo
- link: /incident_response/work_management/create_work_item
  tag: Documentación
  text: Crear un elemento de trabajo
- link: /incident_response/work_management/settings
  tag: Documentación
  text: Configuración
title: Personalización
---
## Descripción general {#overview}

La gestión de trabajo de Datadog permite la personalización para alinearse con los flujos de trabajo únicos, las necesidades de captura de datos y los requisitos de informes de su equipo.

## Tipos de trabajo personalizados {#custom-work-types}

<div class="alert alert-danger">
  Debe tener permisos de escritura de configuración compartida de incidencia (<code>cases_shared_settings_write</code>) permisos. Para obtener más información, consulte
  <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Permisos de roles de Datadog</a>.
</div>

Datadog proporciona cinco [tipos de trabajo integrados][1], cada uno diseñado para flujos de trabajo comunes. Para personalizar la gestión de trabajo según las necesidades de su equipo, puede definir sus propios tipos de trabajo personalizados. Esto le permite:

* Configure el contexto de la captura de datos personalizados para los tipos de trabajo relevantes
* Habilite la automatización dirigida
* Realice análisis e informes más granulares

### Cree un tipo de trabajo personalizado {#create-a-custom-work-type}

1. Vaya a [**Configuración > Configuración compartida > Tipos de trabajo**][2].
2. Haga clic en **+ Crear tipo de trabajo**.
3. Proporcione un **Nombre** y una **Descripción** opcional.
4. Guarde su nuevo tipo de trabajo.
5. (Opcional) Consulte la [sección de atributos personalizados](#custom-attributes) de esta página para agregar atributos personalizados.

### Habilitar un tipo de trabajo personalizado {#enable-a-custom-work-type}

Después de crear un tipo de trabajo personalizado, debe asignarlo explícitamente a cada proyecto donde deba estar disponible. Siga los pasos a continuación para habilitar su nuevo tipo de trabajo dentro de un proyecto específico de Work Management.

1. De vuelta en la página de [**Configuración**][2], localice el proyecto de destino en **Proyectos destacados** o **Otros proyectos**.
2. Expanda el menú del proyecto haciendo clic en el nombre del proyecto.
3. Haga clic en **General** para abrir el panel de configuración del proyecto.
4. Desplácese hacia abajo hasta la sección **Tipos de trabajo** en el panel de configuración.
5. En **Desde su organización**, abra el menú desplegable y seleccione el tipo de trabajo personalizado que creó.

Después de agregar el tipo de trabajo, estará disponible como una opción al crear un nuevo elemento de trabajo dentro de ese proyecto.

Su nuevo tipo de trabajo está disponible para:

* Creación manual de elementos de trabajo
* Creación basada en API
* Creación automatizada de elementos de trabajo a través de flujos de trabajo

## Atributos personalizados {#custom-attributes}

Los atributos personalizados le permiten capturar los datos estructurados que su equipo necesita para trabajar de manera eficiente e informar de manera efectiva. Todos los tipos de trabajo, ya sean proporcionados por Datadog o personalizados, incluyen cinco atributos reservados que no se pueden eliminar ni modificar:

* Teams
* Servicios
* Entornos
* Centros de datos
* Versiones

Puede agregar atributos que reflejen las necesidades específicas de su equipo, como niveles de escalamiento, propietarios de componentes, impacto comercial o enlaces externos. Para agregar un atributo personalizado:

1. Vaya a [**Configuración > Configuración compartida > Tipos de trabajo**][2].
2. Haga clic en el tipo de trabajo deseado.
3. Haga clic en **+ Agregar atributo**.
4. Proporcione:
   * Nombre para mostrar (como "Región")
   * Clave (utilizada para acceso programático e informes)
   * Descripción (contexto opcional para su equipo)
   * Tipo de datos, elija entre:
     * Texto
     * URL
     * Número
   * Elija si desea permitir múltiples valores para este atributo.

## Estados personalizados {#custom-statuses}

La gestión del trabajo admite estados de elementos de trabajo personalizables. De forma predeterminada, los elementos de trabajo se mueven a través de Abierto, En curso y Cerrado. Puede agregar estados adicionales para representar revisiones, transferencias u otros pasos del flujo de trabajo. Los estados personalizados le permiten estandarizar los flujos de trabajo de los elementos de trabajo y alinear las opciones de estado con los procesos de su equipo para respaldar la generación de informes y la automatización.

### Comprender el comportamiento de los estados personalizados {#understanding-custom-statuses-behavior}
* Cada grupo de estado (Abierto, En curso, Cerrado) debe contener al menos un estado.
* Puede eliminar un estado existente, pero primero debe migrar cualquier elemento de trabajo que utilice actualmente ese estado a otro estado del mismo grupo.
* Los estados personalizados se comportan exactamente igual que los estados integrados de Datadog.

### Crear un estado personalizado {#create-a-custom-status}

1. Navegue a [**Configuración > Configuración compartida > Tipos de trabajo**][2].
2. Seleccione el tipo de trabajo que desea actualizar.
3. Desplácese a la sección **Estados**.
4. Agregue un nuevo estado en uno de los tres grupos de estado existentes: **Abierto, En curso,** o **Cerrado**.
5. (Opcional) Establezca un nuevo **estado predeterminado** para cada grupo de estado. Los estados predeterminados se utilizan en las automatizaciones como los estados preferidos para el grupo cuando no se proporcionan nombres de estado exactos.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/work_management/create_work_item#work-types
[2]: https://app.datadoghq.com/work/settings?type=shared