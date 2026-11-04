---
description: Aprenda cómo Bits Release valida sus solicitudes de extracción en producción
  después de la implementación e informa si el cambio se comportó según lo previsto.
further_reading:
- link: https://www.datadoghq.com/blog/bits-release/
  tag: Blog
  text: Valide cada lanzamiento en producción con Bits Release
- link: /bits_ai/bits_code/
  tag: Documentación
  text: Automatice las correcciones de código con Bits Code
- link: /integrations/github/
  tag: Documentación
  text: Configure Datadog GitHub App
- link: /source_code/service-mapping/
  tag: Documentación
  text: Vincule sus servicios al código fuente con el mapeo de servicios
title: Bits Release
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-release/" >}}
  Bits Release está en Preview. Haga clic en {{< ui >}}Request Access{{< /ui >}} para unirse al programa Preview.
{{< /callout >}}

Bits Release valida que una solicitud de extracción combinada se comporte según lo previsto en producción. Aprende qué se suponía que debía hacer su cambio, observa el servicio una vez que ese cambio está activo e informa un veredicto sobre la solicitud de extracción y en Slack.

Las verificaciones de lanzamiento estándar rara vez cubren el comportamiento específico al que apunta un cambio. Un tablero observado durante unos minutos muestra que el servicio está activo, y es posible que nunca se active una alerta para la función que cambió. Por lo tanto, un cambio que se lanzó con errores o sin efecto alguno puede pasar desapercibido durante días. Bits Release verifica ese comportamiento directamente, en cada combinación.

Bits Release no modifica su código ni agrega instrumentación permanente. Lee los datos de observabilidad que ya envía a Datadog. Cuando una verificación debe ejecutarse con el tiempo, crea recursos temporales y los elimina cuando finaliza la validación.

{{< img src="bits_release/bits_release_demo.mp4" alt="Video que explica una validación de Bits Release: se implementa una solicitud de extracción combinada en producción, comienza la validación y llega un veredicto con la evidencia que lo respalda" video="true" style="width:100%;" >}}

## Cómo funciona Bits Release {#how-bits-release-works}

1. **Detectar la combinación**: Bits Release detecta una solicitud de extracción cuando se combina con la rama predeterminada de un repositorio incluido en el contexto.
2. **Analizar el cambio**: Lee el cambio de código junto con sus datos de producción para determinar para qué es el cambio: el efecto que debería tener en producción una vez que se implemente (impacto esperado) y el comportamiento que debería dejar intacto (riesgo de regresión esperado).
3. **Esperar la implementación**: La validación espera hasta que Bits Release confirme que su solicitud de extracción se está ejecutando en producción.
4. **Evaluar la producción**: Bits Release mide la producción frente a lo que esperaba hasta que llega a un veredicto. Luego entrega el veredicto como un comentario en la solicitud de extracción, una notificación de Slack y un informe completo en Datadog.

La validación se ejecuta en su entorno de producción.

### Fuentes de datos para Bits Release {#data-sources-for-bits-release}

Bits Release no requiere una fuente de datos dedicada. Valida su cambio con la telemetría principal de Datadog que sus servicios ya envían, principalmente [logs][3] y trazas de [APM][4] para servicios de backend y [RUM][5] para frontends web, y se adapta a lo que cada servicio tiene habilitado.

La cobertura depende de su instrumentación. Un cambio en el backend de un servicio con APM y logs obtiene evidencia más sólida que un cambio en el frontend de una aplicación sin RUM.

## Veredictos {#verdicts}

Una validación termina en uno de cuatro veredictos. **Passed** y **Failed** son conclusiones sobre su cambio. **Not enough data** e **Inconclusive** significan que Bits Release no pudo llegar a una conclusión y requieren su atención.

| Veredicto | Significado |
| ------- | ------- |
| **Passed** | Su servicio está en buen estado después de la implementación. Si se esperaba que su cambio hiciera que algo sucediera, Bits Release también observó que al menos una de esas cosas sucedió. Un servicio en buen estado por sí solo no es suficiente para aprobar un cambio que debía tener un efecto visible. Para un cambio sin nada específico que buscar, un servicio en buen estado es suficiente. |
| **Failed** | Bits Release tiene evidencia clara de que algo anda mal: su cambio causó una regresión, o el código modificado se ejecutó y el efecto que buscaba no se produjo o fue en la dirección contraria. Por ejemplo, el error que corrigió sigue ocurriendo, la latencia o la tasa de errores que quería mejorar no mejoró, o una nueva funcionalidad está generando errores. |
| **Not enough data** | La producción no le dio a Bits Release suficiente información para emitir un juicio. O no llegó telemetría relevante, o muy pocas solicitudes llegaron al código modificado para sacar una conclusión. Esto también incluye un servicio en buen estado en el que nada confirmó el efecto esperado, por ejemplo, porque su cambio se implementó durante horas de poca actividad, está detrás de una feature flag que aún está desactivada o afecta una ruta que no recibió tráfico mientras Bits Release la observaba. |
| **Inconclusive** | Hubo suficientes datos, pero apuntan en diferentes direcciones, o no se pueden atribuir con certeza a su cambio y no a otra cosa que ocurrió al mismo tiempo. |

Mientras se ejecuta una validación, se muestra como **In Progress**. Se muestra como **Pending** cuando Bits Release ya tiene una respuesta provisional pero la retiene porque la ventana de observación aún es corta o no ha llegado una señal que necesita. En ambos casos, sigue observando e informa cuando tiene más información.

Bits Release informa cómo se comporta la producción después de un cambio. No identifica el código que se debe corregir. Utilice el contexto que recopiló durante la validación (el impacto esperado, la evidencia detrás del veredicto y la telemetría que leyó) como punto de partida para una corrección. Entregue el veredicto a [Bits Code][1] para investigar y abrir una solicitud de extracción, o utilice ese contexto en sus propias herramientas de codificación de IA.

## Requisitos previos {#prerequisites}

Bits Release lee el código que fusionó y detecta cuándo ese código está activo en producción. Solo admite repositorios de GitHub. Los repositorios alojados en GitLab, Azure DevOps o Bitbucket no son compatibles.

### Obligatorio {#required}

| Requisito | Por qué es necesario |
| ----------- | ---------------- |
| La [GitHub App][2] de Datadog instalada en los repositorios incluidos en el contexto, con `Contents: Read` y `Pull Requests: Write` | `Contents: Read` permite que Bits Release lea el cambio de código que está validando. `Pull Requests: Write` permite publicar el plan de validación y el veredicto en la solicitud de extracción, que es donde la mayoría de los desarrolladores ven el resultado. |
| Una etiqueta `version` en los servicios incluidos en el contexto | Identifica cada despliegue, para que Bits Release pueda saber cuándo ocurre uno nuevo. Los servicios lo informan con su telemetría de [APM][4] o [RUM][5]. |
| El SHA de confirmación desplegado en cada despliegue | Vincula un despliegue con el código que fusionó, que es lo que inicia la validación. Infórmelo ya sea como una etiqueta `git.commit.sha` en la telemetría del servicio, o como el SHA incluido dentro de la etiqueta `version`. Consulte el [mapeo de servicios][8] para configurar esto. |

### Recomendado {#recommended}

| Requisito | Lo que añade |
| ----------- | ------------ |
| [Integración con Slack][6] | Notifica directamente al autor de la solicitud de extracción cuando un veredicto está listo, en lugar de depender de que vea el comentario en la solicitud de extracción. |
| Una [prueba Synthetic][7] existente para el dominio de su aplicación | permite que Bits Release valide un cambio llamando activamente a su aplicación en lugar de esperar tráfico orgánico. Reutiliza el punto de entrada y el método de inicio de sesión que su prueba existente ya establece. |

## Dónde aparecen los resultados {#where-results-appear}

- **Comentarios en la solicitud de extracción**: Bits Release publica el plan de validación después del análisis, luego un comentario separado con el veredicto después de que se completa la evaluación, por lo que el veredicto genera una nueva notificación para el autor.
- **Slack**: Se notifica al autor de la solicitud de extracción cuando un veredicto está listo.
- **Bits Release en Datadog**: La página de Bits Release contiene el informe completo: la lista de validaciones, la línea de tiempo del ciclo de vida de cada plan, el veredicto y su razonamiento, los impactos esperados con la evidencia detrás de cada uno y los gráficos de métricas anotados con el marcador de despliegue. Durante la Preview, acceda a Bits Release mediante el enlace del comentario de su pull request. No está disponible en la navegación lateral de Datadog.

## Facturación {#billing}

Bits Release es gratuito durante la Preview. No consume [AI Credits][9], y los recursos temporales que crea mientras valida un cambio no se facturan.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_code/
[2]: /es/integrations/github/
[3]: /es/logs/
[4]: /es/tracing/trace_collection/
[5]: /es/real_user_monitoring/
[6]: /es/integrations/slack/
[7]: /es/synthetics/
[8]: /es/source_code/service-mapping/
[9]: /es/account_management/billing/ai_credits/