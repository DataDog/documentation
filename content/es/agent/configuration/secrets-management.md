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
  text: Autodescubrimiento
title: Gestión de Secretos
---
## Overview

Datadog Agent le ayuda a gestionar sus secretos de forma segura integrándose con las siguientes soluciones de gestión de secretos:
 [AWS Secrets Manager](#idforsecrets)
 [AWS SSM](#idforssm)
 [Azure KeyVault](#idforazure)
 [GCP Secret Manager](#idforgcp)
 [HashiCorp Vault](#idforhashicorp)
 [Secretos de Kubernetes](#idforkubernetes)
 [Secretos de Docker](#idfordocker)
 [Texto de archivo](#idforjsonyamltext)
 [Archivo JSON](#idforjsonyamltext)
 [File YAML](#idforjsonyamltext)

En lugar de valores sensibles de codificación dura como claves API o contraseñas en texto plano dentro de los archivos de configuración, el agente puede recuperarlos dinámicamente en tiempo de ejecución. Para hacer referencia a un secreto en su configuración, utilice el `ENC[<secret_id>]` anotación. El secreto se obtiene y se carga en la memoria, pero nunca se escribe en el disco o se envía al backend de Datadog.

**Nota**: No puede usar la sintaxis `ENC[]` en configuraciones `secretas_*` como `secret_backend_command`.

## Opciones para recuperar secretos

### Opción 1: Uso de soporte nativo de agente para buscar secretos

**Nota**: A partir de la versión `7.76` del agente y en adelante, la gestión de secretos nativos está disponible para los agentes habilitados para FIPS.

A partir de la versión `7.70` de Agent, Datadog Agent admite de forma nativa varias soluciones de gestión de secretos. Se han introducido dos nuevas configuraciones en `datadog.yaml`: `secret_backend_type` y `secret_backend_config`.

`secret_backend_type` se utiliza para especificar qué solución de gestión de secretos utilizar, y `secret_backend_config` contiene configuración adicional relevante para esa solución.

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**Nota**: Si ejecuta Datadog en un entorno contenedor, el [Cluster Agent](/containers/cluster_agent/) requiere que el agente 7.77 o posterior admita la búsqueda de secretos nativos. Para versiones anteriores, use [Opción 2](#opción2usandoelguióndeconstrucciónparakubernetesanddocker) u [Opción 3](#opción3creandounejecutable personalizado) en su lugar.

Instrucciones de configuración más específicas dependen del tipo de backend utilizado. Consulte la sección correspondiente a continuación para obtener más información:


{{% collapse-content title="AWS Secrets" level="h4" expanded=false id="id-for-secrets" %}}
Se admiten los siguientes servicios de AWS:

|valor de tipo_backend_secreto | Servicio de AWS |
|||
|`aws.secrets` |[AWS Secrets Manager][1000] |

##### Configurar un perfil de instancia

Datadog recomienda usar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS maneja todas las variables de entorno y perfiles de sesión por usted. Puede encontrar más instrucciones sobre cómo hacerlo en la documentación oficial de AWS Secrets Manager.

##### Ejemplo de configuración

{{< tabs >}}
{{% tab "Archivo YAML del agente" %}}

Configure el Datadog Agent para que utilice AWS Secrets para resolver secretos mediante la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Cuando utilice variables de entorno, convierta la configuración a JSON de esta manera:

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Después de configurar el Agente para usar AWS Secrets, puede hacer referencia a cualquier secreto en sus configuraciones con `ENC[secretId;secretKey]`.

La notación ENC se compone de:
* `secretId`: el secreto "nombre amistoso" (por ejemplo, `/DatadogAgent/Production`) o el ARN (por ejemplo, `arn:aws:secretsmanager:useast1:123456789012:secret:/DatadogAgent/ProductionFOga1K`).
   **Nota**: Se requiere el formato ARN completo cuando se accede a secretos desde una cuenta diferente donde se define la credencial de AWS o credencial `sts:AssumeRole`.
* `secretKey`: la clave JSON del secreto de AWS que desea utilizar.


AWS Secrets Manager puede almacenar varios pares de valores clave dentro de un solo secreto. Una configuración de backend usando Secrets Manager tiene acceso a todas las claves definidas en un secreto.

Por ejemplo, suponiendo que el ID secreto `MySecrets` contenga los siguientes 3 valores:

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

El siguiente es un ejemplo completo del archivo de configuración `datadog.yaml` que utiliza AWS Secrets para extraer su clave API de `MySecrets`:

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Timón" %}}

Configure el Datadog Agent para usar AWS Secrets para resolver secretos en Helm mediante la siguiente configuración:

##### Control de integración

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

<div class="alert alert-info"> You must include the <code>serviceAccountAnnotations</code> to grant the Agent permissions to access the AWS secret. </div>

<br>


##### Comprobación de clúster: sin los corredores de comprobación de clúster habilitados
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

##### Comprobación de clúster: con corredores de comprobación de clúster habilitados
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

Configure el Datadog Agent para usar AWS Secrets para resolver secretos con el Datadog Operator mediante la siguiente configuración:

##### Control de integración


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

<div class="alert alert-info"> You must include the <code>serviceAccountAnnotations</code> to grant the Agent permissions to access the AWS secret. </div>

<br>


##### Comprobación de clúster: sin los corredores de comprobación de clúster habilitados

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

##### Comprobación de clúster: con corredores de comprobación de clúster habilitados

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
Se admiten los siguientes servicios de AWS:

|valor de tipo_backend_secreto | Servicio de AWS |
|||
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### Configurar un perfil de instancia

Datadog recomienda usar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS maneja todas las variables de entorno y perfiles de sesión por usted. Puede encontrar más instrucciones sobre cómo hacerlo en la [documentación oficial de AWS Secrets Manager][1001].

##### Ejemplo de configuración

AWS System Manager Parameter Store admite un modelo jerárquico. Por ejemplo, suponiendo las siguientes rutas de AWS System Manager Parameter Store:

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

Los parámetros se pueden buscar de esta manera:

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


Se admiten los siguientes servicios de Azure:

| valor secret_backend_type | Servicio de Azure |
| ||
| `azure.keyvault` | [Azure Keyvault][2000] |

##### Autenticación de Azure

Datadog recomienda usar identidades administradas para autenticarse con Azure. Esto le permite asociar recursos en la nube con cuentas AMI y elimina la necesidad de poner información confidencial en su archivo de configuración `datadog.yaml`.

##### Identidad gestionada

Para acceder a su bóveda de claves, cree una identidad administrada y asignela a su máquina virtual. A continuación, configure la asignación de roles adecuada en la bóveda de claves para permitir que esa identidad acceda a sus secretos.

##### Ejemplo de configuración

La configuración backend para los secretos de Azure Key Vault está estructurada como YAML siguiendo este esquema:

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

El secreto de backend se referencia en su archivo de configuración de Datadog Agent con `ENC[ ]`. El siguiente es un ejemplo donde un secreto de texto plano necesita ser recuperado:

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h4" expanded=false id="id-for-gcp" %}}

**Disponible en la versión 7.74+** del agente

Se admiten los siguientes servicios del PGC:

| secret_backend_type value | Servicio GCP |
|  |  |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### Autenticación GCP y política de acceso

La implementación de GCP Secret Manager utiliza [Credenciales predeterminadas de aplicaciones (ADC)][5001] para la autenticación con Google.

Para interactuar con GCP Secret Manager, la cuenta de servicio utilizada por el Datadog Agent (como la cuenta de servicio de la máquina virtual, una identidad de carga de trabajo o credenciales activadas localmente) requiere el permiso `secretmanager.versions.access`.

Esto se puede otorgar con el rol predefinido **Secret Manager Secret Accessor** (`roles/secretmanager.secretAccessor`) o un rol personalizado con [access][5002] equivalente.

En tiempos de ejecución GCE o GKE, ADC se configura automáticamente a través de la cuenta de servicio adjunta de la instancia o el módulo. La cuenta de servicio adjunta debe tener las funciones adecuadas para acceder a GCP Secret Manager. Además, el tiempo de ejecución de GCE o GKE requiere la `plataforma en la nube` [ámbito de acceso de OAuth] [5003].

##### Ejemplo de configuración de GCP

Configure el Datadog Agent para usar GCP Secret Manager para resolver secretos con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Después de configurar el Agente para usar GCP Secret Manager, haga referencia a secretos en sus configuraciones con `ENC[nombresecreto]` o `ENC[nombresecreto;clave;versión;]`.

La notación ENC se compone de:

 `secreto`: el nombre secreto en GCP Secret Manager (por ejemplo, `datadogapikey`).
 `key`: (opcional) la clave para extraer de un secreto con formato JSON. Si estás usando secretos de texto plano, puedes omitir esto (por ejemplo: `ENC[nombresecreto;;versión]`).
 `version`: (opcional) el número de versión secreto. Si no se especifica, se utiliza la versión más reciente.
  + Ejemplos de sintaxis de versión:
     `secretkey` Versión `última` implícita
     `secretkey;;latest` Versión explícita `latest`
     `secretkey;;1` Número de versión específico

Por ejemplo, suponiendo que los secretos del PCG se denominan `datadogapikey` con dos versiones y `datadogappkey`:

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Para los secretos con formato JSON, suponiendo que un secreto llamado `datadogkeys` contenga:

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

Referencia claves específicas como esta:

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

##### Versionado secreto

GCP Secret Manager soporta versiones secretas. La implementación Agent también admite versiones secretas utilizando el delimitador `;`. Si no se especifica ninguna versión, se utiliza la versión más reciente.


##### JSON secret support

El Datadog Agent admite la extracción de claves específicas de secretos con formato JSON utilizando el delimitador `;`:

 `datadog;api_key` Extrae el campo `api_key` del secreto `datadog` con una versión `última` implícita
 `datadog;api_key;1` Extrae el campo `api_key` del secreto `datadog` de la versión `1`

{{% /collapse-content %}}


{{% collapse-content title="HashiCorp Vault Backend" level="h4" expanded=false id="id-for-hashicorp" %}}

Se admiten los siguientes servicios de HashiCorp:

| secret_backend_type value | Servicio de HashiCorp |
|  |  |
| `hashicorp.vault` | [HashiCorp Vault (Secrets Engine Versions 1 y 2)][3000] |

##### Cómo configurar HashiCorp Vault
1. Ejecute su HashiCorp Vault. Consulte la [documentación oficial de HashiCorp Vault][3001] para obtener más información.
2. Escribe una política que dé permiso para sacar secretos de tu bóveda. Cree un archivo `*.hcl` e incluya el siguiente permiso si utiliza Secrets Engine Versión 1:
```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si usa Secrets Engine Versión 2, entonces se necesitan los siguientes permisos:
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
3. Ejecutar la política de bóveda escribir <policy_name> &lt;path_to_*.hcl_file>`

4. Elija el método de autenticación en su bóveda. Si utiliza el método de perfil de instancia de AWS, ejecute `vault auth enable aws`.

##### Instrucciones de perfil de instancia de AWS

Datadog recomienda que se autentique utilizando el [método de perfil de instancia][3003] si está ejecutando su HashiCorp Vault desde una máquina conectada a AWS.

Después de configurar esto, escriba una [política de bóveda específica de autenticación][3004].

##### Ejemplo de configuración

En el siguiente ejemplo, suponga que el prefijo de ruta secreta de HashiCorp Vault es `/Datadog/Production` con una clave de parámetro de `apikey`:

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

En el ejemplo siguiente se obtiene el valor de clave API de HashiCorp Vault aprovechando AWS para la autenticación.

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

**Disponible en la versión 7.75+** del agente

Se admiten los siguientes servicios de Kubernetes:

| secret_backend_type value | Servicio |
|||
| `k8s.secrets` | [Kubernetes Secrets][7000] |

##### Requisitos previos

El backend de secretos de Kubernetes requiere:
 **Credenciales de ServiceAccount**: De forma predeterminada, utiliza tokens de ServiceAccount montados automáticamente (`automountServiceAccountToken: true`, ver [documentación de Kubernetes](https://kubernetes.io/docs/tasks/configurepodcontainer/configureserviceaccount/#optoutofapicredentialautomounting)). Las rutas personalizadas se pueden configurar si es necesario.
 **Permisos RAC**: La cuenta de servicio del agente debe tener permisos para leer secretos de espacios de nombres de destino
 **Acceso a la red**: El módulo Agent debe poder llegar al servidor API de Kubernetes

##### Configuración de RBAC

Para cada espacio de nombres que contenga secretos, cree un `Role` y un `RoleBinding` usando el siguiente ejemplo usando el nombre correcto del espacio de nombres:

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
{{% tab "Archivo YAML del agente" %}}

Configure el Datadog Agent para usar Kubernetes Secrets con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

El formato de notación ENC es `namespace/secretname;key`:
 `espacio de nombres`: El espacio de nombres de Kubernetes que contiene el secreto
 `nombresecreto`: El nombre del recurso secreto
 `clave`: La clave específica para extraer del campo de datos del Secreto

**Ejemplo:** Dado un secreto en el espacio de nombres `secretsns`:

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

Puede hacer referencia a teclas individuales:
```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

** Soporte Multimespace:**
Cada referencia secreta puede especificar un espacio de nombres diferente (RBAC debe configurarse para cada uno):

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Timón" %}}

Configure el agente Datadog para usar Kubernetes Secrets con Helm:

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

**Nota:** Se requiere un marcador de posición `apiKey` para la validación del gráfico de Helm cuando se usa backend secreto para resolver la clave API. La variable de entorno `DD_API_KEY` la anula. Debe crear manualmente RBAC (Rol + RoleBinding) para cada espacio de nombres que contenga secretos. Para obtener más información, consulte la sección [RBAC setup](#rbacsetup).

<div class="alert alert-info"> Helm does not have native <code>secretBackend.type</code> configuration. Use environment variables. </div>

{{% /tab %}}

{{% tab "Operador" %}}

Configure el agente Datadog para usar Kubernetes Secrets con el operador Datadog:

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

**Nota:** Una clave API de marcador de posición satisface la validación del operador cuando se utiliza el backend secreto para resolver la clave API. La variable de entorno `DD_API_KEY` la anula. Debe crear manualmente RBAC (Rol + RoleBinding) para cada espacio de nombres que contenga secretos. Para obtener más información, consulte la sección [RBAC setup](#rbacsetup).

<div class="alert alert-info"> The Operator does not have native <code>secretBackend.type</code> configuration. Use environment variables in <code>override.nodeAgent.env</code>. </div>

{{% /tab %}}
{{< /tabs >}}

##### Configuración de ruta personalizada
Si la configuración no sigue las ubicaciones predeterminadas para la autenticación basada en ServiceAccount, puede especificar `token_path` y `ca_path' en su lugar.

{{< tabs >}}
{{% tab "Agent YAML" %}}
```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  token_path: /custom/path/to/token
  ca_path: /custom/path/to/ca.crt
```
{{% /tab %}}

{{% tab "Timón" %}}
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

Si su configuración no expone las variables de entorno predeterminadas `KUBERNETES_SERVICE_HOST` y `KUBERNETES_SERVICE_PORT`, puede proporcionar una URL `api_server` para interactuar con la API REST de Kubernetes.

{{< tabs >}}
{{% tab "Agent YAML" %}}
```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  api_server: https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}
```
{{% /tab %}}

{{% tab "Timón" %}}
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

{{% collapse-content title="Docker Secrets" level="h4" expanded=false id="id-for-docker" %}}

**Disponible en la versión 7.75+** del agente

Se admiten los siguientes servicios Docker:

| secret_backend_type value | Servicio |
|||
| `docker.secrets` | [Secretos de Docker][6001] |

##### Requisitos previos

El backend Docker secrets soporta tanto [Docker Swarm secrets][6002] como [Docker Compose secrets][6003]. Por defecto, Swarm y Compose montan secretos automáticamente dentro del contenedor como archivos en `/run/secrets` (Linux) o `C:\ProgramData\Docker\secrets` (Windows).

**Nota**: Los secretos de composición pueden basarse en archivos (que apuntan a archivos locales) o externos (haciendo referencia a los secretos de enjambre existentes).

##### Ejemplo de configuración

Configure el agente Datadog para usar Docker Secrets con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

El formato de notación ENC es el nombre secreto, que corresponde al nombre del archivo en `/run/secrets/`:
 `ENC[api_key]` lee de `/run/secrets/api_key` (Linux) o `C:\ProgramData\Docker\secrets\api_key` (Windows)

** Ruta de secretos personalizados:**
Si Docker Swarm o Compose están configurados para montar secretos en una ubicación diferente, puede especificarlo de la siguiente manera:

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

##### Docker Componer ejemplo

[Crear][6003] un `dockercompose.yml` con secretos basados en archivos:

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

El archivo secreto `./secrets/api_key.txt` está montado en `/run/secrets/dd_api_key` en el contenedor.


{{% /collapse-content %}}

{{% collapse-content title="JSON, YAML o TEXTO Archivo Secreto Backends" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| secret_backend_type value | Servicio de archivos |
|||
|`file.json` |[JSON][4001] |
|`file.yaml` |[YAML][4002] | |
|`archivo.texto` |[TEXTO][4003] | |

##### Permisos de archivo
El backend del archivo solo requiere permisos de **lectura** para los archivos JSON, YAML o TEXT configurados. Estos permisos deben otorgarse al usuario local del Datadog Agent (`ddagent` en Linux, `ddagentuser` en Windows).


{{< tabs >}}
{{% tab "Backend de archivo JSON" %}}

**Nota**: Solo se admite un nivel de profundidad JSON (por ejemplo, `{"key": "value"}`)

##### Ejemplo de configuración

Puede usar un archivo JSON para almacenar secretos localmente.

Por ejemplo, con un archivo JSON en `/path/to/secret.json` que contiene lo siguiente:

```json
{
  "datadog_api_key": "your_api_key"
}
```

Puedes usar esta configuración para extraer sus secretos:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "Backend de archivo YAML" %}}

**Nota**: Solo se admite un nivel de profundidad YAML (por ejemplo, `key: value`)

##### Ejemplo de configuración

Puede usar un archivo YAML para almacenar secretos localmente.

Como ejemplo si tenemos un archivo YAML en `/path/to/secret.yaml` que contiene:

```yaml
datadog_api_key: your api key
```

Puedes usar la siguiente configuración para sacarle secretos:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Backend de archivo de texto" %}}

**Disponible en la versión 7.75+** del agente

**Nota**: Cada secreto debe almacenarse en su propio archivo de texto individual.

##### Ejemplo de configuración

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

Puedes usar esta configuración para obtener secretos de ellos:

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### Seguridad de la ruta:

 Las rutas relativas en `ENC[]` se resuelven en relación con `secrets_path` (por ejemplo, `ENC[dd_api_key]` con `secret_path: /path/to/secrets` se resolverá a `/path/to/secrets/dd_api_key`)
 Las rutas absolutas en `ENC[]` deben estar dentro de `secrets_path` (por ejemplo, `ENC[/path/to/secrets/dd_api_key]` con `secret_path: /path/to/secrets` funcionará)
 Los intentos de atravesar rutas (por ejemplo, `ENC[../etc/passwd]`) están bloqueados y fallarán con "ruta fuera del directorio permitido"

**Nota:** Algunas herramientas agregan saltos de línea automáticamente al exportar secretos a archivos. Consulte [Eliminar saltos de línea posteriores](#eliminar saltos de línea posteriores) para saber cómo manejar esto.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### Opción 2: Uso del script incorporado para Kubernetes y Docker

Para entornos contenedores, las imágenes contenedoras del Datadog Agent incluyen un script incorporado `/readsecret_multiple_providers.sh` a partir de la versión v7.32.0. Este script admite la lectura de secretos de:

* Archivos: usando `ENC[file@/path/to/file]`
* Secretos de Kubernetes: usando `ENC[k8s_secret@namespace/secretname/key]`

{{< tabs >}}
{{% tab "Operador Datadog" %}}

Para usar este ejecutable con el Operador Datadog, configúrelo de la siguiente manera:
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
{{% tab "Timón" %}}

Para usar este ejecutable con el gráfico Helm, configúrelo de la siguiente manera:
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

#### Ejemplo: Lectura de archivos montados

Kubernetes soporta [exponer Secretos como archivos] [2] dentro de una cápsula que el Agente puede leer para resolver secretos.

En Kubernetes, puedes montar un Secreto como un volumen como este:
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

Entonces puedes hacer referencia al secreto de esta manera:
```
password: ENC[file@/etc/secret-volume/password]
```

**Notas**:
 El Secreto debe existir en el mismo espacio de nombres que la cápsula en la que se está montando.
 El script es capaz de acceder a todas las subcarpetas, incluyendo la sensible `/var/run/secrets/kubernetes.io/serviceaccount/token`. Como tal, Datadog recomienda usar una carpeta dedicada en lugar de `/var/run/secrets`.

[Secretos de enjambre de estibadores][3] se montan en la carpeta `/run/secrets`. Por ejemplo, el secreto Docker `db_prod_password` se encuentra en `/run/secrets/db_prod_password` en el contenedor Agent. Esto sería referenciado en la configuración con `ENC[file@/run/secrets/db_prod_password]`.

#### Ejemplo: Leyendo un secreto de Kubernetes a través de espacios de nombres

Si desea que el Agente lea un Secreto desde un espacio de nombres diferente, utilice el prefijo `k8s_secret@`. Por ejemplo:
```
password: ENC[k8s_secret@database/database-secret/password]
```

Configure RBAC para permitir que la cuenta de servicio del agente lea el secreto. El siguiente Rol otorga acceso de lectura al Secreto `base de datos` en el espacio de nombres `base de datos`:
{{< tabs >}}
{{% tab "Operador Datadog" %}}
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
***Nota**: Cada espacio de nombres en la lista de roles también debe configurarse en la variable de entorno `WATCH_NAMESPACE` o `DD_AGENT_WATCH_NAMESPACE` en la implementación del Operador Datadog.
{{% /tab %}}
{{% tab "Timón" %}}
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

Este `Rol` da acceso al `Secreto: databasesecret` en el `Espacio de nombres: database`. El `RoleBinding` vincula este permiso a la `ServiceAccount: datadogagent` en el `Namespace: default`. Esto debe agregarse manualmente a su clúster con respecto a sus recursos desplegados.

### Opción 3: Creación de un ejecutable personalizado

Para recuperar secretos, el Agente utiliza un ejecutable externo que usted proporciona. El ejecutable se utiliza cuando se descubren nuevos secretos y se almacenan en caché durante el ciclo de vida del agente. Si necesita actualizar o rotar un secreto, debe reiniciar el agente para recargarlo.

Esto le permite utilizar cualquier solución de gestión de secretos y le da control total sobre cómo el agente accede a los secretos.

El Agente envía a este ejecutable una carga útil JSON sobre entrada estándar que contiene una lista de manejadores secretos a resolver. Luego, su ejecutable obtiene cada secreto y los devuelve en un formato JSON a través de una salida estándar.

El siguiente ejemplo muestra lo que el agente envía a su ejecutable en STDIN:
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `versión` (string): La versión de formato.
* `secretos` (lista de cadenas): Cada cadena es un asa para un secreto a buscar.


El ejecutable responde a través de la siguiente salida STDOUT:
```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (string): El valor secreto que se utilizará en las configuraciones. Esto puede ser nulo en caso de error.
* `error` (cadena): Un mensaje de error o `null`.

Si un secreto no se resuelve (ya sea devolviendo un código de salida distinto de cero o un error no nulo), el agente ignora la configuración relacionada.

**Nunca emita información sensible sobre `stderr`**. Si el binario sale con un código de estado diferente de `0`, el agente registra la salida de error estándar de su ejecutable para la solución de problemas.

También puede construir su propio ejecutable de recuperación secreta utilizando cualquier idioma. El único requisito es que siga el formato de entrada/salida descrito anteriormente.

Aquí hay un ejemplo de Go que devuelve secretos ficticios:
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

En lo siguiente en la memoria:

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Puede configurar el agente para que utilice el binario para resolver secretos añadiendo lo siguiente:
```
secret_backend_command: /path/to/binary
```

## Requisitos de seguridad del agente

El agente ejecuta el ejecutable proporcionado como un subproceso. Los patrones de ejecución difieren en Linux y Windows.

{{< tabs >}}
{{% tab "Linux" %}}

En Linux, su ejecutable debe:

* Pertenece al mismo usuario que ejecuta el Agente (`ddagent` por defecto, o `root` dentro de un contenedor).
* No tienen derechos para `grupo` u `otro`.
* Tener al menos el derecho de **ejecutar** para el propietario.

{{% /tab %}}
{{% tab "Windows" %}}

En Windows, su ejecutable debe:

* Haga **leer** o **ejecutar** para `ddagentuser` (el usuario utilizado para ejecutar el Agente).
* No tienen derechos para ningún usuario o grupo, excepto para el grupo **Administradores**, la cuenta incorporada **Sistema local** o el contexto de usuario del agente (`ddagentuser` por defecto).
* Ser una aplicación Win32 válida para que el Agente pueda ejecutarla (por ejemplo, un script PowerShell o Python no funciona).

{{% /tab %}}
{{< /tabs >}}

**Nota**: Su ejecutable comparte las mismas variables de entorno que el Agente.

## Secretos refrescantes en tiempo de ejecución

A partir de Agent v7.67, puede configurar Agent para actualizar los secretos resueltos sin necesidad de reiniciar.

Establecer un intervalo de actualización:
```yaml
secret_refresh_interval: 3600  # refresh every hour
```

O bien, active una actualización manualmente:
```shell
datadog-agent secret refresh
```

### Actualización de claves API/APP
Las claves API/APP extraídas como secretos admiten actualización en tiempo de ejecución.

Puede habilitar esto configurando `secret_refresh_interval` (en segundos) en `datadog.yaml`:
```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

De forma predeterminada, el Agente aleatoriza la actualización inicial dentro de la ventana `secret_refresh_interval` para evitar que una flota de
Agentes de refrescarse simultáneamente. La clave se resuelve al inicio, luego se actualiza una vez dentro del primer intervalo
y cada intervalo después.

Para evitar el tiempo de inactividad, invalide las claves antiguas solo después de que toda su flota haya retirado las claves actualizadas. Puedes rastrear la clave
uso en la página [Fleet Management](https://app.datadoghq.com/fleet).

Puede desactivar este comportamiento configurando:
```yaml
secret_refresh_scatter: false
```

### Autodiscovery check secrets refresh
A partir de Agent v7.76, las comprobaciones programadas de [Autodiscovery][1] pueden actualizar secretos en tiempo de ejecución si la plantilla utiliza la sintaxis `ENC[]`.

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

El agente puede activar la actualización de secretos en el intervalo establecido en `secret_refresh_interval` o manualmente con `datadogagent secret refresh`.

### Actualización automática de secretos en fallos / invalidaciones de claves API

A partir de la versión v7.74 del Agente, el Agente puede actualizar automáticamente los secretos cuando detecta una clave API no válida. Esto sucede cuando el Agente recibe una respuesta 403 Prohibida de Datadog o cuando el chequeo periódico detecta una clave API no válida o vencida.

Para habilitar esta función, establezca `secret_refresh_on_api_key_failure_interval` en un intervalo en minutos en su archivo `datadog.yaml`. Establecer en `0` para desactivar (por defecto).

Este intervalo es la cantidad mínima de tiempo entre 2 actualizaciones para evitar enviar spam a su solución de gestión de secretos cuando se detecta una clave API no válida.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Esta configuración es compatible con `secret_refresh_interval`.

### Activación de la actualización del colector DDOT
Si está utilizando [DDOT collector][6] y desea habilitar la actualización de API/APP, debe agregar la siguiente configuración adicional a su archivo `datadog.yaml`:
```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Esto asegura que el recopilador de DDOT permanezca sincronizado con el Agente después de que se refresquen los secretos. De manera similar a como el Agente verifica periódicamente su estado de configuración, el recopilador de DDOT utiliza esta configuración para comprobar regularmente los valores actualizados del Agente.

## Troubleshooting

### Listado de secretos detectados

El comando "secreto" en la CLI del agente muestra cualquier error relacionado con su configuración. Por ejemplo, si los derechos del ejecutable son incorrectos. También enumera todas las asas encontradas y dónde se encuentran.

En Linux, el comando emite el modo de archivo, propietario y grupo para el ejecutable. En Windows, se enumeran los derechos de ACL.

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

Ejemplo en Windows (desde un Administrador PowerShell):
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

### Viendo configuraciones después de inyectar secretos

Para ver rápidamente cómo se resuelven las configuraciones de la comprobación, puede usar el comando `configcheck`:

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

**Nota**: El agente necesita ser [reiniciado][7] para detectar cambios en los archivos de configuración.

### Depurando tu comando secret_backend_command

Para probar o depurar fuera del Agente, puede imitar cómo lo ejecuta el Agente:

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

El usuario `ddagent` se crea cuando instala el Datadog Agent.

{{% /tab %}}
{{% tab "Windows" %}}

##### Errores relacionados con los derechos

Los siguientes errores indican que falta algo en su configuración.

1. Si cualquier otro grupo o usuario que no sea necesario tiene derechos sobre el ejecutable, se registra un error similar al siguiente:
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` no ha leído y ejecutado directamente en el archivo, se registra un error similar:
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Su ejecutable necesita ser una aplicación Win32 válida. Si no, se registra el siguiente error:
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog tiene un [Powershell script][9] para ayudarle a establecer el permiso correcto en su ejecutable. Ejemplo de cómo usarlo:

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

Su ejecutable es ejecutado por el Agente al recoger sus secretos. El Datadog Agent se ejecuta utilizando el `ddagentuser`. Este usuario no tiene derechos específicos, pero forma parte del grupo `Usuarios del Monitor de rendimiento`. La contraseña de este usuario se genera aleatoriamente en el momento de la instalación y nunca se guarda en ningún lugar.

Esto significa que su ejecutable podría funcionar con su usuario predeterminado o usuario de desarrollo, pero no cuando es ejecutado por el Agente, ya que `ddagentuser` tiene derechos más restringidos.

Para probar su ejecutable en las mismas condiciones que el agente, actualice la contraseña del `ddagentuser` en su caja de desarrollo. De esta manera, puede autenticarse como `ddagentuser` y ejecutar su ejecutable en el mismo contexto que lo haría el Agente.

Para hacerlo, siga estos pasos:

1. Eliminar `ddagentuser` de la lista `Políticas locales/Asignación de derechos de usuario/Denegar registro en el ámbito local` de la `Política de seguridad local`.
2. Establezca una nueva contraseña para `ddagentuser` (ya que la generada en el momento de la instalación nunca se guarda en ningún lugar). En PowerShell, ejecute:
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Actualizar la contraseña que utilizará el servicio `DatadogAgent` en el Administrador de control de servicios. En PowerShell, ejecute:
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Ahora puede iniciar sesión como `ddagentuser` para probar su ejecutable. Datadog tiene un [Powershell script][10] para ayudarte a probar tu
ejecutable como otro usuario. Cambia los contextos de usuario e imita cómo el agente ejecuta su ejecutable.

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

[9]: https://github.com/DataDog/datadogagent/blob/master/docs/public/secrets/SetSecretPermissions.ps1
[10]: https://github.com/DataDog/datadogagent/blob/master/docs/public/secrets/secrets_tester.ps1
{{% /tab %}}
{{< /tabs >}}

### Agente negándose a empezar

Lo primero que hace el Agente al iniciar es cargar `datadog.yaml` y descifrar cualquier secreto en él. Esto se hace antes de configurar el registro. Esto significa que en plataformas como Windows, los errores que ocurren al cargar `datadog.yaml` no se escriben en los registros, sino en `stderr`. Esto puede ocurrir cuando el ejecutable dado al Agente para secretos devuelve un error.

Si tiene secretos en `datadog.yaml` y el Agente se niega a iniciar:

* Intenta iniciar el Agente manualmente para poder ver `stderr`.
* Eliminar los secretos de `datadog.yaml` y probar con secretos en un archivo de configuración de comprobación primero.

### Probando permisos de Kubernetes
Cuando lea Secretos directamente desde Kubernetes, puede verificar dos veces sus permisos con el comando `kubectl auth`. La forma general de esto es:

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considere el [ejemplo de Secretos de Kubernetes] anterior (#ejemplolecturaakubernetessecretacrossnamespaces), donde el Secreto `Secreto:base de datossecreto` existe en el `Espacio de nombres: base de datos`, y la Cuenta de servicio `Cuenta de servicio:datadogagent` existe en el `Espacio de nombres: predeterminado`.

En este caso, utilice el siguiente comando:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Este comando devuelve si los permisos son válidos para que el agente vea este secreto.

### Eliminar saltos de línea de salida {#removetrailinglinebreaks}

Algunas herramientas de gestión de secretos añaden automáticamente un salto de línea al exportar secretos a través de archivos. Puede eliminar estos saltos de línea configurando `secret_backend_remove_trailing_line_break: true` en [el archivo de configuración datadog.yaml][8], o usar la variable de entorno `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` para hacer lo mismo, especialmente en entornos contenedores.

### Variables de autodescubrimiento en manejadores secretos

También es posible usar variables [Autodiscovery][1] en manejadores secretos. El Agente resuelve estas variables antes de resolver el secreto. Por ejemplo:
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Seguir leyendo

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/injectdataapplication/distributecredentialssecure/#createapodthathasaccesstothecretdatathroughavolumen
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /es/opentelemetry/setup/ddot_collector/
[7]: /es/agent/configuration/agentcommands/#restarttheagent
[8]: /es/agent/configuration/agentconfigurationfiles/
<!-- Links in tabs are scoped inside shortcodes, collapse-content links are not scoped -->
<!-- AWS Secrets Manager and SSM Links -->
[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systemsmanager/latest/userguide/systemsmanagerparameterstore.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switchroleec2_instanceprofiles.html

<!-- Azure KeyVault Links -->
[2000]: https://docs.microsoft.com/enus/Azure/keyvault/secrets/quickcreateportal

<!-- HashiCorp Vault Links -->
[3000]: https://learn.hashicorp.com/tutorials/vault/staticsecrets
[3001]: https://developer.hashicorp.com/
[3003]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switchroleec2_instanceprofiles.html
[3004]: https://developer.hashicorp.com/vault/docs/auth/aws#iamauthenticationinferences

<!-- File Backend Links (JSON/YAML) -->
[4001]: https://es.wikipedia.org/wiki/JSON
[4002]: https://es.wikipedia.org/wiki/YAML
[4003]: https://es.wikipedia.org/wiki/TEXT

<!-- GCP Secret Manager Links -->
[5000]: https://cloud.google.com/security/products/secretmanager
[5001]: https://cloud.google.com/docs/authentication/applicationdefaultcredentials
[5002]: https://docs.cloud.google.com/secretmanager/docs/accesscontrol
[5003]: https://docs.cloud.google.com/secretmanager/docs/accessingtheapi

<!-- Docker Secrets Links -->
[6001]: https://docs.docker.com/engine/swarm/secrets/
[6002]: https://docs.docker.com/engine/swarm/secrets/#howdockermanagessecrets
[6003]: https://docs.docker.com/compose/howtos/usesecrets/

<!-- Kubernetes Secrets Links -->
[7000]: https://kubernetes.io/docs/concepts/configuration/secret/