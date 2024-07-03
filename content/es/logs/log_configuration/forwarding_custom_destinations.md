---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: Blog
  text: Dirigir logs a sistemas de terceros con el reenvío de logs de Datadog
- link: /logs/log_collection
  tag: Documentación
  text: Empezar con la recopilación de tus logs
- link: /logs/log_configuration/pipelines
  tag: Documentación
  text: Obtener más información sobre pipelines de logs
- link: /observability_pipelines/
  tag: Documentación
  text: Reenviar logs directamente desde tu entorno con pipelines de observabilidad
kind: documentación
title: Reenvío de logs a destinos personalizados
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
El reenvío de logs no está disponible para el sitio del Gobierno. Ponte en contacto con tu representante de cuenta para obtener más información.
</div>
{{% /site-region %}}

## Información general

El reenvío de logs te permite enviar logs desde Datadog a destinos personalizados como Splunk, Elasticsearch y endpoints HTTP. Esto significa que puedes utilizar [pipelines de logs][1] para recopilar, procesar y estandarizar tus logs de forma centralizada en Datadog. A continuación, puedes enviar los logs desde Datadog a otras herramientas para dar soporte a los flujos (streams) de trabajo de los equipos individuales. Puedes elegir reenviar cualquier log consumido, esté o no indexado, a destinos personalizados. Los logs se reenvían en formato JSON y se comprimen con GZIP.

**Nota**: Sólo los usuarios de Datadog con el permiso [`logs_write_forwarding_rules`][2] pueden [crear][6], [editar][7] y [eliminar][8] destinos personalizados para el reenvío de logs.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="Página de reenvío de logs que muestra los destinos personalizados resaltados. La lista de destinos incluye Splunk (filtrado por servicio: logs-processing), endpoint HTTP (filtrado por origen:okta OR source:paloalto) y Elasticsearch (filtrado por equipo:acme env:prod)." >}}

Si falla un intento de reenvío (por ejemplo: si el destino deja de estar disponible temporalmente), Datadog vuelve a intentarlo periódicamente durante 2 horas utilizando una estrategia de retraso exponencial. El primer intento se realiza tras un retraso de 1 minuto. En los siguientes reintentos, el retraso aumenta progresivamente hasta un máximo de 8 a 12 minutos (10 minutos con una variación del 20%).

Las siguientes métricas informan de los logs que se han reenviado correctamente, incluyendo los logs que se han enviado correctamente después de algunos reintentos, así como de los logs que se han descartado.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## Configurar el reenvío de logs a destinos personalizados

1. Añade las IPs de webhooks de {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} a la lista de permisos.
2. Ve a [Log Forwarding (Reenvío de logs)][4].
3. Selecciona **Custom Destinations** (Destinos personalizados).
4. Haz clic en **New Destination** (Nuevo destino).
5. Introduce la consulta para filtrar tus logs para el reenvío. Para obtener más información, consulta [Sintaxis de búsqueda para logs][5].
6. Selecciona el **Destination Type** (Tipo de destino).

{{< img src="logs/log_configuration/forwarding/tag-forwarding.png" alt="Página de configuración del destino que muestra los pasos para configurar un nuevo destino" style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

6. Introduce un nombre para el destino. 
7. En el campo **Define endpoint** (Definir el endpoint), introduce el endpoint al que quieres enviar los logs. El endpoint debe empezar por `https://`.
    - Por ejemplo, si quieres enviar logs a Sumo Logic, consulta la [documentación de configuración de un origen HTTP para logs y métricas][1] a fin de obtener la dirección URL HTTP de origen para enviar datos a su recopilador. Introduce la dirección URL HTTP de origen en el campo **Define endpoint** (Definir el endpoint).
8. En la sección **Configure Authentication** (Configurar la autenticación), selecciona uno de los siguientes tipos de autenticación y proporciona los datos apropiados:
    - Autenticación básica: proporciona el nombre de usuario y la contraseña de la cuenta a la que quieres enviar los logs.
    - Encabezado de la solicitud: proporciona el nombre y el valor del encabezado. Por ejemplo, si utilizas el encabezado Autorización, y el nombre de usuario de la cuenta a la que quieres enviar logs es `myaccount` y la contraseña es `mypassword`: 
        - Introduce `Authorization` para el **Nombre del encabezado**. 
        - El valor del encabezado tiene el formato `Basic username:password`, donde `username:password` está codificado en base64. En este ejemplo, el valor del encabezado es `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`. 

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. Introduce un nombre para el destino.
7. En la sección **Configurar Destino**, introduce el endpoint al que quieres enviar los logs. El endpoint debe empezar por `https://`. Por ejemplo, introduce`https://<your_account>.splunkcloud.com:8088`.  
    **Nota**: `/services/collector/event` se añade automáticamente al endpoint.
8. En la sección **Configurar autenticación**, introduce el token Splunk HEC. Para obtener más información sobre el token Splunk HEC, consulta [Configurar y utilizar el recopilador de eventos HTTP][1].  
   **Nota**: El [reconocimiento del indexador][2] debe estar deshabilitado.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. Introduce un nombre para el destino.
7. En la sección **Configurar Destino**, introduce los siguientes datos:  
    a. El endpoint al que quieres enviar los logs. El endpoint debe empezar por `https://`. Un ejemplo de endpoint para Elasticsearch es `https://<your_account>.us-central1.gcp.cloud.es.io`. 
    b. El nombre del índice del destino al que quieres enviar los logs. 
    c. También puedes seleccionar la rotación de índices para la frecuencia con la que quieres crear un nuevo índice: `No Rotation`, `Every Hour`, `Every Day`, `Every Week` o `Every Month`. El valor predeterminado es `No Rotation`. 
8. En la sección **Configure Authentication** (Configurar la autenticación), introduce el nombre de usuario y la contraseña de tu cuenta Elasticsearch.

{{% /tab %}}
{{< /tabs >}}

9. En la sección **Select Tags to Forward** (Seleccionar etiquetas para el reenvío):
  a. Selecciona si quieres incluir **Todas las etiquetas**, **Ninguna etiqueta** o **Etiquetas específicas**:
  b. Selecciona si quieres **Incluir** o **Excluir determinadas etiquetas** y especifica qué etiquetas quieres incluir o excluir.
10. Haz clic en **Save** (Guardar).

En la página de [reenvío de logs][4], sitúate sobre el estado de un destino para ver el porcentaje de logs que coinciden con los criterios de filtrado y que se han reenviado en la última hora.

## Editar un destino
1. Ve a [Log Forwarding (Reenvío de logs)][4].
2. Selecciona **Custom Destinations** (Destinos personalizados) para ver una lista de todos los destinos existentes.
3. Haz clic en el botón **Edit** (Editar) del destino que quieres editar. 
4. Realiza los cambios en la página de configuración.
5. Haz clic en **Save** (Guardar).

## Eliminar un destino
1. Ve a [Log Forwarding (Reenvío de logs)][4].
2. Selecciona **Custom Destinations** (Destinos personalizados) para ver una lista de todos los destinos existentes.
3. Haz clic en el botón **Delete** (Eliminar) del destino que quieres eliminar y luego en **Confirm** (Confirmar). De este modo, el destino se elimina de la lista de destinos configurados en lista y los logs dejan de reenviarse a ese destino.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /es/logs/explorer/search_syntax/
[6]: /es/logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /es/logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /es/logs/log_configuration/forwarding_custom_destinations#delete-a-destination