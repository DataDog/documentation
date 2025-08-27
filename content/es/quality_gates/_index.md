---
description: Aprende a utilizar Puertas de Calidad para permitir a tu equipo controlar
  qué código llega a producción.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Echa un vistazo a las últimas versiones de entrega de software. (Es necesario
    iniciar sesión en la aplicación)
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: Blog
  text: Mejorar la fiabilidad del código con las Puertas de calidad de Datadog
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Uso de monitores de Datadog como puertas de calidad para despliegues de GitHub
    Actions
- link: /quality_gates/explorer
  tag: Documentación
  text: Más información sobre el Explorador de puertas de calidad
- link: /account_management/audit_trail/
  tag: Documentación
  text: Más información sobre Audit Trail
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: Blog
  text: 'Pruebas defectuosas: sus costes ocultos y cómo tratar comportamientos defectuosos'
is_beta: false
title: Puertas de calidad
---

{{< callout url="#" btn_hidden="true" header="Únete a la Vista previa" >}}
Las Puertas de calidad están en vista previa.
{{< /callout >}}

## Información general

Las Puertas de calidad te permiten controlar la calidad del software configurando reglas para bloquear despliegues de código de calidad inferior. Tú tienes el control de lo que se fusiona en la rama por defecto y se despliega en producción. También pueden asegurar que el código que se ejecuta en producción respete las normas de calidad más elevadas, reduciendo los incidentes y minimizando los comportamientos no deseados.

{{< img src="quality_gates/setup/sca_2.png" alt="Regla SCA que activa un fallo si en el repositorio se detecta cualquier vulnerabilidad de biblioteca con una gravedad alta o crítica." style="width:100%" >}}

Utiliza las Puertas de calidad para:

* Crear reglas para bloquear los flujos de trabajo que utilizan datos en Datadog, para garantizar que sólo el código que cumple tus normas llegue a producción.
* Otorgar a tu organización la capacidad de decidir qué código llega a producción, para mejorar tu disciplina de despliegue y mitigar posibles problemas en entornos en directo.
* Mejorar continuamente la calidad del código y el rendimiento del sistema con una ejecución precisa y reglas personalizables.

Puedes configurar reglas de Puertas de calidad para las siguientes categorías: 

[Optimización de tests][9]

: <br> - Nuevos tests defectuosos <br> - Cobertura del código

[Static Analysis][11]

: <br> - Violaciones de la vulnerabilidad del código <br> - Violaciones de la calidad del código

[Software Composition Analysis][12]

: <br> - Vulnerabilidades <br> - Licencias detectadas

Al integrar las Puertas de calidad [en tus pipelines CI/CD][7] o permitir que la [integración GitHub Datadog][13] cree automáticamente checks de estado en tus solicitudes de extracción (actualmente disponible sólo para reglas SCA), puedes crear un marco sólido para mantener y mejorar la calidad del software que se alinea con las metas operativas y los objetivos empresariales de tu organización. 

## Configurar

Las Puertas de calidad ofrecen los siguientes tipos de reglas:

{{< tabs >}}
{{% tab "Pruebas" %}}

Puedes crear reglas para bloquear la fusión de código y que introduzca nuevos [tests defectuosos][101] o que disminuya la [cobertura del código][102].

{{< img src="quality_gates/setup/flaky_test_2.png" alt="Regla de una puerta de calidad que bloquea cuando se producen uno o más tests defectuosos" style="width:80%" >}}

[101]: /es/tests/flaky_test_management/
[102]: /es/tests/code_coverage/

{{% /tab %}}
{{% tab "Análisis estático" %}}

Puedes crear reglas para bloquear la fusión de código cuando tu repositorio tiene un determinado número de violaciones de la calidad del código o de la vulnerabilidad del código.

{{< img src="quality_gates/setup/static_analysis_2.png" alt="Regla de una puerta de calidad que falla cuando el repositorio contiene una o más nuevas violaciones de la calidad del código con una gravedad de nivel de error" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

Puede crear reglas para bloquear la fusión de código cuando su repositorio tiene un determinado número de vulnerabilidades de biblioteca o licencias prohibidas.

{{< img src="quality_gates/setup/sca_2.png" alt="Regla de una puerta de calidad que falla cuando el repositorio contiene una o más vulnerabilidades de biblioteca de gravedad alta o crítica" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

Para crear una regla de puerta de calidad, consulta la [documentación de configuración][2]. 

## Buscar normas

Puedes evaluar y actualizar los procesos de control de calidad consultando las reglas de las puertas de calidad en la página [**Reglas de las Puertas de calidad**][6]. Mejora tus prácticas de despliegue en función de los requisitos de su proyecto y los resultados de rendimiento deseados. 

{{< img src="quality_gates/rules_list_2.png" alt="Lista de puertas de calidad en Datadog" style="width:100%" >}}

Para buscar reglas de puertas de calidad, consulta la [documentación Buscar y gestionar][5].

## Analizar ejecuciones en el Explorador de puertas de calidad

Puedes buscar y filtrar por puertas de calidad o ejecuciones de reglas, crear visualizaciones y exportar vistas guardadas de tu consulta de búsqueda en la página [**Ejecuciones de puertas de calidad**][14].

{{< tabs >}}
{{% tab "Puertas" %}}

{{< img src="quality_gates/explorer/gates_3.png" alt="Resultados de puertas de calidad en el Explorador de puertas de calidad" style="width:100%" >}}

{{% /tab %}}
{{% tab "Ejecuciones de reglas" %}}

{{< img src="quality_gates/explorer/executions_1.png" alt="Resultados de la ejecución de reglas de puertas de calidad en el Explorador de puertas de calidad" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulta la [documentación del Explorador de puertas de calidad][8].

## Seguimiento de cambios en las reglas

Puedes ver información sobre quién creó, modificó y eliminó reglas de puertas de calidad en [Audit Trail][3].

{{< img src="/quality_gates/audit_event.png" alt="Evento de puertas de calidad en Datadog Audit Trail" style="width:100%" >}}

Para obtener más información, consulta la [documentación de Audit Trail][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/flaky_test_management/
[2]: /es/quality_gates/setup/
[3]: /es/account_management/audit_trail/
[4]: /es/account_management/audit_trail/events/#ci-visibility-events
[5]: /es/quality_gates/search/
[6]: https://app.datadoghq.com/ci/quality-gates
[7]: https://github.com/DataDog/datadog-ci
[8]: /es/quality_gates/explorer/
[9]: /es/tests/
[10]: /es/continuous_integration/
[11]: /es/security/code_security/static_analysis
[12]: /es/security/code_security/software_composition_analysis
[13]: /es/integrations/github/
[14]: https://app.datadoghq.com/ci/quality-gates/executions