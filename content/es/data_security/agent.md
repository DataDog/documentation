---
aliases:
- /es/agent/security/
description: Medidas de seguridad del Datadog Agent
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
kind: documentación
title: Seguridad de los datos en el Agent
---

<div class="alert alert-info">En esta página, hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

Es posible enviar datos al servicio Datadog utilizando un [Agent][1] instalado localmente o a través de nuestra [API HTTP][2]. Aunque para utilizar Datadog no es estrictamente necesario utilizar el Datadog Agent, la gran mayoría de los clientes lo aprovechan. Este artículo describe las principales funciones y características de seguridad disponibles para garantizar la seguridad de tu entorno.

## Distribución del Agent

Los repositorios oficiales y los paquetes binarios del Agent están firmados. Para verificar el canal de distribución, comprueba la firma con alguna de las siguientes claves públicas:

- Paquetes DEB de Linux y metadatos del repositorio:
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][19]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Paquetes RPM de Linux y metadatos del repositorio:
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][20]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Huella digital del certificado de Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

En Debian y Ubuntu, el paquete `datadog-agent` tiene una dependencia relativa del paquete de `datadog-signing-keys`, lo que hace que las claves anteriores sean de confianza para APT. Al mantener el paquete actualizado te aseguras de que las últimas claves de firma están presentes en tu sistema.

### Windows MSI

Para verificar la firma de un archivo de instalación del Datadog Agent en Windows, canaliza la salida de `Get-AuthenticodeSignature` a través de `FormatList` (`fl`) y asegúrate de que:
- el estado es válido
- el certificado está firmado por `Datadog, Inc`
- el emisor es `DigiCert`

Por ejemplo, para verificar un archivo .msi denominado `ddagent-cli-7.49.1.msi`:
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

Si la salida del comando es `A certificate chain could not be built to a trusted root authority`, el equipo puede necesitar una actualización de la CA raíz DigiCert. 

## Seguridad de la información

El Datadog Agent envía datos a Datadog a través de una conexión TCP cifrada TLS por defecto. A partir de la versión 6, el Agent puede configurarse para imponer una versión mínima de TLS al conectarse a Datadog. Si necesitas utilizar una criptografía sólida (p. ej., para cumplir con los requisitos PCI), debes utilizar el Agent v6 o v7 y establecer el parámetro `min_tls_version: 'tlsv1.2'` o `force_tls_12: true` para el Agent v6.39.0/v7.39.0 o versiones anteriores en el archivo de configuración del Agent.

## Redes y proxy

Datadog es un producto SaaS: para enviar datos de monitorización es necesario establecer una conexión saliente desde tu red a la Internet pública. El Agent siempre inicia el tráfico a Datadog desde una conexión TCP cifrada TLS por defecto. Nunca se inician sesiones desde Datadog hacia el Agent. Para obtener más información sobre la configuración de cortafuegos para permitir la lista de dominios y puertos de Datadog necesarios, consulta la página [Red][7] del Agent. Además, si quieres monitorizar hosts sin una conexión directa a la Internet pública, o con tráfico saliente restringido, considera la posibilidad de enviar datos de monitorización desde un [proxy][8].

## Enmascarar logs del Agent

El Datadog Agent genera logs locales para facilitar la [resolución de problemas del Agent][9], si es necesario. Como medida de seguridad, estos logs locales se filtran en busca de algunas palabras clave y patrones específicos que podrían indicar una posible credencial (por ejemplo, clave de API, contraseña y palabras clave de token), que luego se enmascaran antes de escribirse en el disco.

## Servidor HTTPS local

El Agent v6 y v7 exponen una API HTTPS local para facilitar la comunicación entre un Agent en ejecución y las herramientas del Agent (por ejemplo, los comandos `datadog-agent`). Sólo se puede acceder al servidor de API desde la interfaz de red local (`localhost/127.0.0.1`) y la autenticación se realiza mediante un token que sólo puede leer el usuario con el que se ejecuta el Agent. La comunicación con la API HTTPS local está cifrada durante el transporte para protegerla de posibles interceptaciones en `localhost`.

## GUI del Agent

El Agent v6 y v7 viene con una interfaz gráfica de usuario (GUI) por defecto que se inicia en tu navegador web predeterminado. La GUI sólo se inicia si el usuario que la ejecuta tiene los permisos de usuario adecuados, incluyendo la capacidad de abrir el archivo de configuración del Agent. Sólo se puede acceder a la GUI desde la interfaz de red local (`localhost/127.0.0.1`). Además, las cookies del usuario deben estar habilitadas, ya que la GUI genera y guarda un token que se utiliza para autenticar todas las comunicaciones con el servidor de la GUI, así como para proteger contra ataques de falsificación de petición en sitios cruzados (CSRF). Si es necesario, también es posible desactivar por completo la GUI.

## Análisis de seguridad del Agent

El programa de gestión de vulnerabilidades de Datadog incluye evaluaciones periódicas de la infraestructura de soporte y los componentes de las aplicaciones, incluidos los análisis activos de los principales servicios de soporte. Los equipos de seguridad de Datadog realizan análisis mensuales para identificar vulnerabilidades en la configuración y el software, y realizan un seguimiento de la corrección de los resultados de acuerdo con la política de gestión de vulnerabilidades de Datadog.

En lo que respecta específicamente a su Agent de contenedores, Datadog realiza análisis estáticos de vulnerabilidades de forma regular a través de [clair by CoreOS][10] y [snyk.io][11]. Además, Datadog aprovecha el análisis de seguridad como parte de sus lanzamientos del Agent de contenedores al [Docker Trusted Registry][12], así como al [catálogo de contenedores de Red Hat][13]. Junto con el programa interno de gestión de vulnerabilidades de Datadog, Datadog también se asocia con proveedores de seguridad para contenedores.

Si crees que has descubierto un fallo en la seguridad de Datadog, escribe a la dirección [security@datadoghq.com][14] y nos pondremos en contacto contigo en un plazo de 24 horas. La [clave PGP][15] de Datadog está disponible para su descarga, en caso de que necesites cifrar las comunicaciones con nosotros. Te pedimos que no divulgues públicamente el problema hasta que hayamos tenido la oportunidad de solucionarlo.

## Ejecución como usuario sin privilegios

Por defecto, el Agent se ejecuta como el usuario `dd-agent` en Linux y como la cuenta `ddagentuser` en [Windows][16]. Estas son las excepciones:

- El `system-probe` se ejecuta como `root` en Linux y como `LOCAL_SYSTEM` en Windows.
- El `process-agent` se ejecuta como `LOCAL_SYSTEM` en Windows.
- El `security-agent` se ejecuta como `root` en Linux.

## Gestión de secretos

Si necesitas evitar el almacenamiento de secretos en texto simple en los archivos de configuración del Agent, puedes utilizar el paquete de [gestión de secretos][17]. Este paquete permite al Agent llamar a un ejecutable proporcionado por el usuario para que gestione la recuperación o descifrado de secretos, que el Agent carga posteriormente en la memoria. Puedes diseñar tu ejecutable de acuerdo con tu servicio de gestión de claves, método de autenticación y flujo de trabajo de integración continua preferidos.

Para obtener más información, consulta la documentación sobre la [gestión de secretos][18].

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /es/agent/faq/network/
[8]: /es/agent/configuration/proxy/
[9]: /es/agent/troubleshooting/
[10]: https://coreos.com/clair
[11]: https://snyk.io
[12]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides
[13]: https://access.redhat.com/containers
[14]: mailto:security@datadoghq.com
[15]: https://www.datadoghq.com/8869756E.asc.txt
[16]: /es/agent/faq/windows-agent-ddagent-user/
[17]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md
[18]: /es/agent/configuration/secrets-management/
[19]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[20]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public