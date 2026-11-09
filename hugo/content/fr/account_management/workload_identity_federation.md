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
- /fr/account_management/cloud_authentication/
- /fr/account_management/cloud_provider_authentication/
description: Authentifiez le fournisseur Datadog Terraform et le Datadog Agent avec
  la fédération d'identité de charge de travail, en utilisant des identifiants cloud
  au lieu de clés d'API statiques avec l'authentification AWS STS et le mappage d'identité.
further_reading:
- link: /getting_started/integrations/terraform/
  tag: Documentation
  text: Gérer Datadog avec Terraform
- link: /agent/configuration/
  tag: Documentation
  text: Configuration de l'Agent
- link: /account_management/api-app-keys/
  tag: Documentation
  text: Clés d'API et clés d'application
- link: /integrations/amazon_web_services/
  tag: Documentation
  text: Intégration AWS
title: Fédération d'identités de charges de travail
---
## Présentation {#overview}

La fédération d'identité de charge de travail vous permet d'authentifier le fournisseur Datadog Terraform et le Datadog Agent en utilisant des identifiants cloud au lieu de clés d'API et d'application statiques.

AWS est le seul fournisseur cloud pris en charge.

La fédération d'identité de charge de travail est disponible pour les éléments suivants :

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<ul>
<li><b>Fournisseur Terraform Datadog</b> : Authentifiez les opérations Terraform en utilisant des identifiants AWS mappés à un utilisateur ou un compte de service Datadog. Disponible pour tous les clients.</li>
<li><b>Datadog Agent</b> : Authentifiez l'Agent en utilisant des identifiants AWS pour recevoir des clés d'API gérées et renouvelées automatiquement.</li>
</ul>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<ul>
<li><b>Fournisseur Terraform Datadog</b> : Authentifiez les opérations Terraform en utilisant des identifiants AWS mappés à un utilisateur ou un compte de service Datadog. Disponible pour tous les clients.</li>
</ul>
{{< /site-region >}}

## Fonctionnement : processus d'authentification AWS {#how-it-works-aws-authentication-process}

Le processus d'authentification utilise le [AWS Security Token Service (STS)][1] pour vérifier votre identité.

### Flux d'authentification du fournisseur Terraform {#terraform-provider-authentication-flow}

1. **Génération de preuve :** Le fournisseur Datadog Terraform crée une requête AWS STS `GetCallerIdentity` signée en utilisant vos identifiants AWS actuels
2. **Validation de preuve :** Datadog valide la preuve en appelant AWS STS, qui renvoie votre ARN AWS, votre ID utilisateur et votre ID de compte
3. **Mappage d'identité :** Votre identité AWS est mappée à un compte de service ou un compte utilisateur Datadog en fonction de la configuration de votre organisation
4. **Émission de jeton :** Si la validation réussit, Datadog émet un jeton JWT temporaire pour l'accès à l'API
5. **Authentification API :** Le jeton est utilisé pour les appels de Datadog API ultérieurs

<div class="alert alert-info">Si possible, mappez les ARN à un compte de service Datadog plutôt qu'à un compte utilisateur. L'utilisation d'un compte de service évite d'associer votre processus d'authentification à une personne spécifique.</div>

### Flux d'authentification de l'Agent {#agent-authentication-flow}

1. **Détection des identifiants :** L'Agent récupère les identifiants AWS depuis l'environnement dans lequel il s'exécute
2. **Génération de preuve :** L'Agent crée une requête AWS STS signée pour prouver l'accès aux identifiants
3. **Validation de preuve :** Datadog valide la requête signée auprès d'AWS et la vérifie par rapport à la configuration de mappage d'ingestion de votre organisation
4. **Émission de clé d'API :** Si la validation réussit, Datadog émet une clé d'API gérée qui est automatiquement renouvelée
5. **Configuration de l'Agent :** L'Agent utilise la clé d'API émise pour tous les appels de Datadog API ultérieurs

<div class="alert alert-info">Si le flux d'authentification déléguée échoue, l'Agent revient à la clé d'API configurée dans votre <code>datadog.yaml</code> fichier. Ce comportement de secours vous permet d'effectuer l'intégration avec un risque limité pour votre configuration existante.</div>

## Configurer la fédération d'identités de charge de travail pour AWS {#set-up-workload-identity-federation-for-aws}

**Prérequis** :
- Version 3.70 ou ultérieure du fournisseur Terraform Datadog.
- Vous avez configuré l'[intégration Datadog-AWS][4] et ajouté votre compte AWS. Consultez la [documentation sur l'intégration AWS][3].
- Votre compte dispose des autorisations `workload_identity_federation_config_read` et `workload_identity_federation_config_write`.

La configuration de la fédération d'identité de charge de travail pour AWS comprend deux parties :
1. [Configuration de votre mappage d'identité AWS dans Datadog](#configure-aws-identity-mapping-in-datadog)
2. [Mise à jour de la configuration de votre fournisseur Terraform](#update-your-terraform-provider-configuration)

### Configurer le mappage d'identité AWS dans Datadog{#configure-aws-identity-mapping-in-datadog}

<div class="alert alert-info">Pour que le mappage d'identité fonctionne, votre compte AWS <strong>doit être intégré</strong> à Datadog via l'<a href="https://app.datadoghq.com/integrations/amazon-web-services">intégration Datadog-AWS</a>. Si un compte AWS n'est pas intégré, le flux d'authentification ne peut pas vérifier l'appelant et le mappage échoue.</div>

Mappez vos identités AWS (ARN) vers des comptes de service ou des comptes utilisateur Datadog. Vous pouvez configurer les mappages d'identité depuis l'interface utilisateur ou en utilisant l'API.

Si vous devez créer des rôles IAM dans AWS, consultez la [documentation sur la création de rôles IAM AWS][5].

#### Utilisation de l'interface utilisateur {#using-the-ui}

Accédez à [**Paramètres de l'organisation** > **Fédération d'identité de charge de travail**][6] et cliquez sur l'onglet **Mappages d'identité**. Chaque mappage accorde à un rôle cloud les autorisations d'un utilisateur Datadog ou d'un compte de service spécifique.

{{< img src="account_management/workload_identity_federation/identity-mappings-list.png" alt="Onglet Mappages d'identité dans la page Fédération d'identité de charge de travail, affichant le champ UUID de l'organisation et une liste de modèles ARN AWS mappés aux utilisateurs et comptes de service Datadog" style="width:100%;" >}}

<div class="alert alert-warning">Datadog nécessite l'<strong>ARN de rôle assumé</strong> dans le champ Modèle source, et non l'ARN de rôle IAM. Ces deux formats sont différents :</div>
<ul>
<li><strong>ARN de rôle IAM</strong> (affiché dans la console AWS) : <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>ARN de rôle assumé</strong> (requis par Datadog) : <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
Pour trouver l'ARN de rôle assumé pour votre charge de travail, exécutez <code>aws sts get-caller-identity</code> depuis votre environnement de charge de travail et utilisez la valeur dans le <code>Arn</code> champ de la réponse.

Pour créer un mappage d'identité :

1. Cliquez sur {{< ui >}}\+ New Mapping{{< /ui >}}.
2. Sélectionnez un **fournisseur cloud**.
3. Saisissez un **modèle source (ARN)**. Utilisez le format ARN de rôle assumé et `*` pour les modèles génériques (par exemple, `arn:aws:sts::123456789012:assumed-role/terraform-runner/*`).
4. Recherchez et sélectionnez une **identité cible**. Il s'agit du compte utilisateur ou du compte de service Datadog sous lequel cette identité cloud s'authentifie.
5. Cliquez sur {{< ui >}}Create Mapping{{< /ui >}}.

{{< img src="account_management/workload_identity_federation/identity-mapping-create.png" alt="Boîte de dialogue Créer un mappage d'identité avec des champs pour le fournisseur cloud, le modèle d'ARN source et l'identité cible, avec un texte d'aide décrivant la prise en charge des modèles avec caractères génériques" style="width:70%;" >}}

<div class="alert alert-info">Privilégiez les comptes de service aux comptes utilisateur pour éviter de lier l'accès à des individus.</div>

#### Utilisation de l'API {#using-the-api}

##### Mapper un ARN AWS à un compte utilisateur Datadog {#map-an-aws-arn-to-a-datadog-user-account}
Pour `account_identifier`, utilisez l'e-mail indiqué dans le profil Datadog de l'utilisateur.

**Exemple** : Un appel API qui mappe un ARN AWS à un compte utilisateur Datadog, `john.doe@myorg.com`.

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

##### Mapper un ARN AWS à un compte de service Datadog {#map-an-aws-arn-to-a-datadog-service-account}
Pour `account_identifier`, vous pouvez utiliser soit :
- Le **UUID** du compte de service : Allez dans {{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Service accounts{{< /ui >}}, cliquez sur le compte de service que vous souhaitez mapper, et copiez le `service_account_id` depuis l'URL. Par exemple, si l'URL se termine par `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`, alors utilisez `3fa85f64-5717-4562-b3fc-2c963f66afa6`.
- L'**adresse e-mail** du compte de service : Utilisez l'adresse e-mail indiquée dans les détails du compte de service.

**Exemple** : Un appel API qui mappe un ARN AWS à un compte de service Datadog en utilisant l'UUID, `3fa85f64-5717-4562-b3fc-2c963f66afa6`.

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

**Exemple** : Un appel API qui mappe un ARN AWS à un compte de service Datadog en utilisant l'adresse e-mail, `terraform-service-account@myorg.com`.

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

##### Utilisation de caractères génériques dans les modèles d'ARN {#using-wildcards-in-arn-patterns}

Les modèles d'ARN prennent en charge la correspondance par caractères génériques pour gérer les parties dynamiques ou variables des ARN de ressources. Ceci est utile lorsque vous travaillez avec des rôles assumés qui incluent des identifiants de session ou d'autres composants variables.

**Règles pour les caractères génériques** :
- Les caractères génériques (`*`) ne sont autorisés que dans la dernière partie de l'ARN de la ressource
- Vous devez spécifier une ressource précise avant le caractère générique
- Les caractères génériques ne peuvent pas être placés au milieu de l'ARN

**Exemple** : Correspond à toute session assumant le `DatadogTerraformerRole` :

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

Ce modèle correspond aux ARN de rôle assumé réels tels que :
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/run-abcdefghijk`
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/session-xyz789`

<div class="alert alert-info">La correspondance par caractère générique est particulièrement utile pour les pipelines CI/CD où les sessions de rôle ont des identifiants générés dynamiquement.</div>

##### Lister les mappages existants {#list-existing-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Mettez à jour votre configuration de fournisseur Terraform {#update-your-terraform-provider-configuration}

Après avoir configuré le mappage d'identité, mettez à jour votre configuration de fournisseur Terraform Datadog pour utiliser Workload Identity Federation :

#### Supprimez votre configuration existante {#remove-your-existing-configuration}

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### Ajoutez la nouvelle configuration de Workload Identity Federation {#add-the-new-workload-identity-federation-configuration}

Pour obtenir votre `org_uuid`, trouvez-le directement sur la page [**Organization Settings** > **Workload Identity Federation**][6], ou appelez cet endpoint (nécessite une session active dans l'organisation cible) : [{{< region-param key=dd_api >}}/api/v2/current_user][2]

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

#### Optionnel - Spécifiez explicitement les identifiants AWS {#optional-specify-aws-credentials-explicitly}
En alternative à l'utilisation de variables d'environnement ou de fichiers d'identifiants AWS, vous pouvez spécifier les identifiants AWS directement dans votre configuration Terraform :

```hcl
provider "datadog" {
  org_uuid              = var.datadog_org_uuid
  cloud_provider_type   = "aws"
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_session_token     = var.aws_session_token  # If using temporary credentials
}
```

Le fournisseur Terraform utilise automatiquement vos identifiants AWS configurés pour s'authentifier auprès de Datadog.

## Configurez Workload Identity Federation pour le Datadog Agent {#set-up-workload-identity-federation-for-the-datadog-agent}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workload Identity Federation pour le Datadog Agent n'est pas disponible pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Workload Identity Federation pour l'Agent vous permet d'authentifier votre Agent en utilisant des identifiants AWS au lieu de gérer des clés d'API statiques. L'Agent échange une preuve d'authentification AWS contre une clé d'API gérée que Datadog fait pivoter automatiquement.

### Prérequis {#requirements}

- Une version et un type d'Agent pris en charge selon la manière dont l'Agent obtient les identifiants AWS. Consultez [les versions d'Agent prises en charge et les identifiants AWS](#supported-agent-versions-and-aws-credentials).
- Un Agent fonctionnant dans un environnement AWS avec accès aux identifiants AWS (par exemple, une instance EC2 avec un rôle IAM, une tâche ECS ou un pod EKS).
- Une [intégration Datadog-AWS][4] configurée avec votre compte AWS ajouté. 
- Les autorisations `workload_identity_federation_config_read` et `workload_identity_federation_config_write`.

#### Versions d'Agent prises en charge et identifiants AWS {#supported-agent-versions-and-aws-credentials}

La prise en charge de la fédération d'identité de charge de travail dépend de la version de l'Agent, du type d'Agent et de la manière dont l'Agent obtient les identifiants AWS.

| Comment l'Agent obtient les identifiants AWS | Agent 7.78-7.81 | Agent 7.82 | Agent 7.83+ |
|---|---|---|---|
| Variables d'environnement (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) | Tous les Agents | Tous les Agents | Tous les Agents |
| Rôle du service de métadonnées d'instance EC2 (IMDS) | Agents principaux uniquement | Agents principaux uniquement | Tous les Agents |
| EKS IRSA (`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`) | Non pris en charge | Agents principaux uniquement | Tous les Agents |
| Rôle de tâche ECS ou identité de pod EKS (`AWS_CONTAINER_CREDENTIALS_*`) | Non pris en charge | Agents principaux uniquement | Tous les Agents |

**Agents principaux** : l'Agent, l'Agent de cluster, l'Agent de processus, l'Agent de sécurité, la sonde système et le programme d'installation. 

**Tous les Agents** : les Agents principaux ainsi que l'Agent de trace, DogStatsD autonome, le Private Action Runner, l'IoT Agent et l'Agent Heroku.

Le collecteur OpenTelemetry (`otel-agent`) ne prend pas en charge la fédération d'identité de charge de travail. AWS est le seul fournisseur cloud pris en charge. Azure, Google Cloud et les fournisseurs OIDC génériques ne sont pas pris en charge.

<div class="alert alert-info">Pour un type d'Agent, un fournisseur cloud ou un mode de fourniture d'identifiants non pris en charge, <a href="/help/">ouvrez une demande de fonctionnalité auprès du support Datadog</a>.</div>

La configuration de la fédération d'identité de charge de travail pour l'Agent comprend deux parties :
1. [Configuration de votre mappage d'ingestion AWS dans Datadog](#configure-aws-intake-mapping-in-datadog)
2. [Mise à jour de la configuration de votre Agent](#update-your-agent-configuration)

### Configurez le mappage d'ingestion AWS dans Datadog {#configure-aws-intake-mapping-in-datadog}

<div class="alert alert-info">Pour que le mappage d'ingestion fonctionne, votre compte AWS <strong>doit être intégré</strong> à Datadog via l'<a href="https://app.datadoghq.com/integrations/amazon-web-services">intégration Datadog-AWS</a>. Si un compte AWS n'est pas intégré, le flux d'authentification ne peut pas vérifier l'appelant et le mappage échoue.</div>

Configurez les mappages d'ingestion pour autoriser des modèles ARN AWS spécifiques pour l'authentification de l'Agent. Contrairement aux mappages d'identité, les mappages d'ingestion nécessitent uniquement un modèle ARN. Aucun identifiant de compte Datadog n'est nécessaire, car l'Agent s'authentifie pour envoyer des données plutôt que pour effectuer des actions utilisateur. Datadog provisionne, configure et fait pivoter automatiquement la clé d'API sous-jacente pour vous.

Si vous devez créer des rôles IAM dans AWS, consultez la [documentation sur la création de rôles IAM AWS][5].

#### Utilisation de l'interface utilisateur {#using-the-ui-1}

Accédez à [**Paramètres d'organisation** > **Fédération d'identité de charge de travail**][6] et cliquez sur l'onglet **Mappages d'ingestion**.

{{< img src="account_management/workload_identity_federation/intake-mappings-list.png" alt="Onglet Mappages d'ingestion dans la page Fédération d'identité de charge de travail, affichant le champ UUID de l'organisation et une liste de modèles ARN AWS autorisés pour l'authentification de l'Agent" style="width:100%;" >}}

<div class="alert alert-warning">Datadog nécessite l'<strong>ARN de rôle assumé</strong> dans le champ Modèle source, et non l'ARN de rôle IAM. Ces deux formats sont différents :</div>
<ul>
<li><strong>ARN de rôle IAM</strong> (affiché dans la console AWS) : <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>ARN de rôle assumé</strong> (requis par Datadog) : <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
Pour trouver l'ARN de rôle assumé pour votre charge de travail, exécutez <code>aws sts get-caller-identity</code> depuis votre environnement de charge de travail et utilisez la valeur dans le <code>Arn</code> champ de la réponse.

Pour créer un mappage d'ingestion :

1. Cliquez sur {{< ui >}}\+ New Mapping{{< /ui >}}.
2. Sélectionnez un **fournisseur cloud**.
3. Saisissez un **modèle source (ARN)**. Utilisez le format ARN de rôle assumé et `*` pour les modèles génériques (par exemple, `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*`).
4. Cliquez sur {{< ui >}}Create Mapping{{< /ui >}}.

{{< img src="account_management/workload_identity_federation/intake-mapping-create.png" alt="Boîte de dialogue Créer un mappage d'ingestion avec des champs pour le fournisseur cloud et l'ARN du modèle source, avec un texte d'aide décrivant la prise en charge des modèles avec caractères génériques" style="width:70%;" >}}

#### Utilisation de l'API {#using-the-api-1}

##### Créer un mappage d'ingestion {#create-an-intake-mapping}

**Exemple**: un appel d'API qui autorise les agents s'exécutant avec un rôle IAM spécifique à s'authentifier.

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

##### Utilisation de caractères génériques dans les modèles d'ARN {#using-wildcards-in-arn-patterns-1}

Les modèles d'ARN prennent en charge la correspondance par caractères génériques pour gérer les parties dynamiques ou variables des ARN de ressources. Ceci est utile lorsque vous travaillez avec des rôles assumés qui incluent des identifiants de session ou lorsque vous avez plusieurs instances d'Agent.

**Règles pour les caractères génériques** :
- Les caractères génériques (`*`) ne sont autorisés que dans la dernière partie de l'ARN de la ressource
- Vous devez spécifier une ressource précise avant le caractère générique
- Les caractères génériques ne peuvent pas être placés au milieu de l'ARN

**Exemple** : Correspond à toute session assumant le `DatadogAgentRole` :

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

Ce modèle correspond aux ARN de rôle assumé réels tels que :
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/i-0abc123def456`
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/eks-datadog-agent-xyz`

##### Lister les mappages d'ingestion existants {#list-existing-intake-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

##### Supprimer un mappage d'ingestion {#delete-an-intake-mapping}

```bash
curl -X DELETE "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping/<MAPPING_UUID>" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Mettre à jour votre configuration d'Agent {#update-your-agent-configuration}

Après avoir configuré le mappage d'ingestion, mettez à jour la configuration de l'Agent pour utiliser la fédération d'identité de charge de travail.

#### Configuration globale {#global-configuration}

Ajoutez la section `delegated_auth` à votre fichier `datadog.yaml` pour activer la fédération d'identité de charge de travail pour toutes les données de l'Agent :

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

Pour obtenir votre `org_uuid`, trouvez-le directement sur la page [**Organization Settings** > **Workload Identity Federation**][6], ou appelez cet endpoint (nécessite une session active dans l'organisation cible) : [{{< region-param key=dd_api >}}/api/v2/current_user][2]

L'Agent détecte automatiquement s'il s'exécute dans un environnement AWS et utilise les identifiants AWS disponibles.

#### Options spécifiques au fournisseur {#provider-specific-options}

Pour configurer explicitement AWS comme fournisseur d'authentification et spécifier des options spécifiques au fournisseur, utilisez les sous-sections `provider` et `aws` :

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
  provider: aws  # Optional: auto-detects if omitted
  aws:
    region: <AWS_REGION>  # Optional: auto-detects from IMDS if omitted or uses global STS
```

Remplacez `<AWS_REGION>` par la région AWS à utiliser pour l'authentification STS (par exemple, `us-east-1`).

#### Configuration par produit {#per-product-configuration}

Vous pouvez activer l'authentification déléguée pour des produits Agent spécifiques indépendamment. Ceci est utile lorsque vous souhaitez envoyer différents types de données à différentes organisations Datadog, ou lorsque vous souhaitez uniquement utiliser la Fédération d'identité de charge de travail pour des produits spécifiques.

Pour activer l'authentification déléguée pour les logs uniquement :

```yaml
logs_config:
  delegated_auth:
    org_uuid: <YOUR_ORG_UUID>
```

Pour utiliser des organisations différentes pour des produits différents :

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

<div class="alert alert-info">Paramètres spécifiques au fournisseur (tels que <code>provider</code> et <code>aws</code>) ne sont configurés que dans le global <code>delegated_auth</code> section. Les sections par produit ne prennent en charge que <code>org_uuid</code>.</div>

#### Comportement de repli {#fallback-behavior}

Si le flux d'authentification déléguée échoue pour une raison quelconque, l'Agent revient automatiquement à l'utilisation de la clé d'API configurée dans votre fichier `datadog.yaml`. Ce comportement de repli fournit un filet de sécurité lors de l'intégration et protège contre les interruptions du service d'authentification.

Pour tirer parti de ce repli, conservez votre configuration `api_key` existante parallèlement à la nouvelle configuration `delegated_auth` :

```yaml
api_key: <YOUR_API_KEY>

delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /fr/integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html
[6]: https://app.datadoghq.com/organization-settings/workload-identity-federation