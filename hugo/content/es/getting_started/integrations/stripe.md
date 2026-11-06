---
description: Aprovisione y administre una organización de Datadog desde Stripe CLI
  usando Stripe Projects.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-stripe-projects/
  tag: Blog
  text: Aprovisionar Datadog en Stripe Projects
- link: https://docs.stripe.com/projects
  tag: Documentación
  text: Documentación de la Stripe Projects CLI
site_support_id: stripe_projects
title: Comience con Datadog en Stripe Projects
---
## Descripción general {#overview}

Use [Stripe Projects][1] para aprovisionar y administrar Datadog desde la Stripe CLI. Este flujo crea una organización de Datadog y agrega su clave de API, sitio y nombre de organización al archivo `.env` de su proyecto.

## Requisitos previos {#prerequisites}

- Una cuenta de Stripe con una dirección de correo electrónico que no esté asociada con una cuenta de Datadog existente

## Configuración {#setup}

### Instale Stripe CLI y el complemento de Stripe Projects {#install-the-stripe-cli-and-projects-plugin}

1. Instale [Stripe CLI][2] versión 1.43.3 o posterior:

   ```shell
   npm install -g @stripe/cli
   ```

   Para otros métodos de instalación, consulte [Instalar Stripe CLI][2].

1. Instale el complemento de Stripe Projects:

   ```shell
   stripe plugin install projects
   ```

### Aprovisionar Datadog {#provision-datadog}

1. Inicialice Stripe Projects. Ejecute este comando en el directorio que desea usar para su proyecto, como la raíz del repositorio de su aplicación:

   ```shell
   stripe projects init
   ```

1. Agregue observabilidad de Datadog:

   ```shell
   stripe projects add datadog/observability
   ```

1. Confirme que el archivo `.env` en el directorio de su proyecto contenga su clave de Datadog API, sitio y nombre de organización.

### Actualice su plan {#upgrade-your-plan}

Para mantener el acceso a Datadog después de que finalice su prueba gratuita, actualice a pago por uso. Si su cuenta de Stripe tiene un método de pago guardado, esto requiere un solo comando:

```shell
stripe projects upgrade datadog-observability
```

## Acceda a Datadog {#access-datadog}

1. Vaya a la [página de inicio de sesión de Datadog](https://app.datadoghq.com/account/login).
1. Seleccione **Sign in with Google** si utiliza una cuenta de Google para iniciar sesión en Stripe. De lo contrario, seleccione **¿Olvidó su contraseña?** e ingrese la dirección de correo electrónico de su cuenta de Stripe para establecer una contraseña de Datadog.

## Eliminar Datadog de Stripe Projects {#remove-datadog-from-stripe-projects}

Eliminar Datadog revoca su clave de API y retira la integración de su proyecto de Stripe. Su organización de Datadog y sus datos no se eliminan y permanecen disponibles en la interfaz de usuario de Datadog.

```shell
stripe projects remove datadog-observability
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.stripe.com/projects
[2]: https://docs.stripe.com/cli/install