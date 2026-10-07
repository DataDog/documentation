---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog
  tag: Blog
  text: Monitorizar tus localizaciones privadas Synthetic con Datadog
- link: https://www.datadoghq.com/blog/kerberos-synthetics/
  tag: Blog
  text: De forma proactiva monitoriza aplicaciones web y API autenticadas por Kerberos
    con Datadog Synthetic Monitoring
- link: /synthetics/guide/browser-tests-passkeys
  tag: Guía
  text: Más información sobre las claves de acceso en los tests de navegador
products:
- icon: browser
  name: Tests de navegador
  url: /synthetics/browser_tests/
- icon: api
  name: Tests de API
  url: /synthetics/api_tests/
title: Autenticación de Kerberos para Synthetic Monitoring
---

{{< product-availability names="Browser Tests,API Tests" >}}

## Información general

Datadog Synthetic Monitoring permite la monitorización proactiva de aplicaciones web y API mediante la autenticación SSO de Kerberos con Microsoft Active Directory. Esto permite realizar tests continuas de recorridos de usuario críticos y endpoints HTTP en tus sitios internos de Windows.

## Requisitos previos

- Un sitio de Windows con autenticación de Kerberos integrada con Active Directory (normalmente alojado en IIS (Internet Information Services)).
- Un servidor de Windows unido por dominio a Active Directory.
- Una cuenta de usuario de dominio con acceso de autenticación de Active Directory al sitio de Windows.
- Los tests de Synthetic Monitoring deben ejecutarse en una ubicación privada de Windows que esté configurada para autenticarse con Active Directory. Para obtener más información, consulta la documentación de requisitos previos de [ubicaciones privadas de Windows][1].

## Instalación

1. Crea tu [ubicación privada de Windows][2] en el servidor de Windows unido al dominio de Active Directory.
2. Configura el [worker de ubicación privada de Synthetic Monitoring][3] para que se ejecute como un servicio de Windows.
3. Configura el servicio de ubicación privada para utilizar las credenciales de tu cuenta de dominio de Active Directory:
   - Abre `services.msc`, ve a **Datadog Synthetic Worker** > **Properties** > **log on** > **this account** (Worker de Datadog Synthetic Monitoring > Propiedades > Inicio de sesión > esta cuenta), e introduce las credenciales de tu cuenta de dominio.
4. Configura tus tests para que se ejecuten desde la ubicación privada de Windows (las ubicaciones gestionadas no admiten la autenticación de Kerberos).

<p style="text-align: center;"><em>No es necesaria ninguna otra configuración para los tests de navegador.</em></p>

5. Opcionalmente, para los tests de API, también debes establecer el campo Domain (Dominio) a tu nombre de dominio de Active Directory en la pestaña **Kerberos**. Ve a **Create/Edit API Test** > **Define Request** > **Advanced Options** > **Authentication** (Crear/Editar test de API > Definir solicitud > Opciones avanzadas > Autenticación).

   {{< img src="synthetics/guide/kerberos-authentication/api_test_kerberos.png" alt="Creación de test de API con las opciones avanzadas ampliadas, que resalta la pestaña de Autenticación y el tipo de autenticación de Kerberos" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/platform/private_locations?tab=windows#prerequisites
[2]: /es/synthetics/platform/private_locations?tab=windows#create-your-private-location
[3]: /es/synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location