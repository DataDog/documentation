If you are using [Microsoft SourceLink][201], Datadog can extract the git commit SHA and repository URL from your .NET assembly.

1. Open your project's file (`.csproj`) in an IDE and add a reference to one of the following NuGet packages, depending on where your git repository is hosted:
   
   | Provider | Microsoft SourceLink |
   |---|---|
   | GitHub | [Microsoft.SourceLink.GitHub][202] |
   | Bitbucket | [Microsoft.SourceLink.Bitbucket.Git][203] |
   | GitLab | [Microsoft.SourceLink.GitLab][204] |
   | Azure DevOps | [Microsoft.SourceLink.AzureRepos.Git][205] |

[201]: https://github.com/dotnet/sourcelink
[202]: https://www.nuget.org/packages/Microsoft.SourceLink.GitHub
[203]: https://www.nuget.org/packages/Microsoft.SourceLink.Bitbucket.Git
[204]: https://www.nuget.org/packages/Microsoft.SourceLink.GitLab
[205]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureRepos.Git
