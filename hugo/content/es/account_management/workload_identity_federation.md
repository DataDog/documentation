---
algolia:
  tags:
  - workload identity federation
  - cloud authentication
  - aws authentication
  - terraform provider
  - agent authentication
  - delegated auth
aliases:
- /es/account_management/cloud_authentication/
- /es/account_management/cloud_provider_authentication/
description: Autentique el proveedor de Datadog para Terraform y el Datadog Agent
  con Workload Identity Federation, utilizando credenciales de nube en lugar de claves
  de API estáticas con autenticación de AWS STS y mapeo de identidad.
further_reading:
- link: /getting_started/integrations/terraform/
  tag: Documentación
  text: Administrar Datadog con Terraform
- link: /agent/configuration/
  tag: Documentación
  text: Configuración del Agent
- link: /account_management/api-app-keys/
  tag: Documentación
  text: Claves de API y de aplicación
- link: /integrations/amazon_web_services/
  tag: Documentación
  text: Integración de AWS
title: Federación de identidad de carga de trabajo
---
## Descripción general {#overview}

Workload Identity Federation le permite autenticar el proveedor de Datadog para Terraform y el Datadog Agent utilizando credenciales de nube en lugar de claves de API y de aplicación estáticas.

AWS es el único proveedor de nube compatible.

Workload Identity Federation está disponible para lo siguiente:

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<ul>
<li><b>Proveedor de Terraform</b>: Autentique las operaciones de Terraform utilizando credenciales de AWS mapeadas a un usuario o cuenta de servicio de Datadog. Disponible para todos los clientes.</li>
<li><b>Datadog Agent</b>: Autentique el Datadog Agent utilizando credenciales de AWS para recibir claves de API gestionadas y rotadas automáticamente.</li>
</ul>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<ul>
<li><b>Proveedor de Terraform</b>: Autentique las operaciones de Terraform utilizando credenciales de AWS mapeadas a un usuario o cuenta de servicio de Datadog. Disponible para todos los clientes.</li>
</ul>
{{< /site-region >}}

## Cómo funciona: proceso de autenticación de AWS {#how-it-works-aws-authentication-process}

El proceso de autenticación utiliza [AWS Security Token Service (STS)][1] para verificar su identidad.

### Flujo de autenticación del proveedor de Terraform {#terraform-provider-authentication-flow}

1. **Generación de prueba:** El proveedor de Datadog para Terraform crea una solicitud de AWS STS firmada `GetCallerIdentity` utilizando sus credenciales de AWS actuales
2. **Validación de prueba:** Datadog valida la prueba llamando a AWS STS, el cual devuelve su ARN de AWS, ID de usuario e ID de cuenta
3. **Mapeo de identidad:** Su identidad de AWS se mapea a una cuenta de servicio o cuenta de usuario de Datadog según la configuración de su organización
4. **Emisión de token:** Si la validación es exitosa, Datadog emite un token JWT temporal para el acceso a la API
5. **Autenticación de API:** El token se utiliza para llamadas posteriores a Datadog API

<div class="alert alert-info">Si es posible, mapee los ARN a una cuenta de servicio de Datadog en lugar de a una cuenta de usuario. El uso de una cuenta de servicio evita asociar su proceso de autenticación con una persona específica.</div>

### Flujo de autenticación del Datadog Agent {#agent-authentication-flow}

1. **Detección de credenciales:** El Datadog Agent recupera las credenciales de AWS del entorno en el que se ejecuta
2. **Generación de prueba:** El Datadog Agent crea una solicitud de AWS STS firmada para probar el acceso a las credenciales
3. **Validación de prueba:** Datadog valida la solicitud firmada con AWS y la verifica con la configuración de asignación de ingesta de su organización
4. **Emisión de clave de API:** Si la validación es exitosa, Datadog emite una clave de API gestionada que se rota automáticamente
5. **Configuración del Datadog Agent:** El Datadog Agent utiliza la clave de API emitida para todas las llamadas posteriores a Datadog API

<div class="alert alert-info">Si el flujo de autenticación delegada falla, el Datadog Agent recurre a la clave de API configurada en su <code>datadog.yaml</code> archivo. Este comportamiento de respaldo le permite iniciar la incorporación con un riesgo limitado para su configuración existente.</div>

## Configure la Federación de identidades de carga de trabajo para AWS {#set-up-workload-identity-federation-for-aws}

**Requisitos**:
- Versión 3.70 o posterior del proveedor de Terraform de Datadog.
- Ha configurado la [integración de Datadog-AWS][4] y ha añadido su cuenta de AWS. Consulte la [documentación de la integración de AWS][3].
- Su cuenta tiene los permisos `workload_identity_federation_config_read` y `workload_identity_federation_config_write`.

La configuración de la Federación de identidades de carga de trabajo para AWS consta de dos partes:
1. [Configuración de su asignación de identidad de AWS en Datadog](#configure-aws-identity-mapping-in-datadog)
2. [Actualización de la configuración de su proveedor de Terraform](#update-your-terraform-provider-configuration)

### Configure la asignación de identidad de AWS en Datadog {#configure-aws-identity-mapping-in-datadog}

<div class="alert alert-info">Para que la asignación de identidad funcione, su cuenta de AWS <strong>debe estar integrada</strong> con Datadog a través de la <a href="https://app.datadoghq.com/integrations/amazon-web-services">integración de Datadog-AWS</a>. Si una cuenta de AWS no está integrada, el flujo de autenticación no puede verificar al emisor y la asignación falla.</div>

Asigne sus identidades de AWS (ARN) a cuentas de servicio o cuentas de usuario de Datadog. Puede configurar las asignaciones de identidad desde la interfaz de usuario o mediante la API.

Si necesita crear roles de IAM en AWS, consulte la [documentación de creación de roles de IAM de AWS][5].

#### Uso de la UI {#using-the-ui}

Navegue a [**Configuración de la organización** > **Federación de identidad de carga de trabajo**][6] y haga clic en la pestaña **Asignaciones de identidad**. Cada asignación otorga a un rol en la nube los permisos de un usuario o cuenta de servicio de Datadog específico.

{{< img src="account_management/workload_identity_federation/identity-mappings-list.png" alt="Pestaña Asignaciones de identidad en la página Federación de identidad de carga de trabajo, que muestra el campo UUID de la organización y una lista de patrones ARN de AWS asignados a usuarios y cuentas de servicio de Datadog" style="width:100%;" >}}

<div class="alert alert-warning">Datadog requiere el <strong>ARN de rol asumido</strong> en el campo Patrón de origen, no el ARN de rol de IAM. Estos dos formatos son diferentes:</div>
<ul>
<li><strong>ARN de rol de IAM</strong> (que se muestra en la consola de AWS): <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>ARN de rol asumido</strong> (requerido por Datadog): <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
Para encontrar el ARN de rol asumido para su carga de trabajo, ejecute <code>aws sts get-caller-identity</code> desde su entorno de carga de trabajo y utilice el valor en el <code>Arn</code> campo de la respuesta.

Para crear una asignación de identidad:

1. Haga clic en {{< ui >}}\+ New Mapping{{< /ui >}}.
2. Seleccione un **Proveedor de nube**.
3. Ingrese un **Patrón de origen (ARN)**. Utilice el formato de ARN de rol asumido y `*` para patrones Wildcard (por ejemplo, `arn:aws:sts::123456789012:assumed-role/terraform-runner/*`).
4. Busque y seleccione una **Identidad de destino**. Esta es la cuenta de usuario o la cuenta de servicio de Datadog con la que se autentica esta identidad de la nube.
5. Haga clic en {{< ui >}}Create Mapping{{< /ui >}}.

{{< img src="account_management/workload_identity_federation/identity-mapping-create.png" alt="Cuadro de diálogo Crear asignación de identidad con campos para Proveedor de nube, ARN de patrón de origen y Identidad de destino, con un texto de ayuda que describe la compatibilidad con patrones de comodines" style="width:70%;" >}}

<div class="alert alert-info">Prefiera las cuentas de servicio sobre las cuentas de usuario para evitar vincular el acceso a individuos.</div>

#### Uso de la API {#using-the-api}

##### Asigne un ARN de AWS a una cuenta de usuario de Datadog {#map-an-aws-arn-to-a-datadog-user-account}
Para `account_identifier`, use el correo electrónico que se muestra en el perfil de Datadog del usuario.

**Ejemplo**: Una llamada a la API que asigna un ARN de AWS a una cuenta de usuario de Datadog, `john.doe@myorg.com`.

```bash
# Example: map an AWS ARN to a Datadog User
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "john.doe@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

##### Asigne un ARN de AWS a una cuenta de servicio de Datadog {#map-an-aws-arn-to-a-datadog-service-account}
Para `account_identifier`, puede usar cualquiera de los siguientes:
- El **UUID** de la cuenta de servicio: Vaya a {{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Service accounts{{< /ui >}}, haga clic en la cuenta de servicio que desea asignar y copie el `service_account_id` de la URL. Por ejemplo, si la URL termina en `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`, entonces use `3fa85f64-5717-4562-b3fc-2c963f66afa6`.
- La **dirección de correo electrónico** de la cuenta de servicio: Use la dirección de correo electrónico que se muestra en los detalles de la cuenta de servicio.

**Ejemplo**: Una llamada a la API que asigna un ARN de AWS a una cuenta de servicio de Datadog usando el UUID, `3fa85f64-5717-4562-b3fc-2c963f66afa6`.

```bash
# Example: map an AWS ARN to a Datadog Service Account using UUID
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

**Ejemplo**: Una llamada a la API que asigna un ARN de AWS a una cuenta de servicio de Datadog usando la dirección de correo electrónico, `terraform-service-account@myorg.com`

```bash
# Example: map an AWS ARN to a Datadog Service Account using email
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "terraform-service-account@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

##### Uso de comodines en patrones de ARN {#using-wildcards-in-arn-patterns}

Los patrones de ARN admiten la coincidencia con comodines para manejar partes dinámicas o variables de los ARN de recursos. Esto es útil cuando se trabaja con roles asumidos que incluyen identificadores de sesión u otros componentes variables.

**Reglas de wildcard**:
- Los comodines (`*`) solo se permiten en la última parte del ARN del recurso
- Debe especificar un recurso concreto antes del Wildcard
- Wildcards no pueden colocarse en medio del ARN

**Ejemplo**: coincidir con cualquier sesión asumiendo el `DatadogTerraformerRole`:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/*"
    }
  }
}'
```

Este patrón coincide con ARN de roles asumidos reales como:
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/run-abcdefghijk`
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/session-xyz789`

<div class="alert alert-info">La coincidencia con Wildcard es particularmente útil para CI/CD pipelines donde las sesiones de rol tienen identificadores generados dinámicamente.</div>

##### Listar asignaciones existentes {#list-existing-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Actualice la configuración de su proveedor de Terraform {#update-your-terraform-provider-configuration}

Después de configurar la asignación de identidad, actualice la configuración de su proveedor de Terraform de Datadog para usar Workload Identity Federation:

#### Elimine su configuración existente {#remove-your-existing-configuration}

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### Agregue la nueva configuración de Workload Identity Federation {#add-the-new-workload-identity-federation-configuration}

Para obtener su `org_uuid`, búsquelo directamente en la página [**Configuración de la organización** > **Workload Identity Federation**][6], o llame a este punto de conexión (requiere una sesión activa en la organización de destino): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

#### Opcional: especifique las credenciales de AWS explícitamente {#optional-specify-aws-credentials-explicitly}
Como alternativa al uso de variables de entorno o archivos de credenciales de AWS, puede especificar las credenciales de AWS directamente en su configuración de Terraform:

```hcl
provider "datadog" {
  org_uuid              = var.datadog_org_uuid
  cloud_provider_type   = "aws"
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_session_token     = var.aws_session_token  # If using temporary credentials
}
```

El proveedor de Terraform utiliza automáticamente sus credenciales de AWS configuradas para autenticarse con Datadog.

## Configure Workload Identity Federation para el Datadog Agent {#set-up-workload-identity-federation-for-the-datadog-agent}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation para el Datadog Agent no está disponible para el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Workload Identity Federation para el Agent le permite autenticar su Agent usando credenciales de AWS en lugar de administrar una clave de API estática. El Agent intercambia una prueba de autenticación de AWS por una clave de API administrada que Datadog rota automáticamente.

### Requisitos {#requirements}

- Una versión y un tipo compatibles de Agent según cómo el Agent obtiene las credenciales de AWS. Consulte [Versiones compatibles de Agent y credenciales de AWS](#supported-agent-versions-and-aws-credentials).
- Un Agent que se ejecuta en un entorno de AWS con acceso a credenciales de AWS (por ejemplo, una instancia de EC2 con un rol de IAM, una tarea de ECS o un pod de EKS).
- Una integración de Datadog con AWS [4] configurada con su cuenta de AWS agregada. 
- Los permisos `workload_identity_federation_config_read` y `workload_identity_federation_config_write`.

#### Versiones de Agent compatibles y credenciales de AWS {#supported-agent-versions-and-aws-credentials}

La compatibilidad con la federación de identidades de carga de trabajo depende de la versión del Agent, el tipo de Agent y cómo el Agent obtiene las credenciales de AWS.

| Cómo obtiene el Agent las credenciales de AWS | Agent 7.78-7.81 | Agent 7.82 | Agent 7.83+ |
|---|---|---|---|
| Variables de entorno (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) | Todos los Agent | Todos los Agent | Todos los Agent |
| Rol del servicio de metadatos de instancia (IMDS) de EC2 | Solo Core Agents | Solo Core Agents | Todos los Agent |
| EKS IRSA (`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`) | No compatible | Solo Core Agents | Todos los Agent |
| ECS task role or EKS Pod Identity (`AWS_CONTAINER_CREDENTIALS_*`) | No compatible | Solo Core Agents | Todos los Agent |

**Core Agents**: El Agent, Cluster Agent, Process Agent, Security Agent, System Probe y the installer. 

**Todos los Agent**: Core Agents más el Trace Agent, DogStatsD independiente, Private Action Runner, IoT Agent y Heroku Agent.

El OpenTelemetry Collector (`otel-agent`) no admite la federación de identidades de carga de trabajo. AWS es el único proveedor de nube compatible. Azure, Google Cloud y los proveedores OIDC genéricos no son compatibles.

<div class="alert alert-info">Para un tipo de Agent, proveedor de nube o forma de proporcionar credenciales no compatible, <a href="/help/">abra una solicitud de función con el soporte de Datadog</a>.</div>

La configuración de la federación de identidades de carga de trabajo para el Agent consta de dos partes:
1. [Configuración de su asignación de ingesta de AWS en Datadog](#configure-aws-intake-mapping-in-datadog)
2. [Actualización de la configuración de su Agent](#update-your-agent-configuration)

### Configure el mapeo de ingesta de AWS en Datadog {#configure-aws-intake-mapping-in-datadog}

<div class="alert alert-info">Para que el mapeo de ingesta funcione, su cuenta de AWS <strong>debe estar integrada</strong> con Datadog a través de la <a href="https://app.datadoghq.com/integrations/amazon-web-services">integración de Datadog-AWS</a>. Si una cuenta de AWS no está integrada, el flujo de autenticación no puede verificar al emisor y la asignación falla.</div>

Configure mapeos de ingesta para autorizar patrones de ARN de AWS específicos para la autenticación del Agent. A diferencia de los mapeos de identidad, los mapeos de ingesta solo requieren un patrón de ARN. No se necesita un identificador de cuenta de Datadog, porque el Agent se autentica para enviar datos en lugar de realizar acciones de usuario. Datadog aprovisiona, configura y rota automáticamente la clave de API subyacente en su nombre.

Si necesita crear roles de IAM en AWS, consulte la [documentación de creación de roles de IAM de AWS][5].

#### Uso de la UI {#using-the-ui-1}

Navegue a [**Configuración de la organización** > **Federación de identidad de carga de trabajo**][6] y haga clic en la pestaña **Mapeos de ingesta**.

{{< img src="account_management/workload_identity_federation/intake-mappings-list.png" alt="Pestaña Mapeos de ingesta en la página Federación de identidad de carga de trabajo, que muestra el campo UUID de la organización y una lista de patrones de ARN de AWS autorizados para la autenticación del Agent" style="width:100%;" >}}

<div class="alert alert-warning">Datadog requiere el <strong>ARN de rol asumido</strong> en el campo Patrón de origen, no el ARN de rol de IAM. Estos dos formatos son diferentes:</div>
<ul>
<li><strong>ARN de rol de IAM</strong> (que se muestra en la consola de AWS): <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>ARN de rol asumido</strong> (requerido por Datadog): <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
Para encontrar el ARN de rol asumido para su carga de trabajo, ejecute <code>aws sts get-caller-identity</code> desde su entorno de carga de trabajo y utilice el valor en el <code>Arn</code> campo de la respuesta.

Para crear un mapeo de ingesta:

1. Haga clic en {{< ui >}}\+ New Mapping{{< /ui >}}.
2. Seleccione un **Proveedor de nube**.
3. Ingrese un **Patrón de origen (ARN)**. Utilice el formato de ARN de rol asumido y `*` para patrones Wildcard (por ejemplo, `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*`).
4. Haga clic en {{< ui >}}Create Mapping{{< /ui >}}.

{{< img src="account_management/workload_identity_federation/intake-mapping-create.png" alt="Cuadro de diálogo Crear mapeo de ingesta con campos para Proveedor de nube y ARN de patrón de origen, con texto de ayuda que describe la compatibilidad con patrones Wildcard" style="width:70%;" >}}

#### Uso de la API {#using-the-api-1}

##### Crear un mapeo de ingesta {#create-an-intake-mapping}

**Ejemplo**: Una llamada a la API que autoriza a los Agentes que se ejecutan con un rol de IAM específico a autenticarse.

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

##### Uso de Wildcards en patrones de ARN {#using-wildcards-in-arn-patterns-1}

Los patrones de ARN admiten la coincidencia con comodines para manejar partes dinámicas o variables de los ARN de recursos. Esto es útil cuando se trabaja con roles asumidos que incluyen identificadores de sesión o cuando tiene varias instancias de Agent.

**Reglas de wildcard**:
- Los comodines (`*`) solo se permiten en la última parte del ARN del recurso
- Debe especificar un recurso concreto antes del Wildcard
- Wildcards no pueden colocarse en medio del ARN

**Ejemplo**: coincidir con cualquier sesión asumiendo el `DatadogAgentRole`:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

Este patrón coincide con ARN de roles asumidos reales como:
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/i-0abc123def456`
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/eks-datadog-agent-xyz`

##### Listar mapeos de ingesta existentes {#list-existing-intake-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

##### Eliminar un mapeo de ingesta {#delete-an-intake-mapping}

```bash
curl -X DELETE "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping/<MAPPING_UUID>" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Actualice la configuración de su Agent {#update-your-agent-configuration}

Después de configurar el mapeo de ingesta, actualice la configuración de su Agent para usar la Federación de identidad de carga de trabajo.

#### Configuración global {#global-configuration}

Agregue la sección `delegated_auth` a su archivo `datadog.yaml` para habilitar la Federación de identidad de carga de trabajo para todos los datos del Agent.

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

Para obtener su `org_uuid`, búsquelo directamente en la página [**Configuración de la organización** > **Workload Identity Federation**][6], o llame a este punto de conexión (requiere una sesión activa en la organización de destino): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

El Agent detecta automáticamente si se ejecuta en un entorno de AWS y utiliza las credenciales de AWS disponibles.

#### Opciones específicas del proveedor {#provider-specific-options}

Para configurar explícitamente AWS como su proveedor de autenticación y especificar opciones específicas del proveedor, use las subsecciones `provider` y `aws`:

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
  provider: aws  # Optional: auto-detects if omitted
  aws:
    region: <AWS_REGION>  # Optional: auto-detects from IMDS if omitted or uses global STS
```

Reemplace `<AWS_REGION>` con la región de AWS que se usará para la autenticación STS (por ejemplo, `us-east-1`).

#### Configuración por producto {#per-product-configuration}

Puede habilitar la autenticación delegada para productos específicos de Agent de forma independiente. Esto es útil cuando desea enviar diferentes tipos de datos a diferentes organizaciones de Datadog, o cuando solo desea usar la Federación de identidad de carga de trabajo para productos específicos.

Para habilitar la autenticación delegada solo para registros:

```yaml
logs_config:
  delegated_auth:
    org_uuid: <YOUR_ORG_UUID>
```

Para usar diferentes organizaciones para diferentes productos:

```yaml
delegated_auth:
  org_uuid: <YOUR_GLOBAL_ORG_UUID>
  provider: aws
  aws:
    region: <AWS_REGION>

logs_config:
  delegated_auth:
    org_uuid: <YOUR_LOGS_ORG_UUID>
```

<div class="alert alert-info">Configuración específica del proveedor (como <code>provider</code> y <code>aws</code>) solo se configuran en la sección global <code>delegated_auth</code> Sección. Las secciones por producto solo admiten <code>org_uuid</code>.</div>

#### Comportamiento de respaldo {#fallback-behavior}

Si el flujo de autenticación delegada falla por cualquier motivo, el Agent vuelve automáticamente a usar la clave de API configurada en su archivo `datadog.yaml`. Este comportamiento de respaldo proporciona una red de seguridad durante la incorporación y protege contra interrupciones del servicio de autenticación.

Para aprovechar este respaldo, mantenga su configuración `api_key` existente junto con la nueva configuración `delegated_auth`:

```yaml
api_key: <YOUR_API_KEY>

delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /es/integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html
[6]: https://app.datadoghq.com/organization-settings/workload-identity-federation