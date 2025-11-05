---
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centro de arquitectura
  text: Utilización de PrivateLink entre regiones AWS para enviar telemetría a Datadog
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
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: Blog
  text: Reduce costos y mejora la seguridad con la conectividad entre regiones Datadog
    mediante AWS PrivateLink
title: Conectarse a Datadog a través de AWS PrivateLink
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-danger">Datadog PrivateLink no es compatible con el sitio Datadog seleccionado.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2" %}}

## Información general

Esta guía te presenta la configuración de [AWS PrivateLink][11] para su uso con Datadog. El proceso general consiste en configurar un endpoint interno en tu VPC, al que tus Datadog Agents puedan enviar datos. De esta forma, el endpoint de tu VPC se empareja con el endpoint de la VPC de Datadog.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="Esquema del diagrama de la VPC" >}}

Datadog expone endpoints de AWS PrivateLink en **{{< region-param key="aws_region" >}}**.
- Si necesitas enrutar tráfico en la misma región, sigue los pasos en [Conectarse desde la misma región](#connect-from-the-same-region) para configurar tu endpoint.
- Para enrutar tráfico a la oferta PrivateLink de Datadog en {{< region-param key="aws_region" >}} desde otras regiones, Datadog recomienda los [endpoints PrivateLink entre regiones](?tab=crossregionprivatelinkendpoints#connect-from-other-regions). [PrivateLink entre regiones][11] te permite establecer conexiones entre VPC a través de diferentes regiones AWS. Esto permite a los recursos de la VPC de diferentes regiones comunicarse entre sí a través de direcciones IP privadas. Alternativamente, utiliza el [emparejamiento de VPC](?tab=vpcpeering#connect-from-other-regions).

## Conectarse desde la misma región

1. Conecta la consola de AWS Management Console a la región elegida.
1. Desde el dashboard de la VPC, en **PrivateLink y Lattice**, selecciona **Endpoints**.
1. Haz clic en **Create Endpoint** (Crear endpoint):
   {{< img src="agent/guide/private-link-vpc.png" alt="Página de endpoints en el dashboard de la VPC" style="width:90%;" >}}
1. Selecciona **Find service by name** (Buscar servicio por nombre).
1. Rellena el cuadro de texto _Service Name_ (Nombre de servicio) en función del servicio para el que quieras configurar AWS PrivateLink:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre de servicio de la VPC" style="width:70%;" >}}

| Datadog                   | Nombre de servicio PrivateLink                                                               | Nombre de DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Admisión HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (Admisión HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Generación de perfiles                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

4. Haz clic en **Verify** (Verificar). Si esta acción no devuelve _Service name found_ (Nombre de servicio encontrado), ponte en contacto con el servicio de asistencia de Datadog.
5. Elige la VPC y las subredes que deben emparejarse con el endpoint de servicio de la VPC de Datadog.
6. Asegúrate de que en **Enable DNS name** (Habilitar nombre de DNS), Enable for this endpoint (Habilitar para este endpoint) está marcado:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Habilitar DNS privado" style="width:80%;" >}}

7. Elige el grupo de seguridad de tu preferencia para controlar qué puede enviar tráfico a este endpoint de VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

8. Haz clic en **Create endpoint** (Crear endpoint) en la parte inferior de la pantalla. Si es correcto, se mostrará lo siguiente:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC creado" style="width:60%;" >}}

9. Haz clic en el ID del endpoint de VPC para comprobar su estado.
10. Espera que el estado cambie de Pending (Pendiente) a Available (Disponible). Esto puede tomar hasta 10 minutos. Una vez que el estado sea Available (Disponible), puedes utilizar AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de VPC" style="width:60%;" >}}

11. Si ejecutas una versión del Datadog Agent anterior a v6.19 o v7.19 para recopilar datos de logs, asegúrate de que el Agent está configurado para enviar logs mediante HTTPS. Si los datos aún no están allí, añade lo siguiente al [archivo de configuración del Agent `datadog.yaml`][15]: 

    ```yaml
    logs_config:
        force_use_http: true
    ```

    Si estás utilizando el Agent de contenedor, configura la siguiente variable de entorno en su lugar:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    Esta configuración es obligatoria para enviar logs a Datadog con AWS PrivateLink y el Datadog Agent, y no es obligatoria para la extensión Lambda. Para ver más detalles, consulta [Recopilación de logs del Agent][16].

12. Si tu extensión de Lambda carga la clave de API Datadog desde AWS Secrets Manager mediante el ARN especificado por la variable de entorno `DD_API_KEY_SECRET_ARN`, necesitas [crear un endpoint de VPC para Secrets Manager][17].

13. [Reinicia tu Agent][13] para enviar datos a Datadog a través de AWS PrivateLink.

## Conectarse desde otras regiones

{{< tabs >}}
{{% tab "Cross-region PrivateLink endpoints" %}}
1. Conecta la consola de AWS Management a la región de tu preferencia.
1. Desde el dashboard de la VPC, en **PrivateLink y Lattice**, selecciona **Endpoints**.
1. Haz clic en **Create Endpoint** (Crear endpoint):
   {{< img src="agent/guide/private-link-vpc.png" alt="Página de endpoints en el dashboard de la VPC" style="width:90%;" >}}
1. Configurar los parámetros del endpoint de la interfaz de la VPC
   1. Opcionalmente, rellena la **etiqueta de nombre**.
   1. En **Tipo**, selecciona **Servicios de asociados PrivateLink Ready**.
1. Detecta y configura el endpoint de la interfaz con compatibilidad entre regiones:
   1. En **Nombre de servicio**, rellena el nombre de servicio con un nombre de servicio PrivateLink válido de la [tabla](#privatelink-service-names).
   1. En **Región del servicio**, haz clic en **Enable Cross Region endpoint** (Habilitar endpoint entre regiones) y selecciona **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Haz clic en **Verificar servicio** y espera la notificación _Service name verified_ (Nombre de servicio verificado).
      **Nota:** Si no puedes verificar el servicio luego de completar los pasos anteriores, ponte en contacto con el [servicio de asistencia de Datadog][1].
1. En **Parámetros de red**, selecciona una VPC con la que desplegar el endpoint de la interfaz de la VPC.
1. Asegúrate de que la opción para **habilitar el nombre del DNS** está marcada.
1. En **Subredes**, selecciona una o más subredes en tu VPC para el endpoint de la interfaz.
1. En **Grupos de seguridad**, selecciona un grupo de seguridad para controlar qué puede enviar tráfico al endpoint de la VPC.

   **Nota**: El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP 443.
1. Opcionalmente, proporciona una **etiqueta de nombre** y haz clic en **Create endpoint** (Crear endpoint).
1. Espera a el estado del endpoint cambie de **Pending** (Pendiente) a **Available** (Disponible). Esto puede tardar unos 10 minutos. Si tarda más tiempo de lo previsto, ponte en contacto con el [servicio de asistencia de Datadog][1].

Una vez que el estado del endpoint se actualice a **Available** (Disponible), podrás utilizar este endpoint para enviar telemetría a Datadog utilizando el endpoint AWS PrivateLink entre regiones.

## Nombres de servicio PrivateLink

| Datadog                   | Nombre de servicio PrivateLink                                                               | Nombre de DNS privado                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Admisión HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (Admisión HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Generación de perfiles                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

**Nota**: PrivateLink entre regiones no genera métricas de CloudWatch. Para obtener más información, consulta [Métricas de CloudWatch para AWS PrivateLink][2].

[1]: /es/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "VPC Peering" %}}
1. Conecta la consola de AWS a la región **{{< region-param key="aws_region" >}}** y crea un endpoint de VPC.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Crear un endpoint de VPC" style="width:80%;" >}}

2. Selecciona **Find service by name** (Buscar servicio por nombre).
3. Rellena el cuadro de texto _Service Name_ (Nombre de servicio) en función del servicio para el que quieres configurar AWS PrivateLink:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="Nombre de servicio de la VPC" style="width:90%;" >}}

| Datadog                   | Nombre de servicio PrivateLink                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (Admisión HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (Admisión HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Generación de perfiles                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Haz clic en **Verify** (Verificar). Si esta acción no devuelve _Service name found_ (Nombre de servicio encontrado), ponte en contacto con el [servicio de asistencia de Datadog][1].

5. Luego, elige la VPC y las subredes que deben emparejarse con el endpoint de servicio de la VPC de Datadog. No selecciones **Enable DNS name** (Habilitar nombre de DNS), ya que el emparejamiento de VPC requiere que el DNS se configure manualmente.

6. Elige el grupo de seguridad preferido para controlar qué puede enviar tráfico al endpoint de la VPC.

    **Nota**: **El grupo de seguridad debe aceptar tráfico entrante en el puerto TCP `443`**.

7. Haz clic en **Create endpoint** (Crear endpoint) en la parte inferior de la pantalla. Si es correcto, se muestra lo siguiente:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="Endpoint de VPC creado" style="width:80%;" >}}

8. Haz clic en el ID del endpoint de la VPC para comprobar su estado.
9. Espera unos 10 minutos a que el estado pase de _Pending_ (Pendiente) a _Available_ (Disponible)..
10. Después de crear el endpoint, utiliza el emparejamiento de VPC a fin de que el endpoint de PrivateLink esté disponible en otra región para enviar telemetría a Datadog a través de PrivateLink. Para obtener más información, lee la página [Trabajar con conexiones de emparejamiento de VPC][2] en AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="Estado de la VPC" style="width:80%;" >}}

### Amazon Route53

1. Crea una [zona Route53 alojada privada][3] para cada servicio para el que hayas creado un endpoint AWS PrivateLink. Adjunta la zona privada alojada a la VPC en {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Crear una zona Route53 alojada privada" style="width:80%;" >}}

Utiliza la siguiente lista para asignar nombres de servicio y DNS a diferentes elementos de Datadog:

  | Datadog                   | Nombre de servicio PrivateLink                                                               | Nombre de DNS privado                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Admisión HTTP del Agent)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Logs (Admisión HTTP del usuario)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Métricas                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Contenedores                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Proceso                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Generación de perfiles                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Trazas                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Configuración remota      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

  También puedes encontrar esta información interrogando a la API AWS, `DescribeVpcEndpointServices` o utilizando el siguiente comando:

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

## Comprobar que los datos se envían mediante PrivateLink

Después de configurar PrivateLink, para comprobar que los datos se envían utilizando PrivateLink, ejecuta el comando `dig` en una máquina que esté en esa VPC. Por ejemplo, ejecuta este comando si has configurado un PrivateLink para el endpoint `http-intake.logs.datadoghq.com`:

```
dig http-intake.logs.datadoghq.com
```

Si se están enviando logs a través de PrivateLink, la sección `ANSWER Section` de la salida muestra `http-intake.logs.datadoghq.com` como en el siguiente ejemplo. **Nota**: Las direcciones IP que recibas deben estar en un [espacio IP privado][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com. 60 IN   A   172.31.57.3
http-intake.logs.datadoghq.com. 60 IN   A   172.31.3.10
http-intake.logs.datadoghq.com. 60 IN   A   172.31.20.174
http-intake.logs.datadoghq.com. 60 IN   A   172.31.34.135
```

Si no se están enviando logs a través de PrivateLink, la sección `ANSWER SECTION` de la salida muestra el balanceador de carga (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) al que se están enviando los logs.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com. 177 IN  CNAME   http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses