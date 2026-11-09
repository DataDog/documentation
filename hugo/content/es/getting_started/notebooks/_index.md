---
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centro de aprendizaje
  text: Cree Datadog Notebooks para investigar incidentes
- link: https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/
  tag: Guía
  text: Introducción a las funciones de análisis de Notebooks
title: Introducción a Datadog Notebooks
---
## Descripción general {#overview}

Los Datadog Notebooks combinan gráficos en vivo, métricas, registros, monitores y [Funciones de análisis][1] para crear un entorno colaborativo en tiempo real utilizando sus datos. Los equipos pueden usar Notebooks para aislar e investigar problemas, documentar detalles de incidentes, crear guías interactivas y generar informes especiales para mejorar sus flujos de trabajo proactivos.

Esta guía presenta Datadog Notebooks y demuestra cómo los tipos de Notebooks mejoran la colaboración del equipo y los flujos de trabajo de investigación.

### Beneficios clave {#key-benefits}

- **Acceso directo a datos**: consulte y visualice sus métricas, registros y trazas de Datadog sin salir del documento
- **Colaboración en tiempo real**: varios miembros del equipo pueden editar simultáneamente, dejar comentarios y hacer un seguimiento de los cambios
- **Integración de flujo de trabajo**: cree Notebooks a partir de alertas, tableros, registros o Datadog Work Management para iniciar investigaciones donde aparecen los problemas

## Elección del tipo de Notebook adecuado {#choosing-the-right-notebook-type}

Seleccionar el tipo de Notebook adecuado ayuda a su equipo a comprender el propósito y el resultado esperado del documento. Cada tipo satisface una necesidad específica del flujo de trabajo:

{{< ui >}}Investigation{{< /ui >}}Notebooks capturan los esfuerzos de resolución de problemas en tiempo real. Utilice este tipo al explorar problemas desconocidos, comportamientos inesperados o anomalías del sistema. Documente su proceso de descubrimiento, la colaboración del equipo y las resoluciones exitosas.

{{< ui >}}Runbook{{< /ui >}} Los Notebooks proporcionan procedimientos paso a paso para tareas comunes. Use este tipo para procesos de implementación, flujos de trabajo de respuesta a incidentes o cualquier operación repetible que su equipo realice regularmente.

{{< ui >}}Documentation{{< /ui >}} Los Notebooks sirven como materiales de referencia vivos. Use este tipo para descripciones generales de arquitectura de sistemas, guías de incorporación de equipos o estándares de configuración que evolucionan con el tiempo.

{{< ui >}}Report{{< /ui >}} Los Notebooks sintetizan los hallazgos para las partes interesadas. Úselos para resumir incidentes trimestrales, presentar datos de planificación importantes o comunicar decisiones técnicas al liderazgo.

{{< ui >}}Postmortem{{< /ui >}} Los Notebooks analizan incidentes completados. Cree estos después de interrupciones del servicio para documentar cronologías, identificar causas raíz y realizar un seguimiento de las acciones de mejora.

Cada tipo de Notebook ofrece colaboración con otros y se conecta a sus datos de Datadog.

## Ejemplo de caso de estudio: Investigación de errores de registro con Notebooks {#example-case-study-investigating-log-errors-with-notebooks}

Cuando aparecen registros de error en su sistema, crear un Notebook está a un clic de distancia. Aquí tiene un ejemplo de cómo su equipo puede usar un Notebook colaborativo para investigar y descubrir la causa raíz de fallas de verificación recientes. Este proceso permite al equipo realizar los ajustes necesarios para prevenir problemas similares en el futuro.

1. **Usted nota picos de error en los registros de su aplicación**
   {{< img src="/getting_started/notebooks/log-explorer-errors.png" alt="Descripción de su imagen" style="width:100%;" >}}

1. **Cree un Notebook desde el Explorador de registros**<br>
   Haga clic en {{< ui >}}Open in Notebooks{{< /ui >}} y seleccione {{< ui >}}New notebook{{< /ui >}} en la siguiente pantalla.

   {{< img src="/getting_started/notebooks/notebooks-button.png" alt="Descripción de su imagen" style="width:80%;" >}}

1. **Seleccione el {{< ui >}}Investigation{{< /ui >}} tipo de Notebook en la esquina superior izquierda del Notebook**

   {{< img src="/getting_started/notebooks/notebook-type.png" alt="Descripción de su imagen" style="width:80%;" >}}

   El Notebook preserva automáticamente sus datos de registro, consulta y rango de tiempo relevantes del Explorador de registros:

   {{< img src="/getting_started/notebooks/log-errors-preserved-in-notebooks.png" alt="Descripción de su imagen" style="width:100%;" >}}

1. **Etiquete a sus compañeros de equipo e investigue en conjunto**

   Etiquete a su compañero de equipo usando @menciones para incluirlo en la investigación. Ellos pueden ver los mismos patrones de error y agregar su análisis directamente en el Notebook. Al usar las funciones de colaboración de Notebooks, los compañeros de equipo pueden comunicarse y trabajar juntos en tiempo real.

   En este ejemplo, usando la función de Notebook de análisis _transform_, su compañero de equipo puede filtrar los mensajes de error de registro y ver que una verificación específica está fallando:

   {{< img src="/getting_started/notebooks/transform-analysis-feature.png" alt="Descripción de su imagen" style="width:100%;" >}}

1. **Agregue un Monitor a su Notebook**

   Agregue un Monitor Summary al Notebook usando `/monitor` para visualizar el estado de su monitor de servidor:

   {{< img src="/getting_started/notebooks/monitor.png" alt="Descripción de su imagen" style="width:100%;" >}}

   Su compañero de equipo deja un mensaje en el Notebook diciendo que, dado que la verificación del Minikube Monitor muestra un estado OK, necesitará continuar con su investigación.

A lo largo de esta investigación, el Notebook se convierte en un registro vivo de su proceso de resolución de problemas, preservando consultas, descubrimientos y conocimientos analíticos para referencia futura. Este ejemplo demuestra el valor fundamental de los Notebooks: transforman el proceso de depuración en conocimiento de equipo documentado. Su equipo ahora tiene todo capturado en un formato compartible y buscable que evita la pérdida de conocimiento y acelera futuras investigaciones.

## Próximos pasos con los Notebooks {#next-steps-with-notebooks}

La investigación es solo el comienzo. Los Notebooks continúan ganando valor con el tiempo al transformarse de documentos reactivos en recursos proactivos. Un Notebook de investigación creado durante un incidente puede convertirse en la base para múltiples activos:

- Convierta su investigación en un {{< ui >}}Runbook{{< /ui >}} extrayendo los pasos de resolución de problemas exitosos. Los futuros responsables pueden seguir su camino comprobado en lugar de empezar desde cero.
- Transforme investigaciones complejas en {{< ui >}}Documentation{{< /ui >}} que expliquen el comportamiento del sistema y los problemas conocidos.
- Cree informes trimestrales {{< ui >}}Reports{{< /ui >}} agregando múltiples investigaciones para identificar patrones y mejoras sistémicas.

Esta evolución crea un repositorio de conocimiento centralizado que beneficia a toda la organización. Los nuevos miembros del equipo pueden consultar estos Notebooks durante la incorporación, los ingenieros de guardia pueden consultarlos como manuales operativos durante incidentes y el liderazgo puede revisar informes para la planificación de capacidad.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/advanced_analysis/getting_started/