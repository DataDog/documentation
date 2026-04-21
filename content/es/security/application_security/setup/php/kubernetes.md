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
title: Configuración de la protección de aplicaciones y API para PHP en Kubernetes
type: multi-code-lang
---
{{% app_and_api_protection_php_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_php_overview %}}

## Requisitos previos

- Clúster de Kubernetes
- Aplicación de PHP en contenedor con Docker
- kubectl configurado para acceder a su clúster
- Helm (recomendado para la instalación del Agent)
- Tu clave de API Datadog 
- Biblioteca de rastreo de PHP de Datadog (consulta los [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Kubernetes](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de la protección de aplicaciones y de API

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de la protección de aplicaciones y de API

Instala la biblioteca de rastreo de PHP de Datadog utilizando un contenedor de inicialización o en el archivo de Docker de tu aplicación:

```dockerfile
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
```

Configura y ejecuta tu servicio con Datadog:

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Inicia tu aplicación de PHP con la protección de aplicaciones y de API activada mediante variables de entorno:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-php-app
spec:
  template:
    spec:
      containers:
      - name: your-php-app
        image: <CONTAINER_IMAGE>/<TAG>
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
Para desactivar el rastreo de APM mientras se mantiene activada la protección de aplicaciones y de API, debes configurar la variable de rastreo de APM en false.

Inicia tu aplicación de PHP con la protección de aplicaciones y de API activada mediante variables de entorno:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-php-app
spec:
  template:
    spec:
      containers:
      - name: your-php-app
        image: <CONTAINER_IMAGE>/<TAG>
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

{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar la protección de aplicaciones y de API para Tu aplicación DE PHP, consulta la [Guía de solución de problemas de la protección de aplicaciones y de API de PHP][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/php/compatibility
[2]: /es/security/application_security/setup/php/troubleshooting