---
aliases:
- /es/graphing/widgets/note/
description: Mostrar texto en un widget de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Aprenda a crear dashboards con JSON
kind: documentación
title: Widget de notas y enlaces
widget_type: nota
---

El widget de **Notas y enlaces** es similar al [widget de texto libre][1], pero contiene más opciones de formato y visualización. 

**Nota**: El widget de Notas y enlaces no admite HTML en línea.

## Configuración

1. Introduce el texto que deseas mostrar. Se admite Markdown.
2. Selecciona una plantilla predefinida o personaliza las opciones de visualización. 
3. Selecciona el tamaño del texto y el color de fondo de widget.
4. Para ajustar la posición del texto, haz clic en los botones **Alignment** (Alineación*). Para no incluir relleno, haz clic en **No Padding** (Sin relleno).
5. Para incluir un puntero, haz clic en **Show Pointer** (Mostrar puntero) y selecciona una posición en el menú desplegable.

{{< img src="dashboards/widgets/note/overview.png" alt="Añadir texto en el campo Markdown del editor del widget de Notas y enlaces" style="width:90%;" >}}

Cuando estés listo para crear el widget, haz clic en **Save** (Guardar).

Este widget es compatible con las variables de plantilla. Utiliza la sintaxis `$<VARIABLE_NAME>.value` para actualizar dinámicamente el contenido del widget.

{{< img src="dashboards/widgets/note/template_variable.png" alt="Usar variables de plantilla en el campo Markdown del editor del widget de Notas y enlaces" style="width:90%;" >}}

En este ejemplo, `$env.value` actualiza el valor de un enlace al entorno seleccionado.

## API

Este widget se puede utilizar con la **[API de dashboards][2]**. Consulta la siguiente tabla para la [definición del esquema del widget JSON][3]:


{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/free_text/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/