---
description: Reenvíe eventos de auditoría desde Datadog a destinos personalizados
  como Splunk, Elasticsearch y puntos de conexión HTTP para el cumplimiento y la supervisión
  de seguridad.
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentación
  text: Obtenga más información sobre Audit Trail
title: Reenvío de eventos de auditoría a destinos personalizados
---
## Descripción general {#overview}

Audit Event Forwarding le permite enviar eventos de auditoría desde Datadog a destinos personalizados como Splunk, Elasticsearch y puntos de conexión HTTP. Los eventos de auditoría se reenvían en formato JSON. Puede agregar hasta tres destinos para cada organización de Datadog.

Audit Trail incluye el reenvío de hasta 500 millones de eventos de auditoría por mes para cada organización. El uso por encima de este límite puede estar sujeto a facturación adicional.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="La sección Custom Destinations muestra un destino activo Login-Event-to-SIEM con un volumen estimado de 10.4 MB de eventos de auditoría en las últimas 24 horas y @action:login como consulta de filtrado." >}}

**Nota**: Solo los usuarios de Datadog con el permiso `audit_trail_write` pueden crear, editar o eliminar destinos personalizados para el reenvío de eventos de auditoría.

## Configure el reenvío de eventos de auditoría a destinos personalizados {#set-up-audit-event-forwarding-to-custom-destinations}

1. Agregue las direcciones IP de webhook de la [lista de rangos de IP][1] a la lista de permitidos si es necesario.
2. Vaya a [Audit Trail Settings][2].
3. Haga clic en {{< ui >}}Add Destination{{< /ui >}} en la sección {{< ui >}}Audit Event Forwarding{{< /ui >}}.
4. Ingrese la consulta para filtrar sus eventos de auditoría para el reenvío. Por ejemplo, agregue `@action:login` como la consulta para filtrar si solo desea reenviar eventos de inicio de sesión a su SIEM o destino personalizado. Consulte [Sintaxis de búsqueda][3] para obtener más información.
5. Seleccione {{< ui >}}Destination Type{{< /ui >}}.

{{< tabs >}}
{{% tab "HTTP" %}}

6. Ingrese un nombre para el destino.
7. En el campo {{< ui >}}Define endpoint{{< /ui >}}, ingrese el punto de conexión al que desea enviar los registros. El punto de conexión debe comenzar con `https://`.
    - Por ejemplo, si desea enviar registros a Sumo Logic, siga su [documentación sobre cómo configurar una fuente HTTP para registros y métricas][1] para obtener la URL de la dirección de la fuente HTTP a la cual enviar datos a su recopilador. Ingrese la URL de la dirección de la fuente HTTP en el campo {{< ui >}}Define endpoint{{< /ui >}}.
8. En la sección {{< ui >}}Configure Authentication{{< /ui >}}, seleccione uno de los siguientes tipos de autenticación y proporcione los detalles pertinentes:
    - Autenticación básica: proporcione el nombre de usuario y la contraseña de la cuenta a la que desea enviar los registros.
    - Encabezado de solicitud: proporcione el nombre y el valor del encabezado. Por ejemplo, si utiliza el encabezado Authorization y el nombre de usuario para la cuenta a la que desea enviar los registros es `myaccount` y la contraseña es `mypassword`:
        - Ingrese `Authorization` para el {{< ui >}}Header Name{{< /ui >}}.
        - El valor del encabezado tiene el formato `Basic username:password`, donde `username:password` está codificado en base64. Para este ejemplo, el valor del encabezado es `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 
  9. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Ingrese un nombre para el destino.
7. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese el punto de conexión al cual desea enviar los registros. El punto de conexión debe comenzar con `https://`. Por ejemplo, ingrese `https://<your_account>.splunkcloud.com:8088`. **Nota**: `/services/collector/event` se añade automáticamente al punto de conexión.
8. En la sección {{< ui >}}Configure Authentication{{< /ui >}}, ingrese el token HEC de Splunk. Consulte [Configurar y usar el recopilador de eventos HTTP][1] para obtener más información sobre el token HEC de Splunk.
9. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota**: El [reconocimiento del indexador][2] debe estar deshabilitado.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Ingrese un nombre para el destino.
7. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese los siguientes detalles:
   1. El punto de conexión al que desea enviar los registros. El punto de conexión debe comenzar con `https://`. Un ejemplo de punto de conexión para Elasticsearch: `https://<your_account>.us-central1.gcp.cloud.es.io`.
   1. El nombre del índice de destino donde desea enviar los registros.   
   1. Opcionalmente, seleccione la rotación de índice para definir con qué frecuencia desea crear un nuevo índice: `No Rotation`, `Every Hour`, `Every Day`, `Every Week` o `Every Month`. El valor predeterminado es `No Rotation`.
8. En la sección {{< ui >}}Configure Authentication{{< /ui >}}, ingrese el nombre de usuario y la contraseña de su cuenta de Elasticsearch.
9. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

<div class="alert alert-info">El reenvío de registros a Microsoft Sentinel se encuentra en Preview.</div>

6. Ingrese un nombre para el destino.
7. La autenticación de Microsoft Sentinel Forwarder requiere configurar un App Registration mediante Datadog Azure Integration.
8. En la sección {{< ui >}}Configure Destination{{< /ui >}}, ingrese los siguientes detalles:
  | Configuración                   | Descripción                                                                                                          | Ejemplo                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | Ingrese el punto de conexión en el Data Collection Endpoint (DCE) donde se envían los registros. Esto está etiquetado como \"Logs Ingestion\" en la página de descripción general del DCE. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | Especifique el ID inmutable de la Regla de recopilación de datos (DCR) donde se definen las rutas de registro, tal como se encuentra en la página de descripción general de la DCR como \"Immutable Id\".  **Nota**: Asegúrese de que el rol de Publicador de métricas de supervisión esté asignado en la configuración de IAM de la DCR. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| Proporcione el nombre de la Declaración de flujo de destino que se encuentra en el JSON de recursos de la DCR en `streamDeclarations`.  | `Custom-MyTable`                                          |

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /es/logs/explorer/search_syntax/