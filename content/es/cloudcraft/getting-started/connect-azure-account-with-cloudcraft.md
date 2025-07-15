---
title: Conecta tu cuenta de Azure con Cloudcraft
---

Este artículo te guiará a través de la conexión de tu cuenta de Azure con Cloudcraft.

## Requisitos

- Un usuario de Cloudcraft con el [rol de Propietario o Administrador][1].
- Una [suscripción Cloudcraft Pro][2] activa.
- Una cuenta de Azure con permiso para crear roles de IAM.

## Gestionar cuentas de Azure

### Añadir cuenta

1. En Cloudcraft, ve a **User** (Usuario) > **Azure accounts** (Cuentas de Azure).
2. En la parte inferior del modal, haz clic en **Add Azure Account** (Añadir cuenta de Azure).
3. En la siguiente página, se proporcionan instrucciones paso a paso. Haz clic en **Select "App registrations" in the left sidebar** (Seleccionar "Registros de aplicaciones" en la barra lateral izquierda) para registrar una nueva aplicación que interactúe con Cloudcraft en Azure.
4. En la página **App registrations** (Registros de aplicaciones) de **Azure Active Directory**, haz clic en **New registration** (Nuevo registro).
5. Ingresa la siguiente información:
    - **Nombre**: Cloudcraft
    - **Tipos de cuenta admitidos**: solo cuentas de este directorio organizativo (inquilino individual)
    - **Redirigir URI**: deja este campo en blanco.
6. Haz clic en **Register** (Registrar).
7. En la página de detalles de tu aplicación, copia el **Application ID** (ID de la solicitud) y el **Directory ID** (ID del directorio).
8. En Cloudcraft, pega el **Application ID** (ID de aplicación) y el **Directory ID** (ID de directorio), luego haz clic en **Next** (Siguiente).

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/essential-ids-cloudcraft.png" alt="Instrucciones paso a paso para añadir una cuenta de Azure a Cloudcraft con los campos de ID de aplicación y directorio resaltados." responsive="true" style="width:100%;">}}

#### Crear un secreto de cliente

A continuación, crea un secreto de cliente para permitir que la aplicación de Cloudcraft se identifique de forma segura ante los servicios de autenticación de Azure.

**Nota**: Puedes elegir tu propio periodo de vencimiento para el secreto de cliente. Ten en cuenta que cuando el secreto se venza, no podrás analizar tu cuenta de Azure hasta que registres un nuevo secreto y actualices la cuenta en Cloudcraft.

1. En la página de tu aplicación en Azure, en la sección **Manage** (Gestión) de la barra lateral izquierda, haz clic en **Certificates & secrets** (Certificados y secretos).
2. En la sección **Certificates & secrets** (Certificados y secretos), **New client secret** (Nuevo secreto de cliente).
3. Ingresa la siguiente información:
    - **Descripción**: Cloudcraft
    - **Vencimiento**: 730 días (24 meses)
4. Haz clic en **Add** (Añadir).
5. Copia el **Value** (Valor) de tu secreto recién creado.
6. En Cloudcraft, pega el secreto de cliente en el campo **Client secret** (Secreto de cliente) y haz clic en **Next** (Siguiente).

#### Crear un usuario de IAM para Cloudcraft

Por último, crea un usuario de IAM para permitir que la aplicación de Cloudcraft lea tu entorno de Azure.

1. En Cloudcraft, haz clic en el enlace **Open your Azure Subscriptions page** (Abrir la página de suscripciones de Azure) para abrir la página **Subscriptions** (Suscripciones) en Azure.
2. Selecciona la suscripción que deseas utilizar con Cloudcraft.
3. En la página de suscripción, selecciona **Access control (IAM)** (Control de acceso [IAM]) en la barra lateral izquierda.
4. Haz clic en **Add** (Añadir) y selecciona **Add role assignment** (Añadir asignación de rol).  Aparecerá una nueva página con una lista de roles.
5. Selecciona **Reader** (Lector) y haga clic en **Next** (Siguiente).
6. En la página siguiente, deja seleccionada la opción **User, group or service principal** (Usuario, grupo o servicio principal) y haz clic en **Select members** (Seleccionar miembros). Busca **Cloudcraft** y selecciónalo.
7. Haz clic en **Review + assign** (Revisar y asignar).
8. En Cloudcraft, haz clic en **Next** (Siguiente).

#### Añadir suscripciones

Antes de guardar la cuenta, puedes optar por configurar el acceso para los equipos.

1. Haz clic en **Team access** (Acceso para equipos) y selecciona los equipos con los que deseas compartir el acceso a la cuenta de Azure. Si omites este paso, la cuenta será privada y solo tú podrás acceder a ella.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/share-azure-account.png" alt="Interfaz de Cloudcraft en la que se muestran las opciones de uso compartido de equipos con un menú desplegable para seleccionar los equipos con los que compartir el acceso a la cuenta de Azure." responsive="true" style="width:100%;">}}

2. Haz clic en **Add Account** (Añadir guardar).

Tu cuenta de Azure ya está lista para usar con Cloudcraft.

{{< img src="cloudcraft/getting-started/connect-azure-account-with-cloudcraft/azure-account-added.png" alt="Captura de pantalla de la interfaz de Cloudcraft para la gestión de cuentas de Azure con una cuenta añadida." responsive="true" style="width:100%;">}}

## Editar cuenta

Para editar una cuenta, haz clic en el icono de lápiz gris situado a la izquierda de la cuenta que deseas editar. Puedes cambiar los detalles de la cuenta, como el nombre, el ARN y el acceso al equipo.

Cuando hayas terminado, haz clic en **Save Account** (Guardar cuenta).

## Eliminar cuenta

Para eliminar una cuenta, haz clic en el icono de la papelera situado a la derecha de la cuenta que deseas eliminar y, luego, haz clic en **Remove** (Eliminar).

[1]: /es/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing