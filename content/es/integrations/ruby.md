---
categories:
- languages
- log collection
- tracing
custom_kind: integration
dependencies: []
description: Envía métricas personalizadas desde tus aplicaciones de Ruby con las bibliotecas de cliente de Datadog.
doc_link: https://docs.datadoghq.com/integrations/ruby/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rails-with-datadog/
  tag: Blog
  text: Monitorización de aplicaciones de Rails con Datadog
- link: https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/
  tag: Blog
  text: Recopilación y monitorización de logs de Rails con Datadog
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: Blog
  text: Cómo recopilar, personalizar y gestionar logs de aplicaciones de Rails
git_integration_title: ruby
has_logo: true
integration_id: ruby
integration_title: Ruby
integration_version: 
is_public: true
manifest_version: 1.0
name: ruby
public_title: Integración de Datadog y Ruby
short_description: Envía métricas personalizadas desde tus aplicaciones de Ruby con las bibliotecas de cliente de Datadog.
version: 1.0
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

La integración de Ruby te permite recopilar y monitorizar tus logs de aplicación, trazas (traces) y métricas personalizadas de Ruby.

## Configuración

### Recopilación de métricas

Consulta la documentación dedicada para [recopilar métricas personalizadas de Ruby con DogStatsD][1].

### Recopilación de trazas

Consulta la documentación dedicada a [instrumentar tu aplicación de Ruby][2] para enviar tus trazas (traces) a Datadog.

### APM

*Disponible para Agent v6.0+*

Consulta la documentación específica sobre cómo [configurar la recopilación de logs de Ruby][3] para reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación específica para [activar el perfilador de Ruby][4].

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/dogstatsd/?tab=ruby
[2]: https://docs.datadoghq.com/tracing/setup/ruby/
[3]: https://docs.datadoghq.com/logs/log_collection/ruby/
[4]: https://docs.datadoghq.com/profiler/enabling/ruby/
[5]: https://docs.datadoghq.com/help/

