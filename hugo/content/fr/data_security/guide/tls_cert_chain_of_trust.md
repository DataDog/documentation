---
title: Modifications de la chaîne de confiance du certificat TLS de Datadog
---

## Présentation

Le 5 avril 2023, l'autorité de certification racine (CA) et l'autorité de certification intermédiaire (ICA) utilisées pour signer les certificats Datadog sont passés de :

{{< tabs >}}
{{% tab "Certificat racine G1 (ancien)" %}}

`DigiCert Global Root CA`<br/>
**Serial #:** `08:3B:E0:56:90:42:46:B1:A1:75:6A:C9:59:91:C7:4A`<br/>
**SHA256 Fingerprint:**

{{< code-block disable_copy="true" lang="text">}}
43:48:A0:E9:44:4C:78:CB:26:5E:05:8D:5E:89:44:B4:D8:4F:96:62:BD:26:DB:25:7F:89:34:A4:43:C7:01:61
{{< /code-block >}}

{{% /tab %}}

{{% tab "Certificat G1 ICA (ancien)" %}}
`DigiCert TLS RSA SHA256 2020 CA1`<br/>
**Serial #:** `06:D8:D9:04:D5:58:43:46:F6:8A:2F:A7:54:22:7E:C4`</br>
**SHA256 Fingerprint:**

{{< code-block disable_copy="true" lang="text">}}
52:27:4C:57:CE:4D:EE:3B:49:DB:7A:7F:F7:08:C0:40:F7:71:89:8B:3B:E8:87:25:A8:6F:B4:43:01:82:FE:14
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

à :

{{< tabs >}}
{{% tab "Certificat racine G2 (nouveau)" %}}
`DigiCert Global Root G2`</br>
**Serial #**: `03:3A:F1:E6:A7:11:A9:A0:BB:28:64:B1:1D:09:FA:E5`<br/>
**SHA1 Fingerprint**: `DF:3C:24:F9:BF:D6:66:76:1B:26:80:73:FE:06:D1:CC:8D:4F:82:A4`</br>
**SHA256 Fingerprint**:

{{< code-block lang="text" disable_copy="true">}}
CB:3C:CB:B7:60:31:E5:E0:13:8F:8D:D3:9A:23:F9:DE:47:FF:C3:5E:43:C1:14:4C:EA:27:D4:6A:5A:B1:CB:5F
{{< /code-block >}}

{{% /tab %}}

{{% tab "Certificat G2 ICA (nouveau)" %}}

`DigiCert Global G2 TLS RSA SHA256 2020 CA1`</br>
**Serial #**: `0c:f5:bd:06:2b:56:02:f4:7a:b8:50:2c:23:cc:f0:66`</br>
**SHA1 Fingerprint**: `1B:51:1A:BE:AD:59:C6:CE:20:70:77:C0:BF:0E:00:43:B1:38:26:12`</br>

**SHA256 Fingerprint:**
{{< code-block lang="text" disable_copy="true">}}
C8:02:5F:9F:C6:5F:DF:C9:5B:3C:A8:CC:78:67:B9:A5:87:B5:27:79:73:95:79:17:46:3F:C8:13:D0:B6:25:A9
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Domaines concernés

Datadog a déjà commencé à déployer des certificats signés par la nouvelle autorité de certification DigiCert G2 sur les propriétés web. À terme, tous les domaines Datadog seront signés par ce nouveau certificat.

## Action nécessaire

La plupart des clients de Datadog n'ont rien à faire. Le certificat racine DigiCert G2 a été ajouté au paquet `ca-certificates` [utilisé par la plupart des distributions Linux en 2014][1].

Si vous épinglez une partie ou la totalité de la chaîne de certificats pour des domaines Datadog spécifiques, ou si vous utilisez une [configuration par proxy de lʼAgent][2] avec une liste de confiance d'autorité de certification obsolète, vous risquez de rencontrer des erreurs de validation de certificat lorsque Datadog passe au certificat racine G2. L'épinglage de certificats spécifiques pour les endpoints Datadog n'est pas conseillé.

Vous pouvez tester votre configuration en essayant de vous connecter à [`https://global-root-g2.chain-demos.digicert.com`][3]. Si vous ne rencontrez pas d'erreurs de validation de certificat, votre configuration fait confiance au nouveau certificat racine G2 et vous pouvez vous connecter aux sites Datadog signés par le certificat racine G2.

Si vous devez ajouter manuellement la nouvelle racine et l'ICA, vous pouvez [télécharger les certificats d'autorité racine de confiance DigiCert à partir du site web de DigiCert][4].

[1]: https://changelogs.ubuntu.com/changelogs/pool/main/c/ca-certificates/ca-certificates_20211016ubuntu0.22.04.1/changelog
[2]: /fr/agent/configuration/proxy
[3]: https://global-root-g2.chain-demos.digicert.com
[4]: https://www.digicert.com/kb/digicert-root-certificates.htm