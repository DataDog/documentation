---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: Blog
  text: Identificar automáticamente los problemas y generar correcciones con Bits
    AI Dev Agent
title: Bits AI Dev Agent
---

{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
Bits AI Dev Agent está en vista previa. Para inscribirte, haz clic en <strong>Solicitar acceso</strong> y rellena el formulario.
{{< /callout >}}

## Información general

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits AI Dev Agent sugiriendo una corrección para un IndexError en una aplicación Django" style="width:100%;">}}

Bits AI Dev Agent es un asistente de codificación de IA generativa que utiliza datos de observabilidad de Datadog para diagnosticar y corregir automáticamente problemas en el código. Se integra con GitHub para solicitudes de extracción listas para producción, itera sobre las correcciones utilizando logs de CI y opiniones de desarrolladores, y se basa en múltiples productos de Datadog para generar correcciones contextuales.

## Productos Datadog compatibles

Bits AI Dev Agent está disponible para los siguientes productos Datadog:

| Producto                   | Disponibilidad         | Funcionalidades                                                       |
|---------------------------|----------------------|--------------------------------------------------------------------|
| [Error Tracking][1]       | Vista previa              | Diagnostica problemas y genera correcciones de código bajo demanda o de forma autónoma|
| [Trace Explorer][11]      | Vista previa              | Analiza trazas (traces) y proporciona soluciones para errores y cuellos de botella de latencia |
| [Code Security][2]        | Vista previa              | Soluciona vulnerabilidades del código de forma individual o en bloque    |
| [Test Optimization][4]    | Vista previa              | Proporciona correcciones de código para tests defectuosos y comprueba si los tests permanecen estables                                                         |
| [Continuous Profiler][3]  | Vista previa              | Proporciona cambios de código para conocimientos de [análisis automatizado][10]                  |
| [Contenedores][12]          | Vista previa              | Proporciona cambios de código para recomendaciones sobre contenedores                  |

**Nota**: La activación de Bits AI Dev Agent es específica de cada producto. Aunque esté activada para un producto Datadog, debe activarse por separado para cada producto adicional que utilices.

## Capacidades clave 

En las siguientes secciones se explica en detalle cómo Bits AI Dev Agent se integra con los productos Datadog para generar correcciones de código contextuales.

### Asistencia para solicitudes de extracción

Bits AI Dev Agent se integra con GitHub para crear solicitudes de extracción, responder a comentarios, actualizar commits y corregir fallos de CI.

- Genera títulos y descripciones de solicitudes de extracción basados en tu plantilla de solicitudes de extracción.
- Abre las solicitudes de extracción como borradores, itera utilizando logs de CI y marca las solicitudes de extracción como listas para su revisión cuando se superan los checks.
- Continúa iterando en respuesta a los mensajes de chat y a los comentarios de revisión.

  **Nota**: Comentario `@Datadog` para solicitar a Bits actualizaciones de la solicitud de extracción. Bits Dev nunca auto-fusiona solicitudes de extracción.

Ve a **Bits AI** > **Dev Agent** > **[Sesiones de código][7]** para ver todas las sesiones de código de Dev Agent y las solicitudes de extracción generadas. Puedea buscar sesiones y filtrar por servicio, origen del producto y estado.

### Auto-push

Auto-push permite a Dev Agent crear ramas, enviar código y abrir solicitudes de extracción cuando detecta algo en lo que puede ayudarte. Por ejemplo, el Dev Agent puede:
- Crear solicitudes de extracción automáticamente para errores de alto impacto (como 500s o cuelgues).
- Actualizar las solicitudes de extracción en respuesta a tus comentarios en GitHub.
- Actualizar las solicitudes de extracción para solucionar fallos de CI.

Auto-push solo abre solicitudes de extracción y envía los cambios, pero nunca fusiona código. Cuando Auto-push está desactivado, debes revisar el código en Datadog antes de enviarlo.

Auto-push está disponible para Error Tracking y Test Optimization. 

#### Cuestiones de seguridad

Permitir que cualquier herramienta basada en IA lea datos no fiables puede permitir a los atacantes engañarla para que genere código malicioso u otros resultados. En algunos entornos, un atacante podría crear errores, trazas u otro tipo de telemetría que contenga cargas maliciosas que lea el Dev Agent. Datadog ejecuta análisis de seguridad en la salida del Dev Agent, pero no es infalible.

### Rastreo de errores

En [Error Tracking][1], Bits AI Dev Agent diagnostica y soluciona problemas de código con correcciones contextuales, comprobadas por la unidad:
- Determina si un error puede corregirse mediante código y genera una corrección con tests de la unidad.
- Proporciona enlaces en el chat a los archivos y métodos relevantes para agilizar la navegación.
- Analiza los errores de forma asíncrona a medida que llegan.
- Marca los errores con el estado **Corrección disponible** y permite filtrarlos para exhibirlos.

[Auto-push](#auto-push) está disponible para esta función.

### Gestión de tests defectuosos

Bits AI Dev Agent corrige los tests defectuosos que se detectan a través de Flaky Test Management en [Test Optimization][4] e intenta comprobar si los tests permanecen estables.

[Auto-push](#auto-push) está disponible para esta función. 

### Investigación de trazas

Bits AI Dev Agent depura errores y latencia directamente a partir de las [trazas][11] mediante consultas en lenguaje natural:
- Analiza y resume trazas de gran tamaño.
- Determina las causas probables de los errores y la latencia.
- Genera correcciones de código cuando se le solicita.

### Recomendaciones de productos

Bits AI Dev Agent aplica cambios automatizados en el código basándose en la información de Datadog, como las recomendaciones de CCM, las recomendaciones de APM y la información sobre generación de perfiles.

### Code security

Bits AI Dev Agent corrige vulnerabilidades a escala, desde problemas aislados hasta grandes backlogs. Puedes:
- Crear lotes de solicitudes de extracción para corregir varias vulnerabilidades a la vez.
- Utilizar la herramienta Campaña para enviar solicitudes de extracción de forma incremental y gestionar cargas de trabajo de revisión en los equipos.

## Para empezar

Para activar Bits AI Dev Agent, consulta [Configuración][6].

## Limitaciones

- Bits Dev es un producto de IA, lo que significa que puede cometer errores. Utiliza las prácticas recomendadas al revisar y probar código generado por el agente.
- Bits AI Dev Agent no admite investigaciones en varios repositorios.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking
[2]: /es/security/code_security
[3]: /es/profiler/
[4]: /es/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /es/bits_ai/bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code?tab=my-sessions
[8]: /es/bits_ai/bits_ai_sre/
[10]: /es/profiler/automated_analysis/
[11]: /es/tracing/trace_explorer/
[12]: /es/containers/