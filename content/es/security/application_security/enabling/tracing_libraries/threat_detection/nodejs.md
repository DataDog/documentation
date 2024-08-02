---
aliases:
- /security_platform/application_security/getting_started/nodejs
- /security/application_security/getting_started/nodejs
- /security/application_security/enabling/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Agregado de información de usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente de la biblioteca Node.js de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Habilitación de ASM para NodeJS
type: multi-code-lang
---

Puedes monitorizar la seguridad de las aplicaciones Node.js que se ejecutan en Docker, Kubernetes, Amazon ECS y AWS Fargate.

{{% appsec-getstarted %}}

## Habilitación de la detección de amenazas
### Para empezar

1. **Actualiza tu paquete de biblioteca Node.js de Datadog** al menos a la versión 5.0.0 (para Node 18+), 4.0.0 (para Node 16+) o 3.10.0 (para NodeJS 14+), ejecutando uno de estos comandos:
   ```shell
   npm install dd-trace@^5
   npm install dd-trace@^4
   npm install dd-trace@^3.10.0
   ```
   Utiliza esta [guía de migración][1] para evaluar cualquier cambio importante si has actualizado tu biblioteca.

   Application Security Management es compatible con Express v4+ y NodeJS v14+. Para obtener información adicional, consulta [Compatibilidad][2].

2. **Donde importes e inicialices la biblioteca Node.js para APM, habilita también ASM.** Esto puede ser en tu código o con variables de entorno. Si inicializaste APM en el código, añade `{appsec: true}` a tu declaración de inicialización:
      {{< tabs >}}
{{% tab "En código JavaScript" %}}

```js
// Esta línea debe venir antes de importar cualquier módulo instrumentado.
const tracer = require('dd-trace').init({
  appsec: true
})
```

{{% /tab %}}
{{% tab "En código TypeScript" %}}

Para TypeScript y los empaquetadores que admitan la sintaxis de EcmaScript Module, inicializa el rastreador en un archivo separado para mantener el orden de carga correcto.
```typescript
// server.ts
import './tracer'; // debe venir antes de importar cualquier módulo instrumentado.

// tracer.ts
import tracer from 'dd-trace';
tracer.init({
  appsec: true
}); // inicializado en un archivo diferente para evitar el hoisting;
```
Si la configuración por defecto es suficiente, o toda la configuración se hace a través de variables de entorno, también puedes utilizar `dd-trace/init`, que carga e inicializa en un solo paso.
```typescript
import `dd-trace/init`;
```
{{% /tab %}}

{{< /tabs >}}

   **O** si inicializas la biblioteca de APM en la línea de comandos usando la opción `--require` para Node.js:
   ```shell
   node --require dd-trace/init app.js
   ```
   A continuación, utiliza las variables de entorno para habilitar ASM:
   ```shell
   DD_APPSEC_ENABLED=true node app.js
   ```
   La forma de hacerlo varía en función de dónde se ejecuta el servicio:
   {{< tabs >}}
{{% tab "CLI Docker" %}}

Actualiza tu contenedor de configuración para APM añadiendo el siguiente argumento en tu comando `docker run`:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Añade el siguiente valor de variable de entorno a tu contenedor Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Actualiza el contenedor del archivo yaml de configuración para APM y añade la variable de entorno AppSec:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Actualiza tu archivo JSON de definición de tarea de ECS añadiendo esto en la sección de entorno:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Inicializa ASM en tu código o establece la variable de entorno `DD_APPSEC_ENABLED` en `true` en tu invocación de servicio:
```shell
DD_APPSEC_ENABLED=true node app.js
```

{{% /tab %}}
{{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}


Si necesitas ayuda adicional, ponte en contacto con el [equipo de asistencia de Datadog][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /es/security/application_security/enabling/compatibility/nodejs
[3]: /es/security/application_security/enabling/compatibility/nodejs#asm-capabilities-support
[4]: /es/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: /es/help