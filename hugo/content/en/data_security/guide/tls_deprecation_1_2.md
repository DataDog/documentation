---
title: Deprecation notice for TLS version < 1.2
---


## Overview

Transport Layer Security (TLS) is a critical security protocol used to protect web traffic. It provides confidentiality and integrity of data in transit between clients and servers exchanging information. Datadog is disabling support for older versions of TLS, below 1.2 (SSLv3, TLS v1.0, TLS v1.1) across public facing Datadog applications, beginning June 30, 2022. If you use unsupported clients to connect to Datadog after the older protocols are disabled, you will receive connection error messages.

### Reason for deprecation

These protocols are being deprecated to ensure that customers connect to Datadog using secure connection channels. This is in accordance with a decision from the Internet Engineering Task Force (IETF) to deprecate these protocols as of March 25, 2021. ([https://datatracker.ietf.org/doc/rfc8996/][1])

## Client compatibility

Follow [How's my SSL? API][2] instructions to check the client of your choice.

## Browser support

Modern browsers have had support for TLS v1.2 for a while. See the "Can I use..." [compatibility matrix][3] to determine if your specific browser and version are affected.
## Agent support

### Agent v6 & v7

All versions of Agent v6 & v7 support TLS v1.2.

### Agent v5

#### Packaged or containerized Agent v5

All versions of the Agent v5 installed with the following support TLS v1.2:

* the DEB/RPM packages
* the Windows MSI installer
* the official container image


#### Agent v5 source install

When installed with the [source install script][4], the Agent v5 relies on the system's Python and OpenSSL. Therefore, support for TLS v1.2 depends on the versions of Python and OpenSSL installed on the system.

To determine if your system's Python supports TLS v1.2 (and therefore if the source-installed Agent supports TLS v1.2), run this command from a system shell:

`python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` 

This command outputs `TLS 1.2` if TLS v1.2 is supported, and an older TLS version or an error otherwise. If TLS v1.2 is not supported, upgrade your system's Python and OpenSSL or upgrade the Agent to v7.

## Languages and tools support
### Openssl

OpenSSL is a library for general-purpose cryptography and secure communication used by many other tools such as Python, Ruby, PHP, amd Curl. TLS v1.2 has been supported since OpenSSL 1.0.1, see the [OpenSSL changelog][5] for more information.

### Python

Support for TLS v1.2 depends on the versions of Python and OpenSSL installed on the system:

* Python 3.4+ for 3.x with OpenSSL 1.0.1+
* Python 2.7.9+ for 2.x with OpenSSL 1.0.1+

You can run: `python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` from a Python shell. If TLS v1.2 is not supported, upgrade your system's Python and OpenSSL.

### Golang

If you are using a newer version of Go (1.13 or above), Go already supports TLS v1.2 by default, so no changes are necessary.

When using older versions of Go, set your TLS Client Configuration's MinVersion to explicitly use TLS v1.2:

```
TLSClientConfig: &tls.Config{
        MinVersion: tls.VersionTLS12,
    }
```

### Java

If your application runs on Java 1.7 or Java 1.6 (update 111 or later), you can set the `https.protocols` system property when starting the JVM to enable additional protocols for connections made using the `HttpsURLConnection` class. For example, by setting
`Dhttps.protocols=TLSv1.2`.

If your application runs on Java 1.6 prior to update 111, or earlier, TLS 1.1 and 1.2 are not supported. Therefore, you need to update the version of Java your application runs on.

### .NET

If you are using a built-in .NET client, read the Microsoft guide on [how to upgrade to TLS v1.2 across various versions of .NET framework][6]. 

### Powershell

Powershell support for TLS v1.2 is dependent on the version of .NET installed on your system. Read Microsoft's [TLS best practices with .NET][7] guide to determine exact requirements.

To enable recent versions of TLS for the current session:

```
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls, TLs11, Tls12
```

There's also a [community Powershell module][8] available on Github that can do that for you.

To make this setting persistent, you can edit the registry according to the Microsoft documentation about [enabling TLS in Office Online Server][9].

On 32 bit .Net Framework (version 4 and above):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

On a 64 bit .Net Framework (version 4 and above):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

**Note:** You need to reboot the system for this to take effect.

[1]: https://datatracker.ietf.org/doc/rfc8996/
[2]: https://www.howsmyssl.com/s/api.html
[3]: https://caniuse.com/tls1-2
[4]: https://github.com/DataDog/dd-agent/blob/5.32.8/packaging/datadog-agent/source/setup_agent.sh
[5]: https://www.openssl.org/news/changelog.html#openssl-101.
[6]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls#configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions
[7]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls
[8]: https://github.com/markekraus/BetterTls
[9]: https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server
