---
further_reading:
- link: /database_monitoring/setup_postgres/
  tag: Documentación
  text: Configuración de Postgres
- link: /database_monitoring/setup_postgres/rds
  tag: Documentación
  text: Configuración de Database Monitoring para Postgres gestionado por Amazon RDS
title: Instalación rápida de Database Monitoring para Postgres RDS
---

La instalación rápida de Database Monitoring para Postgres RDS te permite configurar rápidamente Agents para monitorizar tus instancias RDS Postgres. Luego de especificar algunas opciones, Datadog genera una plantilla de CloudFormation que configura tu instancia para la monitorización y utiliza Amazon ECS para desplegar el Agent en la instancia RDS con las configuraciones de monitorización de bases de datos recomendadas.

## Requisitos previos

- Debe configurarse un grupo de seguridad en la instancia para permitir conexiones entrantes desde la VPC de la instancia y conexiones salientes a Internet.
- El nombre de usuario y la contraseña de acceso de administrador a la instancia RDS deben almacenarse en un secreto AWS dentro de AWS Secrets Manager. Asegúrate de anotar el nombre de recurso de Amazon (ARN) de este secreto, ya que Datadog lo utiliza para acceder a las credenciales durante la configuración y el funcionamiento.

<div class="alert alert-info">Datadog no almacena las credenciales de administrador. Sólo se utilizan temporalmente para conectar el Agent y no se conserva ningún dato una vez finalizado el proceso.</div>

## Instalación

1. Ve a la página de [configuración de Database Monitoring][1].
1. En la pestaña **Hosts no monitorizados**, haz clic en **Add Agent** (Añadir Agent) para la instancia RDS en la que quieres instalar el Agent.
1. Si no tienes un clúster ECS instalado para tu cuenta y región, haz clic en **Create Cluster** (Crear clúster).
1. Selecciona un grupo de seguridad en la lista desplegable **Grupo de seguridad**.
1. Haz clic en **Select API Key** (Seleccionar clave de API), selecciona una clave de API en la lista y luego haz clic en **Use API Key** (Utilizar clave de API).
1. Haz clic en **Launch CloudFormation Stack in AWS Console** (Iniciar stack tecnológico de CloudFormation en la consola AWS). Se abrirá una nueva página con la pantalla de AWS CloudFormation. Utiliza la plantilla de CloudFormation proporcionada para crear un stack tecnológico. La plantilla incluye la configuración necesaria para desplegar el Agent para monitorizar tu instancia RDS.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/setup