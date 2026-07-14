---
aliases:
- /es/partners/laying-the-groundwork/
description: Cómo empezar y qué decisiones clave debes tomar desde el principio.
title: Sentar las bases
---

Esta parte de la guía aborda las decisiones clave que debes tomar al principio de tu camino como proveedor de servicios administrados por Datadog.

## Consideraciones clave para los proveedores de servicio

La forma en que empiezas a utilizar Datadog, como proveedor de servicio, depende de tu modelo de negocio y de tu modelo operativo:

- **Modelo de negocio**: una pregunta clave que debes responder es si piensas dar a tus clientes su propio acceso a Datadog o no. Si decides dar acceso a los clientes a Datadog, crea una cuenta multiorganización para mantener los datos de los clientes separados y privados.
- **Modelo operativo**: otra consideración clave es si tu base de clientes se compone de muchos clientes homogéneos, donde la gestión programática de muchas organizaciones de aspecto similar a Datadog es más importante, o si tus clientes son menos o más heterogéneos.

Según lo anterior, ya estás listo para sentar las bases de tu configuración de MSP con Datadog.

## Requisitos previos

Antes de trabajar en la implementación de Datadog como proveedor de servicio, es recomendado que completes la [formación de Especialista técnico de Datadog][16] en el portal DPN.

Con la formación y la certificación te adentrarás en muchos de los temas tratados en los próximos capítulos, lo que te permitirá empezar a trabajar de inmediato.

## Configuración de la organización

Una de las decisiones clave que debe tomar un proveedor de servicio es cómo configurar las cuentas del cliente de Datadog, denominadas "organizaciones" (u "orgs" para abreviar). Aunque los usuarios pueden estar asociados a más de una organización, los recursos supervisados están vinculados a una única organización. Elegir la estructura organizativa adecuada desde el principio ayuda a crear valor rápidamente para ti y tus clientes.

### Organización única u organización múltiple

Datadog ofrece la posibilidad de gestionar múltiples organizaciones secundarias desde una organización principal. Este es el modelo de despliegue típico utilizado por los MSP para evitar que los clientes tengan acceso a los datos de los demás. En una configuración multiorganización, se crea una organización secundaria para cada cliente, y el cliente está restringido a su propia organización secundaria. Para obtener más información, consulta [Opciones de aprovisionamiento de organización cliente](#client-org-provisioning-options).

Utiliza una configuración de una sola organización si no tienes previsto dar acceso a tus clientes a Datadog y no tienes un requisito estricto de separar los datos de los clientes.

Para obtener más información sobre la gestión de organizaciones, consulta la documentación [Gestión de cuentas de múltiples organizaciones][1].

### ¿Organizaciones separadas para desarrollo, tests y producción?

Una pregunta habitual de los socios de MSP es si deben crearse organizaciones de Datadog independientes para gestionar los recursos de desarrollo, test y producción en entornos.

Datadog no recomienda separar los recursos de desarrollo, test y producción. El enfoque recomendado consiste en gestionar todos los recursos en la misma organización de Datadog y delimitar los entornos a través de etiquetas (tags). Para más información, consulta [estrategia de etiquetado][20].

## Opciones de aprovisionamiento de la organización cliente

Si estás gestionando las organizaciones de tus clientes de Datadog, es posible que desees controlar el proceso de aprovisionamiento de la organización y llevar a cabo tareas administrativas en la organización, como suministrar nuevos usuarios, configurar métodos de acceso, definir el acceso basado en roles y gestionar el uso de los clientes.

Para ello debes:

1. [Crear una organización secundaria en la cuenta principal] (#create-a-child-organization-under-your-parent-account)
2. [Recuperar el ID de organización de la nueva organización secundaria](#retrieve-the-new-client-orgs-org-id)
3. [Separar la nueva organización secundaria desde tu cuenta principal.](#separate-the-new-child-organization-from-your-parent-account)
4. [Registrar los datos del nuevo cliente en el portal DPN](#register-the-new-client-details-in-the-dpn-portal)
5. [Crear una organización secundaria bajo la organización creada en el paso 1.](#create-a-new-child-organization-under-the-organization-created-in-step-1-above)

Como resultado:

- Se crea una nueva organización principal con el fin de gestionar una o varias organizaciones secundarias para tu nuevo cliente.
- La nueva organización principal y la organización secundaria del cliente se registran y se adjuntan a un contrato de facturación.
- Puedes aprovisionar nuevos usuarios, configurar sus métodos de acceso, definir el acceso basado en roles y gestionar el uso para tu nueva organización cliente secundaria.

### Crear una organización secundaria bajo su cuenta principal

Hay dos opciones para este paso:

- Mediante la interfaz de usuario: haz clic en "New Organization" (Nueva organización) como se describe en [Gestión de cuentas de múltiples organizaciones][1].
- Mediante la API: utiliza el endpoint [Crear una organización secundaria][18].

### Recuperar el ID de organización de la nueva organización cliente

Puedes recuperar el ID de la organización de Datadog en la que estás conectado abriendo la consola de JavaScript del navegador y escribiendo lo siguiente:

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

También puedes crear un marcador llamado `Get Datadog OrgId` que contenga la siguiente función de JavaScript:

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog OrgId is " + orgId);})();
```

A continuación, cuando te encuentres en una página de Datadog, haz clic en el marcador para que aparezca el ID de organización actual en un cuadro de alerta del navegador.

### Separar la nueva organización secundaria de tu cuenta principal

Hay dos opciones para este paso:
    - Autoservicio: utiliza el endpoint de la API [Derivar organización secundaria][19] para convertir la nueva organización en una organización principal autónoma.
    - Asistido: ponte en contacto con tu gestor de ventas de socios para eliminar la nueva organización de tu cuenta principal.

### Registrar los datos del nuevo cliente en el portal DPN

- Inicia sesión en el [portal DPN][16] y haz clic en `+Register Deal` en la página Dashboard del trato.

- Introduce los detalles del nuevo cliente incluyendo el ID de organización de la nueva organización cliente para registrar la nueva organización cliente.

### Crear una nueva organización secundaria bajo la organización creada en el paso 1 anterior

1. Cambia a la organización creada en el [Paso 1 anterior](#create-a-child-organization-under-your-parent-account).
2. Crea una organización secundaria cliente siguiendo las instrucciones del [Paso 1 anterior](#create-a-child-organization-under-your-parent-account).

## Subdominios personalizados

Para mejorar tu experiencia en Datadog cuando gestiones un gran número de organizaciones, utiliza la función de subdominios personalizados.

Por defecto, se accede a cualquier organización de Datadog a través de las páginas de acceso de Datadog, [https://app.datadoghq.com][2] y [https://app.datadoghq.eu][3]. Sin embargo, los subdominios personalizados pueden proporcionar una URL única para cada suborganización. Por ejemplo, `https://account-a.datadoghq.com`.

Para más información, consulta [Subdominios personalizados][4].

## Roles de usuario y control de acceso personalizado basado en funciones (RBAC)

La experiencia demuestra que tanto los usuarios internos de MSP como los de los clientes a menudo no encajan claramente en uno de los tres [roles predeterminados de Datadog][5]. Es una práctica recomendada crear roles personalizados para limitar los permisos de los usuarios en determinadas áreas.

Para más información, consulta:

- [Roles personalizados][6]
- [Control de acceso basado en roles][7]

## Consideraciones sobre el inicio de sesión único (SSO)

En un contexto de proveedor de servicio, tienes dos consideraciones para el inicio de sesión único (SSO):

- Inicio de sesión único para tu organización
- Inicio de sesión único para tus clientes

Además de la ventaja obvia de un mecanismo de autenticación unificado, el uso de SAML Single Sign-On también simplifica enormemente el proceso de administración del usuario. El uso de SAML permite utilizar el aprovisionamiento del usuario just-in-time (JiT), eliminando la necesidad de crear usuarios manual o programáticamente.

La autenticación SAML está habilitada en una organización o suborganización de Datadog, lo que significa que puedes tener diferentes proveedores SAML para diferentes suborganizaciones. Sin embargo, esto también significa que si tienes dos grupos de usuarios con diferentes proveedores SAML, esos usuarios tienen que estar en organizaciones separadas. Asegúrate de pensar en la autenticación SAML cuando planifiques tu configuración multiorganización.

Para más información, consulta:

- [Configurar SAML][8] para cuentas de múltiples organizaciones
- [Inicio de sesión único con SAML][9]

## Gestión de usuarios

### Creación de usuarios

Datadog ofrece múltiples formas de aprovisionar rápidamente a los usuarios de sus respectivas organizaciones:

- [Añadir lotes de usuarios a través de la interfaz de usuario][10]
- [Crear usuarios a través de la API][11]
- Utiliza un servicio de autenticación como SAML junto con el [aprovisionamiento Just-in-Time (JiT)][12]

### Formación de usuarios

El objetivo de Datadog es brindar un servicio que su uso sea fácil e intuitivo. La experiencia demuestra que la mayoría de los usuarios se sienten cómodos trabajando con el producto y aprendiendo sobre la marcha.

He aquí algunos recursos útiles para los usuarios que prefieren formarse sobre los aspectos más importantes del producto:

- [Canal de YouTube de Datadog][13]: se publican vídeos de introducción cada vez que se lanzan nuevas funciones, así como vídeos sobre consejos, trucos y prácticas recomendadas; el canal de YouTube de Datadog es una gran fuente de formación general.
- [Centro de aprendizaje de Datadog][14]: El Centro de aprendizaje de Datadog es una excelente forma de que los usuarios conozcan la plataforma en profundidad. Al registrarte en el Centro de aprendizaje, se aprovisiona automáticamente y de forma gratuita un entorno de prueba de Datadog, lo que permite a los usuarios jugar con el producto sin miedo a romper nada.
- [El blog de Datadog ][15]: con más de 700 entradas, el blog es una fuente clave de información sobre cómo utilizar Datadog para monitorizar servicios clave, herramientas y tecnologías en tus entornos de cliente, así como información sobre los últimos lanzamientos de productos.
- [Centro de atención de la Red de socios de Datadog (DPN)][16]: a través de la DPN, los socios de Datadog tienen acceso a una serie de cursos en vídeo para vendedores y profesionales técnicos de proveedores de servicio.

Ponte en contacto con el representante de tu socio de Datadog si tienes previsto crear tu propio material de formación para tus clientes y si tienes alguna recomendación sobre qué contenido sería útil.

## ¿Qué toca hacer ahora?

La siguiente parte de la guía, [Entrada de datos][17], se centra en la introducción de datos en Datadog.

[1]: /es/account_management/multi_organization/
[2]: https://app.datadoghq.com
[3]: https://app.datadoghq.eu
[4]: /es/account_management/multi_organization/#custom-sub-domains
[5]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[7]: /es/account_management/rbac/
[8]: /es/account_management/multi_organization/#set-up-saml
[9]: /es/account_management/saml/
[10]: /es/account_management/users/#add-new-members-and-manage-invites
[11]: /es/api/latest/users/#create-a-user
[12]: /es/account_management/saml/#just-in-time-jit-provisioning
[13]: https://www.youtube.com/user/DatadogHQ
[14]: https://learn.datadoghq.com/
[15]: https://www.datadoghq.com/blog/
[16]: https://partners.datadoghq.com/
[17]: /es/partners/data-intake/
[18]: /es/api/latest/organizations/#create-a-child-organization
[19]: /es/api/latest/organizations/#spin-off-child-organization
[20]: /es/partners/data-intake/#tagging-strategy