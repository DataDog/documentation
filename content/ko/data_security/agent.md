---
aliases:
- /ko/agent/security/
description: Datadog 에이전트 보안 조치
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
kind: 설명서
title: 에이전트 데이터 보안
---

<div class="alert alert-info">이 페이지는 Datadog으로 전송되는 데이터의 보안에 관한 것입니다. 클라우드 및 애플리케이션 보안 제품 및 기능을 찾으려면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

로컬에 설치된 [에이전트][1] 또는 [HTTP API][2]를 통해 Datadog 서비스에 데이터를 전송할 수 있습니다. Datadog을 사용한다고 해서 꼭 Datadog 에이전트를 사용해야만 하는 것은 아니지만, 고객 대다수가 본 에이전트를 활용하고 있습니다. 본 문서에서는 환경의 보안성 확보를 위해 사용할 수 있는 주요 보안 기능 및 특성에 대해 설명합니다.

## 에이전트 배포

에이전트 공식 리포지토리 및 바이너리 패키지는 서명되어 있습니다. 다음 공개 키 중 하나의 서명을 확인하여 배포 채널을 인증합니다:

- Linux DEB 패키지 및 리포 메타데이터:
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][19]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Linux RPM 패키지 및 리포 메타데이터:
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][20]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Apple 인증서 지문 `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

데비안(Debian) 및 우분투(Ubuntu)에서 `datadog-agent` 패키지는 `datadog-signing-keys` 패키지에 관한 소프트 종속성을 가지므로, APT는 상기 키를 신뢰하게 됩니다. 패키지를 계속 업데이트하여 시스템의 서명 키를 최신 버전으로 유지합니다.

### Windows MSI

윈도우즈(Windows)에서 Datadog 에이전트 인스톨러 파일의 서명을 인증하려면 `Get-AuthenticodeSignature`의 출력값을 `FormatList`(`fl`)을 통해 파이핑하고 다음을 확인합니다:
- 상태가 유효합니다.
- 인증서의 서명자는 `Datadog, Inc`입니다.
- 발행자는 `DigiCert`입니다.

예를 들어, `ddagent-cli-7.49.1.msi` .msi 파일을 인증하려면:
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

명령의 출력값이 `A certificate chain could not be built to a trusted root authority`라면 DigiCert 루트 CA 업데이트를 해야 할 수도 있습니다. 

## 정보 보안

기본적으로 Datadog 에이전트는 TLS 암호화 TCP 연결을 통해 Datadog에 데이터를 전송합니다. 버전 6부터는 Datadog에 연결 시 최소 TLS 버전을 적용하도록 에이전트를 설정할 수 있습니다. 예를 들어, PCI 요구 사항을 충족하기 위해 강력한 암호화를 적용해야 한다면 에이전트 v6/7을 사용하고, 에이전트 설정 파일에서 `min_tls_version: 'tlsv1.2'`을 설정하거나 에이전트< 6.39.0/7.39.0을 `force_tls_12: true`로 설정합니다.

## 네트워킹 및 프록시

Datadog은 SaaS 프로덕트기 때문에 모니터링 데이터를 제출하려면 네트워크에서 공용 인터넷으로 아웃바운드 연결을 설정해야 합니다. 기본적으로 트래픽은 항상 Datadog TLS 암호화 TCP 연결에서 에이전트로 시작됩니다. Datadog에서 에이전트로 되돌아가는 세션은 시작되지 않습니다. 필요 Datadog 도메인 및 포트 목록화를 허용하는 방화벽을 설정하는 방법에 대한 자세한 내용을 확인하려면 에이전트의 [네트워크][7] 페이지를 참조하세요. 아울러, 공용 인터넷에 직접 연결되지 않거나 아웃바운드 트래픽이 제한된 상태에서 호스트를 모니터링하려면 [프록시][8]로 모니터링 데이터를 제출하는 것도 고려해 보세요.

## 에이전트 로그 난독화

Datadog 에이전트는 필요에 따라 [에이전트 트러블슈팅][9]을 지원할 목적으로 로컬 로그를 생성합니다. 보안 예방 조치로, 해당 로컬 로그는 잠재적 자격 증명을 나타내는 특정 키워드 및 패턴(예: API 키, 비밀번호, 토큰 키워드)을 필터링하며, 이후 디스크에 기록되기 전 난독화됩니다.

## 로컬 HTTPS 서버

에이전트 v6/7은 실행 중인 에이전트 및 에이전트 도구(예: `datadog-agent` 명령어) 간의 통신을 용이하게 할 목적으로 로컬 HTTPS API를 노출합니다. API 서버는 로컬 네트워크 인터페이스(`localhost/127.0.0.1`)에서만 액세스할 수 있으며, 인증은 에이전트를 실행할 수 있는 사용자만 읽을 수 있는 토큰을 통해 진행됩니다. 로컬 HTTPS API 통신 데이터는 `localhost`에서 감청되지 않도록 암호화됩니다.

## 에이전트 GUI

에이전트 v6/7은 기본 웹 브라우저에서 실행되는 그래픽 사용자 인터페이스(GUI) 기본 번들을 제공합니다. GUI는 사용자가 에이전트의 설정 파일을 열 수 있는 권한 등의 적법한 권한이 있는 경우에만 실행됩니다. GUI는 로컬 네트워크 인터페이스(`localhost/127.0.0.1`)에서만 액세스할 수 있습니다. 마지막으로, GUI는 GUI 서버와의 모든 통신을 인증하는 데 사용되는 토큰을 생성 및 저장하고 CSRF(사이트 간 요청 위조) 공격으로부터 사용자를 보호하기 때문에 사용자 쿠키를 반드시 활성화해야 합니다. 필요 시 GUI를 완전히 비활성화할 수도 있습니다.

## 에이전트 보안 검사

Datadog 취약점 관리 프로그램에는 핵심 지원 서비스 활성 스캔을 비롯하여 지원 인프라스트럭처 및 애플리케이션 구성 요소에 대한 정기 평가 작업이 포함됩니다. Datadog 보안 팀은 매월 스캔 작업을 수행하여 설정 및 소프트웨어 취약점을 식별하고,  Datadog 취약점 관리 정책에 따라 찾아낸 취약점 솔루션을 추적합니다.

특히 컨테이너 에이전트의 경우, Datadog은 [clair by CoreOS][10] 및 [snyk.io][11]를 사용하여 취약점 정적 분석을 정기적으로 수행합니다. 아울러, Datadog은 [도커(Docker) 신뢰 레지스트리][12]와 [레드햇(Red Hat) 컨테이너 카탈로그][13]에 대한 컨테이너 에이전트 릴리스의 일환로 보안 스캔 작업을 활용합니다. Datadog은 자사의 내부 취약성 관리 프로그램 외에도 컨테이너 보안 공급업체와도 협력합니다.

Datadog 보안 시스템에서 버그를 발견했다면 [security@datadoghq.com][14]로 신고해 주시기 바랍니다. 24시간 이내에 답변을 드리겠습니다. 당사와의 통신을 암호화해야 하는 경우 Datadog [PGP 키][15]를 다운로드하세요. 당사가 문제를 해결할 때까지 해당 문제를 비공개로 해 주실 것을 요청합니다.

## 권한 없는 사용자로 실행

에이전트는 기본적으로 Linux에서 `dd-agent` 사용자로, [윈도우즈(Windows)][16]에서 `ddagentuser` 계정으로 실행됩니다. 다음은 예외 사항입니다:

- `system-probe`은 Linux에서 `root`로, 윈도우즈(Windows)에서 `LOCAL_SYSTEM`로 실행됩니다.
- `process-agent`은 윈도우즈(Windows)에서 `LOCAL_SYSTEM`로 실행됩니다.
- `security-agent`은 Linux에서 `root`로 실행됩니다.

## 기밀 정보 관리

에이전트 설정 파일에 기밀 정보를 일반 텍스트로 저장해서는 안 될 경우 [기밀 정보 관리][17] 패키지를 활용하세요. 에이전트는 본 패키지를 통해 사용자가 제공한 실행 파일을 호출하여 기밀 정보를 검색 또는 해독한 후 이를 메모리에 로드합니다. 선호하는 키 관리 서비스, 인증 방법, 지속적인 통합 워크플로우에 따라 실행 파일을 설계할 수 있습니다.

자세한 내용을 확인하려면 [기밀 정보 관리][18] 문서를 참조하세요.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /ko/agent/faq/network/
[8]: /ko/agent/configuration/proxy/
[9]: /ko/agent/troubleshooting/
[10]: https://coreos.com/clair
[11]: https://snyk.io
[12]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides
[13]: https://access.redhat.com/containers
[14]: mailto:security@datadoghq.com
[15]: https://www.datadoghq.com/8869756E.asc.txt
[16]: /ko/agent/faq/windows-agent-ddagent-user/
[17]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md
[18]: /ko/agent/configuration/secrets-management/
[19]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[20]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public