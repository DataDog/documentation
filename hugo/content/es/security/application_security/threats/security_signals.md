---
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: Documentación
  text: Explorar las reglas predefinidas de detección de amenazas de AAP
- link: /security/application_security/policies/custom_rules/
  tag: Documentación
  text: Configurar reglas personalizadas de detección de amenazas de AAP
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: Documentación
  text: Inteligencia sobre amenazas de AAP
title: Investigar las señales de seguridad
---

## Información general

Las señales de seguridad de AAP se crean cuando Datadog detecta una amenaza basada en una regla de detección. Visualiza, busca, filtra e investiga las señales de seguridad en el [Signals Explorer][2] o configura [reglas de notificación][8] para enviar señales a herramientas de terceros.

{{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Información general de la investigación de amenazas en el explorador de señales con el panel lateral de detalles">}}

## Columnas del Signals Explorer

En el Signals Explorer se muestran las siguientes columnas.

Gravedad
: Existen cinco estados de gravedad: **Info**, **Bajo**, **Medio**, **Alto** y **Crítico**. **Alto** y **Crítico** indican un impacto importante en la disponibilidad de servicios o un compromiso activo.

Título
: El nombre de la señal. Los títulos pueden actualizarse cuando se correlacionan nuevos datos, alterando el impacto evaluado del ataque.

Servicio/Variable de entorno
: El servicio y el entorno identificados en el ataque. Pasa el mouse sobre el nombre del servicio para enlazar con la página de servicios y el repositorio de códigos y para ver quién está de guardia para el servicio.

Entidades
: Los atacantes y las víctimas de un ataque. Los atacantes se identifican mediante direcciones IP. Las víctimas se identifican como usuarios autenticados. Pasa el mouse sobre la lista de IP y haz clic en una IP para ver detalles como **Información sobre amenazas** y **Actividad de seguridad**.

Estado de clasificación
: Puedes asignar un respondedor y configurar un estado de clasificación para la señal. Los estados disponibles son **Abierto**, **En revisión** y **Archivado**.

Fecha de creación
: Fecha de creación de la señal. En forma predeterminada, las señales se ordenan por fecha.

## Filtrar las señales de seguridad

Para filtrar las señales de seguridad en el [Signals Explorer][2], utiliza la consulta de búsqueda `@workflow.triage.state:<status>` , donde `<status>` es el estado por el que deseas filtrar (`open`, `under_review` o `archived`). También puedes utilizar la faceta **Estado de la señal** del panel de facetas.

## Clasificación de una señal

Puedes clasificar una señal asignándola a un usuario para que la investigue. El usuario asignado puede hacer un rastreo de su revisión actualizando el estado de la señal.

1. En la página [Signals Explorer][2], haz clic en el ícono del perfil del usuario en la columna **Estado de clasificación**.
2. Selecciona un usuario para asignar la señal.
3. Para actualizar el estado de la señal de seguridad, haz clic en el menú desplegable de los estados de clasificación y selecciona un estado. El estado predeterminado es **Abierto**.
    - **Abierto**: la señal aún no se ha resuelto.
    - **En revisión**: la señal está siendo investigada activamente. Desde el estado **En revisión**, puedes mover la señal a **Archivado** o **Abierto** según sea necesario.
    - **Archivado**: la detección que causó la señal se ha resuelto. Desde el estado **Archivado**, puedes volver a mover la señal a **Abierto** si no han transcurrido más de 30 días desde que se detectó la señal originalmente.

**Nota**: Para modificar las señales de seguridad, debes tener el permiso `security_monitoring_signals_write`. Consulta [Control de acceso basado en roles][9] para obtener más información sobre los roles predeterminados de Datadog y los permisos de control de acceso granular basados en roles disponibles para App y API Protection.

## Declarar una incidencia

Utiliza [Gestión de incidencias][4] para crear una incidencia para una señal de seguridad.

Declara una incidencia si:

- Un problema afecta o podría afectar a los clientes.
- Crees que un problema (aunque sea interno) debe tratarse como una emergencia.

Si no sabes si debes declarar una incidencia, notifícalo a otros usuarios y aumenta la gravedad adecuadamente.

1. En la página [Signals Explorer][2], selecciona una señal de seguridad para abrir su panel de detalles.
2. En el panel de señales, haz clic en **Declarar una incidencia** o selecciona la flecha desplegable y elige **Añadir a una incidencia existente**.
3. Cuando declares una nueva incidencia, en los parámetros de **Declarar una incidencia**, configura la incidencia especificando detalles como el nivel de gravedad y el comandante de la incidencia.
   1. Estimación del impacto. Los niveles de gravedad van del SEV-1 (crítico) al SEV-5 (impacto menor). En caso de duda, elige siempre la gravedad más alta.
4. Haz clic en **Declarar una incidencia**

## Ejecutar un flujo de trabajo

Utiliza la [Automatización del flujo de trabajo][5] para activar manualmente un flujo de trabajo para una señal de seguridad.

1. Asegúrate de que el flujo de trabajo que deseas ejecutar tenga un activador de seguridad.
2. En la página [Signals Explorer][2], abre una señal de seguridad.
3. En la sección **Responder**, haz clic en **Ejecutar un flujo de trabajo**.
4. En **Ejecutar un flujo de trabajo**, selecciona el flujo de trabajo que deseas ejecutar o haz clic en **Nuevo flujo de trabajo**.
   - Según el flujo de trabajo que selecciones, es posible que debas introducir parámetros de entrada adicionales.
   - Si has seleccionado **Nuevo flujo de trabajo**, se abrirá Ejecutar un flujo de trabajo de seguridad. Para obtener más información sobre los flujos de trabajo, consulta [Automatización de flujos de trabajo][5].
5. Haz clic en **Run** (Ejecutar).

## Revisar y corregir

1. En la página [Signals Explorer][2], abre una señal de seguridad.
2. En los detalles de la señal, mira cada una de las secciones, como **Qué ha pasado**, **Resumen de actividades** y **Regla de detección**.
3. Revisa los **Siguientes pasos** y actúa:
    -  Haz clic en **Bloquear todas las IP atacantes** (por una duración específica o de modo permanente).
    -  Haz clic en **Automated Attacker Blocking** (Bloqueo automático de atacantes) (basado en reglas de [detección][10]). Esta configuración requiere el permiso **Protección contra escritura** de App and API Protection.
    -  Haz clic en **[Bloquear con Edge WAF][11]**.

## Acciones masivas

Cuando seleccionas una o más señales, puedes utilizar **Acciones masivas** para realizar lo siguiente.

### Configurar el estado

Configura el estado de clasificación en **Abierto**, **En revisión** o **Archivado**.

### Asignar la señal a los usuarios

Selecciona **Asignar selección** y, a continuación, selecciona el usuario o usuarios que deseas asignar a la señal.

Selecciona **Eliminar todas las asignaciones** para restablecer la asignación de señal a ninguna.

### Gestión de casos

La [gestión de casos][6] de Datadog ofrece un lugar centralizado para clasificar, rastrear y solucionar los problemas detectados por Datadog e integraciones de terceros.

1. En la página [Signals Explorer][2], selecciona una señal de seguridad.
2. En **Acciones masivas**, selecciona **Crear un caso**.
3. Selecciona **Crear un caso** o **Añadir a un caso existente** para añadir la señal a un caso existente.
4. Introduce un título y una descripción opcional.
5. Haz clic en **Crear un caso**.

Cuando hagas clic en **Crear un caso**, se te dirigirá a Gestión de casos y al proyecto que hayas seleccionado.

## Vistas guardadas

Puedes guardar diferentes configuraciones del Signals Explorer como vistas. Por ejemplo, puedes filtrar el explorador para que muestre todas las señales no asignadas y las guarde como una vista.

Cuando una configuración se guarda como una vista, tú y tus compañeros de equipo pueden utilizarla más tarde.

Una vista contiene las selecciones actuales del explorador para lo siguiente:

- Tiempo y consulta
- Columnas mostradas y orden
- Configuración de la agregación analítica
- Visibilidad de la escala de tiempo
- Facetas mostradas
- Agregación por regla de detección

1. Para guardar una vista, configura el explorador para mostrar la vista que deseas y, a continuación, haz clic en **Save** (Guardar).
2. Introduce un nombre para la vista y, a continuación, selecciona los equipos con los que deseas compartir la vista.
3. Haz clic en **Save** (Guardar).

Para ver todas las vistas guardadas, haz clic en **Vistas** junto al título de la página **Signals Explorer**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /es/service_management/incident_management/
[5]: /es/service_management/workflows/
[6]: /es/service_management/case_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /es/security/notifications/rules/
[9]: /es/account_management/rbac/permissions/#cloud-security-platform
[10]: /es/security/application_security/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /es/security/application_security/policies/#blocking-attack-attempts-with-in-app-waf
