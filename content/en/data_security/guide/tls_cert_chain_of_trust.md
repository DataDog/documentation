---
title: Changes to Datadog's TLS certificate chain of trust
kind: guide
---

## Overview

On April 5, 2023, the root certificate authority (CA) and intermediate certificate authority (ICA) used to sign Datadog certificates changed from:

{{< tabs >}}
{{% tab "G1 root certificate (old)" %}}

`DigiCert Global Root CA`<br/>
**Serial #:** `08:3B:E0:56:90:42:46:B1:A1:75:6A:C9:59:91:C7:4A`<br/>
**SHA256 Fingerprint:**

{{< code-block disable_copy="true" lang="text">}}
43:48:A0:E9:44:4C:78:CB:26:5E:05:8D:5E:89:44:B4:D8:4F:96:62:BD:26:DB:25:7F:89:34:A4:43:C7:01:61
{{< /code-block >}}

{{% /tab %}}

{{% tab "G1 ICA certificate (old)" %}}
`DigiCert TLS RSA SHA256 2020 CA1`<br/>
**Serial #:** `06:D8:D9:04:D5:58:43:46:F6:8A:2F:A7:54:22:7E:C4`</br>
**SHA256 Fingerprint:**

{{< code-block disable_copy="true" lang="text">}}
52:27:4C:57:CE:4D:EE:3B:49:DB:7A:7F:F7:08:C0:40:F7:71:89:8B:3B:E8:87:25:A8:6F:B4:43:01:82:FE:14
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

to:

{{< tabs >}}
{{% tab "G2 root certificate (new)" %}}
`DigiCert Global Root G2`</br>
**Serial #**: `03:3A:F1:E6:A7:11:A9:A0:BB:28:64:B1:1D:09:FA:E5`<br/>
**SHA1 Fingerprint**: `DF:3C:24:F9:BF:D6:66:76:1B:26:80:73:FE:06:D1:CC:8D:4F:82:A4`</br>
**SHA256 Fingerprint**:

{{< code-block lang="text" disable_copy="true">}}
CB:3C:CB:B7:60:31:E5:E0:13:8F:8D:D3:9A:23:F9:DE:47:FF:C3:5E:43:C1:14:4C:EA:27:D4:6A:5A:B1:CB:5F
{{< /code-block >}}

{{% /tab %}}

{{% tab "G2 ICA certificate (new)" %}}

`DigiCert Global G2 TLS RSA SHA256 2020 CA1`</br>
**Serial #**: `0c:f5:bd:06:2b:56:02:f4:7a:b8:50:2c:23:cc:f0:66`</br>
**SHA1 Fingerprint**: `1B:51:1A:BE:AD:59:C6:CE:20:70:77:C0:BF:0E:00:43:B1:38:26:12`</br>

**SHA256 Fingerprint:**
{{< code-block lang="text" disable_copy="true">}}
C8:02:5F:9F:C6:5F:DF:C9:5B:3C:A8:CC:78:67:B9:A5:87:B5:27:79:73:95:79:17:46:3F:C8:13:D0:B6:25:A9
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Affected domains

Datadog has already started deploying certificates signed by the new DigiCert G2 root CA on web properties. Eventually all Datadog domains will be signed by this new certificate.

## Action needed

Most Datadog customers do not need to do anything. The DigiCert G2 root certificate was added to the `ca-certificates` package [used by most Linux distributions in 2014][1].

If you are pinning part or all of the certificate chain for specific Datadog domains, or use an [Agent Proxy Configuration][2] with an outdated CA trust store, you might encounter certificate validation errors as Datadog switches to the G2 root certificate. Pinning specific certificates for Datadog endpoints is not recommended.

You can test your configuration by attempting to connect to [`https://global-root-g2.chain-demos.digicert.com`][3]. If you do not encounter certificate validation errors, your configuration trusts the new G2 root certificate and you can connect to Datadog sites signed by the G2 root certificate.

If you need to manually add the new root and ICA, you can [download the DigiCert Trusted Root Authority Certificates from the DigiCert website][4].

[1]: https://changelogs.ubuntu.com/changelogs/pool/main/c/ca-certificates/ca-certificates_20211016ubuntu0.22.04.1/changelog
[2]: /agent/configuration/proxy
[3]: https://global-root-g2.chain-demos.digicert.com
[4]: https://www.digicert.com/kb/digicert-root-certificates.htm