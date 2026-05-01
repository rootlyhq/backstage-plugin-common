# @rootly/backstage-plugin-common

## 1.3.0 - 2026-05-01

### Added
- Catalog entity support: `RootlyCatalog` and `RootlyCatalogEntity` types
- 7 new annotation constants: `catalog-entity-id`, `catalog-entity-name`, `catalog-entity-slug`, `catalog-entity-auto-import`, `catalog-id`, `catalog-slug`, `catalog-description`
- API methods: `getCatalogs`, `getCatalogEntity` (with `include` support), `getCatalogEntities`, `importCatalogEntityEntity`, `updateCatalogEntityEntity`, `deleteCatalogEntityEntity`
- `findOrCreateCatalog` with race condition retry on duplicate
- `getCatalogEntityDetailsURL` with catalog slug resolution
- `linkedCatalogEntity` field on `RootlyEntity` bridge type

### Changed
- URL helper methods converted from static to instance methods
- New `apiHost` option on `RootlyApi` constructor (defaults to `https://rootly.com`)
- `RootlyCatalogEntityResponse` includes optional `included` array for sideloaded catalog data


## 1.2.0 - 2026-04-23

### Changed
- Sync service `owner_group_ids` from Backstage `spec.owner` when importing or updating services

### Fixed
- Replace the self-referential package import in `api.ts` with internal relative imports so local builds succeed

## 1.1.1 - 2026-04-10

### Fixed
- Add missing `await` on `this.fetch()` calls in six API methods: `importServiceEntity`, `updateServiceEntity`, `importFunctionalityEntity`, `updateFunctionalityEntity`, `importTeamEntity`, `updateTeamEntity`

## 1.1.0 - 2025-10-07

### Changed
- Upgrade @backstage/cli from ^0.32.1 to ^0.34.3
- Upgrade @commitlint/cli from ^17.7.1 to ^20.1.0
- Upgrade @commitlint/config-conventional from ^17.7.0 to ^20.0.0
- Upgrade typescript from ^5.3.3 to ^5.9.3

## 1.0.0 - 2025-06-11

### Changed
- Upgrade common plugin to stable

## 1.0.0-beta.6 - 2024-10-25

### Changed
- Remove empty attributes from API responses
- Fix index.ts path issues
- Update README.md documentation

## 1.0.0-beta.5 - 2024-09-09

### Changed
- Build improvements and optimizations

## 1.0.0-beta.4 - 2024-09-09

### Added
- Add annotations to set resources name

## 1.0.0-beta.3 - 2024-08-28

### Added
- Initial beta release

## 1.0.0-beta.2 - 2024-08-27

### Changed
- Upgrade dependencies
- Fix README.md documentation
- Update package.json metadata
