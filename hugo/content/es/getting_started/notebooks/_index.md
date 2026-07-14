---
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centro de aprendizaje
  text: Crear notebooks de Datadog para investigar incidencias
- link: https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/
  tag: Guía
  text: Empezando con las funciones de análisis de notebooks
title: Empezando con los notebooks de Datadog
---

## Información general

Los notebooks de Datadog combinan gráficos, métricas, logs, monitores y [funciones de análisis][1] en directo para crear un entorno de colaboración en tiempo real con tus datos. Los equipos pueden utilizar notebooks para aislar e investigar problemas, documentar detalles de incidencias, crear guías interactivas y elaborar informes especiales para mejorar sus flujos de trabajo proactivos.

Esta guía presenta los notebooks de Datadog y demuestra cómo los tipos de notebooks mejoran la colaboración en equipo y los flujos de trabajo de investigación.

### Beneficios clave

- **Acceso directo a los datos**: Consulta y visualiza tus métricas, logs y trazas (traces) de Datadog sin salir del documento.
- **Colaboración en tiempo real**: Varios miembros del equipo pueden editar simultáneamente, dejar comentarios y realizar un seguimiento de los cambios.
- **Integración de flujos de trabajo**: Crea notebooks a partir de alertas, dashboards, logs o Datadog Case Management para iniciar investigaciones allí donde aparecen los problemas.

## Elegir el tipo de notebook adecuado

Seleccionar el tipo de notebook adecuado ayuda a tu equipo a entender el propósito del documento y el resultado esperado. Cada tipo responde a una necesidad de flujo de trabajo específica:

Los notebooks de **investigación** capturan los esfuerzos de resolución de problemas en tiempo real. Utiliza este tipo cuando explores problemas desconocidos, comportamientos inesperados o anomalías del sistema. Documenta tu proceso de detección, la colaboración del equipo y las resoluciones satisfactorias.

Los notebooks **runbook** muestran los procedimientos paso a paso de tareas frecuentes. Utiliza este tipo para procesos de despliegue, flujos de trabajo de respuesta ante incidencias o cualquier operación repetible que tu equipo realice con regularidad.

Los notebooks de **documentación** sirven como materiales de referencia vivos. Utilízalos para información general de la arquitectura del sistema, guías de incorporación para equipos o normas de configuración que evolucionan con el tiempo.

Los notebooks de **informe** sintetizan las conclusiones para las partes interesadas. Utilízalos para resumir incidencias trimestrales, presentar datos importantes de planificación o comunicar decisiones técnicas a los directivos.

Los notebooks **retrospectivos** analizan incidencias finalizadas. Créalos después de las interrupciones del servicio para documentar plazos, identificar causas raíz y realizar un seguimiento de acciones de mejora.

Cada tipo de notebook ofrece colaboración con otros y se conecta a tus datos de Datadog.

## Ejemplo de estudio de caso: Investigación de logs de error con notebooks

Cuando aparezcan logs de error en tu sistema, podrás crear un notebook con un solo clic. He aquí un ejemplo de cómo tu equipo puede utilizar un notebook colaborativo para investigar y descubrir la causa raíz de fallos de checks recientes. Este proceso permite al equipo realizar los ajustes necesarios para evitar problemas similares en el futuro.

1. **Notas picos de error en tus logs de aplicación**
   {{< img src="/getting_started/notebooks/log-explorer-errors.png" alt="Descripción de tu imagen" style="width:100%;" >}}

1. **Crear un notebook desde el Explorador de logs**<br>
   Haz clic en "Open in Notebooks" (Abrir en notebooks) y selecciona "New notebook" (Nuevo notebook) en la siguiente pantalla.

   {{< img src="/getting_started/notebooks/notebooks-button.png" alt="Descripción de tu imagen" style="width:80%;" >}}

1. **Seleccionar el tipo de notebook de investigación en la esquina superior izquierda del notebook**

   {{< img src="/getting_started/notebooks/notebook-type.png" alt="Descripción de tu imagen" style="width:80%;" >}}

   El notebook conserva automáticamente datos de logs, consultas e intervalos de tiempo relevantes desde el Explorador de logs:

   {{< img src="/getting_started/notebooks/log-errors-preserved-in-notebooks.png" alt="Descripción de tu imagen" style="width:100%;" >}}

1. **Etiquetar compañeros de equipo e investigar juntos**

   Etiqueta a tus compañeros de equipo con @menciones para que participen en la investigación. Podrán ver los mismos patrones de error y añadir sus análisis directamente en el notebook. Gracias a las funciones de colaboración de los notebooks, los compañeros de equipo pueden comunicarse y trabajar juntos en tiempo real.

   En este ejemplo, utilizando la función _transformar_ del notebook de análisis, tu compañero de equipo puede filtrar mensajes de error de logs y ver que un check específico está fallando:

   {{< img src="/getting_started/notebooks/transform-analysis-feature.png" alt="Descripción de tu imagen" style="width:100%;" >}}

1. **Añadir un monitor a tu notebook**

   Añade un resumen de monitor al notebook utilizando `/monitor` para visualizar el estado de tu monitor host:

   {{< img src="/getting_started/notebooks/monitor.png" alt="Descripción de tu imagen" style="width:100%;" >}}

   Tu compañero de equipo deja un mensaje en el notebook diciendo que como el check de monitor Minikube muestra un estado OK, tendrán que continuar la investigación.

A lo largo de esta investigación, el notebook se convierte en un registro vivo de tu recorrido de resolución de problemas, conservando consultas, detecciones y conocimientos analíticos para futuras consultas. Este ejemplo demuestra el valor fundamental de los notebooks: transforman el proceso de depuración en conocimiento documentado del equipo. Tu equipo tiene ahora todo guardado en un formato que se puede compartir y en el que se pueden realizar búsquedas, lo que evita la pérdida de conocimientos y acelera las investigaciones futuras.

## Siguientes pasos con notebooks

La investigación es solo el principio. Los notebooks siguen ganando valor con el tiempo al transformarse de documentos reactivos en recursos proactivos. Un notebook de investigación creado durante una incidencia puede convertirse en la base de múltiples recursos:

- Convierte tu investigación en un **runbook** extrayendo los pasos de resolución de problemas satisfactorios. Los futuros intervinientes podrán seguir tu camino probado, en lugar de empezar desde cero.
- Transforma investigaciones complejas en **documentación** que explique el comportamiento del sistema y los problemas conocidos.
- Crea **informes** trimestrales agregando múltiples investigaciones para identificar patrones y mejoras sistémicas.

Esta evolución crea un repositorio centralizado de conocimientos que beneficia a toda la organización. Los nuevos miembros del equipo pueden consultar estos notebooks durante la incorporación, los ingenieros de guardia pueden consultarlos como runbooks durante las incidencias y los directivos pueden revisar los informes para planificar las capacidades.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/advanced_analysis/getting_started/