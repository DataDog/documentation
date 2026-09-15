---
aliases:
- /es/agent/guide/datadog-disaster-recovery/
further_reading:
- link: agent/remote_config/?tab=configurationyamlfile
  tag: Documentación
  text: Remote Configuration
- link: /getting_started/site/
  tag: Documentación
  text: Introducción a Datadog Sites
- link: https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/
  tag: Blog
  text: Datadog Disaster Recovery mitiga las interrupciones del proveedor de la nube
site_support_id: datadog_disaster_recovery
title: Datadog Disaster Recovery
---
## Descripción general {#overview}

Datadog Disaster Recovery (DDR) le proporciona continuidad de observabilidad durante eventos que pueden afectar a una región de proveedor de servicios en la nube o a los servicios de Datadog que se ejecutan dentro de una región de proveedor de la nube. Con DDR, puede recuperar la observabilidad en vivo en un sitio de Datadog alternativo y funcional, lo que le permite cumplir con sus objetivos críticos de disponibilidad de observabilidad.

DDR también le permite realizar periódicamente simulacros de recuperación ante desastres no solo para probar su capacidad de recuperación ante eventos de interrupción, sino también para cumplir con sus necesidades comerciales y de cumplimiento normativo.

## Requisitos previos {#prerequisites}
La versión mínima del Datadog Agent que necesita depende de los tipos de telemetría que necesite usar:

|Telemetría admitida |Productos admitidos          |Versión de Agent requerida | 
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54+                |
|Métricas             |Infrastructure Monitoring   | v7.54+                |
|Traces              |APM                         | v7.68+                |



<div class="alert alert-info">
Datadog evalúa continuamente las solicitudes de los clientes para admitir DDR en productos adicionales. Comuníquese con el <a href="mailto:disaster-recovery@datadoghq.com">equipo de Disaster Recovery</a> para obtener información sobre las próximas capacidades y sus necesidades específicas si no están cubiertas anteriormente.
</div>
<br>

## Configuración {#setup}

Para habilitar Datadog Disaster Recovery, siga estos pasos. Si tiene alguna pregunta sobre cualquiera de los pasos, comuníquese con su [Customer Success Manager][14] o con el [Datadog Support][15].

### 1. Cree una organización de DDR y vincúlela a su organización principal {#1-create-a-ddr-org-and-link-it-to-your-primary-org}

{{% collapse-content title="Cree y comparta su organización de DDR" level="h4" %}}

<div class="alert alert-info">Si es necesario, Datadog puede configurar esto por usted.</div>

#### Cree su organización de DDR {#create-your-ddr-org}

1. Vaya a [Comience con Datadog][16]. Es posible que deba cerrar la sesión actual o usar el modo incógnito para acceder a esta página.
2. Elija un sitio de Datadog diferente al principal (por ejemplo, si está en `US1`, elija `EU` o `US5`).
3. Siga las instrucciones para crear una cuenta.

Todos los sitios de Datadog están separados geográficamente. Consulte la [Lista de sitios de Datadog][17] para ver las opciones.

Si también está enviando telemetría a Datadog mediante integraciones de proveedores de nube, debe agregar sus cuentas de proveedor de nube en la organización de DDR. Datadog no utiliza proveedores de nube para recibir datos de telemetría mientras el sitio de DDR está en modo pasivo (no en conmutación por error).

#### Comparta la información de la organización de DDR con Datadog {#share-the-ddr-org-information-with-datadog}

Envíe por correo electrónico el nombre de su nueva organización a su [Customer Success Manager][14]. Luego, su Customer Success Manager configurará esta nueva organización como su organización de DDR.

{{% /collapse-content %}}

{{% collapse-content title="Recupere los ID públicos y vincule su organización principal y la organización de DDR." level="h4" %}}

Por razones de seguridad, Datadog no puede vincular las organizaciones en su nombre.

Después de que el equipo de Datadog haya configurado su organización de DDR, utilice el [punto de conexión de API pública][1] de Datadog para recuperar los ID públicos de la organización principal y de la de DDR.

Para vincular su organización de DDR a su organización principal:

- Agregue el contexto `disaster_recovery_status_write` a su clave de aplicación en la organización principal.
- Ejecute los siguientes comandos, reemplazando los marcadores de posición con los valores correspondientes.

```shell
export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H \
"dd-api-key:${PRIMARY_DD_API_KEY}" -H \
"dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
```

Después de vincular sus organizaciones, solo la organización de conmutación por error muestra este banner:

{{< img src="agent/guide/ddr/ddr-banner.png" alt="El banner de DDR en la organización de DDR" >}}

{{% /collapse-content %}}

### 2. Configure el acceso, las integraciones, la sincronización y los agentes {#2-set-up-access-integrations-syncing-and-agents}

{{% collapse-content title="Configure el inicio de sesión único para la organización de DDR" level="h4" %}}

**Datadog recomienda usar el inicio de sesión único (SSO)** para permitir que todos sus usuarios inicien sesión en su organización de DDR durante una interrupción.

Vaya a la [Configuración de la organización][2] en su organización de DDR para configurar [SAML][3] o {{< ui >}}Google Login{{< /ui >}} para sus usuarios.

La sincronización administrada replica las cuentas de usuario desde su organización principal a su organización de DDR. Datadog recomienda configurar el [aprovisionamiento Just-in-Time con SAML][4] para que los usuarios puedan acceder a la organización de DDR durante una conmutación por error sin necesidad de restablecer su contraseña.

{{% /collapse-content %}}

{{% collapse-content title="Configure sus integraciones en la nube (AWS, Azure, Google Cloud)" level="h4" %}}

Consulte las integraciones de [AWS][5], [Azure][6] y [Google Cloud][7] para conocer los pasos de configuración.

Sus integraciones en la nube deben configurarse tanto en la organización principal como en la de DDR, pero solo se ejecutan en una organización a la vez: de forma predeterminada en la organización principal y en la organización de DDR durante la conmutación por error.

Para obtener más información, consulte la sección [Conmutación por error de integraciones en la nube](#id-for-cloud).

{{% /collapse-content %}}

{{% collapse-content title="Configure las credenciales para la sincronización de recursos administrada" level="h4" id="syncing-data" %}}

Datadog administra la sincronización de recursos en su nombre utilizando la herramienta de código abierto [datadog-sync-cli][8]. Usted no necesita ejecutar ni operar esta herramienta por su cuenta.

La sincronización administrada replica los recursos de su organización principal a su organización de DDR según un horario regular. Los recursos replicados incluyen tableros, monitores, usuarios, cuadernos y [34+ otros tipos de recursos][9]. La replicación se ejecuta según este horario para que su organización de DDR se mantenga actualizada antes de una interrupción.

**Los usuarios están limitados a cada sitio de Datadog.** La sincronización administrada replica las cuentas de usuario a su organización de DDR. Sin embargo, es posible que los usuarios deban restablecer su contraseña al iniciar sesión por primera vez en la organización de DDR. Datadog recomienda configurar el [aprovisionamiento Just-in-Time con SAML][4] para que los usuarios puedan acceder a la organización de DDR sin restablecimientos manuales de contraseña.

**La sincronización administrada utiliza una [cuenta de servicio][10] de Datadog.** Durante la incorporación, cree una cuenta de servicio en su organización de DDR para leer y replicar recursos desde su organización principal. Los recursos sincronizados mediante la sincronización administrada son aprovisionados por un usuario asignado a su propietario original cuando es posible.

{{% /collapse-content %}}

{{% collapse-content title="Habilitar Remote Configuration [**RECOMMENDED]" level="h4" %}}

[Remote Configuration (RC)][11] le permite configurar y cambiar de forma remota el comportamiento de los Datadog Agents implementados en su infraestructura.

Remote Configuration está habilitado de forma predeterminada para las nuevas organizaciones, incluida su organización de DDR. Cualquier clave de API nueva que cree está habilitada para RC para su uso con su Datadog Agent. Para obtener más detalles, consulte la [documentación de Remote Configuration][11].

Datadog recomienda encarecidamente usar Remote Configuration para un mejor control de la conmutación por error. Como alternativa a RC, puede configurar manualmente sus Datadog Agents o utilizar herramientas de gestión de configuración como Puppet, Ansible o Chef.

{{% /collapse-content %}}

{{% collapse-content title="Envío dual de telemetría a la organización de DDR durante la conmutación por error o los simulacros" level="h4" %}}


Para habilitar el envío dual, Datadog recomienda usar [Fleet Automation][12] para la administración a escala. Alternativamente, puede configurarlo manualmente editando su archivo `datadog.yaml`.

Comuníquese con su Customer Success Manager de Datadog para programar ventanas de tiempo dedicadas para las pruebas de conmutación por error a fin de medir el rendimiento y el Objetivo de Tiempo de Recuperación (RTO).

{{< tabs >}}
{{% tab "Uso de Fleet Automation (recomendado)" %}}

Desde la página [Fleet Automation][100] en su organización de conmutación por error, en la pestaña {{< ui >}}Configure Agents{{< /ui >}}, puede crear una política de conmutación por error o reutilizar una existente, y aplicarla a su flota de Datadog Agents. Poco después de habilitar la política, los Datadog Agents comienzan a realizar el envío dual de telemetría tanto al sitio de observabilidad principal como al de DDR (conmutación por error).

Para crear una política de conmutación por error, haga clic en {{< ui >}}Create Failover Policy{{< /ui >}}.

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="Administrar políticas de DDR" style="width:80%;" >}}

Luego, siga las instrucciones para definir el alcance de los hosts y la telemetría (métricas, Logs, Traces) que necesita incluir en la conmutación por error.

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="Definir el alcance de los hosts y la telemetría necesarios para la conmutación por error" style="width:80%;" >}}

<div class="alert alert-danger">Las Cloud Integrations solo pueden ejecutarse en su sitio de Datadog principal o en el de DDR, pero no en ambos al mismo tiempo, por lo que realizar una conmutación por error de estas detiene los datos de Cloud Integration en su sitio principal. <strong>Durante una conmutación por error de integración, las integraciones se ejecutan solo en el centro de datos DDR.</strong> Cuando ya no esté en conmutación por error, deshabilite la política de conmutación por error para devolver la recopilación de datos de integración a la organización principal.</div>

[100]: https://app.datadoghq.com/fleet

{{% /tab %}}

{{% tab "Manualmente" %}}

Durante una conmutación por error o ejercicios de conmutación por error, actualice el archivo de configuración `datadog.yaml` de su Datadog Agent como se muestra en el ejemplo a continuación y reinicie el Datadog Agent.

- `enabled: true` permite que el Datadog Agent envíe {{< tooltip text="metadata" tooltip="Datos sobre el Datadog Agent y el servidor de infraestructura. Por ejemplo, `host name`, `host tags`, `Agent version`." >}} al sitio de Datadog DDR para que pueda visualizar los Agents y sus servidores de infraestructura en la organización DDR. Esto le permite ver sus Agents y servidores de infraestructura en la organización de conmutación por error.

- `failover_metrics`, `failover_logs` y `failover_apm` están `false` de forma predeterminada. Configurarlos en `true` hace que el Agent comience a enviar {{< tooltip text="telemetry" tooltip="Datos que se envían a la plataforma Datadog. Por ejemplo, `logs`, `metrics`, `traces`." >}} a la organización DDR.

```shell
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_apm: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configurar la conmutación por error basada en DNS" level="h4" %}}

La conmutación por error basada en DNS es un enfoque complementario a la conmutación por error basada en Agent. En lugar de configurar los Datadog Agents con un punto de conexión de sitio secundario, configure todas sus fuentes de datos para enviar telemetría a una única URL de ingesta personalizada proporcionada por Datadog. Durante un evento de conmutación por error, Datadog actualiza el registro DNS de esa URL para redirigir el tráfico de su sitio principal a su sitio de DDR.

<div class="alert alert-info">La conmutación por error de DNS es todo o nada. Todas las fuentes de telemetría que utilizan su punto de conexión personalizado realizan la transición simultáneamente.</div>

#### Reciba su punto de conexión DNS personalizado {#receive-your-custom-dns-endpoint}

Si elige utilizar la conmutación por error basada en DNS, Datadog proporciona una URL de ingesta personalizada para su organización (por ejemplo, `<your-org>.intake.datadoghq.com`). Configure todas sus fuentes de datos (Datadog Agents, remitentes de registros e instrumentación personalizada) para enviar telemetría a este punto de conexión en lugar de a la URL de ingesta predeterminada de Datadog. Este es un cambio de configuración único.

#### Active una conmutación por error de DNS {#trigger-a-dns-failover}

Para iniciar una conmutación por error de DNS, comuníquese con Datadog a través de su [Gerente de éxito del cliente][14] o [Soporte de Datadog][15]. Datadog actualiza el registro DNS para redirigir el tráfico de su sitio principal a su sitio de DDR. El objetivo de tiempo de recuperación (RTO) previsto desde el momento en que se inicia la conmutación por error es de 2 horas.

<div class="alert alert-info">Una forma controlada por el cliente para activar la conmutación por error de DNS directamente desde la organización de DDR se encuentra en vista previa. Comuníquese con su <a href="mailto:success@datadoghq.com">Gerente de éxito del cliente</a> para obtener más información.</div>

{{% /collapse-content %}}

### 3. Ejecute pruebas de conmutación por error en varios entornos {#3-run-failover-tests-in-various-environments}

{{% collapse-content title="Active y pruebe la conmutación por error de DDR en entornos basados en Agent." level="h4" %}}

Para activar una conmutación por error de sus Agents, puede hacer clic en una de las políticas en [Fleet Automation][13] en su organización de DDR y, luego, hacer clic en {{< ui >}}Enable{{< /ui >}}. El estado de cada servidor se actualiza a medida que ocurre la conmutación por error.

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="Habilite la política de conmutación por error en la organización de DDR" style="width:80%;" >}}

Utilice los pasos adecuados para su entorno para activar/probar la conmutación por error de DDR.

{{< tabs >}}
{{% tab "Agent en entornos sin contenedores." %}}

Para implementaciones del Agent en entornos sin contenedores, utilice los siguientes comandos de la CLI del Agent:

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```

{{% /tab %}}

{{% tab "Agent en entornos sin contenedores" %}}

Si está ejecutando el Agent en un entorno sin contenedores como Kubernetes, aún puede usar la herramienta de línea de comandos del Agent, pero debe invocarla en el contenedor que ejecuta el Agent. Puede realizar cambios utilizando una de las siguientes opciones, según sus necesidades:

- [kubectl](#using-kubectl)
- [Archivo de configuración del Agent (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm chart o Datadog Operator](#using-the-helm-chart-or-datadog-operator)

##### Uso de kubectl {#using-kubectl}

A continuación, se muestra un ejemplo del uso de `kubectl` para realizar la conmutación por error de métricas y registros para un pod de Datadog Agent implementado con el Helm chart oficial o Datadog Operator. El `<POD_NAME>` debe reemplazarse por el nombre del pod del Agent:

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Uso del archivo de configuración del Agent {#using-the-agent-configuration-file}

Alternativamente, puede especificar los siguientes ajustes en el archivo de configuración principal del Datadog Agent (`datadog.yaml`) y reiniciar el Datadog Agent para que se apliquen los cambios:

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

##### Uso de Helm chart o Datadog Operator {#using-the-helm-chart-or-datadog-operator}

Puede realizar cambios similares con el Helm chart oficial o con Datadog Operator si necesita especificar una configuración personalizada. De lo contrario, puede pasar los ajustes como variables de entorno:

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_APM=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Activar y probar la conmutación por error de DDR en integraciones en la nube" level="h4" id="id-for-cloud" %}}

Puede probar la conmutación por error para sus integraciones en la nube desde la página de inicio de su organización DDR.

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="Habilite la política de conmutación por error en la organización de DDR" style="width:80%;" >}}

En la página de inicio de conmutación por error, puede verificar el estado de su organización DDR o hacer clic en {{< ui >}}Fail over your integrations{{< /ui >}} para probar la conmutación por error de su integración en la nube.

Cuando ya no esté en conmutación por error, **deshabilite la política de conmutación por error** en la organización DDR para devolver la recopilación de datos de integración a la organización principal.

Durante las pruebas, la telemetría de integración se distribuye entre ambas organizaciones. Si cancela una prueba de conmutación por error, las integraciones volverán a ejecutarse en el centro de datos principal.

{{% /collapse-content %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/organizations/#list-your-managed-organizations
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /es/account_management/saml/#overview
[4]: /es/account_management/saml/#just-in-time-jit-provisioning
[5]: /es/integrations/amazon-web-services/
[6]: /es/integrations/azure/
[7]: /es/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview
[8]: https://github.com/DataDog/datadog-sync-cli
[9]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[10]: /es/account_management/org_settings/service_accounts/
[11]: /es/agent/remote_config/?tab=configurationyamlfile
[12]: /es/agent/fleet_automation/#overview
[13]: https://app.datadoghq.com/fleet
[14]: mailto:success@datadoghq.com
[15]: https://www.datadoghq.com/support/
[16]: https://app.datadoghq.com/signup
[17]: /es/getting_started/site#access-the-datadog-site