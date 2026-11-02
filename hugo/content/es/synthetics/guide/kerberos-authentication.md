---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog
  tag: Blog
  text: Haga un seguimiento de sus ubicaciones privadas de Synthetic Monitoring con
    Datadog.
- link: https://www.datadoghq.com/blog/kerberos-synthetics/
  tag: Blog
  text: Haga un seguimiento proactivo de las aplicaciones web y de las APIs autenticadas
    mediante Kerberos con Datadog Synthetics.
- link: /synthetics/guide/browser-tests-passkeys
  tag: Guía
  text: Obtenga información sobre las Passkeys en pruebas de navegador.
products:
- icon: browser
  name: Pruebas de navegador
  url: /synthetics/browser_tests/
- icon: api
  name: Pruebas de API
  url: /synthetics/api_tests/
title: Autenticación Kerberos para Synthetic Monitoring
---
{{< product-availability names="Browser Tests,API Tests" >}}

## Descripción general {#overview}

Datadog Synthetic Monitoring permite hacer un seguimiento proactivo de las aplicaciones web y de las APIs mediante autenticación SSO de Kerberos con Microsoft Active Directory. Esto permite realizar pruebas continuas de recorridos críticos de usuario y endpoints HTTP en sus sitios internos de Windows.

## Requisitos previos {#prerequisites}

- Una ubicación privada de Windows (las ubicaciones administradas no admiten la autenticación Kerberos).
- Un sitio de Windows con autenticación Kerberos integrado con Active Directory (generalmente alojado en IIS).
- Un servidor Windows que está unido al dominio de Active Directory.
- Una cuenta de usuario de dominio con acceso de autenticación de Active Directory al sitio de Windows.
- Las pruebas de Synthetic Monitoring deben ejecutarse en una ubicación privada de Windows que esté configurada para autenticarse con Active Directory. Para obtener más información, consulte la documentación de requisitos previos de [Windows private locations][1].

## Instalación {#installation}

1. Cree su [Windows private location][2] en el servidor Windows unido al dominio de Active Directory.
2. Configure el [Synthetic Monitoring private location worker][3] para que se ejecute como un servicio de Windows.
3. Configure el servicio de ubicación privada para usar las credenciales de su cuenta de dominio de Active Directory:
   - Abra `services.msc`, navegue a {{< ui >}}Datadog Synthetics Worker{{< /ui >}} > {{< ui >}}Properties{{< /ui >}} > {{< ui >}}log on{{< /ui >}} > {{< ui >}}this account{{< /ui >}} e ingrese las credenciales de su cuenta de dominio.
4. Configure sus pruebas:
   - **Pruebas de navegador**: Grabe su prueba desde una sesión de navegador que se ejecute directamente en un servidor Windows unido al dominio. Por ejemplo, conéctese a su ubicación privada de Windows usando el Protocolo de escritorio remoto (RDP) y grabe desde allí. Grabar desde una máquina fuera del dominio de Active Directory envía solicitudes a través de internet pública sin ninguna credencial de Kerberos adjunta, lo que provoca un aviso de inicio de sesión.
   - **Pruebas de API**: Establezca el campo {{< ui >}}Domain{{< /ui >}} en la pestaña {{< ui >}}Kerberos{{< /ui >}} con el Nombre principal de servicio (SPN) completo del servicio de destino. Por ejemplo, `HTTP/targetsite.yourdomain.com`, o `HTTP/targetsite.yourdomain.com:port` si el sitio está registrado con un puerto que no es el predeterminado.

{{< img src="synthetics/guide/kerberos-authentication/api_test_kerberos.png" alt="Prueba de API con las opciones avanzadas expandidas, resaltando la pestaña Autenticación y el tipo de autenticación Kerberos" style="width:80%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/platform/private_locations?tab=windows#prerequisites
[2]: /es/synthetics/platform/private_locations?tab=windows#create-your-private-location
[3]: /es/synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location