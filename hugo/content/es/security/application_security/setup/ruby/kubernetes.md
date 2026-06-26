---
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de App and API Protection predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App and API Protection
title: Configurar App and API Protection para Ruby en Kubernetes
type: multi-code-lang
---

{{% app-and-api-protection-ruby-setup-options platform="kubernetes" %}}

{{% app-and-api-protection-ruby-overview %}}

## Requisitos previos

- Clúster de Kubernetes
- Aplicación Ruby en contenedor con Docker
- kubectl configurado para acceder a tu clúster
- Helm (recomendado para la instalación del Agent)
- Tu clave de API Datadog 
- Bbiblioteca de rastreo Ruby Datadog (consulta los [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Kubernetes](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de App and API Protection

Instala y configura el gem `datadog` en tu aplicación Ruby.

{{% collapse-content title="Rastreo APM activado" level="h4" %}}
{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Añade el gem `datadog` a tu Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Configura la biblioteca Datadog añadiendo un inicializador:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.agent.host = 'your_agent_host'

  c.tracing.enabled = true

  # La instrumentación del rastreo para Rails tiene que estar explícitamente activada
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # La instrumentación de Rails es necesaria para App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Instrumentación automática y variables de entorno" %}}

Añade el gem `datadog` a tu Gemfile y solicita la instrumentación automática:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

Configura variables de entorno para tu aplicación. Añádelas a tu archivo de configuración de despliegue:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app
spec:
  template:
    spec:
      containers:
      - name: your-app
        image: your-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_API_SECURITY_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["bin/rails"]
        args: ["server"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Rastreo APM desactivado" level="h4" %}}

Para desactivar el rastreo APM mientras se mantiene activado App and API Protection, debes definir la configuración del rastreo APM como false.

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Añade el gem `datadog` a tu Gemfile:

```ruby
gem 'datadog', '~> 2.0'
```

Configura la biblioteca Datadog añadiendo un inicializador:

```ruby
Datadog.configure do |c|
  c.service = 'your_service_name'
  c.env = Rails.env

  c.agent.host = 'your_agent_host'

  # Desactivar el rastreo APM
  c.tracing.enabled = false

  # La instrumentación del rastreo para Rails tiene que estar explícitamente activada
  c.tracing.instrument :rails

  c.appsec.enabled = true
  c.appsec.api_security.enabled = true

  # La instrumentación para Rails es necesaria para App and API Protection
  c.appsec.instrument :rails
end
```

{{% /tab %}}
{{% tab "Instrumentación automática y variables de entorno" %}}

Añade el gem `datadog` a tu Gemfile y solicita la instrumentación automática:

```ruby
gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
```

Configura variables de entorno para tu aplicación. Añádelas a tu archivo de configuración de despliegue:

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app
spec:
  template:
    spec:
      containers:
      - name: your-app
        image: your-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_API_SECURITY_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["bin/rails"]
        args: ["server"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Ejecutar tu aplicación

Aplica tu despliegue actualizado:

```bash
kubectl apply -f your-deployment.yaml
```

## 4. Verificar la configuración

Para comprobar que App and API Protection funciona correctamente:

1. Envía tráfico a tu aplicación.
2. Comprueba el [inventario de servicio de App and API Protection](https://app.datadoghq.com/security/appsec/inventory/services) en Datadog.
3. Busca tu servicio y comprueba que App and API Protection está activado en la columna **Coverage** (Cobertura).

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Ruby, consulta la [guía de resolución de problemas de App and API Protection en Ruby][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/ruby/compatibility
[2]: /es/security/application_security/setup/ruby/troubleshooting