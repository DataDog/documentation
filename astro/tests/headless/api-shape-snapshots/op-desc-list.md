<!-- op-desc-list: /api/latest/rendering-shapes/upload-source-maps/ -->

### Overview

Upload source maps, symbol files, and mapping files to Datadog for error deobfuscation.
This endpoint enables you to upload various types of debug symbols for RUM Error Tracking,
allowing Datadog to display readable stack traces instead of minified or obfuscated code.

**Request format:**

Each request is a `multipart/form-data` upload containing two parts:

1. `event` — a JSON-encoded string with the upload metadata (type, service, version, etc.)
1. One or more binary file fields (for example, `source_map`, `symbols_archive`)

**Supported upload types** (set via `event.type`):

- `js_sourcemap`: JavaScript source maps for browser applications
- `react_native_sourcemap`: React Native source maps for mobile applications
- `jvm_mapping_file`: ProGuard/R8 mapping files for Android crash deobfuscation
- `ios_symbols`: dSYM files for iOS crash symbolication
- `flutter_symbol_file`: Flutter symbol files
- `ndk_symbol_file`: Android NDK symbol files for native crashes
- `il2cpp_mapping_file`: IL2CPP mapping files for Unity
- `elf_symbol_file`: ELF symbol files for Linux/Unix
- `pe_symbol_file`: PE/PDB symbol files for Windows
- `repository`: Repository metadata for source code linking

**Limits:**

- Maximum file size: 500 MB

**Note:** For most use cases, Datadog recommends using the
[Datadog CLI (datadog-ci)](https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps)
which provides a simplified interface for uploading source maps.
