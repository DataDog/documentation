[Microsoft SourceLink][101] を使用している場合、Datadog は .NET アセンブリから git のコミット SHA およびリポジトリの URL を抽出できます。

1. IDE でプロジェクトのファイル (`.csproj`) を開き、git リポジトリがホストされている場所に応じて、以下の NuGet パッケージの 1 つへの参照を追加します。

   | プロバイダー | Microsoft SourceLink |
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
