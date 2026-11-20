---
description: Habilite los paquetes de contenido seleccionados por Datadog para implementar
  detecciones opcionales para pilas de software y vectores de amenazas específicos.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: Documentación
  text: Implemente reglas de Agent con políticas
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentación
  text: Reglas de detección de Workload Protection
- link: /security/workload_protection/investigate_and_triage/security_signals
  tag: Documentación
  text: Investigue señales de seguridad
title: Paquetes de contenido
---
No todas las reglas de detección son relevantes para todas las cargas de trabajo. Algunas detecciones pueden ser demasiado ruidosas para entornos con restricciones específicas, o pueden no aplicarse a pilas de software particulares. Al mismo tiempo, surgen amenazas nuevas regularmente, y el equipo de investigación de seguridad de Datadog desarrolla de forma continua reglas para detectar ataques novedosos y vulnerabilidades novedosas.

Workload Protection [Paquetes de contenido][1] aborda ambos desafíos. Cada paquete de contenido es un conjunto elaborado por Datadog que incluye, de manera opcional, [reglas de Agent][2], [reglas de detección][3] y contenido de soporte, diseñado para una pila de software, un vector de amenazas o una vulnerabilidad emergente específicos. Usted elige los paquetes de contenido que necesita y los implementa solo en las cargas de trabajo donde se aplican.

## Beneficios {#benefits}

- **Implemente detecciones dirigidas a cargas de trabajo relevantes:** Elija políticas creadas para cargas de trabajo o entornos específicos e impleméntelas solo donde se apliquen. Esto evita ruido innecesario e impacto en el rendimiento en las cargas de trabajo donde esas detecciones no se aplican.
- **Manténgase al tanto de las amenazas emergentes:** Obtenga acceso a nuevas reglas a medida que el equipo de investigación de seguridad de Datadog identifica amenazas y vulnerabilidades novedosas, complementando la cobertura proporcionada por las políticas predeterminadas.

## Contenido incluido {#included-content}

Dependiendo del paquete de contenido, el conjunto puede incluir:

- **Reglas de Agent** empaquetadas en una [política][4] con un contexto definido para las cargas de trabajo a las que se dirige el paquete de contenido
- **Reglas de detección** que generan [señales de seguridad][5] cuando se detecta actividad coincidente
- **Reglas de hallazgo** que evalúan la postura de seguridad en tiempo de ejecución para el caso de uso cubierto
- Guía de configuración para implementar el paquete de contenido en su entorno

## Habilite un paquete de contenido {#enable-a-content-pack}

1. Vaya a [Content Packs][1].
2. Explore los paquetes de contenido disponibles y seleccione uno.
3. Revise las reglas de Agent, las reglas de detección y los requisitos de implementación incluidos.
4. Haga clic en {{< ui >}}Enable{{< /ui >}} para activar el paquete de contenido y vaya a la página de políticas asociada.

Habilitar un paquete de contenido agrega su política y reglas asociadas a su organización. Para comenzar a detectar amenazas, implemente la política asociada en su infraestructura.

## Implemente un paquete de contenido {#deploy-a-content-pack}

Los paquetes de contenido se implementan a través de [policies][4]. Después de habilitar un paquete de contenido, configure el contexto de su política para las cargas de trabajo donde se aplican las detecciones:

1. Vaya a [Policies][6].
2. Abra la política asociada con el paquete de contenido que habilitó.
3. Haga clic en {{< ui >}}Edit{{< /ui >}} junto al contexto de la implementación.
4. Agregue [tags][7] para dirigirse a hosts, clústeres o entornos específicos.
5. Cambie la política a habilitada y confirme la implementación.

Para obtener más información sobre la implementación de políticas, consulte [Policy management][4].

## Desactive un paquete de contenido {#deactivate-a-content-pack}

1. Vaya a [Content Packs][1].
2. Explore los paquetes de contenido disponibles y seleccione uno que esté activado.
3. Haga clic en {{< ui >}}Deactivate{{< /ui >}} para eliminar la política asociada de la página de políticas.

[1]: https://app.datadoghq.com/security/workload-protection/overview#content-packs
[2]: /es/security/workload_protection/detect_and_monitor/agent_rules
[3]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[5]: /es/security/workload_protection/investigate_and_triage/security_signals
[6]: https://app.datadoghq.com/security/workload-protection/policies
[7]: /es/getting_started/tagging/