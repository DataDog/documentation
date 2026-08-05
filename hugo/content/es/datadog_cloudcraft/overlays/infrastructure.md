---
description: Utiliza la superposición de infraestructura en Cloudcraft para ver los
  recursos agrupados por Cuenta, Región y VPC para diagramas de arquitectura y solución
  de problemas.
further_reading:
- link: /datadog_cloudcraft/overlays/observability/
  tag: Documentación
  text: Superposición de observabilidad
- link: /datadog_cloudcraft/overlays/security/
  tag: Documentación
  text: Superposición de seguridad
- link: /datadog_cloudcraft/overlays/ccm/
  tag: Documentación
  text: Superposición de Cloud Cost Management
title: infraestructura
---

## Información general

La superposición de infraestructura proporciona una visión general de tu entorno de nube agrupando los recursos por Cuenta, Región y VPC. Esta es la vista predeterminada al abrir un diagrama de Cloudcraft.

{{< img src="datadog_cloudcraft/infra_overlay_5.png" alt="Superposición de infraestructura en Cloudcraft." style="width:100%;" >}}

## Casos prácticos

La superposición de infraestructura es ideal para:

- Generación de diagramas de arquitectura para documentación o presentaciones
- Resolución de problemas de conectividad y relaciones entre recursos
- Realización de revisiones de arquitectura superficial
- Incorporación de miembros del equipo a tu entorno de nube

## Agrupación de recursos

Los recursos se organizan en una estructura jerárquica. Las etiquetas de agrupación varían según el proveedor:

| Nivel | AWS | Azure | GCP |
|-------|-----|-------|-----|
| Nivel superior | Cuenta | Suscripción | Proyecto |
| Geográfico | Región | Región | Región |
| Red | VPC | Red virtual | VPC |

Esta jerarquía te ayuda a comprender cómo se distribuyen los recursos en tu infraestructura de nube.

## Interactuar con los recursos

Haz clic en cualquier recurso para abrir un panel lateral con detalles adicionales, incluidos:

- Tipo y nombre del recurso
- Etiquetas asociadas
- Enlaces a vistas relacionadas de Datadog

## Componentes excluidos

Para reducir el desorden visual y destacar las partes más importantes de tu arquitectura, la superposición de infraestructura excluye por defecto determinados componentes:

**AWS**
- Volúmenes de EBS
- Gateways NAT
- Puertas de enlace de tránsito

**GCP**
- Disco de cálculo
- Cronjob de GKE
- Daemonset de GKE
- Despliegue de GKE
- Trabajo de GKE
- Pod de GKE
- Conjunto de estados de GKE

Estos componentes siguen formando parte de tu infraestructura, pero se ocultan para mantener el diagrama centrado en los recursos principales.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}