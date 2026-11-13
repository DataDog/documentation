---
description: Guarde y reutilice grupos de componentes y consultas en múltiples aplicaciones
  de App Builder como plantillas modulares.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentación
  text: Componentes
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
- link: /actions/app_builder/queries/
  tag: Documentación
  text: Consultas
title: Módulos reutilizables
---
Utilice la función _Módulos reutilizables_ para guardar grupos de componentes y consultas como plantillas para su reutilización en sus aplicaciones de App Builder. Los módulos incluyen automáticamente todas las dependencias para garantizar que sus componentes funcionen correctamente.

<div class="alert alert-info">Los módulos predeterminados son de solo lectura. Para modificar un módulo predeterminado, duplíquelo primero.</div>

## Cree un módulo reutilizable {#create-a-reusable-module}

Existen tres formas de crear un módulo reutilizable:

### Desde el panel de componentes {#from-the-components-panel}
1. Mientras edita una aplicación, haga clic en el icono de expandir (<i class="icon-expand-to-left-wui" style="position:relative; top:4px;"></i>) para abrir el panel de componentes.
2. Haga clic en un componente para seleccionarlo.
3. En el panel de componentes, haga clic en el icono de menú (<i class="icon-config-1" style="position:relative; top:4px;"></i>).
4. Haga clic en {{< ui >}}Create Module{{< /ui >}} ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}).
5. [Configure su módulo][3].

### Desde la pestaña del nombre de instancia de un componente {#from-a-components-instance-name-tab}
1. Mientras edita una aplicación, seleccione un componente en el lienzo de la aplicación.
2. Haga clic en el icono {{< ui >}}Create Module{{< /ui >}} ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}) en la pestaña del nombre de instancia del componente.
3. [Configure su módulo][3].

### A partir de los componentes seleccionados {#from-selected-components}
1. Mientras edita una aplicación, mantenga presionada la tecla Shift y haga clic en varios componentes para seleccionarlos.
2. En el panel lateral que aparece a la derecha, haga clic en {{< ui >}}Create Module{{< /ui >}} ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}}).

## Configure un módulo {#configure-a-module}

Al crear su módulo, el editor de módulos le permite obtener una vista previa de los componentes y consultas, agregar un nombre y una descripción, y revisar las dependencias antes de guardar.

{{< img src="actions/app_builder/app-builder-reusable-module-preview.png" alt="Editor de módulos que muestra una vista previa de los componentes y consultas con campos de nombre y descripción" style="width:100%;">}}

1. Ingrese un nombre y una descripción.
2. Revise los componentes y consultas que se incluyen automáticamente. El sistema incluye todas las dependencias de consultas anidadas.
3. Haga clic en {{< ui >}}Save Module{{< /ui >}}.

## Agregue un módulo reutilizable a una aplicación {#add-a-reusable-module-to-an-app}
1. Mientras edita una aplicación, haga clic en el icono "Add Component" (<i class="icon-component-wui" style="position:relative; top:4px;"></i>).
2. En la sección {{< ui >}}Modules{{< /ui >}}, haga clic en un módulo o arrástrelo al lienzo de la aplicación.


## Elimine un módulo {#delete-a-module}
1. Mientras edita una aplicación, haga clic en el icono "Add Component" (<i class="icon-component-wui" style="position:relative; top:4px;"></i>).
2. En la sección {{< ui >}}Modules{{< /ui >}}, haga clic en el edit icon ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}) para el módulo que desea eliminar.
3. En el editor de módulos, haga clic en {{< ui >}}Delete Module{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][2].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://chat.datadoghq.com/
[3]: /es/actions/app_builder/components/reusable_modules/#configure-a-module