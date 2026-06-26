---
title: Confluence 앱으로 Cloudcraft 다이어그램 내장하기
---

본 문서에서는 Cloudcraft의 Confluence 앱을 사용하여 현 Cloudcraft 다이어그램을 Confluence 페이지에 원활하게 통합하는 프로세스를 알아봅니다.

이 프로세스를 활용하면 인증된 사용자에게 개별 Cloudcraft 구독 없이도 다이어그램 액세스 권한을 부여하면서 중앙 집중식 최신 버전 인프라스트럭처 문서도 제공할 수 있습니다.

## 앱 설치하기

Cloudcraft의 Confluence 애플리케이션을 설치하려면, 관리자로 Confluence에 로그인하여 [Cloudcraft 마켓플레이스 목록][1]으로 이동한 후 **Get it now**를 클릭합니다.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/marketplace-listing.png" alt="Atlassian 마켓플레이스의 Cloudcraft 앱." responsive="true" style="width:100%;">}}

## 앱 사용

Confluence 페이지를 연 상태에서 **/cloudcraft**를 입력한 후 표시되는 애플리케이션 명령을 클릭합니다.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/embed-command.png" alt="Confluence 문서에 다이어그램을 내장하기 위한 Cloudcraft 통합 도구." responsive="true" style="width:100%;">}}

그런 다음 **로그인**을 클릭하여 Cloudcraft 계정에 로그인합니다.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/signin-or-signup.png" alt="Datadog, Google 또는 이메일로 로그인하는 옵션이 있는 Confluence 통합용 Cloudcraft 로그인 페이지." responsive="true" style="width:100%;">}}

로그인하면 다이어그램 선택기가 표시됩니다. 목록에서 내장하려는 다이어그램을 선택합니다.

<div class="alert alert-info">또한 다이어그램 선택기에서 다이어그램을 검색, 필터링, 정렬할 수 있습니다.</div>

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/blueprint-picker.png" alt="클라우드 아키텍처 청사진을 스테이징 및 프로덕션 환경용 레이블이 지정된 다이어그램이 포함된 Confluence 페이지에 삽입하는 옵션을 나타내는 Cloudcraft Confluence 앱." responsive="true" style="width:100%;">}}

다이어그램을 선택하면 내장된 다이어그램의 미리 보기가 Confluence 페이지에 표시됩니다. 여기서 창 크기 메뉴에서 선택하여 다이어그램의 너비를 조정하거나, 연필 아이콘을 클릭하여 다이어그램 선택기를 다시 열 수도 있습니다.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/window-size-menu.png" alt="Confluence 페이지에 내장된 EC2 인스턴스, 로드 밸런서, RDS 데이터베이스를 포함하는 Cloudcraft 클라우드 인프라스트럭처 레이아웃의 등축도법 보기." responsive="true" style="width:100%;">}}

Confluence 페이지를 퍼블리싱하거나 미리 볼 때 Cloudcraft 다이어그램이 페이지에 완전히 내장됩니다.

내장된 다이어그램은 Confluence 사용자 계정에서만 볼 수 있으며, Confluence 페이지의 공개 URL에 액세스할 때는 표시되지 않습니다.

[1]: https://marketplace.atlassian.com/apps/1233281/cloudcraft-aws-and-azure-cloud-diagrams-for-confluence?hosting=cloud&tab=overview