---
description: Integra tu entorno de Oracle Cloud Infrastructure con Datadog para una
  monitorización completa
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: Blog
  text: Monitorizar Oracle Cloud Infrastructure con Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: Blog
  text: Acelerar la monitorización de Oracle Cloud Infrastructure con Datadog OCI
    QuickStart
- link: /integrations/oracle-cloud-infrastructure
  tag: Documentación
  text: Integración de Oracle Cloud Infrastructure
- link: /agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de la nube?
title: Introducción a Oracle Cloud Infrastructure (OCI)
---

{{< jqmath-vanilla >}}

## Información general

Utiliza esta guía para empezar a monitorizar tu entorno de Oracle Cloud Infrastructure (OCI). La configuración QuickStart de Datadog simplifica el proceso de integración y aprovisiona automáticamente la infraestructura necesaria para recopilar métricas, logs y datos de recursos de tu tenencia de OCI.

{{% collapse-content title="Requisitos previos" level="h4" expanded=false id="prerequisites" %}}

### En OCI

Tu cuenta de usuario de OCI necesita lo siguiente:

- El rol **Identity Domain Administrator**
- Posibilidad de crear un usuario, un grupo de usuarios y un grupo dinámico en el dominio de identidad
- Posibilidad de crear políticas en el compartimento raíz

También debes:
- Estar registrado en la tenencia que deseas integrar
- Tener seleccionada la región de origen en la consola de OCI

**Nota**: La integración de OCI está restringida a una integración por tenencia. Se admiten todas las regiones comerciales de OCI (en el ámbito OC1) que existían a 1 de enero de 2026.

### En Datadog

Una [cuenta de Datadog][1] con [permisos para crear claves de API y de aplicación][30].

{{% /collapse-content %}}

## Instalación

QuickStart de Datadog para OCI es una experiencia de configuración totalmente gestionada que proporciona toda la infraestructura necesaria en tu tenencia. La configuración crea automáticamente Oracle Service Connector Hubs para transmitir métricas y logs a Datadog, y detecta continuamente nuevos recursos y compartimentos a medida que crece el entorno.

**Nota**: Antes de empezar, considera la posibilidad de [solicitar un aumento del límite de servicios][4] para Service Connector Hubs. El número aproximado necesario es:

$$\\text"Service Connector Hubs" = \text"Número de compartimentos en tenencia" / \text"5"\$$

### Configurar el cuadro de integración de Datadog OCI

1. Ve al [cuadro de integración de Datadog OCI][3] y haz clic en **Add New Tenancy** (Añadir nueva tenencia).

2. Selecciona o crea una clave de la API Datadog para utilizarla para la integración.
3. Crea una clave de la aplicación Datadog.
4. Activa o desactiva los logs mediante el conmutador.
5. Haz clic en **Create OCI Stack** (Crear stack tecnológico de OCI). Se abrirá el Oracle Resource Manager en la consola de OCI para completar el despliegue.

   **Nota**: Despliega este stack tecnológico sólo una vez por tenencia.

### Despliegue del stack tecnológico de ORM QuickStart

1. En la consola de OCI, acepta las Condiciones de uso de Oracle.
2. Deja sin marcar la opción de utilizar proveedores personalizados de Terraform.
3. Utiliza el directorio de trabajo por defecto u, opcionalmente, elige uno diferente.
4. Haz clic en **Siguiente**.
5. Deja en blanco la sección **(Optional) Choose specific subnet(s)** ((Opcional) Elegir subredes específicas)). QuickStart crea automáticamente una nueva Virtual Cloud Network (VCN) y subred en cada región, proporcionando la configuración más sencilla.

   **Opción avanzada**: para utilizar subredes existentes (un máximo de una por región de OCI), proporciona los OCIDs de subred (uno por línea, sin comas). Formato: `ocid1.subnet.oc[0-9].*`. Ejemplo: `ocid1.subnet.oc1.iad.abcedfgh`.
   Si estás utilizando subredes existentes, asegúrate de que cada VCN tiene salida HTTP a través de la Gateway NAT, un Service Gateway para "All Services In Oracle Services Network" (Todos los servicios en Oracle Services Network), reglas de tabla de rutas apropiadas y reglas de seguridad para solicitudes HTTP.

6. Deja en blanco la sección **(Optional) Choose a User** ((Opcional) Elegir un usuario). QuickStart crea un nuevo grupo y usuario en tu dominio de identidad de OCI actual, simplificando la configuración de IAM.

   **Opción avanzada**: para utilizar un grupo y un usuario existentes, proporciona tanto el OCID de **ID de grupo** como el de **ID de usuario**. El usuario debe ser miembro del grupo especificado.

7. Deja en blanco la sección **(Optional) Advanced configuration** ((Opcional) Configuración avanzada) para la mayoría de los casos de uso.

   **Opciones avanzadas**:
   - **Compartimento**: especifica un compartimento existente para los recursos creados en Datadog (por defecto se crea un nuevo compartimento "Datadog").
   - **Dominio**: proporciona un OCID de dominio de identidad para anular dónde se crean el usuario y el grupo. Requiere el rol **Identity Domain Administrator** en ese dominio.

8. Haz clic en **Siguiente**.
9. Haz clic en **Create** (Crear) y espera hasta 30 minutos a que se complete el despliegue. 

### Completar la configuración en Datadog

Vuelve al [cuadro de integración de Datadog OCI][3] y haz clic en **Ready!** (¡Listo!).

### Validación

Espera hasta 10 minutos a que empiecen a recopilarse datos y, a continuación, consulta las métricas de `oci.*` en el [dashboard de información general de la integración de OCI][5] o la [página del Metrics Explorer][6] en Datadog.

{{< img src="getting_started/integrations/oci/oci-dashboard.png" alt="El dashboard de información general de OCI en Datadog con varias métricas y gráficos desde los servicios de Oracle Cloud Infrastructure">}}

<div class="alert alert-info">Las métricas de función de OCI (espacio de nombres <code>oci.faas</code>) y métricas de instancia del contenedor (espacio de nombres <code>oci_computecontainerinstance</code>) están en vista previa.</div>

## Configuración

Una vez completada la configuración, aparecerá una pestaña de configuración para la tenencia en la parte izquierda del [cuadro de integración de Datadog OCI][3]. Aplica las configuraciones de recopilación de datos de toda la tenencia como se indica a continuación.

### Añadir regiones

En la pestaña **General**, selecciona las regiones para la recopilación de datos en la lista de casillas de verificación **Regiones**. Las selecciones de regiones se aplican a toda la tenencia, tanto para las métricas como para logs.

**Nota**: Si has utilizado el método de configuración QuickStart y después te has suscrito a una nueva región OCI, vuelve a aplicar el stack tecnológico de configuración inicial en ORM. La nueva región estará entonces disponible en el ícono de OCI de Datadog.

### Recopilación de métricas y logs 

Utiliza las pestañas **Metric collection** (Recopilación de métricas) y **Log collection** (Recopilación de logs) para configurar qué métricas y logs se envían a Datadog:

**Nota**: Los filtros se evalúan en orden: **Selected Services** (Servicios seleccionados) actúa como interruptor principal para la recopilación de datos de un servicio, después se aplican los filtros de etiquetas de compartimentos y, por último, los filtros de etiquetas de recursos.

#### Activar o desactivar toda la recopilación

Tanto la pestaña de recopilación de métricas como de logs tienen un botón principal para desactivar la recopilación de ese tipo de datos para toda la tenencia.

#### Limitar la recopilación a servicios específicos de OCI

Utiliza la sección **Selected Services** (Servicios seleccionados) para activar o desactivar la recopilación de servicios de OCI individuales. Al deshabilitar un servicio, se detiene toda la recopilación, independientemente de los filtros de etiquetas de recursos configurados para él. Cuando un servicio está habilitado, los filtros de etiquetas de recursos pueden restringir aún más la recopilación a recursos específicos dentro de ese servicio. Los recursos sin una etiqueta de inclusión coincidente quedan excluidos.

**Nota**: Los cambios del interruptor de servicio pueden tardar hasta 5 minutos en surtir efecto.

{{% collapse-content title="Sintaxis del filtro de etiquetas" level="h5" id="tag-filter-syntax" %}}

Las secciones **Compartment Tags** (Etiquetas de compartimentos) y **Limit Collection to Specific Resources** (Limitar la recopilación a recursos específicos) aceptan etiquetas de OCI separadas por comas `key:value`. Antepón una etiqueta `!` para negarla. El separador de comas se comporta de forma diferente en función de los tipos de etiquetas utilizados:

- **Solo etiquetas positivas**: lógica OR, incluida si el objeto de OCI tiene **cualquiera** de las etiquetas listadas.
- **Solo etiquetas negativas** (prefijadas con `!`): lógica OR excluida si **cualquiera** de las etiquetas negadas está presente.
- **Etiquetas mixtas positivas y negativas**: lógica AND, deben cumplirse **todas** las condiciones enumeradas para ser incluidas.

Por ejemplo:
- `datadog:monitored,env:prod*`: incluir si **cualquiera** de las etiquetas está presente.
- `!env:staging,!testing:true`: excluir si **cualquiera** de las etiquetas está presente.
- `datadog:monitored,!region:us-phoenix-1`: incluir solo si la etiqueta `datadog:monitored` está presente **y** la etiqueta `region:us-phoenix-1` está ausente.

{{% /collapse-content %}}

#### Limitar la recopilación por compartimentos

Utiliza la sección **Compartment Tags** (Etiquetas de compartimento) para incluir o excluir compartimentos específicos basándose en etiquetas de compartimento de OCI. Consulta [Sintaxis del filtro de etiquetas](#tag-filter-syntax) para obtener una referencia sintáctica.

**Nota**: En OCI, las etiquetas no son heredadas por los compartimentos secundarios; cada compartimento debe ser etiquetado individualmente. Tras modificar las etiquetas en OCI, los cambios pueden tardar hasta 15 minutos en aparecer en Datadog.

#### Limitar la recopilación a recursos específicos

Utiliza la sección **Limit Collection to Specific Resources** (Limitar la recopilación a recursos específicos) para definir qué recursos envían sus métricas o logs a Datadog. Selecciona un servicio de OCI en el menú desplegable y, a continuación, especifica las etiquetas de recursos a las que dirigirse. Consulta [Sintaxis del filtro de etiquetas](#tag-filter-syntax) para obtener una referencia de la sintaxis.

### Recopilación de recursos

En la pestaña **Resource Collection** (Recpilación de recursos) del [cuadro de integración de Datadog OCI][3], haz clic en el conmutador **Enable Resource Collection** (Habilitar recopilación de recursos). Los recursos son visibles en el [Datadog Resource Catalog][7].

## Saca más provecho de la plataforma Datadog

### Instala el Agent para una visibilidad más profunda

Mientras que la integración de OCI recopila automáticamente métricas de nivel de servicio a través de Oracle Cloud Monitoring, la instalación del [Datadog Agent][8] en tus instancias de computación desbloquea conocimientos más profundos sobre la infraestructura y las aplicaciones:

- **Métricas a nivel de sistema** con granularidad de subsegundos para CPU, memoria, disco y red.
- **Visibilidad a nivel de proceso** para conocer el consumo de recursos por aplicación
- **Métricas personalizadas** de tus aplicaciones a través de [DogStatsD][12]
- **Trazas distribuidas** para la visibilidad de las solicitudes de extremo a extremo
- **Logs** correlacionados con métricas para una resolución de problemas más rápida

El Agent se instala con un solo comando para la mayoría de los sistemas operativos, incluido Oracle Linux. Consulta las instrucciones de la [página de instalación del Agent][9], o lee [why you should install the Agent on cloud instances][13] para obtener más detalles sobre las ventajas.

### Utilizar el Datadog Agent con OCI Kubernetes Engine (OKE)

Para entornos en contenedores en OKE, puedes utilizar el [Datadog Agent para Kubernetes][14]. Utiliza la documentación dedicada de Kubernetes para desplegar el Agent en tu clúster de OKE y recopilar métricas, logs y trazas de tus aplicaciones en contenedores.

## Explorar servicios relacionados

### Monitorización de la GPU

Monitorizar las instancias de GPU de OCI es esencial para garantizar un rendimiento y una fiabilidad óptimos de tus cargas de trabajo de computación de alto rendimiento. La [integración de GPU de OCI][22] proporciona un conjunto completo de métricas de GPU a través del espacio de nombres `gpu_infrastructure_health`, lo que te permite realizar un seguimiento del estado, la capacidad, el rendimiento, el estado y el rendimiento de tus [instancias de GPU][23]. 

Después de configurar la integración de OCI, asegúrate de que los espacios de nombres relacionados con la GPU están incluidos en tu configuración de recopilación de métricas. Consulta el [dashboard de información general de la GPU de OCI][29] (creado automáticamente al configurar la integración de la GPU de OCI) para obtener una visión general de tu infraestructura de GPU.

### Cloud Cost Management

[Oracle Cloud Cost Management][24] de Datadog proporciona información para que los equipos de ingeniería y finanzas comprendan el impacto de los cambios en la infraestructura sobre los costes, asignen el gasto a toda la organización e identifiquen posibles mejoras. 

Para habilitar Cloud Cost Management para OCI:
1. Asegúrate de haber configurado la integración de OCI tal y como se ha descrito anteriormente.
2. Sigue las instrucciones de configuración de la [documentación de Oracle Cloud Cost Management ][24] para activar la recopilación de datos de costes.

### Cloud SIEM

Cloud SIEM proporciona análisis en tiempo real de logs operativos y de seguridad, utilizando integraciones y reglas predefinidas para detectar e investigar amenazas. 

Para utilizar Cloud SIEM con tu entorno de OCI:
1. Asegúrate de que la recopilación de logs está activada en la configuración de integración de OCI.
2. Revisa [Introducción a Cloud SIEM][25] para configurar la detección de amenazas.
3. Sigue la [Guía de configuración de OCI para Cloud SIEM][26] para configurar fuentes específicas de logs y reglas de seguridad para OCI.

Cloud SIEM analiza los logs de OCI para detectar:
- Intentos de acceso no autorizados
- Llamadas a la API sospechosas
- Cambios de configuración que puedan introducir riesgos para la seguridad
- Infracciones de cumplimiento

## Solucionar problemas

Si tienes problemas con la integración de OCI, consulta la [Guía de resolución de problemas de la integración de OCI][27].

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][28].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[3]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[4]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
[5]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[6]: https://app.datadoghq.com/metric/explorer
[7]: https://docs.datadoghq.com/es/infrastructure/resource_catalog/
[8]: /es/getting_started/agent/
[9]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /es/developers/dogstatsd/?tab=hostagent
[13]: /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[14]: /es/agent/kubernetes/?tab=helm
[22]: /es/integrations/oci_gpu/
[23]: https://www.oracle.com/cloud/compute/#gpu
[24]: /es/cloud_cost_management/setup/oracle/
[25]: /es/getting_started/cloud_siem/
[26]: /es/security/cloud_siem/guide/oci-config-guide-for-cloud-siem/
[27]: /es/integrations/guide/oci-integration-troubleshooting
[28]: /es/help/
[29]: https://app.datadoghq.com/dash/integration/31744/oci-gpu-overview
[30]: /es/account_management/rbac/permissions/#api-and-application-keys