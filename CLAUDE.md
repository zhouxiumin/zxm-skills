# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A collection of standalone skill packages consumed by AI coding assistants (Claude Code, etc.). Each skill is a prompt/document bundle, not executable software. The repo has no root-level build system.

## Skill structure

Every skill lives in `skills/<skill-name>/` and must have:

- `SKILL.md` — entry point, **must start with YAML frontmatter**:
  ```yaml
  ---
  name: skill-name
  description: |-
    one or multi-line description
  license: MIT
  tags:
    - tag1
  allowed-tools: [Bash, Read, Write]
  ---
  ```
  Required fields: `name`, `description`. Others optional.

Optional subdirectories: `references/` (docs/examples), `scripts/` (Python/PowerShell/Bash), `assets/` (templates).

Published skills may also have `_meta.json` (owner/slug/version — do not edit manually).

## Development commands

```powershell
# List all skills
Get-ChildItem skills

# Search across skill docs/scripts
rg -n "pattern" skills

# Run a PowerShell skill script
powershell -ExecutionPolicy Bypass -File skills/<name>/scripts/<script>.ps1

# Run a Python skill script
python skills/<name>/scripts/<script>.py <args>
```

No unified test runner. After changes: manually verify any commands or scripts referenced in the modified `SKILL.md` are executable and correct.

## Naming conventions

- Skill directory names: lowercase hyphenated (`skill-name`)
- Document names: semantic (`USAGE-GUIDE.md`, `reference.md`), not generic (`test1.md`)
- Scripts follow the language's own style conventions

## Commit style

`Add/Update/Fix <scope>: <summary>` — imperative, single skill or problem per commit.
