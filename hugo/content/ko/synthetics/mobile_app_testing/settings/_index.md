---
aliases:
- /ko/mobile_testing/settings
- /ko/mobile_app_testing/settings
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: 설명서
  text: 모바일 테스트 생성 방법 알아보기
- link: /continuous_testing/cicd_integrations
  tag: 설명서
  text: CI 파이프라인에서 Synthetic 테스트 실행하기
is_beta: true
title: 모바일 애플리케이션 테스트 설정
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

[Synthetic Monitoring & Continuous Testing 설정 페이지][1]에서 업로드된 모바일 애플리케이션과 병렬 처리 설정을 관리하세요.

{{< img src="mobile_app_testing/applications_list_2.png" alt="모바일 애플리케이션 설정" style="width:100%;">}}

## 애플리케이션 생성 {#create-an-application}

모바일 애플리케이션을 추가하려면 [{{< ui >}}Mobile Applications List{{< /ui >}} 탭][5]으로 이동하여 {{< ui >}}\+ Create Application{{< /ui >}}을 클릭하세요.

{{< tabs >}}
{{% tab "Android" %}}

1. 모바일 애플리케이션의 OS로 {{< ui >}}Android{{< /ui >}}를 선택합니다.
2. 애플리케이션 개발에 사용된 프레임워크를 선택합니다. 지원되는 프레임워크는 네이티브 Android 프레임워크와 React Native입니다.
3. 모바일 애플리케이션의 이름을 지정합니다.
4. 모바일 애플리케이션에 `env` 태그와 추가 태그를 추가합니다. 이러한 태그를 사용하여 [Synthetic Monitoring & Continuous Testing 페이지][101]에서 모바일 앱 테스트를 필터링할 수 있습니다. 
5. 필요시 모바일 애플리케이션에 대한 설명을 입력합니다.
6. [`.apk` 파일][102]을 업로드합니다.
7. 모바일 애플리케이션 버전에 대한 이름을 입력합니다. 필요시 {{< ui >}}Mark this version as latest{{< /ui >}}를 선택하세요.
8. {{< ui >}}Create Application{{< /ui >}}을 클릭합니다.

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{< img src="mobile_app_testing/settings/mobile_app_settings_android.png" alt="Android 및 Native(기본값)가 선택된 상태로 모바일 앱 테스트를 생성" height="400px" >}}

{{% /tab %}}
{{% tab "iOS" %}}

1. 모바일 애플리케이션의 OS로 {{< ui >}}iOS{{< /ui >}}를 선택합니다.
2. 애플리케이션 개발에 사용된 프레임워크를 선택합니다. 지원되는 프레임워크는 네이티브 iOS 프레임워크와 React Native입니다.
3. 모바일 애플리케이션의 이름을 지정합니다.
4. 모바일 애플리케이션에 `env` 태그와 추가 태그를 추가합니다. 이러한 태그를 사용하여 [Synthetic Monitoring & Continuous Testing 페이지][101]에서 모바일 앱 테스트를 필터링할 수 있습니다. 
5. 필요시 모바일 애플리케이션에 대한 설명을 입력합니다.
6. `.ipa` 파일을 업로드합니다.
7. 모바일 애플리케이션 버전에 대한 이름을 입력합니다. 필요시 {{< ui >}}Mark this version as latest{{< /ui >}}를 선택하세요.
8. {{< ui >}}Create Application{{< /ui >}}을 클릭합니다.

[101]: https://app.datadoghq.com/synthetics/tests

{{< img src="mobile_app_testing/settings/mobile_app_settings_ios.png" alt="iOS 및 Native(기본값)가 선택된 상태로 모바일 앱 테스트를 생성" height="400px" >}}

{{% /tab %}}
{{< /tabs >}}

모바일 애플리케이션을 편집하거나 삭제하려면 {{< ui >}}Mobile Applications List{{< /ui >}}에서 모바일 애플리케이션 위로 마우스를 가져간 다음 해당 아이콘을 클릭하세요.

<div class="alert alert-info">
  <strong>참고</strong>: 2025년 7월부터 React Native 애플리케이션은 모바일 애플리케이션 테스트에서 공식적으로 지원됩니다. 공식 지원 이전에 업로드된 React Native 애플리케이션에 대해서는 별도의 조치가 필요하지 않습니다. 테스트는 예상대로 계속 실행됩니다. 모바일 애플리케이션 테스트는 Flutter 애플리케이션을 완전히 지원하지 않습니다.
</div>

## 애플리케이션 버전 관리 {#manage-application-versions}

{{< ui >}}Mobile Applications List{{< /ui >}}에서 모바일 애플리케이션을 클릭하면 해당 애플리케이션의 기존 버전이 표시됩니다. 버전 위로 마우스를 가져간 다음 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭하여 선택한 모바일 애플리케이션 버전으로 [모바일 앱 테스트][6]를 생성하세요.

모바일 애플리케이션의 버전을 편집하거나 삭제하려면 모바일 애플리케이션 내의 버전 위로 마우스를 가져간 다음 해당 아이콘을 클릭하세요.

### 버전 추가{#add-a-version}

기존 모바일 애플리케이션의 버전을 추가하려면 다음 단계를 따르세요.

1. {{< ui >}}Mobile Applications List{{< /ui >}}의 모바일 애플리케이션에서 {{< ui >}}\+{{< /ui >}} 아이콘 위로 마우스를 가져간 다음 {{< ui >}}Add new version{{< /ui >}}을 클릭합니다. 
2. [`.apk`][4] 또는 `.ipa` 파일을 업로드합니다.
3. 버전 이름을 입력합니다. 
4. 필요시 {{< ui >}}Mark this version as latest{{< /ui >}}를 선택합니다.
5. {{< ui >}}Add Version{{< /ui >}}을 클릭합니다.

{{< img src="mobile_app_testing/add_new_version.png" alt="모바일 애플리케이션의 새 버전 추가" style="width:50%;">}}

## 병렬 처리 사용자 지정{#customize-your-parallelization}

Synthetic 테스트 병렬 처리에 대한 자세한 내용은 [Continuous Testing 설정][7]을 참조하세요.



## 권한 {#permissions}

기본적으로 Datadog Admin 및 Datadog Standard 역할이 있는 사용자만 Synthetic Monitoring {{< ui >}}Applications List{{< /ui >}} 페이지에 액세스할 수 있습니다. {{< ui >}}Applications List{{< /ui >}} 페이지에 액세스하려면 사용자를 해당 두 [기본 역할][2] 중 하나로 업그레이드하세요. 

[사용자 지정 역할 기능][3]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요. 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/settings/
[2]: /ko/account_management/rbac/#datadog-default-roles
[3]: /ko/account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /ko/mobile_app_testing/mobile_app_tests/
[7]: /ko/continuous_testing/settings/