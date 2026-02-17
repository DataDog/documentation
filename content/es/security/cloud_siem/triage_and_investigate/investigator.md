---
aliases:
- /es/security_platform/cloud_siem/cloud_security_investigator/
- /es/security_platform/cloud_siem/cloud_siem_investigator/
- /es/security_platform/cloud_siem/investigator/
- /es/security/cloud_siem/cloud_security_investigator/
- /es/security/cloud_siem/cloud_siem_investigator/
- /es/security/cloud_siem/investigator/
further_reading:
- link: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
  tag: Documentación
  text: Configurar AWS para Cloud SIEM
- link: /cloud_siem/explorer/
  tag: Documentación
  text: Más información sobre Security Signals Explorer
- link: https://www.datadoghq.com/blog/visualize-cloud-activity-datadog-cloud-siem-investigator/
  tag: Blog
  text: Visualizar la actividad en tu entorno en la nube con Datadog Cloud SIEM Investigator
title: Investigador
---

## Información general

Cuando una señal de seguridad alerta sobre una actividad sospechosa de un usuario o un recurso, algunas preguntas habituales durante la investigación son:

- ¿El usuario accede a otras cuentas?
- ¿Qué otras acciones realizó el usuario en ese periodo concreto?
- ¿Qué acciones realiza el usuario sobre un recurso?
- ¿Qué usuarios han interactuado con este recurso?

Por ejemplo, supongamos que recibes una señal de seguridad de que alguien ha cambiado la configuración de un bucket de Amazon S3 para que todo el mundo pueda acceder a él, pero la acción fue realizada por un rol asumido. Para investigar, averigua quién realizó la acción y qué otras actividades realizó recientemente, ya que eso podría indicar que las credenciales están en peligro.

Cloud SIEM Investigator proporciona una interfaz gráfica para que puedas pasar de una entidad afectada a otra, de modo que puedas ver el comportamiento de los usuarios y su impacto en tu entorno.


## Visualizar e investigar la actividad

{{< tabs >}}
{{% tab "AWS" %}}

1. Ve a **Security** > **Cloud SIEM** (Seguridad > Cloud SIEM) y haz clic en la pestaña **Investigate** (Investigar) y luego en la pestaña [**AWS Investigator**][1].

2. Selecciona un tipo de entidad en el menú desplegable del campo **In** (En).

3. Selecciona una entidad o introduce un nombre de entidad específico en el campo **Investigate** (Investigar) para ver un diagrama de las actividades asociadas a la entidad.

4. Haz clic en un nodo y selecciona **View related logs** (Ver logs relacionados) o **View related signals** (Ver señales relacionadas) para investigar más. Utiliza el menú desplegable **Search for** (Buscar por) para filtrar por acciones.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=aws

{{% /tab %}}

{{% tab "GCP" %}}

1. Ve a **Security** > **Cloud SIEM** (Seguridad > Cloud SIEM) y haz clic en la pestaña **Investigate** (Investigar) y luego en la pestaña [**GCP Investigator**][1].

2. Selecciona un tipo de entidad en el menú desplegable del campo **In** (En).

3. Selecciona una entidad o introduce un nombre de entidad específico en el campo **Investigate** (Investigar) para ver un diagrama de las actividades asociadas a la entidad.

4. Haz clic en un nodo y selecciona **View related logs** (Ver logs relacionados) o **View related signals** (Ver señales relacionadas) para investigar más. Utiliza el menú desplegable **Search for** (Buscar por) para filtrar por acciones.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=gcp
{{% /tab %}}

{{% tab "Azure" %}}

1. Ve a **Security** > **Cloud SIEM** (Seguridad > Cloud SIEM) y haz clic en la pestaña **Investigate** (Investigar) y luego en la pestaña [**Azure Investigator**][1].

2. Selecciona un tipo de entidad en el menú desplegable del campo **In** (En).

3. Selecciona una entidad o introduce un nombre de entidad específico en el campo **Investigate** (Investigar) para ver un diagrama de las actividades asociadas a la entidad.

4. Haz clic en un nodo y selecciona **View related logs** (Ver logs relacionados) o **View related signals** (Ver señales relacionadas) para investigar más. Utiliza el menú desplegable **Search for** (Buscar por) para filtrar por acciones.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=azure
{{% /tab %}}

{{% tab "Datadog" %}}

1. Ve a **Security** > **Cloud SIEM** (Seguridad > Cloud SIEM) y haz clic en la pestaña **Investigate** (Investigar) y luego en la pestaña [**Datadog Investigator**][1].

2. Selecciona un tipo de entidad en el menú desplegable del campo **In** (En).

3. Selecciona una entidad o introduce un nombre de entidad específico en el campo **Investigate** (Investigar) para ver un diagrama de las actividades asociadas a la entidad.

4. Haz clic en un nodo y selecciona **View related Audit Trail** (Ver Audit Trail relacionado) o **View related signals** (Ver señales relacionadas) para investigar más. Utiliza el menú desplegable **Search for** (Buscar por) para filtrar por acciones.

[1]: https://app.datadoghq.com/security/siem/investigator?provider=datadog
{{% /tab %}}
{{< /tabs >}}

También puedes navegar hasta Cloud SIEM Investigator directamente desde una señal de seguridad. En el panel de señales de seguridad, haz clic en **Investigate user activity** (Investigar actividad del usuario) (donde `user` es la identidad de usuario en cuestión) para ver la vista de Investigator filtrada por la identidad de usuario específica.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}