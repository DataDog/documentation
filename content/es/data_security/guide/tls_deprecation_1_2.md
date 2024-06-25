---
kind: Guía
title: Aviso de obsolescencia del TLS para versiones anteriores a la v1.2
---


## Información general

La seguridad de la capa de transporte (TLS) es un protocolo de seguridad crítico utilizado para proteger el tráfico web. Proporciona confidencialidad e integridad de los datos en tránsito, entre clientes y servidores que intercambian información. Datadog desactivará la compatibilidad con versiones de TLS anteriores a la v1.2 (SSL v3, TLS v1.0, TLS v1.1) en las aplicaciones públicas de Datadog a partir del 30 de junio de 2022. Si utilizas clientes no compatibles para conectarte a Datadog, una vez deshabilitados los protocolos antiguos, aparecerán mensajes de error de conexión.

### Motivo de la obsolescencia

Estamos desactivando estos protocolos para garantizar que los clientes se conecten a Datadog utilizando canales de conexión seguros. Esto se hace de acuerdo con una decisión del Grupo de trabajo de ingeniería de Internet (IETF) de dejar obsoletos estos protocolos a partir del 25 de marzo de 2021. ([https://datatracker.ietf.org/doc/rfc8996/][1])

## Compatibilidad con los clientes

Sigue las instrucciones de la [API ¿En qué situación se encuentra mi SSL?][2] para comprobar el cliente de tu elección.

## Compatibilidad con el navegador

Los navegadores modernos son compatibles con TLS v1.2 desde hace tiempo. Consulta la [matriz de compatibilidad][3] "¿Puedo utilizar...?" para comprobar si tu navegador y versión específicos son aptos.
## Compatibilidad con el Agent

### Agent v6 y v7

Todas las versiones del Agent v6 y v7 son compatibles con TLS v1.2.

### Agent v5

#### Agent v5 empaquetado o contenedorizado

Todas las versiones del Agent v5 instaladas con lo siguiente son compatibles con TLS v1.2:

* Paquetes DEB/RPM
* Windows MSI installer
* Imagen oficial del contenedor


#### Instalación de origen del Agent v5

Cuando se instala con el [script de instalación de origen][4], el Agent v5 depende de Python y OpenSSL del sistema. Por lo tanto, la compatibilidad con TLS v1.2 depende de las versiones de Python y OpenSSL instaladas en el sistema.

Para averiguar si el Python de tu sistema es compatible con TLS v1.2 (y, por tanto, si el Agent instalado de origen lo es), ejecuta el siguiente comando desde un shell del sistema:

`python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` 

Este comando muestra `TLS 1.2` si TLS v1.2 es compatible, si no, mostrará una versión anterior de TLS o un error. Si TLS v1.2 no es compatible, actualiza Python y OpenSSL de tu sistema o actualiza el Agent a la versión v7.

## Idiomas y herramientas compatibles
### OpenSSL

OpenSSL es una biblioteca de criptografía de uso general y comunicación segura utilizada por muchas otras herramientas como Python, Ruby, PHP y Curl. TLS v1.2 es compatible desde la versión 1.0.1 de OpenSSL. Para obtener más información, consulta el [registro de cambios de OpenSSL][5].

### Python

La compatibilidad con TLS v1.2 depende de las versiones de Python y OpenSSL instaladas en el sistema:

* Python v3.4 y posteriores para la versión 3.x con OpenSSL 1.0.1 y posteriores.
* Python 2.7.9 y posteriores para la versión 2.x con OpenSSL 1.0.1 y posteriores.

Puedes ejecutar: `python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` desde un shell Python. Si TLS v1.2 no es compatible, actualiza Python y OpenSSL en tu sistema.

### Golang

No es necesario realizar ningún cambio si utilizas una versión más reciente de Go (1.13 o posterior), ya que Go es compatible con TLS v1.2 de forma predeterminada.

Si utilizas versiones anteriores de Go, establece la MinVersion de la configuración de tu cliente TLS para que utilice explícitamente TLS v1.2:

```
TLSClientConfig: &tls.Config{
        MinVersion: tls.VersionTLS12,
    }
```

### Java

Si tu aplicación se ejecuta en Java v1.7 o Java v1.6 (actualización 111 o posterior), puedes establecer la propiedad del sistema `https.protocols` al iniciar JVM para habilitar protocolos adicionales para las conexiones realizadas mediante la clase `HttpsURLConnection`. Por ejemplo, puedes establecer
`Dhttps.protocols=TLSv1.2`.

Si tu aplicación funciona con Java v1.6 anterior a la actualización 111, o anterior, TLS v1.1 y v1.2 no son compatibles. Por lo tanto, deberás actualizar la versión de Java en la que se ejecuta la aplicación.

### .NET

Si utilizas un cliente .NET integrado, lee la guía de Microsoft sobre [cómo actualizar TLS a la versión 1.2 en varias versiones de .NET framework][6].

### PowerShell

La compatibilidad de Powershell con TLS v1.2 depende de la versión de .NET que tengas instalada en tu sistema. Lee la guía de Microsoft [Prácticas recomendadas de TLS con .NET][7] para conocer cuáles son los requisitos exactos.

Para habilitar versiones recientes de TLS para la sesión actual:

```
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls, TLs11, Tls12
```

También existe un [módulo comunitario de Powershell][8] disponible en Github que puede hacerlo por ti.

Para que esta configuración sea permanente, puedes editar el registro tal y como se indica en la documentación de Microsoft sobre [la habilitación de TLS en Office Online Server][9].

En .NET Framework de 32 bits (versión 4 y posteriores):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

En .NET Framework de 64 bits (versión 4 y posteriores):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

**Nota:** Es necesario que reinicies el sistema para que se aplique este cambio.

[1]: https://datatracker.ietf.org/doc/rfc8996/
[2]: https://www.howsmyssl.com/s/api.html
[3]: https://caniuse.com/tls1-2
[4]: https://github.com/DataDog/dd-agent/blob/5.32.8/packaging/datadog-agent/source/setup_agent.sh
[5]: https://www.openssl.org/news/changelog.html#openssl-101.
[6]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls#configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions
[7]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls
[8]: https://github.com/markekraus/BetterTls
[9]: https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server