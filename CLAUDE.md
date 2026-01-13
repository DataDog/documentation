# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Datadog Documentation repository, built using Hugo (static site generator) and published to docs.datadoghq.com. The codebase consists of markdown content, Hugo themes, Node.js build scripts, and Python automation tools.

## Development Commands

### Build and Development
- `yarn start` or `make start` - Full build including external dependencies and run development server
- `yarn run start` - Basic Hugo development server (port 1313)
- `make start-no-pre-build` - Skip external dependencies, build and run
- `make start-preserve-build` - Keep existing build scripts for local testing
- `make start-docker` - Build and run via Docker container

### Build Commands
- `yarn build` or `make build` - Production build
- `yarn run build:hugo` - Run Hugo build only
- `yarn run build:preview` - Build with preview environment
- `make build-cdocs` - Compile .mdoc files to HTML

### Testing and Quality
- `yarn run jest-test` - Run JavaScript tests
- `make clean` - Clean generated files
- `make clean-all` - Clean everything (environment, repos, generated files)

### Dependencies
- `yarn install` - Install Node.js dependencies
- `make dependencies` - Install all dependencies (Node + Python + external repos)
- `make hugpython` - Set up Python virtual environment

## Architecture

### Content Structure
- `content/en/` - English documentation (primary language)
- `content/{fr,es,ja,ko}/` - Translated content (managed externally)
- `layouts/` - Hugo templates and shortcodes
- `static/` - Static assets, images, fonts
- `assets/` - SCSS stylesheets and JavaScript

### Build System
- **Hugo**: Static site generator with custom themes
- **Node.js**: Package management, build automation, asset processing
- **Python**: Content processing, integration data fetching, translations
- **Makefile**: Orchestrates complex build processes and external dependencies

### External Dependencies
The build system automatically fetches:
- API client examples from multiple language repositories
- Integration metadata and documentation
- Vector integration data via CUE files
- Some documentation is sourced from GitHub using the `pull_config.yaml` file at `local/bin/py/build/configurations/pull_config.yaml`.
- Some documentation is sourced from a go module called `websites-sources`

### Configuration
- `config/` - Hugo configuration for different environments (development, preview, live)
- `package.json` - Node.js dependencies and scripts
- `Makefile` + `Makefile.config` - Build orchestration
- Environment-specific parameters in `config/{env}/params.yaml`

## Branch and PR Guidelines

### Branch Naming
CRITICAL: Always use format `<name>/<description>` with forward slash. Without this:
- GitLab pipeline won't run
- No branch preview will be generated
- CI will fail

### PR Checklist
- Leave the “Ready for merge” checkbox unchecked unless explicitly requested.

### Content Guidelines
Follow the CONTRIBUTING.md style guide:
- Use American English (en_US)
- Be plain, direct, and concise
- Provide explicit instructions with examples
- Use imperative voice for instructions
- Don't edit translated content directly (managed externally)

## Hugo-Specific Details

### Shortcodes
Extensive library in `layouts/shortcodes/` for:
- Code examples across multiple languages
- Integration-specific content
- API documentation
- Security and compliance sections

### Content Types
- Regular markdown pages
- API reference (auto-generated)
- Integration pages (auto-populated from external repos)
- Multi-language code examples

## Development Notes

### Local Development
- Requires Node.js >= 20.11.0
- Python 3 for build scripts
- Uses Yarn package manager (v3.6.1)
- Development server runs on port 1313

### External Content
- API examples automatically sync from datadog-api-client-* repositories
- Integration data pulled from the `websites-sources` go module.
   - The exception is Dogweb integrations, which are pulled from a GitHub repository.
- Some documentation is sourced from GitHub using the `pull_config.yaml` file at `local/bin/py/build/configurations/pull_config.yaml`.
- Build scripts fetched from external repository during setup

### Build Environments
- **Development**: Local development with drafts
- **Preview**: Branch previews for PRs
- **Live**: Production deployment