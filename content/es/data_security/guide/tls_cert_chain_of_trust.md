---
kind: Guía
title: Cambios en la cadena de confianza del certificado TLS de Datadog
---

## Información general

El 5 de abril de 2023, la autoridad de certificación raíz (CA) y la autoridad de certificación intermedia (ICA) utilizadas para firmar los certificados de Datadog cambiaron de:

{{< tabs >}}
{{% tab "G1 root certificate (old)" (Certificado raíz G1 (anterior)) %}}

`DigiCert Global Root CA`<br/>
**N.º de serie:** `08:3B:E0:56:90:42:46:B1:A1:75:6A:C9:59:91:C7:4A`<br/>
**Huella digital de SHA256:**

{{< code-block disable_copy="true" lang="text">}}
43:48:A0:E9:44:4C:78:CB:26:5E:05:8D:5E:89:44:B4:D8:4F:96:62:BD:26:DB:25:7F:89:34:A4:43:C7:01:61
{{< /code-block >}}

{{% /tab %}}

{{% tab "G1 ICA certificate (old)" (Certificado G1 de la ICA (anterior)) %}}
`DigiCert TLS RSA SHA256 2020 CA1`<br/>
**N.º de serie:** `06:D8:D9:04:D5:58:43:46:F6:8A:2F:A7:54:22:7E:C4`</br>
**Huella digital de SHA256:**

{{< code-block disable_copy="true" lang="text">}}
52:27:4C:57:CE:4D:EE:3B:49:DB:7A:7F:F7:08:C0:40:F7:71:89:8B:3B:E8:87:25:A8:6F:B4:43:01:82:FE:14
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

a:

{{< tabs >}}
{{% tab "G2 root certificate (new)" (Certificado G2 raíz (nuevo)) %}}
`DigiCert Global Root G2`</br>
**N.º de serie**: `03:3A:F1:E6:A7:11:A9:A0:BB:28:64:B1:1D:09:FA:E5`<br/>
**Huella digital de SHA1**: `DF:3C:24:F9:BF:D6:66:76:1B:26:80:73:FE:06:D1:CC:8D:4F:82:A4`</br>
**Huella digital de SHA256**:

{{< code-block lang="text" disable_copy="true">}}
CB:3C:CB:B7:60:31:E5:E0:13:8F:8D:D3:9A:23:F9:DE:47:FF:C3:5E:43:C1:14:4C:EA:27:D4:6A:5A:B1:CB:5F
{{< /code-block >}}

{{% /tab %}}

{{% tab "G2 ICA certificate (new)" (Certificado G2 de la ICA (nuevo)) %}}

`DigiCert Global G2 TLS RSA SHA256 2020 CA1`</br>
**N.º de serie**: `0c:f5:bd:06:2b:56:02:f4:7a:b8:50:2c:23:cc:f0:66`</br>
**Huella digital de SHA1**: `1B:51:1A:BE:AD:59:C6:CE:20:70:77:C0:BF:0E:00:43:B1:38:26:12`</br>

**Huella digital de SHA256:**
{{< code-block lang="text" disable_copy="true">}}
C8:02:5F:9F:C6:5F:DF:C9:5B:3C:A8:CC:78:67:B9:A5:87:B5:27:79:73:95:79:17:46:3F:C8:13:D0:B6:25:A9
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Dominios afectados

Datadog ya ha empezado a desplegar certificados firmados por el nuevo certificado raíz de la CA DigiCert G2 en las propiedades web. En el futuro, todos los dominios de Datadog estarán firmados por este nuevo certificado.

## Medidas que deben adoptarse

La mayoría de los clientes de Datadog no necesitan hacer nada. El certificado raíz G2 de DigiCert se ha añadido al paquete `ca-certificates` [que utilizan la mayoría de las distribuciones de Linux desde 2014][1].

Si estás anclando parte o toda la cadena de certificados para dominios específicos de Datadog, o utilizas una [Configuración del proxy del Agent][2] con un almacén de CA de confianza obsoleto, podrían producirse errores de validación de certificados cuando Datadog cambie al certificado raíz G2. No es recomendable anclar certificados específicos para endpoints de Datadog.

Puedes comprobar tu configuración intentando conectarte a [`https://global-root-g2.chain-demos.digicert.com`][3]. Si no detectas errores de validación del certificado, tu configuración confía en el nuevo certificado raíz G2 y puedes conectarse a sitios de Datadog firmados por dicho certificado.

Si necesitas añadir manualmente el nuevo certificado raíz y el de la ICA, puedes [descargar los certificados de la entidad de certificación raíz de confianza DigiCert de su sitio web][4].

[1]: https://changelogs.ubuntu.com/changelogs/pool/main/c/ca-certificates/ca-certificates_20211016ubuntu0.22.04.1/changelog
[2]: /es/agent/configuration/proxy
[3]: https://global-root-g2.chain-demos.digicert.com
[4]: https://www.digicert.com/kb/digicert-root-certificates.htm