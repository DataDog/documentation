---
title: Uso del menú Bits
---

## Información general

Con el menú Bits de Cloudcraft, puedes pasar sin problemas de cualquier recurso dentro de Cloudcraft a las vistas más relevantes en Datadog. Esta función permite acceder rápidamente a información relevante adaptada al recurso específico que estés examinando. Ya sean logs, trazas de APM, u otros datos en Datadog, acceder a ellos desde tu diagrama de Cloudcraft está a un clic de distancia.

<div class="alert alert-info">Para acceder a esta función, inicia sesión en Cloudcraft utilizando tu cuenta de Datadog. Si inicias sesión con otro método de inicio de sesión, <a href="https://app.cloudcraft.co/app/support">ponte en contacto con nuestro equipo de asistencia</a> para obtener ayuda.</div>

## El menú Bits

Para empezar, haz clic en un [componente compatible](#supported-components) de tu diagrama. Después de seleccionar un componente, aparece el menú Bits en la parte derecha de la pantalla.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu.png" alt="Captura de pantalla que muestra la interfaz de Cloudcraft con una flecha roja que resalta el menú Bits." responsive="true" style="width:100%;">}}

Haz clic en el menú Bits para ver las opciones disponibles para el componente seleccionado.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu-clicked.png" alt="Captura de pantalla de Cloudcraft con el menú Bits cliqueado que muestra varias opciones, incluidos dashboard de host, monitorización de base de datos, métricas de consulta y dashboard de MySQL." responsive="true" style="width:100%;">}}

Haz clic en cualquiera de las opciones para abrir la vista correspondiente en Datadog.

## Componentes compatibles

El menú Bits está disponible para los siguientes componentes de Cloudcraft:

**Desde AWS:**

- Cloudfront.
- DocumentDB.
- DynamoDB.
- EBS.
- EC2.
- Clúster de EKS.
- ELB/ALB.
- Elasticache.
- Lambda.
- Gateway NAT.
- OpenSearch.
- RDS.
- Redshift.
- S3.
- Tema SNS.
- SQS.
- Endpoint de VPC.

**Desde Azure:**

- Clúster de AKS.
- Base de datos para MySQL.
- Base de datos para PostgreSQL.
- Aplicación de funciones.
- Disco gestionado.
- Base de datos SQL.
- Máquina virtual.
- Aplicación web.

Próximamente se ofrecerá compatibilidad con otros componentes.

**Nota**: Para ver la telemetría en Datadog para un componente, el componente debe tener Datadog Agents u otras integraciones instaladas y configuradas.