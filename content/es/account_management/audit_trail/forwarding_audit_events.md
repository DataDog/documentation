---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentación
  text: Obtener más información sobre Audit Trail
title: Reenvío de eventos de auditorías a destinos personalizados
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
El reenvío de eventos de auditorías no está disponible en el sitio US1-FED.
</div>
{{% /site-region %}}

{{% site-region region="US,US3,US5,EU,AP1" %}}
<div class="alert alert-warning">El reenvío de eventos de auditorías está en fase beta. </div>
{{% /site-region %}}

## Información general

El reenvío de eventos de auditorías te permite enviar eventos de auditorías desde Datadog a destinos personalizados como Splunk, Elasticsearch y endpoints HTTP. Los eventos de auditorías se reenvían en formato JSON. Puedes añadir hasta tres destinos para cada organización de Datadog.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="Sección de destinos personalizados que muestra un destino Login-Event-to-SIEM activo con 10,4 MB de eventos de auditoría estimados durante las últimas 24 horas y @action:login como consulta para filtrar." >}}

**Nota**: Sólo los usuarios de Datadog con el permiso `audit_trail_write` pueden crear, editar o eliminar destinos personalizados para reenviar eventos de auditorías.

## Configurar el reenvío de eventos de auditorías a destinos personalizados

1. Si es necesario, añade IP de webhooks de la [lista de rangos IP][1] a la lista de autorizaciones.
2. Ve a [Configuración de Audit Trail][2].
3. Haz clic en **Add Destination** (Añadir el destino), en la sección **Audit Event Forwarding** (Reenvío de eventos de auditorías).
4. Introduce la consulta para filtrar tus eventos de auditorías y reenviarlos. Por ejemplo, añade `@action:login` como consulta para filtrar, si sólo quieres reenviar eventos de inicio de sesión a tu SIEM o destino personalizado. Consulta [Sintaxis de búsqueda][3] para obtener más información.
5. Seleccione el **Destination Type** (Tipo de destino).

{{< tabs >}}
{{% tab "HTTP" %}}

6. Introduce un nombre para el destino.
7. En el campo **Define endpoint** (Definir el endpoint), introduce el endpoint al que quieres enviar los logs. El endpoint debe empezar por `https://`.
    - Por ejemplo, si quieres enviar logs a Sumo Logic, consulta la [documentación de configuración de un origen HTTP para logs y métricas][1] a fin de obtener la dirección URL HTTP de origen para enviar datos a su recopilador. Introduce la dirección URL HTTP de origen en el campo **Define endpoint** (Definir el endpoint).
8. En la sección **Configure Authentication** (Configurar la autenticación), selecciona uno de los siguientes tipos de autenticación y proporciona los datos apropiados:
    - Autenticación básica: Proporciona el nombre de usuario y la contraseña de la cuenta a la que quieres enviar los logs.
    - Encabezado de la solicitud: Proporciona el nombre y el valor del encabezado. Por ejemplo, si utilizas el encabezado Authorization (Autorización) y el nombre de usuario de la cuenta a la que quieres enviar los logs, será `myaccount` y la contraseña `mypassword`:
        - Introduce `Authorization` para el **Header Name** (Nombre del encabezado).
        - El valor del encabezado tiene el formato `Basic username:password`, donde `username:password` está codificado en base64. En este ejemplo, el valor del encabezado es `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 
  9. Haz clic en **Save** (Guardar).

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Introduce un nombre para el destino.
7. En la sección **Configure Destination** (Configurar el destino), introduce el endpoint al que quieres enviar los logs. El endpoint debe empezar por `https://`. Por ejemplo, introduce `https://<your_account>.splunkcloud.com:8088`. **Nota: `/services/collector/event` se añade automáticamente al endpoint.
8. En la sección **Configure Authentication** (Configurar la autenticación), introduce el token HEC Splunk. Consulta [Configurar y utilizar un recopilador de eventos HTTP][1] para obtener más información sobre el token HEC Splunk.
9. Haz clic en **Save** (Guardar).

**Nota**: El [reconocimiento del indizador][2] debe estar deshabilitado.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Introduce un nombre para el destino.
7. En la sección **Configure Destination** (Configurar el destino), introduce los siguientes datos:

   a. El endpoint al que quieres enviar los logs. El endpoint debe empezar por `https://`. Un ejemplo de endpoint para Elasticsearch es: `https://<your_account>.us-central1.gcp.cloud.es.io`.

   b. El nombre del índice de destino al que quieres enviar los logs.

   c. Opcionalmente, selecciona la rotación de índices para definir la frecuencia con la que quieres crear un nuevo índice: `No Rotation`, `Every Hour`, `Every Day`, `Every Week` o `Every Month`. El valor predeterminado es `No Rotation`.

8. En la sección **Configure Authentication** (Configurar la autenticación), introduce el nombre de usuario y la contraseña de tu cuenta de Elasticsearch.
9. Haz clic en **Save** (Guardar).

{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /es/logs/explorer/search_syntax/