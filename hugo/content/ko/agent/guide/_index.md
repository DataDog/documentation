---
cascade:
  algolia:
    category: Guide
    rank: 70
    subcategory: Agent Guides
description: Datadog Agent 구성, 설치, 문제 해결 및 고급 기능에 대한 포괄적인 가이드 모음.
disable_toc: true
private: true
title: Agent 가이드
---
{{< header-list header="구성 가이드" >}}
    {{< nextlink href="agent/guide/setup_remote_config" >}}Fleet Automation용 Remote Configuration 설정{{< /nextlink >}}
    {{< nextlink href="agent/guide/environment-variables" >}}Agent 환경 변수{{< /nextlink >}}
    {{< nextlink href="agent/guide/datadog-disaster-recovery" >}}Datadog 재해 복구{{< /nextlink >}}
    {{< nextlink href="agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity" >}}인터넷 연결이 제한된 서버에 Agent 설치{{< /nextlink >}}
    {{< nextlink href="agent/guide/ansible_standalone_role/" >}}독립 실행형 Datadog 역할을 사용한 Ansible 설정{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-retry/" >}}Agent 재시도 및 버퍼링 로직 {{< /nextlink >}}
    {{< nextlink href="agent/guide/how-do-i-uninstall-the-agent" >}}Agent 제거 방법{{< /nextlink >}}
    {{< nextlink href="agent/guide/linux-key-rotation-2024" >}}2024 Linux 키 순환{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Windows 가이드" >}}
    {{< nextlink href="agent/guide/datadog-agent-manager-windows" >}}Windows용 Datadog Agent Manager{{< /nextlink >}}
    {{< nextlink href="agent/guide/windows-agent-ddagent-user" >}}Datadog Windows Agent 사용자{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="클라우드 인프라 가이드" >}}
    {{< nextlink href="agent/guide/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/" >}}Google Cloud SQL에서 dd-agent MySQL 검사를 설정할 수 있나요?{{< /nextlink >}}
    {{< nextlink href="/agent/guide/heroku-ruby" >}}Heroku에서 Datadog으로 Ruby on Rails 애플리케이션 계측하기{{< /nextlink >}}
    {{< nextlink href="agent/guide/heroku-troubleshooting/" >}}Datadog-Heroku Buildpack 문제 해결{{< /nextlink >}}
    {{< nextlink href="agent/guide/private-link" >}}AWS PrivateLink를 통해 텔레메트리 데이터를 Datadog으로 안전하게 전달하기{{< /nextlink >}}
    {{< nextlink href="agent/guide/azure-private-link" >}}Azure Private Link를 통해 Datadog에 연결하기{{< /nextlink >}}
    {{< nextlink href="agent/guide/why-should-i-install-the-agent-on-my-cloud-instances" >}}클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유{{< /nextlink >}}
    {{< nextlink href="agent/guide/gcp-private-service-connect" >}}GCP Private Service Connect를 통해 Datadog에 연결하기{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="통합 가이드" >}}
    {{< nextlink href="agent/guide/use-community-integrations" >}}커뮤니티 통합 사용하기{{< /nextlink >}}
    {{< nextlink href="agent/guide/integration-management" >}}통합 관리{{< /nextlink >}}
{{< /header-list >}}

{{< whatsnext desc="Agent 버전 관리 가이드:" >}}
    {{< nextlink href="agent/guide/version_differences" >}}Agent 버전 차이점{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_agent_fleet_automation" >}} Datadog Agent 업그레이드 {{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-v6-python-3" >}}Python 버전 관리: Datadog Agent v6에서 Python 3 사용{{< /nextlink >}}
    {{< nextlink href="agent/guide/python-3" >}}Python 2에서 3으로 사용자 지정 검사 마이그레이션{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 6 가이드" >}}
    {{< nextlink href="agent/guide/install-agent-6" >}}Agent 6 설치{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-commands" >}}Agent 6 명령{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-configuration-files" >}}Agent 6 구성 파일{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-log-files" >}}Agent 6 로그 파일{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_to_agent_6" >}}Agent 6으로 업그레이드{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 5 가이드" >}}
    {{< nextlink href="agent/guide/agent-5-architecture" >}}Agent 5 아키텍처{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-commands" >}}Agent 5 명령{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-configuration-files" >}}Agent 5 구성 파일{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-log-files" >}}Agent 5 로그 파일{{< /nextlink >}}
    {{< nextlink href="agent/guide/install-agent-5" >}}Agent 5 설치{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-ports" >}}Agent 5 포트{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-proxy" >}}Agent 5 프록시 구성{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-flare" >}}Agent 5 플레어 전송{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-autodiscovery" >}}Agent 5의 Autodiscovery{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-kubernetes-basic-agent-usage" >}}Agent 5의 Kubernetes 기본 Agent 사용{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-check-status" >}}Agent 5에서 Agent Check 문제 해결{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-permissions-issues" >}}Agent 5 권한 문제{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-debug-mode" >}}Agent 5 디버그 모드{{< /nextlink >}}
    {{< nextlink href="agent/guide/dogstream" >}}Dogstream{{< /nextlink >}}
{{< /header-list >}}