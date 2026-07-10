---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Empezar a rastrear los errores de configuración con CSM Misconfigurations
- link: /security/default_rules/#cat-cloud-security-management
  tag: Documentación
  text: Reglas de detección predefinidas
title: Cómo determina Datadog si los recursos son accesibles públicamente
---

Datadog utiliza un marco de procesamiento gráfico para asignar las relaciones entre los recursos de la nube y determinar si son accesibles desde Internet. Esta guía describe la lógica utilizada para clasificar los recursos como públicamente accesibles dentro del marco gráfico.

Para obtener más información sobre la accesibilidad de la red, consulta la [documentation de AWS][34] y el [AWS Reachability Analyser para la accesibilidad de la red][35]. Actualmente, la faceta `Is Publicly Accessible` sólo está disponible para recursos AWS.

## Gráfico de dependencia de recursos

Los siguientes diagramas muestran cómo se utilizan los recursos relacionados para determinar si otros recursos son accesibles públicamente. Por ejemplo, una pista de AWS CloudTrail almacenada en un bucket público de Amazon S3 es a su vez accesible públicamente. Si un recurso es accesible públicamente gracias a otro recurso, la relación se muestra en el gráfico de relaciones de recursos para errores de configuración de Cloud Security Management.


**Nota**: No todos los recursos con el atributo Accesible públicamente se muestran en estos diagramas.

### AWS

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_aws.png" alt="Diagrama con gráficos que muestra la relación entre los recursos utilizados para determinar la accesibilidad pública para AWS" width="100%">}}

### Azure

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_azure.png" alt="Diagrama con gráficos que muestra la relación entre los recursos utilizados para determinar la accesibilidad pública para Azure" width="100%">}}

### Google Cloud

{{< img src="security/cloud_security_management/guide/public_accessibility_relationships_gcp.png" alt="Diagrama con gráficos que muestra la relación entre los recursos utilizados para determinar la accesibilidad pública para Google Cloud" width="100%">}}

## Lógica de accesibilidad pública por recurso de AWS

### Bucket de Amazon S3

Un [bucket de S3][1] (`aws_s3_bucket`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|La política sobre buckets habilita el permiso `s3:GetObject` incondicionalmente, con el recurso y el elemento principal configurados en `"*"`. |Esto define una política pública en el bucket, lo que significa que se permite el acceso no autenticado. `"*"` es un comodín, lo que significa que se proporciona acceso a cualquier recurso y elemento principal. |
| Ninguna `public_access_block_configuration` del bucket, ni el bloque de acceso público de la cuenta AWS (`aws_s3_account_public_access_block`) tienen `restrict_public_buckets` configurado como `true`. | Ninguno de los buckets o cuentas bloquean explícitamente el acceso público, lo que significa que la política del bucket público se vuelve efectiva. |

Para obtener más información, consulta [Bloqueo del acceso público a tu almacenamiento de Amazon S3][2].

### Pista de AWS CloudTrail

Una [pista de CloudTrail][3] (`aws_cloudtrail_trail`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|El `s3_bucket_name` de la pista está configurado en un bucket de S3 que se considera accesible para el público. |Las pistas de CloudTrail son archivos de logs que se envían a buckets de S3. Si la pista se almacena en un bucket de S3 público, entonces es accesible públicamente. |

### Subred de Amazon VPC

Una [subred][4] (`aws_subnet`) se considera pública si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Está conectada a una o más [tablas de rutas][5] que están conectadas a una [pasarela de Internet][6] y que dirigen a un bloque CIDR de destino de `"0.0.0.0/0"` o a un bloque CIDR IPv6 de `"::/0"`.| La tabla de rutas adjunta a esta subred dirige el tráfico de egreso a través de una pasarela de Internet, lo que significa que los recursos de la subred pueden acceder a la Internet pública.|
|Está conectada a una o más [ACL de red][7] que tienen al menos un ingreso y un egreso, que tienen un bloque CIDR de `"0.0.0.0/0"` o un bloque CIDR IPv6 de `"::/0"`.| Las ACL de red controlan el tráfico que puede salir o ingresar en la subred a nivel de subred. Cuando una regla ACL de red permite el tráfico de ingreso desde Internet y permite el tráfico de salida hacia puertos efímeros, permite que los recursos de la subred estén expuestos a Internet si tienen asignada una IP pública y su grupo de seguridad lo permite.|

Para ver la definición de una subred pública en AWS, consulta [Subredes para tu VPC][8].

### Clúster de Amazon Redshift

Un [clúster de Redshift][9] (`aws_redshift_cluster`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Si tiene `publicly_accessible` configurado como `true` en su configuración.|Consulta la [gestión de clústeres en una VPC][10]. |
|Está en una [VPC][11] pública. |Una VPC pública es una VPC con al menos una subred pública, conectada a una o más ACL de red que tienen al menos un ingreso y un egreso, que tienen un bloque CIDR de `"0.0.0.0/0"` o un bloque CIDR IPv6 de `"::/0"`.|
|Está asociado a un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico que entra a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |
|Está conectado a una o más [tablas de rutas][5] que están conectadas a una [pasarela de Internet][6] y que dirigen a un bloque CIDR de destino de `"0.0.0.0/0"` o a un bloque CIDR IPv6 de `"::/0"`.| La tabla de rutas adjunta a esta subred dirige el tráfico de egreso a través de una pasarela de Internet, lo que significa que los recursos de la subred pueden acceder a la Internet pública.|

Para obtener más información sobre clústeres de Redshift y accesibilidad pública, consulta [Hacer accesible públicamente un clúster privado de Amazon Redshift][13].

### Instancia de base de datos RDS de Amazon

Una [instancia de base de datos RDS][14] (`aws_rds_instance`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene `publicly_accessible` configurado como `true` en la configuración de su conectividad.|Esta configuración hace que la base de datos sea accesible públicamente, lo que significa que su endpoint DNS se resolverá en la dirección IP privada dentro de su VPC y en una dirección IP pública desde fuera de la VPC. Sin embargo, el acceso al clúster seguirá siendo controlado por un grupo de seguridad relacionado. |
|Está en una [subred][4] pública.|-|
|Está asociada a un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico que entra a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |

Para obtener más información sobre el acceso público a una instancia de base de datos RDS, consulta [Solucionar la conectividad a una instancia de base de datos RDS que utiliza una subred de VPC][15].

### Snapshot de base de datos RDS de Amazon

Una [snapshot de base de datos RDS][16] (`aws_rds_db_snapshot`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene un atributo definido como `"restore"` con un valor de atributo definido como `"all"`.|Si defines la visibilidad de los snapshots de bases de datos como Pública, todas las cuentas de AWS pueden restaurar una instancia de base de datos desde tu snapshot de bases de datos y obtener acceso a tus datos.|

Para obtener más información, consulta [Compartir un snapshot de base de datos][17].

### Balanceador de carga elástico de Amazon

Un balanceador de carga elástico (`aws_elbv2_load_balancer`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|El [esquema][21] se define en `internet-facing`.|El esquema determina si el balanceador de carga es un balanceador de carga interno o un balanceador de carga orientado a Internet.|
|Está asociado a un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico que entra a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |

Para obtener más información sobre los balanceadores de carga orientados a Internet, consulta [Crear un balanceador de carga de aplicaciones][20].

### Instancia de Amazon EC2

Una [Instancia de EC2][18] (`aws_ec2_instance`) se considera públicamente accesible si:

* _"Subred pública"-acceso determinado:_

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene una o más [direcciones IP públicas][18].|Una dirección IP pública permite acceder a tu instancia desde Internet.|
|Está en una [subred][4] pública.|-|
|Está asociada a un [grupo de seguridad][12] que tiene reglas que permiten el acceso desde un rango CIDR de `"0.0.0.0/0"` o un rango CIDR IPv6 de `"::/0"`. |Un grupo de seguridad controla el tráfico que entra a una VPC. Con un rango CIDR abierto, todas las direcciones IP pueden obtener acceso. |

***O***

* Acceso determinado por el ELB a través del grupo de escalado automático:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Un grupo de seguridad (por ejemplo, `SG1`) adjunto al balanceador de carga es de acceso público y permite el tráfico de entrada a algún puerto `X`.|Esto abre el balanceador de carga al tráfico entrante de Internet en un puerto específico.|
|El balanceador de carga tiene un escuchador que acepta tráfico en el puerto `X`|Un [escuchador][37] es un proceso que comprueba las solicitudes de conexión, utilizando el protocolo y el puerto que configuras.|
|El balanceador de carga tiene un grupo de destino que reenvía tráfico a algún puerto `Y`.|Los [grupos de destino][38] dirigen las solicitudes a uno o más destinos registrados, como instancias de EC2, en un protocolo y puerto que especifiques. |
|Se adjunta un grupo de escalado automático al grupo de destino del balanceador de carga.|-|
|La instancia EC2 es parte del grupo de escalado automático y tiene un grupo de seguridad que tiene al menos una regla que permite el tráfico entrante desde el puerto `Y`, ya sea desde `0.0.0.0/0`, desde el CIDR de la VPC (por ejemplo, `10.0.0.0/8`), o desde el grupo de seguridad del balanceador de carga (`SG1`).|Esto abre la instancia EC2 al tráfico procedente del balanceador de carga. El grupo de seguridad debe permitir el tráfico procedente del balanceador de carga y, por tanto, debe estar abierto a todas las direcciones IP, a todas las direcciones IP de la VPC o a ese grupo de seguridad específico.|

***O***

* Acceso determinado por el ELB únicamente a través del grupo de destino:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Se aplican los criterios 1, 2 y 3 anteriores (acceso determinado por el ELB a través del grupo de escalado automático). |-|
|La instancia EC2 aparece como destino del grupo de destino y tiene un grupo de seguridad que tiene al menos una regla que permite el tráfico de entrada desde el puerto `Y`, ya sea desde `0.0.0.0/0`, desde el CIDR de la VPC (por ejemplo, `10.0.0.0/8`), o desde el grupo de seguridad del balanceador de carga (`SG1`).|Dado que la instancia figura como destino del grupo de destino, el balanceador de carga puede reenviarle tráfico a través del puerto `Y`. El grupo de seguridad permite el tráfico desde el balanceador de carga.|

Para obtener más información sobre las instancias EC2 y el acceso público, consulta [Autorizar el tráfico de entrada para tus instancias Linux][19]. Para ver un ejemplo de instancias EC2 expuestas a través de un balanceador de carga, consulta [Ejemplo: VPC con servidores en subredes privadas y NAT][36].

### Dominio Elasticsearch de Amazon

Un [dominio Elasticsearch][22] (`aws_elasticsearch_domain`) se considera de acceso público si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Tiene un endpoint que coincide con el patrón de expresiones regulares (regex)`^search-.*\.es\.amazonaws\.com$`.|Esta es la forma adoptada por los [endpoints][23] para los dominios de acceso público.|

Para obtener más información sobre cómo hacer que tu dominio de Elasticsearch deje de ser de acceso público, consulta [Iniciar tus dominios de Amazon OpenSearch Service dentro de una VPC][24].

### Imágenes de máquina de Amazon (AMI)

Una [imagen de máquina][25] (`aws_ami`) se considera de acceso público si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|Es propiedad del cliente, lo que significa que no tiene un propietario con alias (ya sea `amazon` o `aws-marketplace` en el campo de la cuenta).|Las AMI públicas que son propiedad de proveedores verificados (ya sea Amazon o socios verificados) tienen un propietario con alias que aparece como `amazon` o `aws-marketplace` en el campo de la cuenta. Consulta [Buscar una AMI compartida][26] en los documentos de AWS.|
|Su imagen está configurada como `public`, lo que significa que los permisos de lanzamiento de la imagen son públicos.|Modificando la propiedad `launchPermission` de una AMI, puedes hacer que la AMI sea pública (lo que concede permisos de lanzamiento a todas las cuentas AWS ) o compartirla sólo con las cuentas AWS que especifiques.|

En [Hacer pública una AMI][27] se explica cómo hacer pública o privada una AMI.

### Snapshots de Amazon EBS

Un [snapshot EBS][28] (`aws_ebs_snapshot`) se considera de acceso público si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|`create_volume_permission` se define en `all`.|Cada snapshot contiene toda la información necesaria para restaurar los datos del snapshot en un nuevo volumen EBS. Si alguien puede crear un volumen a partir de un snapshot, esa información es de acceso público.|

Para obtener información sobre los snapshots EBS públicos y cómo hacerlos privados, consulta [Compartir un snapshot EBS de Amazon][29].

### Clústeres de Amazon EKS

Un [clúster de EKS][30] (`aws_eks_cluster`) se considera de acceso público si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|`endpoint_public_access` se define como `true` en la configuración del clúster.|Esta configuración hace que el clúster sea de acceso público cuando se combina con un CIDR público abierto. |
|El `public_access_cidrs` del clúster contiene un bloque CIDR abierto (`"0.0.0.0/0"`).|Puedes limitar los bloques CIDR que pueden acceder al endpoint público del clúster de EKS. Un bloque CIDR abierto significa que cualquiera puede acceder al endpoint a través de Internet.|

Para obtener más información sobre clústeres de EKS públicos, consulta el [control del acceso a endpoints de clústeres de Amazon EKS][31].

### Cola de Amazon SQS

Una [cola de SQS][32] (`aws_sqs_queue`) se considera de acceso público si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|La cola tiene una política que permite a cualquier elemento principal (definido en `"*"`) realizar acciones de forma incondicional (`statement_has_condition` definido en `false`).|Esta configuración hace que la cola sea accesible para cualquier persona o cualquier usuario autenticado de AWS.|

Para obtener más información sobre las colas públicas de SQS, consulta [Prácticas recomendadas de seguridad de Amazon SQS][33].

### Función AWS Lambda

Una [función Lambda][58] (`aws_lambda_function`) se considera de acceso público si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|La función tiene un política que permite cualquier elemento principal (`principal_policy` o `principal_aws`) definido en `"*"`. |Esta configuración hace que la cola sea accesible para cualquier persona o cualquier usuario autenticado de AWS.|

Para obtener más información sobre funciones Lambda públicas, consulta [Prácticas recomendadas para trabajar con funciones AWS Lambda][59].

## Lógica de accesibilidad pública de Azure por recurso

### Grupo de seguridad de red (NSG) de Azure

Un NSG de Azure (`azure_security_group`) concede acceso público si:

| Criterios | Explicación |
|----------|-------------|
|El grupo de seguridad tiene reglas con protocolos `tcp`, `udp` o `*`. | Estos son los valores de protocolo relevantes para determinar el acceso público a los recursos de Azure. |
|El grupo de seguridad tiene reglas `inbound` con acceso definido en `Allow`. | Estos valores indican que la regla permite el tráfico de entrada. |
|El grupo de seguridad tiene reglas con prefijos de direcciones de origen iguales a `*`, `0.0.0.0`, `/0`, `::/0`, `internet` o `any`. | Estos prefijos CIDR permiten el acceso a Internet. |
|Las reglas que coinciden con las propiedades anteriores se combinan con cualquier otra regla `Deny` de mayor prioridad para abrir al menos un puerto a Internet. | Para saber cómo Azure combina las reglas de los grupos de seguridad para calcular el acceso, consulta [Reglas de seguridad][39]. |

Para obtener más información sobre cómo los NSG de Azure permiten y deniegan el acceso a Internet para un recurso, consulta [Grupos de seguridad de red][40].

### Instancia de máquina virtual Azure

Una instancia de máquina virtual (`azure_virtual_machine_instance`) se considera públicamente accesible si:

* Está conectada a un grupo de seguridad de red que permite el acceso público:

| Criterios | Explicación |
|----------|-------------|
|La instancia de máquina virtual tiene una dirección IP pública adjunta a una de sus interfaces de red. | Se requiere una dirección IP pública para acceder a una instancia de máquina virtual a través de Internet. |
|La instancia de máquina virtual tiene un grupo de seguridad red que concede acceso público a una de sus interfaces de red. | Para obtener más información sobre cómo una red puede conceder acceso público, consulta [Grupo de seguridad de red (NSG) de Azure](#azure-network-security-group-nsg). |

***O***

* Tiene una dirección IP pública con SKU "Básico":

| Criterios | Explicación |
|----------|-------------|
|La instancia de máquina virtual tiene una dirección IP pública con SKU Básico adjunta a su interfaz de red. | Una dirección IP pública con SKU básico está abierta por defecto (consulta [Direcciones IP públicas][41]). |
|La instancia de máquina virtual no tiene grupos de seguridad de red adjuntos. | Si no hay grupos de seguridad de red adjuntos, entonces no hay reglas que bloqueen el acceso a través de la dirección IP pública abierta. |

Para obtener más información sobre las instancias de máquina virtual de Azure y el acceso público, consulta [Asociar una dirección IP pública a una máquina virtual][42].

### Contenedor de blobs de Azure Storage

Un contenedor de almacenamiento de blobs (`azure_storage_blob_container`) se considera públicamente accesible si:

| Criterios | Explicación |
|----------|-------------|
|La cuenta del contenedor de almacenamiento de blobs no tiene el atributo `allow_blob_public_access` o tiene el atributo definido en `true`. | Esto significa que la cuenta permite el acceso público al almacenamiento de blobs de Azure a través de Internet. Para obtener más información sobre la configuración del acceso de lectura anónimo con cuentas de almacenamiento de Azure, consulta [Configurar acceso de lectura anónimo para contenedores y blobs][45].|
|El atributo `public_access` del contenedor de almacenamiento de blobs se define en `blob` o `container`. | Esto significa que la cuenta permite el acceso público al almacenamiento de blobs de Azure a través de Internet. |
|El contenedor de almacenamiento de blobs forma parte de una cuenta de almacenamiento que no bloquea explícitamente el acceso público. | Cuando una cuenta de almacenamiento no bloquea explícitamente el acceso público, los contenedores de almacenamiento de blobs que contiene pueden hacerse públicos. |

Para obtener más información sobre la denegación del acceso público a blobs en cuentas de Azure Storage, consulta [Permitir o denegar el acceso público a blobs en cuentas de Azure Storage][46].

### Clúster de Azure Kubernetes Service (AKS)

Un [clúster de AKS][60] (`azure_aks_cluster`) se considera públicamente accesible si:

| **Criterios** | **Explicación** |
|--------------|-----------------|
|`enable_private_cluster` se define como `false` en la configuración del clúster.|Esta configuración hace que el clúster sea de acceso público cuando se combina con un CIDR público abierto. |
|El `authorized_ip_ranges` del clúster contiene un bloque CIDR abierto (`"0.0.0.0/0"`) o no está definido.|Un bloque CIDR abierto significa que cualquier persona puede acceder al endpoint a través de Internet.|

Para obtener más información sobre clústeres de AKS públicos, consulta las [prácticas recomendadas de AKS][61].

## Lógica de accesibilidad de Google Cloud Public por recurso

### Cortafuegos informático de Google Cloud

Un cortafuegos informático (`gcp_compute_firewall`) concede acceso público si:

| Criterios | Explicación |
|----------|-------------|
|El cortafuegos tiene una o más reglas cuyo protocolo es TCP o todos, y que tienen `0.0.0.0/0` o `::/0` en sus `source_ranges`. | Estos prefijos CIDR permiten el acceso desde Internet y son los valores de protocolo relevantes para determinar el acceso público. |
|La dirección del cortafuegos es `ingress`. | Esto significa que el cortafuegos es relevante para el acceso de entrada desde Internet. |

Para obtener más información sobre el uso de los cortafuegos informáticos, consulta [Permitir o denegar el acceso público a blobs en cuentas de Azure Storage][47].

### Instancia de cálculo de Google Cloud

Una instancia de cálculo (`gcp_compute_instance`) se considera de acceso público si:

| Criterios | Explicación |
|----------|-------------|
|La instancia de cálculo tiene una dirección IP pública, lo que significa que al menos una de sus interfaces de red tiene una dirección IP pública definida en sus configuraciones de acceso, | Para obtener más información sobre cómo añadir una dirección IP externa a una instancia de cálculo, consulte [Reservar una dirección IP externa estática][48]. |
|La instancia de cálculo tiene reglas de cortafuegos asociadas que se combinan para abrir un rango de puertos a Internet. Las reglas de cortafuegos se pueden asociar a la instancia por:<br><p><ul><li>No tener `target_tags` o `target_service_accounts`, lo que significa que la regla se aplica a toda la red.</li><li>Tener `target_service_accounts` asociadas a uno de los `service_accounts` de la instancia de cálculo.</li><li>Tener algunas `target_tags` que coinciden con las etiquetas de red de la instancia de cálculo.</li></ul></p>Las reglas deben permitir el acceso público (consulta [Cortafuegos de cálculo de Google Cloud](#google-cloud-compute-firewall)). | Para saber cómo se utilizan las reglas de cortafuegos de cálculo para restringir los rangos de puertos de una instancia de cálculo, consulta [Componentes de reglas de cortafuegos][49]. |

Obtén más información sobre cómo se utilizan las reglas del cortafuegos de cálculo para restringir los rangos de puertos de una instancia de cálculo [aquí][50].

### Conjunto de datos de Google Cloud BigQuery

Un conjunto de datos BigQuery (`gcp_bigquery_dataset`) se considera públicamente accesible si:

| Criterios | Explicación |
|----------|-------------|
|El conjunto de datos tiene una política IAM adjunta que tiene un valor `member` de `AllUsers` o `AllAuthenticatedUsers`. | Estos miembros permiten a cualquier persona acceder a la base de datos a través de Internet. Para obtener más información, consulta [Información general de IAM][51]. |
|El conjunto de datos tiene una política IAM adjunta que lo vincula a uno de los siguientes roles: `roles/viewer`, `roles/owner`, `roles/editor`, `roles/bigquery.admin`, `roles/bigquery.metadataviewer`, `roles/bigquery.dataowner`, `roles/bigquery.dataeditor`, `roles/bigquery.dataviewer` o `roles/bigquery.user`. | Estos roles permiten a la persona que accede al recurso realizar operaciones peligrosas en la base de datos. Para obtener más información, consulta la [referencia de roles][52]. |

Obtén más información sobre [conjuntos de datos BigQuery][53].

### Bucket de Google Cloud Storage

Un bucket de almacenamiento (`gcp_storage_bucket`) se considera públicamente accesible si:

| Criterios | Explicación |
|----------|-------------|
|El bucket tiene una política IAM adjunta que tiene un valor `member` de `AllUsers` o `AllAuthenticatedUsers`. | Estos miembros permiten a cualquier persona acceder a la base de datos a través de Internet. Para obtener más información, consulta [aquí][54]. |
|El bucket tiene `public_access_prevention` definido en `inherited` en su `iam_configuration`. | Este ajuste bloquea el acceso público si se define en `enforced`. Para obtener más información sobre la configuración de la prevención del acceso público, consulta [Prevención del acceso público][55]. |
|El bucket tiene una política IAM adjunta que lo vincula a uno de los siguientes roles: <ul><li><code>roles/backupdr.cloudstorageoperator</code></li><li><code>roles/bigquerymigration.worker</code></li><li><code>roles/cloudbuild.builds.builder</code></li><li><code>roles/clouddeploy.jobrunner</code></li><li><code>roles/cloudmigration.storageaccess</code></li><li><code>roles/cloudtestservice.testadmin</code></li><li><code>roles/cloudtestservice.testviewer</code></li><li><code>roles/composer.environmentandstorageobjectadmin</code></li><li><code>roles/composer.environmentandstorageobjectuser</code></li><li><code>roles/composer.environmentandstorageobjectviewer</code></li><li><code>roles/composer.worker</code></li><li><code>roles/config.agent</code></li><li><code>roles/container.nodeserviceaccount</code></li><li><code>roles/dataflow.admin</code></li><li><code>roles/dataflow.worker</code></li><li><code>roles/dataplex.storagedataowner</code></li><li><code>roles/dataplex.storagedatareader</code></li><li><code>roles/dataproc.hubagent</code></li><li><code>roles/dataproc.worker</code></li><li><code>roles/firebase.admin</code></li><li><code>roles/firebase.developadmin</code></li><li><code>roles/firebase.developviewer</code></li><li><code>roles/firebase.viewer</code></li><li><code>roles/firebaserules.system</code></li><li><code>roles/managedidentities.domaincontrolleroperator</code></li><li><code>roles/storage.admin</code></li><li><code>roles/storage.legacyobjectowner</code></li><li><code>roles/storage.legacyobjectreader</code></li><li><code>roles/storage.objectadmin</code></li><li><code>roles/storage.objectuser</code></li><li><code>roles/storage.objectviewer</code></li></ul>|Estos roles permiten a la persona que accede al recurso realizar operaciones peligrosas en el bucket. Para obtener más información, consulta la [referencia de roles][56].|

Obtén más información sobre cómo hacer públicos los buckets de almacenamiento [aquí][57].

## Referencias adicionales

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
[43]: https://learn.microsoft.com/en-us/rest/api/compute/disks/create-or-update?view=rest-compute-2023-04-02&tabs=HTTP
[44]: https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-private-links-for-import-export-portal
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