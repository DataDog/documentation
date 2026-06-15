---
title: Datadog의 TLS 인증서 신뢰 체인 변경 사항
---

## 개요

2023년 4월 5일에 Datadog 인증서에 서명하는 데 사용되는 루트 인증 기관(CA) 및 중간 인증 기관(ICA)이 다음과 같이 변경되었습니다.

{{< tabs >}}
{{% tab "G1 root certificate (old)" %}}

`DigiCert Global Root CA`<br/>
**일련 번호:** `08:3B:E0:56:90:42:46:B1:A1:75:6A:C9:59:91:C7:4A`<br/>
**SHA256 지문:**

{{< code-block disable_copy="true" lang="text">}}
43:48:A0:E9:44:4C:78:CB:26:5E:05:8D:5E:89:44:B4:D8:4F:96:62:BD:26:DB:25:7F:89:34:A4:43:C7:01:61
{{< /code-block >}}

{{< /tabs >}}

{{% tab "G1 ICA certificate (old)" %}}
`DigiCert TLS RSA SHA256 2020 CA1`<br/>
**일련 번호:** `06:D8:D9:04:D5:58:43:46:F6:8A:2F:A7:54:22:7E:C4`</br>
**SHA256 지문:**

{{< code-block disable_copy="true" lang="text">}}
52:27:4C:57:CE:4D:EE:3B:49:DB:7A:7F:F7:08:C0:40:F7:71:89:8B:3B:E8:87:25:A8:6F:B4:43:01:82:FE:14
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

대상:

{{< tabs >}}
{{% tab "G2 root certificate (new)" %}}
`DigiCert Global Root G2`</br>
**일련 번호**: `03:3A:F1:E6:A7:11:A9:A0:BB:28:64:B1:1D:09:FA:E5`<br/>
**SHA1 지문**: `DF:3C:24:F9:BF:D6:66:76:1B:26:80:73:FE:06:D1:CC:8D:4F:82:A4`</br>
**SHA256 지문**:

{{< code-block lang="text" disable_copy="true">}}
CB:3C:CB:B7:60:31:E5:E0:13:8F:8D:D3:9A:23:F9:DE:47:FF:C3:5E:43:C1:14:4C:EA:27:D4:6A:5A:B1:CB:5F
{{< /code-block >}}

{{< /tabs >}}

{{% tab "G2 ICA certificate (new)" %}}

`DigiCert Global G2 TLS RSA SHA256 2020 CA1`</br>
**일련 번호**: `0c:f5:bd:06:2b:56:02:f4:7a:b8:50:2c:23:cc:f0:66`</br>
**SHA1 지문**: `1B:51:1A:BE:AD:59:C6:CE:20:70:77:C0:BF:0E:00:43:B1:38:26:12`</br>

**SHA256 지문:**
{{< code-block lang="text" disable_copy="true">}}
C8:02:5F:9F:C6:5F:DF:C9:5B:3C:A8:CC:78:67:B9:A5:87:B5:27:79:73:95:79:17:46:3F:C8:13:D0:B6:25:A9
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 대상 도메인

Datadog는 이미 웹 속성에서 새로운 DigiCert G2 root CA로 서명된 인증서 배포를 시작했습니다. 결국 모든 Datadog 도메인이 이 새로운 인증서로 서명됩니다.

## 필요한 작업

대부분의 Datadog 고객은 아무 것도 할 필요가 없습니다. DigiCert G2 루트 인증서는 `ca-certificates` 패키지에 추가되어 있으며 해당 패키지는 [2014년 대부분의 리눅스(Linux) 배포에서 사용되었습니다][1].

특정 Datadog 도메인에 대한 인증서 체인의 일부 또는 전부를 고정하거나 오래된 CA 신뢰 저장소와 함께 [에이전트 프록시 설정][2]을 사용하는 경우 Datadog가 G2 루트 인증서로 전환 시 인증서 유효성 검사 오류가 발생할 수 있습니다. Datadog 엔드포인트에 대해 특정 인증서를 고정하는 것은 권장되지 않습니다.

`https://global-root-g2.chain-demos.digicert.com`[3]에 연결을 시도하여 설정을 테스트할 수 있습니다. 인증서 유효성 검사 오류가 발생하지 않는 경우 설정에서 새 G2 루트 인증서를 신뢰하므로 G2 루트 인증서로 서명된 Datadog 사이트에 연결할 수 있습니다.

새로운 루트 및 ICA를 직접 추가해야 하는 경우 [DigiCert 웹 사이트에서 DigiCert 신뢰 루트 인증 기관 인증서를 다운로드할 수 있습니다][4].

[1]: https://changelogs.ubuntu.com/changelogs/pool/main/c/ca-certificates/ca-certificates_20211016ubuntu0.22.04.1/changelog
[2]: /ko/agent/configuration/proxy
[3]: https://global-root-g2.chain-demos.digicert.com
[4]: https://www.digicert.com/kb/digicert-root-certificates.htm