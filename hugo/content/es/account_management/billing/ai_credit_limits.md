---
description: Establezca límites mensuales de Créditos de IA a nivel de organización,
  a nivel de usuario o ambos, y anule los límites para usuarios individuales.
further_reading:
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: AI Credits
title: Límites de Créditos de IA
---
## Descripción general {#overview}

Los administradores de la organización pueden establecer topes mensuales en el uso de Créditos de IA a nivel de organización, a nivel de usuario o ambos. Los administradores también pueden anular el límite predeterminado por usuario para usuarios individuales. Los Créditos de IA se comparten entre [Bits Chat][1], [Bits Investigation][2], [Bits Code][3] y [Bits Agent Builder][4].

## Permisos {#permissions}

Para visualizar y establecer los límites de Créditos de IA, un usuario necesita el [`billing_edit` permiso][6].

## Dónde establecer los límites {#where-to-set-limits}

Los límites de Créditos de IA se configuran en [**Bits AI > AI Credits Management**][5].

## Tipos de límites {#types-of-limits}

Puede configurar tres tipos de límites mensuales:

| Tipo de límite | Descripción |
|---|---|
| Límite para toda la organización | Establece un tope al uso total de Créditos de IA en toda la organización durante el mes. No se establece ningún límite para toda la organización de forma predeterminada. |
| Límite predeterminado por usuario | Establece un tope al uso mensual de Créditos de IA para cada usuario que no tenga una anulación individual. |
| Anulación por usuario | Establece un límite mensual personalizado para un usuario individual, reemplazando el límite predeterminado por usuario para ese usuario. |

## Cómo se aplican los límites {#how-limits-are-applied}

- Cuando se configuran tanto un límite de organización como un límite de usuario (o anulación), se aplica al usuario el límite más restrictivo que sea aplicable.
- Si un usuario tiene configurados tanto un límite predeterminado por usuario como una anulación, se aplica el mayor de los dos, y el uso del usuario sigue estando sujeto al límite para toda la organización.
- Aumentar un límite desbloquea a los usuarios que alcanzaron el límite anterior. Reducir un límite bloquea a los usuarios cuyo uso ya excede el nuevo valor.
- Cuando un usuario o la organización alcanza un límite, los usuarios afectados no pueden usar Bits Chat, Bits Investigation, Bits Code o Bits Agent Builder, y aparece un banner que muestra la fecha de restablecimiento.

### Ejemplos {#examples}

| Límite de la organización | Límite por usuario | Usuarios | Uso hipotético máximo | Créditos de IA facturables máximos | Resultado |
|---|---|---|---|---|---|
| 2,000 Créditos de IA | 50 Créditos de IA por usuario | 20 | 50 × 20 = 1,000 Créditos de IA | 1,000 Créditos de IA | Cada usuario puede usar hasta 50 Créditos de IA sin otras restricciones. |
| 2,000 Créditos de IA | 200 Créditos de IA por usuario | 20 | 200 × 20 = 4,000 Créditos de IA<sup>*</sup> | 2,000 Créditos de IA | Cada usuario puede usar hasta 200 Créditos de IA hasta que se alcance el límite de 2,000 Créditos de IA para toda la organización. |
| Sin establecer | 200 Créditos de IA por usuario | 20 | 200 × 20 = 4,000 Créditos de IA | 4,000 Créditos de IA | Cada usuario puede usar hasta 200 Créditos de IA sin otras restricciones. |

<sup>*</sup> Un límite de organización configurado actúa como el tope para la organización, independientemente de la suma de los límites hipotéticos por usuario.

## Atribución de uso {#usage-attribution}

La atribución determina qué límite se aplica a una unidad determinada de uso de IA y a quién se le atribuye el gasto de Créditos de IA.

| Producto | Atribución |
|---|---|
| [Bits Chat][1] | Todo el uso de Bits Chat se acumula en la dirección de correo electrónico del usuario que interactúa con Bits Chat. |
| [Bits Investigation][2] | Las investigaciones iniciadas manualmente se acumulan en la dirección de correo electrónico del usuario que inició la acción.<br>Las investigaciones activadas automáticamente (por ejemplo, a partir de la activación de un seguimiento) se acumulan en **Autonomous Agents**. |
| [Bits Code][3] | Todo el uso de Bits Code se acumula en la dirección de correo electrónico del usuario que interactúa con Bits Code. |
| [Bits Agent Builder][4] | Las ejecuciones de agentes para flujos de trabajo se acumulan en la dirección de correo electrónico del usuario que creó el flujo de trabajo.<br>Las ejecuciones de agentes para flujos de trabajo creados por cuentas de servicio se acumulan en **Agentes autónomos**. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_chat/
[2]: /es/bits_ai/bits_investigation/
[3]: /es/bits_ai/bits_code/
[4]: /es/actions/agents/
[5]: https://app.datadoghq.com/bits-ai/ai-credits-management
[6]: /es/account_management/rbac/permissions/#billing-and-usage