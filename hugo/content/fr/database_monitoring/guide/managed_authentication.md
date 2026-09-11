---
aliases:
- /fr/database_monitoring/managed_authentication
title: Se connecter avec l'authentification gérée
---

Ce guide part du principe que vous avez configuré [Database Monitoring][1].


[Datadog Database Monitoring (DBM)][8] vous permet de consulter les plans d'exécution et les échantillons de requêtes s'exécutant sur vos hosts de base de données. Ce guide vous explique comment utiliser les fonctionnalités d'authentification gérée dans le cloud, telles que IAM, pour connecter l'Agent à votre base de données. Cela offre une méthode d'authentification plus sécurisée et vous évite de gérer les identifiants de base de données sur vos hosts d'Agent.


## Avant de commencer


Bases de données prises en charge
: Postgres, MySQL, SQL Server


Types d'authentification et versions de l'Agent pris en charge
:


| Type d'authentification                      | Version de l'Agent | Postgres  | MySQL      | SQL Server |
|:-----------------------------------------|:--------------|:---------:|:----------:|:----------:|
| [IAM][2]                                 |               |           |            |            |
|                                          | 7.46          | {{< X >}} |            |            |
|                                          | 7.67          |           | {{< X >}}  |            |
| [Identité gérée Microsoft Entra ID][9] |               |           |            |            |
|                                          | 7.48          | {{< X >}} |            | {{< X >}} |




## Configurer l'authentification IAM


AWS prend en charge l'authentification IAM pour les bases de données RDS et Aurora. À partir de la version 7.57 de l'Agent Datadog, l'authentification IAM inter-comptes est prise en charge pour les bases de données RDS et Aurora.
Pour configurer l'Agent afin qu'il se connecte via IAM, suivez les étapes de configuration de la base de données et de l'Agent Datadog.

### Activer l'authentification IAM pour votre base de données

1. Activez l'authentification IAM sur votre instance [RDS][3] ou [Aurora][4].
2. Créez une politique IAM pour l'authentification à la base de données. Remplacez `<YOUR_IAM_AUTH_DB_USER>` par l'utilisateur de base de données local dans le document de politique IAM :
{{< tabs >}}
{{% tab "RDS" %}}

```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "rds-db:connect"
           ],
           "Resource": [
               "arn:aws:rds-db:REGION:ACCOUNT:dbuser:db-<RESOURCE_ID>/<YOUR_IAM_AUTH_DB_USER>"
           ]
       }
   ]
}
```

Par exemple, si vous souhaitez utiliser l'utilisateur `datadog`, utilisez l'ARN de ressource suivant :

```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "rds-db:connect"
           ],
           "Resource": [
               "arn:aws:rds-db:REGION:ACCOUNT:dbuser:db-<RESOURCE_ID>/datadog"
           ]
       }
   ]
}
```
{{% /tab %}}
{{% tab "Aurora" %}}

```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "rds-db:connect"
           ],
           "Resource": [
               "arn:aws:rds-db:REGION:ACCOUNT:dbuser:cluster-<RESOURCE_ID>/<YOUR_IAM_AUTH_DB_USER>"
           ]
       }
   ]
}
```

Par exemple, si vous souhaitez utiliser l'utilisateur `datadog`, utilisez l'ARN de ressource suivant :

```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "rds-db:connect"
           ],
           "Resource": [
               "arn:aws:rds-db:REGION:ACCOUNT:dbuser:cluster-<RESOURCE_ID>/datadog"
           ]
       }
   ]
}
```
{{% /tab %}}
{{< /tabs >}}

AWS prend également en charge les caractères génériques pour spécifier la ressource. Par exemple, si vous souhaitez autoriser l'utilisateur `datadog` à s'authentifier sur toutes les instances d'un compte, ajoutez ce qui suit :

```json
  "Resource": [
    "arn:aws:rds-db:*:ACCOUNT:dbuser:cluster-*/datadog",
    "arn:aws:rds-db:*:ACCOUNT:dbuser:db-*/datadog"
  ],
```

3. Connectez-vous à votre instance de base de données en tant qu'utilisateur root et créez un [rôle][20] authentifié par IAM :

{{< tabs >}}
{{% tab "Postgres" %}}

```tsql
CREATE USER <YOUR_IAM_ROLE> WITH LOGIN;
GRANT rds_iam TO <YOUR_IAM_ROLE>;
```

Par exemple, pour l'utilisateur `datadog`, exécutez :

```tsql
CREATE USER datadog WITH LOGIN;
GRANT rds_iam TO datadog;
```
{{% /tab %}}
{{% tab "MySQL" %}}

```tsql
CREATE USER <YOUR_IAM_ROLE> IDENTIFIED WITH AWSAuthenticationPlugin AS 'RDS';
ALTER USER <YOUR_IAM_ROLE>@'%' REQUIRE SSL;
```

Par exemple, pour l'utilisateur `datadog`, exécutez : 

```tsql
CREATE USER 'datadog' IDENTIFIED WITH AWSAuthenticationPlugin AS 'RDS';
ALTER USER 'datadog'@'%' REQUIRE SSL;
```
{{% /tab %}}
{{< /tabs >}}


**Remarque** : il doit s'agir d'un nouvel utilisateur créé sans mot de passe, faute de quoi l'authentification IAM échouera.

4. Effectuez les étapes de configuration de l'Agent pour votre instance RDS ([Postgres][6], [MySQL][21]) ou Aurora ([Postgres][7], [MySQL][22]).

### Activer l'authentification IAM pour le host de l'Agent dans le même compte AWS que l'instance RDS

{{< tabs >}}
{{% tab "EC2" %}}

1. Créez un rôle IAM et attachez-y la politique IAM créée pour l'authentification à la base de données.

```bash
# Create an IAM role for EC2 instance
# Replace `<YOUR_IAM_AUTH_DB_ROLE>` with the name of the IAM role
aws iam create-role --role-name <YOUR_IAM_AUTH_DB_ROLE> --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

# Attach the IAM policy to the IAM role
# Replace `<YOUR_IAM_AUTH_DB_POLICY_ARN>` with the ARN of the IAM policy from step 2
aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

Attachez le rôle IAM à l'instance EC2 sur laquelle l'Agent s'exécute. Pour plus d'informations, consultez la section [Rôles IAM pour Amazon EC2][1].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html

{{% /tab %}}
{{% tab "ECS Fargate" %}}

1. Créez un rôle IAM et attachez-y la politique IAM créée pour l'authentification à la base de données.

```bash
# Create an IAM role for ECS task
# Replace `<YOUR_IAM_AUTH_DB_ROLE>` with the name of the IAM role
aws iam create-role --role-name <YOUR_IAM_AUTH_DB_ROLE> --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

# Attach the IAM policy to the IAM role
# Replace `<YOUR_IAM_AUTH_DB_POLICY_ARN>` with the ARN of the IAM policy from step 2
aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

Dans la définition de tâche ECS, attachez le rôle IAM au rôle de tâche dans lequel le conteneur de l'Agent est défini. Pour plus d'informations, consultez la section [Rôles IAM pour Amazon ECS][1].

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html

{{% /tab %}}
{{% tab "EKS" %}}

1. Créez un rôle IAM et attachez-y la politique IAM créée pour l'authentification à la base de données.

```bash
# Create an IAM OIDC provider for your cluster
# Replace `<YOUR_ESK_REGION>` and `<YOUR_ESK_CLUSTER>` with the region and name of your ESK cluster
$ eksctl utils associate-iam-oidc-provider \
  --region=<YOUR_ESK_REGION> \
  --cluster=<YOUR_ESK_CLUSTER> \
  --approve

# Create a service account
# Replace `<YOUR_IAM_AUTH_DB_POLICY_ARN>` with the ARN of the IAM policy from step 2
# Replace `<YOUR_IAM_AUTH_SERVICE_ACCOUNT>` and `<YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE>` with the name and namespace of the service account
$ eksctl create iamserviceaccount \
  --cluster <YOUR_ESK_CLUSTER> \
  --name <YOUR_IAM_AUTH_SERVICE_ACCOUNT> \
  --namespace <YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE> \
  --attach-policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN> \
  --override-existing-serviceaccounts \
  --approve
```

Mappez le rôle IAM au compte de service Kubernetes sur lequel l'Agent s'exécute. Pour plus d'informations, consultez la section [Rôles IAM pour le compte de service Amazon EKS][1].

[1]: https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

{{% /tab %}}
{{< /tabs >}}


2. Mettez à jour la configuration de votre instance Postgres ou MySQL avec un bloc `aws` spécifiant la `region` de l'instance RDS, et définissez `managed_authentication.enabled` sur `true` :

```yaml
instances:
  - host: example-endpoint.us-east-2.rds.amazonaws.com
    port: 5432
    username: datadog
    dbm: true
    aws:
      instance_endpoint: example-endpoint.us-east-2.rds.amazonaws.com
      region: us-east-2
      managed_authentication:
        enabled: true
```

### Activer l'authentification IAM pour le host de l'Agent dans un compte AWS différent de celui de l'instance RDS

**REMARQUE : l'authentification IAM inter-comptes est prise en charge à partir de la version 7.57 de l'Agent.** 

{{< tabs >}}
{{% tab "EC2" %}}

1. Créez un rôle IAM dans le compte où se trouve l'instance RDS, et attachez-y la politique IAM créée pour l'authentification à la base de données en utilisant l'exemple ci-dessous.
   - Remplacez `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM
   - Remplacez `<YOUR_AWS_ACCOUNT_FOR_AGENT>` par l'identifiant du compte AWS sur lequel l'Agent s'exécute
   - Remplacez `<YOUR_AGENT_EC2_ROLE>` par le rôle IAM de l'instance EC2 sur laquelle l'Agent s'exécute
   - Remplacez `<YOUR_IAM_AUTH_DB_POLICY_ARN>` par l'ARN de la politique IAM créée pour l'authentification à la base de données

```bash
aws iam create-role --role-name <YOUR_IAM_AUTH_DB_ROLE> --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_AGENT>:role/<YOUR_AGENT_EC2_ROLE>"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

2. Modifiez les politiques d'autorisation du rôle IAM de l'instance EC2 sur laquelle l'Agent s'exécute, afin d'autoriser l'assumption du rôle IAM créé à l'étape précédente.
   - Remplacez `<YOUR_AGENT_EC2_ROLE>` par le rôle IAM de l'instance EC2 sur laquelle l'Agent s'exécute
   - Remplacez `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM créé pour l'authentification à la base de données
   - Remplacez `<YOUR_AWS_ACCOUNT_FOR_DB>` par l'identifiant du compte AWS où se trouve l'instance RDS

```bash
aws iam update-assume-role-policy --role-name <YOUR_AGENT_EC2_ROLE> --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_DB>:role/<YOUR_IAM_AUTH_DB_ROLE>"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'
```

{{% /tab %}}
{{% tab "ECS Fargate" %}}

1. Créez un rôle IAM dans le compte où se trouve l'instance RDS, et attachez-y la politique IAM créée pour l'authentification à la base de données en utilisant l'exemple ci-dessous.
   - Remplacez `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM créé pour l'authentification à la base de données
   - Remplacez `<YOUR_AWS_ACCOUNT_FOR_AGENT>` par l'identifiant du compte AWS sur lequel l'Agent s'exécute
   - Remplacez `<YOUR_AGENT_ECS_ROLE>` par le rôle IAM de la tâche ECS sur laquelle l'Agent s'exécute
   - Remplacez `<YOUR_IAM_AUTH_DB_POLICY_ARN>` par l'ARN de la politique IAM créée pour l'authentification à la base de données

```bash
aws iam create-role --role-name <YOUR_IAM_AUTH_DB_ROLE> --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_AGENT>:role/<YOUR_AGENT_ECS_ROLE>"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

2. Modifiez les politiques d'autorisation du rôle IAM de la tâche ECS sur laquelle l'Agent s'exécute, afin d'autoriser l'Agent à assumer le rôle IAM créé à l'étape précédente.
   - Remplacez `<YOUR_AGENT_ECS_ROLE>` par le rôle IAM de la tâche ECS sur laquelle l'Agent s'exécute
   - Remplacez `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM
   - Remplacez `<YOUR_AWS_ACCOUNT_FOR_DB>` par l'identifiant du compte AWS où se trouve l'instance RDS

```bash
aws iam update-assume-role-policy --role-name <YOUR_AGENT_ECS_ROLE> --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_DB>:role/<YOUR_IAM_AUTH_DB_ROLE>"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'
```

{{% /tab %}}
{{% tab "EKS" %}}

1. Créez un rôle IAM dans le compte où se trouve l'instance RDS, et attachez-y la politique IAM créée pour l'authentification à la base de données en utilisant l'exemple ci-dessous.
   - Remplacez `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM
   - Remplacez `<YOUR_AWS_ACCOUNT_FOR_AGENT>` par l'identifiant du compte AWS sur lequel l'Agent s'exécute
   - Remplacez `<YOUR_AGENT_EKS_ROLE>` par le rôle IAM à utiliser par les pods EKS sur lesquels l'Agent s'exécute
   - Remplacez `<YOUR_IAM_AUTH_DB_POLICY_ARN>` par l'ARN de la politique IAM créée pour l'authentification à la base de données

```bash
aws iam create-role --role-name <YOUR_IAM_AUTH_DB_ROLE> --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_AGENT>:role/<YOUR_AGENT_EKS_ROLE>"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

2. Modifiez le rôle IAM du compte de service EKS sur lequel l'Agent s'exécute, afin d'autoriser l'assumption du rôle IAM créé à l'étape précédente.
   - Remplacez `<YOUR_AGENT_EKS_ROLE>` par le rôle IAM du compte de service EKS utilisé par l'Agent
   - Remplacez `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM
   - Remplacez `<YOUR_AWS_ACCOUNT_FOR_DB>` par l'identifiant du compte AWS où se trouve l'instance RDS

```bash
aws iam update-assume-role-policy --role-name <YOUR_AGENT_EKS_ROLE> --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_DB>:role/<YOUR_IAM_AUTH_DB_ROLE>"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'
```

3. Créez un fournisseur IAM OIDC pour votre cluster et un compte de service pour l'Agent en utilisant l'exemple ci-dessous.
   - Remplacez `<YOUR_EKS_REGION>` et `<YOUR_EKS_CLUSTER>` par la région et le nom de votre cluster EKS
   - Remplacez `<YOUR_IAM_AUTH_DB_POLICY_ARN>` par l'ARN de la politique IAM créée pour l'authentification à la base de données
   - Remplacez `<YOUR_IAM_AUTH_SERVICE_ACCOUNT>` et `<YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE>` par le nom et l'espace de nommage du compte de service
   - Remplacez `<YOUR_AGENT_EKS_ROLE>` par le rôle IAM à utiliser par les pods EKS sur lesquels l'Agent s'exécute

```bash
$ eksctl utils associate-iam-oidc-provider \
  --region <YOUR_EKS_REGION> \
  --cluster <YOUR_EKS_CLUSTER> \
  --approve

$ eksctl create iamserviceaccount \
  --cluster <YOUR_EKS_CLUSTER> \
  --name <YOUR_IAM_AUTH_SERVICE_ACCOUNT> \
  --namespace <YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE> \
  --role-name arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_AGENT>:role/<YOUR_AGENT_EKS_ROLE> \
  --override-existing-serviceaccounts \
  --approve
```

{{% /tab %}}
{{< /tabs >}}

Mettez à jour la configuration de votre instance Postgres ou MySQL avec un bloc `aws` comme indiqué ci-dessous :
 - Spécifiez la `region` de l'instance RDS
 - Définissez `managed_authentication.enabled` sur `true`
 - Spécifiez l'ARN du rôle, en remplaçant `<YOUR_AWS_ACCOUNT_FOR_DB>` par l'identifiant du compte AWS où se trouve l'instance RDS, et `<YOUR_IAM_AUTH_DB_ROLE>` par le nom du rôle IAM créé à l'étape 1

```yaml
instances:
  - host: example-endpoint.us-east-2.rds.amazonaws.com
    port: 5432
    username: datadog
    dbm: true
    aws:
      instance_endpoint: example-endpoint.us-east-2.rds.amazonaws.com
      region: us-east-2
      managed_authentication:
        enabled: true
        role_arn: arn:aws:iam::<YOUR_AWS_ACCOUNT_FOR_DB>:role/<YOUR_IAM_AUTH_DB_ROLE>
```


## Configurer l'authentification par identité gérée Microsoft Entra ID


Azure permet aux utilisateurs de configurer l'authentification par identité gérée pour toute ressource pouvant accéder à [Microsoft Entra ID][15], anciennement Azure Active Directory. L'Agent Datadog prend en charge l'authentification par identité gérée [affectée par l'utilisateur][10] pour vos bases de données cloud.


### Se connecter à PostgreSQL


Pour configurer l'authentification à votre instance PostgreSQL Flexible ou Single Server, procédez comme suit :


1. Créez votre [identité gérée][11] dans le portail Azure et affectez-la à la machine virtuelle Azure sur laquelle l'Agent est déployé.
2. Configurez un [utilisateur administrateur Microsoft Entra ID][12] sur votre instance PostgreSQL.
3. Connectez-vous à votre instance PostgreSQL en tant qu'[utilisateur administrateur Microsoft Entra ID][13] et exécutez la commande suivante :


```tsql
select * from pgaadauth_create_principal('<IDENTITY_NAME>', false, false);
```
4. Poursuivez avec les [étapes de configuration normales de l'Agent][14] pour Azure. Par exemple :


Créez le schéma suivant **dans chaque base de données** :


```tsql
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO "<IDENTITY_NAME>";
GRANT USAGE ON SCHEMA public TO "<IDENTITY_NAME>";
GRANT pg_monitor TO datadog;
```


Créez la fonction **dans chaque base de données** pour permettre à l'Agent de recueillir les plans d'exécution.


```tsql
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   SET TRANSACTION READ ONLY;

   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```


5. Configurez votre instance avec le bloc YAML `azure.managed_authentication`, où `CLIENT_ID` est l'identifiant client de l'identité gérée :


```yaml
instances:
  - host: example-flex-server.postgres.database.azure.com
    dbm: true
    username: "<IDENTITY_NAME>"
    ssl: "require"
    azure:
      deployment_type: flexible_server
      fully_qualified_domain_name: example-flex-server.postgres.database.azure.com
      managed_authentication:
        enabled: true
        client_id: "<CLIENT_ID>"
        # Optionally set the scope from where to request the identity token
        identity_scope: "https://ossrdbms-aad.database.windows.net/.default"
```


### Se connecter à SQL Server


Pour configurer l'authentification à votre base de données Azure SQL DB ou Azure Managed Instance, procédez comme suit :


1. Créez votre [identité gérée][11] dans le portail Azure et affectez-la à la machine virtuelle Azure sur laquelle l'Agent est déployé.
2. Configurez un [utilisateur administrateur Microsoft Entra ID][16] sur votre instance SQL Server.
3. Connectez-vous à votre instance SQL Server en tant qu'utilisateur administrateur Microsoft Entra ID et exécutez la commande suivante dans la base de données `master` :


```tsql
CREATE LOGIN <MANAGED_IDENTITY_NAME> FROM EXTERNAL PROVIDER;
```
4. Poursuivez avec les étapes de configuration normales de l'Agent pour Azure. Par exemple, pour [Azure Managed Instance][17] :


```tsql
CREATE USER <MANAGED_IDENTITY_NAME> FOR LOGIN <MANAGED_IDENTITY_NAME>;
GRANT CONNECT ANY DATABASE to <MANAGED_IDENTITY_NAME>;
GRANT VIEW SERVER STATE to <MANAGED_IDENTITY_NAME>;
GRANT VIEW ANY DEFINITION to <MANAGED_IDENTITY_NAME>;
GO
```


Si vous utilisez [Azure SQL DB][19], exécutez ce qui suit depuis la base de données `master` :


```tsql
CREATE LOGIN <MANAGED_IDENTITY_NAME> FROM EXTERNAL PROVIDER;
CREATE USER datadog FOR LOGIN <MANAGED_IDENTITY_NAME>;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER <MANAGED_IDENTITY_NAME>;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER <MANAGED_IDENTITY_NAME>;
```


Puis créez l'utilisateur **dans chaque base de données** :


```tsql
CREATE USER <DBM_DATADOG_TEST_IDENTITY> FOR LOGIN <DBM_DATADOG_TEST_IDENTITY>;
```


5. Mettez à jour la configuration de votre instance avec le bloc de configuration `managed_identity` :


**Remarque** : [ODBC Driver 17 for SQL Server][18] ou une version ultérieure est requis pour utiliser cette fonctionnalité.


```yaml
instances:
 - host: "example.cfcc2366ab90.database.windows.net,1433"
   connector: "odbc"
   driver: "{ODBC Driver 18 for SQL Server}"
   dbm: true
   connection_string: "TrustServerCertificate=no;Encrypt=yes;"
   managed_identity:
     client_id: "<CLIENT_ID>"
   azure:
     deployment_type: managed_instance
     fully_qualified_domain_name: example.cfcc2366ab90.database.windows.net
```


[1]: /fr/database_monitoring/#getting-started
[2]: https://repost.aws/knowledge-center/rds-postgresql-connect-using-iam
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[6]: /fr/database_monitoring/setup_postgres/rds/#grant-the-agent-access
[7]: /fr/database_monitoring/setup_postgres/aurora/#grant-the-agent-access
[8]: /fr/database_monitoring
[9]: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview
[10]: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview#managed-identity-types
[11]: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/how-manage-user-assigned-managed-identities?pivots=identity-mi-methods-azp#create-a-user-assigned-managed-identity
[12]: https://learn.microsoft.com/azure/postgresql/single-server/how-to-configure-sign-in-azure-ad-authentication
[13]: https://learn.microsoft.com/azure/postgresql/flexible-server/how-to-configure-sign-in-azure-ad-authentication#authenticate-with-azure-ad
[14]: /fr/database_monitoring/setup_postgres/azure/#grant-the-agent-access
[15]: https://learn.microsoft.com/azure/active-directory/fundamentals/whatis
[16]: https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-configure?view=azuresql&tabs=azure-powershell#provision-azure-ad-admin-sql-managed-instance
[17]: /fr/database_monitoring/setup_sql_server/azure/?tab=azuresqlmanagedinstance
[18]: https://learn.microsoft.com/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[19]: /fr/database_monitoring/setup_sql_server/azure/?tab=azuresqldatabase
[20]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL
[21]: /fr/database_monitoring/setup_mysql/rds/#grant-the-agent-access
[22]: /fr/database_monitoring/setup_mysql/aurora/#grant-the-agent-access