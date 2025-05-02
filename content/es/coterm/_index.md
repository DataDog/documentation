---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-coterm/
  tag: Blog
  text: Transmisión en directo, grabación y log de sesiones de terminal con Datadog
    CoTerm
title: Datadog CoTerm
---

Datadog CoTerm es una utilidad de CLI que puede grabar sesiones de terminal y añadir una capa de validación a tus comandos de terminal.

{{< img src="coterm/hero.png" alt="En Datadog, una página titulada Sesión de terminal. Un video insertado en el que se muestra una sesión de terminal. Una barra de depurador controla la reproducción del video" style="width:100%;" >}}

Con CoTerm, puedes:

- **Grabar sesiones de terminal y analizar estas grabaciones en Datadog**. 

   La investigación de las sesiones de terminal proporciona contexto sobre cómo se causaron y solucionaron las incidencias de seguridad y del sistema.
- **Protegerte contra la ejecución accidental de comandos de terminal peligrosos**.

   CoTerm puede interceptar comandos de terminal y avisarte antes de que ejecutes un comando riesgoso. Para una supervisión aún mayor, puedes utilizar CoTerm con [Datadog Case Management][3] para solicitar aprobaciones para comandos particularmente impactantes.

Para tu seguridad, CoTerm utiliza [Sensitive Data Scanner][2] para detectar y enmascarar datos confidenciales, como contraseñas y claves de API.

## Para empezar

{{< whatsnext desc="This section contains the following pages:">}}
  {{< nextlink href="/coterm/install">}}<u>Instalación</u>: Instala CoTerm y autorízalo a acceder a tu cuenta de Datadog.{{< /nextlink >}}
  {{< nextlink href="/coterm/usage">}}<u>Uso</u>: Utiliza la CLI de CoTerm, configura la grabación automática y protégete de comandos peligrosos. {{< /nextlink >}}
  {{< nextlink href="/coterm/rules">}}<u>Reglas de configuración</u>: Establece reglas altamente configurables para la gestión de comandos específicos por parte de CoTerm.{{< /nextlink >}}
{{< /whatsnext >}}

## Revisar las sesiones de terminal en Datadog

Puedes revisar las sesiones de terminal grabadas y los datos de proceso en Datadog:

- **Como repeticiones**: Mira [sesiones de terminal][6] en un reproductor similar a vídeo.
- **Como eventos**: En [Explorador de eventos][4], cada comando grabado aparece como un evento.
- **Como logs**: En [Explorador de logs][5], puedes realizar búsquedas de texto completo y consultas de sesiones de terminal como logs multilínea.

## Limitaciones conocidas

- La duración máxima de una sesión grabada es de aproximadamente 24 horas.
- El [difuminado de datos confidenciales][2] puede fallar si los datos confidenciales están repartidos en varias líneas.
- En Linux, el rastreo en `seccomp` impide elevar los permisos durante una grabación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/security/sensitive_data_scanner/
[3]: /es/service_management/case_management/
[4]: http://app.datadoghq.com/event/explorer?query=source%3Acoterm_process_info
[5]: https://app.datadoghq.com/logs?query=service%3Addcoterm
[6]: https://app.datadoghq.com/terminal-streams