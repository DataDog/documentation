---
description: 소스 코드 관리(SCM) 공급자 통합을 통해 Git 리포지토리를 Datadog에 연결합니다.
further_reading:
- link: /integrations/github/
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: /integrations/gitlab-source-code/
  tag: 설명서
  text: GitLab 소스 코드 통합에 대해 알아보기
- link: /integrations/azure-devops-source-code/
  tag: 설명서
  text: Azure DevOps 소스 코드 통합에 대해 알아보기
- link: /integrations/bitbucket/
  tag: 설명서
  text: Bitbucket 소스 코드 통합에 대해 알아보기
title: 소스 코드 관리 공급자
---
## 개요 {#overview}

대부분의 소스 코드 관련 기능을 사용하려면 Datadog의 자체 소스 코드 관리(SCM) 공급자 통합을 통해 Git 리포지토리를 Datadog에 연결해야 합니다. 리포지토리를 연결하면, Datadog은 리포지토리에 대한 반복적인 요청을 줄이고 기능 성능을 지원하기 위해 최대 7일 동안 리포지토리 콘텐츠를 저장할 수 있습니다.

## 소스 코드 관리 공급자 {#source-code-management-providers}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서는 GitLab 소스 코드 통합이 지원되지 않습니다({{< region-param key="dd_site_name" >}}). GovCloud에서는 소스 코드 연결을 위해 <a href="/integrations/github/">GitHub 통합</a>을 사용하세요.</div>
{{< /site-region >}}

Datadog은 아래 나열된 SCM 공급자에 대해 다음 기능을 지원합니다. 각 기능에 대한 자세한 사항은 [기능][1]을 참조하세요.

| 기능 | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **SaaS 인스턴스 연결** | 예 <br />(GitHub.com 및 GitHub Enterprise Cloud) | 예 <br />(GitLab.com) | 예 <br />(Azure DevOps Services) | 예 <br />(Bitbucket Cloud Premium) |
| **온프레미스 인스턴스 연결** | 예 <br />(GitHub Enterprise Server) | 예 <br />(GitLab Self-Managed 또는 Dedicated) | 아니요 <br />(Azure DevOps Server) | 아니요 <br />(Bitbucket Data Center 또는 Server)|
| **컨텍스트 링크** | 예 | 예 | 예 | 예 |
| **코드 스니펫** | 예 | 예 | 예 | 예 |
| **PR 코멘트** | 예 | 예 | 예 | 예 |

{{< tabs >}}
{{% tab "GitHub(SaaS 및 온프레미스)" %}}

<div class="alert alert-info">
GitHub 인스턴스의 리포지토리는 GitHub.com, GitHub Enterprise Cloud(SaaS) 및 GitHub Enterprise Server(온프레미스)에서 지원됩니다. GitHub Enterprise Server의 경우, 인스턴스가 인터넷에서 액세스 가능해야 합니다. 필요한 경우 <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog의 <code>webhooks</code> IP 주소</a>를 허용 목록에 추가하면 Datadog이 인스턴스에 연결하도록 허용할 수 있습니다.</br>인스턴스가 내부/사설 네트워크에서 호스팅되지만 공용 DNS 별칭을 통해 노출되는 경우(권장), 공용 호스트 이름을 사용하여 통합을 구성한 다음, <a href="/help">Datadog 지원팀에 문의</a>하며 공용 호스트 이름과 내부 호스트 이름을 모두 알려주어 호스트 이름 별칭을 활성화하세요.
</div>

[통합 타일][102]을 사용하거나 다른 Datadog 제품을 온보딩하는 동안 Datadog의 [GitHub 통합][101]을 설치하여 GitHub 리포지토리에 연결하세요.

[101]: https://docs.datadoghq.com/ko/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab(SaaS 및 온프레미스)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서는 GitLab 소스 코드 통합이 지원되지 않습니다({{< region-param key="dd_site_name" >}}). GovCloud에서는 소스 코드 연결을 위해 <a href="/integrations/github/">GitHub 통합</a>을 사용하세요.</div>
{{< /site-region >}}

<div class="alert alert-info">
GitLab 인스턴스의 리포지토리는 GitLab.com(SaaS) 및 GitLab Self-Managed/Dedicated(온프레미스) 모두에서 지원됩니다. GitLab Self-Managed의 경우, 인스턴스가 인터넷에서 액세스할 수 있어야 합니다. 필요한 경우 <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog의 <code>webhooks</code> IP 주소</a>를 허용 목록에 추가하면 Datadog이 인스턴스에 연결하도록 허용할 수 있습니다.</br>인스턴스가 내부/사설 네트워크에서 호스팅되지만 공용 DNS 별칭을 통해 노출되는 경우(권장), 공용 호스트 이름을 사용하여 통합을 구성한 다음, <a href="/help">Datadog 지원팀에 문의</a>하며 공용 호스트 이름과 내부 호스트 이름을 모두 알려주어 호스트 이름 별칭을 활성화하세요.
</div>

[통합 타일][102]을 사용하거나 다른 Datadog 제품을 온보딩하는 동안 Datadog의 [GitLab 소스 코드 통합][101]을 설치하여 GitLab 리포지토리에 연결하세요.

[101]: https://docs.datadoghq.com/ko/integrations/gitlab-source-code/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps(SaaS 전용)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서는 Azure DevOps 소스 코드 통합이 지원되지 않습니다({{< region-param key="dd_site_name" >}}). GovCloud에서는 소스 코드 연결을 위해 <a href="/integrations/github/">GitHub 통합</a>을 사용하세요.</div>
{{< /site-region >}}

<div class="alert alert-warning">
Azure DevOps 조직의 리포지토리는 Azure DevOps Services(SaaS)에서 지원됩니다. Azure DevOps Server(온프레미스)는 <strong>지원되지 않습니다</strong>.
</div>

[통합 타일][101]을 사용하거나 다른 Datadog 제품을 온보딩하는 동안 Datadog의 Azure DevOps 소스 코드 통합을 설치하여 Azure DevOps 리포지토리에 연결하세요.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Bitbucket(SaaS 전용)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서는 Bitbucket Cloud 소스 코드 통합이 지원되지 않습니다({{< region-param key="dd_site_name" >}}). GovCloud에서는 소스 코드 연결을 위해 <a href="/integrations/github/">GitHub 통합</a>을 사용하세요.</div>
{{< /site-region >}}

<div class="alert alert-warning">
Bitbucket 워크스페이스의 리포지토리는 Bitbucket Cloud(SaaS)에서 지원됩니다. Bitbucket Server 및 Bitbucket Data Center(온프레미스)는 <strong>지원되지 않습니다</strong>.
</div>

[통합 타일][101]을 사용하거나 다른 Datadog 제품을 온보딩하는 동안 Datadog의 [Bitbucket Cloud 소스 코드 통합][102]을 설치하여 Bitbucket Cloud 리포지토리에 연결하세요.

[101]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[102]: /ko/integrations/bitbucket/

{{% /tab %}}
{{% tab "기타 SCM 공급자" %}}

<div class="alert alert-danger">
자체 호스팅 인스턴스 또는 사설 URL의 리포지토리는 기본적으로 지원되지 않습니다. 이 기능을 활성화하려면 <a href="/help">지원팀에 문의</a>하세요.
</div>

다른 SCM 공급자를 사용하는 경우에도 텔레메트리를 소스 코드와 수동으로 연결할 수 있습니다. 이렇게 하려면 [`datadog-ci git-metadata upload`][1] 명령을 사용하여 리포지토리 메타데이터를 업로드하세요. `datadog-ci v2.10.0` 이상이 필요합니다.

Git 리포지토리 내에서 `datadog-ci git-metadata upload`를 실행하면 Datadog은 리포지토리 URL, 현재 브랜치의 커밋 SHA, 추적된 파일 경로 목록을 수신합니다.

Datadog와 동기화해야 하는 모든 커밋에 대해 이 명령을 실행합니다.

### 유효성 검사 {#validation}

데이터가 수집되고 있는지 확인하려면 CI 파이프라인에서 `datadog-ci git-metadata upload`를 실행하세요.

다음과 같은 출력이 표시될 것입니다.

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/source_code/features/