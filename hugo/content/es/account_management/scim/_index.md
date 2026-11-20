---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
description: Automatice el aprovisionamiento y desaprovisionamiento de usuarios en
  Datadog mediante la integración SCIM con los proveedores de identidad Microsoft
  Entra ID y Okta.
further_reading:
- link: /account_management/scim/azure/
  tag: Documentación
  text: Configurar SCIM con Azure Active Directory
- link: account_management/scim/okta
  tag: Documentación
  text: Configurar SCIM con Okta
title: Aprovisionamiento de usuarios con SCIM
---
<div class="alert alert-info">
SCIM está disponible con los planes Infrastructure Pro, Infrastructure Enterprise y Startup.
</div>

## Descripción general {#overview}

El System for Cross-domain Identity Management, o [SCIM][9], es un estándar abierto que permite la automatización del aprovisionamiento de usuarios. Mediante SCIM, puede aprovisionar y desaprovisionar usuarios automáticamente en su organización de Datadog, sincronizados con el proveedor de identidad (IdP) de su organización.

### Funcionalidades admitidas {#supported-capabilities}

- Crear usuarios en Datadog
- Eliminar usuarios en Datadog cuando ya no requieran acceso
- Inicio de sesión único en Datadog (recomendado)
- Managed Teams: cree Datadog Teams a partir de grupos del proveedor de identidad y mantenga la pertenencia a los Datadog Teams sincronizada con la pertenencia a grupos en el proveedor de identidad.
- Aprovisionamiento de roles: aprovisione el rol de Datadog de un usuario (integrado o personalizado) a partir de un atributo del proveedor de identidad y manténgalo sincronizado. Cuando el atributo cambia en su proveedor de identidad, el rol de Datadog del usuario se actualiza en tiempo real.

Datadog implementa el protocolo de servidor SCIM. Datadog admite el uso de SCIM con los proveedores de identidad Microsoft Entra ID y Okta. Es posible que otros proveedores de identidad funcionen, pero no cuentan con soporte explícito.

Para configurar SCIM para los proveedores de identidad compatibles, consulte la documentación de su IdP:
- [Microsoft Entra ID][2]
- [Okta][3]

### Requisitos previos {#prerequisites}

SCIM en Datadog es una función avanzada disponible con los planes Infraestructura Pro, Infraestructura Enterprise y Startup.

Esta documentación asume que su organización gestiona las identidades de los usuarios mediante un proveedor de identidad.

Datadog recomienda encarecidamente que utilice una clave de aplicación de cuenta de servicio al configurar SCIM para evitar cualquier interrupción en el acceso. Para obtener más detalles, consulte [uso de una cuenta de servicio con SCIM][4].

Al usar SAML y SCIM juntos, Datadog recomienda encarecidamente deshabilitar el aprovisionamiento just-in-time (JIT) de SAML para evitar discrepancias en el acceso. Gestione el aprovisionamiento de usuarios solo a través de SCIM.

### Comportamiento del aprovisionamiento de roles {#role-provisioning-behavior}

Cuando una solicitud SCIM incluye uno o más roles, Datadog aprovisiona solo los roles que coinciden con un rol en su organización. Si ninguno de los roles coincide, se asigna al usuario el rol predeterminado de su organización (Standard). Los roles que no coinciden se registran en [Audit Trail][11].

SCIM es la fuente de verdad para la asignación de roles y tiene prioridad sobre los [mapeos de roles SAML][12]. Los eventos de aprovisionamiento de roles SCIM se registran en Audit Trail y como métricas de StatsD.

Los roles siguen la convención de atributos multivaluados SCIM definida en [RFC 7643][13]. Tanto Okta como Microsoft Entra ID admiten este mapeo de forma nativa, sin necesidad de scripts personalizados. Para obtener instrucciones de configuración, consulte la documentación de su proveedor de identidad.

## Uso de una cuenta de servicio con SCIM {#using-a-service-account-with-scim}

Para habilitar SCIM, debe usar una [clave de aplicación][5] para proteger la conexión entre su proveedor de identidad y su cuenta de Datadog. Cada clave de aplicación está controlada por un usuario o una cuenta de servicio específicos.

Si utiliza una clave de aplicación vinculada a un usuario para habilitar SCIM y ese usuario deja su organización, su cuenta de Datadog se desaprovisiona. Esa clave de aplicación específica del usuario se revoca y usted interrumpe permanentemente su integración SCIM, lo que impide que los usuarios de su organización accedan a Datadog.

Para evitar perder el acceso a sus datos, Datadog recomienda encarecidamente que cree una [cuenta de servicio][6] dedicada a SCIM. Dentro de esa cuenta de servicio, cree una clave de aplicación para usar en la integración SCIM.

La cuenta de servicio requiere como mínimo los permisos `user_access_invite` y `user_access_manage`. Para obtener la lista completa de los permisos requeridos, consulte la [documentación de la API de SCIM][10].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/scim/#email-verification
[2]: /es/account_management/scim/azure
[3]: /es/account_management/scim/okta
[4]: /es/account_management/scim/#using-a-service-account-with-scim
[5]: /es/account_management/api-app-keys
[6]: /es/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /es/help/
[9]: https://scim.cloud/
[10]: /es/api/latest/scim/
[11]: /es/account_management/audit_trail/
[12]: /es/account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
[13]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2