---
aliases:
- /es/security/cloud_security_management/mute_issues
further_reading:
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de detección de seguridad predefinidas
products:
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Riesgos de identidad de CSM
  url: /security/cloud_security_management/identity_risks/
title: Silenciar problemas en Cloud Security Management
---

{{< product-availability >}}

Puede haber ocasiones en las que una configuración errónea, un problema o un riesgo de identidad no coincidan con el caso de uso de tu empresa, o que decidas aceptarlo como un riesgo conocido. Para ignorarlos, puedes silenciar la configuración errónea, el problema o el riesgo de identidad subyacentes para los recursos afectados.

Por ejemplo, la regla de CSM Misconfigurations ['Block Public Access' feature is enabled for S3 bucket][1] evalúa si un bucket de S3 es de acceso público. Si tienes un bucket de S3 con activos estáticos destinados a ser compartidos públicamente, puedes silenciar la configuración errónea para el bucket de S3.

**Nota**: Silenciar una configuración errónea la elimina del cálculo de tu puntuación de posición.

{{< img src="security/csm/mute_issue.png" alt="El cuadro de diálogo Silenciar problema contiene campos para especificar la razón y duración de la silenciamiento" style="width:100%;">}}

1. En el panel lateral de configuración errónea, problema o riesgo de identidad, selecciona uno o más recursos.
2. Selecciona **Actions** > **Mute for...** (Acciones > Silenciar para...).
3. Selecciona un motivo para el silenciamiento, por ejemplo, está pendiente una solución, es un falso positivo o es un riesgo aceptado.
4. Introduce una **Descripción** opcional.
5. Selecciona la duración del silenciamiento.
6. Haz clic en **Mute** (Silenciar).

### Anular el silenciamiento de un problema

Los problemas silenciados se anulan automáticamente una vez transcurrido el tiempo especificado. También puedes anular el silenciamiento de un problema manualmente.

1. En el panel lateral de error de configuración, problema o riesgo de identidad, selecciona los recursos con el problema silenciado.
2. Selecciona **Actions** > **Unmute** (Acciones > Desactivar silenciamiento).
3. Selecciona un motivo para la anulación del silenciamiento, por ejemplo, no hay ninguna corrección pendiente, fue un error humano o ya no es un riesgo aceptado.
4. Introduce una **Descripción** opcional.
5. Haz clic en **Unmute** (Desactivar silenciamiento).

### Auditar tus problemas silenciados

Para ver los problemas silenciados de tu organización:

- Ordenar por la columna **Silenciado** en el explorador de incidencias de Security Inbox y Misconfigurations.
- Filtra el explorador de incidencias de Security Inbox, Misconfigurations e Identity Risks utilizando la faceta **Muted** (Silenciado).

Para auditar el historial de silenciamiento de una configuración errónea:

1. Abre el panel lateral de errores de configuración.
2. Selecciona el recurso con la configuración errónea silenciada.
3. En la pestaña **Overview** (Vista general), utiliza la **Resource evaluation over time** (Evaluación de recursos a lo largo del tiempo) para ver cuándo se silenció o desbloqueó la configuración errónea durante un periodo determinado (hasta seis meses).

{{< img src="security/csm/muted_finding_evaluation_over_time.png" alt="La evaluación del recurso a lo largo del tiempo muestra el historial de la configuración errónea incluidos periodos en los que estuvo silenciada" style="width:90%;">}}

4. Haz clic en la pestaña **Timeline** (Línea temporal) para ver un historial cronológico de la configuración errónea. Pasa el ratón por encima de una acción de silenciar o anular el silenciamiento para ver detalles adicionales, como el motivo del silenciamiento, cuánto tiempo está previsto que dure el silenciamiento y quién lo ha silenciado.

{{< img src="security/csm/muted_finding_timeline.png" alt="La pestaña Línea temporal muestra un historial cronológico del error de configuración, incluidos los detalles de cuándo se silenció una configuración errónea" style="width:90%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/cis-aws-1.5.0-2.1.5/