---
title: Changes to Datadog's TLS certificate chain of trust
---

## 概要

2023 年 4 月 5 日、Datadog 証明書の署名に使用するルート認証局 (CA) と中間認証局 (ICA) が以下から変更になりました。

{{< tabs >}}
{{% tab "G1 ルート証明書 (旧)" %}}

`DigiCert Global Root CA`<br/>
**シリアルナンバー:** `08:3B:E0:56:90:42:46:B1:A1:75:6A:C9:59:91:C7:4A`<br/>
**SHA256 フィンガープリント:**

{{< code-block disable_copy="true" lang="text">}}
43:48:A0:E9:44:4C:78:CB:26:5E:05:8D:5E:89:44:B4:D8:4F:96:62:BD:26:DB:25:7F:89:34:A4:43:C7:01:61
{{< /code-block >}}

{{% /tab %}}

{{% tab "G1 ICA 証明書 (旧)" %}}
`DigiCert TLS RSA SHA256 2020 CA1`<br/>
**シリアルナンバー:** `06:D8:D9:04:D5:58:43:46:F6:8A:2F:A7:54:22:7E:C4`</br>
**SHA256 フィンガープリント:**

{{< code-block disable_copy="true" lang="text">}}
52:27:4C:57:CE:4D:EE:3B:49:DB:7A:7F:F7:08:C0:40:F7:71:89:8B:3B:E8:87:25:A8:6F:B4:43:01:82:FE:14
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

以下に変更になりました。

{{< tabs >}}
{{% tab "G2 ルート証明書 (新)" %}}
`DigiCert Global Root G2`</br>
**シリアルナンバー**: `03:3A:F1:E6:A7:11:A9:A0:BB:28:64:B1:1D:09:FA:E5`<br/>
**SHA1 フィンガープリント**: `DF:3C:24:F9:BF:D6:66:76:1B:26:80:73:FE:06:D1:CC:8D:4F:82:A4`</br>
**SHA256 フィンガープリント**:

{{< code-block lang="text" disable_copy="true">}}
CB:3C:CB:B7:60:31:E5:E0:13:8F:8D:D3:9A:23:F9:DE:47:FF:C3:5E:43:C1:14:4C:EA:27:D4:6A:5A:B1:CB:5F
{{< /code-block >}}

{{% /tab %}}

{{% tab "G2 ICA 証明書 (新)" %}}

`DigiCert Global G2 TLS RSA SHA256 2020 CA1`</br>
**シリアルナンバー**: `0c:f5:bd:06:2b:56:02:f4:7a:b8:50:2c:23:cc:f0:66`</br>
**SHA1 フィンガープリント**: `1B:51:1A:BE:AD:59:C6:CE:20:70:77:C0:BF:0E:00:43:B1:38:26:12`</br>

**SHA256 フィンガープリント:**
{{< code-block lang="text" disable_copy="true">}}
C8:02:5F:9F:C6:5F:DF:C9:5B:3C:A8:CC:78:67:B9:A5:87:B5:27:79:73:95:79:17:46:3F:C8:13:D0:B6:25:A9
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 影響を受けるドメイン

Datadog はすでに、新しい DigiCert G2 ルート CA によって署名された証明書を Web プロパティにデプロイし始めています。最終的には、すべての Datadog ドメインがこの新しい証明書によって署名される予定です。

## 必要な対応

Datadog のお客様のほとんどは何もする必要がありません。DigiCert G2 ルート証明書は、[2014 年にほとんどの Linux ディストリビューションで使用された][1] `ca-certificates` パッケージに追加されています。

特定の Datadog ドメインの証明書チェーンの一部または全部をピン留めしている場合、または古い CA トラストストアで [Agent Proxy 構成][2]を使用している場合、Datadog が G2 ルート証明書に切り替えるときに証明書検証エラーが発生することがあります。Datadog エンドポイントに特定の証明書をピン留めすることは推奨されません。

[`https://global-root-g2.chain-demos.digicert.com`][3] への接続を試行することで、構成をテストすることができます。証明書の検証エラーが発生しない場合、構成は新しい G2 ルート証明書を信頼し、G2 ルート証明書によって署名された Datadog サイトに接続することができます。

新しいルートと ICA を手動で追加する必要がある場合は、[DigiCert の Web サイトから DigiCert Trusted Root Authority Certificates をダウンロードする][4]ことができます。

[1]: https://changelogs.ubuntu.com/changelogs/pool/main/c/ca-certificates/ca-certificates_20211016ubuntu0.22.04.1/changelog
[2]: /ja/agent/configuration/proxy
[3]: https://global-root-g2.chain-demos.digicert.com
[4]: https://www.digicert.com/kb/digicert-root-certificates.htm