---
core_product:
- seguridad
- cloud security
synonyms:
- puntuación de la posición
- puntuación de cumplimiento
title: puntuación de la posición de seguridad
---

{{< jqmath-vanilla >}}

Disponible para [errores de configuración de Cloud Security][3], la puntuación de la postura de seguridad representa el porcentaje de tu entorno que satisface todas tus reglas Datadog predefinidas de cumplimiento de [nube][1] e [infraestructura][2] de activas.

**Fórmula**:

$${{({\text"Pcritical"/\text"Pcritical + Fcritical"})^2 *8}+{(\text"Phigh"/\text"Phigh + Fhigh") *6}+{(\text"Pmedium"/\text"Pmedium + Fmedium") *3}+{(\text"Plow"/\text"Plow + Flow") *2}+{(\text"Pinfo"/\text"Pinfo + Finfo") *1}}/{8+6+3+2+1}$$

- P es el número de hallazgos de errores de configuración que se evalúan como aprobados.
- F es el número de hallazgos de errores de configuración que se evalúan como fallidos.

La fórmula utiliza una relación ponderada que tiene en cuenta la gravedad del error de configuración y el número de hallazgos de aprobación/fallo para cada gravedad. Solo se incluyen en el cálculo las reglas y conclusiones que tienen la etiqueta (tag) `scored:true`.

Si no hay hallazgos para una gravedad determinada, la gravedad no se incluye en el cálculo. Por ejemplo, si no hay hallazgos críticos, los denominadores serían 6+3+2+1 (excluyendo 8 para crítico).

Puedes mejorar tu puntuación corrigiendo los errores de configuración, ya sea solucionando los problemas subyacentes o silenciando la regla para el recurso afectado. La puntuación de la postura se actualiza cada hora.

[1]: /es/security/default_rules/#cat-posture-management-cloud
[2]: /es/security/default_rules/#cat-posture-management-infra
[3]: /es/security/cloud_security_management/misconfigurations/