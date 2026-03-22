## [1.3.1](https://github.com/arsdehnel/golden-key-matrix/compare/v1.3.0...v1.3.1) (2026-03-22)


### Bug Fixes

* remove SESSION_SECRET_KEY empty var that was overriding the secret ([93e67ad](https://github.com/arsdehnel/golden-key-matrix/commit/93e67ad4060138b29881220f9c790824b1c23238))

# [1.3.0](https://github.com/arsdehnel/golden-key-matrix/compare/v1.2.3...v1.3.0) (2026-03-22)


### Features

* configure production custom domain for golden-key-matrix.com ([1c396bc](https://github.com/arsdehnel/golden-key-matrix/commit/1c396bc92b34d9e04f32fcf37bb6a58b15195a1c))
* redirect www to apex domain ([f60af30](https://github.com/arsdehnel/golden-key-matrix/commit/f60af30a79585a4063dd302d2e7fd649e7e15ca0))

## [1.2.3](https://github.com/arsdehnel/golden-key-matrix/compare/v1.2.2...v1.2.3) (2026-03-22)


### Bug Fixes

* add SESSION_SECRET_KEY var to all wrangler environments ([cca58f8](https://github.com/arsdehnel/golden-key-matrix/commit/cca58f83571f867b2e23cc289fdda3f1c9bf0ea2))

## [1.2.2](https://github.com/arsdehnel/golden-key-matrix/compare/v1.2.1...v1.2.2) (2026-03-22)


### Bug Fixes

* trigger deploy workflow explicitly from release rather than tag push ([e0b33fd](https://github.com/arsdehnel/golden-key-matrix/commit/e0b33fd3e97d3fec4c5be0830d1a3e410882ce4f))

## [1.2.1](https://github.com/arsdehnel/golden-key-matrix/compare/v1.2.0...v1.2.1) (2026-03-22)


### Bug Fixes

* use PAT for semantic-release to trigger deploy workflow on tag push ([cac8261](https://github.com/arsdehnel/golden-key-matrix/commit/cac8261232990a21b242a6f1041ca7ce2fc31233))

# [1.2.0](https://github.com/arsdehnel/golden-key-matrix/compare/v1.1.0...v1.2.0) (2026-03-22)


### Bug Fixes

* resolve biome import order and formatting issues ([8ef9d66](https://github.com/arsdehnel/golden-key-matrix/commit/8ef9d667d85c3ecf3e261d73d6088b8f0645784c))


### Features

* add /dev/qr-poll page with QR code and synced session tracking ([e8868d2](https://github.com/arsdehnel/golden-key-matrix/commit/e8868d25b53baeee71085cb93f68de80a6f08f40))

# [1.1.0](https://github.com/arsdehnel/golden-key-matrix/compare/v1.0.2...v1.1.0) (2026-03-22)


### Features

* add manual staging/production deploy workflow ([1030631](https://github.com/arsdehnel/golden-key-matrix/commit/1030631227242804e3e6b78caa19724689ecf411))

## [1.0.2](https://github.com/arsdehnel/golden-key-matrix/compare/v1.0.1...v1.0.2) (2026-03-22)


### Bug Fixes

* use new_sqlite_classes migration for free plan DO compatibility ([7b4e857](https://github.com/arsdehnel/golden-key-matrix/commit/7b4e857da573de4ec3fe99ac4d83ed96f11bdef4))

## [1.0.1](https://github.com/arsdehnel/golden-key-matrix/compare/v1.0.0...v1.0.1) (2026-03-22)


### Bug Fixes

* add durable_objects bindings to all wrangler environments ([c48f7e7](https://github.com/arsdehnel/golden-key-matrix/commit/c48f7e77680d74d266bae07280c68b848ccb5d6b))

# 1.0.0 (2026-03-22)


### Features

* initial project setup ([1e78f07](https://github.com/arsdehnel/golden-key-matrix/commit/1e78f07fbfa94639ece443ca2411e05986a24d27))
