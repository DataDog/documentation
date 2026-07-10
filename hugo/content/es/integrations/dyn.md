---
app_id: dyn
categories:
- network
custom_kind: integración
description: 'Monitoriza tus zonas: QPS y actualizaciones.'
media: []
title: Dyn
---
![Información general de Dyn](images/dyn_overview.png)

## Información general

<div class="alert alert-warning">
Oracle Cloud Infrastructure adquirió Dyn en 2016 e integró los productos y servicios Dyn en la plataforma Oracle Cloud Infrastructure. Para obtener más información sobre la migración de tus servicios, consulta <a href="https://www.oracle.com/corporate/acquisitions/dyn/technologies/migrate-your-services/" target="_blank">Migración de servicios Dyn a Oracle Cloud Infrastructure</a>.
</div>

Monitoriza tus zonas con gráficos y eventos avanzados.

- Conserva un registro de los cambios realizados al actualizar una zona.
- Analiza las consultas por segundo (QPS) realizadas por zona o tipo de registro gracias a las herramientas gráficas avanzadas.

## Configuración

### Configuración

Si aún no has creado un usuario de solo lectura `datadog` en Dyn, [inicia sesión en Dyn](https://manage.dynect.net/login) y sigue estas instrucciones:

1. Elige un nombre de usuario y una contraseña:
   ![Crear usuario dyn](images/create_dyn_user.png)

1. Selecciona el grupo de usuarios **READONLY** (Solo lectura):
   ![Seleccionar grupo dyn](images/choose_dyn_group.png)

1. Haz clic en **Add New User** (Añadir nuevo usuario).

Una vez que hayas creado un usuario de solo lectura de Datadog:

1. Configura la [integración de Dyn] de Datadog (https://app.datadoghq.com/integrations/dyn) utilizando el cuadro de integración:
   ![Integración de Dyn](images/dyn_integration.png)

1. Selecciona las zonas (_Notas de zonas_) de las que quieres recopilar eventos y la métrica `dyn.changes`:<br>

![Zona Dyn](images/dyn_zone.png)

Las métricas de Dyn `QPS` se recopilan por defecto en todas las zonas.

<div class="alert alert-info">
Las listas de control del acceso (ACL) a las IP deben estar deshabilitadas para la integración Dyn.
</div>

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **dyn.qps** <br>(gauge) | Número de consultas DNS a una zona determinada.<br>_Se muestra como consulta_ |
| **dyn.changes** <br>(gauge) | El número de cambios de nota de zona DNS.<br>_Se muestra como evento_ |

**Nota**: La métrica `dyn.qps` se pone a disposición de Datadog unos 90 minutos después de la hora actual.

### Eventos

La integración Dyn no incluye eventos.

### Checks de servicio

La integración Dyn no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).