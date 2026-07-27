---
aliases:
- /es/security/misconfigurations/frameworks_and_benchmarks/custom_frameworks
further_reading:
- link: security/cspm/setup
  tag: Documentación
  text: Empezando con CSM Misconfigurations
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube de CSM Misconfigurations
- link: security/cspm/findings
  tag: Documentación
  text: Buscar y explorar los errores de configuración
title: Crear marcos de cumplimiento personalizados
---

Con los marcos personalizados, puedes definir y medir el cumplimiento con respecto a tu propia línea de base de seguridad en la nube. Los marcos personalizados se enumeran en la página [Cumplimiento][6] de Cloud Security Management (CSM), tienen su propio informe en tiempo real y [puntuación de la posición de seguridad][7], y se pueden consultar en exploradores y dashboards.

1. En la página [CSM Compliance][6] (Cumplimiento de CSM), haz clic en **Create Framework** (Crear marco).
1. Introduce los siguientes datos:
    - **Nombre del marco**: el nombre de tu marco. Puede incluir caracteres, números y espacios. Debe tener al menos cinco caracteres.
    - **Identificador**: el nombre de etiqueta para el marco personalizado. Puede incluir letras minúsculas, números, guiones, guiones bajos y puntos. Este valor se utiliza para consultar el marco en el explorador o en dashboards.
    - **Versión**: la versión del marco. Puede incluir letras minúsculas, números, guiones, guiones bajos y puntos.
    - **URL de la imagen**: URL de acceso público para una imagen que se utiliza para identificar el marco.
1. Haz clic en **Next Step: Create Your Framework** (Paso siguiente: crear tu marco).

A continuación, añade requisitos al marco:

<div class="alert alert-danger">Debes añadir al menos un requisito, un control y una regla antes de guardar el marco personalizado.</div>

1. Haz clic en **Add Requirement** (Añadir requisito).
1. Introduce los siguientes datos:
    - **Requisito**: un requisito actúa como una familia de controles, permitiéndote añadir controles y asociar reglas a cada control. Puedes incluir letras minúsculas, números, guiones, guiones bajos y puntos.
    - **Control**: un control representa los criterios que debe cumplir el requisito e incluye las reglas asociadas a estos criterios. En un control pueden incluirse varias reglas. Puede incluir letras minúsculas, números, guiones, guiones bajos y puntos.
1. Haz clic en **Add Rules** (Añadir reglas).
1. Selecciona las reglas de la nube o de infraestructura que desees asignar al control y, a continuación, haz clic en **Add to Control** (Añadir al control).
1. Para añadir elementos adicionales:
    - Para reglas adicionales, haz clic en **Add Rules** (Añadir reglas).
    - Para otro control, haz clic en **Add Control** (Añadir control).
    - Para otro requisito, haz clic en **Add Requirement** (Añadir requisito).
1. Haz clic en **Save** (Guardar*). Los cambios pueden tardar hasta cuatro horas en reflejarse en la aplicación.

<div class="alert alert-info">Para eliminar una regla de un control, pasa el ratón por encima de la regla y haz clic en <strong>Remove Rule (Eliminar regla)</strong>.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance
[2]: /es/dashboards/template_variables/
[3]: /es/security/cloud_security_management/misconfigurations/custom_rules/#tagging-misconfigurations
[4]: /es/api/latest/security-monitoring/#update-an-existing-rule
[5]: https://app.datadoghq.com/security/configuration/compliance/rules
[6]: https://app.datadoghq.com/security/compliance/home
[7]: /es/glossary/#security-posture-score