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
title: Configurar App and API Protection para Java en Kubernetes
type: multi-code-lang
---
{{% app_and_api_protection_java_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_java_overview %}}

## Requisitos previos

- Clúster de Kubernetes
- Aplicación Java en contenedor con Docker
- kubectl configurado para acceder a tu clúster
- Helm (recomendado para la instalación del Agent)
- Tu clave de API Datadog 
- Biblioteca de rastreo Java Datadog (consulta los requisitos de la versión [aquí][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Kubernetes][3].

## 2. Activación de la monitorización de App and API Protection

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de App and API Protection

Descarga la última versión de la biblioteca Java Datadog utilizando un contenedor de inicialización:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      initContainers:
      - name: download-agent
        image: busybox
        command: ['sh', '-c', 'wget -O /shared/dd-java-agent.jar https://dtdg.co/latest-java-tracer']
        volumeMounts:
        - name: agent-volume
          mountPath: /shared
      volumes:
      - name: agent-volume
        emptyDir: {}
```

{{% collapse-content title="Rastreo APM activado" level="h4" %}}
{{< tabs >}}
{{% tab "Uso de argumentos de línea de comando" %}}

Inicia tu aplicación Java con el Datadog Agent y App and API Protection activado mediante argumentos de línea de comando:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Uso de variables de entorno" %}}

Inicia tu aplicación Java con App and API Protection activado mediante variables de entorno:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Rastreo APM desactivado" level="h4" %}}
Para desactivar el rastreo APM mientras se mantiene activado App and API Protection, debes configurar la variable de rastreo APM como false.
{{< tabs >}}
{{% tab "Uso de argumentos de línea de comando" %}}

Inicia tu aplicación Java con el Datadog Agent y App and API Protection activado mediante argumentos de línea de comando:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.apm.tracing.enabled=false", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Uso de variables de entorno" %}}

Inicia tu aplicación Java con App and API Protection activado mediante variables de entorno:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Ejecutar tu aplicación

Aplica tu despliegue actualizado:

```bash
kubectl apply -f your-deployment.yaml
```


{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Java, consulta la [guía de resolución de problemas de App and API Protection en Java][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/java/compatibility
[2]: /es/security/application_security/setup/java/troubleshooting
[3]: /es/agent/?tab=cloud_and_container