---
algolia:
  tags:
  - secrets
  - secrets executable
  - secrets provider
  - list secrets
aliases:
- /es/agent/faq/kubernetes-secrets
- /es/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: Documentación
  text: Autodiscovery
title: Gestión de secretos
---
## Descripción general {#overview}

El Datadog Agent le ayuda a gestionar sus secretos de forma segura mediante la integración con las siguientes soluciones de gestión de secretos:
- [AWS Secrets Manager](#id-for-secrets)
- [AWS SSM](#id-for-ssm)
- [Azure KeyVault](#id-for-azure)
- [GCP Secret Manager](#id-for-gcp)
- [HashiCorp Vault](#id-for-hashicorp)
- [Secretos de Kubernetes](#id-for-kubernetes)
- [Secretos de Docker](#id-for-docker)
- [Archivo de texto](#id-for-json-yaml-text)
- [Archivo JSON](#id-for-json-yaml-text)
- [Archivo YAML](#id-for-json-yaml-text)
- [Clave del registro de Windows](#id-for-windows-regkey)

En lugar de codificar valores confidenciales, como claves de API o contraseñas, en texto plano dentro de los archivos de configuración, el Datadog Agent puede recuperarlos dinámicamente en tiempo de ejecución. Para hacer referencia a un secreto en su configuración, utilice la notación `ENC[<secret_id>]`. El secreto se obtiene y se carga en la memoria, pero nunca se escribe en el disco ni se envía al backend de Datadog.

**Nota**: No puede utilizar la sintaxis `ENC[]` en configuraciones `secret_*` como `secret_backend_command`.

## Opciones para recuperar secretos {#options-for-retrieving-secrets}

### Opción 1: Uso del soporte nativo del Datadog Agent para obtener secretos {#option-1-using-native-agent-support-for-fetching-secrets}

Notas:
- **Datadog Agent 7.70+**: Se introdujo el soporte nativo para la gestión de secretos.
- **Datadog Agent 7.76+**: Gestión de secretos nativa disponible para el Datadog Agent con FIPS habilitado.
- **Datadog Agent 7.77+**: El [Cluster Agent](/containers/cluster_agent/) requiere el Datadog Agent 7.77 o posterior en entornos en contenedores. Para versiones anteriores, utilice [Opción 2](#option-2-using-the-built-in-script-for-kubernetes-and-docker) o [Opción 3](#option-3-creating-a-custom-executable) en su lugar.
- **Datadog Agent 7.80+**: Soporte para [múltiples backends](#multiple-backends).

#### Backend único {#single-backend}

Utilice `secret_backend_type` y `secret_backend_config` en `datadog.yaml` para configurar un backend de secretos único:

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

Las instrucciones de configuración más específicas dependen del tipo de backend utilizado. Consulte la sección correspondiente a continuación para obtener más información:


{{% collapse-content title="Secretos de AWS" level="h5" expanded=false id="id-for-secrets" %}}
Se admiten los siguientes servicios de AWS:

|valor de secret_backend_type                                | Servicio de AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### Configure un perfil de instancia {#set-up-an-instance-profile}

Datadog recomienda utilizar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS gestiona todas las variables de entorno y los perfiles de sesión por usted. Puede encontrar más instrucciones sobre cómo hacer esto en la [documentación oficial de AWS Secrets Manager][1000].

##### Ejemplo de configuración {#configuration-example}

{{< tabs >}}
{{% tab "Archivo YAML del Datadog Agent" %}}

Configure el Datadog Agent para usar AWS Secrets para resolver secretos mediante la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Al usar variables de entorno, convierta la configuración a JSON de la siguiente manera:

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Después de configurar el Datadog Agent para usar AWS Secrets, puede hacer referencia a cualquier secreto en sus configuraciones con `ENC[secretId;secretKey]`.

La notación ENC se compone de:
* `secretId`: ya sea el "nombre descriptivo" del secreto (por ejemplo, `/DatadogAgent/Production`) o el ARN (por ejemplo, `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`).
  - **Nota**: El formato ARN completo es necesario al acceder a secretos desde una cuenta diferente donde está definida la credencial de AWS o la credencial `sts:AssumeRole`.
* `secretKey`: la clave JSON del secreto de AWS que desea utilizar.


AWS Secrets Manager puede almacenar múltiples pares clave-valor dentro de un solo secreto. Una configuración de backend que utiliza Secrets Manager tiene acceso a todas las claves definidas en un secreto.

Por ejemplo, suponiendo que el ID de secreto `My-Secrets` contiene los siguientes 3 valores:

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

El siguiente es un ejemplo completo del archivo de configuración `datadog.yaml` que utiliza AWS Secrets para obtener su clave de API de `My-Secrets`:

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

##### Todas las opciones `aws_session` {#all-aws-session-options}

Los siguientes campos `aws_session` configuran cómo el Datadog Agent se autentica en AWS. Todos los campos son opcionales; cuando no se establece ninguno, el Datadog Agent utiliza la [cadena de credenciales predeterminada][1007] (perfil de instancia, variables de entorno, archivo de configuración compartido, etcétera).

| Campo | Descripción |
|---|---|
| `aws_region` | Región de AWS (por ejemplo, `us-east-1`). |
| `aws_access_key_id` | ID de clave de acceso estática de AWS. Úselo con `aws_secret_access_key`. |
| `aws_secret_access_key` | Clave de acceso secreta estática de AWS. Úselo con `aws_access_key_id`. |
| `aws_profile` | Perfil con nombre del archivo de configuración compartido de AWS (`~/.aws/config`). |
| `aws_role_arn` | ARN del rol de IAM para asumir con `sts:AssumeRole`. |
| `aws_external_id` | ID externo para pasar al asumir un rol entre cuentas. |

##### `force_string` opción {#force-string-option}

Establezca `force_string: true` en el nivel superior de `secret_backend_config` para devolver la cadena secreta sin procesar en lugar de parsearla como JSON. Esto es útil cuando un secreto se almacena como texto sin formato en lugar de como un objeto JSON.

```yaml
secret_backend_type: aws.secrets
secret_backend_config:
  force_string: true
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

Configure el Datadog Agent para usar AWS Secrets para resolver secretos en Helm usando la siguiente configuración:

##### Verificación de integración {#integration-check}

```sh
datadog:
  secretBackend:
    type: "aws.secrets"
    config:
      aws_session:
        aws_region: "<AWS_REGION>"
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
```

<div class="alert alert-info"> Debe incluir el <code>serviceAccountAnnotations</code> Debe incluir el Datadog Agent para otorgar permisos al acceso del secreto de AWS. </div>

<br>


##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados {#cluster-check-without-cluster-check-runners-enabled}

```sh
datadog:
  secretBackend:
    type: "aws.secrets"
    config:
      aws_session:
        aws_region: "<AWS_REGION>"
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
```

##### Verificación de clúster: con los ejecutores de verificación de clúster habilitados {#cluster-check-with-cluster-check-runners-enabled}

```sh
datadog:
  secretBackend:
    type: "aws.secrets"
    config:
      aws_session:
        aws_region: "<AWS_REGION>"
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
clusterChecksRunner:
  enabled: true
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>

```

{{% /tab %}}

{{% tab "Operador" %}}

Configure el Datadog Agent para usar AWS Secrets para resolver secretos con el Datadog Operator utilizando la siguiente configuración:

##### Verificación de integración {#integration-check-1}


```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "aws.secrets"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  override:
    nodeAgent:
      # IAM role ARN is required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secretId;secretKey]"

```

<div class="alert alert-info"> Debe incluir el <code>serviceAccountAnnotations</code> Debe incluir el Datadog Agent para otorgar permisos al acceso del secreto de AWS. </div>

<br>


##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados {#cluster-check-without-cluster-check-runners-enabled-1}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "aws.secrets"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  override:
    nodeAgent:
      # IAM role ARN required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretId;secretKey]"
```

<br>

##### Verificación de clúster: con los ejecutores de verificación de clúster habilitados {#cluster-check-with-cluster-check-runners-enabled-1}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "aws.secrets"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    [...]
    clusterChecksRunner:
      # IAM role ARN required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretId;secretKey]"

```

**Alternativamente**, con Datadog Operator v1.25.0+ y Datadog Agent v7.70+, puede usar los campos nativos `secretBackend.type` y `secretBackend.config` en lugar de variables de entorno. Por ejemplo: `spec.global.secretBackend.type: "aws.secrets"` y `spec.global.secretBackend.config` con `aws_session.aws_region: "<AWS_REGION>"`.

{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="AWS SSM" level="h5" expanded=false id="id-for-ssm" %}}
Se admiten los siguientes servicios de AWS:

|valor de secret_backend_type                                | Servicio de AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### Configure un perfil de instancia {#set-up-an-instance-profile-1}

Datadog recomienda utilizar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS gestiona todas las variables de entorno y los perfiles de sesión por usted. Puede encontrar más instrucciones sobre cómo hacer esto en la [documentación oficial de AWS Secrets Manager][1001].

##### Ejemplo de configuración {#configuration-example-1}

El AWS System Manager Parameter Store admite un modelo jerárquico. Por ejemplo, suponiendo las siguientes rutas de AWS System Manager Parameter Store:

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

Los parámetros se pueden obtener de la siguiente manera:

```yaml
# datadog.yaml
secret_backend_type: aws.ssm
secret_backend_config:
  aws_session:
    aws_region: us-east-1

api_key: "ENC[/DatadogAgent/Production/ApiKey]"
property1: "ENC[/DatadogAgent/Production/ParameterKey1]"
property2: "ENC[/DatadogAgent/Production/ParameterKey2]"
```

##### Todas las opciones `aws_session` {#all-aws-session-options-1}

Los siguientes campos `aws_session` configuran cómo el Datadog Agent se autentica en AWS. Todos los campos son opcionales; cuando no se establece ninguno, el Datadog Agent utiliza la [cadena de credenciales predeterminada][1007] (perfil de instancia, variables de entorno, archivo de configuración compartido, etcétera).

| Campo | Descripción |
|---|---|
| `aws_region` | Región de AWS (por ejemplo, `us-east-1`). |
| `aws_access_key_id` | ID de clave de acceso estática de AWS. Úselo con `aws_secret_access_key`. |
| `aws_secret_access_key` | Clave de acceso secreta estática de AWS. Úselo con `aws_access_key_id`. |
| `aws_profile` | Perfil con nombre del archivo de configuración compartido de AWS (`~/.aws/config`). |
| `aws_role_arn` | ARN del rol de IAM para asumir con `sts:AssumeRole`. |
| `aws_external_id` | ID externo para pasar al asumir un rol entre cuentas. |

{{% /collapse-content %}}


{{% collapse-content title="Backend de Azure Keyvault" level="h5" expanded=false id="id-for-azure" %}}


Se admiten los siguientes servicios de Azure:

| valor de secret_backend_type                            | Servicio de Azure          |
| ----------------------------------------|------------------------|
| `azure.keyvault` | [Azure Keyvault][2000] |

##### Autenticación de Azure {#azure-authentication}

Datadog recomienda usar identidades administradas para autenticarse con Azure. Esto le permite asociar recursos en la nube con cuentas AMI y elimina la necesidad de colocar información confidencial en su archivo de configuración `datadog.yaml`.

##### Identidad administrada {#managed-identity}

Para acceder a su Key Vault, cree una Identidad administrada y asígnela a su máquina virtual. Luego, configure la asignación de roles adecuada en el Key Vault para permitir que esa identidad acceda a sus secretos.

##### Ejemplo de configuración {#configuration-example-2}

{{< tabs >}}
{{% tab "Archivo YAML del Datadog Agent" %}}

La configuración de backend para los secretos de Azure Key Vault está estructurada como YAML siguiendo este esquema:

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
  azure_session:
    azure_client_id: {clientID}  # User-assigned managed identity client ID; omit this field for system-assigned
```

Al usar variables de entorno, convierta la configuración a JSON:

```sh
DD_SECRET_BACKEND_TYPE="azure.keyvault"
DD_SECRET_BACKEND_CONFIG='{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
```

El secreto de backend se referencia en su archivo de configuración del Datadog Agent con `ENC[ ]`. El siguiente es un ejemplo donde se necesita recuperar un secreto de texto plano:

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

##### Todas las opciones `azure_session`{#all-azure-session-options}

Los siguientes `azure_session` campos controlan cómo el Agent se autentica en Azure. Todos los campos son opcionales; el Agent recurre a [Default Azure Credential][2001] (variables de entorno, Identidad de carga de trabajo, Identidad administrada asignada por el sistema, Azure CLI, etcétera) cuando ninguno está configurado.

| Campo | Descripción |
|---|---|
| `azure_client_id` | ID de cliente de una Identidad administrada asignada por el usuario, o de una entidad de servicio. |
| `azure_tenant_id` | ID de inquilino para la autenticación de entidad de servicio. Requerido junto con `azure_client_id` y un secreto de cliente o certificado. |
| `azure_client_secret` | Secreto de cliente para la autenticación de entidad de servicio. |
| `azure_client_certificate_path` | Ruta a un archivo de certificado PEM o PKCS12 para la autenticación de certificado de entidad de servicio. |
| `azure_client_certificate_password` | Contraseña para el archivo de certificado (si está protegido por contraseña). |
| `azure_client_send_certificate_chain` | Establezca en `true` para enviar la cadena de certificados completa al usar la autenticación de certificado. |

La autenticación se selecciona según los campos que se proporcionen:
- **Entidad de servicio con secreto**: `azure_tenant_id` + `azure_client_id` + `azure_client_secret`
- **Entidad de servicio con certificado**: `azure_tenant_id` + `azure_client_id` + `azure_client_certificate_path`
- **Identidad administrada asignada por el usuario**: `azure_client_id` solamente
- **Credencial predeterminada de Azure** (recomendado): omita todos los campos `azure_session`

{{% /tab %}}

{{% tab "Helm" %}}

Configure el Datadog Agent para usar Azure Key Vault para resolver secretos en Helm mediante la siguiente configuración:

##### Verificación de integración {#integration-check-2}

```sh
datadog:
  secretBackend:
    type: "azure.keyvault"
    config:
      keyvaulturl: "<keyVaultURL>"
      azure_session:
        azure_client_id: "<CLIENT_ID>"
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretKeyNameInKeyVault]"
```

##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados {#cluster-check-without-cluster-check-runners-enabled-2}

```sh
datadog:
  secretBackend:
    type: "azure.keyvault"
    config:
      keyvaulturl: "<keyVaultURL>"
      azure_session:
        azure_client_id: "<CLIENT_ID>"
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretKeyNameInKeyVault]"
```

##### Verificación de clúster: con los ejecutores de verificación de clúster habilitados {#cluster-check-with-cluster-check-runners-enabled-2}

```sh
datadog:
  secretBackend:
    type: "azure.keyvault"
    config:
      keyvaulturl: "<keyVaultURL>"
      azure_session:
        azure_client_id: "<CLIENT_ID>"
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretKeyNameInKeyVault]"
clusterChecksRunner:
  enabled: true
```

{{% /tab %}}

{{% tab "Operador" %}}

Configure el Datadog Agent para usar Azure Key Vault para resolver secretos con el Datadog Operator mediante la siguiente configuración:

##### Verificación de integración {#integration-check-3}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "azure.keyvault"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secretKeyNameInKeyVault]"
```

##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados {#cluster-check-without-cluster-check-runners-enabled-3}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "azure.keyvault"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretKeyNameInKeyVault]"
```

##### Verificación de clúster: con los ejecutores de verificación de clúster habilitados {#cluster-check-with-cluster-check-runners-enabled-3}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "azure.keyvault"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretKeyNameInKeyVault]"
```

**Alternativamente**, con Datadog Operator v1.25.0+ y Datadog Agent v7.70+, puede usar los campos nativos `secretBackend.type` y `secretBackend.config` en lugar de variables de entorno. Por ejemplo: `spec.global.secretBackend.type: "azure.keyvault"` y `spec.global.secretBackend.config` con las claves `keyvaulturl` y `azure_session.azure_client_id`.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h5" expanded=false id="id-for-gcp" %}}

*Disponible en la versión 7.74+ de Agent*

Se admiten los siguientes servicios de GCP:

| valor secret_backend_type                               | Servicio GCP                    |
| ------------------------------------------------------- | ------------------------------ |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### Autenticación y política de acceso de GCP {#gcp-authentication-and-access-policy}

La implementación de GCP Secret Manager utiliza [Application Default Credentials (ADC)][5001] para la autenticación con Google.

Para interactuar con GCP Secret Manager, la cuenta de servicio utilizada por el Datadog Agent (como la cuenta de servicio de la VM, una identidad de carga de trabajo o credenciales activadas localmente) requiere el permiso `secretmanager.versions.access`.

Esto se puede otorgar con el rol predefinido {{< ui >}}Secret Manager Secret Accessor{{< /ui >}} (`roles/secretmanager.secretAccessor`) o un rol personalizado con [acceso][5002] equivalente.

En los entornos de ejecución de GCE o GKE, ADC se configura automáticamente a través de la cuenta de servicio adjunta a la instancia o al pod. La cuenta de servicio adjunta debe tener los roles adecuados para acceder a GCP Secret Manager. Además, el tiempo de ejecución de GCE o GKE requiere el `cloud-platform` [contexto de acceso OAuth][5003].

##### Ejemplo de configuración de GCP {#gcp-configuration-example}

{{< tabs >}}
{{% tab "Archivo YAML del Datadog Agent" %}}

Configure el Datadog Agent para usar GCP Secret Manager para resolver secretos con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Al usar variables de entorno, convierta la configuración a JSON:

```sh
DD_SECRET_BACKEND_TYPE="gcp.secretmanager"
DD_SECRET_BACKEND_CONFIG='{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
```

Después de configurar el Datadog Agent para usar GCP Secret Manager, haga referencia a los secretos en sus configuraciones con `ENC[secret-name]` o `ENC[secret-name;key;version;]`.

La notación ENC se compone de:

- `secret`: el nombre del secreto en GCP Secret Manager (por ejemplo, `datadog-api-key`).
- `key`: (opcional) la clave a extraer de un secreto con formato JSON. Si está utilizando secretos de texto plano, puede omitir esto (ejemplo: `ENC[secret-name;;version]`).
- `version`: (opcional) el número de versión del secreto. Si no se especifica, se utiliza la versión `latest`.
  + Ejemplos de sintaxis de versión:
    - `secret-key` - Versión `latest` implícita
    - `secret-key;;latest` - Versión `latest` explícita
    - `secret-key;;1` - Número de versión específico

Por ejemplo, suponiendo secretos de GCP llamados `datadog-api-key` con dos versiones y `datadog-app-key`:

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Para secretos con formato JSON, suponiendo que un secreto llamado `datadog-keys` contiene:

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

Haga referencia a claves específicas de esta manera:

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

{{% /tab %}}

{{% tab "Helm" %}}

Configure el Datadog Agent para usar GCP Secret Manager para resolver secretos en Helm utilizando la siguiente configuración:

##### Verificación de integración {#integration-check-4}

```sh
datadog:
  secretBackend:
    type: "gcp.secretmanager"
    config:
      gcp_session:
        project_id: "<PROJECT_ID>"
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secret-name]"
```

##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados {#cluster-check-without-cluster-check-runners-enabled-4}

```sh
datadog:
  secretBackend:
    type: "gcp.secretmanager"
    config:
      gcp_session:
        project_id: "<PROJECT_ID>"
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secret-name]"
```

##### Verificación de clúster: con los ejecutores de verificación de clúster habilitados {#cluster-check-with-cluster-check-runners-enabled-4}

```sh
datadog:
  secretBackend:
    type: "gcp.secretmanager"
    config:
      gcp_session:
        project_id: "<PROJECT_ID>"
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secret-name]"
clusterChecksRunner:
  enabled: true
```

{{% /tab %}}

{{% tab "Operador" %}}

Configure el Datadog Agent para usar GCP Secret Manager para resolver secretos con el Datadog Operator utilizando la siguiente configuración:

##### Verificación de integración {#integration-check-5}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "gcp.secretmanager"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secret-name]"
```

##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados {#cluster-check-without-cluster-check-runners-enabled-5}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "gcp.secretmanager"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secret-name]"
```

##### Verificación de clúster: con los ejecutores de verificación de clúster habilitados {#cluster-check-with-cluster-check-runners-enabled-5}

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  global:
    env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "gcp.secretmanager"
      - name: DD_SECRET_BACKEND_CONFIG
        value: '{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secret-name]"
```

**Alternativamente**, con Datadog Operator v1.25.0+ y Datadog Agent v7.70+, puede usar los campos nativos `secretBackend.type` y `secretBackend.config` en lugar de variables de entorno. Por ejemplo: `spec.global.secretBackend.type: "gcp.secretmanager"` y `spec.global.secretBackend.config` con `gcp_session.project_id: "<PROJECT_ID>"`.

{{% /tab %}}
{{< /tabs >}}

##### Control de versiones de secretos {#secret-versioning}

GCP Secret Manager admite versiones de secretos. La implementación del Datadog Agent también admite el versionado de secretos mediante el delimitador `;`. Si no se especifica ninguna versión, se utiliza la versión `latest`.


##### Compatibilidad con secretos JSON {#json-secret-support}

El Datadog Agent admite la extracción de claves específicas de secretos con formato JSON mediante el delimitador `;`:

- `datadog;api_key` - Extrae el campo `api_key` del secreto `datadog` con una versión `latest` implícita
- `datadog;api_key;1`  - Extrae el campo `api_key` del secreto `datadog` de la versión `1`

{{% /collapse-content %}}


{{% collapse-content title="Backend de HashiCorp Vault" level="h5" expanded=false id="id-for-hashicorp" %}}

Se admiten los siguientes servicios de HashiCorp:

| valor secret_backend_type                               | Servicio HashiCorp                                  |
| ------------------------------------------ | -------------------------------------------------- |
| `hashicorp.vault` | [HashiCorp Vault (versiones 1 y 2 del motor de secretos)][3000] |

##### Cómo configurar HashiCorp Vault {#how-to-set-up-hashicorp-vault}
1. Ejecute su HashiCorp Vault. Consulte la [documentación oficial de HashiCorp Vault][3001] para obtener más información.
2. Escriba una política que otorgue el permiso para extraer secretos de su bóveda. Cree un archivo `*.hcl` e incluya el siguiente permiso si utiliza la versión 1 del motor de secretos:

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si utiliza la versión 2 del motor de secretos, se necesitan los siguientes permisos:

```
path "<your_mount_path>/data/<additional_subpath>" {
  capabilities = ["read"]
}

/*
Datadog needs access to mount information to check the Secrets Engine version
number. If access isn't granted, version 1 is assumed.
*/
path "sys/mounts" {
  capabilities = ["read"]
}
```
3. Ejecute `vault policy write <policy_name> <path_to_*.hcl_file>`

4. Elija el método de autenticación para su bóveda. Si utiliza el método de perfil de instancia de AWS, ejecute `vault auth enable aws`.

##### Instrucciones del perfil de instancia de AWS {#aws-instance-profile-instructions}

Datadog recomienda que se autentique utilizando el [método de perfil de instancia][3003] si está ejecutando su HashiCorp Vault desde una máquina conectada a AWS.

Después de configurar esto, escriba una [política de vault específica para la autenticación][3004].

##### Ejemplo de configuración {#configuration-example-3}

En el siguiente ejemplo, suponga que el prefijo de la ruta secreta de HashiCorp Vault es `/Datadog/Production` con una clave de parámetro de `apikey`:

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

El siguiente ejemplo obtiene el valor de la clave de API de HashiCorp Vault aprovechando AWS para la autenticación.

```yaml
# datadog.yaml
api_key: "ENC[/Datadog/Production;apikey]"

secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_session:
    vault_auth_type: aws
    vault_aws_role: Name-of-IAM-role-attached-to-machine
    aws_region: us-east-1  # optional, defaults to us-east-1 if not set
```

##### Todas las opciones `vault_session` {#all-vault-session-options}

Los siguientes `vault_session` campos controlan cómo se autentica el Agent en Vault.

| Campo | Descripción |
|---|---|
| `vault_auth_type` | Método de autenticación. Valores admitidos: `aws`, `kubernetes`. Cuando no se establece, se utiliza AppRole, userpass o LDAP según las credenciales proporcionadas. |
| `vault_role_id` | ID de rol de AppRole. Úselo con `vault_secret_id`. |
| `vault_secret_id` | ID secreto de AppRole. Úselo con `vault_role_id`. |
| `vault_username` | Nombre de usuario para la autenticación userpass. Úselo con `vault_password`. |
| `vault_password` | Contraseña para la autenticación userpass. Úselo con `vault_username`. |
| `vault_ldap_username` | Nombre de usuario para la autenticación LDAP. Úselo con `vault_ldap_password`. |
| `vault_ldap_password` | Contraseña para la autenticación LDAP. Úselo con `vault_ldap_username`. |
| `vault_aws_role` | Nombre del rol de Vault para la autenticación IAM de AWS. Requerido cuando `vault_auth_type: aws`. |
| `vault_aws_iam_server_id` | Valor para el encabezado `X-Vault-AWS-IAM-Server-ID`, utilizado para prevenir ataques de repetición. |
| `aws_region` | Región de AWS para las solicitudes de autenticación IAM. El valor predeterminado es `us-east-1`. |
| `vault_kubernetes_role` | Nombre del rol de Vault para la autenticación de Kubernetes. Requerido cuando `vault_auth_type: kubernetes`. |
| `vault_kubernetes_jwt` | Token JWT de la cuenta de servicio de Kubernetes como una cadena. |
| `vault_kubernetes_jwt_path` | Ruta al archivo del token JWT de Kubernetes. El valor predeterminado es `/var/run/secrets/kubernetes.io/serviceaccount/token`. |
| `vault_kubernetes_mount_path` | Ruta de montaje de Vault para el método de autenticación de Kubernetes. |
| `implicit_auth` | Establezca en `true` para omitir la autenticación y usar el token ya configurado en el entorno del cliente de Vault (por ejemplo, `VAULT_TOKEN`). |

##### Otras opciones de `secret_backend_config` para Vault {#other-secret-backend-config-options-for-vault}

Los siguientes campos de nivel superior `secret_backend_config` también se aplican:

| Campo | Descripción |
|---|---|
| `vault_address` | Dirección del servidor de Vault (por ejemplo, `http://myvaultaddress.net`). También se puede establecer con la variable de entorno `VAULT_ADDR`. |
| `vault_token` | Token estático de Vault. Úselo cuando no dependa de un método de autenticación. |
| `vault_namespace` | Espacio de nombres de Vault para entornos de Vault Enterprise. |

##### Configuración de TLS (`vault_tls_config`) {#tls-configuration-vault-tls-config}

Para habilitar TLS mutuo o una CA personalizada, agregue un bloque `vault_tls_config`:

```yaml
secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: https://myvaultaddress.net
  vault_tls_config:
    ca_cert: /path/to/ca.pem
    client_cert: /path/to/client.pem
    client_key: /path/to/client-key.pem
    insecure: false
```

| Campo | Descripción |
|---|---|
| `ca_cert` | Ruta al archivo de certificado de CA codificado en PEM. |
| `ca_path` | Ruta a un directorio de archivos de certificado de CA codificados en PEM. |
| `client_cert` | Ruta al archivo de certificado de cliente codificado en PEM para mTLS. |
| `client_key` | Ruta al archivo de clave privada para el certificado de cliente. |
| `tls_server` | Nombre de servidor esperado para la verificación SNI de TLS. |
| `insecure` | Establezca en `true` para deshabilitar la verificación de certificados TLS. No lo utilice en producción. |

{{% /collapse-content %}}

{{% collapse-content title="Secretos de Kubernetes" level="h5" expanded=false id="id-for-kubernetes" %}}

*Disponible en la versión 7.75+ del Agent*

Se admiten los siguientes servicios de Kubernetes:

| valor de secret_backend_type | servicio |
|---------------------------|---------|
| `k8s.secrets` | [Secretos de Kubernetes][7000] |

##### Requisitos previos {#prerequisites}

El backend de secretos de Kubernetes requiere:
- **Credenciales de cuenta de servicio**: De forma predeterminada, utiliza tokens de cuenta de servicio montados automáticamente (`automountServiceAccountToken: true`, consulte la [documentación de Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting)). Se pueden configurar rutas personalizadas si es necesario.
- **Permisos de RBAC**: La cuenta de servicio del Agent debe tener permisos para leer secretos de los espacios de nombres de destino.
- **Acceso a la red**: El pod del Agent debe poder comunicarse con el servidor de la API de Kubernetes.

##### Configuración de RBAC {#rbac-setup}

Para cada espacio de nombres que contenga secretos, cree un `Role` y un `RoleBinding` usando el siguiente ejemplo con el nombre de espacio de nombres correcto:

```yaml
# Role: grants permission to read secrets
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: <target namepace> # Namespace with secrets
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get"]
---
# RoleBinding: grants permission to Agent's ServiceAccount
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-secret-access
  namespace: <target namespace>  # Namespace with secrets
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: datadog-secret-reader
subjects:
- kind: ServiceAccount
  name: <serviceaccount name>  # datadog is typically the default ServiceAccount name
  namespace: datadog  # Where Agent runs
```

##### Ejemplo de configuración {#configuration-example-4}

{{< tabs >}}
{{% tab "Archivo YAML del Datadog Agent" %}}

Configure el Datadog Agent para usar Kubernetes Secrets con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

El formato de notación ENC es `namespace/secret-name;key`:
- `namespace`: El espacio de nombres de Kubernetes que contiene el secreto
- `secret-name`: El nombre del recurso Secret
- `key`: La clave específica a extraer del campo de datos del Secret

**Ejemplo:** Dado un Secret en el espacio de nombres `secrets-ns`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dd-api-key
  namespace: secrets-ns
data:
  api_key: <base64-encoded-value>
  app_key: <base64-encoded-value>
```

Puede hacer referencia a claves individuales:

```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**Soporte para múltiples espacios de nombres:**
Cada referencia de secreto puede especificar un espacio de nombres diferente (se debe configurar RBAC para cada uno):

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Configure el Datadog Agent para usar Kubernetes Secrets con Helm:

```yaml
# values.yaml
datadog:
  apiKey: "placeholder-will-be-overridden"

  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_API_KEY
    value: "ENC[secrets-ns/dd-api-key;api_key]"
```

**Nota:** Se requiere un marcador de posición `apiKey` para la validación del gráfico de Helm al usar el backend de secretos para resolver la clave de API. La variable de entorno `DD_API_KEY` lo anula. Debe crear manualmente RBAC (Role + RoleBinding) para cada espacio de nombres que contenga secretos. Para obtener más información, consulte la sección [configuración de RBAC](#rbac-setup).

**Alternativamente**, con el gráfico de Helm v3.171.0+ y Agent v7.70+, puede usar el campo nativo `datadog.secretBackend.type` en lugar de variables de entorno.

{{% /tab %}}

{{% tab "Operador" %}}

Configure el Datadog Agent para usar Kubernetes Secrets con el Datadog Operator:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "placeholder-will-be-overridden"

  override:
    nodeAgent:
      env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "k8s.secrets"
      - name: DD_API_KEY
        value: "ENC[secrets-ns/dd-api-key;api_key]"
```

**Nota:** Una clave de API de marcador de posición satisface la validación del Datadog Operator al usar el backend de secretos para resolver la clave de API. La variable de entorno `DD_API_KEY` lo anula. Debe crear manualmente RBAC (Role + RoleBinding) para cada espacio de nombres que contenga secretos. Para obtener más información, consulte la sección [configuración de RBAC](#rbac-setup).

**Alternativamente**, con Datadog Operator v1.25.0+ y Agent v7.70+, puede usar el campo `spec.global.secretBackend.type` en lugar de variables de entorno.

{{% /tab %}}
{{< /tabs >}}

##### Configuración de ruta personalizada {#custom-path-configuration}
Si su configuración no sigue las ubicaciones predeterminadas para la autenticación basada en cuenta de servicio, puede especificar `token_path` y `ca_path` en su lugar.

{{< tabs >}}
{{% tab "YAML del Agent" %}}

```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  token_path: /custom/path/to/token
  ca_path: /custom/path/to/ca.crt
```
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_SECRET_BACKEND_CONFIG
    value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```

**Alternativamente**, con el chart de Helm v3.171.0+, puede usar: `datadog.secretBackend.type: "k8s.secrets"` y `datadog.secretBackend.config` con las claves `token_path` y `ca_path`.

{{% /tab %}}

{{% tab "Operador" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```

**Alternativamente**, con Datadog Operator v1.25.0+, puede usar: `spec.global.secretBackend.type: "k8s.secrets"` y `spec.global.secretBackend.config` con las claves `token_path` y `ca_path`.

{{% /tab %}}
{{< /tabs >}}

##### Configuración personalizada del servidor API {#custom-api-server-configuration}

Si su configuración no expone las variables de entorno predeterminadas `KUBERNETES_SERVICE_HOST` y `KUBERNETES_SERVICE_PORT`, puede proporcionar una URL `api_server` para interactuar con la API REST de Kubernetes.

{{< tabs >}}
{{% tab "YAML del Agent" %}}

```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  api_server: https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}
```
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_SECRET_BACKEND_CONFIG
    value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```

**Alternativamente**, con el chart de Helm v3.171.0+, puede usar: `datadog.secretBackend.type: "k8s.secrets"` y `datadog.secretBackend.config` con la clave `api_server`.

{{% /tab %}}

{{% tab "Operador" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```

**Alternativamente**, con Datadog Operator v1.25.0+, puede usar: `spec.global.secretBackend.type: "k8s.secrets"` y `spec.global.secretBackend.config` con la clave `api_server`.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Docker Secrets" level="h5" expanded=false id="id-for-docker" %}}

*Disponible en la versión 7.75+ del Agent*

Se admiten los siguientes servicios de Docker:

| valor de secret_backend_type | servicio |
|---------------------------|---------|
| `docker.secrets` | [Docker Secrets][6001] |

##### Requisitos previos {#prerequisites-1}

El backend de Docker secrets admite tanto [Docker Swarm secrets][6002] como [Docker Compose secrets][6003]. De forma predeterminada, tanto Swarm como Compose montan automáticamente los secretos dentro del contenedor como archivos en `/run/secrets` (Linux) o `C:\ProgramData\Docker\secrets` (Windows).

**Nota**: Los secretos de Compose pueden estar basados en archivos (apuntando a archivos locales) o ser externos (haciendo referencia a secretos de Swarm existentes).

##### Ejemplo de configuración {#configuration-example-5}

Configure el Datadog Agent para usar Docker Secrets con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

El formato de notación ENC es el nombre del secreto, que corresponde al nombre del archivo en `/run/secrets/`:
- `ENC[api_key]` lee de `/run/secrets/api_key` (Linux) o `C:\ProgramData\Docker\secrets\api_key` (Windows)

**Ruta de secretos personalizada:**
Si Docker Swarm o Compose están configurados para montar secretos en una ubicación diferente, puede especificarla de esta manera:

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Ejemplo de Docker Swarm {#docker-swarm-example}

[Cree][6002] y utilice un secreto de Docker Swarm:

```bash
# Create the secret
echo "<api_key_value>" | docker secret create dd_api_key -

# Deploy Agent with secret mounted
docker service create \
  --name datadog-agent \
  --secret dd_api_key \
  --env DD_API_KEY="ENC[dd_api_key]" \
  --env DD_SECRET_BACKEND_TYPE="docker.secrets" \
  --env DD_SITE="datadoghq.com" \
  --env DD_HOSTNAME="dd-agent" \
  registry.datadoghq.com/agent:latest
```

El secreto `dd_api_key` se monta automáticamente en `/run/secrets/dd_api_key`, y el Agent lo lee utilizando el backend `docker.secrets`.

##### Ejemplo de Docker Compose {#docker-compose-example}

[Cree][6003] un `docker-compose.yml` con secretos basados en archivos:

```yaml
version: '3.8'

services:
  datadog:
    image: registry.datadoghq.com/agent:latest
    environment:
      - DD_API_KEY=ENC[dd_api_key]
      - DD_SECRET_BACKEND_TYPE=docker.secrets
      - DD_SITE=datadoghq.com
      - DD_HOSTNAME=dd-agent
    secrets:
      - dd_api_key

secrets:
  dd_api_key:
    file: ./secrets/api_key.txt
```

El archivo de secreto `./secrets/api_key.txt` se monta en `/run/secrets/dd_api_key` dentro del contenedor.


{{% /collapse-content %}}

{{% collapse-content title="Backends de secretos de archivos JSON, YAML o TEXTO" level="h5" expanded=false id="id-for-json-yaml-text" %}}

| valor de secret_backend_type                                 | Servicio de archivos                             |
|---------------------------------------------|-----------------------------------------|
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXTO][4003]                        |                            |

##### Permisos de archivo {#file-permissions}
El backend de archivos solo requiere permisos de **lectura** para los archivos JSON, YAML o TEXTO configurados. Estos permisos deben otorgarse al usuario local del Datadog Agent (`dd-agent` en Linux, `ddagentuser` en Windows).


{{< tabs >}}
{{% tab "Backend de archivos JSON" %}}

**Nota**: Solo se admite un nivel de profundidad de JSON (por ejemplo, `{"key": "value"}`)

##### Ejemplo de configuración {#configuration-example-6}

Puede usar un archivo JSON para almacenar secretos localmente.

Por ejemplo, con un archivo JSON en `/path/to/secret.json` que contiene lo siguiente:

```json
{
  "datadog_api_key": "your_api_key"
}
```

Puede usar esta configuración para extraer sus secretos:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "Backend de archivos YAML" %}}

**Nota**: Solo se admite un nivel de profundidad de YAML (por ejemplo, `key: value`)

##### Ejemplo de configuración {#configuration-example-7}

Puede usar un archivo YAML para almacenar secretos localmente.

Como ejemplo, si tenemos un archivo YAML en `/path/to/secret.yaml` que contiene:

```yaml
datadog_api_key: your api key
```

Puede usar la siguiente configuración para extraer secretos de él:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Backend de archivos TEXTO" %}}

*Disponible en la versión 7.75+ del Agent*

**Nota**: Cada secreto debe almacenarse en su propio archivo de texto individual.

##### Ejemplo de configuración {#configuration-example-8}

Puede usar archivos de texto individuales para almacenar secretos localmente.

Por ejemplo, con archivos de texto en `/path/to/secrets/`:

`/path/to/secrets/dd_api_key` que contiene:

```
your_api_key_value
```

`/path/to/secrets/dd_app_key` que contiene:

```
your_app_key_value
```

Puede usar esta configuración para extraer secretos de ellos:

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### Seguridad de la ruta: {#path-security}

- Las rutas relativas en `ENC[]` se resuelven en relación con `secrets_path` (por ejemplo, `ENC[dd_api_key]` con `secret_path: /path/to/secrets` se resolverá en `/path/to/secrets/dd_api_key`)
- Las rutas absolutas en `ENC[]` deben estar dentro de `secrets_path` (por ejemplo, `ENC[/path/to/secrets/dd_api_key]` con `secret_path: /path/to/secrets` funcionará)
- Los intentos de recorrido de ruta (por ejemplo, `ENC[../etc/passwd]`) se bloquean y fallarán con \"path outside allowed directory\"

**Nota:** Algunas herramientas agregan saltos de línea automáticamente al exportar secretos a archivos. Consulte [Eliminar saltos de línea finales](#remove-trailing-line-breaks) para saber cómo manejar esto.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Clave de registro de Windows" level="h4" expanded=false id="id-for-windows-regkey" %}}

**Disponible en la versión 7.82+ del Agent**

Se admiten los siguientes servicios de Windows:

| valor de secret_backend_type | Servicio |
|---------------------------|---------|
| `windows.regkey` | Registro de Windows |

##### Requisitos previos {#prerequisites-2}

Este backend solo es compatible con Windows. La clave de registro debe ser legible por la cuenta bajo la cual se ejecuta el Datadog Agent (de forma predeterminada `ddagentuser`). Las claves bajo `HKLM` son legibles por todos los usuarios locales de forma predeterminada. Datadog recomienda restringir la ACL para que solo `ddagentuser` y `SYSTEM` puedan leer la clave.

##### Ejemplo de configuración {#configuration-example-9}

Configure el Datadog Agent para usar el backend de Windows Registry Key con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: windows.regkey

api_key: 'ENC[SOFTWARE\Datadog\secrets:api_key]'
```

Haga referencia a los secretos usando el formato `ENC[<registry-path>:<value-name>]`, donde `registry-path` es la subruta debajo de la clave raíz y `value-name` es el valor del registro que se debe leer.

De forma predeterminada, la clave raíz es `HKLM`. Para usar un hive diferente, configure `root_key`. Solo se aceptan los siguientes valores (cualquier otro valor devuelve un error):

`HKLM`, `HKCU`, `HKCR`, `HKU`, `HKCC` (también se admiten formas largas como `HKEY_LOCAL_MACHINE`)

```yaml
secret_backend_type: windows.regkey
secret_backend_config:
  root_key: HKCU
```

##### Configure la clave de registro {#set-up-the-registry-key}

Este script de shell de PowerShell de ejemplo demuestra cómo configurar un registro (para ejecutarse como administrador después de la instalación):

```powershell
# Create the key and set the secret value
New-Item -Path "HKLM:\SOFTWARE\Datadog\secrets" -Force
Set-ItemProperty -Path "HKLM:\SOFTWARE\Datadog\secrets" -Name "api_key" -Value "<YOUR_API_KEY>"

# Restrict read access to ddagentuser and SYSTEM (recommended)
$acl = Get-Acl "HKLM:\SOFTWARE\Datadog\secrets"
$acl.SetAccessRuleProtection($true, $false)
$acl.SetAccessRule((New-Object System.Security.AccessControl.RegistryAccessRule -ArgumentList "SYSTEM", "ReadKey", "Allow"))
$acl.SetAccessRule((New-Object System.Security.AccessControl.RegistryAccessRule -ArgumentList "ddagentuser", "ReadKey", "Allow"))
$acl.SetAccessRule((New-Object System.Security.AccessControl.RegistryAccessRule -ArgumentList "Administrators", "FullControl", "Allow"))
Set-Acl "HKLM:\SOFTWARE\Datadog\secrets" $acl
```

{{% /collapse-content %}}

#### Múltiples backends {#multiple-backends}

*Disponible en la versión 7.80+ del Agent*

En lugar de un solo `secret_backend_type`, puede declarar múltiples backends con nombre bajo `multi_secret_backends`. Cada backend tiene su propio `type` y `config`, y los secretos se enrutan a un backend específico usando un prefijo `backendName;` en el identificador `ENC[]`.

Si se establece más de uno de los siguientes, la configuración de mayor prioridad entra en vigor y los demás se ignoran con una advertencia:

1. `secret_backend_command`
2. `secret_backend_type`
3. `multi_secret_backends`

##### Configuración {#configuration}

```yaml
# datadog.yaml

multi_secret_backends:
  <backend_name>:
    type: <backend_type>
    config:
      <KEY_1>: <VALUE_1>
```

Cada `<backend_name>` es un identificador arbitrario que usted elige. No puede contener un punto y coma, porque `;` es el delimitador utilizado en los identificadores `ENC[]`. Los campos `type` y `config` siguen el mismo esquema que `secret_backend_type` y `secret_backend_config` para el backend correspondiente.

##### `ENC[]` notación {#enc-notation}

Cuando `multi_secret_backends` está activo, anteponga a los identificadores `ENC[]` el nombre del backend seguido de un punto y coma:

```
ENC[<backend_name>;<secret_key>]
```

Solo el **primer** punto y coma se trata como el delimitador del backend. Las claves secretas que contienen puntos y coma (por ejemplo, `namespace/secret-name;key` al estilo de Kubernetes) siguen funcionando.

##### Ejemplo {#example}

La siguiente configuración lee secretos de dos backends de archivo simultáneamente:

```yaml
# datadog.yaml
multi_secret_backends:
  yaml_secrets:
    type: file.yaml
    config:
      file_path: /etc/datadog-agent/secrets.yaml
  aws_secrets:
    type: aws.secrets
    config:
      aws_session:
        aws_region: us-east-1
```

Haga referencia a los secretos anteponiendo el nombre del backend:

```yaml
# datadog.yaml
api_key: ENC[yaml_secrets;api_key]
app_key: ENC[aws_secrets;My-Secrets;appKey]
```

##### Migración desde `secret_backend_type` {#migrating-from-secret-backend-type}

Para cambiar de un solo `secret_backend_type` a `multi_secret_backends`:

1. Mueva `secret_backend_type` y `secret_backend_config` a una entrada con nombre bajo `multi_secret_backends`.
2. Elimine `secret_backend_type` y `secret_backend_config` del nivel superior.
3. Actualice todos los identificadores `ENC[secretKey]` a `ENC[backendName;secretKey]`.

```yaml
# Before
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /etc/datadog-agent/secrets.yaml

api_key: ENC[api_key]

# After
multi_secret_backends:
  my_yaml:
    type: file.yaml
    config:
      file_path: /etc/datadog-agent/secrets.yaml

api_key: ENC[my_yaml;api_key]
```

### Opción 2: Uso del script integrado para Kubernetes y Docker {#option-2-using-the-built-in-script-for-kubernetes-and-docker}

*Disponible en la versión 7.32+ del Agent*

Para entornos en contenedores, las imágenes de contenedor del Datadog Agent incluyen un script integrado `/readsecret_multiple_providers.sh`. Este script permite leer secretos desde:

* Archivos: usando `ENC[file@/path/to/file]`
* Secretos de Kubernetes: usando `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Para usar este ejecutable con el Datadog Operator, configúrelo de la siguiente manera:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
```
{{% /tab %}}
{{% tab "Helm" %}}

Para usar este ejecutable con el Helm chart, configúrelo de la siguiente manera:

```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Para usar este ejecutable, configure la variable de entorno `DD_SECRET_BACKEND_COMMAND` de la siguiente manera:

```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Ejemplo: Lectura desde archivos montados {#example-reading-from-mounted-files}

Kubernetes permite [exponer Secretos como archivos][2] dentro de un pod que el Agent puede leer para resolver secretos.

En Kubernetes, puede montar un Secreto como un volumen de esta manera:

```yaml
  containers:
    - name: agent
      #(...)
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secret-volume
  #(...)
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```

Luego puede hacer referencia al secreto de esta manera:

```
password: ENC[file@/etc/secret-volume/password]
```

**Notas**:
- El Secreto debe existir en el mismo espacio de nombres que el pod en el que se está montando.
- El script puede acceder a todas las subcarpetas, incluida la confidencial `/var/run/secrets/kubernetes.io/serviceaccount/token`. Por lo tanto, Datadog recomienda usar una carpeta dedicada en lugar de `/var/run/secrets`.

Los [secretos de Docker swarm][3] se montan en la carpeta `/run/secrets`. Por ejemplo, el secreto de Docker `db_prod_passsword` se encuentra en `/run/secrets/db_prod_password` en el contenedor del Agent. Esto se referenciaría en la configuración con `ENC[file@/run/secrets/db_prod_password]`.

#### Ejemplo: Lectura de un secreto de Kubernetes entre espacios de nombres {#example-reading-a-kubernetes-secret-across-namespaces}

Si desea que el Agent lea un Secreto de un espacio de nombres diferente, utilice el prefijo `k8s_secret@`. Por ejemplo:

```
password: ENC[k8s_secret@database/database-secret/password]
```

Configure RBAC para permitir que la Cuenta de Servicio del Agent lea el Secreto. El siguiente Rol otorga acceso de lectura al Secreto `database-secret` en el espacio de nombres `database`:
{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
      roles:
      - namespace: database
        secrets:
        - "database-secret"
```
***Nota***: Cada espacio de nombres en la lista de roles también debe configurarse en la variable de entorno `WATCH_NAMESPACE` o `DD_AGENT_WATCH_NAMESPACE` en el despliegue del Datadog Operator.
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  (...)
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
    roles:
      - namespace: database
        secrets:
          - database-secret
```
{{% /tab %}}
{{< /tabs >}}


Alternativamente, puede definir recursos RBAC directamente:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: database
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["database-secret"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-read-secrets
  namespace: database
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    apiGroup: ""
    namespace: default
roleRef:
  kind: Role
  name: datadog-secret-reader
  apiGroup: ""
```

Esto `Role` da acceso al `Secret: database-secret` en el `Namespace: database`. El `RoleBinding` vincula este permiso al `ServiceAccount: datadog-agent` en el `Namespace: default`. Esto debe agregarse manualmente a su clúster con respecto a sus recursos implementados.

### Opción 3: Crear un ejecutable personalizado {#option-3-creating-a-custom-executable}

Para recuperar secretos, el Agent utiliza un ejecutable externo que usted proporciona. El ejecutable se utiliza cuando se descubren nuevos secretos y se almacenan en caché durante el ciclo de vida del Agent. Si necesita actualizar o rotar un secreto, debe reiniciar el Agent para volver a cargarlo.

Esto le permite usar cualquier solución de gestión de secretos y le da control total sobre cómo el Agent accede a los secretos.

El Agent envía a este ejecutable una carga útil JSON a través de la entrada estándar que contiene una lista de identificadores de secretos para resolver. Luego, su ejecutable obtiene cada secreto y los devuelve en un formato JSON a través de una salida estándar.

El siguiente ejemplo muestra lo que el Agent envía a su ejecutable en STDIN:

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (cadena): La versión del formato.
* `secrets` (lista de cadenas): Cada cadena es un identificador para un secreto que se debe obtener.


El ejecutable responde a través de la siguiente salida STDOUT:

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (cadena): El valor del secreto que se utilizará en las configuraciones. Esto puede ser `null` en caso de un error.
* `error` (cadena): Un mensaje de error o `null`.

Si un secreto no se resuelve (ya sea devolviendo un código de salida distinto de cero o un error no nulo), la configuración relacionada es ignorada por el Agent.

**Nunca muestre información confidencial en `stderr`**. Si el binario sale con un código de estado diferente a `0`, el Agent registra la salida de error estándar de su ejecutable para la resolución de problemas.

También puede crear su propio ejecutable de recuperación de secretos usando cualquier lenguaje. El único requisito es que siga el formato de entrada/salida descrito anteriormente.

Aquí hay un ejemplo en Go que devuelve secretos ficticios:

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "Could not read from stdin: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "could not serialize res: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

Esto transforma su configuración:

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

En lo siguiente en memoria:

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Puede configurar el Agent para usar el binario para resolver secretos añadiendo lo siguiente:

```
secret_backend_command: /path/to/binary
```

## Requisitos de seguridad del Agent {#agent-security-requirements}

El Agent ejecuta el ejecutable proporcionado como un subproceso. Los patrones de ejecución difieren en Linux y Windows.

{{< tabs >}}
{{% tab "Linux" %}}

En Linux, su ejecutable debe:

* Pertenecer al mismo usuario que ejecuta el Agent (`dd-agent` por defecto, o `root` dentro de un contenedor).
* No tener derechos de `group` o `other`.
* Tener al menos el derecho de **ejecución** para el propietario.

{{% /tab %}}
{{% tab "Windows" %}}

En Windows, su ejecutable debe:

* Tener **lectura** o **ejecución** para `ddagentuser` (el usuario utilizado para ejecutar el Agent).
* No tener derechos para ningún usuario o grupo, excepto para el grupo **Administradores**, la cuenta integrada **Sistema local**, o el contexto de usuario del Agent (`ddagentuser` de forma predeterminada).
* Ser una aplicación Win32 válida para que el Agent pueda ejecutarla (por ejemplo, un script de PowerShell o Python no funciona).

{{% /tab %}}
{{< /tabs >}}

**Nota**: Su ejecutable comparte las mismas variables de entorno que el Agent.

## Actualizando secretos en tiempo de ejecución {#refreshing-secrets-at-runtime}

*Disponible en la versión 7.67+ del Agent*

Puede configurar el Agent para actualizar los secretos resueltos sin necesidad de un reinicio.

Establezca un intervalo de actualización:

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

O bien, active una actualización manualmente:

```shell
datadog-agent secret refresh
```

### Actualización de clave de API/APP {#apiapp-key-refresh}
Las claves de API/APP obtenidas como secretos admiten la actualización en tiempo de ejecución.

Puede habilitar esto configurando `secret_refresh_interval` (en segundos) en `datadog.yaml`:

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

De forma predeterminada, el Agent aleatoriza la actualización inicial dentro de la ventana de `secret_refresh_interval` para evitar que un conjunto de
Agents se actualicen simultáneamente. La clave se resuelve al inicio, luego se actualiza una vez dentro del primer intervalo
y cada intervalo posterior.

Para evitar el tiempo de inactividad, invalide las claves antiguas solo después de que todo su conjunto haya obtenido las claves actualizadas. Puede realizar un seguimiento del uso de la clave
en la página de [Gestión de flota](https://app.datadoghq.com/fleet).

Puede deshabilitar este comportamiento configurando:

```yaml
secret_refresh_scatter: false
```

### Actualización de secretos de la verificación de Autodiscovery {#autodiscovery-check-secrets-refresh}
*Disponible en la versión 7.76+ del Agent*

Las verificaciones programadas de [Autodiscovery][1] pueden actualizar los secretos en tiempo de ejecución si la plantilla utiliza la sintaxis `ENC[]`.

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"ENC[<secret_handle>]"
          }
        ]
      }
    }
```

El Agent puede entonces activar la actualización de secretos ya sea en el intervalo establecido en `secret_refresh_interval` o manualmente con `datadog-agent secret refresh`.

### Actualización automática de secretos ante fallas/invalidación de clave de API {#automatic-secrets-refresh-on-api-key-failure-invalidation}

*Disponible en la versión 7.74+ de Agent*

El Agent puede actualizar automáticamente los secretos cuando detecta una clave de API no válida. Esto sucede cuando el Agent recibe una respuesta 403 Prohibido de Datadog o cuando la verificación de estado periódica detecta una clave de API no válida o caducada.

Para habilitar esta función, establezca `secret_refresh_on_api_key_failure_interval` en un intervalo en minutos en su archivo `datadog.yaml`. Establezca en `0` para deshabilitar (predeterminado).

Este intervalo es la cantidad mínima de tiempo entre 2 actualizaciones para evitar enviar spam a su solución de gestión de secretos cuando se detecta una clave de API no válida.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Esta configuración es compatible con `secret_refresh_interval`.

### Habilitación de la actualización del recopilador DDOT {#enabling-ddot-collector-refresh}
Si está utilizando [DDOT collector][6] y desea habilitar la actualización de API/APP, debe agregar la siguiente configuración adicional a su archivo `datadog.yaml`:

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Esto garantiza que el DDOT collector permanezca sincronizado con el Agent después de que se actualicen los secretos. De manera similar a como el Agent verifica periódicamente su estado de configuración, el DDOT collector utiliza esta configuración para verificar regularmente si hay valores actualizados del Agent.

## Solución de problemas {#troubleshooting}

### Lista de secretos detectados {#listing-detected-secrets}

El comando `secret` en la CLI del Agent muestra cualquier error relacionado con su configuración. Por ejemplo, si los derechos sobre el ejecutable son incorrectos. También lista todos los identificadores encontrados y dónde están ubicados.

En Linux, el comando muestra el modo de archivo, el propietario y el grupo del ejecutable. En Windows, se enumeran los derechos de ACL.

{{< tabs >}}
{{% tab "Linux" %}}

Ejemplo en Linux:

```sh
datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

{{% /tab %}}
{{% tab "Windows" %}}

Ejemplo en Windows (desde un PowerShell de administrador):

```powershell
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Ver configuraciones después de que se inyectaron los secretos {#seeing-configurations-after-secrets-were-injected}

Para ver rápidamente cómo se resuelven las configuraciones de la verificación, puede usar el comando `configcheck`:

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <obfuscated_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <obfuscated_password2>
~
===
```

**Nota**: El Agent debe [reiniciarse][7] para detectar cambios en los archivos de configuración.

### Depuración de su secret_backend_command {#debugging-your-secret-backend-command}

Para probar o depurar fuera del Agent, puede imitar cómo lo ejecuta el Agent:

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

El usuario `dd-agent` se crea cuando instala el Datadog Agent.

{{% /tab %}}
{{% tab "Windows" %}}

##### Errores relacionados con permisos{#rights-related-errors}

Los siguientes errores indican que falta algo en su configuración.

1. Si cualquier otro grupo o usuario distinto al necesario tiene derechos sobre el ejecutable, se registra un error similar al siguiente:
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` no tiene derechos de lectura y ejecución sobre el archivo, se registra un error similar:
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Su ejecutable debe ser una aplicación Win32 válida. Si no es así, se registra el siguiente error:
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog tiene un [script de PowerShell][9] para ayudarle a establecer el permiso correcto en su ejecutable. Ejemplo de cómo usarlo:

```powershell
.\Set-SecretPermissions.ps1 -SecretBinaryPath C:\secrets\decrypt_secrets.exe
ddagentuser SID: S-1-5-21-3139760116-144564943-2741514060-1076
=== Checking executable permissions ===
Executable path: C:\secrets\decrypt_secrets.exe
Executable permissions: OK, the executable has the correct permissions

Permissions Detail:

stdout:
Path   : Microsoft.PowerShell.Core\FileSystem::C:\secrets\decrypt_secrets.exe
Owner  : BUILTIN\Administrators
Group  : BUILTIN\Administrators
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         DESKTOP-V03BB2P\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:BAD:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-3139760116-144564943-2741514
         060-1076)
stderr:


=== Secrets stats ===
Number of secrets resolved: 0
Secrets handle resolved:
```

##### Probando su ejecutable {#testing-your-executable}

Su ejecutable es ejecutado por el Agent al recuperar sus secretos. El Datadog Agent se ejecuta usando el `ddagentuser`. Este usuario no tiene derechos específicos, pero es parte del grupo `Performance Monitor Users`. La contraseña de este usuario se genera aleatoriamente al momento de la instalación y nunca se guarda en ninguna parte.

Esto significa que su ejecutable podría funcionar con su usuario predeterminado o de desarrollo, pero no cuando lo ejecuta el Agent, ya que `ddagentuser` tiene derechos más restringidos.

Para probar su ejecutable en las mismas condiciones que el Agent, actualice la contraseña del `ddagentuser` en su equipo de desarrollo. De esta manera, puede autenticarse como `ddagentuser` y ejecutar su ejecutable en el mismo contexto que lo haría el Agent.

Para hacerlo, siga estos pasos:

1. Elimine `ddagentuser` de la lista `Local Policies/User Rights Assignement/Deny Log on locally` en el `Local Security Policy`.
2. Establezca una nueva contraseña para `ddagentuser` (ya que la generada durante la instalación nunca se guarda en ninguna parte). En PowerShell, ejecute:
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Actualice la contraseña que utilizará el servicio `DatadogAgent` en el Administrador de control de servicios. En PowerShell, ejecute:
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Ahora puede iniciar sesión como `ddagentuser` para probar su ejecutable. Datadog tiene un [script de Powershell][10] para ayudarle a probar el
ejecutable como otro usuario. Cambia los contextos de usuario y simula cómo el Agent ejecuta su ejecutable.

Ejemplo de cómo usarlo:

```powershell
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```

[9]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/Set-SecretPermissions.ps1
[10]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/secrets_tester.ps1
{{% /tab %}}
{{< /tabs >}}

### El Agent se niega a iniciarse {#agent-refusing-to-start}

Lo primero que hace el Agent al iniciarse es cargar `datadog.yaml` y descifrar cualquier secreto que contenga. Esto se realiza antes de configurar el registro. Esto significa que en plataformas como Windows, los errores que ocurren al cargar `datadog.yaml` no se escriben en los registros, sino en `stderr`. Esto puede ocurrir cuando el ejecutable proporcionado al Agent para los secretos devuelve un error.

Si tiene secretos en `datadog.yaml` y el Agent se niega a iniciarse:

* Intente iniciar el Agent manualmente para poder ver `stderr`.
* Elimine los secretos de `datadog.yaml` y pruebe primero con secretos en un archivo de configuración de verificación.

### Prueba de permisos de Kubernetes {#testing-kubernetes-permissions}
Al leer secretos directamente desde Kubernetes, puede verificar sus permisos con el comando `kubectl auth`. La forma general de esto es:

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considere el [ejemplo de secretos de Kubernetes](#example-reading-a-kubernetes-secret-across-namespaces) anterior, donde el secreto `Secret:database-secret` existe en el `Namespace: database` y la cuenta de servicio `ServiceAccount:datadog-agent` existe en el `Namespace: default`.

En este caso, utilice el siguiente comando:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Este comando devuelve si los permisos son válidos para que el Agent pueda visualizar este secreto.

### Eliminar saltos de línea finales {#remove-trailing-line-breaks}

Algunas herramientas de gestión de secretos añaden automáticamente un salto de línea al exportar secretos a través de archivos. Puede eliminar estos saltos de línea configurando `secret_backend_remove_trailing_line_break: true` en [el archivo de configuración datadog.yaml][8], o utilizar la variable de entorno `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` para hacer lo mismo, especialmente en entornos en contenedores.

### Variables de Autodiscovery en manejadores de secretos {#autodiscovery-variables-in-secret-handles}

También es posible utilizar variables de [Autodiscovery][1] en los manejadores de secretos. El Agent resuelve estas variables antes de resolver el secreto. Por ejemplo:

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /es/opentelemetry/setup/ddot_collector/
[7]: /es/agent/configuration/agent-commands/#restart-the-agent
[8]: /es/agent/configuration/agent-configuration-files/
<!-- Links in tabs are scoped inside shortcodes, collapse-content links are not scoped -->
<!-- AWS Secrets Manager and SSM Links -->
[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[1007]: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html

<!-- Azure KeyVault Links -->
[2000]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal
[2001]: https://learn.microsoft.com/en-us/azure/developer/go/azure-sdk-authentication

<!-- HashiCorp Vault Links -->
[3000]: https://learn.hashicorp.com/tutorials/vault/static-secrets
[3001]: https://developer.hashicorp.com/
[3003]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[3004]: https://developer.hashicorp.com/vault/docs/auth/aws#iam-authentication-inferences

<!-- File Backend Links (JSON/YAML) -->
[4001]: https://en.wikipedia.org/wiki/JSON
[4002]: https://en.wikipedia.org/wiki/YAML
[4003]: https://en.wikipedia.org/wiki/TEXT

<!-- GCP Secret Manager Links -->
[5000]: https://cloud.google.com/security/products/secret-manager
[5001]: https://cloud.google.com/docs/authentication/application-default-credentials
[5002]: https://docs.cloud.google.com/secret-manager/docs/access-control
[5003]: https://docs.cloud.google.com/secret-manager/docs/accessing-the-api

<!-- Docker Secrets Links -->
[6001]: https://docs.docker.com/engine/swarm/secrets/
[6002]: https://docs.docker.com/engine/swarm/secrets/#how-docker-manages-secrets
[6003]: https://docs.docker.com/compose/how-tos/use-secrets/

<!-- Kubernetes Secrets Links -->
[7000]: https://kubernetes.io/docs/concepts/configuration/secret/