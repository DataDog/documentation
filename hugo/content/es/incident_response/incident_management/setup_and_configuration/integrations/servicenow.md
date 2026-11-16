---
aliases:
- /es/service_management/incident_management/integrations/servicenow/
- /es/incident_response/incident_management/integrations/servicenow/
further_reading:
- link: integrations/servicenow/
  tag: Documentación
  text: Instale la integración de ServiceNow
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: Documentación
  text: Configure ServiceNow ITOM e ITSM
- link: https://app.datadoghq.com/integrations/servicenow
  tag: Aplicación
  text: Mosaico de integración de ServiceNow en la aplicación
title: Integre ServiceNow con Datadog Incident Management
---
## Descripción general {#overview}

ServiceNow es una plataforma de gestión de servicios de TI que ofrece soluciones para gestionar flujos de trabajo digitales, operaciones de TI y procesos empresariales. La integración de Datadog con ServiceNow le permite crear incidentes en ServiceNow a partir de incidentes de Datadog y sincronizar datos de forma bidireccional entre ambas plataformas.

La integración de ServiceNow con Datadog Incident Management le ofrece los siguientes beneficios:
- **Visibilidad mejorada**: Asegúrese de que todas las partes interesadas estén informadas de inmediato sobre los incidentes, lo que facilita una respuesta más rápida.
- **Sincronización bidireccional**: Sincronice automáticamente el estado del incidente, la gravedad (impacto y urgencia) y cualquier actualización de estado entre Datadog y ServiceNow.
- **Soporte para flujos de trabajo existentes**: Intégrese sin problemas con sus procesos actuales, lo que facilita la gestión de incidentes dentro de sus flujos de trabajo establecidos en ServiceNow.

## Requisitos previos {#prerequisites}

Para usar la creación automática de incidentes y la sincronización bidireccional con ServiceNow:

1. Instale la [integración de ServiceNow][1] a través del mosaico de integración de ServiceNow y asegúrese de tener el [mosaico de ServiceNow configurado][2] con su instancia de ServiceNow en Datadog.
2. Instale la [integración de ITOM/ITSM para Datadog][3] (recomendado) desde la tienda de ServiceNow, o descargue el Update Set más reciente ([Datadog-Snow_Update_Set_v2.8.0.xml][4]) y cárguelo manualmente en su instancia de ServiceNow.
3. Cree una [clave de aplicación de cuenta de servicio][5] en Datadog para una autenticación segura. **Nota**: Datadog recomienda crear una clave de cuenta de servicio en lugar de usar una personal, lo cual conlleva el riesgo de interrumpir la sincronización de ServiceNow si la cuenta del usuario se desactiva o si cambian sus permisos.

## Configuración {#setup}

### Configure la creación automática de incidentes {#configure-automatic-incident-creation}

1. Vaya a [Configuración de integración][6].
1. En el menú de la izquierda, haga clic en **Integrations**.
1. Busque y haga clic en el mosaico de integración de **ServiceNow** para abrir la configuración.
2. Haga clic en el interruptor para **Habilitar la creación de incidentes de ServiceNow**.
3. Haga clic en el interruptor para **Crear automáticamente un incidente de ServiceNow**.
4. Agregue una condición para definir cuándo crear automáticamente un incidente de ServiceNow. Si esta condición se deja en blanco, la integración crea un incidente de ServiceNow cuando Datadog crea un incidente.

### Configure la sincronización bidireccional {#configure-bidirectional-sync}

En ServiceNow, puede sincronizar el estado, el impacto y la urgencia de forma bidireccional con Incident Management.

1. En ServiceNow, haga clic en el icono del globo en la esquina superior derecha, luego asegúrese de que el **Application Scope** esté configurado en **ITOM/ITSM Integration for Datadog**.
2. En el menú de navegación superior izquierdo, haga clic en **All**.
3. Escriba **ITOM/ITSM Integration for Datadog** en el filtro.
4. Haga clic en el enlace **Configuration** de los resultados filtrados y luego ingrese la configuración requerida:
   1. Seleccione su **Datadog Data Center**.
   2. Pegue su **clave de Datadog API**.
   3. Pegue la **clave de aplicación de cuenta de servicio** que creó.
   4. Marque la casilla **Enabled**.
5. Haga clic en **Guardar**.

Con la sincronización bidireccional, cuando se crea un incidente en Datadog, también se crea un incidente correspondiente en la instancia de ServiceNow vinculada. Este incidente de ServiceNow incluye una referencia al incidente de Datadog y se mantiene sincronizado según los [mapeos de campos](#field-mappings) definidos.

## Mapeos de campos {#field-mappings}

Los mapeos de campos definen cómo se transfiere la información de los incidentes de Datadog y cómo se sincroniza con los campos de los incidentes de ServiceNow. Esto garantiza que los detalles clave del incidente, como el estado, la gravedad y las descripciones, sean coherentes y estén actualizados en ambos sistemas.

A continuación se muestran los mapeos de campos predeterminados utilizados en la integración. Puede personalizar los mapeos dentro de ServiceNow utilizando su mecanismo de [transform map][7] si su flujo de trabajo requiere una configuración de campos avanzada.

Los siguientes campos se sincronizan entre Datadog Incident Management y ServiceNow:

| **Incident Management** | **Tabla de casos de ServiceNow** | **Incidente de ServiceNow** | **Estado de sincronización**                         |
| ----------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| Título                   | Título - Cadena             | Descripción breve       | Sincronización unidireccional de Datadog → ServiceNow |
| Qué sucedió           | Descripción - Cadena       | Descripción             | Sincronización unidireccional de Datadog → ServiceNow |
| Estado                   | Estado - Cadena             | Estado                   | Sincronizado bidireccionalmente                 |
| URL de incidente de DD         | URL de incidente - Cadena      | Notas de trabajo              | Sincronización unidireccional de Datadog → ServiceNow |
| Gravedad                | Urgencia de incidente (int)     | Urgencia                 | Sincronizado bidireccionalmente                 |
| Gravedad                | Impacto de incidente (int)      | Impacto                  | Sincronizado bidireccionalmente                 |

### Asignación de estado de incidente {#incident-state-mapping}

| **Estado de seguimiento de Datadog**                    | **Estado de incidente de ServiceNow** |
|----------------------------------------------|------------------------------|
| Activo                                      | En curso                  |
| Advertencia                                        | En curso                  |
| OK                                          | Resuelto                     |
| Completado _(opcional, configurado en la configuración)_ | Resuelto                  |

### Asignación de gravedad de incidente de Datadog a prioridad de ServiceNow {#datadog-incident-severity-to-servicenow-priority-mapping}

| **Gravedad de incidente de Datadog** | **Urgencia de ServiceNow** | **Impacto de ServiceNow** | **Prioridad de ServiceNow** |
|-------------------------------|------------------------|-----------------------|-------------------------|
| SEV-1                         | 1                      | 1                     | 1 - Crítico            |
| SEV-2                         | 1                      | 2                     | 2 - Alta                |
| SEV-2                         | 2                      | 1                     | 2 - Alta                |
| SEV-3                         | 1                      | 3                     | 3 - Moderado            |
| SEV-3                         | 2                      | 2                     | 3 - Moderado            |
| SEV-3                         | 3                      | 1                     | 3 - Moderado            |
| SEV-4                         | 2                      | 3                     | 4 - Bajo                 |
| SEV-4                         | 3                      | 2                     | 4 - Bajo                 |
| SEV-5 (Menor)                 | 3                      | 3                     | 5 - Planificación            |
| Desconocido                       | 3                      | 3                     | 5 - Planificación            |

**Nota**: Si `Start at SEV-0` está habilitado en la configuración de Incident Management, los valores en `ServiceNow Urgency`, `ServiceNow Impact` y `ServiceNow Priority` permanecen iguales, pero el `Datadog Incident Severity` se desplaza hacia abajo una posición. Por ejemplo, en la primera fila de esta tabla, el `Datadog Incident Severity` sería `0`, pero el resto de los valores en el resto de la tabla permanecerían iguales.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/servicenow
[2]: /es/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[3]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[4]: /es/resources/xml/Datadog-Snow_Update_Set_v2.8.0.xml
[5]: /es/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[6]: https://app.datadoghq.com/incidents/settings#Integrations
[7]: /es/integrations/guide/servicenow-itom-itsm-setup/#tranform-maps