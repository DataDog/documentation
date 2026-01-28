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
title: Configurar App and API Protection para Node.js en Docker
type: multi-code-lang
---
{{% aap/aap_and_api_protection_nodejs_setup_options platform="docker" %}}

{{% aap/aap_and_api_protection_nodejs_overview %}}

## Requisitos previos

- Docker instalado en tu host
- Aplicación Node.js en contenedor con Docker
- Tu clave de API Datadog 
- Biblioteca de rastreo Node.js de Datadog (consulta [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Docker](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de App and API Protection

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}
{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### Activación manual de la monitorización de App and API Protection

{{% collapse-content title="Rastreo APM activado" level="h4" %}}

Añade la biblioteca Node.js Datadog a tu archivo Docker y configura las variables de entorno:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Start the application with the Datadog tracer
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% /collapse-content %}}

{{% collapse-content title="Rastreo APM desactivado" level="h4" %}}
Para deshabilitar el rastreo APM mientras se mantiene App and API Protection activado, debes configurar la variable de rastreo de APM como false.

Añade la biblioteca Node.js Datadog a tu archivo Docker y configura las variables de entorno:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Start the application with the Datadog tracer
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% /collapse-content %}}

## 3. Ejecutar tu aplicación

Crea tu imagen y luego ejecuta tu contenedor.

Cuando ejecutes tu contenedor, asegúrate de:
1. Conéctalo a la misma red Docker que el Datadog Agent.
2. Configura las variables de entorno necesarias.

```bash
docker run -d \
  --name your-nodejs-app \
  your-nodejs-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Node.js, consulta la [guía de resolución de problemas de App and API Protection en Node.js][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/nodejs/compatibility
[2]: /es/security/application_security/setup/nodejs/troubleshooting