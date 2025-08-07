---
app_id: podman
categories:
- 컨테이너
custom_kind: 통합
description: Datadog로 Podman 컨테이너 메트릭 모두 추적하기
integration_version: 1.0.0
media: []
supported_os:
- linux
title: Podman
---
[Podman](https://podman.io/) is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode.

## 개요

Podman container runtime is supported by the [container Agent check](https://docs.datadoghq.com/integrations/container/).
This check reports a set of metrics on any running containers, regardless of the runtime used to start them.

**참고**: `container` 점검은 컨테이너 런타임과 관계 없이 시스템에 있는 모든 컨테이너의 표준 메트릭을 보고합니다.

## 설정

### 설치

To monitor containers managed by [Podman](https://podman.io/), see the [installation instructions](https://docs.datadoghq.com/integrations/container/#setup) for the [container Agent check](https://docs.datadoghq.com/integrations/container/).

## 수집한 데이터

### Metrics

See [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv) for a list of metrics provided by this integration.

## 트러블슈팅

Need help? Contact [Datadog support](https://podman.io/).