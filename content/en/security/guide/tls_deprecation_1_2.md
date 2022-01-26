---
title: Deprecation notice for TLS version < 1.2
kind: guide
---


## Overview

Transport Layer Security (TLS) is a critical security protocol used to protect web traffic. It provides confidentiality and integrity of data in transit between clients and servers exchanging information. Datadog is disabling support for older versions of TLS, below 1.2 (SSLv3, TLS v1.0, TLS v1.2) across public facing Datadog applications, beginning March 31, 2022. If you use unsupported clients to connect to Datadog after the older protocols are disabled, you will receive connection error messages.

### Reason for deprecation

These protocols are being deprecated to ensure that customers connect to Datadog using secure connection channels. This is in accordance with a decision from the Internet Engineering Task Force (IETF) to deprecate these protocols as of March 25, 2021. ([https://datatracker.ietf.org/doc/rfc8996/][1])

## Browser support

Modern browsers have had support for TLS 1.2 for a while. See the "Can I use..." [compatibility matrix][2] to determine if your specific browser and version are affected.

## Language support

### Python

Starting in Python 3.10, the SSL module defaults to TLS 1.2 and the use of modern cipher suites, see [https://bugs.python.org/issue43998][3].

### Golang

If you are using a newer version of Go (1.13 or above), Go already supports TLS 1.2 by default, so no changes are necessary.

When using older versions of Go, set your TLS Client Configuration’s MinVersion to explicitly use TLS 1.2:

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

If you are using a built-in .NET client, read the Microsoft guide on [how to upgrade to TLS 1.2 across various versions of .NET framework][4]. 

### Powershell

Powershell support for TLS 1.2 is dependent on the version of .NET installed on your system. Read Microsoft's [TLS best practices with .NET][5] guide to determine exact requirements.

To enable recent versions of TLS for the current session:

```
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls, TLs11, Tls12
```

There’s also a [community Powershell module][6] available on Github that can do that for you.

To make this setting persistent, you can edit the registry according to the Microsoft documentation about [enabling TLS in Office Online Server][7].

On 32 bit .Net Framework (version 4 and above):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

On a 64 bit .Net Framework (version 4 and above):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

**Note:** You need to reboot the system for this to take effect.

[1]: https://datatracker.ietf.org/doc/rfc8996/
[2]: https://caniuse.com/tls1-2
[3]: https://bugs.python.org/issue43998
[4]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls#%23configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions
[5]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls
[6]: https://github.com/markekraus/BetterTls
[7]: https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server
