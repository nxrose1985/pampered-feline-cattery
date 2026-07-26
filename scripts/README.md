# Scripts

## Standing rule: Sanity write safety

No script in this directory (and no ad-hoc Claude Code session command) may write to the production Sanity dataset without both:

1. A `--dry-run` flag that logs every intended create/update/delete without executing it — run and reviewed first, before the real write.
2. A dump-first step that exports all affected documents to a timestamped local JSON file before any write executes.

Any one-off patch script must target documents by explicit `_id`, not by a type-wide query. It must be deleted after use.

## History

Five one-off scripts that wrote directly to production Sanity with no `--dry-run` flag and no dump-first step were deleted in PR #81:

- `upload-kittens.mjs`
- `upload-gallery.mjs`
- `upload-cats.mjs`
- `patch-kitten-about.mjs`
- `create-health-ethics.mjs`

They're recoverable from git history if a specific one is ever needed again as a reference — but any script rebuilt from them must add the dry-run and dump-first steps before it's allowed to run against production.

## `generate-bringing-home-pdf.py`

Local-only. Generates `public/bringing-home-guide.pdf` from hardcoded content. Touches no Sanity data — the standing rule above doesn't apply to it.
