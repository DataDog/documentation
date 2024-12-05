---
aliases:
- /es/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
cascade:
  algolia:
    rank: 70
description: Aprende a desarrollar una integración en Datadog.
further_reading:
- link: /api/latest/
  tag: Documentación
  text: Conocer más sobre la API Datadog
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Prácticas recomendadas
  text: Crear increíbles dashboards para integraciones
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: Blog
  text: DRUIDS, el sistema de diseño que impulsa a Datadog
- link: https://www.datadoghq.com/blog/introducing-open-source-hub/
  tag: Blog
  text: Presentamos el hub Open Source de Datadog
title: Desarrolladores
---

## Información general

La sección para desarrolladores contiene material de referencia para desarrollar en Datadog. Es posible que quieras desarrollar en Datadog si hay datos que quieres ver en el producto y que no estás viendo. En ese caso, es posible que Datadog ya sea compatible con la tecnología que necesitas. Consulta la tabla de las [tecnologías más solicitadas](#commonly-requested-technologies) para encontrar el producto o la integración que satisfaga tus necesidades.

## Tecnologías más solicitadas

Si hay datos que quieres monitorizar con Datadog y que no estás viendo, antes de crear algo personalizado, considera los siguientes productos e integraciones de Datadog:

{{< partial name="requests.html" links="requests" >}}

Si la solución que necesitas realmente no está disponible, puedes ponerte en contacto con el [servicio de asistencia de Datadog][1] para solicitar una función. También puedes [crear tu propia solución](#creating-your-own-solution) utilizando los materiales de referencia de esta sección.

### Socios y marketplace de Datadog 

También puedes ser socio, crear en Datadog y contribuir al [marketplace de Datadog][10] o a la comunidad de [integraciones][6] de Datadog. 

{{< whatsnext desc="Para desarrollar una oferta, consulta la documentación pertinente:" >}}
    {{< nextlink href="/developers/integrations/agent_integration" >}}Crear una integración basada en Agent{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/api_integration" >}}Crear una integración API{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/log_integration" >}}Crear una integración para logs{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/marketplace_offering" >}}Crear una oferta para el marketplace{{< /nextlink >}}
{{< /whatsnext >}}

Para obtener más información sobre cómo convertirte en socio de Datadog, visita la página [Red de socios de Datadog][2]. 

## Crear tu propia solución

¿Sigues sin poder ver el tipo de datos que necesitas? Los desarrolladores tienen varias opciones para enviar datos no compatibles a Datadog.

- [**DogStatsD**][3] es un servicio de agregación de métricas que acepta métricas, eventos y checks de servicios personalizados.

- Los [**checks personalizados**][4] permiten recopilar métricas de aplicaciones o sistemas personalizados. Los [checks personalizados del Agent][4] son adecuados para muchas necesidades. Para requisitos más avanzados como el pre-procesamiento de métricas, puedes optar por escribir un check de [OpenMetrics][5].

- Las [**integraciones**][6] también permiten recopilar métricas, eventos, y checks de servicios de aplicaciones o sistemas personalizados. Las integraciones son reutilizables. Puedes mantener tu integración privada o contribuir al [repositorio de la comunidad integraciones][7] de Datadog escribiendo una integración pública para que la utilicen otros desarrolladores.


### Comparación entre checks personalizados e integraciones

La principal diferencia entre los checks personalizados y las integraciones es que estas últimas son componentes reutilizables que pueden volverse parte del ecosistema Datadog. Suelen requerir más esfuerzo (tiempo de desarrollo) y se adaptan mejor a casos de uso general, como marcos de aplicaciones, proyectos de código abierto o software de uso común. Para los escenarios más específicos, como la monitorización de servicios que no se utilizan ampliamente fuera de tu equipo u organización, escribir un check personalizado puede ser la opción más eficaz. 

Sin embargo, puedes optar por escribir una integración, en lugar de un check personalizado, si tu caso de uso particular requiere que publiques y despliegues tu solución como un wheel de Python (`.whl`). Las métricas emitidas mediante checks personalizados se consideran métricas personalizadas que tienen un coste asociado según tu plan de suscripción. Sin embargo, una vez que una integración es aceptada en el ecosistema Datadog, las métricas que emite ya no se consideran métricas personalizadas y no se tienen en cuenta en el recuento de métricas personalizadas. Para obtener más información sobre cómo esto puede afectar al coste, consulta [Tarifas de Datadog][8].

### ¿Cómo se crea una integración? 

Escribir una integración pública (es decir, una que forme parte del ecosistema Datadog, pueda instalarse con el comando `datadog-agent integration` y sea aceptada en los repositorios de [integraciones-extras][7] o [integraciones-principales][9] de Datadog) requiere más trabajo que una integración privada. Estas integraciones deben superar todos los pasos de `ddev validate`, deben disponer de tests utilizables y deben someterse a una revisión del código. La persona que crea el código debe encargarse activamente de la integración y es responsable de garantizar su funcionalidad.

El objetivo inicial es generar un código que recopile las métricas deseadas de forma fiable y asegurarse de que el marco general de integración es el correcto. Empieza escribiendo la funcionalidad básica como un check personalizado y, a continuación, rellena los detalles del marco en [Crear una integración del Agent][13].

Luego, abre una solicitud pull en el [repositorio de `integrations-extras`][7]. Esto indica a Datadog que estás listo para que empiecen a revisar el código juntos. No te preocupes si tienes preguntas acerca de los tests, los aspectos internos de Datadog u otros temas. El equipo del ecosistema de Datadog está listo para ayudarte y la solicitud pull es un buen lugar para abordar estas preocupaciones. 

Una vez que se han validado la funcionalidad, el cumplimiento del marco y la calidad general del código de la integración, esta se integra a `integrations-extras`, donde pasa a formar parte del ecosistema Datadog. 

A la hora de decidir cómo enviar datos no compatibles a Datadog, las principales consideraciones son el esfuerzo (tiempo de desarrollo) y el presupuesto (coste de métricas personalizadas). Si estás intentando ver datos que no son compatibles con Datadog, empieza por decidir qué método es el más lógico para empezar a enviar datos:

| Tipo                | Esfuerzo | Métricas personalizadas | Lenguaje |
|---------------------|--------|----------------|----------|
| DogStatsD           | Más bajo | Sí            | Cualquiera      |
| Check personalizado        | Bajo    | Sí            | Python   |
| Integración privada | Medio | Sí            | Python   |
| Integración pública  | Alto   | No             | Python   |

### ¿Por qué crear una integración?

Los [checks personalizados</txprotected>][1] son geniales para informes ocasionales o en los casos en los que el origen de los datos es único o muy limitado. Para casos de uso más general, como marcos de aplicaciones, proyectos de código abierto o software de uso común, tiene más sentido escribir una integración.

Las métricas informadas por las integraciones aceptadas no se contabilizan como métricas personalizadas y, por tanto, no afectan a la asignación de métricas personalizadas. (Las integraciones que emiten métricas potencialmente ilimitadas pueden seguir considerándose personalizadas.) Garantizar la compatibilidad nativa con Datadog reduce la fricción relativa a la adopción e incentiva el uso de tu producto, servicio o proyecto. Además, formar parte del ecosistema Datadog es una buena forma de mejorar la visibilidad.

### ¿Cuál es la diferencia entre un check personalizado y un check de servicio?

El [check personalizado][11], también conocido como check personalizado del Agent, te permite enviar datos internos de servicios a Datadog. El [check de servicio][12] es mucho más sencillo y te permite monitorizar el estado en ascenso o en descenso del servicio específico. Aunque ambos son checks, tienen diferentes funcionalidades y pueden utilizarse juntos o por separado, en función de tus necesidades de monitorización. Para obtener más información sobre cada uno de ellos, consulta las secciones con la documentación de los [checks personalizados][11] y los [check de servicios][12].

### Envío de métricas por tipos de integración 

{{< whatsnext desc="Aprende a enviar tus propias métricas a Datadog:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: información general de las funciones de DogStatsD, incluyendo la configuración, el formato de datagrama y el envío de datos.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>Check personalizado del Agent</u>: aprende cómo informar sobre métricas, eventos y checks de servicios utilizando tu propio check personalizado.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>Check personalizado de OpenMetrics</u>: aprende cómo informar sobre tu check de OpenMetrics utilizando un check personalizado del Agent.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>Integraciones</u>: para las tareas más complejas, crea una integración pública o privada de Datadog. Las integraciones públicas se pueden compartir con la comunidad.{{< /nextlink >}}
{{< /whatsnext >}}

### Envío de datos por tipos de datos

{{< whatsnext desc="Descubre los tipos de datos que puedes enviar a Datadog y aprende a enviarlos:" >}}
    {{< nextlink href="/metrics" >}}<u>Métricas personalizadas</u>: una profundización en las métricas personalizadas de Datadog. Esta sección describe los tipos de métricas, lo que estas representan, cómo enviarlas y cómo son utilizadas por Datadog.{{< /nextlink >}}
    {{< nextlink href="service_management/events/guides/" >}}<u>Eventos</u>: descubre cómo enviar eventos a Datadog utilizando checks personalizados del Agent, DogStatsD o la API de Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>Checks de servicios</u>: descubre cómo enviar los estados de ascenso y descenso de un servicio específico a Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Involucrarse con la comunidad de desarrolladores

{{< whatsnext desc="Descubre cómo involucrarte con la comunidad de desarrolladores de Datadog:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>Bibliotecas</u>: lista de bibliotecas oficiales o de contribución comunitaria para la API de Datadog, el cliente de DogStatsD, APM y Continuous Profiler, y las integraciones comunitarias con soporte externo para una amplia variedad de plataformas.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>Guías</u>: lee prácticos artículos sobre detalles técnicos, ejemplos de código y documentación de referencia.{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: https://www.datadoghq.com/partner/
[3]: /es/developers/dogstatsd/
[4]: /es/developers/custom_checks/write_agent_check/
[5]: /es/developers/custom_checks/prometheus/
[6]: /es/developers/integrations/
[7]: https://github.com/DataDog/integrations-extras
[8]: https://www.datadoghq.com/pricing/
[9]: https://github.com/DataDog/integrations-core
[10]: /es/developers/integrations/marketplace_offering
[11]: /es/developers/custom_checks/
[12]: /es/developers/service_checks/
[13]: /es/developers/integrations/agent_integration