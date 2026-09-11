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
title: Configurar App and API Protection para Node.js en Kubernetes
type: multi-code-lang
---
{{% aap/aap_and_api_protection_nodejs_setup_options platform="kubernetes" %}}

{{% aap/aap_and_api_protection_nodejs_overview %}}

## Requisitos previos

- Clúster de Kubernetes
- Aplicación Node.js en contenedor con Docker
- kubectl configurado para acceder a tu clúster
- Helm (recomendado para la instalación del Agent)
- Tu clave de API Datadog 
- Biblioteca de rastreo Node.js Datadog (consulta los [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent siguiendo las [instrucciones de instalación de Kubernetes](/agent/?tab=cloud_and_container).

## 2. Activación de la monitorización de App and API Protection

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}
{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### Activación manual de la monitorización de App and API Protection

Asegúrate de que tu archivo Docker incluye la biblioteca Node.js Datadog:

```dockerfile
FROM node:18-alpine

# Instalar la biblioteca Node.js de Datadog
RUN npm install dd-trace

# Copiar tus archivos de aplicación
COPY package*.json ./
COPY . .
RUN npm install

# Iniciar tu aplicación con el rastreador Datadog
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% collapse-content title="Rastreo APM activado" level="h4" %}}

Actualiza tu despliegue de Kubernetes para incluir las variables de entorno necesarias:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-nodejs-app
spec:
  template:
    spec:
      containers:
      - name: your-nodejs-app
        image: your-nodejs-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

{{% collapse-content title="Rastreo APM desactivado" level="h4" %}}
Para desactivar el rastreo APM mientras se mantiene App and API Protection activado, debes configurar la variable de rastreo APM como false.

Actualiza tu despliegue de Kubernetes para incluir las variables de entorno necesarias:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-nodejs-app
spec:
  template:
    spec:
      containers:
      - name: your-nodejs-app
        image: your-nodejs-app-image
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

## 3. Ejecutar tu aplicación

Aplica tu despliegue actualizado:

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Node.js, consulta la [guía de resolución de problemas de App and API Protection en Node.js][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/nodejs/compatibility
[2]: /es/security/application_security/setup/nodejs/troubleshooting