---
description: Configura los puntos finales de AWS PrivateLink para enviar datos de
  telemetría a Datadog de manera segura a través de conexiones internas de VPC, incluyendo
  configuraciones entre regiones.
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centro de Arquitectura
  text: Uso de AWS PrivateLink entre Regiones para Enviar Telemetría a Datadog
- link: /agent/logs
  tag: Documentación
  text: Habilita la recolección de registros con el Agente
- link: /integrations/amazon_web_services/#log-collection
  tag: Documentación
  text: Recoge registros de tus servicios de AWS
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: Centro de Arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Centro de Arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink usando AWS Transit Gateway
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Centro de Arquitectura
  text: Conéctate a Datadog a través de AWS PrivateLink usando emparejamiento de VPC
    de AWS
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: Blog
  text: Reduce costos y mejora la seguridad con la conectividad entre regiones de
    Datadog usando AWS PrivateLink
title: Conéctate a Datadog a través de AWS PrivateLink
---
{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink no soporta el sitio de Datadog seleccionado.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2" %}}

## Resumen {#overview}

Esta guía te lleva a través de la configuración de [AWS PrivateLink][11] para su uso con Datadog. El proceso general consiste en configurar un punto de conexión interno en tu VPC al que los agentes locales de Datadog pueden enviar datos. Tu punto de conexión de VPC se empareja luego con el punto de conexión dentro de la VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Diagrama de VPC Esquema" >}}

Datadog expone puntos finales de AWS PrivateLink en **{{< region-param key="aws_region" >}}**.
- Si necesitas enrutar el tráfico de Datadog en la misma región, sigue los pasos en [Conectar desde la misma región](#connect-from-the-same-region) para configurar tu punto de conexión.
- Para enrutar el tráfico a la oferta de PrivateLink de Datadog en {{< region-param key="aws_region" >}} otras regiones, Datadog recomienda [puntos de conexión de PrivateLink entre regiones](?tab=crossregionprivatelinkendpoints#connect-from-other-regions). [PrivateLink entre regiones][11] te permite establecer conexiones entre VPCs en diferentes regiones de AWS. Esto permite que los recursos de VPC en diferentes regiones se comuniquen entre sí utilizando direcciones IP privadas. Alternativamente, utiliza [Emparejamiento de VPC](?tab=vpcpeering#connect-from-other-regions).

## Conéctate desde la misma región {#connect-from-the-same-region}

1. Conecta la Consola de Administración de AWS a la región de tu elección.
1. Desde el Panel de VPC, bajo {{< ui >}}PrivateLink and Lattice{{< /ui >}}, selecciona {{< ui >}}Endpoints{{< /ui >}}.
1. Haz clic en {{< ui >}}Create Endpoint{{< /ui >}}:
   {{< img src="agent/guide/private-link-vpc.png" alt="La página de puntos de conexión en el panel de VPC" style="width:90%;" >}}
1. Selecciona {{< ui >}}Find service by name{{< /ui >}}.
1. Completa el cuadro de texto _Nombre del Servicio_ de acuerdo a qué servicio deseas establecer AWS PrivateLink para:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="nombre del servicio de VPC" style="width:70%;" >}}

| Datadog                   | nombre del servicio de PrivateLink                                                               | nombre DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Registros (ingesta HTTP del Agente)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Registros (ingesta HTTP del Usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Contenedores               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| DBM | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuración Remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

4. Haga clic {{< ui >}}Verify{{< /ui >}}. Si esto no devuelve _Nombre del servicio encontrado_, comuníquese con [soporte de Datadog][14].
5. Elija la VPC y las subredes que deben estar conectadas con el punto final del servicio VPC de Datadog.
6. Asegúrese de que para {{< ui >}}Enable DNS name{{< /ui >}}, _Habilitar para este punto final_ esté marcado:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Habilitar DNS privado" style="width:80%;" >}}

7. Elija el grupo de seguridad de su elección para controlar quién puede enviar tráfico a este punto final de VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

8. Haga clic {{< ui >}}Create endpoint{{< /ui >}} en la parte inferior de la pantalla. Si tiene éxito, se mostrará lo siguiente:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Punto final de VPC creado" style="width:60%;" >}}

9. Haga clic en el ID del punto final de VPC para verificar su estado.
10. Espere a que el estado cambie de _Pendiente_ a _Disponible_. Esto puede tardar hasta 10 minutos. Una vez que muestre _Disponible_, puede usar AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de VPC" style="width:60%;" >}}

11. Si está ejecutando una versión del Agente de Datadog anterior a v6.19 o v7.19, para recopilar datos de registros, asegúrese de que su Agente esté configurado para enviar registros a través de HTTPS. Si los datos no están ya allí, agregue lo siguiente al [archivo de configuración del Agente `datadog.yaml`][15]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. Si su Extensión de Lambda carga la clave de API de Datadog desde AWS Secrets Manager utilizando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, necesita [crear un punto final de VPC para Secrets Manager][17].

13. [Reinicie su Agente][13] para enviar datos a Datadog a través de AWS PrivateLink.

## Conéctese desde otras regiones {#connect-from-other-regions}

{{< tabs >}}
{{% tab "Puntos finales de PrivateLink entre regiones" %}}
1. Conecte la Consola de Administración de AWS a la región de su elección.
1. Desde el Panel de VPC, bajo {{< ui >}}PrivateLink and Lattice{{< /ui >}}, seleccione {{< ui >}}Endpoints{{< /ui >}}.
1. Haga clic en {{< ui >}}Create Endpoint{{< /ui >}}:
   {{< img src="agent/guide/private-link-vpc.png" alt="La página de puntos finales en el panel de VPC" style="width:90%;" >}}
1. Configure la configuración del punto final de la interfaz de VPC
   1. Opcionalmente, complete el {{< ui >}}Name tag{{< /ui >}}.
   1. Bajo {{< ui >}}Type{{< /ui >}}, seleccione {{< ui >}}PrivateLink Ready partner services{{< /ui >}}.
1. Descubra y configure el punto de conexión de la interfaz con soporte entre regiones:
   1. Bajo {{< ui >}}Service name{{< /ui >}}, complete el nombre del servicio con un nombre de servicio de PrivateLink válido de la tabla [ a continuación.](#privatelink-service-names)
   1. Bajo {{< ui >}}Service region{{< /ui >}}, haga clic en {{< ui >}}Enable Cross Region endpoint{{< /ui >}} y seleccione **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Haga clic en {{< ui >}}Verify service{{< /ui >}} y espere una notificación de _Nombre del servicio verificado_.
      **Nota:** Si no puedes verificar el servicio después de completar los pasos anteriores, contacta a [Soporte de Datadog][1].
1. En {{< ui >}}Network Settings{{< /ui >}}, selecciona una VPC para desplegar el punto de conexión de interfaz de VPC.
1. Asegúrate de que la opción {{< ui >}}Enable DNS name{{< /ui >}} esté marcada.
1. En {{< ui >}}Subnets{{< /ui >}}, selecciona una o más subredes en tu VPC para el punto de conexión de interfaz.
1. En {{< ui >}}Security Groups{{< /ui >}}, selecciona un grupo de seguridad para controlar quién puede enviar tráfico al punto de conexión de VPC.

   **Nota**: El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP 443.
1. Opcionalmente, proporciona un {{< ui >}}Name tag{{< /ui >}} y haz clic en {{< ui >}}Create endpoint{{< /ui >}}.
1. Permite unos minutos para que el estado del punto de conexión se actualice de {{< ui >}}Pending{{< /ui >}} a {{< ui >}}Available{{< /ui >}}. Esto puede tardar hasta 10 minutos. Si está tardando más de lo esperado, contacta a [Soporte de Datadog][1].

Después de que el estado del punto de conexión se actualice a {{< ui >}}Available{{< /ui >}}, puedes usar este punto de conexión para enviar telemetría a Datadog utilizando el punto de conexión de AWS PrivateLink entre regiones.

## Nombres de servicio de PrivateLink {#privatelink-service-names}

| Datadog                   | Nombre de servicio de PrivateLink                                                               | Nombre DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Registros (ingreso HTTP del agente)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Registros (ingesta HTTP del Usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Contenedores               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| DBM | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuración Remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

**Nota**: PrivateLink entre regiones no emite métricas de CloudWatch. Consulta [métricas de CloudWatch para AWS PrivateLink][2] para más información.

[1]: /es/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "Emparejamiento de VPC" %}}
1. Conecta la Consola de AWS a la región **{{< region-param key="aws_region" >}}** y crea un punto final de VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crea un punto final de VPC" style="width:80%;" >}}

2. Selecciona {{< ui >}}Find service by name{{< /ui >}}.
3. Llena el cuadro de texto _Nombre del servicio_ de acuerdo al servicio para el cual deseas establecer AWS PrivateLink:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="nombre del servicio de VPC" style="width:90%;" >}}

| Datadog                   | nombre del servicio de PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Registros (ingreso HTTP del agente)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Registros (ingesta HTTP del Usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Contenedores               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Haga clic {{< ui >}}Verify{{< /ui >}}. Si esto no devuelve _Nombre del servicio encontrado_, contacte a [soporte de Datadog][1].

5. A continuación, elija la VPC y las subredes que deben estar conectadas con el punto final del servicio de VPC de Datadog. No seleccione {{< ui >}}Enable DNS name{{< /ui >}} ya que el emparejamiento de VPC requiere que el DNS se configure manualmente.

6. Elija el grupo de seguridad de su elección para controlar qué puede enviar tráfico a este punto final de VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

7. Haga clic en {{< ui >}}Create endpoint{{< /ui >}} en la parte inferior de la pantalla. Si tiene éxito, se mostrará lo siguiente:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Punto final de VPC creado" style="width:80%;" >}}

8. Haga clic en el ID del punto final de VPC para verificar su estado.
9. Espere a que el estado cambie de _Pendiente_ a _Disponible_. Esto puede tardar hasta 10 minutos.
10. Después de crear el punto final, utilice el emparejamiento de VPC para hacer que el punto final de PrivateLink esté disponible en otra región para enviar telemetría a Datadog a través de PrivateLink. Para más información, consulte la página de [Trabajar con conexiones de VPC Peering][2] en AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de VPC" style="width:80%;" >}}

### Amazon Route53 {#amazon-route53}

1. Cree una [zona hospedada privada de Route53][3] para cada servicio para el cual ha creado un punto final de AWS PrivateLink. Adjunte la zona hospedada privada a la VPC en {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Cree una zona hospedada privada de Route53" style="width:80%;" >}}

Utilice la lista a continuación para mapear el servicio y el nombre DNS a diferentes partes de Datadog:

  | Datadog                   | nombre del servicio de PrivateLink                                                               | nombre DNS privado                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Registros (ingesta HTTP del Agente)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Registros (ingesta HTTP del Usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Contenedores               | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Perfilado                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

  También puede encontrar esta información interrogando la API de AWS, `DescribeVpcEndpointServices`, o utilizando el siguiente comando:

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  Por ejemplo, en el caso del punto de conexión de métricas de Datadog para {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

Esto devuelve <code>metrics.agent.{{< region-param key="dd_site" >}}</code>, el nombre de la zona privada alojada que necesita para asociar con la VPC de donde proviene el tráfico del Agente. Sobrescribir este registro captura todos los nombres de host relacionados con las métricas.

2. Dentro de cada nueva zona privada alojada de Route53, cree un registro A con el mismo nombre. Active la opción {{< ui >}}Alias{{< /ui >}}, luego, en {{< ui >}}Route traffic to{{< /ui >}}, elija {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **{{< region-param key="aws_region" >}}**, y escriba el nombre DNS del punto de conexión de la VPC asociado con el nombre DNS.**Notas**:
      - Para recuperar su nombre DNS, consulte la [documentación de configuración del nombre DNS privado del servicio de endpoint.][4]
      - El Agente envía telemetría a endpoints versionados, por ejemplo, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> que se resuelve a <code>metrics.agent.{{< region-param key="dd_site" >}}</code> a través de un alias CNAME. Por lo tanto, solo necesita configurar una zona privada alojada para <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Cree un registro A" style="width:90%;" >}}

3. Configure el emparejamiento de VPC y el enrutamiento entre la VPC en {{< region-param key="aws_region" code="true" >}} que contiene los puntos de conexión de Datadog PrivateLink y la VPC en la región donde se ejecutan los Agentes de Datadog.

4. Si las VPC están en diferentes cuentas de AWS, la VPC que contiene el Agente de Datadog debe estar autorizada para asociarse con las zonas privadas alojadas de Route53 antes de continuar. Cree una [autorización de asociación de VPC][5] para cada zona privada alojada de Route53 utilizando la región y el ID de la VPC donde se ejecuta el Agente de Datadog. Esta opción no está disponible en la Consola de AWS. Debe configurarse utilizando la AWS CLI, SDK o API.

5. Edite la zona alojada de Route53 para agregar VPCs de otras regiones.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Edite una zona alojada privada de Route53." style="width:80%;" >}}

6. Las VPCs que tienen la zona hospedada privada (PHZ) adjunta deben tener ciertas configuraciones activadas, específicamente `enableDnsHostnames` y `enableDnsSupport` en las VPCs con las que está asociada la PHZ. Consulte [Consideraciones al trabajar con una zona alojada privada][6].

7. [Reinicie el Agente][7] para enviar datos a Datadog a través de AWS PrivateLink.

#### Resolución de problemas de DNS y conectividad {#troubleshooting-dns-resolution-and-connectivity}

Los nombres de DNS deben resolverse a direcciones IP contenidas dentro del bloque CIDR de la VPC en {{< region-param key="aws_region" code="true" >}}, y las conexiones a `port 443` deben tener éxito.

{{< img src="agent/guide/private_link/successful-setup.png" alt="La conexión al puerto 443 debe ser exitosa." style="width:80%;" >}}

Si DNS se resuelve a direcciones IP públicas, entonces la zona de Route53 no ha **sido** asociada con la VPC en la región alternativa, o el registro A no existe.

Si DNS se resuelve correctamente, pero las conexiones a `port 443` están fallando, entonces el emparejamiento de VPC o el enrutamiento pueden estar mal configurados, o el puerto 443 puede no estar permitido hacia el bloque CIDR de la VPC en {{< region-param key="aws_region" code="true" >}}.

Las VPCs con la zona hospedada privada (PHZ) adjunta deben tener un par de configuraciones activadas. Específicamente, `enableDnsHostnames` y `enableDnsSupport` deben estar activados en las VPCs con las que está asociada la PHZ. Consulte [Configuraciones de Amazon VPC][6].

### Agente de Datadog {#datadog-agent}

1. Si está recopilando datos de registros, asegúrese de que su Agente esté configurado para enviar registros a través de HTTPS. Si los datos no están ya allí, agregue lo siguiente al [archivo de configuración del Agente `datadog.yaml`][8]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. Si su Lambda Extension carga la clave de API de Datadog desde AWS Secrets Manager utilizando el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, necesita [crear un punto de conexión de VPC para Secrets Manager][10].

3. [Reinicie el Agente][7].

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

{{% /site-region %}}

## Verifique que los datos se estén enviando usando PrivateLink {#verify-that-data-is-being-sent-using-privatelink}

Después de configurar PrivateLink, para verificar que los datos se estén enviando usando PrivateLink, ejecute el comando `dig` en una máquina que esté en esa VPC. Por ejemplo, ejecute este comando si ha configurado un PrivateLink para el punto final `http-intake.logs.datadoghq.com`:

```
dig http-intake.logs.datadoghq.com
```

Si los registros se están enviando a través de PrivateLink, la sección `ANSWER Section` de la salida muestra `http-intake.logs.datadoghq.com` como en el siguiente ejemplo. **Nota**: Las direcciones IP que reciba deben estar en [espacio de IP privado][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

Si los registros no se están enviando a través de PrivateLink, la `ANSWER SECTION` de la salida muestra el balanceador de carga (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) al que se están enviando los registros.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses