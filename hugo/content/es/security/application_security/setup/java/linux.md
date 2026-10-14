---
code_lang: linux
code_lang_weight: 30
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
title: Configure la Protección de aplicaciones y API para Java en Linux
type: multi-code-lang
---
{{% app_and_api_protection_java_setup_options platform="linux" %}}

{{% app_and_api_protection_java_overview %}}

## Requisitos previos {#prerequisites}

- Sistema operativo Linux
- Aplicación Java
- Privilegios de root o sudo
- Systemd (para la gestión de servicios)
- Su clave de API de Datadog
- Datadog Java SDK (consulte los requisitos de versión [aquí][1])

## 1. Instale el Datadog Agent {#1-installing-the-datadog-agent}

Instale el Datadog Agent siguiendo las [instrucciones de configuración para hosts Linux][3].

## 2. Habilite la supervisión de App and API Protection {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Habilite manualmente la supervisión de App and API Protection {#manually-enabling-app-and-api-protection-monitoring}

Descargue la versión más reciente de la biblioteca de Java de Datadog:

```bash
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

{{% collapse-content title="APM Tracing habilitado" level="h4" %}}
{{< tabs >}}
{{% tab "Uso de propiedades del sistema" %}}

Inicie su aplicación Java con el Datadog Agent y Protección de aplicaciones y API habilitados mediante propiedades del sistema:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "Uso de variables de entorno" %}}

Establezca las variables de entorno requeridas e inicie su aplicación Java:

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing deshabilitado" level="h4" %}}
Para deshabilitar APM Tracing mientras mantiene habilitada App and API Protection, debe establecer la variable de APM Tracing en false.
{{< tabs >}}
{{% tab "Uso de propiedades del sistema" %}}

Inicie su aplicación Java con el Datadog Agent y Protección de aplicaciones y API habilitados mediante propiedades del sistema:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "Uso de variables de entorno" %}}

Establezca las variables de entorno requeridas e inicie su aplicación Java:

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Ejecute su aplicación {#3-run-your-application}

Inicie su aplicación Java con la configuración anterior.

{{% aap/aap_and_api_protection_verify_setup %}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al configurar la Protección de aplicaciones y API para su aplicación Java, consulte la [guía de solución de problemas de Protección de aplicaciones y API de Java][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/java
[2]: /es/security/application_security/setup/java/troubleshooting
[3]: /es/agent/?tab=Linux