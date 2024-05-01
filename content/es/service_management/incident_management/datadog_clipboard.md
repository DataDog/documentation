---
aliases:
- /es/monitors/incident_management/datadog_clipboard
description: Crear y gestionar incidencias
further_reading:
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Explora tus datos sin esfuerzo con el portapapeles de Datadog
kind: documentation
title: Clipboard de Datadog
---

## Información general

El portapapeles de Datadog es una herramienta multiplataforma para recopilar y compartir señales en distintos contextos. Es personal para cada usuario y almacena todos los gráficos copiados junto con los enlaces guardados. Las señales pueden agruparse y exportarse a un dashboard, notebook o incidencia.

{{< img src="service_management/incidents/clipboard-full.png" alt="Portapapeles principal">}}

## Exploración entre páginas

El portapapeles funciona en todas las páginas de Datadog y mantiene un registro de todos los gráficos copiados por un usuario individual. El portapapeles no copia automáticamente texto de consulta, eventos JSON u otro contenido basado en texto.

## Abrir el portapapeles

Para abrir el portapapeles, copie cualquier gráfico y haga clic en **Open Clipboard** (Abrir portapapeles) en la ventana emergente.

{{< img src="service_management/incidents/open-clipboard.png" alt="Abrir un gráfico en el portapapeles" style="width:80%;">}}

O bien, haz clic en "`Cmd/Ctrl + Shift + K` para abrir" en el portapapeles minimizado.

El portapapeles también puede abrirse y cerrarse con `Cmd/Ctrl + Shift + K`. Para minimizar el portapapeles, haz clic en el icono Minimizar. El portapapeles minimizado se mantiene en todas las páginas de Datadog.

## Añadir clips

Para añadir un gráfico, cópialo con `Cmd/Ctrl + C` o haz clic en **Copy** (Copiar) en el menú de exportación. Una vez abierto el portapapeles, los gráficos copiados se añaden automáticamente.

Para añadir una URL, abre el portapapeles y haz clic en **Add current page** (Añadir página actual).

{{< img src="service_management/incidents/add-page.png" alt="Añadir un dashboard al portapapeles" style="width:80%;">}}

## Gestión de clips

Cada elemento del portapapeles puede abrirse, clonarse o borrarse; estas opciones están disponibles al pasar el ratón por encima de cualquier señal. Al abrir un elemento, se navega hasta el enlace de la señal original. Abre la fuente de cualquier gráfico (como el dashboard del que se recortó) al hacer clic en el título del elemento.

{{< img src="service_management/incidents/managing-clips.png" alt="Gestiona tus clips" style="width:80%;">}}

El portapapeles contiene un máximo de 20 señales. Elimina las señales al borrarlas individualmente, o al hacer clic en **Remove All** (Eliminar todas). Si se añaden más de 20 señales, las más antiguas, almacenadas más a la izquierda, se eliminan automáticamente.

## Exportación

Los elementos del portapapeles pueden exportarse a dashboards, notebooks, o incidencias mediante atajos de teclado o el menú de exportación. Para copiar una señal individual, pasa el ratón sobre ella y utiliza `Cmd/Ctrl + C` para copiarla, y pégala en un dashboard o notebook con `Cmd/Ctrl + V`. Para copiar varias señales, utiliza `Shift + Click` para seleccionar gráficos y enlaces y `Cmd/Ctrl + C` para copiarlos.

Alternativamente, exporta tu selección a un dashboard, notebook, o incidencia nueva o existente utilizando el menú de exportación. Solo los [gráficos compatibles][1] pueden exportarse a notebooks.

{{< img src="service_management/incidents/exporting.png" alt="Exportar desde el portapapeles" style="width:80%;">}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/notebooks/#visualization