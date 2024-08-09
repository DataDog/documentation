---
further_reading:
- link: /agent/logs
  tag: Documentación
  text: Habilitar la recopilación de logs con el Agent
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentación
  text: Recopilar logs de tus <txprotected>servicios</txprotected> AWS
title: Conectarse a Datadog a través de PrivateLink de AWS
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-warning">Datadog PrivateLink no admite el sitio Datadog seleccionado.</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

Esta guía te explica cómo configurar [AWS PrivateLink][1] para su uso con Datadog.

## Resumen

El proceso general consiste en configurar un endpoint interno en tu VPC al que los Agents de Datadog locales puedan enviar datos. El endpoint de tu VPC se interconecta entonces con el endpoint de la VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Esquema gráfico de la VPC" >}}

## Configuración

Datadog expone endpoints PrivateLink de AWS en **{{< region-param key="aws_region" >}}**.

Sin embargo, para dirigir el tráfico a la oferta PrivateLink de Datadog en {{< region-param key="aws_region" code="true" >}} desde otras regiones, utiliza la [interconexión de VPC de Amazon][2] interregional. La interconexión de VPC interregional te permite establecer conexiones entre VPC de diferentes regiones de AWS. Esto permite que los recursos de VPC de diferentes regiones se comuniquen entre sí utilizando direcciones IP privadas. Para obtener más información, consulta [¿Qué es una interconexión de VPC de Amazon?][2].

{{< tabs >}}
{{% tab "Conectar desde la misma región" %}}

1. Conecta la consola de AWS a la región **{{< region-param key="aws_region" >}}** y crea un endpoint de VPC.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear un endpoint de VPC" style="width:60%;" >}}

2. Selecciona **Find service by name** (Buscar servicio por nombre).
3. Rellena el cuadro de texto _Service Name_ (_Nombre del servicio_), según el servicio para el que quieras establecer PrivateLink de AWS:

    {{< img src="Agent/guide/private_link/vpc_service_name.png" alt="Nombre del servicio de VPC" style="width:70%;" >}}

| Datadog | Nombre del servicio PrivateLink | Nombre del DNS privado |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Consumo HTTP del Agent) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint" code="true">}}              |
| Logs (Consumo HTTP del usuario) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint" code="true" >}}                    |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| Métricas | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| Contenedores {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| Proceso | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
| Perfiles {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| Trazas (traces) | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
| Monitorización de bases de datos | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics -intake .{{< region-param key="dd_site" >}}</code>     |
| Configuración remota | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

4. Haz clic en **Verify** (Verificar). Si el resultado no es _Service Name found_ (_Nombre del servicio encontrado_), ponte en contacto con el [servicio de soporte de Datadog][1].
5. Elige la VPC y las subredes que deben ser interconectadas con el servicio del endpoint de VPC de Datadog.
6. Asegúrate de que en **Enable DNS Name** (Habilitar nombre del DNS), _Enable this endpoint_ (_Habilitar para este endpoint_) está seleccionado:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Habilitar DNS privado" style="width:80%;" >}}

7. Selecciona el grupo de seguridad que quieres que controle qué instancia puede enviar tráfico a este endpoint de la VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

8. Haz clic en **Create endpoint** (Crear endpoint), en la parte inferior de la pantalla. Si todo sale bien, se muestra lo siguiente:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Se ha creado el endpoint de la VPC" style="width:60%;" >}}

9. Haz clic en el ID del endpoint de la VPC para comprobar su estado.
10. Espera a que el estado pase de _Pending_ (Pendiente) a _Available_ (Disponible). Esto puede tardar hasta 10 minutos. Una vez que muestre _Available_, puedes utilizar PrivateLink de AWS.

    {{< img src="Agent/guide/private_link/vpc_status.png" alt="Estado de la VPC" style="width:60%;" >}}

11. Si estás recopilando datos de logs, asegúrate de que tu Agent está configurado para enviar logs a través de HTTPS. Si los datos ya no están ahí, añade lo siguiente al archivo de [configuración del Agent `datadog.yaml`][2]:

    ```yaml
   logs_config:
        use_http: true
    ```

    Si estás utilizando un contenedor del Agent, establece la siguiente variable de entorno en su lugar:

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    Esta configuración es necesaria cuando se envían logs a Datadog con PrivateLink de AWS y Datadog Agent, y no es necesaria para la extensión Lambda. Para obtener más información, consulta la [colección de logs del Agent][3].

12. Si tu extensión Lambda carga la clave de API de Datadog desde AWS Secrets Manager utilizando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, necesitas [crear un endpoint de VPC para Secrets Manager][4].

13. [Reinicia tu Agent][5] para enviar datos a Datadog a través de PrivateLink de AWS.



[1]: /es/help/
[2]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab%}}

{{% tab "Conectar desde otra región utilizando la interconexión de VPC" %}}

### Interconexión de VPC de Amazon

1. Conecta la consola de AWS a la región **{{< region-param key="aws_region" >}}** y crea un endpoint de VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear endpoint de VPC" style="width:80%;" >}}

2. Selecciona **Search Service by Name** (Buscar servicio por nombre).
3. Rellena el cuadro de texto _Service Name_ (_Nombre del servicio_), según el servicio para el que quieras establecer PrivateLink de AWS:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre del servicio de VPC" style="width:90%;" >}}

| Datadog | Nombre del servicio PrivateLink |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (Consumo HTTP del Agent) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (Consumo HTTP del usuario) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métricas | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Contenedores {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Proceso {{< region-param key="aws_private_link_process_service_name" code="true" >}}            |
| Perfiles {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Trazas (traces) {{< region-param key="aws_private_link_traces_service_name" code="true" >}}             |
| Monitorización de bases de datos {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuración remota | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Haz clic en **Verify** (Verificar). Si no obtienes _Service Name found_ (Nombre del servicio encontrado), ponte en contacto con [el soporte de Datadog][1].

5. A continuación, selecciona la VPC y las subredes que se deben interconectar con el servicio del endpoint de VPC de Datadog. No selecciones **Enable DNS Name** (Habilitar nombre del DNS), ya que la interconexión de VPC requiere que el DNS se configure manualmente.

6. Selecciona el grupo de seguridad de tu elección para controlar qué instancia puede enviar tráfico a este endpoint de VPC.

    **Nota **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

7. Haz clic en **Create endpoint** (Crear endpoint) en la parte inferior de la pantalla. Si todo sale bien, se muestra lo siguiente:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Se ha creado el endpoint de la VPC" style="width:80%;" >}}

8. Haz clic en el ID del endpoint de la VPC para comprobar su estado.
9. Espera a que el estado pase de _Pending_ (Pendiente) a _Available_ (Disponible). Esto puede tardar hasta 10 minutos.
10. Luego de crear el endpoint, utiliza la interconexión de VPC para que el endpoint de PrivateLink esté disponible en otra región para enviar telemetría a Datadog a través de PrivateLink. Para obtener más información, lee la página [Trabajar con interconexiones de VPC][2] en AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de la VPC" style="width:80%;" >}}

### Amazon Route53

1. Crea una [zona alojada privada de Route53][3] para cada servicio para el que hayas creado un endpoint PrivateLink de AWS. Adjunta la zona privada alojada a la VPC en {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Crear una zona alojada privada de Route53" style="width:80%;" >}}

Utiliza el siguiente lista para asignar el servicio y el nombre del DNS a diferentes partes de Datadog:

  | Datadog | Nombre del servicio PrivateLink | Nombre del DNS privado |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Consumo HTTP del Agent) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake .logs.{{< region-param key="dd_site" >}}</code> |
  | Logs (Consumo HTTP del usuario) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{ < region-param key="dd_site" >}}</code>                    |
  | metrics {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | Contenedores {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | Proceso | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | Perfiles {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | Trazas (traces) | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | Monitorización de bases de datos | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | Configuración remota | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

  También puedes encontrar esta información enviando una consulta a la API de AWS, `DescribeVpcEndpointServices`, o utilizando el siguiente comando: 

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Por ejemplo, en el caso de métricas del endpoint de Datadog para {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Esto devuelve <code>metrics.agent.{{< region-param key="dd_site" >}}</code>}}, el nombre de zona alojada privada que necesitas para asociar con la VPC en la que se origina el tráfico del Agent. Al anular este registro, se obtienen todos los nombres de host de consumos relacionados con métricas.

2. Dentro de cada nueva zona alojada privada de Route53, crea un registro A con el mismo nombre. Activa la opción **Alias** y, a continuación, en **Route traffic to** (Enrutar el tráfico a**), selecciona **Alias to VPC endpoint** (Alias para endpoint de VPC), **{{< region-param key="aws_region" >}}**, e introduce el nombre del DNS del endpoint de VPC asociado al nombre del DNS.

   **Notas**:
      - Para obtener el nombre de tu DNS, consulta la [documentación de la configuración del nombre del DNS privado de los servicios de endpoint][4].
      - El Agent envía telemetría a endpoints versionados, por ejemplo, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code>, que se resuelven como <code>metrics.agent.{{< region-param key="dd_site" >}}</code> a través de un alias CNAME. Por lo tanto, sólo es necesario configurar una zona alojada privada para <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Crear un registro A" style="width:90%;" >}}

3. Configura la interconexión de VPC y el enrutamiento entre VPC en una {{< region-param key="aws_region" code="true" >}} que contenga endpoints PrivateLink de Datadog y la VPC en la región donde se ejecutan los Agents de Datadog.

4. Si las VPC se encuentran en diferentes cuentas de AWS, la VPC que contiene el Datadog Agent debe estar autorizada para asociarse con las zonas alojadas privadas de Route53 antes de continuar. Crea una [autorización de asociación para VPC][5] en cada zona alojada privada de Route53 utilizando la región y el ID de la VPC donde se ejecuta el Datadog Agent. Esta opción no está disponible en la consola de AWS y debe configurarse con la CLI, SDK o API de AWS.

5. Edita la zona alojada de Route53 para añadir VPC para otras regiones.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Editar una zona alojada privada de Route53" style="width:80%;" >}}

6. Las VPC que tienen una zona alojada privada (PHZ) adjunta necesitan tener ciertas configuraciones específicas activadas; concretamente, las opciones `enableDnsHostnames` y `enableDnsSupport` de las VPC a las que está asociada la PHZ. Consulta [Consideraciones sobre el uso de una zona alojada privada][5].

7. [Reinicia el Agent][7] para enviar datos a Datadog mediante PrivateLink de AWS.

#### Solucionar problemas de resolución y conectividad del DNS

Los nombres de DNS deberían resolverse en direcciones IP contenidas dentro del bloque CIDR de la VPC en la {{< region-param key="aws_region" code="true" >}} y las conexiones al `port 443` deberían funcionar correctamente.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La conexión con el puerto 443 debería funcionar correctamente" style="width:80%;" >}}

Si el DNS se resuelve en direcciones IP públicas, significa que la zona de Route53 **no** se ha asociado con la VPC en la región alternativa o que el registro A no existe.

Si el DNS se resuelve correctamente, pero las conexiones al `port 443` fallan, es posible que la interconexión o el enrutamiento de la VPC estén mal configurados o que el puerto 443 no tenga permiso de salida del bloque CIDR de la VPC en la {{< region-param key="aws_region" code="true" >}}.

Las VPC que tienen asociada una zona alojada privada (PHZ) necesitan tener ciertas configuraciones específicas activadas; concretamente, las opciones `enableDnsHostnames` y `enableDnsSupport` deben estar activadas en las VPC a las que está asociada la PHZ. Consulta [Consideraciones sobre el uso de una zona alojada privada][6].

### Datadog Agent

1. Si estás recopilando datos de logs, asegúrate de que tu Agent está configurado para enviar logs a través de HTTPS. Si los datos no están ya ahí, añade lo siguiente en el [archivo de configuración `datadog.yaml` del Agent][8]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

   Si estás utilizando el Agent del contenedor, define la siguiente variable de entorno:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

   Esta configuración es obligatoria cuando se envían logs a Datadog con PrivateLink de AWS y el Datadog Agent, pero no es necesaria para la extensión Lambda. Para obtener más información, consulta la sección sobre la [recopilación de logs del Agent][9].

2. Si tu extensión Lambda carga la clave de API de Datadog desde AWS Secrets Manager usando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, tendrás que [crear un endpoint de VPC para Secrets Manager][10].

3. [Reinicia el Agent][7].


[1]: /es/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
{{% /site-region %}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}