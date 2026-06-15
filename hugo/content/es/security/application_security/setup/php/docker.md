---
code_lang: Docker
code_lang_weight: 10
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
title: Configurar App and API Protection para PHP en Docker
type: multi-code-lang
---
{{% app_and_api_protection_php_setup_options platform="docker" %}}

{{% app_and_api_protection_php_overview %}}

## Requisitos previos

- Docker instalado en tu host
- Aplicación PHP en contenedor con Docker
- Tu clave de API Datadog 
- Biblioteca de rastreo PHP de Datadog (consulta [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Docker](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de App and API Protection

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de App and API Protection

{{% collapse-content title="Rastreo APM activado" level="h4" %}}

Añade lo siguiente a su archivo Docker:

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /collapse-content %}}

{{% collapse-content title="Rastreo APM desactivado" level="h4" %}}
Para deshabilitar el rastreo APM mientras se mantiene App and API Protection activado, debes configurar la variable de rastreo de APM como false.

Añade lo siguiente a tu archivo Docker:

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Disable apm
ENV DD_APM_TRACING_ENABLED=false
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /collapse-content %}}

## 3. Ejecutar tu aplicación
Crea tu imagen y luego ejecuta tu contenedor.

Cuando ejecutes tu contenedor, asegúrate de hacer lo siguiente:
1. Conecta el contenedor a la misma red Docker que el Datadog Agent.
2. Configura las variables de entorno necesarias.

```bash
docker run -d \
  --name your-php-app \
  your-php-app-image
```

{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación PHP, consulta la [Guía de solución de problemas de App and API Protection en PHP][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/php/compatibility
[2]: /es/security/application_security/setup/php/troubleshooting