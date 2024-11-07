---
aliases:
- /ko/developers/marketplace/offering
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/create_a_tile.md
description: 통합 타일 개발 및 게시 방법 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: 블로그
  text: Datadog 마켓플레이스를 통해 모니터링 도달 범위 확대
- link: /developers/integrations/marketplace_offering
  tag: 설명서
  text: Datadog 마켓플레이스에서 제공 상품/서비스 생성
title: 타일 생성
type: 설명서
---
## 개요

이 페이지에서는 기술 파트너에게 **통합** 또는 **마켓플레이스** 페이지에 표시되는 제품/서비스 타일을 만드는 과정을 안내합니다.

## 통합 타일

타일은 고객이 제품/서비스를 알아보고 설치 지침을 확인하며 제품/서비스를 설치하거나 구매하여 바로 사용 가능한 대시보드와 추가 자산을 활용하기 위한 진입 지점 역할을 합니다.

{{< img src="developers/integrations/marketplace_or_integrations_tile.png" alt="마켓플레이스 또는 통합 페이지에서 예시 제품/서비스를 보여주는 확장된 타일 모달" style="width:100%" >}}

* API 기반 통합, 전문 서비스 등록 항목, 소프트웨어 라이선스를 포함해  Datadog 에이전트를 **사용하지 않는** 제품/서비스의 경우, 제품/서비스를 게시하기 위해 타일을 만들고 타일 관련 파일을 제출하기만 하면 됩니다. 이 방식은 _타일 전용 리스팅_이라고 부릅니다. 타일 전용 리스팅은 Datadog가 API 기반 통합과 연결된 코드를 호스트하지 않고 기타 지원되는 제품/서비스 유형이 코드를 필요로 하지 않는 경우 적용됩니다.

* **에이전트 기반 통합**의 경우 타일을 생성해야 하며 추가로 모든 통합 관련 코드와 타일 관련 파일을 하나의 풀 요청으로 제출해야 합니다. 자세한 내용은 [에이전트 기반 통합 생성][27]을 참조하세요.

<div class="alert alert-info">통합 또는 마켓플레이스 페이지에서 타일을 생성하기 위한 지침을 보려면 탭을 선택하세요.</div>

{{< tabs >}}

{{% tab "통합 페이지에서 타일 빌드" %}}

{{< img src="developers/integrations/integration_tile.png" alt="통합 페이지에서 예시 제공 내역을 표시하는 타일" style="width:25%" >}}

[**통합** 페이지][103]에서 타일을 빌드하는 방법:

<div class="alert alert-warning">에이전트 통합 단계를 이미 완료했거나 스캐폴딩을 빌드한 경우 <a href="#complete-the-necessary-integration-asset-files">핈 통합 자산 파일 완료로 바로 건너뛸 수 있습니다</a>. 
</div>

1. `dd` 디렉토리를 생성합니다:

   ```shell
   mkdir $HOME/dd
   ```

   Datadog 개발 툴킷을 사용해 `$HOME/dd/` 디렉터리에서 작업하는 것이 좋습니다. 필수는 아니지만 다른 디렉터리에서 작업하는 경우 추가 설정 단계가 필요할 수 있습니다.

2. `integrations-extras` 리포지토리 복제:

   ```shell
   git clone git@github.com:DataDog/integrations-extras.git
   ```

## Datadog 개발 툴킷 설치 및 구성

에이전트 통합 개발자 도구를 사용하면 통합 타일 자산과 메타데이터의 스켈레톤을 생성하여 통합을 개발할 때 스캐폴딩을 생성할 수 있습니다. 도구 설치 방법에 대한 지침은 [Datadog 에이전트 통합 개발자 도구][101]를 참조하세요.

에이전트 통합 개발자 도구를 설치한 경우 `integrations-extras` 리포지토리에 대해 설정할 수 있습니다.

`integrations-extras`를 기본 작업 리포지토리로 설정합니다:

```shell
ddev config set extras $HOME/dd/integrations-extras
ddev config set repo extras
```

`$HOME/dd` 외 디렉터리를 사용하여 `integrations-extras` 디렉터리를 복제하는 경우 다음 명령을 사용해 작업 리포지토리를 설정할 수 있습니다.

```shell
ddev config set extras <PATH/TO/INTEGRATIONS_EXTRAS>
ddev config set repo extras
```

## 통합 타일 스캐폴딩 채우기

[통합 페이지][102]에서 바로 사용 가능한 Datadog API 통합의 경우 Datadog 개발 툴킷을 사용해 타일 전용 리스팅에 대한 스캐폴딩을 생성할 수 있습니다.

1. `integrations-extras` 디렉터리 내부에 있는지 확인하세요.

   ```shell
   cd $HOME/dd/integrations-extras
   ```

1. `-t tile` 옵션을 통해 `ddev` 명령을 실행하세요.

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://docs.datadoghq.com/ko/developers/integrations/python
[102]: https://github.com/Datadog/integrations-extras
[103]: https://app.datadoghq.com/integrations

{{< /tabs >}}

{{% tab "마켓플레이스에서 타일 빌드" %}}

{{< img src="developers/integrations/marketplace_tile.png" alt="마켓플레이스 페이지에서 예시 제품/서비스를 표시하는 타일" style="width:25%" >}}

[**마켓플레이스** 페이지][104]에서 타일을 빌드하는 방법:

<div class="alert alert-warning">에이전트 통합 단계를 이미 완료했거나 스캐폴딩을 빌드한 경우 <a href="#complete-the-necessary-integration-asset-files">핈 통합 자산 파일 완료로 바로 건너뛸 수 있습니다</a>. 
</div>

1. [마켓플레이스 오퍼링 구축][102]을 참조하여 [마켓플레이스 리포지토리][101]에 대한 액세스를 요청하세요.

1. `dd` 디렉토리를 생성합니다:

   ```shell
   mkdir $HOME/dd
   ```

   Datadog 개발 툴킷은 사용자가 `$HOME/dd/` 디렉토리에서 작업할 것으로 예상합니다. 필수는 아니지만 다른 디렉토리에서 작업하려면 추가 설정 단계가 필요합니다.

1. 마켓플레이스 리포지토리에 대한 액세스 권한이 부여되면 `dd` 디렉토리를 생성하고 `marketplace` 리포지토리를 복제합니다:

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

1. 작업할 기능 브랜치를 만듭니다:

    ```shell
    git switch -c <YOUR INTEGRATION NAME> origin/master
    ```

## Datadog 개발 툴킷 설치 및 구성

에이전트 통합 개발자 도구를 사용하면 통합 타일의 에셋 및 메타데이터의 골격을 생성하여 통합을 개발할 때 스캐폴딩을 만들 수 있습니다. 도구 설치에 대한 자세한 내용은 [Datadog 에이전트 통합 개발자 도구 설치하기][102]를 참조하세요.

에이전트 통합 개발자 도구를 설치한 경우 `marketplace` 리포지토리에 대해 설정하세요. 

`marketplace`를 기본 작업 리포지토리로 설정합니다:

```shell
ddev config set marketplace $HOME/dd/marketplace
ddev config set repo marketplace
```

`marketplace` 디렉토리 복제를 위해 `$HOME/dd` 이외의 다른 디렉토리를 사용한 경우 다음 명령을 사용하여 작업 리포지토리를 설정하세요:

```shell
ddev config set marketplace <PATH/TO/MARKETPLACE>
ddev config set repo marketplace
```

## 통합 타일 스캐폴딩 채우기

Datadog 개발 툴킷을 사용해 타일 전용 리스팅에 대한 스캐폴딩을 생성하세요.

타일 전용 리스팅의 스캐폴딩을 생성하는 방법:

1. `marketplace` 디렉터리 내부에 있는지 확인하세요.

   ```shell
   cd $HOME/dd/marketplace
   ```

2. `-t tile` 옵션을 사용해 `ddev` 명령을 실행하세요.

   ```shell
   ddev create -t tile "<Offering Name>"
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/ko/developers/integrations/python
[104]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

## 필수 통합 자산 파일을 완료하세요.

통합에 대한 다음 필수 자산이 완료되었는지 확인하세요.

{{% integration-assets %}}

### 추가 정보

`README.md` 파일을 생성하면, 다음 섹션을 H2(`##`)로 추가하고 이에 따라 내용을 작성합니다.

| 헤더 이름 | 헤더 |
|-------------|--------|
| 개요 | 제품/서비스가 사용자에게 제공하는 가치와 혜택을 설명하는 `## Overview` 헤더 아래 설명을 작성합니다. 예를 들어, 바로 사용 가능한 대시보드, 사용자 세션 다시 재생, 로그, 알림 등이 있습니다. <br><br>이 정보는 타일의 **개요** 탭에 표시됩니다. |
| 설정 | 제품/서비스 설치에 필요한 단계를 모두 포함하되 제품/서비스 정보는 H3 헤딩(`###`)으로 구분합니다.<br>일반적인 주제는 다음을 포함합니다.<br><br>-인앱 통합 타일을 사용하여 통합 설치 <br>-Datadog 조직에서 적합한 역할과 권한에 따라 통합 구성 <br>- 통합을 구매하고 설치한 사용자가 액세스할 수 있는 바로 사용 가능한 Datadog 기능 액세스(메트릭, 이벤트, 모니터, 로그, 대시보드 등)|
| 삭제 | 제품/서비스를 삭제하기 위한 모든 단계를 포함합니다. 이 정보는 타일의 **설정** 탭에 표시됩니다.|
| 수집한 데이터  | 통합에서 수집한 데이터 유형을 지정합니다(해당 경우). 데이터 유형에는 메트릭, 이벤트, 서비스 점검 및 로그가 포함될 수 있습니다. `metadata.csv` 파일에 추가된 메트릭은 자동으로 이 탭에 표시됩니다. <br><br>제품/서비스가 이 데이터를 제공하지 않으면 수집된 데이터 섹션을 추가할 필요가 없습니다. |
| 지원팀 | 지원팀에 보내는 이메일, 기업 문서 또는 블로그 게시물에 대한 링크, 추가 도움말 정보를 글머리 기호 목록 형식으로 포함하는 연락처 정보를 제공합니다. |

### 미디어 캐러셀

미디어 캐러셀 이미지 및 비디오는 각 타일에 표시되어 사용자가 시각적 도구를 통해 제품/서비스의 가치와 기능을 더 잘 이해하도록 해줍니다. 타일에 비디오를 추가하려면 비디오의 사본이나 다운로드 링크를 <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>로 보냅니다. 마켓플레이스 팀이 비디오를 업로드하고 `manifest.json` 파일에 추가될 `vimeo_link`를 제공합니다.

#### 비디오

비디오는 다음 요구 사항을 충족해야 합니다.

| 비디오 요구 사항 | 설명                                                                           |
|--------------------|---------------------------------------------------------------------------------------|
| 유형               | MP4 H.264                                                                             |
| 크기               | 비디오 최대 크기는 1GB입니다.                                                        |
| 규격         | 가로 세로 비율은 정확히 16:9로 해상도는 1920x1080 이상이어야 합니다. |
| 이름               | 비디오 파일 이름은 `partnerName-appName.mp4`이어야 합니다.                                |
| 비디오 길이       | 최대 비디오 길이는 60초입니다.                                               |
| 설명        | 최대 허용 글자는 300자입니다.                                      |

#### 이미지

기술 파트너는 타일 미디어 캐러셀에 최대 8개 이미지(비디오를 포함하는 경우 7개)를 추가할 수 있습니다.

이미지는 다음 요구 사항을 충족해야 합니다.

| 이미지 요구 사항 | 설명                                                                                                                                       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| 유형               | `.jpg` 또는 `.png`                                                                                                                                 |
| 크기               | 평균 약 500KB가 지원됩니다. 최대 이미지 크기는 1MB입니다.                                                                                       |
| 규격         | 가로 세로 비율은 정확히 16:9여야 하며 다음 사양을 충족해야 합니다. <br><br> - 너비: 1440px<br>- 최소 높이: 810px<br>-최대 높이: 2560px |
| 이름               | 글자, 숫자, 밑줄 및 하이픈을 사용하세요. 공백을 사용하지 마세요.                                                                           |
| 색상 모드         | RGB                                                                                                                                               |
| 색상 프로필      | sRGB                                                                                                                                              |
| 설명        | 최대 허용 글자는 300자입니다.                                                                                                  |

이미지, 썸네일 및 비디오를 포함하는 `manifest.json` 파일에서 `media` 개체를 정의하기 위한 이 템플릿을 따르세요.

{{< code-block lang="json" filename="manifest.json" collapsible="true" >}}
"media": [
      {
        "media_type": "image",
        "caption": "Datadog 마켓플레이스 OOTB 통합 대시보드",
        "image_url": "images/integration_name_image_name.png"
      },
      {
        "media_type": "video",
        "caption": "Datadog 마켓플레이스 통합 개요 비디오",
        "image_url": "images/integration_name_video_thumbnail.png",
        "vimeo_id": 123456789
      },
    ],
{{< /code-block >}}

다음 정보의 경우 [통합 자산 참조][22]를 확인하세요.

## 풀 리퀘스트 열기

풀 리퀘스트를 열기 전에 다음 명령을 실행하여 통합 관련 문제를 파악하세요:

```
ddev validate all <INTEGRATION_NAME>
```

다음 단계를 완료하세요.

1. 기능 브랜치에 모든 변경 사항을 커밋하세요.
2. 원격 리포지토리에 변경 사항을 적용하세요.
3. [`marketplace`][18] 또는 [`integrations-extras`][26] 리포지토리에서 통합 타일의 자산 파일(이미지 포함)을 포함하는 풀 요청을 여세요.

풀 리퀘스트를 만든 후에는 자동 검사가 실행되어 풀 리퀘스트의 상태가 양호하고 업데이트에 필요한 모든 콘텐츠가 포함되어 있는지 확인합니다.

## 검토 프로세스

풀 요청이 모든 점검을 통과하면 `Datadog/agent-integrations`. `Datadog/ecosystems-review` 및 `Datadog/documentation` 팀의 검토자가 모범 사례를 제안하고 피드백을 제공합니다.

피드백을 적용하고 검토를 다시 요청한 경우, 해당 검토자가 풀 요청을 승인합니다. 샌드박스 계정에서 타일을 미리 보려면 마켓플레이스 팀에 연락하세요. 이 방법을 통해 타일이 모든 고객에게 표시되기 전 타일의 유효성을 검사하고 미리 볼 수 있습니다.

## 오류 트러블슈팅

`integrations-extras` 리포지토리에서 바로 사용 가능한 통합은 분기된 리포지토리가 유효하지 않은 경우 원본과 함께 오류 유효성 검사를 실행할 수 있습니다.

유효성 검사 오류를 해결하려면 GitHub 웹 앱에서 분기된 리포지토리를 업데이트하세요.

1. [GitHub][29]에서 분기된 `integrations-extras` 리포지토리로 이동하세요.
1. **분기 동기화**를 클릭한 다음 **브랜치 업데이트**를 클릭하세요.

변경 사항을 다시 지정하고 적용하는 방법:

1. 로컬 `master` 브랜치를 업데이트하세요.
   ```shell
   git checkout master
   git pull origin master
   ```
1. `master`를 기능 브랜치에 병합하세요.
   ```shell
   git checkout <your working branch>
   git merge master
   ```
1. 병합 충돌이 있는 경우 해결한 다음 `git push origin <your working branch>`를 실행하세요.

## 출시(GTM) 기회

Datadog는 마켓플레이스 리스팅에 한해 GTM 지원을 제공합니다. Datadog 마켓플레이스에 대해 더 자세히 알아보려면 [마켓 플레이스 제품/서비스 생성][28]을 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/marketplace/
[2]: https://docs.datadoghq.com/ko/developers/custom_checks/prometheus/
[3]: https://docs.datadoghq.com/ko/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[4]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[5]: https://docs.datadoghq.com/ko/api/latest/metrics/
[6]: https://docs.datadoghq.com/ko/logs/faq/partner_log_integration/
[7]: https://docs.datadoghq.com/ko/api/latest/events/
[8]: https://docs.datadoghq.com/ko/api/latest/service-checks/
[9]: https://docs.datadoghq.com/ko/tracing/guide/send_traces_to_agent_by_api/
[10]: https://docs.datadoghq.com/ko/api/latest/incidents/
[11]: https://docs.datadoghq.com/ko/api/latest/security-monitoring/
[12]: https://docs.datadoghq.com/ko/developers/integrations/
[13]: https://docs.datadoghq.com/ko/developers/#creating-your-own-solution
[14]: https://docs.datadoghq.com/ko/api/latest/
[15]: https://docs.datadoghq.com/ko/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/ko/developers/datadog_apps/
[17]: https://app.datadoghq.com/apps/
[18]: https://github.com/Datadog/marketplace
[19]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering/#request-access-to-marketplace
[20]: https://www.python.org/downloads/
[21]: https://pypi.org/project/datadog-checks-dev/
[22]: https://docs.datadoghq.com/ko/developers/integrations/check_references/#manifest-file
[23]: https://datadoghq.com/blog/
[24]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[25]: https://docs.datadoghq.com/ko/developers/integrations/python
[26]: https://github.com/Datadog/integrations-extras
[27]: https://docs.datadoghq.com/ko/developers/integrations/agent_integration/
[28]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering/
[29]: https://github.com/