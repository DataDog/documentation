---
aliases:
- /es/integrations/amazon_ec2
app_id: amazon-ec2
categories:
- nube
- sistema operativo y sistema
- aws
- recopilación de logs
custom_kind: integración
description: Amazon Elastic Compute Cloud (Amazon EC2) es un servicio web que proporciona
  capacidad informática redimensionable en la nube.
media: []
title: Amazon EC2
---
## Información general

Amazon Elastic Compute Cloud (Amazon EC2) es un servicio web que proporciona capacidad informática redimensionable en la nube. Está diseñado para facilitar la computación en la nube a escala web para los desarrolladores.

Habilita esta integración para ver en Datadog todas tus métricas EC2 y eventos adicionales, como mantenimientos programados.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuración

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `EC2` está habilitado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos obligatorios a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar métricas de Amazon EC2. Para obtener más información, consulta las [políticas de EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html) en el sitio web de AWS.

   | AWS Permiso | Descripción |
   | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
   | `ec2:DescribeInstanceStatus` | Utilizado por la integración ELB para declara la salud de una instancia. Utilizado por la integración EC2 para describir el estado de todas las instancias. |
   | `ec2:DescribeSecurityGroups` | Añade nombres de SecurityGroup y etiquetas personalizadas a las instancias EC2.                                                                            |
   | `ec2:DescribeInstances` | Añade etiquetas a instancias EC2 y métricas CloudWatch EC2.                                                                                |

1. Instala la integración [Datadog - Amazon EC2](https://app.datadoghq.com/integrations/amazon-ec2).

**Nota**: Si quieres monitorizar un subconjunto de tus instancias EC2 con Datadog, asigna una etiqueta AWS, como por ejemplo `datadog:true`, a esas instancias EC2. A continuación, especifica esa etiqueta en el cuadro de texto **Limitar la recopilación de métricas a recursos específicos** en la pestaña **Recopilación de métricas** de la [página de tu integración AWS en Datadog](https://app.datadoghq.com/integrations/amazon-web-services).

#### Autosilenciado en EC2

Datadog puede silenciar de forma proactiva los monitores relacionados con el apagado manual de instancias EC2 y con el cierre de instancias activadas por el autoescalado de AWS, en función del estado de los hosts de la API CloudWatch. Las instancias EC2 autosilenciadas se enumeran en la página de [tiempo de inactividad del monitor](https://app.datadoghq.com/monitors/downtimes) seleccionando la opción **Mostrar automáticamente hosts silenciados**.

Ten en cuenta que la integración EC2 debe estar instalada para que el autosilenciado surta efecto. Si la recopilación de métricas se limita a hosts con etiquetas, sólo se autosilenciarán las instancias que coincidan con esas etiquetas.

Para silenciar los monitores de apagados esperados de instancias EC2, selecciona la casilla **Autosilenciado de EC2** en la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services):

![Amazon EC2 Automuting](images/aws_ec2_automuting_2024.png)

### Instalar el Agent

Datadog ofrece dos estrategias para configurar el Datadog Agent en instancias EC2. Para conocer las ventajas de instalar el Agent en tus instancias Amazon EC2, consulta [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?](https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/).

{{< tabs >}}

{{% tab "AWS Systems Manager (SSM)" %}}

#### Instalación del Agent a través de la interfaz de usuario de Amazon Systems Manager (recomendado)

Sigue los pasos que se indican a continuación para instalar el Datadog Agent en instancias de EC2 con AWS Systems Manager.

1. Configura el [rol IAM](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) en tus instancias EC2 para que el [permiso AmazonSSMManagedInstanceCore](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html) esté habilitado.

1. Ve a la [pestaña de documento de AWS SSM](https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html).

1. Busca `datadog`. Nota: Puede que necesites buscar el documento correspondiente a tu región cambiando de región en la barra de navegación superior de la consola de AWS Management.

1. Elige el documento Linux o Windows, según tus necesidades.

- Linux: datadog-agent-installation-linux
- Windows: datadog-agent-installation-windows

5. Rellena los parámetros del comando.
1. Selecciona las instancias de destino en las que quieres instalar el Agent.
1. Haz clic en **Run** (Ejecutar).
1. Espera a que finalice la confirmación y luego consulta la lista de infraestructuras en Datadog.

#### Instalación alternativa personalizada del Agent 

##### Almacén de parámetros

En el [Almacén de parámetros](https://console.aws.amazon.com/systems-manager/parameters), crea un parámetro con:

- Nombre: `dd-api-key-for-ssm`
- Descripción: (opcional)
- Tipo: `SecureString`
- Fuente de claves KMS: `My current account`
- ID de clave KMS: Utiliza el valor predeterminado seleccionado
- Valor: Tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys)

##### Documentos

En el gestor de sistemas, crea un nuevo [documento](https://console.aws.amazon.com/systems-manager/documents):

- Nombre: `dd-agent-install`
- Tipo de destino: (opcional)
- Tipo de documento: `Command document`
- Contenido: `JSON`

Si te encuentras en un sitio US de Datadog, utiliza el archivo [dd-agent-install-us-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json), actualizado con tu `<AWS_REGION>` en `runCommand`, como `us-east-1`. Si te encuentras en un sitio EU de Datadog, utiliza el archivo [dd-agent-install-eu-site.json](https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json).

##### Ejecutar comando

En [Ejecutar comando](https://console.aws.amazon.com/systems-manager/run-command/executing-commands), haz clic en el botón **Run command** (Ejecutar comando) y sigue los pasos que se indican a continuación:

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

Haz clic en el botón **Run** (Ejecutar) y aparecerá una página de confirmación mostrando el estado. Espera a que finalice y comprueba la [lista de infraestructuras](https://app.datadoghq.com/infrastructure) en Datadog.

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

Consulta [Gestión de suscripciones a AWS Marketplace](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/marketplace-manage-subscriptions.html) para obtener más información.

##### Crear una receta de imagen

1. Navega hasta  **Image recipes** (Recetas de imágenes) en la consola de EC2 Image Builder.
1. Crea una nueva receta con la siguiente configuración:
   - Imagen de base: `arn:aws:imagebuilder:us-east-1:aws:image/amazon-linux-2023-x86/x.x.x`.
   - Componente: `arn:aws:imagebuilder:us-east-1:aws-marketplace:component/datadog-agent-for-linux-prod-wwo2b4p7dgrkk/0.1.0/1`
   - Opcionalmente, configura los parámetros del componente. Este documento asume que se utilizan los valores por defecto.

Consulta [Recetas de EC2 Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/create-image-recipes.html) para obtener más información.

##### Crear un canal de imágenes y construir la imagen

**Requisitos previos**:

- El rol por defecto `EC2InstanceProfileForImageBuilder` requiere los siguientes permisos adicionales:
  - `imagebuilder:GetMarketplaceResource` para obtener el componente Datadog Agent de Marketplace.
  - `secretsmanager:GetSecretValue` para recuperar las claves de API y de aplicación almacenadas en el almacén de secretos.
- Crea un secreto llamado `mp-ib-datadog-agent-secret` que almacene la API de Datadog y las claves de aplicación asignadas a `dd-api-key` y `dd-app-key` respectivamente.

Procede a la creación de pipelines y a la creación de imágenes:

1. Ve a **Image pipelines** (Pipelines de imagen) en la consola de EC2 Image Builder.
1. Crea un pipeline para la receta. Este es un asistente de varios pasos; el siguiente aborda el escenario más simple:
   - Paso 1: indica el nombre del pipeline y establece el programa de creación en manual.
   - Paso 2: elige la receta creada en la sección anterior.
   - Paso 3: deja los valores por defecto.
   - Paso 4: deja la opción por defecto para usar el rol `EC2InstanceProfileForImageBuilder` con políticas adicionales adjuntas.
   - Paso 5: deja los valores por defecto.
   - Paso 6: revisar y crear.
1. Navega hasta el pipeline recién creado y ejecútelo.
1. Una vez finalizado el pipeline, un resumen muestra el nuevo ARN de la imagen.
1. Si has configurado tu secreto `mp-ib-datadog-agent-secret` correctamente, el Datadog Agent comienza a informar métricas poco después de que la instancia de EC2 se inicie con la imagen.

Consulta [Pipelines de EC2 Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/ami-image-pipelines.html) para obtener más información.

##### Parámetros de los componentes

El Agent puede personalizarse utilizando los siguientes parámetros en la receta:

- `DD_SITE`: sitio al que enviar los datos de telemetría. Por defecto: `datadoghq.com`.
- `HOST_TAGS`: etiquetas (tags) de host. Por defecto: `installer:ec2_image_builder`.
- `SM_SECRET_NAME`: nombre del secreto para almacenar las claves de la API y de la aplicación. Por defecto: `mp-ib-datadog-agent-secret`.
- `SM_API_KEY`: para buscar la clave de la API en el secreto. Por defecto: `dd-api-key`
- `SM_API_KEY`: clave para buscar la clave de aplicación en el secreto. Por defecto: `dd-app-key`

{{% /tab %}}

{{< /tabs >}}

### Recopilación de logs

Utiliza el [Datadog Agent](https://docs.datadoghq.com/agent/logs/) u otro [remitente de logs](https://docs.datadoghq.com/integrations/rsyslog/) para enviar tus logs a Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ec2.cpucredit_balance** <br>(gauge) | Número de créditos de CPU que ha acumulado una instancia.<br>_Se muestra como unidad_ |
| **aws.ec2.cpucredit_usage** <br>(gauge) | Número de créditos de CPU consumidos.<br>_Se muestra como unidad_ |
| **aws.ec2.cpuutilization** <br>(gauge) | Porcentaje medio de unidades de cálculo EC2 asignadas que se utilizan actualmente en la instancia.<br>_Se muestra como porcentaje_ |
| **aws.ec2.cpuutilization.maximum** <br>(gauge) | Porcentaje máximo de unidades de cálculo EC2 asignadas que se utilizan actualmente en la instancia.<br>_Se muestra como porcentaje_ |
| **aws.ec2.disk_read_bytes** <br>(gauge) | Bytes leídos de todos los discos efímeros disponibles para la instancia.<br>_Se muestra como bytes_ |
| **aws.ec2.disk_read_ops** <br>(gauge) | Operaciones de lectura completadas de todos los discos efímeros disponibles para la instancia.<br>_Se muestra como operación_ |
| **aws.ec2.disk_write_bytes** <br>(gauge) | Bytes escritos en todos los discos efímeros disponibles para la instancia.<br>_Se muestra como bytes_ |
| **aws.ec2.disk_write_ops** <br>(gauge) | Operaciones de escritura completadas en todos los discos efímeros disponibles para la instancia.<br>_Se muestra como operación_ |
| **aws.ec2.ebsbyte_balance** <br>(gauge) | Porcentaje de créditos de rendimiento restantes en el bucket de ráfagas para instancias basadas en Nitro.<br>_Se muestra como porcentaje_ |
| **aws.ec2.ebsiobalance** <br>(gauge) | Porcentaje de créditos de E/S restantes en el bucket de ráfagas para instancias basadas en Nitro.<br>_Se muestra como porcentaje_ |
| **aws.ec2.ebsread_bytes** <br>(gauge) | Promedio de bytes leídos de todos los volúmenes EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como bytes_ |
| **aws.ec2.ebsread_bytes.sum** <br>(gauge) | Total de bytes leídos de todos los volúmenes EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como bytes_ |
| **aws.ec2.ebsread_ops** <br>(count) | Promedio de operaciones de lectura completadas de todos los volúmenes de Amazon EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como operación_ |
| **aws.ec2.ebsread_ops.sum** <br>(count) | Total de operaciones de lectura completadas de todos los volúmenes de Amazon EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como operación_ |
| **aws.ec2.ebswrite_bytes** <br>(gauge) | Promedio de bytes escritos en todos los volúmenes EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como bytes_ |
| **aws.ec2.ebswrite_bytes.sum** <br>(gauge) | Total de bytes escritos en todos los volúmenes EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como bytes_ |
| **aws.ec2.ebswrite_ops** <br>(gauge) | Promedio de operaciones de escritura completadas en todos los volúmenes EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como operación_ |
| **aws.ec2.ebswrite_ops.sum** <br>(gauge) | Total de operaciones de escritura completadas en todos los volúmenes EBS adjuntos a la instancia para instancias basadas en Nitro.<br>_Se muestra como operación_ |
| **aws.ec2.network_address_usage** <br>(gauge) | Número máximo de unidades NAU para una VPC.<br>_Se muestra como unidad_ |
| **aws.ec2.network_address_usage_peered** <br>(gauge) | Número máximo de unidades NAU para una VPC y todas sus VPC emparejadas.<br>_Se muestra como unidad_ |
| **aws.ec2.network_in** <br>(gauge) | Número medio de bytes recibidos en todas las interfaces de red por la instancia.<br>_Se muestra como bytes_ |
| **aws.ec2.network_in.maximum** <br>(gauge) | Número máximo de bytes recibidos en todas las interfaces de red por la instancia.<br>_Se muestra como bytes_ |
| **aws.ec2.network_out** <br>(gauge) | Número medio de bytes enviados en todas las interfaces de red por la instancia.<br>_Se muestra como bytes_ |
| **aws.ec2.network_out.maximum** <br>(gauge) | Número máximo de bytes enviados en todas las interfaces de red por la instancia.<br>_Se muestra como bytes_ |
| **aws.ec2.network_packets_in** <br>(gauge) | Número de paquetes recibidos en todas las interfaces de red por la instancia<br>_Se muestra como paquete_ |
| **aws.ec2.network_packets_out** <br>(gauge) | Número de paquetes enviados en todas las interfaces de red por la instancia<br>_Se muestra como paquete_ |
| **aws.ec2.status_check_failed** <br>(gauge) | 1 si falla uno de los checks de estado.|
| **aws.ec2.status_check_failed_instance** <br>(gauge) | 0 si la instancia ha aprobado el check de estado de la instancia EC2.|
| **aws.ec2.status_check_failed_system** <br>(gauge) | 0 si la instancia ha aprobado el check de estado del sistema EC2.|
| **aws.ec2.cpusurplus_credit_balance** <br>(gauge) | Número de créditos excedentes que han sido utilizados por una instancia ilimitada cuando su valor CPUCreditBalance es cero.<br>_Se muestra como unidad_ |
| **aws.ec2.cpusurplus_credits_charged** <br>(gauge) | Número de créditos excedentes gastados que no se amortizan con créditos de CPU ganados y que, por tanto, incurren en un cargo adicional.<br>_Se muestra como unidad_ |
| **aws.ec2.host_ok** <br>(gauge) | 1 si el estado del sistema de la instancia es correcto.|
| **aws.ec2.instance_age** <br>(gauge) | Tiempo transcurrido desde el inicio de la instancia<br>_Se muestra como segundos_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

**Notas**:

- `aws.ec2.instance_age` no se recopila de forma predeterminada con la integración Datadog - EC2. Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/) para activar esta recopilación de métricas.
- `aws.ec2.host_ok` se recopila de forma predeterminada, incluso si desactiva la recopilación de métricas de la integración Amazon EC2 y puede provocar que aparezcan hosts inesperados en la lista de infraestructuras. Para garantizar que solo se monitorizan los hosts deseados, asigna una etiqueta AWS, como `datadog:true`, a esas instancias EC2. A continuación, especifica dicha etiqueta en el cuadro de texto **Limitar la recopilación de métricas a recursos específicos** de la pestaña **Recopilación de métricas** de la [página de tu integración AWS en Datadog](https://app.datadoghq.com/integrations/amazon-web-services).

### Checks de servicio

**aws.ec2.host_status**

Devuelve el estado de tu instancia EC2 tal y como lo informa la consola AWS. Devuelve `CRITICAL` cuando hay un problema con tu instancia. Devuelve `UNKNOWN` cuando AWS no tiene datos suficientes para ejecutar un check de estado. Devuelve `OK` cuando tu instancia está funcionando o se ha apagado correctamente.

_Estados: ok, crítico, desconocido_

## Monitorización predefinida

La integración Amazon EC2 proporciona funciones de monitorización predefinidas para monitorizar y optimizar el rendimiento.

- Dashboard de información general de Amazon EC2: Obtén una vista completa de tus instancias EC2 con el [dashboard de información general de Amazon EC2] predefinido (https://app.datadoghq.com/dash/integration/60/aws-ec2-overview).
- Monitores recomendados: Habilita los [monitores recomendados de Amazon EC2](https://app.datadoghq.com/monitors/recommended) para detectar problemas de forma proactiva y recibir alertas oportunas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Métricas clave para la monitorización de EC2](https://www.datadoghq.com/blog/ec2-monitoring)
- [Recopilar métricas de EC2](https://www.datadoghq.com/blog/collecting-ec2-metrics)
- [Monitorizar instancias EC2 con Datadog](https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog)