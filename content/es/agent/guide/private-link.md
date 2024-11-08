---
further_reading:
- link: /agent/logs
  tag: Documentación
  text: Habilitar la recopilación de logs con el Agent
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentación
  text: Recopilar logs de tus servicios AWS
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: Centro de arquitectura
  text: Conectarse a Datadog a través de AWS PrivateLink
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Centro de arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink mediante AWS Transit Gateway
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Centro de arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink mediante la interconexión
    de VPC de AWS
title: Conectarse a Datadog a través de AWS PrivateLink
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-warning">Datadog PrivateLink no admite el sitio de Datadog seleccionado.</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

Esta guía te orienta para configurar [AWS PrivateLink][1] para su uso con Datadog.

## Información general

El proceso general consiste de configurar un endpoint interno en tu VPC a la que los Datadog Agents pueden enviar datos. Tu endpoint de VPC se interconecta con el endpoint dentro de la VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Esquema de diagrama de VPC" >}}

## Configuración

Datadog expone endpoints de AWS PrivateLink en **{{< region-param key="aws_region" >}}**.

Sin embargo, para dirigir el tráfico a la oferta de PrivateLink de Datadog en {{< region-param key="aws_region" code="true" >}} desde otras regiones, utiliza la [interconexión de Amazon VPC] entre regiones[2]. La interconexión de VPC entre regiones te permite establecer conexiones entre VPCs en diferentes regiones de AWS. Esto permite que los recursos de la VPC en diferentes regiones se comuniquen entre sí usando direcciones IP privadas. Para obtener más detalles, consulta [interconexión de Amazon VPC][2].

{{< tabs >}}
{{% tab "Conectar desde la misma región" %}}

1. Conecta la consola de AWS a la región **{{< region-param key="aws_region" >}}** y crea un endpoint de VPC.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear un endpoint de VPC" style="width:60%;" >}}

2. Selecciona **Find service by name** (Buscar servicio por nombre).
3. Completa el cuadro de texto _Service Name_ (Nombre de servicio) según para qué servicio deseas establecer AWS PrivateLink:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre de servicio de VPC" style="width:70%;" >}}

| Datadog                   | Nombre de servicio de PrivateLink                                                               | Nombre de DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (entrada HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint" code="true">}}              |
| Logs (entrada HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint" code="true">}}                    |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
| Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
| Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

4. Haz clic en **Verify** (Verificar). Si esto no devuelve _Service name found_ (Nombre de servicio encontrado), contacta con el [soporte de Datadog][1].
5. Elige la VPC y las subredes que deberían interconectarse con el endpoint de servicio de Datadog VPC.
6. Asegúrate de que en **Enable DNS name** (Habilitar nombre de DNS), _Enable for this endpoint_ (Habilitar para este endpoint) esté marcado:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Habilitar DNS privado" style="width:80%;" >}}

7. Elige el grupo de seguridad de tu preferencia para controlar qué puede enviar tráfico a este endpoint de VPC.

    **Nota**: **El grupo de seguridad debe aceptar el tráfico entrante en el puerto de TCP `443`**.

8. Haz clic en **Create endpoint** (Crear endpoint) en la parte inferior de la pantalla. Si es correcto, se mostrará lo siguiente:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC creado" style="width:60%;" >}}

9. Haz clic en el ID del endpoint de VPC para comprobar su estado.
10. Espera que el estado cambie de _Pending_ (Pendiente) a _Available_ (Disponible). Esto puede tomar hasta 10 minutos. Una vez que el estado es _Available_ (Disponible), puedes usar AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de VPC" style="width:60%;" >}}

11. Si ejecutas una versión del Datadog Agent anterior a v6.19 o v7.19 para recopilar datos de logs, asegúrate de que el Agent esté configurado para enviar logs por HTTPS. Si los datos aún no están allí, añade lo siguiente al [archivo de configuración `datadog.yaml` del Agent][2]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    Si estás utilizando el Agent en contenedores, establece la siguiente variable de entorno en su lugar:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    Esta configuración es obligatoria para enviar logs a Datadog con AWS PrivateLink y el Datadog Agent y no es obligatoria para la extensión de Lambda. Para más detalles, consulta [Recopilación de logs del Agent][3].

12. Si tu extensión de Lambda carga la clave de API de Datadog desde AWS Secrets Manager mediante el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, debes [crear un endpoint de VPC para Secrets Manager][4].

13. [Reinicia tu Agent][5] para enviar datos a Datadog mediante AWS PrivateLink.



[1]: /es/help/
[2]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Conéctate desde otra región usando la interconexión de VPC" %}}

## Interconexión de Amazon VPC

1. Conecta la consola de AWS a la región **{{< region-param key="aws_region" >}}** y crea un endpoint de VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear un endpoint de VPC" style="width:80%;" >}}

2. Selecciona **Find service by name** (Buscar servicio por nombre).
3. Completa el cuadro de texto _Service Name_ (Nombre de servicio) según el servicio para el que quieres establecer AWS PrivateLink:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre de servicio de VPC" style="width:90%;" >}}

| Datadog                   | Nombre de servicio de PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (entrada HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (entrada HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Haz clic en **Verify** (Verificar). Si no devuelve _Service name found_ (Nombre de servicio encontrado), conecta con el [soporte de Datadog][1].

5. A continuación, elige la VPC y las subredes que deberían interconectarse con el endpoint de servicio de Datadog VPC. No selecciones **Enable DNS name** (Habilitar nombre de DNS), ya que interconexión de VPC requiere que el DNS se configure manualmente.

6. Elige el grupo de seguridad de tu preferencia para controlar qué puede enviar tráfico a este endpoint de VPC.

    **Nota**: **El grupo de seguridad debe aceptar el tráfico entrante en el puerto TCP `443`**.

7. Haz clic en **Create endpoint** (Crear endpoint) en la parte inferior de la pantalla. Si es correcto, se muestra lo siguiente:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC creado" style="width:80%;" >}}

8. Haz clic en el ID de endpoint de VPC para comprobar el estado.
9. Espera que el estado cambie de _Pending_ (Pendiente) a _Available_ (Disponible). Esto puede tomar hasta 10 minutos.
10. Después de crear el endpoint, utiliza la interconexión de VPC para hacer que el endpoint de PrivateLink esté disponible en otra región a fin de enviar telemetría a Datadog mediante PrivateLink. Para obtener más información, lee la página [Work With VPC Peering connections][2] en AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de la VPC" style="width:80%;" >}}

### Amazon Route53

1. Crea una [zona alojada privada de Route53][3] para cada servicio que has creado en un endpoint de AWS PrivateLink. Adjunta la zona alojada privada a la VPC en {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Crear una zona alojada privada de Route53" style="width:80%;" >}}

Usa la lista a continuación para asignar el servicio y nombre de DNS a diferentes partes de Datadog:

  | Datadog                   | Nombre de servicio de PrivateLink                                                               | Nombre de DNS privado                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (entrada HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | Logs (entrada HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
  | Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

  También puedes encontrar esta información al consultar a la API de AWS, `DescribeVpcEndpointServices`, o mediante el siguiente comando 

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Por ejemplo, en el caso del endpoint de métricas de Datadog para {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Esto devuelve <code>metrics.agent.{{< region-param key="dd_site" >}}</code> el nombre de la zona alojada privada que necesitas para asociar con la VPC en la que se origina el tráfico del Agent. Al anular este registro, se obtienen todos los nombres de host de los consumos relacionados con métricas.

2. Dentro de cada nueva zona alojada privada de Route53, crea un registro A con el mismo nombre. Activa la opción **Alias** y, a continuación, en **Route traffic to** (Enrutar el tráfico a**), selecciona **Alias to VPC endpoint** (Alias para endpoint de la VPC), **{{< region-param key="aws_region" >}}** e introduce el nombre del DNS del endpoint de la VPC asociado al nombre del DNS.

   **Notas**:
      - Para obtener el nombre de tu DNS, consulta [Ver documentación de configuración del nombre del DNS privado para servicios de endpoint][4].
      - El Agent envía telemetría a endpoints versionados, por ejemplo, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code>, que se resuelven como <code>metrics.agent.{{< region-param key="dd_site" >}}</code> a través de un alias CNAME. Por lo tanto, solo es necesario configurar una zona alojada privada para <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Crear un registro A" style="width:90%;" >}}

3. Configura la interconexión de la VPC y el enrutamiento entre la VPC en una {{< region-param key="aws_region" code="true" >}} que contenga endpoints de Datadog PrivateLink y la VPC en la región donde se ejecutan los Datadog Agents.

4. Si las VPC se encuentran en diferentes cuentas de AWS, la VPC que contiene el Datadog Agent debe estar autorizada para asociarse con las zonas alojadas privadas de Route53 antes de continuar. Crea una [autorización de asociación para la VPC][5] en cada zona alojada privada de Route53 utilizando la región y el ID de la VPC donde se ejecuta el Datadog Agent. Esta opción no está disponible en la consola de AWS y debe configurarse con la CLI, el SDK o la API de AWS.

5. Edita la zona alojada de Route53 para añadir las VPC para otras regiones.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Editar una zona alojada privada de Route53" style="width:80%;" >}}

6. Las VPC que tienen asociada una zona alojada privada (PHZ) necesitan tener ciertas configuraciones específicas activadas; concretamente, las opciones `enableDnsHostnames` y `enableDnsSupport` de las VPC a las que está asociada la PHZ. Consulta las [Consideraciones sobre el uso de una zona alojada privada][6].

7. [Reinicia el Agent][7] para enviar datos a Datadog a través de AWS PrivateLink.

#### Solucionar problemas de resolución y conectividad del DNS

Los nombres del DNS deberían resolverse en direcciones IP contenidas dentro del bloque CIDR de la VPC en la {{< region-param key="aws_region" code="true" >}} y las conexiones al `port 443` deberían funcionar correctamente.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La conexión con el puerto 443 debería funcionar correctamente" style="width:80%;" >}}

Si el DNS se resuelve en direcciones IP públicas, significa que la zona de Route53 **no** se ha asociado con la VPC en la región alternativa o que el registro A no existe.

Si el DNS se resuelve correctamente, pero las conexiones al `port 443` fallan, es posible que la interconexión o el enrutamiento de la VPC estén mal configurados o que el puerto 443 no tenga permiso para salir del bloque CIDR de la VPC en la {{< region-param key="aws_region" code="true" >}}.

Las VPC que tienen asociada una zona alojada privada (PHZ) necesitan tener ciertas configuraciones específicas activadas; concretamente, las opciones `enableDnsHostnames` y `enableDnsSupport` de las VPC a las que está asociada la PHZ. Consulta la [Configuración de la VPC de Amazon][6].

### Datadog Agent

1. Si estás recopilando datos de logs, asegúrate de que tu Agent está configurado para enviar logs a través de HTTPS. Si los datos no están ya ahí, añade lo siguiente en el [archivo de configuración `datadog.yaml` del Agent][8]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

   Si estás utilizando el Agent del contenedor, establece la siguiente variable de entorno en su lugar:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

   Esta configuración es obligatoria cuando se envían logs a Datadog con AWS PrivateLink y el Datadog Agent, pero no es necesaria para la extensión Lambda. Para obtener más información, consulta la [recopilación de logs del Agent][9].

2. Si tu extensión Lambda carga la clave de API de Datadog desde el administrador de secretos de AWS utilizando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, es necesario [crear un endpoint de la VPC para el administrador de secretos][10].

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}