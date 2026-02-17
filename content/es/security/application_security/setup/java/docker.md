---
code_lang: Docker
code_lang_weight: 10
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predeterminadas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App and API Protection
title: Configurar App and API Protection para Java en Docker
type: multi-code-lang
---
{{% app_and_api_protection_java_setup_options platform="docker" %}}

{{% app_and_api_protection_java_overview %}}

## Requisitos previos

- Docker instalado en tu host
- Aplicación Java en contenedores con Docker
- Tu clave de API Datadog 
- Biblioteca de rastreo Java de Datadog (consulta los requisitos de la versión [aquí][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Docker][3].

## 2. Activación de la monitorización de App and API Protection

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de App and API Protection

{{% collapse-content title="Rastreo de APM activado" level="h4" %}}
{{< tabs >}}
{{% tab "Using system properties" %}}

Inicia tu aplicación Java con el Datadog Agent y App and API Protection activado mediante la instrucción ENTRYPOINT:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Añade las siguientes variables de entorno a tu archivo Docker:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Add the Java agent to your application's startup command
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Rastreo de APM desactivado" level="h4" %}}
Para desactivar el rastreo de APM, pero mantener activo App and API Protection, debes configurar la variable de rastreo de APM en false (falso).
{{< tabs >}}
{{% tab "Using system properties" %}}

Inicia tu aplicación Java con el Datadog Agent y App and API Protection activado mediante la instrucción ENTRYPOINT:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.apm.tracing.enabled=false", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Añade las siguientes variables de entorno a tu archivo Docker:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Add the Java agent to your application's startup command
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Ejecutar tu aplicación
Crea tu imagen y luego ejecuta tu contenedor.

Cuando ejecutes tu contenedor, asegúrate de hacer lo siguiente:
1. Conecta el contenedor a la misma red Docker que el Datadog Agent.
2. Configura las variables de entorno necesarias.

```bash
docker run -d \
  --name your-java-app \
  your-java-app-image
```

{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Java, consulta la [Guía de solución de problemas de App and API Protection en Java][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/java/compatibility
[2]: /es/security/application_security/setup/java/troubleshooting
[3]: /es/agent/?tab=cloud_and_container