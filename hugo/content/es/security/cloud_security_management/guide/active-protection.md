---
further_reading:
- link: security/workload_protection/workload_security_rules
  tag: Documentación
  text: Reglas de detección de Workload Protection
title: Bloquear de forma proactiva las amenazas de minería de criptomonedas con Active
  Protection
---

<div class="alert alert-danger">Ponte en contacto con el <a href="https://docs.datadoghq.com/help/">servicio de asistencia de Datadog</a> para activar Active Protection.</div>

<div class="alert alert-info">Active Protection de Workload Protection está en vista previa.</div>

En este tema se explica cómo utilizar la función **Active Protection** de Workload Protection para bloquear automáticamente las amenazas de minería de criptomonedas. 

En forma predeterminada, todas las [reglas de detección de amenazas][4] predefinidas del Agent están habilitadas y activas para la monitorización contra amenazas criptográficas. 

Active Protection te permite bloquear y terminar proactivamente las amenazas de minería de criptomonedas identificadas por las reglas de detección de amenazas de Datadog Agent.

Active Protection agiliza la detección de amenazas y la respuesta específica, lo que se traduce en una reducción de los riesgos y permite a los equipos de DevSecOps y de seguridad hacer frente con eficacia a las amenazas cambiantes de la minería de criptomonedas:

- La seguridad decide qué amenazas justifican una acción automatizada.
- DevOps decide qué aplicaciones y recursos son lo suficientemente resistentes como para soportar una protección específica.

El resultado final es la detección de amenazas de minería de criptomonedas, seguida de una mitigación detallada inmediata contra ataques de alta confianza y verdaderos positivos.

## RBAC para Active Protection

A continuación se indican algunos [roles y permisos][11] importantes que se deben utilizar para las reglas personalizadas y Active Protection RBAC:

- El permiso `security_monitoring_cws_agent_rules_actions` se puede utilizar para activar y configurar la función de Active Protection.
  - Para utilizar el permiso `security_monitoring_cws_agent_rules_actions`, un usuario con el rol de Administrador de Datadog debe crear un rol que contenga el permiso `security_monitoring_cws_agent_rules_actions` y, a continuación, añadir a este rol solo a los usuarios que gestionan Active Protection.
- El rol **Datadog Standard** permite a los usuarios crear/actualizar una regla personalizada predeterminada, siempre y cuando la operación no cambie la configuración de **protección** de la regla.

## Opciones de protección

Dispones de tres opciones para las reglas del Agent:

- **Monitorización:** esta es la configuración predeterminada para las reglas activadas, independientemente de si Active Protection está activada. El Agent monitoriza la regla activada y muestra las detecciones en [Señales][1].
- **Bloqueo:** 
  - El bloqueo está disponible cuando Active Protection está activada. El bloqueo está disponible en reglas predefinidas seleccionadas que tienen alta confianza, verdaderos positivos.
  - El Agent monitoriza la regla activada, finaliza las acciones correspondientes al instante y muestra las detecciones en [Señales][1].
- **Desactivado:** el Agent no monitoriza los eventos de regla y no envía detecciones al backend de Datadog.

<div class="alert alert-info">El bloqueo se aplica a todas las amenazas detectadas después de activar el bloqueo. El bloqueo no es retroactivo.</div>

## Disponibilidad de Active Protection

Active Protection se activa a nivel de organización.

<div class="alert alert-info">La funcionalidad de bloqueo de Active Protection solo está disponible en un subconjunto de reglas predefinidas del Agent. La monitorización de reglas del Agent se ejecuta independientemente de si Active Protection está activada.</div>

Para comprobar si Active Protection ya está activada en tu organización, ve a [Configuración del Agent][2] . Si Active Protection está activada, aparecerá una columna **Protection** (Protección) en la lista de reglas del Agent.

{{< img src="security/cws/guide/protection-column.png" alt="La columna de protección indica que Active Protection está activada en la organización" style="width:100%;" >}}

Si Active Protection está disponible para una regla de minería de criptomonedas, entonces **Monitoring** (Monitorización) o **Blocking** (Bloqueo) aparece en la columna **Protection** (Protección).

Si no aparece **Monitoring** (Monitorización) o **Blocking** (Bloqueo) en la columna **Protection** (Protección), entonces Active Protection aún no está disponible para esa regla de minería de criptomonedas.

Cuando Active Protection está activada y se aplica a una regla de minería de criptomonedas que generó una señal, se puede ver haciendo lo siguiente:

1. En [Señales][1], abre una señal.
2. En la señal, ve **Next Steps** (Siguientes pasos).
   - Si Active Protection está activada, en **Proactively block threats** (Bloquear amenazas de forma proactiva), aparece **Active Protection Enabled** (Active Protection activada).
   - Si Active Protection no está activada, no se muestra **Active Protection Enabled** (Active Protection activada).

Si Active Protection está activada y disponible para una regla de minería de criptomonedas del Agent, puedes verla al consultar la regla:

1. En [Configuración del Agent][2], selecciona una regla de minería de criptomonedas.
2. En la regla de minería de criptomonedas, si Active Protection está activada y disponible, hay una sección **Protection** (Protección).

## Activar Active Protection

Cuando activas Active Protection, estás activando la capacidad de Active Protection para toda tu organización de Datadog. Active Protection no se limita a usuarios individuales.

Por defecto, todas las reglas predefinidas de minería de criptomonedas del Agent se encuentran en un estado de monitorización. La activación de Active Protection no cambia inmediatamente el estado predeterminado. Activar Active Protection te permite cambiar el estado de una regla de minería criptomonedas de monitorización a bloqueo.

En consecuencia, no debes preocuparte de que la activación de Active Protection cambie inmediatamente el estado de la detección de amenazas.

Para activar Active Protection:

1. Ve a a las reglas de [Configuración del Agent][2] de Cloud Security.
2. Selecciona **Enable Active Protection** (Activar Active Protection).

    {{< img src="security/cws/guide/enable-active-protection.png" alt="Botón Activar Active Protection" style="width:100%;" >}}

Una vez activada Active Protection, la lista de reglas de configuración del Agent contiene una columna **Protección** (Protección).

La columna **Protection** (Protección) indica si una regla está en estado de **Monitoring** (Monitorización) o **Blocking** (Bloqueo). Cuando activas Active Protection por primera vez, las reglas solo están en estado de monitorización. Debes configurar la opción de bloqueo manualmente.

### Desactivar Active Protection

Una vez activada Active Protection, puedes desactivarla en cada regla de configuración del Agent.

## Bloquear las amenazas detectadas por una regla del Agent 

Una vez activada Active Protection, puedes configurar la opción **Blocking** (Bloqueo) en una regla de minería de criptomonedas del Agent, y el Agent terminará estas acciones correspondientes instantáneamente.

Para activar el bloqueo en una regla del Agent:

1. En [Configuración del Agent][2] , abre una regla de minería de criptomonedas que tenga **Monitoring** (Monitorización) en la columna **Protection** (Protección). Si no está **Monitoring** (Monitorización) o **Blocking** (Bloqueo) en la columna **Protection** (Protección), entonces Active Protection aún no está disponible para esa regla.
2. En la regla del Agent, en **Protection** (Protección), selecciona **Blocking** (Bloqueo).

   {{< img src="security/cws/guide/protection-blocking-option.png" alt="La sección Protección de una regla del Agent que muestra la opción Bloqueo" style="width:100%;" >}}
3. En **Where** (Dónde), selecciona **Everywhere** (En cualquier lado) o **Custom** (Personalizado). Para obtener más información sobre estas opciones, consulta [Alcance de la regla del Agent ][3] a continuación.
4. Selecciona **Save Changes** (Guardar cambios).
5. En la Configuración del Agent, selecciona **Deploy Agent Policy** (Desplegar política del Agent).


### Alcance de la regla del Agent 

Al crear o editar una regla de minería de criptomonedas del Agent después de activar Active Protection, puedes seleccionar **Blocking** (Bloqueo) en la configuración de **Protection** (Protección) de la regla. 

Cuando seleccionas **Blocking** (Bloqueo), puedes limitar donde Datadog debe aplicar la regla usando las opciones **Everywhere** (En todas partes) y **Custom** (Personalizado).

#### En todas partes

La regla se aplica a todos los servicios, hosts e imágenes.

#### Personalizado

En **Custom** (Personalizado), puedes especificar servicios o etiquetas (tags) para generar automáticamente una expresión sobre dónde aplicar la protección de bloqueo.

<div class="alert alert-info">Cualquier servicio o imagen que no coincida con la expresión no se bloquea, pero sigue siendo monitorizado.</div>

Puedes utilizar servicios y etiquetas para generar una expresión. Datadog coincide con la regla que utiliza los servicios o etiquetas que proporciones.

- **Servicios**: introduce uno o varios nombres de servicio. Puedes utilizar comodines. Por ejemplo, si introduces `a*` se genera la expresión `process.envp in ["DD_SERVICE=a*"]`.
- **Etiquetas:** introduce una o más etiquetas para las imágenes de contenedor. Si introduces varias etiquetas, todas las etiquetas deben coincidir para que se aplique la **Protección**. Hay dos opciones:
  - `image_tag`: la etiqueta de imagen solamente. Por ejemplo, `stable-perl`.
  - `short_image`: el nombre de la imagen sin una etiqueta. Por ejemplo, `nginx`.
  - Por ejemplo, se puede hacer referencia a una imagen de registro del contenedor de Github como `ghcr.io/MY_NAMESPACE/MY_IMAGE:2.5` utilizando:
    - `image_tag`: `2.5`.
    - `short_image`: `MY_IMAGE`.

## Ejemplo de ataque bloqueado

Una vez activada Active Protection y configurada como **Blocking** (Bloqueo) para una regla del Agent, las amenazas bloqueadas aparecen en [Señales][1].

Una señal de amenaza bloqueada contiene los mensajes `SECURITY RESPONSE` y `The malicious process <THREAT NAME> has automatically been killed.`:

{{< img src="security/cws/guide/active-protection-signal-messages.png" alt="Mensajes de señal" style="width:100%;" >}}


[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[3]: #scoping-the-agent-rule
[4]: /es/security/workload_protection/workload_security_rules