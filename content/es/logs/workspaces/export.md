---
further_reading:
- link: /logs/workspaces/
  tag: Documentación
  text: Más información sobre Log Workspaces
- link: /dashboards/widgets/list/
  tag: Documentación
  text: Widget de lista
private: true
title: Exportar conjuntos de datos de Log Workspaces
---

## Información general

Exporta tu celda de Workspaces como un conjunto de datos a dashboards y notebooks. La función de exportación te permite crear conjuntos de datos y mostrarlos en dashboards y notebooks para realizar análisis o generar informes. 

## Exportar una celda de Workspaces como un conjunto de datos 

Desde tu Workspace:

1. Busca la celda que quieres exportar como conjunto de datos.
2. Haz clic en **Save to Dashboard* (Guardar en dashboard) o selecciona **Guardar en notebook** en el menú desplegable.  
3. En el modal, elige un dashboard o notebook existente, o añade la celda como conjunto de datos a un nuevo dashboard o notebook. 
4. Haz clic en **Save** (Guardar).
5. (Opcional) Cambia el nombre de la fuente y haz clic en **Update** (Actualizar). Por defecto, el nombre de la fuente es `<Workspace name> - <Cell name>`.
6. Un cartel de color violeta indica una celda exportada.

{{< img src="logs/workspace/export/example_exported_dataset.png" alt="Ejemplo de celda de Workspaces exportada que muestra un cartel de color violeta" style="width:100%;" >}}

Al guardar una celda en un dashboard se crea una sincronización en tiempo real entre la celda y todos los widgets en los que se guardó. Cualquier cambio realizado en un conjunto de datos exportado también se refleja en los dashboards o notebooks asociados. 

Desde el dashboard o el notebook, tienes la opción de ajustar las columnas y personalizar las opciones de widget. Sin embargo, sólo puedes cambiar las configuraciones del conjunto de datos desde Log Workspaces. Para editar la fuente, haz clic en **Edit in Log Workspaces** (Editar en Log Workspaces) desde el editor de gráficos de widget.

{{< img src="/logs/workspace/export/link_to_workspace_from_dashboard.png" alt="Opciones en el editor de gráficos para ajustar columnas y vincularlas al Workspace de origen" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}