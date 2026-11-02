---
description: Apprenez à configurer le Worker pour récupérer des secrets depuis votre
  gestionnaire de secrets.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/"
  tag: Documentation
  text: Configurez des pipelines
- link: /observability_pipelines/configuration/install_the_worker"
  tag: Documentation
  text: Installez le Worker
title: Gestion des secrets
---
## Présentation {#overview}

Observability Pipelines Worker vous aide à gérer vos secrets de manière sécurisée en s'intégrant à la solution de gestion des secrets suivante :

- AWS Secrets Manager
- AWS Systems Manager
- Azure Key Vault
- HashiCorp Vault
- Fichier JSON
- Fichier YAML

**Remarques** :
- Si vous souhaitez utiliser des secrets Kubernetes, suivez les instructions de [Configuration de toutes les paires clé-valeur dans un Secret en tant que variables d'environnement de conteneur][6] et configurez le secret en tant que variable d'environnement pour Observability Pipelines Worker.
- Lorsque vous configurez un pipeline et installez le Worker, si vous saisissez des identifiants de secret puis choisissez d'utiliser des variables d'environnement, la variable d'environnement est l'identifiant saisi précédé de `DD_OP`. Par exemple, si vous avez saisi `PASSWORD_1` pour un identifiant de mot de passe, la variable d'environnement pour ce mot de passe est `DD_OP_PASSWORD_1`.

## Configurez le Worker pour récupérer des secrets {#configure-the-worker-to-retrieve-secrets}

{{% collapse-content title="AWS Secrets Manager" level="h3" expanded=false id="aws-secrets-manager" %}}

#### Configurez un profil d'instance AWS {#set-up-an-aws-instance-profile}

Datadog recommande d'utiliser la [méthode du profil d'instance][1] pour récupérer les secrets, car AWS gère toutes les variables d'environnement et les profils de session pour vous. Consultez la [documentation officielle d'AWS Secrets Manager][2] pour obtenir les instructions de configuration.

#### Configurez le Worker pour utiliser AWS Secrets Manager {#configure-the-worker-to-use-aws-secrets-manager}

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Après avoir [installé le Worker][1], configurez le [fichier d'amorçage][2] du Worker pour résoudre les secrets à l'aide d'AWS Secrets Manager :

```yaml
backend_type: aws
backend_config:
  aws_session:
    aws_region: <region_name>
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Avant d'[installer le Worker][1], ajoutez la configuration d'amorçage à la section [`datadog.bootstrap.config`][2] du fichier `values.yaml` du chart Helm :

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

Les paramètres `aws_session` suivants sont disponibles :

| Setting | Description |
| ----- | ----- |
| aws_region | Région AWS |
| aws_profile | Profil de session AWS |
| aws_role_arn | AWS sts:AssumeRole ARN |
| aws_external_id | AWS sts:AssumeRole ExternalId |
| aws_access_key_id | AWS IAM User Access Key ID |
| aws_secret_access_key | AWS IAM User Access Key Secret |

Dans la plupart des cas, vous devez spécifier `aws_region` pour correspondre à la région hébergeant le secret Secrets Manager.

Lors du traitement de chaînes uniques, le paramètre de configuration du backend `force_string: true` force le secret à être une valeur de chaîne.

{{% /collapse-content %}}
{{% collapse-content title="AWS Systems Manager" level="h3" expanded=false id="aws-systems-manager" %}}

#### Configurez un profil d'instance AWS {#set-up-an-aws-instance-profile-1}

Datadog recommande d'utiliser la [méthode du profil d'instance][1] pour récupérer les secrets, car AWS gère toutes les variables d'environnement et les profils de session pour vous. Consultez la documentation officielle [AWS Systems Manager Parameter Store][4] pour les instructions de configuration.

#### Configurez le Worker pour utiliser AWS Systems Manager {#configure-the-worker-to-use-aws-systems-manager}

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Après avoir [installé le Worker][1], configurez le [fichier d'amorçage][2] du Worker pour résoudre les secrets à l'aide d'AWS Systems Manager :

```yaml
secret:
  backend_type: aws_parameter_store
  backend_config:
    aws_session:
      aws_region: <region_name>
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Avant d'[installer le Worker][1], ajoutez la configuration d'amorçage à la section [`datadog.bootstrap.config`][2] du fichier `values.yaml` du chart Helm :

```yaml
bootstrap:
  config:
    secret:
      backend_type: aws_parameter_store
      backend_config:
        aws_session:
          aws_region: <region_name>
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Key Vault" level="h3" expanded=false id="azure-key-vault" %}}

#### Configurer l'authentification Azure {#set-up-azure-authentication}

Datadog recommande d'utiliser des Managed Identities pour s'authentifier auprès d'Azure. Cela vous permet d'associer des ressources cloud à des comptes AMI et supprime le besoin d'inclure des informations sensibles dans votre fichier de configuration Worker.

#### Créer une identité gérée {#create-a-managed-identity}

Pour accéder à votre Key Vault, créez une identité gérée et assignez-la à votre VM. Ensuite, configurez l'attribution de rôle appropriée sur le Key Vault pour permettre à l'identité gérée d'accéder aux secrets.

#### Configurez le Worker pour utiliser Azure Key Vault {#configure-the-worker-to-use-azure-key-vault}

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Après avoir [installé le Worker][1], configurez le [fichier d'amorçage][2] du Worker pour résoudre les secrets en utilisant Azure Key Vault :

```yaml
backend_type: azure
backend_config:
  keyvaulturl: <key_vault_url>
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Avant d'[installer le Worker][1], ajoutez la configuration d'amorçage à la section [`datadog.bootstrap.config`][2] du fichier `values.yaml` du chart Helm :

```yaml
bootstrap:
  config:
    secret:
      backend_type: azure
      backend_config:
        keyvaulturl: <key_vault_url>
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="HashiCorp Vault" level="h3" expanded=false id="hashicorp-vault" %}}

#### Configurez HashiCorp Vault {#set-up-hashicorp-vault}

1. Exécutez votre HashiCorp Vault. Consultez la [documentation officielle de HashiCorp Vault][5] pour plus d'informations.
2. Rédigez une politique qui donne l'autorisation de récupérer des secrets depuis votre Vault. Créez un fichier `*.hcl` et incluez l'autorisation suivante si vous utilisez la version 1 du moteur de secrets :

    ```
    path "<your mount path>/<additional subpath>" {
      capabilities = ["read"]
    }
    ```

   Si vous utilisez la version 2 du moteur de secrets, les autorisations suivantes sont nécessaires :

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

3. Exécutez `vault policy write <policy_name> <path_to_*.hcl_file>`.
4. Choisissez la méthode d'authentification auprès de votre Vault. Si vous utilisez la méthode de profil d'instance AWS, exécutez `vault auth enable aws`.

#### Configurez un profil d'instance AWS pour une machine connectée à AWS {#set-up-an-aws-instance-profile-for-an-aws-connected-machine}

Datadog recommande de vous authentifier en utilisant la [méthode de profil d'instance][1] si vous exécutez votre HashiCorp Vault depuis une machine connectée à AWS.

#### Configurez le Worker pour utiliser HashiCorp Vault {#configure-the-worker-to-use-hashicorp-vault}

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Après avoir [installé le Worker][1], configurez le [fichier d'amorçage][2] du Worker pour résoudre les secrets avec HashiCorp Vault :

```yaml
secret:
  backend_type: vault
  backend_config:
    vault_address: http://myvaultaddress.net
    vault_tls_config:
      # ... TLS settings if applicable
    vault_session:
      vault_auth_type: aws
      # ... additional session settings
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}
Avant d'[installer le Worker][1], ajoutez la configuration d'amorçage à la section [`datadog.bootstrap.config`][2] du fichier `values.yaml` du chart Helm :

```yaml
bootstrap:
  config:
    secret:
      backend_type: vault
      backend_config:
        vault_address: http://myvaultaddress.net
        vault_tls_config:
          # ... TLS settings if applicable
        vault_session:
          vault_auth_type: aws
          # ... additional session settings
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management
[2]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="Fichier JSON" level="h3" expanded=false id="json-file" %}}

#### Autorisations de fichier requises {#file-permissions-required}

Le backend de fichier nécessite uniquement des autorisations de **lecture** pour les fichiers JSON configurés. Ces autorisations doivent être accordées à l'utilisateur local du Worker.

#### Configurez le Worker pour utiliser un backend de secrets de fichier JSON {#configure-the-worker-to-use-a-json-file-secret-backend}

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Après avoir [installé le Worker][1], configurez le [fichier d'amorçage][2] du Worker pour résoudre les secrets avec un fichier JSON :

```yaml
secret:
  backend_type: json
  backend_config:
    file_path: /path/to/json/file.json
```

#### Créez un fichier de secrets JSON {#create-a-json-secrets-file}

Créez le fichier `/path/to/json/file.json` pour stocker les identifiants et leurs valeurs secrètes :

```json
{
  "us1_api": "<api_key>",
  "secret_identifier1": "<secret1>"
}
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/


{{% /tab %}}
{{% tab "Kubernetes" %}}
Vous ne pouvez pas transmettre de fichier pour configurer `secretFileContents`, mais vous pouvez ajouter vos secrets et le mappage des identifiants à la section [`datadog.bootstrap.secretFileContents`][1] du fichier `values.yaml` du chart Helm :

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}
{{% collapse-content title="Fichier YAML" level="h3" expanded=false id="yaml-file" %}}

#### Autorisations de fichier requises {#file-permissions-required-1}

Le backend de fichier nécessite uniquement des autorisations de **lecture** pour les fichiers YAML configurés. Ces autorisations doivent être accordées à l'utilisateur local du Worker.

#### Configurez le Worker pour utiliser un backend de secrets de fichier YAML {#configure-the-worker-to-use-a-yaml-file-secret-backend}

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Après avoir [installé le Worker][1], configurez le [fichier d'amorçage][2] du Worker pour résoudre les secrets avec un fichier YAML :

```
secret:
  backend_type: yaml
  backend_config:
    file_path: /path/to/yaml/file.yaml
```

#### Créer un fichier de secrets YAML {#create-a-yaml-secrets-file}

Créez le fichier `/path/to/yaml/file.yaml` pour stocker les identifiants et leurs valeurs secrètes :

```
# /path/to/yaml/file.yaml

us1_api: "<api_key>"
secret_identifier1: "<secret1>"
```

[1]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[2]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

{{% /tab %}}
{{% tab "Kubernetes" %}}

Vous ne pouvez pas transmettre de fichier pour configurer `secretFileContents`, mais vous pouvez ajouter vos secrets et le mappage des identifiants à la section [`datadog.bootstrap.secretFileContents`][1] du fichier `values.yaml` du chart Helm :

```yaml
bootstrap:
  secretFileContents:
    us1_api: "<api_key>"
    secret_identifier1: "<secret1>"
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L46

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Actualisez les secrets au moment de l'exécution {#refresh-secrets-at-runtime}

Observability Pipelines Worker résout les secrets au démarrage et lors du rechargement de sa configuration. Pour prendre en compte les valeurs secrètes renouvelées sans redémarrer le Worker, envoyez un signal `SIGHUP`.

**Remarque** : Si un secret renouvelé a une valeur non valide, le rechargement échoue. Datadog recommande d'effectuer le rechargement un Worker ou un nœud à la fois et de vérifier l'état de santé du Worker avant de continuer.

{{< tabs >}}
{{% tab "Docker ou Linux" %}}
Envoyez `SIGHUP` au processus Worker :

```shell
kill -HUP <worker_pid>
```

{{% /tab %}}
{{% tab "Kubernetes" %}}
Envoyez `SIGHUP` au processus Worker à l'intérieur de chaque pod :

```shell
kubectl exec <pod_name> -- kill -HUP 1
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[2]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[3]: /fr/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management
[4]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[5]: https://developer.hashicorp.com/
[6]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#configure-all-key-value-pairs-in-a-secret-as-container-environment-variables