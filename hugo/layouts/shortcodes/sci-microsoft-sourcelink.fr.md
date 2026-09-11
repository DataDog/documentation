Si vous utilisez [Microsoft SourceLink][101], Dtadog peut extraire le SHA du commit git et l'URL du référentiel à partir de l'assemblage .NET.

1. Ouvrez le fichier de votre projet (`.csproj`) dans un environnement de développement intégré (EDI), puis ajoutez une référence à l'un des packages NuGet suivants, selon l'endroit où votre référentiel git est hébergé :

   | Fournisseur | Microsoft SourceLink |
   |---|---|
   | GitHub | [Microsoft.SourceLink.GitHub][102] |
   | Bitbucket | [Microsoft.SourceLink.Bitbucket.Git][103] |
   | GitLab | [Microsoft.SourceLink.GitLab][104] |
   | Azure DevOps | [Microsoft.SourceLink.AzureRepos.Git][105] |
   | Azure DevOps Server | [Microsoft.SourceLink.AzureDevOpsServer.Git][106] |

[101]: https://github.com/dotnet/sourcelink
[102]: https://www.nuget.org/packages/Microsoft.SourceLink.GitHub
[103]: https://www.nuget.org/packages/Microsoft.SourceLink.Bitbucket.Git
[104]: https://www.nuget.org/packages/Microsoft.SourceLink.GitLab
[105]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureRepos.Git
[106]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureDevOpsServer.Git
