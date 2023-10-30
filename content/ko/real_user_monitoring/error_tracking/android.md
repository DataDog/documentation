---
description: Android 애플리케이션 오류 추적 설정
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: 오류 추적
  text: 오류 추적 시작하기
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: 익스플로러에서 오류 추적 데이터 시각화
kind: 설명서
title: Android 충돌 보고 및 오류 추적
---

## 개요

오류 추적은 RUM Android SDK에서 수집된 오류를 처리합니다.

Android 충돌 보고 및 오류 추적을 활성화하면 실제 사용자 모니터링(RUM) 기능을 사용해 종합적인 충돌 보고서와 오류 동향을 확보할 수 있습니다. 다음에 액세스할 수 있습니다.

- 집계된 Android 충돌 대시보드 및 속성
- 난독화 해제된 Anroid 충돌 보고서
- Android 오류 추적 및 동향 분석

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

Android SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][2]을 따르거나 [Android RUM 설정 설명서][3]를 참조하세요.

1. 최신 버전의 [RUM Android SDK][4]를 Gradle 종속성에 추가하세요.
2. [SDK를 초기화할 때][5] 애플리케이션의 `env` 및 `variant`을 설정하세요.
3. 난독화 해제된 스택 트레이스에 액세스하려면 Gradle 태스크를 실행하여 Proguard/R8 매핑 파일을 Datadog에 업로드하세요. 

관련 스택 트레이스의 각 프레임에 대한 파일 경로, 줄 번호 및 코드 스니펫에 액세스하여 오류를 확인할 수 있습니다.

## 매핑 파일 업로드

**참고**: 소스 맵을 다시 업로드할 때 버전이 변경되지 않으면 이전 소스 맵을 다시 쓰지 않습니다.

{{< tabs >}}
{{% tab "US" %}}

1. 다음 코드 스니펫을 사용해 [Android Gradle 플러그인][1]을 Gradle 프로젝트에 추가하세요.

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [전용 Datadog API 키를 생성하고][2] `DD_API_KEY` 또는 `DATADOG_API_KEY`라는 이름의 환경 변수로 내보내기하세요. 대신, 작업 속성으로 전달하거나 프로젝트 루트에 `datadog-ci.json` 파일이 있는 경우 `apiKey` 속성에거 가져올 수 있습니다.
3. 또는 `build.gradle` 스크립트에서 플러그인을 설정하여 유럽연합 지역에 파일을 업로드하도록 플러그인을 설정할 수 있습니다.

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. 난독화된 APK 빌드 이후 업로드 작업을 실행하세요.

   ```bash
   ./gradlew uploadMappingRelease
   ```

**참고**: 프로젝트에서 추가 작업을 사용하는 경우 플러그인은 난독화가 활성화된 각 변형에 대해 작업 업로드를 제공합니다. 이 경우 적절한 변형 이름으로 RUM Android SDK를 초기화하세요(필수 API는 버전 `1.8.0` 이상에서 사용할 수 있음).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

{{% /tab %}}
{{% tab "EU" %}}
1. 다음 코드 스니펫을 사용해 [Android Gradle 플러그인][1]을 Gradle 프로젝트에 추가하세요.

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [전용 Datadog API 키를 생성하고][2] `DD_API_KEY` 또는 `DATADOG_API_KEY`라는 이름의 환경 변수로 내보내기하세요. 대신, 작업 속성으로 전달하거나 프로젝트 루트에 `datadog-ci.json` 파일이 있는 경우 `apiKey` 속성에거 가져올 수 있습니다.
3. 앱의 `build.gradle` 스크립트 파일에서 다음 스니펫을 추가해 EU 지역에서 사용할 플러그인을 설정하세요.

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. 난독화된 APK 빌드 이후 업로드 작업을 실행하세요.

   ```bash
   ./gradlew uploadMappingRelease
   ```

**참고**: 프로젝트에서 추가 작업을 사용하는 경우 플러그인은 난독화가 활성화된 각 변형에 대해 작업 업로드를 제공합니다. 이 경우 적절한 변형 이름으로 RUM Android SDK를 초기화하세요(필수 API는 버전 `1.8.0` 이상에서 사용할 수 있습니다.).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

{{% /tab %}}
{{< /tabs >}}

### 플러그인 설정 옵션

플러그인 확장을 통해 설정할 수 있는 플러그인 속성에는 여러 가지가 있습니다. 여러 변형을 사용하는 경우 변형에서 특정 작업에 대한 속성 값을 설정할 수 있습니다. 

예를 들어, `fooBarRelease` 변형의 경우 다음 설정을 사용할 수 있습니다.

```groovy
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

이 변형에 대한 작업 설정은 다음 순서로 제공된 세 개의 모든 작업 설정을 병합한 것입니다.

1. `bar`
2. `foo`
3. `fooBar`

이는 `fooBar`인 `versionName` 속성에 대한 최종 값을 확인합니다.

| 속성 이름              | 설명                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | 애플리케이션 버전 이름(기본적으로 `build.gradle` 스크립트의 `android` 블록에서 정의한 버전)입니다.                                                                                                               |
| `serviceName`              | 애플리케이션의 서비스 이름(기본적으로 `build.gradle` 스크립트의 `android` 블록에서 정의된 애플리케이션 패키지 이름)입니다.                                                                                                                          |
| `site`                     | (US1, US3, US5, EU1, US1_FED, 또는 AP1)에 데이터를 업로드할 Datadog 사이트입니다.                                                                                                                                       |
| `remoteRepositoryUrl`      | 원격 리포지토리 URL로 소스 코드가 배포되는 것입니다. 제공되지 않는 경우 이 값은 작업 실행 시간 동안 Git 설정에서 확인됩니다.                     |
| `checkProjectDependencies` | 이 속성은 플러그인이 Datadog Android SDK이 종속성에 포함되어 있는지 확인하도록 제어합니다. 작동하지 않는 경우 "없음"은 무시되고 "경고"는 경고를 기록하며 "실패는"는 빌드에 오류가 있음(기본값)을 나타냅니다. |

### CI/CD 파이프라인과 통합

기본적으로 매핑 작업 업로드는 빌드 그래프에 있는 다른 작업과 독립적입니다. 매핑을 업로드해야 하면 수동으로 작업을 실행합니다.

CI/CD 파이프라인에서 이 작업을 실행하려 하고 빌드 그래프의 일환으로 작업이 필요한 경우, 업로드 작업을 설정해 매핑 파일이 설정된 후 실행되도록 할 수 있습니다.

예시:

```groovy
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```

## 한계

{{< site-region region="us,us3,us5,eu" >}}
매핑 파일은 **300**MB로 제한됩니다. 프로젝트에 이보다 큰 매핑 파일이 있는 경우 다음 옵션 중 하나를 사용해 파일 크기를 줄입니다.
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
매핑 파일은 **50**MB로 제한됩니다. 프로젝트에 이보다 큰 매핑 파일이 있는 경우 다음 옵션 중 하나를 사용해 파일 크기를 줄입니다.
{{< /site-region >}}

- `mappingFileTrimIndents` 옵션을 `true`로 설정합니다. 그러면 평균적으로 파일 크기가 5%로 줄어듭니다.
- `mappingFilePackagesAliases` 맵 설정: 이는 패키지 이름을 더 짧은 별칭으로 대체합니다. **참고**: Datadog 스택트레이스는 원본 패키지 이름 대신 동일한 별칭을 사용하므로 타사 종속성을 위해 이 옵션을 사용하는 것이 더 좋습니다.

```groovy
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ko/real_user_monitoring/android/#setup
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /ko/real_user_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters