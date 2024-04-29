---
kind: faq
title: ¿Están seguros mis datos y credenciales?
---

* El tráfico siempre se inicia desde el Agent hacia Datadog. Nunca se inician sesiones desde Datadog hacia el Agent.
* Todo el tráfico se envía mediante SSL.
* Todas las comunicaciones hacia Datadog se realizan mediante HTTPS.
* [El acuerdo de licencia completo][1].
* [El código fuente de Datadog Agent][2] bajo una licencia de software libre.
* El proceso de instalación para el Datadog Agent y otros componentes puede pedirte tus credenciales administrativas o de raíz. La contraseña solo se utiliza para completar el proceso de instalación; Datadog no conserva estas credenciales. Si prefieres ver el proceso de instalación, puedes encontrar instrucciones paso a paso en la [página de instalación del Agent][3].

[1]: https://github.com/DataDog/datadog-agent/blob/master/LICENSE
[2]: https://github.com/DataDog/datadog-agent
[3]: https://app.datadoghq.com/account/settings/agent/latest