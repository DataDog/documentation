---
aliases:
- /ko/security_platform/guide/setting-up-security-monitoring-for-aws
- /ko/security_platform/cloud_siem/guide/setting-up-security-monitoring-for-aws
title: AWS용 Cloud SIEM 설정
---

## 개요

Datadog Cloud SIEM을 사용하면 처리된 모든 로그에 탐지 규칙이 적용됩니다. AWS 서비스 로그는 Datadog Lambda 함수를 통해 수집됩니다. 이 Lambda는 S3 버킷에서 트리거되고 로그를 Datadog에 전달합니다. 시작하려면 아래 설정 지침을 따르세요.

## 설정

1. Datadog 앱에서 [Security Configuration Setup 페이지][1]로 이동합니다.
2. **Cloud SIEM**을 선택합니다.
3. **Secure your cloud environment**에서 AWS를 선택합니다.
4. **Detect threats with cloud logs** 설정을 완료합니다.
5. (선택 사항) **Secure your hosts and containers** 설정을 완료합니다.
6. (선택 사항) **Detect threats in additional logging sources** 설정을 완료합니다.


[1]: https://app.datadoghq.com/security/configuration