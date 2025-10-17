---
aliases:
- /es/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
- /es/tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
description: Aprende a configurar las puntuaciones de Apdex en tus servicios para
  medir la satisfacción de los usuarios en función de los tiempos de respuesta y umbrales
  de rendimiento de las aplicaciones.
title: Configuración de la puntuación del Apdex por servicio
---
{{< jqmath-vanilla >}}

El [Apdex][1] (índice de rendimiento de aplicaciones) es un estándar abierto desarrollado por una alianza de empresas que define un método estandarizado para informar, comparar y realizar un seguimiento del rendimiento de las aplicaciones. Se basa en la satisfacción de la experiencia del usuario midiendo el tiempo de respuesta de los servicios y las aplicaciones web. Su función es contrarrestar el promedio de tiempo de respuesta y los percentiles, que pueden inducir a errores cuando hay puntos de datos extremos.

## Definición

El Apdex es una medida numérica de la satisfacción del usuario con el rendimiento de las aplicaciones web empresariales. Convierte muchas mediciones en un solo número en una escala uniforme en el intervalo [0;1]:

* 0 = ningún usuario satisfecho
* 1 = todos los usuarios satisfechos

Para definir tu Apdex, necesitas ser administrador de la cuenta de Datadog. En primer lugar, define un umbral de tiempo, **T**, que separe los tiempos de respuesta satisfactorios de los insatisfactorios del servicio o la aplicación web. Con un umbral, puedes definir tres categorías:

* Las solicitudes satisfechas tienen un tiempo de respuesta inferior a **T**.
* Las solicitudes toleradas tienen un tiempo de respuesta igual o superior a **T** e inferior o igual a **4T**.
* Las solicitudes frustradas tienen un tiempo de respuesta superior a **4T** o devuelven un error.

Una vez definido el umbral y categorizadas tus solicitudes, el Apdex se define como:

$$\bo\text"Apdex"=({\bo\text"Satisfied"\text" requests" + {{\bo\text"Tolerated"\text" requests"}
 / 2}})/{\bo\text"Total"\text" requests"} $$

Seleccionar el umbral correcto es importante porque las solicitudes frustradas son 4 veces más lentas que las "normales". Si T=3, el usuario espera 3 segundos a que se cargue una página, pero no tolera esperar 12 segundos.

Los administradores deben establecer los umbrales del Apdex, por servicio, antes de que se calculen las puntuaciones del Apdex.

## Configuración del Apdex para las trazas (traces)

Para visualizar el servicio o la aplicación web del Apdex: 

1. En [Software Catalog][3], pasa el ratón por encima de tu servicio web y selecciona **Service Page** (Página de servicios).

1. Haz clic en el título del gráfico **Latencia** para abrir un menú desplegable y selecciona **Apdex**. 

   **Nota**: La opción Apdex sólo está disponible para los servicios web. 

   {{< img src="tracing/faq/apdex_selection_2.png" alt="Menú desplegable del gráfico de Latencia que muestra la opción Apdex" >}}

1. Utiliza el icono del lápiz en la parte superior izquierda de tu widget para editar tu configuración de Apdex.

   **Nota**: Debes ser administrador para ver este icono.

   {{< img src="tracing/faq/apdex_edit.png" alt="Icono de lapiz sobre el gráfico de Apdex, que puede seleccionarse para editar el umbral tolerable" >}}

1. Introduce tu umbral para visualizar la distribución de tus solicitudes.

   {{< img src="tracing/faq/apdex_update.png" alt="Pantalla de edición de la Configuración de Apdex, que muestra el cuadro de texto para establecer el umbral tolerable" >}}

1. Guarda tu widget para seguir tu evolución de Apdex a lo largo del tiempo.

   {{< img src="tracing/faq/apm_save.png" alt="Gráfico de Apdex después de guardar los cambios de configuración" >}}

## Muestra tu Apdex en el Software Catalog

Para visualizar la puntuación de Apdex en el [Software Catalog][2], selecciónala en el menú de configuración situado en la esquina superior derecha de la página:

{{< img src="tracing/faq/apdex_service_list.png" alt="Apdex Software Catalog" >}}

[1]: https://www.apdex.org/
[2]: https://app.datadoghq.com/services
[3]: https://app.datadoghq.com/services?query=type%3Aweb