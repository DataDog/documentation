[Microsoft SourceLink][101]를 사용할 경우 Datadog에서 .NET 어셈블리로부터 git 커밋 SHA와 리포지토리 URL을 추출할 수 있습니다. 

1. IDE의 프로젝트 파일(`.csproj`)를 열고 git 리포지토리 호스트 장소에 따라 다음 NuGet 패키지 중 하나에 참조를 추가하세요.

   | Provider | Microsoft SourceLink |
   |---|---|
   | GitHub | [Microsoft.SourceLink.GitHub][102] |
   | Bitbucket | [Microsoft.SourceLink.Bitbucket.Git][103] |
   | GitLab | [Microsoft.SourceLink.GitLab][104] |
   | Azure DevOps | [Microsoft.SourceLink.AzureRepos.Git][105] |
   | Azure DevOps Server | [Microsoft.SourceLink.AzureDevOpsServer.Git][106] |

[101]: https://github.com/dotnet/sourcelink
[102]: https://www.nuget.org/packages/Microsoft.SourceLink.GitHub
[103]: https://www.nuget.org/packages/Microsoft.SourceLink.Bitbucket.Git
[104]: https://www.nuget.org/packages/Microsoft.SourceLink.GitLab
[105]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureRepos.Git
[106]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureDevOpsServer.Git
