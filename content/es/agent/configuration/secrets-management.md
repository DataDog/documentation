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
  tag: Documentation
  text: Autodiscovery
title: Gestión de Secretos
---
## Resumen

El Agente de Datadog te ayuda a gestionar tus secretos de manera segura integrándose con las siguientes soluciones de gestión de secretos:
- [AWS Secrets Manager](#id-for-secrets)
- [AWS SSM](#id-for-ssm)
- [Azure KeyVault](#id-for-azure)
- [GCP Secret Manager](#id-for-gcp)
- [HashiCorp Vault](#id-for-hashicorp)
- [Kubernetes Secrets](#id-for-kubernetes)
- [Docker Secrets](#id-for-docker)
- [Archivo de Texto](#id-for-json-yaml-text)
- [Archivo JSON](#id-for-json-yaml-text)
- [Archivo YAML](#id-for-json-yaml-text)

En lugar de codificar valores sensibles como claves API o contraseñas en texto plano dentro de archivos de configuración, el Agente puede recuperarlos dinámicamente en tiempo de ejecución. Para hacer referencia a un secreto en tu configuración, utiliza la notación `ENC[<secret_id>]`. El secreto se recupera y se carga en memoria, pero nunca se escribe en disco ni se envía al backend de Datadog.

**Nota**: No puedes usar la sintaxis `ENC[]` en configuraciones `secret_*` como `secret_backend_command`.

## Opciones para recuperar secretos

### Opción 1: Usar soporte nativo del Agente para obtener secretos

**Nota**: A partir de la versión `7.76` del Agente y en adelante, la gestión nativa de secretos está disponible para Agentes habilitados para FIPS.

A partir de la versión `7.70` del Agente, el Agente de Datadog soporta nativamente varias soluciones de gestión de secretos. Se han introducido dos nuevas configuraciones en `datadog.yaml`: `secret_backend_type` y `secret_backend_config`.

`secret_backend_type` se utiliza para especificar qué solución de gestión de secretos usar, y `secret_backend_config` contiene configuración adicional relevante para esa solución.

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**Nota**: Si está ejecutando Datadog en un entorno contenedorizado, el [Agente de Clúster](/containers/cluster_agent/) requiere el Agente 7.77 o posterior para soportar la obtención nativa de secretos. Para versiones anteriores, use [Opción 2](#option-2-using-the-built-in-script-for-kubernetes-and-docker) o [Opción 3](#option-3-creating-a-custom-executable) en su lugar.

Instrucciones de configuración más específicas dependen del tipo de backend utilizado. Consulte la sección correspondiente a continuación para más información:


{{% collapse-content title="Secretos de AWS" level="h4" expanded=false id="id-for-secrets" %}}
Los siguientes servicios de AWS son compatibles:

|valor de secret_backend_type                                | Servicio de AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### Configurar un perfil de instancia

Datadog recomienda usar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS maneja todas las variables de entorno y perfiles de sesión por usted. Más instrucciones sobre cómo hacer esto se pueden encontrar en la [documentación oficial de AWS Secrets Manager][1000].

##### Ejemplo de configuración

{{< tabs >}}
{{% tab "Archivo YAML del Agente" %}}

Configura el Agente de Datadog para usar AWS Secrets para resolver secretos utilizando la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Al usar variables de entorno, convierte la configuración a JSON de la siguiente manera:

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Después de configurar el Agente para usar AWS Secrets, puedes referenciar cualquier secreto en tus configuraciones con `ENC[secretId;secretKey]`.

La notación ENC se compone de:
* `secretId`: ya sea el "nombre amigable" del secreto (por ejemplo, `/DatadogAgent/Production`) o el ARN (por ejemplo, `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`).
  - **Nota**: Se requiere el formato completo del ARN al acceder a secretos de una cuenta diferente donde se define la credencial de AWS o la credencial `sts:AssumeRole`.
* `secretKey`: la clave JSON del secreto de AWS que deseas usar.


El Administrador de Secretos de AWS puede almacenar múltiples pares clave-valor dentro de un solo secreto. Una configuración de backend que utiliza el Administrador de Secretos tiene acceso a todas las claves definidas en un secreto.

Por ejemplo, asumiendo que el ID del secreto `My-Secrets` contiene los siguientes 3 valores:

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

El siguiente es un ejemplo completo del archivo de configuración `datadog.yaml` utilizando AWS Secrets para obtener su clave API de `My-Secrets`:

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

Configura el Agente de Datadog para usar AWS Secrets para resolver secretos en Helm utilizando la siguiente configuración:

##### Verificación de integración

```sh
datadog:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
```

<div class="alert alert-info"> Debes incluir <code>serviceAccountAnnotations</code> para otorgar al Agente permisos para acceder al secreto de AWS. </div>

<br>


##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados

```sh
datadog:
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

##### Verificación de clúster: con ejecutores de verificación de clúster habilitados

```sh
datadog:
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>

```

{{% /tab %}}

{{% tab "Operador" %}}

Configura el Agente de Datadog para usar AWS Secrets para resolver secretos con el Operador de Datadog utilizando la siguiente configuración:

##### Verificación de integración


```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    nodeAgent:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

<div class="alert alert-info"> Debes incluir <code>serviceAccountAnnotations</code> para otorgar al Agente permisos para acceder al secreto de AWS. </div>

<br>


##### Verificación de clúster: sin ejecutores de verificación de clúster habilitados

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    nodeAgent:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

##### Verificación de clúster: con ejecutores de verificación de clúster habilitados

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
spec:
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    [...]
    clusterChecksRunner:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
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

{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="AWS SSM" level="h4" expanded=false id="id-for-ssm" %}}
Los siguientes servicios de AWS son compatibles:

|valor de secret_backend_type                                | Servicio de AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### Configurar un perfil de instancia

Datadog recomienda usar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS maneja todas las variables de entorno y perfiles de sesión por usted. Más instrucciones sobre cómo hacer esto se pueden encontrar en la documentación oficial de [AWS Secrets Manager][1001].

##### Ejemplo de configuración

El AWS System Manager Parameter Store soporta un modelo jerárquico. Por ejemplo, asumiendo las siguientes rutas del AWS System Manager Parameter Store:

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

{{% /collapse-content %}}


{{% collapse-content title="Azure Keyvault Backend" level="h4" expanded=false id="id-for-azure" %}}


Los siguientes servicios de Azure son compatibles:

| secret_backend_type value                            | Servicio de Azure          |
| ----------------------------------------|------------------------|
| `azure.keyvault` | [Azure Keyvault][2000] |

##### Autenticación de Azure

Datadog recomienda usar Identidades Administradas para autenticarte con Azure. Esto te permite asociar recursos en la nube con cuentas de AMI y elimina la necesidad de poner información sensible en tu archivo de configuración `datadog.yaml`.

##### Identidad administrada

Para acceder a tu Key Vault, crea una Identidad Administrada y asígnala a tu Máquina Virtual. Luego, configura la asignación de rol apropiada en el Key Vault para permitir que esa identidad acceda a sus secretos.

##### Ejemplo de configuración

La configuración del backend para los secretos de Azure Key Vault está estructurada como YAML siguiendo este esquema:

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

El secreto del backend se referencia en tu archivo de configuración del Agente de Datadog con `ENC[ ]`. El siguiente es un ejemplo donde se necesita recuperar un secreto de texto plano:

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h4" expanded=false id="id-for-gcp" %}}

**Disponible en la versión 7.74+ del Agente**

Los siguientes servicios de GCP son compatibles:

| valor de secret_backend_type                               | Servicio de GCP                    |
| ------------------------------------------------------- | ------------------------------ |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### Autenticación y política de acceso de GCP

La implementación de GCP Secret Manager utiliza [Credenciales Predeterminadas de Aplicación (ADC)][5001] para la autenticación con Google.

Para interactuar con GCP Secret Manager, la cuenta de servicio utilizada por el Agente de Datadog (como la cuenta de servicio de la VM, una identidad de carga de trabajo o credenciales activadas localmente) requiere el permiso `secretmanager.versions.access`.

Esto se puede otorgar con el rol predefinido **Acceso a Secretos del Administrador de Secretos** (`roles/secretmanager.secretAccessor`) o un rol personalizado con [acceso][5002] equivalente.

En entornos de GCE o GKE, ADC se configura automáticamente a través de la cuenta de servicio adjunta a la instancia o pod. La cuenta de servicio adjunta necesita tener los roles adecuados para acceder a GCP Secret Manager. Además, el entorno de GCE o GKE requiere el `cloud-platform` [alcance de acceso OAuth][5003].

##### Ejemplo de configuración de GCP

Configura el Agente de Datadog para usar GCP Secret Manager para resolver secretos con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Después de configurar el Agente para usar GCP Secret Manager, referencia los secretos en tus configuraciones con `ENC[secret-name]` o `ENC[secret-name;key;version;]`.

La notación ENC se compone de:

- `secret`: el nombre del secreto en GCP Secret Manager (por ejemplo, `datadog-api-key`).
- `key`: (opcional) la clave para extraer de un secreto en formato JSON. Si estás utilizando secretos en texto plano, puedes omitir esto (ejemplo: `ENC[secret-name;;version]`).
- `version`: (opcional) el número de versión del secreto. Si no se especifica, se utiliza la versión `latest`.
  Ejemplos de sintaxis de versión +:
    - `secret-key` - Versión implícita `latest`
    - `secret-key;;latest` - Versión explícita `latest`
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

Para secretos en formato JSON, suponiendo que un secreto llamado `datadog-keys` contiene:

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

Referencia claves específicas así:

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

##### Versionado de secretos

GCP Secret Manager soporta versiones de secretos. La implementación del Agente también soporta el versionado de secretos utilizando el delimitador `;`. Si no se especifica una versión, se utiliza la versión `latest`.


##### Soporte para secretos en JSON

El Agente de Datadog soporta la extracción de claves específicas de secretos en formato JSON utilizando el delimitador `;`:

- `datadog;api_key` - Extrae el campo `api_key` del secreto `datadog` con una versión implícita `latest`
- `datadog;api_key;1` - Extrae el campo `api_key` del secreto `datadog` de la versión `1`

{{% /collapse-content %}}


{{% collapse-content title="Backend de HashiCorp Vault" level="h4" expanded=false id="id-for-hashicorp" %}}

Los siguientes servicios de HashiCorp son compatibles:

| valor del tipo de backend secreto                               | Servicio de HashiCorp                                  |
| ------------------------------------------ | -------------------------------------------------- |
| `hashicorp.vault` | [HashiCorp Vault (Versiones del Motor de Secretos 1 y 2)][3000] |

##### Cómo configurar HashiCorp Vault
1. Ejecuta tu HashiCorp Vault. Consulta la [documentación oficial de HashiCorp Vault][3001] para más información.
2. Escribe una política que otorgue el permiso para extraer secretos de tu bóveda. Crea un `*.hcl` archivo e incluye el siguiente permiso si usas la Versión 1 del Motor de Secretos:

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si usas la Versión 2 del Motor de Secretos, entonces se necesitan los siguientes permisos:

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
3. Ejecutar `vault policy write <policy_name> <path_to_*.hcl_file>`

4. Elige el método de autenticación para tu bóveda. Si usas el método de perfil de instancia de AWS, ejecuta `vault auth enable aws`.

##### Instrucciones del perfil de instancia de AWS

Datadog recomienda que te autentiques usando el [método de perfil de instancia][3003] si estás ejecutando tu HashiCorp Vault desde una máquina conectada a AWS.

Después de que esto se haya configurado, escribe una [política de bóveda específica de autenticación][3004].

##### Ejemplo de configuración

En el siguiente ejemplo, asume que el prefijo de la ruta secreta de HashiCorp Vault es `/Datadog/Production` con una clave de parámetro de `apikey`:

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

El siguiente ejemplo obtiene el valor de la clave API de HashiCorp Vault aprovechando AWS para la autenticación.

```yaml
# datadog.yaml
api_key: "ENC[/Datadog/Production;apikey]"

secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_session:
    vault_auth_type: aws
    vault_aws_role: Name-of-IAM-role-attached-to-machine
    aws_region: us-east-1 // this field is optional, and will default to us-east-1 if not set
```

{{% /collapse-content %}}

{{% collapse-content title="Secretos de Kubernetes" level="h4" expanded=false id="id-for-kubernetes" %}}

**Disponible en la versión 7.75+ del Agente**

Los siguientes servicios de Kubernetes son compatibles:

| valor del tipo de backend secreto | Servicio |
|---------------------------|---------|
| `k8s.secrets` | [Secretos de Kubernetes][7000] |

##### Requisitos previos

El backend de secretos de Kubernetes requiere:
- **Credenciales de ServiceAccount**: Por defecto, utiliza tokens de ServiceAccount montados automáticamente (`automountServiceAccountToken: true`, ver [documentación de Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting)). Se pueden configurar rutas personalizadas si es necesario.
- **Permisos de RBAC**: La ServiceAccount del Agente debe tener permisos para leer secretos de los namespaces de destino
- **Acceso a la red**: El pod del Agente debe poder alcanzar el servidor API de Kubernetes

##### Configuración de RBAC

Para cada namespace que contenga secretos, crea un `Role` y `RoleBinding` utilizando el siguiente ejemplo con el nombre de namespace correcto:

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

##### Ejemplo de configuración

{{< tabs >}}
{{% tab "Archivo YAML del Agente" %}}

Configura el Agente de Datadog para usar Secretos de Kubernetes con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

El formato de notación ENC es `namespace/secret-name;key`:
- `namespace`: El namespace de Kubernetes que contiene el secreto
- `secret-name`: El nombre del recurso Secret
- `key`: La clave específica a extraer del campo de datos del Secret

**Ejemplo:** Dado un Secret en el namespace `secrets-ns`:

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

Puedes hacer referencia a claves individuales:

```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**Soporte para múltiples namespaces:**
Cada referencia de secreto puede especificar un namespace diferente (RBAC debe ser configurado para cada uno):

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Configura el Agente de Datadog para usar Secrets de Kubernetes con Helm:

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

**Nota:** Se requiere un marcador de posición `apiKey` para la validación del gráfico de Helm al usar el backend de secretos para resolver la clave API. La variable de entorno `DD_API_KEY` la anula. Debes crear manualmente RBAC (Rol + RoleBinding) para cada namespace que contenga secretos. Para más información, consulta la sección de [configuración de RBAC](#rbac-setup).

<div class="alert alert-info"> Helm no tiene configuración nativa de <code>secretBackend.type</code>. Usa variables de entorno. </div>

{{% /tab %}}

{{% tab "Operador" %}}

Configura el Agente de Datadog para usar Secrets de Kubernetes con el Operador de Datadog:

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

**Nota:** Un marcador de posición de clave API satisface la validación del Operador al usar el backend de secretos para resolver la clave API. La variable de entorno `DD_API_KEY` la anula. Debes crear manualmente RBAC (Rol + RoleBinding) para cada namespace que contenga secretos. Para más información, consulta la sección de [configuración de RBAC](#rbac-setup).

<div class="alert alert-info"> El Operador no tiene configuración nativa de <code>secretBackend.type</code>. Usa variables de entorno en <code>override.nodeAgent.env</code>. </div>

{{% /tab %}}
{{< /tabs >}}

##### Configuración de ruta personalizada
Si tu configuración no sigue las ubicaciones predeterminadas para la autenticación basada en ServiceAccount, puedes especificar `token_path` y `ca_path` en su lugar.

{{< tabs >}}
{{% tab "YAML del Agente" %}}

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
{{% /tab %}}
{{< /tabs >}}

##### Configuración personalizada del servidor API

Si tu configuración no expone las variables de entorno predeterminadas `KUBERNETES_SERVICE_HOST` y `KUBERNETES_SERVICE_PORT`, puedes proporcionar una `api_server` URL para interactuar con la API REST de Kubernetes.

{{< tabs >}}
{{% tab "YAML del Agente" %}}

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
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Secretos de Docker" level="h4" expanded=false id="id-for-docker" %}}

**Disponible en la versión 7.75+ del Agente**

Los siguientes servicios de Docker son compatibles:

| valor del tipo de backend secreto | Servicio |
|---------------------------|---------|
| `docker.secrets` | [Secretos de Docker][6001] |

##### Requisitos previos

El backend de secretos de Docker admite tanto [secretos de Docker Swarm][6002] como [secretos de Docker Compose][6003]. Por defecto, tanto Swarm como Compose montan automáticamente los secretos dentro del contenedor como archivos en `/run/secrets` (Linux) o `C:\ProgramData\Docker\secrets` (Windows).

**Nota**: Los secretos de Compose pueden ser basados en archivos (apuntando a archivos locales) o externos (referenciando secretos existentes de Swarm).

##### Ejemplo de configuración

Configura el Agente de Datadog para usar secretos de Docker con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

El formato de notación ENC es el nombre del secreto, que corresponde al nombre del archivo en `/run/secrets/`:
- `ENC[api_key]` lee desde `/run/secrets/api_key` (Linux) o `C:\ProgramData\Docker\secrets\api_key` (Windows)

**Ruta personalizada de secretos:**
Si Docker Swarm o Compose están configurados para montar secretos en una ubicación diferente, puedes especificarlo así:

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Ejemplo de Docker Swarm

[Crear][6002] y usar un secreto de Docker Swarm:

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
  datadog/agent:latest
```

El secreto `dd_api_key` se monta automáticamente en `/run/secrets/dd_api_key`, y el Agente lo lee usando el backend `docker.secrets`.

##### Ejemplo de Docker Compose

[Crear][6003] un `docker-compose.yml` con secretos basados en archivos:

```yaml
version: '3.8'

services:
  datadog:
    image: datadog/agent:latest
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

El archivo secreto `./secrets/api_key.txt` se monta en `/run/secrets/dd_api_key` dentro del contenedor.


{{% /collapse-content %}}

{{% collapse-content title="Backends de secretos de archivo JSON, YAML o TEXT" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| valor secret_backend_type                                 | Servicio de Archivo                             |
|---------------------------------------------|-----------------------------------------|
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXTO][4003]                        |                            |

##### Permisos de archivo
El backend de archivo solo requiere permisos de **lectura** para los archivos JSON, YAML o TEXT configurados. Estos permisos deben ser otorgados al usuario local del Agente de Datadog (`dd-agent` en Linux, `ddagentuser` en Windows).


{{< tabs >}}
{{% tab "Backend de archivo JSON" %}}

**Nota**: Solo se admite un nivel de profundidad de JSON (por ejemplo, `{"key": "value"}`)

##### Ejemplo de configuración

Puedes usar un archivo JSON para almacenar secretos localmente.

Por ejemplo, con un archivo JSON en `/path/to/secret.json` que contenga lo siguiente:

```json
{
  "datadog_api_key": "your_api_key"
}
```

Puedes usar esta configuración para obtener sus secretos:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "Backend de archivo YAML" %}}

**Nota**: Solo se admite un nivel de profundidad de YAML (por ejemplo, `key: value`)

##### Ejemplo de configuración

Puedes usar un archivo YAML para almacenar secretos localmente.

Como ejemplo, si tenemos un archivo YAML en `/path/to/secret.yaml` que contenga:

```yaml
datadog_api_key: your api key
```

Puedes usar la siguiente configuración para obtener secretos de él:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Backend de archivo TEXT" %}}

**Disponible en la versión 7.75+ del Agente**

**Nota**: Cada secreto debe ser almacenado en su propio archivo de texto individual.

##### Ejemplo de configuración

Puedes usar archivos de texto individuales para almacenar secretos localmente.

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

##### Seguridad de la ruta:

- Las rutas relativas en `ENC[]` se resuelven en relación con `secrets_path` (por ejemplo, `ENC[dd_api_key]` con `secret_path: /path/to/secrets` se resolverá a `/path/to/secrets/dd_api_key`)
- Las rutas absolutas en `ENC[]` deben estar dentro de `secrets_path` (por ejemplo, `ENC[/path/to/secrets/dd_api_key]` con `secret_path: /path/to/secrets` funcionará)
- Los intentos de recorrido de ruta (por ejemplo, `ENC[../etc/passwd]`) están bloqueados y fallarán con "ruta fuera del directorio permitido"

**Nota:** Algunas herramientas agregan automáticamente saltos de línea al exportar secretos a archivos. Vea [Eliminar saltos de línea finales](#remove-trailing-line-breaks) para saber cómo manejar esto.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### Opción 2: Usando el Script incorporado para Kubernetes y Docker

Para entornos en contenedores, las imágenes de contenedor del Agente de Datadog incluyen un script incorporado `/readsecret_multiple_providers.sh` a partir de la versión v7.32.0. Este script admite la lectura de secretos desde:

* Archivos: usando `ENC[file@/path/to/file]`
* Secretos de Kubernetes: usando `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

Para usar este ejecutable con el Operador de Datadog, configúrelo de la siguiente manera:

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

Para usar este ejecutable con el gráfico de Helm, configúrelo de la siguiente manera:

```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Para usar este ejecutable, establezca la variable de entorno `DD_SECRET_BACKEND_COMMAND` de la siguiente manera:

```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Ejemplo: Leyendo desde archivos montados

Kubernetes admite [exponer secretos como archivos][2] dentro de un pod que el Agente puede leer para resolver secretos.

En Kubernetes, puede montar un secreto como un volumen de esta manera:

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

Puedes referenciar el secreto de esta manera:

```
password: ENC[file@/etc/secret-volume/password]
```

**Notas**:
- El secreto debe existir en el mismo espacio de nombres que el pod en el que se está montando.
- El script puede acceder a todas las subcarpetas, incluyendo el `/var/run/secrets/kubernetes.io/serviceaccount/token` sensible. Por lo tanto, Datadog recomienda usar una carpeta dedicada en lugar de `/var/run/secrets`.

[Los secretos de Docker swarm][3] se montan en la carpeta `/run/secrets`. Por ejemplo, el secreto de Docker `db_prod_passsword` se encuentra en `/run/secrets/db_prod_password` en el contenedor del Agente. Esto se referenciaría en la configuración con `ENC[file@/run/secrets/db_prod_password]`.

#### Ejemplo: Leer un secreto de Kubernetes a través de espacios de nombres

Si deseas que el Agente lea un secreto de un espacio de nombres diferente, usa el prefijo `k8s_secret@`. Por ejemplo:

```
password: ENC[k8s_secret@database/database-secret/password]
```

Configura RBAC para permitir que la Cuenta de Servicio del Agente lea el secreto. El siguiente Rol otorga acceso de lectura al secreto `database-secret` en el espacio de nombres `database`:
{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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
***Nota***: Cada espacio de nombres en la lista de roles también debe estar configurado en la variable de entorno `WATCH_NAMESPACE` o `DD_AGENT_WATCH_NAMESPACE` en el despliegue del Operador de Datadog.
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


Alternativamente, puedes definir recursos de RBAC directamente:

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

Este `Role` otorga acceso al `Secret: database-secret` en el `Namespace: database`. El `RoleBinding` vincula este permiso al `ServiceAccount: datadog-agent` en el `Namespace: default`. Esto necesita ser agregado manualmente a tu clúster con respecto a tus recursos desplegados.

### Opción 3: Creando un ejecutable personalizado

Para recuperar secretos, el Agente utiliza un ejecutable externo que usted proporciona. El ejecutable se utiliza cuando se descubren nuevos secretos y se almacenan en caché durante el ciclo de vida del Agente. Si necesita actualizar o rotar un secreto, debe reiniciar el Agente para recargarlo.

Esto le permite utilizar cualquier solución de gestión de secretos y le da control total sobre cómo el Agente accede a los secretos.

El Agente envía a este ejecutable una carga útil JSON a través de la entrada estándar que contiene una lista de identificadores de secretos a resolver. Luego, su ejecutable obtiene cada secreto y los devuelve en un formato JSON a través de la salida estándar.

El siguiente ejemplo muestra lo que el Agente envía a su ejecutable en STDIN:

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (cadena): La versión del formato.
* `secrets` (lista de cadenas): Cada cadena es un identificador para un secreto a recuperar.


El ejecutable responde a través de la siguiente salida STDOUT:

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (cadena): El valor del secreto que se utilizará en las configuraciones. Esto puede ser `null` en caso de un error.
* `error` (cadena): Un mensaje de error o `null`.

Si un secreto no se puede resolver (ya sea devolviendo un código de salida distinto de cero o un error no nulo), la configuración relacionada es ignorada por el Agente.

**Nunca muestre información sensible en `stderr`**. Si el binario sale con un código de estado diferente a `0`, el Agente registra la salida de error estándar de su ejecutable para solucionar problemas.

También puede construir su propio ejecutable de recuperación de secretos utilizando cualquier lenguaje. El único requisito es que siga el formato de entrada/salida descrito anteriormente.

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

Esto transforma tu configuración:

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

Puedes configurar el Agente para usar el binario para resolver secretos añadiendo lo siguiente:

```
secret_backend_command: /path/to/binary
```

## Requisitos de seguridad del Agente

El Agente ejecuta el ejecutable proporcionado como un subproceso. Los patrones de ejecución difieren en Linux y Windows.

{{< tabs >}}
{{% tab "Linux" %}}

En Linux, tu ejecutable debe:

* Pertenecer al mismo usuario que ejecuta el Agente (`dd-agent` por defecto, o `root` dentro de un contenedor).
* No tener derechos para `group` o `other`.
* Tener al menos el derecho de **ejecutar** para el propietario.

{{% /tab %}}
{{% tab "Windows" %}}

En Windows, tu ejecutable debe:

* Tener **lectura** o **ejecución** para `ddagentuser` (el usuario utilizado para ejecutar el Agente).
* No tener derechos para ningún usuario o grupo excepto para el grupo de **Administradores**, la cuenta incorporada de **Sistema Local**, o el contexto del usuario del Agente (`ddagentuser` por defecto).
* Ser una aplicación Win32 válida para que el Agente pueda ejecutarla (por ejemplo, un script de PowerShell o Python no funciona).

{{% /tab %}}
{{< /tabs >}}

**Nota**: Tu ejecutable comparte las mismas variables de entorno que el Agente.

## Refrescando secretos en tiempo de ejecución

A partir de la versión 7.67 del Agente, puedes configurar el Agente para refrescar secretos resueltos sin necesidad de reiniciar.

Establece un intervalo de refresco:

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

O, activa un refresco manualmente:

```shell
datadog-agent secret refresh
```

### Refresco de clave API/APP
Las claves API/APP extraídas como secretos admiten refresco en tiempo de ejecución.

Puedes habilitar esto configurando `secret_refresh_interval` (en segundos) en `datadog.yaml`:

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

Por defecto, el Agente aleatoriza el refresco inicial dentro de la ventana de `secret_refresh_interval` para evitar que una flota de
Agentes se refresque simultáneamente. La clave se resuelve al inicio, luego se refresca una vez dentro del primer intervalo
y cada intervalo posterior.

Para evitar tiempo de inactividad, invalida las claves antiguas solo después de que toda tu flota haya extraído las claves actualizadas. Puedes rastrear el uso de claves
en la página [Gestión de Flota](https://app.datadoghq.com/fleet).

Puedes deshabilitar este comportamiento configurando:

```yaml
secret_refresh_scatter: false
```

### Refresco de secretos de verificación de Autodescubrimiento
A partir de la versión 7.76 del Agente, las verificaciones programadas de [Autodescubrimiento][1] pueden refrescar secretos en tiempo de ejecución si la plantilla utiliza la sintaxis `ENC[]`.

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

El Agente puede entonces activar el refresco de secretos ya sea en el intervalo establecido en `secret_refresh_interval` o manualmente con `datadog-agent secret refresh`.

### Refresco automático de secretos en caso de fallo/invalidación de clave API

A partir de la versión 7.74 del Agente, el Agente puede refrescar automáticamente secretos cuando detecta una clave API inválida. Esto sucede cuando el Agente recibe una respuesta 403 Prohibido de Datadog o cuando la verificación de salud periódica detecta una clave API inválida o caducada.

Para habilitar esta función, establece `secret_refresh_on_api_key_failure_interval` en un intervalo en minutos en tu archivo `datadog.yaml`. Establecer en `0` para deshabilitar (predeterminado).

Este intervalo es la cantidad mínima de tiempo entre 2 actualizaciones para evitar saturar tu solución de gestión de secretos cuando se detecta una clave API inválida.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Esta configuración es compatible con `secret_refresh_interval`.

### Habilitando la actualización del colector DDOT
Si estás utilizando [colector DDOT][6] y deseas habilitar la actualización de API/APP, debes agregar la siguiente configuración adicional a tu archivo `datadog.yaml`:

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Esto asegura que el colector DDOT permanezca sincronizado con el Agente después de que se actualicen los secretos. De manera similar a cómo el Agente verifica periódicamente su estado de configuración, el colector DDOT utiliza esta configuración para verificar regularmente los valores actualizados del Agente.

## Resolución de problemas

### Listando secretos detectados

El comando `secret` en la CLI del Agente muestra cualquier error relacionado con tu configuración. Por ejemplo, si los derechos sobre el ejecutable son incorrectos. También lista todos los manejadores encontrados y dónde se encuentran.

En Linux, el comando muestra el modo de archivo, propietario y grupo para el ejecutable. En Windows, se listan los derechos de ACL.

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

Ejemplo en Windows (desde un PowerShell de Administrador):

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

### Ver configuraciones después de que se inyectaron los secretos.

Para ver rápidamente cómo se resuelven las configuraciones del chequeo, puedes usar el comando `configcheck`:

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

**Nota**: El Agente necesita ser [reiniciado][7] para recoger los cambios en los archivos de configuración.

### Depurando tu secret_backend_command

Para probar o depurar fuera del Agente, puedes imitar cómo lo ejecuta el Agente:

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

El usuario `dd-agent` se crea cuando instalas el Agente de Datadog.

{{% /tab %}}
{{% tab "Windows" %}}

##### Errores relacionados con derechos

Los siguientes errores indican que falta algo en tu configuración.

1. Si algún otro grupo o usuario que no sea el necesario tiene derechos sobre el ejecutable, se registra un error similar al siguiente:
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` no tiene derechos de lectura y ejecución sobre el archivo, se registra un error similar:
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Tu ejecutable necesita ser una aplicación Win32 válida. Si no, se registra el siguiente error:
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog tiene un [script de Powershell][9] para ayudarte a establecer los permisos correctos en tu ejecutable. Ejemplo de cómo usarlo:

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

##### Probando tu ejecutable

Tu ejecutable es ejecutado por el Agente al obtener tus secretos. El Agente de Datadog se ejecuta utilizando el `ddagentuser`. Este usuario no tiene derechos específicos, pero es parte del grupo `Performance Monitor Users`. La contraseña para este usuario se genera aleatoriamente en el momento de la instalación y nunca se guarda en ningún lugar.

Esto significa que tu ejecutable podría funcionar con tu usuario predeterminado o usuario de desarrollo, pero no cuando es ejecutado por el Agente, ya que `ddagentuser` tiene derechos más restringidos.

Para probar tu ejecutable en las mismas condiciones que el Agente, actualiza la contraseña del `ddagentuser` en tu caja de desarrollo. De esta manera, puedes autenticarte como `ddagentuser` y ejecutar tu ejecutable en el mismo contexto en el que lo haría el Agente.

Para hacerlo, sigue estos pasos:

1. Elimina `ddagentuser` de la lista `Local Policies/User Rights Assignement/Deny Log on locally` en el `Local Security Policy`.
2. Establece una nueva contraseña para `ddagentuser` (ya que la generada en el momento de la instalación nunca se guarda en ningún lugar). En PowerShell, ejecuta:
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Actualiza la contraseña que utilizará el servicio `DatadogAgent` en el Administrador de Control de Servicios. En PowerShell, ejecuta:
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Ahora puedes iniciar sesión como `ddagentuser` para probar tu ejecutable. Datadog tiene un [script de Powershell][10] para ayudarte a probar tu
ejecutable como otro usuario. Cambia los contextos de usuario y simula cómo el Agente ejecuta tu ejecutable.

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

### Agente se niega a iniciar

Lo primero que hace el Agente al iniciar es cargar `datadog.yaml` y descifrar cualquier secreto en él. Esto se hace antes de configurar el registro. Esto significa que en plataformas como Windows, los errores que ocurren al cargar `datadog.yaml` no se escriben en los registros, sino en `stderr`. Esto puede ocurrir cuando el ejecutable proporcionado al Agente para secretos devuelve un error.

Si tienes secretos en `datadog.yaml` y el Agente se niega a iniciar:

* Intenta iniciar el Agente manualmente para poder ver `stderr`.
* Elimina los secretos de `datadog.yaml` y prueba primero con secretos en un archivo de configuración de verificación.

### Pruebas de Permisos de Kubernetes
Al leer Secrets directamente desde Kubernetes, puedes verificar tus permisos con el comando `kubectl auth`. La forma general de esto es:

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considera el ejemplo anterior de [Kubernetes Secrets](#example-reading-a-kubernetes-secret-across-namespaces), donde el Secret `Secret:database-secret` existe en el `Namespace: database`, y la Cuenta de Servicio `ServiceAccount:datadog-agent` existe en el `Namespace: default`.

En este caso, utiliza el siguiente comando:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Este comando devuelve si los permisos son válidos para que el Agente vea este Secret.

### Elimina los saltos de línea finales {#remove-trailing-line-breaks}.

Algunas herramientas de gestión de secretos añaden automáticamente un salto de línea al exportar secretos a través de archivos. Puedes eliminar estos saltos de línea configurando `secret_backend_remove_trailing_line_break: true` en [el archivo de configuración datadog.yaml][8], o usar la variable de entorno `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` para hacer lo mismo, especialmente en entornos contenedorizados.

### Variables de autodetección en manejadores de secretos.

También es posible usar variables de [Autodetección][1] en manejadores de secretos. El Agente resuelve estas variables antes de resolver el secreto. Por ejemplo:

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Lectura Adicional

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

<!-- Azure KeyVault Links -->
[2000]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal

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