---
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Configure App and API Protection para Python en Docker
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="docker" %}}

{{% app_and_api_protection_python_overview %}}

## Requisitos previos {#prerequisites}

- Docker instalado en su servidor
- Aplicación de Python en un contenedor de Docker
- Su clave de Datadog API
- SDK de Python de Datadog (consulte los [requisitos de versión][1])

## 1. Instale el Datadog Agent {#1-installing-the-datadog-agent}

Instale el Datadog Agent siguiendo las [instrucciones de configuración para Docker](/agent/?tab=cloud_and_container).

## 2. Habilite la supervisión de App and API Protection {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Habilite manualmente la supervisión de App and API Protection {#manually-enabling-app-and-api-protection-monitoring}

{{% collapse-content title="APM Tracing habilitado" level="h4" %}}

Agregue las siguientes variables de entorno a su Dockerfile:

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing deshabilitado" level="h4" %}}
Para deshabilitar el rastreo de APM mientras mantiene habilitada App and API Protection, debe establecer la variable de rastreo de APM en false.

Agregue las siguientes variables de entorno a su Dockerfile:

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. Ejecute su aplicación {#3-run-your-application}
Construya su imagen y luego ejecute su contenedor.

Al ejecutar su contenedor, asegúrese de hacer lo siguiente:
1. Conecte el contenedor a la misma red de Docker que el Datadog Agent.
2. Establezca las variables de entorno requeridas.

```bash
docker run -d \
  --name your-python-app \
  your-python-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al configurar App and API Protection para su aplicación de Python, consulte la [guía de solución de problemas de App and API Protection para Python][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/python
[2]: /es/security/application_security/setup/python/troubleshooting