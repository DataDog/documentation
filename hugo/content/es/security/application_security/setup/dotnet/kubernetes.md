---
code_lang: kubernetes
code_lang_weight: 20
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
title: Configuración de la protección de aplicaciones y de API para .NET en Kubernetes
type: multi-code-lang
---
{{% aap/aap_and_api_protection_dotnet_setup_options platform="kubernetes" %}}
{{% aap/aap_and_api_protection_dotnet_overview %}}

## Requisitos previos

- Clúster de Kubernetes
- Aplicación de .NET en contenedores con Docker
- kubectl configurado para acceder a tu clúster
- Helm (recomendado para la instalación del Agent )
- Tu clave de API Datadog 
- Biblioteca de rastreo de .NET de Datadog (consulta los [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Kubernetes](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de la protección de aplicaciones y de API

{{% aap/aap_and_api_protection_dotnet_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de la protección de aplicaciones y de API

Asegúrate de que tu archivo de Docker incluya la biblioteca de .NET de Datadog:

```dockerfile
# Download and install Datadog .NET Tracer
ENV DD_TRACE_VERSION=3.20.0
RUN curl -sSL https://github.com/DataDog/dd-trace-dotnet/releases/download/v${DD_TRACE_VERSION}/datadog-dotnet-apm-${DD_TRACE_VERSION}.linux-x64.tar.gz \
    | tar -xz -C /opt/datadog

# Set environment variables for Datadog automatic instrumentation
ENV CORECLR_ENABLE_PROFILING=1 \
    CORECLR_PROFILER="{846F5F1C-F9AE-4B07-969E-05C26BC060D8}" \
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so \
    DD_DOTNET_TRACER_HOME=/opt/datadog \
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Actualiza tu despliegue de Kubernetes para incluir las variables de entorno necesarias:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-dotnet-app
spec:
  template:
    spec:
      containers:
      - name: your-dotnet-app
        image: your-dotnet-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
Para desactivar el rastreo de APM mientras se mantienes activada la protección de aplicaciones y de API, debes configurar la variable de rastreo de APM en false.

Actualiza tu despliegue de Kubernetes para incluir las variables de entorno necesarias:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-dotnet-app
spec:
  template:
    spec:
      containers:
      - name: your-dotnet-app
        image: your-dotnet-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

## 3. Ejecuta tu aplicación

Aplica tu despliegue actualizado:

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar la protección de aplicaciones y de API para tu aplicación de .NET, consulta la [Guía de solución de problemas de la protección de aplicaciones y de API de .NET][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/dotnet/compatibility
[2]: /es/security/application_security/setup/dotnet/troubleshooting