---
title: Lambda support
kind: documentation
---

Support matrix extracted from Overview - Trivy and somewhat modified following our use of Trivy.

This matrix divide the agentless lambda support by language between two categories: “pre-built” data like a code repository & “post-build” like a properly done docker image. Both are useful in different languages and lambda code can contain both type of artifacts. The supported column is set to “Yes” if we consider that the methods used to gather the deps are widespread enough



| Language | Supported | pre-build                                              | post-build                           | License                |
|----------|-----------|--------------------------------------------------------|--------------------------------------|------------------------|
| .NET     | Yes       | NuGet files                                            | NuGet files                          | \*.nuspec              |
| Go       | Yes       | `go.mod`, `go.sum`                                     | symbol binary scan                   | go modules cache       |
| Java     | Yes       | `pom.xml`, `gradle.lock`                               | JAR with `pom.properties` files      | `pom.xml`, `gradle.lock`|
| Node.js  | Yes       | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`     | npm cache                            | `package.json`         |
| PHP      | Yes       | `composer.lock`                                        |                                      | `composer.lock`        |
| Python   | Yes       | `requirements.txt`, `pipfile.lock`, `poetry.lock`      | Egg, Wheel, Conda via pip cache      | Egg, Wheel cache       |
| Ruby     | Yes       | `gemfile.lock`                                         | RubyGems gemspec files               | RubyGems gemspec files |
| Rust     | Yes       | `cargo.lock`                                           | via cargo-audit package              |                        |
| Swift    | No        | `Package.resolved`, `Podfile.lock`                     |                                      |                        |
| C/C++    | No        | `conan.lock`                                           |                                      | `conanfile.py`         |
| Elixir   | No        | `mix.lock`                                             |                                      |                        |
| Dart     | No        | `pubspec.lock`                                         |                                      |                        |