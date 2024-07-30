---
further_reading:
- link: /security/notifications/rules/
  tag: Documentación
  text: Información general sobre las notificaciones
- link: /security/notifications/
  tag: Documentación
  text: Reglas de notificación
is_beta: true
title: Próximos cambios en las reglas de notificación de seguridad
---

En este artículo se describen los próximos cambios en la configuración de las [reglas de notificación][1]. Aunque los cambios más significativos se aplican a [Cloud Security Management (CSM)][4], también afectan a [Application Security Management][5] y a [Cloud SIEM][6].

## Señala la obsolescencia de las configuraciones incorrectas de CSM

Actualmente, las notificaciones de [configuraciones incorrectas de CSM][2] sólo pueden configurarse para reglas de detección con señales activadas, como se muestra en el siguiente diagrama:

**Flujo de trabajo actual**:

{{< img src="security/csm/notification_rules_old_workflow.png" alt="Diagrama que muestra el flujo (flow) de trabajo actual para habilitar notificaciones de configuraciones incorrectas de CSM" width="80%">}}

Como parte de los próximos cambios en las reglas de notificación, ya no es necesario habilitar señales para generar notificaciones. El nuevo flujo de trabajo se muestra en el siguiente diagrama:

**Nuevo flujo de trabajo**:

{{< img src="security/csm/notification_rules_new_workflow.png" alt="Diagrama que muestra el flujo de trabajo actual para habilitar notificaciones de configuraciones incorrectas de CSM" width="100%">}}

Este cambio tiene el siguiente impacto en cómo se generan notificaciones para los errores de configuración de CSM:

1. Ahora podrás especificar la configuración incorrecta como tipo de origen al crear reglas de notificación.
2. Ya no se generan señales para las configuraciones incorrectas de CSM. Esto también significa que las notificaciones ya no puede habilitarse para reglas de detección individuales.

<div class="alert alert-warning">Debido a este cambio en el comportamiento, es posible que notes un aumento en el número de notificaciones generadas. Si las condiciones definidas en una regla de notificación dan como resultado un número elevado de notificaciones, se muestra un mensaje de advertencia en el panel <strong>Vista previa de resultados coincidentes</strong>.</div>

3. La compatibilidad con las señales de configuraciones incorrectas de CSM dejará de estar disponible a finales de 2024. Las señales heredadas se conservarán durante 15 meses a partir de su fecha de activación (de forma gratuita).

## Selector de los tipos de fuentes de reglas de notificación

Al crear una regla de notificación, ahora se te pide que elijas entre dos tipos de fuentes diferentes: Vulnerabilidad o Amenaza (Señal).

- Una vulnerabilidad representa un posible fallo de seguridad en tu infraestructura.
- Una amenaza (señal) representa una actividad sospechosa que supone una amenaza activa contra tu infraestructura.

{{< img src="security/csm/notification_rules_new_selectors_2.png" alt="Nuevos tipos de fuentes para reglas de notificación" width="75%">}}

## Cambios adicionales

- Ahora, las reglas de notificación pueden configurarse para riesgos de identidad y rutas de ataque.
- Las notificaciones de configuraciones incorrectas de CSM contienen ahora los metadatos completos del hallazgo. Anteriormente, las notificaciones sólo contenían metadatos de señales limitados.
- Las reglas de detección personalizadas de Terraform que utilizan el atributo de notificación heredado ya no serán compatibles.

## Cómo migrar las notificaciones existentes

### Notificaciones de reglas de detección

Para migrar notificaciones que están configurados para reglas de detección individuales:

1. En la [página de reglas de configuración incorrectas][1], selecciona una regla de detección que tenga habilitadas las notificaciones.
2. En el banner que aparece en la sección **Definir gravedad y notificaciones**, haz clic en **Update in 1-Click** (Actualizar con un solo clic).

   Aparece la página del editor de **Reglas de notificación** con los campos ya rellenados con la información de la regla.

3. Modifica los parámetros, si quieres.
4. Haz clic en **Save and Activate** (Guardar y activar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/rules/
[2]: /es/security/misconfigurations
[3]: https://app.datadoghq.com/security/configuration/compliance/rules
[4]: /es/security/cloud_security_management/ 
[5]: /es/security/application_security/
[6]: /es/security/cloud_siem/