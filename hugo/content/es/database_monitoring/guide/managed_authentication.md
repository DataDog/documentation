---
title: Conexión con la autenticación gestionada
---

Esta guía asume que has configurado la [Monitorización de base de datos][1].


[La Monitorización de base de datos de Datadog (DBM)][8] te permite ver planes de explicación y muestras de consultas que se ejecutan en tus hosts de base de datos. Esta guía te muestra cómo utilizar las funciones de autenticación gestionadas en la nube, como IAM, para conectar el Agent a tu base de datos. Esto proporciona una forma más segura de autenticación y te ahorra tener que gestionar las credenciales de la base de datos a través de tus hosts de Agent.


## Antes de empezar


Bases de datos compatibles
: Postgres, SQL Server


Tipos de autenticación admitidos y versiones del Agent 
:


| Tipo de autenticación                      | Versión del Agent | Postgres  | SQL Server |
|:-----------------------------------------|:--------------|:---------:|:----------:|
| [IAM][2]                                 |               |           |            |
|                                          | 7.46          | {{< X >}} |            |
| [Identidad gestionada de Microsoft Entra ID][9] |               |           |            |
|                                          | 7.48          | {{< X >}} | {{< X >}}  |




## Configurar la autenticación de IAM


AWS admite la autenticación de IAM para bases de datos de RDS y Aurora. A partir de Datadog Agent versión 7.57, la autenticación de IAM entre cuentas es compatible con las bases de datos de RDS y Aurora.
Con el fin de configurar el Agent para conectarte utilizando IAM, sigue los pasos para completar la configuración de la base de datos y el Datadog Agent.

### Activar la autenticación de IAM para tu base de datos

1. Activa la autenticación de IAM en tu instancia de [RDS][3] o [Aurora][4].
2. Crea una política de IAM para la autenticación de la base de datos. Sustituye `<YOUR_IAM_AUTH_DB_USER>` por el usuario de la base de datos local en el documento de la política de IAM:
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

Por ejemplo, si deseas utilizar el usuario `datadog`, utiliza el siguiente ARN de recurso:

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

Por ejemplo, si quisieras utilizar el usuario `datadog`, utilizarías el siguiente ARN de recurso:

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

AWS también admite comodines para especificar el recurso; por ejemplo, si deseas permitir que el usuario `datadog` se autentique en todas las instancias de una cuenta, añade lo siguiente:

```json
  "Resource": [
    "arn:aws:rds-db:*:ACCOUNT:dbuser:cluster-*/datadog",
    "arn:aws:rds-db:*:ACCOUNT:dbuser:db-*/datadog"
  ],
```

3. Inicia sesión en tu instancia de base de datos como usuario raíz y concede el [rol][20] `rds_iam` al nuevo usuario:


```tsql
CREATE USER <YOUR_IAM_ROLE> WITH LOGIN;
GRANT rds_iam TO <YOUR_IAM_ROLE>;
```

Por ejemplo, para el usuario `datadog` se ejecutaría:

```tsql
CREATE USER datadog WITH LOGIN;
GRANT rds_iam TO datadog;
```


**Nota:** Este tiene que ser un nuevo usuario creado sin contraseña, o la autenticación de IAM fallará.

4. Completa los pasos de configuración del Agent para tu instancia de [RDS][6] o [Aurora][7].

### Habilita la autenticación de IAM para el host del Agent en la misma cuenta de AWS que la instancia de RDS.

{{< tabs >}}
{{% tab "EC2" %}}

1. Crea un rol de IAM y adjunta la política de IAM creada para la autenticación de la BD al rol.

```bash
# Crea un rol de IAM para la instancia de EC2
# Reemplaza `<YOUR_IAM_AUTH_DB_ROLE>` con el nombre del rol de IAM
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

# Adjunta la política de IAM al rol de IAM
# Reemplaza `<YOUR_IAM_AUTH_DB_POLICY_ARN>` con el ARN de la política de IAM del paso 2
aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

Adjunta el rol de IAM a la instancia de EC2 en la que se ejecuta el Agent. Para obtener más información, consulta [Roles de IAM para Amazon EC2][1].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html

{{% /tab %}}
{{% tab "ECS Fargate" %}}

1. Crea un rol de IAM y adjunta la política de IAM creada para la autenticación de la BD al rol.

```bash
# Crea un rol de IAM para la tarea de ECS
# Reemplaza `<YOUR_IAM_AUTH_DB_ROLE>` con el nombre del rol de IAM
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

# Adjunta la política de IAM al rol de IAM
# Reemplaza `<YOUR_IAM_AUTH_DB_POLICY_ARN>` con el ARN de la política de IAM del paso 2
aws iam attach-role-policy --role-name <YOUR_IAM_AUTH_DB_ROLE> --policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN>
```

En la definición de la tarea de ECS, adjunta el rol de IAM al rol de la tarea donde se define el contenedor del Agent. Para obtener más información, consulta [Roles de IAM para Amazon ECS][1].

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html

{{% /tab %}}
{{% tab "EKS" %}}

1. Crea un rol de IAM y adjunta la política de IAM creada para la autenticación de la BD al rol.

```bash
# Crea un proveedor de IAM OIDC para tu clúster
# Reemplaza `<YOUR_ESK_REGION>` y `<YOUR_ESK_CLUSTER>` con la región y el nombre de tu clúster de ESK
$ eksctl utils associate-iam-oidc-provider \
  --region=<YOUR_ESK_REGION> \
  --cluster=<YOUR_ESK_CLUSTER> \
  --approve

# Crea una cuenta de servicio
# Reemplaza `<YOUR_IAM_AUTH_DB_POLICY_ARN>` con el ARN de la política de IAM del paso 2
# Reemplaza `<YOUR_IAM_AUTH_SERVICE_ACCOUNT>` y `<YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE>` con el nombre y espacio de nombres de la cuenta de servicio
$ eksctl create iamserviceaccount \
  --cluster <YOUR_ESK_CLUSTER> \
  --name <YOUR_IAM_AUTH_SERVICE_ACCOUNT> \
  --namespace <YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE> \
  --attach-policy-arn <YOUR_IAM_AUTH_DB_POLICY_ARN> \
  --override-existing-serviceaccounts \
  --approve
```

Asigna el rol de IAM a la cuenta de servicio de Kubernetes donde se ejecuta el Agent. Para obtener más información, consulta [Roles de IAM para la cuenta de servicio de Amazon EKS][1].

[1]: https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

{{% /tab %}}
{{< /tabs >}}


2. Actualiza la configuración de tu instancia de Postgres con un bloque `aws` en el que se especifique la `region` de la instancia RDS, y establece `managed_authentication.enabled` en `true`:


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

### Habilita la autenticación de IAM para el host del Agent en una cuenta de AWS distinta que la instancia de RDS.

**NOTA: La autenticación de IAM entre cuentas es compatible a partir del Agent versión 7.57.**

{{< tabs >}}
{{% tab "EC2" %}}

1. Crea un rol de IAM en la cuenta donde se encuentra la instancia de RDS y adjunta la política de IAM creada para la autenticación de la BD al rol utilizando el siguiente ejemplo.
   - Sustituye `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM
   - Sustituye `<YOUR_AWS_ACCOUNT_FOR_AGENT>` por el ID de la cuenta de AWS donde se ejecuta el Agent 
   - Sustituye `<YOUR_AGENT_EC2_ROLE>` por el rol de IAM de la instancia de EC2 donde se ejecuta el Agent 
   - Sustituye `<YOUR_IAM_AUTH_DB_POLICY_ARN>` por el ARN de la política de IAM creada para la autenticación de la base de datos.

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

2. Modifica las políticas de permisos de rol de IAM de la instancia de EC2 donde se ejecuta el Agent, para permitir asumir el rol de IAM creado en el paso anterior.
   - Sustituye `<YOUR_AGENT_EC2_ROLE>` por el rol de IAM de la instancia de EC2 donde se ejecuta el Agent 
   - Sustituye `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM creado para la autenticación de la base de datos.
   - Sustituye `<YOUR_AWS_ACCOUNT_FOR_DB>` por el ID de la cuenta de AWS donde se encuentra la instancia de RDS

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

1. Crea un rol de IAM en la cuenta donde se encuentra la instancia de RDS y adjunta la política de IAM creada para la autenticación de la BD al rol utilizando el siguiente ejemplo.
   - Sustituye `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM creado para la autenticación de la base de datos.
   - Sustituye `<YOUR_AWS_ACCOUNT_FOR_AGENT>` por el ID de la cuenta de AWS donde se ejecuta el Agent 
   - Sustituye `<YOUR_AGENT_ECS_ROLE>` por el rol de IAM de la tarea de ECS donde se ejecuta el Agent 
   - Sustituye `<YOUR_IAM_AUTH_DB_POLICY_ARN>` por el ARN de la política de IAM creada para la autenticación de la base de datos.

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

2. Modifica las políticas de permisos del rol de IAM de la tarea de ECS donde se ejecuta el Agent para permitir que el Agent asuma el rol de IAM creado en el paso anterior.
   - Sustituye `<YOUR_AGENT_ECS_ROLE>` por el rol de IAM de la tarea de ECS donde se ejecuta el Agent 
   - Sustituye `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM
   - Sustituye `<YOUR_AWS_ACCOUNT_FOR_DB>` por el ID de la cuenta de AWS donde se encuentra la instancia de RDS

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

1. Crea un rol de IAM en la cuenta donde se encuentra la instancia de RDS y adjunta la política de IAM creada para la autenticación de la BD al rol utilizando el siguiente ejemplo.
   - Sustituye `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM
   - Sustituye `<YOUR_AWS_ACCOUNT_FOR_AGENT>` por el ID de la cuenta de AWS donde se ejecuta el Agent 
   - Sustituye `<YOUR_AGENT_EKS_ROLE>` por el rol de IAM que utilizarán los pods de EKS en los que se ejecuta el Agent.
   - Sustituye `<YOUR_IAM_AUTH_DB_POLICY_ARN>` por el ARN de la política de IAM creada para la autenticación de la base de datos.

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

2. Modifica el rol de IAM para la cuenta de servicio de EKS donde se ejecuta el Agent para permitir asumir el rol de IAM creado en el paso anterior.
   - Sustituye `<YOUR_AGENT_EKS_ROLE>` por el rol de IAM de la cuenta de servicio de EKS que utiliza el Agent 
   - Sustituye `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM
   - Sustituye `<YOUR_AWS_ACCOUNT_FOR_DB>` por el ID de la cuenta de AWS donde se encuentra la instancia de RDS

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

3. Crea un proveedor OIDC de IAM para tu clúster y una cuenta de servicio para el Agent utilizando el siguiente ejemplo.
   - Sustituye `<YOUR_EKS_REGION>` y `<YOUR_EKS_CLUSTER>` por la región y el nombre de tu clúster de EKS
   - Sustituye `<YOUR_IAM_AUTH_DB_POLICY_ARN>` por el ARN de la política de IAM creada para la autenticación de la base de datos.
   - Sustituye `<YOUR_IAM_AUTH_SERVICE_ACCOUNT>` y `<YOUR_IAM_AUTH_SERVICE_ACCOUNT_NAMESPACE>` por el nombre y espacio de nombres de la cuenta de servicio 
   - Sustituye `<YOUR_AGENT_EKS_ROLE>` por el rol de IAM que utilizarán los pods de EKS en los que se ejecuta el Agent.

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

Actualiza la configuración de tu instancia de Postgres con un bloque `aws` como se muestra a continuación:
 - Especifica la `region` de la instancia de RDS
 - Establece `managed_authentication.enabled` en `true`
 - Especifica el ARN del rol, sustituyendo `<YOUR_AWS_ACCOUNT_FOR_DB>` por el ID de la cuenta de AWS donde se encuentra la instancia de RDS y `<YOUR_IAM_AUTH_DB_ROLE>` por el nombre del rol de IAM creado en el paso 1.

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


## Configurar la autenticación de identidad gestionada de Microsoft Entra ID


Azure permite a los usuarios configurar la autenticación de identidad gestionada para cualquier recurso que pueda acceder a [Microsoft Entra ID][15], anteriormente Azure Active Directory. El Datadog Agent admite la autenticación de identidad gestionada [asignada por el usuario][10] para tus bases de datos en la nube.


### Conectarse a PostgreSQL


Para configurar la autenticación a tu instancia de PostgreSQL Flexible o Single Server, haz lo siguiente:


1. Crea tu [identidad gestionada][11] en el portal de Azure y asígnala a tu máquina virtual de Azure en la que está desplegado el Agent.
2. Configura un [usuario de administrador de Microsoft Entra ID][12] en tu instancia de PostgreSQL.
3. Conéctate a tu instancia de PostgreSQL como el [usuario de administrador de Microsoft Entra ID][13], y ejecuta el siguiente comando:


```tsql
select * from pgaadauth_create_principal('<IDENTITY_NAME>', false, false);
```
4. Sigue los [pasos de configuración del Agent][14] para Azure. Por ejemplo:


Crea el siguiente esquema **en cada base de datos**:


```tsql
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO "<IDENTITY_NAME>";
GRANT USAGE ON SCHEMA public TO "<IDENTITY_NAME>";
GRANT pg_monitor TO datadog;
```


Crea la función **en cada base de datos** para permitir al Agent recopilar planes de explicación.


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
  OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
  FETCH curs INTO plan;
  CLOSE curs;
  RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER
```


5. Establece la configuración de tu instancia con el bloque YAML `azure.managed_authentication`, donde `CLIENT_ID` es el ID de cliente de la identidad gestionada:


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
        # Opcionalmente, configura el alcance desde dónde solicitar el token de identidad
        identity_scope: "https://ossrdbms-aad.database.windows.net/.default"
```


### Conectarse a SQL Server


Para configurar la autenticación a tu instancia de base de datos de Azure SQL o instancia gestionada de Azure, haz lo siguiente:


1. Crea tu [identidad gestionada][11] en el portal de Azure y asígnala a tu máquina virtual de Azure en la que está desplegado el Agent.
2. Configura un [usuario de administrador de Microsoft Entra ID][16] en tu instancia de SQL Server.
3. Conéctate a tu instancia de SQL Server como el usuario de administrador de Microsoft Entra ID y ejecuta el siguiente comando `master`:


```tsql
CREATE LOGIN <MANAGED_IDENTITY_NAME> FROM EXTERNAL PROVIDER;
```
4. Procede con los pasos normales de configuración del Agent, para Azure. Por ejemplo, para la [instancia gestionada de Azure][17]:


```tsql
CREATE USER <MANAGED_IDENTITY_NAME> FOR LOGIN <MANAGED_IDENTITY_NAME>;
GRANT CONNECT ANY DATABASE to <MANAGED_IDENTITY_NAME>;
GRANT VIEW SERVER STATE to <MANAGED_IDENTITY_NAME>;
GRANT VIEW ANY DEFINITION to <MANAGED_IDENTITY_NAME>;
GO
```


Si utilizas [Azure SQL DB][19], ejecuta lo siguiente desde la base de datos `master`:


```tsql
CREATE LOGIN <MANAGED_IDENTITY_NAME> FROM EXTERNAL PROVIDER;
CREATE USER datadog FOR LOGIN <MANAGED_IDENTITY_NAME>;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER <MANAGED_IDENTITY_NAME>;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER <MANAGED_IDENTITY_NAME>;
```


Y luego crea el usuario **en cada base de datos**:


```tsql
CREATE USER <DBM_DATADOG_TEST_IDENTITY> FOR LOGIN <DBM_DATADOG_TEST_IDENTITY>;
```


5. Actualiza la configuración de tu instancia con el bloque de configuración `managed_identity`:


**Nota**: Se requiere [ODBC Driver 17 para SQL Server][18] o posterior para utilizar esta función.


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


[1]: /es/database_monitoring/#getting-started
[2]: https://repost.aws/knowledge-center/rds-postgresql-connect-using-iam
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[6]: /es/database_monitoring/setup_postgres/rds/#grant-the-agent-access
[7]: /es/database_monitoring/setup_postgres/aurora/#grant-the-agent-access
[8]: /es/database_monitoring
[9]: https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
[10]: https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview#managed-identity-types
[11]: https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/how-manage-user-assigned-managed-identities?pivots=identity-mi-methods-azp#create-a-user-assigned-managed-identity
[12]: https://learn.microsoft.com/en-us/azure/postgresql/single-server/how-to-configure-sign-in-azure-ad-authentication
[13]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-configure-sign-in-azure-ad-authentication#authenticate-with-azure-ad
[14]: /es/database_monitoring/setup_postgres/azure/#grant-the-agent-access
[15]: https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/whatis
[16]: https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-configure?view=azuresql&tabs=azure-powershell#provision-azure-ad-admin-sql-managed-instance
[17]: /es/database_monitoring/setup_sql_server/azure/?tab=azuresqlmanagedinstance
[18]: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[19]: /es/database_monitoring/setup_sql_server/azure/?tab=azuresqldatabase
[20]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL