---
code_lang: kubernetes
code_lang_weight: 20
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
title: Configure App and API Protection para Python en Kubernetes
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_python_overview %}}

## Requisitos previos {#prerequisites}

- Clúster de Kubernetes
- Aplicación de Python en un contenedor de Docker
- kubectl configurado para acceder a su clúster
- Helm (recomendado para la instalación del Agent)
- Su clave de API de Datadog
- SDK de Python de Datadog (consulte los [requisitos de versión][1])

## 1. Instale el Datadog Agent {#1-installing-the-datadog-agent}

Instale el Datadog Agent siguiendo las [instrucciones de configuración para Kubernetes](/agent/?tab=cloud_and_container).

## 2. Habilite la supervisión de App and API Protection {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Habilite manualmente la supervisión de App and API Protection {#manually-enabling-app-and-api-protection-monitoring}

Instale el SDK de Python de Datadog usando un init container o en el Dockerfile de su aplicación:

```dockerfile
RUN pip install ddtrace
```

Configure y ejecute su servicio con Datadog:

{{% collapse-content title="APM Tracing habilitado" level="h4" %}}

Inicie su aplicación de Python con App and API Protection habilitado mediante variables de entorno:

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

{{% collapse-content title="APM Tracing deshabilitado" level="h4" %}}
Para deshabilitar APM Tracing mientras mantiene habilitada App and API Protection, debe establecer la variable de APM Tracing en false.

Inicie su aplicación de Python con App and API Protection habilitado mediante variables de entorno:

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

## 3. Ejecute su aplicación {#3-run-your-application}

Aplique su despliegue actualizado:

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al configurar App and API Protection para su aplicación de Python, consulte la [guía de solución de problemas de App and API Protection para Python][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/python
[2]: /es/security/application_security/setup/python/troubleshooting