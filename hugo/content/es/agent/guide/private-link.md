---
description: Configure los puntos de conexión de AWS PrivateLink para enviar datos
  de telemetría a Datadog de forma segura a través de conexiones VPC internas, incluyendo
  configuraciones entre regiones.
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centro de arquitectura
  text: Uso de AWS PrivateLink de varias regiones para enviar telemetría a Datadog
- link: /agent/logs
  tag: Documentación
  text: Habilite la recopilación de registros con el Agent
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentación
  text: Recopile registros de sus servicios de AWS
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: Centro de arquitectura
  text: Conéctese a Datadog a través de AWS PrivateLink
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Centro de arquitectura
  text: Conéctese a Datadog a través de AWS PrivateLink utilizando AWS Transit Gateway
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Centro de arquitectura
  text: Conéctese a Datadog a través de AWS PrivateLink utilizando AWS VPC peering
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: Blog
  text: Reduzca costos y mejore la seguridad con la conectividad entre regiones de
    Datadog utilizando AWS PrivateLink
title: Conéctese a Datadog a través de AWS PrivateLink
---
{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink no es compatible con el sitio de Datadog seleccionado.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2,uk1" %}}

## Descripción general {#overview}

Esta guía lo lleva a través de la configuración de [AWS PrivateLink][11] para su uso con Datadog. El proceso general consiste en configurar un punto de conexión interno en su VPC al cual los Agents locales de Datadog puedan enviar datos. Su punto de conexión de VPC se conecta entonces con el punto de conexión dentro de la VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Esquema del diagrama de VPC" >}}

Datadog expone puntos de conexión de AWS PrivateLink en **{{< region-param key="aws_region" >}}**.
- Si necesita enrutar el tráfico de Datadog en la misma región, siga los pasos en [Conectarse desde la misma región](#connect-from-the-same-region) para configurar su punto de conexión.
- Para enrutar el tráfico a la oferta de PrivateLink de Datadog en {{< region-param key="aws_region" >}} desde otras regiones, Datadog recomienda [puntos de conexión de PrivateLink entre regiones](?tab=crossregionprivatelinkendpoints#connect-from-other-regions). [PrivateLink entre regiones][11] le permite establecer conexiones entre VPCs a través de diferentes regiones de AWS. Esto permite que los recursos de VPC en diferentes regiones se comuniquen entre sí utilizando direcciones IP privadas. Alternativamente, utilice [VPC Peering](?tab=vpcpeering#connect-from-other-regions).

## Conéctese desde la misma región {#connect-from-the-same-region}

1. Conecte la consola de administración de AWS a la región de su elección.
1. Desde el panel de VPC, en {{< ui >}}PrivateLink and Lattice{{< /ui >}}, seleccione {{< ui >}}Endpoints{{< /ui >}}.
1. Haga clic en {{< ui >}}Create Endpoint{{< /ui >}}:
   {{< img src="agent/guide/private-link-vpc.png" alt="La página de endpoints en el panel de VPC" style="width:90%;" >}}
1. Seleccione {{< ui >}}Find service by name{{< /ui >}}.
1. Rellene el cuadro de texto _Nombre del servicio_ según el servicio para el que desee establecer AWS PrivateLink:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre del servicio de VPC" style="width:70%;" >}}

{{% site-region region="ap1" %}}
| Datadog                   | Nombre del servicio de PrivateLink                                                               | Nombre de DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Registros (ingesta HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Registros (ingesta HTTP de usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Containers                   | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de US1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de AP2, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de UK1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

4. Haga clic en {{< ui >}}Verify{{< /ui >}}. Si esto no devuelve _Service name found_, comuníquese con [Datadog support][14].
5. Elija la VPC y las subredes que deben estar conectadas con el punto de conexión de servicio de VPC de Datadog.
6. Asegúrese de que para {{< ui >}}Enable DNS name{{< /ui >}}, _Enable for this endpoint_ esté marcado:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Habilitar DNS privado" style="width:80%;" >}}

7. Elija el grupo de seguridad de su preferencia para controlar qué puede enviar tráfico a este punto de conexión de VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

8. Haga clic en {{< ui >}}Create endpoint{{< /ui >}} en la parte inferior de la pantalla. Si la operación se realiza correctamente, se mostrará lo siguiente:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Punto de conexión de VPC creado" style="width:60%;" >}}

9. Haga clic en el ID del punto de conexión de VPC para verificar su estado.
10. Espere a que el estado cambie de _Pending_ a _Available_. Esto puede tardar hasta 10 minutos. Una vez que aparezca _Available_, podrá utilizar AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de VPC" style="width:60%;" >}}

11. Si está ejecutando una versión del Datadog Agent anterior a la v6.19 o v7.19, para recopilar datos de registros, asegúrese de que su Agent esté configurado para enviar registros a través de HTTPS. Si los datos aún no aparecen, añada lo siguiente al [archivo de configuración del Agent `datadog.yaml`][15]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. Si su extensión de Lambda carga la clave de API de Datadog desde AWS Secrets Manager utilizando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, debe [crear un punto de conexión de VPC para Secrets Manager][17].

13. [Reinicie su Agente][13] para enviar datos a Datadog a través de AWS PrivateLink.

## Conéctese desde otras regiones {#connect-from-other-regions}

{{< tabs >}}
{{% tab "Puntos de conexión de PrivateLink entre regiones" %}}
1. Conecte la consola de administración de AWS a la región de su elección.
1. Desde el panel de VPC, en {{< ui >}}PrivateLink and Lattice{{< /ui >}}, seleccione {{< ui >}}Endpoints{{< /ui >}}.
1. Haga clic en {{< ui >}}Create Endpoint{{< /ui >}}:
   {{< img src="agent/guide/private-link-vpc.png" alt="La página de endpoints en el panel de VPC" style="width:90%;" >}}
1. Configure la configuración del punto de conexión de interfaz de VPC
   1. Opcionalmente, complete el {{< ui >}}Name tag{{< /ui >}}.
   1. En {{< ui >}}Type{{< /ui >}}, seleccione {{< ui >}}PrivateLink Ready partner services{{< /ui >}}.
1. Descubra y configure el punto de conexión de interfaz con soporte entre regiones:
   1. En {{< ui >}}Service name{{< /ui >}}, complete el nombre del servicio con un nombre de servicio de PrivateLink válido de la [tabla](#privatelink-service-names) a continuación.
   1. En {{< ui >}}Service region{{< /ui >}}, haga clic en {{< ui >}}Enable Cross Region endpoint{{< /ui >}} y seleccione **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Haga clic en {{< ui >}}Verify service{{< /ui >}} y espere una notificación de _Nombre de servicio verificado_.
      **Nota:** Si no puede verificar el servicio después de completar los pasos anteriores, comuníquese con [Datadog support][1].
1. En {{< ui >}}Network Settings{{< /ui >}}, seleccione una VPC con la cual implementar el punto de conexión de interfaz de VPC.
1. Asegúrese de que la opción para {{< ui >}}Enable DNS name{{< /ui >}} esté marcada.
1. En {{< ui >}}Subnets{{< /ui >}}, seleccione una o más subredes en su VPC para el punto de conexión de interfaz.
1. En {{< ui >}}Security Groups{{< /ui >}}, seleccione un grupo de seguridad para controlar qué puede enviar tráfico al punto de conexión de VPC.

   **Nota**: El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP 443.
1. Opcionalmente, proporcione una {{< ui >}}Name tag{{< /ui >}} y haga clic en {{< ui >}}Create endpoint{{< /ui >}}.
1. Espere unos minutos a que el estado del punto de conexión se actualice de {{< ui >}}Pending{{< /ui >}} a {{< ui >}}Available{{< /ui >}}. Esto puede tardar hasta 10 minutos. Si tarda más de lo esperado, comuníquese con [Datadog support][1].

Después de que el estado del punto de conexión se actualice a {{< ui >}}Available{{< /ui >}}, puede usar este punto de conexión para enviar telemetría a Datadog mediante el punto de conexión de AWS PrivateLink entre regiones.

## Nombres de servicio de PrivateLink {#privatelink-service-names}

{{% site-region region="ap1" %}}
| Datadog                   | Nombre del servicio de PrivateLink                                                               | Nombre de DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Registros (ingesta HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Registros (ingesta HTTP de usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="ap2" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de AP2, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="us" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de US1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="uk1" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de UK1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

**Nota**: PrivateLink entre regiones no emite métricas de CloudWatch. Consulte [Métricas de CloudWatch para AWS PrivateLink][2] para obtener más información.

[1]: /es/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "Peering de VPC" %}}
1. Conecte la consola de AWS a la región **{{< region-param key="aws_region" >}}** y cree un punto de conexión de VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear punto de conexión de VPC" style="width:80%;" >}}

2. Seleccione {{< ui >}}Find service by name{{< /ui >}}.
3. Rellene el cuadro de texto _Nombre del servicio_ de acuerdo con el servicio para el que desea establecer AWS PrivateLink:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre del servicio de VPC" style="width:90%;" >}}

{{% site-region region="ap1" %}}
| Datadog                   | Nombre del servicio PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (ingesta HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Registros (ingesta HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profiling | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de US1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de AP2, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de UK1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

4. Haga clic en {{< ui >}}Verify{{< /ui >}}. Si esto no devuelve _Nombre del servicio encontrado_, comuníquese con el [soporte de Datadog][1].

5. A continuación, elija la VPC y las subredes que deben conectarse mediante peering con el punto de conexión del servicio VPC de Datadog. No seleccione {{< ui >}}Enable DNS name{{< /ui >}} ya que el peering de VPC requiere que el DNS se configure manualmente.

6. Elija el grupo de seguridad de su preferencia para controlar qué puede enviar tráfico a este punto de conexión de VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

7. Haga clic en {{< ui >}}Create endpoint{{< /ui >}} en la parte inferior de la pantalla. Si la operación se realiza correctamente, se mostrará lo siguiente:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Punto de conexión de VPC creado" style="width:80%;" >}}

8. Haga clic en el ID del punto de conexión de VPC para verificar su estado.
9. Espere a que el estado cambie de _Pending_ a _Available_. Esto puede tardar hasta 10 minutos.
10. Después de crear el punto de conexión, utilice el peering de VPC para que el punto de conexión de PrivateLink esté disponible en otra región para enviar telemetría a Datadog a través de PrivateLink. Para obtener más información, lea la página [Trabajar con conexiones de VPC Peering][2] en AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de VPC" style="width:80%;" >}}

### Amazon Route53 {#amazon-route53}

1. Cree una [zona alojada privada de Route53][3] para cada servicio para el que haya creado un punto de conexión de AWS PrivateLink. Adjunte la zona alojada privada a la VPC en {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Cree una zona alojada privada de Route53" style="width:80%;" >}}

Utilice la siguiente lista para asignar el servicio y el nombre DNS a las diferentes partes de Datadog:

{{% site-region region="ap1" %}}
  | Datadog                   | Nombre del servicio de PrivateLink                                                               | Nombre DNS privado                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Registros (ingesta HTTP del agente)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Registros (ingesta HTTP de usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | [Profiling][7]                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de US1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de AP2, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
Para obtener la lista completa de registros DNS y puntos de conexión de servicio de VPC de UK1, consulte [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

  También puede encontrar esta información consultando la API de AWS, `DescribeVpcEndpointServices`, o utilizando el siguiente comando:

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Por ejemplo, en el caso del punto de conexión de métricas de Datadog para {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Esto devuelve <code>metrics.agent.{{< region-param key="dd_site" >}}</code>, el nombre de la zona alojada privada que necesita para asociarla con la VPC en la que se origina el tráfico del Agent. Anular este registro captura todos los nombres de host de ingesta relacionados con las métricas.

2. Dentro de cada nueva zona alojada privada de Route53, cree un registro A con el mismo nombre. Active la opción {{< ui >}}Alias{{< /ui >}}, luego en {{< ui >}}Route traffic to{{< /ui >}}, elija {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **"{{< region-param key="aws_region" >}}, e ingrese el nombre DNS del punto de conexión de VPC asociado con el nombre DNS.

   **Notas**:
      - Para recuperar su nombre DNS, consulte la [documentación de configuración del nombre DNS privado del servicio de punto de conexión.][4]
      - El Datadog Agent envía telemetría a puntos de conexión con versiones, por ejemplo, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> que se resuelve en <code>metrics.agent.{{< region-param key="dd_site" >}}</code> a través de un alias CNAME. Por lo tanto, solo necesita configurar una zona alojada privada para <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Cree un registro A" style="width:90%;" >}}

3. Configure el peering de VPC y el enrutamiento entre la VPC en {{< region-param key="aws_region" code="true" >}} que contiene los puntos de conexión de Datadog PrivateLink y la VPC en la región donde se ejecuta el Datadog Agent.

4. Si las VPC están en diferentes cuentas de AWS, la VPC que contiene el Datadog Agent debe estar autorizada para asociarse con las zonas alojadas privadas de Route53 antes de continuar. Cree una [autorización de asociación de VPC][5] para cada zona alojada privada de Route53 utilizando la región y el ID de VPC de la VPC donde se ejecuta el Datadog Agent. Esta opción no está disponible en la Consola de AWS. Debe configurarse utilizando la CLI, el SDK o la API de AWS.

5. Edite la zona alojada de Route53 para agregar VPCs de otras regiones.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Edite una zona alojada privada de Route53" style="width:80%;" >}}

6. Las VPC que tienen adjunta la Zona Alojada Privada (PHZ) necesitan tener ciertas configuraciones activadas, específicamente `enableDnsHostnames` y `enableDnsSupport` en las VPC con las que está asociada la PHZ. Consulte [Consideraciones al trabajar con una zona alojada privada][6].

7. [Reinicie el Datadog Agent][7] para enviar datos a Datadog a través de AWS PrivateLink.

#### Solución de problemas de resolución de DNS y conectividad {#troubleshooting-dns-resolution-and-connectivity}

Los nombres DNS deben resolverse en direcciones IP contenidas dentro del bloque CIDR de la VPC en {{< region-param key="aws_region" code="true" >}}, y las conexiones a `port 443` deberían tener éxito.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La conexión al puerto 443 debería ser exitosa" style="width:80%;" >}}

Si el DNS se resuelve en direcciones IP públicas, entonces la zona de Route53 **no** se ha asociado con la VPC en la región alternativa, o el registro A no existe.

Si el DNS se resuelve correctamente, pero las conexiones a `port 443` fallan, entonces el emparejamiento de VPC o el enrutamiento pueden estar mal configurados, o es posible que el puerto 443 no tenga permitido el tráfico saliente hacia el bloque CIDR de la VPC en {{< region-param key="aws_region" code="true" >}}.

Las VPC con una zona alojada privada (PHZ) adjunta necesitan tener un par de configuraciones activadas. Específicamente, `enableDnsHostnames` y `enableDnsSupport` deben estar activados en las VPC con las que está asociada la PHZ. Consulte [configuraciones de Amazon VPC][6].

### Datadog Agent {#datadog-agent}

1. Si está recopilando datos de logs, asegúrese de que su Agent esté configurado para enviar logs a través de HTTPS. Si los datos aún no aparecen, añada lo siguiente al [archivo de configuración del Agent `datadog.yaml`][8]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. Si su extensión de Lambda carga la clave de API de Datadog desde AWS Secrets Manager utilizando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, debe [crear un punto de conexión de VPC para Secrets Manager][10].

3. [Reinicie el Datadog Agent][7].

[1]: /es/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}

[11]: https://aws.amazon.com/privatelink/
[12]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[13]: /es/agent/configuration/agent-commands/#restart-the-agent
[14]: /es/help/
[15]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[16]: /es/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[17]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html

{{% site-region region="us" %}}
## ID de servicio de punto de conexión de VPC {#vpc-endpoint-service-ids}

US1 utiliza una arquitectura DNS de dos niveles para PrivateLink. Cada registro DNS orientado al cliente se asigna a una dirección de punto de conexión de VPC dedicada `color.intake.datadoghq.com`. La configuración de un punto de conexión de VPC para una dirección de anclaje determinada cubre todos los registros orientados al cliente que se asignan a ella.

Utilice la siguiente tabla para identificar qué puntos de conexión de VPC configurar para las funciones de Datadog que utiliza. Las entradas Wildcard coinciden con cualquier subdominio que no aparezca en la lista.

**Nota**: En la tabla siguiente, `---` indica un punto de conexión de servicio de VPC directo sin una dirección de anclaje intermedia.
| Nombre | Anclaje | ID de servicio de punto de conexión de VPC |
|---|---|---|
| `webhook-intake.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `webhooks-http-intake.logs.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `*.integrations.otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `opamp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `mcp.datadoghq.com` | `cornsilk.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-058a75ceea85a9175` |
| `agenthealth-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ci-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cicodescan-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcov-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cloudplatform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contimage-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contlcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cws-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `debugger-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `error-tracking-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-management-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-platform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `feed-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `instrumentation-telemetry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `kubeops-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `llmobs-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndm-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndmflow-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `netpath-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ocimetrics-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `resources-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sbom-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sds-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sentry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `snmp-traps-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `softinv-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `iam-rum-intake.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum-http-intake.logs.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum.browser-intake-datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `data-obs-intake.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `trace.agent.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `network-devices.datadoghq.com` | `olive.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-05e3bfec4501e714d` |
| `*.datadoghq.com` | `orange.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b67fd56f90bd3c41` |
| `*.api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `*.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `intake.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `agent-http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| `http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| `metrics.agent.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| `orchestrator.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |
| `process.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| `intake.profile.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| `dbm-metrics-intake.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ce70d55ec4af8501` |
| `config.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-01f21309e507e3b1d` |

{{% /site-region %}}

{{% site-region region="ap2" %}}
## ID de servicio de punto de conexión de VPC {#vpc-endpoint-service-ids-1}

AP2 utiliza una arquitectura DNS de dos niveles para PrivateLink. Cada registro DNS orientado al cliente se asigna a una dirección de punto de conexión de VPC dedicada `color.intake.ap2.datadoghq.com`. La configuración de un punto de conexión de VPC para una dirección de anclaje determinada cubre todos los registros orientados al cliente que se asignan a ella.

Utilice la siguiente tabla para identificar qué puntos de conexión de VPC configurar para las funciones de Datadog que utiliza. Los registros DNS más específicos tienen prioridad sobre los Wildcards; por ejemplo, `trace.agent.ap2.datadoghq.com` se resuelve en `lime.intake.ap2.datadoghq.com` aunque `*.agent.ap2.datadoghq.com` apunte a `beige.intake.ap2.datadoghq.com`.

| Nombre | Anclaje | ID de servicio de punto de conexión de VPC |
|---|---|---|
| `gcp-intake.logs.ap2.datadoghq.com` | `aqua.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01b61a61d21fc7273` |
| `*.agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `process.ap2.datadoghq.com` | `bisque.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5` |
| `*.integrations.otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `opamp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `agenthealth-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `awsmetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ci-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cicodescan-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cireport-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcov-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cloudplatform-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contimage-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contlcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cspm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cws-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `debugger-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `error-tracking-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `event-management-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `instrumentation-telemetry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `intake.profile.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `kubeops-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `llmobs-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndmflow-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `netpath-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ocimetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `resources-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sbom-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sds-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sentry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `snmp-traps-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `softinv-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `webhook-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `agent-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `aws-kinesis-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `eventbridge-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `lambda-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `obpipeline-intake.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `runtime-security-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `live.logs.ap2.datadoghq.com` | `indigo.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0545109555aa68e7e` |
| `data-obs-intake.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `trace.agent.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `orchestrator.ap2.datadoghq.com` | `linen.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-031da3ffac78ef902` |
| `*.ap2.datadoghq.com` | `orange.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01911394f8bac8056` |
| `*.synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `api.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `quota.browser-intake-ap2-datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `sourcemap-intake.ap2.datadoghq.com` | `plum.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-028e4348e80fa73f5` |
| `config.ap2.datadoghq.com` | `violet.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01f8f80f4cb97bd10` |
| `dbm-metrics-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
| `dbquery-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
{{% /site-region %}}

{{% /site-region %}}

{{% site-region region="uk1" %}}
## ID de servicio de punto de conexión de VPC {#vpc-endpoint-service-ids-2}

UK1 utiliza una arquitectura DNS de dos niveles para PrivateLink. Cada registro DNS orientado al cliente se asigna a una dirección de punto de conexión de VPC dedicada `color.intake.uk1.datadoghq.com`. La configuración de un punto de conexión de VPC para una dirección de anclaje determinada cubre todos los registros orientados al cliente que se asignan a ella.

Utilice la siguiente tabla para identificar qué puntos de conexión de VPC configurar para las funciones de Datadog que utiliza. Los registros DNS más específicos tienen prioridad sobre los Wildcards; por ejemplo, `trace.agent.uk1.datadoghq.com` se resuelve en `lime.intake.uk1.datadoghq.com` aunque `*.agent.uk1.datadoghq.com` apunte a `beige.intake.uk1.datadoghq.com`.

| Nombre | Anclaje | ID de servicio de punto de conexión de VPC |
|---|---|---|
| `gcp-intake.logs.uk1.datadoghq.com` | `aqua.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-099b74a86151e7f91` |
| `*.agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `process.uk1.datadoghq.com` | `bisque.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0fe52c96bfb6c5d0e` |
| `*.integrations.otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `opamp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `mcp.uk1.datadoghq.com` | `cornsilk.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d345b92b8a5e8743` |
| `agenthealth-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `awsmetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ci-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cicodescan-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cireport-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcov-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cloudplatform-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contimage-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contlcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cspm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cws-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `debugger-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `error-tracking-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `event-management-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `instrumentation-telemetry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `intake.profile.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `kubeops-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `llmobs-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndmflow-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `netpath-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ocimetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `resources-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sbom-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sds-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sentry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `snmp-traps-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `softinv-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `webhook-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `agent-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `aws-kinesis-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `eventbridge-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `lambda-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `obpipeline-intake.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `runtime-security-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `data-obs-intake.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `trace.agent.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `orchestrator.uk1.datadoghq.com` | `linen.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-07f22a32140efaae5` |
| `*.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `custom-domains.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `*.synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `api.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `quota.browser-intake-uk1-datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `sourcemap-intake.uk1.datadoghq.com` | `plum.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-04fbf10021b0308cd` |
| `config.uk1.datadoghq.com` | `violet.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0755097b02a34f9e7` |
| `dbm-metrics-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
| `dbquery-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
{{% /site-region %}}

## Verifique que los datos se estén enviando mediante PrivateLink {#verify-that-data-is-being-sent-using-privatelink}

Después de configurar PrivateLink, para verificar que los datos se estén enviando mediante PrivateLink, ejecute el comando `dig` en una máquina que se encuentre en esa VPC. Por ejemplo, ejecute este comando si configuró un PrivateLink para el punto de conexión `http-intake.logs.datadoghq.com`:

```
dig http-intake.logs.datadoghq.com
```

Si los registros se están enviando a través de PrivateLink, la sección `ANSWER Section` del resultado muestra `http-intake.logs.datadoghq.com` como en el siguiente ejemplo. **Nota**: Las direcciones IP que obtenga deben estar en [espacio de IP privada][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

Si los registros no se están enviando a través de PrivateLink, la `ANSWER SECTION` del resultado muestra el balanceador de carga (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) al cual se están enviando los registros.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses