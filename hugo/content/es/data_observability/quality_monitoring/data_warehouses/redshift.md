---
description: Conecte Amazon Redshift a Datadog Data Observability para hacer un seguimiento
  de la calidad de los datos, hacer un seguimiento del uso y detectar problemas.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Monitores de Data Observability
title: Redshift
---
## Descripción general {#overview}

La integración de Redshift conecta Datadog a su clúster de Amazon Redshift para sincronizar metadatos, historial de consultas y métricas a nivel de tabla. Úsela para hacer un seguimiento de la frescura de los datos, detectar anomalías y rastrear el linaje a través de su almacén y herramientas aguas abajo.

Datadog admite tanto clústeres de Redshift aprovisionados como grupos de trabajo de Redshift Serverless.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener:

- Una [cuenta de AWS conectada en Datadog][3].
  - El reenvío de registros no es necesario para Data Observability.
- Un superusuario de Redshift o un usuario de base de datos con la capacidad de crear roles y otorgar privilegios.
- Si su clúster o grupo de trabajo de Redshift restringe el acceso a la red por IP, agregue las direcciones IP de webhook de Datadog a las reglas de entrada de su grupo de seguridad de VPC. Para obtener la lista de direcciones IP, consulte la sección `webhooks` de la {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Configure su cuenta en Redshift {#set-up-your-account-in-redshift}

Conéctese a su clúster de Redshift como superusuario y ejecute el siguiente SQL para crear un rol dedicado para Datadog.

1. Cree un rol y otorgue acceso a las vistas del catálogo del sistema.

   ```sql
   -- Create a dedicated role for Datadog monitoring
   CREATE ROLE datadog_role;

   -- Required for table size metrics
   GRANT SELECT ON svv_table_info TO ROLE datadog_role;
   ```

2. Otorgue acceso de solo lectura a sus datos. Elija una opción.

   {{< tabs >}}
   {{% tab "All schemas (Recomendado)" %}}

   Otorga a Datadog acceso de lectura a todos los esquemas actuales y futuros, así como a todas las tablas y vistas actuales y futuras de la base de datos, incluidos los esquemas que dbt crea para las pull requests. Esta opción es necesaria para CI/CD de dbt.

   ```sql
   GRANT USAGE FOR SCHEMAS IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   ```

   {{% /tab %}}
   {{% tab "Specific schemas" %}}

   Ejecute lo siguiente para cada esquema del que desee que Datadog haga un seguimiento. Cubre las tablas y vistas actuales y futuras en el esquema, incluidas las creadas por otros usuarios, como dbt:

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   ```

   Los esquemas creados posteriormente, como los esquemas de CI de dbt, no están cubiertos. Para CI/CD de dbt, use la opción **All schemas**.

   {{% /tab %}}
   {{< /tabs >}}

3. Cree o asigne el usuario de base de datos de Datadog.

   {{< tabs >}}
   {{% tab "Clúster aprovisionado" %}}

   Cree un usuario de base de datos dedicado y asígnele el rol:

   ```sql
   -- Replace <STRONG_PASSWORD> with a secure password
   CREATE USER datadog_user PASSWORD '<STRONG_PASSWORD>' SYSLOG ACCESS UNRESTRICTED;
   GRANT ROLE datadog_role TO datadog_user;
   ```

   {{% /tab %}}
   {{% tab "Serverless" %}}

   En Redshift Serverless, los usuarios de base de datos se asignan automáticamente desde identidades de IAM. Por ejemplo, un rol de IAM llamado `DatadogIntegrationRole` se asigna al usuario de base de datos `IAMR:DatadogIntegrationRole`.

   Otorgue el `datadog_role` a su usuario de base de datos vinculado a IAM:

   ```sql
   GRANT ROLE datadog_role TO "IAMR:<YOUR_IAM_ROLE_NAME>";
   ALTER USER "IAMR:<YOUR_IAM_ROLE_NAME>" SYSLOG ACCESS UNRESTRICTED;
   ```

   {{% /tab %}}
   {{< /tabs >}}

## Configure las políticas de IAM {#configure-iam-policies}

Agregue las siguientes políticas al rol de IAM de la integración de AWS de Datadog asociado con la cuenta de AWS que contiene su clúster de Redshift.

{{< tabs >}}
{{% tab "Clúster aprovisionado" %}}

Adjunte la política administrada por AWS `AmazonRedshiftDataFullAccess` y una política en línea que otorgue `redshift:GetClusterCredentials` para el usuario de base de datos de Datadog creado en la sección anterior:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentials",
            "Resource": [
                "arn:aws:redshift:<REGION>:<ACCOUNT_ID>:dbuser:<CLUSTER_IDENTIFIER>/datadog_user"
            ]
        }
    ]
}
```

{{% /tab %}}
{{% tab "Serverless" %}}

Adjunte la política administrada por AWS `AmazonRedshiftDataFullAccess` y una política en línea que otorgue `redshift-serverless:GetCredentials` para su grupo de trabajo:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift-serverless:GetCredentials",
            "Resource": "arn:aws:redshift-serverless:<REGION>:<ACCOUNT_ID>:workgroup/<WORKGROUP_ID>"
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Configure la integración de Redshift en Datadog {#configure-the-redshift-integration-in-datadog}

Para configurar la integración de Redshift en Datadog:

1. Navegue a [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1].
2. Haga clic en el botón {{< ui >}}Configure{{< /ui >}} para la opción de Redshift.

   {{< img src="data_observability/redshift/data_obs_redshift_on_integrations_page.png" alt="Redshift en la página Settings de las integraciones de Data Observability" style="width:100%;" >}}

3. Seleccione una cuenta de AWS conectada o agregue una nueva cuenta de AWS.

   {{< img src="data_observability/redshift/data_obs_redshift_integration_flow.png" alt="Selección de una cuenta de AWS conectada o nueva para la integración de Data Observability de Redshift." style="width:100%;" >}}

4. Ingrese los detalles de conexión de su clúster:

   {{< tabs >}}
   {{% tab "Clúster aprovisionado" %}}

   - {{< ui >}}Cluster identifier{{< /ui >}}: el identificador de su clúster de Redshift.
   - {{< ui >}}Region{{< /ui >}}: la región de AWS donde está alojado su clúster (por ejemplo, `us-east-1`).
   - {{< ui >}}Database user{{< /ui >}}: el usuario de Datadog creado durante la configuración (por ejemplo, `datadog_user`).
   - {{< ui >}}Initial database{{< /ui >}}: el nombre de la base de datos a la que conectarse (el valor predeterminado es `dev`).

   {{% /tab %}}
   {{% tab "Serverless" %}}

   - {{< ui >}}Workgroup name{{< /ui >}}: el nombre de su grupo de trabajo de Redshift Serverless.
   - {{< ui >}}Region{{< /ui >}}: la región de AWS donde está alojado su grupo de trabajo (por ejemplo, `us-east-1`).
   - {{< ui >}}Initial database{{< /ui >}}: el nombre de la base de datos a la que conectarse (el valor predeterminado es `dev`).

   {{% /tab %}}
   {{< /tabs >}}

   {{< img src="data_observability/redshift/data_obs_redshift_add_credentials.png" alt="Campos de entrada para las credenciales de Redshift para las integraciones de Data Observability" style="width:100%;" >}}

5. Haga clic en {{< ui >}}Add account{{< /ui >}}.

## Próximos pasos {#next-steps}

Después de guardar, Datadog comienza a sincronizar su esquema de información e historial de consultas en segundo plano. Las sincronizaciones iniciales pueden tardar hasta varias horas dependiendo del tamaño de su implementación de Redshift.

Una vez completada la sincronización inicial, cree un [seguimiento de Data Observability][2] para comenzar a recibir alertas sobre la actualidad de los datos, las métricas a nivel de columna y las métricas SQL personalizadas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: /es/monitors/types/data_observability/
[3]: /es/integrations/amazon-web-services/