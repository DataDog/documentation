---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: Documentación
  text: Configuración de Postgres
- link: /database_monitoring/setup_postgres/rds
  tag: Documentación
  text: Configuración de Database Monitoring para Postgres administrado en Amazon
    RDS
- link: https://www.datadoghq.com/architecture/dbm-quick-install-aws-rds-postgres/
  tag: Centro de arquitectura
  text: Instalación rápida de Datadog DBM para AWS RDS
title: Instalación rápida de Database Monitoring para Postgres RDS
---
La instalación rápida de Database Monitoring para RDS le permite configurar rápidamente Agents para hacer un seguimiento de sus instancias de Postgres en RDS. Después de especificar algunas opciones, Datadog genera una plantilla de CloudFormation que configura su instancia para hacer un seguimiento y utiliza Amazon ECS para implementar el Agent en la instancia de RDS con las configuraciones de DBM recomendadas.

## Requisitos previos {#prerequisites}

- Se debe configurar un grupo de seguridad en la instancia para permitir conexiones entrantes desde la VPC de la instancia y conexiones salientes a Internet.
- El nombre de usuario y la contraseña de acceso de administrador de la instancia de RDS deben almacenarse en un AWS Secret dentro de AWS Secrets Manager. Asegúrese de anotar el Amazon Resource Name (ARN) de este secreto, ya que Datadog lo utiliza para acceder a las credenciales durante la configuración y el funcionamiento.

<div class="alert alert-info">Datadog no almacena las credenciales de administrador. Solo se utilizan temporalmente para conectar el Agent y no se retienen datos después de completar el proceso.</div>

## Instalación {#installation}

1. Navegue a la página de [Database Monitoring Setup][1].
1. En la pestaña {{< ui >}}Unmonitored Hosts{{< /ui >}}, haga clic en {{< ui >}}Add Agent{{< /ui >}} para la instancia de RDS donde desea instalar el Agent.
1. Si no tiene un clúster de ECS instalado para su cuenta y región, haga clic en {{< ui >}}Create Cluster{{< /ui >}}.
1. Seleccione un grupo de seguridad de la lista desplegable {{< ui >}}Security Group{{< /ui >}}.
1. Haga clic en {{< ui >}}Select API Key{{< /ui >}}, seleccione una clave de API de la lista y luego haga clic en {{< ui >}}Use API Key{{< /ui >}}.
1. Haga clic en {{< ui >}}Launch CloudFormation Stack in AWS Console{{< /ui >}}. Se abre una nueva página que muestra la pantalla de AWS CloudFormation. Utilice la plantilla de CloudFormation proporcionada para crear una pila. La plantilla incluye la configuración necesaria para implementar el Agent para hacer un seguimiento de su instancia de RDS.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup