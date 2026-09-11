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
title: Configurar App and API Protection para Python en Kubernetes
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_python_overview %}}

## Requisitos previos

- Clúster de Kubernetes
- Aplicación Python en contenedor con Docker
- kubectl configurado para acceder a tu clúster
- Helm (recomendado para la instalación del Agent)
- Tu clave de API Datadog 
- Biblioteca de rastreo Python Datadog (consulta los [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Kubernetes](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de App and API Protection

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de App and API Protection

Instala la biblioteca de rastreo Python Datadog utilizando un contenedor de inicialización o en el archivo Docker de tu aplicación:

```dockerfile
RUN pip install ddtrace
```

Configura y ejecuta tu servicio con Datadog:

{{% collapse-content title="Rastreo APM activado" level="h4" %}}

Inicia tu aplicación Python con App and API Protection activado mediante variables de entorno:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="Rastreo APM desactivado" level="h4" %}}
Para desactivar el rastreo APM mientras se mantiene App and API Protection activado, debes configurar la variable de rastreo APM como false.

Inicia tu aplicación Python con App and API Protection activado mediante variables de entorno:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. Ejecutar tu aplicación

Aplica tu despliegue actualizado:

```bash
kubectl apply -f your-deployment.yaml
```

{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Python, consulta la [guía de resolución de problemas de App and API Protection en Python][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/python/compatibility
[2]: /es/security/application_security/setup/python/troubleshooting