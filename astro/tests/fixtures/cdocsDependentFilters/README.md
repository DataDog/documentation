A Cdocs customization config where the database options depend on the host (`<HOST>_database_options`), so tests can cover dependent filters. Import it from `customizationConfig.ts`.

Used by the tests for `src/lib/cdocs/pageLists.ts`, `filterOptionLinks.ts`, and `preferenceLinks.ts`, and by the `CdocsFilterBar` unit tests.
