---
further_reading:
- link: /monitors/manage/
  tag: Documentación
  text: Descubre cómo gestionar monitores
- link: /synthetics/notifications/statuspage/
  tag: Documentación
  text: Aprende a integrar los monitores de Synthetic Monitoring con Statuspage
title: Notificaciones avanzadas de Synthetic Monitoring
---

## Información general

Puedes personalizar los mensajes de monitor de Synthetic Monitoring utilizando plantillas de identificadores. Los siguientes ejemplos abordan técnicas avanzadas como comentarios, acceso a listas, condiciones e iteraciones.

**Nota:** Siempre comprueba tu sintaxis directamente en el editor de mensajes de monitor, ya que el comportamiento de la plantilla puede variar ligeramente entre versiones.

## Comentarios

Utiliza comentarios para explicar lo que hace la plantilla. Los comentarios se eliminan del mensaje final renderizado.

```handlebars
{{! This is a comment }}
{{!
This is a
multi-line comment
}}
```

## Cadenas sin formato

Para mostrar valores sin formato, sin escapes HTML (por ejemplo, URLs o respuestas HTTP en bloques de código), utiliza llaves triples:

```handlebars
{{{my_var}}}
```

<div class="alert alert-info">Algunas integraciones de mensaje (como Google) requieren llaves triples <code>&#123;&#123;&#123;</code> alrededor de las variables de plantilla para garantizar un formato adecuado cuando se muestra el mensaje. Por ejemplo, puedes utilizar <code>&#123;&#123;&#123;synthetics.attributes.result.failure.message&#125;&#125;&#125;</code>.</div>

Puedes realizar bucles sobre listas (como pasos o variables) o acceder directamente a los elementos:

```handlebars
{{list.2.name}}                {{! third item }}
{{list.-1.status}}            {{! last item }}
{{list[My Complex Name]url}}  {{! use bracket notation for complex keys }}
{{list[My Complex Name]failure.code}}
{{list.abc-def-ghi}}          {{! access via ID (case-insensitive) }}
```

### Formato legible

**Nota**: Todas las duraciones están en milisegundos.

- **Duraciones:**

  ```handlebars
  {{eval "synthetics.attributes.result.duration/1000"}}
  ```

- **Tamaños de los datos:**

  ```handlebars
  {{eval "humanize_bytes(bodySize)"}}
  ```

## Condiciones

<div class="alert alert-info">Utiliza <code>#if</code>, <code>#is_match</code> y <code>#is_exact_match</code> para una representación basada en la lógica.</div>

#### Check booleano:

```handlebars
{{#if synthetics.attributes.variable.config.CONFIG_VAR.secure}}
  The CONFIG_VAR variable is obfuscated
{{else}}
  The CONFIG_VAR variable isn't obfuscated
{{/if}}
```

### Alerta condicional basada en el ID de paso

```handlebars
{{#is_exact_match synthetics.failed_step.id "svn-yrx-3xg"}}
  A backend-related step failed!
  @slack-backend-team
{{else}}
  Another step failed, probably Frontend related
  @slack-frontend-team
{{/is_exact_match}}
```
   <div class="alert alert-info">Utiliza <code>#if</code> en lugar de <code>#is_exact_match</code> para comprobar si una variable está vacía o no está establecida.</div>

### Iteración

Utiliza `#each` para recorrer diccionarios o listas. Puedes acceder a ellos:

- `this` → el elemento actual
- `@key` → la clave actual (para diccionarios)
- `@index`, `@first`, `@last` → metadatos de bucle

#### Ejemplo de diccionario:

```handlebars
{{#each users}}
  # User `{{@key}}`
  Name: {{name}}
  Permissions: {{permissions}}
{{/each}}

Users: {{#each users}}`{{@key}}` ({{name}}){{#unless @last}}, {{/unless}}{{/each}}
```

### Utilizar variables locales (configuración) en una notificación

```handlebars
Synthetic Test Failed!

Application: {{ synthetics.attributes.result.variables.config[APP_NAME].value }}
URL Tested: {{ synthetics.attributes.result.variables.config[APP_URL].value }}
Random value: {{ synthetics.attributes.result.variables.config[NAME].value }}

Test: {{ synthetics.attributes.test.name }} ({{ synthetics.attributes.test.id }})
Failed step: {{ synthetics.failed_step.name }}
Location: {{ synthetics.attributes.location.id }}
Result: {{ synthetics.result_url }}

@your-email
```

<div class="alert alert-tip">Para recorrer todas las variables de configuración e imprimir sus valores de forma segura:

```handlebars
{{#each synthetics.attributes.result.variables.config}}
- {{@key}}: {{#if this.secure}}[secure]{{else}}{{this.value}}{{/if}}
{{/each}}
```

</div>

## Bucle de pasos

```handlebars
{{#each synthetics.attributes.result.steps}}
* Step name: {{description}}
* Step status: {{status}}
* Step type: {{type}}
{{/each}}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}