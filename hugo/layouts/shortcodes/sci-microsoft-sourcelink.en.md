If you are using [Microsoft SourceLink][101], Datadog can extract the git commit SHA and repository URL from your .NET assembly.

1. Open your project's file (`.csproj`) in an IDE and add a reference to one of the following NuGet packages, depending on where your git repository is hosted:
   
   | Provider | Microsoft SourceLink |
   |---|---|
   | GitHub | [Microsoft.SourceLink.GitHub][102] |
   | Bitbucket | [Microsoft.SourceLink.Bitbucket.Git][103] |
   | GitLab | [Microsoft.SourceLink.GitLab][104] |
   | Azure DevOps | [Microsoft.SourceLink.AzureRepos.Git][105] |
   | Azure DevOps Server | [Microsoft.SourceLink.AzureDevOpsServer.Git][106] |

2. Deploy the `.pdb` files alongside the assemblies (`.dll` or `.exe`) when Git metadata cannot be extracted from assembly attributes. The tracer first reads repository and commit information from assembly attributes, then falls back to SourceLink information in the PDB. Explicit `DD_GIT_*` environment variables do not require PDB files.

[101]: https://github.com/dotnet/sourcelink
[102]: https://www.nuget.org/packages/Microsoft.SourceLink.GitHub
[103]: https://www.nuget.org/packages/Microsoft.SourceLink.Bitbucket.Git
[104]: https://www.nuget.org/packages/Microsoft.SourceLink.GitLab
[105]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureRepos.Git
[106]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureDevOpsServer.Git
