---
aliases: null
description: Analiza Network Paths globales con ubicaciones gestionadas.
further_reading:
- link: /network_monitoring/network_path/
  tag: Doc
  text: Más información sobre Network Path
- link: https://www.datadoghq.com/blog/network-path/
  tag: Blog
  text: Identifica las ralentizaciones en toda la red con Datadog Network Path
title: Network Path Testing
---

## Información general

Network Path Testing en Synthetic Monitoring Monitoring te ofrece una visibilidad completa de las rutas que siguen tus tests Synthetic. Puedes determinar con precisión dónde se producen los fallos, ya sea en las aplicaciones, en las redes locales o con los ISP. Esto acelera el análisis de la causa raíz, permite la detección proactiva de problemas y activa alertas procesables cuando fallan los tests. También proporciona datos de tiempo de actividad para ayudarte a medir y comunicar el valor de tus inversiones en fiabilidad de red.

La ejecución de tests de Network Path a partir de ubicaciones gestionadas te permite realizar checks TCP, UDP e ICMP en tu aplicación. Visualiza los paquetes de Network Path al ejecutar consultas desde distintas ubicaciones globales.

<div class="alert alert-info">Para obtener información sobre la facturación de Network Path Testing en Synthetic Monitoring, consulta la <a href="https://www.datadoghq.com/pricing/?product=network-monitoring#products">página de precios</a>.</div>

## Creación de tests

1. En Datadog, pasa el cursor sobre **Digital Experience** (Experiencia digital) en el menú de la izquierda y selecciona Tests (en Synthetic Monitoring & Testing).
2. Haz clic en **New Test > Network Path Test** (Nuevo test > Test de Network Path).

{{< img src="synthetics/network_tests/network_path_test.png" alt="Creación de tests de Network Path a partir de New Synthetics Test (Nuevo test Synthetic)" style="width:60%;">}}

## Configuración del test

1. Elige el **tipo de solicitud** (TCP, UDP o ICMP) y especifica el host o la URL que quieres consultar. La información del puerto es opcional para tests UDP e ICMP.
2. Nombra tu test.  
3. Opcional: Configure las opciones avanzadas:  
   1. **Servicio de origen**: La etiqueta (label) mostrada del host de origen en la visualización de Network Path.
   2. **Servicio de destino**: La etiqueta (label) mostrada del host de destino en la visualización de Network Path.
   3. **Tiempo de vida (TTL) máximo**: Tiempo máximo de vida (número máximo de saltos) de los paquetes de sonda salientes. Por defecto, 30 saltos.
   4. **Consultas E2E**: Número de paquetes enviados al destino para medir la pérdida de paquetes, la latencia y el jitter. Por defecto es 50.
   5. **Consultas Traceroute**: Número de rastreos de ruta Traceroute a realizar. Los resultados se agregan en cada panel de detalles de ejecución de tests. Por defecto es 3.
   6. **Estrategia de Traceroute TCP** (solo tests TCP): Elige entre las estrategias de Traceroute Selective Acknowledgement (SACK) y Synchronize (SYN). SACK y Force SACK imitan mejor el tráfico de las aplicaciones modernas.
4. Opcional: Añade **Etiquetas** (tags) a tu test, incluyendo etiquetas de entorno. Utiliza etiquetas para filtrar tus tests Synthetic en la página [Synthetic Monitoring & Continuous Testing][1].

  {{< img src="synthetics/network_tests/new_network_path_test.png" alt="Formulario de creación de tests de Network Path que muestra las opciones avanzadas." style="width:80%;">}}

5. Define **aserciones** para determinar los resultados esperados para tu test. Se requiere al menos una aserción.

   {{< img src="synthetics/network_tests/network_path_assertions.png" alt="Formulario de creación de un test de Network Path con un menú desplegable de aserciones." style="width:80%;">}}

   | Tipo | Operador 1 | Operador 2 | Tipo de valor |
   | :---- | :---- | :---- | :---- |
   | latencia | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |
   | pérdida de paquetes |  | `is`, `<`, `<=`, `>`, `>=` | int (0 to 100) |
   | jitter | | `is`, `<`, `<=`, `>`, `>=` | float |
   | saltos de red | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |

6. Selecciona las **localizaciones** desde las que ejecutar tu test. Los tests de Network Path se pueden ejecutar desde ubicaciones gestionadas para probar tus endpoints desde ubicaciones globales.

   {{% managed-locations-network-path %}}

7. Define la **frecuencia de test** para determinar la frecuencia con la que Datadog ejecuta tu test de Network Path. Los tests programados garantizan que los usuarios puedan acceder a tus endpoints más importantes.

8. [Define las condiciones de alerta][4] y [configura el monitor de tests][5] para tu test de Network Path.

{{% synthetics-alerting-monitoring-network-path %}}

## Ver los resultados de los tests

Haz clic en un test de Network Path en la [página de tests Synthetic][1] para ver la página de información del test, que muestra información completa sobre tu test:

- Propiedades de tests y configuración
- Historial de tests
- Ejecuciones individuales de tests
- Visualizaciones agregadas de Network Path en todas las ejecuciones de tests 

La visualización de Network Path muestra las rutas que siguen los paquetes para completar las consultas durante cada ejecución de test. Arrastra las asas de la [barra de salud][3] para ajustar el periodo de tiempo y ver una snapshot de la latencia de extremo a extremo y la pérdida de paquetes de un intervalo de tiempo específico. Para obtener más información sobre cómo se crean las visualizaciones de Network Path, consulta la [documentación de Network Path][2].

  <div class="alert alert-info">El cambio de la barra de salud no afecta al intervalo de tiempo global que aparece en la parte superior de la página.</div>

  {{< img src="synthetics/network_tests/network_path_section.png" alt="Sección de una visualización de Network Path de un test de Network Path." style="width:100%;">}}

Para ver los detalles de una ejecución de test específica, haz clic en una ejecución de test en la tabla de la parte inferior de la página. Se abre un panel lateral que muestra la información de la ejecución, la visualización de Network Path y los resultados de la aserción.

  {{< img src="synthetics/network_tests/test_run_side_panel.png" alt="Ejecución de test única de un test de red que muestra el panel lateral" style="width:100%;">}}

## Conservación

<div class="alert alert-info">Los datos de Network Path Testing se conservan durante 30 días.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /es/network_monitoring/network_path/path_view/
[3]: /es/network_monitoring/network_path/path_view/#health-bar
[4]: /es/synthetics/network_path_tests/#define-alert-conditions
[5]: /es/synthetics/network_path_tests/#configure-the-test-monitor