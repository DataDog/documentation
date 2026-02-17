---
aliases:
- /es/security/cloud_security_management/mute_issues
further_reading:
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de detección de seguridad predefinidas
products:
- icon: cloud-security-management
  name: Errores de configuración en Cloud Security
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Riesgos de identidad en Cloud Security
  url: /security/cloud_security_management/identity_risks/
title: Silenciar incidentes en Cloud Security
---

{{< product-availability >}}

Puede haber ocasiones en las que un error de configuración, un incidente o un riesgo de identidad no coincidan con el caso de uso de tu empresa, o que decidas aceptarlo como un riesgo conocido. Para ignorarlo, puedes silenciar el error de configuración, el incidente o el riesgo de identidad subyacentes para los recursos afectados.

Por ejemplo, la regla Errores de configuración en Cloud Security [los buckets deberían tener activada la opción 'Block Public Access' (Bloquear el acceso público)][1] evalúa si un bucket S3 es de acceso público. Si tienes un bucket S3 con recursos estáticos que están destinados a ser compartidos públicamente, puedes silenciar el error de configuración para el bucket S3.

**Nota**: Silenciar una configuración errónea la elimina del cálculo de tu puntuación de posición.

{{< img src="security/csm/mute_issue-3.png" alt="El cuadro Mute Issue (Silenciar incidente) contiene campos para especificar el motivo y la duración del silencio" style="width:70%;">}}

1. Busca el desplegable de estado de clasificación del recurso.
   - En los exploradores de errores de configuración, de riesgos de identidad o de vulnerabilidades, el desplegable se encuentra en la columna **Triage** (Clasificación) de cada recurso. Como alternativa, puedes seleccionar uno o más recursos y hacer clic en el desplegable **Set State** (Definir estado) que aparece, para poder silenciar toda la selección a la vez.
   - Cuando visualizas un recurso en un panel lateral, en **Next Steps** (Siguientes pasos), el desplegable está en **Triage** (Clasificación).
2. Abre el desplegable con el estado de clasificación actual y haz clic en **Muted** (Silenciado). Se abre la ventana **Mute issue** (Silenciar incidente).
3. Selecciona un motivo para el silencio, por ejemplo si es un falso positivo, si es un riesgo aceptado o si está pendiente de corrección.
4. Introduce una **Descripción** opcional.
5. Selecciona la duración del silenciamiento.
6. Haz clic en **Mute** (Silenciar). Se cierra la ventana **Mute issue** (Silenciar incidente).

Para silenciar automáticamente los incidentes que cumplen determinados criterios, consulta [Reglas de silenciado][2].

## Anular el silencio de un incidente

Los incidentes silenciados se anulan automáticamente una vez transcurrido el tiempo especificado. También puedes anular el silencio de un incidente manualmente.

1. Busca el desplegable de estado de clasificación del recurso.
   - En los exploradores de errores de configuración, de riesgos de identidad o de vulnerabilidades, el desplegable se encuentra en la columna **Triage** (Clasificación) de cada recurso. Como alternativa, puedes seleccionar uno o más recursos y hacer clic en el desplegable **Set State** (Definir estado) que aparece, para poder anular el silencio de toda la selección a la vez.
   - Cuando visualizas un recurso en un panel lateral, en **Next Steps** (Siguientes pasos), el desplegable está en **Triage** (Clasificación).
2. Haz clic en **Muted** (Silenciado) para abrir el desplegable y luego selecciona un nuevo estado de clasificación. El estado de clasificación se actualiza inmediatamente para los recursos seleccionados.

## Auditar tus incidentes silenciados

Para ver los incidentes silenciados de tu organización:

1. Por defecto, todos los exploradores de incidentes ocultan los incidentes silenciados. Para ver los incidentes silenciados en los exploradores de incidentes de errores de configuración y riesgos de identidad, elimina el filtro `@workflow.triage.status:(open OR in-progress)` de la barra de búsqueda.
1. Dependiendo del explorador de incidentes que estés utilizando, ordena o filtra los incidentes:
   - En el explorador de incidentes de errores de configuración, ordena por la columna **Muted** (Silenciado).
   - En los exploradores de incidentes de errores de configuración o riesgos de identidad, filtra los incidentes utilizando la faceta **Muted** (Silenciado).
   - En el explorador de incidentes de vulnerabilidades, haz clic en la pestaña **Muted** (Silenciado).

Para auditar el historial de silenciamiento de una configuración errónea:

1. Abre el panel lateral de errores de configuración.
2. Selecciona el recurso con la configuración errónea silenciada.
3. Haz clic en la pestaña **Timeline** (Línea temporal) para ver un historial cronológico de la configuración errónea. Pasa el ratón por encima de una acción de silenciar o anular el silencio para ver detalles adicionales, como el motivo del silencio, cuánto tiempo está previsto que dure el silencio y quién lo ha silenciado.

{{< img src="security/csm/muted_finding_timeline-2.png" alt="La pestaña Timeline (Cronología) muestra un historial cronológico del error de configuración, incluyendo detalles de cuándo fue silenciada una notificación" style="width:90%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/hkp-p6b-f7w/
[2]: /es/security/automation_pipelines/mute