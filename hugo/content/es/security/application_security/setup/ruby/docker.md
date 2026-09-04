---
code_lang: Docker
code_lang_weight: 30
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas con la protección de aplicaciones y API
title: Configurar App and API Protection para Ruby en Docker
type: multi-code-lang
---

{{% app-and-api-protection-ruby-setup-options platform="linux" %}}

{{% app-and-api-protection-ruby-overview %}}

## Requisitos previos

- Docker instalado en tu host
- Aplicación Ruby en contenedores con Docker
- Tu clave de API Datadog 
- Biblioteca de rastreo de Datadog Ruby (consulta [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Docker](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de App and API Protection

Instala y configura el gem `datadog` en tu aplicación Ruby.

{{% collapse-content title="Rastreo de APM activado" level="h4" %}}
{{< tabs >}}
{{% tab "Configuration file" %}}

Añade el gem `datadog` a tu Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Configura la biblioteca de Datadog añadiendo un inicializador:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.tracing.enabled = true

  # Tracing instrumentation for Rails has to be explicitly enabled
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # Rails instrumentation is required for App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment variables" %}}

Añade el gem `datadog` a tu Gemfile y requiere la instrumentación automática:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

Establece variables de entorno para tu aplicación. Añádelas a tu archivo de Docker:

```dockerfile
# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_API_SECURITY_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_AGENT_HOST=<YOUR_AGENT_HOST>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Rastreo de APM desactivado" level="h4" %}}

Para desactivar el rastreo de APM mientras se mantiene activada App and API Protection, debes establecer la configuración de rastreo de APM en false (falso).

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade el gem `datadog` a tu Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Configura la biblioteca de Datadog añadiendo un inicializador:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.agent.host = 'your_agent_host'

  # Disable APM Tracing
  c.tracing.enabled = false

  # Tracing instrumentation for Rails has to be explicitly enabled
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # Rails instrumentation is required for App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Auto-instrumentation and environment variables" %}}

Añade el gem `datadog` a tu Gemfile y requiere la instrumentación automática:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

Establece variables de entorno para tu aplicación. Añádelas a tu archivo de Docker:

```dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_API_SECURITY_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_AGENT_HOST=<YOUR_AGENT_HOST>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Ejecutar tu aplicación

Crea tu imagen y luego ejecuta tu contenedor.

Cuando ejecutes tu contenedor, asegúrate de conectarlo a la misma red de Docker que el Datadog Agent y configura el host del agent correcto en tu aplicación.

## 4. Verificar la configuración

Para comprobar que App and API Protection funciona correctamente:

1. Envía tráfico a tu aplicación.
2. Comprueba el [Inventario de servicio de App and API Protection](https://app.datadoghq.com/security/appsec/inventory/services) en Datadog.
3. Busca tu servicio y comprueba que App and API Protection está activada en la columna **Coverage** (Cobertura).

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Ruby, consulta la [Guía de solución de problemas de App and API Protection en Ruby][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/ruby/compatibility
[2]: /es/security/application_security/setup/ruby/troubleshooting