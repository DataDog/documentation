---
core_product:
- seguridad
- csm
synonyms:
- puntuación de la posición
- puntuación de cumplimiento
title: puntuación de la posición de seguridad
---

{{< jqmath-vanilla >}}

Disponible para [Cloud Security Management Misconfigurations][3], la puntuación de la posición de seguridad representa el porcentaje de tu entorno que satisface todas tus reglas activas de cumplimiento de [nube][1] e [infraestructura][2] listas para utilizar de Datadog.

**Fórmula**:

$${{({\text"Pcrictical"/\text"Pcritical + Fcritical"})^2 *8}+{(\text"Phigh"/\text"Phigh + Fhigh") *6}+{(\text"Pmedium"/\text"Pmedium + Fmedium") *3}+{(\text"Plow"/\text"Plow + Flow") *2}+{(\text"Pinfo"/\text"Pinfo + Finfo") *1}}/{8+6+3+2+1}$$

- P es el número de errores de configuración que se evalúan para aprobarse.
- F es el número de errores de configuración que se evalúan como fallas.

La fórmula utiliza una relación ponderada que tiene en cuenta la gravedad del error de configuración y el número de errores de configuración aprobados/fallidos para cada gravedad. Solo se incluyen en el cálculo las reglas y errores de configuración que tienen la etiqueta (tag) `scored:true`.

Si no hay errores de configuración para una gravedad determinada, dicha gravedad no se incluye en el cálculo. Por ejemplo, si no hay errores de configuración críticos, los denominadores serían 6+3+2+1 (excluyendo 8 para críticos).

Puedes mejorar tu puntuación al corregir los errores de configuración, ya sea al solucionar los problemas subyacentes o silenciar el error de configuración del recurso afectado. La puntuación de la posición se actualiza cada hora.

[1]: /es/security/default_rules/#cat-posture-management-cloud
[2]: /es/security/default_rules/#cat-posture-management-infra
[3]: /es/security/cloud_security_management/misconfigurations/