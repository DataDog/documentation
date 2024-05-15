If you are using [Microsoft SourceLink][101], Datadog can extract the git commit SHA and repository URL from your .NET assembly. 

1. Open your project's file (`.csproj`) in an IDE and add a reference to one of the following NuGet packages, depending on where your git repository is hosted:
   
   | Provider | Microsoft SourceLink |
   |---|---|
   | GitHub | [Microsoft.SourceLink.GitHub][102] |
   | Bitbucket | [Microsoft.SourceLink.Bitbucket][103] |
   | GitLab | [Microsoft.SourceLink.GitLab][104] |
   | Azure DevOps | [Microsoft.SourceLink.AzureRepos.Git][105] |
   | Azure DevOps Server | [Microsoft.SourceLink.AzureDevOpsServer.Git][106] |

1. Ensure that your `.pdb` files are deployed alongside your .NET assemblies (`.dll` or `.exe`) in the same folder.

[101]: https://github.com/dotnet/sourcelink
[102]: https://www.nuget.org/packages/Microsoft.SourceLink.GitHub
[103]: https://www.nuget.org/packages/Microsoft.SourceLink.Bitbucket
[104]: https://www.nuget.org/packages/Microsoft.SourceLink.GitLab
[105]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureRepos.Git
[106]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureDevOpsServer.Git