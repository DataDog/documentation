---
description: Aprende a identificar los trabajos CI que se encuentran en la ruta crítica
  para mejorar la duración de tus pipelines CI.
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentación
  text: Aprender a buscar y gestionar tus ejecuciones de pipelines
- link: continuous_integration/search/#highlight-critical-path
  tag: Documentación
  text: Resaltar la ruta crítica en la ejecución de tus pipelines
title: Identificar trabajos CI en la ruta crítica para reducir la duración de los
  pipelines
---

## Información general

Esta guía explica cómo identificar los trabajos CI que se encuentran en la ruta crítica para ayudarte a determinar qué trabajos priorizar con el fin de reducir la duración total de tus pipelines CI.

### Comprender la ruta crítica en un pipeline CI

La ruta crítica de la ejecución de un pipeline CI es la secuencia más larga de trabajos CI que determina la duración total de esa ejecución de pipeline. Esencialmente, es la ruta en el gráfico de dependencias de trabajos CI que tarda más tiempo en completarse. Para reducir la duración total de una ejecución de pipeline CI, es necesario acortar la duración de los trabajos CI a lo largo de esta ruta crítica.

{{< img src="continuous_integration/critical_path_highlight_pipeline.png" alt="Trabajos resaltados en la ruta crítica de la ejecución de un pipeline." width="90%">}}

Observar la duración del trabajo puede no ser suficiente. Los trabajos CI suelen ejecutarse en paralelo con otros trabajos, lo que significa que la reducción del tiempo de ejecución del pipeline viene determinada por la reducción del **tiempo exclusivo** del trabajo CI.

El tiempo exclusivo de un trabajo en la ruta crítica representa la cantidad de tiempo que el ejecutor CI dedicó a ejecutar un trabajo específico, excluyendo el tiempo de ejecución de otros trabajos que se ejecutaban en paralelo.

{{< img src="continuous_integration/critical_path_highlight_pipeline_exclusive_time.png" alt="Tiempo exclusivo de trabajos resaltados en la ruta crítica de la ejecución de un pipeline." width="90%">}}

Si un trabajo CI `job1` está en la ruta crítica con una duración de 100 ms y se ejecuta en paralelo con un trabajo CI `job2` que tiene una duración de 80 ms, el tiempo exclusivo de `job1` en la ruta crítica es de 20 ms. Esto significa que si se reduce la duración de `job1` en más de 20 ms, la duración total del pipeline sólo disminuirá 20 ms.

### Proveedores CI compatibles

El filtrado y el cálculo del tiempo exclusivo de los trabajos CI en la ruta crítica está disponible para los siguientes proveedores CI:
* [GitLab][3]

<div class="alert alert-info">Si te interesa la ruta crítica pero tu proveedor CI aún no es compatible, rellena <a href="https://forms.gle/zDgiDSGQxA1HgjXh6" target="_blank">este formulario</a>.</div>

Incluso sin filtrar ni calcular el tiempo exclusivo, puedes [resaltar qué trabajos CI se encuentran en la ruta crítica][4] utilizando la vista detallada de ejecución de pipelines de todos los proveedores CI.

## Identificar los trabajos CI clave para mejorar tu pipeline CI

### Uso de la faceta

Puedes utilizar la faceta `@ci.on_critical_path` o `@ci.critical_path.exclusive_time` para identificar qué trabajos CI están en la ruta crítica en tus pipelines CI. Con esas facetas puedes crear dashboards y notebooks personalizados según tus necesidades.

{{< img src="continuous_integration/critical_path_facets.png" alt="Filtrar con facetas de ruta crítica" width="90%">}}

Ten en cuenta que estas facetas sólo están disponibles si utilizas `ci_level:job` en tus consultas.

### Uso de la plantilla de dashboard 

También puedes importar la plantilla de dashboard [CI Visibility - Critical Path][1]:
- Abre la plantilla de dashboard [civisibility-critical-path-gitlab-dashboard.json][1] y copia el contenido en el portapapeles.
- Crea un [nuevo dashboard][2] en Datadog.
- Pega el contenido copiado en el nuevo dashboard.
- Guarda el dashboard.

{{< img src="continuous_integration/critical_path_dashboard.png" alt="Dashboard de ruta crítica para CI Visibility" width="90%">}}

#### Terminología

| Columna                                | Descripción                                                                                                                                                      |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tiempo exclusivo total en la ruta crítica | Suma de todos los tiempos exclusivos del trabajo, que calcula el ahorro potencial de tiempo para los pipelines involucrados.                                      |
| Tiempo exclusivo medio en la ruta crítica   | Tiempo exclusivo medio de un trabajo específico en la ruta crítica, que mide la reducción potencial de la duración de un pipeline si el trabajo reduce su tiempo exclusivo. |
| Frecuencia en la ruta crítica                 | Mide con qué frecuencia un trabajo se encuentra en la ruta crítica.                                                                                                                |

##### Ejemplo

En la imagen anterior, podemos observar que un trabajo CI llamado `metrics` es un candidato potencial para la mejora, ya que su tiempo exclusivo total es el más alto. El tiempo exclusivo medio es de unos 21 minutos, lo que significa que existe un margen de mejora de hasta 21 minutos para este trabajo CI. 

Como sabemos que este trabajo CI está en la ruta crítica el 43,5% del tiempo, podríamos reducir potencialmente la duración media del pipeline en hasta 21 minutos para el 43,5% de las ejecuciones del pipeline.

{{< img src="continuous_integration/critical_path_dashboard_outlier_job_highlighted.png" alt="Trabajo CI como potencial candidato para mejorar el tiempo exclusivo." width="90%">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /resources/json/civisibility-critical-path-gitlab-dashboard.json
[2]: /es/dashboards/
[3]: /es/continuous_integration/pipelines/gitlab/?tab=gitlabcom
[4]: /es/continuous_integration/search/#highlight-critical-path