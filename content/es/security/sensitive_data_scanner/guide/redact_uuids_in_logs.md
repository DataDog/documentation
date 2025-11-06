---
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentación
  text: Expresión regular para reglas de escaneo personalizadas
title: Redactar identificadores únicos universales (UUID) en logs
---

## Información general

Esta guía explica cómo crear una regla de escaneo personalizada utilizando un patrón de expresión regular (regex) para que coincida con un Identificador Único Universal (UUID) y lo redacte. Por ejemplo, tu organización puede tener un UUID para la identificación interna, con información adicional añadida, como la del usuario:
- ID del usuario
- Código del departamento
- Código de estado

Si deseas que los usuarios internos accedan a estos log sin exponer el UUID y el ID de usuario, puedes crear una regla de escaneo personalizada para redactar la información.

## Configurar una regla personalizada para que coincida con un UUID

Para esta guía, `01e2402104ca99-8641-43ba-b499-642610-0012` es el identificador interno de ejemplo que se utiliza, donde:
- `01e2402104ca99-8641-43ba-b499` es el UUID.
- `6462610` es un valor de 6 dígitos que representa el ID en formato byte.
- `0012` es un código de departamento de 2 dígitos y un código de estado de 2 dígitos de un usuario:
    - `00` se utiliza para un usuario activo.
    - `12` para el código del departamento.

En este ejemplo, deseas que coincida con el formato del identificador de ejemplo (`01e2402104ca99-8641-43ba-b499-642610-0012`) y:
- Redacta el UUID, el ID de usuario y el ID en formato byte.
- Pero no redactes el código de departamento y de estado del usuario.

Puedes utilizar la siguiente expresión regular básica para hacer coincidir el UUID y el ID de usuario que deseas redactar:

```
[a-z0-9]{14}-\d{4}-[a-z0-9]{4}-[a-z0-9]{4}-\d{6}
```

1. Ve a la página de [configuración de Sensitive Data Scanner][1].
1. Haz clic en **Add** (Añadir) y selecciona **Add Scanning Rule** (Añadir regla de escaneo).
1. Haz clic en **Custom Rule** (Regla personalizada).
1. Selecciona el grupo de escaneo al que deseas añadir esta regla.
1. Introduce un nombre para la regla.
1. Selecciona la prioridad que deseas para la regla.
1. Introduce una descripción para la regla.
1. En la sección **Match conditions** (Condiciones de coincidencia), introduce `[a-z0-9]{14}-\d{4}-[a-z0-9]{4}-[a-z0-9]{4}-\d{6}` en el campo de expresión regular.
    {{< img src="sensitive_data_scanner/guides/regex_text_matched.png" alt="La sección de test de expresión regular que el UUID y el ID de usuario coinciden" style="width:100%;" >}}
1. Utiliza un diccionario de palabras clave para refinar la precisión de la detección y evitar falsos positivos. En este ejemplo, deseas buscar coincidencias con un máximo de 10 caracteres de la palabra `user`:
    1. Introduce `user` como palabra clave.
    1. Introduce `10` para **Characters before match** (Caracteres antes de la coincidencia).
1. En la sección **Action on Match** (Acción sobre la coincidencia) y para este ejemplo:
1. Selecciona **Entire Event** (Evento completo) para saber qué parte del evento escanear. Si tienes el log analizado usando el Grok Parser, puedes escanear por atributos específicos.
    1. Selecciona **Redact** (Redactar) para la acción sobre la coincidencia.
    1. Introduce `[removed]` para el texto de sustitución.
    1. Introduce `matched_on:user_id` en el campo **Add tags** (Añadir etiquetas).
1. Haz clic en **Add rule** (Añadir regla).

Si este log de ejemplo, que contiene los distintos componentes del UUID, se envía a Datadog:

```
2024-11-14 14:20:22 INFO [transaction-logger] 200 OK shoe:200.000, pen:42.95. iron, 221.55, tasty-sandwich:10.95, big-coffee:11.95, user.name:fred91, user.id:01e2402104ca99-8641-43ba-b499-642610-0012, user.email:fred.jones@scooby.com function:transaction-complete.js, payment.ccn:1111-1111-1111-1111, payment.ccexp:10/30}
```

El resultado es que `user.id` se borra y se sustituye por `[removed]`:

{{< img src="sensitive_data_scanner/guides/redacted_log.png" alt="El evento de log con el UUID y el ID de usuario redactado y reemplazado con el eliminado" style="width:100%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration