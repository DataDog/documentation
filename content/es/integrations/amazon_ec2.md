---
aliases:
- /es/integrations/awsec2/
- /es/agent/faq/install-the-agent-with-aws-ssm
categories:
- cloud
- os & system
- aws
- log collection
custom_kind: integración
dependencies: []
description: Seguimiento del uso de recursos de instancias, de checks del estado de
  monitores y mucho más.
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2/
draft: false
git_integration_title: amazon_ec2
has_logo: true
integration_id: amazon-ec2
integration_title: Amazon EC2
integration_version: ''
is_public: true
manifest_version: '1.0'
monitors:
  CPU utilization is high: assets/monitors/ec2_cpu_utilization.json
  Host Ok check is failing: assets/monitors/ec2_host_ok.json
  Status check is failing: assets/monitors/ec2_status_check.json
name: amazon_ec2
public_title: Integración de Amazon EC2 en Datadog
short_description: Seguimiento del uso de recursos de instancias, de checks del estado
  de monitores y mucho más.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Amazon Elastic Compute Cloud (Amazon EC2) es un servicio web que proporciona capacidad informática redimensionable en la nube. Está diseñado para facilitar la computación en la nube a escala web para los desarrolladores.

Habilita esta integración para ver en Datadog todas tus métricas EC2 y eventos adicionales, como mantenimientos programados.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][1].

### Configuración

1. En la [página de la integración AWS][2], asegúrate de que `EC2` está habilitado en la pestaña `Metric Collection`.

2. Añade los siguientes permisos requeridos a tu [política IAM de Datadog][3] para poder recopilar métricas de Amazon EC2. Para obtener más información, consulta las [políticas de EC2][4] en el sitio web de AWS.

   | Permiso AWS                    | Descripción |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
    | `ec2:DescribeInstanceStatus` | Utilizado por la integración ELB para confirmar el estado de una instancia. Utilizado por la integración EC2 para describir el estado de todas las instancias. |
    | `ec2:DescribeSecurityGroups` | Añade nombres de SecurityGroup y etiquetas (tags) personalizados a instancias EC2.                                                                            |
    | `ec2:DescribeInstances` | Añade etiquetas a las instancias EC2 y métricas CloudWatch EC2.                                                                                |

3. Instala la [integración Amazon EC2 en Datadog][5].

**Nota**: Si quieres monitorizar un subconjunto de tus instancias EC2 con Datadog, asigna una etiqueta AWS, como por ejemplo `datadog:true`, a esas instancias EC2. A continuación, especifica esa etiqueta en el cuadro de texto **Limitar la recopilación de métricas a recursos específicos** en la pestaña **Recopilación de métricas** de la [página de tu integración AWS en Datadog][2].

#### Autosilenciado en EC2

Datadog puede silenciar de forma proactiva los monitores relacionados con el apagado manual de instancias EC2 y con el cierre de instancias activadas por el autoescalado de AWS, en función del estado de los hosts de la API CloudWatch. Las instancias EC2 autosilenciadas se enumeran en la página de [tiempo de inactividad del monitor][6] seleccionando la opción **Mostrar automáticamente hosts silenciados**.

Ten en cuenta que la integración EC2 debe estar instalada para que el autosilenciado surta efecto. Si la recopilación de métricas se limita a hosts con etiquetas, sólo se autosilenciarán las instancias que coincidan con esas etiquetas.

Para silenciar los monitores de apagados esperados de instancias EC2, selecciona la casilla **Autosilenciado de EC2** en la [página de la integración AWS][2]:

{{< img src="integrations/amazon_ec2/aws_ec2_automuting_2024.png" alt="Autsilenciado de Amazon EC2" >}}

### Instalar el Agent

Datadog proporciona dos enfoques para configurar el Datadog Agent en instancias de EC2. Consulta [¿Por qué debería instalar Datadog Agent en mis instancias en la nube?][7] para conocer las ventajas de instalar el Agent en tus instancias de Amazon EC2.

{{< tabs >}}
{{% tab "AWS Systems Manager (SSM)" %}}

#### Instalación del Agent a través de la interfaz de usuario de Amazon Systems Manager (recomendado)

Sigue los pasos que se indican a continuación para instalar el Datadog Agent en instancias de EC2 con AWS Systems Manager.

1. Configura el [rol de IAM][1] en tus instancias EC2 para que el [permiso AmazonSSMManagedInstanceCore][2] esté habilitado.

2. Navega hasta la [pestaña del documento de AWS SSM][3]. 
3. Busca `datadog`. Nota: Puede que necesites buscar el documento correspondiente a tu región cambiando de región en la barra de navegación superior de la consola de AWS Management.
4. Elige el documento Linux o Windows, según tus necesidades.
- Linux: datadog-agent-installation-linux
- Windows: datadog-agent-installation-windows

5. Rellena los parámetros del comando.
6. Selecciona las instancias de destino en las que quieres instalar el Agent.
7. Haz clic en **Run** (Ejecutar).
8. Espera a que finalice la confirmación y luego consulta la lista de infraestructuras en Datadog.

#### Instalación alternativa personalizada del Agent 

##### Almacén de parámetros

En el [Almacén de parámetros][4], crea un parámetro con:

- Nombre: `dd-api-key-for-ssm`
- Descripción: (opcional)
- Tipo: `SecureString`
- Fuente de claves KMS: `My current account`
- ID de clave KMS: Utiliza el valor predeterminado seleccionado
- Valor: tu [clave de API de Datadog][5]

##### Documentos

En el gestor de sistemas, crea un nuevo [Documento][6]:

- Nombre: `dd-agent-install`
- Tipo de destino: (opcional)
- Tipo de documento: `Command document`
- Contenido: `JSON`

Si te encuentras en un sitio US de Datadog, utiliza el archivo [dd-agent-install-us-site.json][7], actualizado con tu `<AWS_REGION>` en `runCommand`, como `us-east-1`. Si te encuentras en un sitio EU de Datadog, utiliza el archivo [dd-agent-install-eu-site.json][8].

##### Ejecutar comando

En [Run Command][9] (Ejecutar comando), haz clic en el botón **Run command** (Ejecutar comando) y sigue los pasos que se indican a continuación:

- **Documento de comando**:
  - Haz clic en la casilla de búsqueda y selecciona **Propietario -> Propiedad mía**.
  - Haz clic en el botón de opción situado junto a tu documento.
  - Si es necesario, elige la **versión del documento**.
- **Destinos**:
  - Selecciona la instancia EC2 de destino.
- **Opciones de resultados** (opcional):
  - Selecciona la casilla **Resultado de CloudWatch** para registrar cualquier problema.
- **Otras secciones** (opcional):
  - Modifica otras secciones, según sea necesario para tu configuración.

Haz clic en el botón **Run** (Ejecutar) y aparecerá una página de confirmación que muestra el estado. Espera a que finalice y luego consulta la [lista de infraestructuras][10] en Datadog.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[3]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[4]: https://console.aws.amazon.com/systems-manager/parameters
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://console.aws.amazon.com/systems-manager/documents
[7]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[8]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[9]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[10]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "EC2 Image Builder" %}}

#### Instalación del Agent a través de EC2 Image Builder

Datadog publica un componente de EC2 Image Builder para el Datadog Agent a través de AWS Marketplace. Los usuarios pueden suscribirse al producto y utilizar el componente Image Builder para crear una AMI personalizada.

Sigue estos pasos para crear una Amazon Machine Image personalizada con el Datadog Agent y aprovisionar instancias de EC2 con un Datadog Agent preinstalado.

<div class="alert alert-info">
Para la versión inicial, el componente se probó con Amazon Linux 2023. Debería funcionar con cualquier distribución de Linux compatible con el Datadog Agent
</div>

##### Crear una suscripción

1. Accede a la consola de EC2 Image Builder y ve a 'Discover products' (Descubrir productos).
1. Selecciona la pestaña **Components** (Componentes) y busca _Datadog Agent _.
1. Haz clic en **View subscription options** (Ver opciones de suscripción) y sigue las instrucciones para crear una suscripción.

Consulta [Gestión de suscripciones de AWS Marketplace][1] para obtener más información.

##### Crear una receta de imagen
1. Navega hasta  **Image recipes** (Recetas de imágenes) en la consola de EC2 Image Builder.
1. Crea una nueva receta con la siguiente configuración:
    * Imagen de base: `arn:aws:imagebuilder:us-east-1:aws:image/amazon-linux-2023-x86/x.x.x`.
    * Componente: `arn:aws:imagebuilder:us-east-1:aws-marketplace:component/datadog-agent-for-linux-prod-wwo2b4p7dgrkk/0.1.0/1`
    * Opcionalmente, configura los parámetros del componente. Este documento asume que se utilizan los valores por defecto.

Consulta [Recetas de EC2 Image Builder][2] para obtener más detalles.


##### Crear un canal de imágenes y construir la imagen

**Requisitos previos**:

- El rol por defecto `EC2InstanceProfileForImageBuilder` requiere los siguientes permisos adicionales:
    * `imagebuilder:GetMarketplaceResource` para obtener el componente Datadog Agent de Marketplace.
    * `secretsmanager:GetSecretValue` para recuperar las claves de API y de aplicación almacenadas en el almacén de secretos. 
- Crea un secreto llamado `mp-ib-datadog-agent-secret` que almacene la API de Datadog y las claves de aplicación asignadas a `dd-api-key` y `dd-app-key` respectivamente.

Procede a la creación de pipelines y a la creación de imágenes:
1. Ve a **Image pipelines** (Pipelines de imagen) en la consola de EC2 Image Builder.
1. Crea un pipeline para la receta. Este es un asistente de varios pasos; el siguiente aborda el escenario más simple:
    * Paso 1: indica el nombre del pipeline y establece el programa de creación en manual.
    * Paso 2: elige la receta creada en la sección anterior.
    * Paso 3: deja los valores por defecto.
    * Paso 4: deja la opción por defecto para usar el rol `EC2InstanceProfileForImageBuilder` con políticas adicionales adjuntas.
    * Paso 5: deja los valores por defecto.
    * Paso 6: revisar y crear.
1. Navega hasta el pipeline recién creado y ejecútelo.
1. Una vez finalizado el pipeline, un resumen muestra el nuevo ARN de la imagen.
1. Si has configurado tu secreto `mp-ib-datadog-agent-secret` correctamente, el Datadog Agent comienza a informar métricas poco después de que la instancia de EC2 se inicie con la imagen.

Consulta [Pipelines de EC2 Image Builder][3] para obtener más detalles.

##### Parámetros de los componentes

El Agent puede personalizarse utilizando los siguientes parámetros en la receta:
* `DD_SITE`: sitio al que enviar los datos de telemetría. Por defecto: `datadoghq.com`.
* `HOST_TAGS`: etiquetas (tags) de host. Por defecto: `installer:ec2_image_builder`.
* `SM_SECRET_NAME`: nombre del secreto para almacenar las claves de la API y de la aplicación. Por defecto: `mp-ib-datadog-agent-secret`.
* `SM_API_KEY`: para buscar la clave de la API en el secreto. Por defecto: `dd-api-key`
* `SM_API_KEY`: clave para buscar la clave de aplicación en el secreto. Por defecto: `dd-app-key`

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/marketplace-manage-subscriptions.html
[2]: https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-image-recipes.html
[3]: https://docs.aws.amazon.com/imagebuilder/latest/userguide/ami-image-pipelines.html
{{% /tab %}}{{< /tabs >}}

### Recopilación de logs

Utiliza el [Datadog Agent][8] u otro [remitente de log][9] para enviar tus logs a Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-ec2" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

**Notas**: 
   - `aws.ec2.instance_age` no se recopila de forma predeterminada con la integración de Datadog y EC2. Ponte en contacto con el [soporte de Datadog][10] para activar esta recopilación de métricas.
   - `aws.ec2.host_ok` se recopila de forma predeterminada, incluso si deshabilitas la recopilación de métricas para la integración Amazon EC2, y puede provocar la aparición inesperada de hosts en la lista de infraestructuras. Para garantizar que sólo se monitoricen los hosts elegidos, asigna una etiqueta AWS, como `datadog:true`, a esas instancias EC2. A continuación, especifica esa etiqueta en el cuadro de texto **Limitar la recopilación de métricas a recursos específicos** en la pestaña **Recopilación de métricas** de la [página de tu integración AWS en Datadog][2].

### Checks de servicio
{{< get-service-checks-from-git "amazon-ec2" >}}


## Monitorización predefinida

La integración Amazon EC2 proporciona funciones de monitorización predefinidas para monitorizar y optimizar el rendimiento.

- Dashboard de información general de Amazon EC2: obtén información general completa de tus instancias de EC2 utilizando el [dashboard de información general de Amazon EC2][11] predefinido.
- Monitores recomendados: habilita los [monitores de Amazon EC2 recomendados][12] para detectar problemas de forma proactiva y recibir alertas oportunas.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Para leer más

- [Métricas clave para la monitorización de EC2][13]
- [Cómo recopilar métricas de EC2][14]
- [Cómo monitorizar instancias de EC2 con Datadog][15]


[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.datadoghq.com/es/agent/logs/
[9]: https://docs.datadoghq.com/es/integrations/rsyslog/
[10]: https://docs.datadoghq.com/es/help/
[11]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[12]: https://app.datadoghq.com/monitors/recommended
[13]: https://www.datadoghq.com/blog/ec2-monitoring
[14]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[15]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog