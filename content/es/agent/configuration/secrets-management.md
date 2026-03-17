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
title: Gestión de secretos
---
## Descripción general

El agente de Datadog le ayuda a gestionar sus secretos de forma segura mediante la integración con las siguientes soluciones de gestión de secretos:
- [ Administrador de secretos de AWS](#id-for-secrets)
- [ AWS SSM](#id-for-ssm)
- [ Azure Key Vault](#id-for-azure)
- [ Gestor de secretos de GCP](#id-for-gcp)
- [ HashiCorp Vault](#id-for-hashicorp)
- [ Secretos de Kubernetes](#id-for-kubernetes)
- [ Secretos de Docker](#id-for-docker)
- [ Texto del archivo](#id-for-json-yaml-text)
- [ Archivo JSON](#id-for-json-yaml-text)
- [ Archivo YAML](#id-for-json-yaml-text)

 En lugar de codificar valores confidenciales como claves de API o contraseñas en texto plano dentro de los archivos de configuración, el agente puede recuperarlos dinámicamente en tiempo de ejecución. Para hacer referencia a un secreto en su configuración, utilice el`ENC[<secret_id>]` notación. El secreto se recupera y se carga en la memoria, pero nunca se escribe en el disco ni se envía al sistema backend de Datadog.

** Nota** : No puedes usar el`ENC[]` sintaxis en`secret_*` configuraciones como`secret_backend_command` .

##  Opciones para recuperar secretos

###  Opción 1: Utilizar la compatibilidad nativa del Agente para obtener secretos.

** Nota** : A partir de la versión del agente`7.76` Además, la gestión nativa de secretos está disponible para los agentes compatibles con FIPS.

A partir de la versión del agente`7.70` El agente de Datadog admite de forma nativa varias soluciones de gestión de secretos. Se han introducido dos nuevas configuraciones`datadog.yaml` :`secret_backend_type` y`secret_backend_config` .

`secret_backend_type` se utiliza para especificar qué solución de gestión de secretos utilizar, y`secret_backend_config` Contiene configuración adicional relevante para esa solución.

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**Nota** : Si está ejecutando Datadog en un entorno de contenedores, el[ Agente de clúster](/containers/cluster_agent/) Requiere la versión 7.77 o posterior de Agent para admitir la obtención de secretos nativos. Para versiones anteriores, utilice[ Opción 2](#option-2-using-the-built-in-script-for-kubernetes-and-docker) o[ Opción 3](#option-3-creating-a-custom-executable) en cambio.

Las instrucciones de configuración más específicas dependen del tipo de backend utilizado. Consulte la sección correspondiente a continuación para obtener más información:


{{% collapse-content title="Secretos de AWS" level="h4" expanded=false id="id-for-secrets" %}}
Se admiten los siguientes servicios de AWS:

| valor secret_backend_type                                |  Servicio de AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` | [Administrador de secretos de AWS][1000]                 |

#####  Configurar un perfil de instancia

Datadog recomienda utilizar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS gestiona todas las variables de entorno y los perfiles de sesión por usted. Encontrará más instrucciones sobre cómo hacerlo en la documentación oficial de [AWS Secrets Manager][1000].

#####  Ejemplo de configuración

{{< tabs >}}
{{% tab "Archivo YAML del agente" %}}

Configure el agente de Datadog para que utilice AWS Secrets para resolver secretos utilizando la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Cuando utilice variables de entorno, convierta la configuración a JSON de la siguiente manera:

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Después de configurar el Agente para usar secretos de AWS, puede hacer referencia a cualquier secreto en sus configuraciones con`ENC[secretId;secretKey]` .

La notación ENC se compone de:
* `secretId` : ya sea el "nombre amistoso" secreto (por ejemplo,`/DatadogAgent/Production` ) o el ARN (por ejemplo,`arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K` ).
  - ** Nota** : Se requiere el formato ARN completo cuando se accede a secretos desde una cuenta diferente donde la credencial de AWS o`sts:AssumeRole` La credencial está definida.
* `secretKey` : la clave JSON del secreto de AWS que desea utilizar.


AWS Secrets Manager puede almacenar varios pares clave-valor dentro de un único secreto. Una configuración de backend que utiliza Secrets Manager tiene acceso a todas las claves definidas en un secreto.

Por ejemplo, suponiendo que el ID secreto`My-Secrets` contiene los siguientes 3 valores:

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

El siguiente es un ejemplo completo de`datadog.yaml` archivo de configuración que utiliza los secretos de AWS para obtener su clave API de`My-Secrets` :

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Timón" %}}

Configure el agente de Datadog para que utilice AWS Secrets para resolver secretos en Helm utilizando la siguiente configuración:

#####  Verificación de integración

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

<div class="alert alert-info"> Debes incluir el<code> anotaciones de cuenta de servicio</code> para otorgar al Agente permisos para acceder al secreto de AWS. </div>

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

Configure el agente de Datadog para que utilice secretos de AWS para resolver secretos con el operador de Datadog utilizando la siguiente configuración:

#####  Verificación de integración


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

<div class="alert alert-info"> Debes incluir el<code> anotaciones de cuenta de servicio</code> para otorgar al Agente permisos para acceder al secreto de AWS. </div>

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
Se admiten los siguientes servicios de AWS:

| valor secret_backend_type                                |  Servicio de AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` | [Almacén de parámetros de AWS Systems Manager][1001] |

#####  Configurar un perfil de instancia

Datadog recomienda utilizar el [método de perfil de instancia][1006] para recuperar secretos, ya que AWS gestiona todas las variables de entorno y los perfiles de sesión por usted. Encontrará más instrucciones sobre cómo hacerlo en la documentación oficial de AWS Secrets Manager [1001].

#####  Ejemplo de configuración

El almacén de parámetros de AWS System Manager admite un modelo jerárquico. Por ejemplo, suponiendo las siguientes rutas de almacenamiento de parámetros de AWS System Manager:

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


{{% collapse-content title="Backend de Azure Keyvault" level="h4" expanded=false id="id-for-azure" %}}


Se admiten los siguientes servicios de Azure:

|  valor secret_backend_type                            |  Servicio Azure          |
| ----------------------------------------|------------------------|
| `azure.keyvault` |  [Azure Keyvault][2000] |

#####  Autenticación de Azure

Datadog recomienda utilizar identidades administradas para autenticarse con Azure. Esto le permite asociar recursos en la nube con cuentas AMI y elimina la necesidad de poner información confidencial en su`datadog.yaml` archivo de configuración.

#####  Identidad gestionada

Para acceder a su Key Vault, cree una identidad administrada y asígnela a su máquina virtual. A continuación, configure la asignación de roles adecuada en Key Vault para permitir que esa identidad acceda a sus secretos.

#####  Ejemplo de configuración

La configuración de backend para los secretos de Azure Key Vault está estructurada como YAML siguiendo este esquema:

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

El secreto del backend se referencia en el archivo de configuración de su agente Datadog con`ENC[ ]` . El siguiente es un ejemplo en el que se necesita recuperar un secreto en texto plano:

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="Gestor de secretos de GCP" level="h4" expanded=false id="id-for-gcp" %}}

**Disponible en la versión 7.74+ del agente.**

 Se admiten los siguientes servicios de GCP:

|  valor secret_backend_type                               |  Servicio GCP                    |
| ------------------------------------------------------- | ------------------------------ |
| `gcp.secretmanager` |  [Administrador secreto de GCP][5000] |

#####  Política de autenticación y acceso de GCP

La implementación de GCP Secret Manager utiliza [Credenciales predeterminadas de la aplicación (ADC)][5001] para la autenticación con Google.

Para interactuar con GCP Secret Manager, la cuenta de servicio utilizada por el agente de Datadog (como la cuenta de servicio de la máquina virtual, una identidad de carga de trabajo o credenciales activadas localmente) requiere la`secretmanager.versions.access` permiso.

Esto se puede otorgar con el rol predefinido.** Administrador secreto, accesorio secreto** (`roles/secretmanager.secretAccessor` ) o un rol personalizado con acceso equivalente [5002].

En los entornos de ejecución GCE o GKE, ADC se configura automáticamente a través de la cuenta de servicio asociada a la instancia o al pod. La cuenta de servicio adjunta debe tener los roles adecuados para acceder a GCP Secret Manager. Además, el entorno de ejecución de GCE o GKE requiere lo siguiente:`cloud-platform` [Ámbito de acceso OAuth][5003].

#####  Ejemplo de configuración de GCP

Configure el agente de Datadog para que utilice GCP Secret Manager para resolver secretos con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Después de configurar el Agente para usar GCP Secret Manager, haga referencia a los secretos en sus configuraciones con`ENC[secret-name]` o`ENC[secret-name;key;version;]` .

La notación ENC se compone de:

- `secret` : el nombre secreto en GCP Secret Manager (por ejemplo,`datadog-api-key` ).
- `key` : (opcional) la clave a extraer de un secreto con formato JSON. Si está utilizando secretos en texto plano, puede omitir esto (ejemplo:`ENC[secret-name;;version]` ).
- `version` : (opcional) el número de versión secreto. Si no se especifica, el`latest` Se utiliza la versión.
  +  Ejemplos de sintaxis de versión:
    - `secret-key` Implícito`latest` versión
    - `secret-key;;latest` Explícito`latest` versión
    - `secret-key;;1` Número de versión específico

Por ejemplo, suponiendo que los secretos de GCP se llaman`datadog-api-key` con dos versiones y`datadog-app-key` :

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Para secretos con formato JSON, suponiendo que un secreto llamado`datadog-keys` contiene:

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

GCP Secret Manager admite versiones secretas. La implementación del agente también admite el control de versiones secreto mediante el uso de`;` delimitador. Si no se especifica ninguna versión, la`latest` Se utiliza la versión.


#####  Soporte secreto JSON

El agente Datadog admite la extracción de claves específicas de secretos con formato JSON utilizando el`;` delimitador:

- `datadog;api_key` Extrae el`api_key` campo del`datadog` secreto con un implícito`latest` versión
- `datadog;api_key;1` Extrae el`api_key` campo del`datadog` secreto de la versión `1`

{{% /collapse-content %}}


{{% collapse-content title="Backend de HashiCorp Vault" level="h4" expanded=false id="id-for-hashicorp" %}}

Se admiten los siguientes servicios de HashiCorp:

|  valor secret_backend_type                               |  Servicio HashiCorp                                  |
| ------------------------------------------ | -------------------------------------------------- |
| `hashicorp.vault` |  [HashiCorp Vault (Secrets Engine Versiones 1 y 2)][3000] |

#####  Cómo configurar HashiCorp Vault
1.  Ejecuta tu HashiCorp Vault. Consulte la [documentación oficial de HashiCorp Vault][3001] para obtener más información.
2.  Redacta una política que autorice la extracción de secretos de tu bóveda. Crear un`*.hcl` archivo, e incluya el siguiente permiso si utiliza Secrets Engine Versión 1:
```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si utiliza Secrets Engine versión 2, necesitará los siguientes permisos:
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
3. Correr`vault policy write <policy_name> <path_to_*.hcl_file>`

4.  Elige el método de autenticación para acceder a tu bóveda. Si utiliza el método de perfil de instancia de AWS, ejecute`vault auth enable aws` .

#####  Instrucciones para el perfil de instancia de AWS

Datadog recomienda que se autentique utilizando el [método de perfil de instancia][3003] si está ejecutando su HashiCorp Vault desde una máquina conectada a AWS.

Una vez configurado esto, escriba una [política de bóveda específica de autenticación][3004].

#####  Ejemplo de configuración

En el siguiente ejemplo, supongamos que el prefijo de ruta secreta de HashiCorp Vault es`/Datadog/Production` con una clave de parámetro de`apikey` :

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

El siguiente ejemplo obtiene el valor de la clave API de HashiCorp Vault utilizando AWS para la autenticación.

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

**Disponible en la versión 7.75+ del agente.**

 Se admiten los siguientes servicios de Kubernetes:

|  valor secret_backend_type |  Servicio |
|---------------------------|---------|
| `k8s.secrets` |  [Secretos de Kubernetes][7000] |

#####  Requisitos previos

El backend de secretos de Kubernetes requiere:
- ** credenciales de ServiceAccount** : Por defecto, utiliza tokens de ServiceAccount montados automáticamente (`automountServiceAccountToken: true` , ver[ Documentación de Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting) ). Se pueden configurar rutas personalizadas si es necesario.
- ** permisos RBAC** La cuenta de servicio del agente debe tener permisos para leer secretos de los espacios de nombres de destino.
- ** Acceso a la red** El pod del agente debe poder acceder al servidor API de Kubernetes.

#####  Configuración de RBAC

Para cada espacio de nombres que contenga secretos, cree un`Role` y`RoleBinding` utilizando el siguiente ejemplo con el nombre de espacio de nombres correcto:

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

Configure el agente de Datadog para que utilice secretos de Kubernetes con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

El formato de notación ENC es`namespace/secret-name;key` :
- `namespace` : El espacio de nombres de Kubernetes que contiene el secreto
- `secret-name` : El nombre del recurso secreto
- `key` : La clave específica que se extraerá del campo de datos del Secreto

** Ejemplo:** Dado un secreto en el espacio de nombres`secrets-ns` :

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

Puede consultar claves individuales:
```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**Compatibilidad con múltiples espacios de nombres:**
Cada referencia secreta puede especificar un espacio de nombres diferente (se debe configurar RBAC para cada una):

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Timón" %}}

Configure el agente de Datadog para usar secretos de Kubernetes con Helm:

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

**Nota:** Un marcador de posición`apiKey` es necesario para la validación del gráfico de Helm cuando se utiliza un backend secreto para resolver la clave API. El`DD_API_KEY` La variable de entorno lo anula. Debe crear manualmente RBAC (Rol + Enlace de rol) para cada espacio de nombres que contenga secretos. Para obtener más información, consulte la[ Configuración de RBAC](#rbac-setup) sección.

<div class="alert alert-info"> Helm no tiene funciones nativas<code> secretBackend.type</code> configuración. Utilizar variables de entorno. </div>

{{% /tab %}}

{{% tab "Operador" %}}

Configure el agente de Datadog para usar secretos de Kubernetes con el operador de Datadog:

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

**Nota:** Una clave API de marcador de posición satisface la validación del operador cuando se utiliza un backend secreto para resolver la clave API. El`DD_API_KEY` La variable de entorno lo anula. Debe crear manualmente RBAC (Rol + Enlace de rol) para cada espacio de nombres que contenga secretos. Para obtener más información, consulte la[ Configuración de RBAC](#rbac-setup) sección.

<div class="alert alert-info"> El operador no tiene nativo<code> secretBackend.type</code> configuración. Utilice variables de entorno en<code> anular.nodeAgent.env</code> . </div>

{{% /tab %}}
{{< /tabs >}}

##### Configuración de ruta personalizada
Si su configuración no sigue las ubicaciones predeterminadas para la autenticación basada en ServiceAccount, puede especificar`token_path` y`ca_path` en cambio.

{{< tabs >}}
{{% tab "YAML del agente" %}}
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

Si su configuración no expone el valor predeterminado`KUBERNETES_SERVICE_HOST` y`KUBERNETES_SERVICE_PORT` variables de entorno, puede proporcionar una`api_server` URL para interactuar con la API REST de Kubernetes.

{{< tabs >}}
{{% tab "YAML del agente" %}}
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

{{% collapse-content title="Secretos de Docker" level="h4" expanded=false id="id-for-docker" %}}

**Disponible en la versión 7.75+ del agente.**

 Se admiten los siguientes servicios de Docker:

|  valor secret_backend_type |  Servicio |
|---------------------------|---------|
| `docker.secrets` |  [Secretos de Docker][6001] |

#####  Requisitos previos

El backend de secretos de Docker admite tanto [secretos de Docker Swarm][6002] como [secretos de Docker Compose][6003]. Por defecto, tanto Swarm como Compose montan automáticamente los secretos dentro del contenedor como archivos en`/run/secrets` (Linux) o`C:\ProgramData\Docker\secrets` (Windows).

** Nota** Los secretos de Compose pueden estar basados ​​en archivos (apuntando a archivos locales) o ser externos (haciendo referencia a secretos de Swarm existentes).

#####  Ejemplo de configuración

Configure el agente de Datadog para que utilice Docker Secrets con la siguiente configuración:

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

El formato de notación ENC es el nombre secreto, que corresponde al nombre del archivo en`/run/secrets/` :
- `ENC[api_key]` lee de`/run/secrets/api_key` (Linux) o`C:\ProgramData\Docker\secrets\api_key` (Windows)

** Ruta de secretos personalizados:**
Si Docker Swarm o Compose están configurados para montar secretos en una ubicación diferente, puede especificarlo de esta manera:

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

El secreto`dd_api_key` se monta automáticamente en`/run/secrets/dd_api_key` y el Agente lo lee usando el`docker.secrets` backend.

#####  Ejemplo de Docker Compose

[Crear][6003] a`docker-compose.yml` con secretos basados ​​en archivos:

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

El archivo secreto`./secrets/api_key.txt` está montado en`/run/secrets/dd_api_key` en el contenedor.


{{% /collapse-content %}}

{{% collapse-content title="Backends secretos para archivos JSON, YAML o TEXTO" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| valor secret_backend_type                                 |  Servicio de archivos                             |
|---------------------------------------------|-----------------------------------------|
|`file.json`           | [JSON][4001]                             |
|`file.yaml`          | [YAML][4002]                        |                            |
|`file.text`          | [TEXTO][4003]                        |                            |

#####  Permisos de archivo
El backend de archivos solo requiere** leer** permisos para los archivos JSON, YAML o TEXTO configurados. Estos permisos deben otorgarse al usuario local del agente de Datadog (`dd-agent` en Linux,`ddagentuser` en Windows).


{{< tabs >}}
{{% tab "Backend de archivos JSON" %}}

**Nota** : Solo se admite un nivel de profundidad JSON (por ejemplo,`{"key": "value"}` )

#####  Ejemplo de configuración

Puedes usar un archivo JSON para almacenar secretos localmente.

Por ejemplo, con un archivo JSON en`/path/to/secret.json` que contiene lo siguiente:

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


{{% tab "Backend de archivos YAML" %}}

**Nota** : Solo se admite un nivel de profundidad YAML (por ejemplo,`key: value` )

#####  Ejemplo de configuración

Puedes usar un archivo YAML para almacenar secretos localmente.

Como ejemplo, si tenemos un archivo YAML en`/path/to/secret.yaml` que contiene:

```yaml
datadog_api_key: your api key
```

Puedes usar la siguiente configuración para extraer secretos:

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Archivo de texto Backend" %}}

**Disponible en la versión 7.75+ del agente.**

** Nota** Cada secreto debe almacenarse en su propio archivo de texto individual.

#####  Ejemplo de configuración

Puedes usar archivos de texto individuales para almacenar secretos localmente.

Por ejemplo, con archivos de texto en`/path/to/secrets/` :

`/path/to/secrets/dd_api_key` que contiene:
```
your_api_key_value
```

`/path/to/secrets/dd_app_key` que contiene:
```
your_app_key_value
```

Puedes usar esta configuración para extraer secretos de ellos:

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### Seguridad de la ruta:

-  Rutas relativas en`ENC[]` se resuelven en relación con`secrets_path` (p.ej,`ENC[dd_api_key]` con`secret_path: /path/to/secrets` se resolverá`/path/to/secrets/dd_api_key` )
-  Rutas absolutas en`ENC[]` debe estar dentro`secrets_path` (p.ej,`ENC[/path/to/secrets/dd_api_key]` con`secret_path: /path/to/secrets` funcionará)
-  Intentos de recorrido de ruta (por ejemplo,`ENC[../etc/passwd]` ) están bloqueados y fallarán con "ruta fuera del directorio permitido".

** Nota:** Algunas herramientas añaden automáticamente saltos de línea al exportar secretos a archivos. Ver[ Eliminar los saltos de línea finales](#remove-trailing-line-breaks) para saber cómo manejar esto.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### Opción 2: Usar el script integrado para Kubernetes y Docker

Para entornos en contenedores, las imágenes de contenedor del agente de Datadog incluyen un script integrado.`/readsecret_multiple_providers.sh` A partir de la versión v7.32.0, este script permite leer secretos de:

*  Archivos: usando`ENC[file@/path/to/file]`
*  Secretos de Kubernetes: uso `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

Para utilizar este ejecutable con Datadog Operator, configúrelo de la siguiente manera:
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

Para usar este ejecutable con el gráfico de Helm, configúrelo de la siguiente manera:
```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Para usar este ejecutable, configure la variable de entorno.`DD_SECRET_BACKEND_COMMAND` como sigue:
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Ejemplo: Lectura desde archivos montados

Kubernetes admite [exponer secretos como archivos][2] dentro de un pod que el agente puede leer para resolver secretos.

En Kubernetes, puedes montar un Secret como un volumen de esta manera:
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

Luego puedes hacer referencia al secreto de esta manera:
```
password: ENC[file@/etc/secret-volume/password]
```

**Notas** :
-  El secreto debe existir en el mismo espacio de nombres que el pod en el que se está montando.
-  El script puede acceder a todas las subcarpetas, incluidas las sensibles.`/var/run/secrets/kubernetes.io/serviceaccount/token` . Por lo tanto, Datadog recomienda usar una carpeta dedicada en lugar de`/var/run/secrets` .

[Secretos de Docker Swarm][3] están montados en el`/run/secrets` carpeta. Por ejemplo, el secreto de Docker`db_prod_passsword` está ubicado en`/run/secrets/db_prod_password` en el contenedor del agente. Esto se referenciaría en la configuración con`ENC[file@/run/secrets/db_prod_password]` .

####  Ejemplo: Lectura de un secreto de Kubernetes en diferentes espacios de nombres.

Si desea que el Agente lea un Secreto de un espacio de nombres diferente, utilice el`k8s_secret@` prefijo. Por ejemplo:
```
password: ENC[k8s_secret@database/database-secret/password]
```

Configure RBAC para permitir que la cuenta de servicio del agente lea el secreto. El siguiente rol otorga acceso de lectura a la`database-secret` Secreto en el`database` espacio de nombres:
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
***Nota*** : Cada espacio de nombres en la lista de roles también debe configurarse en el`WATCH_NAMESPACE` o`DD_AGENT_WATCH_NAMESPACE` variable de entorno en la implementación de Datadog Operator.
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


Como alternativa, puede definir los recursos RBAC directamente:
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

Este`Role` da acceso a la`Secret: database-secret` en el`Namespace: database` . El`RoleBinding` vincula este permiso con el`ServiceAccount: datadog-agent` en el`Namespace: default` . Esto debe agregarse manualmente a su clúster con respecto a los recursos implementados.

###  Opción 3: Crear un ejecutable personalizado

Para recuperar los secretos, el Agente utiliza un archivo ejecutable externo que usted proporciona. El archivo ejecutable se utiliza cuando se descubren nuevos secretos y se almacena en caché durante el ciclo de vida del agente. Si necesita actualizar o rotar un secreto, debe reiniciar el Agente para recargarlo.

Esto le permite utilizar cualquier solución de gestión de secretos y le otorga un control total sobre cómo el Agente accede a los secretos.

El agente envía a este ejecutable una carga útil JSON a través de la entrada estándar que contiene una lista de identificadores secretos para resolver. Luego, tu archivo ejecutable obtiene cada secreto y los devuelve en formato JSON a través de la salida estándar.

El siguiente ejemplo muestra lo que el Agente envía a su ejecutable en STDIN:
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (cadena): La versión del formato.
* `secrets` (lista de cadenas): Cada cadena es un identificador para un secreto que se va a recuperar.


El ejecutable responde mediante la siguiente salida STDOUT:
```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (cadena): El valor secreto que se utilizará en las configuraciones. Esto puede ser`null` en caso de error.
* `error` (cadena): Un mensaje de error o`null` .

Si no se puede resolver un secreto (ya sea devolviendo un código de salida distinto de cero o un error distinto de nulo), el Agente ignora la configuración relacionada.

** Nunca publique información confidencial en`stderr`** . Si el binario finaliza con un código de estado diferente al`0` El agente registra la salida de error estándar de su ejecutable para la resolución de problemas.

También puedes crear tu propio ejecutable para recuperar secretos utilizando cualquier lenguaje de programación. El único requisito es que siga el formato de entrada/salida descrito anteriormente.

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

En la siguiente memoria:

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Puede configurar el Agente para que utilice el binario para resolver secretos agregando lo siguiente:
```
secret_backend_command: /path/to/binary
```

## Requisitos de seguridad del agente

El agente ejecuta el archivo ejecutable proporcionado como un subproceso. Los patrones de ejecución difieren en Linux y Windows.

{{< tabs >}}
{{% tab "Linux" %}}

En Linux, su archivo ejecutable debe:

*  Pertenecen al mismo usuario que ejecuta el Agente (`dd-agent` por defecto, o`root` dentro de un contenedor).
*  No tienen derechos para`group` o`other` .
*  Tener al menos el** ejecutar** derecho del propietario.

{{% /tab %}}
{{% tab "Windows" %}}

En Windows, su archivo ejecutable debe:

*  Tener** leer** o** ejecutar** para`ddagentuser` (el usuario que solía ejecutar el Agente).
*  No tienen derechos para ningún usuario o grupo excepto para el** Administradores** grupo, el incorporado** Sistema local** cuenta o el contexto de usuario del Agente (`ddagentuser` por defecto).
*  Debe ser una aplicación Win32 válida para que el Agente pueda ejecutarla (por ejemplo, un script de PowerShell o Python no funciona).

{{% /tab %}}
{{< /tabs >}}

**Nota** : Su archivo ejecutable comparte las mismas variables de entorno que el Agente.

##  Secretos refrescantes en tiempo de ejecución

A partir de la versión 7.67 del Agente, puede configurar el Agente para que actualice los secretos resueltos sin necesidad de reiniciarlo.

Establezca un intervalo de actualización:
```yaml
secret_refresh_interval: 3600  # refresh every hour
```

O bien, active la actualización manualmente:
```shell
datadog-agent secret refresh
```

### Actualización de la clave API/APP
Las claves de API/APP obtenidas como secretos admiten la actualización en tiempo de ejecución.

Puedes habilitar esto configurando`secret_refresh_interval` (en segundos) en`datadog.yaml` :
```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

Por defecto, el Agente aleatoriza la actualización inicial dentro del`secret_refresh_interval` ventana para evitar una flota de
Los agentes se actualizan simultáneamente. La clave se resuelve al iniciar y luego se actualiza una vez dentro del primer intervalo.
y en cada intervalo posterior.

Para evitar tiempos de inactividad, invalide las claves antiguas solo después de que toda su flota haya obtenido las claves actualizadas. Puedes rastrear la clave
uso en el[ Gestión de flotas](https://app.datadoghq.com/fleet) página.

Puedes desactivar este comportamiento configurando:
```yaml
secret_refresh_scatter: false
```

### Actualización de secretos de comprobación de detección automática
A partir de Agent v7.76, las comprobaciones programadas de [Autodiscovery][1] pueden actualizar los secretos en tiempo de ejecución si la plantilla utiliza el`ENC[]` sintaxis.

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

El agente puede entonces activar la actualización de secretos en el intervalo establecido en`secret_refresh_interval` o manualmente con`datadog-agent secret refresh` .

###  Actualización automática de secretos en caso de fallo o invalidez de la clave API.

A partir de la versión v7.74 del Agente, este puede actualizar automáticamente los secretos cuando detecta una clave API no válida. Esto ocurre cuando el agente recibe una respuesta 403 Prohibido de Datadog o cuando la comprobación periódica del estado detecta una clave API no válida o caducada.

Para habilitar esta función, configure`secret_refresh_on_api_key_failure_interval` a un intervalo en minutos en su`datadog.yaml` archivo. Empezar a`0` Deshabilitar (predeterminado).

Este intervalo es el tiempo mínimo entre dos actualizaciones para evitar saturar su solución de gestión de secretos cuando se detecta una clave API no válida.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Esta configuración es compatible con`secret_refresh_interval` .

###  Habilitar la actualización del recolector de DDOT
Si está utilizando [DDOT collector][6] y desea habilitar la actualización de API/APP, debe agregar la siguiente configuración adicional a su`datadog.yaml` archivo:
```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Esto garantiza que el recolector DDOT permanezca sincronizado con el Agente después de que se actualicen los secretos. De forma similar a como el Agente verifica periódicamente su estado de configuración, el recolector DDOT utiliza esta configuración para comprobar regularmente si el Agente ha actualizado los valores.

##  Solución de problemas

###  Listado de secretos detectados

El`secret` El comando en la CLI del agente muestra cualquier error relacionado con su configuración. Por ejemplo, si los permisos del archivo ejecutable son incorrectos. También muestra todos los identificadores encontrados y su ubicación.

En Linux, el comando muestra el modo de archivo, el propietario y el grupo del ejecutable. En Windows, se muestran los derechos de ACL.

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

Ejemplo en Windows (desde PowerShell de administrador):
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

### Observando las configuraciones después de que se inyectaron los secretos.

Para ver rápidamente cómo se resuelven las configuraciones de la comprobación, puede utilizar el`configcheck` dominio:

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

**Nota** : El agente necesita ser [reiniciado][7] para detectar los cambios en los archivos de configuración.

###  Depuración de su comando secret_backend_command

Para realizar pruebas o depuraciones fuera del Agente, puede imitar la forma en que el Agente lo ejecuta:

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

El`dd-agent` El usuario se crea al instalar el agente de Datadog.

{{% /tab %}}
{{% tab "Windows" %}}

##### Errores relacionados con los derechos

Los siguientes errores indican que falta algo en su configuración.

1.  Si algún otro grupo o usuario que no sea el necesario tiene derechos sobre el archivo ejecutable, se registra un error similar al siguiente:
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si`ddagentuser` No tiene permisos de lectura y ejecución sobre el archivo; se registró un error similar:
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Su archivo ejecutable debe ser una aplicación Win32 válida. De lo contrario, se registra el siguiente error:
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog tiene un [script de Powershell][9] para ayudarle a establecer el permiso correcto en su ejecutable. Ejemplo de cómo usarlo:

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

##### Probando su ejecutable

El agente ejecuta el archivo ejecutable al obtener sus secretos. El agente de Datadog se ejecuta utilizando el`ddagentuser` . Este usuario no tiene derechos específicos, pero forma parte de la`Performance Monitor Users` grupo. La contraseña de este usuario se genera aleatoriamente durante la instalación y nunca se guarda en ningún sitio.

Esto significa que su ejecutable podría funcionar con su usuario predeterminado o usuario de desarrollo, pero no cuando lo ejecuta el Agente, ya que`ddagentuser` tiene derechos más restringidos.

Para probar su ejecutable en las mismas condiciones que el Agente, actualice la contraseña del`ddagentuser` en tu entorno de desarrollo. De esta forma, puedes autenticarte como`ddagentuser` y ejecuta tu archivo ejecutable en el mismo contexto en el que lo haría el Agente.

Para ello, siga estos pasos:

1.  Eliminar`ddagentuser` desde`Local Policies/User Rights Assignement/Deny Log on locally` la lista en el`Local Security Policy` .
2.  Establecer una nueva contraseña para`ddagentuser` (ya que el que se genera en el momento de la instalación nunca se guarda en ningún sitio). En PowerShell, ejecute:
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Actualizar la contraseña que se utilizará por`DatadogAgent` servicio en el Administrador de Control de Servicios. En PowerShell, ejecute:
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Ahora puedes iniciar sesión como`ddagentuser` para probar tu ejecutable. Datadog tiene un [script de Powershell][10] para ayudarle a probar su
ejecutable como otro usuario. Cambia el contexto del usuario e imita la forma en que el Agente ejecuta el archivo ejecutable.

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

### El agente se niega a comenzar.

Lo primero que hace el Agente al iniciarse es cargar`datadog.yaml` y descifrar cualquier secreto que contenga. Esto se hace antes de configurar el registro de eventos. Esto significa que en plataformas como Windows, se producen errores al cargar`datadog.yaml` no están escritos en los registros, pero en`stderr` . Esto puede ocurrir cuando el archivo ejecutable proporcionado al agente para obtener los secretos devuelve un error.

Si tienes secretos en`datadog.yaml` y el agente se niega a arrancar:

*  Intenta iniciar el Agente manualmente para poder ver`stderr` .
*  Elimine los secretos de`datadog.yaml` y prueba primero con secretos en un archivo de configuración de verificación.

###  Prueba de permisos de Kubernetes
Al leer Secretos directamente desde Kubernetes, puede verificar sus permisos con el`kubectl auth` dominio. La forma general de esto es:

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considere lo anterior[ Ejemplo de secretos de Kubernetes](#example-reading-a-kubernetes-secret-across-namespaces) donde el secreto`Secret:database-secret` existe en el`Namespace: database` y la Cuenta de Servicio`ServiceAccount:datadog-agent` existe en el`Namespace: default` .

En este caso, utilice el siguiente comando:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Este comando devuelve si los permisos son válidos para que el Agente vea este Secreto.

###  Eliminar saltos de línea finales {#removetrailinglinebreaks}

Algunas herramientas de gestión de secretos añaden automáticamente un salto de línea al exportar secretos a través de archivos. Puedes eliminar estos saltos de línea configurando`secret_backend_remove_trailing_line_break: true` en [el archivo de configuración datadog.yaml][8], o utilice la variable de entorno`DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` hacer lo mismo, especialmente en entornos de contenedores.

###  Variables de autodescubrimiento en identificadores secretos

También es posible utilizar variables [Autodiscovery][1] en identificadores secretos. El agente resuelve estas variables antes de resolver el secreto. Por ejemplo:
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Lecturas adicionales

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