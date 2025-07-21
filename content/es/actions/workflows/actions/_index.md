---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización del flujo de trabajo
aliases:
- /es/workflows/generic_actions
- /es/service_management/workflows/actions_catalog/generic_actions/
- /es/service_management/workflows/actions
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentación
  text: Más información sobre integraciones
title: Acciones
type: documentación
---

Datadog proporciona un conjunto de acciones de flujos de trabajo que no están asociadas a una herramienta o una integración específicas. Estas acciones te brindan más control sobre tus flujos de trabajo, ya que te permiten hacer cosas como:
- Añadir una lógica para controlar la ruta de ejecución de tu flujo de trabajo.
- Transformar los datos recopilados por una acción.
- Realizar solicitudes HTTP personalizadas.

{{< whatsnext desc="Más información sobre acciones genéricas:" >}}
    {{< nextlink href="/service_management/workflows/actions/flow_control" >}}Utiliza acciones lógicas para añadir un intervalo de suspensión, una rama o una condición, también utiliza la interacción, etc..{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/expressions" >}}Realiza transformaciones de datos personalizados en tus flujos de trabajo utilizando JavaScript.{{< /nextlink >}}
    {{< nextlink href="/actions/connections/http" >}}Utiliza la acción HTTP para realizar una solicitud a un endpoint personalizado.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/saved_actions" >}}Utiliza la función <i>Acciones guardadas</i> para almacenar y reutilizar una acción y sus parámetros.{{< /nextlink >}}
{{< /whatsnext >}}

Si tu caso de uso no está cubierto por una integración o acción genérica de Datadog, puedes [solicitar una nueva acción o una integración completa][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][2].

[1]: https://forms.gle/JzPazvxXox7fvA2R8
[2]: https://datadoghq.slack.com/