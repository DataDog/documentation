---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Comience a rastrear las configuraciones incorrectas con Cloud Security Misconfigurations
- link: /security/default_rules/#cat-cloud-security-management
  tag: Documentación
  text: Reglas de detección predeterminadas
title: Cómo determina Datadog si los recursos son de acceso público
---
Datadog utiliza un marco de procesamiento de grafos para mapear las relaciones entre los recursos en la nube y determinar si son accesibles desde internet. Esta guía describe la lógica utilizada para clasificar los recursos como públicamente accesibles dentro del marco de grafos.

## Grafo de dependencia de recursos {#resource-dependency-graph}

Los siguientes diagramas muestran cómo se utilizan los recursos relacionados para determinar si otros recursos son públicamente accesibles. Por ejemplo, un Trail de AWS CloudTrail almacenado en un bucket público de Amazon S3 es, en sí mismo, públicamente accesible. Si un recurso es públicamente accesible debido a otro recurso, la relación se muestra en el grafo de relaciones entre recursos de Cloud Security Misconfigurations.


<div class="alert alert-info">No todos los recursos con el atributo Publicly Accessible se muestran en estos diagramas.</div>

### AWS {#aws}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="Un diagrama de grafo que muestra las relaciones entre los recursos que se utilizan para determinar la accesibilidad pública para AWS" width="100%">}}

### Azure {#azure}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="Un diagrama de grafo que muestra las relaciones entre los recursos que se utilizan para determinar la accesibilidad pública para Azure" width="70%">}}

### Google Cloud {#google-cloud}

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="Un diagrama de grafo que muestra las relaciones entre los recursos que se utilizan para determinar la accesibilidad pública para Google Cloud" width="50%">}}

## Lógica de accesibilidad pública de AWS por recurso {#aws-public-accessibility-logic-by-resource}

Para obtener más información sobre la accesibilidad de red de AWS, consulte la [documentación de AWS][34] y [AWS Network Reachability Analyser][35].

### Bucket de Amazon S3 {#amazon-s3-bucket}

Un [bucket de S3][1] (`aws_s3_bucket`) se considera públicamente accesible en cualquiera de los siguientes casos:

* **Público por política de bucket** si todo lo siguiente es verdadero:

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | La política del bucket permite acciones de S3 riesgosas (permisos de lectura, escritura, eliminación o administración) incondicionalmente, con el recurso y el principal establecidos en `"*"`. |Esto define una política pública en el bucket, lo que significa que se permite el acceso no autenticado. `"*"` es un Wildcard, lo que significa que se otorga acceso a cualquier recurso y principal. Las acciones Wildcard como `s3:*` o `s3:Put*` también se tienen en cuenta. |
  | Ninguna de las `public_access_block_configuration` del bucket ni el bloqueo de acceso público de la cuenta de AWS (`aws_s3_account_public_access_block`) tienen `restrict_public_buckets` establecido en `true`. | Ninguno de los buckets o cuentas bloquea explícitamente el acceso público, lo que significa que la política de bucket pública entra en vigor. |

***O***

* **Público mediante una lista de Access Control (ACL)** si se cumplen todas las condiciones siguientes:

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | El bucket tiene concesiones de ACL que permiten permisos inseguros a beneficiarios públicos. |Las concesiones de ACL del bucket otorgan uno o más de los siguientes permisos (`full_control`, `read`, `write`, `write_acp`) ya sea a usuarios autenticados (`http://acs.amazonaws.com/groups/global/authenticatedusers`) o a todos los usuarios (`http://acs.amazonaws.com/groups/global/allusers`). |
  | Ninguna de las `public_access_block_configuration` del bucket ni el bloqueo de acceso público de la cuenta de AWS (`aws_s3_account_public_access_block`) tienen `ignore_public_acls` establecido en `true`. | Ningún bucket ni ninguna cuenta ignora explícitamente las ACL públicas, lo que significa que las concesiones de ACL públicas entran en vigor. |

Consulte [Bloqueo del acceso público a su almacenamiento de Amazon S3][2] para obtener más información.

### Trail de AWS CloudTrail {#aws-cloudtrail-trail}

Un [trail de CloudTrail][3] (`aws_cloudtrail_trail`) se considera accesible públicamente si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|El `s3_bucket_name` del trail está configurado en un bucket de S3 que se considera accesible públicamente. |Los trails de CloudTrail son archivos de registro que se entregan a buckets de S3. Si el trail se almacena en un bucket de S3 público, entonces ese trail es accesible públicamente. |

### Subred de Amazon VPC {#amazon-vpc-subnet}

Una [subred][4] (`aws_subnet`) se considera pública si todas las siguientes condiciones son verdaderas:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Está conectada a una o más [tablas de rutas][5] que están conectadas a una [puerta de enlace de Internet][6] y que dirigen a un bloque CIDR de destino de `"0.0.0.0/0"`, o a un bloque CIDR IPv6 de `"::/0"`.| La tabla de rutas asociada a esta subred dirige el tráfico de salida a través de una puerta de enlace de Internet, lo que significa que los recursos en la subred pueden acceder a la Internet pública.|
|Está conectada a una o más [ACL de red][7] que tienen al menos una entrada de ingreso y al menos una entrada de egreso que tienen un bloque CIDR de `"0.0.0.0/0"`, o un bloque CIDR IPv6 de `"::/0"`.| Las ACL de red controlan el tráfico que puede salir o entrar a la subred a nivel de subred. Cuando una regla de ACL de red permite el tráfico de ingreso desde Internet y permite el tráfico de egreso a puertos efímeros, permite que los recursos en la subred queden expuestos a Internet si tienen asignada una IP pública y su grupo de seguridad lo permite.|

Consulte [Subredes para su VPC][8] para ver la definición de AWS de una subred pública.

### Clúster de Amazon Redshift {#amazon-redshift-cluster}

Un [clúster de Redshift][9] (`aws_redshift_cluster`) se considera accesible públicamente si todas las siguientes condiciones son verdaderas:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene `publicly_accessible` configurado como `true` en su configuración.|Consulte [Administración de clústeres en una VPC][10]. |
|Está en una [VPC][11] pública. |Una VPC pública es una VPC con al menos una subred pública, conectada a una o más ACL de red que tienen al menos una entrada de ingreso y al menos una entrada de egreso que tienen un bloque CIDR de `"0.0.0.0/0"`, o un bloque CIDR IPv6 de `"::/0"`.|
|Está asociado con un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"`, o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico entrante a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |
|Está conectado a una o más [tablas de rutas][5] que están conectadas a una [puerta de enlace de Internet][6], y que dirigen a un bloque CIDR de destino de `"0.0.0.0/0"`, o un bloque CIDR IPv6 de `"::/0"`.| La tabla de rutas adjunta a esta subred dirige el tráfico de egreso a través de una puerta de enlace de Internet, lo que significa que los recursos en la subred pueden acceder a la Internet pública.|

Consulte [Hacer que un clúster de Amazon Redshift privado sea accesible públicamente][13] para obtener más información sobre los clústeres de Redshift y la accesibilidad pública.

### Instancia de base de datos de Amazon RDS {#amazon-rds-db-instance}

Una [instancia de base de datos de RDS][14] (`aws_rds_instance`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene `publicly_accessible` establecido en `true` en su configuración de conectividad.|Esta configuración hace que la base de datos sea accesible públicamente, lo que significa que su punto de conexión DNS se resolverá en la dirección IP privada dentro de su VPC y en una dirección IP pública desde fuera de la VPC. Sin embargo, el acceso al clúster seguirá estando controlado por un grupo de seguridad relacionado. |
|Está en una [subred][4] pública.|-|
|Está asociada con un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico entrante a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |

Consulte [Corregir la conectividad a una instancia de base de datos de RDS que utiliza la subred de una VPC][15] para obtener más información sobre el acceso público a una instancia de base de datos de RDS.

### Instantánea de base de datos de Amazon RDS {#amazon-rds-db-snapshot}

Una [instantánea de base de datos de RDS][16] (`aws_rds_db_snapshot`) se considera accesible públicamente si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene un atributo configurado como `"restore"` con un valor de atributo establecido en `"all"`.|Si configura la visibilidad de la instantánea de base de datos como Public, todas las cuentas de AWS pueden restaurar una instancia de base de datos a partir de su instantánea de base de datos manual y tener acceso a sus datos.|

Consulte [Uso compartido de una instantánea de base de datos][17] para obtener más información.

### Amazon Elastic Load Balancer {#amazon-elastic-load-balancer}

Un ELB (`aws_elbv2_load_balancer`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|El [esquema][21] está configurado como `internet-facing`.|El esquema determina si el balanceador de carga es un balanceador de carga interno o un balanceador de carga orientado a Internet.|
|Está asociado con un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico entrante a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |

Consulte [Crear un Application Load Balancer][20] para obtener más información sobre los balanceadores de carga orientados a Internet.

### Instancia de Amazon EC2 {#amazon-ec2-instance}

Una [instancia de EC2][18] (`aws_ec2_instance`) se considera accesible públicamente en cualquiera de los siguientes casos:

* **Acceso determinado por "subred pública"** si se cumplen todas las siguientes condiciones:

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  |Tiene una o más [direcciones IP públicas][18].|Una dirección IP pública permite que se acceda a su instancia desde internet.|
  |Está en una [subred][4] pública.|-|
  |Está asociado con un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR de IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico entrante a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |

***O***

* **Acceso determinado por ELB** si se cumplen todas las siguientes condiciones:

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | Un grupo de seguridad (por ejemplo, `SG1`) asociado al balanceador de carga es accesible públicamente y permite tráfico de entrada a algún puerto `X`. | Esto abre el balanceador de carga al tráfico entrante desde internet en un puerto específico. |
  | El balanceador de carga tiene un agente de escucha que acepta tráfico en el puerto `X`. | Un [agente de escucha][37] es un proceso que verifica las solicitudes de conexión utilizando el protocolo y el puerto que usted configure. |
  | El balanceador de carga tiene un grupo de destino que reenvía tráfico a algún puerto `Y`. | [Los grupos de destino][38] enrutan las solicitudes a uno o más destinos registrados, como instancias EC2, mediante un protocolo y un puerto que usted especifique. |
  | La instancia EC2 aparece como un destino del grupo de destino y tiene un grupo de seguridad con al menos una regla que permite el tráfico de entrada en el puerto `Y` desde `0.0.0.0/0`, desde el CIDR de VPC (por ejemplo, `10.0.0.0/8`) o desde el grupo de seguridad del balanceador de carga (`SG1`). | Debido a que la instancia está registrada como un destino del grupo de destino, el balanceador de carga puede reenviarle tráfico a través del puerto `Y`. El grupo de seguridad debe permitir el tráfico proveniente del balanceador de carga. |

***O***

- **Acceso determinado por ruta de alcanzabilidad** si Security Graph identifica una ruta de alcanzabilidad de red que conecta la instancia a internet a través de una de las siguientes rutas:
  - Detrás de [AWS Global Accelerator][64].
  - Detrás de [Amazon API Gateway][65] a través de un VPC Link hacia un balanceador de carga interno.
  - Detrás de [Amazon CloudFront][66], donde el balanceador de carga está restringido a la lista de IP de CloudFront.

Consulte [Autorizar el tráfico entrante para sus instancias de Linux][19] para obtener más información sobre las instancias EC2 y el acceso público. Consulte [Ejemplo: VPC con servidores en subredes privadas y NAT][36] para ver un ejemplo de instancias EC2 que están expuestas a través de un balanceador de carga.

### Dominio de Amazon Elasticsearch {#amazon-elasticsearch-domain}

Un [Elasticsearch Domain][22] (`aws_elasticsearch_domain`) se considera accesible públicamente si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene un punto de conexión que coincide con el patrón de expresión regular `^search-.*\.es\.amazonaws\.com$`.|Esta es la forma que adoptan los [puntos de conexión][23] de los dominios accesibles públicamente.|

Consulte [Implementar sus dominios de Amazon OpenSearch Service en una VPC][24] para obtener más información sobre cómo hacer que su dominio de Elasticsearch ya no sea accesible públicamente.

### Amazon Machine Images (AMI) {#amazon-machine-images-ami}

Una [Machine Image][25] (`aws_ami`) se considera accesible públicamente si todas las siguientes condiciones son verdaderas:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Es propiedad del cliente, lo que significa que no tiene un propietario con alias (ya sea `amazon` o `aws-marketplace` en el campo de cuenta).|Las AMI públicas propiedad de proveedores verificados (ya sea Amazon o socios verificados) tienen un propietario con alias, que aparece como `amazon` o `aws-marketplace` en el campo de cuenta. Consulte [Buscar una AMI compartida][26] en la documentación de AWS.|
|Su imagen está configurada como `public`, lo que significa que los permisos de lanzamiento de la imagen son públicos.|Al modificar la propiedad `launchPermission` de una AMI, puede hacer que la AMI sea pública (lo que otorga permisos de lanzamiento a todas las cuentas de AWS) o compartirla solo con las cuentas de AWS que especifique.|

Consulte [Hacer pública una AMI][27] para obtener una explicación sobre cómo hacer que una AMI sea pública o privada.

### Instantáneas de Amazon EBS {#amazon-ebs-snapshots}

Una [instantánea de EBS][28] (`aws_ebs_snapshot`) se considera accesible públicamente si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|`create_volume_permission` está configurado como `all`.|Cada instantánea contiene toda la información necesaria para restaurar los datos de la instantánea en un nuevo volumen de EBS. Si cualquier persona puede crear un volumen a partir de la instantánea, esa información es accesible públicamente.|

Consulte [Compartir una instantánea de Amazon EBS][29] para obtener información sobre las instantáneas de EBS públicas y cómo hacerlas privadas.

### Clústeres de Amazon EKS {#amazon-eks-clusters}

Un [clúster de EKS][30] (`aws_eks_cluster`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|`endpoint_public_access` está configurado como `true` en la configuración del clúster.|Esta configuración hace que el clúster sea accesible públicamente cuando se combina con un CIDR público abierto. |
|El `public_access_cidrs` del clúster contiene un bloque CIDR abierto (`"0.0.0.0/0"`).|Puede limitar los bloques CIDR que pueden acceder al punto de conexión público del clúster de EKS. Un bloque CIDR abierto significa que cualquier persona en Internet puede acceder al punto de conexión.|

Consulte [Control de acceso al punto de conexión del clúster de Amazon EKS][31] para obtener más información sobre los clústeres de EKS públicos.

### Cola de Amazon SQS {#amazon-sqs-queue}

Una [cola de SQS][32] (`aws_sqs_queue`) se considera accesible públicamente si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|La cola tiene una política que permite a cualquier principal (principal establecido en `"*"`) realizar acciones incondicionalmente (`statement_has_condition` establecido en `false`).|Esta configuración hace que la cola sea accesible para cualquier persona en el mundo o para cualquier usuario de AWS autenticado.|

Consulte [Prácticas recomendadas de seguridad de Amazon SQS][33] para obtener más información sobre las colas de SQS públicas.

### Función de AWS Lambda {#aws-lambda-function}

Una [función de Lambda][58] (`aws_lambda_function`) se considera accesible públicamente si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|La función tiene una política que permite el acceso a cualquier principal (`principal_policy` o `principal_aws`) establecido en `"*"`. |Esta configuración hace que la función sea accesible para cualquier persona en el mundo o para cualquier usuario de AWS autenticado.|

Consulte [Prácticas recomendadas para trabajar con funciones de AWS Lambda][59] para obtener más información sobre las funciones de Lambda públicas.

## Lógica de accesibilidad pública de Azure por recurso {#azure-public-accessibility-logic-by-resource}

### Azure Network Security Group (NSG) {#azure-network-security-group-nsg}

Un NSG de Azure (`azure_security_group`) otorga acceso público si todo lo siguiente es verdadero:

| Criterios | Explicación |
|----------|-------------|
|El grupo de seguridad tiene reglas con el protocolo `tcp`, `udp` o `*`. | Estos son los valores de protocolo que son relevantes para determinar el acceso público a los recursos de Azure. |
|El grupo de seguridad tiene `inbound` reglas con acceso establecido en `Allow`. | Estos valores indican que la regla permite el tráfico entrante. |
|El grupo de seguridad tiene reglas con source_address_prefix igual a `*`, `0.0.0.0`, `/0`, `::/0`, `internet` o `any`. | Estos prefijos CIDR permiten el acceso a Internet. |
|Las reglas que coinciden con las propiedades anteriores se combinan con cualquier otra regla `Deny` de mayor prioridad para abrir al menos un puerto a Internet. | Consulte [Reglas de seguridad][39] para saber cómo Azure combina las reglas del grupo de seguridad para calcular el acceso. |

Para obtener detalles sobre cómo los NSG de Azure permiten y deniegan el acceso a Internet para un recurso, consulte [Grupos de seguridad de red][40].

### Instancia de máquina virtual de Azure {#azure-virtual-machine-instance}

Una instancia de máquina virtual (`azure_virtual_machine_instance`) se considera accesible públicamente en cualquiera de los siguientes casos:

* **Asociada a un Network Security Group que permite el acceso público** si se cumplen todas las siguientes condiciones:

  | Criterios | Explicación |
  |----------|-------------|
  |La instancia de máquina virtual tiene una dirección IP pública adjunta a una de sus interfaces de red. | Se requiere una IP pública para acceder desde Internet a una instancia de máquina virtual. |
  |La instancia de máquina virtual tiene un grupo de seguridad de red que otorga acceso público adjunto a una de sus interfaces de red. | Para obtener más información sobre cómo una red puede otorgar acceso público, consulte [Azure Network Security Group (NSG)](#azure-network-security-group-nsg). |

***O***

* **Tiene IP pública con SKU "Basic"** si todas las siguientes condiciones son verdaderas:

  | Criterios | Explicación |
  |----------|-------------|
  |La instancia de máquina virtual tiene una dirección IP pública con SKU Basic asociada a su interfaz de red. | Una dirección IP pública con SKU Basic está abierta de forma predeterminada (consulte [Direcciones IP públicas][41]). |
  |La instancia de máquina virtual no tiene grupos de seguridad de red asociados. | Si no hay grupos de seguridad de red asociados, entonces no hay reglas que bloqueen el acceso a través de la dirección IP pública abierta. |

Para obtener más información sobre las instancias de máquina virtual de Azure y el acceso público, consulte [Asociar una dirección IP pública a una máquina virtual][42].

### Contenedor de blobs de Azure Storage {#azure-storage-blob-container}

Un contenedor de blobs de Storage (`azure_storage_blob_container`) se considera accesible públicamente si todas las siguientes condiciones son verdaderas:

| Criterios | Explicación |
|----------|-------------|
|La cuenta de almacenamiento del contenedor de blobs de almacenamiento no tiene el atributo `allow_blob_public_access` o tiene el atributo establecido en `true`. | Esto significa que la cuenta permite el acceso público desde Internet a Azure Blob Storage. Para obtener más información sobre cómo configurar el acceso de lectura anónimo con cuentas de Azure Storage, consulte [Configurar el acceso de lectura anónimo para contenedores y blobs][45].|
|El atributo `public_access` del contenedor de blobs de almacenamiento está establecido en `blob` o `container`. | Esto significa que la cuenta permite el acceso público desde Internet a Azure Blob Storage. |
|El contenedor de blobs de almacenamiento es parte de una cuenta de almacenamiento que no bloquea explícitamente el acceso público. | Cuando una cuenta de almacenamiento no bloquea explícitamente el acceso público, los contenedores de blobs de almacenamiento dentro de ella pueden hacerse públicos. |

Para obtener más información sobre cómo denegar el acceso público a blobs en cuentas de Azure Storage, consulte [Elegir permitir o denegar el acceso público a blobs en cuentas de Azure Storage][46].

### Clúster de Azure Kubernetes Service (AKS) {#azure-kubernetes-service-aks-cluster}

Un [clúster de AKS][60] (`azure_aks_cluster`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|`enable_private_cluster` está configurado como `false` en la configuración del clúster.|Esta configuración hace que el clúster sea accesible públicamente cuando se combina con un CIDR público abierto. |
|El `authorized_ip_ranges` del clúster contiene un bloque CIDR abierto (`"0.0.0.0/0"`) o no está configurado.|Un bloque CIDR abierto significa que cualquier persona en Internet puede acceder al punto de conexión.|

Consulte las [prácticas recomendadas de AKS][61] para obtener más información sobre los clústeres de AKS públicos.

## Lógica de accesibilidad pública de Google Cloud por recurso {#google-cloud-public-accessibility-logic-by-resource}

### Firewall de Google Cloud Compute {#google-cloud-compute-firewall}

Un firewall de Compute (`gcp_compute_firewall`) otorga acceso público si se cumplen todas las siguientes condiciones:

| Criterios | Explicación |
|----------|-------------|
|El firewall tiene una o más reglas cuyo protocolo es TCP o all y que tienen `0.0.0.0/0` o `::/0` en su `source_ranges`. | Estos prefijos CIDR permiten el acceso desde Internet y son los valores de protocolo que son relevantes para determinar el acceso público. |
|La dirección del firewall es `ingress`. | Esto significa que el firewall es relevante para el acceso entrante desde Internet. |

Para obtener más información sobre el uso de firewalls de Compute, [Elegir permitir o denegar el acceso público a blobs en cuentas de Azure Storage][47].

### Instancia de Google Cloud Compute {#google-cloud-compute-instance}

Una instancia de Compute (`gcp_compute_instance`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| Criterios | Explicación |
|----------|-------------|
|La instancia de cómputo tiene una dirección IP pública, lo que significa que al menos una de sus interfaces de red tiene una dirección IP pública definida en sus configuraciones de acceso, | Para obtener más información sobre cómo agregar una IP externa a una instancia de cómputo, consulte [Reservar una dirección IP externa estática][48]. |
|La instancia de cómputo tiene reglas de firewall asociadas que se combinan para abrir un rango de puertos a internet. Las reglas de firewall pueden asociarse con la instancia mediante:<br><ul><li>No tener `target_tags` ni `target_service_accounts`, lo que significa que la regla se aplica a toda la red.</li><li>Tener `target_service_accounts` asociado con una de las `service_accounts` de la instancia de cómputo.</li><li>Tener algún `target_tags` que coincida con las etiquetas de red de la instancia de cómputo.</li></ul>Las reglas deben otorgar acceso público (consulte [Firewall de Google Cloud Compute](#google-cloud-compute-firewall)). | Para saber cómo se utilizan las reglas de firewall de cómputo para restringir rangos de puertos para una instancia de cómputo, consulte [Componentes de las reglas de firewall][49]. |

Obtenga más información sobre cómo se utilizan las reglas de firewall de cómputo para restringir rangos de puertos para una instancia de cómputo [aquí][50].

### Conjunto de datos de Google Cloud BigQuery {#google-cloud-bigquery-dataset}

Un conjunto de datos de BigQuery (`gcp_bigquery_dataset`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| Criterios | Explicación |
|----------|-------------|
|El conjunto de datos tiene una política de IAM adjunta cuyo valor de `member` es `AllUsers` o `AllAuthenticatedUsers`. | Estos miembros permiten que cualquier persona en internet acceda a la base de datos. Consulte la [descripción general de IAM][51] para obtener más información. |
|El conjunto de datos tiene una política de IAM adjunta que lo vincula a uno de los siguientes roles: `roles/viewer`, `roles/owner`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.metadataviewer`, `roles/bigquery.dataowner`, `roles/bigquery.dataeditor`, `roles/bigquery.dataviewer` o `roles/bigquery.user`. | Estos roles permiten que la persona que accede al recurso realice operaciones peligrosas en la base de datos. Consulte la [referencia de roles][52] para obtener más información. |

Obtenga más información sobre los [conjuntos de datos de BigQuery][53].

### Bucket de Google Cloud Storage {#google-cloud-storage-bucket}

Un bucket de almacenamiento (`gcp_storage_bucket`) se considera accesible públicamente si se cumplen todas las siguientes condiciones:

| Criterios | Explicación |
|----------|-------------|
|El bucket tiene una política de IAM adjunta cuyo valor de `member` es `AllUsers` o `AllAuthenticatedUsers`. | Estos miembros permiten que cualquier persona en Internet acceda a la base de datos. Obtenga más información [aquí][54]. |
|El bucket tiene `public_access_prevention` configurado como `inherited` en su `iam_configuration`. | Esta configuración bloquea el acceso público si se establece en `enforced`. Para obtener más información sobre la configuración de prevención de acceso público, consulte [Prevención de acceso público][55]. |
|El bucket tiene una política de IAM adjunta que lo vincula a uno de los siguientes roles: <ul><li><code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|Estos roles permiten que la persona que accede al recurso realice operaciones peligrosas en el bucket. Consulte la [referencia de roles][56] para obtener más información.|

Obtenga más información sobre cómo hacer públicos los buckets de almacenamiento [aquí][57].

### Clústeres de Google Cloud Kubernetes Engine {#google-cloud-kubernetes-engine-clusters}

Un clúster de Kubernetes Engine (`gcp_kubernetes_engine_cluster`) se considera accesible públicamente si cumple con **todos** los siguientes **criterios base**, **Y al menos una** de las condiciones adicionales que se enumeran a continuación:

**Criterios base (todos obligatorios):**

| **Criterios** | **Explicación** |
|--------------|-----------------|
| El punto de conexión privado está inhabilitado | El [punto de conexión privado][62] del clúster no está habilitado (`enable_private_endpoint` es falso), lo que significa que el plano de control tiene una dirección IP pública. |
| El punto de conexión público está habilitado | El clúster tiene un punto de conexión público configurado (`public_endpoint` es verdadero). |

**Y al menos una de las siguientes condiciones:**

* **Las redes autorizadas están inhabilitadas**

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | [Redes autorizadas][63] no están habilitadas. | No hay restricciones de acceso basadas en una lista de direcciones IP permitidas para el plano de control del clúster, por lo que se puede acceder desde cualquier dirección IP. |

***O***

* **Bloque CIDR sin restricciones permitido**

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | La configuración de redes autorizadas incluye el bloque CIDR `0.0.0.0/0`. | Este bloque CIDR permite el acceso desde cualquier dirección IP en Internet. |

***O***

* **Direcciones IP externas de Google Cloud agregadas a las redes autorizadas**

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | Las direcciones IP externas de Google Cloud se agregan a las redes autorizadas (`gcpPublicCidrsAccessEnabled` está configurado como `true`). | Esto permite el acceso desde cualquier dirección IP externa asignada a las VM de Google Cloud, lo que significa que cualquier persona puede crear una VM en Google Cloud y acceder al plano de control del clúster. |

***O***

* **Se permite un amplio rango de direcciones IP de Google Cloud**

  | **Criterios** | **Explicación** |
  |--------------|-----------------|
  | La configuración de redes autorizadas incluye el bloque CIDR `34.0.0.0/7`. | Este rango CIDR se utiliza a veces para permitir el acceso desde rangos de IP de Google Cloud y se considera de acceso público. |

<div class="alert alert-info">Un clúster con redes autorizadas habilitadas (<code>{"enabled":true}</code>) pero con una lista de bloques CIDR vacía (<code>{"enabled":true, "cidr_blocks":[]}</code>) <strong>no</strong> se considera accesible al público, ya que bloquea todo acceso externo al plano de control.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#BasicsBucket
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#RouteTables
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html
[8]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
[9]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#working-with-clusters-overview
[10]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html
[11]: https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html
[12]: https://docs.aws.amazon.com/vpc/latest/userguide/security-groups.html
[13]: https://repost.aws/knowledge-center/redshift-cluster-private-public
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
[15]: https://repost.aws/knowledge-center/rds-connectivity-instance-subnet-vpc
[16]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html
[18]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#concepts-public-addresses
[19]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html
[20]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html
[21]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme
[22]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html
[23]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html#vpc-architecture
[24]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html
[25]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html
[26]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/usingsharedamis-finding.html#usingsharedamis-finding-cli
[27]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-intro.html
[28]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html
[29]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-modifying-snapshot-permissions.html
[30]: https://docs.aws.amazon.com/eks/latest/userguide/clusters.html
[31]: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html
[32]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
[33]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-security-best-practices.html
[34]: https://docs.aws.amazon.com/
[35]: https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html
[36]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html
[37]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html
[38]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html
[39]: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview#security-rules
[40]: https://azure.microsoft.com/en-us/blog/network-security-groups/
[41]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses
[42]: https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/associate-public-ip-address-vm?tabs=azure-portal
[45]: https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=portal
[46]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[47]: https://azure.microsoft.com/en-us/updates/choose-to-allow-or-disallow-blob-public-access-on-azure-storage-accounts/
[48]: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address
[49]: https://cloud.google.com/firewall/docs/firewalls#firewall_rule_components
[50]: https://cloud.google.com/compute/docs/instances
[51]: https://cloud.google.com/iam/docs/overview
[52]: https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles
[53]: https://cloud.google.com/bigquery?hl=en
[54]: https://cloud.google.com/iam/docs/overview
[55]: https://cloud.google.com/storage/docs/public-access-prevention
[56]: https://cloud.google.com/iam/docs/understanding-roles#cloud-storage-roles
[57]: https://cloud.google.com/storage/docs/access-control/making-data-public
[58]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
[59]: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
[60]: https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes
[61]: https://learn.microsoft.com/en-us/azure/aks/best-practices
[62]: https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation#private_cp
[63]: https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation#overview
[64]: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html
[65]: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
[66]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html