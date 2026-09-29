---
algolia:
  tags:
  - secrets
  - secrets executable
  - secrets provider
  - list secrets
aliases:
- /fr/agent/faq/kubernetes-secrets
- /fr/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: Documentation
  text: Autodiscovery
title: Gestion des secrets
---
## Présentation {#overview}

Le Datadog Agent vous aide à gérer vos secrets en toute sécurité en s'intégrant aux solutions de gestion des secrets suivantes :
- [AWS Secrets Manager](#id-for-secrets)
- [AWS SSM](#id-for-ssm)
- [Azure KeyVault](#id-for-azure)
- [GCP Secret Manager](#id-for-gcp)
- [HashiCorp Vault](#id-for-hashicorp)
- [Kubernetes Secrets](#id-for-kubernetes)
- [Docker Secrets](#id-for-docker)
- [Fichier texte](#id-for-json-yaml-text)
- [Fichier JSON](#id-for-json-yaml-text)
- [Fichier YAML](#id-for-json-yaml-text)
- [Clé de registre Windows](#id-for-windows-regkey)

Au lieu de coder en dur des valeurs sensibles comme des clés d'API ou des mots de passe en texte clair dans les fichiers de configuration, l'Agent peut les récupérer dynamiquement au moment de l'exécution. Pour référencer un secret dans votre configuration, utilisez la notation `ENC[<secret_id>]`. Le secret est récupéré et chargé en mémoire, mais n'est jamais écrit sur le disque ni envoyé au backend Datadog.

**Remarque** : Vous ne pouvez pas utiliser la syntaxe `ENC[]` dans les paramètres `secret_*` comme `secret_backend_command`.

## Options pour la récupération des secrets {#options-for-retrieving-secrets}

### Option 1 : Utilisation de la prise en charge native de l'Agent pour récupérer les secrets {#option-1-using-native-agent-support-for-fetching-secrets}

Remarques :
- **Agent 7.70+** : Prise en charge native de la gestion des secrets introduite.
- **Agent 7.76+** : gestion native des secrets disponible pour les agents compatibles FIPS.
- **Agent 7.77+** : le [Cluster Agent](/containers/cluster_agent/) nécessite l'Agent 7.77 ou une version ultérieure dans les environnements conteneurisés. Pour les versions antérieures, utilisez [l'Option 2](#option-2-using-the-built-in-script-for-kubernetes-and-docker) ou [l'Option 3](#option-3-creating-a-custom-executable) à la place.
- **Agent 7.80+** : prise en charge de [plusieurs backends](#multiple-backends).

#### Backend unique {#single-backend}

Utilisez `secret_backend_type` et `secret_backend_config` dans `datadog.yaml` pour configurer un backend de secrets unique :

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

Des instructions de configuration plus spécifiques dépendent du type de backend utilisé. Consultez la section appropriée ci-dessous pour plus d'informations :


{{% collapse-content title="AWS Secrets" level="h5" expanded=false id="id-for-secrets" %}}
Les services AWS suivants sont pris en charge :

|Valeur secret_backend_type                                | Service AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### Configurer un profil d'instance {#set-up-an-instance-profile}

Datadog recommande d'utiliser la [méthode du profil d'instance][1006] pour récupérer les secrets, car AWS gère toutes les variables d'environnement et les profils de session pour vous. Vous trouverez plus d'instructions sur la façon de procéder dans la [documentation officielle d'AWS Secrets Manager][1000].

##### Exemple de configuration {#configuration-example}

{{< tabs >}}
{{% tab "Fichier YAML de l'Agent" %}}

Configurez le Datadog Agent pour utiliser AWS Secrets afin de résoudre les secrets à l'aide de la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Lorsque vous utilisez des variables d'environnement, convertissez la configuration au format JSON comme suit :

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Une fois l'Agent configuré pour utiliser AWS Secrets, vous pouvez référencer tous les secrets dans vos configurations avec `ENC[secretId;secretKey]`.

La notation ENC est composée :
* `secretId` : soit le « nom convivial » secret (par exemple, `/DatadogAgent/Production`), soit l'ARN (par exemple, `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`).
  - **Remarque** : Le format ARN complet est requis lors de l'accès aux secrets depuis un compte différent où le credential AWS ou `sts:AssumeRole` est défini.
* `secretKey` : la clé JSON du secret AWS que vous souhaitez utiliser.


AWS Secrets Manager peut stocker plusieurs paires clé-valeur au sein d'un seul secret. Une configuration de backend utilisant Secrets Manager a accès à toutes les clés définies dans un secret.

Par exemple, en supposant que l'ID de secret `My-Secrets` contienne les 3 valeurs suivantes :

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

Voici un exemple complet du fichier de configuration `datadog.yaml` utilisant AWS Secrets pour extraire sa clé d'API de `My-Secrets` :

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

##### Toutes les options `aws_session` {#all-aws-session-options}

Les champs `aws_session` suivants configurent la manière dont l'Agent s'authentifie auprès d'AWS. Tous les champs sont facultatifs ; lorsqu'aucun n'est défini, l'Agent utilise la [default credential chain][1007] (profil d'instance, variables d'environnement, fichier de configuration partagé, etc.).

| Champ | Description |
|---|---|
| `aws_region` | Région AWS (par exemple, `us-east-1`). |
| `aws_access_key_id` | ID de clé d'accès AWS statique. À utiliser avec `aws_secret_access_key`. |
| `aws_secret_access_key` | Clé d'accès secrète AWS statique. À utiliser avec `aws_access_key_id`. |
| `aws_profile` | Profil nommé issu du fichier de configuration AWS partagé (`~/.aws/config`). |
| `aws_role_arn` | ARN du rôle IAM à assumer avec `sts:AssumeRole`. |
| `aws_external_id` | ID externe à transmettre lors de l'assomption d'un rôle inter-comptes. |

##### `force_string` option {#force-string-option}

Définissez `force_string: true` au niveau supérieur de `secret_backend_config` pour renvoyer la chaîne de caractères brute du secret au lieu de l'analyser en tant que JSON. Ceci est utile lorsqu'un secret est stocké en texte brut plutôt qu'en tant qu'objet JSON.

```yaml
secret_backend_type: aws.secrets
secret_backend_config:
  force_string: true
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

Configurez le Datadog Agent pour utiliser AWS Secrets afin de résoudre les secrets dans Helm en utilisant la configuration suivante :

##### Check d'intégration {#integration-check}

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

<div class="alert alert-info"> Vous devez inclure le <code>serviceAccountAnnotations</code> pour accorder à l'Agent les autorisations d'accès au secret AWS. </div>

<br>


##### Check de cluster : sans exécuteurs de check de cluster activés {#cluster-check-without-cluster-check-runners-enabled}

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

##### Check de cluster : avec exécuteurs de check de cluster activés {#cluster-check-with-cluster-check-runners-enabled}

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

{{% tab "Opérateur" %}}

Configurez le Datadog Agent pour utiliser AWS Secrets afin de résoudre les secrets avec le Datadog Operator en utilisant la configuration suivante :

##### Check d'intégration {#integration-check-1}


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

<div class="alert alert-info"> Vous devez inclure le <code>serviceAccountAnnotations</code> pour accorder à l'Agent les autorisations d'accès au secret AWS. </div>

<br>


##### Check de cluster : sans exécuteurs de check de cluster activés {#cluster-check-without-cluster-check-runners-enabled-1}

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

##### Check de cluster : avec exécuteurs de check de cluster activés {#cluster-check-with-cluster-check-runners-enabled-1}

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

**Alternativement**, avec Datadog Operator v1.25.0+ et Agent v7.70+, vous pouvez utiliser les champs natifs `secretBackend.type` et `secretBackend.config` au lieu des variables d'environnement. Par exemple : `spec.global.secretBackend.type: "aws.secrets"` et `spec.global.secretBackend.config` avec `aws_session.aws_region: "<AWS_REGION>"`.

{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="AWS SSM" level="h5" expanded=false id="id-for-ssm" %}}
Les services AWS suivants sont pris en charge :

|Valeur secret_backend_type                                | Service AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### Configurer un profil d'instance {#set-up-an-instance-profile-1}

Datadog recommande d'utiliser la [méthode du profil d'instance][1006] pour récupérer les secrets, car AWS gère toutes les variables d'environnement et les profils de session pour vous. Plus d'instructions sur la façon de procéder sont disponibles dans la [documentation officielle d'AWS Secrets Manager][1001].

##### Exemple de configuration {#configuration-example-1}

AWS Systems Manager Parameter Store prend en charge un modèle hiérarchique. Par exemple, en supposant les chemins AWS Systems Manager Parameter Store suivants :

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

Les paramètres peuvent être récupérés comme suit :

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

##### Toutes les options `aws_session` {#all-aws-session-options-1}

Les champs `aws_session` suivants configurent la manière dont l'Agent s'authentifie auprès d'AWS. Tous les champs sont facultatifs ; lorsqu'aucun n'est défini, l'Agent utilise la [default credential chain][1007] (profil d'instance, variables d'environnement, fichier de configuration partagé, etc.).

| Champ | Description |
|---|---|
| `aws_region` | Région AWS (par exemple, `us-east-1`). |
| `aws_access_key_id` | ID de clé d'accès AWS statique. À utiliser avec `aws_secret_access_key`. |
| `aws_secret_access_key` | Clé d'accès secrète AWS statique. À utiliser avec `aws_access_key_id`. |
| `aws_profile` | Profil nommé issu du fichier de configuration AWS partagé (`~/.aws/config`). |
| `aws_role_arn` | ARN du rôle IAM à assumer avec `sts:AssumeRole`. |
| `aws_external_id` | ID externe à transmettre lors de l'utilisation d'un rôle inter-comptes. |

{{% /collapse-content %}}


{{% collapse-content title="Backend Azure KeyVault" level="h5" expanded=false id="id-for-azure" %}}


Les services Azure suivants sont pris en charge :

| Valeur secret_backend_type                            | Azure Service          |
| ----------------------------------------|------------------------|
| `azure.keyvault` | [Azure KeyVault][2000] |

##### Authentification Azure {#azure-authentication}

Datadog recommande d'utiliser des Managed Identities pour s'authentifier auprès d'Azure. Cela vous permet d'associer des ressources cloud à des comptes AMI et supprime le besoin d'insérer des informations sensibles dans votre fichier de configuration `datadog.yaml`.

##### Managed identity {#managed-identity}

Pour accéder à votre Key Vault, créez une Managed Identity et affectez-la à votre machine virtuelle. Ensuite, configurez l'attribution de rôle appropriée sur le Key Vault pour permettre à cette identité d'accéder à ses secrets.

##### Exemple de configuration {#configuration-example-2}

{{< tabs >}}
{{% tab "Fichier YAML de l'Agent" %}}

La configuration du backend pour les secrets Azure Key Vault est structurée au format YAML selon le schéma suivant :

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
  azure_session:
    azure_client_id: {clientID}  # User-assigned managed identity client ID; omit this field for system-assigned
```

Lorsque vous utilisez des variables d'environnement, convertissez la configuration au format JSON :

```sh
DD_SECRET_BACKEND_TYPE="azure.keyvault"
DD_SECRET_BACKEND_CONFIG='{"keyvaulturl": "<keyVaultURL>", "azure_session": {"azure_client_id": "<CLIENT_ID>"}}'
```

Le secret du backend est référencé dans votre fichier de configuration du Datadog Agent avec `ENC[ ]`. Voici un exemple où un secret en texte clair doit être récupéré :

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

##### Toutes les options `azure_session` {#all-azure-session-options}

Les champs `azure_session` suivants contrôlent la manière dont l'Agent s'authentifie auprès d'Azure. Tous les champs sont facultatifs — l'Agent recourt à [Default Azure Credential][2001] (variables d'environnement, Workload Identity, system-assigned Managed Identity, Azure CLI, etc.) lorsqu'aucun n'est défini.

| Champ | Description |
|---|---|
| `azure_client_id` | Client ID d'une user-assigned Managed Identity, ou d'un service principal. |
| `azure_tenant_id` | Tenant ID pour l'authentification par service principal. Requis avec `azure_client_id` et un secret client ou un certificat. |
| `azure_client_secret` | Secret client pour l'authentification par principal de service. |
| `azure_client_certificate_path` | Chemin d'accès à un fichier de certificat PEM ou PKCS12 pour l'authentification par certificat du service principal. |
| `azure_client_certificate_password` | Mot de passe du fichier de certificat (si protégé par mot de passe). |
| `azure_client_send_certificate_chain` | Définissez sur `true` pour envoyer la chaîne de certificats complète lors de l'utilisation de l'authentification par certificat. |

L'authentification est sélectionnée en fonction des champs fournis :
- **Service principal avec secret** : `azure_tenant_id` + `azure_client_id` + `azure_client_secret`
- **Service principal avec certificat** : `azure_tenant_id` + `azure_client_id` + `azure_client_certificate_path`
- **User-assigned Managed Identity** : `azure_client_id` uniquement
- **Default Azure Credential** (recommandé) : omettez tous les champs `azure_session`

{{% /tab %}}

{{% tab "Helm" %}}

Configurez le Datadog Agent pour utiliser Azure Key Vault afin de résoudre les secrets dans Helm en utilisant la configuration suivante :

##### Check d'intégration {#integration-check-2}

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

##### Check de cluster : sans exécuteurs de check de cluster activés {#cluster-check-without-cluster-check-runners-enabled-2}

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

##### Check de cluster : avec exécuteurs de check de cluster activés {#cluster-check-with-cluster-check-runners-enabled-2}

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

{{% tab "Opérateur" %}}

Configurez le Datadog Agent pour utiliser Azure Key Vault afin de résoudre les secrets avec le Datadog Operator en utilisant la configuration suivante :

##### Check d'intégration {#integration-check-3}

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

##### Check de cluster : sans exécuteurs de check de cluster activés {#cluster-check-without-cluster-check-runners-enabled-3}

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

##### Check de cluster : avec exécuteurs de check de cluster activés {#cluster-check-with-cluster-check-runners-enabled-3}

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

**Alternativement**, avec Datadog Operator v1.25.0+ et Agent v7.70+, vous pouvez utiliser les champs natifs `secretBackend.type` et `secretBackend.config` au lieu des variables d'environnement. Par exemple : `spec.global.secretBackend.type: "azure.keyvault"` et `spec.global.secretBackend.config` avec les clés `keyvaulturl` et `azure_session.azure_client_id`.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h5" expanded=false id="id-for-gcp" %}}

*Disponible dans la version 7.74+ de l'Agent*

Les services GCP suivants sont pris en charge :

| Valeur secret_backend_type                               | Service GCP                    |
| ------------------------------------------------------- | ------------------------------ |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### Authentification GCP et politique d'accès {#gcp-authentication-and-access-policy}

L'implémentation de GCP Secret Manager utilise [Application Default Credentials (ADC)][5001] pour l'authentification auprès de Google.

Pour interagir avec GCP Secret Manager, le compte de service utilisé par le Datadog Agent (tel que le compte de service de la VM, une identité de charge de travail ou des identifiants activés localement) nécessite l'autorisation `secretmanager.versions.access`.

Celle-ci peut être accordée avec le rôle prédéfini {{< ui >}}Secret Manager Secret Accessor{{< /ui >}} (`roles/secretmanager.secretAccessor`) ou un rôle personnalisé avec un [accès][5002] équivalent.

Sur les environnements d'exécution GCE ou GKE, l'ADC est configuré automatiquement via le compte de service associé à l'instance ou au pod. Le compte de service associé doit disposer des rôles appropriés pour accéder à GCP Secret Manager. De plus, l'environnement d'exécution GCE ou GKE nécessite `cloud-platform` [le périmètre d'accès OAuth][5003].

##### Exemple de configuration GCP {#gcp-configuration-example}

{{< tabs >}}
{{% tab "Fichier YAML de l'Agent" %}}

Configurez le Datadog Agent pour utiliser GCP Secret Manager afin de résoudre les secrets avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Lorsque vous utilisez des variables d'environnement, convertissez la configuration au format JSON :

```sh
DD_SECRET_BACKEND_TYPE="gcp.secretmanager"
DD_SECRET_BACKEND_CONFIG='{"gcp_session":{"project_id":"<PROJECT_ID>"}}'
```

Après avoir configuré l'Agent Datadog pour utiliser GCP Secret Manager, référencez les secrets dans vos configurations avec `ENC[secret-name]` ou `ENC[secret-name;key;version;]`.

La notation ENC est composée :

- `secret` : le nom du secret dans GCP Secret Manager (par exemple, `datadog-api-key`).
- `key` : (facultatif) la clé à extraire d'un secret au format JSON. Si vous utilisez des secrets en texte brut, vous pouvez omettre ceci (exemple : `ENC[secret-name;;version]`).
- `version` : (facultatif) le numéro de version du secret. Si aucune version n'est spécifiée, la version `latest` est utilisée.
  + Exemples de syntaxe de version :
    - `secret-key` - Version `latest` implicite
    - `secret-key;;latest` - Version `latest` explicite
    - `secret-key;;1` - Numéro de version spécifique

Par exemple, en supposant des secrets GCP nommés `datadog-api-key` avec deux versions et `datadog-app-key` :

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Pour les secrets au format JSON, en supposant qu'un secret nommé `datadog-keys` contienne :

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

Référencez des clés spécifiques comme ceci :

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

Configurez le Datadog Agent pour utiliser GCP Secret Manager afin de résoudre les secrets dans Helm à l'aide de la configuration suivante :

##### Check d'intégration {#integration-check-4}

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

##### Check de cluster : sans exécuteurs de check de cluster activés {#cluster-check-without-cluster-check-runners-enabled-4}

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

##### Check de cluster : avec exécuteurs de check de cluster activés {#cluster-check-with-cluster-check-runners-enabled-4}

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

{{% tab "Opérateur" %}}

Configurez le Datadog Agent pour utiliser GCP Secret Manager afin de résoudre les secrets avec le Datadog Operator à l'aide de la configuration suivante :

##### Check de l'intégration {#integration-check-5}

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

##### Check de cluster : sans exécuteurs de check de cluster activés {#cluster-check-without-cluster-check-runners-enabled-5}

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

##### Check de cluster : avec exécuteurs de check de cluster activés {#cluster-check-with-cluster-check-runners-enabled-5}

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

**Alternativement**, avec Datadog Operator v1.25.0+ et Agent v7.70+, vous pouvez utiliser les champs natifs `secretBackend.type` et `secretBackend.config` au lieu des variables d'environnement. Par exemple : `spec.global.secretBackend.type: "gcp.secretmanager"` et `spec.global.secretBackend.config` avec `gcp_session.project_id: "<PROJECT_ID>"`.

{{% /tab %}}
{{< /tabs >}}

##### Gestion des versions des secrets {#secret-versioning}

GCP Secret Manager prend en charge les versions de secret. L'implémentation de l'Agent prend également en charge le versionnage des secrets à l'aide du délimiteur `;`. Si aucune version n'est spécifiée, la version `latest` est utilisée.


##### Prise en charge des secrets JSON {#json-secret-support}

Le Datadog Agent prend en charge l'extraction de clés spécifiques à partir de secrets au format JSON à l'aide du délimiteur `;` :

- `datadog;api_key` - Extrait le champ `api_key` du secret `datadog` avec une version `latest` implicite
- `datadog;api_key;1`  - Extrait le champ `api_key` du secret `datadog` à partir de la version `1`

{{% /collapse-content %}}


{{% collapse-content title="Backend Vault HashiCorp" level="h5" expanded=false id="id-for-hashicorp" %}}

Les services HashiCorp suivants sont pris en charge :

| Valeur de secret_backend_type                               | Service HashiCorp                                  |
| ------------------------------------------ | -------------------------------------------------- |
| `hashicorp.vault` | [HashiCorp Vault (Secrets Engine Versions 1 and 2)][3000] |

##### Comment configurer HashiCorp Vault {#how-to-set-up-hashicorp-vault}
1. Exécutez votre HashiCorp Vault. Consultez la [documentation officielle de HashiCorp Vault][3001] pour plus d'informations.
2. Rédigez une politique qui donne l'autorisation de récupérer des secrets depuis votre Vault. Créez un fichier `*.hcl` et incluez l'autorisation suivante si vous utilisez Secrets Engine Version 1 :

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si vous utilisez Secrets Engine Version 2, les autorisations suivantes sont nécessaires :

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
3. Exécutez `vault policy write <policy_name> <path_to_*.hcl_file>`

4. Choisissez la méthode d'authentification auprès de votre Vault. Si vous utilisez la méthode de profil d'instance AWS, exécutez `vault auth enable aws`.

##### Instructions pour le profil d'instance AWS {#aws-instance-profile-instructions}

Datadog recommande de vous authentifier en utilisant la [méthode de profil d'instance][3003] si vous exécutez votre HashiCorp Vault depuis une machine connectée à AWS.

Une fois cela configuré, rédigez une [politique Vault spécifique à l'authentification][3004].

##### Exemple de configuration {#configuration-example-3}

Dans l'exemple suivant, supposez que le préfixe du chemin secret HashiCorp Vault est `/Datadog/Production` avec une clé de paramètre `apikey` :

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

L'exemple suivant récupère la valeur de la clé d'API depuis HashiCorp Vault en tirant parti d'AWS pour l'authentification.

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

##### Toutes les options `vault_session` {#all-vault-session-options}

Les `vault_session` champs suivants contrôlent la manière dont l'Agent s'authentifie auprès de Vault.

| Champ | Description |
|---|---|
| `vault_auth_type` | Méthode d'authentification. Valeurs prises en charge : `aws`, `kubernetes`. S'il n'est pas défini, AppRole, userpass ou LDAP est utilisé en fonction des informations d'identification fournies. |
| `vault_role_id` | ID de rôle AppRole. À utiliser avec `vault_secret_id`. |
| `vault_secret_id` | ID secret AppRole. À utiliser avec `vault_role_id`. |
| `vault_username` | Nom d'utilisateur pour l'authentification userpass. À utiliser avec `vault_password`. |
| `vault_password` | Mot de passe pour l'authentification userpass. À utiliser avec `vault_username`. |
| `vault_ldap_username` | Nom d'utilisateur pour l'authentification LDAP. À utiliser avec `vault_ldap_password`. |
| `vault_ldap_password` | Mot de passe pour l'authentification LDAP. À utiliser avec `vault_ldap_username`. |
| `vault_aws_role` | Nom du rôle Vault pour l'authentification AWS IAM. Requis lorsque `vault_auth_type: aws`. |
| `vault_aws_iam_server_id` | Valeur pour l'en-tête `X-Vault-AWS-IAM-Server-ID`, utilisée pour empêcher les attaques par rejeu. |
| `aws_region` | Région AWS pour les demandes d'authentification IAM. La valeur par défaut est `us-east-1`. |
| `vault_kubernetes_role` | Nom du rôle Vault pour l'authentification Kubernetes. Requis lorsque `vault_auth_type: kubernetes`. |
| `vault_kubernetes_jwt` | Jeton JWT du compte de service Kubernetes sous forme de chaîne. |
| `vault_kubernetes_jwt_path` | Chemin vers le fichier de jeton JWT Kubernetes. La valeur par défaut est `/var/run/secrets/kubernetes.io/serviceaccount/token`. |
| `vault_kubernetes_mount_path` | Chemin de montage Vault pour la méthode d'authentification Kubernetes. |
| `implicit_auth` | Définissez sur `true` pour ignorer l'authentification et utiliser le jeton déjà défini dans l'environnement client Vault (par exemple, `VAULT_TOKEN`). |

##### Autres options `secret_backend_config` pour Vault {#other-secret-backend-config-options-for-vault}

Les champs de premier niveau `secret_backend_config` suivants s'appliquent également :

| Champ | Description |
|---|---|
| `vault_address` | Adresse du serveur Vault (par exemple, `http://myvaultaddress.net`). Peut également être défini avec la variable d'environnement `VAULT_ADDR`. |
| `vault_token` | Jeton Vault statique. À utiliser lorsqu'aucune méthode d'authentification n'est utilisée. |
| `vault_namespace` | Espace de noms Vault pour les environnements Vault Enterprise. |

##### Configuration TLS (`vault_tls_config`) {#tls-configuration-vault-tls-config}

Pour activer le TLS mutuel ou une autorité de certification personnalisée, ajoutez un bloc `vault_tls_config` :

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

| Champ | Description |
|---|---|
| `ca_cert` | Chemin vers un fichier de certificat d'autorité de certification encodé en PEM. |
| `ca_path` | Chemin vers un répertoire de fichiers de certificat d'autorité de certification encodés en PEM. |
| `client_cert` | Chemin vers un fichier de certificat client encodé en PEM pour le mTLS. |
| `client_key` | Chemin vers le fichier de clé privée du certificat client. |
| `tls_server` | Nom de serveur attendu pour la vérification SNI TLS. |
| `insecure` | Définissez sur `true` pour désactiver la vérification du certificat TLS. Ne pas utiliser en production. |

{{% /collapse-content %}}

{{% collapse-content title="Secrets Kubernetes" level="h5" expanded=false id="id-for-kubernetes" %}}

*Disponible dans la version 7.75+ de l'Agent*

Les services Kubernetes suivants sont pris en charge :

| Valeur secret_backend_type | Service |
|---------------------------|---------|
| `k8s.secrets` | [Kubernetes Secrets][7000] |

##### Prérequis {#prerequisites}

Le backend de secrets Kubernetes nécessite :
- **Identifiants ServiceAccount** : Par défaut, utilise des jetons ServiceAccount montés automatiquement (`automountServiceAccountToken: true`, voir [documentation Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting)). Des chemins personnalisés peuvent être configurés si nécessaire.
- **Autorisations RBAC** : Le ServiceAccount de l'Agent doit disposer des autorisations nécessaires pour lire les secrets des espaces de noms cibles
- **Accès réseau** : Le pod de l'Agent doit pouvoir atteindre le serveur API Kubernetes

##### Configuration RBAC {#rbac-setup}

Pour chaque espace de noms contenant des secrets, créez un `Role` et un `RoleBinding` en utilisant l'exemple suivant avec le nom d'espace de noms correct :

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

##### Exemple de configuration {#configuration-example-4}

{{< tabs >}}
{{% tab "Fichier YAML de l'Agent" %}}

Configurez le Datadog Agent pour utiliser les Secrets Kubernetes avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

Le format de notation ENC est `namespace/secret-name;key` :
- `namespace` : Le Kubernetes namespace contenant le secret
- `secret-name` : Le nom de la ressource Secret
- `key` : La clé spécifique à extraire du champ de données du Secret

**Exemple :** Étant donné un Secret dans le Kubernetes namespace `secrets-ns` :

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

Vous pouvez référencer des clés individuelles :

```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**Prise en charge multi-namespace :**
Chaque référence de secret peut spécifier un Kubernetes namespace différent (RBAC doit être configuré pour chacun) :

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Configurez le Datadog Agent pour utiliser les Secrets Kubernetes avec Helm :

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

**Remarque :** Un espace réservé `apiKey` est requis pour la validation du chart Helm lors de l'utilisation du backend de secrets pour résoudre la clé d'API. La variable d'environnement `DD_API_KEY` la remplace. Vous devez créer manuellement le RBAC (Role + RoleBinding) pour chaque Kubernetes namespace contenant des secrets. Pour plus d'informations, consultez la section [Configuration RBAC](#rbac-setup).

**Alternativement**, avec le chart Helm v3.171.0+ et l'Agent v7.70+, vous pouvez utiliser le champ natif `datadog.secretBackend.type` au lieu des variables d'environnement.

{{% /tab %}}

{{% tab "Opérateur" %}}

Configurez le Datadog Agent pour utiliser les Secrets Kubernetes avec le Datadog Operator :

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

**Remarque :** Une clé API d'espace réservé satisfait la validation de l'Opérateur lors de l'utilisation du backend de secrets pour résoudre la clé d'API. La variable d'environnement `DD_API_KEY` la remplace. Vous devez créer manuellement le RBAC (Role + RoleBinding) pour chaque Kubernetes namespace contenant des secrets. Pour plus d'informations, consultez la section [Configuration RBAC](#rbac-setup).

**Alternativement**, avec Datadog Operator v1.25.0+ et l'Agent v7.70+, vous pouvez utiliser le champ natif `spec.global.secretBackend.type` au lieu des variables d'environnement.

{{% /tab %}}
{{< /tabs >}}

##### Configuration de chemin personnalisé {#custom-path-configuration}
Si votre configuration ne suit pas les emplacements par défaut pour l'authentification basée sur ServiceAccount, vous pouvez spécifier `token_path` et `ca_path` à la place.

{{< tabs >}}
{{% tab "YAML de l'Agent" %}}

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

**Alternativement**, avec le chart Helm v3.171.0+, vous pouvez utiliser : `datadog.secretBackend.type: "k8s.secrets"` et `datadog.secretBackend.config` avec les clés `token_path` et `ca_path`.

{{% /tab %}}

{{% tab "Opérateur" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```

**Alternativement**, avec Datadog Operator v1.25.0+, vous pouvez utiliser : `spec.global.secretBackend.type: "k8s.secrets"` et `spec.global.secretBackend.config` avec les clés `token_path` et `ca_path`.

{{% /tab %}}
{{< /tabs >}}

##### Configuration de serveur API personnalisé {#custom-api-server-configuration}

Si votre configuration n'expose pas les variables d'environnement par défaut `KUBERNETES_SERVICE_HOST` et `KUBERNETES_SERVICE_PORT`, vous pouvez fournir une URL `api_server` pour interagir avec l'API REST de Kubernetes.

{{< tabs >}}
{{% tab "YAML de l'Agent" %}}

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

**Alternativement**, avec le chart Helm v3.171.0+, vous pouvez utiliser : `datadog.secretBackend.type: "k8s.secrets"` et `datadog.secretBackend.config` avec la clé `api_server`.

{{% /tab %}}

{{% tab "Opérateur" %}}

```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```

**Alternativement**, avec Datadog Operator v1.25.0+, vous pouvez utiliser : `spec.global.secretBackend.type: "k8s.secrets"` et `spec.global.secretBackend.config` avec la clé `api_server`.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Docker Secrets" level="h5" expanded=false id="id-for-docker" %}}

*Disponible dans la version 7.75+ de l'Agent*

Les services Docker suivants sont pris en charge :

| Valeur secret_backend_type | Service |
|---------------------------|---------|
| `docker.secrets` | [Docker Secrets][6001] |

##### Prérequis {#prerequisites-1}

Le backend de secrets Docker prend en charge à la fois les [Docker Swarm secrets][6002] et les [Docker Compose secrets][6003]. Par défaut, Swarm et Compose montent automatiquement les secrets dans le conteneur sous forme de fichiers à `/run/secrets` (Linux) ou `C:\ProgramData\Docker\secrets` (Windows).

**Remarque** : Les secrets Compose peuvent être basés sur des fichiers (pointant vers des fichiers locaux) ou externes (faisant référence à des secrets Swarm existants).

##### Exemple de configuration {#configuration-example-5}

Configurez le Datadog Agent pour utiliser Docker Secrets avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

Le format de notation ENC est le nom du secret, qui correspond au nom de fichier dans `/run/secrets/` :
- `ENC[api_key]` lit depuis `/run/secrets/api_key` (Linux) ou `C:\ProgramData\Docker\secrets\api_key` (Windows)

**Chemin d'accès personnalisé aux secrets :**
Si Docker Swarm ou Docker Compose sont configurés pour monter des secrets à un emplacement différent, vous pouvez le spécifier comme suit :

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Exemple Docker Swarm {#docker-swarm-example}

[Créer][6002] et utiliser un secret Docker Swarm :

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

Le secret `dd_api_key` est automatiquement monté sur `/run/secrets/dd_api_key`, et l'Agent le lit en utilisant le backend `docker.secrets`.

##### Exemple Docker Compose {#docker-compose-example}

[Créer][6003] un `docker-compose.yml` avec des secrets basés sur des fichiers :

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

Le fichier secret `./secrets/api_key.txt` est monté à `/run/secrets/dd_api_key` dans le conteneur.


{{% /collapse-content %}}

{{% collapse-content title="Backends de secrets de fichiers JSON, YAML ou TEXT" level="h5" expanded=false id="id-for-json-yaml-text" %}}

| valeur de secret_backend_type                                 | Service de fichiers                             |
|---------------------------------------------|-----------------------------------------|
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXT][4003]                        |                            |

##### Autorisations de fichier {#file-permissions}
Le backend de fichier nécessite uniquement des autorisations de **lecture** pour les fichiers JSON, YAML ou TEXT configurés. Ces autorisations doivent être accordées à l'utilisateur local du Datadog Agent (`dd-agent` sous Linux, `ddagentuser` sous Windows).


{{< tabs >}}
{{% tab "Backend de fichier JSON" %}}

**Remarque** : seul un niveau de profondeur JSON est pris en charge (par exemple, `{"key": "value"}`)

##### Exemple de configuration {#configuration-example-6}

Vous pouvez utiliser un fichier JSON pour stocker des secrets localement.

Par exemple, avec un fichier JSON dans `/path/to/secret.json` contenant ce qui suit :

```json
{
  "datadog_api_key": "your_api_key"
}
```

Vous pouvez utiliser cette configuration pour en extraire les secrets :

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "Backend de fichier YAML" %}}

**Remarque** : Un seul niveau de profondeur YAML est pris en charge (par exemple, `key: value`)

##### Exemple de configuration {#configuration-example-7}

Vous pouvez utiliser un fichier YAML pour stocker des secrets localement.

À titre d'exemple, si nous avons un fichier YAML dans `/path/to/secret.yaml` contenant :

```yaml
datadog_api_key: your api key
```

Vous pouvez utiliser la configuration suivante pour en extraire des secrets :

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Backend de fichier TEXTE" %}}

*Disponible dans la version 7.75+ de l'Agent*

**Remarque** : Chaque secret doit être stocké dans son propre fichier texte individuel.

##### Exemple de configuration {#configuration-example-8}

Vous pouvez utiliser des fichiers texte individuels pour stocker des secrets localement.

Par exemple, avec des fichiers texte dans `/path/to/secrets/` :

`/path/to/secrets/dd_api_key` contenant :

```
your_api_key_value
```

`/path/to/secrets/dd_app_key` contenant :

```
your_app_key_value
```

Vous pouvez utiliser cette configuration pour en extraire les secrets :

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### Sécurité du chemin : {#path-security}

- Les chemins relatifs dans `ENC[]` sont résolus par rapport à `secrets_path` (par ex., `ENC[dd_api_key]` avec `secret_path: /path/to/secrets` sera résolu en `/path/to/secrets/dd_api_key`)
- Les chemins absolus dans `ENC[]` doivent se trouver dans `secrets_path` (par ex., `ENC[/path/to/secrets/dd_api_key]` avec `secret_path: /path/to/secrets` fonctionnera)
- Les tentatives de parcours de répertoire (par ex. `ENC[../etc/passwd]`) sont bloquées et échoueront avec le message « path outside allowed directory »

**Remarque :** Certains outils ajoutent automatiquement des sauts de ligne lors de l'exportation de secrets vers des fichiers. Consultez [Supprimer les sauts de ligne de fin](#remove-trailing-line-breaks) pour savoir comment gérer cela.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Clé de registre Windows" level="h4" expanded=false id="id-for-windows-regkey" %}}

**Disponible dans la version 7.82+ de l'Agent**

Les services Windows suivants sont pris en charge :

| Valeur secret_backend_type | Service |
|---------------------------|---------|
| `windows.regkey` | Registre Windows |

##### Prérequis {#prerequisites-2}

Ce backend est pris en charge sur Windows uniquement. La clé de registre doit être lisible par le compte sous lequel le Datadog Agent s'exécute (par défaut `ddagentuser`). Les clés sous `HKLM` sont lisibles par tous les utilisateurs locaux par défaut. Datadog recommande de restreindre l'ACL afin que seuls `ddagentuser` et `SYSTEM` puissent lire la clé.

##### Exemple de configuration {#configuration-example-9}

Configurez le Datadog Agent pour utiliser le backend Windows Registry Key avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: windows.regkey

api_key: 'ENC[SOFTWARE\Datadog\secrets:api_key]'
```

Référencez les secrets en utilisant le format `ENC[<registry-path>:<value-name>]`, où `registry-path` est le sous-chemin sous la clé racine et `value-name` est la valeur de registre à lire.

Par défaut, la clé racine est `HKLM`. Pour utiliser une ruche différente, définissez `root_key`. Seules les valeurs suivantes sont acceptées (toute autre valeur renvoie une erreur) :

`HKLM`, `HKCU`, `HKCR`, `HKU`, `HKCC` (les formes longues telles que `HKEY_LOCAL_MACHINE` sont également prises en charge)

```yaml
secret_backend_type: windows.regkey
secret_backend_config:
  root_key: HKCU
```

##### Configurer la clé de registre {#set-up-the-registry-key}

Cet exemple de script shell PowerShell montre comment configurer un registre (à exécuter en tant qu'administrateur après l'installation) :

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

#### Plusieurs backends {#multiple-backends}

*Disponible dans la version 7.80+ de l'Agent*

Au lieu d'un `secret_backend_type` unique, vous pouvez déclarer plusieurs backends nommés sous `multi_secret_backends`. Chaque backend possède ses propres `type` et `config`, et les secrets sont acheminés vers un backend spécifique en utilisant un préfixe `backendName;` dans le handle `ENC[]`.

Si plusieurs des paramètres suivants sont définis, le paramètre ayant la priorité la plus élevée prend effet et les autres sont ignorés avec un avertissement :

1. `secret_backend_command`
2. `secret_backend_type`
3. `multi_secret_backends`

##### Configuration {#configuration}

```yaml
# datadog.yaml

multi_secret_backends:
  <backend_name>:
    type: <backend_type>
    config:
      <KEY_1>: <VALUE_1>
```

Chaque `<backend_name>` est un identifiant arbitraire que vous choisissez. Il ne peut pas contenir de point-virgule, car `;` est le délimiteur utilisé dans les handles `ENC[]`. Les champs `type` et `config` suivent le même schéma que `secret_backend_type` et `secret_backend_config` pour le backend correspondant.

##### `ENC[]` notation {#enc-notation}

Lorsque `multi_secret_backends` est actif, faites précéder les handles `ENC[]` du nom du backend suivi d'un point-virgule :

```
ENC[<backend_name>;<secret_key>]
```

Seul le **premier** point-virgule est traité comme le délimiteur de backend. Les clés secrètes qui contiennent elles-mêmes des points-virgules (par exemple, `namespace/secret-name;key` de style Kubernetes) continuent de fonctionner.

##### Exemple {#example}

La configuration suivante lit les secrets à partir de deux backends de fichiers simultanément :

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

Référencez les secrets en les faisant précéder du nom du backend :

```yaml
# datadog.yaml
api_key: ENC[yaml_secrets;api_key]
app_key: ENC[aws_secrets;My-Secrets;appKey]
```

##### Migration depuis `secret_backend_type` {#migrating-from-secret-backend-type}

Pour passer d'un `secret_backend_type` unique à `multi_secret_backends` :

1. Déplacez `secret_backend_type` et `secret_backend_config` dans une entrée nommée sous `multi_secret_backends`.
2. Supprimez `secret_backend_type` et `secret_backend_config` du niveau supérieur.
3. Mettez à jour tous les handles `ENC[secretKey]` vers `ENC[backendName;secretKey]`.

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

### Option 2 : Utilisation du script intégré pour Kubernetes et Docker {#option-2-using-the-built-in-script-for-kubernetes-and-docker}

*Disponible dans la version 7.32+ de l'Agent*

Pour les environnements conteneurisés, les images de conteneur du Datadog Agent incluent un script intégré `/readsecret_multiple_providers.sh`. Ce script prend en charge la lecture de secrets à partir de :

* Fichiers : en utilisant `ENC[file@/path/to/file]`
* Secrets Kubernetes : en utilisant `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Pour utiliser cet exécutable avec le Datadog Operator, configurez-le comme suit :

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

Pour utiliser cet exécutable avec le chart Helm, définissez-le comme suit :

```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour utiliser cet exécutable, définissez la variable d'environnement `DD_SECRET_BACKEND_COMMAND` comme suit :

```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Exemple : Lecture à partir de fichiers montés {#example-reading-from-mounted-files}

Kubernetes prend en charge [l'exposition de secrets sous forme de fichiers][2] à l'intérieur d'un pod que l'Agent peut lire pour résoudre les secrets.

Dans Kubernetes, vous pouvez monter un Secret en tant que volume comme ceci :

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

Vous pouvez ensuite référencer le secret comme ceci :

```
password: ENC[file@/etc/secret-volume/password]
```

**Remarques** :
- Le Secret doit exister dans le même espace de nommage que le pod dans lequel il est monté.
- Le script est capable d'accéder à tous les sous-dossiers, y compris le dossier sensible `/var/run/secrets/kubernetes.io/serviceaccount/token`. À ce titre, Datadog recommande d'utiliser un dossier dédié plutôt que `/var/run/secrets`.

Les [secrets Docker swarm][3] sont montés dans le dossier `/run/secrets`. Par exemple, le secret Docker `db_prod_passsword` est situé dans `/run/secrets/db_prod_password` dans le conteneur de l'Agent. Celui-ci serait référencé dans la configuration avec `ENC[file@/run/secrets/db_prod_password]`.

#### Exemple : Lecture d'un secret Kubernetes entre différents espaces de nommage {#example-reading-a-kubernetes-secret-across-namespaces}

Si vous souhaitez que l'Agent lise un Secret provenant d'un espace de nommage différent, utilisez le préfixe `k8s_secret@`. Exemple :

```
password: ENC[k8s_secret@database/database-secret/password]
```

Configurez le RBAC pour permettre au compte de service de l'Agent de lire le Secret. Le rôle suivant accorde un accès en lecture au Secret `database-secret` dans l'espace de nommage `database` :
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
***Remarque*** : Chaque espace de nommage dans la liste des rôles doit également être configuré dans la variable d'environnement `WATCH_NAMESPACE` ou `DD_AGENT_WATCH_NAMESPACE` sur le déploiement du Datadog Operator.
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


Sinon, vous pouvez définir directement les ressources RBAC :

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

Ceci `Role` donne accès au `Secret: database-secret` dans le `Namespace: database`. Le `RoleBinding` lie cette autorisation au `ServiceAccount: datadog-agent` dans le `Namespace: default`. Ceci doit être ajouté manuellement à votre cluster en fonction de vos ressources déployées.

### Option 3 : Création d'un exécutable personnalisé {#option-3-creating-a-custom-executable}

Pour récupérer des secrets, l'Agent utilise un exécutable externe que vous fournissez. L'exécutable est utilisé lorsque de nouveaux secrets sont découverts et sont mis en cache pour la durée de vie de l'Agent. Si vous devez mettre à jour ou faire pivoter un secret, vous devez redémarrer l'Agent pour le recharger.

Cela vous permet d'utiliser n'importe quelle solution de gestion des secrets et vous donne un contrôle total sur la façon dont l'Agent accède aux secrets.

L'Agent envoie à cet exécutable une charge utile JSON via l'entrée standard contenant une liste de descripteurs de secrets à résoudre. Ensuite, votre exécutable récupère chaque secret et les renvoie dans un format JSON via une sortie standard.

L'exemple suivant montre ce que l'Agent envoie à votre exécutable sur STDIN :

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (chaîne) : La version du format.
* `secrets` (liste de chaînes) : Chaque chaîne est un descripteur pour un secret à récupérer.


L'exécutable répond via la sortie STDOUT suivante :

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (chaîne) : La valeur du secret à utiliser dans les configurations. Cela peut être `null` en cas d'erreur.
* `error` (chaîne) : Un message d'erreur ou `null`.

Si un secret ne peut pas être résolu (soit en renvoyant un code de sortie non nul, soit une erreur non nulle), la configuration associée est ignorée par l'Agent.

**Ne jamais afficher d'informations sensibles sur `stderr`**. Si le binaire se termine avec un code de statut différent de `0`, l'Agent enregistre la sortie d'erreur standard de votre exécutable pour le dépannage.

Vous pouvez également créer votre propre exécutable de récupération de secrets en utilisant n'importe quel langage. La seule exigence est qu'il suive le format d'entrée/sortie décrit précédemment.

Voici un exemple en Go qui renvoie des secrets fictifs :

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

Ceci transforme votre configuration :

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

En mémoire, cela se présente comme suit:

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Vous pouvez configurer l'Agent pour utiliser le binaire afin de résoudre les secrets en ajoutant ce qui suit :

```
secret_backend_command: /path/to/binary
```

## Exigences de sécurité de l'Agent {#agent-security-requirements}

L'Agent exécute l'exécutable fourni en tant que sous-processus. Les modèles d'exécution diffèrent sur Linux et Windows.

{{< tabs >}}
{{% tab "Linux" %}}

Sur Linux, votre exécutable doit :

* Appartenir au même utilisateur que celui exécutant l'Agent (`dd-agent` par défaut, ou `root` dans un conteneur).
* Ne disposer d'aucun droit pour `group` ou `other`.
* Avoir au moins le droit **d'exécution** pour le propriétaire.

{{% /tab %}}
{{% tab "Windows" %}}

Sur Windows, votre exécutable doit :

* Avoir les droits **de lecture** ou **d'exécution** pour `ddagentuser` (l'utilisateur utilisé pour exécuter l'Agent).
* Ne disposer d'aucun droit pour tout utilisateur ou groupe, à l'exception du groupe **Administrators**, du compte intégré **Local System** ou du contexte utilisateur de l'Agent (`ddagentuser` par défaut).
* Être une application Win32 valide afin que l'Agent puisse l'exécuter (par exemple, un script PowerShell ou Python ne fonctionne pas).

{{% /tab %}}
{{< /tabs >}}

**Remarque** : Votre exécutable partage les mêmes variables d'environnement que l'Agent.

## Actualisation des secrets au moment de l'exécution {#refreshing-secrets-at-runtime}

*Disponible dans la version 7.67+ de l'Agent*

Vous pouvez configurer l'Agent pour actualiser les secrets résolus sans nécessiter de redémarrage.

Définissez un intervalle d'actualisation :

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

Ou déclenchez une actualisation manuellement :

```shell
datadog-agent secret refresh
```

### Actualisation de la clé API/APP {#apiapp-key-refresh}
Les clés API/APP récupérées en tant que secrets prennent en charge l'actualisation au moment de l'exécution.

Vous pouvez activer cette fonctionnalité en définissant `secret_refresh_interval` (en secondes) dans `datadog.yaml` :

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

Par défaut, l'Agent randomise l'actualisation initiale dans la fenêtre `secret_refresh_interval` pour empêcher un parc de
afin que les Agents ne s'actualisent pas simultanément. La clé est résolue au démarrage, puis actualisée une fois au cours du premier intervalle
et à chaque intervalle par la suite.

Pour éviter tout downtime, n'invalidez les anciennes clés qu'une fois que l'ensemble de votre parc a récupéré les clés mises à jour. Vous pouvez suivre l'utilisation
des clés sur la page [Gestion du parc](https://app.datadoghq.com/fleet).

Vous pouvez désactiver ce comportement en définissant :

```yaml
secret_refresh_scatter: false
```

### Actualisation des secrets lors du check Autodiscovery {#autodiscovery-check-secrets-refresh}
*Disponible dans la version 7.76+ de l'Agent*

Les checks [Autodiscovery][1] planifiés peuvent actualiser les secrets au moment de l'exécution si le modèle utilise la syntaxe `ENC[]`.

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

L'Agent peut alors déclencher l'actualisation des secrets soit à l'intervalle défini dans `secret_refresh_interval`, soit manuellement avec `datadog-agent secret refresh`.

### Actualisation automatique des secrets en cas d'échec / d'invalidation de la clé d'API {#automatic-secrets-refresh-on-api-key-failure-invalidation}

*Disponible dans la version 7.74+ de l'Agent*

L'Agent peut automatiquement rafraîchir les secrets lorsqu'il détecte une clé d'API invalide. Cela se produit lorsque l'Agent reçoit une réponse 403 Forbidden de Datadog ou lorsque le check périodique de l'état détecte une clé d'API invalide ou expirée.

Pour activer cette fonctionnalité, définissez `secret_refresh_on_api_key_failure_interval` sur un intervalle en minutes dans votre fichier `datadog.yaml`. Définissez sur `0` pour désactiver (par défaut).

Cet intervalle est la durée minimale entre 2 rafraîchissements pour éviter de spammer votre solution de gestion des secrets lorsqu'une clé d'API invalide est détectée.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Ce paramètre est compatible avec `secret_refresh_interval`.

### Activer le rafraîchissement du collecteur DDOT{#enabling-ddot-collector-refresh}
Si vous utilisez le [collecteur DDOT][6] et souhaitez activer le rafraîchissement API/APP, vous devez ajouter la configuration supplémentaire suivante à votre fichier `datadog.yaml` :

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Cela garantit que le collecteur DDOT reste synchronisé avec l'Agent après le rafraîchissement des secrets. Tout comme l'Agent vérifie périodiquement l'état de sa configuration, le collecteur DDOT utilise ce paramètre pour vérifier régulièrement les valeurs mises à jour provenant de l'Agent.

## Dépannage {#troubleshooting}

### Lister les secrets détectés {#listing-detected-secrets}

La commande `secret` dans l'interface de ligne de commande de l'Agent affiche toutes les erreurs liées à votre configuration. Par exemple, si les droits sur l'exécutable sont incorrects. La commande affiche également tous les descripteurs trouvés et leur emplacement.

Sous Linux, la commande affiche le mode de fichier, le propriétaire et le groupe de l'exécutable. Sous Windows, les droits ACL sont listés.

{{< tabs >}}
{{% tab "Linux" %}}

Exemple sous Linux :

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

Exemple sous Windows (en tant qu'administrateur PowerShell)  :

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

### Voir les configurations après l'injection des secrets{#seeing-configurations-after-secrets-were-injected}

Pour voir rapidement comment les configurations de check sont résolues, vous pouvez utiliser la commande `configcheck` :

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

**Remarque** : L'Agent doit être [redémarré][7] pour prendre en compte les modifications apportées aux fichiers de configuration.

### Débogage de votre secret_backend_command {#debugging-your-secret-backend-command}

Pour tester une commande ou la déboguer en dehors de l'Agent, vous pouvez reproduire la façon dont l'Agent l'exécute :

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

L'utilisateur `dd-agent` est créé lors de l'installation du Datadog Agent.

{{% /tab %}}
{{% tab "Windows" %}}

##### Erreurs liées aux droits {#rights-related-errors}

Les erreurs suivantes indiquent qu'il manque quelque chose dans votre configuration.

1. Si un groupe ou un utilisateur autre que celui requis dispose de droits sur l'exécutable, une erreur similaire à la suivante est consignée :
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` ne dispose pas des droits de lecture et d'exécution sur le fichier, une erreur similaire est consignée :
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Votre exécutable doit être une application Win32 valide. Si ce n'est pas le cas, l'erreur suivante est consignée :
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog propose un [script Powershell][9] pour vous aider à définir les autorisations correctes sur votre exécutable. Exemple d'utilisation :

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

##### Test de votre exécutable {#testing-your-executable}

Votre exécutable est lancé par l'Agent lors de la récupération de vos secrets. Le Datadog Agent s'exécute en utilisant le `ddagentuser`. Cet utilisateur ne dispose d'aucun droit spécifique, mais il fait partie du groupe `Performance Monitor Users`. Le mot de passe de cet utilisateur est généré de manière aléatoire lors de l'installation et n'est jamais enregistré nulle part.

Cela signifie que votre exécutable peut fonctionner avec votre utilisateur par défaut ou votre utilisateur de développement, mais pas lorsqu'il est exécuté par l'Agent, car `ddagentuser` dispose de droits plus restreints.

Pour tester votre exécutable dans les mêmes conditions que l'Agent, mettez à jour le mot de passe du `ddagentuser` sur votre machine de développement. De cette façon, vous pouvez vous authentifier en tant que `ddagentuser` et exécuter votre exécutable dans le même contexte que celui de l'Agent.

Pour ce faire, suivez ces étapes :

1. Supprimez `ddagentuser` de la liste `Local Policies/User Rights Assignement/Deny Log on locally` dans le `Local Security Policy`.
2. Définissez un nouveau mot de passe pour `ddagentuser` (car celui généré lors de l'installation n'est jamais enregistré nulle part). Dans PowerShell, exécutez :
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Mettez à jour le mot de passe à utiliser par le service `DatadogAgent` dans le Gestionnaire de contrôle des services. Dans PowerShell, exécutez :
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Vous pouvez maintenant vous connecter en tant que `ddagentuser` pour tester votre exécutable. Datadog dispose d'un [script Powershell][10] pour vous aider à tester votre
exécutable en tant qu'autre utilisateur. Il change de contexte utilisateur et imite la façon dont l'Agent exécute votre exécutable.

Exemple d'utilisation :

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

### L'Agent refuse de démarrer {#agent-refusing-to-start}

La première chose que fait l'Agent au démarrage est de charger `datadog.yaml` et de déchiffrer tous les secrets qu'il contient. Cela est effectué avant la configuration de la journalisation. Cela signifie que sur des plateformes comme Windows, les erreurs survenant lors du chargement de `datadog.yaml` ne sont pas écrites dans les logs, mais sur `stderr`. Cela peut se produire lorsque l'exécutable fourni à l'Agent pour les secrets renvoie une erreur.

Si vous avez des secrets dans `datadog.yaml` et que l'Agent refuse de démarrer :

* Essayez de démarrer l'Agent manuellement pour pouvoir voir `stderr`.
* Supprimez les secrets de `datadog.yaml` et testez d'abord avec des secrets dans un fichier de configuration de check.

### Test des autorisations Kubernetes {#testing-kubernetes-permissions}
Lors de la lecture directe des secrets depuis Kubernetes, vous pouvez vérifier vos autorisations avec la commande `kubectl auth`. La forme générale de ceci est :

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considérez l'exemple précédent de [Secrets Kubernetes](#example-reading-a-kubernetes-secret-across-namespaces), où le Secret `Secret:database-secret` existe dans le `Namespace: database`, et le Compte de service `ServiceAccount:datadog-agent` existe dans le `Namespace: default`.

Pour cet exemple, utilisez la commande suivante :

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Cette commande indique si l'Agent dispose des autorisations adéquates pour accéder à ce secret.

### Supprimer les sauts de ligne de fin {#remove-trailing-line-breaks}

Certains outils de gestion des secrets ajoutent automatiquement un saut de ligne lors de l'exportation de secrets via des fichiers. Vous pouvez supprimer ces sauts de ligne en définissant `secret_backend_remove_trailing_line_break: true` dans [le fichier de configuration datadog.yaml][8], ou utiliser la variable d'environnement `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` pour faire de même, en particulier dans les environnements conteneurisés.

### Variables d'Autodiscovery dans secret handles {#autodiscovery-variables-in-secret-handles}

Il est également possible d'utiliser des variables [Autodiscovery][1] dans secret handles. L'Agent résout ces variables avant de résoudre le secret. Exemple :

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /fr/opentelemetry/setup/ddot_collector/
[7]: /fr/agent/configuration/agent-commands/#restart-the-agent
[8]: /fr/agent/configuration/agent-configuration-files/
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