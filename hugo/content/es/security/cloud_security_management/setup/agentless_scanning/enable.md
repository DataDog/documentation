---
aliases:
- /es/security/cloud_security_management/setup/agentless_scanning/quick_start
- /es/security/cloud_security_management/setup/agentless_scanning/cloudformation
- /es/security/cloud_security_management/setup/agentless_scanning/terraform
- /es/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
- /es/security/cloud_security_management/guide/agentless_aws_integration
- /es/security/cloud_security_management/guide/agentless_terraform
further_reading:
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Cloud Security Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentación
  text: Resolución de problemas de Agentless Scanning
title: Activación de de Agentless Scanning
---

Agentless Scanning brinda visibilidad de las vulnerabilidades que existen en tu infraestructura en la nube, sin instalar el Datadog Agent. Agentless Scanning se ejecuta completamente dentro de tu infraestructura, enviando datos mínimos a Datadog, y dejando tus datos confidenciales en tu entorno. Dado que el escáner se ejecuta en tu cuenta en la nube, se aplican los [costes del proveedor de la nube][20] estándar. Para obtener más información, consulta la [Descripción general de Agentless Scanning][12].

La instalación tarda aproximadamente 30 minutos por cuenta en la nube:

1. Verifica los requisitos previos a continuación.
1. Elige tu proveedor de nube y el método de despliegue.
1. Inicia una plantilla en tu cuenta en la nube.
1. Verifica los resultados del escaneo en Datadog.

## Requisitos previos

Antes de configurar Agentless Scanning, comprueba que se cumplen los siguientes requisitos previos:

- **Remote Configuration**: [Remote Configuration][3] debe estar habilitado en tu organización de Datadog para enviar instrucciones de escaneo a los escáneres sin agent.
- **[Claves de API y de aplicación][1]**:
  - Se necesita una **clave de API** con Remote Configuration activado para que los escáneres informen de los resultados del escaneo a Datadog.
  - Se necesita una **clave de aplicación** con permisos de **Gestión de integraciones** o **Gestión de organizaciones** para activar las funciones de escaneo a través de la API de Datadog.
- **Permisos en la nube**: la instancia de Agentless Scanning requiere permisos específicos para escanear hosts, imágenes de host, registros de contenedores y funciones. Datadog aplica automáticamente estos permisos, enumerados a continuación para mayor transparencia, durante la instalación.<br><br>
  {{< collapse-content title="Permisos de escaneo de AWS" level="h5" >}}
  <p>Permisos de escaneo:</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Decrypt</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>Solo cuando está activado Sensitive Data Scanning (DSPM):</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de escaneo de Azure" level="h5" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de escaneo de GCP" level="h5" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>compute.images.get</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## Instalación

Consulta [Despliegue de Agentless Scanning][2] para obtener información sobre cómo estructurar tu despliegue, incluido el número de cuentas y regiones en las que se despliegan los escáneres.

Selecciona tu proveedor de nube para ver los métodos de configuración disponibles. Si estás configurando Agentless Scanning en varios proveedores de nube, completa la configuración para cada proveedor de forma independiente.

{{< tabs >}}
{{% tab "AWS" %}}

### Elige tu configuración

- **Nuevo en Datadog**: en la página [Intro to Cloud Security][2], haz clic en **Get Started with Cloud Security** (Introducción a Cloud Security) y, a continuación, en **Quick Start** (Inicio rápido). El inicio rápido es un flujo de configuración guiado que utiliza AWS CloudFormation para desplegar Agentless Scanning con todas las funciones de Cloud Security prehabilitadas. Solo está disponible para organizaciones que aún no hayan configurado Cloud Security Management.
- **Una sola cuenta de AWS en Datadog**: utiliza [CloudFormation](#aws-cloudformation-setup) o [Terraform](#aws-terraform-setup). Terraform se recomienda para despliegues multiregión.
- **Organización de AWS con múltiples cuentas**: utiliza [CloudFormation StackSet](#aws-cloudformation-stackset-setup) para desplegar capacidades de análisis en todas las cuentas miembro.
- **Múltiples cuentas sin AWS Organizations**: repite la configuración de [CloudFormation](#aws-cloudformation-setup) o [Terraform](#aws-terraform-setup) para cada cuenta individualmente.

{{% collapse-content title="CloudFormation" level="h3" id="aws-cloudformation-setup" %}}
Utiliza CloudFormation si ya tienes una cuenta de AWS integrada con Datadog y deseas activar Agentless Scanning, o si deseas añadir una nueva cuenta de AWS.

#### Nueva cuenta de AWS 

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. En la parte inferior de la sección de AWS, haz clic en **Add AWS accounts by following these steps** (Añadir cuentas de AWS siguiendo estos pasos). Aparecerá la pantalla **Add New AWS Account(s)** (Añadir nuevas cuentas de AWS).
1. Selecciona la región de AWS en la que deseas crear el stack tecnológico de CloudFormation.
1. Selecciona una clave de API que tenga activado [Remote Configuration][3].
1. Elige si deseas activar **Sensitive Data Scanner** para el almacenamiento en la nube. Esto cataloga y clasifica automáticamente los datos confidenciales en los recursos de Amazon S3.
1. Haz clic en **Launch CloudFormation Template** (Lanzar plantilla de CloudFormation). Se abrirá una nueva ventana con la pantalla de AWS CloudFormation. Utiliza la plantilla de CloudFormation proporcionada para crear un stack tecnológico. La plantilla incluye los permisos de IAM necesarios para desplegar y gestionar analizadores sin agente.

#### Cuenta existente de AWS

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. Haz clic en la cuenta de AWS en la que deseas desplegar el escáner sin agent, lo que abre el panel lateral.
1. En la pestaña **Features** (Características), haz clic en **Configure Agentless Scanning** (Configurar Agentless Scanning) o en **Manage** (Gestionar) para abrir el cuadro de configuración de Agentless Scanning.
1. En la sección **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), selecciona **CloudFormation**.
1. Selecciona una clave de API que tenga activado [Remote Configuration][3].
1. Activa las funciones que desees, como **Vulnerability Management** o **Sensitive Data Scanner**.
1. Haz clic en **Launch CloudFormation Template** (Lanzar plantilla de CloudFormation). Se abrirá una nueva ventana con la pantalla de AWS CloudFormation. Utiliza la plantilla de CloudFormation proporcionada para crear un stack tecnológico.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /es/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (Multicuenta)" level="h3" id="aws-cloudformation-stackset-setup" %}}

Para las organizaciones de AWS con varias cuentas, utiliza CloudFormation StackSet para desplegar la función de delegado de Agentless Scanning en todas las cuentas miembro. Este enfoque automatiza la incorporación y configura las nuevas cuentas añadidas a tu organización de AWS.

Esta configuración despliega el rol delegado requerido para [escaneo entre cuentas](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) a través de tu organización de AWS o unidades organizativas (OUs) específicas. Primero, configura Agentless Scanning en tu cuenta de escaneo central usando [CloudFormation](#aws-cloudformation-setup) o [Terraform](#aws-terraform-setup), luego despliega el StackSet para configurar las cuentas restantes.

#### Requisitos previos

1. Accede a la cuenta de gestión AWS.
1. [El acceso de confianza con AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) debe estar habilitado para CloudFormation StackSets.
1. Agentless Scanning ya está configurado en tu cuenta de escaneo central (véase más arriba).

#### Despliegue del StackSet

1. Inicia sesión en tu cuenta de gestión AWS y ve a **CloudFormation > StackSets**.
1. Haz clic en **Create StackSet** (Crear StackSet).
1. Selecciona **Service-managed permissions** (Permisos gestionados por el servicio).
1. En **Specify template** (Especificar plantilla), selecciona **Amazon S3 URL** (URL de Amazon S3) e introduce la siguiente URL:
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. Introduce un **nombre de StackSet** (por ejemplo, `DatadogAgentlessScanningStackSet`).
1. Configura el parámetro **ScannerInstanceRoleARN**, que es el ARN del rol de IAM adjunto a tus instancias del escáner sin agent.
      <div class="alert alert-danger">El <code>ScannerInstanceRoleARN</code> debe ser el ARN exacto del rol de instancia del escáner (por ejemplo, <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). El uso de un ARN raíz como arn <code>:aws:iam::123456789012:root</code> no funciona.</div>
      <p>El <code>ScannerInstanceRoleARN</code> establece una relación de confianza entre el rol delegado (creado en las cuentas de destino) y tus instancias de escáner (que ya se ejecutan en la cuenta central). Esto permite el escaneo entre cuentas cuando:</p>
      <ul>
        <li>The scanner runs in Account 4.</li>
        <li>The delegate role exists in Accounts 1, 2, 3 (deployed through the StackSet).</li>
        <li>The scanner assumes the delegate roles to scan resources in those accounts.</li>
      </ul>
1. Establece **Deployment targets** (Objetivos de despliegue) para desplegar en tu organización de AWS o en unidades de organización específicas.
1. Activa **Automatic deployment** (Despliegue automático) para configurar las nuevas cuentas añadidas a tu organización de AWS.
1. Selecciona una **región única** para el despliegue (el rol IAM es global y solo necesita desplegarse una vez por cuenta).
1. Revisa y envía el StackSet.

Una vez desplegado el StackSet, las cuentas miembro se configuran para permitir el escaneo entre cuentas desde tu cuenta de escáner central.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="aws-terraform-setup" %}}

El [módulo de Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) proporciona una configuración reutilizable para instalar el escáner sin agent de Datadog. Terraform es el método de despliegue recomendado para entornos multiregión. Despliega un escáner por región, lo que evita costes de red entre regiones. Para más información sobre cómo elegir la topología de despliegue, consulta [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Para ver ejemplos de uso, incluidas configuraciones multirregión, consulta el [directorio de ejemplos](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) en el repositorio de GitHub.

#### Nueva cuenta de AWS

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. En la parte inferior de la sección de AWS, haz clic en **Add AWS accounts by following these steps** (Añadir cuentas de AWS siguiendo estos pasos). Aparecerá la pantalla **Add New AWS Account(s)** (Añadir nuevas cuentas de AWS).
1. En **Choose a method for adding your AWS account** (Elige un método para añadir tu cuenta de AWS), selecciona **Manually** (Manualmente).
1. Sigue las instrucciones para instalar el [módulo del analizador sin agente de Datadog][2].
1. Selecciona la casilla **I confirm that the Datadog IAM Role has been added to the AWS Account** (Confirmo que la función de IAM de Datadog se ha añadido a la cuenta de AWS).
1. Introduce el **AWS Account ID** (ID de cuenta de AWS) y el **AWS Role Name** (Nombre del rol de AWS).
1. Haz clic en **Save** (Guardar).

#### Cuenta existente de AWS

1. En la página [Cloud Security Setup][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. Haz clic en la cuenta de AWS en la que deseas desplegar el escáner sin agent para abrir el panel lateral.
1. En la pestaña **Features** (Características), haz clic en **Configure Agentless Scanning** (Configurar Agentless Scanning) o en **Manage** (Gestionar) para abrir el cuadro de configuración de Agentless Scanning.
1. En la sección **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), selecciona **Terraform**.
1. Sigue las instrucciones para instalar el [módulo del analizador sin agente de Datadog][2].
1. Selecciona la casilla **I confirm the Terraform module is installed** (Confirmo que el módulo de Terraform está instalado).
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

Después de completar cualquiera de los métodos de configuración anteriores, [verifica tu configuración](#verify-your-setup).

[2]: https://app.datadoghq.com/security/csm/
[3]: /es/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### Elige tu configuración
- **Nueva suscripción a Azure**: utiliza [Azure Resource Manager](#azure-resource-manager-setup) (recomendado) o [Terraform](#azure-terraform-setup).
- **Suscripción a Azure existente**: utiliza [Azure Resource Manager](#azure-resource-manager-setup) o [Terraform](#azure-terraform-setup).
- **Múltiples suscripciones**: utiliza [Terraform](#azure-terraform-setup) para despliegues repetibles de múltiples suscripciones.

{{% collapse-content title="Azure Resource Manager" level="h3" id="azure-resource-manager-setup" %}}
Utiliza la plantilla de Azure Resource Manager para desplegar el escáner sin agent. La plantilla incluye las definiciones de rol necesarias para desplegar y gestionar escáneres sin agent.

#### Nueva suscripción a Azure

<div class="alert alert-info">Asegúrate de tener configurada la <a href="/integrations/guide/azure-manual-setup/?tab=azurecli">integración con Azure en Datadog </a>.</div>

{{% csm-agentless-azure-resource-manager %}}

#### Suscripción existente a Azure

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="azure-terraform-setup" %}}

El [módulo de Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) proporciona una configuración reutilizable para instalar el escáner sin agent de Datadog. Para obtener orientación sobre la elección de tu topología de despliegue, consulta [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Para ejemplos de uso, consulta el [directorio de ejemplos](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) en el repositorio de GitHub.

1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haz clic en **Cloud Integrations** > **Azure** (Integraciones en la nube > Azure).
1. Expande el inquilino que contiene la suscripción en la que deseas desplegar el analizador sin agente.
1. Haz clic en el botón **Enable** (Habilitar) de la suscripción de Azure en la que deseas desplegar el Agentless Scanner.
1. Activa **Vulnerability Scanning** (Escaneo de vulnerabilidades).
1. En la sección **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), selecciona **Terraform**.
1. Sigue las instrucciones para instalar el [módulo del Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Haz clic en **Done** (Listo).

{{% /collapse-content %}}

Después de completar cualquiera de los métodos de configuración anteriores, [verifica tu configuración](#verify-your-setup).

{{% /tab %}}

{{% tab "GCP" %}}

### Elige tu configuración

- **Nuevo cliente de GCP**: [configura primero la integración con GCP][25] y, a continuación, activa Agentless Scanning.
- **Proyecto de GCP integrado existente**: utiliza [Cloud Shell](#gcp-cloud-shell-setup) (recomendado) o [Terraform](#gcp-terraform-setup).

<div class="alert alert-info">Si aún no has conectado tu proyecto de GCP a Datadog, configura primero <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">la integración con GCP</a>.</div>

{{% collapse-content title="Cloud Shell" level="h3" id="gcp-cloud-shell-setup" %}}
Utiliza Google Cloud Shell para configurar Agentless Scanning para tus proyectos de GCP. Este método descarga un [script de configuración](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) que envuelve el [módulo de Terraform Datadog Agentless Scanner para GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme), por lo que no es necesario gestionar Terraform directamente. Puedes revisar el script antes de ejecutarlo.

**Permisos de GCP requeridos:** la identidad que utilices en Cloud Shell debe tener **Owner** (Propietario) o equivalente en el proyecto del escáner. El script crea un bucket de GCS para el estado de Terraform, por lo que también debes tener permisos **Storage** (Almacenamiento) en ese proyecto (por ejemplo, `roles/storage.admin` o `storage.buckets.create`/`storage.buckets.get`/`storage.buckets.update`). Alternativamente, puedes **reutilizar un bucket existente** para el estado de Terraform estableciendo la variable de entorno `TF_STATE_BUCKET` a un nombre de bucket existente; el script no creará un bucket en ese caso. Si aparece un error 403 en "Setting up Terraform state storage", consulta [GCP: Failed to create state bucket][26] en la guía de solución de problemas.

1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haz clic en **Cloud Integrations** > **GCP** (Integraciones en la nube > GCP).
1. Expande la cuenta que contiene el proyecto en el que deseas desplegar el analizador sin agente.
1. Haz clic en el botón **Enable** (Habilitar) para el proyecto de GCP en el que deseas desplegar el escáner sin agent. Se abrirá el modal **Vulnerability Scanning**.
1. En la sección **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), selecciona **Cloud Shell**.
1. Selecciona una **clave de API** que tenga activado [Remote Configuration](/remote_configuration). Se genera automáticamente una clave de aplicación.
1. Selecciona los **proyectos GCP** que deseas escanear.
1. Configura el escáner:
   - Si ya tienes escáneres desplegados, puedes elegir entre **utilizar un escáner existente** (recomendado) o **desplegar un nuevo escáner**.
   - Si vas a desplegar un nuevo escáner, selecciona el proyecto de escáner (que debe ser uno de los proyectos seleccionados). Recomendamos instalar escáneres en cada región en la que tengas más de 150 hosts
1. Haz clic en **Copy command** (Copiar comando) para copiar el comando generado y haz clic en **Open Google Cloud Shell** (Abrir Google Cloud Shell) para abrir [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Revisa y ejecuta el comando. El script aplica el [módulo de Terraform Datadog Agentless Scanner para GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) para desplegar y configurar el escáner en tu proyecto y región(es) seleccionadas.
1. Una vez completado el comando, vuelve a la página de configuración de Datadog y haz clic en **Done** (Hecho).
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="gcp-terraform-setup" %}}
El [módulo de Terraform Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) proporciona una configuración reutilizable para instalar el escáner sin agent de Datadog. Para obtener orientación sobre la elección de tu topología de despliegue, consulta [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). Para ejemplos de uso, consulta el [directorio de ejemplos](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) en el repositorio de GitHub.

1. En la página [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup), haz clic en **Cloud Integrations** > **GCP** (Integraciones en la nube > GCP).
1. Expande la cuenta que contiene el proyecto en el que deseas desplegar el analizador sin agente.
1. Haz clic en el botón **Enable** (Habilitar) para el proyecto de GCP en el que deseas desplegar el analizador sin agente.
1. Activa **Vulnerability Scanning** (Escaneo de vulnerabilidades).
1. Sigue las instrucciones para instalar el [módulo del Datadog Agentless Scanner](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Haz clic en **Done** (Listo).
{{% /collapse-content %}}

Después de completar cualquiera de los métodos de configuración anteriores, [verifica tu configuración](#verify-your-setup).

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp
[26]: /es/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403

{{% /tab %}}
{{< /tabs >}}

## Verifica tu configuración

Una vez completada la configuración, Agentless Scanning tarda un tiempo en producir los resultados iniciales. El primer ciclo de escaneado tarda aproximadamente 30 minutos en completarse.

<div class="alert alert-info">Si no aparecen resultados después de dos horas, consulte la <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">guía de solución de problemas de Agentless Scanning</a>.</div>

Visualiza los resultados del escaneo en las siguientes ubicaciones:

- **Para vulnerabilidades de hosts y contenedores**: [Cloud Security Vulnerabilities Explorer][15]. Para ver solo las vulnerabilidades detectadas por Agentless Scanning, utiliza el filtro `origin:"Agentless scanner"` en la barra de búsqueda.
- **Para vulnerabilidades de Lambda**: [Code Security (SCA) Explorer][16].
- **Para hallazgos de datos confidenciales**: [Sensitive Data Scanner][17]

## Excluir recursos de los análisis

Para excluir hosts, contenedores o funciones específicos de los escaneos, consulta [Filtros de evaluación de recursos](/security/cloud_security_management/guide/resource_evaluation_filters).

## Desactivar el análisis Agentless

{{< tabs >}}
{{% tab "AWS" %}}
1. En la página [Cloud Security Setup][10] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
1. Si es necesario, utiliza filtros para encontrar la cuenta para la que deseas detener Agentless Scanning. Haz clic en la cuenta para abrir el panel lateral que contiene su configuración.
1. En la pestaña **Features** (Características), haz clic en **Configure Agentless Scanning** (Configurar Agentless Scanning) o en **Manage** (Gestionar) para abrir el cuadro de configuración de Agentless Scanning.
1. En **How would you like to set up Agentless Scanning?** (¿Cómo deseas configurar Agentless Scanning?), haz clic en **Terraform**.
1. En **Enable Features** (Activar funciones), junto a **Enable Agentless Vulnerability management** (Activar gestión de Agentless Vulnerability), cambia el conmutador a la posición de desactivado.
1. Haz clic en **Done** (Listo).

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. En la página [Cloud Security Setup][10] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **Azure** (Integraciones en la nube > Azure).
1. Localiza el inquilino de tu suscripción, expande la lista de suscripciones e identifica la suscripción en la que quieres desactivar el análisis Agentless.
1. Junto a la etiqueta **Enabled** (Habilitado), haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}}) para abrir el modal de Vulnerability Scanning.
1. Junto a **Vulnerability Scanning**, coloca el conmutador en la posición de desactivado.
1. Haz clic en **Done** (Listo).

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. En la página [Cloud Security Setup][10] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **GCP** (Integraciones en la nube > GCP).
1. Expande la cuenta que contiene el proyecto en el que deseas desactivar Agentless Scanning.
1. Junto a la etiqueta **Enabled** (Habilitado), haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}}) para abrir el modal de Vulnerability Scanning.
1. Junto a **Vulnerability Scanning**, coloca el conmutador en la posición de desactivado.
1. Haz clic en **Done** (Listo).

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Desinstalar Agentless Scanning

Selecciona el método de despliegue que utilizaste para instalar Agentless Scanning:

{{< tabs >}}
{{% tab "Terraform" %}}
Para desinstalar Agentless Scanning, elimina el módulo del analizador de tu código de Terraform. Para obtener más información, consulta la documentación del [módulo de Terraform][9].

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Para desinstalar Agentless Scanning, inicia sesión en tu consola de AWS y elimina el stack tecnológico de CloudFormation creado para Agentless Scanning (el nombre del substack tecnológico sigue el patrón `DatadogIntegration-DatadogAgentlessScanning-...`).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Para desinstalar Agentless Scanning que se configuró mediante Google Cloud Shell, ejecuta el mismo comando de configuración que utilizaste durante la instalación, sustituyendo `deploy` por `destroy` al final. Por ejemplo:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

Puedes revisar la [fuente de script de configuración][21] antes de ejecutar el comando.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Para desinstalar Agentless Scanning, inicia sesión en tu suscripción de Azure. Si creaste un grupo de recursos dedicado para el escáner sin agent, elimina este grupo de recursos junto con las siguientes definiciones de funciones de Azure:
  - Rol del analizador sin agente de Datadog
  - Rol delegado del analizador sin agente de Datadog

Si no has utilizado un grupo de recursos dedicado, deberás eliminar manualmente los recursos del analizador, que pueden identificarse con las etiquetas (tags) `Datadog:true` y `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/
[2]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /es/remote_configuration
[12]: /es/security/cloud_security_management/agentless_scanning
[20]: /es/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage