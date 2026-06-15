---
title: TLS 1.2 미만 버전 지원 중단 안내
---


## 개요

TLS(전송 계층 보안)은 웹 트래픽을 보호하는 데 사용되는 중요한 보안 프로토콜입니다. 본 프로토콜은 정보를 교환하는 클라이언트와 서버 간에 전송되는 데이터의 기밀성과 무결성을 보장합니다. Datadog은 2022년 6월 30일부터 공개용 Datadog 애플리케이션 전반의 1.2 이하(SSLv3, TLS v1.0, TLS v1.1)의 이전 버전 TLS에 대한 지원을 중단합니다. 이전 프로토콜이 비활성화된 후 지원되지 않는 클라이언트를 사용하여 Datadog에 연결하면 연결 오류 메시지가 표시됩니다.

### 지원 중단 이유

고객이 보안 연결 채널로 Datadog에 연결할 수 있도록 해당 프로토콜은 지원 중단됩니다. 이는 2021년 3월 25일부로 이러한 프로토콜을 지원 중단하기로 한 IETF(인터넷 엔지니어링 태스크포스)의 결정에 따른 것입니다.([https://datatracker.ietf.org/doc/rfc8996/][1])

## 클라이언트 호환성

[내 SSL 상태 API][2] 지침에 따라 원하는 클라이언트를 점검합니다.

## 브라우저 지원

최신 브라우저는 일정 기간 동안 TLS v1.2를 지원했습니다. "Can I use..." [호환성 매트릭스][3]를 참조하여 특정 브라우저와 버전에 영향을 미치는지 확인하세요.
## Agent 지원

### Agent v6 & v7

Agent v6 & v7 모든 버전은 TLS v1.2를 지원합니다.

### Agent v5

#### 패키지 또는 컨테이너화된 Agent v5

다음과 함께 설치된 Agent v5의 모든 버전은 TLS v1.2를 지원합니다.

* DEB/RPM 패키지
* Windows MSI 인스톨러
* 공식 컨테이너 이미지


#### Agent V5 소스 설치

[소스 설치 스크립트][4]로 설치하는 경우 Agent v5는 시스템에 Python 및 OpenSSL이 필요합니다. 그러므로 TLS v1.2의 지원은 시스템에 설치된 Python 및 OpenSSL의 버전에 따라 달라집니다.

시스템의 Python이 TLS v1.2를 지원하는지(따라서 소스가 설치된 Agent이 TLS v1.2를 지원하는지) 확인하려면 시스템 셸에서 다음 명령을 실행합니다.

`python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` 

이 명령은 TLS v1.2가 지원되는 경우 `TLS 1.2`, 그렇지 않으면 이전 TLS 버전 또는 오류를 출력합니다. TLS v1.2가 지원되지 않는 경우 시스템의 Python 및 OpenSSL을 업그레이드하거나 Agent를 v7으로 업그레이드하세요.

## 언어 및 도구 지원
### Openssl

OpenSSL은 Python, Ruby, PHP, amd Curl 등 여러 도구에서 사용되는 범용 암호화 및 보안 통신용 라이브러리입니다. TLS v1.2는 OpenSSL 1.0.1 버전부터 지원합니다. 자세한 내용은 [OpenSSL Changelog][5]를 참조하세요.

### Python

TLS v1.2 지원은 시스템에 설치된 Python 및 OpenSSL 버전에 따라 다릅니다.

* Python 3.4+(OpenSSL 1.0.1+를 사용하는 3.x 버전)
* Python 2.7.9+(OpenSSL 1.0.1+를 사용하는 2.x 버전)

Python 셸에서 `python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"`을 실행할 수 있습니다. TLS v1.2가 지원되지 않는 경우 시스템의 Python 및 OpenSSL을 업그레이드하세요.

### Golang

Go 최신 버전(1.13 이상)의 경우, 기본적으로 TLS v1.2를 지원하므로 변경할 필요가 없습니다.

Go 구버전의 경우, TLS 클라이언트 설정의 MinVersion으로 TLS v1.2를 명시적으로 사용하도록 지정합니다.

```
TLSClientConfig: &tls.Config{
        MinVersion: tls.VersionTLS12,
    }
```

### 자바(Java)

애플리케이션이 Java 1.7 또는 Java 1.6(업데이트 111 이상)에서 실행되는 경우, JVM을 시작할 때 `https.protocols` 시스템 속성을 설정하여 `HttpsURLConnection` 등급을 사용한 연결에 대한 추가 프로토콜을 활성화할 수 있습니다(예:`Dhttps.protocols=TLSv1.2`).

애플리케이션이 Java 1.6 업데이트 111 이전 버전인 경우, TLS 1.1 및 1.2가 지원되지 않습니다. 그러므로 애플리케이션이 실행되는 Java 버전을 업데이트해야 합니다.

### .NET

내장 .NET 클라이언트를 사용하는 경우, Microsoft 가이드에서 [다양한 버전의 .NET Framework에서 TLS v1.2로 업그레이드하는 방법][6]을 참고하세요.

### Powershell

Powershell TLS v1.2 지원은 시스템에 설치된 .NET 버전에 따라 달라집니다. 정확한 요구 사항을 확인하려면 Microsoft의 [.NET을 사용한 TLS 모범 사례][7] 지침을 참조하세요.

다음에 따라 현재 세션에 TLS 최신 버전을 사용하도록 설정합니다.

```
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls, TLs11, Tls12
```

Github에도 이 작업을 실행할 수 있는 [커뮤니티 Powershell 모듈][8]이 있습니다.

해당 설정을 지속적으로 유지하려면 Microsoft 문서에서 [Office 온라인 서버에서 TLS 사용][9] 지침에 따라 레지스트리를 편집합니다.

32비트 .Net Framework(버전 4 이상):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

64비트 .Net Framework(버전 4 이상):

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

**참고:** 본 기능을 적용하려면 시스템을 재부팅해야 합니다.

[1]: https://datatracker.ietf.org/doc/rfc8996/
[2]: https://www.howsmyssl.com/s/api.html
[3]: https://caniuse.com/tls1-2
[4]: https://github.com/DataDog/dd-agent/blob/5.32.8/packaging/datadog-agent/source/setup_agent.sh
[5]: https://www.openssl.org/news/changelog.html#openssl-101.
[6]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls#configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions
[7]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls
[8]: https://github.com/markekraus/BetterTls
[9]: https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server