---
aliases:
- /es/integrations/awsec2/
- /es/agent/faq/install-the-agent-with-aws-ssm
categories:
- cloud
- os & system
- aws
- log collection
custom_kind: integration
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

### Instalación del Agent con AWS Systems Manager (SSM)

Sigue los pasos que se indican a continuación para instalar el Datadog Agent en instancias EC2 utilizando AWS Systems Manager. Para conocer las ventajas de instalar el Agent en tus instancias Amazon EC2, consulta [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][7].

#### Instalación del Agent a través de la interfaz de usuario de Amazon Systems Manager (recomendado)

1. Configura el [rol IAM][8] en tus instancias EC2 para que el [permiso AmazonSSMManagedInstanceCore][9] esté habilitado.

2. Ve a la [pestaña del documento de AWS SSM][10]. 
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

En el [Almacén de parámetros][11], crea un parámetro con:

- Nombre: `dd-api-key-for-ssm`
- Descripción: (opcional)
- Tipo: `SecureString`
- Fuente de claves KMS: `My current account`
- ID de clave KMS: Utiliza el valor predeterminado seleccionado
- Valor: Tu [clave de API Datadog][12]

##### Documentos

En Systems Manager, crea un nuevo [documento][13]:

- Nombre: `dd-agent-install`
- Tipo de destino: (opcional)
- Tipo de documento: `Command document`
- Contenido: `JSON`

Si te encuentras en un sitio US de Datadog, utiliza el archivo [dd-agent-install-us-site.json][14], actualizado con tu `<AWS_REGION>` en `runCommand`, como `us-east-1`. Si te encuentras en un sitio EU de Datadog, utiliza el archivo [dd-agent-install-eu-site.json][15].

##### Ejecutar comando

En [Ejecutar comando][16], haz clic en el botón **Run command** (Ejecutar comando) y sigue los pasos que se indican a continuación:

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

Haz clic en el botón **Run** (Ejecutar) y aparecerá una página de confirmación que muestra el estado. Espera a que finalice y luego consulta la [lista de infraestructuras][17] en Datadog.

### Recopilación de logs

Utiliza el [Datadog Agent][18] u otro [transvasador de logs][19] para enviar tus logs a Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_ec2" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

**Notas**: 
   - `aws.ec2.instance_age` no se recopila de forma predeterminada con la integración EC2 en Datadog. Para habilitar la recopilación de esta métrica, ponte en contacto con el [servicio de asistencia de Datadog][21].
   - `aws.ec2.host_ok` se recopila de forma predeterminada, incluso si deshabilitas la recopilación de métricas para la integración Amazon EC2, y puede provocar la aparición inesperada de hosts en la lista de infraestructuras. Para garantizar que sólo se monitoricen los hosts elegidos, asigna una etiqueta AWS, como `datadog:true`, a esas instancias EC2. A continuación, especifica esa etiqueta en el cuadro de texto **Limitar la recopilación de métricas a recursos específicos** en la pestaña **Recopilación de métricas** de la [página de tu integración AWS en Datadog][2].

### Checks de servicios
{{< get-service-checks-from-git "amazon_ec2" >}}


## Monitorización predefinida

La integración Amazon EC2 proporciona funciones de monitorización predefinidas para monitorizar y optimizar el rendimiento.

- Dashboard de información general de Amazon EC2: Obtén información general completa de tus instancias EC2 utilizando el [dashboard de información general de Amazon EC2][23] predefinido.
- Monitores recomendados: Habilita los [monitores Amazon EC2 recomendados][24] para detectar problemas de forma proactiva y recibir alertas oportunas.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][21].

## Leer más

- [Métricas clave para la monitorización EC2][25]
- [Recopilación de métricas EC2][26]
- [Monitorización de instancias EC2 con Datadog][27]

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[9]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[10]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[11]: https://console.aws.amazon.com/systems-manager/parameters
[12]: https://app.datadoghq.com/organization-settings/api-keys
[13]: https://console.aws.amazon.com/systems-manager/documents
[14]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[15]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[16]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[17]: https://app.datadoghq.com/infrastructure
[18]: https://docs.datadoghq.com/es/agent/logs/
[19]: https://docs.datadoghq.com/es/integrations/rsyslog/
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[21]: https://docs.datadoghq.com/es/help/
[22]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/service_checks.json
[23]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[24]: https://app.datadoghq.com/monitors/recommended
[25]: https://www.datadoghq.com/blog/ec2-monitoring
[26]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[27]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog