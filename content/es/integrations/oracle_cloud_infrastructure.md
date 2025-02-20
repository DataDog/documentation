---
app_id: oracle-cloud-infrastructure
app_uuid: c2b4d38f-dd23-4ca2-8bc4-b70360868e8c
assets:
  dashboards:
    Oracle-Cloud-Infrastructure-Overview-Dashboard: assets/dashboards/oracle-cloud-infrastructure-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - oci.computeagent.cpu_utilization
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 310
    source_type_name: Oracle Cloud Infrastructure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- recopilación de logs
- la red
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_cloud_infrastructure
integration_id: oracle-cloud-infrastructure
integration_title: Oracle Cloud Infrastructure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oracle_cloud_infrastructure
public_title: Oracle Cloud Infrastructure
short_description: OCI es una colección de servicios en la nube diseñada para dar
  soporte a una serie de aplicaciones en un entorno alojado.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI es una colección de servicios en la nube diseñada para dar soporte
    a una serie de aplicaciones en un entorno alojado.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Cloud Infrastructure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Oracle Cloud Infrastructure (OCI) es una infraestructura como servicio (IaaS) y plataforma como servicio (PaaS) utilizada por empresas. Con un completo conjunto de servicios gestionados para alojamiento, almacenamiento, redes, bases de datos y mucho más.

Utiliza la integración de OCI de Datadog para reenviar tus logs y métricas a Datadog, donde pueden servir para dashboards, pueden ayudar a solucionar problemas y ser monitorizados para la seguridad y la postura de cumplimiento.

## Configuración

### Recopilación de métricas

Para enviar tus métricas de OCI a Datadog:
   - Usa una stack de Oracle Resource Manager para [crear un usuario de autenticación de Datadog, un grupo y las políticas necesarias](#create-a-policy-stack) en la región de origen de tu tenencia. Esta stack:
       * Permite que el usuario de autenticación de Datadog lea datos de tus recursos de OCI.
       * Permite el reenvío de métricas.
   - [Ingresa información de tenencia](#enter-tenancy-info) en el cuadro de integración de Datadog.
   - Usa la stack de Oracle Resource Manager a fin de [crear la infraestructura de OCI necesaria](#create-a-metric-forwarding-stack) para cada región de tenencia desde la que quieres reenviar métricas.

### Generar stacks de OCI e información de tenencia

**Nota**: Tu cuenta de usuario de OCI necesita el rol de **Cloud Administrator** (Administrador de la nube) para completar estos pasos.

Esta integración usa un [centro de conectores][1] de OCI, una [aplicación de funciones][2] y una infraestructura de red segura para enviar métricas de OCI a Datadog.

{{< img src="/integrations/oracle_cloud_infrastructure/OCI_metrics_integration_diagram.png" alt="Un diagrama de los recursos de OCI mencionados en esta página y que muestra el flujo de los datos" >}}

Para la configuración más sencilla, Datadog recomienda crear todos los recursos de OCI necesarios con los stacks tecnológicos de ORM que se proporcionan a continuación. Como alternativa, puedes utilizar tu infraestructura de red de OCI o aplicación de función existente que cumpla los requisitos descritos en la sección [Crear un stack tecnológico de reenvío de métricas](#create-a-metric-forwarding-stack).

**Nota**: Debes gestionar quién tiene acceso a los archivos de estado de Terraform de las stacks del gestor de recursos. Consulta la sección [Archivos de estado de Terraform][3] de la página Seguridad del gestor de recursos para obtener más información.

#### Crear un stack tecnológico de políticas

{{< img src="/integrations/oracle_cloud_infrastructure/OCI_auth_workflow_diagram.png" alt="Un diagrama de los recursos y flujo de trabajo de OCI utilizado para la autenticación de integración" >}}

Se debe crear una stack de políticas de ORM en la **región de origen** de la tenencia. La stack de políticas crea:
 * Un grupo dinámico con `resource.type = 'serviceconnectors'`, para permitir el acceso al centro de conectores.
 * Un usuario llamado **DatadogAuthUser**, que Datadog usa para leer recursos de tenencia.
 * Un grupo al que se añade el usuario creado para acceder a la política.
 * Una política en el compartimento raíz para permitir que los centros de conectores lean métricas e invoquen funciones. Además, otorga al grupo de usuarios creado acceso de lectura a los recursos de la tenencia. Se añaden las siguientes instrucciones a la política:

```text
Allow dynamic-group <GROUP_NAME> to read metrics in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-invocation in tenancy
Allow group <DOMAIN>/<USER_GROUP_NAME> to read all-resources in tenancy
```

Para crear la stack, tu cuenta de usuario debe poder [crear políticas y grupos dinámicos][4].

1. Haz clic en el botón **Create a stack** (Crear un stack tecnológico) del cuadro de integración de Datadog y OCI.
2. Acepta las Condiciones de uso de Oracle.
3. En el desplegable **Working directory** (Directorio de trabajo), selecciona `datadog-oci-orm/policy-setup`.
4. Deja la opción de utilizar proveedores de Terraform personalizados **desmarcada**.
5. Proporciona un nombre descriptivo como `datadog-metrics-policy-setup` y selecciona el compartimento en el que deseas desplegarlo.
6. Haz clic en **Next** (Siguiente).
7. Asigna un nombre al grupo dinámico, el grupo de usuarios y a la política que se van a crear, o usa los nombres predeterminados proporcionados.
8. Proporciona el nombre del dominio del usuario que ejecuta la stack. El nombre de dominio predeterminado es `Default`.
9. Asegúrate de que se encuentre seleccionada la **región de origen** de la tenencia.
10. Haz clic en **Next** (Siguiente).
11. Haz clic en **Create** (Crear).

**Notas**: 
* Si el usuario que ejecuta la stack pertenece a un dominio de IAM diferente al de `Default`, proporciona ese nombre de dominio para que el usuario de autenticación, el grupo dinámico y el grupo de usuarios solo se creen en ese dominio.
* Si el usuario y el grupo no se crean en el dominio **predeterminado**, asegúrate de que el dominio se replique en todas las regiones suscritas de la tenencia. Consulta [Replicación de un dominio de identidad en varias regiones][5] para obtener más información.

#### Introducir datos de tenencia

1. Ingresa el OCID y la región de origen de la tenencia que quieres monitorizar en el [cuadro de integración de Datadog y OCI][6].
   - Puedes encontrar esta información en la [página de detalles de la tenencia][7].
   - Ingresa la región de origen con el valor **Region Identifier** (Identificador de región) de la [página Regiones y dominios de disponibilidad][8] de OCI.

2. Para el `DatadogAuthUser` creado después de ejecutar la stack anterior, copia el valor **OCID** del usuario y pégalo en el campo User OCID (OCID del usuario) en el [cuadro de integración de Datadog y OCI][6].

3. Volviendo a la consola de OCI, genera una **API key** (Clave de API) con estos pasos:  
   a. Vuelve a la página `DatadogAuthUser` que se creó.  
   b. En la esquina inferior izquierda de la pantalla, en **Resources** (Recursos), haz clic en **API keys** (Claves de API).  
   c. Haz clic en **Add API key** (Añadir clave de API).  
   d. Haz clic en **Download private key** (Descargar clave privada).
   e. Haz clic en **Add** (Añadir).  
   f. Aparece una ventana emergente **Configuration file preview** (Vista previa del archivo de configuración), pero no es necesario realizar ninguna acción; cierra la ventana emergente.

{{< img src="/integrations/oracle_cloud_infrastructure/add_api_key.png" alt="La página Añadir clave de API en la consola de OCI" >}}

4. Copia el valor **Fingerprint** (Huella dactilar) y pégalo en el campo **Fingerprint** (Huella dactilar) del [cuadro de integración de Datadog y OCI][6].
5. Copia el valor de la **private key** (clave privada) con estos pasos:  
   a. Abre el archivo de clave privada `.pem` descargado en un editor de texto, o utiliza un comando de terminal como `cat` para mostrar el contenido del archivo.  
   b. Copia todo el contenido, incluidos `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`.
6. Pega el valor de la clave privada en el campo **Private Key** (Clave privada) del cuadro de integración de Datadog y OCI.


#### Crear una stack de reenvío de métricas

Todos los recursos que crea esta stack se despliegan en el compartimento especificado. Asegúrate de que el usuario que ejecuta esta stack tenga acceso para crear recursos en el compartimento.

1. Ve a [Create stack][9] (Crear stack) en la consola de OCI.
2. Acepta las Condiciones de uso de Oracle.
3. En el desplegable **Working directory** (Directorio de trabajo), selecciona `datadog-oci-orm/metrics-setup`.
4. Deja la opción de utilizar proveedores de Terraform personalizados **desmarcada**.
5. Asigna un nombre al stack tecnológico y selecciona el compartimento en el que se desplegará.
6. Haz clic en **Next** (Siguiente).
7. Deja los valores de **Tenancy** (Tenencia) sin modificar, ya que vienen especificados por tu región e inquilino actuales, así como por el compartimento seleccionado anteriormente.
8. En el campo **Datadog API Key** (Clave de API de Datadog), ingresa tu [clave de API de Datadog][10].
9. En el campo **Datadog Environment Endpoint** (Endpoint del entorno de Datadog), selecciona el endpoint que coincida con tu [sitio de Datadog][11]:

| Sitio de Datadog   | Endpoint                               |
| -------------  | -------------------------------------- |
| US1            | ocimetrics-intake.datadoghq.com        |
| US3            | ocimetrics-intake.us3.datadoghq.com    |
| US5            | ocimetrics-intake.us5.datadoghq.com    |
| EU1            | ocimetrics-intake.datadoghq.eu         |
| AP1            | ocimetrics-intake.ap1.datadoghq.com    |

_Nota:_ La integración de OCI no es compatible con el sitio US1-FED.

{{< tabs >}}
{{% tab "Creaf VCN con ORM (recomendado)" %}}
10. En la sección **Network options** (Opciones de red), deja marcada la opción `Create VCN`.
    a. En el campo **vcnCompartment**, selecciona tu compartimento.
{{% /tab %}}

{{% tab "Usar VCN existente" %}}
Si utiliza un VCN existente, debe proporcionar el OCID de la subred a la pila. Asegúrese de que el VCN:  
   - Se permite realizar llamadas de salida HTTP a través de la gateway NAT.  
   - Es capaz de extraer imágenes del registro de contenedores de OCI mediante la gateway de servicio.  
   - Tiene las reglas de la tabla de enrutamiento para permitir la gateway NAT y la gateway de servicio.  
   - Tiene las reglas de seguridad para enviar solicitudes HTTP.

10. En la sección **Network options** (Opciones de red), desmarca la opción `Create VCN` e introduce la información de tu VCN:
    a. En el campo **vcnCompartment**, selecciona tu compartimento.  
    b. En la sección **existingVcn**, selecciona tu VCN existente.  
    c. En la sección **Function Subnet OCID** (OCID de subred de función), introduce el OCID de la subred que se va a utilizar.
{{% /tab %}}
{{< /tabs >}}

{{< tabs >}}
{{% tab "Crear función aplicación con ORM (recomendado)" %}}
La pila ORM crea un repositorio función Contenedor para la región en la tenencia, y la imagen Docker se empuja a él para ser utilizado por el función.

11. Completa los siguientes pasos en la sección **Function settings** (Configuración de la función):
    a. En el campo **Function Application shape** (Forma de la aplicación de función), deja el valor como `GENERIC_ARM`. 
    b. Proporciona un nombre de usuario y una contraseña para el registro de OCI Docker.
      - En el campo **OCI Docker registry user name** (Nombre de usuario del registro de OCI Docker), indica tu nombre de usuario de OCI.
      - En el campo **OCI Docker registry password** (Contraseña de registro de OCI Docker), proporciona un token de autorización para tu usuario de OCI. Consulta [Cómo obtener un autentificador][1] para más información.

    _Nota:_ Para verificar si el inicio de sesión en el registro de Docker es correcto, consulta [Iniciar sesión en Oracle Cloud Infrastructure Registry][2].




[1]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[2]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm
{{% /tab %}}

{{% tab "Utilizar la aplicación de función existente" %}}
Si se utiliza una aplicación de función existente, la imagen ya debe existir y se debe proporcionar la ruta completa de la imagen. A continuación, se muestra un ejemplo de ruta de imagen completa:

```text
<REGION_KEY>.ocir.io/<TENANCY_NAMESPACE>/datadog-functions/datadog-function-metrics:latest
```

- En `<REGION_KEY>`, utiliza el valor **Region key** (Clave de región) de la [página Regiones y dominios de disponibilidad][1] de OCI. Por ejemplo, la clave de región para `US-EAST` es `IAD`.
- En `<TENANCY_NAMESPACE>`, utiliza el valor del **Object storage namespace** (Espacio de nombre de almacenamiento de objetos** en la [Página de detalles de la tenencia][2].

11. Completa los siguientes pasos en la sección **Function settings** (Configuración de la función):
    a. En el campo **Function Application shape** (Forma de la aplicación de función), deja el valor como `GENERIC_ARM`. 
    b. En el campo **Function Image Path** (Ruta de la imagen de la función), ingresa la ruta completa de la imagen.

[1]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[2]: https://cloud.oracle.com/tenancy
{{% /tab%}}
{{< /tabs>}}

12. Establece el **Service Connector hub batch size** (Tamaño de lote del centro de conectores del servicio) en `5000`.
13. Haz clic en **Next** (Siguiente).
14. Haz clic en **Create** (Crear).
15. Vuelve al [cuadro de integración de Datadog y OCI][6] y haz clic en **Create configuration** (Crear configuración).

**Nota**: De forma predeterminada, solo se selecciona el compartimento raíz y se activan todos los espacios de nombres de métrica compatibles con la integración de Datadog y OCI (se admiten hasta 50 espacios de nombres por hub de conectores).

16. De manera opcional, para añadir compartimentos o editar la lista de los espacios de nombres de métrica habilitados, haz clic en **Edit** (Editar) en el [centro de conectores][12] recién creado.
    - Haz clic en **+ Another compartment** (+ otro compartimento) para añadir compartimentos.
    - En la sección **Configure source** (Configurar origen), añade o elimina espacios de nombres del menú desplegable **Namespaces** (Espacios de nombres).

#### Validación

Consulta las métricas de `oci.*` en el [dashboard de información general de la integración de OCI][13] o en la [página del explorador de métricas][14] en Datadog.

<div class="alert alert-warning">Las métricas de la función de OCI (espacio de nombres <code>oci.faas</code>) y las métricas de la instancia del contenedor (espacio de nombres <code>oci_computecontainerinstance</code>) se encuentran en versión preliminar.</div>

### Espacios de nombre de métrica

| Integración                   | Espacio de nombre de métrica                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Base de datos autónoma][15]     | [oci_autonomous_database][16]                                                                                                            |
| Block Storage                 | [oci_blockstore][17]                                                                                                                     |
| [Computación][18]                 | [oci_computeagent][19], [rdma_infrastructure_health][20], [gpu_infrastructure_health][21], [oci_compute_infrastructure_health][22]       |
| Instancias de contenedor (versión preliminar)    | [oci_computecontainerinstance][23]                                                                                                       |
| [Base de datos][24]                | [oci_database][25], [oci_database_cluster][26]                                                                                           |
| Gateway de enrutamiento dinámico       | [oci_dynamic_routing_gateway][27]                                                                                                        |
| FastConnect                   | [oci_fastconnect][28]                                                                                                                    |
| File Storage                  | [oci_filestorage][29]                                                                                                                    |
| Funciones (versión preliminar)              | [oci_faas][30]                                                                                                                           |
| HeatWave MySQL                | [oci_mysql_database][31]                                                                                                                 |
| Motor de Kubernetes             | [oci_oke][32]                                                                                                                            |
| [Equilibrador de carga][33]           | [oci_lbaas][34], [oci_nlb][35]                                                                                                           |
| [Gateway NAT][36]             | [oci_nat_gateway][37]                                                                                                                    |
| Object Storage                | [oci_objectstorage][38]                                                                                                                  |
| Cola                         | [oci_queue][39]                                                                                                                          |
| Hub de conectores de servicio         | [oci_service_connector_hub][40]                                                                                                          |
| Gateway de servicio               | [oci_service_gateway][41]                                                                                                                |
| [VCN][42]                     | [oci_vcn][43]                                                                                                                            |
| VPN                           | [oci_vpn][44]                                                                                                                            |
| Firewall de aplicaciones web      | [oci_waf][45]                                                                                                                            |

### Recopilación de logs

Envía logs desde tu infraestructura en la nube de Oracle a Datadog siguiendo alguno de estos procesos:

{{< tabs >}}
{{% tab "Hub de conectores de servicio" %}}

1. Configura un log de OCI.
2. Crea una función de OCI.
3. Configura un conector de servicio de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, navega hasta *Logging -> Log Groups* (Registro > Grupos de logs).
2. Selecciona tu compartimento y haz clic en **Create Log Group**. Se abre un panel lateral.
3. Introduce `data_log_group` para el nombre y, opcionalmente, proporciona una descripción y etiquetas (tags).
4. Haz clic en **Create** (Crear) para configurar tu nuevo grupo de logs.
5. En **Resources** (Recursos), haz clic en **Logs**.
6. Haz clic en **Create custom log** (Crear log personalizado) o **Enable service log** (Habilitar log de servicio) según lo desees.
7. Haz clic en **Enable Log** (Habilitar log), para crear tu nuevo log de OCI.

Para más información sobre logs de OCI, consulta [Activación del registro para un recurso][1].

#### Función de OCI

1. En el portal de OCI, ve a *Functions** (Funciones).
2. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
3. Crea una nueva función de OCI dentro de tu aplicación. Consulta [Información general de funciones de Oracle][2] para obtener más detalles.
4. Es recomendado para crear una función boilerplate de Python primero y reemplazar los archivos autogenerados con el código fuente de Datadog:
   - Sustituye `func.py` por código del [repositorio de Datadog OCI][3].
   - Sustituye `func.yaml` por el código del [repositorio de Datadog OCI][4]. `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API de Datadog y el enlace de entrada de logs de la región.
   - Sustituye `requirements.txt` por código del [repositorio de Datadog OCI][5].

#### Hub de conectores de servicio de OCI

1. En el portal de OCI, navega hasta *Logging -> Service Connectors* (Registro > Conectores de servicio).
2. Haz clic en **Create Service Connector** (Crear conector de servicio) para ser redireccionado a la página **Create Service Connector** (Crear conector de servicio).
3. Selecciona **Source** (Origen) como Logging (Registro) y **Target** (Destino) como Functions (Funciones).
4. En **Configure Source Connection** (Configurar conexión de origen) selecciona **Compartment name** (Nombre de compartimento), **Log Group** (Grupo de logs) y **Log**. (El **Log Group** (Grupo de logs) y **Log** creados en el primer paso).
5. Si también deseas enviar **Audit Logs** (Logs de auditoría), haz clic en **+Another Log** (+ otro log) y selecciona el mismo **Compartment** (Compartimento) y reemplaza "_Audit" (_Auditoría) como tu **Log Group** (Grupo de logs).
6. En **Configure target** (Configurar destino) selecciona **Compartment** (Compartimento), **Function application** (Aplicación de función) y **Function** (Función). (La **Function Application** (Aplicación de función) y **Function** (Función) creadas en el paso anterior.
7. Si se te pide que crees una política, haz clic en **Create** (Crear) en la pantalla.
8. Haz clic en **Create** (Crear) en la parte inferior para terminar de crear tu conector de servicio.

Para obtener más información sobre OCI Object Storage, consulta [la entrada del blog sobre el conector de servicio de Oracle][6].

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
{{% /tab %}}
{{% tab "Almacén de objectos" %}}

1. Configura un log de OCI.
2. Crea un almacén de objetos de OCI y habilita el acceso de lectura/escritura para logs de OCI.
3. Crea una función de OCI.
4. Configura un evento de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Logging -> Logs* (Soluciones y plataforma -> Registro -> Logs).
2. Haz clic en **Create Custom Log** (Crear log personalizado) para pasar a la página **Create Custom Log** (Crear log personalizado).
3. Dale un nombre a tu nuevo log de OCI.
4. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs). Estas selecciones se mantienen en toda la instalación.
5. Haz clic en **Create Custom Log** (Crear log personalizado) para acceder a la página **Create Agent Config** (Crear configuración del Agent).
6. Haz clic en **Create new configuration** (Crear nueva configuración).
7. Dale un nombre a tu nueva configuración. Tu compartimento está preseleccionado para ti.
8. Establece el tipo de grupo en **Dynamic Group** (Grupo dinámico) y agrupa a uno de tus grupos existentes.
9. Establece el tipo de entrada en **Log Path** (Ruta de log), introduce el nombre de entrada que prefieras y utiliza "/" para las rutas de los archivos.
10. Haz clic en **Create Custom Log** (Crear log personalizado), entonces tu log de OCI se creará y estará disponible en la página de logs.

Para más información sobre logs de OCI, consulta [Activación del registro para un recurso][1].

#### OCI object storage

1. En el portal de OCI, ve a *Core Infrastructure -> Object Storage -> Object Storage* (Infraestructura central > Object Storage > Object Storage).
2. Haz clic en **Create Bucket** (Crear bucket) para acceder al formulario **Create bucket** (Crear bucket).
3. Selecciona **Standard** (Estándar) para tu nivel de almacenamiento y marca **Emit Object Events** (Emitir eventos de objeto).
4. Rellena el resto del formulario según tus preferencias.
5. Haz clic en **Create Bucket** (Crear bucket), tu bucket se creará y estará disponible en la lista de buckets.
6. Selecciona tu nuevo bucket en la lista de buckets activos y haz clic en **Logs** en recursos.
7. Activa **read** (leer), lo que te lleva al menú lateral **Enable Log** (Habilitar log).
8. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs) (utiliza las mismas selecciones que en tu log de OCI).
9. Introduce un nombre para el **Log Name** (Nombre de log) y selecciona tu retención de log preferida.

Para más información sobre OCI Object Storage, consulta [Poner datos en Object Storage][2].

#### Función de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Developer Services -> Functions* (Soluciones y plataforma > Servicios de desarrollador > Funciones).
2. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
3. Crea una nueva función de OCI dentro de tu aplicación. Para más detalles, consulta [Información general de funciones de Oracle][3].
4. Es recomendado para crear una función boilerplate de Python primero y reemplazar los archivos autogenerados con el código fuente de Datadog:
   - Sustituye `func.py` por código del [repositorio de Datadog OCI][4].
   - Sustituye `func.yaml` por el código del [repositorio de Datadog OCI][5]. `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API de Datadog y el enlace de entrada de logs de la región.
   - Sustituye `requirements.txt` por código del [repositorio de Datadog OCI][6].

#### Evento de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Application Integration -> Event Service* (Soluciones y plataforma > Integración de aplicaciones > Servicio de eventos).
2. Haz clic en **Create Rule** (Crear regla) para acceder a la página **Create Rule** (Crear regla).
3. Asigna un nombre y una descripción a tu regla de evento.
4. Establece tu condición como **Event Type** (Tipo de evento), el nombre de servicio como **Object Storage** y el tipo de evento como **Object - Create** (Objeto: crear).
5. Establece tu tipo de acción como **Functions** (Funciones).
6. Asegúrate de que tu compartimento de función sea la misma selección que hiciste para Log de OCI, Bucket de OCI y Función de OCI.
7. Selecciona tu aplicación de función y función (según el paso de instalación anterior).
8. Haz clic en **Create Rule** (Crear regla), tu regla se creará y estará disponible en la lista de reglas.

Para más información sobre OCI Object Storage, consulta [Empezando con eventos][7].

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab%}}
{{< /tabs>}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oracle_cloud_infrastructure" >}}


### Checks de servicio

La integración de OCI no incluye ningún check de servicio.

### Eventos

La integración de OCI no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][46].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Oracle Cloud Infrastructure con Datadog][47]


[1]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[2]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications
[3]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state
[4]: https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html
[5]: https://docs.oracle.com/iaas/Content/Identity/domains/to-manage-regions-for-domains.htm
[6]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[7]: https://cloud.oracle.com/tenancy
[8]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[9]: https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/Datadog/oracle-cloud-integration/releases/latest/download/datadog-oci-orm.zip
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.datadoghq.com/es/getting_started/site/
[12]: https://cloud.oracle.com/connector-hub/service-connectors
[13]: https://app.datadoghq.com/dash/integration/31405/oracle-cloud-oci-overview
[14]: https://app.datadoghq.com/metric/explorer
[15]: https://app.datadoghq.com/integrations/oci-autonomous-database
[16]: https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
[17]: https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm
[18]: https://app.datadoghq.com/integrations/oci-compute
[19]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl
[20]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[21]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[22]: https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm
[23]: https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm
[24]: https://app.datadoghq.com/integrations/oci-database
[25]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F
[26]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489
[27]: https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm
[28]: https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm
[29]: https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm
[30]: https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm
[31]: https://docs.oracle.com/iaas/mysql-database/doc/metrics.html
[32]: https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm
[33]: https://app.datadoghq.com/integrations/oci-load-balancer
[34]: https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[35]: https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[36]: https://app.datadoghq.com/integrations/oci-nat-gateway
[37]: https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[38]: https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm
[39]: https://docs.oracle.com/iaas/Content/queue/metrics.htm
[40]: https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm
[41]: https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm
[42]: https://app.datadoghq.com/integrations/oci-vcn
[43]: https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm
[44]: https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm
[45]: https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm
[46]: https://docs.datadoghq.com/es/help/
[47]: https://www.datadoghq.com/blog/monitor-oci-with-datadog/