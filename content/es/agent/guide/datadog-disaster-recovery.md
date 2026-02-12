---
further_reading:
- link: agent/remote_config/?tab=configurationyamlfile
  tag: Documentación
  text: Configuración remota
- link: /getting_started/site/
  tag: Documentación
  text: Empezando con los sitios de Datadog
- link: https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/
  tag: Blog
  text: Datadog Disaster Recovery atenúa las interrupciones de los proveedores de
    nube
private: true
site_support_id: datadog_disaster_recovery
title: Datadog Disaster Recovery
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-disaster-recovery/" header="Join the Preview!">}}
Datadog Disaster Recovery tiene disponibilidad limitada. Utiliza este formulario para solicitar acceso.
{{< /callout >}}

## Información general
Datadog Disaster Recovery (DDR) te ofrece una continuidad de la observabilidad de aquellos eventos que pueden afectar a la región de un proveedor de servicios de nube o a los servicios de Datadog que se ejecutan dentro de la región de un proveedor de servicios de nube. Con DDR, puedes recuperar la observabilidad en tiempo real de un sitio Datadog alternativo y funcional, lo que te permite cumplir tus objetivos de disponibilidad de observabilidad crítica.

DDR también te permite realizar periódicamente simulacros de recuperación en caso de desastres, no solo para probar tu capacidad de recuperación en caso de interrupciones, sino también para satisfacer tus necesidades empresariales y de cumplimiento de las normativas.


## Requisitos previos 
La versión mínima del Datadog Agent que necesitas depende de los tipos de telemetría que necesites utilizar:

|Telemetría compatible |Productos compatibles          |Versión del Agent requerida | 
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54 o posterior                |
|Métricas             |Infrastructure Monitoring   | v7.54 o posterior                |
|Trazas              |APM                         | v7.68 o posterior                |



<div class="alert alert-info">
Datadog evalúa continuamente las solicitudes de los clientes para que DDR sea compatible con otros productos. Ponte en contacto con el <a href="mailto:disaster-recovery@datadoghq.com">equipo de recuperación ante desastres</a> para conocer las próximas funcionalidades y tus necesidades específicas, si no están cubiertas en puntos anteriores.
</div>
<br>

## Configuración 
Para activar Datadog Disaster Recovery, sigue estos pasos. Si tienes alguna duda sobre alguno de ellos, ponte en contacto con tu [asesor de clientes](mailto:success@datadoghq.com) o con el [servicio de asistencia de Datadog](https://www.datadoghq.com/support/).

### 1. Crea una organización DDR y vincúlala a tu organización principal.

{{% collapse-content title="Crear y compartir tu organización DDR" level="h5" %}}

<div class="alert alert-info">Si es necesario, Datadog puede hacerlo por ti.</div>

#### Crear tu organización DDR

  1. Ve a [Empezando con Datadog](https://app.datadoghq.com/signup). Es posible que tengas que salir de tu sesión actual o utilizar el modo incógnito para acceder a esta página.
  2. Elige un sitio Datadog distinto del principal (por ejemplo, si estás en `US1`, elige `EU` o `US5`).
  3. Sigue las instrucciones para crear una cuenta.


Todos los sitios Datadog están separados geográficamente. Consulta las opciones en la [lista de sitios Datadog](https://docs.datadoghq.com/getting_started/site#access-the-datadog-site). 

Si también envías telemetría a Datadog utilizando integraciones de proveedores de nube, debes añadir tus cuentas de proveedores de nube en la organización DDR. Datadog no utiliza proveedores de nube para recibir datos de telemetría mientras el sitio DDR está pasivo (no en conmutación por error).

<br>

#### Compartir la información de la organización DDR con Datadog

Envía por correo electrónico el nombre de tu nueva organización a tu [asesor de clientes] (mailto:success@datadoghq.com). A continuación, tu asesor de clientes establecerá esta nueva organización como tu organización DDR.


**Nota:** Aunque esta organización aparece en tu jerarquía de facturación de Datadog, todo el uso y coste asociado _no_ se factura durante el periodo de vista previa.
{{% /collapse-content %}}


{{% collapse-content title="Recuperar los ID públicos y vincular tu DDR y tus organizaciones primarias" level="h5" %}}

<div class="alert alert-danger"> Por razones de seguridad, Datadog no puede vincular las organizaciones en su nombre. </div>

Una vez que el equipo de Datadog haya configurado tu organización DDR, utiliza el [endpoint de API pública][8] de Datadog para recuperar los ID públicos de la organización primaria y de la organización DDR.

Para vincular tus organizaciones DDR y primaria, ejecute estos comandos, sustituyendo los `<PLACEHOLDERS>` por los valores de tus organizaciones:


```shell
export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H 
"dd-api-key:${PRIMARY_DD_API_KEY}" -H 
"dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
```
Después de vincular tus organizaciones, solo la organización de conmutación por error muestra este banner:

{{< img src="agent/guide/ddr/ddr-banner.png" alt="Banner de DDR en la organización DDR" >}}

{{% /collapse-content %}}


<br>

<!-- ------------------------------- -->


### 2. Configurar el acceso, las integraciones, la sincronización y los agentes

{{% collapse-content title="Configurar el inicio de sesión único para la organización DDR" level="h5" %}}
**Datadog recomienda utilizar el inicio de sesión único (SSO)** para que todos los usuarios puedan iniciar sesión sin problemas en tu organización de recuperación ante desastres durante una interrupción.

Ve a [Configuración de la organización][1] en tu organización DDR para configurar [SAML][9] o Google Login para tus usuarios. 

Debes invitar a cada uno de tus usuarios a tu organización de recuperación ante desastres y otorgarles los roles y permisos adecuados. Como alternativa, para agilizar esta operación, puede utilizar el [aprovisionamiento justo a tiempo con SAML][2].
{{% /collapse-content %}}


{{% collapse-content title=" Configurar tus integraciones en la nube (AWS, Azure, Google Cloud)" level="h5" %}}

Consulta los pasos de configuración de las integraciones [AWS][10], [Azure][11] y [Google Cloud][12].

Tus integraciones en la nube deben configurarse tanto en la organización principal como en la DDR. Sin embargo, las integraciones solo deben ejecutarse en una organización a la vez:
- Por defecto, las integraciones deben ejecutarse solo en la organización primaria. 
- Cuando están en conmutación por error, las integraciones solo deben ejecutarse en la organización DDR.

Para obtener más información, consulta la sección sobre [conmutación por error en integraciones de nube](#id-for-cloud). 

{{% /collapse-content %}}

{{% collapse-content title="Crear tu clave de API y de aplicación Datadog para la sincronización" level="h5" %}}
En tu organización DDR de Datadog, crea un conjunto de [clave de API][15] **y** [clave de aplicación][16]. Son útiles para copiar dashboards y monitores entre sitios Datadog.

<div class="alert alert-info">
Datadog puede ayudarte a copiar las firmas de las claves API de tus Agents en la cuenta de copia de seguridad DDR. De este modo, no es necesario crear nuevas claves de API cuando se opera en la región DDR. Al utilizar las claves existentes, puedes evitar la complejidad de gestionar varios conjuntos de claves, reducir la sobrecarga operativa y simplificar la gestión de claves. Si tienes alguna pregunta, ponte en contacto con tu <a href="mailto:success@datadoghq.com">asesor de clientes</a>.
</div>
{{% /collapse-content %}}


{{% collapse-content title="Configurar la sincronización de recursos en un cronograma" level="h5" id="syncing-data" %}}

#### Uso de la herramienta datadog-sync-cli
Utiliza la herramienta [datadog-sync-cli][3] para copiar tus dashboards, monitores y otras configuraciones de tu organización primaria a tu organización DDR. 

La herramienta `datadog-sync-cli` está pensada principalmente para copiar y actualizar recursos de forma unidireccional desde tu organización principal a tu organización DDR. Los recursos copiados a la organización DDR pueden editarse, pero cualquier nueva sincronización anula los cambios que difieran de la fuente en la organización primaria.

La sincronización periódica es esencial para garantizar que tu organización DDR está actualizada en caso de desastre. Datadog recomienda realizar esta operación diariamente; puedes determinar la frecuencia y el momento de la sincronización en función de tus necesidades empresariales. Para obtener información sobre la configuración y ejecución del proceso de copia de seguridad, consulta el [datadog-sync-cli README][5]. 

Utiliza la configuración `datadog-sync-cli` disponible en la documentación para añadir cada elemento al contexto de sincronización. A continuación se muestra un ejemplo de archivo de configuración para sincronizar dashboards y monitores específicos utilizando el filtrado de nombres y etiquetas desde un sitio `EU` a un sitio `US5`:

```shell 
destination_api_url="https://api.us5.datadoghq.com"
destination_api_key="<US5_API_KEY>"
destination_app_key="<US5_APP_KEY>"
source_api_key="<EU_API_KEY>"
source_app_key="<EU_APP_KEY>"
source_api_url="https://api.datadoghq.eu"
filter=["Type=Dashboards;Name=title","Type=Monitors;Name=tags;Value=sync:true"]

# Asegúrate de aumentar el tiempo de reintento para hacer frente al límite de velocidad
http_client_retry_timeout=600
```

Este es un ejemplo de un comando datadog-sync-cli para sincronizar configuraciones de logs:

```shell
datadog-sync migrate –config config –resources="users,roles,logs_pipelines,logs_pipelines_order,logs_indexes,logs_indexes_order,logs_metrics,logs_restriction_queries" –cleanup=Force
```

<div class="alert alert-danger"> <strong>Limitación datadog-sync-cli para atributos estándar de logs </strong><br> La datadog-sync-cli se actualiza regularmente con nuevos recursos. En este momento, la sincronización de atributos estándar de logs no es compatible con la beta privada. Si utilizas atributos estándar con tus pipelines de logs y estás reasignando tus logs, los atributos son una dependencia que necesitas reconfigurar manualmente en tu organización DDR. Consulta la <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#overview">documentación sobre atributos estándar</a> de Datadog para obtener ayuda.
</div>

#### Verificar la disponibilidad en el sitio DDR
Verifica que tu organización DDR es accesible y que tus dashboards y monitores se copian de tu organización primaria a tu organización DDR.

Si necesitas ayuda, ponte en contacto con tu [asesor de clientes](mailto:success@datadoghq.com) o con el [servicio de asistencia de Datadog](https://www.datadoghq.com/support/).


[3]: https://github.com/DataDog/datadog-sync-cli
[5]: https://github.com/DataDog/datadog-sync-cli/blob/main/README.md 
{{% /collapse-content %}}



{{% collapse-content title="Activar la configuración remota [**RECOMENDADO]" level="h5" %}}
La [Configuración remota (RC)][7] te permite configurar y cambiar de forma remota el comportamiento de los Datadog Agents desplegados en tu infraestructura.

La Configuración remota está habilitada por defecto para las nuevas organizaciones, incluyendo tu organización DDR. Todas las nuevas claves de API que crees estarán habilitadas para su uso con tu Agent. Para ver más detalles, consulta la [documentación de configuración remota][7].

Datadog recomienda encarecidamente el uso de la configuración remota para un control de conmutación por error más continuo. Como alternativa a la configuración remota, puedes configurar manualmente tus Agents o utilizar herramientas de gestión de la configuración como Puppet, Ansible o Chef.
{{% /collapse-content %}}


{{% collapse-content title="Envío dual de telemetría a organizaciones DDR durante conmutaciones por error o simulacros" level="h5" %}}

El [Envío dual][17] permite enviar simultáneamente los mismos datos a dos organizaciones diferentes, como por ejemplo una organización primaria y otra de conmutación por error. A partir del Agent **v7.54 o posteriores**, una nueva configuración de DDR permite a los Datadog Agents enviar {{< tooltip text="telemetry" tooltip="Datos que se envían a la plataforma Datadog. Por ejemplo, `logs`, `metrics`, `traces`. " >}} que se designan como organizaciones de conmutación por error cuando se activa la conmutación por error.

**El envío dual está desactivado por defecto**, pero puedes activarlo para respaldar tus ejercicios y simulacros periódicos de recuperación ante desastres.

Para habilitar el envío dual, Datadog recomienda utilizar [Fleet Automation][18] para facilitar la gestión y la escalabilidad. Alternativamente, puedes configurarlo manualmente editando tu archivo `datadog.yaml`.

Ponte en contacto con tu asesor de clientes de Datadog para programar intervalos de tiempo exclusivos para realizar tests de conmutación por error, para medir el rendimiento y el objetivo de tiempo de recuperación (RTO).

{{< tabs >}}
{{% tab "Uso de Fleet Automation (recomendado)" %}}

Desde la página [Fleet Automation][14] de tu organización de conmutación por error, en la pestaña **Configure Agents** (Configurar Agents), puedes crear una nueva política de conmutación por error o reutilizar una existente y aplicarla a tu flota de Agents. Poco después de habilitar la política, los Agents comienzan a enviar telemetría de forma dual, tanto al sitio de observabilidad primario como al de DDR (conmutación por error).

Para crear una política de conmutación por error, haz clic en **Create Failover Policy** (Crear política de conmutación por error).

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="Gestionar políticas DDR" style="width:80%;" >}}


Luego, sigue las instrucciones para delimitar los hosts y la telemetría (métricas, logs, trazas) que debes conmutar por error.

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="Delimitar los hosts y la telemetría que se necesita conmutar por error" style="width:80%;" >}}


<div class="alert alert-danger">
<strong>Nota</strong>: Las integraciones en la nube solo pueden ejecutarse en tu sitio primario o en el sitio DDR Datadog, pero no en ambos al mismo tiempo, por lo que su conmutación por error hará que cesen los datos de la integración en la nube en tu sitio primario. <strong>Durante la conmutación por error de una integración, las integraciones solo se ejecutan en el centro de datos DDR</strong>. Cuando ya no esté en conmutación por error, desactiva la política de conmutación por error para devolver la recopilación de datos de la integración a la organización primaria. 
</div>


[14]: https://app.datadoghq.com/fleet
{{% /tab %}}

{{% tab "Manualmente" %}}

Durante una conmutación por error o ejercicios de conmutación por error, actualiza el archivo de configuración `datadog.yaml` del Datadog Agent como se muestra en el siguiente ejemplo y reinicia el Agent.


- `enabled: true` permite al Agent enviar {{< tooltip text="metadata" tooltip="Datos del Agent y el host de infraestructura. Por ejemplo, `host name`, `host tags`, `Agent version`. " >}} al sitio DDR Datadog para que puedas ver los Agents y tus hosts de Infra en la organización DDR. Esto te permite ver tus Agents y hosts de infraestructura en la organización de conmutación por error. <br><br>
- `failover_metrics`, `failover_logs`, y `failover_apm` son `false` por defecto. Configurarlos como `true` hace que el Agent comience a enviar {{< tooltip text="telemetry" tooltip="Datos que se envían a la plataforma Datadog. Por ejemplo, `logs`, `metrics`, `traces`. " >}} a la organización DDR.


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
{{% /collapse-content %}} <br>


### 3. Ejecutar tests de conmutación por error en varios entornos
{{% collapse-content title="Activar y probar la conmutación por error DDR en entornos basados en el Agent" level="h5" %}}

Para activar una conmutación por error de tus Agents, puedes hacer clic en una de las políticas en [Fleet Automation][14] de tu organización DDR y luego hacer clic en **Enable** (Activar). El estado de cada host se actualiza a medida que se produce la conmutación por error.


{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="Activar la política de conmutación por error en la organización DDR" style="width:80%;" >}}

Sigue los pasos correspondientes a tu entorno para activar/probar la conmutación por error DDR.

{{< tabs >}}
{{% tab "Agent en entornos no contenerizados" %}}

Para despliegues del Agent en entornos no contenerizados, utiliza los siguientes comandos CLI del Agent:

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```
{{% /tab %}}

{{% tab "Agent en entornos contenedorizados" %}}

Si estás ejecutando el Agent en un entorno contenedorizado como Kubernetes, puedes seguir utilizando la herramienta de línea de comandos del Agent, pero necesitas invocarla en el contenedor que ejecuta el Agent. Puedes realizar cambios utilizando una de las siguientes opciones, dependiendo de tus necesidades:

- [kubectl](#using-kubectl)
- [Archivo de configuración del Agent (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm chart o Datadog Operator](#using-the-helm-chart-or-datadog-operator)

<br>

 ##### Uso de kubectl

A continuación se muestra un ejemplo de uso de `kubectl` para conmutar por error las métricas y logs de un pod del Datadog Agent desplegado con el Helm chart oficial o Datadog Operator. El `<POD_NAME>` debe sustituirse por el nombre del pod del Agent:

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```
<br>

 ##### Uso del archivo de configuración del Agent
Como alternativa, puedes especificar los siguientes parámetros en el archivo de configuración principal del Agent (`datadog.yaml`) y reiniciar el Datadog Agent para que se apliquen los cambios:

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```
<br>

 ##### Uso de Helm chart o Datadog Operator

Puedes realizar cambios similares con el Helm chart oficial o Datadog Operator si necesitas especificar una configuración personalizada. De lo contrario, puedes pasar los parámetros como variables de entorno:

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

{{% collapse-content title="Activar y probar la conmutación por error DDR en integraciones en la nube" level="h5" id="id-for-cloud" %}}


Puedes probar la conmutación por error de tus integraciones en la nube desde la página de inicio del DDR de tu organización.

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="Activar la política de conmutación por error en la organización DDR" style="width:80%;" >}}

En la página de conmutación por error, puedes comprobar el estado de tu organización DDR  o hacer clic en **Fail over your integrations** (Realizar conmutación por error de tus integraciones) para probar la conmutación por error de tu integración en la nube.

<div class="alert alert-danger">
Cuando ya no esté en conmutación por error, <strong>desactiva la política de conmutación por error</strong> en la organización DDR para devolver la recopilación de datos de la integración a la organización principal. 
</div>

Durante la prueba, la telemetría de la integración se reparte entre ambas organizaciones. Si cancelas una prueba de conmutación por error, las integraciones vuelven a ejecutarse en el centro de datos primario.

{{% /collapse-content %}}<br>

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/users
[2]: /es/account_management/saml/#just-in-time-jit-provisioning
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: /es/getting_started/site/#access-the-datadog-site
[5]: https://github.com/DataDog/datadog-sync-cli/blob/main/README.md 
[6]: /es/logs/log_configuration/attributes_naming_convention/#overview
[7]: /es/agent/remote_config/?tab=configurationyamlfile
[8]: /es/api/latest/organizations/#list-your-managed-organizations
[9]: /es/account_management/saml/#overview
[10]: /es/integrations/amazon-web-services/
[11]: /es/integrations/azure/
[12]: /es/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview
[13]: /es/agent/guide/datadog-disaster-recovery/?tab=agentinnoncontainerizedenvironments#cloud-integrations-failover
[14]: https://app.datadoghq.com/fleet
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/organization-settings/application-keys
[17]: https://docs.datadoghq.com/es/agent/configuration/dual-shipping/?tab=helm
[18]: https://docs.datadoghq.com/es/agent/fleet_automation/#overview