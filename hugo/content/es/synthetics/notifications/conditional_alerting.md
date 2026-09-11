---
aliases:
- /es/synthetics/guide/synthetic-test-monitors/
further_reading:
- link: synthetics/notifications/advanced_notifications
  tag: Documentación
  text: Uso de notificaciones avanzadas en Synthetic Monitoring
- link: monitors/notify/variables
  tag: Documentación
  text: Más información sobre variables de monitor
title: Alertas condicionales de Synthetic Monitoring
---

## Información general

Utiliza plantillas condicionales para cambiar los mensajes, configurar los gestores de notificación o anular la prioridad de las alertas en función de los resultados de los tests. Esto es especialmente útil cuando se enrutan alertas a equipos.

<div class="alert alert-danger">

Para asegurarte de que las notificaciones se entregan correctamente, incluye siempre un gestor de notificaciones en tu lógica condicional. Las notificaciones se eliminan si no se proporciona un gestor. Asegúrate de:

- Incluir una condición "para todos" utilizando `{{else}}` para gestionar cualquier escenario que no coincida.
- Proporcionar gestores de notificaciones tanto para las notificaciones de alerta como para las de recuperación.

Para obtener información más detallada, consulta la <a href="https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#examples">documentación del monitor</a>.</div>

## Ejemplos

### Enviar alertas basadas en un código de estado

```shell
{{!
If a test triggers an alert for an API test and returns a 500 statuscode, notify the backend team.
}}
{{#is_alert}}
  {{#is_exact_match "synthetics.attributes.result.response.statusCode" "500"}}@notify-slack-backend{{/is_exact_match}}
{{/is_alert}}
```

### Enviar alertas basadas en un código de error

```shell
{{!
Use multiple is_exact_match conditions to display specific failure codes in your notification. 
This example checks for DNS and INCORRECT_ASSERTION failure codes
}}

{{#if synthetics.attributes.result.failure}}

{{#is_exact_match "synthetics.attributes.result.failure.code" "DNS"}}
print out failure code: The failure code is DNS
{{/is_exact_match}}

{{#is_exact_match "synthetics.attributes.result.failure.code" "INCORRECT_ASSERTION"}}
print out failure code: The failure code is an INCORRECT ASSERTION
{{/is_exact_match}}

{{/if}}
```

  <div class="alert alert-info">Para obtener una lista completa de los códigos de error de tests de API, consulta <a href="/synthetics/api_tests/errors/">Errores de tests de API</a>.</div>

### Enviar alertas a un canal específico de Slack basadas en un paso fallido

```shell
{{!
If a test triggers an alert for browser or mobile tests, loop through each step and find the failed step.
If the failed step's description field matches Checkout, notify the recipient
}}

{{#is_alert}}
  {{#each synthetics.attributes.result.steps}}
    {{#is_match "status" "failed"}}
      {{#is_match "description" "Checkout"}}@notify-slack-payments{{/is_match}}
    {{/is_match}}
  {{/each}}
{{/is_alert}}
```

### Enviar alertas a un canal específico de Slack basadas en un paso fallido utilizando un atajo de variable

```shell
{{!
This alert uses the {{synthetics.failed_step}} object which is a variable shortcut that points to the relevant step data contained in {{synthetics.attributes.result.steps}}.
If the test triggers an alert for browser or mobile tests, and if the failed step's description field matches Checkout, notify the recipient.
}}

{{#is_alert}}
  {{#is_match "synthetics.failed_step.description" "Checkout"}}@notify-slack-payments{{/is_match}}
{{/is_alert}}
```

### Definir diferentes prioridades de alerta

```shell
{{!
If a test triggers an alert for a multistep API test, loop through each step and find the failed step.
If the step's name matches the staging domain, set the priority to P2. Otherwise, set it to P4.
}}

{{#is_alert}}send a message to <name> @example@email.com 
  {{#each synthetics.attributes.result.steps}}
    {{#is_match "status" "failed"}}
      {{#is_match "name" "stagedomain"}}Stage domain failed. Overriding priority to P2.
        {{override_priority 'P2'}}
        {{else}}Dev domain failed. Overriding priority to P4{{override_priority 'P4'}}
      {{/is_match}}
    {{/is_match}}
  {{/each}}
{{/is_alert}}
```

### Definir diferentes prioridades de alerta utilizando un atajo de variable

```shell
{{!
This alert uses the {{synthetics.failed_step}} object which is a variable shortcut that points to the relevant step data contained in `{{synthetics.attributes.result.steps}}`.
If the test triggers an alert for multistep API test and if the failed step's name field matches the domain, override the priority.
}}
{{#is_alert}}
  {{#is_match "synthetics.failed_step.name" "stagedomain"}}Stage domain failed. Overriding priority to P2{{override_priority 'P2'}}
  {{else}}Dev domain failed. Overriding priority to P4{{override_priority 'P4'}}
  {{/is_match}}
{{/is_alert}}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}