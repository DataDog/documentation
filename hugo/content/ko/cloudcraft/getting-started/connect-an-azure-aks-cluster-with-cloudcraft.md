---
title: Azure AKS 클러스터를 Cloudcraft와 연결하기
---

Azure AKS 클러스터를 스캔하여 시스템 아키텍처 다이어그램을 생성해 배포된 워크로드 및 포드를 시각화하도록 도와줍니다.

Cloudcraft는 Azure의 Kubernetes 서비스 클러스터 사용자 역할을 사용하며, 특별한 소프트웨어나 Agent 없이도 클러스터 내부를 살펴볼 수 있습니다.

<div class="alert alert-info">Azure AKS 클러스터 및 Azure 계정을 스캔하는 기능은 Cloudcraft Pro 구독자만 사용할 수 있습니다. 자세한 내용은 <a href="https://www.cloudcraft.co/pricing">Cloudcraft 요금 페이지</a>를 참조하세요.</div>

## 사전 필수 조건

Azure AKS 클러스터를 Cloudcraft와 연결하기 전에 Azure 계정을 연결하고 클러스터를 포함하는 다이어그램을 생성해야 합니다. 자세한 내용은 [Cloudcraft에 Azure 계정 연결하기][1]를 참조하세요.

## Cloudcraft IAM 사용자에게 보기 전용 액세스 권한 부여하기

기존 Azure AKS 클러스터로 블루프린트를 열거나 **Auto Layout** 기능으로 새 블루프린트를 생성합니다.

Azure 환경을 블루프린트에 매핑한 상태에서 스캔하려는 Azure AKS 클러스터를 선택하고 구성 요소 도구 모음에 표시된 **Enable cluster scanning** 버튼을 클릭합니다.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Enable cluster scanning 버튼이 강조 표시된 Azure AKS를 보여주는 인터렉티브 Cloudcraft 다이어그램." responsive="true" style="width:100%;">}}

다음 화면에서 Azure에서 완료해야 하는 단계별 지침을 안내합니다.

1. 첫 번째 링크를 클릭하여 Azure Subscriptions 페이지를 연 다음 왼쪽 사이드바에서 **Access control(IAM)**을 클릭합니다.
2. **Add**를 클릭하고 **Add role assignment**를 선택합니다.
3.  **Azure Kubernetes 서비스 클러스터 사용자 역할**을 검색하여 선택한 후 **Next**를 클릭합니다.
4. **Select members**를 클릭합니다.
5. Azure AKS 클러스터 액세스 권한을 부여할 IAM 사용자를 검색하고(보통 Cloudcraft라는 이름) **Select**를 클릭합니다.
6. **Review + assign**을 두 번 클릭하여 프로세스를 완료합니다.

## 클러스터 액세스 테스트

Cloudcraft가 클러스터에 액세스할 수 있는지 테스트하려면 **Enable Kubernetes Cluster Scanning** 화면 하단의 **Test cluster access**를 클릭합니다.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/test-cluster-access.png" alt="지침 및 Test Cluster Access 버튼이 포함된 Cloudcraft Enable Kubernetes Cluster Scanning 인터페이스의 스크린샷." responsive="true" style="width:100%;">}}

[1]: /ko/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/